import Link from "next/link"
import { Scale } from "lucide-react"
import type { BlogPostPreview } from "@/types/blog"
import { BlogCard } from "./BlogCard"

type BlogGridProps = {
  posts: BlogPostPreview[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-gray-200/80 bg-white p-8 sm:p-12 text-center shadow-sm">
        <Scale className="w-12 h-12 text-blue-200 mx-auto mb-4" aria-hidden />
        <h2 className="text-2xl font-[var(--font-playfair-display)] text-gray-900 mb-3">
          Consumer Rights Articles Coming Soon
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-6 text-sm sm:text-base">
          We&apos;re putting together in-depth guides on debt collection harassment, 
          robocalls and spam texts, credit report errors, and
          other consumer protection issues in Florida. Check back soon.
        </p>
        <Link
          href="/free-case-review"
          className="inline-flex items-center px-6 py-3 rounded-xl bg-[#1265eb] text-white font-semibold text-sm hover:bg-[#0A50EC] transition-colors shadow-md"
        >
          Get a Free Case Review
        </Link>
      </div>
    )
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </section>
  )
}
