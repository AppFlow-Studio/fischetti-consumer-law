"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { Clock, Scale } from "lucide-react"
import type { BlogPostPreview } from "@/types/blog"

type BlogCardProps = {
  post: BlogPostPreview
  index?: number
}

function getTagColor(tag: string): string {
  const t = tag.toLowerCase()
  if (t.includes("tcpa") || t.includes("robocall")) return "bg-sky-500/80"
  if (t.includes("fdcpa") || t.includes("debt")) return "bg-blue-600/80"
  if (t.includes("fcra") || t.includes("credit")) return "bg-indigo-600/80"
  if (t.includes("data breach") || t.includes("privacy")) return "bg-purple-600/80"
  if (t.includes("fair housing")) return "bg-teal-600/80"
  if (t.includes("mass arbitration")) return "bg-orange-600/80"
  if (t.includes("vppa")) return "bg-rose-600/80"
  return "bg-blue-600/80"
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const { slug, title, summary, thumbnail_url, tags, date_published, reading_minutes } = post

  const displayDate = date_published
    ? new Date(date_published).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null

  const displayTags = (tags ?? []).slice(0, 2)
  const delay = Math.min(index * 0.07, 0.35)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className="h-full"
    >
      <Link
        href={`/blog/${slug}`}
        className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-lg hover:ring-2 hover:ring-blue-500/20 transition-all duration-300 h-full"
      >
        {/* Thumbnail */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden flex-shrink-0">
          {thumbnail_url ? (
            <>
              <Image
                src={thumbnail_url}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
            </>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)",
              }}
            >
              <Scale className="w-12 h-12 text-white/30" aria-hidden />
            </div>
          )}

          {/* Tags over image */}
          {displayTags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
          {/* Date + reading time */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            {displayDate && <span>{displayDate}</span>}
            {reading_minutes != null && (
              <>
                {displayDate && <span className="text-gray-300">•</span>}
                <Clock className="w-3 h-3 shrink-0" aria-hidden />
                <span>{reading_minutes} min read</span>
              </>
            )}
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-semibold font-[--font-playfair-display] text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
            {title}
          </h2>

          {/* Summary */}
          {summary && (
            <p className="text-sm text-gray-600 line-clamp-3 flex-1">{summary}</p>
          )}

          {/* Read article */}
          <div className="mt-auto pt-2 flex items-center gap-1 text-sm font-medium text-blue-600">
            <span>Read article</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
