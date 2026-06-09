"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShieldCheck, AlertCircle, Landmark } from "lucide-react"
import { SITE_NAME } from "@/lib/site"

export default function ConsumerLawIndexHero() {
    return (
        <section
            className="relative w-full pt-32 pb-16 lg:pb-24"
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
                <nav className="text-sm text-white/80 mb-8">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-white">Consumer Law</span>
                </nav>

                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl space-y-6"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[var(--font-playfair-display)] font-bold text-white leading-tight">
                        Your Rights as a Florida Consumer — FCRA, FDCPA & TCPA
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                        Federal and state laws protect you from credit reporting errors, debt collection harassment, and illegal robocalls. At {SITE_NAME}, we hold big companies accountable—at no out-of-pocket cost to you.
                    </p>
                    
                    <div className="flex flex-wrap gap-6 pt-4">
                        {/* Trust Signals */}
                        <div className="flex items-center gap-2 text-white/90">
                            <ShieldCheck className="w-6 h-6 text-blue-300" />
                            <span className="font-semibold text-sm md:text-base">No Fee Unless We Win</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                            <AlertCircle className="w-6 h-6 text-blue-300" />
                            <span className="font-semibold text-sm md:text-base">Free Case Review</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                            <Landmark className="w-6 h-6 text-blue-300" />
                            <span className="font-semibold text-sm md:text-base">Statewide Representation</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
