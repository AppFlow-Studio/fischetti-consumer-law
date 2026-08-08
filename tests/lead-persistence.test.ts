import { beforeEach, describe, expect, it, vi } from "vitest"

const database = vi.hoisted(() => ({
  rows: [] as Array<Record<string, unknown>>,
  nextId: 100,
}))

vi.mock("@/lib/supabaseServer", () => ({
  supabaseServer: {
    from: () => ({
      insert: (record: Record<string, unknown>) => ({
        select: () => ({
          single: async () => {
            const duplicate = database.rows.find((row) => row.submission_id === record.submission_id)
            if (duplicate) return { data: null, error: { code: "23505" } }
            const row = {
              ...record,
              id: database.nextId++,
              created_at: "2026-08-05T15:30:00.000Z",
              source_webhook_sent_at: null,
            }
            database.rows.push(row)
            return { data: row, error: null }
          },
        }),
      }),
      select: () => ({
        eq: (_column: string, value: string) => ({
          single: async () => ({
            data: database.rows.find((row) => row.submission_id === value) || null,
            error: null,
          }),
        }),
      }),
    }),
  },
}))

import { persistLead, type LeadData } from "@/lib/logLead"

const leadData: LeadData = {
  first_name: "Jane",
  last_name: "Doe",
  email: "jane@example.com",
  phone: "(561) 264-7211",
  zip: "33437",
  case_type: "TCPA — Spam Text Violations",
  caller_identification: "Yes, I know the company name",
  tcpa_contacting_company: "Example Sender LLC",
  description: "Example Sender continued sending automated marketing texts after I replied STOP several times.",
  urgency: "Urgent - Within a week",
  form_source: "free-case-review",
  submission_id: "a1c1ec1e-7361-4dd4-9f20-7181ec969256",
  gclid: "g-1",
  gbraid: "gb-1",
  wbraid: "wb-1",
  utm_campaign: "tcpa",
}

describe("Supabase lead persistence", () => {
  beforeEach(() => {
    database.rows.length = 0
    database.nextId = 100
  })

  it("returns the canonical persisted ID and reuses it for the same retry key", async () => {
    const first = await persistLead(leadData)
    const retry = await persistLead(leadData)

    expect(first).toMatchObject({ leadId: "100", duplicate: false })
    expect(retry).toMatchObject({ leadId: "100", duplicate: true })
    expect(database.rows).toHaveLength(1)
    expect(database.rows[0]).toMatchObject({
      submission_id: leadData.submission_id,
      gclid: "g-1",
      gbraid: "gb-1",
      wbraid: "wb-1",
      tcpa_contacting_company: "Example Sender LLC",
    })
    expect(database.rows[0]).not.toHaveProperty("qualified")
  })
})
