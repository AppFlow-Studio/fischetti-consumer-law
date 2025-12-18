import fs from "node:fs"
import path from "node:path"
import type { Metadata } from "next"
import ConsumerLawDetails, { ConsumerLawJsonLd } from "@/components/consumer-law-details"
import { Card } from "@/components/ui/card"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import CaseResults from "@/components/ui/case-results"
import Image from "next/image"
import { Shield, CheckCircle, Phone } from "lucide-react"
import Link from "next/link"
import HeroBarTrans from "@/components/hero-bar-trans"
import { Marquee } from "@/components/ui/marquee"
import { SITE_URL, SITE_NAME, SERVE_STATEMENT, STATE_SERVE } from "@/lib/site"
import SeoInsightBlock from "@/components/sections/SeoInsightBlock"
import { LAW_CONTENT_MAP } from "@/lib/lawSectionContent"
type Law = any

// Helper function to generate law-specific OfferCatalog schema
function getLawOfferSchema(slug: string) {
    const lawMap: Record<string, { name: string }> = {
        fcra: { name: "FCRA Claim Review" },
        fdcpa: { name: "FDCPA Debt Collection Claim Review" },
        tcpa: { name: "TCPA Robocall & Text Claim Review" },
        privacy: { name: "Data Privacy & Breach Claim Review" },
        vppa: { name: "Video Privacy (VPPA) Claim Review" },
        fha: { name: "Fair Housing Act Claim Review" },
        "mass-arbitration": { name: "Mass Arbitration Case Review" }
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
    }
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
    const slug = await params
    const law = laws.find((l) => l.slug === slug.slug)
    
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
            privacy: "Data Breach Lawyer in Florida",
            vppa: "Video Privacy Lawyer",
            fha: "Fair Housing Lawyer in Florida",
            "mass-arbitration": "Mass Arbitration Lawyer"
        }
        return titleMap[slug] || `${law.title} Lawyer`
    }

    const getLawDescription = (slug: string): string => {
        const descriptionMap: Record<string, string> = {
            fcra: "FCRA Lawyer in Florida for credit report errors, mixed files, and failed disputes. No fee unless we win. Call (833) 645-3247.",
            fdcpa: "Debt Collection Lawyer in Florida for harassment, threats, and illegal collection tactics. No fee unless we win. Call (833) 645-3247.",
            tcpa: "Robocall Lawyer in Florida for spam texts and automated calls without consent. No fee unless we win. Call (833) 645-3247.",
            privacy: "Data Breach Lawyer in Florida for personal information violations and privacy breaches. No fee unless we win. Call (833) 645-3247.",
            vppa: "Video Privacy Lawyer in Florida for tracking pixel violations and viewing data sharing. No fee unless we win. Call (833) 645-3247.",
            fha: "Fair Housing Lawyer in Florida for housing discrimination and fair housing violations. No fee unless we win. Call (833) 645-3247.",
            "mass-arbitration": "Mass Arbitration Lawyer in Florida for consumer protection claims. No fee unless we win. Call (833) 645-3247."
        }
        return descriptionMap[slug] || `${law.title} lawyer in Florida for consumer protection violations. No fee unless we win. Call (833) 645-3247.`
    }

    const title = getLawTitle(slug.slug)
    const description = getLawDescription(slug.slug)

    return {
        title,
        description,
        alternates: {
            canonical: `/consumer-law/${slug.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/consumer-law/${slug.slug}`,
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

// Law-specific content generators
function getQualificationItems(slug: string): string[] {
    const content: Record<string, string[]> = {
        fcra: [
            "Your credit report shows errors that were not corrected after a dispute",
            "A background check cost you a job, apartment, or promotion",
            "Your credit file was mixed with someone else's information",
            "Old, inaccurate, or duplicate accounts remain on your report",
            "You were not properly notified of an adverse decision",
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
        privacy: [
            "Your personal data was exposed or shared",
            "You were notified of a data breach",
            "Sensitive information was improperly accessed",
            "A company failed to safeguard your information",
            "You experienced identity or privacy concerns",
        ],
        vppa: [
            "A website shared your video viewing data",
            "Tracking pixels transmitted viewing information",
            "Data was shared without consent",
            "Video content was linked to your identity",
            "Third parties received viewing activity",
        ],
        fha: [
            "A landlord refused a reasonable accommodation",
            "Housing was denied based on disability or family status",
            "Different terms were applied unfairly",
            "Requests for assistance animals were denied",
            "Discriminatory statements were made",
        ],
        "mass-arbitration": [
            "A company requires arbitration instead of court",
            "Many consumers experienced the same issue",
            "Arbitration clauses limit class actions",
            "A company imposed unfair contract terms",
            "Widespread consumer harm occurred",
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
        privacy: [
            "Consumers whose personal data was collected",
            "Individuals affected by data breaches",
            "Users whose information was shared improperly",
        ],
        vppa: [
            "Users of video and streaming platforms",
            "Website visitors watching embedded videos",
            "Consumers tracked without permission",
        ],
        fha: [
            "Renters and homebuyers",
            "Individuals with disabilities",
            "Families with children",
        ],
        "mass-arbitration": [
            "Consumers bound by arbitration clauses",
            "Users affected by large-scale practices",
            "Groups facing similar violations",
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
        privacy: [
            {
                title: "Failing to secure personal data",
                description: "Companies must implement reasonable security measures to protect consumer information from breaches.",
            },
            {
                title: "Sharing data without authorization",
                description: "Personal information cannot be shared or sold to third parties without proper consent or notice.",
            },
            {
                title: "Improper data storage practices",
                description: "Companies must store data securely and not retain information longer than necessary.",
            },
            {
                title: "Delayed breach notifications",
                description: "When data breaches occur, companies must notify affected consumers in a timely manner.",
            },
        ],
        vppa: [
            {
                title: "Sharing video viewing history",
                description: "Companies cannot share what videos you watched with third parties without proper written consent.",
            },
            {
                title: "Using tracking pixels without consent",
                description: "Tracking pixels that transmit viewing data to advertisers or analytics platforms may violate the VPPA.",
            },
            {
                title: "Transmitting data to third parties",
                description: "Sending viewing information along with personal identifiers to third parties requires specific consent.",
            },
            {
                title: "Linking viewing data to personal identifiers",
                description: "Sharing viewing history that can be linked back to specific individuals violates privacy protections.",
            },
        ],
        fha: [
            {
                title: "Refusing reasonable accommodations",
                description: "Landlords must allow reasonable accommodations for disabilities, such as assistance animals or accessible parking.",
            },
            {
                title: "Discriminatory rental policies",
                description: "Housing providers cannot refuse to rent or impose different terms based on protected characteristics.",
            },
            {
                title: "Unequal treatment or conditions",
                description: "Applying different rent, deposits, or conditions based on protected classes violates fair housing laws.",
            },
            {
                title: "Retaliation after complaints",
                description: "Landlords cannot retaliate against tenants who assert their fair housing rights or file complaints.",
            },
        ],
        "mass-arbitration": [
            {
                title: "Forced arbitration clauses",
                description: "Companies use arbitration clauses to prevent class actions and limit consumer rights to court.",
            },
            {
                title: "Uniform consumer contract violations",
                description: "When many consumers face the same unfair practices, mass arbitration can address widespread harm.",
            },
            {
                title: "Widespread unlawful practices",
                description: "Systemic violations affecting many consumers can be addressed through coordinated arbitration filings.",
            },
            {
                title: "Systemic consumer harm",
                description: "Mass arbitration allows consumers to band together when individual claims might be too small to pursue.",
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
        privacy: [
            "Some cases allow statutory recovery",
            "Others consider harm or risk exposure",
            "Each case depends on facts",
            "No upfront fees",
        ],
        vppa: [
            "Some violations allow statutory recovery",
            "Liability depends on data handling",
            "Each case is fact-specific",
            "No upfront fees",
        ],
        fha: [
            "Some violations allow recovery",
            "Outcomes depend on conduct",
            "Each case is fact-specific",
            "No upfront fees",
        ],
        "mass-arbitration": [
            "Outcomes depend on arbitration process",
            "Recovery varies by case",
            "Strategy depends on scale",
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
        privacy: "Privacy laws require companies to protect consumer information and notify individuals when data is compromised.",
        vppa: "The Video Privacy Protection Act limits how companies may collect and share information about consumers' video viewing habits.",
        fha: "The Fair Housing Act prohibits discrimination in housing-related transactions and requires equal access to housing opportunities.",
        "mass-arbitration": "Mass arbitration involves many consumers filing individual arbitration claims at the same time to address widespread misconduct.",
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
        privacy: [
            { label: "Breach notification letters", icon: "FileText" },
            { label: "Account activity records", icon: "FileCheck" },
            { label: "Emails from companies", icon: "Mail" },
            { label: "Identity monitoring alerts", icon: "AlertCircle" },
        ],
        vppa: [
            { label: "URLs of video pages", icon: "FileText" },
            { label: "Website screenshots", icon: "FileCheck" },
            { label: "Privacy policies", icon: "FileText" },
            { label: "Tracking disclosures", icon: "Shield" },
        ],
        fha: [
            { label: "Lease agreements", icon: "FileText" },
            { label: "Written accommodation requests", icon: "FileCheck" },
            { label: "Emails or messages from landlords", icon: "Mail" },
            { label: "Advertisements or listings", icon: "FileText" },
        ],
        "mass-arbitration": [
            { label: "Terms of service", icon: "FileText" },
            { label: "Contracts or agreements", icon: "FileCheck" },
            { label: "Notices from companies", icon: "Mail" },
            { label: "Records showing repeated conduct", icon: "FileText" },
        ],
    }
    return content[slug] || []
}

export default async function ConsumerLawDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const laws = readLaws()
    const slug = await params
    const law = laws.find((l) => l.slug === slug.slug)
    console.log(slug.slug)
    if (!law) {
        return null
    }

    // Get law-specific SEO content
    const sectionContent = LAW_CONTENT_MAP[slug.slug]

    // Extract acronym from title for H1 optimization
    const getLawAcronym = (title: string, slug: string): string => {
        if (title.includes("—")) {
            return title.split("—")[0].trim()
        }
        if (slug === "privacy") return "Privacy"
        if (slug === "vppa") return "VPPA"
        if (slug === "fha") return "FHA"
        if (slug === "mass-arbitration") return "Mass Arbitration"
        return title.split(" ")[0]
    }

    const lawAcronym = getLawAcronym(law.title, slug.slug)
    const h1Title = `${lawAcronym} Lawyer Florida`

    // Prepare law data with law-specific content
    const lawData = {
        ...law,
        // Override with law-specific content if available
        keyStatutes: sectionContent?.keyStatutes || [],
        whoIsProtected: sectionContent?.whoIsProtected || law.whoIsProtected,
        commonViolations: sectionContent?.commonViolations || law.commonViolations,
        yourRights: sectionContent?.yourRights || law.yourRights,
        whatToDoNext: sectionContent?.whatToDoNext || law.whatToDoNext,
        damagesAndRemedies: sectionContent?.damagesAndRemedies || law.damagesAndRemedies,
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
                item: `${SITE_URL}/consumer-law/${slug.slug}`,
            },
        ],
    }

    // Article schema for better rich results
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: h1Title,
        description: law.summary,
        author: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        datePublished: "2024-01-01", // Static date - update if you track actual publish dates
        dateModified: new Date().toISOString().split("T")[0],
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/consumer-law/${slug.slug}`,
        },
        image: law.heroImage ? `${SITE_URL}${law.heroImage}` : `${SITE_URL}/opengraph-default.png`,
    }

    // Get law-specific offer catalog for schema
    const offerCatalog = getLawOfferSchema(slug.slug)

    return (
        <div className="w-full overflow-x-hidden bg-white">
            <ConsumerLawJsonLd data={law} offerCatalog={offerCatalog} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            {/* Hero Section */}
            <section
                id="consumer-law-hero"
                className="relative w-full pt-24 pb-16 lg:pb-24"
                style={{
                    backgroundImage: "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/40 to-transparent" />

                <div className="relative w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="text-sm text-white/80 mb-6">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/consumer-law" className="hover:text-white transition-colors">Consumer Law</Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">{law.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* Left: Hero Content */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative w-32 sm:w-40 h-16 sm:h-20">
                                    <Image
                                        src="/fischettiwhite-logo.png"
                                        alt="Fischetti Law Group"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            <h1 className="sr-only">{h1Title}</h1>
                            <div className="text-4xl md:text-5xl lg:text-6xl font-[--font-playfair-display] font-bold text-white leading-tight">
                                {law.title}
                            </div>

                            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                                {law.summary}
                            </p>

                            {/* Key Benefits */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="flex items-center gap-2 text-white/90">
                                    <CheckCircle className="w-5 h-5 text-blue-300" />
                                    <span className="text-sm md:text-base">No fees unless we win</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/90">
                                    <CheckCircle className="w-5 h-5 text-blue-300" />
                                    <span className="text-sm md:text-base">Free consultation</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/90">
                                    <CheckCircle className="w-5 h-5 text-blue-300" />
                                    <span className="text-sm md:text-base">Expert legal representation</span>
                                </div>
                            </div>

                            <div className="mb-4 xl:mb-8 w-full pr-8">
                                <Marquee className="backdrop-blur-sm rounded-xl py-3 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem)]" pauseOnHover={true}>
                                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                                        <span>5/5 from 500+ reviews</span>
                                    </div>
                                    <p className="text-white">•</p>
                                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                                        <span>$30M+ recovered for clients</span>
                                    </div>
                                    <p className="text-white">•</p>
                                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                                        <span>Available 24/7</span>
                                    </div>
                                    <p className="text-white">•</p>
                                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                                        <span>No fees unless we win</span>
                                    </div>
                                    <p className="text-white">•</p>
                                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                                        <span>Confidential consultations</span>
                                    </div>
                                    <p className="text-white">•</p>
                                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                                        <span>15,000+ cases served</span>
                                    </div>
                                    <p className="text-white">•</p>

                                </Marquee>

                            </div>
                        </div>

                        {/* Right: Prominent Form */}
                        <div className="lg:sticky lg:top-24 relative">
                            {/* SVG Filter Definition */}
                            <svg style={{ display: 'none' }}>
                                <filter id="displacementFilter">
                                    <feTurbulence
                                        type="turbulence"
                                        baseFrequency="0.01"
                                        numOctaves="2"
                                        result="turbulence"
                                    />
                                    <feDisplacementMap
                                        in="SourceGraphic"
                                        in2="turbulence"
                                        scale="200"
                                        xChannelSelector="R"
                                        yChannelSelector="G"
                                    />
                                </filter>
                            </svg>

                            {/* Liquid Glass Background */}
                            <div
                                className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
                                style={{
                                    filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                                    backdropFilter: 'brightness(1.1) blur(2px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                }}
                            >
                                <div
                                    className="absolute inset-0 rounded-3xl"
                                    style={{
                                        boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                                    }}
                                />
                            </div>

                            <div className="relative z-20 rounded-2xl shadow-2xl p-6 md:p-8 ">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Free Case Review</h2>
                                        <p className="text-sm text-gray-200">Get started in minutes</p>
                                    </div>
                                </div>

                                <p className="text-gray-200 mb-6 leading-relaxed">
                                    Tell us about your situation. Our experienced consumer law attorneys will review your case at no cost. <strong className="text-white">No fees unless we win.</strong>
                                </p>

                                <SimpleContactForm />

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-center gap-3 text-sm text-gray-200">
                                        <Phone className="w-4 h-4 text-blue-600" />
                                        <span>Prefer to talk? Call <a href="tel:8336453247" className="text-blue-600 hover:underline font-semibold">(833) 645-3247</a></span>
                                    </div>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            </section>
            <HeroBarTrans />

            {/* Content Section */}
            <section className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <ConsumerLawDetails {...lawData} />
                </section>

            {/* SEO/CRO Insight Sections */}
            <section className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
                <div className="space-y-6">
                    {/* 1. Do I Have a Case? */}
                    <SeoInsightBlock
                        variant="qualification"
                        title={`Do I Have a Case Under the ${lawAcronym}?`}
                        content={{
                            items: getQualificationItems(slug.slug),
                        }}
                    />

                    {/* 2. Who This Law Protects */}
                    <SeoInsightBlock
                        variant="audience"
                        title="Who This Law Protects"
                        content={{
                            items: getAudienceItems(slug.slug),
                        }}
                    />

                    {/* 3. Common Violations We See */}
                    <SeoInsightBlock
                        variant="violations"
                        title={`Common ${lawAcronym} Violations`}
                        content={{
                            items: getViolationsItems(slug.slug),
                        }}
                    />

                    {/* 4. How Compensation May Be Available */}
                    <SeoInsightBlock
                        variant="compensation"
                        title="How Compensation May Be Available"
                        content={{
                            items: getCompensationItems(slug.slug),
                        }}
                    />

                    {/* 5. Understanding the [LAW NAME] */}
                    <SeoInsightBlock
                        variant="overview"
                        title={`Understanding the ${lawAcronym}`}
                        content={{
                            text: getOverviewText(slug.slug, law.summary || ""),
                        }}
                    />

                    {/* 6. What Information Is Helpful */}
                    <SeoInsightBlock
                        variant="evidence"
                        title="What Information Is Helpful"
                        content={{
                            items: getEvidenceItems(slug.slug),
                        }}
                    />
                </div>
            </section>

            <CaseResults />

            {/* FAQ Section - Last section before footer */}
            {law.faq && law.faq.length > 0 && (
                <section className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-white">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {law.faq.map((f: { question: string; answer: string }, i: number) => (
                            <Card key={`faq-${i}`} className="p-5 rounded-2xl border">
                                <h3 className="text-lg font-semibold text-gray-900">{f.question}</h3>
                                <p className="mt-2 text-gray-700 leading-relaxed">{f.answer}</p>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer Reinforcement */}
            <section className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <p className="text-[15px] text-gray-700 leading-relaxed text-center">
                    {SITE_NAME} serves clients throughout Florida through phone and video consultations. You do not need to visit an office to request a free case review.
                </p>
            </section>
        </div>
    )
}


