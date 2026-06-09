import fs from "node:fs"
import path from "node:path"
import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/seo/metadata"
import HeroBarTrans from "@/components/hero-bar-trans"
import { PRIMARY_PHONE, PRIMARY_PHONE_E164, SITE_URL, SITE_NAME } from "@/lib/site"
import ContactFormSection from "@/components/ui/contact-form-section"
import ConsumerLawIndexHero from "@/components/sections/ConsumerLawIndexHero"
import ConsumerLawGrid from "@/components/sections/ConsumerLawGrid"
import { CheckCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

type Law = {
    slug: string
    title: string
    summary: string
    damagesType?: "fcra" | "fdcpa" | "tcpa"
}

function readLaws(): Law[] {
    const p = path.join(process.cwd(), "data", "consumer-laws.json")
    const raw = fs.readFileSync(p, "utf-8")
    const data = JSON.parse(raw) as Law[]
    
    // Map slugs to damages types for the badges
    return data.map(law => ({
        ...law,
        damagesType: (law.slug === 'fcra' || law.slug === 'fdcpa' || law.slug === 'tcpa') 
            ? law.slug as "fcra" | "fdcpa" | "tcpa" 
            : undefined
    }))
}

export const metadata: Metadata = buildMetadata({
    title: "Consumer Law in Florida — FCRA, FDCPA & TCPA",
    description: `Consumer rights laws in Florida: FCRA, FDCPA, TCPA, and more. Learn your rights under federal consumer protection laws. No fee unless we win.`,
    pathname: "/consumer-law",
    type: "website",
})

export default function ConsumerLawIndex() {
    const laws = readLaws()

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Consumer Law", item: `${SITE_URL}/consumer-law` },
        ],
    }

    const collectionPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/consumer-law#collection`,
        name: "Consumer Protection Laws in Florida — FCRA, FDCPA, TCPA",
        description: "Overview of major federal consumer protection laws including FCRA, FDCPA, and TCPA. Learn your rights and how to take action.",
        url: `${SITE_URL}/consumer-law`,
        isPartOf: { "@id": SITE_URL },
        publisher: { "@type": "LegalService", name: SITE_NAME, url: SITE_URL },
        hasPart: laws.map((law) => ({
            "@type": "WebPage",
            name: law.title,
            url: `${SITE_URL}/consumer-law/${law.slug}`,
            description: law.summary,
        })),
    }

    return (
        <div className="w-full overflow-x-hidden bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
            <ConsumerLawIndexHero />
            
            <HeroBarTrans />

            {/* Hub Section */}
            <section className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-[var(--font-playfair-display)] font-bold text-gray-900 mb-4">
                        Major Consumer Protection Areas
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Click on a practice area below to learn more about your rights, common violations, and how much you may be entitled to recover.
                    </p>
                </div>

                <ConsumerLawGrid laws={laws} />
            </section>

            {/* Trust Reinforcement Section */}
            <section className="w-full bg-gray-50 py-16 lg:py-24">
                <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-[var(--font-playfair-display)] font-bold text-gray-900">
                                Why Choose Fischetti Law Group for Consumer Claims?
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Most people don&apos;t realize that federal consumer protection laws often include &ldquo;fee-shifting&rdquo; provisions. This means if we win your case, the law requires the company that violated your rights to pay our legal fees. 
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "No out-of-pocket costs for you",
                                    "Experience fighting major credit bureaus and debt buyers",
                                    "Aggressive advocacy with a trial-first mindset",
                                    "Personalized attention from dedicated attorneys",
                                    "Transparent communication throughout your case"
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-blue-600 rounded-[2.5rem] p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-4">Start Your Recovery Today</h3>
                                <p className="text-blue-100 mb-8 text-lg">
                                    Don&apos;t wait to preserve your rights. Most consumer claims have strict statutes of limitations. Get your free review in minutes.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button asChild className="bg-white text-blue-600 hover:bg-blue-50 text-lg font-bold px-8 py-6 rounded-xl shadow-xl">
                                        <Link href="#case-review-form">Get My Free Review</Link>
                                    </Button>
                                    <a 
                                        href={`tel:${PRIMARY_PHONE_E164}`}
                                        className="inline-flex items-center justify-center gap-2 text-white font-bold px-6 py-4 hover:bg-white/10 rounded-xl transition-colors"
                                    >
                                        <Phone className="w-5 h-5" />
                                        {PRIMARY_PHONE}
                                    </a>
                                </div>
                                <p className="mt-8 text-sm text-blue-200">
                                    * We serve clients throughout all of Florida. Consultations are free and confidential.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ContactFormSection />
        </div>
    )
}
