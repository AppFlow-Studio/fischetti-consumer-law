// /app/consumer-law/tcpa/spam-texts-florida/page.tsx (SERVER COMPONENT)
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Phone, MessageSquare, AlertCircle, Scale, Handshake } from "lucide-react"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import { Card } from "@/components/ui/card"
import { JsonLd } from "@/components/seo/json-ld"
import { FAQSection } from "@/components/seo/faq-section"
import { DamagesBadge } from "@/components/ui/damages-badge"
import { StatuteCallout } from "@/components/sections/StatuteCallout"
import { buildPageMeta, buildBreadcrumbSchema, buildLegalServiceSchema, buildArticleSchema, SITE_CONFIG } from "@/lib/seo"
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav"

export const metadata: Metadata = buildPageMeta({
  title: "Spam Texts in Florida — TCPA Lawsuit Attorney",
  description: "Receiving illegal spam texts in Florida? You may be owed up to $1,500 per text under the TCPA. Free case review. No fees unless we win.",
  canonical: "https://www.consumerlawflorida.com/consumer-law/tcpa/spam-texts-florida",
  keywords: [
    "spam text lawyer florida",
    "sue for spam texts florida",
    "tcpa spam text claim florida",
    "spam text settlement florida",
    "illegal text message attorney florida",
    "automated text lawsuit florida",
    "marketing text violation florida",
  ],
})

const faqs = [
  {
    question: "What counts as an 'automated' text message under the TCPA?",
    answer: "An automated text is one sent using an automated telephone dialing system (ATDS) or mass SMS marketing software. This includes bulk text campaigns, drip marketing sequences, and any system that sends texts automatically from a list. If a company sent you marketing texts at scale, it was almost certainly automated.",
  },
  {
    question: "Can I sue for spam texts about a debt I owe?",
    answer: "Yes — even if you owe the debt, TCPA consent rules still apply. If a debt collector sent automated texts without your consent, or after you revoked consent, each text may be a violation. Owing money does not mean a company can send you unlimited spam texts.",
  },
  {
    question: "Does one spam text give me a claim?",
    answer: "Yes, technically. But your claim gets stronger with more texts — because each text is a separate violation. One text is worth up to $1,500. Ten texts can be worth up to $15,000. The more texts you document, the stronger your case.",
  },
  {
    question: "What if I gave my number when I signed up for a service?",
    answer: "Consent can be withdrawn at any time. Even if you originally provided your phone number when signing up for a service, you can revoke consent to receive marketing texts at any time by texting STOP or otherwise communicating that you want them to stop. Every text after that revocation is a potential violation.",
  },
  {
    question: "How do I prove I texted STOP?",
    answer: "Take a screenshot of your full text message thread showing your STOP reply AND the texts that came after it. Include the sender's number, the message content, and the timestamps. This screenshot is often the single most important piece of evidence in a spam text case.",
  },
  {
    question: "Can I sue even if the texts came from a 5 or 6-digit shortcode?",
    answer: "Yes — shortcodes are commonly used for automated SMS marketing and are a clear signal that the texts were automated. Receiving marketing texts from a shortcode without valid consent is a textbook TCPA violation. Screenshot the shortcode number and your thread.",
  },
]

const breadcrumb = [
  { name: "Home", url: SITE_CONFIG.url },
  { name: "Consumer Law", url: `${SITE_CONFIG.url}/consumer-law` },
  { name: "TCPA", url: `${SITE_CONFIG.url}/consumer-law/tcpa` },
  { name: "Spam Texts Florida", url: `${SITE_CONFIG.url}/consumer-law/tcpa/spam-texts-florida` },
]

const automatedSignals = [
  { signal: "Sent from a 5–6 digit shortcode (e.g., 74121)", explanation: "Shortcodes are exclusively used for automated mass texting" },
  { signal: "Identical promotional message sent to many people", explanation: "Mass campaigns indicate automated dialing systems" },
  { signal: "Sent outside normal business hours", explanation: "Automated systems don't sleep the way humans do" },
  { signal: "Instant reply after you text a keyword", explanation: "Human agents can't respond instantly at scale" },
  { signal: "Sent by a large company's marketing department", explanation: "No major company manually texts millions of customers" },
  { signal: "Uses opt-out language like 'Reply STOP to unsubscribe'", explanation: "Standard automated opt-out language — this is admission of automation" },
]

