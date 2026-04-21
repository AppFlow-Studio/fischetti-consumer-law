import { notFound } from "next/navigation"
import { EmailPreviewClient } from "./preview-client"

// This page is only accessible in development.
// In production, Next.js will render a 404 before any content is exposed.
export const dynamic = "force-dynamic"

export default function EmailPreviewsPage() {
    if (process.env.NODE_ENV === "production") {
        notFound()
    }

    return <EmailPreviewClient />
}

export function generateMetadata() {
    return {
        title: "Email Previews [DEV]",
        robots: { index: false, follow: false },
    }
}
