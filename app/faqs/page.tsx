import type { Metadata } from "next"
import Link from "next/link"
import { SITE_NAME, SITE_URL, SERVE_STATEMENT, STATE_SERVE, PRIMARY_PHONE } from "@/lib/site"
import HeroBarTrans from "@/components/hero-bar-trans"
import ContactFormSection from "@/components/ui/contact-form-section"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import FreeCaseReviewDialog from "@/components/free-case-review-dialog"
import FreeCaseReview from "@/components/free-case-review-button"
import FAQSearchClient from "./faq-search-client"
import SeoInsightBlock from "@/components/sections/SeoInsightBlock"

export const metadata: Metadata = {
    title: "Florida Consumer Law FAQs",
    description: `Florida consumer law FAQs covering FCRA, FDCPA, TCPA, and other consumer protection laws. Get answers about credit reports, debt collection, robocalls, and privacy violations. No fee unless we win.`,
    alternates: {
        canonical: "/faqs",
    },
    openGraph: {
        title: "Florida Consumer Law FAQs | Consumer Law Florida",
        description: `Florida consumer law FAQs covering FCRA, FDCPA, TCPA, and other consumer protection laws. Get answers about credit reports, debt collection, robocalls, and privacy violations. No fee unless we win.`,
        url: `${SITE_URL}/faqs`,
        images: [{
            url: "/opengraph-default.png",
            width: 1200,
            height: 630,
            alt: "Consumer Law Florida"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Florida Consumer Law FAQs | Consumer Law Florida",
        description: `Florida consumer law FAQs covering FCRA, FDCPA, TCPA, and other consumer protection laws. Get answers about credit reports, debt collection, robocalls, and privacy violations. No fee unless we win.`,
        images: ["/opengraph-default.png"],
    },
}

type FAQ = {
    question: string
    answer: string
    category: string
    slug?: string
}

const faqs: FAQ[] = [
    // Credit Reporting (FCRA) - 6 FAQs
    {
        question: "What is the Fair Credit Reporting Act (FCRA)?",
        answer: "The Fair Credit Reporting Act is a federal law that regulates how credit bureaus and background check companies collect, report, and correct consumer information. It gives consumers the right to dispute inaccurate or incomplete information.",
        category: "Credit Reporting",
        slug: "fcra",
    },
    {
        question: "Can I sue for errors on my credit report?",
        answer: "If a credit bureau or information provider fails to correct inaccurate information after a proper dispute, you may have a claim under the FCRA and could be entitled to compensation.",
        category: "Credit Reporting",
        slug: "fcra",
    },
    {
        question: "Can incorrect credit report information affect job applications?",
        answer: "Yes. Employers often rely on background checks, and inaccurate information can result in adverse decisions.",
        category: "Credit Reporting",
        slug: "fcra",
    },
    {
        question: "How long do credit bureaus have to fix errors after a dispute?",
        answer: "Credit reporting agencies generally have 30 days to investigate and respond to disputes.",
        category: "Credit Reporting",
        slug: "fcra",
    },
    {
        question: "Can mixed credit files violate the FCRA?",
        answer: "Yes. When one consumer's data is incorrectly merged with another's, it may violate federal law.",
        category: "Credit Reporting",
        slug: "fcra",
    },
    {
        question: "Do credit monitoring services protect my rights under the FCRA?",
        answer: "No. Monitoring services do not replace your legal rights or the duties imposed on credit bureaus.",
        category: "Credit Reporting",
        slug: "fcra",
    },
    // Debt Collection (FDCPA) - 5 FAQs
    {
        question: "What counts as debt collection harassment?",
        answer: "Harassment can include repeated calls, threats, abusive language, calling at prohibited times, or contacting third parties about your debt.",
        category: "Debt Collection",
        slug: "fdcpa",
    },
    {
        question: "Do I have to prove financial harm to file an FDCPA claim?",
        answer: "No. Many FDCPA violations allow recovery even without proving financial loss.",
        category: "Debt Collection",
        slug: "fdcpa",
    },
    {
        question: "Can a debt collector lie about the amount I owe?",
        answer: "No. False or misleading statements about debts can violate federal law.",
        category: "Debt Collection",
        slug: "fdcpa",
    },
    {
        question: "Are collectors allowed to threaten lawsuits or arrest?",
        answer: "Threats that are false or misleading may violate the FDCPA.",
        category: "Debt Collection",
        slug: "fdcpa",
    },
    {
        question: "Can debt collectors contact me after I send a written request to stop?",
        answer: "In most cases, collectors must stop contacting you after receiving a valid written request.",
        category: "Debt Collection",
        slug: "fdcpa",
    },
    // Robocalls & Texts (TCPA) - 5 FAQs
    {
        question: "Are robocalls and spam texts illegal?",
        answer: "Many automated calls and marketing texts violate the TCPA, especially when sent without proper consent.",
        category: "Robocalls & Texts",
        slug: "tcpa",
    },
    {
        question: "Can I get paid for robocall violations?",
        answer: "TCPA cases may allow statutory damages per violation, depending on the circumstances.",
        category: "Robocalls & Texts",
        slug: "tcpa",
    },
    {
        question: "What counts as consent for marketing texts?",
        answer: "Consent must be clear and specific. Pre-checked boxes or vague terms may not qualify.",
        category: "Robocalls & Texts",
        slug: "tcpa",
    },
    {
        question: "Can political robocalls violate the TCPA?",
        answer: "Some political calls may be exempt, but others still violate consumer protection rules.",
        category: "Robocalls & Texts",
        slug: "tcpa",
    },
    {
        question: "Does revoking consent stop future robocalls legally?",
        answer: "Yes. Once consent is revoked, continued calls may violate the TCPA.",
        category: "Robocalls & Texts",
        slug: "tcpa",
    },
    // Privacy & Data Breach - 4 FAQs
    {
        question: "What should I do if my personal information was exposed in a data breach?",
        answer: "You may have legal options if a company failed to protect your personal or financial information.",
        category: "Privacy & Data Breach",
        slug: "privacy",
    },
    {
        question: "Do I need identity theft to file a data breach claim?",
        answer: "In some cases, exposure alone may be enough, depending on the law and facts.",
        category: "Privacy & Data Breach",
        slug: "privacy",
    },
    {
        question: "Is a company responsible for protecting my personal data?",
        answer: "Companies have a duty to safeguard consumer information. Failure may result in liability.",
        category: "Privacy & Data Breach",
        slug: "privacy",
    },
    {
        question: "What types of data breaches lead to lawsuits?",
        answer: "Breaches involving financial, medical, or sensitive personal data often lead to legal claims.",
        category: "Privacy & Data Breach",
        slug: "privacy",
    },
    // Video Privacy & Tracking Pixels (VPPA) - 4 FAQs
    {
        question: "What is the Video Privacy Protection Act (VPPA)?",
        answer: "The VPPA protects consumers from having their video viewing information shared without consent.",
        category: "Video Privacy & Tracking Pixels",
        slug: "vppa",
    },
    {
        question: "How do tracking pixels violate privacy laws?",
        answer: "Tracking pixels can improperly transmit video viewing data to third parties without user authorization.",
        category: "Video Privacy & Tracking Pixels",
        slug: "vppa",
    },
    {
        question: "What types of websites can violate the VPPA?",
        answer: "Streaming services, video platforms, and websites with embedded video content.",
        category: "Video Privacy & Tracking Pixels",
        slug: "vppa",
    },
    {
        question: "Does the VPPA apply to online tracking tools?",
        answer: "Yes, when tracking tools transmit video viewing data without consent.",
        category: "Video Privacy & Tracking Pixels",
        slug: "vppa",
    },
    // Fair Housing (FHA) - 3 FAQs
    {
        question: "What is considered housing discrimination?",
        answer: "Discrimination based on disability, familial status, or refusal to provide reasonable accommodations may violate the Fair Housing Act.",
        category: "Fair Housing",
        slug: "fha",
    },
    {
        question: "What is a reasonable accommodation in housing?",
        answer: "Changes or exceptions that allow equal housing access for individuals with disabilities.",
        category: "Fair Housing",
        slug: "fha",
    },
    {
        question: "Can landlords deny emotional support animals?",
        answer: "In many cases, refusal may violate the Fair Housing Act.",
        category: "Fair Housing",
        slug: "fha",
    },
    // Mass Arbitration - 3 FAQs
    {
        question: "What is mass arbitration?",
        answer: "Mass arbitration involves many consumers filing individual arbitration claims against the same company at the same time.",
        category: "Mass Arbitration",
        slug: "mass-arbitration",
    },
    {
        question: "Why do companies use arbitration clauses?",
        answer: "Arbitration clauses often limit class actions and shift costs to consumers.",
        category: "Mass Arbitration",
        slug: "mass-arbitration",
    },
    {
        question: "How does mass arbitration pressure companies?",
        answer: "Filing many individual claims at once can force companies to address systemic issues.",
        category: "Mass Arbitration",
        slug: "mass-arbitration",
    },
]


export default function FAQsPage() {
    // FAQPage schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <main className="min-h-screen bg-white overflow-x-hidden">
                {/* Hero Section */}
                <section className="w-full h-full">
                    <section
                        style={{
                            backgroundImage: "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                        className="relative w-full min-w-screen lg:pt-0 pt-10 lg:min-h-[600px] xl:min-h-[700px] flex items-center justify-center"
                    >
                        <div
                            className="absolute inset-0 w-full h-full lg:min-h-[600px] xl:min-h-[700px]"
                            style={{
                                background: "linear-gradient(to bottom, rgba(30,30,32,0.7) 80%, transparent 120%)",
                            }}
                        />
                        <div className="relative w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                            <div className="max-w-4xl mx-auto text-center">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
                                    Consumer Law FAQs
                                </h1>
                                <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto">
                                    Answers to common questions about consumer protection laws, credit reporting errors, debt collection harassment, robocalls, privacy violations, and more. {SITE_NAME} serves clients statewide through phone and video consultations.
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                            </div>
                        </div>
                    </section>
                    <HeroBarTrans />
                </section>

                <div className="max-w-8xl mx-auto">
                    {/* Intro Section */}
                    <section className="w-full py-16">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                            <h2 className="text-3xl md:text-4xl font-[--font-playfair-display] text-gray-900 mb-6 text-center">
                                Common Questions About Consumer Protection Law
                            </h2>
                            <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700 leading-relaxed">
                                <p>
                                    Consumer protection laws exist to prevent companies from engaging in unfair, deceptive, or abusive practices. Many people are unaware that they may have legal rights when dealing with inaccurate credit reports, aggressive debt collectors, unwanted robocalls, or privacy violations.
                                </p>
                                <p>
                                    Below are answers to frequently asked questions about consumer law cases we handle for clients throughout Florida.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SEO/CRO Insight Sections */}
                    <section className="w-full py-12 bg-white">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                            <div className="space-y-6">
                                {/* 1. Who These Laws Protect */}
                                <SeoInsightBlock
                                    variant="audience"
                                    title="Who These Laws Protect"
                                    content={{
                                        items: [
                                            "Consumers denied jobs or housing due to credit errors",
                                            "Individuals harassed by debt collectors",
                                            "People receiving unwanted spam calls or texts",
                                            "Renters facing housing discrimination",
                                            "Users affected by data breaches or privacy violations",
                                            "Consumers with mixed credit files or identity theft",
                                            "People who disputed credit errors that weren't fixed",
                                            "Individuals contacted at work after requesting otherwise",
                                        ],
                                    }}
                                />

                                {/* 2. Common Violations Across Consumer Laws */}
                                <SeoInsightBlock
                                    variant="violations"
                                    title="Common Violations Across Consumer Laws"
                                    content={{
                                        items: [
                                            {
                                                title: "Calls made without consent",
                                                description: "Automated calls or texts sent without proper authorization violate consumer protection laws and can result in statutory damages per violation.",
                                            },
                                            {
                                                title: "Ignoring 'STOP' requests",
                                                description: "Continued contact after a consumer requests to stop may constitute a violation, even if initial consent was given.",
                                            },
                                            {
                                                title: "Credit report errors not corrected",
                                                description: "Inaccurate information that is not corrected after a proper dispute can lead to legal claims, especially if it affects employment or housing.",
                                            },
                                            {
                                                title: "Harassment or threats",
                                                description: "Debt collectors using abusive language, threatening behavior, or calling repeatedly violate federal law and consumer protection standards.",
                                            },
                                            {
                                                title: "Mixed credit files",
                                                description: "When credit bureaus mix your information with another person's file, this creates errors that must be corrected or can lead to legal action.",
                                            },
                                            {
                                                title: "Contacting third parties",
                                                description: "Debt collectors discussing your debt with family, employers, or neighbors without permission violates consumer protection laws.",
                                            },
                                        ],
                                    }}
                                />

                                {/* 3. What Information Helps Most */}
                                <SeoInsightBlock
                                    variant="evidence"
                                    title="What Information Helps Most"
                                    content={{
                                        items: [
                                            { label: "Call logs", icon: "Phone" },
                                            { label: "Text messages", icon: "MessageSquare" },
                                            { label: "Credit reports", icon: "FileText" },
                                            { label: "Emails", icon: "Mail" },
                                            { label: "Letters from collectors", icon: "FileCheck" },
                                            { label: "Lease agreements", icon: "Shield" },
                                            { label: "Dispute letters", icon: "FileText" },
                                            { label: "Employment records", icon: "FileCheck" },
                                            { label: "Bank statements", icon: "FileText" },
                                        ],
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* FAQ Search + Category Groups */}
                    <FAQSearchClient faqs={faqs} />

                    {/* CTA Section */}
                    <section className="w-full py-16 bg-white">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                            <Card className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl border bg-blue-600 text-white">
                                <div>
                                    <h2 className="text-2xl font-semibold mb-2">Still Have Questions? Get a Free Case Review</h2>
                                    <p className="opacity-90">
                                        If you believe your consumer rights were violated, {SITE_NAME} can help. Our attorneys will review your situation at no cost and explain your options under consumer protection laws.
                                    </p>
                                    <p className="mt-2 text-sm opacity-80">
                                        Free case review • No fee unless we win • Serving all of Florida by phone & video
                                    </p>
                                </div>
                                <FreeCaseReviewDialog>
                                    <Button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
                                        Get Free Case Review
                                    </Button>
                                </FreeCaseReviewDialog>
                            </Card>
                        </div>
                    </section>

                    {/* Contact Form Section */}
                    <ContactFormSection />
                </div>
            </main>
        </>
    )
}
