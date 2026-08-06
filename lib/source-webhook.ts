import type { ValidatedContactFormData } from "@/components/forms/contact-schema"
import { getPracticeArea } from "@/components/forms/contact-schema"

export type SourceWebhookRecord = {
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
  tcpa_company?: string
  gclid?: string
  gbraid?: string
  wbraid?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export type SourceWebhookPayload = {
  type: "INSERT"
  record: SourceWebhookRecord
}

export function buildSourceWebhookPayload(
  formData: ValidatedContactFormData,
  lead: { leadId: string; createdAt: string },
): SourceWebhookPayload {
  const leadId = String(lead.leadId).trim()
  if (!leadId) throw new Error("Source webhook requires a canonical Lead ID")

  return {
    type: "INSERT",
    record: {
      lead_id: leadId,
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
      ...(formData.contactingCompany ? { tcpa_company: formData.contactingCompany } : {}),
      gclid: formData.gclid,
      gbraid: formData.gbraid,
      wbraid: formData.wbraid,
      utm_source: formData.utm_source,
      utm_medium: formData.utm_medium,
      utm_campaign: formData.utm_campaign,
      utm_term: formData.utm_term,
      utm_content: formData.utm_content,
    },
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
  if (!payload.record.lead_id.trim()) throw new Error("Source webhook requires a canonical Lead ID")

  let lastError: unknown
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8_000)
    try {
      const response = await fetch(parsedUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, shared_secret: sharedSecret }),
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
            throw Object.assign(new Error("Source webhook rejected the lead"), {
              httpStatus: response.status,
              nonRetryable: true,
            })
          }
        } catch (error) {
          if (error instanceof SyntaxError) {
            // Apps Script can return a rejection as HTTP 200 text. Never record a
            // known rejection acknowledgement as a successful delivery.
            if (/^(?:skipped|rejected|unauthorized|forbidden|denied|error|invalid|missing)\b/i.test(responseText.trim())) {
              throw Object.assign(new Error(`Source webhook rejected the lead: ${responseText.trim().slice(0, 160)}`), {
                httpStatus: response.status,
                nonRetryable: true,
              })
            }
          } else {
            throw error
          }
        }
      }
      return { configured: true, sent: true, sentAt: new Date().toISOString() }
    } catch (error) {
      lastError = error
      if ((error as { nonRetryable?: boolean } | undefined)?.nonRetryable) break
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
