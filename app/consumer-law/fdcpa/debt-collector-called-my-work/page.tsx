// /app/consumer-law/fdcpa/debt-collector-called-my-work/page.tsx (SERVER COMPONENT)
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Phone, Briefcase, AlertTriangle, Scale, Handshake } from "lucide-react"
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
  title: "Debt Collector Called Your Job? Know Your Rights | FL",
  description: "Debt collector calling your job in Florida? If your employer prohibits calls, that's an FDCPA violation. Up to $1,000. Free case review. No fees unless we win.",
  canonical: "https://www.consumerlawflorida.com/consumer-law/fdcpa/debt-collector-called-my-work",
  keywords: [
    "debt collector called my work florida",
    "debt collector calling employer florida",
    "fdcpa workplace calls florida",
    "debt collector calling my job florida",
    "debt collector contacting employer florida",
    "fdcpa attorney workplace harassment florida",
  ],
})

const faqs = [
  {
    question: "Can a debt collector call my workplace at all?",
    answer: "Debt collectors can call your workplace under limited circumstances to locate you. However, once you tell them your employer prohibits personal calls, they must stop immediately. Additionally, if a collector knows or should know that calls to your workplace are inconvenient to you, they must stop.",
  },
  {
    question: "What if I told my employer's HR department about the calls?",
    answer: "If you reported the workplace calls to HR and then told the collector that your employer prohibits such calls, that can strengthen your case significantly. Document the date you notified HR and the date you told the collector to stop calling your workplace.",
  },
  {
    question: "Can a debt collector tell my employer or coworkers about my debt?",
    answer: "No — a debt collector generally cannot disclose to your employer or coworkers that you owe a debt. They may only contact third parties at your workplace to locate you, and even then they should not reveal that the call is related to debt collection.",
  },
  {
    question: "What evidence helps a workplace call FDCPA claim?",
    answer: "The date and time of the call to your workplace, the number the collector called from, any HR records of the call, witness statements from coworkers who witnessed the call or its aftermath, and documentation showing you told the collector to stop.",
  },
  {
    question: "Can I sue for embarrassment caused by workplace calls?",
    answer: "Yes — actual damages under the FDCPA include emotional distress, embarrassment, and reputational harm caused by illegal collection tactics. If a collector's call to your workplace caused embarrassment or damaged your reputation with your employer, that is compensable harm.",
  },
  {
    question: "Does the FDCPA protect me if I'm self-employed?",
    answer: "The FDCPA's workplace protections are specifically designed to protect consumers from harassment at the place of employment. If you are self-employed and a debt collector is contacting your business line in a harassing manner, the FDCPA still applies, though the analysis may differ slightly. Speak with an attorney.",
  },
]

const breadcrumb = [
  { name: "Home", url: SITE_CONFIG.url },
  { name: "Consumer Law", url: `${SITE_CONFIG.url}/consumer-law` },
  { name: "FDCPA", url: `${SITE_CONFIG.url}/consumer-law/fdcpa` },
  { name: "Debt Collector Called My Work", url: `${SITE_CONFIG.url}/consumer-law/fdcpa/debt-collector-called-my-work` },
]

const threeRules = [
  {
    step: "1",
    title: "Employer Prohibition Rule",
    body: "If a collector knows — or has reason to know — that your employer prohibits personal calls, they cannot call your workplace. Once you inform them of this policy, any further call is an FDCPA violation.",
    color: "blue" as const,
  },
  {
    step: "2",
    title: "Inconvenience Rule",
    body: "Even without a formal employer policy, if you tell a collector that workplace calls are inconvenient, they must stop. Your stated inconvenience is legally sufficient — you don't need a written HR policy.",
    color: "amber" as const,
  },
  {
    step: "3",
    title: "Third-Party Disclosure Rule",
    body: "When contacting your workplace, a collector cannot reveal they are calling about a debt. They may only say they are trying to reach you and give their name. Disclosing the debt to coworkers or HR is a separate violation.",
    color: "blue" as const,
  },
]

