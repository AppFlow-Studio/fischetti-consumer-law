import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, ArrowRight } from 'lucide-react'
import { SITE_CONFIG, buildPageMeta, buildBreadcrumbSchema } from '@/lib/seo'
import { JsonLd } from '@/components/seo/json-ld'
import { FAQSection } from '@/components/seo/faq-section'
import SimpleContactForm from '@/components/ui/simple-contact-form'
import { Card } from '@/components/ui/card'
import { PRIMARY_PHONE_E164, SITE_URL, SITE_NAME } from '@/lib/site'

const PAGE_URL = `${SITE_URL}/locations/tampa`

export const metadata: Metadata = buildPageMeta({
  title: 'Tampa Consumer Rights Lawyer — FDCPA, TCPA & FCRA Attorney',
  description:
    'Consumer Law Florida serves Tampa consumers remotely. FDCPA, TCPA, FCRA attorney. Free case review. No fees unless we win. (561) 264-7211.',
  canonical: PAGE_URL,
  keywords: [
    'consumer lawyer tampa florida',
    'fdcpa attorney tampa',
    'tcpa lawyer tampa',
    'debt collection attorney tampa',
    'consumer protection attorney hillsborough county',
    'fcra attorney tampa florida',
  ],
  geoCity: 'Tampa, Florida',
  geoCoords: { lat: 27.9506, lng: -82.4572 },
})

const faqs = [
  {
    question: 'Do I need to travel to an office if I am in Tampa?',
    answer:
      'No. All Tampa consultations are conducted by phone or video. You can get a full case review from your home. If you prefer in-person, our nearest office is in Orlando.',
  },
  {
    question: 'Does the FDCPA protect Tampa consumers from debt collector harassment?',
    answer:
      'Yes. The FDCPA applies statewide. Tampa consumers have the same federal protections against debt collector harassment as any other Florida consumer.',
  },
  {
    question: 'Can I sue for illegal robocalls I received in Tampa?',
    answer:
      'Yes. The TCPA applies throughout Florida. Tampa consumers who received automated calls or texts without consent may be entitled to $500–$1,500 per call or text.',
  },
  {
    question: 'What if my credit report has errors and I live in Tampa?',
    answer:
      'FCRA protections apply to all Florida consumers. If you disputed errors on your credit report and they were not corrected, you may have a claim regardless of your location.',
  },
  {
    question: 'How quickly can a Tampa consumer get a case review?',
    answer: 'We respond within 24 hours. Call (561) 264-7211 or use the form on this page.',
  },
]

const practiceAreas = [
  { name: 'FDCPA — Debt Collector Harassment', slug: 'fdcpa' },
  { name: 'TCPA — Robocalls & Spam Texts', slug: 'tcpa' },
  { name: 'FCRA — Credit Report Errors', slug: 'fcra' },
]

export default function TampaPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Locations', url: `${SITE_URL}/locations` },
    { name: 'Tampa', url: PAGE_URL },
  ])

  // ServiceArea schema — NOT LocalBusiness (no physical office in Tampa)
  const serviceAreaSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `${SITE_NAME} — Serving Tampa`,
    url: PAGE_URL,
    telephone: SITE_CONFIG.phone,
    areaServed: {
      '@type': 'City',
      name: 'Tampa',
      containedIn: { '@type': 'State', name: 'Florida' },
    },
    description:
      'Consumer Law Florida serves Tampa and Hillsborough County consumers remotely for FDCPA, TCPA, and FCRA claims.',
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
            <span className="text-white">Tampa</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[var(--font-playfair-display)] leading-tight">
                Consumer Protection Lawyer Serving Tampa, Florida
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                Consumer Law Florida serves Tampa and the greater Tampa Bay area through phone and video
                consultations. Federal consumer protection laws apply fully in Hillsborough County —
                you have the same rights as any consumer in Florida.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Free case review', 'No fees unless we win', 'Phone & video consultations'].map((item) => (
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
                <h2 className="text-xl font-bold text-gray-900 mb-2">Free Case Review for Tampa Consumers</h2>
                <p className="text-gray-600 mb-4 text-sm">We&apos;ll respond within 24 hours.</p>
                <SimpleContactForm useBlueTheme={true} />
              </Card>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">

        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#002b60] mb-3">Remote Service for Tampa Consumers</h2>
          <p className="text-gray-700 leading-relaxed">
            Consumer Law Florida does not have a physical office in Tampa. All consultations and case
            management are handled by <strong>phone and video</strong>. If you prefer in-person, our
            nearest office is in Orlando.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-4">
            Consumer Protection in Tampa and the Bay Area
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Tampa Bay area consumers face the same consumer protection challenges as the rest of Florida —
            aggressive debt collectors, unsolicited robocalls, spam text campaigns, and credit report errors
            that affect financing and employment. Federal statutes like the FDCPA, TCPA, and FCRA provide
            strong protections and allow consumers to recover money without paying attorney&apos;s fees upfront.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6 text-center">
            Practice Areas for Tampa Consumers
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
          <h2 className="text-2xl font-bold text-[#002b60] mb-4">Serving Tampa Bay and Surrounding Counties</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Tampa', 'St. Petersburg', 'Clearwater', 'Brandon', 'Wesley Chapel',
              'Lakeland', 'Sarasota', 'New Port Richey', 'Bradenton', 'Dunedin',
            ].map((city) => (
              <span key={city} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {city}
              </span>
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-3">
            Covering Hillsborough, Pinellas, Pasco, and Polk counties.
          </p>
        </section>

        <FAQSection faqs={faqs} title="Frequently Asked Questions — Tampa Consumers" />
      </div>
    </main>
  )
}
