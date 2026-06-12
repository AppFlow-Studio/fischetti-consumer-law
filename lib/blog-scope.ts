type BlogScopeFields = {
  slug?: string | null
  title?: string | null
  summary?: string | null
  meta_title?: string | null
  meta_description?: string | null
  tags?: string[] | null
}

const RETIRED_TOPIC_PATTERNS = [
  /\bvppa\b/i,
  /video privacy/i,
  /\bprivacy (?:violation|claim|lawsuit)/i,
  /data breach/i,
  /\bfair housing\b/i,
  /\bhousing discrimination\b/i,
  /\bmass arbitration\b/i,
  /\bforced arbitration\b/i,
]

export function isRetiredTopicPost(post: BlogScopeFields): boolean {
  const searchableText = [
    post.slug,
    post.title,
    post.summary,
    post.meta_title,
    post.meta_description,
    ...(post.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")

  return RETIRED_TOPIC_PATTERNS.some((pattern) => pattern.test(searchableText))
}
