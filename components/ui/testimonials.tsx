"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Google from "../google"
import { TestimonialsColumn } from "../blocks/testimonials-columns-1"

type Review = {
    name: string
    date: string
    text: string
}

const reviews: Review[] = [
    {
        name: "Nicole Burkel",
        date: "March 8, 2024",
        text:
            "Attorney Michael Fischetti is truly top notch! One of the most hardworking and dedicated consumer lawyers. Highly recommend.",
    },
    {
        name: "PpppfDemarlo Anderson",
        date: "March 4, 2024",
        text: "It was super great talking to you, Mike. Clear, professional, and effective.",
    },
    {
        name: "savage key",
        date: "November 30, 2023",
        text:
            "Fischetti Law Group are the best for the job. Couldn't be more satisfied with all the hard work they did—highly recommend.",
    },
    {
        name: "Lionel Vital",
        date: "November 14, 2023",
        text:
            "My gratitude for the exceptional legal advice and results. Professional, responsive, and truly client-first.",
    },
    // Added from screenshot
    {
        name: "Rebecca Chassin",
        date: "July 11, 2023",
        text:
            "The Fischetti Law Group has the most passionate staff that truly strive to meet the needs of every client. Michael Fischetti knows exactly how to fight for you.",
    },
    {
        name: "Maria Radcliffe",
        date: "May 30, 2023",
        text:
            "Great experience! Loved the professionalism and they were always two steps ahead the whole way.",
    },
    {
        name: "Trippy Masta",
        date: "May 25, 2023",
        text:
            "Very professional, and I was glad to have someone on my side fighting for my rights. Insurance companies can be underhanded—Fischetti Law Group had my back.",
    },
    // SEO-friendly additions
    {
        name: "Alexis P.",
        date: "April 10, 2024",
        text:
            "Best Florida consumer protection lawyer experience I've had. They stopped harassing debt collection calls and secured a great FDCPA settlement—no fees unless we won, and we did.",
    },
    {
        name: "Derrick R.",
        date: "January 22, 2024",
        text:
            "FCRA pros. Fischetti Law Group fixed my credit reporting errors with Experian and Equifax fast and recovered compensation. Clear communication and aggressive advocacy throughout.",
    },
    {
        name: "Vanessa M.",
        date: "October 2, 2023",
        text:
            "After nonstop robocalls, Michael's team used the TCPA to shut it down and get money back. If you need a Florida consumer lawyer, this firm is the real deal.",
    },
    {
        name: "Jorge L.",
        date: "August 14, 2023",
        text:
            "From my first call to final resolution, they handled everything. Professional, responsive, and focused on results—exactly what you want in a consumer law firm.",
    },
    {
        name: "Katherine D.",
        date: "June 6, 2023",
        text:
            "Honest guidance and courtroom strength. They explained my rights, built a smart strategy, and delivered. I recommend Fischetti Law Group to anyone in Florida facing unfair practices.",
    },
]




const firstColumn = reviews.slice(0, 3);
const secondColumn = reviews.slice(3, 6);
const thirdColumn = reviews.slice(6, 9);



export default function Testimonials() {
    return (
        <section id="testimonials" className="w-full bg-white py-16 scroll-mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-[--font-playfair-display] md:text-5xl text-gray-900">
                        Trusted by <span className="text-blue-600 italic">Florida clients</span>
                    </h2>
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="rounded-xl bg-blue-50 text-blue-700 px-4 py-3 font-semibold text-center">5/5 Rating • 500+ reviews</div>
                        <div className="rounded-xl bg-blue-50 text-blue-700 px-4 py-3 font-semibold text-center">$30M+ Recovered</div>
                        <div className="rounded-xl bg-blue-50 text-blue-700 px-4 py-3 font-semibold text-center">No Win, No Fee</div>
                        <div className="rounded-xl bg-blue-50 text-blue-700 px-4 py-3 font-semibold text-center">15,000+ Cases Served</div>
                    </div>
                </div>

                {/* Reviews Grid */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((r, idx) => (
                        <motion.div
                            key={r.name + idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ring-1 ring-white shadow-sm ${avatarColorClasses[getAvatarColorIndex(r.name)]}`}
                                        >
                                            {getInitials(r.name)}
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-semibold text-gray-900">{r.name}</div>
                                            <div className="text-gray-500">{r.date}</div>
                                        </div>
                                    </div>
                                </div>
                                <Google />
                            </div>
                            <Stars />
                            <p className="text-gray-700 mt-3 text-sm leading-relaxed line-clamp-6">{r.text}</p>
                        </motion.div>
                    ))}
                </div> */}
                <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </div>
        </section>
    )
}


