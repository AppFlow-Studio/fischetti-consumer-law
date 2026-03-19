"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"

const HIDDEN_NAVBAR_PATHS = ["/free-case-review"]

export default function NavbarWrapper() {
    const pathname = usePathname()
    if (HIDDEN_NAVBAR_PATHS.includes(pathname)) {
        return null
    }
    return <Navbar />
}
