"use client"

import { useEffect, useState } from "react"

type BlogShareButtonsProps = {
  url: string
  title: string
}

export default function BlogShareButtons({ url, title }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [instagramCopied, setInstagramCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState(url)
  const shareText = `${title}\n\n${shareUrl}`

  useEffect(() => {
    if (typeof window !== "undefined" && window.location?.href) {
      setShareUrl(window.location.href)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: do nothing
    }
  }

  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`

  const handleInstagramShare = async () => {
    // Use native share sheet when available so apps can receive title + link directly.
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        })
        return
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return
        }
      }
    }

    try {
      await navigator.clipboard.writeText(shareText)
      setInstagramCopied(true)
      setTimeout(() => setInstagramCopied(false), 2000)
    } catch {
      // fallback: do nothing
    }
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer")
  }

  const btnClass =
    "w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-colors"

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-blue-200/70 text-sm">Share:</span>

      {/* Facebook */}
      <a
        href={fbUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label="Share on Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label={`Share "${title}" on LinkedIn`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.036-1.85-3.036-1.853 0-2.136 1.445-2.136 2.939v5.666H9.353V9h3.414v1.561h.047c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.266 2.371 4.266 5.455v6.286zM5.337 7.433a2.063 2.063 0 1 1 .001-4.126 2.063 2.063 0 0 1-.001 4.126zM7.116 20.452H3.558V9h3.558v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      {/* Instagram */}
      <button
        onClick={handleInstagramShare}
        className={`${btnClass} relative`}
        aria-label={`Share "${title}" on Instagram`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5z" />
          <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
          <circle cx="17.5" cy="6.5" r="1.2" />
        </svg>
        {instagramCopied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
            Caption + link copied
          </span>
        )}
      </button>

      {/* Copy link */}
      <button onClick={handleCopy} className={`${btnClass} relative`} aria-label="Copy link">
        {/* Rounded square open at top-right, arrow curving up and right out of it */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <path d="M12 12C12 7.5 16 4 21 4" />
          <polyline points="18 1 21 4 18 7" />
        </svg>
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
            Copied!
          </span>
        )}
      </button>
    </div>
  )
}
