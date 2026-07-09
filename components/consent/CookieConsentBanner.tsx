"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useConsent } from "@/components/consent/ConsentProvider"

type PreferenceState = {
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const defaultPreferenceState: PreferenceState = {
  analytics: true,
  marketing: true,
  functional: true,
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  id: string
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4">
      <div>
        <label htmlFor={id} className="text-sm font-semibold text-slate-900">
          {label}
        </label>
        <p className="mt-1 text-xs leading-relaxed text-slate-600">{description}</p>
      </div>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  )
}

function PreferencesModal() {
  const {
    preferences,
    preferencesOpen,
    closePreferences,
    savePreferences,
    acceptAll,
    rejectAll,
  } = useConsent()
  const [draft, setDraft] = useState<PreferenceState>(defaultPreferenceState)

  useEffect(() => {
    setDraft({
      analytics: preferences?.analytics ?? true,
      marketing: preferences?.marketing ?? true,
      functional: preferences?.functional ?? true,
    })
  }, [preferences, preferencesOpen])

  if (!preferencesOpen) return null

  return (
    <div className="fixed inset-0 z-[220] flex items-end justify-center bg-slate-950/30 px-4 py-4 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl ring-1 ring-slate-200 sm:p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id="cookie-preferences-title" className="text-lg font-bold text-slate-950">
              Cookie Preferences
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Tracking is active by default. Turn off any non-essential categories you do not want us to use.
            </p>
          </div>
          <button
            type="button"
            onClick={closePreferences}
            aria-label="Close cookie preferences"
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <ToggleRow
            id="cookie-necessary"
            label="Necessary"
            description="Required for consent storage, form submissions, routing, security, and basic lead attribution."
            checked
            disabled
          />
          <ToggleRow
            id="cookie-analytics"
            label="Analytics"
            description="Helps measure site performance and generic events like form starts, form success, CTA clicks, and phone clicks."
            checked={draft.analytics}
            onChange={(analytics) => setDraft((current) => ({ ...current, analytics }))}
          />
          <ToggleRow
            id="cookie-marketing"
            label="Marketing"
            description="Allows ad measurement, remarketing tags, call attribution tools, and enhanced conversions after successful lead submissions."
            checked={draft.marketing}
            onChange={(marketing) => setDraft((current) => ({ ...current, marketing }))}
          />
          <ToggleRow
            id="cookie-functional"
            label="Functional"
            description="Allows optional tools such as Google Maps or translation widgets when available."
            checked={draft.functional}
            onChange={(functional) => setDraft((current) => ({ ...current, functional }))}
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => savePreferences(draft)}
            className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Preferences
          </button>
          <button
            type="button"
            onClick={rejectAll}
            className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reject All
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-md border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CookieConsentBanner() {
  const { bannerOpen, isReady, acceptAll, rejectAll, openPreferences } = useConsent()

  if (!isReady) return null

  return (
    <>
      {bannerOpen && (
        <section
          aria-label="Cookie consent"
          className="fixed bottom-24 left-4 right-4 z-[120] rounded-xl border border-slate-200 bg-white p-4 shadow-2xl sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-xl sm:p-5"
        >
          <p className="text-sm leading-relaxed text-slate-700">
            ConsumerLawFlorida.com uses cookies and similar technologies to measure site activity, ads, calls, and lead attribution.
            You can accept all, opt out of non-essential tracking, or manage your preferences.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={rejectAll}
              className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Opt Out
            </button>
            <button
              type="button"
              onClick={openPreferences}
              className="rounded-md border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Manage Preferences
            </button>
          </div>
        </section>
      )}
      <PreferencesModal />
    </>
  )
}
