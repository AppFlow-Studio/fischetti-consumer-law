/**
 * Normalizes blog content so plain-text list lines (e.g. pasted from Word/Google Docs)
 * are rendered as HTML lists when the CMS didn't save <ol>/<ul>.
 * If content already contains list tags, returns as-is.
 */

/**
 * Decode HTML entities in plain text fields for JSX rendering.
 * Use this when rendering post.title, post.summary, etc. via {text} in JSX,
 * because React renders strings verbatim — it does NOT decode &amp; → &.
 */
export function decodeBlogText(text: string): string {
  if (!text || typeof text !== "string") return text
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}

/**
 * Escape text for safe HTML insertion.
 * Decodes any pre-existing HTML entities first to prevent double-encoding
 * (e.g. stored &amp; would otherwise become &amp;amp;).
 */
function escapeHtml(text: string): string {
  const decoded = decodeBlogText(text)
  return decoded
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/**
 * Fix over-encoded HTML entities iteratively until stable.
 * Handles double, triple, or any depth of encoding:
 *   &amp;amp; → &amp;, &amp;lt; → &lt;, etc.
 */
function decodeDoubleEncodedEntities(html: string): string {
  let result = html
  let prev: string
  do {
    prev = result
    result = result.replace(/&amp;(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);/g, "&$1;")
  } while (result !== prev)
  return result
}

const NUMBERED_LINE = /^\s*(\d+)\.\s+(.*)$/
const BULLET_LINE = /^\s*([-*•])\s+(.*)$/

export function normalizeBlogContent(html: string): string {
  if (!html || typeof html !== "string") return html
  const trimmed = html.trim()
  if (!trimmed) return html

  // Already has list markup — don't alter
  if (/<ol[\s>]|<ul[\s>]/.test(trimmed)) return decodeDoubleEncodedEntities(html)
  // Any HTML at all — don't convert (would need to escape and could break links)
  if (trimmed.includes("<")) return decodeDoubleEncodedEntities(html)

  const lines = trimmed.split(/\r?\n/)
  const out: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const numMatch = line.match(NUMBERED_LINE)
    const bulletMatch = line.match(BULLET_LINE)

    if (numMatch) {
      const items: string[] = []
      while (i < lines.length && lines[i].match(NUMBERED_LINE)) {
        const m = lines[i].match(NUMBERED_LINE)!
        items.push("<li>" + escapeHtml(m[2].trim()) + "</li>")
        i++
      }
      out.push("<ol>" + items.join("") + "</ol>")
      continue
    }

    if (bulletMatch) {
      const items: string[] = []
      while (i < lines.length && lines[i].match(BULLET_LINE)) {
        const m = lines[i].match(BULLET_LINE)!
        items.push("<li>" + escapeHtml(m[2].trim()) + "</li>")
        i++
      }
      out.push("<ul>" + items.join("") + "</ul>")
      continue
    }

    if (line.trim() === "") {
      i++
      continue
    }
    out.push("<p>" + escapeHtml(line.trim()) + "</p>")
    i++
  }

  if (out.length === 0) return html
  return out.join("\n")
}
