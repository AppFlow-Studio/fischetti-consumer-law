'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQ {
  question: string
  answer: string
}

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  if (!faqs?.length) return null

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {faqs.map((faq, i) => (
        <AccordionItem 
          key={i} 
          value={`item-${i}`}
          className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 px-2"
        >
          <AccordionTrigger className="px-4 hover:no-underline py-5 text-left font-bold text-[#002b60] text-base md:text-lg transition-colors hover:text-blue-600 data-[state=open]:text-blue-600">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6 pt-0 text-gray-700 leading-relaxed text-base">
            <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-p:text-gray-600">
              {faq.answer}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
