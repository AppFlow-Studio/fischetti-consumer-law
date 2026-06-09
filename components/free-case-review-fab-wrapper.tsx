"use client"

import { usePathname } from "next/navigation"
import FreeCaseReviewFAB from "@/components/free-case-review-fab"

export default function FreeCaseReviewFABWrapper() {
    const pathname = usePathname()
    if (pathname === "/locations" || pathname === "/free-case-review") {
        return null
    }
    return <FreeCaseReviewFAB />
}
