"use client"

import { motion } from "motion/react"
import type { FAQItem } from "@/types/blog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type FAQAccordionProps = {
  items?: FAQItem[] | null
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  if (!items || items.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-10 sm:mt-12"
      aria-labelledby="blog-faq-heading"
    >
      <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm ring-1 ring-gray-900/5">
        {/* Accent bar */}
        <div
          className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-blue-500 sm:w-1.5"
          aria-hidden
        />
        <div className="pl-5 sm:pl-6 pr-4 sm:pr-6 pt-5 sm:pt-6 pb-1">
          <h2
            id="blog-faq-heading"
            className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <HelpCircle className="h-4 w-4" aria-hidden />
            </span>
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={undefined}
          >
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className={cn(
                  "border-gray-200/80 transition-colors",
                  "data-[state=open]:bg-blue-50/30",
                  "first:pt-0 last:border-b-0"
                )}
              >
                <AccordionTrigger className="py-4 text-left text-sm sm:text-base font-medium text-gray-900 hover:text-blue-700 hover:no-underline [&[data-state=open]]:text-blue-800 [&[data-state=open]]:bg-blue-50/50 rounded-lg px-3 -mx-3 transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-gray-700 leading-relaxed pb-4 pt-0 pl-3">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </motion.section>
  )
}
