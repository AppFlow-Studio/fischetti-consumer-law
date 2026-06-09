/**
 * Dev-only email preview endpoint — Pages Router API route.
 *
 * Lives in pages/api/ deliberately: the App Router blocks any import chain
 * that reaches react-dom/server (including @react-email/render), but the
 * Pages Router has no such restriction. The URL (/api/dev/email-preview)
 * is identical to what the preview UI expects, so no client changes needed.
 */
import type { NextApiRequest, NextApiResponse } from "next"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { ClientQualificationEmail } from "@/emails/client-qualification"
import { type LawType, generateCaseRef, calculateDeadline } from "@/lib/email-utils"

const VALID_LAW_TYPES: LawType[] = ["FCRA", "FDCPA", "TCPA", "OTHER"]

function defaultSubmittedAt(): string {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
        timeZone: "America/New_York",
    }).format(new Date())
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (process.env.NODE_ENV === "production") {
        res.status(404).end()
        return
    }

    const rawType = ((req.query.type as string) || "FCRA").toUpperCase() as LawType
    const lawType: LawType = VALID_LAW_TYPES.includes(rawType) ? rawType : "FCRA"
    const firstName = (req.query.name as string) || "Alex"
    const lastName = (req.query.last as string) || "Johnson"
    const caseRef = (req.query.ref as string) || generateCaseRef()
    const deadlineDate = (req.query.deadline as string) || calculateDeadline(5)
    const submittedAt = (req.query.submitted as string) || defaultSubmittedAt()

    const html = renderToStaticMarkup(
        createElement(ClientQualificationEmail, {
            firstName,
            lastName,
            lawType,
            caseRef,
            deadlineDate,
            submittedAt,
        })
    )

    res.setHeader("Content-Type", "text/html; charset=utf-8")
    res.setHeader("Cache-Control", "no-store, no-cache")
    res.setHeader("X-Robots-Tag", "noindex")
    res.send(html)
}
