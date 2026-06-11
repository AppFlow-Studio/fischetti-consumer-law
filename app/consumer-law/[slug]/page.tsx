import fs from "node:fs"
import path from "node:path"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ConsumerLawDetails, { ConsumerLawJsonLd, type ConsumerLawDetailsProps } from "@/components/consumer-law-details"
import ConsumerLawHero from "@/components/sections/ConsumerLawHero"
import CaseResults from "@/components/ui/case-results"
import { ArrowRight, FileText, FileCheck, AlertCircle, FolderOpen, ShieldCheck, Info } from "lucide-react"
import Link from "next/link"

// Crawlable sub-page links per slug — drives the "Related Guides" nav section.
const SUB_PAGES: Record<string, { label: string; href: string }[]> = {
    fdcpa: [
        { label: "Debt Collector Called After 9 PM", href: "/consumer-law/fdcpa/debt-collector-called-after-9pm" },
        { label: "Debt Collector Called My Work", href: "/consumer-law/fdcpa/debt-collector-called-my-work" },
        { label: "Debt Collector Keeps Calling", href: "/consumer-law/fdcpa/debt-collector-keeps-calling" },
        { label: "Debt Collector Threatened Me", href: "/consumer-law/fdcpa/debt-collector-threatened-me" },
    ],
    tcpa: [
        { label: "Robocall Lawsuit in Florida", href: "/consumer-law/tcpa/robocall-lawsuit-florida" },
        { label: "Spam Texts in Florida", href: "/consumer-law/tcpa/spam-texts-florida" },
        { label: "Texted STOP But Still Getting Texts", href: "/consumer-law/tcpa/texted-stop-still-getting-texts" },
    ],
}
import HeroBarTrans from "@/components/hero-bar-trans"
import { FAQSection } from "@/components/seo/faq-section"
import { SITE_URL, SITE_NAME, PRIMARY_PHONE, PRIMARY_PHONE_E164 } from "@/lib/site"
import SeoInsightBlock from "@/components/sections/SeoInsightBlock"
import { LAW_CONTENT_MAP } from "@/lib/lawSectionContent"
import { buildMetadata } from "@/lib/seo/metadata"

type Law = {
    slug: string
    title: string
    summary: string
    [key: string]: unknown
}

// Helper function to generate law-specific OfferCatalog schema
function getLawOfferSchema(slug: string) {
    const lawMap: Record<string, { name: string }> = {
        fcra: { name: "FCRA Claim Review" },
        fdcpa: { name: "FDCPA Debt Collection Claim Review" },
        tcpa: { name: "TCPA Robocall & Text Claim Review" },
    }

    const offer = lawMap[slug]
    if (!offer) return null

    return {
        "@type": "OfferCatalog",
        "name": `${offer.name} Services`,
        "itemListElement": [
            {
                "@type": "Offer",
                "name": offer.name,
                "availability": "https://schema.org/InStock",
                "areaServed": {
                    "@type": "AdministrativeArea",
                    "name": "Florida"
                },
                "seller": {
                    "@type": "LegalService",
                    "name": "Consumer Law Florida"
                }
            }
        ]
    } as const
}

function readLaws(): Law[] {
    const p = path.join(process.cwd(), "data", "consumer-laws.json")
    const raw = fs.readFileSync(p, "utf-8")
    return JSON.parse(raw)
}

export async function generateStaticParams() {
    const laws = readLaws()
    return laws.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const laws = readLaws()
    const resolvedParams = await params
    const law = laws.find((l) => l.slug === resolvedParams.slug)
    
    if (!law) {
        return {
            title: "Consumer Law",
        }
    }

    // Keyword mapping table for titles and descriptions
    const getLawTitle = (slug: string): string => {
        const titleMap: Record<string, string> = {
            fcra: "FCRA Lawyer in Florida",
            fdcpa: "Debt Collection Lawyer in Florida",
            tcpa: "Robocall & Text Lawyer in Florida",
        }
        return titleMap[slug] || `${law.title} Lawyer`
    }

    const getLawDescription = (slug: string): string => {
        const descriptionMap: Record<string, string> = {
            fcra: `FCRA Lawyer in Florida for credit report errors, mixed files, and failed disputes. No fee unless we win. Call ${PRIMARY_PHONE}.`,
            fdcpa: `Debt Collection Lawyer in Florida for harassment, threats, and illegal collection tactics. No fee unless we win. Call ${PRIMARY_PHONE}.`,
            tcpa: `Robocall Lawyer in Florida for spam texts and automated calls without consent. No fee unless we win. Call ${PRIMARY_PHONE}.`,
        }
        return descriptionMap[slug] || `${law.title} lawyer in Florida for consumer protection violations. No fee unless we win. Call ${PRIMARY_PHONE}.`
    }

    const title = getLawTitle(resolvedParams.slug)
    const description = getLawDescription(resolvedParams.slug)

    return buildMetadata({
        title,
        description,
        pathname: `/consumer-law/${resolvedParams.slug}`,
        type: "website",
    })
}

