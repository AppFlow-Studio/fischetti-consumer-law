"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const morphTime = 2
const cooldownTime = 0.7

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(0)
  const timeRef = useRef(new Date())

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current]
      if (!current1 || !current2) return

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

      const invertedFraction = 1 - fraction
      current1.style.filter = `blur(${Math.min(
        8 / invertedFraction - 8,
        100
      )}px)`
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`

      current1.textContent = texts[textIndexRef.current % texts.length]
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length]
    },
    [texts]
  )

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0

    let fraction = morphRef.current / morphTime

    if (fraction > 1) {
      cooldownRef.current = cooldownTime
      fraction = 1
    }

    setStyles(fraction)

    if (fraction === 1) {
      textIndexRef.current++
    }
  }, [setStyles])

  const doCooldown = useCallback(() => {
    morphRef.current = 0
    const [current1, current2] = [text1Ref.current, text2Ref.current]
    if (current1 && current2) {
      current2.style.filter = "none"
      current2.style.opacity = "100%"
      current1.style.filter = "none"
      current1.style.opacity = "0%"
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const newTime = new Date()
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000
      timeRef.current = newTime

      cooldownRef.current -= dt

      if (cooldownRef.current <= 0) doMorph()
      else doCooldown()
    }

    animate()
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [doMorph, doCooldown])

  return { text1Ref, text2Ref }
}

interface MorphingTextProps {
  className?: string
  texts: string[]
}

/**
 * AnimatedTexts — client-only, sets textContent via rAF.
 * Also hides the SSR fallback span the moment the animation loop starts,
 * so there is never a double-render visible to users.
 */
const AnimatedTexts: React.FC<
  Pick<MorphingTextProps, "texts"> & {
    fallbackRef: React.RefObject<HTMLSpanElement | null>
    onStart: () => void
  }
> = ({ texts, fallbackRef, onStart }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts)

  useEffect(() => {
    // Hide the SSR fallback the moment the animation takes over.
    // Using opacity so it's a paint-only change with no layout reflow.
    if (fallbackRef.current) {
      fallbackRef.current.style.opacity = "0"
      // Remove from accessibility tree too — animation spans carry the content
      fallbackRef.current.setAttribute("aria-hidden", "true")
    }
    onStart()
  }, [fallbackRef, onStart])

  return (
    <>
      <span
        className="absolute left-0 top-0 inline-block w-auto max-w-full"
        ref={text1Ref}
      />
      <span
        className="absolute left-0 top-0 inline-block w-auto max-w-full"
        ref={text2Ref}
      />
    </>
  )
}

const SvgFilters: React.FC = () => (
  <svg
    id="filters"
    className="fixed h-0 w-0"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
)

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
}) => {
  const fallbackRef = useRef<HTMLSpanElement>(null)
  const [animating, setAnimating] = useState(false)
  const handleStart = useCallback(() => setAnimating(true), [])

  return (
    <div
      className={cn(
        "relative h-12 sm:h-16 w-full max-w-screen-md text-center font-sans leading-none font-bold md:h-24",
        // The SVG threshold filter is what fuses the two spans into one gooey
        // morph — but it also gates first paint: the browser cannot rasterize
        // this text until the filter graph resolves, which made the headline
        // the LCP element at ~4.2s on throttled mobile even after the page
        // dropped to 571 KB. The SSR fallback needs no filter (nothing is
        // morphing yet), so it is applied only once the animation starts.
        animating && "[filter:url(#threshold)_blur(0.6px)]",
        className
      )}
    >
      {/*
        SSR fallback span — genuinely visible in the raw HTML response.
        Googlebot indexes this as real, visible text (full ranking weight).
        Rendered with the same absolute positioning as the animation spans.
        Hidden via opacity:0 the moment AnimatedTexts mounts client-side,
        so users never see a double-render or flash.
      */}
      <span
        ref={fallbackRef}
        className="absolute left-0 top-0 inline-block w-auto max-w-full transition-opacity duration-150"
      >
        {texts[0]}
      </span>
      <AnimatedTexts texts={texts} fallbackRef={fallbackRef} onStart={handleStart} />
      <SvgFilters />
    </div>
  )
}
