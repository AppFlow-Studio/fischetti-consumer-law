/**
 * Geo-blocking utilities for form submissions
 * Checks if requests are from allowed countries (US only by default)
 */

import { NextRequest } from "next/server"

/**
 * Extracts country code from request headers
 * Vercel provides country via x-vercel-ip-country header
 */
export function getRequestCountry(req: Request | NextRequest): string | null {
    if (req instanceof NextRequest) {
        return req.headers.get("x-vercel-ip-country")
    }
    
    // For standard Request objects
    const headers = new Headers(req.headers)
    return headers.get("x-vercel-ip-country")
}

/**
 * Checks if a country code is allowed for form submissions
 * Default: US only
 */
export function isAllowedCountry(country: string | null): boolean {
    if (!country) return false
    
    const allowedCountries = ["US"] // US only
    return allowedCountries.includes(country.toUpperCase())
}

/**
 * Determines if geo-blocking should be bypassed
 * Bypasses in development environment for local testing
 */
export function shouldBypassGeoBlock(): boolean {
    return process.env.NODE_ENV === "development"
}

