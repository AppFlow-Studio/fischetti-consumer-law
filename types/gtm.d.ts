/**
 * Type declarations for Google Tag Manager dataLayer
 */

interface DataLayerEvent {
    event: string
    [key: string]: unknown
}

declare global {
    interface Window {
        dataLayer: Array<DataLayerEvent | IArguments | unknown[]>
        gtag?: (...args: unknown[]) => void
        __clfConsent?: unknown
        __clfGtmLoaded?: boolean
    }
}

export {}
