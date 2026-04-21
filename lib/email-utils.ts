/**
 * Email utilities for the post-submit qualification email system.
 *
 * Law type detection maps the form's caseType string (from contact-schema.ts)
 * to one of the three active practice areas: FCRA, FDCPA, TCPA.
 * All downstream email rendering and copy branches from this single enum.
 */

export type LawType = "FCRA" | "FDCPA" | "TCPA" | "OTHER"

/**
 * Maps a caseType string value (as defined in contact-schema.ts caseTypes[])
 * to the corresponding active law type. Prefix matching is intentional —
 * it handles all sub-variants ("FCRA — Credit Report Errors",
 * "FCRA — Background Check Errors", etc.) with a single check per law.
 */
export function detectLawType(caseType: string): LawType {
    const upper = caseType.toUpperCase().trim()
    if (upper.startsWith("FCRA")) return "FCRA"
    if (upper.startsWith("FDCPA")) return "FDCPA"
    if (upper.startsWith("TCPA")) return "TCPA"
    return "OTHER"
}

/**
 * Generates a short intake reference number in the format CLF-XXXXXXXX.
 * Uses crypto.randomUUID() where available (Node 19+, modern runtimes),
 * falling back to Math.random() for older environments.
 */
export function generateCaseRef(): string {
    let hex: string
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        hex = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()
    } else {
        hex = Math.floor(Math.random() * 0xffffffff)
            .toString(16)
            .padStart(8, "0")
            .toUpperCase()
    }
    return `CLF-${hex}`
}

/**
 * Calculates a deadline date N business days from now (skipping Sat/Sun),
 * returned as a human-readable string like "Friday, April 25, 2026".
 *
 * Uses America/New_York timezone — consistent with the firm's location
 * and the submission date formatter already in contact.ts.
 */
export function calculateDeadline(businessDays: number): string {
    const date = new Date()
    let remaining = businessDays

    while (remaining > 0) {
        date.setDate(date.getDate() + 1)
        const dayOfWeek = date.getDay() // 0 = Sun, 6 = Sat
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            remaining--
        }
    }

    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "America/New_York",
    }).format(date)
}

/**
 * Returns the display label for a given law type, used in email subject
 * lines and body copy.
 */
export function getLawTypeLabel(lawType: LawType): string {
    switch (lawType) {
        case "FCRA":
            return "FCRA (Credit Reporting)"
        case "FDCPA":
            return "FDCPA (Debt Collection)"
        case "TCPA":
            return "TCPA (Robocall / Spam Text)"
        default:
            return "Consumer Law"
    }
}

/**
 * Returns the accent color used in qualification email UI elements
 * for each law type. All colors remain within the brand's palette.
 */
export function getLawTypeAccent(lawType: LawType): string {
    switch (lawType) {
        case "FCRA":
            return "#1265eb" // brand blue — document/credit
        case "FDCPA":
            return "#0891b2" // cyan — collector/behavior
        case "TCPA":
            return "#dc2626" // red — strictest gate / DNC warning
        default:
            return "#475569" // neutral slate
    }
}
