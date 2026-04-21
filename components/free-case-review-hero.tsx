"use client"

import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import { PRIMARY_PHONE, PRIMARY_PHONE_E164 } from "@/lib/site"
import { Shield, Star, Clock, PhoneCall, CheckCircle2 } from "lucide-react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
}

const statCard: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 22, delay },
  }),
}

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
}

const caseItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut", delay },
  }),
}

const formCard: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 },
  },
}

const CASES = [
  "Debt Collection Harassment",
  "Illegal Collector Threats or Lies",
  "Credit Report Errors",
  "Background Check Mistakes",
  "Robocalls Without Your Consent",
  "Texted STOP, Still Getting Texts",
]

const STATS = [
  { value: "$30M+", label: "Recovered" },
  { value: "15K+", label: "Cases won" },
]

function StatCards({ baseDelay = 0 }: { baseDelay?: number }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {STATS.map((s, i) => (
        <motion.div
          key={s.value}
          variants={statCard}
          initial="hidden"
          animate="show"
          custom={baseDelay + i * 0.07}
          whileHover={{ scale: 1.05, transition: { duration: 0.18 } }}
          className="bg-white/10 border border-white/15 rounded-lg p-2.5 flex flex-col items-center justify-center cursor-default"
        >
          <div className="text-base font-bold text-white">{s.value}</div>
          <div className="text-[10px] text-blue-200 leading-tight mt-0.5">{s.label}</div>
        </motion.div>
      ))}
      <motion.div
        variants={statCard}
        initial="hidden"
        animate="show"
        custom={baseDelay + 2 * 0.07}
        whileHover={{ scale: 1.05, transition: { duration: 0.18 } }}
        className="bg-white/10 border border-white/15 rounded-lg p-2.5 flex flex-col items-center justify-center cursor-default"
      >
        <div className="flex justify-center gap-0.5 mb-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <div className="text-[10px] text-blue-200 leading-tight">500+ reviews</div>
      </motion.div>
      <motion.div
        variants={statCard}
        initial="hidden"
        animate="show"
        custom={baseDelay + 3 * 0.07}
        whileHover={{ scale: 1.05, transition: { duration: 0.18 } }}
        className="bg-white/10 border border-white/15 rounded-lg p-2.5 flex flex-col items-center justify-center cursor-default"
      >
        <Clock className="w-3.5 h-3.5 text-sky-400 mb-0.5" />
        <div className="text-[10px] text-blue-200 leading-tight">Available 24/7</div>
      </motion.div>
    </div>
  )
}

function AttorneyCard({ baseDelay = 0 }: { baseDelay?: number }) {
  return (
    <motion.div
      variants={slideLeft}
      initial="hidden"
      animate="show"
      custom={baseDelay}
      className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl p-3"
    >
      <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden border-2 border-white/30">
        <Image src="/fischettiheadshot5.png" alt="Michael J. Fischetti" fill className="object-cover object-[50%_15%]" priority />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-semibold text-xs">Michael J. Fischetti</div>
        <div className="text-blue-200 text-[10px]">Lead Consumer Rights Attorney</div>
        <div className="text-blue-300 text-[10px] italic mt-0.5">&ldquo;We fight so you don&apos;t have to.&rdquo;</div>
      </div>
      <a
        href={`tel:${PRIMARY_PHONE_E164}`}
        className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors rounded-lg px-3 py-2 shrink-0"
      >
        <PhoneCall className="w-3.5 h-3.5 text-sky-300" />
        <div>
          <div className="text-[9px] text-blue-200">Call now</div>
          <div className="text-xs font-semibold text-white">{PRIMARY_PHONE}</div>
        </div>
      </a>
    </motion.div>
  )
}

function CaseTypes({ baseDelay = 0, small = false }: { baseDelay?: number; small?: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={baseDelay}
      className="bg-white/10 border border-white/15 rounded-xl p-3 sm:p-4"
    >
      <div className={`font-semibold text-sky-300 uppercase tracking-widest mb-2 sm:mb-3 ${small ? "text-xs" : "text-sm"}`}>
        We handle cases like yours
      </div>
      <div className="grid grid-cols-2 gap-y-1.5 sm:gap-y-2 gap-x-3">
        {CASES.map((item, i) => (
          <motion.div
            key={item}
            variants={caseItem}
            initial="hidden"
            animate="show"
            custom={baseDelay + 0.06 + i * 0.055}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            <CheckCircle2 className={`text-sky-400 shrink-0 ${small ? "w-3 h-3" : "w-4 h-4"}`} />
            <span className={`text-blue-100 leading-tight ${small ? "text-[11px]" : "text-sm"}`}>{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function FreeCaseReviewHero() {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-10">

      {/* ── LEFT COLUMN (desktop) ── */}
      <div className="hidden lg:flex lg:w-[42%] flex-col gap-2">

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-sky-300 font-semibold uppercase tracking-widest w-fit">
          <Shield className="w-3 h-3" /> No Fee Unless We Win
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={0.08} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
          Did a Debt Collector, Credit Agency, or Spam Caller Violate Your Rights?
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.15} className="text-sm sm:text-base text-blue-100 leading-relaxed">
          You may be owed money. Under the FDCPA, FCRA, and TCPA — violators pay your legal fees. Find out in minutes, at no cost.
        </motion.p>

        <StatCards baseDelay={0.22} />
        <AttorneyCard baseDelay={0.42} />
        <CaseTypes baseDelay={0.5} />
      </div>

      {/* ── MOBILE: headline + body ── */}
      <div className="lg:hidden flex flex-col gap-2">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-sky-300 font-semibold uppercase tracking-widest w-fit">
          <Shield className="w-3 h-3" /> No Fee Unless We Win
        </motion.div>
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={0.07} className="text-2xl font-bold text-white leading-snug">
          Did a Debt Collector, Credit Agency, or Spam Caller Violate Your Rights?
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.14} className="text-sm text-blue-100 leading-relaxed">
          You may be owed money. Under the FDCPA, FCRA, and TCPA — violators pay your legal fees. Find out in minutes, at no cost.
        </motion.p>
      </div>

      {/* ── FORM ── */}
      <div className="w-full lg:w-[58%]">
        <motion.div
          variants={formCard}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6 ring-1 ring-blue-100"
          style={{
            boxShadow: "0 0 0 1px rgba(99,170,255,0.15), 0 20px 60px rgba(5,25,55,0.4)",
          }}
        >
          <div className="mb-4">
            <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1 text-xs text-green-700 font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Free — No obligation
            </div>
            <h2 className="text-xl font-bold text-gray-900">Get Your Free Case Review</h2>
            <p className="text-xs text-gray-500 mt-0.5">Takes 2 minutes · We respond within 24 hours</p>
          </div>
          <SimpleContactForm />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.45}
          className="flex items-center justify-center gap-5 mt-3"
        >
          <span className="flex items-center gap-1 text-white/60 text-[11px]"><Shield className="w-3 h-3 text-sky-400" /> 100% confidential</span>
          <span className="flex items-center gap-1 text-white/60 text-[11px]"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> No fees unless we win</span>
          <span className="flex items-center gap-1 text-white/60 text-[11px]"><Clock className="w-3 h-3 text-sky-400" /> 24-hour response</span>
        </motion.div>
      </div>

      {/* ── MOBILE: stats + attorney + cases (below form) ── */}
      <div className="lg:hidden flex flex-col gap-3">
        <StatCards baseDelay={0.2} />
        <AttorneyCard baseDelay={0.35} />
        <CaseTypes baseDelay={0.45} small />
      </div>

    </div>
  )
}
