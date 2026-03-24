/**
 * Normalizes blog content so plain-text list lines (e.g. pasted from Word/Google Docs)
 * are rendered as HTML lists when the CMS didn't save <ol>/<ul>.
 * If content already contains list tags, returns as-is.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/** Fix double-encoded HTML entities, e.g. &amp;amp; → &amp;, &amp;lt; → &lt; */
function decodeDoubleEncodedEntities(html: string): string {
  return html.replace(/&amp;(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);/g, "&$1;")
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
