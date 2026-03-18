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
    "FCRA Violations",
    "FDCPA Defense",
    "TCPA Violations",
    "Privacy & Data Breach",
    "VPPA Violations",
    "Fair Housing Act",
    "Mass Arbitration",
    "Other",
]

export const urgencyLevels = [
    "Immediate - Need help now",
    "Urgent - Within a week",
    "Moderate - Within a month",
    "Not urgent - Just exploring options",
]
