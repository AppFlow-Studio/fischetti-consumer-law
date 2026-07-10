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
  options?: {
    caseType?: string
    urgency?: string
    contactSourceStatus?: string
    enhancedConversion?: EnhancedConversionsData
  },
) {
  if (hasConsentFor("analytics")) {
    pushDataLayer({
      event: "form_submit_success",
      form_name: formName,
      page_path: pagePath(),
      method: "web_form",
    })

    pushDataLayer({
      event: "qualify_lead",
      form_name: formName,
      page_path: pagePath(),
      method: "web_form",
    })
  }

  if (hasConsentFor("marketing") && options?.enhancedConversion) {
    const userData = await hashEnhancedConversionData(options.enhancedConversion)
    pushDataLayer({
      event: "lead_form_submit",
      form_name: formName,
      page_path: pagePath(),
      method: "web_form",
      user_data: userData,
    })
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
