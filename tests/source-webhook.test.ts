import { afterEach, describe, expect, it, vi } from "vitest"
import { contactSchema } from "@/components/forms/contact-schema"
import { buildSourceWebhookPayload, sendSourceWebhook } from "@/lib/source-webhook"

const canonicalLead = {
  leadId: "4271",
  createdAt: "2026-08-05T15:30:00.000Z",
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

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

    const payload = buildSourceWebhookPayload(formData, canonicalLead)

    expect(payload.type).toBe("INSERT")
    expect(payload.record).toMatchObject({
      lead_id: "4271",
      created_at: "2026-08-05T15:30:00.000Z",
      practice_area: "TCPA",
      tcpa_company: "Example Sender LLC",
      gclid: "g-1",
      gbraid: "gb-1",
      wbraid: "wb-1",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "tcpa",
      utm_term: "spam texts",
      utm_content: "ad-a",
    })
    expect(payload.record.lead_id).not.toBe("")
    expect(payload.record).not.toHaveProperty("caller_identification")
    expect(payload.record).not.toHaveProperty("contacting_company")
    expect(payload.record).not.toHaveProperty("qualified")
    expect(payload.record).not.toHaveProperty("qualification")
    expect(JSON.stringify(payload)).not.toContain("submission_id")
  })

  it("does not fabricate a TCPA company for a non-TCPA submission", () => {
    const formData = contactSchema.parse({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      phone: "561-264-7211",
      zip: "33437",
      caseType: "FCRA — Credit Report Errors",
      contactingCompany: "Must not escape schema normalization",
      description: "A credit bureau continues reporting an account that is not mine after my written dispute.",
      urgency: "Moderate - Within a month",
      agreeToTerms: true,
      outsidePracticeAcknowledged: false,
    })

    const payload = buildSourceWebhookPayload(formData, canonicalLead)

    expect(payload.record).not.toHaveProperty("tcpa_company")
    expect(payload.record).not.toHaveProperty("caller_identification")
    expect(payload.record).not.toHaveProperty("contacting_company")
  })

  it("rejects an empty canonical Lead ID before delivery", () => {
    const formData = contactSchema.parse({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      phone: "561-264-7211",
      zip: "33437",
      caseType: "FCRA — Credit Report Errors",
      description: "A credit bureau continues reporting an account that is not mine after my written dispute.",
      urgency: "Moderate - Within a month",
      agreeToTerms: true,
      outsidePracticeAcknowledged: false,
    })

    expect(() => buildSourceWebhookPayload(formData, { ...canonicalLead, leadId: "  " }))
      .toThrow("canonical Lead ID")
  })

  it("puts the shared secret in the JSON body and not a custom header", async () => {
    vi.stubEnv("SOURCE_WEBHOOK_URL", "https://script.google.com/macros/s/example/exec")
    vi.stubEnv("SOURCE_WEBHOOK_SHARED_SECRET", "server-only-test-secret")
    const fetchMock = vi.fn().mockResolvedValue(new Response("Accepted", { status: 200 }))
    vi.stubGlobal("fetch", fetchMock)
    const formData = contactSchema.parse({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      phone: "561-264-7211",
      zip: "33437",
      caseType: "FCRA — Credit Report Errors",
      description: "A credit bureau continues reporting an account that is not mine after my written dispute.",
      urgency: "Moderate - Within a month",
      agreeToTerms: true,
      outsidePracticeAcknowledged: false,
    })
    const payload = buildSourceWebhookPayload(formData, canonicalLead)

    await expect(sendSourceWebhook(payload)).resolves.toMatchObject({ configured: true, sent: true })
    const request = fetchMock.mock.calls[0][1] as RequestInit
    const body = JSON.parse(String(request.body)) as Record<string, unknown>
    expect(body).toMatchObject({ type: "INSERT", shared_secret: "server-only-test-secret" })
    expect(body.record).toMatchObject({ lead_id: "4271" })
    expect(new Headers(request.headers).has("x-source-webhook-secret")).toBe(false)
  })

  it("does not treat an HTTP 200 receiver rejection as successful delivery", async () => {
    vi.stubEnv("SOURCE_WEBHOOK_URL", "https://script.google.com/macros/s/example/exec")
    vi.stubEnv("SOURCE_WEBHOOK_SHARED_SECRET", "server-only-test-secret")
    const fetchMock = vi.fn().mockResolvedValue(new Response("Skipped: not INSERT", { status: 200 }))
    vi.stubGlobal("fetch", fetchMock)
    const formData = contactSchema.parse({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      phone: "561-264-7211",
      zip: "33437",
      caseType: "FCRA — Credit Report Errors",
      description: "A credit bureau continues reporting an account that is not mine after my written dispute.",
      urgency: "Moderate - Within a month",
      agreeToTerms: true,
      outsidePracticeAcknowledged: false,
    })
    const payload = buildSourceWebhookPayload(formData, canonicalLead)

    await expect(sendSourceWebhook(payload)).resolves.toMatchObject({
      configured: true,
      sent: false,
      httpStatus: 200,
      error: expect.stringContaining("Skipped: not INSERT"),
    })
  })
})
