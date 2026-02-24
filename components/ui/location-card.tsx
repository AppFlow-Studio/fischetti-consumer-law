"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock } from "lucide-react"
import FreeCaseReviewDialog from "@/components/free-case-review-dialog"
import type { Firm } from "@/data/firms"

type LocationCardProps = {
    firm: Firm
}

export default function LocationCard({ firm }: LocationCardProps) {
    const router = useRouter()

    const handleCardClick = () => {
        router.push(`/locations/${firm.slug}`)
    }

    const handleExploreClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        router.push(`/locations/${firm.slug}`)
    }

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={handleCardClick}
        >
            <Card className="rounded-2xl border border-gray-100 shadow-md p-4 hover:shadow-xl transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="text-base font-semibold text-gray-900">{firm.cityDisplay}</h3>
                </div>
                <div className="space-y-2 text-gray-700 mb-3">
                    <div>
                        <div className="text-xs font-medium text-gray-500 mb-0.5 inline-flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" /> Address
                        </div>
                        <div className="text-xs leading-snug">
                            {firm.addressLine1} {firm.addressLine2}
                            <br />
                            {firm.city}, {firm.state} {firm.zip}
                        </div>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div>
                        <div className="text-xs font-medium text-gray-500 mb-0.5 inline-flex items-center gap-1.5">
                            <Phone className="w-3 h-3" /> Phone
                        </div>
                        <div className="text-xs">
                            <a 
                                href={`tel:${firm.phone.replace(/\D/g, "")}`} 
                                className="text-blue-600 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {firm.phone}
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div>
                        <div className="text-xs font-medium text-gray-500 mb-0.5 inline-flex items-center gap-1.5">
                            <Clock className="w-3 h-3" /> Hours
                        </div>
                        <div className="text-xs">{firm.hoursText}</div>
                    </div>
                    {firm.nearbyAreas.length > 0 && (
                        <>
                            <div className="border-t border-gray-200" />
                            <div>
                                <div className="text-xs font-medium text-gray-500 mb-0.5">Nearby Areas</div>
                                <div className="text-xs text-gray-600 leading-tight">{firm.nearbyAreas.join(", ")}</div>
                            </div>
                        </>
                    )}
                </div>
                <p className="text-xs text-gray-600 mb-2 leading-tight">
                    {firm.servingText}
                </p>
                <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
                    <FreeCaseReviewDialog>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5 h-auto">
                            Get Free Case Review
                        </Button>
                    </FreeCaseReviewDialog>
                    <Button 
                        variant="outline" 
                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 text-xs py-1.5 h-auto"
                        onClick={handleExploreClick}
                    >
                        Explore this office
                    </Button>
                </div>
            </Card>
        </motion.div>
    )
}
