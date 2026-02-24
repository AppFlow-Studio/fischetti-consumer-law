import type { Metadata } from "next"
import Link from "next/link"
import { SITE_URL } from "@/lib/site"
import { buildMetadata } from "@/lib/seo/metadata"
import { GetBlogsPaginated } from "@/lib/get-blogs"
import { BlogGrid } from "@/components/blog/BlogGrid"

type BlogIndexPageProps = {
  searchParams?: Promise<{
    page?: string
    tag?: string
  }>
}

export const metadata: Metadata = buildMetadata({
  title: "Consumer Law Florida Blog | ConsumerLawFlorida.com",
  description:
    "Consumer protection insights from Consumer Law Florida covering FCRA, FDCPA, TCPA, VPPA, Fair Housing, mass arbitration, and other consumer rights issues in Florida.",
  pathname: "/blog",
  type: "website",
})

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const resolved = await searchParams
  const pageParam = resolved?.page
  const tag = resolved?.tag

  const currentPage = pageParam ? Math.max(parseInt(pageParam, 10) || 1, 1) : 1
  const perPage = 12

  const { posts, totalPages } = await GetBlogsPaginated(currentPage, perPage, tag)

  const createPageHref = (page: number) => {
    const params = new URLSearchParams()
    if (page > 1) params.set("page", String(page))
    if (tag) params.set("tag", tag)
    const search = params.toString()
    return search ? `/blog?${search}` : "/blog"
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    url: `${SITE_URL}/blog`,
    name: "Consumer Law Florida Blog",
    description:
      "Consumer law updates and practical guides on credit reporting errors, debt collection harassment, robocalls, privacy violations, and other consumer rights issues in Florida.",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date_published || undefined,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16">
        <section className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[--font-playfair-display] text-gray-900 mb-3 sm:mb-4">
            Consumer Law Florida Blog
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl">
            Learn how federal and Florida consumer protection laws like the FCRA, FDCPA, TCPA, VPPA, and Fair Housing Act apply in real cases. We share insights on
            credit report errors, debt collection harassment, robocalls and spam texts, privacy violations, and mass arbitration strategies.
          </p>
        </section>

        {tag && (
          <section className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
            <p className="text-sm text-gray-700">
              Showing posts tagged with <span className="font-semibold">{tag}</span>.
            </p>
            <Link
              href="/blog"
              className="text-sm font-medium text-blue-700 hover:underline shrink-0"
            >
              Clear filter
            </Link>
          </section>
        )}

        <BlogGrid posts={posts} />

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
    </>
  )
}

