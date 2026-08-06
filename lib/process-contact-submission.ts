import { createElement } from "react"
import { Resend } from "resend"
import type { ValidatedContactFormData } from "@/components/forms/contact-schema"
import { ClientQualificationEmail } from "@/emails/client-qualification"
import { OfficeNotificationEmail } from "@/emails/office-notification"
import { detectLawType, calculateDeadline, getLawTypeLabel, type LawType } from "@/lib/email-utils"
import { markLeadDeliveryFailure, markLeadEmailSent, markLeadWebhookSent, persistLead, recordLeadDeliveryAttempt } from "@/lib/logLead"
import { buildSourceWebhookPayload, sendSourceWebhook } from "@/lib/source-webhook"

const FROM_EMAIL = "Consumer Law Florida <info@consumerlawflorida.com>"
const OFFICE_EMAIL = "info@consumerlawflorida.com"

export type ProcessedContactSubmission = {
  leadId: string
  submissionId: string
  createdAt: string
  duplicate: boolean
}

function formatSubmissionDate(createdAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "America/New_York",
  }).format(new Date(createdAt))
}

function getClientEmailSubject(lawType: LawType, lawLabel: string): string {
  switch (lawType) {
    case "FCRA": return "Your FCRA Case Checklist — Documents to Gather"
    case "FDCPA": return "Your FDCPA Case Checklist — Evidence to Collect"
    case "TCPA": return "Your TCPA Case Checklist — What to Save Now"
    default: return `Your ${lawLabel} Case Checklist`
  }
}

async function sendLeadEmails(formData: ValidatedContactFormData, leadId: string, createdAt: string) {
  const lawType = detectLawType(formData.caseType)
  const lawLabel = getLawTypeLabel(lawType)
  const submittedAt = formatSubmissionDate(createdAt)
  const resend = new Resend(process.env.RESEND_API_KEY)

  const [clientEmailResult, officeEmailResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM_EMAIL,
      to: formData.email,
      subject: getClientEmailSubject(lawType, lawLabel),
      react: createElement(ClientQualificationEmail, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        lawType,
        caseRef: leadId,
        deadlineDate: calculateDeadline(5),
        submittedAt,
      }),
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: OFFICE_EMAIL,
      replyTo: formData.email,
      subject: `New Case Review — Lead ${leadId} — ${formData.caseType}`,
      react: createElement(OfficeNotificationEmail, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        zip: formData.zip,
        caseType: formData.caseType,
        callerIdentification: formData.callerIdentification,
        contactingCompany: formData.contactingCompany,
        urgency: formData.urgency,
        description: formData.description,
        submittedAt,
      }),
    }),
  ])

  const clientSuccess = clientEmailResult.status === "fulfilled" && !clientEmailResult.value.error
  const officeSuccess = officeEmailResult.status === "fulfilled" && !officeEmailResult.value.error
  return clientSuccess || officeSuccess
}

export async function processContactSubmission(
  formData: ValidatedContactFormData,
): Promise<ProcessedContactSubmission> {
  if (!formData.submission_id) throw new Error("Validated submission is missing an idempotency identifier")

  const lead = await persistLead({
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    zip: formData.zip,
    case_type: formData.caseType,
    caller_identification: formData.callerIdentification,
    tcpa_contacting_company: formData.contactingCompany,
    description: formData.description,
    urgency: formData.urgency,
    form_source: formData.form_source || "free-case-review",
    submission_id: formData.submission_id,
    gclid: formData.gclid,
    gbraid: formData.gbraid,
    wbraid: formData.wbraid,
    utm_source: formData.utm_source,
    utm_medium: formData.utm_medium,
    utm_campaign: formData.utm_campaign,
    utm_term: formData.utm_term,
    utm_content: formData.utm_content,
  })

  const emailTask = !lead.emailSent
    ? recordLeadDeliveryAttempt(lead.leadId, "email").then(() => sendLeadEmails(formData, lead.leadId, lead.createdAt)).then(async (sent) => {
      if (sent) await markLeadEmailSent(lead.leadId)
      else await markLeadDeliveryFailure(lead.leadId, "email", "Resend returned no successful delivery")
    }).catch(async (error) => {
      await markLeadDeliveryFailure(lead.leadId, "email", error instanceof Error ? error.message : "Email delivery failed")
    })
    : Promise.resolve()

  const webhookTask = !lead.sourceWebhookSentAt
    ? recordLeadDeliveryAttempt(lead.leadId, "source_webhook").then(() => sendSourceWebhook(buildSourceWebhookPayload(formData, lead))).then(async (result) => {
      if (result.sent && result.sentAt) await markLeadWebhookSent(lead.leadId, result.sentAt)
      else await markLeadDeliveryFailure(lead.leadId, "source_webhook", result.error || "Source webhook is not configured", result.httpStatus)
    }).catch(async (error) => {
      await markLeadDeliveryFailure(lead.leadId, "source_webhook", error instanceof Error ? error.message : "Source webhook delivery failed")
    })
    : Promise.resolve()

  const [emailOutcome, webhookOutcome] = await Promise.allSettled([emailTask, webhookTask])
  if (emailOutcome.status === "rejected") console.error("[contact-submission] Email delivery status could not be recorded for lead", lead.leadId)
  if (webhookOutcome.status === "rejected") console.error("[contact-submission] Source delivery status could not be recorded for lead", lead.leadId)

  return {
    leadId: lead.leadId,
    submissionId: formData.submission_id,
    createdAt: lead.createdAt,
    duplicate: lead.duplicate,
  }
}
