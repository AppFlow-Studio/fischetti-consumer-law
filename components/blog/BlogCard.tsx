import Link from "next/link"
import Image from "next/image"
import type { BlogPostPreview } from "@/types/blog"

type BlogCardProps = {
  post: BlogPostPreview
}

export function BlogCard({ post }: BlogCardProps) {
  const {
    slug,
    title,
    summary,
    thumbnail_url,
    tags,
    date_published,
    reading_minutes,
  } = post

  const displayDate = date_published
    ? new Date(date_published).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null
  const displayTags = (tags ?? []).slice(0, 3)

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-40 sm:h-48 w-full overflow-hidden">
        <Image
          src={thumbnail_url || "/opengraph-default.png"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-gray-600">
          {displayDate && <span>{displayDate}</span>}
          {reading_minutes != null && (
            <>
              {displayDate && <span className="text-gray-300">•</span>}
              <span>{reading_minutes} min read</span>
            </>
          )}
        </div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 sm:line-clamp-none">
          {title}
        </h2>
        {summary && (
          <p className="text-xs sm:text-sm text-gray-700 line-clamp-3">{summary}</p>
        )}
        {displayTags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {displayTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
