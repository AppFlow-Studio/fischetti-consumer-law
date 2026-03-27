import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { SITE_URL, PRIMARY_PHONE, PRIMARY_PHONE_E164 } from "@/lib/site"
import { GetBlogInfo, GetAllBlogSlugs, GetRelatedPosts } from "@/lib/get-blogs"
import { KeyTakeaways } from "@/components/blog/KeyTakeaways"
import { FAQAccordion } from "@/components/blog/FAQAccordion"
import { CdnImageGallery } from "@/components/blog/CdnImageGallery"
import { BlogCard } from "@/components/blog/BlogCard"
import FreeCaseReviewDialog from "@/components/free-case-review-dialog"
import FreeCaseReview from "@/components/free-case-review-button"
import { isOptimizableUrl } from "@/lib/is-optimizable-url"
import { normalizeBlogContent, decodeBlogText } from "@/lib/normalize-blog-html"
import BlogReadingProgressBar from "@/components/blog/BlogReadingProgressBar"
import BlogSidebar from "@/components/blog/BlogSidebar"
import BlogShareButtons from "@/components/blog/BlogShareButtons"

type BlogDetailPageParams = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await GetAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const dynamicParams = true
export const revalidate = 60

export async function generateMetadata({ params }: BlogDetailPageParams): Promise<Metadata> {
  const { slug } = await params
  const post = await GetBlogInfo(slug)

  if (!post) {
    return { title: "Blog Post Not Found" }
  }

  const title = post.meta_title || post.title
  const description = post.meta_description || post.summary || ""
  const canonicalPath = `/blog/${slug}`
  const url = `${SITE_URL}${canonicalPath}`
  // Keep Open Graph image in sync with the hero image logic used on the blog page.
  const image = post.og_image_url || post.thumbnail_url || "/opengraph-default.png"
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`

  return {
    title,
    description,
    keywords: post.keywords ?? undefined,
    robots: "index, follow",
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: post.date_published ?? undefined,
      modifiedTime: post.updated_at ?? undefined,
      authors: [post.author_name || "Consumer Law Florida"],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  }
}

/** Add id attributes to H2 tags so the ToC can link to them */
function addIdsToHeadings(html: string | null): string {
  if (!html) return ""
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_, attrs, text) => {
    const id = text
      .replace(/<[^>]*>/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
    return `<h2${attrs} id="${id}">${text}</h2>`
  })
}

export default async function BlogDetailPage({ params }: BlogDetailPageParams) {
  const { slug } = await params
  const post = await GetBlogInfo(slug)

  if (!post) notFound()

  const canonicalUrl = `${SITE_URL}/blog/${slug}`
  const contentWithIds = addIdsToHeadings(post.content_html)
  const relatedPosts = await GetRelatedPosts(post.slug, post.tags ?? [], 3)

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta_title || post.title,
    description: post.meta_description || post.summary || "",
    url: canonicalUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    datePublished: post.date_published || undefined,
    dateModified: post.updated_at || post.date_published || undefined,
    author: {
      "@type": "Person",
      name: post.author_name || "Consumer Law Florida Team",
    },
    publisher: {
      "@type": "LegalService",
      name: "Consumer Law Florida",
      url: "https://www.consumerlawflorida.com",
      "@id": "https://www.consumerlawflorida.com/#organization",
      logo: { "@type": "ImageObject", url: "https://www.consumerlawflorida.com/logo.png" },
    },
    image: post.og_image_url || post.thumbnail_url
      ? { "@type": "ImageObject", url: post.og_image_url || post.thumbnail_url }
      : undefined,
    keywords: post.keywords?.join(", ") || undefined,
    timeRequired: post.reading_minutes ? `PT${post.reading_minutes}M` : undefined,
    articleSection: post.tags?.[0] || "Consumer Law",
    inLanguage: "en-US",
    isAccessibleForFree: true,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.consumerlawflorida.com" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.consumerlawflorida.com/blog" },
        { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
      ],
    },
  }

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": "https://www.consumerlawflorida.com/#organization",
    name: "Consumer Law Florida",
    url: "https://www.consumerlawflorida.com",
    telephone: PRIMARY_PHONE_E164,
    areaServed: { "@type": "State", name: "Florida" },
    serviceType: [
      "FCRA attorney",
      "FDCPA attorney",
      "TCPA attorney",
      "consumer protection lawyer",
      "debt collection harassment lawyer",
      "credit report error lawyer",
      "robocall lawsuit attorney",
      "data breach attorney",
    ],
    priceRange: "Free consultation — no fee unless we win",
  }

  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null

  const displayDate = post.date_published
    ? new Date(post.date_published).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  const tags = post.tags ?? []
  const heroImage = post.og_image_url || post.thumbnail_url

  return (
    <>
      {/* JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />

      {/* Reading progress bar */}
      <BlogReadingProgressBar />

      {/* Gradient hero header — image is the background, fades into page below */}
      <section
        className="relative w-full overflow-hidden pt-28 sm:pt-32 pb-36 sm:pb-44 px-4 sm:px-6"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      >
        {/* Background layer */}
        <div className="absolute inset-0 z-0">
          {heroImage ? (
            <>
              {isOptimizableUrl(heroImage) ? (
                <Image
                  src={heroImage}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  priority
                  style={{ animation: "scaleIn 1.2s ease forwards" }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  style={{ animation: "scaleIn 1.2s ease forwards" }}
                />
              )}
              {/* Rich blue gradient overlay for legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(5,25,55,0.93) 0%, rgba(0,43,96,0.88) 45%, rgba(18,101,235,0.78) 100%)",
                }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)",
              }}
            />
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 text-sm text-blue-200/70"
            style={{ animation: "fadeInUp 0.5s ease 0.05s backwards" }}
          >
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li
                className="text-blue-100/60 truncate max-w-[200px] sm:max-w-none"
                aria-current="page"
              >
                {decodeBlogText(post.title)}
              </li>
            </ol>
          </nav>

          {/* Tags */}
          {tags.length > 0 && (
            <div
              className="flex flex-wrap gap-2 mb-5"
              style={{ animation: "fadeInUp 0.5s ease 0.12s backwards" }}
            >
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest text-white/90 bg-white/15 border border-white/25 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* H1 */}
          <h1
            className="font-[--font-playfair-display] text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight mb-5 max-w-3xl drop-shadow-sm"
            style={{ animation: "fadeInUp 0.6s ease 0.2s backwards" }}
          >
            {decodeBlogText(post.title)}
          </h1>

          {/* Summary */}
          {post.summary && (
            <p
              className="text-blue-100/85 text-base sm:text-lg leading-relaxed mb-5 max-w-2xl"
              style={{ animation: "fadeInUp 0.6s ease 0.3s backwards" }}
            >
              {decodeBlogText(post.summary)}
            </p>
          )}

          {/* Meta row */}
          <div
            className="flex flex-wrap items-center gap-2 text-blue-200/75 text-sm mb-1"
            style={{ animation: "fadeInUp 0.5s ease 0.38s backwards" }}
          >
            {displayDate && <span>{displayDate}</span>}
            {post.reading_minutes != null && (
              <>
                <span>•</span>
                <span>{post.reading_minutes} min read</span>
              </>
            )}
            {post.author_name && (
              <>
                <span>•</span>
                <span>{decodeBlogText(post.author_name)}</span>
              </>
            )}
          </div>

          {/* Share buttons */}
          <div style={{ animation: "fadeInUp 0.5s ease 0.44s backwards" }}>
            <BlogShareButtons url={canonicalUrl} title={decodeBlogText(post.title)} />
          </div>
        </div>
      </section>

      {/* Article + Sidebar */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 sm:pb-20">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start">

        {/* Article column */}
        <main className="min-w-0 flex-1">
        <article className="min-w-0">
          <KeyTakeaways items={post.key_takeaways} />

          <CdnImageGallery images={post.cdn_images} postTitle={decodeBlogText(post.title)} />

          <section
            className="blog-prose prose prose-sm sm:prose-base prose-lg max-w-none mt-6 sm:mt-8
              prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-4
              prose-h2:font-[--font-playfair-display] prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-semibold prose-h2:text-gray-900 prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-l-4 prose-h2:border-blue-600 prose-h2:pl-4 prose-h2:border-gray-200 prose-h2:tracking-tight
              prose-h3:font-[--font-playfair-display] prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-gray-900 prose-h3:mt-8 prose-h3:mb-3 prose-h3:tracking-tight
              prose-h4:text-lg sm:prose-h4:text-xl prose-h4:font-semibold prose-h4:text-gray-900 prose-h4:mt-6 prose-h4:mb-2
              prose-h5:text-base sm:prose-h5:text-lg prose-h5:font-semibold prose-h5:text-gray-900 prose-h5:mt-4 prose-h5:mb-2
              prose-h6:text-sm sm:prose-h6:text-base prose-h6:font-semibold prose-h6:text-gray-800 prose-h6:mt-3 prose-h6:mb-1
              prose-img:rounded-xl prose-img:w-full prose-img:shadow-sm
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ol:my-4 prose-ol:pl-6 prose-ol:list-decimal prose-ol:list-outside
              prose-ul:my-4 prose-ul:pl-6 prose-ul:list-disc prose-ul:list-outside
              prose-li:my-1.5 prose-li:leading-relaxed prose-li:pl-1
              prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-800 prose-blockquote:my-6
              prose-hr:border-gray-200 prose-hr:my-8
              prose-em:italic prose-em:text-gray-800"
          >
            {post.sections && post.sections.length > 0 ? (
              post.sections.map((block, index) => (
                <div key={index} className="blog-section-block">
                  {block.content_html ? (
                    <div
                      className="section-content"
                      dangerouslySetInnerHTML={{
                        __html: normalizeBlogContent(block.content_html),
                      }}
                    />
                  ) : null}
                  {block.image_url ? (
                    <figure className="mt-6 mb-6 w-full">
                      <div className="relative w-full overflow-hidden rounded-xl border border-gray-200/80 shadow-md ring-1 ring-gray-900/5 aspect-video sm:aspect-[2/1]">
                        {isOptimizableUrl(block.image_url) ? (
                          <Image
                            src={block.image_url}
                            alt={`${post.title} - Section ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 672px, (min-width: 640px) 100vw, 100vw"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={block.image_url}
                            alt={`${post.title} - Section ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </figure>
                  ) : null}
                  {block.video_url ? (
                    <div className="mt-6 mb-6 w-full overflow-hidden rounded-xl border border-gray-200/80 shadow-md ring-1 ring-gray-900/5 aspect-video">
                      <iframe
                        src={block.video_url}
                        title={`${post.title} - Section ${index + 1} video`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: normalizeBlogContent(contentWithIds),
                }}
              />
            )}
          </section>

          <FAQAccordion items={post.faq} />

          {/* Bottom CTA */}
          <section className="mt-10 sm:mt-14" aria-label="Call to action">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              {/* Background gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #051937 0%, #003e8d 55%, #1265eb 100%)",
                }}
                aria-hidden
              />
              {/* Subtle radial glow */}
              <div
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)" }}
                aria-hidden
              />

              <div className="relative z-10 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Attorney photo */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-2 ring-white/30 shrink-0">
                      <Image
                        src="/fischettiheadshot5.png"
                        alt="Attorney Michael J. Fischetti"
                        fill
                        className="object-cover object-[50%_15%]"
                        sizes="80px"
                      />
                    </div>
                    <div className="sm:hidden">
                      <p className="text-xs text-blue-300 font-medium uppercase tracking-widest mb-0.5">Free Consultation</p>
                      <h2 className="text-lg font-semibold text-white leading-tight">
                        Were your rights violated?
                      </h2>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="hidden sm:block text-xs text-blue-300 font-medium uppercase tracking-widest mb-1">Free Consultation</p>
                    <h2 className="hidden sm:block text-xl sm:text-2xl font-semibold text-white mb-1.5 font-[--font-playfair-display]">
                      Were your rights violated?
                    </h2>
                    <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                      We fight for consumers — no upfront cost, no fee unless we win.{" "}
                      <a
                        href={`tel:${PRIMARY_PHONE_E164}`}
                        className="text-white font-semibold underline decoration-white/40 hover:decoration-white transition-all"
                      >
                        {PRIMARY_PHONE}
                      </a>
                    </p>
                  </div>

                  <div className="shrink-0">
                    <FreeCaseReviewDialog>
                      <FreeCaseReview className="w-full sm:w-auto rounded-xl bg-white text-blue-700 hover:bg-blue-50 px-7 py-3 text-base font-semibold shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 duration-200" />
                    </FreeCaseReviewDialog>
                  </div>
                </div>

                <p className="mt-5 text-xs text-blue-200/60 border-t border-white/10 pt-4">
                  <Link href="/" className="hover:text-blue-200 transition-colors">
                    Consumer Law Florida
                  </Link>{" "}
                  · Licensed Florida attorneys · Serving clients statewide by phone &amp; video
                </p>
              </div>
            </div>
          </section>

          {/* Related posts — mobile only (desktop sees them in sidebar) */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 sm:mt-16 lg:hidden" aria-label="Related articles">
              <h2 className="text-2xl font-[--font-playfair-display] text-gray-900 mb-6 pb-3 border-b border-gray-200">
                More Consumer Rights Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {relatedPosts.map((rp, i) => (
                  <BlogCard key={rp.id} post={rp} index={i} />
                ))}
              </div>
            </section>
          )}
        </article>
        </main>

        {/* Right sidebar — desktop only */}
        <BlogSidebar contentHtml={contentWithIds} relatedPosts={relatedPosts} />

        </div>
      </div>
    </>
  )
}
