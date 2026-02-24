"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SITE_URL, SITE_NAME, PRIMARY_PHONE, PRIMARY_EMAIL } from "@/lib/site"
import { renderBoldText } from "@/lib/renderBoldText"

export type FAQItem = { question: string; answer: string }

export type ConsumerLawDetailsProps = {
    title: string
    slug: string
    summary: string
    heroImage?: string
    statutes?: { code: string; citation?: string }[]
    keyStatutes?: string[]
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
    offerCatalog,
}: {
    data: ConsumerLawDetailsProps
    offerCatalog?: {
        "@type": "OfferCatalog"
        "name": string
        "itemListElement": Array<{
            "@type": "Offer"
            "name": string
            "availability": string
            "areaServed": { "@type": "AdministrativeArea"; "name": string }
            "seller": { "@type": "LegalService"; "name": string }
        }>
    } | null
}) {
    const legalService: {
        '@context': string
        '@type': string
        name: string
        url: string
        telephone: string
        email: string
        image: string
        address: {
            '@type': string
            streetAddress: string
            addressLocality: string
            addressRegion: string
            postalCode: string
            addressCountry: string
        }
        areaServed: { '@type': string; name: string }
        provider: { '@type': string; name: string; url: string }
        description: string
        serviceType: string
        hasOfferCatalog?: typeof offerCatalog
    } = {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: `${data.title} – ${SITE_NAME}`,
        url: `${SITE_URL}/consumer-law/${data.slug}`,
        telephone: PRIMARY_PHONE,
        email: PRIMARY_EMAIL,
        image: `${SITE_URL}/fischettilogo.png`,
        address: {
            '@type': 'PostalAddress',
            streetAddress: '111 N Orange Ave, suite 800',
            addressLocality: 'Orlando',
            addressRegion: 'FL',
            postalCode: '32801',
            addressCountry: 'US',
        },
        areaServed: { '@type': 'AdministrativeArea', name: 'Florida' },
        provider: {
            '@type': 'LegalService',
            name: SITE_NAME,
            url: SITE_URL,
        },
        description: data.summary,
        serviceType: data.title,
    }

    // Add hasOfferCatalog only if offerCatalog is provided
    if (offerCatalog) {
        legalService.hasOfferCatalog = offerCatalog
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
    keyStatutes = [],
    whoIsProtected,
    commonViolations,
    yourRights,
    whatToDoNext,
    damagesAndRemedies,
    faq = [],
}: ConsumerLawDetailsProps) {
    // Determine which statutes format to use (prefer keyStatutes if available)
    const hasKeyStatutes = keyStatutes.length > 0
    const hasLegacyStatutes = statutes.length > 0

    return (
        <div className="w-full bg-white overflow-x-hidden">
            {/* Content Blocks */}
            <section className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 leading-relaxed items-start">
                    {(hasKeyStatutes || hasLegacyStatutes) && (
                        <div className="min-h-fit">
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Key Statutes</h2>
                            {hasKeyStatutes ? (
                                <ul className="mt-3 list-disc pl-5 space-y-2 text-[15px] text-gray-700 marker:text-blue-600">
                                    {keyStatutes.map((statute, i) => (
                                        <li key={`key-statute-${i}`}>{renderBoldText(statute)}</li>
                                    ))}
                                </ul>
                            ) : (
                                <ul className="mt-3 list-disc pl-5 space-y-2 text-[15px] text-gray-700 marker:text-blue-600">
                                    {statutes.map((s, i) => (
                                        <li key={`statute-${i}`}>{s.code}{s.citation ? ` – ${s.citation}` : ''}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    {!!whoIsProtected && (
                        <div className="min-h-fit">
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Who Is Protected</h2>
                            <p className="mt-3 text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">
                                {renderBoldText(whoIsProtected)}
                            </p>
                        </div>
                    )}

                    {!!commonViolations && (
                        <div className="min-h-fit">
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Common Violations</h2>
                            <p className="mt-3 text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">
                                {renderBoldText(commonViolations)}
                            </p>
                        </div>
                    )}

                    {!!yourRights && (
                        <div className="min-h-fit">
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Your Rights</h2>
                            <p className="mt-3 text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">
                                {renderBoldText(yourRights)}
                            </p>
                        </div>
                    )}

                    {!!whatToDoNext && (
                        <div className="min-h-fit">
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What To Do Next</h2>
                            <p className="mt-3 text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">
                                {renderBoldText(whatToDoNext)}
                            </p>
                        </div>
                    )}

                    {!!damagesAndRemedies && (
                        <div className="min-h-fit">
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Damages & Remedies</h2>
                            <p className="mt-3 text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">
                                {renderBoldText(damagesAndRemedies)}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Footer - Centered and evenly spaced from content above */}
            <section className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-0">
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
        </div>
    )
}


