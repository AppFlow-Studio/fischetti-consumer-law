import type { Metadata } from "next"
import Link from "next/link"
import { SITE_NAME, SITE_URL, SERVE_STATEMENT, STATE_SERVE, PRIMARY_PHONE, PRIMARY_EMAIL, PRIMARY_PHONE_E164 } from "@/lib/site"
import { firms } from "@/data/firms"
import HeroBarTrans from "@/components/hero-bar-trans"
import { Marquee } from "@/components/ui/marquee"
import Testimonials from "@/components/ui/testimonials"
import WhyFischetti from "@/components/ui/why-fischetti"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import { Card } from "@/components/ui/card"
import { Phone, CheckCircle, ArrowRight } from "lucide-react"
import FreeCaseReviewDialog from "@/components/free-case-review-dialog"
import FreeCaseReview from "@/components/free-case-review-button"
import LocationCard from "@/components/ui/location-card"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildMetadata({
    title: "Florida Consumer Law Offices — Our Locations",
    description: `Consumer protection attorneys serving Orlando, Miami, Tampa, Fort Lauderdale, Boynton Beach, and Port St. Lucie. No fee unless we win. Call ${PRIMARY_PHONE}.`,
    pathname: "/locations",
    type: "website",
})

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
            "@type": "LegalService",
            name: `${SITE_NAME} — ${firm.cityDisplay} Office`,
            url: SITE_URL,
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
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[--font-playfair-display] font-bold text-white leading-tight mb-6 text-left">
                                        Florida Consumer Rights Lawyers
                                    </h1>
                                    <p className="text-lg md:text-xl  text-white/90 leading-relaxed mb-8 text-left">
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
                                    <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-start items-stretch">
                                        <FreeCaseReviewDialog>
                                            <FreeCaseReview className="w-full sm:w-[260px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 text-lg font-semibold shadow-xl h-[56px] flex items-center justify-center" />
                                        </FreeCaseReviewDialog>
                                        <a
                                            href={`tel:${PRIMARY_PHONE_E164}`}
                                            className="w-full sm:w-[260px] inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-colors whitespace-nowrap h-[56px]"
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
                                        <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                            Get Your Free Case Review
                                        </p>
                                        <p className="text-gray-600 mb-6 text-sm md:text-base">
                                            Fill out the form below and we'll get back to you within 24 hours.
                                        </p>
                                        <SimpleContactForm useBlueTheme={true} />
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
                                        <h3 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                                            {firm.cityDisplay} Consumer {firm.slug === "port-st-lucie" ? "Protection Attorneys" : firm.slug === "boynton-beach" ? "Law Lawyers" : "Rights Lawyers"}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed text-lg">
                                            {firm.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Service Area Cities — crawlable links for Miami, Tampa, Fort Lauderdale */}
                    <section className="w-full py-12 bg-white border-t border-gray-100">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                            <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4 text-center">
                                We Also Serve These Florida Cities
                            </h2>
                            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                                No physical office? No problem. We represent consumers throughout Florida via phone and video consultations.
                            </p>
                            <nav aria-label="Service area cities" className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                                <Link
                                    href="/locations/miami"
                                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-6 py-4 text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-200 transition-colors"
                                >
                                    Miami Consumer Lawyer <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/locations/tampa"
                                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-6 py-4 text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-200 transition-colors"
                                >
                                    Tampa Consumer Lawyer <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/locations/fort-lauderdale"
                                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-6 py-4 text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-200 transition-colors"
                                >
                                    Fort Lauderdale Consumer Lawyer <ArrowRight className="w-4 h-4" />
                                </Link>
                            </nav>
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
                                {SITE_NAME} focuses exclusively on FCRA, FDCPA, and TCPA consumer protection matters:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                                <Card className="p-6 rounded-2xl border hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Credit Report Errors & Background Check Mistakes (FCRA)
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Inaccurate credit reporting, mixed files, and employment background check errors that damage your finances or cost you a job.
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
                                        Threatening calls, illegal collection practices, and harassment by debt collectors — each violation may be worth up to $1,000.
                                    </p>
                                    <Link href="/consumer-law/fdcpa" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                        Learn more about FDCPA cases <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                                <Card className="p-6 rounded-2xl border hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Debt Collector Won&apos;t Stop Calling
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Called after you asked them to stop? Every call after a cease request is a separate FDCPA violation worth up to $1,000.
                                    </p>
                                    <Link href="/consumer-law/fdcpa/debt-collector-keeps-calling" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                        Debt collector keeps calling <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                                <Card className="p-6 rounded-2xl border hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Robocalls & Spam Texts (TCPA)
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Unwanted marketing calls, robotexts, and Do Not Call violations — up to $1,500 per illegal call or text.
                                    </p>
                                    <Link href="/consumer-law/tcpa" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                        Learn more about TCPA cases <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                                <Card className="p-6 rounded-2xl border hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Texted STOP and Still Getting Texts
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        If a company keeps texting after you replied STOP, each additional text may be worth $500–$1,500 under the TCPA.
                                    </p>
                                    <Link href="/consumer-law/tcpa/texted-stop-still-getting-texts" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                        Texted STOP still getting texts <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                                <Card className="p-6 rounded-2xl border hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Robocall Lawsuit in Florida
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Illegal robocalls without consent violate the TCPA. Find out how to file a claim and what your case may be worth.
                                    </p>
                                    <Link href="/consumer-law/tcpa/robocall-lawsuit-florida" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                        Robocall lawsuit Florida <ArrowRight className="w-4 h-4" />
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

                    {/* CTA Section - Links to form above */}
                    <section className="w-full py-16 bg-gray-50">
                        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
                            <p className="text-3xl md:text-4xl font-[--font-playfair-display] text-gray-900 mb-4 font-bold">
                                Ready to Get Started?
                            </p>
                            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                Fill out the form above to get your free case review, or call us directly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="#case-review-form"
                                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    Get Your Free Case Review
                                </a>
                                <a
                                    href={`tel:${PRIMARY_PHONE_E164}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 text-lg font-semibold transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    Call {PRIMARY_PHONE}
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Testimonials */}
                    <Testimonials />
                </div>
            </main>
        </>
    )
}
