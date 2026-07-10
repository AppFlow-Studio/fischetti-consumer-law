import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createElement } from "react"
import { getRequestCountry, isAllowedCountry, shouldBypassGeoBlock } from "@/lib/geo"
import { contactSchema, type ContactFormData } from "@/components/forms/contact-schema"
import { logLead } from "@/lib/logLead"
import { ClientQualificationEmail } from "@/emails/client-qualification"
import { OfficeNotificationEmail } from "@/emails/office-notification"
import { detectLawType, generateCaseRef, calculateDeadline, getLawTypeLabel } from "@/lib/email-utils"

const FROM_EMAIL = "Consumer Law Florida <info@consumerlawflorida.com>"
const OFFICE_EMAIL = "info@consumerlawflorida.com"

// Format submission date for email display
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
 * POST handler for contact form submissions.
 * Implements geo-blocking, parses JSON or multipart payloads,
 * sends law-specific qualification email to the lead and a notification
 * to the office via Resend, then logs the lead to Supabase.
 */
export async function POST(req: NextRequest) {
    try {
        // Geo-blocking check
        if (!shouldBypassGeoBlock()) {
            const country = getRequestCountry(req)
            if (!isAllowedCountry(country)) {
                const contentType = req.headers.get("content-type") || ""
                if (contentType.includes("application/json")) {
                    return NextResponse.json(
                        { blocked: true, redirect: "/unavailable" },
                        { status: 403, headers: { "x-geo-blocked": "1" } }
                    )
                }
                return NextResponse.redirect(new URL("/unavailable", req.url), { status: 307 })
            }
        }

        // Parse request body — supports both JSON (AJAX) and multipart (native form POST)
        const contentType = req.headers.get("content-type") || ""
        let formData: ContactFormData

        if (contentType.includes("application/json")) {
            formData = await req.json()
        } else {
            const formDataObj = await req.formData()
            formData = {
                firstName: formDataObj.get("firstName") as string,
                lastName: formDataObj.get("lastName") as string,
                email: formDataObj.get("email") as string,
                phone: formDataObj.get("phone") as string,
                zip: formDataObj.get("zip") as string,
                caseType: formDataObj.get("caseType") as string,
                callerIdentification: (formDataObj.get("callerIdentification") as string) || undefined,
                description: formDataObj.get("description") as string,
                urgency: formDataObj.get("urgency") as string,
                gclid: (formDataObj.get("gclid") as string) || undefined,
                agreeToTerms: formDataObj.get("agreeToTerms") === "true",
                outsidePracticeAcknowledged: formDataObj.get("outsidePracticeAcknowledged") === "true",
                utm_source: (formDataObj.get("utm_source") as string) || undefined,
                utm_medium: (formDataObj.get("utm_medium") as string) || undefined,
                utm_campaign: (formDataObj.get("utm_campaign") as string) || undefined,
                utm_term: (formDataObj.get("utm_term") as string) || undefined,
                utm_content: (formDataObj.get("utm_content") as string) || undefined,
                form_source: (formDataObj.get("form_source") as string) || undefined,
            }
        }

        const validationResult = contactSchema.safeParse(formData)
        if (!validationResult.success) {
            return NextResponse.json(
                { success: false, message: "Invalid form data. Please check your inputs." },
                { status: 400 }
            )
        }
        formData = validationResult.data

        console.log("Contact form submitted:", {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            caseType: formData.caseType,
        })

        // Derive email variables from submission
        const submittedAt = formatSubmissionDate()
        const lawType = detectLawType(formData.caseType)
        const caseRef = generateCaseRef()
        const deadlineDate = calculateDeadline(5)
        const lawLabel = getLawTypeLabel(lawType)

        // Lazily instantiate Resend so a missing key in dev doesn't crash at module load
        const resend = new Resend(process.env.RESEND_API_KEY)

        // Send both emails concurrently
        const [clientEmailResult, officeEmailResult] = await Promise.allSettled([
            // Law-specific qualification email to the lead
            resend.emails.send({
                from: FROM_EMAIL,
                to: formData.email,
                subject: `Action Required — Your ${lawLabel} Case Review`,
                react: createElement(ClientQualificationEmail, {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    lawType,
                    caseRef,
                    deadlineDate,
                    submittedAt,
                }),
            }),
            // Internal notification to the office
            resend.emails.send({
                from: FROM_EMAIL,
                to: OFFICE_EMAIL,
                replyTo: formData.email,
                subject: `🆕 New Case Review: ${formData.firstName} ${formData.lastName} — ${formData.caseType}`,
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

        if (clientEmailResult.status === "rejected") {
            console.error("Failed to send client qualification email:", clientEmailResult.reason)
        }
        if (officeEmailResult.status === "rejected") {
            console.error("Failed to send office notification email:", officeEmailResult.reason)
        }

        const clientSuccess = clientEmailResult.status === "fulfilled" && !clientEmailResult.value.error
        const officeSuccess = officeEmailResult.status === "fulfilled" && !officeEmailResult.value.error

        // Log lead to Supabase — never throws, errors are logged internally
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
            form_source: formData.form_source || "contact-api",
            gclid: formData.gclid,
            utm_source: formData.utm_source,
            utm_medium: formData.utm_medium,
            utm_campaign: formData.utm_campaign,
            utm_term: formData.utm_term,
            utm_content: formData.utm_content,
            email_sent: clientSuccess || officeSuccess,
        })

        return NextResponse.json(
            {
                success: true,
                message: "Form submitted successfully",
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error processing form submission:", error)
        return NextResponse.json(
            { success: false, message: "An error occurred while processing your submission" },
            { status: 500 }
        )
    }
}
