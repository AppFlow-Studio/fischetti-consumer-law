// /app/consumer-law/fdcpa/debt-collector-threatened-me/page.tsx (SERVER COMPONENT)
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Phone, AlertTriangle, ShieldAlert, Scale, Handshake, Briefcase } from "lucide-react"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import { Card } from "@/components/ui/card"
import { JsonLd } from "@/components/seo/json-ld"
import { FAQSection } from "@/components/seo/faq-section"
import { DamagesBadge } from "@/components/ui/damages-badge"
import { StatuteCallout } from "@/components/sections/StatuteCallout"
import { buildPageMeta, buildBreadcrumbSchema, buildLegalServiceSchema, buildArticleSchema, SITE_CONFIG } from "@/lib/seo"
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav"

export const metadata: Metadata = buildPageMeta({
  title: "Debt Collector Threatened You? That May Be Illegal | FL",
  description: "Debt collector threatened jail, arrest, or lawsuit in Florida? Under the FDCPA those threats may be illegal. Free case review. No fees unless we win. (561) 264-7211.",
  canonical: "https://www.consumerlawflorida.com/consumer-law/fdcpa/debt-collector-threatened-me",
  keywords: [
    "debt collector threatened me florida",
    "debt collector threatened arrest florida",
    "debt collector threatened jail",
    "illegal debt collector threats florida",
    "fdcpa threats florida attorney",
    "debt collector making false threats",
    "debt collector harassment florida lawyer",
  ],
})

const faqs = [
  {
    question: "Can a debt collector threaten to sue me?",
    answer: "Yes — but only if they actually intend to file a lawsuit and have the legal right to do so. If a collector threatens to sue as a scare tactic with no real intention of following through, that is a deceptive practice that violates the FDCPA. An empty lawsuit threat is a federal violation.",
  },
  {
    question: "What if a debt collector threatened to contact my employer?",
    answer: "Threatening to notify your employer about a personal debt is generally illegal under the FDCPA, with very narrow exceptions. Collectors may only contact third parties like employers to locate you — not to embarrass or pressure you. A threat to tell your boss about your debt is almost always a violation.",
  },
  {
    question: "What if I actually owe the debt — does that matter?",
    answer: "No — it does not matter whether you owe the money. The FDCPA violation is the illegal threat, not the underlying debt. A collector can still try to collect a legitimate debt, but they must do so without making false threats or using illegal tactics. Owing money is not a defense for collector misconduct.",
  },
  {
    question: "Is threatening to report to credit bureaus illegal?",
    answer: "Generally, no. A collector can report a legitimate debt to credit bureaus — that is a lawful collection tool. However, threatening to report false information, or reporting inaccurate information, may violate both the FDCPA and the FCRA.",
  },
  {
    question: "What if a collector threatened arrest or criminal charges for not paying a debt?",
    answer: "This is almost always illegal. You cannot be arrested for failing to pay a civil debt in the United States (with extremely limited exceptions for court orders). A collector who threatens arrest for unpaid credit card or medical debt is making a false threat — a clear FDCPA violation.",
  },
  {
    question: "Can I sue even if I can't prove what they said word for word?",
    answer: "Yes — courts understand that consumers don't write down every word of a threatening call. Your contemporaneous notes, voicemails, and consistent testimony are all admissible. You don't need a recording. What matters is a credible account supported by whatever documentation you do have.",
  },
]

const breadcrumb = [
  { name: "Home", url: SITE_CONFIG.url },
  { name: "Consumer Law", url: `${SITE_CONFIG.url}/consumer-law` },
  { name: "FDCPA", url: `${SITE_CONFIG.url}/consumer-law/fdcpa` },
  { name: "Debt Collector Threatened Me", url: `${SITE_CONFIG.url}/consumer-law/fdcpa/debt-collector-threatened-me` },
]

