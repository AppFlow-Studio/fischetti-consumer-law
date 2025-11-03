"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProfileCardProps {
    className?: string
    headline?: string
    name?: string
    title?: string
    description?: string
    imageUrl?: string
    imageAlt?: string
    affiliations?: Array<{
        name: string
        logo?: string
        logoAlt?: string
    }>
    primaryButtonText?: string
    primaryButtonHref?: string
    secondaryButtonText?: string
    secondaryButtonHref?: string
    accentColor?: string
}

export default function ProfileCard({
    className,
    headline = "A WINNING CONSUMER LAWYER",
    name = "Meet Attorney",
    title = "Consumer Law Expert",
    description = "With over 10 years of experience fighting for consumer rights, our lead attorney specializes in FCRA, FDCPA, TCPA violations and data privacy breaches. Personal experience drives our passion for protecting consumers from unfair business practices.",
    imageUrl = "/placeholder-lawyer.jpg",
    imageAlt = "Professional headshot",
    affiliations = [
        { name: "The Florida Bar" },
        { name: "American Bar Association" },
        { name: "Consumer Law Association" }
    ],
    primaryButtonText = "Book a consultation",
    primaryButtonHref = "#consultation",
    secondaryButtonText = "View Profile",
    secondaryButtonHref = "#profile",
    accentColor = "blue"
}: ProfileCardProps) {
    const accentClasses = {
        pink: "text-pink-600 bg-pink-50 hover:bg-pink-100",
        blue: "text-blue-600 bg-blue-50 hover:bg-blue-100",
        green: "text-green-600 bg-green-50 hover:bg-green-100",
        purple: "text-purple-600 bg-purple-50 hover:bg-purple-100"
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "w-full max-w-[95%] xl:max-w-[1400px] mx-auto bg-white rounded-2xl shadow-lg overflow-hidden",
                className
            )}
        >
            <div className="flex flex-col xl:flex-row w-full min-w-0">
                {/* Right Section - Image (shows first on mobile, second on desktop) */}
                <motion.div
                    className="w-full xl:w-1/2 xl:min-w-[400px] relative order-1 xl:order-2 shrink-0"
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 rounded-t-2xl xl:rounded-t-none xl:rounded-r-2xl" />

                    {/* Image container - square on mobile, full height on desktop */}
                    <div className="relative w-full aspect-square xl:absolute xl:inset-4 xl:rounded-xl xl:bg-gray-300 xl:flex xl:items-center xl:justify-center xl:shadow-inner xl:overflow-hidden xl:aspect-auto xl:h-[calc(100%-2rem)]">
                        {imageUrl && imageUrl !== "/placeholder-lawyer.jpg" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 1.1 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={imageUrl}
                                    alt={imageAlt}
                                    fill
                                    className="object-cover rounded-t-2xl xl:rounded-xl"
                                />
                            </motion.div>
                        ) : (
                            <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-gray-400 rounded-full mb-2 flex items-center justify-center">
                                    <span className="text-2xl">👨‍💼</span>
                                </div>
                                <p className="text-sm">Professional Photo</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Left Section - Content (shows second on mobile, first on desktop) */}
                <motion.div
                    className="flex-1 p-6 sm:p-8 flex flex-col justify-between order-2 xl:order-1 min-w-0 w-full"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        className="space-y-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.12,
                                    delayChildren: 0.3,
                                },
                            },
                        }}
                    >
                        {/* Headline */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                },
                            }}
                            className={cn(
                                "text-xs font-bold uppercase tracking-wider",
                                accentClasses[accentColor as keyof typeof accentClasses]?.split(' ')[0] || "text-pink-600"
                            )}
                        >
                            {headline}
                        </motion.div>

                        {/* Name */}
                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, x: -20, y: 10 },
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                                },
                            }}
                            className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                        >
                            {name}
                        </motion.h2>

                        {/* Stats */}
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 15 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                },
                            }}
                            className="text-sm font-medium text-gray-600"
                        >
                            ✓ 15,000+ cases handled
                            ✓ $30M+ recovered for clients
                            ✓ 20 years of trial experience
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 15 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                },
                            }}
                            className="text-gray-700 text-lg leading-relaxed"
                        >
                            {description}
                        </motion.p>

                        {/* Affiliations */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.5,
                                    },
                                },
                            }}
                            className="flex flex-wrap items-center gap-12"
                        >
                            {affiliations.map((affiliation, index) => (
                                <motion.div
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8, y: 10 },
                                        visible: {
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                            transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
                                        },
                                    }}
                                    className="flex items-center gap-2"
                                >
                                    {affiliation.logo ? (
                                        <>
                                            <Image
                                                src={affiliation.logo}
                                                alt={affiliation.logoAlt || affiliation.name}
                                                width={index === 0 ? 110 : index === 1 ? 210 : 100}
                                                height={120}
                                                className="rounded-full grayscale aspect-auto object-cove sm sm:block hidden"
                                            />
                                            <Image
                                                src={affiliation.logo}
                                                alt={affiliation.logoAlt || affiliation.name}
                                                width={index === 0 ? 90 : index === 1 ? 120 : 90}
                                                height={120}
                                                className="rounded-full grayscale aspect-auto object-cover sm:hidden block"
                                            />
                                        </>
                                    ) : (
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-bold text-gray-600">
                                                {affiliation.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    {/* <span className="text-sm font-medium text-gray-600">
                                        {affiliation.name}
                                    </span> */}
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row gap-4 mt-8"
                    >
                        <Button
                            asChild
                            className={cn(
                                "rounded-xl px-8 py-3 text-base font-semibold transition-all duration-200 hover:scale-105",
                                accentClasses[accentColor as keyof typeof accentClasses]
                            )}
                        >
                            <a href={primaryButtonHref}>
                                {primaryButtonText}
                            </a>
                        </Button>

                        {/* <Button
                            asChild
                            variant="ghost"
                            className={cn(
                                "rounded-xl px-8 py-3 text-base font-semibold transition-all duration-200 hover:scale-105",
                                accentClasses[accentColor as keyof typeof accentClasses]?.split(' ')[0] || "text-pink-600"
                            )}
                        >
                            <a href={secondaryButtonHref}>
                                {secondaryButtonText} →
                            </a>
                        </Button> */}
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
}
