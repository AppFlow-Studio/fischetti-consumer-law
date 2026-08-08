"use client"

import { useEffect } from "react"
import { GTM_ID } from "@/lib/site"
import { useConsent } from "@/components/consent/ConsentProvider"

declare global {
  interface Window {
    __clfGtmLoaded?: boolean
  }
}

function loadGtm() {
  if (typeof window === "undefined" || window.__clfGtmLoaded) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" })

  const firstScript = document.getElementsByTagName("script")[0]
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  firstScript?.parentNode?.insertBefore(script, firstScript)
  window.__clfGtmLoaded = true
}

export default function TrackingScripts() {
  const { isReady } = useConsent()

  useEffect(() => {
    if (!isReady) return
    loadGtm()
  }, [isReady])

  return null
}
