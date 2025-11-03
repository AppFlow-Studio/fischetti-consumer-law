"use client"

import React from "react"
import Image from "next/image"
import { SpinningText } from "./spinning-text"
import { cn } from "@/lib/utils"

interface SpinningLogoTextProps {
    logo?: string
    text?: string
    logoSize?: number
    radius?: number
    duration?: number
    reverse?: boolean
    textClassName?: string
    className?: string
}

export function SpinningLogoText({
    logo = "/fischettilogo.png",
    text = "Fischetti Law Group",
    logoSize = 120,
    radius = 6,
    duration = 20,
    reverse = false,
    textClassName,
    className,
}: SpinningLogoTextProps) {
    return (
        <div
            className={cn(
                "relative flex items-center justify-center",
                "w-full h-full min-w-[200px] min-h-[200px]",
                className
            )}
        >
            {/* Spinning Text */}
            <SpinningText
                radius={radius}
                duration={duration}
                reverse={reverse}
                className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    textClassName
                )}
            >
                {text} 
            </SpinningText>

            {/* Center Logo */}
            <div
                className="relative z-10 flex items-center justify-center rounded-full p-4 shadow-sm"
                style={{
                    width: `${logoSize + 32}px`,
                    height: `${logoSize + 32}px`,
                }}
            >
                <Image
                    src={logo}
                    alt="Fischetti Law Group"
                    width={logoSize}
                    height={logoSize}
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    )
}

