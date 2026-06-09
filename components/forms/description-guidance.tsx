"use client"

/**
 * Compact guidance row rendered directly below the "Brief details" textarea.
 * One file controls all form surfaces — edit here, both forms update.
 *
 * Intentionally minimal: no box, no border, no background.
 * The textarea placeholder does the heavy lifting; this line only reinforces
 * the key facts without adding meaningful vertical height.
 */

import { AnimatePresence, motion } from "framer-motion"

interface DescriptionGuidanceProps {
    helperText: string
    caseTypeKey: string
    charLength: number
}

export function DescriptionGuidance({ helperText, caseTypeKey, charLength }: DescriptionGuidanceProps) {
    const counter =
        charLength === 0 ? null
        : charLength < 10 ? `${charLength} / 10 min`
        : charLength >= 80 ? `${charLength} chars ✓`
        : `${charLength} chars`

    const counterColor =
        charLength < 10 ? "text-amber-500"
        : charLength >= 80 ? "text-emerald-600"
        : "text-slate-400"

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={caseTypeKey || "__default__"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex justify-between items-start gap-3 mt-1"
            >
                <p className="text-[11px] text-slate-400 leading-snug flex-1">
                    {helperText}
                </p>
                {counter && (
                    <span className={`text-[11px] shrink-0 tabular-nums ${counterColor}`}>
                        {counter}
                    </span>
                )}
            </motion.div>
        </AnimatePresence>
    )
}
