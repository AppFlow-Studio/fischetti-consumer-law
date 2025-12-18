import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { SITE_NAME, SITE_URL, SERVE_STATEMENT, STATE_SERVE, PRIMARY_PHONE, PRIMARY_EMAIL } from "@/lib/site"
import { firmsBySlug } from "@/data/firms"
import HeroBarTrans from "@/components/hero-bar-trans"
import { Marquee } from "@/components/ui/marquee"
import Testimonials from "@/components/ui/testimonials"
import WhyFischetti from "@/components/ui/why-fischetti"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle, ArrowRight } from "lucide-react"
import FreeCaseReviewDialog from "@/components/free-case-review-dialog"
import FreeCaseReview from "@/components/free-case-review-button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import SeoInsightBlock from "@/components/sections/SeoInsightBlock"

// City-specific copy blocks
const cityCopy: Record<string, {
    heroSubheadline: string
    howWeHelp: string
    practiceAreasTitle: string
    whatToExpect: {
        title: string
        steps: string[]
    }
    servingStatewide: {
        title: string
        content: string
    }
}> = {
    orlando: {
        heroSubheadline: "Consumer Law Florida helps Orlando residents fight back against unfair credit reporting, illegal debt collection practices, robocalls and spam texts, privacy violations, and housing discrimination. We serve clients statewide in Florida through phone and video consultations, so you can get legal help without taking time off work or traveling to an office.",
        howWeHelp: "If you discovered errors on your credit report, were denied a job due to a background check mistake, or are dealing with nonstop collection calls, you may have legal options under federal consumer protection laws. Our team reviews your situation, explains the relevant law, and outlines next steps in plain language—so you can decide what to do with confidence.",
        practiceAreasTitle: "Practice Areas We Handle for Orlando Clients",
        whatToExpect: {
            title: "What to Expect in a Free Case Review",
            steps: [
                "Tell us what happened (phone or online form).",
                "We identify potential consumer law violations.",
                "We explain your options and whether you may be entitled to compensation.",
                "If we can help, we handle the next steps and keep you updated.",
            ],
        },
        servingStatewide: {
            title: "Serving Orlando and All of Florida",
            content: "While this page focuses on Orlando, our team helps consumers across Florida through secure phone and video consultations. If you live elsewhere in the state, you can still request a free case review today.",
        },
    },
    "port-st-lucie": {
        heroSubheadline: "Consumer Law Florida helps Port St. Lucie clients take action when companies violate consumer protection laws—whether that means inaccurate credit reporting, abusive debt collection, unwanted robocalls, privacy violations, or housing discrimination. We work with clients statewide in Florida through phone and video consultations, so getting help is simple and fast.",
        howWeHelp: "Many consumer law cases start with a frustrating moment: a credit report error that impacts financing, a background check mistake that costs an opportunity, or repeated calls from collectors that cross the line. Our goal is to help you understand your rights, document what matters, and pursue the appropriate legal path under the laws designed to protect consumers.",
        practiceAreasTitle: "Practice Areas We Handle for Port St. Lucie Clients",
        whatToExpect: {
            title: "What to Expect",
            steps: [
                "You can request a free case review through the form above or by calling.",
                "We'll review the details, explain whether a consumer protection law may apply, and outline realistic next steps.",
                "There are no upfront fees—clients pay nothing unless we recover compensation.",
            ],
        },
        servingStatewide: {
            title: "Serving Port St. Lucie and Florida Statewide",
            content: "Even if you're not located near an office, Consumer Law Florida serves clients throughout the state through phone and video consultations. You can start your case review from anywhere in Florida.",
        },
    },
    "boynton-beach": {
        heroSubheadline: "Consumer Law Florida represents Boynton Beach clients in consumer protection matters involving credit reporting errors, debt collection harassment, robocalls and spam texts, privacy violations, and housing discrimination. We serve clients statewide in Florida through phone and video consultations, making it easy to get answers quickly and take action when your rights are violated.",
        howWeHelp: "If you're dealing with persistent calls from debt collectors, incorrect information on your credit report, or unwanted marketing texts that won't stop, you may have a claim under consumer protection laws. We help you understand what the law requires, what evidence is helpful, and what options may be available based on your situation.",
        practiceAreasTitle: "Practice Areas We Handle for Boynton Beach Clients",
        whatToExpect: {
            title: "Free Case Review Process",
            steps: [
                "Our process is designed to be simple: share what happened, we evaluate the details, and we tell you whether the facts may support a claim.",
                "If we take your case, we handle the next steps and keep you informed.",
                "No fee unless we win.",
            ],
        },
        servingStatewide: {
            title: "Serving Boynton Beach and All of Florida",
            content: "This page is focused on Boynton Beach, but our team serves consumers throughout Florida via phone and video consultations. If you live anywhere in the state, you can request a free case review today.",
        },
    },
}

