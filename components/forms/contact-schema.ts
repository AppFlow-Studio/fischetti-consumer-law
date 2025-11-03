"use client"

import * as z from "zod"

export const contactSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    caseType: z.string().min(1, "Please select a case type"),
    description: z.string().min(10, "Please provide more details about your case"),
    urgency: z.string().min(1, "Please select urgency level"),
    agreeToTerms: z.boolean().refine((v) => v === true, "You must agree to the terms"),
})

export type ContactFormData = z.infer<typeof contactSchema>

export const defaultContactValues: ContactFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    caseType: "",
    description: "",
    urgency: "",
    agreeToTerms: false,
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


