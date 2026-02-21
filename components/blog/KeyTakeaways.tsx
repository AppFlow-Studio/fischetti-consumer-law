"use client"

import { motion } from "motion/react"
import { Lightbulb } from "lucide-react"

type KeyTakeawaysProps = {
  items?: string[] | null
}

export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  if (!items || items.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-8 sm:mt-10"
    >
      <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm ring-1 ring-gray-900/5">
        {/* Accent bar */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-blue-500 sm:w-1.5" aria-hidden />
        <div className="pl-5 sm:pl-6 pr-4 sm:pr-6 py-5 sm:py-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Lightbulb className="h-4 w-4" aria-hidden />
            </span>
            Key Takeaways
          </h2>
          <ol className="space-y-3 sm:space-y-4" role="list">
            {items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex gap-3 sm:gap-4 text-sm sm:text-base text-gray-800 leading-relaxed"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white sm:h-7 sm:w-7 sm:text-[13px]"
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
