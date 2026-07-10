"use client"

import { useEffect } from "react"
import { captureAttribution } from "@/lib/gclid"

export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution()
  }, [])

  return null
}
