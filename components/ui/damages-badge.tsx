// No "use client" — server component
import { cn } from "@/lib/utils"

type DamagesType = 'fdcpa' | 'tcpa' | 'fcra' | 'custom'

const DAMAGES_MAP: Record<string, string> = {
  fdcpa: 'Up to $1,000 per lawsuit',
  tcpa: 'Up to $1,500 per call or text',
  fcra: 'Statutory + actual damages',
}

interface DamagesBadgeProps {
  type: DamagesType
  customText?: string
  className?: string
}

export function DamagesBadge({ type, customText, className }: DamagesBadgeProps) {
  const text = customText ?? DAMAGES_MAP[type] ?? ''

  return (
    <div className={cn(
      "inline-flex items-center gap-3 bg-blue-950/40 border border-blue-400/50 backdrop-blur-sm rounded-2xl px-5 py-2.5 shadow-lg shadow-blue-900/20",
      className
    )}>
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white shadow-inner">
        <span className="text-lg font-black leading-none">$</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-blue-300 uppercase tracking-wider leading-none mb-1">Potential Recovery</span>
        <span className="text-white font-bold text-sm md:text-base leading-none">{text}</span>
      </div>
    </div>
  )
}
