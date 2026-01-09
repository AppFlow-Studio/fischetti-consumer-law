"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, FileText, MessageSquare, Phone, Mail, FileCheck, Shield, AlertCircle, Check, ArrowRight } from "lucide-react"
import FreeCaseReviewDialog from "@/components/free-case-review-dialog"
import { Button } from "@/components/ui/button"

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
          eyebrow?: string
          lawName?: string
          cityName?: string
      }
    | {
          variant: "audience"
          title: string
          content: AudienceContent
          eyebrow?: string
          lawName?: string
          cityName?: string
      }
    | {
          variant: "violations"
          title: string
          content: ViolationsContent
          eyebrow?: string
          lawName?: string
          cityName?: string
      }
    | {
          variant: "compensation"
          title: string
          content: CompensationContent
          eyebrow?: string
          lawName?: string
          cityName?: string
      }
    | {
          variant: "overview"
          title: string
          content: OverviewContent
          eyebrow?: string
          lawName?: string
          cityName?: string
      }
    | {
          variant: "evidence"
          title: string
          content: EvidenceContent
          eyebrow?: string
          lawName?: string
          cityName?: string
      }
    | {
          variant: "why-us"
          title: string
          content: WhyUsContent
          eyebrow?: string
          lawName?: string
          cityName?: string
      }
    | {
          variant: "geo"
          title: string
          content: GeoContent
          eyebrow?: string
          lawName?: string
          cityName?: string
      }
    | {
          variant: "policy"
          title: string
          content: PolicyContent
          eyebrow?: string
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

// Get eyebrow text based on variant
const getDefaultEyebrow = (variant: string): string => {
    switch (variant) {
        case "qualification":
            return "CASE EVALUATION"
        case "audience":
            return "WHO WE HELP"
        case "violations":
            return "COMMON VIOLATIONS"
        case "compensation":
            return "YOUR RECOVERY"
        case "overview":
            return "UNDERSTANDING YOUR RIGHTS"
        case "evidence":
            return "DOCUMENTATION"
        case "why-us":
            return "OUR DIFFERENCE"
        case "geo":
            return "SERVING FLORIDA"
        case "policy":
            return "CONSUMER PROTECTION"
        default:
            return "LEGAL INSIGHT"
    }
}

export default function SeoInsightBlock(props: SeoInsightBlockProps) {
    const { variant, title, content } = props
    const eyebrow = props.eyebrow || getDefaultEyebrow(variant)
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
    const totalItems = variant === "qualification" ? (content as QualificationContent).items.length : 0
    const checkedCount = checkedItems.size

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full group"
        >
            {/* Premium Card with Left Accent Border */}
            <div className="relative bg-white rounded-2xl shadow-lg ring-1 ring-gray-200/80 overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                {/* Left Accent Border - Gradient Strip */}
                <div 
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700"
                    style={{
                        boxShadow: "2px 0 8px rgba(59, 130, 246, 0.15)"
                    }}
                />
                
                {/* Content Container */}
                <div className="pl-6 pr-5 py-5 md:pl-7 md:pr-6 md:py-6">
                    {/* Header */}
                    <div className="mb-4">
                        {/* Eyebrow Label */}
                        <motion.span 
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="inline-block text-[11px] font-semibold tracking-[0.15em] text-blue-600 uppercase mb-2"
                        >
                            {eyebrow}
                        </motion.span>
                        
                        {/* Title with Playfair Display */}
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 leading-tight">
                            {title}
                        </h2>
                    </div>

                    {/* QUALIFICATION VARIANT - Interactive Checklist */}
                    {variant === "qualification" && (
                        <div className="space-y-4">
                            <ul className="space-y-1">
                                {(content as QualificationContent).items.map((item, index) => {
                                    const isChecked = checkedItems.has(index)
                                    return (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -8 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                                            className={`
                                                flex items-center gap-3 text-[15px] cursor-pointer rounded-xl p-3 -mx-2 
                                                transition-all duration-200 select-none
                                                ${isChecked 
                                                    ? "bg-blue-50/80 text-gray-900" 
                                                    : "hover:bg-gray-50 text-gray-700"
                                                }
                                            `}
                                            onClick={() => handleCheckboxChange(index)}
                                        >
                                            {/* Custom Checkbox */}
                                            <div className={`
                                                relative shrink-0 w-6 h-6 rounded-lg border-2 
                                                flex items-center justify-center transition-all duration-200
                                                ${isChecked 
                                                    ? "bg-blue-600 border-blue-600 shadow-sm shadow-blue-600/30" 
                                                    : "border-gray-300 bg-white hover:border-blue-400"
                                                }
                                            `}>
                                                <AnimatePresence>
                                                    {isChecked && (
                                                        <motion.div
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            exit={{ scale: 0, opacity: 0 }}
                                                            transition={{ 
                                                                type: "spring", 
                                                                stiffness: 500, 
                                                                damping: 30 
                                                            }}
                                                        >
                                                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            
                                            <span className="flex-1 leading-relaxed">{item}</span>
                                        </motion.li>
                                    )
                                })}
                            </ul>

                            {/* Progress Indicator */}
                            <AnimatePresence>
                                {hasCheckedItems && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        {/* <div className="flex items-center gap-3 mb-4">
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(checkedCount / totalItems) * 100}%` }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-gray-600 tabular-nums">
                                                {checkedCount}/{totalItems}
                                            </span>
                                        </div> */}
                                        
                                        {/* CTA Button */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                        >
                                            <FreeCaseReviewDialog>
                                                <Button 
                                                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 group/btn"
                                                >
                                                    <span>Request Free Case Review</span>
                                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
                                                </Button>
                                            </FreeCaseReviewDialog>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* AUDIENCE VARIANT - Two Column Grid */}
                    {variant === "audience" && (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 gap-3"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                            }}
                        >
                            {(content as AudienceContent).items.map((item, index) => (
                                <motion.div 
                                    key={index} 
                                    variants={{
                                        hidden: { opacity: 0, x: -8 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-2"
                                >
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-[15px] text-gray-700 leading-relaxed">{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* VIOLATIONS VARIANT - Styled List */}
                    {variant === "violations" && (
                        <ul className="space-y-3">
                            {(content as ViolationsContent).items.map((item, index) => (
                                <motion.li 
                                    key={index} 
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="p-4 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors border border-gray-100"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                                        <div>
                                            <span className="font-semibold text-gray-900 text-[15px]">{item.title}</span>
                                            <p className="text-gray-600 text-[14px] leading-relaxed mt-1">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    )}

                    {/* COMPENSATION VARIANT - Check List */}
                    {variant === "compensation" && (
                        <motion.ul 
                            className="space-y-2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                            }}
                        >
                            {(content as CompensationContent).items.map((item, index) => (
                                <motion.li 
                                    key={index} 
                                    variants={{
                                        hidden: { opacity: 0, x: -8 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-2"
                                >
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <span className="text-[15px] text-gray-700 leading-relaxed">{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}

                    {/* OVERVIEW VARIANT - Pull Quote Style */}
                    {variant === "overview" && (
                        <div className="space-y-4">
                            <div className="relative pl-4 border-l-2 border-blue-200">
                                <p className="text-[15px] text-gray-700 leading-relaxed italic">
                                    {(content as OverviewContent).text}
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Understanding your rights under consumer protection laws is the first step toward seeking compensation for violations. These laws exist to level the playing field between consumers and large corporations.
                            </p>
                        </div>
                    )}

                    {/* EVIDENCE VARIANT - Icon Grid */}
                    {variant === "evidence" && (
                        <motion.div 
                            className="grid grid-cols-2 md:grid-cols-3 gap-3"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
                            }}
                        >
                            {(content as EvidenceContent).items.map((item, index) => {
                                const Icon = iconMap[item.icon]
                                return (
                                    <motion.div 
                                        key={index} 
                                        variants={{
                                            hidden: { opacity: 0, y: 8, scale: 0.95 },
                                            visible: { opacity: 1, y: 0, scale: 1 }
                                        }}
                                        whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                        className="flex flex-col items-center gap-2 text-center p-4 rounded-xl bg-gray-50/50 hover:bg-blue-50/50 border border-gray-100 hover:border-blue-100 transition-all cursor-default"
                                    >
                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-xs font-medium text-gray-700 leading-tight">{item.label}</span>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    )}

                    {/* WHY-US VARIANT - Check List */}
                    {variant === "why-us" && (
                        <motion.ul 
                            className="space-y-2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                            }}
                        >
                            {(content as WhyUsContent).items.map((item, index) => (
                                <motion.li 
                                    key={index} 
                                    variants={{
                                        hidden: { opacity: 0, x: -8 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-2"
                                >
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-[15px] text-gray-700 leading-relaxed">{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}

                    {/* GEO VARIANT - Pull Quote Style */}
                    {variant === "geo" && (
                        <div className="space-y-4">
                            <div className="relative pl-4 border-l-2 border-blue-200">
                                <p className="text-[15px] text-gray-700 leading-relaxed italic">
                                    {(content as GeoContent).text}
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Our team is available by phone and video consultation, making it easy to get legal help from anywhere in Florida without needing to visit an office in person.
                            </p>
                        </div>
                    )}

                    {/* POLICY VARIANT - Pull Quote Style */}
                    {variant === "policy" && (
                        <div className="space-y-4">
                            <div className="relative pl-4 border-l-2 border-blue-200">
                                <p className="text-[15px] text-gray-700 leading-relaxed italic">
                                    {(content as PolicyContent).text}
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                These protections ensure that consumers have legal recourse when companies engage in unfair practices, helping to maintain trust in the marketplace and protect individual rights.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
