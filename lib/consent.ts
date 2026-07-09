export const CONSENT_VERSION = 1
export const CONSENT_STORAGE_KEY = "clf_cookie_consent_v1"

export type ConsentCategory = "necessary" | "analytics" | "marketing" | "functional"

export type ConsentPreferences = {
  version: number
  timestamp: string
  necessary: true
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export type GoogleConsentValue = "granted" | "denied"

export type GoogleConsentState = {
  ad_storage: GoogleConsentValue
  analytics_storage: GoogleConsentValue
  ad_user_data: GoogleConsentValue
  ad_personalization: GoogleConsentValue
  functionality_storage: GoogleConsentValue
  personalization_storage: GoogleConsentValue
  security_storage: "granted"
}

export function createConsentPreferences(
  preferences: Pick<ConsentPreferences, "analytics" | "marketing" | "functional">,
): ConsentPreferences {
  return {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    functional: preferences.functional,
  }
}

export const deniedConsent = createConsentPreferences({
  analytics: false,
  marketing: false,
  functional: false,
})

export const grantedConsent = createConsentPreferences({
  analytics: true,
  marketing: true,
  functional: true,
})

export function parseConsentPreferences(value: string | null): ConsentPreferences | null {
  if (!value) return null

  try {
    const parsed = JSON.parse(value) as Partial<ConsentPreferences>
    if (parsed.version !== CONSENT_VERSION) return null
    if (parsed.necessary !== true) return null

    return createConsentPreferences({
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      functional: parsed.functional === true,
    })
  } catch {
    return null
  }
}

export function readStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null

  try {
    return parseConsentPreferences(window.localStorage.getItem(CONSENT_STORAGE_KEY))
  } catch {
    return null
  }
}

export function writeStoredConsent(preferences: ConsentPreferences): void {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences))
  } catch {
    // Consent updates still apply in-memory even if storage is unavailable.
  }
}

export function consentToGoogleState(preferences: ConsentPreferences | null): GoogleConsentState {
  return {
    ad_storage: preferences?.marketing === false ? "denied" : "granted",
    analytics_storage: preferences?.analytics === false ? "denied" : "granted",
    ad_user_data: preferences?.marketing === false ? "denied" : "granted",
    ad_personalization: preferences?.marketing === false ? "denied" : "granted",
    functionality_storage: preferences?.functional === false ? "denied" : "granted",
    personalization_storage: preferences?.functional === false ? "denied" : "granted",
    security_storage: "granted",
  }
}

export function hasConsentFor(category: Exclude<ConsentCategory, "necessary">): boolean {
  const consent = readStoredConsent()
  return consent?.[category] !== false
}
