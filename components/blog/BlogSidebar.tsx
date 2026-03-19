"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Scale, PhoneCall } from "lucide-react"
import FreeCaseReviewDialog from "@/components/free-case-review-dialog"
import FreeCaseReview from "@/components/free-case-review-button"
import { PRIMARY_PHONE, PRIMARY_PHONE_E164 } from "@/lib/site"
import type { BlogPostPreview } from "@/types/blog"

type Heading = { id: string; text: string }

function parseHeadings(html: string): Heading[] {
  return Array.from(html.matchAll(/<h2[^>]*\sid="([^"]+)"[^>]*>(.*?)<\/h2>/gi))
    .map((m) => ({ id: m[1], text: m[2].replace(/<[^>]*>/g, "").trim() }))
    .filter((h) => h.id && h.text)
}

type Props = {
  contentHtml: string
  relatedPosts: BlogPostPreview[]
}

export default function BlogSidebar({ contentHtml, relatedPosts }: Props) {
  const [activeId, setActiveId] = useState("")
  const headings = parseHeadings(contentHtml)

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentHtml])

  return (
    <aside className="hidden lg:flex flex-col w-[280px] xl:w-[300px] flex-shrink-0">
      <div className="sticky top-28 flex flex-col gap-5">

        {/* Table of Contents */}
        {headings.length >= 2 && (
          <div className="rounded-xl border border-gray-200/80 bg-white shadow-sm p-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-semibold">
              On this page
            </p>
            <nav aria-label="Table of contents">
              <ul className="space-y-0.5">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" })
                        setActiveId(h.id)
                      }}
                      className={`block text-sm py-1 leading-snug transition-colors ${
                        activeId === h.id
                          ? "text-blue-600 font-medium"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Attorney CTA card */}
        <div
          className="rounded-xl p-4 text-white"
          style={{ background: "radial-gradient(circle at top left, #002b60, #003e8d, #1265eb)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/30 shrink-0">
              <Image
                src="/fischettiheadshot5.png"
                alt="Michael J. Fischetti"
                fill
                className="object-cover object-[50%_15%]"
                sizes="44px"
              />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Michael J. Fischetti</div>
              <div className="text-blue-200 text-[11px]">Lead Consumer Rights Attorney</div>
            </div>
          </div>
          <p className="text-blue-100 text-xs leading-relaxed mb-3">
            Think your rights were violated? Get a free case review — no fee unless we win.
          </p>
          <FreeCaseReviewDialog>
            <FreeCaseReview className="w-full rounded-lg bg-white text-blue-700 hover:bg-blue-50 px-3 py-2 text-sm font-semibold shadow transition-colors" />
          </FreeCaseReviewDialog>
          <a
            href={`tel:${PRIMARY_PHONE_E164}`}
            className="mt-2 flex items-center justify-center gap-1.5 text-blue-200 hover:text-white transition-colors text-xs"
          >
            <PhoneCall className="w-3 h-3" />
            {PRIMARY_PHONE}
          </a>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="rounded-xl border border-gray-200/80 bg-white shadow-sm p-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-semibold">
              Related articles
            </p>
            <ul className="flex flex-col gap-3">
              {relatedPosts.map((post) => {
                const date = post.date_published
                  ? new Date(post.date_published).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : null
                return (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex gap-3 items-start hover:bg-gray-50 rounded-lg p-1.5 -mx-1.5 transition-colors"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                        {post.thumbnail_url ? (
                          <Image
                            src={post.thumbnail_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{
                              background:
                                "radial-gradient(circle, #051937, #002b60, #1265eb)",
                            }}
                          >
                            <Scale className="w-5 h-5 text-white/40" />
                          </div>
                        )}
                      </div>
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-400">
                          {date && <span>{date}</span>}
                          {post.reading_minutes != null && (
                            <>
                              <span>·</span>
                              <Clock className="w-3 h-3" />
                              <span>{post.reading_minutes}m</span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <Link
              href="/blog"
              className="mt-3 block text-center text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors pt-3 border-t border-gray-100"
            >
              View all articles →
            </Link>
          </div>
        )}

      </div>
    </aside>
  )
}
