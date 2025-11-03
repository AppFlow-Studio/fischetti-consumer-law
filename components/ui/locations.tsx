"use client"

import { Card } from "@/components/ui/card"
import { MapPin, Phone, Clock } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import OfficeLocationsMap from "@/components/clinicsmap"
import { officeLocations } from "@/data/office-locations"

const locationPins = [
    {
        id: "orlando",
        position: "top-6 left-6",
        pinOrder: "after",
        label: "Orlando Office",
        address1: "111 N Orange Ave Suite 800",
        address2: "Orlando, FL 32801",
    },
    {
        id: "boynton",
        position: "top-1/3 -translate-y-1/3 right-8",
        pinOrder: "before",
        label: "Boynton Beach (Main)",
        address1: "7593 Boynton Beach Blvd #110",
        address2: "Boynton Beach, FL 33437",
    },
    {
        id: "port-st-lucie",
        position: "top-1/3 -translate-y-1/3 left-1/4 -translate-x-1/4",
        pinOrder: "before",
        label: "Port St. Lucie",
        address1: "130 S Indian River Dr Ste 202",
        address2: "Fort Pierce, FL 34950",
    },
]

export default function LocationsSection() {
    return (
        <motion.section
            className="w-full py-16 scroll-mt-8"
            id="locations"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="text-4xl font-[--font-playfair-display] md:text-5xl text-gray-900">
                        Our <span className="text-blue-600 italic">Florida</span> Offices
                    </h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                        Visit one of our conveniently located offices. Same-day consultations available. Virtual consults upon request.
                    </p>
                </motion.div>

                <motion.div
                    className="border border-gray-100 w-full rounded-xl shadow-2xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* XL and above: show map + details layout */}
                    <div className="hidden xl:grid grid-cols-1 gap-8 items-stretch">
                        {/* Map - Left Focus */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Card className="relative rounded-xl border border-gray-100 overflow-hidden shadow-lg min-h-[360px] lg:min-h-[500px]">
                                <Image src="/floridaeverglades2.png" alt="Map" fill draggable={false} className="w-full h-full object-cover" />

                                {/* Pins overlay */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {locationPins.map((location, index) => (
                                        <motion.div
                                            key={location.id}
                                            className={`absolute ${location.position} flex flex-col items-center gap-3 pointer-events-auto ${location.pinOrder === "before" ? "flex-col" : "flex-col-reverse"
                                                }`}
                                            initial={{ opacity: 0, scale: 0, y: location.pinOrder === "before" ? -20 : 20 }}
                                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.6 + index * 0.15,
                                                ease: [0.34, 1.56, 0.64, 1],
                                            }}
                                        >
                                            <motion.div
                                                className="flex flex-col p-4 text-white lg:rounded-[12px] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[background-color,border-color,box-shadow,backdrop-filter] lg:border border-white/20 bg-linear-to-r from-[rgba(249,250,247,0.12)] to-[rgba(249,250,247,0.18)] backdrop-blur-[12px] lg:shadow-[0_2px_6px_0_rgba(0,0,0,0.15)]"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: 0.8 + index * 0.15 }}
                                            >
                                                <span className="text-sm font-semibold">{location.label}</span>
                                                <span>{location.address1}</span>
                                                <span>{location.address2}</span>
                                                <span className="inline-flex items-center gap-1 text-gray-200">
                                                    <Clock className="h-3.5 w-3.5" /> 24 Hours
                                                </span>
                                            </motion.div>
                                            <motion.span
                                                className="relative inline-flex"
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 0.4,
                                                    delay: 0.7 + index * 0.15,
                                                    ease: [0.34, 1.56, 0.64, 1],
                                                }}
                                            >
                                                <span className="absolute inline-flex h-8 w-8 rounded-full bg-blue-400 opacity-75 animate-ping" />
                                                <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                                                    <MapPin className="h-5 w-5" />
                                                </span>
                                            </motion.span>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                        {/* <OfficeLocationsMap /> */}

                        {/* Text-Oriented Details - Right */}
                        <motion.div
                            className="flex justify-center items-baseline w-full"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.12,
                                        delayChildren: 0.8,
                                    },
                                },
                            }}
                        >
                            <div className="lg:w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:divide-x lg:divide-gray-200">
                                {officeLocations.map((location) => (
                                    <motion.div
                                        key={location.name}
                                        className="space-y-2 lg:px-6"
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: {
                                                opacity: 1,
                                                x: 0,
                                                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                            },
                                        }}
                                    >
                                        <h3 className="text-2xl font-semibold text-gray-900">
                                            {location.name}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">{location.address}</p>
                                        <div className="flex flex-wrap items-center gap-4 text-gray-700 text-sm">
                                            <span className="inline-flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                {location.phone}
                                            </span>
                                            <span className="inline-flex items-center gap-2">
                                                <Clock className="w-4 h-4" />{location.hours}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Below XL: show only cards grid */}
                    <div className="block xl:hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {officeLocations.map((loc, idx) => (
                                <Card
                                    key={loc.name}
                                    className={`rounded-2xl bg-gray-50 border border-gray-100 shadow-md p-6 ${idx === officeLocations.length - 1 ? "md:col-span-2 lg:col-span-1" : ""}`}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                            <MapPin className="w-5 h-5" />
                                        </span>
                                        <h3 className="text-xl font-semibold text-gray-900">{loc.name}</h3>
                                    </div>
                                    <div className="space-y-4 text-gray-700">
                                        <div>
                                            <div className="text-sm font-medium text-gray-500 mb-1 inline-flex items-center gap-2"><Phone className="w-4 h-4" /> Phone</div>
                                            <div className="text-base">{loc.phone}</div>
                                        </div>
                                        <div className="border-t border-gray-200" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-500 mb-1 inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> Address</div>
                                            <div className="text-base leading-relaxed">{loc.address}</div>
                                        </div>
                                        <div className="border-t border-gray-200" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-500 mb-1 inline-flex items-center gap-2"><Clock className="w-4 h-4" /> Working /h</div>
                                            <div className="text-base">{loc.hours}</div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* <OfficeLocationsMap /> */}
        </motion.section>
    )
}


