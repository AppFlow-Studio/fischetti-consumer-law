// /app/consumer-law/fdcpa/debt-collector-called-after-9pm/page.tsx (SERVER COMPONENT)
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Phone, Clock, FileText, Scale, AlertTriangle, Handshake } from "lucide-react"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import { Card } from "@/components/ui/card"
import { JsonLd } from "@/components/seo/json-ld"
import { FAQSection } from "@/components/seo/faq-section"
import { DamagesBadge } from "@/components/ui/damages-badge"
import { StatuteCallout } from "@/components/sections/StatuteCallout"
import { buildPageMeta, buildBreadcrumbSchema, buildLegalServiceSchema, buildArticleSchema, SITE_CONFIG } from "@/lib/seo"
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav"

export const metadata: Metadata = buildPageMeta({
  title: "Debt Collector Called After 9 PM — FDCPA Florida",
  description: "Debt collector called after 9 PM or before 8 AM in Florida? That's an FDCPA violation. Up to $1,000. Free case review. No fees unless we win.",
  canonical: "https://www.consumerlawflorida.com/consumer-law/fdcpa/debt-collector-called-after-9pm",
  keywords: [
    "debt collector called after 9pm",
    "debt collector calling after hours florida",
    "fdcpa calling hours florida",
    "debt collector called at night florida",
    "illegal debt collection hours florida",
    "debt collector called before 8am",
    "fdcpa attorney florida after hours call",
  ],
})

const faqs = [
  {
    question: "What time zone counts — mine or the debt collector's?",
    answer: "Yours — the consumer's local time. The FDCPA says calls must be made at times that are not unusual or inconvenient, and courts interpret this based on the consumer's local time zone. A collector in California cannot call a Florida consumer at 7 AM because 7 AM is before the 8 AM cutoff in Florida.",
  },
  {
    question: "What if they left a voicemail at 9:30 PM?",
    answer: "A voicemail left outside permitted hours (before 8 AM or after 9 PM) is still a violation of the FDCPA. The restriction applies to the act of communicating — which includes leaving a recorded message. Save the voicemail and note the timestamp.",
  },
  {
    question: "Does the calling hours rule apply to text messages too?",
    answer: "FDCPA calling hours technically apply to telephone calls. Text messages may have separate protections under the TCPA (Telephone Consumer Protection Act). If you're receiving late-night texts from a debt collector, you may have claims under both laws.",
  },
  {
    question: "How many after-hours calls do I need to have a claim?",
    answer: "Even one call outside permitted hours may be a violation. The FDCPA does not require a pattern of violations. A single after-hours call can entitle you to statutory damages of up to $1,000 per lawsuit, plus attorney's fees.",
  },
  {
    question: "What if I consented to calls at any time?",
    answer: "Consent can be a defense to an FDCPA claim. However, vague consent in a credit application typically does not cover calls at illegal hours. If you gave specific consent to after-hours calls, that should be discussed with an attorney.",
  },
  {
    question: "What if a debt collector claims they didn't know my time zone?",
    answer: "It's the collector's legal obligation to ensure calls are made within permitted hours for the consumer's time zone. 'We didn't know your time zone' is generally not a defense recognized by federal courts. Collectors are required to know where they're calling.",
  },
]

const breadcrumb = [
  { name: "Home", url: SITE_CONFIG.url },
  { name: "Consumer Law", url: `${SITE_CONFIG.url}/consumer-law` },
  { name: "FDCPA", url: `${SITE_CONFIG.url}/consumer-law/fdcpa` },
  { name: "Called After 9 PM", url: `${SITE_CONFIG.url}/consumer-law/fdcpa/debt-collector-called-after-9pm` },
]

