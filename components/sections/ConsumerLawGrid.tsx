"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileSearch, Gavel, Phone, Scale } from "lucide-react"
import { DamagesBadge } from "@/components/ui/damages-badge"

interface Law {
    slug: string
    title: string
    summary: string
    damagesType?: "fcra" | "fdcpa" | "tcpa"
}

interface ConsumerLawGridProps {
    laws: Law[]
}

const getLawIcon = (slug: string) => {
    switch (slug) {
        case 'fcra': return <FileSearch className="w-8 h-8" />
        case 'fdcpa': return <Gavel className="w-8 h-8" />
        case 'tcpa': return <Phone className="w-8 h-8" />
        default: return <Scale className="w-8 h-8" />
    }
}

export default function ConsumerLawGrid({ laws }: ConsumerLawGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {laws.map((law, i) => (
                <motion.div
                    key={law.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                    <Card className="group relative flex flex-col h-full bg-white border-gray-200 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="p-8 flex flex-col h-full">
                            <div className="mb-6 flex items-start justify-between">
                                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    {getLawIcon(law.slug)}
                                </div>
                                {law.damagesType && (
                                    <DamagesBadge type={law.damagesType} className="scale-110" />
                                )}
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-[var(--font-playfair-display)] group-hover:text-blue-600 transition-colors">
                                {law.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-8 leading-relaxed line-clamp-4">
                                {law.summary}
                            </p>
                            
                            <div className="mt-auto space-y-4">
                                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl shadow-lg group/btn">
                                    <Link href={`/consumer-law/${law.slug}`} className="flex items-center justify-center gap-2">
                                        Learn Your Rights
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                                <Link 
                                    href={`/consumer-law/${law.slug}`} 
                                    className="block text-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    Free Case Review
                                </Link>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}
