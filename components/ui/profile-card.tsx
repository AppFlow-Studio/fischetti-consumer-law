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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(
                "w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden",
                className
            )}
        >
            <div className="flex flex-col lg:flex-row">
                {/* Left Section - Content */}
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between">
                    <div className="space-y-2">
                        {/* Headline */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className={cn(
                                "text-xs font-bold uppercase tracking-wider",
                                accentClasses[accentColor as keyof typeof accentClasses]?.split(' ')[0] || "text-pink-600"
                            )}
                        >
                            {headline}
                        </motion.div>

                        {/* Name */}
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                        >
                            {name}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-700 text-lg leading-relaxed max-w-2xl"
                        >
                            <p className="text-sm font-medium text-gray-600">
                                ✓ 10,000+ cases handled
                                ✓ $30M+ recovered for clients
                                ✓ 20 years of trial experience
                            </p> <br />
                            {description}
                        </motion.p>

                        {/* Affiliations */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap items-center gap-12"
                        >
                            {affiliations.map((affiliation, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    {affiliation.logo ? (
                                        <Image
                                            src={affiliation.logo}
                                            alt={affiliation.logoAlt || affiliation.name}
                                            width={index === 0 ? 110 : index === 1 ? 210 : 100}
                                            height={120}
                                            className="rounded-full grayscale aspect-auto object-cover"
                                        />
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
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
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

                        <Button
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
                        </Button>
                    </motion.div>
                </div>

                {/* Right Section - Image */}
                <div className="lg:w-96 lg:h-auto h-64 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="relative w-full h-full"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-l-2xl lg:rounded-l-none lg:rounded-r-2xl" />

                        {/* Placeholder for image */}
                        <div className="absolute inset-4 rounded-xl bg-gray-300 flex items-center justify-center shadow-inner">
                            {imageUrl && imageUrl !== "/placeholder-lawyer.jpg" ? (
                                <Image
                                    src={imageUrl}
                                    alt={imageAlt}
                                    fill
                                    className="object-cover rounded-xl"
                                />
                            ) : (
                                <div className="text-center text-gray-500">
                                    <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                                        <span className="text-2xl">👨‍💼</span>
                                    </div>
                                    <p className="text-sm">Professional Photo</p>
                                </div>
                            )}
                        </div>

                        {/* Decorative elements */}
                        {/* <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full shadow-sm" />
                        <div className="absolute bottom-4 left-4 w-2 h-2 bg-white rounded-full shadow-sm" /> */}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
