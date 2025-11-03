"use client";

import { motion } from "motion/react";
import { CheckCircle, Scale, Shield } from "lucide-react";
import ConsumerLawsOrbital from "@/components/ui/consumer-laws-orbital";

export default function ConsumerLawSection() {
    return (
        <motion.section
            id="consumer-law"
            className="w-full bg-gray-50 py-8 scroll-mt-20 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="w-full">
                <div className="grid grid-cols-1 xl:flex xl:flex-row xl:space-y-0 space-y-8 items-start xl:justify-between  ">
                    {/* Left Side - Header and Description */}
                    <motion.div
                        className="space-y-8 xl:w-[55%] pl-2"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.div
                            className="space-y-4 lg:text-start text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.15,
                                        delayChildren: 0.3,
                                    },
                                },
                            }}
                        >
                            <motion.h2
                                className="text-4xl font-[--font-playfair-display] md:text-5xl  text-gray-900 leading-tight "
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                                    },
                                }}
                            >
                                The Fischetti Consumer Law
                                <span className="text-blue-600 italic"> Expertise</span>
                            </motion.h2>
                            <motion.div
                                className="space-y-4 lg:w-[84%] w-full"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.12,
                                            delayChildren: 0.4,
                                        },
                                    },
                                }}
                            >
                                <motion.p
                                    className="text-xl text-gray-600 leading-relaxed"
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                        },
                                    }}
                                >
                                    Fischetti Law Group specializes in protecting consumer rights across seven key areas of federal law.
                                    We fight for individuals who have been wronged by unfair business practices, aggressive debt collection,
                                    privacy violations, and more.
                                </motion.p>
                                <motion.p
                                    className="text-xl text-gray-600 leading-relaxed"
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                        },
                                    }}
                                >
                                    Consumer law safeguards everyday people from unfair, deceptive, or abusive acts by companies and collectors.
                                    These protections come from federal statutes like the FCRA (credit reporting), FDCPA (debt collection), TCPA (robocalls/texts),
                                    EFTA (electronic payments), TILA (lending disclosures), CROA (credit repair), and FCBA (billing errors). If a business or collector
                                    crossed the line, the law gives you remedies—statutory damages, actual damages, attorneys' fees, and court orders to make it stop.
                                </motion.p>
                                <motion.p
                                    className="text-xl text-gray-700 leading-relaxed"
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                        },
                                    }}
                                >
                                    Why Fischetti Law Group? We are trial-tested, results-driven, and client-first. You'll get clear communication,
                                    a strategy tailored to your goals, and a firm that doesn't get paid unless you win. We handle the fight so you can get back to your life.
                                </motion.p>
                            </motion.div>
                            {/* <div className="rounded-xl bg-gray-100 p-5">
                <h3 className="text-xl font-semibold text-gray-900">About Michael J. Fischetti</h3>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  Michael grew up in Honeoye Falls, NY, and graduated from SUNY Plattsburgh, where he led campus organizations and earned multiple academic honors.
                  He attended Nova Southeastern University Shepard Broad College of Law, served on the ATLA Trial Team, and tried cases as a Certified Legal Intern at the
                  Broward County Public Defender's Office—ultimately earning the Best Advocate award at the 2005 Winter Public Defender College. After public defense, he
                  moved into civil litigation, handling over 10,000 cases and recovering more than $30 million for clients across personal injury, foreclosure defense, PIP,
                  estate planning, and asset protection. Before opening Fischetti Law Group in 2016, he built and led a Broward office to partnership in just two years.
                  Michael's philosophy is simple: listen first, communicate clearly, and fight relentlessly for his clients.
                </p>
              </div> */}
                        </motion.div>

                        <motion.div
                            className="space-y-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.15,
                                        delayChildren: 0.7,
                                    },
                                },
                            }}
                        >
                            <motion.div
                                className="flex items-start gap-4"
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                    },
                                }}
                            >
                                <motion.div
                                    className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                                >
                                    <span className="text-blue-600 font-bold text-xl"><CheckCircle /></span>
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Track Record</h3>
                                    <p className="text-gray-600">
                                        Over $30 million recovered for clients through successful settlements and verdicts.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex items-start gap-4"
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                    },
                                }}
                            >
                                <motion.div
                                    className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                                >
                                    <span className="text-blue-600 font-bold text-xl"><Scale /></span>
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Win, No Fee</h3>
                                    <p className="text-gray-600">
                                        We only get paid when you win. No upfront costs, no hidden fees.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex items-start gap-4"
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                    },
                                }}
                            >
                                <motion.div
                                    className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                                >
                                    <span className="text-blue-600 font-bold text-xl"><Shield /></span>
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Federal Law Specialists</h3>
                                    <p className="text-gray-600">
                                        Deep expertise in FCRA, FDCPA, TCPA, and other consumer protection statutes.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <a
                                href="#consultation"
                                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-xl font-semibold text-white shadow-xl hover:bg-blue-700 transition-colors"
                            >
                                Get Your Free Case Review
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Consumer Laws Component */}
                    <motion.div
                        className="xl:w-[45%]  mt-8  rounded-xl"
                        initial={{ opacity: 0, x: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <ConsumerLawsOrbital />
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}

