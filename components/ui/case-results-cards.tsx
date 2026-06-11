"use client"

import { motion } from "framer-motion"

interface CaseResult {
    amount: string
    category: string
    description: string
}

const caseResults: CaseResult[] = [
    {
        amount: "$2.1 MILLION",
        category: "FDCPA VIOLATION",
        description: "Debt collectors harassed our clients with constant calls, false threats, and abusive language. They violated federal law by calling at prohibited times, threatening legal action they couldn't take, and using deceptive practices to intimidate our clients.",
    },
    {
        amount: "$1.8 MILLION",
        category: "TCPA VIOLATION",
        description: "Telemarketing companies made hundreds of robocalls to our clients' cell phones without consent. Despite being on the Do Not Call Registry, they continued calling multiple times daily, violating federal telecommunications law and causing significant disruption to our clients' lives.",
    }
]

export default function CaseResultsCards() {
    return (
        <section className="w-full bg-white py-12">
            <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.2
                            }
                        }
                    }}
                >
                    {caseResults.map((caseResult, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
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
                            whileHover={{
                                y: -4,
                                transition: { type: "spring", stiffness: 200, damping: 25 }
                            }}
                            className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow w-full"
                        >
                            <div className="space-y-4">
                                <div className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                                    {caseResult.amount}
                                </div>
                                <div className="flex flex-row items-center justify-start gap-x-2">
                                    <motion.div
                                        className="border-b-2 border-gray-300 w-16"
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
                                <p className="text-xl font-bold text-gray-700 uppercase tracking-wide">
                                    {caseResult.category}
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    {caseResult.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
