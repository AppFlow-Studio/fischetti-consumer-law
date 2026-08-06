import { NextResponse } from "next/server"
import { contactSchema } from "@/components/forms/contact-schema"
import { processContactSubmission } from "@/lib/process-contact-submission"

// Operational replay endpoint. Keep the shared secret server-only; invoke from an
// authenticated job/operator with the original validated submission payload.
export async function POST(request: Request) {
  const expected = process.env.LEAD_DELIVERY_RETRY_SECRET
  if (!expected || request.headers.get("x-lead-delivery-retry-secret") !== expected) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json().catch(() => null)
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ success: false, message: "Invalid replay payload" }, { status: 400 })
  const result = await processContactSubmission(parsed.data)
  return NextResponse.json({ success: true, ...result })
}
