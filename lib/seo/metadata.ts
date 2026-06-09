/**
 * SEO metadata builder utility
 * Ensures consistent Open Graph, Twitter, and canonical metadata across all pages
 */

import type { Metadata } from "next"
import { SITE_URL, SITE_NAME } from "@/lib/site"

export interface BuildMetadataOptions {
    title: string
    description: string
    pathname: string
    imagePath?: string
    type?: "website" | "article"
    keywords?: string[]
}

/**
 * Builds complete metadata object with OG, Twitter, and canonical tags
 * Always includes og:type, og:images, twitter card, and canonical URL
 */
export function buildMetadata({
    title,
    description,
    pathname,
    imagePath = "/opengraph-default.png",
    type = "website",
    keywords,
}: BuildMetadataOptions): Metadata {
    const fullUrl = `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`
    const imageUrl = imagePath.startsWith("http") ? imagePath : `${SITE_URL}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`

    const metadata: Metadata = {
        title,
        description,
        alternates: {
            canonical: pathname.startsWith("/") ? pathname : `/${pathname}`,
        },
        openGraph: {
            type,
            locale: "en_US",
            siteName: SITE_NAME,
            title,
            description,
            url: fullUrl,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: "Consumer Law Florida",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
        other: {
            "geo.region": "US-FL",
            "geo.placename": "Orlando, Florida",
            "geo.position": "28.5383;-81.3792",
            "ICBM": "28.5383, -81.3792",
        },
    }

    // Preserve keywords if provided
    if (keywords && keywords.length > 0) {
        metadata.keywords = keywords
    }

    return metadata
}

