// /app/consumer-law/fdcpa/debt-collector-keeps-calling/page.tsx (SERVER COMPONENT)
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Phone, ShieldCheck, FileText, Clock, Scale, Handshake, HeartCrack } from "lucide-react"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import { Card } from "@/components/ui/card"
import { JsonLd } from "@/components/seo/json-ld"
import { FAQSection } from "@/components/seo/faq-section"
import { DamagesBadge } from "@/components/ui/damages-badge"
import { StatuteCallout } from "@/components/sections/StatuteCallout"
import { ViolationTimeline } from "@/components/sections/ViolationTimeline"
import { buildPageMeta, buildBreadcrumbSchema, buildLegalServiceSchema, buildArticleSchema, SITE_CONFIG } from "@/lib/seo"
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav"

export const metadata: Metadata = buildPageMeta({
  title: "Debt Collector Won't Stop Calling — FDCPA Florida",
  description: "Debt collector won't stop calling after a cease request? That's an FDCPA violation worth up to $1,000. Free case review. No fees unless we win.",
  canonical: "https://www.consumerlawflorida.com/consumer-law/fdcpa/debt-collector-keeps-calling",
  keywords: [
    "debt collector keeps calling after i told them to stop",
    "cease and desist debt collector florida",
    "debt collector won't stop calling",
    "fdcpa cease request",
    "debt collector harassment florida",
    "stop debt collector calls florida",
    "fdcpa violation florida attorney",
  ],
})

const faqs = [
  {
    question: "Does my stop request have to be in writing?",
    answer: "No — a verbal cease request counts under the FDCPA. However, written requests are much easier to prove. If you send a cease-and-desist letter by certified mail, you have documentation of when the collector received it, making any calls after that date clear violations.",
  },
  {
    question: "What if they call from different phone numbers after I told them to stop?",
    answer: "It still counts as a violation. The FDCPA prohibits contact after a cease request regardless of what number the collector uses. Multiple calls from different numbers may actually demonstrate willful violations, which can increase damages.",
  },
  {
    question: "Can I sue if I actually owe the debt?",
    answer: "Yes — absolutely. The FDCPA violation is the continued calling after you requested they stop, not the underlying debt. Owing money does not give a collector the right to harass you. You can have a valid FDCPA claim even if the debt is legitimate.",
  },
  {
    question: "What evidence do I need to build a case?",
    answer: "Call logs from your phone showing dates and times, voicemails, any text messages, screenshots, and any record of when you made your stop request. If you sent a written cease letter, keep a copy and proof of delivery. Even a handwritten note of the date you verbally told them to stop is helpful.",
  },
  {
    question: "How long do I have to file an FDCPA lawsuit?",
    answer: "One year from the date of the violation. This means one year from the date of the illegal calls after your cease request. If you believe your rights were violated, it is important to speak with an attorney promptly to preserve your claim.",
  },
  {
    question: "Can the debt collector take any action after my cease request?",
    answer: "Under the FDCPA, after a cease request a collector may only (1) acknowledge the request and state they are stopping, or (2) notify you of a specific action they intend to take, like filing a lawsuit. Any call beyond those two narrow purposes is a violation.",
  },
]

const breadcrumb = [
  { name: "Home", url: SITE_CONFIG.url },
  { name: "Consumer Law", url: `${SITE_CONFIG.url}/consumer-law` },
  { name: "FDCPA", url: `${SITE_CONFIG.url}/consumer-law/fdcpa` },
  { name: "Debt Collector Keeps Calling", url: `${SITE_CONFIG.url}/consumer-law/fdcpa/debt-collector-keeps-calling` },
]

const timelineSteps = [
  {
    step: "1",
    title: "You Tell Them to Stop",
    body: "Verbal or written — the moment you request a debt collector stop contacting you, the clock starts. Document the exact date and time if possible.",
    color: "blue" as const,
  },
  {
    step: "2",
    title: "They're Legally Required to Stop",
    body: "15 U.S.C. § 1692c(c) is clear: after a cease request, a collector may only contact you to confirm they're stopping, or to notify you of a specific legal action. Any other call is a federal violation.",
    color: "amber" as const,
  },
  {
    step: "3",
    title: "Each Call After Is a Separate Violation",
    body: "Three calls after your cease request = three FDCPA violations. Each can carry up to $1,000 in statutory damages. The violations stack.",
    color: "blue" as const,
  },
  {
    step: "4",
    title: "You File a Claim — We Handle Everything",
    body: "Consumer Law Florida evaluates your case for free. If we take it, we pursue statutory damages, actual damages, and attorney's fees — you pay nothing unless we win.",
    color: "green" as const,
  },
]

