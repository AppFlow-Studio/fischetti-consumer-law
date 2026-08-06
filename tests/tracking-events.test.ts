import { beforeEach, describe, expect, it, vi } from "vitest"
import { createConsentPreferences, writeStoredConsent } from "@/lib/consent"

vi.mock("@/lib/enhanced-conversions", () => ({
  hashEnhancedConversionData: vi.fn(async () => ({ sha256_email_address: "hashed-email" })),
}))

import { trackLeadFormSuccess } from "@/components/tracking/tracking-events"

describe("successful lead analytics contract", () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
    window.dataLayer = []
  })

  it("fires lead_form_submit exactly once with stable IDs and no case description", async () => {
    writeStoredConsent(createConsentPreferences({ analytics: true, marketing: true, functional: false }))
    const options = {
      leadId: "4271",
      submissionId: "a1c1ec1e-7361-4dd4-9f20-7181ec969256",
      practiceArea: "TCPA",
      enhancedConversion: { email: "jane@example.com" },
    }

    await trackLeadFormSuccess("free_case_review", options)
    await trackLeadFormSuccess("free_case_review", options)

    const successEvents = window.dataLayer.filter((event) =>
      typeof event === "object" && event !== null && "event" in event && event.event === "lead_form_submit",
    )
    expect(successEvents).toHaveLength(1)
    expect(successEvents[0]).toMatchObject({
      event_id: options.submissionId,
      lead_id: options.leadId,
      practice_area: "TCPA",
      user_data: { sha256_email_address: "hashed-email" },
    })
    expect(JSON.stringify(successEvents[0])).not.toContain("description")
    expect(window.dataLayer.some((event) =>
      typeof event === "object" && event !== null && "event" in event && event.event === "qualify_lead",
    )).toBe(false)
  })

  it("always pushes one non-PII success event while rejected consent suppresses enhanced conversion data", async () => {
    await trackLeadFormSuccess("free_case_review", {
      leadId: "4272",
      submissionId: "14dd3db2-5bb6-497c-ac04-3790027a9e9a",
      practiceArea: "FCRA",
    })
    expect(window.dataLayer).toHaveLength(1)
    expect(window.dataLayer[0]).toMatchObject({ event: "lead_form_submit", lead_id: "4272" })
    expect(window.dataLayer[0]).not.toHaveProperty("user_data")
  })
})
