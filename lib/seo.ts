import { Metadata } from 'next'

export const SITE_CONFIG = {
  name: 'Consumer Law Florida',
  firmName: 'Fischetti Law Group',
  attorney: 'Michael J. Fischetti',
  phone: '(561) 264-7211',
  phoneHref: 'tel:+15612647211',
  email: 'info@consumerlawflorida.com',
  url: 'https://www.consumerlawflorida.com',
  primaryOffice: {
    address: '111 N Orange Ave, Suite 800',
    city: 'Orlando',
    state: 'FL',
    zip: '32801',
    country: 'US',
    coordinates: { lat: 28.5383, lng: -81.3792 },
  },
  offices: [
    {
      city: 'Orlando',
      address: '111 N Orange Ave, Suite 800',
      state: 'FL',
      zip: '32801',
      coordinates: { lat: 28.5383, lng: -81.3792 },
    },
    {
      city: 'Port St. Lucie',
      address: '130 S Indian River Dr, Ste 202',
      state: 'FL',
      zip: '34950',
      coordinates: { lat: 27.2933, lng: -80.3502 },
    },
    {
      city: 'Boynton Beach',
      address: '7593 Boynton Beach Blvd #110',
      state: 'FL',
      zip: '33437',
      coordinates: { lat: 26.5317, lng: -80.0905 },
    },
  ],
  recovery: '$30M+',
  reviews: '500+',
  cases: '15,000+',
  tagline: 'No Fee Unless We Win',
  gtm: 'GTM-WBZHLG3Z',
}

// IMPORTANT: Never include 'credit repair' in any keywords array
const GLOBAL_FORBIDDEN_KEYWORDS = ['credit repair attorney', 'credit repair lawyer', 'credit repair']

export function buildPageMeta({
  title,
  description,
  canonical,
  keywords = [],
  noindex = false,
  geoCity,
  geoCoords,
  ogImage,
}: {
  title: string
  description: string
  canonical: string
  keywords?: string[]
  noindex?: boolean
  geoCity?: string
  geoCoords?: { lat: number; lng: number }
  /** Optional per-page OG image path, e.g. '/og/fdcpa-debt-collector.png'. Defaults to /opengraph-default.png */
  ogImage?: string
}): Metadata {
  const cleanKeywords = keywords.filter(
    (k) => !GLOBAL_FORBIDDEN_KEYWORDS.some((f) => k.toLowerCase().includes(f))
  )
  const coords = geoCoords ?? SITE_CONFIG.primaryOffice.coordinates
  const city = geoCity ?? 'Orlando, Florida'
  const ogImageUrl = `${SITE_CONFIG.url}${ogImage ?? '/opengraph-default.png'}`
  return {
    title,
    description,
    keywords: cleanKeywords,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_CONFIG.name,
      locale: 'en_US',
      type: 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    other: {
      'geo.region': 'US-FL',
      'geo.placename': city,
      'geo.position': `${coords.lat};${coords.lng}`,
      'ICBM': `${coords.lat}, ${coords.lng}`,
    },
  }
}

export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Michael J. Fischetti',
    jobTitle: 'Consumer Protection Attorney',
    worksFor: {
      '@type': 'LegalService',
      name: 'Consumer Law Florida',
      url: SITE_CONFIG.url,
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Florida Bar License',
      recognizedBy: { '@type': 'Organization', name: 'The Florida Bar' },
    },
    description:
      'Florida consumer protection attorney specializing in FDCPA, TCPA, and FCRA claims. Founder of Fischetti Law Group.',
    image: `${SITE_CONFIG.url}/fischettiheadshots.jpg`,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    alumniOf: "Broward County Public Defender's Office",
  }
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.firmName,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    description:
      'Florida consumer protection law firm handling FCRA, FDCPA, and TCPA claims. No fees unless we win.',
    founder: { '@type': 'Person', name: 'Michael J. Fischetti' },
    priceRange: 'Free consultation',
    areaServed: { '@type': 'State', name: 'Florida' },
    location: SITE_CONFIG.offices.map((o) => ({
      '@type': 'Place',
      name: `Consumer Law Florida — ${o.city}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: o.address,
        addressLocality: o.city,
        addressRegion: o.state,
        postalCode: o.zip,
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: o.coordinates.lat, longitude: o.coordinates.lng },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Consumer Protection Legal Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'FCRA — Credit Report Error & Background Check Claims',
            description:
              'Sue Equifax, Experian, or TransUnion for reporting errors. Background check errors that cost you a job or housing.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'FDCPA — Debt Collector Harassment Claims',
            description:
              'Stop illegal debt collection. Up to $1,000 per FDCPA violation. Debt collectors calling after hours, threatening arrest, or ignoring stop requests.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'TCPA — Robocall & Spam Text Claims',
            description:
              'Up to $1,500 per illegal robocall or spam text under the TCPA. Texted STOP and still getting texts? You may have a claim.',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

export function buildLegalServiceSchema(serviceType: string, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `${serviceType} — Consumer Law Florida`,
    url: pageUrl,
    telephone: SITE_CONFIG.phone,
    priceRange: 'Free consultation',
    areaServed: { '@type': 'State', name: 'Florida' },
    employee: {
      '@type': 'Person',
      name: 'Michael J. Fischetti',
      jobTitle: 'Consumer Protection Attorney',
    },
  }
}

export function buildLocalBusinessSchema(officeIndex: number) {
  const o = SITE_CONFIG.offices[officeIndex]
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Consumer Law Florida — ${o.city}`,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: o.address,
      addressLocality: o.city,
      addressRegion: o.state,
      postalCode: o.zip,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: o.coordinates.lat, longitude: o.coordinates.lng },
    priceRange: 'Free consultation',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '500',
      bestRating: '5',
    },
  }
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function buildArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: image ?? `${SITE_CONFIG.url}/opengraph-default.png`,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: 'Michael J. Fischetti',
      jobTitle: 'Consumer Protection Attorney',
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/fischettilogo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}
