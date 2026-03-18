"use client"

import { useEffect, useState } from "react"

export default function BlogReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-1 z-50 bg-gradient-to-r from-blue-600 to-sky-400"
      style={{ width: `${progress}%`, transition: "width 80ms linear" }}
      aria-hidden="true"
    />
  )
}
