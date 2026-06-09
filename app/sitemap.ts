import { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { GetBlogSearchIndex } from "@/lib/get-blogs"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = SITE_URL
    // Use current build time so every deploy refreshes lastModified, signalling recrawl priority.
    const today = new Date()

    const routes: MetadataRoute.Sitemap = [
        // Homepage — priority 1.0
        { url: base, lastModified: today, changeFrequency: "weekly", priority: 1 },

        // Practice area hub — priority 0.9
        { url: `${base}/consumer-law`, lastModified: today, changeFrequency: "monthly", priority: 0.9 },

        // Core practice area pages — priority 0.9
        { url: `${base}/consumer-law/fdcpa`, lastModified: today, changeFrequency: "monthly", priority: 0.9 },
        { url: `${base}/consumer-law/tcpa`, lastModified: today, changeFrequency: "monthly", priority: 0.9 },
        { url: `${base}/consumer-law/fcra`, lastModified: today, changeFrequency: "monthly", priority: 0.9 },

        // FDCPA subtopic pages — priority 0.85
        { url: `${base}/consumer-law/fdcpa/debt-collector-keeps-calling`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
        { url: `${base}/consumer-law/fdcpa/debt-collector-called-after-9pm`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
        { url: `${base}/consumer-law/fdcpa/debt-collector-threatened-me`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
        { url: `${base}/consumer-law/fdcpa/debt-collector-called-my-work`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },

        // TCPA subtopic pages — priority 0.85
        { url: `${base}/consumer-law/tcpa/robocall-lawsuit-florida`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
        { url: `${base}/consumer-law/tcpa/spam-texts-florida`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
        { url: `${base}/consumer-law/tcpa/texted-stop-still-getting-texts`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },

        // Location hub — priority 0.75
        { url: `${base}/locations`, lastModified: today, changeFrequency: "monthly", priority: 0.75 },

        // Office city pages — priority 0.8
        { url: `${base}/locations/orlando`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
        { url: `${base}/locations/port-st-lucie`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
        { url: `${base}/locations/boynton-beach`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },

        // Service area pages — priority 0.75
        { url: `${base}/locations/miami`, lastModified: today, changeFrequency: "monthly", priority: 0.75 },
        { url: `${base}/locations/tampa`, lastModified: today, changeFrequency: "monthly", priority: 0.75 },
        { url: `${base}/locations/fort-lauderdale`, lastModified: today, changeFrequency: "monthly", priority: 0.75 },

        // Blog and FAQs — priority 0.75
        { url: `${base}/blog`, lastModified: today, changeFrequency: "daily", priority: 0.75 },
        { url: `${base}/faqs`, lastModified: today, changeFrequency: "monthly", priority: 0.75 },

        // Legal pages — priority 0.5
        { url: `${base}/privacy-policy`, lastModified: today, changeFrequency: "yearly", priority: 0.5 },
        { url: `${base}/terms-of-service`, lastModified: today, changeFrequency: "yearly", priority: 0.5 },
        { url: `${base}/legal-disclaimer`, lastModified: today, changeFrequency: "yearly", priority: 0.5 },

        // EXCLUDED from sitemap:
        // /free-case-review — noindex paid search landing page
        // /thank-you — post-conversion page
        // /api/* — no API routes in sitemap
    ]

    // Published blog posts
    try {
        const blogPosts = await GetBlogSearchIndex(500)
        blogPosts.forEach((post) => {
            routes.push({
                url: `${base}/blog/${post.slug}`,
                lastModified:
                    post.date_published || post.updated_at
                        ? new Date(post.date_published || post.updated_at!)
                        : today,
                changeFrequency: "weekly",
                priority: 0.7,
            })
        })
    } catch {
        // Blog fetch failure should not break sitemap generation
    }

    return routes
}
