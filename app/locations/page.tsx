import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SITE_NAME, SITE_URL, SERVE_STATEMENT, STATE_SERVE, PRIMARY_PHONE, PRIMARY_EMAIL } from "@/lib/site"
import { firms } from "@/data/firms"
import HeroBarTrans from "@/components/hero-bar-trans"
import { Marquee } from "@/components/ui/marquee"
import ContactFormSection from "@/components/ui/contact-form-section"
import Testimonials from "@/components/ui/testimonials"
import WhyFischetti from "@/components/ui/why-fischetti"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, CheckCircle, ArrowRight } from "lucide-react"
import FreeCaseReviewDialog from "@/components/free-case-review-dialog"
import FreeCaseReview from "@/components/free-case-review-button"
import LocationCard from "@/components/ui/location-card"

export const metadata: Metadata = {
    title: "Consumer Rights Lawyers Florida",
    description: `Consumer rights lawyers in Florida serving Orlando, Port St. Lucie, and Boynton Beach. No fee unless we win. Call (833) 645-3247.`,
    alternates: {
        canonical: "/locations",
    },
    openGraph: {
        title: "Consumer Rights Lawyers Florida | Consumer Law Florida",
        description: `Consumer rights lawyers in Florida serving Orlando, Port St. Lucie, and Boynton Beach. No fee unless we win. Call (833) 645-3247.`,
        url: `${SITE_URL}/locations`,
        images: [{
            url: "/opengraph-default.png",
            width: 1200,
            height: 630,
            alt: "Consumer Law Florida"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Consumer Rights Lawyers Florida | Consumer Law Florida",
        description: `Consumer rights lawyers in Florida serving Orlando, Port St. Lucie, and Boynton Beach. No fee unless we win. Call (833) 645-3247.`,
        images: ["/opengraph-default.png"],
    },
}

// Parse address into components for schema
function parseAddress(firm: typeof firms[0]) {
    return {
        streetAddress: `${firm.addressLine1} ${firm.addressLine2}`,
        addressLocality: firm.city,
        addressRegion: firm.state,
        postalCode: firm.zip,
        addressCountry: "US",
    }
}

export default function LocationsPage() {
    // Create location schemas as departments/locations within LegalService
    const locations = firms.map((firm) => {
        const address = parseAddress(firm)
        return {
            "@type": "Place",
            name: `${SITE_NAME} - ${firm.cityDisplay} Office`,
            address: {
                "@type": "PostalAddress",
                ...address,
            },
            telephone: firm.phone,
        }
    })

    const legalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: SITE_NAME,
        url: SITE_URL,
        telephone: PRIMARY_PHONE,
        email: PRIMARY_EMAIL,
        areaServed: {
            "@type": "State",
            name: STATE_SERVE,
        },
        description: SERVE_STATEMENT,
        department: locations,
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
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
                                        Florida Consumer Rights Lawyers
                                    </h1>
                                    <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 text-left">
                                        {SITE_NAME} represents individuals across the entire state of Florida in consumer protection cases involving credit reporting errors, debt collection harassment, robocalls, privacy violations, and housing discrimination. We handle cases statewide through phone and video consultations, making it easy to get help no matter where you live.
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
                    {/* Our Florida Offices Section */}
                    <section className="w-full py-16">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-[--font-playfair-display] md:text-5xl text-gray-900 mb-4">
                                    Our <span className="text-blue-600 italic">Florida</span> Offices
                                </h2>
                                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                                    Although we serve clients throughout Florida remotely, {SITE_NAME} maintains offices in key locations to better support our clients. You never need to travel to an office to start your case—most matters can be handled entirely by phone or video—but our physical locations help us stay connected to communities across the state.
                                </p>
                            </div>

                            {/* Office Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                                {firms.map((firm) => (
                                    <LocationCard key={firm.slug} firm={firm} />
                                ))}
                            </div>

                            {/* Location-Specific Content Blocks */}
                            <div className="space-y-12 mb-16">
                                {firms.map((firm) => (
                                    <div key={firm.slug} className="bg-gray-50 rounded-2xl p-8">
                                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                                            {firm.cityDisplay} Consumer {firm.slug === "port-st-lucie" ? "Protection Attorneys" : firm.slug === "boynton-beach" ? "Law Lawyers" : "Rights Lawyers"}
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed text-lg">
                                            {firm.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Consumer Protection Help Across Florida */}
                    <section className="w-full py-16 bg-white">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                            <h2 className="text-3xl md:text-4xl font-[--font-playfair-display] text-gray-900 mb-6 text-center">
                                Statewide Consumer Rights Representation in Florida
                            </h2>
                            <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700 leading-relaxed">
                                <p>
                                    {SITE_NAME} represents clients across the entire state, not just near our office locations. Many consumer protection laws are federal, meaning your rights are the same whether you live in Orlando, Miami, Tampa, Jacksonville, or anywhere else in Florida.
                                </p>
                                <p>
                                    By working remotely, we help clients take action against companies that violate consumer protection laws without requiring travel or in-person meetings. Our goal is to make legal help accessible, straightforward, and focused on results.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Practice Areas We Handle */}
                    <section className="w-full py-16 bg-gray-50">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                            <h2 className="text-3xl md:text-4xl font-[--font-playfair-display] text-gray-900 mb-8 text-center">
                                Consumer Law Practice Areas We Handle
                            </h2>
                            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                                {SITE_NAME} focuses exclusively on consumer protection matters, including:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                                <Card className="p-6 rounded-2xl border hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Credit Report Errors & Background Check Mistakes (FCRA)
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Inaccurate credit reporting, mixed files, and employment background check errors.
                                    </p>
                                    <Link href="/consumer-law/fcra" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                        Learn more about FCRA cases <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                                <Card className="p-6 rounded-2xl border hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Debt Collection Harassment (FDCPA)
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Threatening calls, illegal collection practices, and harassment by debt collectors.
                                    </p>
                                    <Link href="/consumer-law/fdcpa" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                        Learn more about FDCPA cases <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                                <Card className="p-6 rounded-2xl border hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Robocalls & Spam Texts (TCPA)
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Unwanted marketing calls, robotexts, and Do Not Call violations.
                                    </p>
                                    <Link href="/consumer-law/tcpa" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                        Learn more about TCPA cases <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                                <Card className="p-6 rounded-2xl border hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Privacy & Data Breach Violations
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Exposure of personal or financial information and identity theft risks.
                                    </p>
                                    <Link href="/consumer-law/privacy" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                        Learn more about privacy cases <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                                <Card className="p-6 rounded-2xl border hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Video Privacy & Tracking Pixel Lawsuits (VPPA)
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Illegal tracking of video viewing data through pixels and analytics tools.
                                    </p>
                                    <Link href="/consumer-law/vppa" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                        Learn more about VPPA cases <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                                <Card className="p-6 rounded-2xl border hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Fair Housing Discrimination (FHA)
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Housing discrimination, refusal to accommodate disabilities, and related violations.
                                    </p>
                                    <Link href="/consumer-law/fha" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                        Learn more about FHA cases <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                                <Card className="p-6 rounded-2xl border hover:shadow-md transition-shadow md:col-span-2">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Mass Arbitration Claims
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Large-scale consumer actions involving arbitration clauses and corporate misconduct.
                                    </p>
                                    <Link href="/consumer-law/mass-arbitration" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                        Learn more about mass arbitration <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Why Clients Choose Consumer Law Florida */}
                    <WhyFischetti />

                    {/* What to Expect Section */}
                    <section className="w-full py-16 bg-white">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                            <h2 className="text-3xl md:text-4xl font-[--font-playfair-display] text-gray-900 mb-8 text-center">
                                What to Expect in a Free Case Review
                            </h2>
                            <div className="max-w-3xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="p-6 rounded-2xl border">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                                <span className="text-blue-600 font-bold">1</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Situation</h3>
                                                <p className="text-gray-700">Tell us about your consumer rights issue. We'll listen and ask clarifying questions.</p>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="p-6 rounded-2xl border">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                                <span className="text-blue-600 font-bold">2</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Case Evaluation</h3>
                                                <p className="text-gray-700">Our attorneys review your case and explain your legal rights and options.</p>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="p-6 rounded-2xl border">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                                <span className="text-blue-600 font-bold">3</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Next Steps</h3>
                                                <p className="text-gray-700">If you have a valid claim, we'll outline the process and answer all your questions.</p>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="p-6 rounded-2xl border">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                                <span className="text-blue-600 font-bold">4</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pressure</h3>
                                                <p className="text-gray-700">Take your time to decide. There's no obligation to proceed after your free review.</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact Form Section */}
                    <ContactFormSection />

                    {/* Testimonials */}
                    <Testimonials />
                </div>
            </main>
        </>
    )
}
