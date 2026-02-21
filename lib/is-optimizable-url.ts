/**
 * Returns true if the URL's host is allowed for next/image optimization.
 * Used by blog section images and CdnImageGallery.
 */
export function isOptimizableUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname
    if (host === "uhbyrvazvzoqkixwliqu.supabase.co") return true
    if (host.endsWith(".supabase.co")) return true
    if (host.endsWith(".b-cdn.net")) return true
    return false
  } catch {
    return false
  }
}
