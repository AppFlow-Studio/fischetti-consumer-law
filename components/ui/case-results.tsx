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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 25,
                        mass: 1
                    }}
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
                        <motion.div
                            className="space-y-6 w-full"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.15,
                                        delayChildren: 0.1
                                    }
                                }
                            }}
                        >
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, x: -30 },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        transition: {
                                            type: "spring",
                                            stiffness: 80,
                                            damping: 25,
                                            mass: 1
                                        }
                                    }
                                }}
                                className="space-y-4 w-full"
                            >
                                <motion.div
                                    className="text-6xl md:text-7xl font-bold text-gray-900 leading-none"
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.9 },
                                        visible: {
                                            opacity: 1,
                                            scale: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 28,
                                                mass: 0.8
                                            }
                                        }
                                    }}
                                >
                                    <span className="text-4xl md:text-5xl">$</span>4.5 <span className="italic">MILLION</span>
                                </motion.div>
                                <div className="flex flex-row items-center justify-start gap-x-2">
                                    <motion.div
                                        className="border-b-2 border-gray-300 w-24"
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        whileInView={{ opacity: 1, scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 120,
                                            damping: 25,
                                            delay: 0.3
                                        }}
                                    />
                                    <span className="text-gray-700 text-base italic font-[--font-playfair-display]">collected for our clients</span>
                                </div>
                                <motion.h3
                                    className="text-2xl font-bold text-gray-700 uppercase tracking-wide"
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                type: "spring",
                                                stiffness: 80,
                                                damping: 25
                                            }
                                        }
                                    }}
                                >
                                    FCRA Violation
                                </motion.h3>
                                <motion.p
                                    className="text-gray-600 leading-relaxed text-lg"
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                type: "spring",
                                                stiffness: 80,
                                                damping: 25
                                            }
                                        }
                                    }}
                                >
                                    Credit reporting agency mixed up our client&apos;s file with another person&apos;s, causing wrongful denials for loans, apartments, and employment opportunities. The client suffered severe financial and emotional distress due to the bureau&apos;s negligence in maintaining accurate records.
                                </motion.p>
                            </motion.div>
                        </motion.div>

                        {/* Right Side - Video */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                type: "spring",
                                stiffness: 80,
                                damping: 25,
                                mass: 1
                            }}
                            className="relative w-full"
                        >
                            <motion.div
                                className="relative aspect-video rounded-xl overflow-hidden shadow-2xl"
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            >
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/IxgxIeLjHBA"
                                    title="Fischetti Law Group Case Results"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>


                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 25,
                        mass: 1
                    }}
                    className="mt-16 bg-gray-50 rounded-2xl p-8 w-full"
                >
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                    >
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
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: "spring",
                                            stiffness: 80,
                                            damping: 25,
                                            mass: 1
                                        }
                                    }
                                }}

                                className="text-center hover:ring-1 hover:ring-blue-500 p-2 hover:shadow-sm hover:scale-105 hover:translate-y-[-5px] rounded-xl transition-all duration-300"
                            >
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: {
                                            opacity: 1,
                                            scale: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 28,
                                                mass: 0.8
                                            }
                                        }
                                    }}
                                    className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <span className="text-blue-600 text-2xl font-bold"><item.icon /></span>
                                </motion.div>
                                <p className="text-lg font-semibold text-gray-900 mb-2">{item.title}</p>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 25,
                        mass: 1
                    }}
                    className="text-center mt-12 bg-[#096bad] rounded-xl p-8 w-full"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Ready to Fight for Your Rights?
                    </h3>
                    <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
                        Don&apos;t let unfair business practices go unpunished. Get your free case evaluation today.
                    </p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.3
                                }
                            }
                        }}
                    >
                        <motion.a
                            href="#consultation"
                            variants={{
                                hidden: { opacity: 0, y: 15 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 28,
                                        mass: 0.8
                                    }
                                }
                            }}
                            whileHover={{
                                scale: 1.03,
                                y: -2,
                                transition: { type: "spring", stiffness: 200, damping: 25 }
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
                        >
                            Get Free Case Review
                        </motion.a>
                        {/* <a
                            href="#results"
                            className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 hover:border-gray-400 transition-colors"
                        >
                            View More Results
                        </a> */}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
