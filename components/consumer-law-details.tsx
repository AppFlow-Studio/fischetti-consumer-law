"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export type FAQItem = { question: string; answer: string }

export type ConsumerLawDetailsProps = {
    title: string
    slug: string
    summary: string
    heroImage?: string
    statutes?: { code: string; citation?: string }[]
    whoIsProtected?: string
    commonViolations?: string
    yourRights?: string
    whatToDoNext?: string
    damagesAndRemedies?: string
    faq?: FAQItem[]
}

// JSON-LD blocks for rich results (LegalService + FAQPage)
export function ConsumerLawJsonLd({
    data,
    siteUrl,
}: {
    data: ConsumerLawDetailsProps
    siteUrl: string
}) {
    const legalService = {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: `${data.title} – Fischetti Law Group`,
        url: `${siteUrl}/consumer-law/${data.slug}`,
        areaServed: { '@type': 'AdministrativeArea', name: 'Florida' },
        provider: {
            '@type': 'LegalService',
            name: 'Fischetti Law Group',
            url: siteUrl,
        },
        description: data.summary,
        serviceType: data.title,
    }

    const faqLd = data.faq && data.faq.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: data.faq.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
        }
        : null

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalService) }} />
            {faqLd ? (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            ) : null}
        </>
    )
}

export default function ConsumerLawDetails({
    title,
    slug,
    summary,
    heroImage,
    statutes = [],
    whoIsProtected,
    commonViolations,
    yourRights,
    whatToDoNext,
    damagesAndRemedies,
    faq = [],
}: ConsumerLawDetailsProps) {
    return (
        <main className="w-full bg-white overflow-x-hidden">
            {/* Hero */}
            <section className="max-w-7xl mx-auto px-6">
                <nav className="text-sm text-gray-600 mb-3">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/consumer-law" className="hover:text-blue-600">Consumer Law</Link>
                    <span className="mx-2">/</span>
                    <span className="text-blue-600">{title}</span>
                </nav>

                <div className="grid grid-cols-1 gap-8 items-start">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-[--font-playfair-display] text-gray-900 mb-4">{title}</h1>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">{summary}</p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href="#consultation" className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold shadow hover:bg-blue-700 transition-colors">Free Case Review</a>

                            <Link href="#testimonials" className="inline-flex items-center rounded-xl border border-gray-300 px-6 py-3 text-gray-800 hover:border-gray-400 transition-colors">See Results</Link>
                        </div>
                    </div>
                    {/* <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100">
                        {heroImage ? (
                            <Image src={heroImage} alt={`${title} illustration`} fill className="object-cover" />
                        ) : null}
                    </div> */}
                </div>
            </section>

            {/* Content Blocks */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 leading-relaxed">
                    {!!statutes.length && (
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Key Statutes</h2>
                            <ul className="mt-3 list-disc pl-5 space-y-2 text-[15px] text-gray-700 marker:text-blue-600">
                                {statutes.map((s, i) => (
                                    <li key={`${s.code}-${i}`}>{s.code}{s.citation ? ` – ${s.citation}` : ''}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {!!whoIsProtected && (
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Who Is Protected</h2>
                            <p className="mt-3 text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{whoIsProtected}</p>
                        </div>
                    )}

                    {!!commonViolations && (
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Common Violations</h2>
                            <p className="mt-3 text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{commonViolations}</p>
                        </div>
                    )}

                    {!!yourRights && (
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Your Rights</h2>
                            <p className="mt-3 text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{yourRights}</p>
                        </div>
                    )}

                    {!!whatToDoNext && (
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What To Do Next</h2>
                            <p className="mt-3 text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{whatToDoNext}</p>
                        </div>
                    )}

                    {!!damagesAndRemedies && (
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Damages & Remedies</h2>
                            <p className="mt-3 text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{damagesAndRemedies}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* FAQ */}
            {!!faq.length && (
                <section className="max-w-7xl mx-auto px-6 pb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {faq.map((f, i) => (
                            <Card key={`faq-${i}`} className="p-5 rounded-2xl border">
                                <h3 className="text-lg font-semibold text-gray-900">{f.question}</h3>
                                <p className="mt-2 text-gray-700 leading-relaxed">{f.answer}</p>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA Footer */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <Card className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl border bg-blue-600 text-white">
                    <div>
                        <h3 className="text-xl font-semibold">Think your {title.toLowerCase()} rights were violated?</h3>
                        <p className="opacity-90">Get a free, no‑obligation review. No fees unless we win.</p>
                    </div>
                    <Button asChild className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
                        <a href="#consultation">Start Free Case Review</a>
                    </Button>
                </Card>
            </section>
        </main>
    )
}


