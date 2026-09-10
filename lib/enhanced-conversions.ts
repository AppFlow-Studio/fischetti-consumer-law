import { formatPhoneToE164 } from './phone-formatter'
import { hasConsentFor } from './consent'

export interface EnhancedConversionsData {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    zip?: string
}

export interface HashedEnhancedConversionsData {
    sha256_email_address?: string
    sha256_phone_number?: string
    address?: {
        sha256_first_name?: string
        sha256_last_name?: string
        postal_code?: string
        country: "US"
    }
}

function normalizeEnhancedConversionData(data: EnhancedConversionsData) {
    return {
        email: (data.email || '').trim().toLowerCase(),
        phone_number: data.phone ? formatPhoneToE164(data.phone) : '',
        address: {
            first_name: (data.firstName || '').trim(),
            last_name: (data.lastName || '').trim(),
            postal_code: (data.zip || '').trim(),
            country: "US"
        }
    }
}

async function sha256(value: string): Promise<string | undefined> {
    if (!value || typeof window === 'undefined' || !window.crypto?.subtle) return undefined

    const encoded = new TextEncoder().encode(value)
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', encoded)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function hashEnhancedConversionData(
    data: EnhancedConversionsData
): Promise<HashedEnhancedConversionsData> {
    const normalized = normalizeEnhancedConversionData(data)

    return {
        sha256_email_address: await sha256(normalized.email),
        sha256_phone_number: await sha256(normalized.phone_number),
        address: {
            sha256_first_name: await sha256(normalized.address.first_name.toLowerCase()),
            sha256_last_name: await sha256(normalized.address.last_name.toLowerCase()),
            postal_code: normalized.address.postal_code,
            country: "US",
        },
    }
}

export function pushEnhancedConversion(
    formName: string,
    userData: EnhancedConversionsData
) {
    if (typeof window === 'undefined') return

    if (!hasConsentFor("marketing")) return

    void hashEnhancedConversionData(userData).then((hashedUserData) => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
            event: "lead_form_submit",
            form_name: formName,
            page_path: window.location.pathname,
            method: "web_form",
            user_data: hashedUserData
        })
    })
}
