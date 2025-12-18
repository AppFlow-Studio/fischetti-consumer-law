import { MetadataRoute } from "next"
import fs from "node:fs"
import path from "node:path"
import { SITE_URL } from "@/lib/site"
import { firms } from "@/data/firms"

function readLaws() {
    const p = path.join(process.cwd(), "data", "consumer-laws.json")
    const raw = fs.readFileSync(p, "utf-8")
    return JSON.parse(raw) as Array<{ slug: string }>
}

export default function sitemap(): MetadataRoute.Sitemap {
    const laws = readLaws()
    const now = new Date()

    // Required routes
    const routes: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/consumer-law`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/locations`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/faqs`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ]

    // Dynamic city location pages
    firms.forEach((firm) => {
        routes.push({
            url: `${SITE_URL}/locations/${firm.slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        })
    })

    // Dynamic law pages
    laws.forEach((law) => {
        routes.push({
            url: `${SITE_URL}/consumer-law/${law.slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        })
    })

    // Legal pages (auto-detected - these routes exist)
    const legalPages = [
        { path: "/privacy-policy", priority: 0.6 },
        { path: "/terms-of-service", priority: 0.6 },
        { path: "/legal-disclaimer", priority: 0.6 },
    ]

    legalPages.forEach((page) => {
        routes.push({
            url: `${SITE_URL}${page.path}`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: page.priority,
        })
    })

    // Exclude /thank-you (not included)

    return routes
}
