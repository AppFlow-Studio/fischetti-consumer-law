import * as z from "zod"

export const UNLISTED_CASE_TYPE = "My issue is not listed"

export const CASE_TYPE_OPTIONS = [
    "FCRA — Credit Report Errors",
    "FCRA — Background Check Errors",
    "FDCPA — Debt Collector Harassment",
    "FDCPA — Illegal Threats or Calls",
    "TCPA — Robocall Violations",
    "TCPA — Spam Text Violations",
    UNLISTED_CASE_TYPE,
] as const

export const CONTACT_SOURCE_OPTIONS = [
    "Yes, I know the company name",
    "I have a phone number, text screenshots, voicemail, letter, or caller ID",
    "No / I'm not sure",
] as const

export const CONTACT_SOURCE_UNKNOWN = CONTACT_SOURCE_OPTIONS[2]

const CONTACT_SOURCE_CASE_TYPES = new Set<string>([
    "FDCPA — Debt Collector Harassment",
    "FDCPA — Illegal Threats or Calls",
    "TCPA — Robocall Violations",
    "TCPA — Spam Text Violations",
])

export function requiresContactSource(caseType: string): boolean {
    return CONTACT_SOURCE_CASE_TYPES.has(caseType)
}

export const DESCRIPTION_MIN_LENGTH = 50
export const DESCRIPTION_ERROR_MESSAGE =
    "Please add a little more detail so we can review your case. Include what happened, who contacted you or reported the error, and when it happened."

const JUNK_ONLY_DESCRIPTIONS = new Set([
    "test",
    "testing",
    "asdf",
    "qwerty",
    "n/a",
    "na",
    "none",
    "help",
])

export const UNLISTED_CASE_NOTICE =
    "We may not be the right firm for this issue. We currently focus on credit report errors, debt collector harassment, robocalls, and spam texts. If your issue is unrelated, please do not submit this form."

export const UNLISTED_CASE_ACKNOWLEDGMENT =
    "I understand this firm only reviews FCRA, FDCPA, and TCPA consumer protection matters."

// Contact form schema - agreeToTerms is always true (implicit consent via form submission text)
export const contactSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    zip: z.string()
        .min(5, "ZIP code must be at least 5 digits")
        .max(10, "ZIP code must be 10 characters or less")
        .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)"),
    caseType: z.string()
        .min(1, "Please select a case type")
        .refine(
            (value) => CASE_TYPE_OPTIONS.includes(value as (typeof CASE_TYPE_OPTIONS)[number]),
            "Please select a valid case type",
        ),
    callerIdentification: z.string().optional(),
    description: z.string()
        .trim()
        .min(DESCRIPTION_MIN_LENGTH, DESCRIPTION_ERROR_MESSAGE)
        .refine(
            (value) => !JUNK_ONLY_DESCRIPTIONS.has(value.toLowerCase()),
            DESCRIPTION_ERROR_MESSAGE,
        ),
    urgency: z.string().min(1, "Please select urgency level"),
    // Always true - consent is given by submitting the form (stated in form text)
    agreeToTerms: z.boolean(),
    outsidePracticeAcknowledged: z.boolean(),
    // Attribution fields — optional, captured from URL params / sessionStorage
    gclid: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_term: z.string().optional(),
    utm_content: z.string().optional(),
    form_source: z.string().optional(),
}).superRefine((data, ctx) => {
    if (requiresContactSource(data.caseType)) {
        if (!data.callerIdentification) {
            ctx.addIssue({
                code: "custom",
                path: ["callerIdentification"],
                message: "Please select the option that best matches what you know.",
            })
        } else if (!CONTACT_SOURCE_OPTIONS.includes(
            data.callerIdentification as (typeof CONTACT_SOURCE_OPTIONS)[number],
        )) {
            ctx.addIssue({
                code: "custom",
                path: ["callerIdentification"],
                message: "Please select a valid option.",
            })
        }
    }

    if (data.caseType === UNLISTED_CASE_TYPE && !data.outsidePracticeAcknowledged) {
        ctx.addIssue({
            code: "custom",
            path: ["outsidePracticeAcknowledged"],
            message: "Please acknowledge the firm's practice-area limits before submitting.",
        })
    }
})

