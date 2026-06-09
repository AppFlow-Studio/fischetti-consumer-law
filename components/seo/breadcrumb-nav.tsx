import Link from "next/link"

export type BreadcrumbItem = {
  name: string
  href?: string
}

type BreadcrumbNavProps = {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Server-rendered breadcrumb nav with proper <ol><li> semantic structure.
 * Satisfies Google's Featured Snippet breadcrumb eligibility criteria.
 * Pair with buildBreadcrumbSchema() JSON-LD for full rich-result coverage.
 */
export function BreadcrumbNav({ items, className = "text-sm text-white/70 mb-6" }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {i > 0 && (
              <span className="mx-2" aria-hidden="true">/</span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-white transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.name}</span>
              </Link>
            ) : (
              <span className="text-white" aria-current="page" itemProp="name">
                {item.name}
              </span>
            )}
            <meta itemProp="position" content={String(i + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  )
}
