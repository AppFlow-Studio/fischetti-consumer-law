import { describe, expect, it } from "vitest"
import { getUrgencyColor } from "@/emails/office-notification"

describe("urgency classification", () => {
  it("never classifies Not urgent as urgent by substring", () => {
    expect(getUrgencyColor("Not urgent - Just exploring options").label).toBe("STANDARD")
    expect(getUrgencyColor("Urgent - Within a week").label).toBe("URGENT")
  })
})