// Law-specific content generators
function getQualificationItems(slug: string): string[] {
    const content: Record<string, string[]> = {
        fcra: [
            "You were denied a mortgage, loan, or credit card because of a credit report error",
            "You were denied an apartment or rental due to a background check mistake",
            "A discharged bankruptcy debt still appears on your credit report",
            "Your credit file was mixed with someone else's information",
            "A debt collector or furnisher refuses to correct an error after your dispute",
            "You lost a job offer because of an inaccurate background check",
            "An identity theft account is reporting on your credit even after being disputed",
        ],
        fdcpa: [
            "A debt collector calls repeatedly or aggressively",
            "You received threats, false statements, or harassment",
            "Collectors contacted your family, employer, or coworkers",
            "Calls continued after you requested they stop",
            "You were misled about the amount or status of a debt",
        ],
        tcpa: [
            "You receive robocalls or spam texts without consent",
            "Messages continue after replying \"STOP\"",
            "Calls use prerecorded or automated messages",
            "You are contacted despite Do Not Call registration",
            "Calls are made to your personal or mobile number",
        ],
    }
    return content[slug] || []
}

function getAudienceItems(slug: string): string[] {
    const content: Record<string, string[]> = {
        fcra: [
            "Job applicants and employees",
            "Renters and homebuyers",
            "Consumers applying for loans or credit",
            "Individuals affected by background check errors",
        ],
        fdcpa: [
            "Consumers contacted by third-party debt collectors",
            "Individuals dealing with collection agencies",
            "People facing aggressive or abusive collection tactics",
        ],
        tcpa: [
            "Mobile phone users",
            "Consumers receiving marketing calls or texts",
            "Individuals on the Do Not Call Registry",
        ],
    }
    return content[slug] || []
}

function getViolationsItems(slug: string): Array<{ title: string; description: string }> {
    const content: Record<string, Array<{ title: string; description: string }>> = {
        fcra: [
            {
                title: "Failing to investigate disputes properly",
                description: "Credit bureaus must conduct reasonable investigations when consumers dispute inaccurate information on their reports.",
            },
            {
                title: "Reporting inaccurate or outdated information",
                description: "Credit bureaus and furnishers are required to report accurate, up-to-date information and remove outdated items.",
            },
            {
                title: "Mixing consumer credit files",
                description: "When credit bureaus mix your information with another person's file, this creates errors that must be corrected.",
            },
            {
                title: "Using background reports without required disclosures",
                description: "Employers and landlords must provide proper notices when using background reports for decisions.",
            },
        ],
        fdcpa: [
            {
                title: "Harassing or threatening phone calls",
                description: "Debt collectors cannot use abusive language, threats, or call repeatedly to harass consumers.",
            },
            {
                title: "False statements about debts",
                description: "Collectors cannot misrepresent the amount owed, claim to be attorneys, or make false threats about legal action.",
            },
            {
                title: "Contacting third parties improperly",
                description: "Debt collectors cannot discuss your debt with family, employers, or neighbors without permission.",
            },
            {
                title: "Ignoring written cease-contact requests",
                description: "When you send a written request to stop contact, collectors must honor it except for limited exceptions.",
            },
        ],
        tcpa: [
            {
                title: "Automated calls without consent",
                description: "Companies cannot use autodialers or prerecorded messages to call cell phones without prior express consent.",
            },
            {
                title: "Marketing texts sent using auto-dialers",
                description: "Unsolicited marketing text messages sent using automated systems violate the TCPA.",
            },
            {
                title: "Ignoring opt-out requests",
                description: "When you reply STOP or revoke consent, companies must immediately stop contacting you.",
            },
            {
                title: "Repeated telemarketing calls",
                description: "Calls to numbers on the Do Not Call Registry or after consent is revoked violate consumer protection laws.",
            },
        ],
    }
    return content[slug] || []
}

function getCompensationItems(slug: string): string[] {
    const content: Record<string, string[]> = {
        fcra: [
            "Some violations allow statutory recovery",
            "Others allow recovery for harm caused by errors",
            "Each case depends on the reporting conduct",
            "No upfront fees to request a review",
        ],
        fdcpa: [
            "Some violations allow statutory recovery",
            "Emotional distress may be considered",
            "Liability depends on collector behavior",
            "No upfront fees",
        ],
        tcpa: [
            "Some violations allow statutory recovery",
            "Each call or text may count separately",
            "Outcomes depend on call practices",
            "No upfront fees",
        ],
    }
    return content[slug] || []
}

