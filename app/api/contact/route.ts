import { randomUUID } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { getRequestCountry, isAllowedCountry, shouldBypassGeoBlock } from "@/lib/geo"
import { contactSchema, type ContactFormData } from "@/components/forms/contact-schema"
import { processContactSubmission } from "@/lib/process-contact-submission"

function hasValidOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin")
  if (!origin) return true

  try {
    return new URL(origin).host === req.nextUrl.host
  } catch {
    return false
  }
}

async function parseRequest(req: NextRequest): Promise<ContactFormData> {
  const contentType = req.headers.get("content-type") || ""
  if (contentType.includes("application/json")) return req.json()

  const formData = await req.formData()
  return {
    firstName: String(formData.get("firstName") || ""),
    lastName: String(formData.get("lastName") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    zip: String(formData.get("zip") || ""),
    caseType: String(formData.get("caseType") || ""),
    callerIdentification: String(formData.get("callerIdentification") || ""),
    contactingCompany: String(formData.get("contactingCompany") || ""),
    description: String(formData.get("description") || ""),
    urgency: String(formData.get("urgency") || ""),
    agreeToTerms: formData.get("agreeToTerms") === "true",
    outsidePracticeAcknowledged: formData.get("outsidePracticeAcknowledged") === "true",
    submission_id: String(formData.get("submission_id") || "") || undefined,
    gclid: String(formData.get("gclid") || ""),
    gbraid: String(formData.get("gbraid") || ""),
    wbraid: String(formData.get("wbraid") || ""),
    utm_source: String(formData.get("utm_source") || ""),
    utm_medium: String(formData.get("utm_medium") || ""),
    utm_campaign: String(formData.get("utm_campaign") || ""),
    utm_term: String(formData.get("utm_term") || ""),
    utm_content: String(formData.get("utm_content") || ""),
    form_source: String(formData.get("form_source") || ""),
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!hasValidOrigin(req)) {
      return NextResponse.json({ success: false, message: "Invalid request origin" }, { status: 403 })
    }

    if (!shouldBypassGeoBlock()) {
      const country = getRequestCountry(req)
      if (!isAllowedCountry(country)) {
        return NextResponse.json(
          { blocked: true, redirect: "/unavailable" },
          { status: 403, headers: { "x-geo-blocked": "1" } },
        )
      }
    }

    const candidate = await parseRequest(req)
    const validationResult = contactSchema.safeParse({
      ...candidate,
      submission_id: candidate.submission_id || randomUUID(),
    })
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: "Invalid form data. Please check your inputs." },
        { status: 400 },
      )
    }

    const processed = await processContactSubmission(validationResult.data)
    return NextResponse.json(
      { success: true, message: "Form submitted successfully", ...processed },
      { status: 200 },
    )
  } catch {
    console.error("[contact-api] Submission processing failed")
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your submission" },
      { status: 500 },
    )
  }
}
