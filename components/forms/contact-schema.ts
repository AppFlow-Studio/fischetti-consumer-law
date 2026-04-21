import * as z from "zod"

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
    caseType: z.string().min(1, "Please select a case type"),
    description: z.string().min(10, "Please provide more details about your case"),
    urgency: z.string().min(1, "Please select urgency level"),
    // Always true - consent is given by submitting the form (stated in form text)
    agreeToTerms: z.boolean(),
    // Attribution fields — optional, captured from URL params / sessionStorage
    gclid: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_term: z.string().optional(),
    utm_content: z.string().optional(),
    form_source: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export const defaultContactValues: ContactFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zip: "",
    caseType: "",
    description: "",
    urgency: "",
    agreeToTerms: true, // Implicit consent via form submission text
}

export const caseTypes = [
    "FCRA — Credit Report Errors",
    "FCRA — Background Check Errors",
    "FDCPA — Debt Collector Harassment",
    "FDCPA — Illegal Threats or Calls",
    "TCPA — Robocall Violations",
    "TCPA — Spam Text Violations",
    "Other",
]

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
            "Tell us the debt collector or company name, the number they used, what they did, and how they contacted you.",
        helperText: "Include the company name, number they used, and what happened.",
        caseTypeTip: "Debt collector harassment or illegal threats",
    },
    "FDCPA — Illegal Threats or Calls": {
        placeholder:
            "Describe the collector or company name, the number they used, what threats were made, and when or how they contacted you.",
        helperText: "Include the company name, number used, and the specific threats made.",
        caseTypeTip: "Debt collector harassment or illegal threats",
    },
    "TCPA — Robocall Violations": {
        placeholder:
            "Tell us the company or caller name, whether your number is on the Do Not Call Registry, and what happened during the robocalls.",
        helperText: "Include the company name and your Do Not Call Registry status.",
        caseTypeTip: "Robocalls or spam texts",
    },
    "TCPA — Spam Text Violations": {
        placeholder:
            "Tell us the company name, whether your number is on the Do Not Call Registry, whether you replied STOP, and what happened after that.",
        helperText: "Include the company name, your DNC status, and whether texts continued after replying STOP.",
        caseTypeTip: "Robocalls or spam texts",
    },
    Other: {
        placeholder:
            "Briefly describe what happened, who was involved, how they contacted you, and the main issue you want reviewed.",
        helperText: "Include the company name if known and the main issue.",
        caseTypeTip: "Tell us the issue you want reviewed",
    },
}

export const defaultCaseTypeGuidance: CaseTypeGuidance = {
    placeholder:
        "Describe your situation in a few sentences. Include the company name if you know it, how they contacted you, and the main problem.",
    helperText: "Include the company name if you know it and the main issue.",
    caseTypeTip: "",
}