export default function DebtCollectorCalledAfter9pmPage() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <JsonLd schema={buildBreadcrumbSchema(breadcrumb)} />
      <JsonLd schema={buildLegalServiceSchema("FDCPA — After-Hours Debt Collector Calls", `${SITE_CONFIG.url}/consumer-law/fdcpa/debt-collector-called-after-9pm`)} />
      <JsonLd schema={buildArticleSchema({
        title: "Debt Collector Called After 9 PM in Florida — FDCPA Violation",
        description: "Florida FDCPA attorney explains illegal after-hours debt collection calls and your right to compensation.",
        url: `${SITE_CONFIG.url}/consumer-law/fdcpa/debt-collector-called-after-9pm`,
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString().split("T")[0],
      })} />

      {/* Hero */}
      <section
        className="w-full pt-20 lg:pt-28 pb-16 px-4 sm:px-6"
        style={{ backgroundImage: "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)" }}
      >
        <div className="max-w-6xl mx-auto">
          <BreadcrumbNav items={[
            { name: "Home", href: "/" },
            { name: "Consumer Law", href: "/consumer-law" },
            { name: "FDCPA", href: "/consumer-law/fdcpa" },
            { name: "Called After 9 PM" },
          ]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <DamagesBadge type="fdcpa" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[var(--font-playfair-display)] leading-tight">
                Debt Collector Called After 9 PM? That&apos;s an FDCPA Violation in Florida.
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                Federal law sets specific calling hours: <strong>8 AM to 9 PM local time.</strong> A call outside those hours isn&apos;t just rude — it&apos;s illegal under the FDCPA. Even one after-hours call may entitle you to up to <strong>$1,000</strong>.
              </p>
              <div className="flex flex-wrap gap-4">
                {["No fees unless we win", "Free case review", "One call can be enough", "Available 24/7"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/90 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-300 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="case-review-form" className="lg:sticky lg:top-24">
              <Card className="bg-white rounded-2xl p-6 shadow-2xl">
                <p className="text-xl font-bold text-gray-900 mb-2">Get Your Free Case Review</p>
                <p className="text-gray-500 text-sm mb-4">We&apos;ll review your call logs and let you know if you have a claim.</p>
                <SimpleContactForm useBlueTheme={true} />
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-blue-600" aria-hidden="true" />
                  <span>Call <a href={SITE_CONFIG.phoneHref} className="text-blue-600 font-semibold hover:underline">{SITE_CONFIG.phone}</a></span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Calling hours visual */}
      <section className="w-full bg-gray-50 border-y border-gray-200 py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-lg font-bold text-[#002b60] mb-6">The FDCPA Permitted Calling Window</h2>
          <div className="relative flex items-center gap-0 rounded-2xl overflow-hidden shadow-md" role="img" aria-label="FDCPA permitted calling hours: 8 AM to 9 PM local time. Before 8 AM and after 9 PM are illegal.">
            <div className="flex-[8] bg-red-600 text-white text-center py-5 px-2">
              <div className="text-xs font-bold uppercase tracking-wide opacity-90">Illegal Zone</div>
              <div className="text-sm font-semibold">Midnight – 8:00 AM</div>
            </div>
            <div className="flex-[13] bg-green-600 text-white text-center py-5 px-2 border-x-4 border-white">
              <div className="text-xs font-bold uppercase tracking-wide opacity-90">✓ Permitted Hours</div>
              <div className="text-base font-bold">8:00 AM – 9:00 PM</div>
              <div className="text-xs opacity-80 mt-0.5">(Consumer&apos;s local time)</div>
            </div>
            <div className="flex-[3] bg-red-600 text-white text-center py-5 px-2">
              <div className="text-xs font-bold uppercase tracking-wide opacity-90">Illegal</div>
              <div className="text-xs font-semibold">9 PM–<br />Midnight</div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-3">A call even one minute outside the permitted window is a federal violation. There are no exceptions.</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
            The FDCPA Calling Hours Rule — Exactly What the Law Says
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Under the Fair Debt Collection Practices Act, debt collectors may only call consumers between <strong>8:00 AM and 9:00 PM local time</strong> — the consumer&apos;s local time, not the collector&apos;s. This rule exists because Congress recognized that calls at unusual hours are inherently harassing regardless of the amount owed.
          </p>
          <StatuteCallout
            citation="15 U.S.C. § 1692c(a)(1) — FDCPA"
            text="A debt collector may not communicate with a consumer in connection with the collection of any debt... at any unusual time or place or a time or place known or which should be known to be inconvenient to the consumer. In the absence of knowledge of circumstances to the contrary, a debt collector shall assume that the convenient time for communicating with a consumer is after 8 o'clock antemeridian and before 9 o'clock postmeridian, local time at the consumer's location."
            label="Federal Law"
          />
          <p className="text-gray-700 leading-relaxed mt-6">
            The restriction applies to both early morning calls (before 8 AM) and late-night calls (after 9 PM). There are no exceptions for emergencies, urgency, the amount of money owed, or the collector&apos;s time zone. A violation occurs the moment the call is placed outside these hours.
          </p>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#002b60] mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" aria-hidden="true" />
            Check Your Call Log Right Now
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Pull up your recent calls. If any collector called before <strong>8:00 AM</strong> or after <strong>9:00 PM</strong>, take a screenshot immediately. That timestamp may be direct evidence of a federal violation.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm mb-4">
            Your phone&apos;s call log typically shows the exact time of every call. Save those screenshots now — call logs can roll off older phones or get overwritten after 30–60 days.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Open your recent calls list",
              "Look for any call before 8:00 AM",
              "Look for any call after 9:00 PM",
              "Screenshot each one — include the timestamp clearly",
              "Note the exact number that called",
              "Check voicemails for timestamps too",
            ].map((step) => (
              <div key={step} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="rounded-2xl p-8"
          style={{ backgroundImage: "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)" }}
        >
          <h2 className="text-2xl font-bold text-white font-[var(--font-playfair-display)] mb-6">
            What an After-Hours Call May Be Worth
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { amount: "Up to $1,000", label: "Statutory damages per lawsuit", icon: Scale },
              { amount: "Actual damages", label: "Disrupted sleep, emotional distress, anxiety", icon: AlertTriangle },
              { amount: "Attorney's fees", label: "We typically take nothing from you", icon: Handshake },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10">
                <div className="flex justify-center mb-2">
                  <item.icon className="w-8 h-8 text-blue-300" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{item.amount}</div>
                <div className="text-white/80 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <p className="text-white font-semibold mb-1">Multiple after-hours calls multiply damages.</p>
            <p className="text-blue-200 text-sm">While the FDCPA caps statutory damages at $1,000 per lawsuit (not per call), multiple violations can strengthen your actual damages claim and demonstrate willful conduct.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" aria-hidden="true" />
            Evidence to Preserve
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { item: "Call log screenshot showing the exact timestamp", strength: "Primary evidence" },
              { item: "Phone records from your carrier (request in writing)", strength: "Corroborating" },
              { item: "Voicemail with the timestamp shown", strength: "Primary evidence" },
              { item: "Name and company of the debt collection firm", strength: "Required to file" },
              { item: "Any written letters from the collector", strength: "Corroborating" },
              { item: "Handwritten log of call times (dated contemporaneously)", strength: "Helpful" },
            ].map((row) => (
              <div key={row.item} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-gray-700 text-sm">{row.item}</span>
                  <span className="block text-xs text-blue-700 font-medium mt-0.5">{row.strength}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#002b60] mb-4">Florida Time Zone — What Collectors Must Know</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Florida is in the <strong>Eastern Time Zone</strong>. If you live in Florida, a debt collector in California, Texas, or any other state must call you between <strong>8:00 AM – 9:00 PM Eastern Time</strong> — regardless of what time it is where they are located.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="font-semibold text-[#002b60] text-sm mb-1">If you&apos;re in Miami, Orlando, Tampa:</p>
              <p className="text-gray-600 text-sm">Eastern Time applies. Permitted calls: 8 AM – 9 PM ET.</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="font-semibold text-[#002b60] text-sm mb-1">If you&apos;re in the Panhandle (Pensacola):</p>
              <p className="text-gray-600 text-sm">Central Time applies for most of the Panhandle. Permitted calls: 8 AM – 9 PM CT.</p>
            </div>
          </div>
        </section>

        <div className="bg-[#002b60] rounded-2xl p-8 text-center">
          <p className="text-2xl font-bold text-white mb-3">Got Called After 9 PM? Let&apos;s Review Your Case.</p>
          <p className="text-blue-200 mb-6">Free evaluation. No fees unless we win. Response within 24 hours.</p>
          <a
            href="#case-review-form"
            className="inline-flex items-center justify-center gap-2 bg-[#007BFF] hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
          >
            Get My Free Case Review
          </a>
        </div>
      </div>

      <FAQSection faqs={faqs} title="FDCPA After-Hours Calling — Common Questions" />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">Related FDCPA Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: "/consumer-law/fdcpa", label: "FDCPA — Full Overview of Your Rights" },
            { href: "/consumer-law/fdcpa/debt-collector-keeps-calling", label: "Debt Collector Won't Stop Calling" },
            { href: "/consumer-law/fdcpa/debt-collector-threatened-me", label: "Debt Collector Threatened You" },
            { href: "/consumer-law/fdcpa/debt-collector-called-my-work", label: "Debt Collector Called Your Workplace" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
              <span className="text-blue-600 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              <span className="text-gray-800 font-medium group-hover:text-blue-600 text-sm">{link.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
