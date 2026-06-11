/**
 * Compact guidance row rendered directly below the "Brief details" textarea.
 * One file controls all form surfaces — edit here, both forms update.
 *
 * Intentionally minimal: no box, no border, no background.
 * The textarea placeholder does the heavy lifting; this line only reinforces
 * the key facts without adding meaningful vertical height.
 */

import { DESCRIPTION_MIN_LENGTH } from "@/components/forms/contact-schema"

interface DescriptionGuidanceProps {
    helperText: string
    caseTypeKey: string
    charLength: number
}

export function DescriptionGuidance({ helperText, caseTypeKey, charLength }: DescriptionGuidanceProps) {
    const counter =
        charLength === 0 ? null
        : charLength < DESCRIPTION_MIN_LENGTH ? `${charLength} / ${DESCRIPTION_MIN_LENGTH} min`
        : `${charLength} chars ✓`

    const counterColor =
        charLength < DESCRIPTION_MIN_LENGTH ? "text-amber-500"
        : "text-emerald-600"

    return (
        <div
            key={caseTypeKey || "__default__"}
            className="flex justify-between items-start gap-3 mt-1"
        >
            <p className="text-[11px] text-slate-500 leading-snug flex-1">
                {helperText}
            </p>
            {counter && (
                <span
                    aria-live="polite"
                    className={`text-[11px] shrink-0 tabular-nums ${counterColor}`}
                >
                    {counter}
                </span>
            )}
        </div>
    )
}
