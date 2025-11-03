"use client"

import { Card } from "@/components/ui/card"
import { Clock, Globe, Phone, MessageSquare, Award, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

type Reason = {
    id: string
    title: string
    description: string
    icon: any
}

const reasons: Reason[] = [
    {
        id: "247",
        title: "Available 24/7",
        description:
            "Fischetti Law Group in Boynton Beach, FL, offers round‑the‑clock availability for clients, ensuring immediate assistance and support in personal injury and consumer law cases. Trust our unwavering commitment for your legal needs.",
        icon: Clock,
    },
    {
        id: "multi",
        title: "Multilingual Staff",
        description:
            "Rely on our diverse team across Palm Beach and Broward County for seamless communication and tailored support in multiple languages, addressing all client needs effectively.",
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
    return (
        <section className="w-full py-20 bg-white scroll-mt-8 flex flex-col items-center justify-center " id="about">
            <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-[--font-playfair-display] md:text-5xl text-gray-900">
                        Why <span className="text-blue-600 italic">Fischetti Law Group</span>
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
                        You'll get the best possible representation with Fischetti Law Group.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {reasons.map((r, i) => {
                        const Icon = r.icon
                        return (
                            <motion.div
                                key={r.id}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
                                className="hover:-translate-y-4 transition-all  duration-300"
                            >
                                <Card className="h-full w-fit rounded-2xl  bg-white/95 p-6 shadow-sm ring-1 ring-gray-200/70 backdrop-blur-sm transition hover:shadow-md">
                                    <div className="flex items-start gap-3">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full">
                                            <Icon className="h-5 w-5 text-blue-600" />
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{r.title}</h3>
                                            <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{r.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}


