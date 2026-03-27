"use client"

import { useEffect, useState } from "react"

type Heading = {
  id: string
  text: string
}

type BlogTableOfContentsProps = {
  contentHtml: string
}

function decodeHtmlEntities(str: string): string {
  let result = str
  let prev: string
  do {
    prev = result
    result = result
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
  } while (result !== prev)
  return result
}

function parseHeadings(html: string): Heading[] {
  const matches = Array.from(html.matchAll(/<h2[^>]*\sid="([^"]+)"[^>]*>(.*?)<\/h2>/gi))
  return matches
    .map((m) => ({
      id: m[1],
      text: decodeHtmlEntities(m[2].replace(/<[^>]*>/g, "").trim()),
    }))
    .filter((h) => h.id && h.text)
}

export default function BlogTableOfContents({ contentHtml }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const headings = parseHeadings(contentHtml)

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentHtml])

  if (headings.length < 2) return null

  return (
    <aside className="hidden lg:block fixed right-6 top-32 w-52 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200/80 shadow-sm p-4 z-10 max-h-[calc(100vh-160px)] overflow-y-auto">
      <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-3 font-medium">
        On this page
      </p>
      <nav aria-label="Table of contents">
        <ul className="space-y-0.5">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" })
                  setActiveId(h.id)
                }}
                className={`block text-sm py-1 leading-snug truncate transition-colors ${
                  activeId === h.id
                    ? "text-blue-600 font-medium"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
