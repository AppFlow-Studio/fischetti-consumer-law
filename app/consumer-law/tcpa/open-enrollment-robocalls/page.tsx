import type { Metadata } from "next"
import Link from "next/link"
import {
  CheckCircle,
  Phone,
  PhoneOff,
  Handshake,
  Zap,
  FileText,
  MessageSquareOff,
  ShieldOff,
  Smartphone,
  ClipboardList,
  Volume2,
  Calendar,
  ShieldCheck,
  Reply,
  type LucideIcon,
} from "lucide-react"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import { Card } from "@/components/ui/card"
import { JsonLd } from "@/components/seo/json-ld"
import { FAQSection } from "@/components/seo/faq-section"
import { DamagesBadge } from "@/components/ui/damages-badge"
import { StatuteCallout } from "@/components/sections/StatuteCallout"
import { ViolationTimeline } from "@/components/sections/ViolationTimeline"
import FreeCaseReviewDialog from "@/components/free-case-review-dialog"
import {
  buildPageMeta,
  buildBreadcrumbSchema,
  buildLegalServiceSchema,
  SITE_CONFIG,
} from "@/lib/seo"
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav"

const canonicalUrl = `${SITE_CONFIG.url}/consumer-law/tcpa/open-enrollment-robocalls`

export const metadata: Metadata = buildPageMeta({
  title: "Health Insurance Robocalls? You May Have a TCPA Claim",
  description:
    "Still getting health insurance robocalls or spam texts during Open Enrollment? Florida consumers may have TCPA claims worth $500–$1,500 per call. Free case review — no fees unless we win.",
  canonical: canonicalUrl,
  keywords: [
    "health insurance robocalls Florida",
    "open enrollment robocalls",
    "ACA robocalls lawsuit",
    "health insurance spam texts after STOP",
    "TCPA violation health insurance",
    "can I sue for health insurance robocalls",
    "unwanted health insurance calls Florida",
    "TCPA lawyer Florida",
    "how to stop health insurance calls",
    "robocall lawsuit Florida",
  ],
})

const breadcrumb = [
  { name: "Home", url: SITE_CONFIG.url },
  { name: "Consumer Law", url: `${SITE_CONFIG.url}/consumer-law` },
  { name: "TCPA", url: `${SITE_CONFIG.url}/consumer-law/tcpa` },
  { name: "Open Enrollment Robocalls", url: canonicalUrl },
]

const faqs = [
  {
    question: "Can I sue for health insurance robocalls?",
    answer:
      "You may be able to. The Telephone Consumer Protection Act (TCPA) restricts automated calls and texts made without proper consent. If a health insurance company or lead generator called or texted you using an autodialer or prerecorded message without your prior express written consent, you may have a viable TCPA claim. Each qualifying call or text may represent a separate violation worth $500 or more.",
  },
  {
    question: "What if I replied STOP and am still getting health insurance texts?",
    answer:
      "Under the TCPA, companies must honor opt-out requests immediately. If you replied STOP and continued receiving texts, that may constitute additional violations — potentially $500 to $1,500 per text — depending on whether the violations were willful. Document all texts received after your opt-out reply.",
  },
  {
    question: "How do I know if health insurance calls were made with an autodialer?",
    answer:
      "Signs of autodialer use include: a brief pause or click before a live agent speaks, an obviously prerecorded message, calls from rotating or spoofed numbers, calls that hang up immediately if you don't press a button, or receiving dozens of similar calls in a short period. You don't need to prove the technology definitively — an attorney can investigate this.",
  },
  {
    question: "Do I need to know the company name to file a TCPA claim?",
    answer:
      "Not necessarily. Having the phone number, date, time, voicemail, or screenshot of the call or text is often enough to start. An attorney can frequently identify the responsible company or lead generator through investigation even when the caller ID shows an unfamiliar number.",
  },
  {
    question: "What evidence should I save for a health insurance robocall case?",
    answer:
      "Save screenshots of text messages, your phone call log showing repeated calls, any voicemails, screenshots showing your STOP reply and subsequent contact, caller ID information or phone numbers, and dates and times of all contact. The more documentation you have, the stronger your potential case.",
  },
  {
    question: "How much can I recover for TCPA violations?",
    answer:
      "The TCPA provides for statutory damages of $500 per violation for standard violations and up to $1,500 per violation if the court finds the violation was willful or knowing. Since many consumers receive multiple calls or texts, total recoverable damages can be significant. Results vary by case and no outcome is guaranteed.",
  },
  {
    question: "Is this page about enrolling in health insurance?",
    answer:
      "No. This page is for Florida consumers receiving unwanted health insurance robocalls or spam texts — especially during Open Enrollment — who want to understand whether they have a legal claim under the TCPA. If you are looking for health insurance enrollment help, this is not the right resource.",
  },
  {
    question: "Does Consumer Law Florida handle TCPA cases statewide in Florida?",
    answer:
      "Yes. We represent clients across Florida through phone and video consultations — Miami, Orlando, Tampa, Fort Lauderdale, West Palm Beach, Jacksonville, and everywhere in between. You do not need to visit an office.",
  },
]

