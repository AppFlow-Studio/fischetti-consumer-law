"use client"

import FreeCaseReviewDialog from "@/components/free-case-review-dialog"
import { Phone, Sparkles } from "lucide-react"

export default function FreeCaseReviewFAB() {
    return (
        <FreeCaseReviewDialog>
            <button
                aria-label="Free Case Review"
                className="fixed bottom-6 right-6 z-[130] inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-white shadow-[0_10px_30px_-10px_rgba(2,132,199,0.7)] ring-1 ring-blue-500/50 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_18px_40px_-12px_rgba(2,132,199,0.75)] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                    <Phone className="h-4 w-4" />
                    <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-cyan-200" />
                </span>
                <span className="text-sm font-semibold tracking-wide">Free Case Review</span>
            </button>
        </FreeCaseReviewDialog>
    )
}