export default function SpamTextsFloridaPage() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <JsonLd schema={buildBreadcrumbSchema(breadcrumb)} />
      <JsonLd schema={buildLegalServiceSchema("TCPA — Spam Text Violations Florida", `${SITE_CONFIG.url}/consumer-law/tcpa/spam-texts-florida`)} />
      <JsonLd schema={buildArticleSchema({
        title: "Spam Text Lawyer Florida — TCPA Claims for Illegal Text Messages",
        description: "Florida TCPA attorney explains how to recover $500–$1,500 per illegal spam text message.",
        url: `${SITE_CONFIG.url}/consumer-law/tcpa/spam-texts-florida`,
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
            { name: "TCPA", href: "/consumer-law/tcpa" },
            { name: "Spam Texts Florida" },
          ]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <DamagesBadge type="tcpa" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[var(--font-playfair-display)] leading-tight">
                Spam Texts in Florida? You May Be Owed Up to $1,500 Per Text.
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                Under the TCPA, each illegal spam text can be worth <strong>$500–$1,500.</strong> If you received texts without consent, or after you texted STOP, you may have a federal claim — no proof of financial harm required.
              </p>
              <div className="flex flex-wrap gap-4">
                {["No fees unless we win", "Free case review", "$500–$1,500 per text", "4-year statute of limitations"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/90 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-300 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="case-review-form" className="lg:sticky lg:top-24">
              <Card className="bg-white rounded-2xl p-6 shadow-2xl">
                <p className="text-xl font-bold text-gray-900 mb-2">Free Case Review — Spam Texts</p>
                <p className="text-gray-500 text-sm mb-4">Tell us about the texts. We&apos;ll let you know if you have a claim.</p>
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

        {/* What Makes a Text Illegal */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
            What Makes a Text Message Illegal Under the TCPA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { title: "Sent using an automated system", desc: "Mass text software, SMS marketing platforms, automated drip sequences — if it was sent in bulk, it was almost certainly automated. A 5–6 digit shortcode is a near-certain indicator." },
              { title: "Without consent — or after consent was revoked", desc: "You never gave permission, or you gave it and then texted STOP or otherwise told them to stop. Revocation ends any prior consent immediately." },
            ].map((item) => (
              <div key={item.title} className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="font-bold text-[#002b60] mb-2 text-base">{item.title}</div>
                <div className="text-gray-600 text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
          <StatuteCallout
            citation="47 U.S.C. § 227(b)(1)(A)(iii) — TCPA"
            text="It shall be unlawful for any person within the United States... to make any call (other than a call made for emergency purposes or made with the prior express consent of the called party) using any automatic telephone dialing system or an artificial or prerecorded voice... to any telephone number assigned to a... cellular telephone service."
            label="Federal Law — Applies to Texts Too"
          />
          <p className="text-gray-600 text-sm mt-3">Courts have consistently held that the TCPA's restrictions on autodialers apply equally to text messages sent to cell phones.</p>
        </section>

        {/* How to Spot an Automated Text */}
        <section>
          <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-blue-600" aria-hidden="true" />
            How to Spot an Automated Text Message
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Not sure if the texts you received were automated? Look for these telltale signs — any one of them strongly suggests the texts were sent using an automated system covered by the TCPA:
          </p>
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-2 bg-[#002b60] text-white text-sm font-bold">
              <div className="px-5 py-3">Signal</div>
              <div className="px-5 py-3 border-l border-white/20">Why It Matters</div>
            </div>
            {automatedSignals.map((row, i) => (
              <div key={i} className={`grid grid-cols-2 divide-x divide-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <div className="px-5 py-4 text-sm font-medium text-gray-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {row.signal}
                </div>
                <div className="px-5 py-4 text-sm text-gray-600">{row.explanation}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Texted STOP callout */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#002b60] mb-3">Texted STOP and Still Getting Texts?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Once you text STOP, the company is legally required to honor your opt-out <strong>immediately.</strong> Every text you receive after sending STOP is a separate TCPA violation worth $500–$1,500.
          </p>
          <Link
            href="/consumer-law/tcpa/texted-stop-still-getting-texts"
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
          >
            Read: What To Do When STOP Is Ignored →
          </Link>
        </section>

        {/* Damages */}
        <section
          className="rounded-2xl p-8"
          style={{ backgroundImage: "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)" }}
        >
          <h2 className="text-2xl font-bold text-white font-[var(--font-playfair-display)] mb-6">
            What Your Spam Texts May Be Worth
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { amount: "$500", label: "Per text (Standard)", icon: MessageSquare },
              { amount: "$1,500", label: "Per text (Willful)", icon: Scale },
              { amount: "No Upfront Fee", label: "We only get paid if you win", icon: Handshake },
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
          <p className="text-blue-200 text-xs">Based on $1,500 per willful violation. Each text is a separate violation. Results may vary.</p>
        </section>

        {/* Evidence */}
        <section>
          <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
            Evidence to Screenshot Right Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { item: "Screenshot of the text thread showing sender number and content", note: "Most important evidence in a spam text case" },
              { item: "Timestamps on each text message", note: "Proves when each violation occurred" },
              { item: "Your STOP reply and any texts received after it", note: "Proves revocation and the continued violations" },
              { item: "Shortcode or full number the texts came from", note: "Identifies the TCPA defendant" },
              { item: "Any 'Reply STOP to unsubscribe' language in the texts", note: "Admission they use automated systems" },
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

        {/* CTA */}
        <div className="bg-[#002b60] rounded-2xl p-8 text-center">
          <p className="text-2xl font-bold text-white mb-3">Getting Spam Texts? Let&apos;s Count Your Violations.</p>
          <p className="text-blue-200 mb-6">Each text could be worth up to $1,500. Free review. No fees unless we win.</p>
          <a
            href="#case-review-form"
            className="inline-flex items-center justify-center gap-2 bg-[#007BFF] hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
          >
            Get My Free Case Review
          </a>
        </div>
      </div>

      <FAQSection faqs={faqs} title="Spam Text TCPA Claims — Common Questions" />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">Related TCPA Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: "/consumer-law/tcpa", label: "TCPA — Full Overview of Your Rights" },
            { href: "/consumer-law/tcpa/texted-stop-still-getting-texts", label: "Texted STOP but Still Getting Texts" },
            { href: "/consumer-law/tcpa/robocall-lawsuit-florida", label: "Robocall Lawsuit Florida" },
            { href: "/consumer-law/fdcpa", label: "FDCPA — Debt Collector Harassment" },
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
