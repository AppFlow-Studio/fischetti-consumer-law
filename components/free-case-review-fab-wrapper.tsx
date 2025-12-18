"use client"

import { usePathname } from "next/navigation"
import FreeCaseReviewFAB from "@/components/free-case-review-fab"

export default function FreeCaseReviewFABWrapper() {
    const pathname = usePathname()
    // Hide FAB on locations page
    if (pathname === "/locations") {
        return null
    }
    return <FreeCaseReviewFAB />
}
