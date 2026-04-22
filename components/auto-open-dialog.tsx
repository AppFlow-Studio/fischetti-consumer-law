"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useUIState } from "@/providers/ui-state-provider"

function AutoOpenDialogInner() {
    const searchParams = useSearchParams()
    const { setOpenDialogRequest } = useUIState()

    useEffect(() => {
        if (searchParams?.get("open") === "true") {
            setOpenDialogRequest(true)
        }
    }, [searchParams, setOpenDialogRequest])

    return null
}

export default function AutoOpenDialog() {
    return (
        <Suspense fallback={null}>
            <AutoOpenDialogInner />
        </Suspense>
    )
}
