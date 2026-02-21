import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SITE_URL } from "@/lib/site"
import { GetBlogInfo } from "@/lib/get-blogs"
import { KeyTakeaways } from "@/components/blog/KeyTakeaways"
import { FAQAccordion } from "@/components/blog/FAQAccordion"
import { CdnImageGallery } from "@/components/blog/CdnImageGallery"
import { Card } from "@/components/ui/card"
import FreeCaseReviewDialog from "@/components/free-case-review-dialog"
import FreeCaseReview from "@/components/free-case-review-button"
import { isOptimizableUrl } from "@/lib/is-optimizable-url"
import { normalizeBlogContent } from "@/lib/normalize-blog-html"
import Image from "next/image"

type BlogDetailPageParams = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogDetailPageParams): Promise<Metadata> {
  const { slug } = await params
  const post = await GetBlogInfo(slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  const title = post.meta_title || post.title
  const description = post.meta_description || post.summary || ""
  const canonicalPath = `/blog/${post.slug}`
  const url = `${SITE_URL}${canonicalPath}`
  const image = post.og_image_url || post.thumbnail_url || "/opengraph-default.png"

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    keywords: post.keywords ?? undefined,
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`,
      ],
    },
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageParams) {
  const { slug } = await params
  const post = await GetBlogInfo(slug)

  if (!post) {
    notFound()
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta_title || post.title,
    description: post.meta_description || post.summary || "",
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    datePublished: post.date_published || undefined,
    dateModified: post.updated_at || undefined,
    author: {
      "@type": "Person",
      name: post.author_name || "Consumer Law Florida",
    },
    publisher: {
      "@type": "Organization",
      name: "Consumer Law Florida",
    },
    image: (post.og_image_url || post.thumbnail_url)
      ? (post.og_image_url || post.thumbnail_url)
      : undefined,
    keywords: post.keywords && post.keywords.length > 0 ? post.keywords : undefined,
    timeRequired: post.reading_minutes != null ? `PT${post.reading_minutes}M` : undefined,
  }

  const faqSchema = post.faq && post.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
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

  return (
    <>
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
      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20">
        <article className="min-w-0">
          <header className="mb-6 sm:mb-8 pb-6 border-b border-gray-200/80">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[--font-playfair-display] font-semibold text-gray-900 mb-3 sm:mb-4 leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-600">
              {displayDate && <span className="shrink-0">{displayDate}</span>}
              {post.reading_minutes != null && (
                <>
                  {displayDate && <span className="text-gray-300 shrink-0">•</span>}
                  <span className="shrink-0">{post.reading_minutes} min read</span>
                </>
              )}
              {tags.length > 0 && (
                <>
                  {(displayDate || post.reading_minutes != null) && (
                    <span className="text-gray-300 shrink-0">•</span>
                  )}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-blue-700 uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {post.summary && (
              <p className="text-base sm:text-lg text-gray-800 mb-4 leading-relaxed">
                {post.summary}
              </p>
            )}

            {(post.og_image_url || post.thumbnail_url) && (
              <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/80 shadow-md ring-1 ring-gray-900/5 mt-4">
                <Image
                  src={post.og_image_url || post.thumbnail_url || "/opengraph-default.png"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 672px, (min-width: 640px) 100vw, 100vw"
                  priority
                />
              </div>
            )}
          </header>

          <KeyTakeaways items={post.key_takeaways} />

          <CdnImageGallery images={post.cdn_images} postTitle={post.title} />

          <section
            className="blog-prose prose prose-sm sm:prose-base prose-lg max-w-none mt-8 sm:mt-10
              prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-4
              prose-h2:font-[--font-playfair-display] prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-semibold prose-h2:text-gray-900 prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200 prose-h2:tracking-tight
              prose-h3:font-[--font-playfair-display] prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-gray-900 prose-h3:mt-8 prose-h3:mb-3 prose-h3:tracking-tight
              prose-h4:text-lg sm:prose-h4:text-xl prose-h4:font-semibold prose-h4:text-gray-900 prose-h4:mt-6 prose-h4:mb-2
              prose-h5:text-base sm:prose-h5:text-lg prose-h5:font-semibold prose-h5:text-gray-900 prose-h5:mt-4 prose-h5:mb-2
              prose-h6:text-sm sm:prose-h6:text-base prose-h6:font-semibold prose-h6:text-gray-800 prose-h6:mt-3 prose-h6:mb-1
              prose-img:rounded-xl prose-img:w-full prose-img:shadow-sm
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:decoration-blue-600 prose-a:underline-offset-2 focus:prose-a:outline-none focus:prose-a:ring-2 focus:prose-a:ring-blue-500 focus:prose-a:ring-offset-2 focus:prose-a:rounded
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
                      dangerouslySetInnerHTML={{ __html: normalizeBlogContent(block.content_html) }}
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
              <div dangerouslySetInnerHTML={{ __html: normalizeBlogContent(post.content_html) }} />
            )}
          </section>

          <FAQAccordion items={post.faq} />

          <section className="mt-10 sm:mt-12" aria-label="Call to action">
            <Card className="overflow-hidden rounded-2xl border-gray-200/80 bg-gradient-to-br from-blue-600 to-blue-700 p-6 sm:p-8 text-white shadow-lg ring-1 ring-gray-900/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                    Need a Free Case Review?
                  </h2>
                  <p className="text-sm sm:text-base text-blue-100">
                    If your consumer rights were violated, we can help. No fee unless we win.
                  </p>
                </div>
                <div className="shrink-0">
                  <FreeCaseReviewDialog>
                    <FreeCaseReview className="w-full sm:w-auto rounded-xl bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 text-base font-semibold shadow-md transition-colors" />
                  </FreeCaseReviewDialog>
                </div>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-blue-100/90">
                <Link href="/" className="underline hover:text-white">Consumer Law Florida</Link> serves clients statewide by phone and video.
              </p>
            </Card>
          </section>
        </article>
      </main>
    </>
  )
}

