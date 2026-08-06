import type { ValidatedContactFormData } from "@/components/forms/contact-schema"
import { getPracticeArea } from "@/components/forms/contact-schema"

export type SourceWebhookPayload = {
  lead_id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string
  zip: string
  practice_area: string
  case_type: string
  form_source: string
  urgency: string
  case_details: string
  caller_identification?: string
  contacting_company?: string
  gclid?: string
  gbraid?: string
  wbraid?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export function buildSourceWebhookPayload(
  formData: ValidatedContactFormData,
  lead: { leadId: string; createdAt: string },
): SourceWebhookPayload {
  return {
    lead_id: lead.leadId,
    created_at: lead.createdAt,
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    zip: formData.zip,
    practice_area: getPracticeArea(formData.caseType),
    case_type: formData.caseType,
    form_source: formData.form_source || "free-case-review",
    urgency: formData.urgency,
    case_details: formData.description,
    caller_identification: formData.callerIdentification,
    contacting_company: formData.contactingCompany,
    gclid: formData.gclid,
    gbraid: formData.gbraid,
    wbraid: formData.wbraid,
    utm_source: formData.utm_source,
    utm_medium: formData.utm_medium,
    utm_campaign: formData.utm_campaign,
    utm_term: formData.utm_term,
    utm_content: formData.utm_content,
  }
}

export type SourceWebhookResult = {
  configured: boolean
  sent: boolean
  sentAt?: string
  httpStatus?: number
  error?: string
}

export async function sendSourceWebhook(payload: SourceWebhookPayload): Promise<SourceWebhookResult> {
  const webhookUrl = process.env.SOURCE_WEBHOOK_URL
  const sharedSecret = process.env.SOURCE_WEBHOOK_SHARED_SECRET
  if (!webhookUrl || !sharedSecret) return { configured: false, sent: false, error: "Source webhook configuration is incomplete" }

  let parsedUrl: URL
  try {
    parsedUrl = new URL(webhookUrl)
  } catch {
    throw new Error("SOURCE_WEBHOOK_URL is invalid")
  }
  if (parsedUrl.protocol !== "https:") throw new Error("SOURCE_WEBHOOK_URL must use HTTPS")

  let lastError: unknown
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8_000)
    try {
      const response = await fetch(parsedUrl, {
        method: "POST",
        headers: { "content-type": "application/json", "x-source-webhook-secret": sharedSecret },
        body: JSON.stringify(payload),
        cache: "no-store",
        redirect: "follow",
        signal: controller.signal,
      })

      if (!response.ok) throw Object.assign(new Error(`Source webhook returned HTTP ${response.status}`), { httpStatus: response.status })
      const responseText = await response.text()
      if (responseText) {
        try {
          const responseBody = JSON.parse(responseText) as { success?: boolean; ok?: boolean }
          if (responseBody.success === false || responseBody.ok === false) {
            throw new Error("Source webhook rejected the lead")
          }
        } catch (error) {
          if (error instanceof SyntaxError) {
            // Apps Script deployments may return a non-JSON acknowledgement page.
          } else {
            throw error
          }
        }
      }
      return { configured: true, sent: true, sentAt: new Date().toISOString() }
    } catch (error) {
      lastError = error
    } finally {
      clearTimeout(timeout)
    }
  }

  return {
    configured: true,
    sent: false,
    httpStatus: (lastError as { httpStatus?: number } | undefined)?.httpStatus,
    error: lastError instanceof Error ? lastError.message : "Source webhook delivery failed",
  }
}
