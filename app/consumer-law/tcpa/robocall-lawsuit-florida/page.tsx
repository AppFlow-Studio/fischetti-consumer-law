// /app/consumer-law/tcpa/robocall-lawsuit-florida/page.tsx (SERVER COMPONENT)
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Phone, PhoneOff, Scale, Handshake, Zap } from "lucide-react"
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
  title: "Robocall Lawsuit Florida — Sue for Up to $1,500 Per Illegal Call",
  description: "Illegal robocalls in Florida? File a TCPA lawsuit. Up to $1,500 per call. Free case review. TCPA attorney with no fees unless we win. (561) 264-7211.",
  canonical: "https://www.consumerlawflorida.com/consumer-law/tcpa/robocall-lawsuit-florida",
  keywords: [
    "robocall lawsuit florida",
    "robocall attorney florida",
    "sue for robocalls florida",
    "tcpa robocall claim florida",
    "illegal robocall attorney florida",
    "autodialer lawsuit florida",
    "tcpa lawyer florida robocall",
  ],
})

const faqs = [
  {
    question: "What is an autodialer under the TCPA?",
    answer: "An autodialer is equipment that has the capacity to store or produce telephone numbers to be called using a random or sequential number generator, and to dial such numbers. This includes software-based systems used for mass marketing campaigns. If a company used an autodialer to call your cell phone without consent, each call may be worth $500–$1,500.",
  },
  {
    question: "Does the TCPA apply if I gave my number to the company?",
    answer: "Not necessarily. Prior express consent can be revoked at any time. Once you revoke consent — by telling them to stop, texting STOP, or any other clear communication — the company must honor that immediately. Every call after you revoke consent is a potential TCPA violation.",
  },
  {
    question: "What if I'm on the National Do Not Call Registry?",
    answer: "Separate DNC protections apply. If you are registered on the National Do Not Call Registry and a company continues to call you with telemarketing calls, that is a separate TCPA violation on top of autodialer restrictions. You may have multiple theories of recovery.",
  },
  {
    question: "Do I need to record the robocall to sue?",
    answer: "No — you do not need a recording. Call logs, voicemails, phone records from your carrier, and any written communication revoking consent are all sufficient to build a strong TCPA claim. Your attorney will know how to subpoena additional records if needed.",
  },
  {
    question: "How long do I have to file a TCPA lawsuit?",
    answer: "Four years in federal court. The TCPA has a longer statute of limitations than many consumer protection laws, giving you more time to act. However, it is still best to consult an attorney promptly so evidence can be preserved.",
  },
  {
    question: "What if it's a debt collector calling — not a marketer?",
    answer: "Both the TCPA and the FDCPA may apply. If a debt collector called your cell phone using an autodialer without your consent (or after you revoked consent), that call may violate both laws simultaneously, potentially entitling you to recovery under both statutes.",
  },
  {
    question: "What industries most commonly violate the TCPA with robocalls?",
    answer: "Financial services, insurance companies, mortgage lenders, healthcare providers, telecommunications companies, student loan servicers, and political campaign organizations are among the most frequent TCPA defendants. If a large company called you with a robocall or prerecorded message, there is a meaningful chance it violated the TCPA.",
  },
]

const breadcrumb = [
  { name: "Home", url: SITE_CONFIG.url },
  { name: "Consumer Law", url: `${SITE_CONFIG.url}/consumer-law` },
  { name: "TCPA", url: `${SITE_CONFIG.url}/consumer-law/tcpa` },
  { name: "Robocall Lawsuit Florida", url: `${SITE_CONFIG.url}/consumer-law/tcpa/robocall-lawsuit-florida` },
]

const timelineSteps = [
  {
    step: "1",
    title: "You Receive the Robocall or Prerecorded Message",
    body: "A company calls your cell phone using automated dialing software or plays a prerecorded message without your valid prior consent — or after you revoked consent. The violation is complete the moment the call connects.",
    color: "blue" as const,
  },
  {
    step: "2",
    title: "You Document the Evidence",
    body: "Save your call log, note the number, save any voicemail. Each call is a separate federal violation. Count every one — that number determines your potential recovery.",
    color: "amber" as const,
  },
  {
    step: "3",
    title: "We File Your TCPA Claim",
    body: "We file in federal court against the company. The TCPA is a strict liability statute — the company's intent doesn't matter. If they made the call without consent, they violated the law.",
    color: "blue" as const,
  },
  {
    step: "4",
    title: "You Recover — We Collect Our Fee From Them",
    body: "$500 per violation, up to $1,500 for willful violations. The TCPA also provides for attorney's fees. You pay nothing unless we win.",
    color: "green" as const,
  },
]