const timelineSteps = [
  {
    step: "1",
    title: "You Receive Repeated Health Insurance Robocalls or Spam Texts",
    body: "A company — or a lead generator acting on its behalf — contacts your cell phone using automated dialing technology or sends prerecorded messages without your prior express written consent. The TCPA violation is complete the moment each unwanted call or text is placed.",
    color: "amber" as const,
  },
  {
    step: "2",
    title: "You Document the Evidence",
    body: "Screenshot your call log, text conversations, and any STOP replies. Save voicemails. Note the phone numbers and dates. Each call or text is a separate federal violation — your documentation determines your potential recovery.",
    color: "blue" as const,
  },
  {
    step: "3",
    title: "We Evaluate Your TCPA Claim — Free",
    body: "You tell us what happened. We review the facts, identify the responsible party, and assess whether your situation qualifies. No charge, no obligation. Most reviews are completed within 24 hours.",
    color: "blue" as const,
  },
  {
    step: "4",
    title: "We File Your Claim — You Pay Nothing Unless We Win",
    body: "We pursue the company in federal court. The TCPA is a strict liability statute — intent doesn't matter. If they called or texted without consent, they violated the law. $500 to $1,500 per violation. Our fee comes only from what we recover.",
    color: "green" as const,
  },
]

const violationTypes = [
  {
    Icon: PhoneOff,
    title: "Autodialed Calls Without Prior Written Consent",
    body: "The TCPA requires companies to obtain your prior express written consent before placing automated calls to your cell phone. Many health insurance lead generators skip this step and blast your number from a purchased list.",
  },
  {
    Icon: FileText,
    title: "Prerecorded or Artificial Voice Messages",
    body: "Leaving a prerecorded sales message on your cell phone — even if you answered and hung up — may violate the TCPA if proper consent was never obtained for that specific company.",
  },
  {
    Icon: MessageSquareOff,
    title: "Calls or Texts After You Replied STOP",
    body: "Once you opt out, companies are legally required to stop immediately. Each call or text received after a valid STOP request may count as an additional, separate violation worth $500 to $1,500.",
  },
  {
    Icon: ShieldOff,
    title: "Calls to Numbers on the Do Not Call Registry",
    body: "If your number is on the National Do Not Call Registry and you received unsolicited marketing calls, additional TCPA violations may apply — on top of the autodialer restrictions.",
  },
]

const evidenceItems: { Icon: LucideIcon; label: string; note: string }[] = [
  { Icon: Smartphone, label: "Text screenshots", note: "Include your STOP reply and any messages after it" },
  { Icon: ClipboardList, label: "Call log screenshots", note: "Dates, times, and phone numbers of repeated calls" },
  { Icon: Volume2, label: "Voicemails", note: "Screenshot the notification if the message was deleted" },
  { Icon: Phone, label: "Caller ID information", note: "Phone numbers, even if spoofed or unfamiliar" },
  { Icon: Calendar, label: "Dates and times", note: "Write them down if you can't screenshot everything" },
  { Icon: Reply, label: "STOP reply proof", note: "Date you sent it and any contact that followed" },
  { Icon: ShieldCheck, label: "DNC registration", note: "Screenshot or printout if your number is registered" },
]

