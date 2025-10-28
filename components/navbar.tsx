"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"

type NavbarProps = {
    className?: string
}

export default function Navbar({ className }: NavbarProps) {
    return (
        <nav
            className={cn(
                "fixed lg:top-4 lg:left-1/2 lg:-translate-x-1/2 z-[112] w-full lg:max-w-fit mx-auto lg:rounded-[12px] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[background-color,border-color,box-shadow,backdrop-filter] lg:border border-white/20 bg-gradient-to-r from-[rgba(249,250,247,0.12)] to-[rgba(249,250,247,0.18)] lg:shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] backdrop-blur-[9px]",
                className
            )}
            role="navigation"
            aria-label="Primary"
        >
            <div className="flex items-center justify-between gap-4 px-4 py-2 md:px-6 md:py-3">
                {/* Brand */}
                {/* <Link href="/" className="inline-flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white/90 shadow-inner ring-1 ring-inset ring-white/20">
                        <span className="text-lg">Fischetti Law Group</span>
                    </span>
                    <span className="sr-only">Home</span>
                </Link> */}

                {/* Links */}
                <div className="hidden sm:flex items-center gap-8 text-sm">
                    <Link href="#about" className="text-white/90 hover:text-white transition-colors">About</Link>
                    <Link href="#writing" className="text-white/90 hover:text-white transition-colors">Writing</Link>
                    <Link href="#careers" className="text-white/90 hover:text-white transition-colors">Careers</Link>
                    {/* <AnimatedThemeToggler /> */}
                </div>

                {/* CTA */}
                {/* <div className="ml-auto sm:ml-0">
                    <Link
                        href="#get-cofounder"
                        className="inline-flex items-center gap-2 rounded-[12px] bg-neutral-900/90 px-4 py-2 text-[17px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_0_rgba(0,0,0,0.25)] ring-1 ring-inset ring-white/10 hover:bg-neutral-900"
                    >
                        Get Cofounder
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/90 text-sm">›</span>
                    </Link>
                </div> */}
            </div>
        </nav>
    )
}


