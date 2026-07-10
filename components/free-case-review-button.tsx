"use client"

import * as React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { BorderBeam } from "./ui/border-beam"
import { trackFreeCaseReviewClick } from "@/components/tracking/tracking-events"

type FreeCaseReviewProps = ButtonProps & {
  iconSize?: number
  iconStrokeWidth?: number
}

const FreeCaseReview = React.forwardRef<HTMLButtonElement, FreeCaseReviewProps>(
  (props, ref) => {
    const {
      className,
      size = "lg",
      children = "Free Case Review",
      iconSize = 16,
      iconStrokeWidth = 2,
      onClick,
      ...restProps
    } = props

    return (
      <Button
        ref={ref}
        size={size}
        variant="default"
        className={cn("group relative overflow-hidden", className)}
        onClick={(event) => {
          trackFreeCaseReviewClick("button")
          onClick?.(event)
        }}
        {...restProps}
      >
        <BorderBeam colorFrom="blue" colorTo="blue-500" />

        {/* Text — slides left + fades + blurs out on hover */}
        <span
          className={cn(
            "relative z-0 mr-12 font-semibold transition-all duration-300 ease-out",
            "group-hover:opacity-0 group-hover:-translate-x-3 group-hover:blur-[3px] group-hover:scale-95",
          )}
        >
          {children}
        </span>

        {/* Expanding arrow pill */}
        <span
          className={cn(
            "absolute right-1.5 top-1.5 bottom-1.5 z-10",
            "flex items-center justify-center rounded-full",
            "w-8 bg-current/15",
            "transition-all duration-300 ease-out",
            "group-hover:w-[calc(100%-0.75rem)]",
            "group-active:scale-95",
          )}
          aria-hidden="true"
        >
          <ArrowRight
            size={iconSize}
            strokeWidth={iconStrokeWidth}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </span>
      </Button>
    )
  },
)

FreeCaseReview.displayName = "FreeCaseReview"

export default FreeCaseReview
