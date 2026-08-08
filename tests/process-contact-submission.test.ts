import { describe, expect, it, vi } from "vitest"
import { contactSchema } from "@/components/forms/contact-schema"

const mocks = vi.hoisted(() => ({
  persistLead: vi.fn(async () => ({
    leadId: "4271",
    createdAt: "2026-08-05T15:30:00.000Z",
    duplicate: true,
    emailSent: true,
    sourceWebhookSentAt: null,
  })),
  markWebhook: vi.fn(async () => undefined),
  sendWebhook: vi.fn(),
  markFailure: vi.fn(async () => undefined),
  markAttempt: vi.fn(async () => undefined),
}))

vi.mock("@/lib/logLead", () => ({
  persistLead: mocks.persistLead,
  markLeadEmailSent: vi.fn(async () => undefined),
  markLeadWebhookSent: mocks.markWebhook,
  markLeadDeliveryFailure: mocks.markFailure,
  recordLeadDeliveryAttempt: mocks.markAttempt,
}))

vi.mock("@/lib/source-webhook", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/source-webhook")>()
  return { ...actual, sendSourceWebhook: mocks.sendWebhook }
})

import { processContactSubmission } from "@/lib/process-contact-submission"

const formData = contactSchema.parse({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  phone: "5612647211",
  zip: "33437",
  caseType: "FCRA — Credit Report Errors",
  description: "A credit bureau continues to report an account that is not mine after I disputed it in writing.",
  urgency: "Moderate - Within a month",
  agreeToTerms: true,
  outsidePracticeAcknowledged: false,
  submission_id: "a1c1ec1e-7361-4dd4-9f20-7181ec969256",
})

describe("post-persistence Source delivery", () => {
  it("returns success after persistence even when Source delivery fails, then retries idempotently", async () => {
    mocks.sendWebhook
      .mockResolvedValueOnce({ configured: true, sent: false, error: "network unavailable" })
      .mockResolvedValueOnce({ configured: true, sent: true, sentAt: "2026-08-05T15:31:00.000Z" })

    await expect(processContactSubmission(formData)).resolves.toMatchObject({
      leadId: "4271",
      submissionId: formData.submission_id,
      duplicate: true,
    })
    await expect(processContactSubmission(formData)).resolves.toMatchObject({ leadId: "4271", duplicate: true })
    expect(mocks.persistLead).toHaveBeenCalledTimes(2)
    expect(mocks.markWebhook).toHaveBeenCalledWith("4271", "2026-08-05T15:31:00.000Z")
    expect(mocks.markFailure).toHaveBeenCalled()
  })
})
