import { supabaseServer } from '@/lib/supabaseServer'

interface LeadData {
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  zip?: string
  case_type?: string
  description?: string
  urgency?: string
  form_source?: string
  gclid?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  email_sent?: boolean
}

export async function logLead(data: LeadData): Promise<void> {
  try {
    const { error } = await supabaseServer.from('leads').insert({
      first_name: data.first_name || null,
      last_name: data.last_name || null,
      email: data.email || null,
      phone: data.phone || null,
      zip: data.zip || null,
      case_type: data.case_type || null,
      description: data.description || null,
      urgency: data.urgency || null,
      form_source: data.form_source || null,
      gclid: data.gclid || null,
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      utm_term: data.utm_term || null,
      utm_content: data.utm_content || null,
      email_sent: data.email_sent ?? false,
    })
    if (error) console.error('[logLead] Supabase error:', error.message)
  } catch (err) {
    console.error('[logLead] Unexpected error:', err)
  }
}
