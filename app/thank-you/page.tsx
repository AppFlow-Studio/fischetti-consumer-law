"use client"

import { motion } from "motion/react"
import { Phone, Mail, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { PRIMARY_PHONE, PRIMARY_PHONE_E164 } from "@/lib/site"
import { Suspense } from "react"
import Image from "next/image"

const fadeIn = {
    hidden: { opacity: 0, y: 12 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: "easeOut" as const },
    }),
}

function ThankYouContent() {
    const searchParams = useSearchParams()
    const firstName = searchParams?.get("name") || ""

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section
                className="relative w-full py-20 sm:py-28"
                style={{
                    background: "radial-gradient(ellipse at top, #051937 0%, #0a2351 50%, #051937 100%)",
                }}
            >
                {/* Subtle grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <Image
                            src="/fischettiwhite-logo.png"
                            alt="Fischetti Law Group"
                            width={400}
                            height={100}
                            className="mx-auto"
                        />
                    </motion.div>

                    {/* Success Indicator */}
                    {/* <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                                <Check className="w-6 h-6 text-white" strokeWidth={3} />
                            </div>
                        </div>
                    </motion.div> */}

                    {/* Heading */}
                    <motion.h1
                        custom={0.3}
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        {firstName ? `${firstName}, your` : "Your"} case is in good hands.
                    </motion.h1>

                    <motion.p
                        custom={0.4}
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="text-lg text-slate-300 mb-6"
                    >
                        We've received your information and our team is reviewing your case.
                    </motion.p>

                    <motion.p
                        custom={0.5}
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="text-slate-400"
                    >
                        Expect a call from us within <span className="text-white font-semibold">24 hours</span>.
                    </motion.p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 sm:py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* What Happens Next */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <h2 className="text-xl font-semibold text-slate-900 mb-6">
                                What happens next
                            </h2>

                            <div className="space-y-5">
                                {[
                                    {
                                        num: "01",
                                        title: "Case Review",
                                        desc: "Our attorneys review the details you provided to understand your situation.",
                                    },
                                    {
                                        num: "02",
                                        title: "Initial Assessment",
                                        desc: "We evaluate the merits and potential outcomes of your case.",
                                    },
                                    {
                                        num: "03",
                                        title: "Personal Contact",
                                        desc: "A member of our team reaches out to discuss your options.",
                                    },
                                ].map((step, i) => (
                                    <motion.div
                                        key={step.num}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                                        className="flex gap-4"
                                    >
                                        <span className="text-sm font-mono text-slate-400 pt-0.5">
                                            {step.num}
                                        </span>
                                        <div>
                                            <h3 className="font-medium text-slate-900 mb-1">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Contact Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="bg-slate-50 rounded-xl p-6 sm:p-8 h-fit"
                        >
                            <h2 className="text-xl font-semibold text-slate-900 mb-2">
                                Need immediate help?
                            </h2>
                            <p className="text-slate-500 mb-6">
                                Our team is available around the clock for urgent matters.
                            </p>

                            <div className="space-y-4">
                                <a
                                    href={`tel:${PRIMARY_PHONE_E164}`}
                                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                                        <Phone className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Call us now</p>
                                        <p className="font-semibold text-slate-900">{PRIMARY_PHONE}</p>
                                    </div>
                                </a>

                                <a
                                    href="mailto:info@consumerlawflorida.com"
                                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-slate-800 transition-colors">
                                        <Mail className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Email us</p>
                                        <p className="font-semibold text-slate-900">info@consumerlawflorida.com</p>
                                    </div>
                                </a>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <p className="text-xs text-slate-400 text-center">
                                    Available 24/7 · No fees unless we win
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className="mt-16 py-8 border-y border-slate-200"
                    >
                        <div className="grid grid-cols-3 gap-8 text-center">
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-slate-900">$30M+</p>
                                <p className="text-sm text-slate-500 mt-1">Recovered</p>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-slate-900">15,000+</p>
                                <p className="text-sm text-slate-500 mt-1">Cases Handled</p>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-slate-900">20+</p>
                                <p className="text-sm text-slate-500 mt-1">Years Experience</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="mt-12 text-center"
                    >
                        <Link href="/">
                            <Button
                                size="lg"
                                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-base font-medium rounded-lg group"
                            >
                                Return to Homepage
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <section className="py-8 bg-slate-50 border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-sm text-slate-500">
                        Fischetti Law Group · 7593 Boynton Beach Blvd, Suite 110, Boynton Beach, FL 33437
                    </p>
                </div>
            </section>
        </main>
    )
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <ThankYouContent />
        </Suspense>
    )
}
