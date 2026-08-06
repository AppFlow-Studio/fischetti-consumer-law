import { describe, expect, it } from "vitest"
import {
  contactSchema,
  UNLISTED_CASE_TYPE,
  URGENCY_LEVELS,
} from "@/components/forms/contact-schema"

const base = {
  firstName: " Jane ",
  lastName: " Doe ",
  email: " JANE@EXAMPLE.COM ",
  phone: "(561) 264-7211",
  zip: "33437",
  caseType: "FCRA — Credit Report Errors",
  description: "A credit bureau continues to report an account that is not mine after I disputed it in writing.",
  urgency: "Moderate - Within a month",
  agreeToTerms: true,
  outsidePracticeAcknowledged: false,
}

describe("contactSchema server contract", () => {
  it("normalizes contact data and accepts GCLID, GBRAID, WBRAID, and UTMs", () => {
    const result = contactSchema.parse({
      ...base,
      gclid: "g-1",
      gbraid: "gb-1",
      wbraid: "wb-1",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "fcra",
      utm_term: "credit report",
      utm_content: "responsive-ad",
    })

    expect(result.email).toBe("jane@example.com")
    expect(result.phone).toBe("(561) 264-7211")
    expect(result).toMatchObject({ gclid: "g-1", gbraid: "gb-1", wbraid: "wb-1" })
  })

  it.each(URGENCY_LEVELS)("serializes the explicit urgency value %s", (urgency) => {
    expect(contactSchema.parse({ ...base, urgency }).urgency).toBe(urgency)
  })

  it("rejects unexpected urgency values including substring lookalikes", () => {
    expect(contactSchema.safeParse({ ...base, urgency: "somewhat urgent" }).success).toBe(false)
  })

  it("serializes My issue is not listed exactly when acknowledged", () => {
    const parsed = contactSchema.parse({
      ...base,
      caseType: UNLISTED_CASE_TYPE,
      outsidePracticeAcknowledged: true,
    })
    expect(parsed.caseType).toBe(UNLISTED_CASE_TYPE)
    expect(parsed.outsidePracticeAcknowledged).toBe(true)
  })

  it("requires the unlisted acknowledgement and rejects malformed direct requests", () => {
    expect(contactSchema.safeParse({ ...base, caseType: UNLISTED_CASE_TYPE }).success).toBe(false)
    expect(contactSchema.safeParse({ ...base, email: "not-an-email" }).success).toBe(false)
    expect(contactSchema.safeParse({ ...base, phone: "1234567890" }).success).toBe(false)
    expect(contactSchema.safeParse({ ...base, caseType: "Personal injury" }).success).toBe(false)
  })

  it("preserves a TCPA company and removes it only from a submitted non-TCPA matter", () => {
    const tcpa = contactSchema.parse({
      ...base,
      caseType: "TCPA — Spam Text Violations",
      callerIdentification: "Yes, I know the company name",
      contactingCompany: "Example Sender LLC",
    })
    expect(tcpa.contactingCompany).toBe("Example Sender LLC")

    const fcra = contactSchema.parse({ ...base, contactingCompany: "Hidden old value" })
    expect(fcra.contactingCompany).toBeUndefined()
  })
})