export default function DebtCollectorCalledMyWorkPage() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <JsonLd schema={buildBreadcrumbSchema(breadcrumb)} />
      <JsonLd schema={buildLegalServiceSchema("FDCPA — Debt Collector Workplace Calls", `${SITE_CONFIG.url}/consumer-law/fdcpa/debt-collector-called-my-work`)} />
      <JsonLd schema={buildArticleSchema({
        title: "Debt Collector Called Your Workplace in Florida — FDCPA Violation",
        description: "Florida FDCPA attorney explains when debt collectors cannot call your job and how to hold them accountable.",
        url: `${SITE_CONFIG.url}/consumer-law/fdcpa/debt-collector-called-my-work`,
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
            { name: "Debt Collector Called My Work" },
          ]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <DamagesBadge type="fdcpa" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[var(--font-playfair-display)] leading-tight">
                Debt Collector Called Your Workplace? Under the FDCPA, That Is Very Often Illegal in Florida.
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                Federal law places strict limits on when debt collectors can contact your employer. Once you tell them your employer prohibits personal calls, <strong>they must stop immediately.</strong> One violation after your notice could be worth up to $1,000.
              </p>
              <div className="flex flex-wrap gap-4">
                {["No fees unless we win", "Free case review", "Available 24/7", "Protect your job"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/90 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-300 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="case-review-form" className="lg:sticky lg:top-24">
              <Card className="bg-white rounded-2xl p-6 shadow-2xl">
                <p className="text-xl font-bold text-gray-900 mb-2">Tell Us What Happened — Free Review</p>
                <p className="text-gray-500 text-sm mb-4">We&apos;ll review the situation and let you know if you have a claim.</p>
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
            The FDCPA Workplace Contact Rule — What the Law Says
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Under the Fair Debt Collection Practices Act, debt collectors cannot call your workplace if they have reason to believe your employer prohibits personal calls. The law specifically protects your professional environment from being weaponized as a collection pressure tactic.
          </p>
          <StatuteCallout
            citation="15 U.S.C. § 1692c(a)(3) — FDCPA"
            text="A debt collector may not communicate with a consumer in connection with the collection of any debt... at the consumer's place of employment if the debt collector knows or has reason to know that the consumer's employer prohibits the consumer from receiving such communication."
            label="Federal Law"
          />
          <p className="text-gray-700 leading-relaxed mt-6">
            The moment you tell a collector your employer does not allow personal calls, they have &ldquo;reason to know&rdquo; — and any subsequent call to your workplace is a federal violation. You do not need a formal written policy from HR.
          </p>
        </section>

        <ViolationTimeline
          title="Three FDCPA Rules Protecting You at Work"
          steps={threeRules}
        />

        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#002b60] mb-3 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" aria-hidden="true" />
            Embarrassment at Work Is Real, Compensable Harm
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Having a debt collector call your workplace can damage your professional reputation, create awkwardness with supervisors and coworkers, put your job security at risk, and cause significant emotional distress. These are <strong>actual damages</strong> under the FDCPA — recoverable on top of statutory damages of up to $1,000.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm">
            You do not have to prove you lost your job or a promotion. Courts recognize that the chilling effect of workplace harassment — the fear, stress, and embarrassment — is a real harm the FDCPA was designed to address.
          </p>
        </section>

        <section className="bg-[#252932] border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-blue-300" aria-hidden="true" />
            Your Job and Income Are at Stake — That&apos;s Why This Law Exists
          </h2>
          <p className="text-blue-100 leading-relaxed mb-3">
            Debt collectors who call workplaces know exactly what they&apos;re doing. They are counting on the embarrassment and threat to your livelihood to pressure you into paying — regardless of whether the debt is valid or the amount is accurate. Congress recognized this tactic and made it illegal precisely because of how devastating it can be.
          </p>
          <p className="text-blue-200 leading-relaxed text-sm">
            Under the FDCPA, the collector&apos;s motive is irrelevant. If they knew or had reason to know your employer prohibits personal calls and they called anyway, the violation is complete.
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
              { amount: "Actual damages", label: "Embarrassment, emotional distress, job risk", icon: Briefcase },
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
            Evidence to Gather
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { item: "Date and time the collector called your workplace", note: "Establishes the violation occurred" },
              { item: "The phone number they called from", note: "Used to identify the collector" },
              { item: "Record of when you told them to stop calling your work", note: "Proves they had notice" },
              { item: "Any witnesses — coworkers, HR — who took or heard the call", note: "Corroborates the embarrassment and disruption" },
              { item: "Any HR communications about the call", note: "Shows workplace impact" },
              { item: "Letters or written correspondence from the collector", note: "Establishes the collector's identity" },
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
          <p className="text-2xl font-bold text-white mb-3">Protect Your Job — Review Your Claim Now.</p>
          <p className="text-blue-200 mb-6">Free case review. No fees unless we win. (561) 264-7211.</p>
          <a
            href="#case-review-form"
            className="inline-flex items-center justify-center gap-2 bg-[#007BFF] hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
          >
            Get My Free Case Review
          </a>
        </div>
      </div>

      <FAQSection faqs={faqs} title="Questions About Debt Collector Workplace Calls" />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">Related FDCPA Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: "/consumer-law/fdcpa", label: "FDCPA — Full Overview of Your Rights" },
            { href: "/consumer-law/fdcpa/debt-collector-threatened-me", label: "Debt Collector Threatened You" },
            { href: "/consumer-law/fdcpa/debt-collector-keeps-calling", label: "Debt Collector Won't Stop Calling" },
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
