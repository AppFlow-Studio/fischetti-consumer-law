import { supabaseServer } from "@/lib/supabaseServer"

export interface LeadData {
  first_name: string
  last_name: string
  email: string
  phone: string
  zip: string
  case_type: string
  caller_identification?: string
  tcpa_contacting_company?: string
  description: string
  urgency: string
  form_source: string
  submission_id: string
  gclid?: string
  gbraid?: string
  wbraid?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export interface PersistedLead {
  leadId: string
  createdAt: string
  duplicate: boolean
  emailSent: boolean
  sourceWebhookSentAt: string | null
  sourceWebhookStatus: string
  emailStatus: string
}

type LeadRow = {
  id: string | number
  created_at: string
  email_sent: boolean | null
  source_webhook_sent_at: string | null
  source_webhook_delivery_status: string | null
  email_delivery_status: string | null
}

function toPersistedLead(row: LeadRow, duplicate: boolean): PersistedLead {
  return {
    leadId: String(row.id),
    createdAt: row.created_at,
    duplicate,
    emailSent: row.email_sent === true,
    sourceWebhookSentAt: row.source_webhook_sent_at,
    sourceWebhookStatus: row.source_webhook_delivery_status || "pending",
    emailStatus: row.email_delivery_status || (row.email_sent ? "sent" : "pending"),
  }
}

export async function persistLead(data: LeadData): Promise<PersistedLead> {
  const { data: inserted, error } = await supabaseServer
    .from("leads")
    .insert({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      zip: data.zip,
      case_type: data.case_type,
      caller_identification: data.caller_identification || null,
      tcpa_contacting_company: data.tcpa_contacting_company || null,
      description: data.description,
      urgency: data.urgency,
      form_source: data.form_source,
      submission_id: data.submission_id,
      gclid: data.gclid || null,
      gbraid: data.gbraid || null,
      wbraid: data.wbraid || null,
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      utm_term: data.utm_term || null,
      utm_content: data.utm_content || null,
      email_sent: false,
    })
    .select("id,created_at,email_sent,source_webhook_sent_at,source_webhook_delivery_status,email_delivery_status")
    .single<LeadRow>()

  if (!error && inserted) return toPersistedLead(inserted, false)

  if (error?.code === "23505") {
    const { data: existing, error: lookupError } = await supabaseServer
      .from("leads")
      .select("id,created_at,email_sent,source_webhook_sent_at,source_webhook_delivery_status,email_delivery_status")
      .eq("submission_id", data.submission_id)
      .single<LeadRow>()

    if (!lookupError && existing) return toPersistedLead(existing, true)
    throw new Error(`Lead idempotency lookup failed: ${lookupError?.code || "missing-row"}`)
  }

  throw new Error(`Lead persistence failed: ${error?.code || "unknown"}`)
}

export async function markLeadEmailSent(leadId: string): Promise<void> {
  const { error } = await supabaseServer.from("leads").update({ email_sent: true, email_delivery_status: "sent", email_delivered_at: new Date().toISOString(), email_last_error: null }).eq("id", leadId)
  if (error) throw new Error(`Lead email status update failed: ${error.code || "unknown"}`)
}

export async function markLeadWebhookSent(leadId: string, sentAt: string): Promise<void> {
  const { error } = await supabaseServer
    .from("leads")
    .update({ source_webhook_sent_at: sentAt, source_webhook_delivery_status: "sent", source_webhook_delivered_at: sentAt, source_webhook_last_error: null })
    .eq("id", leadId)
  if (error) throw new Error(`Lead webhook status update failed: ${error.code || "unknown"}`)
}

export async function recordLeadDeliveryAttempt(leadId: string, channel: "email" | "source_webhook"): Promise<void> {
  const prefix = channel === "email" ? "email" : "source_webhook"
  const countColumn = `${prefix}_attempt_count`
  const { data: current } = await supabaseServer.from("leads").select(countColumn).eq("id", leadId).single<Record<string, number | null>>()
  const { error } = await supabaseServer.from("leads").update({
    [`${prefix}_delivery_status`]: "pending",
    [countColumn]: Number(current?.[countColumn] || 0) + 1,
    [`${prefix}_last_attempt_at`]: new Date().toISOString(),
  }).eq("id", leadId)
  if (error) throw new Error(`Lead ${channel} attempt update failed: ${error.code || "unknown"}`)
}

export async function markLeadDeliveryFailure(leadId: string, channel: "email" | "source_webhook", errorMessage: string, httpStatus?: number): Promise<void> {
  const prefix = channel === "email" ? "email" : "source_webhook"
  const values: Record<string, unknown> = {
    [`${prefix}_delivery_status`]: "failed",
    [`${prefix}_last_error`]: errorMessage.slice(0, 240),
  }
  if (httpStatus !== undefined) values[`${prefix}_last_http_status`] = httpStatus
  const { error } = await supabaseServer.from("leads").update(values).eq("id", leadId)
  if (error) throw new Error(`Lead ${channel} failure update failed: ${error.code || "unknown"}`)
}
