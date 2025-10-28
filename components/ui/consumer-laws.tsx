"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
    FileText,
    Shield,
    Gavel,
    AlertTriangle,
    Package,
    Lock,
    CreditCard,
    Car,
    Search,
    CheckCircle,
    FileStack,
    Rocket,
    User,
    Bell,
} from "lucide-react"
import Image from "next/image"

const practiceAreas = [
    {
        icon: CreditCard,
        label: "FCRA ",
        id: "fcra",
        description: "Credit report and background check errors, denials, mixed files, and stubborn bureaus. When Experian, Equifax, or TransUnion mess up your life, we fight back with FCRA violations."
    },
    {
        icon: Gavel,
        label: "FDCPA",
        id: "fdcpa",
        description: "Harassing calls, false threats, and lawsuits from debt buyers like Midland, Portfolio, or LVNV. We defend against aggressive collection practices and garnishment attempts."
    },
    {
        icon: Bell,
        label: "TCPA ",
        id: "tcpa",
        description: "Robocalls and spam texts without consent, telemarketing violations. We help consumers stop unwanted calls and texts while seeking compensation for TCPA violations."
    },
    {
        icon: Lock,
        label: "Privacy & Data Breach",
        id: "privacy",
        description: "PII leaks, hacked vendors, sloppy security, and improper data sharing. We hold companies accountable for privacy violations and data breach negligence."
    },
    {
        icon: FileText,
        label: "VPPA — Video Privacy Protection Act",
        id: "vppa",
        description: "Apps and publishers leaking viewing history to ad platforms. We protect your video privacy rights when companies improperly share your viewing data."
    },
    {
        icon: Shield,
        label: "FHA — Fair Housing Act",
        id: "fha",
        description: "Housing discrimination claims and violations. We fight for fair housing rights and hold landlords, property managers, and housing providers accountable."
    },
    {
        icon: AlertTriangle,
        label: "Mass Arbitration",
        id: "arbitration",
        description: "When platforms force arbitration through TOS and you bring hundreds of claims at once. We handle complex mass arbitration strategies for consumer protection."
    },
]

const timelineSteps = [
    {
        id: 1,
        title: "Case Evaluation",
        description: "Comprehensive review of your legal matter",
        tooltipDescription: "We thoroughly analyze your case, review all documentation, assess legal merits, and provide you with a clear strategy and timeline for resolution.",
        icon: Search,
        time: "24 hours",
        color: "from-blue-900 to-blue-600",
    },
    {
        id: 2,
        title: "Documentation",
        description: "Preparation of all legal documents and filings",
        tooltipDescription: "Our legal team prepares all necessary court filings, demand letters, discovery requests, and other documentation required for your case.",
        icon: FileStack,
        time: "2-3 days",
        color: "from-slate-600 to-amber-600",
    },
    {
        id: 3,
        title: "Legal Representation",
        description: "Expert advocacy on your behalf",
        tooltipDescription: "We provide aggressive legal representation in negotiations, mediation, arbitration, or court proceedings to achieve the best possible outcome for you.",
        icon: Rocket,
        time: "Ongoing",
        color: "from-blue-600 to-indigo-600",
    },
    {
        id: 4,
        title: "Case Resolution",
        description: "Successful outcome notification",
        tooltipDescription: "We notify you of the final resolution, whether through settlement, judgment, or other means, and ensure all terms are properly executed.",
        icon: Bell,
        time: "Final",
        color: "from-emerald-600 to-teal-600",
    },
]

function CountUpNumber({ value, duration = 2 }: { value: number; duration?: number }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (!isInView) return

        let startTime: number
        let animationFrame: number

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

            setCount(Math.floor(progress * value))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [isInView, value, duration])

    return <span ref={ref}>{count}</span>
}

function TimelineSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.3 })
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (!isInView) return

        const timer = setTimeout(() => {
            setProgress(100)
        }, 500)

        return () => clearTimeout(timer)
    }, [isInView])

    return (
        <div ref={containerRef} className="w-full bg-slate-50 dark:bg-slate-900/50 border-t">
            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">Our Process</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        A systematic approach to achieving your legal objectives
                    </p>
                </motion.div>

                {/* Progress Bar */}
                <div className="relative mb-16 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-blue-900 via-blue-600 to-teal-600 rounded-full"
                        initial={{ width: "0%" }}
                        animate={isInView ? { width: `${progress}%` } : { width: "0%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                </div>

                {/* Timeline Steps */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (desktop only) */}
                    <div
                        className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-slate-300 dark:bg-slate-700"
                        style={{ zIndex: 0 }}
                    />

                    {timelineSteps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.3,
                                type: "spring",
                                bounce: 0.4,
                            }}
                            className="relative flex flex-col items-center"
                        >
                            {/* Icon Circle */}
                            <motion.div
                                className={`relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br ${step.color} shadow-xl mb-4`}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="cursor-help">
                                            <step.icon className="h-14 w-14 text-white" strokeWidth={2} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-sm p-4 bg-background text-foreground">
                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-sm">{step.title}</h4>
                                            <p className="text-xs text-foreground">{step.tooltipDescription}</p>
                                            <div className="text-xs font-medium text-primary">
                                                Estimated time: {step.time}
                                            </div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>

                                {/* Checkmark Animation */}
                                {index < 2 && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                                        transition={{ delay: index * 0.3 + 0.8, duration: 0.4 }}
                                        className="absolute -top-2 -right-2 bg-emerald-600 rounded-full p-1"
                                    >
                                        <CheckCircle className="h-6 w-6 text-white" fill="currentColor" />
                                    </motion.div>
                                )}

                                {/* Floating Animation for "You Relax" step */}
                                {index === 2 && (
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                        className="absolute -bottom-3 -right-3 bg-white rounded-full p-1"
                                    >
                                        <User className="h-7 w-7 text-indigo-600" />
                                    </motion.div>
                                )}

                                {/* Ripple Effect for Bell */}
                                {index === 3 && (
                                    <>
                                        <motion.div
                                            className="absolute inset-0 rounded-full bg-teal-500"
                                            initial={{ scale: 1, opacity: 0.3 }}
                                            animate={{ scale: 1.4, opacity: 0 }}
                                            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
                                        />
                                    </>
                                )}
                            </motion.div>

                            {/* Step Number with Count Up */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : { scale: 0 }}
                                transition={{ delay: index * 0.3 + 0.4, type: "spring", bounce: 0.6 }}
                                className="text-4xl font-bold text-blue-900 dark:text-blue-400 mb-2"
                            >
                                <CountUpNumber value={step.id} duration={0.5} />
                            </motion.div>

                            {/* Title */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <h3 className="text-xl font-semibold mb-2 text-center text-slate-900 dark:text-slate-100 cursor-help">
                                        {step.title}
                                    </h3>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-sm p-3">
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-sm">{step.title}</h4>
                                        <p className="text-xs text-muted-foreground">{step.tooltipDescription}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>

                            {/* Description */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-3 cursor-help">{step.description}</p>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="max-w-sm p-3">
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-sm">{step.title}</h4>
                                        <p className="text-xs text-muted-foreground">{step.tooltipDescription}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>

                            {/* Time Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ delay: index * 0.3 + 0.6 }}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-900/10 dark:bg-blue-400/10 text-blue-900 dark:text-blue-400 text-xs font-medium border border-blue-900/20 dark:border-blue-400/20"
                            >
                                {step.time}
                            </motion.div>

                            {/* Progress Bar for Each Step */}
                            <motion.div
                                className="mt-4 w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: index * 0.3 + 0.5 }}
                            >
                                <motion.div
                                    className={`h-full bg-gradient-to-r ${step.color}`}
                                    initial={{ width: "0%" }}
                                    animate={isInView ? { width: "100%" } : { width: "0%" }}
                                    transition={{ delay: index * 0.3 + 0.8, duration: 1, ease: "easeOut" }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Signals */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-slate-600 dark:text-slate-400"
                >
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-emerald-600" />
                        <span>Secure & Confidential</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span>Verified Process</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-indigo-600" />
                        <span>Protected Information</span>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default function ConsumerLaws() {
    const containerRef = useRef<HTMLDivElement>(null)
    const centerRef = useRef<HTMLDivElement>(null)
    const area0Ref = useRef<HTMLDivElement>(null)
    const area1Ref = useRef<HTMLDivElement>(null)
    const area2Ref = useRef<HTMLDivElement>(null)
    const area3Ref = useRef<HTMLDivElement>(null)
    const area4Ref = useRef<HTMLDivElement>(null)
    const area5Ref = useRef<HTMLDivElement>(null)
    const area6Ref = useRef<HTMLDivElement>(null)

    const areaRefs = [area0Ref, area1Ref, area2Ref, area3Ref, area4Ref, area5Ref, area6Ref]

    return (
        <div className="">
            {/* Hub and Spoke Section */}
            <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
                <div ref={containerRef} className="relative flex h-[800px] w-full max-w-7xl items-center justify-center">
                    {areaRefs.map((ref, index) => (
                        <AnimatedBeam
                            key={`beam-${index}`}
                            containerRef={containerRef}
                            fromRef={ref}
                            toRef={centerRef}
                            curvature={5}
                            duration={20}
                            reverse={[1,2,3].includes(index) ? true : false}
                            pathColor="oklch(0.35 0.08 240)"
                            pathOpacity={0.2}
                        
                        />
                    ))}

                    <Card
                        ref={centerRef}
                        className="relative z-10 flex h-42 w-42 flex-col items-center justify-center gap-3 bg-white shadow-2xl transition-transform hover:scale-105"
                    >
                        {/* <div className="text-center">
                            <div className="mb-2 text-3xl md:text-4xl font-bold tracking-tight">FL</div>
                            <div className="text-sm md:text-base font-semibold leading-tight">Fishetti Law Firm</div>
                            <div className="mt-1 text-xs opacity-90">Consumer Law Experts</div>
                        </div> */}
                        <Image src="/fischettilogo.png" alt="Fischetti Law Group Logo" width={150} height={150} className="rounded-xl object-cover" />
                    </Card>

                    {practiceAreas.map((area, index) => {
                        const angle = (index * 360) / practiceAreas.length
                        const radius = 320
                        const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius
                        const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius

                        return (
                            <div
                                key={area.id}
                                ref={areaRefs[index]}
                                className="absolute flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110"
                                style={{
                                    left: `calc(50% + ${x}px)`,
                                    top: `calc(50% + ${y}px)`,
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-card shadow-lg border-2 border-border hover:border-primary hover:shadow-xl transition-all cursor-help">
                                                <area.icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-sm">{area.label}</h4>
                                                {/* <p className="text-xs text-muted-foreground">{area.description}</p> */}
                                            </div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-xs p-3 bg-transparent relative text-foreground">
                                        {/* SVG Filter Definition */}
                                        <svg style={{ display: 'none' }}>
                                            <filter id="displacementFilter">
                                                <feTurbulence
                                                    type="turbulence"
                                                    baseFrequency="0.01"
                                                    numOctaves="2"
                                                    result="turbulence"
                                                />
                                                <feDisplacementMap
                                                    in="SourceGraphic"
                                                    in2="turbulence"
                                                    scale="200"
                                                    xChannelSelector="R"
                                                    yChannelSelector="G"
                                                />
                                            </filter>
                                        </svg>

                                        {/* Liquid Glass Background */}
                                        <div
                                            className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
                                            style={{
                                                filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                                                backdropFilter: 'brightness(1.1) blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                            }}
                                        >
                                            <div
                                                className="absolute border inset-0 rounded-3xl"
                                                style={{
                                                    boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-2 relative z-10">
                                            <h4 className="font-semibold text-base">{area.label}</h4>
                                            <p className="text-sm text-foreground">{area.description}</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Timeline Section */}
            {/* <TimelineSection /> */}
        </div>
    )
}
