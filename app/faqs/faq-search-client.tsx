"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FAQ = {
    question: string
    answer: string
    category: string
    slug?: string
}

type FAQSearchClientProps = {
    faqs: FAQ[]
}

const categories = [
    { name: "Credit Reporting", slug: "fcra" },
    { name: "Debt Collection", slug: "fdcpa" },
    { name: "Robocalls & Texts", slug: "tcpa" },
    { name: "Privacy & Data Breach", slug: "privacy" },
    { name: "Video Privacy & Tracking Pixels", slug: "vppa" },
    { name: "Fair Housing", slug: "fha" },
    { name: "Mass Arbitration", slug: "mass-arbitration" },
]

export default function FAQSearchClient({ faqs }: FAQSearchClientProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredFAQs = useMemo(() => {
        if (!searchQuery.trim()) return faqs
        const query = searchQuery.toLowerCase()
        return faqs.filter(
            (faq) =>
                faq.question.toLowerCase().includes(query) ||
                faq.answer.toLowerCase().includes(query) ||
                faq.category.toLowerCase().includes(query)
        )
    }, [searchQuery, faqs])

    const getCategoryFAQs = (categoryName: string) => {
        const categoryFAQsList = filteredFAQs.filter((faq) => faq.category === categoryName)
        return categoryFAQsList
    }

    return (
        <>
            {/* FAQ Search */}
            <section className="w-full py-8 bg-gray-50">
                <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search FAQs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-full text-lg py-6 rounded-xl border-gray-300 focus:border-blue-600"
                            />
                        </div>
                        {searchQuery && (
                            <p className="mt-4 text-sm text-gray-600 text-center">
                                Found {filteredFAQs.length} {filteredFAQs.length === 1 ? "result" : "results"}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Category Groups + Accordion */}
            <section className="w-full py-16">
                <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                    {categories.map((category) => {
                        const categoryFAQs = getCategoryFAQs(category.name)
                        if (categoryFAQs.length === 0 && searchQuery) return null
                        if (categoryFAQs.length === 0 && !searchQuery) {
                            // Show all FAQs for category if no search
                            const allCategoryFAQs = faqs.filter((faq) => faq.category === category.name)
                            if (allCategoryFAQs.length === 0) return null
                            return (
                                <div key={category.slug} className="mb-12 last:mb-0">
                                    <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-6">
                                        {category.name} Questions
                                    </h2>
                                    <Card className="rounded-2xl border p-6">
                                        <Accordion type="single" collapsible className="w-full">
                                            {allCategoryFAQs.map((faq, index) => (
                                                <AccordionItem key={index} value={`item-${category.slug}-${index}`} className="border-b last:border-b-0">
                                                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-blue-600">
                                                        {faq.question}
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-gray-700 leading-relaxed">
                                                        {faq.answer}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </Card>
                                    {category.slug && (
                                        <div className="mt-4">
                                            <Link
                                                href={`/consumer-law/${category.slug}`}
                                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                                            >
                                                Learn more about {category.name === "Credit Reporting" ? "FCRA" : category.name === "Debt Collection" ? "FDCPA" : category.name === "Robocalls & Texts" ? "TCPA" : category.name === "Video Privacy & Tracking Pixels" ? "VPPA" : category.name === "Fair Housing" ? "FHA" : category.name} cases <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )
                        }

                        return (
                            <div key={category.slug} className="mb-12 last:mb-0">
                                <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-6">
                                    {category.name} Questions
                                </h2>
                                <Card className="rounded-2xl border p-6">
                                    <Accordion type="single" collapsible className="w-full">
                                        {categoryFAQs.map((faq, index) => (
                                            <AccordionItem key={index} value={`item-${category.slug}-${index}`} className="border-b last:border-b-0">
                                                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-blue-600">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-gray-700 leading-relaxed">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </Card>
                                {category.slug && (
                                    <div className="mt-4">
                                        <Link
                                            href={`/consumer-law/${category.slug}`}
                                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                                        >
                                            Learn more about {category.name === "Credit Reporting" ? "FCRA" : category.name === "Debt Collection" ? "FDCPA" : category.name === "Robocalls & Texts" ? "TCPA" : category.name === "Video Privacy & Tracking Pixels" ? "VPPA" : category.name === "Fair Housing" ? "FHA" : category.name} cases <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}
