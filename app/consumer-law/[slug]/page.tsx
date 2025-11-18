import fs from "node:fs"
import path from "node:path"
import ConsumerLawDetails, { ConsumerLawJsonLd } from "@/components/consumer-law-details"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import CaseResults from "@/components/ui/case-results"
import Image from "next/image"
import { Shield, CheckCircle, Phone } from "lucide-react"
import Link from "next/link"
import HeroBarTrans from "@/components/hero-bar-trans"
import { Marquee } from "@/components/ui/marquee"
type Law = any

function readLaws(): Law[] {
    const p = path.join(process.cwd(), "data", "consumer-laws.json")
    const raw = fs.readFileSync(p, "utf-8")
    return JSON.parse(raw)
}

export async function generateStaticParams() {
    const laws = readLaws()
    return laws.map((l) => ({ slug: l.slug }))
}

export default async function ConsumerLawDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const laws = readLaws()
    const slug = await params
    const law = laws.find((l) => l.slug === slug.slug)
    console.log(slug.slug)
    if (!law) {
        return null
    }
    const siteUrl = "https://example.com"
    return (
        <div className="w-full overflow-x-hidden bg-white">
            <ConsumerLawJsonLd data={law} siteUrl={siteUrl} />

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

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[--font-playfair-display] font-bold text-white leading-tight">
                                {law.title}
                            </h1>

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
                    <ConsumerLawDetails {...law} />
                </section>

            <CaseResults />
        </div>
    )
}


