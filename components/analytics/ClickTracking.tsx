"use client"

import { useEffect } from "react"

/**
 * Phone click tracking component
 * Tracks clicks on tel: links and pushes events to GTM dataLayer
 * No visual output - tracking only
 */
export default function ClickTracking() {
    useEffect(() => {
        // Initialize dataLayer if it doesn't exist
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || []
        }

        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const telLink = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null

            if (telLink && telLink.href) {
                // Push event to dataLayer
                if (typeof window !== "undefined" && window.dataLayer) {
                    window.dataLayer.push({
                        event: "tel_click",
                        tel_number: telLink.href.replace("tel:", ""),
                        page_path: window.location.pathname,
                    })
                }
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
