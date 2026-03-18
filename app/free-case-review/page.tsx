import type { Metadata } from "next"
import FreeCaseReviewHero from "@/components/free-case-review-hero"

export const metadata: Metadata = {
  title: "Free Case Review — Consumer Law Florida",
  robots: { index: false, follow: false },
}

export default function FreeCaseReviewPage() {
  return (
    <main className="w-full bg-white font-sans overflow-x-hidden">
      <section
        style={{
          backgroundImage: "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)",
        }}
        className="relative w-full min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-10"
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,20,40,0.55) 60%, rgba(10,20,40,0.8) 100%)" }} />
        <FreeCaseReviewHero />
      </section>
    </main>
  )
}
