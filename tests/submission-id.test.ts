import { beforeEach, describe, expect, it } from "vitest"
import { clearPendingSubmissionId, getOrCreateSubmissionId } from "@/lib/submission-id"

describe("client submission idempotency key", () => {
  beforeEach(() => window.sessionStorage.clear())

  it("reuses an identifier for retries and rotates only after confirmed success", () => {
    const first = getOrCreateSubmissionId("free-case-review")
    expect(getOrCreateSubmissionId("free-case-review")).toBe(first)

    clearPendingSubmissionId("free-case-review", first)
    expect(getOrCreateSubmissionId("free-case-review")).not.toBe(first)
  })
})
