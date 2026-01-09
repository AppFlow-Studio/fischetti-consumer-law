/**
 * Type declarations for Google Tag Manager dataLayer
 */

interface DataLayerEvent {
    event: string
    [key: string]: unknown
}

declare global {
    interface Window {
        dataLayer: DataLayerEvent[]
    }
}

export {}
