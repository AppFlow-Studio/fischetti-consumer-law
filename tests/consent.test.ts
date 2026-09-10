import { beforeEach, describe, expect, it } from "vitest"
import {
  CONSENT_STORAGE_KEY,
  consentToGoogleState,
  createConsentPreferences,
  hasConsentFor,
  readStoredConsent,
  writeStoredConsent,
} from "@/lib/consent"

describe("Consent Mode state", () => {
  beforeEach(() => window.localStorage.clear())

  it("defaults all non-essential Google consent fields to denied", () => {
    expect(consentToGoogleState(null)).toMatchObject({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    })
    expect(hasConsentFor("analytics")).toBe(false)
    expect(hasConsentFor("marketing")).toBe(false)
  })

  it("persists and restores an explicit rejection", () => {
    const rejected = createConsentPreferences({ analytics: false, marketing: false, functional: false })
    writeStoredConsent(rejected)
    expect(readStoredConsent()).toMatchObject({ analytics: false, marketing: false, functional: false })
    expect(consentToGoogleState(readStoredConsent())).toMatchObject({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    })
  })

  it("persists and restores explicit acceptance", () => {
    const accepted = createConsentPreferences({ analytics: true, marketing: true, functional: true })
    writeStoredConsent(accepted)
    expect(JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) || "{}")).toMatchObject({
      analytics: true,
      marketing: true,
    })
    expect(consentToGoogleState(readStoredConsent())).toMatchObject({
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    })
  })
})