const illegalThreats = [
  { threat: "Threatening arrest for a civil debt", note: "You cannot be arrested for unpaid credit card, medical, or personal debt" },
  { threat: "Threatening jail time for not paying", note: "Debtor's prison was abolished. This is almost always a false threat." },
  { threat: "Threatening to file a lawsuit they have no intention of filing", note: "Empty lawsuit threats are deceptive under § 1692e" },
  { threat: "Threatening to seize property without legal authority", note: "Collectors cannot take property without a court judgment" },
  { threat: "Threatening to contact your employer to embarrass you", note: "Using your job as leverage is generally illegal" },
  { threat: "Threatening criminal prosecution for a personal debt", note: "Unpaid civil debt is not a criminal matter" },
  { threat: "Threatening to garnish wages without a court order", note: "Wage garnishment requires a court judgment — not just a threat" },
  { threat: "Threatening to report false or inflated amounts to credit bureaus", note: "Reporting accurate negative information is lawful; false information is not" },
]

const allowedVsIllegal = [
  { allowed: "State the amount actually owed", illegal: "Add fees or interest not authorized by the original contract" },
  { allowed: "Tell you they may file a lawsuit — if true", illegal: "Threaten lawsuits they have no intention of filing" },
  { allowed: "Report your debt to credit bureaus", illegal: "Threaten to report false, inflated, or inaccurate amounts" },
  { allowed: "Contact you to collect the debt", illegal: "Use abusive, threatening, or profane language" },
]

