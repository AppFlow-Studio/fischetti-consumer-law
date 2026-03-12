import type { Metadata } from "next"
import Image from "next/image"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import { PRIMARY_PHONE } from "@/lib/site"
import { Shield, Star, Clock, PhoneCall, CheckCircle2 } from "lucide-react"

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

        {/*
          Mobile order:  [A] headline+body  →  [B] form  →  [C] stats+attorney+cases
          Desktop order: [left col: A+C] | [right col: B]
        */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-10">

          {/* ── LEFT COLUMN (desktop only wrapper) ── */}
          <div className="hidden lg:flex lg:w-[42%] flex-col gap-2">

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-sky-300 font-semibold uppercase tracking-widest w-fit">
              <Shield className="w-3 h-3" /> No Fee Unless We Win
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
              Did a Debt Collector, Credit Agency, or Spam Caller Violate Your Rights?
            </h1>

            {/* Body */}
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              You may be owed money. Under the FDCPA, FCRA, and TCPA — violators pay your legal fees. Find out in minutes, at no cost.
            </p>

            {/* Trust stats */}
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white/10 border border-white/15 rounded-lg p-2.5 text-center">
                <div className="text-base font-bold text-white">$30M+</div>
                <div className="text-[10px] text-blue-200 leading-tight mt-0.5">Recovered</div>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-lg p-2.5 text-center">
                <div className="text-base font-bold text-white">15K+</div>
                <div className="text-[10px] text-blue-200 leading-tight mt-0.5">Cases won</div>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-lg p-2.5 text-center">
                <div className="flex justify-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-[10px] text-blue-200 leading-tight">500+ reviews</div>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-lg p-2.5 text-center">
                <Clock className="w-3.5 h-3.5 text-sky-400 mx-auto mb-0.5" />
                <div className="text-[10px] text-blue-200 leading-tight">Available 24/7</div>
              </div>
            </div>

            {/* Attorney + phone */}
            <div className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden border-2 border-white/30">
                <Image src="/fischettiheadshot5.png" alt="Michael J. Fischetti" fill className="object-cover object-[50%_15%]" priority />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-xs">Michael J. Fischetti</div>
                <div className="text-blue-200 text-[10px]">Lead Consumer Rights Attorney</div>
                <div className="text-blue-300 text-[10px] italic mt-0.5">"We fight so you don't have to."</div>
              </div>
              <a href={`tel:${PRIMARY_PHONE.replace(/\D/g, "")}`} className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors rounded-lg px-3 py-2 shrink-0">
                <PhoneCall className="w-3.5 h-3.5 text-sky-300" />
                <div>
                  <div className="text-[9px] text-blue-200">Call now</div>
                  <div className="text-xs font-semibold text-white">{PRIMARY_PHONE}</div>
                </div>
              </a>
            </div>

            {/* Case types */}
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-sm font-semibold text-sky-300 uppercase tracking-widest mb-2">We handle cases like yours</div>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                {["Debt Collection Harassment","Credit Report Errors","Robocalls & Spam Texts","Privacy & Data Breach","Video Privacy (VPPA)","Fair Housing Violations","Mass Arbitration"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="text-sm text-blue-100 leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── MOBILE: headline + body (above form) ── */}
          <div className="lg:hidden flex flex-col gap-2">
            <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-sky-300 font-semibold uppercase tracking-widest w-fit">
              <Shield className="w-3 h-3" /> No Fee Unless We Win
            </div>
            <h1 className="text-2xl font-bold text-white leading-snug">
              Did a Debt Collector, Credit Agency, or Spam Caller Violate Your Rights?
            </h1>
            <p className="text-sm text-blue-100 leading-relaxed">
              You may be owed money. Under the FDCPA, FCRA, and TCPA — violators pay your legal fees. Find out in minutes, at no cost.
            </p>
          </div>

          {/* ── FORM (mobile: middle, desktop: right col) ── */}
          <div className="w-full lg:w-[58%]">
            <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6">
              <div className="mb-4">
                <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1 text-xs text-green-700 font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Free — No obligation
                </div>
                <h2 className="text-xl font-bold text-gray-900">Get Your Free Case Review</h2>
                <p className="text-xs text-gray-500 mt-0.5">Takes 2 minutes · We respond within 24 hours</p>
              </div>
              <SimpleContactForm />
            </div>
            <div className="flex items-center justify-center gap-5 mt-3">
              <span className="flex items-center gap-1 text-white/60 text-[11px]"><Shield className="w-3 h-3 text-sky-400" /> 100% confidential</span>
              <span className="flex items-center gap-1 text-white/60 text-[11px]"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> No fees unless we win</span>
              <span className="flex items-center gap-1 text-white/60 text-[11px]"><Clock className="w-3 h-3 text-sky-400" /> 24-hour response</span>
            </div>
          </div>

          {/* ── MOBILE: stats + attorney + cases (below form) ── */}
          <div className="lg:hidden flex flex-col gap-3">
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white/10 border border-white/15 rounded-lg p-2.5 text-center">
                <div className="text-base font-bold text-white">$30M+</div>
                <div className="text-[10px] text-blue-200 leading-tight mt-0.5">Recovered</div>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-lg p-2.5 text-center">
                <div className="text-base font-bold text-white">15K+</div>
                <div className="text-[10px] text-blue-200 leading-tight mt-0.5">Cases won</div>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-lg p-2.5 text-center">
                <div className="flex justify-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <div className="text-[10px] text-blue-200 leading-tight">500+ reviews</div>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-lg p-2.5 text-center">
                <Clock className="w-3.5 h-3.5 text-sky-400 mx-auto mb-0.5" />
                <div className="text-[10px] text-blue-200 leading-tight">Available 24/7</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden border-2 border-white/30">
                <Image src="/fischettiheadshot5.png" alt="Michael J. Fischetti" fill className="object-cover object-[50%_15%]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-xs">Michael J. Fischetti</div>
                <div className="text-blue-200 text-[10px]">Lead Consumer Rights Attorney</div>
                <div className="text-blue-300 text-[10px] italic mt-0.5">"We fight so you don't have to."</div>
              </div>
              <a href={`tel:${PRIMARY_PHONE.replace(/\D/g, "")}`} className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors rounded-lg px-3 py-2 shrink-0">
                <PhoneCall className="w-3.5 h-3.5 text-sky-300" />
                <div>
                  <div className="text-[9px] text-blue-200">Call now</div>
                  <div className="text-xs font-semibold text-white">{PRIMARY_PHONE}</div>
                </div>
              </a>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-xl p-4">
              <div className="text-xs font-semibold text-sky-300 uppercase tracking-widest mb-3">We handle cases like yours</div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                {["Debt Collection Harassment","Credit Report Errors","Robocalls & Spam Texts","Privacy & Data Breach","Video Privacy (VPPA)","Fair Housing Violations","Mass Arbitration"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0" />
                    <span className="text-[11px] text-blue-100 leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
