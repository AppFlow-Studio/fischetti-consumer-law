"use client"

import { useEffect } from "react"
import { trackPhoneClick } from "@/components/tracking/tracking-events"

/**
 * Phone click tracking component
 * Tracks clicks on tel: links and pushes events to GTM dataLayer
 * No visual output - tracking only
 */
export default function ClickTracking() {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const telLink = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null

            if (telLink && telLink.href) {
                trackPhoneClick(telLink.dataset.trackingLocation, telLink.href.replace("tel:", ""))
            }
        }

        // Attach click listener to document
        document.addEventListener("click", handleClick)

        // Cleanup on unmount
        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    // No visual output
    return null
}
