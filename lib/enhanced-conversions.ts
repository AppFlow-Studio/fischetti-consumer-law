/**
 * Enhanced Conversions helper functions for Google Ads via GTM
 * Formats user data and pushes to dataLayer in standardized format
 */

import { formatPhoneToE164 } from './phone-formatter'

export interface EnhancedConversionsData {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    zip?: string
}

/**
 * Formats user data for GTM Enhanced Conversions
 * Normalizes email (lowercase, trim), phone (E.164), names (trim), ZIP (trim)
 * Always includes country: "US"
 */
export function formatUserDataForGTM(data: EnhancedConversionsData) {
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

/**
 * Pushes enhanced conversion data to dataLayer
 * Should be called on successful form submission (not on attempt)
 */
export function pushEnhancedConversion(
    formName: string,
    userData: EnhancedConversionsData
) {
    if (typeof window === 'undefined') return
    
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
        event: "lead_form_submit",
        form_name: formName,
        page_path: window.location.pathname,
        method: "web_form",
        user_data: formatUserDataForGTM(userData)
    })
}
