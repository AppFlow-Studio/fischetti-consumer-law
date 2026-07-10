'use client'
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { trackFreeCaseReviewClick } from "@/components/tracking/tracking-events"

interface CTAStripButtonProps {
  className?: string
}

export function CTAStripButton({ className }: CTAStripButtonProps) {
  const scrollToForm = () => {
    trackFreeCaseReviewClick("cta_strip")
    document.getElementById('case-review-form')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <button
      onClick={scrollToForm}
      className={cn(
        "inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold text-lg transition-all hover:scale-105 shadow-lg group",
        className
      )}
    >
      <span>Get My Free Case Review</span>
      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  )
}
