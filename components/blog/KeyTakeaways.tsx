"use client"

import { motion } from "motion/react"
import { Zap } from "lucide-react"

type KeyTakeawaysProps = {
  items?: string[] | null
}

export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  if (!items || items.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-0"
    >
      <div className="relative rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white overflow-hidden">
        {/* Thin top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-blue-400" aria-hidden />

        <div className="px-4 sm:px-5 pt-4 pb-4 sm:pb-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white shrink-0">
              <Zap className="h-3.5 w-3.5" aria-hidden />
            </span>
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-700">
              Key Takeaways
            </h2>
            <span className="ml-auto text-xs text-blue-400 font-medium tabular-nums">
              {items.length} points
            </span>
          </div>

          {/* Items — two-column on sm+ if 4+ items, else single column */}
          <ol
            className={`grid gap-x-5 gap-y-2 ${items.length >= 4 ? "sm:grid-cols-2" : "grid-cols-1"}`}
            role="list"
          >
            {items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.28, delay: index * 0.04 }}
                className="flex items-start gap-2.5 text-sm text-gray-700 leading-snug"
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-[11px] font-bold text-blue-700 mt-px"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </motion.section>
  )
}
