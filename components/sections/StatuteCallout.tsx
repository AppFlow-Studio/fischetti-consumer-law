// Server Component — SSR safe, no client JS
import { Scale } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatuteCalloutProps {
  citation: string
  text: string
  label?: string
  className?: string
}

export function StatuteCallout({ citation, text, label = "Legal Statute", className }: StatuteCalloutProps) {
  return (
    <div className={cn(
      "relative border-l-4 border-blue-600 bg-linear-to-r from-blue-50/80 to-transparent rounded-r-[2rem] p-6 md:p-10 my-8 shadow-sm ring-1 ring-gray-200/50",
      className
    )}>
      <div className="absolute -left-[14px] top-8 w-6 h-6 md:w-7 md:h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
        <Scale className="w-3 h-3 md:w-4 md:h-4 text-white" aria-hidden="true" />
      </div>
      
      <div className="space-y-1 mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">{label}</p>
        <p className="font-mono text-xs md:text-sm font-bold text-gray-500 tracking-tight">{citation}</p>
      </div>
      
      <blockquote className="text-gray-900 text-base md:text-lg leading-relaxed italic border-none p-0 font-medium">
        &ldquo;{text}&rdquo;
      </blockquote>
      
      <div className="mt-6 flex items-center gap-2">
        <div className="h-px flex-grow bg-blue-100" />
        <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">End of Citation</span>
        <div className="h-px flex-grow bg-blue-100" />
      </div>
    </div>
  )
}