const practiceAreas = [
    { name: "Credit report errors & background check mistakes (FCRA)", slug: "fcra" },
    { name: "Debt collection harassment (FDCPA)", slug: "fdcpa" },
    { name: "Robocalls & spam texts (TCPA)", slug: "tcpa" },
    { name: "Privacy & data breach violations", slug: "privacy" },
    { name: "Video privacy & tracking pixels (VPPA)", slug: "vppa" },
    { name: "Fair housing discrimination (FHA)", slug: "fha" },
    { name: "Mass arbitration claims", slug: "mass-arbitration" },
]

// City-specific FAQs
const cityFAQs: Record<string, Array<{ question: string; answer: string }>> = {
    orlando: [
        {
            question: "Can I file a consumer law claim in Orlando without going to court in person?",
            answer: "Yes. Most consumer protection cases handled by Consumer Law Florida are managed remotely. Orlando clients can complete consultations, document review, and case updates through phone and video without appearing in court.",
        },
        {
            question: "I was denied an apartment or job in Orlando because of a background check error — do I have a case?",
            answer: "Possibly. If a background check contained inaccurate or incomplete information and the reporting company failed to follow required procedures, you may have rights under the Fair Credit Reporting Act (FCRA).",
        },
        {
            question: "Are debt collectors allowed to call me repeatedly in Orlando?",
            answer: "No. Federal law limits how and when debt collectors can contact you. Repeated calls, threats, or contacting third parties may violate the Fair Debt Collection Practices Act (FDCPA).",
        },
        {
            question: "I keep getting robocalls and spam texts in Orlando — is that illegal?",
            answer: "Many automated calls and marketing texts violate the Telephone Consumer Protection Act (TCPA), especially when sent without proper consent. Each unlawful call or text may count as a separate violation.",
        },
        {
            question: "Do I have to pay upfront to start a consumer law case in Orlando?",
            answer: "No. Consumer Law Florida offers free case reviews and does not charge fees unless compensation is recovered.",
        },
        {
            question: "Can Orlando residents work with Consumer Law Florida even if they don't live near the office?",
            answer: "Yes. While this page focuses on Orlando, Consumer Law Florida serves clients statewide through phone and video consultations.",
        },
    ],
    "port-st-lucie": [
        {
            question: "What types of consumer law cases are common in Port St. Lucie?",
            answer: "Many Port St. Lucie clients contact us about credit report errors, debt collection harassment, robocalls, identity theft after data breaches, and privacy violations.",
        },
        {
            question: "Can I sue for credit report errors that affected my loan or interest rate?",
            answer: "If inaccurate credit information was reported and not corrected after a dispute, you may have a claim under the FCRA, even if the damage was temporary.",
        },
        {
            question: "Are debt collectors allowed to call my family or employer?",
            answer: "In most cases, no. Contacting third parties or discussing your debt with others can violate federal debt collection laws.",
        },
        {
            question: "How do spam texts violate consumer protection laws?",
            answer: "Marketing texts sent using automated systems without consent may violate the TCPA. These violations often occur repeatedly over time.",
        },
        {
            question: "What should I do if my personal information was exposed in a data breach?",
            answer: "You may have legal options if a company failed to safeguard your data. A case review can help determine whether consumer protection or privacy laws apply.",
        },
        {
            question: "Does Consumer Law Florida handle Port St. Lucie cases remotely?",
            answer: "Yes. All consultations and case evaluations can be completed by phone or video, making it easy to get help from anywhere in Florida.",
        },
    ],
    "boynton-beach": [
        {
            question: "Can I take legal action for debt collection harassment in Boynton Beach?",
            answer: "Yes. Harassing calls, threats, false statements, or repeated contact may violate the FDCPA and give you the right to seek compensation.",
        },
        {
            question: "I'm receiving nonstop robocalls in Boynton Beach — can I stop them legally?",
            answer: "Consumer protection laws restrict automated calls and texts. Many robocall campaigns violate the TCPA, especially when consent was never given.",
        },
        {
            question: "What is a tracking pixel privacy violation?",
            answer: "Tracking pixels can improperly share personal data, including video viewing information, with third parties. In some cases, this violates the Video Privacy Protection Act (VPPA).",
        },
        {
            question: "Can housing discrimination claims apply in Boynton Beach?",
            answer: "Yes. Discrimination based on disability, familial status, or refusal to provide reasonable accommodations may violate the Fair Housing Act.",
        },
        {
            question: "Do I need proof of financial loss to bring a consumer law claim?",
            answer: "Not always. Many consumer protection laws allow claims even when financial damages are difficult to measure.",
        },
        {
            question: "Does Consumer Law Florida only handle cases near Boynton Beach?",
            answer: "No. While we maintain a Boynton Beach office, we represent consumers throughout Florida via phone and video consultations.",
        },
    ],
}

