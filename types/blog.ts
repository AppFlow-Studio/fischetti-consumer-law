export type FAQItem = {
  question: string
  answer: string
}

/** Optional per-section content and media. CMS can store sections with image_url and/or video_url. */
export type BlogSection = {
  content_html: string
  image_url?: string | null
  video_url?: string | null
}

export type BlogPostPreview = {
  id: string
  title: string
  slug: string
  summary: string | null
  thumbnail_url: string | null
  tags: string[] | null
  date_published: string | null
  reading_minutes: number | null
  meta_title: string | null
  meta_description: string | null
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  summary: string | null
  content_html: string
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string[] | null
  keywords: string[] | null
  tags: string[] | null
  thumbnail_url: string | null
  og_image_url: string | null
  cdn_images: string[] | null
  sections: BlogSection[] | null
  key_takeaways: string[] | null
  faq: FAQItem[] | null
  canonical_url: string | null
  reading_minutes: number | null
  status: string
  date_published: string | null
  author_name: string | null
  created_at: string
  updated_at: string | null
}

