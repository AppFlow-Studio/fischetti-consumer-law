// /app/consumer-law/tcpa/texted-stop-still-getting-texts/page.tsx (SERVER COMPONENT)
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Phone, Camera, Smartphone, X, Handshake } from "lucide-react"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import { Card } from "@/components/ui/card"
import { JsonLd } from "@/components/seo/json-ld"
import { FAQSection } from "@/components/seo/faq-section"
import { DamagesBadge } from "@/components/ui/damages-badge"
import { StatuteCallout } from "@/components/sections/StatuteCallout"
import { PhoneMockup } from "@/components/sections/PhoneMockup"
import { buildPageMeta, buildBreadcrumbSchema, buildLegalServiceSchema, buildArticleSchema, SITE_CONFIG } from "@/lib/seo"
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav"

export const metadata: Metadata = buildPageMeta({
  title: "Texted STOP Still Getting Texts? TCPA Claim Florida",
  description: "Texted STOP and the company kept texting you in Florida? Each text after STOP may be worth $500–$1,500 under the TCPA. Free case review. (561) 264-7211.",
  canonical: "https://www.consumerlawflorida.com/consumer-law/tcpa/texted-stop-still-getting-texts",
  keywords: [
    "texted stop still getting texts florida",
    "company keeps texting after stop florida",
    "stop request ignored tcpa florida",
    "revoked consent spam texts florida",
    "opted out still getting texts florida",
    "tcpa opt out violation florida attorney",
  ],
})

const faqs = [
  {
    question: "Is texting STOP a legally recognized opt-out?",
    answer: "Yes — texting STOP is one of the clearest, most recognized methods of revoking consent under the TCPA. The FCC has confirmed that consumers may revoke consent through any reasonable means, and STOP is specifically recognized as an unambiguous opt-out signal. A company that continues texting after receiving STOP has violated the TCPA.",
  },
  {
    question: "How long does a company have to process my STOP request?",
    answer: "The FCC has said that opt-out requests should be honored within a reasonable timeframe — which for text campaigns generally means immediately or within one to two business days at most. A text received a week after you sent STOP is almost certainly a violation.",
  },
  {
    question: "What if the company says my STOP message wasn't received?",
    answer: "That is their problem to sort out, not yours. If you sent STOP and have a screenshot proving it, the burden shifts to the company to explain why the texts continued. Companies that run compliant SMS programs are required to have reliable opt-out processing systems.",
  },
  {
    question: "What if I texted STOP to a shortcode — does that count?",
    answer: "Yes — texting STOP to a 5 or 6-digit shortcode is a recognized opt-out method. Shortcodes are commonly used for SMS marketing, and the STOP command is specifically designed to work with them. Save your screenshot showing the shortcode number and your STOP reply.",
  },
  {
    question: "Do I have a stronger case if I received many texts after STOP?",
    answer: "Yes — each text after your STOP request is a separate TCPA violation. More texts means more violations and potentially more recovery. One text is worth up to $1,500. Ten texts may be worth up to $15,000. If you saved your message thread, you can count the exact number of violations.",
  },
  {
    question: "What if the company sends a final text confirming my opt-out, then continues texting?",
    answer: "A confirmation text acknowledging your opt-out is allowed by the FCC (one message only). But if texts continue after that confirmation, every subsequent text is a clear violation — especially since they confirmed they received your STOP.",
  },
]

const breadcrumb = [
  { name: "Home", url: SITE_CONFIG.url },
  { name: "Consumer Law", url: `${SITE_CONFIG.url}/consumer-law` },
  { name: "TCPA", url: `${SITE_CONFIG.url}/consumer-law/tcpa` },
  { name: "Texted STOP Still Getting Texts", url: `${SITE_CONFIG.url}/consumer-law/tcpa/texted-stop-still-getting-texts` },
]