function getOverviewText(slug: string, lawSummary: string): string {
    const content: Record<string, string> = {
        fcra: "The Fair Credit Reporting Act regulates how consumer reporting agencies collect, report, and correct personal information used for credit, employment, and housing decisions.",
        fdcpa: "The Fair Debt Collection Practices Act limits how third-party debt collectors may contact consumers and prohibits abusive, deceptive, or unfair practices.",
        tcpa: "The Telephone Consumer Protection Act restricts automated calls, prerecorded messages, and marketing texts to protect consumer privacy.",
    }
    return content[slug] || (lawSummary ? lawSummary.split(".").slice(0, 2).join(".") + "." : "")
}

function getEvidenceItems(slug: string): Array<{ label: string; icon: string }> {
    const content: Record<string, Array<{ label: string; icon: string }>> = {
        fcra: [
            { label: "Credit reports", icon: "FileText" },
            { label: "Dispute letters or confirmations", icon: "FileCheck" },
            { label: "Adverse action notices", icon: "AlertCircle" },
            { label: "Background check reports", icon: "FileText" },
            { label: "Employment or rental denial notices", icon: "FileCheck" },
        ],
        fdcpa: [
            { label: "Call logs or voicemails", icon: "Phone" },
            { label: "Letters from collectors", icon: "FileCheck" },
            { label: "Text messages", icon: "MessageSquare" },
            { label: "Debt validation requests", icon: "FileText" },
            { label: "Account statements", icon: "FileText" },
        ],
        tcpa: [
            { label: "Call logs", icon: "Phone" },
            { label: "Text message screenshots", icon: "MessageSquare" },
            { label: "Phone records", icon: "Phone" },
            { label: "Do Not Call registration confirmation", icon: "FileCheck" },
        ],
    }
    return content[slug] || []
}

