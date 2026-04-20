import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, ArrowRight } from 'lucide-react'
import { SITE_CONFIG, buildPageMeta, buildBreadcrumbSchema } from '@/lib/seo'
import { JsonLd } from '@/components/seo/json-ld'
import { FAQSection } from '@/components/seo/faq-section'
import SimpleContactForm from '@/components/ui/simple-contact-form'
import { Card } from '@/components/ui/card'
import { PRIMARY_PHONE_E164, SITE_URL, SITE_NAME } from '@/lib/site'

const PAGE_URL = `${SITE_URL}/locations/miami`

export const metadata: Metadata = buildPageMeta({
  title: 'Consumer Law Lawyer Serving Miami FL — FDCPA, TCPA & FCRA Attorney | Consumer Law Florida',
  description:
    'Consumer Law Florida serves Miami consumers remotely for debt collector harassment, robocalls, spam texts, and credit report errors. Free case review. (561) 264-7211.',
  canonical: PAGE_URL,
  keywords: [
    'consumer lawyer miami florida',
    'fdcpa attorney miami',
    'tcpa lawyer miami',
    'debt collector harassment lawyer miami',
    'consumer protection attorney miami',
    'fcra attorney miami florida',
  ],
  geoCity: 'Miami, Florida',
  geoCoords: { lat: 25.7617, lng: -80.1918 },
})

const faqs = [
  {
    question: 'Do I need to visit an office to get help from Consumer Law Florida in Miami?',
    answer:
      'No. All Miami consultations are conducted by phone or video. You do not need to visit an office. If you prefer in-person, our offices in Orlando, Port St. Lucie, and Boynton Beach are available.',
  },
  {
    question: 'Do you handle cases in Miami-Dade County courts?',
    answer:
      'Yes. Consumer Law Florida represents clients in federal and state court proceedings applicable to Miami-Dade County consumer protection matters.',
  },
  {
    question: 'Are debt collector harassment laws different in Miami?',
    answer:
      'No — federal laws like the FDCPA apply uniformly across all of Florida, including Miami-Dade County. The same protections that apply in Orlando apply to you in Miami.',
  },
  {
    question: 'How quickly can I get a case review if I am in Miami?',
    answer:
      'We respond to case review requests within 24 hours. Call (561) 264-7211 or submit the form on this page.',
  },
  {
    question: 'Can Miami consumers sue for robocalls they received?',
    answer:
      'Yes. The TCPA applies statewide. Miami consumers who received illegal robocalls or spam texts without consent may be entitled to $500–$1,500 per call or text.',
  },
]

const practiceAreas = [
  { name: 'FDCPA — Debt Collector Harassment', slug: 'fdcpa' },
  { name: 'TCPA — Robocalls & Spam Texts', slug: 'tcpa' },
  { name: 'FCRA — Credit Report Errors', slug: 'fcra' },
]

export default function MiamiPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Locations', url: `${SITE_URL}/locations` },
    { name: 'Miami', url: PAGE_URL },
  ])

  // ServiceArea schema — NOT LocalBusiness (no physical office in Miami)
  const serviceAreaSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `${SITE_NAME} — Serving Miami`,
    url: PAGE_URL,
    telephone: SITE_CONFIG.phone,
    areaServed: {
      '@type': 'City',
      name: 'Miami',
      containedIn: { '@type': 'State', name: 'Florida' },
    },
    description:
      'Consumer Law Florida serves Miami and Miami-Dade County consumers remotely for FDCPA, TCPA, and FCRA claims.',
  }

  return (
    <main className="w-full overflow-x-hidden bg-white">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={serviceAreaSchema} />

      {/* Hero */}
      <section
        className="w-full pt-24 pb-16 px-4"
        style={{ backgroundImage: 'radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)' }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-white/70 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-white">Locations</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Miami</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[var(--font-playfair-display)] leading-tight">
                Consumer Protection Lawyer Serving Miami, Florida
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                We serve Miami and Miami-Dade County consumers through phone and video consultations. You
                do not need to visit an office. Federal consumer protection laws — FDCPA, TCPA, and FCRA
                — apply to every consumer in Florida, including Miami.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  'Free case review',
                  'No fees unless we win',
                  'Phone & video consultations',
                  'Serving Miami-Dade County',
                ].map((item) => (
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
                <h2 className="text-xl font-bold text-gray-900 mb-2">Free Case Review for Miami Consumers</h2>
                <p className="text-gray-600 mb-4 text-sm">We&apos;ll respond within 24 hours.</p>
                <SimpleContactForm useBlueTheme={true} />
              </Card>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">

        {/* Remote Service Notice */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#002b60] mb-3">How We Serve Miami Clients</h2>
          <p className="text-gray-700 leading-relaxed">
            Consumer Law Florida does not have a physical office in Miami. All consultations and case
            management for Miami clients are handled entirely by <strong>phone and video</strong>. This
            allows us to work efficiently and respond quickly — without requiring you to travel. If you
            prefer in-person, our offices in Orlando, Port St. Lucie, and Boynton Beach are available.
          </p>
        </section>

        {/* Why Miami Consumers Need Consumer Protection Law */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-4">
            Why Miami Consumers Need Consumer Protection Attorneys
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Miami-Dade County consistently ranks among Florida&apos;s highest counties for consumer
            complaints related to debt collection and identity theft. South Florida consumers are
            frequently targeted by robocall campaigns and aggressive debt collection tactics. Federal
            laws — the FDCPA, TCPA, and FCRA — exist precisely to protect consumers in these situations,
            and they apply fully in Miami.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If a debt collector is harassing you, a company is texting you after you said STOP, or your
            credit report contains errors that are hurting your score — you may have a federal claim worth
            money, regardless of where you live in Florida.
          </p>
        </section>

        {/* Practice Areas */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-6 text-center">
            Practice Areas for Miami Consumers
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

        {/* Service Area */}
        <section className="bg-gray-50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-[#002b60] mb-4">Serving All of Miami-Dade County</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We serve consumers throughout Miami-Dade County, including:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'Miami', 'Coral Gables', 'Hialeah', 'Homestead', 'Doral', 'Miami Gardens',
              'North Miami', 'Aventura', 'Miami Beach', 'Brickell', 'Coconut Grove', 'Kendall',
            ].map((city) => (
              <span key={city} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {city}
              </span>
            ))}
          </div>
        </section>

        <FAQSection faqs={faqs} title="Frequently Asked Questions — Miami Consumers" />

        {/* Office Locations */}
        <section>
          <h2 className="text-2xl font-bold text-[#002b60] mb-4">Our Florida Office Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SITE_CONFIG.offices.map((office) => (
              <Card key={office.city} className="p-4 border rounded-xl">
                <h3 className="font-bold text-gray-900 mb-1">{office.city}</h3>
                <p className="text-sm text-gray-600">{office.address}</p>
                <p className="text-sm text-gray-600">{office.city}, {office.state} {office.zip}</p>
              </Card>
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-4">
            Miami clients are served remotely. In-person consultations available at any of the above offices.
          </p>
        </section>
      </div>
    </main>
  )
}
