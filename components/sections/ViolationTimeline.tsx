// Server Component — CSS animation only, fully SSR rendered and bot-readable
import { cn } from "@/lib/utils"

interface TimelineStep {
  step: string
  title: string
  body: string
  color?: "blue" | "green" | "amber" | "red"
}

interface ViolationTimelineProps {
  steps: TimelineStep[]
  title?: string
  className?: string
}

const colorMap = {
  blue: {
    dot: "bg-blue-600",
    ring: "ring-blue-100",
    label: "text-blue-700 bg-blue-50 border-blue-100",
    line: "from-blue-200 to-transparent"
  },
  green: {
    dot: "bg-blue-600",
    ring: "ring-blue-100",
    label: "text-blue-700 bg-blue-50 border-blue-100",
    line: "from-blue-200 to-transparent"
  },
  // amber is remapped to red/crimson — violation phase
  amber: {
    dot: "bg-red-700",
    ring: "ring-red-100",
    label: "text-red-700 bg-red-50 border-red-100",
    line: "from-red-200 to-transparent"
  },
  red: {
    dot: "bg-red-700",
    ring: "ring-red-100",
    label: "text-red-700 bg-red-50 border-red-100",
    line: "from-red-200 to-transparent"
  },
}

export function ViolationTimeline({ steps, title, className }: ViolationTimelineProps) {
  return (
    <section className={cn("py-8", className)}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-10">
          {title}
        </h2>
      )}
      <ol className="relative space-y-0" aria-label={title}>
        {steps.map((step, i) => {
          const c = colorMap[step.color ?? "blue"]
          const isLast = i === steps.length - 1
          return (
            <li
              key={`${step.step}-${i}`}
              className="relative pl-12 md:pl-16 pb-12 last:pb-0 animate-fade-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Vertical connector line */}
              {!isLast && (
                <span
                  className={cn(
                    "absolute left-[15px] md:left-[19px] top-10 bottom-0 w-[2px] bg-gradient-to-b",
                    c.line
                  )}
                  aria-hidden="true"
                />
              )}
              {/* Step dot */}
              <span
                className={cn(
                  "absolute left-0 top-1 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white text-sm font-black shadow-lg z-10",
                  c.dot,
                  "ring-4 md:ring-8",
                  c.ring
                )}
                aria-hidden="true"
              >
                {step.step}
              </span>
              
              <div className="bg-white border border-gray-200 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col gap-1 mb-3">
                  <p className={cn(
                    "inline-block w-fit text-[10px] font-black uppercase tracking-[0.1em] px-3 py-1 rounded-full border",
                    c.label
                  )}>
                    Phase {step.step}
                  </p>
                  <h3 className="font-bold text-gray-900 text-lg md:text-xl font-[var(--font-playfair-display)] leading-tight">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-[15px] md:text-base leading-relaxed">{step.body}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
