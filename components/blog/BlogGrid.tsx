import type { BlogPostPreview } from "@/types/blog"
import { BlogCard } from "./BlogCard"

type BlogGridProps = {
  posts: BlogPostPreview[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <section className="w-full rounded-xl sm:rounded-2xl border bg-white px-4 sm:px-6 py-8 sm:py-10 text-center shadow-sm">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-3">
          Consumer Law Florida Blog Coming Soon
        </h2>
        <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto px-1">
          We&apos;re putting together in-depth guides on credit reporting errors,
          debt collection harassment, robocalls and spam texts, data privacy, and
          other consumer rights issues in Florida. Check back soon for practical
          tips and real-world case insights from our team.
        </p>
      </section>
    )
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </section>
  )
}
