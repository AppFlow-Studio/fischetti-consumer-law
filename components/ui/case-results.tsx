"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Clock, Play, Scale, Star, Trophy } from "lucide-react"
import { SpinningLogoText } from "./spinning-logo-text"

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
        description: "Credit reporting agencies mixed up our clients' files with other people's, causing wrongful denials for loans, apartments, and employment opportunities. Our clients suffered severe financial and emotional distress due to the bureaus' negligence in maintaining accurate records.",
        videoUrl: "#",
        videoThumbnail: "/fischettiheadshot1.png"
    },
    {
        amount: "$2.1 MILLION",
        category: "FDCPA VIOLATION",
        description: "Debt collectors harassed our clients with constant calls, false threats, and abusive language. They violated federal law by calling at prohibited times, threatening legal action they couldn't take, and using deceptive practices to intimidate our clients.",
    },
    {
        amount: "$1.8 MILLION",
        category: "TCPA VIOLATION",
        description: "Telemarketing companies made hundreds of robocalls to our clients' cell phones without consent. Despite being on the Do Not Call Registry, they continued calling multiple times daily, violating federal telecommunications law and causing significant disruption to our clients' lives.",
    },
    {
        amount: "$1.2 MILLION",
        category: "PRIVACY BREACH",
        description: "Major retailers' data breaches exposed our clients' personal information, including social security numbers and financial data. The companies failed to implement proper security measures, leading to identity theft and financial fraud that devastated our clients' credit and peace of mind.",
    }
]

export default function CaseResults() {
    return (
        <section className="w-full bg-white py-20">
            <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 py-6 ">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-start w-full flex flex-row lg:items-start items-center justify-between lg:mb-16 mb-4"
                >
                    <div className="w-full">
                        <h2 className="text-4xl font-[--font-playfair-display] md:text-5xl font-bold text-gray-900 mb-4">
                            Case Results. <span className="text-blue-600 italic">Millions</span> Recovered.
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto lg:flex hidden">
                            Florida consumer law victories you can trust. Our Florida consumer protection lawyers win cases under the FDCPA, FCRA, and TCPA—stopping harassing debt collection, fixing credit reporting errors, and ending illegal robocalls. Serving Miami, Fort Lauderdale, West Palm Beach, Tampa, Orlando, and across Florida. No win, no fee.
                        </p>
                    </div>
                    {/* Spinning logo for screens smaller than md */}
                    <SpinningLogoText
                        logo="/fischettilogo.png"
                        text="Fischetti • Law • Group •"
                        logoSize={90}
                        radius={6}
                        duration={20}
                        reverse={false}
                        textClassName="text-xl font-bold text-gray-900 leading-none"
                        className="flex md:hidden"
                    />
                    {/* Spinning logo for screens smaller than lg */}
                    <SpinningLogoText
                        logo="/fischettilogo.png"
                        text="Fischetti • Law • Group •"
                        logoSize={100}
                        radius={6}
                        duration={20}
                        reverse={false}
                        textClassName="text-2xl font-bold text-gray-900 leading-none"
                        className="md:flex hidden lg:hidden"
                    />
                    {/* Spinning logo for lg and above */}
                    <SpinningLogoText
                        logo="/fischettilogo.png"
                        text="Fischetti • Law • Group •"
                        logoSize={150}
                        radius={6}
                        duration={20}
                        reverse={false}
                        textClassName="lg:text-4xl text-2xl font-bold text-gray-900  leading-none"
                        className="hidden lg:flex"
                    />
                </motion.div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto lg:hidden flex mb-12">
                    Florida consumer law victories you can trust. Our Florida consumer protection lawyers win cases under the FDCPA, FCRA, and TCPA—stopping harassing debt collection, fixing credit reporting errors, and ending illegal robocalls. Serving Miami, Fort Lauderdale, West Palm Beach, Tampa, Orlando, and across Florida. No win, no fee.
                </p>

                {/* Featured Case Result */}
                <div className="mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Case Details */}
                        <div className="space-y-6 w-full">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] }}
                                className="space-y-4 w-full"
                            >
                                <div className="text-6xl md:text-7xl font-bold text-gray-900 leading-none">
                                    <span className="text-4xl md:text-5xl">$</span>4.5 <span className="italic">MILLION</span>
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
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] }}
                            className="relative w-full"
                        >
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/IxgxIeLjHBA"
                                    title="Fischetti Law Group Case Results"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Additional Case Results Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {caseResults.slice(1).map((caseResult, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.15,
                                ease: [0.21, 1.11, 0.81, 0.99]
                            }}
                            className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow w-full"
                        >
                            <div className="space-y-4">
                                <div className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                                    <span className="text-3xl md:text-4xl"></span>{caseResult.amount}
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
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        duration: 0.7,
                        ease: [0.21, 1.11, 0.81, 0.99]
                    }}
                    className="mt-16 bg-gray-50 rounded-2xl p-8 w-full"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {/* <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-600 text-2xl font-bold">✓</span>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Licensed in Florida</h4>
                            <p className="text-gray-600 text-sm">Fully licensed and authorized to practice law in Florida</p>
                        </div> */}

                        {[
                            { icon: Scale, title: "No Win, No Fee", description: "We only get paid when you win your case. No upfront costs, no hidden fees." },
                            { icon: Star, title: "5/5 Client Rating", description: "Rated excellent by our satisfied clients from 500+ reviews" },
                            { icon: Trophy, title: "$30M+ Recovered", description: "Millions recovered for our clients through successful settlements and verdicts" },
                            { icon: Clock, title: "+15,000 Cases Served", description: "We have helped thousands of clients get the compensation they deserve" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: [0.21, 1.11, 0.81, 0.99]
                                }}
                                className="text-center hover:ring-2 hover:ring-blue-500 p-2 hover:shadow-xl hover:scale-105 rounded-xl transition-all duration-300"
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1 + 0.2,
                                        ease: [0.21, 1.11, 0.81, 0.99]
                                    }}
                                    className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <span className="text-blue-600 text-2xl font-bold"><item.icon /></span>
                                </motion.div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        duration: 0.7,
                        ease: [0.21, 1.11, 0.81, 0.99]
                    }}
                    className="text-center mt-12 bg-[#096bad] rounded-xl p-8 w-full"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Ready to Fight for Your Rights?
                    </h3>
                    <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
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
