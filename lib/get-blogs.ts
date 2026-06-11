import { unstable_noStore as noStore } from "next/cache"
import { supabase } from "@/utils/supabase/server"
import type { BlogPost, BlogPostPreview } from "@/types/blog"
import { isRetiredTopicPost } from "@/lib/blog-scope"

const BLOG_TABLE =
  process.env.NEXT_PUBLIC_SUPABASE_BLOG_TABLE ?? "posts"

export async function GetBlogs(): Promise<BlogPostPreview[]> {
  noStore()

  try {
    const { data, error } = await supabase
      .from(BLOG_TABLE)
      .select(
        `
        id,
        title,
        slug,
        summary,
        thumbnail_url,
        tags,
        date_published,
        reading_minutes,
        meta_title,
        meta_description
      `,
      )
      .eq("status", "published")
      .order("date_published", { ascending: false })

    if (error) {
      console.error("GetBlogs error:", error.message, error.code, error.details)
      return []
    }

    return ((data ?? []) as BlogPostPreview[]).filter((post) => !isRetiredTopicPost(post))
  } catch (err) {
    console.error("GetBlogs unexpected error:", err)
    return []
  }
}

export async function GetBlogInfo(slug: string): Promise<BlogPost | null> {
  noStore()

  try {
    const { data, error } = await supabase
      .from(BLOG_TABLE)
      .select(
        `
        id,
        title,
        slug,
        summary,
        content_html,
        meta_title,
        meta_description,
        meta_keywords,
        keywords,
        tags,
        thumbnail_url,
        og_image_url,
        cdn_images,
        key_takeaways,
        faq,
        canonical_url,
        reading_minutes,
        status,
        date_published,
        author_name,
        created_at,
        updated_at
      `,
      )
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()

    if (error) {
      console.error("GetBlogInfo error:", error.message, error.code, error.details)
      return null
    }

    if (!data || isRetiredTopicPost(data)) return null

    // posts.sections may not exist; use null so UI falls back to content_html
    return { ...data, sections: (data as { sections?: unknown }).sections ?? null } as BlogPost
  } catch (err) {
    console.error("GetBlogInfo unexpected error:", err)
    return null
  }
}

export async function GetBlogsPaginated(
  page = 1,
  perPage = 12,
  tag?: string,
): Promise<{ posts: BlogPostPreview[]; total: number; totalPages: number }> {
  noStore()

  const safePage = Number.isFinite(page) && page > 0 ? page : 1
  const safePerPage = Number.isFinite(perPage) && perPage > 0 ? perPage : 12
  try {
    let query = supabase
      .from(BLOG_TABLE)
      .select(
        `
        id,
        title,
        slug,
        summary,
        thumbnail_url,
        tags,
        date_published,
        reading_minutes,
        meta_title,
        meta_description
      `,
        { count: "exact" },
      )
      .eq("status", "published")

    if (tag) {
      query = query.contains("tags", [tag])
    }

    const { data, error } = await query
      .order("date_published", { ascending: false })

    if (error) {
      console.error("GetBlogsPaginated error:", error.message, error.code, error.details)
      return { posts: [], total: 0, totalPages: 0 }
    }

    const eligiblePosts = ((data ?? []) as BlogPostPreview[]).filter(
      (post) => !isRetiredTopicPost(post),
    )
    const total = eligiblePosts.length
    const totalPages = total > 0 ? Math.ceil(total / safePerPage) : 0
    const from = (safePage - 1) * safePerPage
    const posts = eligiblePosts.slice(from, from + safePerPage)

    return {
      posts,
      total,
      totalPages,
    }
  } catch (err) {
    console.error("GetBlogsPaginated unexpected error:", err)
    return { posts: [], total: 0, totalPages: 0 }
  }
}

export async function GetRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3,
): Promise<BlogPostPreview[]> {
  noStore()

  const selectFields = `
    id, title, slug, summary, thumbnail_url,
    tags, date_published, reading_minutes,
    meta_title, meta_description
  `

  try {
    // First try: posts sharing the first tag, excluding current
    if (tags.length > 0) {
      const { data, error } = await supabase
        .from(BLOG_TABLE)
        .select(selectFields)
        .eq("status", "published")
        .neq("slug", currentSlug)
        .contains("tags", [tags[0]])
        .order("date_published", { ascending: false })
        .limit(limit * 4)

      if (!error && data && data.length > 0) {
        const eligiblePosts = (data as BlogPostPreview[]).filter(
          (post) => !isRetiredTopicPost(post),
        )
        if (eligiblePosts.length > 0) return eligiblePosts.slice(0, limit)
      }
    }

    // Fallback: latest posts excluding current
    const { data, error } = await supabase
      .from(BLOG_TABLE)
      .select(selectFields)
      .eq("status", "published")
      .neq("slug", currentSlug)
      .order("date_published", { ascending: false })
      .limit(limit * 4)

    if (error) {
      console.error("GetRelatedPosts error:", error.message, error.code)
      return []
    }

    return ((data ?? []) as BlogPostPreview[])
      .filter((post) => !isRetiredTopicPost(post))
      .slice(0, limit)
  } catch (err) {
    console.error("GetRelatedPosts unexpected error:", err)
    return []
  }
}

export async function GetBlogPreviews(): Promise<BlogPostPreview[]> {
  return GetBlogs()
}

export async function GetAllBlogSlugs(): Promise<string[]> {
  noStore()

  try {
    const { data, error } = await supabase
      .from(BLOG_TABLE)
      .select("slug, title, summary, meta_title, meta_description, tags")
      .eq("status", "published")
      .order("date_published", { ascending: false })

    if (error) {
      console.error("GetAllBlogSlugs error:", error.message, error.code, error.details)
      return []
    }

    return (data ?? [])
      .filter((post) => !isRetiredTopicPost(post))
      .map((row) => row.slug as string)
  } catch (err) {
    console.error("GetAllBlogSlugs unexpected error:", err)
    return []
  }
}

export async function GetBlogSearchIndex(
  limit = 50,
): Promise<
  Array<{
    id: string
    slug: string
    title: string
    date_published: string | null
    updated_at: string | null
  }>
> {
  noStore()

  try {
    const { data, error } = await supabase
      .from(BLOG_TABLE)
      .select("id, slug, title, summary, meta_title, meta_description, tags, date_published, updated_at")
      .eq("status", "published")
      .order("date_published", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("GetBlogSearchIndex error:", error.message, error.code, error.details)
      return []
    }

    return (data ?? [])
      .filter((post) => !isRetiredTopicPost(post))
      .map((post) => ({
        id: post.id as string,
        slug: post.slug as string,
        title: post.title as string,
        date_published: post.date_published as string | null,
        updated_at: post.updated_at as string | null,
      }))
  } catch (err) {
    console.error("GetBlogSearchIndex unexpected error:", err)
    return []
  }
}
