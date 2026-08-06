import { describe, expect, it } from "vitest"
import { contactSchema } from "@/components/forms/contact-schema"
import { buildSourceWebhookPayload } from "@/lib/source-webhook"

describe("Source webhook payload", () => {
  it("includes the canonical Lead ID, click IDs, UTMs, TCPA company, and no qualification", () => {
    const formData = contactSchema.parse({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      phone: "561-264-7211",
      zip: "33437",
      caseType: "TCPA — Spam Text Violations",
      callerIdentification: "Yes, I know the company name",
      contactingCompany: "Example Sender LLC",
      description: "Example Sender continued sending automated marketing texts after I replied STOP several times.",
      urgency: "Not urgent - Just exploring options",
      agreeToTerms: true,
      outsidePracticeAcknowledged: false,
      form_source: "free-case-review",
      submission_id: "a1c1ec1e-7361-4dd4-9f20-7181ec969256",
      gclid: "g-1",
      gbraid: "gb-1",
      wbraid: "wb-1",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "tcpa",
      utm_term: "spam texts",
      utm_content: "ad-a",
    })

    const payload = buildSourceWebhookPayload(formData, {
      leadId: "4271",
      createdAt: "2026-08-05T15:30:00.000Z",
    })

    expect(payload).toMatchObject({
      lead_id: "4271",
      created_at: "2026-08-05T15:30:00.000Z",
      practice_area: "TCPA",
      contacting_company: "Example Sender LLC",
      gclid: "g-1",
      gbraid: "gb-1",
      wbraid: "wb-1",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "tcpa",
      utm_term: "spam texts",
      utm_content: "ad-a",
    })
    expect(payload).not.toHaveProperty("qualified")
    expect(payload).not.toHaveProperty("qualification")
    expect(JSON.stringify(payload)).not.toContain("submission_id")
  })
})
