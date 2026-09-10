"use server"

import { randomUUID } from "node:crypto"
import { headers } from "next/headers"
import { contactSchema, type ContactFormData } from "@/components/forms/contact-schema"
import { PRIMARY_PHONE } from "@/lib/site"
import { processContactSubmission } from "@/lib/process-contact-submission"

export type ContactFormResult = {
  success: boolean
  message: string
  leadId?: string
  submissionId?: string
  createdAt?: string
  duplicate?: boolean
  blocked?: boolean
  redirect?: string
}

async function isRequestAllowed(): Promise<{ allowed: boolean; country: string | null }> {
  if (process.env.NODE_ENV === "development") return { allowed: true, country: "US" }

  const headersList = await headers()
  const country = headersList.get("x-vercel-ip-country")
  return { allowed: country?.toUpperCase() === "US", country }
}

export async function submitContactForm(data: ContactFormData): Promise<ContactFormResult> {
  try {
    const { allowed, country } = await isRequestAllowed()
    if (!allowed) {
      console.warn("[contact] Blocked submission country", country || "unknown")
      return {
        success: false,
        message: "Service unavailable in your region",
        blocked: true,
        redirect: "/unavailable",
      }
    }

    const validationResult = contactSchema.safeParse({
      ...data,
      submission_id: data.submission_id || randomUUID(),
    })
    if (!validationResult.success) {
      return { success: false, message: "Invalid form data. Please check your inputs." }
    }

    const processed = await processContactSubmission(validationResult.data)
    return {
      success: true,
      message: "Thank you! Your case review request has been submitted successfully.",
      ...processed,
    }
  } catch {
    console.error("[contact] Submission processing failed")
    return {
      success: false,
      message: `An unexpected error occurred. Please try again or call us directly at ${PRIMARY_PHONE}.`,
    }
  }
}
