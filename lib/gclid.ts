'use client'

export function captureGclid(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const gclid = params.get('gclid')
  if (gclid) sessionStorage.setItem('gclid', gclid)
  ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
    const val = params.get(key)
    if (val) sessionStorage.setItem(key, val)
  })
}

export function getAttributionData(): {
  gclid: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
} {
  if (typeof window === 'undefined') {
    return {
      gclid: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
    }
  }
  return {
    gclid: sessionStorage.getItem('gclid') || '',
    utm_source: sessionStorage.getItem('utm_source') || '',
    utm_medium: sessionStorage.getItem('utm_medium') || '',
    utm_campaign: sessionStorage.getItem('utm_campaign') || '',
    utm_term: sessionStorage.getItem('utm_term') || '',
    utm_content: sessionStorage.getItem('utm_content') || '',
  }
}
