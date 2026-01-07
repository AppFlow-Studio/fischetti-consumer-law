"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Clock, Globe, Phone, MessageSquare, Award, ShieldCheck, type LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from "@/components/ui/carousel"

type Reason = {
    id: string
    title: string
    description: string
    icon: LucideIcon
}

const reasons: Reason[] = [
    {
        id: "247",
        title: "Available 24/7",
        description:
            "Fischetti Law Group offers round‑the‑clock availability for clients, ensuring immediate assistance and support in consumer law cases. Trust our unwavering commitment for your legal needs.",
        icon: Clock,
    },
    {
        id: "multi",
        title: "Multilingual Staff",
        description:
            "Rely on our diverse team across the state of Florida for seamless communication and tailored support in multiple languages, addressing all client needs effectively.",
        icon: Globe,
    },
    {
        id: "free",
        title: "FREE Consultations",
        description:
            "We ensure risk‑free representation with free consultations and a no‑win, no‑fee policy. Trust us to advocate for you without upfront costs.",
        icon: Phone,
    },
    {
        id: "comms",
        title: "Expert Communication",
        description:
            "We excel in transparent communication, prioritizing clients’ needs by expertly delivering essential tools and resources for every case. Count on our expertise for effective legal representation.",
        icon: MessageSquare,
    },
    {
        id: "experience",
        title: "20 Years of Legal Experience",
        description:
            "With over 20 years of experience, Fischetti Law Group delivers unparalleled legal representation in Palm Beach and Broward County. Trust our track record of winning cases and maximizing client compensation.",
        icon: Award,
    },
    {
        id: "no-fee",
        title: "No Fees Unless We Win",
        description:
            "Fischetti Law Group commits to winning your case with a no‑win, no‑fee promise. We only get paid when you do.",
        icon: ShieldCheck,
    },
]

export default function WhyFischetti() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    useEffect(() => {
        if (!api) {
            return
        }

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    // Reason Card Component
    const ReasonCard = ({ reason, index }: { reason: Reason; index: number }) => {
        const Icon = reason.icon
        return (
            <Card className="h-full w-full rounded-2xl bg-white/95 p-6 shadow-sm ring-1 ring-gray-200/70 backdrop-blur-sm transition hover:shadow-md " >
                <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full">
                        <Icon className="h-5 w-5 text-blue-600" />
                    </span>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{reason.title}</h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{reason.description}</p>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <section className="w-full py-20 bg-white scroll-mt-8 flex flex-col items-center justify-center" id="about">
            <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-[--font-playfair-display] md:text-5xl text-gray-900">
                        Why <span className="text-blue-600 italic">Consumer Law Florida</span>
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
                        You&apos;ll get the best possible representation with Fischetti Law Group.
                    </p>
                </div>

                {/* Single responsive container - carousel on mobile, grid on desktop */}
                {hasMounted ? (
                    <>
                        {/* Mobile Carousel */}
                        <div className="block md:hidden mb-8">
                            <div className="w-full">
                                <Carousel
                                    setApi={setApi}
                                    className="w-full"
                                    opts={{
                                        align: "center",
                                        containScroll: "trimSnaps",
                                    }}
                                >
                                    <CarouselContent>
                                        {reasons.map((reason, index) => (
                                            <CarouselItem key={reason.id} className="basis-full py-2">
                                                <ReasonCard reason={reason} index={index} />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="bg-white/90 backdrop-blur-sm border border-blue-600/20 hover:bg-white hover:shadow-xl transition-all duration-300 absolute sm:left-0 -left-1 top-1/2 -translate-y-1/2" />
                                    <CarouselNext className="bg-white/90 backdrop-blur-sm border border-blue-600/20 hover:bg-white hover:shadow-xl transition-all duration-300 absolute sm:right-0 -right-1 top-1/2 -translate-y-1/2" />
                                </Carousel>

                                {/* Dynamic Progress Indicators */}
                                <div className="flex justify-center mt-6 space-x-2">
                                    {reasons.map((_, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => api?.scrollTo(index)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current
                                                ? "bg-blue-600 w-6"
                                                : "bg-blue-600/30 hover:bg-blue-600/50"
                                                }`}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Desktop Grid */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                    },
                                },
                            }}
                            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {reasons.map((reason, index) => (
                                <motion.div
                                    key={reason.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 12 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
                                    className="hover:-translate-y-4 transition-all duration-300"
                                >
                                    <ReasonCard reason={reason} index={index} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                ) : (
                    // SSR fallback - single grid that works on all screen sizes
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reasons.map((reason, index) => (
                            <ReasonCard key={reason.id} reason={reason} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}