export default async function ConsumerLawDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const laws = readLaws()
    const resolvedParams = await params
    const law = laws.find((l) => l.slug === resolvedParams.slug)
    
    if (!law) {
        notFound()
    }

    // Get law-specific SEO content
    const sectionContent = LAW_CONTENT_MAP[resolvedParams.slug]

    // Extract acronym from title for H1 optimization
    const getLawAcronym = (title: string, slug: string): string => {
        if (title.includes("—")) {
            return title.split("—")[0].trim()
        }
        return title.split(" ")[0]
    }

    const lawAcronym = getLawAcronym(law.title, resolvedParams.slug)
    const h1Title = `${lawAcronym} Lawyer Florida`

    // Prepare law data with law-specific content
    const lawData = {
        title: law.title as string,
        slug: law.slug as string,
        summary: law.summary as string,
        // Override with law-specific content if available
        keyStatutes: (sectionContent?.keyStatutes || []) as string[],
        whoIsProtected: (sectionContent?.whoIsProtected || law.whoIsProtected) as string,
        commonViolations: (sectionContent?.commonViolations || law.commonViolations) as string,
        yourRights: (sectionContent?.yourRights || law.yourRights) as string,
        whatToDoNext: (sectionContent?.whatToDoNext || law.whatToDoNext) as string,
        damagesAndRemedies: (sectionContent?.damagesAndRemedies || law.damagesAndRemedies) as string,
        faq: (law.faq || []) as any[],
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
                name: "Consumer Law",
                item: `${SITE_URL}/consumer-law`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: law.title,
                item: `${SITE_URL}/consumer-law/${resolvedParams.slug}`,
            },
        ],
    }

    // Article schema for better rich results — author must be Person, not Organization
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: h1Title,
        description: law.summary,
        author: {
            "@type": "Person",
            name: "Michael J. Fischetti",
            jobTitle: "Consumer Protection Attorney",
            url: SITE_URL,
        },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString().split("T")[0],
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/consumer-law/${resolvedParams.slug}`,
        },
        image: law.heroImage ? `${SITE_URL}${law.heroImage}` : `${SITE_URL}/opengraph-default.png`,
    }

    // Get law-specific offer catalog for schema
    const offerCatalog = getLawOfferSchema(resolvedParams.slug)
    // FAQPage is emitted solely by <FAQSection> — do not add a duplicate here.

    return (
        <div className="w-full overflow-x-hidden bg-white">
            <ConsumerLawJsonLd data={lawData as any} offerCatalog={offerCatalog as any} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            {/* Hero Section */}
            <ConsumerLawHero 
                h1Title={h1Title}
                title={lawData.title}
                summary={lawData.summary}
            />
            <HeroBarTrans />

            {/* Content Section */}
            <section className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <ConsumerLawDetails {...lawData as any} />
                </section>

            {/* SEO/CRO Insight Sections */}
            <section className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
                <div className="space-y-6">
                    {/* 1. Do I Have a Case? */}
                    <SeoInsightBlock
                        variant="qualification"
                        title={`Do I Have a Case Under the ${lawAcronym}?`}
                        content={{
                            items: getQualificationItems(resolvedParams.slug),
                        }}
                    />

                    {/* 2. Who This Law Protects */}
                    <SeoInsightBlock
                        variant="audience"
                        title="Who This Law Protects"
                        content={{
                            items: getAudienceItems(resolvedParams.slug),
                        }}
                    />

                    {/* 3. Common Violations We See */}
                    <SeoInsightBlock
                        variant="violations"
                        title={`Common ${lawAcronym} Violations`}
                        content={{
                            items: getViolationsItems(resolvedParams.slug),
                        }}
                    />

                    {/* 4. How Compensation May Be Available */}
                    <SeoInsightBlock
                        variant="compensation"
                        title="How Compensation May Be Available"
                        content={{
                            items: getCompensationItems(resolvedParams.slug),
                        }}
                    />

                    {/* 5. Understanding the [LAW NAME] */}
                    <SeoInsightBlock
                        variant="overview"
                        title={`Understanding the ${lawAcronym}`}
                        content={{
                            text: getOverviewText(resolvedParams.slug, law.summary || ""),
                        }}
                    />

                    {/* 6. What Information Is Helpful */}
                    <SeoInsightBlock
                        variant="evidence"
                        title="What Information Is Helpful"
                        content={{
                            items: getEvidenceItems(resolvedParams.slug) as any,
                        }}
                    />
                </div>
            </section>

            {/* FCRA-only: Before Your Free Case Review document checklist */}
            {resolvedParams.slug === "fcra" && (
                <section className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 sm:p-10">
                        <div className="flex items-start gap-4 mb-8">
                            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                                <FolderOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-900">
                                    Before Your Free Case Review: Save These Documents
                                </h2>
                                <p className="text-slate-500 mt-1 text-sm">
                                    The more of these you have ready, the faster our attorneys can evaluate your FCRA claim.
                                </p>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    Icon: FileText,
                                    label: "Credit Reports (All 3 Bureaus)",
                                    note: "Pull free copies from annualcreditreport.com — highlight the error on each report where it appears.",
                                },
                                {
                                    Icon: FileCheck,
                                    label: "Dispute Letters You Sent",
                                    note: "Copies of any written disputes you submitted online, by mail, or via certified letter.",
                                },
                                {
                                    Icon: AlertCircle,
                                    label: "Bureau or Furnisher Responses",
                                    note: "Any letter saying the error was \"verified\" or refusing to correct it — this is critical evidence.",
                                },
                                {
                                    Icon: Info,
                                    label: "Adverse Action Notices",
                                    note: "Denial letters for a loan, apartment, job, or insurance that reference your credit report.",
                                },
                                {
                                    Icon: ShieldCheck,
                                    label: "Proof the Information Is Wrong",
                                    note: "Bank statements, court orders, or ID documents showing the reported item is inaccurate.",
                                },
                                {
                                    Icon: FileCheck,
                                    label: "Background Check Reports",
                                    note: "If the error appeared on a background check (job or housing), include a copy of that report.",
                                },
                            ].map(({ Icon, label, note }, i) => (
                                <div key={i} className="flex gap-3 bg-white rounded-xl p-4 border border-blue-100">
                                    <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-blue-700" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 leading-tight">{label}</p>
                                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-slate-400 mt-6 text-center">
                            Don&apos;t have everything yet — that&apos;s okay. Our attorneys will guide you through what&apos;s needed during your free case review.
                        </p>
                    </div>
                </section>
            )}

            <CaseResults />

            {/* Related Guides — sub-page link grid (FDCPA→4 subs, TCPA→3 subs) */}
            {SUB_PAGES[resolvedParams.slug] && (
                <section className="w-full py-12 bg-gray-50">
                    <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl md:text-3xl font-[var(--font-playfair-display)] text-gray-900 mb-6 text-center">
                            Common {lawAcronym} Scenarios — Detailed Guides
                        </h2>
                        <nav aria-label={`${lawAcronym} sub-page guides`} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                            {SUB_PAGES[resolvedParams.slug].map((sub) => (
                                <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-200 transition-colors"
                                >
                                    <span>{sub.label}</span>
                                    <ArrowRight className="w-4 h-4 shrink-0" />
                                </Link>
                            ))}
                        </nav>
                    </div>
                </section>
            )}

            {/* FAQ Section - Last section before footer */}
            {lawData.faq && lawData.faq.length > 0 && (
                <FAQSection 
                    faqs={lawData.faq} 
                    title={`${lawAcronym} — Frequently Asked Questions`} 
                />
            )}

            {/* Footer Reinforcement */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                <p className="text-[15px] text-gray-700 leading-relaxed text-center">
                    {SITE_NAME} serves clients throughout Florida through phone and video consultations. You do not need to visit an office to request a free case review.
                </p>
            </section>
        </div>
    )
}
