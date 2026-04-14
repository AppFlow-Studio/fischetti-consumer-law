import type { Metadata } from "next"
import Link from "next/link"
import { SITE_URL, PRIMARY_PHONE, PRIMARY_PHONE_E164 } from "@/lib/site"
import { buildMetadata } from "@/lib/seo/metadata"
import { GetBlogsPaginated } from "@/lib/get-blogs"
import { BlogGrid } from "@/components/blog/BlogGrid"
import BlogListingHero from "@/components/blog/BlogListingHero"
import { Phone } from "lucide-react"

type BlogIndexPageProps = {
  searchParams?: Promise<{
    page?: string
    tag?: string
  }>
}

export const revalidate = 60

export const metadata: Metadata = buildMetadata({
  title: "Consumer Protection Law Blog — FDCPA, TCPA & FCRA",
  description:
    "Consumer protection insights covering FDCPA, TCPA, FCRA, VPPA, Fair Housing, and consumer rights issues in Florida. Written by attorney Michael J. Fischetti.",
  pathname: "/blog",
  type: "website",
})

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const resolved = await searchParams
  const pageParam = resolved?.page
  const tag = resolved?.tag

  const currentPage = pageParam ? Math.max(parseInt(pageParam, 10) || 1, 1) : 1
  const perPage = 12

  const { posts, totalPages, total } = await GetBlogsPaginated(currentPage, perPage, tag)

  // Extract unique tags from fetched posts for filter bar
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags ?? []))).sort()

  const createPageHref = (page: number) => {
    const params = new URLSearchParams()
    if (page > 1) params.set("page", String(page))
    if (tag) params.set("tag", tag)
    const search = params.toString()
    return search ? `/blog?${search}` : "/blog"
  }

  // JSON-LD schemas
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    url: `${SITE_URL}/blog`,
    name: "Consumer Law Florida Blog",
    description:
      "Consumer law updates and practical guides on credit reporting errors, debt collection harassment, robocalls, privacy violations, and other consumer rights issues in Florida.",
    publisher: {
      "@type": "LegalService",
      name: "Consumer Law Florida",
      url: SITE_URL,
      "@id": `${SITE_URL}/#organization`,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date_published || undefined,
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      ...(tag
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: tag,
              item: `${SITE_URL}/blog?tag=${encodeURIComponent(tag)}`,
            },
          ]
        : []),
    ],
  }

  const activePillClass =
    "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-[#1265eb] text-white transition-colors shrink-0"
  const inactivePillClass =
    "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors shrink-0"

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero section */}
      <BlogListingHero />

      {/* Tag filter bar */}
      {allTags.length > 0 && (
        <div className="bg-white border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div
              className="flex gap-2 overflow-x-auto pb-0.5"
              style={{ scrollbarWidth: "none" }}
            >
              <Link href="/blog" className={tag ? inactivePillClass : activePillClass}>
                All
              </Link>
              {allTags.map((t) => (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(t)}`}
                  className={tag === t ? activePillClass : inactivePillClass}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-16 sm:pb-20">
        {/* Results info */}
        <p className="text-sm text-gray-500 mb-6">
          {total} article{total !== 1 ? "s" : ""}
          {tag ? (
            <>
              {" "}tagged{" "}
              <span className="font-medium text-gray-700">&ldquo;{tag}&rdquo;</span>
            </>
          ) : null}
        </p>

        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] font-bold text-gray-900 mb-8">
          {tag ? `Articles: ${tag}` : "Latest Articles & Guides"}
        </h2>

        <BlogGrid posts={posts} />

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm"
            aria-label="Blog pagination"
          >
            <Link
              href={createPageHref(Math.max(currentPage - 1, 1))}
              aria-disabled={currentPage === 1}
              className={`min-w-[2.75rem] px-3 py-2 rounded-full border text-center ${
                currentPage === 1
                  ? "cursor-not-allowed border-gray-200 text-gray-400"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Prev
            </Link>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={createPageHref(page)}
                className={`min-w-[2.75rem] px-3 py-2 rounded-full border text-center ${
                  page === currentPage
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </Link>
            ))}
            <Link
              href={createPageHref(Math.min(currentPage + 1, totalPages))}
              aria-disabled={currentPage === totalPages}
              className={`min-w-[2.75rem] px-3 py-2 rounded-full border text-center ${
                currentPage === totalPages
                  ? "cursor-not-allowed border-gray-200 text-gray-400"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </Link>
          </nav>
        )}
      </main>

      {/* Bottom CTA — top mask fades into white content above; bottom left solid to bleed into dark footer */}
      <section
        className="w-full pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 [mask-image:linear-gradient(to_bottom,transparent,black_6rem)]"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff 0%, #1565c0 28%, #051937 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[var(--font-playfair-display)] text-2xl sm:text-3xl text-white font-semibold mb-4">
            Not sure if you have a case?
          </h2>
          <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Many consumers don&apos;t realize their rights have been violated. Get a free
            review — no fee unless we win.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/free-case-review"
              className="w-full sm:w-auto rounded-xl bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg font-semibold shadow-lg transition-colors"
            >
              Get Your Free Case Review
            </Link>
            <a
              href={`tel:${PRIMARY_PHONE_E164}`}
              className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-base font-medium"
            >
              <Phone className="w-4 h-4" aria-hidden />
              {PRIMARY_PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
