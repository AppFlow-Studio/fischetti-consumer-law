"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Phone } from "lucide-react"
import { Card } from "@/components/ui/card"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import { Marquee } from "@/components/ui/marquee"
import { PRIMARY_PHONE, PRIMARY_PHONE_E164 } from "@/lib/site"

interface ConsumerLawHeroProps {
    h1Title: string
    title: string
    summary: string
}

export default function ConsumerLawHero({ h1Title, title, summary }: ConsumerLawHeroProps) {
    return (
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
                    <span className="text-white">{title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left: Hero Content */}
                    <motion.div 
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/fischettiwhite-logo.png"
                                alt="Fischetti Law Group"
                                width={160}
                                height={64}
                                className="object-contain w-32 sm:w-40 h-auto"
                            />
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-[var(--font-playfair-display)] font-bold text-white leading-tight">
                            {h1Title}
                        </h1>
                        <div className="text-2xl md:text-3xl font-semibold text-blue-200 leading-tight mt-2">
                            {title}
                        </div>

                        <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                            {summary}
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
                    </motion.div>

                    {/* Right: Prominent Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        id="case-review-form" 
                        className="lg:sticky lg:top-24 relative"
                    >
                        <Card className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-2xl border border-white/20">
                            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                Get Your Free Case Review
                            </p>
                            <p className="text-gray-600 mb-6 text-sm md:text-base">
                                Fill out the form below and we'll get back to you within 24 hours.
                            </p>
                            <SimpleContactForm useBlueTheme={true} />
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Phone className="w-4 h-4 text-blue-600" />
                                    <span>Prefer to talk? Call <a href={`tel:${PRIMARY_PHONE_E164}`} className="text-blue-600 hover:underline font-semibold">{PRIMARY_PHONE}</a></span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
