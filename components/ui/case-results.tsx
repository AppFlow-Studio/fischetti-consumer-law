"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Play } from "lucide-react"

interface CaseResult {
    amount: string
    category: string
    description: string
    videoUrl?: string
    videoThumbnail?: string
}

const caseResults: CaseResult[] = [
    {
        amount: "$4.5 MILLION",
        category: "FCRA VIOLATION",
        description: "Credit reporting agency mixed up our client's file with another person's, causing wrongful denials for loans, apartments, and employment opportunities. The client suffered severe financial and emotional distress due to the bureau's negligence in maintaining accurate records.",
        videoUrl: "#",
        videoThumbnail: "/fischettiheadshot1.png"
    },
    {
        amount: "$2.1 MILLION",
        category: "FDCPA VIOLATION",
        description: "Debt collector harassed our client with constant calls, false threats, and abusive language. They violated federal law by calling at prohibited times, threatening legal action they couldn't take, and using deceptive practices to intimidate our client.",
    },
    {
        amount: "$1.8 MILLION",
        category: "TCPA VIOLATION",
        description: "Telemarketing company made hundreds of robocalls to our client's cell phone without consent. Despite being on the Do Not Call Registry, they continued calling multiple times daily, violating federal telecommunications law and causing significant disruption to our client's life.",
    },
    {
        amount: "$1.2 MILLION",
        category: "PRIVACY BREACH",
        description: "Major retailer's data breach exposed our client's personal information, including social security number and financial data. The company failed to implement proper security measures, leading to identity theft and financial fraud that devastated our client's credit and peace of mind.",
    }
]

export default function CaseResults() {
    return (
        <section className="w-full bg-white py-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our <span className="text-blue-600">Victories</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Real results for real people. We've recovered millions for clients who were wronged by unfair business practices.
                    </p>
                </div>

                {/* Featured Case Result */}
                <div className="mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Case Details */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="space-y-4"
                            >
                                <div className="text-6xl md:text-7xl font-bold text-gray-900 leading-none">
                                    <span className="text-4xl md:text-5xl">$</span>4.5 MILLION
                                </div>
                                <div className="border-b-2 border-gray-300 w-24"></div>
                                <h3 className="text-2xl font-bold text-gray-700 uppercase tracking-wide">
                                    FCRA Violation
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Credit reporting agency mixed up our client's file with another person's, causing wrongful denials for loans, apartments, and employment opportunities. The client suffered severe financial and emotional distress due to the bureau's negligence in maintaining accurate records.
                                </p>
                            </motion.div>
                        </div>

                        {/* Right Side - Video */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/fischettiheadshot1.png"
                                    alt="Michael Fishetti discussing case results"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20"></div>
                                <button className="absolute inset-0 flex items-center justify-center group">
                                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Additional Case Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {caseResults.slice(1).map((caseResult, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="space-y-4">
                                <div className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                                    <span className="text-3xl md:text-4xl"></span>{caseResult.amount.split(' ')[0]}
                                </div>
                                <div className="border-b-2 border-gray-300 w-16"></div>
                                <h3 className="text-xl font-bold text-gray-700 uppercase tracking-wide">
                                    {caseResult.category}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {caseResult.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 bg-gray-50 rounded-2xl p-8"
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {/* <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-600 text-2xl font-bold">✓</span>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Licensed in Florida</h4>
                            <p className="text-gray-600 text-sm">Fully licensed and authorized to practice law in Florida</p>
                        </div> */}

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 text-2xl font-bold">⚖️</span>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">No Win, No Fee</h4>
                            <p className="text-gray-600 text-sm">We only get paid when you win your case</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-yellow-600 text-2xl font-bold">⭐</span>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">4.9/5 Client Rating</h4>
                            <p className="text-gray-600 text-sm">Rated excellent by our satisfied clients</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-purple-600 text-2xl font-bold">🏆</span>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">$30M+ Recovered</h4>
                            <p className="text-gray-600 text-sm">Millions recovered for our clients</p>
                        </div>
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="text-center mt-12"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Ready to Fight for Your Rights?
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Don't let unfair business practices go unpunished. Get your free case evaluation today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#consultation"
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
                        >
                            Get Free Case Review
                        </a>
                        {/* <a
                            href="#results"
                            className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 hover:border-gray-400 transition-colors"
                        >
                            View More Results
                        </a> */}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
