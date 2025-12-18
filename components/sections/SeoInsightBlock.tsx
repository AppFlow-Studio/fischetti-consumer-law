"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { CheckCircle, FileText, MessageSquare, Phone, Mail, FileCheck, Shield, AlertCircle } from "lucide-react"
import FreeCaseReview from "@/components/free-case-review-button"
import FreeCaseReviewDialog from "@/components/free-case-review-dialog"

type QualificationContent = {
    items: string[]
}

type AudienceContent = {
    items: string[]
}

type ViolationsContent = {
    items: Array<{ title: string; description: string }>
}

type CompensationContent = {
    items: string[]
}

type OverviewContent = {
    text: string
}

type EvidenceContent = {
    items: Array<{ label: string; icon: keyof typeof iconMap }>
}

type WhyUsContent = {
    items: string[]
}

type GeoContent = {
    text: string
}

type PolicyContent = {
    text: string
}

type SeoInsightBlockProps =
    | {
          variant: "qualification"
          title: string
          content: QualificationContent
          lawName?: string
          cityName?: string
      }
    | {
          variant: "audience"
          title: string
          content: AudienceContent
          lawName?: string
          cityName?: string
      }
    | {
          variant: "violations"
          title: string
          content: ViolationsContent
          lawName?: string
          cityName?: string
      }
    | {
          variant: "compensation"
          title: string
          content: CompensationContent
          lawName?: string
          cityName?: string
      }
    | {
          variant: "overview"
          title: string
          content: OverviewContent
          lawName?: string
          cityName?: string
      }
    | {
          variant: "evidence"
          title: string
          content: EvidenceContent
          lawName?: string
          cityName?: string
      }
    | {
          variant: "why-us"
          title: string
          content: WhyUsContent
          lawName?: string
          cityName?: string
      }
    | {
          variant: "geo"
          title: string
          content: GeoContent
          lawName?: string
          cityName?: string
      }
    | {
          variant: "policy"
          title: string
          content: PolicyContent
          lawName?: string
          cityName?: string
      }

const iconMap = {
    FileText,
    MessageSquare,
    Phone,
    Mail,
    FileCheck,
    Shield,
    AlertCircle,
}

export default function SeoInsightBlock(props: SeoInsightBlockProps) {
    const { variant, title, content } = props
    const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

    const handleCheckboxChange = (index: number) => {
        setCheckedItems((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(index)) {
                newSet.delete(index)
            } else {
                newSet.add(index)
            }
            return newSet
        })
    }

    const hasCheckedItems = checkedItems.size > 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
        >
            <Card className="bg-white/95 rounded-2xl border p-4 md:p-5 shadow-sm ring-1 ring-gray-200/70">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-3">{title}</h2>

                {variant === "qualification" && (
                    <div className="space-y-3">
                        <ul className="space-y-2">
                            {(content as QualificationContent).items.map((item, index) => {
                                const isChecked = checkedItems.has(index)
                                return (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-[15px] text-gray-700 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
                                        onClick={() => handleCheckboxChange(index)}
                                    >
                                        <div className="relative shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => {}}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleCheckboxChange(index)
                                                }}
                                                className="absolute inset-0 w-5 h-5 rounded border-2 border-gray-300 cursor-pointer appearance-none checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all"
                                            />
                                            {isChecked && (
                                                <motion.svg
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                    className="absolute inset-0 w-5 h-5 text-white pointer-events-none z-10"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </motion.svg>
                                            )}
                                        </div>
                                        <span className="flex-1 leading-relaxed select-none">{item}</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <AnimatePresence>
                            {hasCheckedItems && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto", marginTop: 8 }}
                                    exit={{ opacity: 0, y: -10, height: 0, marginTop: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="overflow-hidden"
                                >
                                    <FreeCaseReviewDialog>
                                        <FreeCaseReview className="w-full sm:w-auto" />
                                    </FreeCaseReviewDialog>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {variant === "audience" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {(content as AudienceContent).items.map((item, index) => (
                            <div key={index} className="flex items-start gap-2 text-[15px] text-gray-700 leading-relaxed">
                                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                )}

                {variant === "violations" && (
                    <ul className="space-y-2.5">
                        {(content as ViolationsContent).items.map((item, index) => (
                            <li key={index} className="text-[15px] text-gray-700 leading-relaxed">
                                <span className="font-semibold text-gray-900">{item.title}:</span>{" "}
                                <span>{item.description}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {variant === "compensation" && (
                    <ul className="space-y-2">
                        {(content as CompensationContent).items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-[15px] text-gray-700 leading-relaxed">
                                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {variant === "overview" && (
                    <div className="text-[15px] text-gray-700 leading-relaxed space-y-2">
                        <p>{(content as OverviewContent).text}</p>
                        <p className="text-sm text-gray-600">
                            Understanding your rights under consumer protection laws is the first step toward seeking compensation for violations. These laws exist to level the playing field between consumers and large corporations.
                        </p>
                    </div>
                )}

                {variant === "evidence" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {(content as EvidenceContent).items.map((item, index) => {
                            const Icon = iconMap[item.icon]
                            return (
                                <div key={index} className="flex flex-col items-center gap-1.5 text-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Icon className="w-4.5 h-4.5 text-blue-600" />
                                    </div>
                                    <span className="text-xs text-gray-700 leading-tight">{item.label}</span>
                                </div>
                            )
                        })}
                    </div>
                )}

                {variant === "why-us" && (
                    <ul className="space-y-2">
                        {(content as WhyUsContent).items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-[15px] text-gray-700 leading-relaxed">
                                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {variant === "geo" && (
                    <div className="text-[15px] text-gray-700 leading-relaxed space-y-2">
                        <p>{(content as GeoContent).text}</p>
                        <p className="text-sm text-gray-600">
                            Our team is available by phone and video consultation, making it easy to get legal help from anywhere in Florida without needing to visit an office in person.
                        </p>
                    </div>
                )}

                {variant === "policy" && (
                    <div className="text-[15px] text-gray-700 leading-relaxed space-y-2">
                        <p>{(content as PolicyContent).text}</p>
                        <p className="text-sm text-gray-600">
                            These protections ensure that consumers have legal recourse when companies engage in unfair practices, helping to maintain trust in the marketplace and protect individual rights.
                        </p>
                    </div>
                )}
            </Card>
        </motion.div>
    )
}
