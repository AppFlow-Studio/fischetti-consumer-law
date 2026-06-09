// Server Component — no "use client"
// Renders BreadcrumbList JSON-LD inline in the SSR HTML.
// Import on every practice area, blog, and location sub-page.

import { SITE_URL } from "@/lib/site"

interface BreadcrumbItem {
  name: string
  /** Absolute URL or path (e.g. "/consumer-law/fdcpa/debt-collector-keeps-calling") */
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