type Props = {
    params: Promise<{ city: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city } = await params
    const firm = firmsBySlug.get(city as any)

    if (!firm) {
        return {
            title: "Consumer Rights Lawyers",
        }
    }

    const title = `${firm.seoCity} Consumer Lawyer`
    const description = `${firm.seoCity} consumer lawyer for credit report errors, debt collection harassment, and robocalls. No fee unless we win. Call (833) 645-3247.`

    return {
        title,
        description,
        alternates: {
            canonical: `/locations/${firm.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/locations/${firm.slug}`,
            images: [{
                url: "/opengraph-default.png",
                width: 1200,
                height: 630,
                alt: "Consumer Law Florida"
            }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/opengraph-default.png"],
        },
    }
}

export default async function CityPage({ params }: Props) {
    const { city } = await params
    const firm = firmsBySlug.get(city as any)

    if (!firm) {
        notFound()
    }

    const copy = cityCopy[firm.slug]
    if (!copy) {
        notFound()
    }

    // Parse address for schema
    const address = {
        streetAddress: `${firm.addressLine1}${firm.addressLine2 ? ` ${firm.addressLine2}` : ""}`,
        addressLocality: firm.city,
        addressRegion: firm.state,
        postalCode: firm.zip,
        addressCountry: "US",
    }

    // LegalService schema
    const legalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: SITE_NAME,
        url: `${SITE_URL}/locations/${firm.slug}`,
        telephone: PRIMARY_PHONE,
        email: PRIMARY_EMAIL,
        image: `${SITE_URL}/fischettilogo.png`,
        address: {
            "@type": "PostalAddress",
            streetAddress: "111 N Orange Ave, suite 800",
            addressLocality: "Orlando",
            addressRegion: "FL",
            postalCode: "32801",
            addressCountry: "US",
        },
        areaServed: {
            "@type": "State",
            name: STATE_SERVE,
        },
        description: SERVE_STATEMENT,
        location: {
            "@type": "Place",
            name: `${SITE_NAME} - ${firm.cityDisplay} Office`,
            address: {
                "@type": "PostalAddress",
                ...address,
            },
            telephone: firm.phone,
        },
    }

    // BreadcrumbList schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Locations",
                item: `${SITE_URL}/locations`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: firm.cityDisplay,
                item: `${SITE_URL}/locations/${firm.slug}`,
            },
        ],
    }

    // FAQPage schema for location-specific FAQs
    const locationFAQs = cityFAQs[firm.slug] || []
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: locationFAQs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {locationFAQs.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <main className="min-h-screen bg-white overflow-x-hidden">
                {/* Hero Section */}
                <section className="w-full h-full" >
                    <section
                        id="locations-hero"
                        style={{
                            backgroundImage: "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                        className="relative w-full min-w-screen lg:pt-0 pt-10 lg:min-h-[700px] xl:min-h-[800px] flex items-center justify-center"
                    >
                        <div
                            className="absolute inset-0 w-full h-full lg:min-h-[700px] xl:min-h-[800px]"
                            style={{
                                background: "linear-gradient(to bottom, rgba(30,30,32,0.7) 80%, transparent 120%)",
                            }}
                        />
                        <div className="relative w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
                                {/* Left Column - Content */}
                                <div className="w-full lg:w-1/2 flex flex-col">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 text-left">
                                        {firm.seoCity} Consumer Rights Lawyer
                                    </h1>
                                    <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 text-left">
                                        {copy.heroSubheadline}
                                    </p>

                                    {/* Trust Bullets */}
                                    <div className="flex flex-wrap gap-4 mb-8 justify-start">
                                        <div className="flex items-center gap-2 text-white/90">
                                            <CheckCircle className="w-5 h-5 text-blue-300" />
                                            <span className="text-sm md:text-base">Free case review</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/90">
                                            <CheckCircle className="w-5 h-5 text-blue-300" />
                                            <span className="text-sm md:text-base">No fee unless we win</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/90">
                                            <CheckCircle className="w-5 h-5 text-blue-300" />
                                            <span className="text-sm md:text-base">Serving all of Florida</span>
                                        </div>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-start">
                                        <div className="w-full sm:w-[260px]">
                                            <FreeCaseReviewDialog>
                                                <FreeCaseReview className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 text-lg font-semibold shadow-xl" />
                                            </FreeCaseReviewDialog>
                                        </div>
                                        <a
                                            href="tel:8336453247"
                                            className="w-full sm:w-[260px] inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-colors whitespace-nowrap"
                                        >
                                            <Phone className="w-5 h-5 shrink-0" />
                                            <span>Call {PRIMARY_PHONE}</span>
                                        </a>
                                    </div>

                                    {/* Trust Strip */}
                                    <div className="w-full">
                                        <Marquee className="backdrop-blur-sm rounded-xl py-3 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem)]" pauseOnHover={true}>
                                            <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                                                <span>No Win, No Fee</span>
                                            </div>
                                            <p className="text-white">•</p>
                                            <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                                                <span>Florida-Wide Help</span>
                                            </div>
                                            <p className="text-white">•</p>
                                            <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                                                <span>Fast Case Review</span>
                                            </div>
                                            <p className="text-white">•</p>
                                            <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                                                <span>Available 24/7</span>
                                            </div>
                                            <p className="text-white">•</p>
                                        </Marquee>
                                    </div>
                                </div>

                                {/* Right Column - Form */}
                                <div className="w-full lg:w-1/2 lg:pl-4">
                                    <Card className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-2xl border border-white/20">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                            Get Your Free Case Review
                                        </h2>
                                        <p className="text-gray-600 mb-6 text-sm md:text-base">
                                            Fill out the form below and we'll get back to you within 24 hours.
                                        </p>
                                        <SimpleContactForm darkMode={false} useBlueTheme={true} />
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>
                    <HeroBarTrans />
                </section>

                <div className="max-w-8xl mx-auto">
                    {/* How We Help Section */}
                    <section className="w-full py-16 bg-white">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                            <h2 className="text-3xl md:text-4xl font-[--font-playfair-display] text-gray-900 mb-6">
                                How We Help {firm.cityDisplay} Consumers Protect Their Rights
                            </h2>
                            <div className="max-w-4xl space-y-4 text-lg text-gray-700 leading-relaxed">
                                <p>{copy.howWeHelp}</p>
                            </div>
                        </div>
                    </section>

                    {/* Practice Areas Section */}
                    <section className="w-full py-16 bg-gray-50">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                            <h2 className="text-3xl md:text-4xl font-[--font-playfair-display] text-gray-900 mb-8 text-center">
                                {copy.practiceAreasTitle}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                                {practiceAreas.map((area) => (
                                    <Card key={area.slug} className="p-6 rounded-2xl border hover:shadow-md transition-shadow">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{area.name}</h3>
                                        <Link href={`/consumer-law/${area.slug}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm mt-2">
                                            Learn more about {area.slug === "fcra" ? "FCRA" : area.slug === "fdcpa" ? "FDCPA" : area.slug === "tcpa" ? "TCPA" : area.slug === "vppa" ? "VPPA" : area.slug === "fha" ? "FHA" : area.name} cases <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Why Clients Choose Section */}
                    <WhyFischetti />

                    {/* What to Expect Section */}
                    <section className="w-full py-16 bg-white">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                            <h2 className="text-3xl md:text-4xl font-[--font-playfair-display] text-gray-900 mb-8 text-center">
                                {copy.whatToExpect.title}
                            </h2>
                            <div className="max-w-3xl mx-auto">
                                <div className="space-y-4">
                                    {copy.whatToExpect.steps.map((step, index) => (
                                        <Card key={index} className="p-6 rounded-2xl border">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                                    <span className="text-blue-600 font-bold">{index + 1}</span>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed text-lg pt-1">{step}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Serving Statewide Section */}
                    <section className="w-full py-16 bg-gray-50">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                            <h2 className="text-3xl md:text-4xl font-[--font-playfair-display] text-gray-900 mb-6 text-center">
                                {copy.servingStatewide.title}
                            </h2>
                            <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700 leading-relaxed text-center">
                                <p>{copy.servingStatewide.content}</p>
                            </div>
                        </div>
                    </section>

                    {/* SEO/CRO Insight Sections */}
                    <section className="w-full py-12 bg-white">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                            <div className="space-y-6">
                                {/* 1. Do I Have a Case? */}
                                <SeoInsightBlock
                                    variant="qualification"
                                    title={`Do I Have a Consumer Law Case in ${firm.cityDisplay}?`}
                                    content={{
                                        items: [
                                            "Repeated calls or texts after asking them to stop",
                                            "Credit report errors not corrected",
                                            "Background check cost a job or housing",
                                            "Personal data shared without consent",
                                            "Housing accommodation was refused",
                                        ],
                                    }}
                                />

                                {/* 2. How Compensation May Be Available */}
                                <SeoInsightBlock
                                    variant="compensation"
                                    title="How Compensation May Be Available"
                                    content={{
                                        items: [
                                            "Some laws allow statutory recovery",
                                            "Others allow recovery for harm or distress",
                                            "Each case depends on specific facts",
                                            "No upfront fees to get started",
                                        ],
                                    }}
                                />

                                {/* 3. Why Clients Contact Us Instead of Handling It Alone */}
                                <SeoInsightBlock
                                    variant="why-us"
                                    title="Why Clients Contact Us Instead of Handling It Alone"
                                    content={{
                                        items: [
                                            "Consumer laws are technical and require legal expertise",
                                            "Companies rarely fix issues voluntarily without legal pressure",
                                            "Documentation and proper filing procedures matter significantly",
                                            "Legal deadlines apply and missing them can forfeit your rights",
                                            "Statutory damages require proper legal action to recover",
                                            "We handle all communication and negotiation on your behalf",
                                        ],
                                    }}
                                />

                                {/* 4. Serving Florida Statewide */}
                                <SeoInsightBlock
                                    variant="geo"
                                    title="Serving Florida Statewide"
                                    content={{
                                        text: SERVE_STATEMENT,
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Testimonials */}
                    <Testimonials />

                    {/* Location-Specific FAQs Section - Last section before footer */}
                    {locationFAQs.length > 0 && (
                        <section className="w-full py-16 bg-white">
                            <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                                <h2 className="text-3xl md:text-4xl font-[--font-playfair-display] text-gray-900 mb-8 text-center">
                                    Frequently Asked Questions for {firm.cityDisplay} Consumers
                                </h2>
                                <Card className="rounded-2xl border p-6 max-w-4xl mx-auto">
                                    <Accordion type="single" collapsible className="w-full">
                                        {locationFAQs.map((faq, index) => (
                                            <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                                                <AccordionTrigger className="text-left text-base font-semibold text-gray-900 hover:text-blue-600">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-gray-700 leading-relaxed">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </Card>
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </>
    )
}