export type ContactFormData = z.infer<typeof contactSchema>

export const defaultContactValues: ContactFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zip: "",
    caseType: "",
    callerIdentification: "",
    description: "",
    urgency: "",
    agreeToTerms: true, // Implicit consent via form submission text
    outsidePracticeAcknowledged: false,
}

export const caseTypes = CASE_TYPE_OPTIONS

export const urgencyLevels = [
    "Immediate - Need help now",
    "Urgent - Within a week",
    "Moderate - Within a month",
    "Not urgent - Just exploring options",
]

// ---------------------------------------------------------------------------
// Case-type guidance — single source of truth for dynamic form copy.
// Edit placeholder, helperText, or caseTypeTip here; the form picks it up.
// ---------------------------------------------------------------------------

export type CaseTypeGuidance = {
    /** Textarea placeholder shown when this case type is selected. */
    placeholder: string
    /** Helper text shown below the textarea — steers users toward useful facts. */
    helperText: string
    /** One-liner shown under the Case Type dropdown — brief law-family label. */
    caseTypeTip: string
}

export const caseTypeGuidanceMap: Readonly<Record<string, CaseTypeGuidance>> = {
    "FCRA — Credit Report Errors": {
        placeholder:
            "Describe the credit report error, which bureau it appeared on (Equifax, Experian, or TransUnion), whether you disputed it already, and any response you received.",
        helperText: "Include the bureau name, dispute status, and any bureau response.",
        caseTypeTip: "Credit report or background check errors",
    },
    "FCRA — Background Check Errors": {
        placeholder:
            "Describe the background check error, who ran the report (employer or screening company), what was inaccurate, and how it affected your job or opportunity.",
        helperText: "Include who ran the report, what was wrong, and the impact.",
        caseTypeTip: "Credit report or background check errors",
    },
    "FDCPA — Debt Collector Harassment": {
        placeholder:
            "Example: A debt collector keeps calling me at work after I told them to stop. The calls started about two weeks ago.",
        helperText: "Include the company name if you know it, what happened, and when it started.",
        caseTypeTip: "Debt collector harassment or illegal threats",
    },
    "FDCPA — Illegal Threats or Calls": {
        placeholder:
            "Example: A collector threatened legal action and keeps calling after I asked them to stop. The calls started last month.",
        helperText: "Include the company name if you know it, what happened, and when it started.",
        caseTypeTip: "Debt collector harassment or illegal threats",
    },
    "TCPA — Robocall Violations": {
        placeholder:
            "Example: I receive prerecorded health insurance calls several times a week, even though I never asked for a quote.",
        helperText: "Include the company name if you know it, what happened, and when it started.",
        caseTypeTip: "Robocalls or spam texts",
    },
    "TCPA — Spam Text Violations": {
        placeholder:
            "Example: I replied STOP to health insurance texts, but the company kept texting me from the same number for two weeks.",
        helperText: "Include the company name if you know it, what happened, and when it started.",
        caseTypeTip: "Robocalls or spam texts",
    },
    [UNLISTED_CASE_TYPE]: {
        placeholder:
            "Briefly describe what happened, who was involved, how they contacted you, and the main issue you want reviewed.",
        helperText: "Include the company name if known and the main issue.",
        caseTypeTip: "",
    },
}

export const defaultCaseTypeGuidance: CaseTypeGuidance = {
    placeholder:
        "Describe your situation in a few sentences. Include the company name if you know it, how they contacted you, and the main problem.",
    helperText: "Include the company name if you know it and the main issue.",
    caseTypeTip: "",
}
