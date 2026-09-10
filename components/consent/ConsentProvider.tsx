"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  consentToGoogleState,
  createConsentPreferences,
  readStoredConsent,
  writeStoredConsent,
  type ConsentPreferences,
} from "@/lib/consent"

type ConsentContextValue = {
  preferences: ConsentPreferences | null
  isReady: boolean
  bannerOpen: boolean
  preferencesOpen: boolean
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (preferences: Pick<ConsentPreferences, "analytics" | "marketing" | "functional">) => void
  openPreferences: () => void
  closePreferences: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

function updateGoogleConsent(preferences: ConsentPreferences) {
  if (typeof window === "undefined") return

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments)
  }

  window.gtag("consent", "update", consentToGoogleState(preferences))
  window.__clfConsent = preferences
  window.dispatchEvent(new CustomEvent("clf-consent-change", { detail: preferences }))
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [bannerOpen, setBannerOpen] = useState(false)
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    const stored = readStoredConsent()
    setPreferences(stored)
    setBannerOpen(!stored)
    setIsReady(true)

    if (stored) {
      updateGoogleConsent(stored)
    }
  }, [])

  const persist = useCallback((nextPreferences: ConsentPreferences) => {
    writeStoredConsent(nextPreferences)
    setPreferences(nextPreferences)
    setBannerOpen(false)
    setPreferencesOpen(false)
    updateGoogleConsent(nextPreferences)
  }, [])

  const acceptAll = useCallback(() => {
    persist(createConsentPreferences({ analytics: true, marketing: true, functional: true }))
  }, [persist])

  const rejectAll = useCallback(() => {
    persist(createConsentPreferences({ analytics: false, marketing: false, functional: false }))
  }, [persist])

  const savePreferences = useCallback(
    (next: Pick<ConsentPreferences, "analytics" | "marketing" | "functional">) => {
      persist(createConsentPreferences(next))
    },
    [persist],
  )

  const value = useMemo<ConsentContextValue>(
    () => ({
      preferences,
      isReady,
      bannerOpen,
      preferencesOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
    }),
    [acceptAll, bannerOpen, isReady, preferences, preferencesOpen, rejectAll, savePreferences],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export function useConsent() {
  const context = useContext(ConsentContext)
  if (!context) {
    throw new Error("useConsent must be used within ConsentProvider")
  }
  return context
}
