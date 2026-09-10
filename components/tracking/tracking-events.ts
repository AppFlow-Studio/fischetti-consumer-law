"use client"

import { hasConsentFor } from "@/lib/consent"
import { hashEnhancedConversionData, type EnhancedConversionsData } from "@/lib/enhanced-conversions"

type DataLayerEvent = {
  event: string
  [key: string]: unknown
}

function pushDataLayer(event: DataLayerEvent) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(event)
}

function pagePath() {
  return typeof window === "undefined" ? "" : window.location.pathname
}

export function trackLeadFormStart(formName: string) {
  if (!hasConsentFor("analytics")) return

  pushDataLayer({
    event: "lead_form_start",
    form_name: formName,
    page_path: pagePath(),
    method: "web_form",
  })
}

export async function trackLeadFormSuccess(
  formName: string,
  options: {
    leadId: string
    submissionId: string
    practiceArea?: string
    enhancedConversion?: EnhancedConversionsData
  },
) {
  const marketingAllowed = hasConsentFor("marketing")

  const dedupeKey = `clf_lead_event_v1:${options.leadId}`
  try {
    if (window.sessionStorage.getItem(dedupeKey) === "sent") return
  } catch {
    // In-memory execution still remains single-fire in the normal submit flow.
  }

  const userData = marketingAllowed && options.enhancedConversion
    ? await hashEnhancedConversionData(options.enhancedConversion)
    : undefined

  pushDataLayer({
    event: "lead_form_submit",
    event_id: options.submissionId,
    lead_id: options.leadId,
    form_name: formName,
    page_path: pagePath(),
    method: "web_form",
    practice_area: options.practiceArea,
    ...(userData ? { user_data: userData } : {}),
  })

  try {
    window.sessionStorage.setItem(dedupeKey, "sent")
  } catch {
    // Analytics dedupe storage is best-effort; no lead data is stored here.
  }
}

export function trackPhoneClick(location?: string, telNumber?: string) {
  if (!hasConsentFor("analytics") && !hasConsentFor("marketing")) return

  pushDataLayer({
    event: "tel_click",
    tel_number: telNumber,
    page_path: pagePath(),
    location,
  })
}

export function trackFreeCaseReviewClick(location?: string) {
  if (!hasConsentFor("analytics")) return

  pushDataLayer({
    event: "free_case_review_click",
    page_path: pagePath(),
    location,
  })
}

export function trackConsultationCtaClick(location?: string) {
  if (!hasConsentFor("analytics")) return

  pushDataLayer({
    event: "consultation_cta_click",
    page_path: pagePath(),
    location,
  })
}
