import { NextRequest, NextResponse } from "next/server"
import { getRequestCountry, isAllowedCountry, shouldBypassGeoBlock } from "@/lib/geo"
import { formatUserDataForGTM } from "@/lib/enhanced-conversions"
import type { ContactFormData } from "@/components/forms/contact-schema"
import { logLead } from "@/lib/logLead"

/**
 * POST handler for contact form submissions
 * Implements geo-blocking for non-US submissions
 * Handles both multipart form data and JSON submissions
 */
export async function POST(req: NextRequest) {
    try {
        // Geo-blocking check
        if (!shouldBypassGeoBlock()) {
            const country = getRequestCountry(req)
            if (!isAllowedCountry(country)) {
                // Check if this is a JSON request (AJAX) or form POST
                const contentType = req.headers.get("content-type") || ""
                const isJsonRequest = contentType.includes("application/json")

                if (isJsonRequest) {
                    return NextResponse.json(
                        { blocked: true, redirect: "/unavailable" },
                        { status: 403, headers: { "x-geo-blocked": "1" } }
                    )
                } else {
                    // Form POST - redirect to unavailable page
                    return NextResponse.redirect(new URL("/unavailable", req.url), { status: 307 })
                }
            }
        }

        // Parse request body
        const contentType = req.headers.get("content-type") || ""
        let formData: ContactFormData

        if (contentType.includes("application/json")) {
            // JSON submission
            const body = await req.json()
            formData = body
        } else {
            // Multipart form data
            const formDataObj = await req.formData()
            formData = {
                firstName: formDataObj.get("firstName") as string,
                lastName: formDataObj.get("lastName") as string,
                email: formDataObj.get("email") as string,
                phone: formDataObj.get("phone") as string,
                zip: formDataObj.get("zip") as string,
                caseType: formDataObj.get("caseType") as string,
                description: formDataObj.get("description") as string,
                urgency: formDataObj.get("urgency") as string,
                gclid: (formDataObj.get("gclid") as string) || undefined,
                utm_source: (formDataObj.get("utm_source") as string) || undefined,
                utm_medium: (formDataObj.get("utm_medium") as string) || undefined,
                utm_campaign: (formDataObj.get("utm_campaign") as string) || undefined,
                utm_term: (formDataObj.get("utm_term") as string) || undefined,
                utm_content: (formDataObj.get("utm_content") as string) || undefined,
                form_source: (formDataObj.get("form_source") as string) || undefined,
            }
        }

        // Log submission (preserve existing behavior)
        console.log("Contact form submitted:", formData)

        // Format data for enhanced conversions (server-side)
        // Note: pushEnhancedConversion is client-side only, so we'll format here
        // but the actual push happens client-side after successful submission
        const enhancedConversionData = formatUserDataForGTM({
            email: formData.email,
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            zip: formData.zip,
        })

        // Here you would typically:
        // 1. Save to database
        // 2. Send email notification
        // 3. Integrate with CRM
        // For now, we just log and return success

        // Log lead to Supabase — never throws, errors are logged internally
        await logLead({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            zip: formData.zip,
            case_type: formData.caseType,
            description: formData.description,
            urgency: formData.urgency,
            form_source: formData.form_source || "free-case-review",
            gclid: formData.gclid,
            utm_source: formData.utm_source,
            utm_medium: formData.utm_medium,
            utm_campaign: formData.utm_campaign,
            utm_term: formData.utm_term,
            utm_content: formData.utm_content,
            email_sent: false,
        })

        // Return success response
        return NextResponse.json(
            {
                success: true,
                message: "Form submitted successfully",
                // Include formatted data for client-side enhanced conversions
                enhancedConversionData,
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

