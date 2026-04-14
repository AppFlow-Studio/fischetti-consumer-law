"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SITE_URL, SITE_NAME, PRIMARY_PHONE, PRIMARY_EMAIL } from "@/lib/site"
import { renderBoldText } from "@/lib/renderBoldText"
import { motion } from "framer-motion"
import { 
    Scale, 
    Users, 
    AlertTriangle, 
    Shield, 
    ClipboardCheck, 
    HandCoins, 
    ArrowRight,
    CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"

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

    // FAQPage is emitted exclusively by <FAQSection> lower in the page tree.
    // Do NOT add a second FAQPage here — it would create duplicate structured data.
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalService) }} />
        </>
    )
}

const SectionCard = ({ 
    title, 
    icon: Icon, 
    children, 
    className,
    delay = 0 
}: { 
    title: string; 
    icon: any; 
    children: React.ReactNode; 
    className?: string;
    delay?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay }}
        className={cn("h-full", className)}
    >
        <Card className="flex flex-col h-full bg-white border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600 group/card">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover/card:bg-blue-600 group-hover/card:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 font-[var(--font-playfair-display)] group-hover/card:text-blue-600 transition-colors duration-300">{title}</h2>
            </div>
            <div className="text-gray-700 leading-relaxed space-y-4 flex-grow">
                {children}
            </div>
        </Card>
    </motion.div>
)

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
    const hasKeyStatutes = keyStatutes.length > 0
    const hasLegacyStatutes = statutes.length > 0

    return (
        <div className="w-full bg-white">
            {/* Main Content Hub */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch leading-relaxed">
                {/* 1. Key Statutes */}
                {(hasKeyStatutes || hasLegacyStatutes) && (
                    <SectionCard title="Key Statutes" icon={Scale} delay={0.1}>
                        {hasKeyStatutes ? (
                            <ul className="list-none space-y-3">
                                {keyStatutes.map((statute, i) => (
                                    <li key={`key-statute-${i}`} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                        <span>{renderBoldText(statute)}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul className="list-none space-y-3">
                                {statutes.map((s, i) => (
                                    <li key={`statute-${i}`} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                        <span>{s.code}{s.citation ? ` – ${s.citation}` : ''}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </SectionCard>
                )}

                {/* 2. Who Is Protected */}
                {!!whoIsProtected && (
                    <SectionCard title="Who Is Protected" icon={Users} delay={0.2}>
                        <p className="whitespace-pre-line text-base">
                            {renderBoldText(whoIsProtected)}
                        </p>
                    </SectionCard>
                )}

                {/* 3. Common Violations */}
                {!!commonViolations && (
                    <SectionCard title="Common Violations" icon={AlertTriangle} delay={0.3}>
                        <p className="whitespace-pre-line text-base">
                            {renderBoldText(commonViolations)}
                        </p>
                    </SectionCard>
                )}

                {/* 4. Your Rights */}
                {!!yourRights && (
                    <SectionCard title="Your Rights" icon={Shield} delay={0.4}>
                        <p className="whitespace-pre-line text-base">
                            {renderBoldText(yourRights)}
                        </p>
                    </SectionCard>
                )}

                {/* 5. Damages & Remedies */}
                {!!damagesAndRemedies && (
                    <SectionCard title="Damages & Remedies" icon={HandCoins} delay={0.5}>
                        <p className="whitespace-pre-line text-base">
                            {renderBoldText(damagesAndRemedies)}
                        </p>
                    </SectionCard>
                )}

                {/* 6. What To Do Next */}
                {!!whatToDoNext && (
                    <SectionCard title="What To Do Next" icon={ClipboardCheck} delay={0.6}>
                        <p className="whitespace-pre-line text-base">
                            {renderBoldText(whatToDoNext)}
                        </p>
                    </SectionCard>
                )}
            </div>

            {/* Redesigned CTA Footer */}
            <motion.section 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="w-full mt-16"
            >
                <Card className="relative overflow-hidden group bg-blue-600 border-none rounded-[2rem] p-10 text-white shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div className="max-w-2xl">
                            <h3 className="text-3xl font-bold mb-3 font-[var(--font-playfair-display)]">Think your {title.toLowerCase()} rights were violated?</h3>
                            <p className="text-blue-100 text-lg">Get a free, no‑obligation review from a Florida consumer lawyer. We only get paid if you win.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                            <Button asChild className="bg-white text-blue-700 hover:bg-blue-50 text-lg font-bold px-8 py-7 rounded-2xl shadow-xl transition-all hover:-translate-y-1 w-full sm:w-auto">
                                <a href="#case-review-form" className="flex items-center gap-2">
                                    Start Free Review
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </Card>
            </motion.section>
        </div>
    )
}
