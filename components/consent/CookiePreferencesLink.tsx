"use client"

import { useConsent } from "@/components/consent/ConsentProvider"

export default function CookiePreferencesLink({ className }: { className?: string }) {
  const { openPreferences } = useConsent()

  return (
    <button type="button" onClick={openPreferences} className={className}>
      Cookie Preferences
    </button>
  )
}