const caseStrengthFactors = [
  { factor: "Written cease-and-desist letter sent", strength: "Very Strong", color: "green" },
  { factor: "Certified mail with delivery confirmation", strength: "Very Strong", color: "green" },
  { factor: "Verbal cease request (with dated note)", strength: "Strong", color: "blue" },
  { factor: "Multiple calls from different numbers", strength: "Strong", color: "blue" },
  { factor: "Calls within days of cease request", strength: "Strong", color: "blue" },
  { factor: "Voicemails after cease request", strength: "Very Strong", color: "green" },
]

export default function DebtCollectorKeepsCallingPage() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <JsonLd schema={buildBreadcrumbSchema(breadcrumb)} />
      <JsonLd schema={buildLegalServiceSchema("FDCPA — Debt Collector Cease Request Violations", `${SITE_CONFIG.url}/consumer-law/fdcpa/debt-collector-keeps-calling`)} />
      <JsonLd schema={buildArticleSchema({
        title: "Debt Collector Won't Stop Calling After You Said Stop — FDCPA Violation Florida",
        description: "Florida FDCPA attorney explains your right to stop debt collector calls and what to do when a collector keeps calling after a cease request.",
        url: `${SITE_CONFIG.url}/consumer-law/fdcpa/debt-collector-keeps-calling`,
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
            { name: "Debt Collector Keeps Calling" },
          ]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <DamagesBadge type="fdcpa" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[var(--font-playfair-display)] leading-tight">
                Debt Collector Won&apos;t Stop Calling After You Asked Them To? That&apos;s a Federal Violation.
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                Under the FDCPA, you have the right to demand a debt collector stop contacting you — and they <strong>must comply.</strong> You told them to stop. They kept calling. That&apos;s not just annoying — it&apos;s illegal, and you may be owed money.
              </p>
              <div className="flex flex-wrap gap-4">
                {["No fees unless we win", "Free case review", "Available 24/7", "1-year deadline — act now"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/90 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-300 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="case-review-form" className="lg:sticky lg:top-24">
              <Card className="bg-white rounded-2xl p-6 shadow-2xl">
                <p className="text-xl font-bold text-gray-900 mb-2">Tell Us What&apos;s Happening — Free Review</p>
                <p className="text-gray-500 text-sm mb-4">We&apos;ll get back to you within 24 hours. Urgent? Call us now.</p>
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

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Statute */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
            Your Legal Right to Stop Debt Collector Calls
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Under the Fair Debt Collection Practices Act (FDCPA), you have an absolute right to demand that a debt collector stop contacting you. Once you make a cease-and-desist request — verbally or in writing — the collector is legally required to stop. Period. There are only two narrow exceptions allowed by law.
          </p>
          <StatuteCallout
            citation="15 U.S.C. § 1692c(c) — FDCPA"
            text="If a consumer notifies a debt collector in writing that the consumer refuses to pay a debt or that the consumer wishes the debt collector to cease further communication with the consumer, the debt collector shall not communicate further with the consumer with respect to such debt."
            label="Federal Law"
          />
          <p className="text-gray-700 leading-relaxed mt-6">
            The two narrow exceptions: the collector may contact you once to confirm they are stopping, or to notify you of a specific legal action they actually intend to take (like filing a lawsuit). Any contact beyond those is a federal violation — regardless of whether you owe the debt.
          </p>
        </section>

        {/* One Call After = Violation */}
        <section className="bg-[#252932] border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-300" aria-hidden="true" />
            How Many Calls Does It Take?
          </h2>
          <p className="text-blue-100 leading-relaxed">
            <strong className="text-white">Even one call after a cease request may be a violation.</strong> You do not need to document dozens of calls. A single contact after you asked them to stop can entitle you to statutory damages of up to $1,000 per lawsuit, plus actual damages (emotional distress, lost time) and attorney&apos;s fees — meaning our representation typically costs you nothing out of pocket.
          </p>
        </section>

        {/* Timeline */}
        <ViolationTimeline
          title="From Violation to Recovery — How This Works"
          steps={timelineSteps}
        />

        {/* Damages */}
        <section
          className="rounded-2xl p-8"
          style={{ backgroundImage: "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)" }}
        >
          <h2 className="text-2xl font-bold text-white font-[var(--font-playfair-display)] mb-6">
            What You May Be Owed Under the FDCPA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { amount: "Up to $1,000", label: "Statutory damages per lawsuit", icon: Scale },
              { amount: "Actual damages", label: "Emotional distress, lost time, anxiety", icon: HeartCrack },
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
            <p className="text-white font-semibold mb-1">You do NOT need to prove financial harm.</p>
            <p className="text-blue-200 text-sm">The FDCPA provides statutory damages specifically so consumers can recover without proving out-of-pocket losses. The violation itself is the harm the law recognizes.</p>
          </div>
        </section>

        {/* Evidence Checklist */}
        <section>
          <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" aria-hidden="true" />
            Evidence That Strengthens Your Case
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              "Call logs showing dates and times of calls",
              "Voicemails from the collector after your request",
              "Text messages",
              "Screenshots of missed or blocked calls",
              "Date and time you made your stop request",
              "Any written cease-and-desist letter you sent",
              "Certified mail receipt if you sent a letter",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* Case strength table */}
          <h3 className="text-lg font-bold text-[#002b60] mb-4">Case Strength by Evidence Type</h3>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-[#002b60] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Evidence You Have</th>
                  <th className="text-left px-4 py-3 font-semibold">Case Strength</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {caseStrengthFactors.map((row, i) => (
                  <tr key={row.factor} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 text-gray-700">{row.factor}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        row.color === "green" ? "bg-blue-100 text-blue-800" : "bg-blue-50 text-blue-700"
                      }`}>
                        <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                        {row.strength}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Send Cease Letter */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#002b60] mb-4">How to Send a Proper Cease-and-Desist Letter</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The strongest evidence you can have is a written cease-and-desist letter sent by <strong>USPS Certified Mail with Return Receipt Requested</strong>. This creates a legally defensible record that the collector received your request on a specific date. Every call after that date is a clean violation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: "1", text: "Write a short letter stating you demand the collector stop all contact" },
              { step: "2", text: "Send via USPS Certified Mail — request Return Receipt" },
              { step: "3", text: "Keep the receipt and any tracking confirmation showing delivery" },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-4 border border-blue-100">
                <div className="text-xl font-bold text-blue-600 mb-2">{item.step}</div>
                <p className="text-gray-700 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xs mt-4">
            You do not need an attorney to send a cease-and-desist letter. However, if you already have evidence of violations, contact us first — we can advise you on the best strategy.
          </p>
        </section>
      </div>

      <FAQSection faqs={faqs} title="Common Questions About FDCPA Cease Requests" />

      {/* CTA + Internal Links */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        {/* Mid-page CTA */}
        <div className="bg-[#002b60] rounded-2xl p-8 text-center">
          <p className="text-2xl font-bold text-white mb-3">Ready to Make Them Stop — and Get Paid?</p>
          <p className="text-blue-200 mb-6">Free case review. No fees unless we win. (561) 264-7211.</p>
          <a
            href="#case-review-form"
            className="inline-flex items-center justify-center gap-2 bg-[#007BFF] hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
          >
            Get My Free Case Review
          </a>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">Related FDCPA Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/consumer-law/fdcpa", label: "FDCPA — Full Overview of Your Rights" },
              { href: "/consumer-law/fdcpa/debt-collector-called-after-9pm", label: "Debt Collector Called After 9 PM" },
              { href: "/consumer-law/fdcpa/debt-collector-threatened-me", label: "Debt Collector Threatened You" },
              { href: "/consumer-law/fdcpa/debt-collector-called-my-work", label: "Debt Collector Called Your Workplace" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                <span className="text-gray-800 font-medium group-hover:text-blue-600 text-sm">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