const industries = [
  "Banks & credit card companies",
  "Insurance providers",
  "Mortgage & loan servicers",
  "Healthcare & hospitals",
  "Telecom companies",
  "Debt collectors",
  "Student loan companies",
  "Real estate firms",
]

export default function RobocallLawsuitFloridaPage() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <JsonLd schema={buildBreadcrumbSchema(breadcrumb)} />
      <JsonLd schema={buildLegalServiceSchema("TCPA — Robocall Lawsuit Florida", `${SITE_CONFIG.url}/consumer-law/tcpa/robocall-lawsuit-florida`)} />
      <JsonLd schema={buildArticleSchema({
        title: "Robocall Lawsuit Florida — TCPA Claims for Illegal Robocalls",
        description: "Florida TCPA attorney explains robocall lawsuits and how to recover $500–$1,500 per illegal call.",
        url: `${SITE_CONFIG.url}/consumer-law/tcpa/robocall-lawsuit-florida`,
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
            { name: "Robocall Lawsuit Florida" },
          ]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <DamagesBadge type="tcpa" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[var(--font-playfair-display)] leading-tight">
                Illegal Robocalls in Florida — You May Be Owed Up to $1,500 Per Call
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                The Telephone Consumer Protection Act gives you the right to sue for every illegal robocall or prerecorded message to your cell phone — <strong>$500 to $1,500 per call,</strong> with no proof of financial harm required.
              </p>
              <div className="flex flex-wrap gap-4">
                {["No fees unless we win", "Free case review", "$500–$1,500 per call", "4-year statute of limitations"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/90 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-300 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="case-review-form" className="lg:sticky lg:top-24">
              <Card className="bg-white rounded-2xl p-6 shadow-2xl">
                <p className="text-xl font-bold text-gray-900 mb-2">Free TCPA Case Review — Find Out If You Have a Claim</p>
                <p className="text-gray-500 text-sm mb-4">Tell us about the calls. We&apos;ll respond within 24 hours.</p>
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

        {/* What Makes a Robocall Illegal */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
            What Makes a Robocall Illegal Under the TCPA
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Three elements must be present for a TCPA violation involving robocalls to cell phones:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { num: "1", title: "Autodialer or Prerecorded Message", desc: "The call used equipment that automatically dials from a list, or delivered a prerecorded or artificial voice message." },
              { num: "2", title: "Called Your Cell Phone", desc: "The TCPA's strongest protections apply to calls and texts to mobile phones specifically." },
              { num: "3", title: "No Valid Prior Express Consent", desc: "You never gave permission — or you gave permission and later revoked it by telling them to stop." },
            ].map((item) => (
              <div key={item.num} className="bg-blue-50 border border-blue-200 rounded-xl p-5 animate-fade-up" style={{ animationDelay: `${parseInt(item.num) * 100}ms` }}>
                <div className="text-3xl font-bold text-blue-600 mb-3">{item.num}</div>
                <div className="font-bold text-gray-900 mb-2 text-sm">{item.title}</div>
                <div className="text-gray-600 text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
          <StatuteCallout
            citation="47 U.S.C. § 227(b)(1)(A) — TCPA"
            text="It shall be unlawful for any person within the United States... to make any call (other than a call made for emergency purposes or made with the prior express consent of the called party) using any automatic telephone dialing system or an artificial or prerecorded voice... to any telephone number assigned to a paging service, cellular telephone service, specialized mobile radio service, or other radio common carrier service."
            label="Federal Law"
          />
        </section>

        {/* How Much Per Call */}
        <section
          className="rounded-2xl p-8"
          style={{ backgroundImage: "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)" }}
        >
          <h2 className="text-2xl font-bold text-white font-[var(--font-playfair-display)] mb-6">
            How Much Is Each Robocall Worth?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { amount: "$500", label: "Per call (standard TCPA violation)", icon: Phone },
              { amount: "Up to $1,500", label: "Per call if the violation was willful", icon: Zap },
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

          {/* Example calculator */}
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-white font-bold text-lg mb-4">Recovery Example</h3>
            <div className="overflow-hidden rounded-xl">
              <table className="w-full text-sm" aria-label="TCPA recovery examples by number of calls">
                <thead className="bg-white/20 text-white">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold">Illegal Calls</th>
                    <th className="text-left px-4 py-2 font-semibold">Standard ($500)</th>
                    <th className="text-left px-4 py-2 font-semibold">Willful ($1,500)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    { calls: "5 calls", std: "$2,500", willful: "$7,500" },
                    { calls: "10 calls", std: "$5,000", willful: "$15,000" },
                    { calls: "20 calls", std: "$10,000", willful: "$30,000" },
                    { calls: "50 calls", std: "$25,000", willful: "$75,000" },
                  ].map((row) => (
                    <tr key={row.calls} className="text-white/90">
                      <td className="px-4 py-2 font-medium">{row.calls}</td>
                      <td className="px-4 py-2">{row.std}</td>
                      <td className="px-4 py-2 text-blue-200 font-semibold">{row.willful}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-blue-200 text-xs mt-3">Results may vary. Each call is a separate violation. Based on statutory damages per 47 U.S.C. § 227(b)(3).</p>
          </div>
        </section>

        {/* Timeline */}
        <ViolationTimeline
          title="How a TCPA Robocall Lawsuit Works"
          steps={timelineSteps}
        />

        {/* Class Action vs Individual */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#002b60] mb-4">Individual TCPA Claim vs. Class Action — The Difference Is Enormous</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you&apos;ve ever received a class action settlement check for illegal robocalls, you may have received <strong>$30–$50</strong> — while the attorneys earned millions. That&apos;s class action economics.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-2">Class Action</p>
              <p className="text-2xl font-bold text-red-600 mb-1">$30–$50</p>
              <p className="text-gray-600 text-sm">Your share of a massive settlement split among millions of claimants</p>
            </div>
            <div className="bg-white border border-blue-300 rounded-xl p-4 ring-2 ring-blue-400">
              <p className="font-semibold text-blue-700 text-sm uppercase tracking-wide mb-2">Individual TCPA Claim</p>
              <p className="text-2xl font-bold text-blue-700 mb-1">$500–$1,500 per call</p>
              <p className="text-gray-600 text-sm">Your own attorney pursuing your individual damages — far more per person</p>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section>
          <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6 flex items-center gap-3">
            <PhoneOff className="w-6 h-6 text-blue-600" aria-hidden="true" />
            Who Commonly Violates the TCPA in Florida
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Florida consistently ranks among the top states for TCPA complaints filed with the FCC. The following industries are the most frequent defendants in TCPA lawsuits:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {industries.map((industry) => (
              <div key={industry} className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center text-sm font-medium text-[#002b60]">
                {industry}
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-4">
            Received a robocall from any of these industries? You may have a TCPA claim — even if you&apos;re a customer of theirs.
          </p>
        </section>

        {/* Evidence */}
        <section>
          <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
            Evidence to Gather Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { item: "Call logs from your phone showing dates, times, and numbers", note: "Screenshot every entry now" },
              { item: "Voicemails (save them — they prove the prerecorded message)", note: "Do not delete even after listening" },
              { item: "Phone records from your carrier", note: "Can be formally subpoenaed by your attorney" },
              { item: "Record of when and how you revoked consent", note: "STOP text, verbal request, written letter" },
              { item: "Any documentation showing you never gave consent", note: "You never signed up, never gave your number" },
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
          <p className="text-2xl font-bold text-white mb-3">Getting Robocalls? Every Call May Be Worth $1,500.</p>
          <p className="text-blue-200 mb-6">Free case review. No fees unless we win. Response within 24 hours.</p>
          <a
            href="#case-review-form"
            className="inline-flex items-center justify-center gap-2 bg-[#007BFF] hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
          >
            Get My Free Case Review
          </a>
        </div>
      </div>

      <FAQSection faqs={faqs} title="Robocall Lawsuit Florida — Common Questions" />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">Related TCPA Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: "/consumer-law/tcpa", label: "TCPA — Full Overview of Your Rights" },
            { href: "/consumer-law/tcpa/spam-texts-florida", label: "Spam Texts Florida — Up to $1,500 Per Text" },
            { href: "/consumer-law/tcpa/texted-stop-still-getting-texts", label: "Texted STOP but Still Getting Texts" },
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
