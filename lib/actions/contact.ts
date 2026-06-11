"use server"

import { Resend } from "resend"
import { headers } from "next/headers"
import { contactSchema, type ContactFormData } from "@/components/forms/contact-schema"
import { formatUserDataForGTM } from "@/lib/enhanced-conversions"
import { PRIMARY_PHONE } from "@/lib/site"
import { logLead } from "@/lib/logLead"
import { ClientQualificationEmail } from "@/emails/client-qualification"
import { OfficeNotificationEmail } from "@/emails/office-notification"
import { detectLawType, generateCaseRef, calculateDeadline, getLawTypeLabel, type LawType } from "@/lib/email-utils"
import { createElement } from "react"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = "Consumer Law Florida <info@consumerlawflorida.com>"
const OFFICE_EMAIL = "info@consumerlawflorida.com"

export type ContactFormResult = {
    success: boolean
    message: string
    enhancedConversionData?: ReturnType<typeof formatUserDataForGTM>
    blocked?: boolean
    redirect?: string
}

/**
 * Check if the request is from an allowed country
 */
async function isRequestAllowed(): Promise<{ allowed: boolean; country: string | null }> {
    // Bypass in development
    if (process.env.NODE_ENV === "development") {
        return { allowed: true, country: "US" }
    }

    const headersList = await headers()
    const country = headersList.get("x-vercel-ip-country")
    
    // Only allow US
    const allowed = country?.toUpperCase() === "US"
    return { allowed, country }
}

/**
 * Format date for email display
 */
function formatSubmissionDate(): string {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
        timeZone: "America/New_York",
    }).format(new Date())
}

/**
 * Server action for contact form submission
 * - Validates form data
 * - Checks geo-blocking
 * - Sends confirmation email to client
 * - Sends notification email to office
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactFormResult> {
    try {
        // Geo-blocking check
        const { allowed, country } = await isRequestAllowed()
        if (!allowed) {
            console.log(`Blocked form submission from country: ${country}`)
            return {
                success: false,
                message: "Service unavailable in your region",
                blocked: true,
                redirect: "/unavailable",
            }
        }

        // Validate form data
        const validationResult = contactSchema.safeParse(data)
        if (!validationResult.success) {
            return {
                success: false,
                message: "Invalid form data. Please check your inputs.",
            }
        }

        const formData = validationResult.data
        const submittedAt = formatSubmissionDate()

        // Determine law type and generate intake reference / deadline for qualification email
        const lawType = detectLawType(formData.caseType)
        const caseRef = generateCaseRef()
        const deadlineDate = calculateDeadline(5)
        const lawLabel = getLawTypeLabel(lawType)

        function getClientEmailSubject(lt: LawType): string {
            switch (lt) {
                case "FCRA": return "Your FCRA Case Checklist — Documents to Gather"
                case "FDCPA": return "Your FDCPA Case Checklist — Evidence to Collect"
                case "TCPA": return "Your TCPA Case Checklist — What to Save Now"
                default: return `Your ${lawLabel} Case Checklist`
            }
        }

        // Send both emails concurrently
        const [clientEmailResult, officeEmailResult] = await Promise.allSettled([
            // Law-specific qualification email — filters serious leads post-submit
            resend.emails.send({
                from: FROM_EMAIL,
                to: formData.email,
                subject: getClientEmailSubject(lawType),
                react: createElement(ClientQualificationEmail, {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    lawType,
                    caseRef,
                    deadlineDate,
                    submittedAt,
                }),
            }),
            // Office notification email
            resend.emails.send({
                from: FROM_EMAIL,
                to: OFFICE_EMAIL,
                replyTo: formData.email,
                subject: `🆕 New Case Review: ${formData.firstName} ${formData.lastName} - ${formData.caseType}`,
                react: createElement(OfficeNotificationEmail, {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    zip: formData.zip,
                    caseType: formData.caseType,
                    callerIdentification: formData.callerIdentification,
                    urgency: formData.urgency,
                    description: formData.description,
                    submittedAt,
                }),
            }),
        ])

        // Log results for debugging
        if (clientEmailResult.status === "rejected") {
            console.error("Failed to send client confirmation email:", clientEmailResult.reason)
        }
        if (officeEmailResult.status === "rejected") {
            console.error("Failed to send office notification email:", officeEmailResult.reason)
        }

        // Check if at least one email was sent successfully
        const clientSuccess = clientEmailResult.status === "fulfilled" && !clientEmailResult.value.error
        const officeSuccess = officeEmailResult.status === "fulfilled" && !officeEmailResult.value.error

        if (!clientSuccess && !officeSuccess) {
            console.error("Both emails failed to send")
            return {
                success: false,
                message: "Failed to send emails. Please try again or call us directly.",
            }
        }

        // Log successful submission
        console.log("Contact form submitted successfully:", {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            caseType: formData.caseType,
            urgency: formData.urgency,
            clientEmailSent: clientSuccess,
            officeEmailSent: officeSuccess,
        })

        // Format data for enhanced conversions
        const enhancedConversionData = formatUserDataForGTM({
            email: formData.email,
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            zip: formData.zip,
        })

        // Log lead to Supabase — wrapped in try/catch inside logLead, never throws
        await logLead({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            zip: formData.zip,
            case_type: formData.caseType,
            caller_identification: formData.callerIdentification,
            description: formData.description,
            urgency: formData.urgency,
            form_source: formData.form_source || "free-case-review",
            gclid: formData.gclid,
            utm_source: formData.utm_source,
            utm_medium: formData.utm_medium,
            utm_campaign: formData.utm_campaign,
            utm_term: formData.utm_term,
            utm_content: formData.utm_content,
            email_sent: clientSuccess || officeSuccess,
        })

        return {
            success: true,
            message: "Thank you! Your case review request has been submitted successfully.",
            enhancedConversionData,
        }
    } catch (error) {
        console.error("Error processing contact form:", error)
        return {
            success: false,
            message: `An unexpected error occurred. Please try again or call us directly at ${PRIMARY_PHONE}.`,
        }
    }
}
