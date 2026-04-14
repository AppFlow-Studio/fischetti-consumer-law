"use client"

import { motion } from "motion/react"
import { Star, Shield, Clock } from "lucide-react"

export default function BlogListingHero() {
  return (
    <section
      id="blog-listing-hero"
      className="relative w-full min-h-[280px] sm:min-h-[320px] pt-32 sm:pt-36 pb-24 sm:pb-28 px-4 sm:px-6 [mask-image:linear-gradient(to_top,transparent,black_10rem)]"
      style={{
        background:
          "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-4"
        >
          <span className="inline-flex items-center bg-white/10 border border-white/20 rounded-full px-3 py-1 text-sky-300 text-xs font-semibold uppercase tracking-widest">
            Consumer Rights Education
          </span>
        </motion.div>

        {/* H1 — initial opacity:1 ensures content is visible in SSR without JS */}
        <motion.h1
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
          className="font-[--font-playfair-display] text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4"
        >
          Consumer Law Florida Blog
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          className="text-base sm:text-lg text-blue-100/90 max-w-2xl mb-8"
        >
          Practical guides on FCRA, FDCPA, and TCPA rights under Florida consumer protection law.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-white/80"
        >
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-sky-400" aria-hidden />
            500+ Reviews
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/20" aria-hidden />
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-sky-400" aria-hidden />
            No Fee Unless We Win
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/20" aria-hidden />
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-sky-400" aria-hidden />
            Available 24/7
          </span>
        </motion.div>
      </div>
    </section>
  )
}
