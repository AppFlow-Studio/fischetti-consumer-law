'use client'

const ATTRIBUTION_STORAGE_KEY = 'clf_attribution_v1'
const ATTRIBUTION_TTL_DAYS = 90

const ATTRIBUTION_KEYS = [
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

type AttributionKey = (typeof ATTRIBUTION_KEYS)[number]

export type TouchAttribution = Partial<Record<AttributionKey, string>> & {
  landing_page?: string
  referrer?: string
  captured_at: string
}

type StoredAttribution = {
  version: 1
  expires_at: string
  first_touch?: TouchAttribution
  last_touch?: TouchAttribution
}

function safeGetStoredAttribution(): StoredAttribution | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!raw) return null
    const stored = JSON.parse(raw) as StoredAttribution
    if (stored.version !== 1) return null
    if (new Date(stored.expires_at).getTime() < Date.now()) {
      window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY)
      return null
    }
    return stored
  } catch {
    return null
  }
}

function safeSetStoredAttribution(value: StoredAttribution): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Attribution is helpful for intake quality, but forms must never depend on storage.
  }
}

function buildTouch(params: URLSearchParams): TouchAttribution | null {
  const touch: TouchAttribution = {
    landing_page: window.location.href,
    referrer: document.referrer || undefined,
    captured_at: new Date().toISOString(),
  }

  let hasAttributionParam = false
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)
    if (value) {
      touch[key] = value.slice(0, 500)
      hasAttributionParam = true
    }
  }

  return hasAttributionParam ? touch : null
}

export function captureAttribution(): void {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  const touch = buildTouch(params)
  if (!touch) return

  const existing = safeGetStoredAttribution()
  const expiresAt = new Date(Date.now() + ATTRIBUTION_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString()

  safeSetStoredAttribution({
    version: 1,
    expires_at: expiresAt,
    first_touch: existing?.first_touch || touch,
    last_touch: touch,
  })
}

export function captureGclid(): void {
  captureAttribution()
}

export function getAttributionData(): {
  gclid: string
  gbraid: string
  wbraid: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
} {
  if (typeof window === 'undefined') {
    return {
      gclid: '',
      gbraid: '',
      wbraid: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
    }
  }
  const attribution = safeGetStoredAttribution()?.last_touch

  return {
    gclid: attribution?.gclid || '',
    gbraid: attribution?.gbraid || '',
    wbraid: attribution?.wbraid || '',
    utm_source: attribution?.utm_source || '',
    utm_medium: attribution?.utm_medium || '',
    utm_campaign: attribution?.utm_campaign || '',
    utm_term: attribution?.utm_term || '',
    utm_content: attribution?.utm_content || '',
  }
}
