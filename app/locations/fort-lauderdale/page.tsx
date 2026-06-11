import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, ArrowRight } from 'lucide-react'
import { SITE_CONFIG, buildPageMeta, buildBreadcrumbSchema } from '@/lib/seo'
import { JsonLd } from '@/components/seo/json-ld'
import { FAQSection } from '@/components/seo/faq-section'
import SimpleContactForm from '@/components/ui/simple-contact-form'
import { Card } from '@/components/ui/card'
import { PRIMARY_PHONE_E164, SITE_URL, SITE_NAME } from '@/lib/site'

const PAGE_URL = `${SITE_URL}/locations/fort-lauderdale`

export const metadata: Metadata = buildPageMeta({
  title: 'Consumer Law Lawyer Serving Fort Lauderdale FL — FDCPA, TCPA & FCRA Attorney | Consumer Law Florida',
  description:
    'Consumer Law Florida serves Fort Lauderdale and Broward County consumers remotely. Debt harassment, robocalls, credit errors. Free case review. (561) 264-7211.',
  canonical: PAGE_URL,
  keywords: [
    'consumer lawyer fort lauderdale',
    'fdcpa attorney fort lauderdale',
    'tcpa lawyer broward county',
    'debt collector harassment lawyer fort lauderdale',
    'consumer protection attorney broward county',
    'fcra attorney fort lauderdale florida',
  ],
  geoCity: 'Fort Lauderdale, Florida',
  geoCoords: { lat: 26.1224, lng: -80.1373 },
})

const faqs = [
  {
    question: 'Do I need to visit an office if I am in Fort Lauderdale?',
    answer:
      'No. Fort Lauderdale clients are served entirely by phone and video. Our Boynton Beach office is nearby if you prefer in-person — it is approximately 20 miles south.',
  },
  {
    question: 'Does Michael Fischetti have experience in Broward County?',
    answer:
      'Yes. Michael Fischetti began his legal career at the Broward County Public Defender\'s Office, gaining extensive experience in Broward County courts and the South Florida legal community.',
  },
  {
    question: 'What consumer protection cases are most common in Broward County?',
    answer:
      'Broward County consumers frequently contact us about debt collector harassment, illegal robocalls and spam texts, and credit report or background check errors.',
  },
  {
    question: 'Can I sue for robocalls I received in Fort Lauderdale?',
    answer:
      'Yes. The TCPA applies statewide. If you received automated calls or texts without consent, or after you said stop, you may be entitled to $500–$1,500 per call or text.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Call (561) 264-7211 or fill out the form on this page. We respond within 24 hours and all consultations are free.',
  },
]

const practiceAreas = [
  { name: 'FDCPA — Debt Collector Harassment', slug: 'fdcpa' },
  { name: 'TCPA — Robocalls & Spam Texts', slug: 'tcpa' },
  { name: 'FCRA — Credit Report Errors', slug: 'fcra' },
]

export default function FortLauderdalePage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Locations', url: `${SITE_URL}/locations` },
    { name: 'Fort Lauderdale', url: PAGE_URL },
  ])

  // ServiceArea schema — NOT LocalBusiness (no physical office in Fort Lauderdale)
  const serviceAreaSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `${SITE_NAME} — Serving Fort Lauderdale`,
    url: PAGE_URL,
    telephone: SITE_CONFIG.phone,
    areaServed: {
      '@type': 'City',
      name: 'Fort Lauderdale',
      containedIn: { '@type': 'State', name: 'Florida' },
    },
    description:
      'Consumer Law Florida serves Fort Lauderdale and Broward County consumers remotely for FDCPA, TCPA, and FCRA claims.',
  }

  return (
    <main className="w-full overflow-x-hidden bg-white">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={serviceAreaSchema} />

      <section
        className="w-full pt-24 pb-16 px-4"
        style={{ backgroundImage: 'radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)' }}
      >
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-white/70 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-white">Locations</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Fort Lauderdale</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[var(--font-playfair-display)] leading-tight">
                Consumer Protection Lawyer Serving Fort Lauderdale, Florida
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                Consumer Law Florida serves Fort Lauderdale and Broward County consumers through phone
                and video consultations. Our attorney Michael J. Fischetti began his career at the
                Broward County Public Defender&apos;s Office — giving him deep roots in the South Florida
                legal community.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Free case review', 'No fees unless we win', 'Broward County roots'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/90">
                    <CheckCircle className="w-5 h-5 text-blue-300" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href={`tel:${PRIMARY_PHONE_E164}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#002b60] rounded-xl font-bold hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call {SITE_CONFIG.phone}
              </a>
            </div>

            <div id="case-review-form" className="lg:sticky lg:top-24">
              <Card className="bg-white/95 rounded-2xl p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Free Case Review for Fort Lauderdale Consumers
                </h2>
                <p className="text-gray-600 mb-4 text-sm">We&apos;ll respond within 24 hours.</p>
                <SimpleContactForm useBlueTheme={true} />
              </Card>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">

        {/* Broward Roots / E-E-A-T */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#002b60] mb-3">Deep Roots in Broward County</h2>
          <p className="text-gray-700 leading-relaxed">
            Michael J. Fischetti began his legal career as a defense attorney at the{' '}
            <strong>Broward County Public Defender&apos;s Office</strong>, where he handled both misdemeanor
            and felony cases and tried cases from his first days on the job. He brings that same
            courtroom-tested intensity to consumer protection litigation — now fighting for consumers
            against corporations and collectors throughout South Florida.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            While Fort Lauderdale clients are served remotely, our Boynton Beach office is just
            approximately 20 miles south if you prefer an in-person consultation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-4">
            Consumer Protection for Broward County Consumers
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Broward County residents deal with the same consumer protection issues affecting consumers
            across Florida — persistent debt collector calls, unsolicited robocalls and spam texts, credit
            report and background check errors that cost jobs or housing. Federal laws like the FDCPA,
            TCPA, and FCRA give Broward consumers the right to sue and recover money, often without any
            out-of-pocket cost.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6 text-center">
            Practice Areas for Fort Lauderdale Consumers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practiceAreas.map((area) => (
              <Card key={area.slug} className="p-5 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">{area.name}</h3>
                <Link
                  href={`/consumer-law/${area.slug}`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-[#002b60] mb-4">Serving Broward County and South Florida</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Fort Lauderdale', 'Pompano Beach', 'Deerfield Beach', 'Hollywood',
              'Hallandale Beach', 'Coral Springs', 'Boca Raton', 'Coconut Creek',
              'Margate', 'Sunrise', 'Plantation', 'Pembroke Pines',
            ].map((city) => (
              <span key={city} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {city}
              </span>
            ))}
          </div>
        </section>

        <FAQSection faqs={faqs} title="Frequently Asked Questions — Fort Lauderdale Consumers" />
      </div>
    </main>
  )
}
