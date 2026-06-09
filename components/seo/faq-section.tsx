// Server Component — no "use client"
import { buildFAQSchema } from "@/lib/seo"
import { FAQAccordion } from "@/components/seo/faq-accordion"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
}

export function FAQSection({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) {
  if (!faqs?.length) return null

  const schema = buildFAQSchema(faqs)

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto px-4">
        <h2
          id="faq-heading"
          className="text-3xl font-bold text-center mb-10 font-[var(--font-playfair-display)] text-[#002b60]"
        >
          {title}
        </h2>
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  )
}
