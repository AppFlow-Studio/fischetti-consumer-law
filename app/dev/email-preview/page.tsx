import { notFound } from "next/navigation"
import { EmailPreviewClient } from "./preview-client"

export const dynamic = "force-dynamic"

export default function EmailPreviewPage() {
    if (process.env.NODE_ENV === "production") {
        notFound()
    }

    return <EmailPreviewClient />
}

export function generateMetadata() {
    return {
        title: "Email Preview [DEV]",
        robots: { index: false, follow: false },
    }
}