const forYouItems = [
  "You received repeated health insurance sales calls you never requested.",
  "You got spam texts about ACA or Open Enrollment plans.",
  "You replied STOP, QUIT, or CANCEL — but messages continued.",
  "You never gave the company or lead generator written permission to contact you.",
  "You are on the Do Not Call Registry and still received telemarketing calls.",
  "You received prerecorded or automated calls to your cell phone.",
  "You have screenshots, call logs, voicemails, or caller IDs you can share.",
]

export default function OpenEnrollmentRobocallsPage() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <JsonLd schema={buildBreadcrumbSchema(breadcrumb)} />
      <JsonLd
        schema={buildLegalServiceSchema(
          "Florida Health Insurance Robocall and Spam Text TCPA Claims",
          canonicalUrl
        )}
      />

      {/* Hero */}
      <section
        className="w-full pt-20 lg:pt-28 pb-16 px-4 sm:px-6"
        style={{
          backgroundImage:
            "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <BreadcrumbNav
            items={[
              { name: "Home", href: "/" },
              { name: "Consumer Law", href: "/consumer-law" },
              { name: "TCPA", href: "/consumer-law/tcpa" },
              { name: "Open Enrollment Robocalls" },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 items-center">
                <DamagesBadge type="tcpa" />
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[var(--font-playfair-display)] leading-tight">
                Health Insurance Robocalls and Spam Texts During Open Enrollment
              </h1>

              <p className="text-lg text-blue-100 leading-relaxed">
                Still getting calls after replying STOP? If health insurance companies or lead
                generators have been calling or texting you without proper consent, you may have
                a <strong>TCPA claim worth $500 to $1,500 per violation</strong>. Free case
                review — no fees unless we win.
              </p>

              <div className="flex flex-wrap gap-4">
                {[
                  "No fees unless we win",
                  "Free case review",
                  "$500–$1,500 per call or text",
                  "Florida consumers statewide",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/90 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-300 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="free-case-review" className="lg:sticky lg:top-24">
              <Card className="bg-white rounded-2xl p-6 shadow-2xl">
                <p className="text-xl font-bold text-gray-900 mb-1">
                  Free TCPA Case Review
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  This form is for unwanted calls or texts — not for enrollment help.
                </p>
                <SimpleContactForm
                  useBlueTheme={true}
                  initialCaseType="TCPA — Robocall Violations"
                  formSource="open-enrollment-robocalls"
                />
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-blue-600" aria-hidden="true" />
                  <span>
                    Call{" "}
                    <a
                      href={SITE_CONFIG.phoneHref}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Why Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
            Why Health Insurance Robocalls Surge During Open Enrollment
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Every year during the ACA Open Enrollment period, Florida consumers are bombarded by
            automated calls and texts from health insurance companies, ACA lead generators, and
            third-party marketing firms. These companies purchase lead lists, deploy autodialers,
            and blast millions of prerecorded messages to cell phones across the state — often
            without ever obtaining proper consent from the people they are contacting.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            Many of these callers are not insurance companies you have ever contacted. They bought
            or leased your phone number from a lead broker. Under the Telephone Consumer Protection
            Act, that is generally not enough to make those calls or texts legal.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                stat: "#1",
                label: "Industry for TCPA complaints",
                detail: "Health insurance telemarketing generates more TCPA complaints than any other industry during Open Enrollment.",
              },
              {
                stat: "$500",
                label: "Per illegal call or text",
                detail: "The TCPA provides statutory damages per violation — no proof of financial harm required.",
              },
              {
                stat: "$1,500",
                label: "For willful violations",
                detail: "Courts can treble damages when the company knew it was violating the law and called anyway.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-blue-50 border border-blue-200 rounded-xl p-5"
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">{item.stat}</div>
                <div className="font-bold text-gray-900 text-sm mb-2">{item.label}</div>
                <div className="text-gray-600 text-xs leading-relaxed">{item.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Qualification Checklist */}
        <section>
          <div className="max-w-3xl">
            <p className="font-semibold text-blue-700 mb-2">Still getting messages after replying STOP?</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
              This Page May Be for You If…
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forYouItems.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl border bg-white p-5 shadow-sm"
              >
                <CheckCircle
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-blue-700"
                />
                <p className="leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-6">
            If one or more of these apply, contact us for a free case review. There is no cost and
            no obligation.
          </p>
        </section>

        {/* Violation Types */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
            How Health Insurance Robocalls May Violate the TCPA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {violationTypes.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <StatuteCallout
            citation="47 U.S.C. § 227(b)(1)(A) — TCPA"
            text="It shall be unlawful for any person within the United States... to make any call (other than a call made for emergency purposes or made with the prior express consent of the called party) using any automatic telephone dialing system or an artificial or prerecorded voice... to any telephone number assigned to a paging service, cellular telephone service, specialized mobile radio service, or other radio common carrier service."
            label="Federal Law"
          />
        </section>

        {/* Evidence Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-3">
            What Evidence Should You Save Right Now?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The strength of a TCPA claim is often determined by documentation quality. Save
            everything before calls or texts disappear from your phone.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {evidenceItems.map(({ Icon, label, note }) => (
              <div
                key={label}
                className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-semibold">{label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{note}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <FreeCaseReviewDialog>
              <button className="inline-flex items-center justify-center gap-2 bg-[#002b60] hover:bg-[#003e8d] text-white font-bold px-7 py-3 rounded-xl text-base transition-colors cursor-pointer">
                Have evidence ready? Start your free case review
              </button>
            </FreeCaseReviewDialog>
          </div>
        </section>

        {/* Damages Section */}
        <section
          className="rounded-2xl p-8"
          style={{
            backgroundImage:
              "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)",
          }}
        >
          <h2 className="text-2xl font-bold text-white font-[var(--font-playfair-display)] mb-2">
            What You May Be Entitled to Recover
          </h2>
          <p className="text-blue-200 text-sm mb-6">
            The TCPA establishes statutory damages — you do not need to prove specific financial
            harm to seek compensation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                amount: "$500",
                label: "Per standard TCPA violation",
                icon: Phone,
              },
              {
                amount: "Up to $1,500",
                label: "Per willful or knowing violation",
                icon: Zap,
              },
              {
                amount: "No win, no fee",
                label: "Contingency — you pay nothing unless we win",
                icon: Handshake,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10"
              >
                <div className="flex justify-center mb-2">
                  <item.icon className="w-8 h-8 text-blue-300" aria-hidden="true" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{item.amount}</div>
                <div className="text-white/80 text-sm">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-white font-bold text-lg mb-4">Recovery Example</h3>
            <div className="overflow-hidden rounded-xl">
              <table
                className="w-full text-sm"
                aria-label="TCPA recovery examples by number of violations"
              >
                <thead className="bg-white/20 text-white">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold">Violations</th>
                    <th className="text-left px-4 py-2 font-semibold">Standard ($500)</th>
                    <th className="text-left px-4 py-2 font-semibold">Willful ($1,500)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    { calls: "5 calls or texts", std: "$2,500", willful: "$7,500" },
                    { calls: "10 calls or texts", std: "$5,000", willful: "$15,000" },
                    { calls: "20 calls or texts", std: "$10,000", willful: "$30,000" },
                    { calls: "50 calls or texts", std: "$25,000", willful: "$75,000" },
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
            <p className="text-blue-200 text-xs mt-3">
              Results may vary. Each call or text is a separate violation. Based on statutory
              damages per 47 U.S.C. § 227(b)(3). No outcome is guaranteed.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <ViolationTimeline
          title="How a Health Insurance Robocall TCPA Case Works"
          steps={timelineSteps}
        />

        {/* Class Action vs Individual */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#002b60] mb-4">
            Individual TCPA Claim vs. Class Action — The Difference Matters
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you&apos;ve received a class action settlement check for robocalls before, you may
            have received <strong>$30–$50</strong> while attorneys earned millions. That&apos;s
            class action economics. An individual TCPA claim pursues your own damages directly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-2">
                Class Action Settlement
              </p>
              <p className="text-2xl font-bold text-red-600 mb-1">$30–$50</p>
              <p className="text-gray-600 text-sm">
                Your share of a massive settlement split among millions of claimants
              </p>
            </div>
            <div className="bg-white border border-blue-300 rounded-xl p-4 ring-2 ring-blue-400">
              <p className="font-semibold text-blue-700 text-sm uppercase tracking-wide mb-2">
                Individual TCPA Claim
              </p>
              <p className="text-2xl font-bold text-blue-700 mb-1">$500–$1,500 per call</p>
              <p className="text-gray-600 text-sm">
                Your own attorney pursuing your individual damages — far more per person
              </p>
            </div>
          </div>
        </section>

        {/* Why Fischetti */}
        <section className="bg-[#002b60] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white font-[var(--font-playfair-display)] mb-6">
            Why Choose Consumer Law Florida?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                stat: "$30M+",
                label: "Recovered for Clients",
                detail:
                  "Over $30 million recovered for Florida consumers in consumer protection cases.",
              },
              {
                stat: "No Fee",
                label: "Unless We Win",
                detail:
                  "You pay nothing upfront. Our fee comes only if we recover compensation for you.",
              },
              {
                stat: "Free",
                label: "Case Review",
                detail:
                  "Tell us what happened. We evaluate your situation and let you know if you may have a claim.",
              },
              {
                stat: "Statewide",
                label: "Florida Representation",
                detail:
                  "Miami, Orlando, Tampa, Fort Lauderdale, West Palm Beach, Jacksonville — and everywhere in between.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/10 rounded-xl p-5 border border-white/10"
              >
                <div className="text-2xl font-bold text-white mb-1">{item.stat}</div>
                <div className="text-blue-300 text-xs font-bold uppercase tracking-wide mb-2">
                  {item.label}
                </div>
                <div className="text-blue-100 text-sm leading-relaxed">{item.detail}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <FreeCaseReviewDialog>
              <button className="inline-flex items-center justify-center gap-2 bg-[#007BFF] hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg cursor-pointer">
                Get My Free Case Review
              </button>
            </FreeCaseReviewDialog>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <FAQSection
        title="Health Insurance Robocalls and Open Enrollment TCPA — Common Questions"
        faqs={faqs}
      />

      {/* Related Links */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6">
          Related TCPA Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              href: "/consumer-law/tcpa",
              label: "TCPA — Full Overview of Your Rights",
            },
            {
              href: "/consumer-law/tcpa/robocall-lawsuit-florida",
              label: "Robocall Lawsuit Florida — $500–$1,500 Per Call",
            },
            {
              href: "/consumer-law/tcpa/spam-texts-florida",
              label: "Spam Texts Florida — Up to $1,500 Per Text",
            },
            {
              href: "/consumer-law/tcpa/texted-stop-still-getting-texts",
              label: "Texted STOP But Still Getting Texts",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <span
                className="text-blue-600 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              >
                →
              </span>
              <span className="text-gray-800 font-medium group-hover:text-blue-600 text-sm">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="mx-auto max-w-3xl text-xs leading-5 text-slate-500">
            Submitting this form does not create an attorney-client relationship. Prior results do
            not guarantee a similar outcome. The information on this page is general and is not
            legal advice. This page is for consumers receiving unwanted calls or texts — not for
            health insurance enrollment assistance.
          </p>
        </div>
      </section>
    </div>
  )
}