export default function DebtCollectorThreatenedMePage() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <JsonLd schema={buildBreadcrumbSchema(breadcrumb)} />
      <JsonLd schema={buildLegalServiceSchema("FDCPA — Illegal Debt Collector Threats", `${SITE_CONFIG.url}/consumer-law/fdcpa/debt-collector-threatened-me`)} />
      <JsonLd schema={buildArticleSchema({
        title: "Debt Collector Threatened You in Florida — FDCPA Violations",
        description: "Florida FDCPA attorney explains which debt collector threats are illegal and how to pursue damages.",
        url: `${SITE_CONFIG.url}/consumer-law/fdcpa/debt-collector-threatened-me`,
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
            { name: "Debt Collector Threatened Me" },
          ]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <DamagesBadge type="fdcpa" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[var(--font-playfair-display)] leading-tight">
                Debt Collector Threatened You? Under Federal Law, That May Be Illegal.
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                The FDCPA prohibits debt collectors from using false, deceptive, or misleading threats to pressure consumers. Threats of arrest, jail, or lawsuits they cannot or will not file may entitle you to damages of up to <strong>$1,000</strong> — plus actual damages and attorney&apos;s fees.
              </p>
              <div className="flex flex-wrap gap-4">
                {["No fees unless we win", "Free case review", "No recording required", "Act within 1 year"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/90 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-300 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="case-review-form" className="lg:sticky lg:top-24">
              <Card className="bg-white rounded-2xl p-6 shadow-2xl">
                <p className="text-xl font-bold text-gray-900 mb-2">Tell Us What They Threatened — Free Review</p>
                <p className="text-gray-500 text-sm mb-4">We&apos;ll let you know within 24 hours if you have a claim.</p>
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

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
            What the FDCPA Says About Threats
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Section 1692e of the FDCPA prohibits debt collectors from using any false, deceptive, or misleading representation or means in connection with the collection of a debt. This is one of the broadest protections in consumer law — it covers not just outright lies, but any communication that is likely to mislead or deceive a consumer of ordinary sophistication.
          </p>
          <StatuteCallout
            citation="15 U.S.C. § 1692e — FDCPA"
            text="A debt collector may not use any false, deceptive, or misleading representation or means in connection with the collection of any debt. Without limiting the general application of the foregoing, the following conduct is a violation of this section: The false representation of the character, amount, or legal status of any debt... The threat to take any action that cannot legally be taken or that is not intended to be taken."
            label="Federal Law"
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6 flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-red-600" aria-hidden="true" />
            Threats That Are Illegal Under the FDCPA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {illegalThreats.map((item) => (
              <div key={item.threat} className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-gray-800 text-sm font-semibold">{item.threat}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
            What Collectors CAN vs. CANNOT Do
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-2 bg-[#002b60] text-white text-sm font-bold">
              <div className="px-5 py-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-300" aria-hidden="true" /> Legally Allowed
              </div>
              <div className="px-5 py-3 border-l border-white/20 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-300" aria-hidden="true" /> FDCPA Violation
              </div>
            </div>
            {allowedVsIllegal.map((row, i) => (
              <div key={i} className={`grid grid-cols-2 divide-x divide-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <div className="px-5 py-4 text-sm text-gray-700">{row.allowed}</div>
                <div className="px-5 py-4 text-sm text-red-700 font-medium">{row.illegal}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#002b60] mb-3">The Key Legal Question</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>Is the threat false or an empty bluff?</strong> If a collector threatens to do something they have no legal authority or genuine intention of doing, that is a deceptive practice under the FDCPA. The law does not require you to be emotionally destroyed by the threat — a proven false threat is sufficient for a claim.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm">
            Courts apply the &ldquo;least sophisticated consumer&rdquo; standard — meaning the threat is evaluated from the perspective of the most vulnerable person who might receive it. This is deliberately protective of consumers.
          </p>
        </section>

        <section className="bg-slate-900 border-l-4 border-red-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" aria-hidden="true" />
            Important: Florida Two-Party Consent Law
          </h2>
          <p className="text-slate-200 leading-relaxed">
            <strong className="text-white">Florida is a two-party (all-party) consent state.</strong> You generally cannot record a phone call without the other party&apos;s consent. Do not record debt collector calls without first getting legal advice on Florida&apos;s wiretapping laws (Florida Statute § 934.03). However, you do <strong className="text-white">NOT</strong> need a recording to win an FDCPA case — contemporaneous written notes, voicemails left by the collector, and your own consistent testimony are all legitimate evidence.
          </p>
        </section>

        <section
          className="rounded-2xl p-8"
          style={{ backgroundImage: "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)" }}
        >
          <h2 className="text-2xl font-bold text-white font-[var(--font-playfair-display)] mb-6">
            What You May Be Owed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { amount: "Up to $1,000", label: "Statutory damages per lawsuit", icon: Scale },
              { amount: "Actual damages", label: "Anxiety, emotional distress, lost time", icon: Briefcase },
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
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
            Evidence That Helps Your Case
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { item: "Voicemails from the collector (save them now)", note: "Often contains the exact threatening language" },
              { item: "Written notes made immediately after the call", note: "Include exact words used, date, time, who called" },
              { item: "Letters or emails containing threatening language", note: "Written threats are especially clear violations" },
              { item: "Name and company of the debt collector", note: "Required to identify the defendant" },
              { item: "Dates and times of each threatening communication", note: "Establishes a pattern and timeline" },
              { item: "Any witnesses who heard the call or saw your reaction", note: "Corroborates actual distress damages" },
            ].map((row) => (
              <div key={row.item} className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-gray-700 text-sm font-medium">{row.item}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{row.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-[#002b60] rounded-2xl p-8 text-center">
          <p className="text-2xl font-bold text-white mb-3">Were You Threatened? Let&apos;s Evaluate Your Claim.</p>
          <p className="text-blue-200 mb-6">Free case review. No fees unless we win. Response within 24 hours.</p>
          <a
            href="#case-review-form"
            className="inline-flex items-center justify-center gap-2 bg-[#007BFF] hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
          >
            Get My Free Case Review
          </a>
        </div>
      </div>

      <FAQSection faqs={faqs} title="Questions About Illegal Debt Collector Threats" />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">Related FDCPA Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: "/consumer-law/fdcpa", label: "FDCPA — Full Overview of Your Rights" },
            { href: "/consumer-law/fdcpa/debt-collector-keeps-calling", label: "Debt Collector Won't Stop Calling" },
            { href: "/consumer-law/fdcpa/debt-collector-called-my-work", label: "Debt Collector Called Your Workplace" },
            { href: "/consumer-law/fdcpa/debt-collector-called-after-9pm", label: "Debt Collector Called After 9 PM" },
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