const phoneMockupMessages = [
  { text: "EXCLUSIVE OFFER: Save 20% today only! Shop now at promo-deals.com", side: "left" as const, timestamp: "Mon 11:23 AM" },
  { text: "Don't miss our Flash Sale — 48 hours only! Click here", side: "left" as const, timestamp: "Tue 2:04 PM" },
  { text: "STOP", side: "right" as const, highlight: true, timestamp: "Tue 3:15 PM" },
  { text: "LIMITED TIME: Your exclusive deal expires tonight!", side: "left" as const, highlight: true, timestamp: "Tue 6:42 PM" },
  { text: "Last chance! Your special offer ends at midnight", side: "left" as const, highlight: true, timestamp: "Wed 9:18 AM" },
]

export default function TextedStopStillGettingTextsPage() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <JsonLd schema={buildBreadcrumbSchema(breadcrumb)} />
      <JsonLd schema={buildLegalServiceSchema("TCPA — Ignored STOP Request Violations", `${SITE_CONFIG.url}/consumer-law/tcpa/texted-stop-still-getting-texts`)} />
      <JsonLd schema={buildArticleSchema({
        title: "Texted STOP but Still Getting Texts — TCPA Claim Florida",
        description: "Florida TCPA attorney explains why ignored STOP requests are federal violations worth $500–$1,500 per text.",
        url: `${SITE_CONFIG.url}/consumer-law/tcpa/texted-stop-still-getting-texts`,
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
            { name: "Texted STOP — Still Getting Texts" },
          ]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <DamagesBadge type="tcpa" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[var(--font-playfair-display)] leading-tight">
                You Texted STOP. They Kept Texting. Every Text After That May Be Worth $500–$1,500.
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                Texting STOP is a legally recognized, FCC-confirmed method of revoking consent. Every text you received after that may be a separate TCPA violation — <strong>no proof of financial harm required.</strong>
              </p>
              <div className="flex flex-wrap gap-4">
                {["No fees unless we win", "Free case review", "Each text = separate violation", "$500–$1,500 per text"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/90 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-300 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="case-review-form" className="lg:sticky lg:top-24">
              <Card className="bg-white rounded-2xl p-6 shadow-2xl">
                <p className="text-xl font-bold text-gray-900 mb-2">Show Us Your Screenshots — Free Review In 24 Hours</p>
                <p className="text-gray-500 text-sm mb-4">Describe what happened and when you sent STOP.</p>
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

        {/* Phone mockup visual */}
        <PhoneMockup
          messages={phoneMockupMessages}
          senderName="PROMO-DEALS 74121"
          title="This Is What a TCPA Violation Looks Like"
          subtitle="Every text received after your STOP message is a separate federal violation. Each one is worth $500–$1,500."
        />

        {/* What the law says */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
            What Federal Law Says About STOP Requests
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            When you text STOP, the company is legally required to honor it immediately. The Federal Communications Commission (FCC) has confirmed that consumers may revoke consent at any time through any reasonable means — and texting STOP is the most explicit, unambiguous opt-out possible.
          </p>
          <StatuteCallout
            citation="FCC Declaratory Ruling, CG Docket No. 02-278 (2015)"
            text="Consumers have the right to revoke their prior express consent at any time and through any reasonable means. A consumer may orally revoke consent during a call, send a letter, use a standard opt-out mechanism such as 'STOP', or use any other reasonable means. Companies must honor opt-out requests immediately."
            label="FCC Ruling"
          />
          <p className="text-gray-700 leading-relaxed mt-6">
            Companies that run compliant SMS programs must have opt-out systems that work reliably. &ldquo;Our system had a glitch&rdquo; is not a valid legal defense when you sent STOP and continued receiving texts.
          </p>
        </section>

        {/* Every text after STOP */}
        <section className="bg-[#252932] border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Every Text After STOP Is a Separate Federal Violation</h2>
          <p className="text-blue-100 leading-relaxed mb-6">
            This is not one claim — it could be many. Each text you received after sending STOP is potentially a <strong className="text-white">separate $500–$1,500 violation.</strong> Count your texts carefully.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { texts: "1 text", value: "Up to $1,500" },
              { texts: "5 texts", value: "Up to $7,500" },
              { texts: "10 texts", value: "Up to $15,000" },
              { texts: "20 texts", value: "Up to $30,000" },
            ].map((item) => (
              <div key={item.texts} className="bg-white/10 rounded-xl p-4 border border-white/10 text-center shadow-sm">
                <div className="font-bold text-blue-200 text-sm mb-1">{item.texts} after STOP</div>
                <div className="text-white font-bold text-lg">{item.value}</div>
              </div>
            ))}
          </div>
          <p className="text-blue-300 text-xs mt-3">Based on $1,500 per willful violation. Each text counted separately. Results may vary.</p>
        </section>

        {/* Screenshot Guide */}
        <section>
          <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-4 flex items-center gap-3">
            <Camera className="w-7 h-7 text-blue-600" aria-hidden="true" />
            How to Screenshot Your Evidence Right Now
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Your screenshot is the single most important piece of evidence in a STOP request violation case. Here&apos;s exactly what you need to capture — do this before your message thread scrolls away:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { step: "Open the full text thread — scroll up to find your STOP reply", critical: true },
              { step: "The screenshot must show the sender's name or number at the top", critical: true },
              { step: "It must include your 'STOP' message and the exact date you sent it", critical: true },
              { step: "It must clearly show texts that arrived AFTER your STOP message", critical: true },
              { step: "Make sure timestamps are visible on every message", critical: false },
              { step: "Save these screenshots to multiple locations immediately", critical: false },
            ].map((item) => (
              <div key={item.step} className={`flex items-start gap-3 p-4 rounded-xl border ${item.critical ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}>
                <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${item.critical ? "text-blue-600" : "text-gray-400"}`} aria-hidden="true" />
                <div>
                  <span className="text-gray-800 text-sm">{item.step}</span>
                  {item.critical && <span className="block text-xs text-blue-700 font-semibold mt-0.5">Critical evidence</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Damages */}
        <section
          className="rounded-2xl p-8"
          style={{ backgroundImage: "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)" }}
        >
          <h2 className="text-2xl font-bold text-white font-[var(--font-playfair-display)] mb-6">
            What You May Be Owed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { amount: "$500–$1,500", label: "Per text received after your STOP", icon: Smartphone },
              { amount: "× every text", label: "Each text is a separate violation — they stack", icon: X },
              { amount: "No win, no fee", label: "We work on contingency — you pay nothing unless we win", icon: Handshake },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10">
                <div className="flex justify-center mb-2">
                  <item.icon className="w-8 h-8 text-blue-300" />
                </div>
                <div className="text-xl font-bold text-white mb-1">{item.amount}</div>
                <div className="text-white/80 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <p className="text-white font-semibold mb-1">No proof of financial harm required.</p>
            <p className="text-blue-200 text-sm">The TCPA provides statutory damages specifically so you can recover without proving out-of-pocket losses. The ignored opt-out is the violation the law was written to address.</p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#002b60] rounded-2xl p-8 text-center">
          <p className="text-2xl font-bold text-white mb-3">You Texted STOP. Now Let Us Make Them Pay.</p>
          <p className="text-blue-200 mb-6">Count your texts. Each one after STOP could be worth $1,500. Free review — 24 hours.</p>
          <a
            href="#case-review-form"
            className="inline-flex items-center justify-center gap-2 bg-[#007BFF] hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
          >
            Get My Free Case Review
          </a>
        </div>
      </div>

      <FAQSection faqs={faqs} title="Ignored STOP Request — Common Questions" />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">Related TCPA Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: "/consumer-law/tcpa", label: "TCPA — Full Overview of Your Rights" },
            { href: "/consumer-law/tcpa/spam-texts-florida", label: "Spam Texts in Florida" },
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
