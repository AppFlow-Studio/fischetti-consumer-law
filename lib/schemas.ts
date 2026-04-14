/**
 * Sitewide JSON-LD entity graph
 * All schemas use @id URIs to form a linked entity graph that Google can resolve.
 * Import officeSchemas and the individual schema builders into layout.tsx and page-level components.
 */

import { SITE_URL, SITE_NAME, PRIMARY_PHONE, PRIMARY_EMAIL } from "@/lib/site"

// ─── Schema 1: Organization ────────────────────────────────────────────────────
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Fischetti Law Group",
  url: SITE_URL,
  logo: `${SITE_URL}/fischettilogo.png`,
  image: `${SITE_URL}/fischettilogo.png`,
  telephone: PRIMARY_PHONE,
  email: PRIMARY_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "111 N Orange Ave, Suite 800",
    addressLocality: "Orlando",
    addressRegion: "FL",
    postalCode: "32801",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "State",
    name: "Florida",
  },
  description:
    "Florida consumer protection law firm handling FDCPA, FCRA, and TCPA violations — debt collector harassment, credit reporting errors, and illegal robocalls. No fees unless we win.",
  foundingDate: "2010",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 5, maxValue: 20 },
  sameAs: [
    "https://www.facebook.com/consumerlawflorida",
    "https://www.linkedin.com/company/consumer-law-florida",
  ],
}

// ─── Schema 2: Person (Attorney) ───────────────────────────────────────────────
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#attorney-fischetti`,
  name: "Michael J. Fischetti",
  givenName: "Michael",
  familyName: "Fischetti",
  honorificSuffix: "Esq.",
  jobTitle: "Consumer Protection Attorney",
  description:
    "Florida consumer protection lawyer with courtroom experience in FDCPA, FCRA, TCPA, and related federal consumer law. Former Broward County Public Defender. $30M+ recovered for clients.",
  image: `${SITE_URL}/fischettiheadshots.jpg`,
  url: SITE_URL,
  telephone: PRIMARY_PHONE,
  email: PRIMARY_EMAIL,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  memberOf: {
    "@type": "Organization",
    name: "The Florida Bar",
    url: "https://www.floridabar.org",
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "Florida Bar License",
      recognizedBy: { "@type": "Organization", name: "The Florida Bar" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "BBB A+ Rating",
      recognizedBy: { "@type": "Organization", name: "Better Business Bureau" },
    },
  ],
  knowsAbout: [
    "Fair Debt Collection Practices Act",
    "Fair Credit Reporting Act",
    "Telephone Consumer Protection Act",
    "Video Privacy Protection Act",
    "Fair Housing Act",
    "Consumer Protection Law",
    "Identity Theft Claims",
    "Data Breach Lawsuits",
    "Forced Arbitration",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Consumer Protection Attorney",
    description: "Former Broward County Public Defender; now representing consumers in FDCPA, FCRA, and TCPA claims statewide.",
  },
  sameAs: ["https://www.linkedin.com/in/michael-fischetti"],
}

// ─── Schema 3: Primary LegalService (Statewide) ────────────────────────────────
export const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${SITE_URL}/#legal-service`,
  name: SITE_NAME,
  url: SITE_URL,
  telephone: PRIMARY_PHONE,
  email: PRIMARY_EMAIL,
  image: `${SITE_URL}/fischettilogo.png`,
  logo: `${SITE_URL}/fischettilogo.png`,
  description:
    "Florida consumer protection attorneys handling FDCPA, FCRA, and TCPA violations — debt collector harassment, credit reporting errors, and illegal robocalls. No fees unless we win.",
  serviceType: [
    "FDCPA Attorney",
    "FCRA Attorney",
    "TCPA Attorney",
    "Debt Collection Harassment Attorney",
    "Credit Report Error Attorney",
    "Robocall Lawsuit Attorney",
    "Spam Text Lawsuit Attorney",
    "Consumer Protection Lawyer",
  ],
  areaServed: [
    { "@type": "State", "name": "Florida" },
    { "@type": "City", "name": "Miami", "containedInPlace": { "@type": "State", "name": "Florida" } },
    { "@type": "City", "name": "Orlando", "containedInPlace": { "@type": "State", "name": "Florida" } },
    { "@type": "City", "name": "Fort Lauderdale", "containedInPlace": { "@type": "State", "name": "Florida" } },
    { "@type": "City", "name": "West Palm Beach", "containedInPlace": { "@type": "State", "name": "Florida" } },
    { "@type": "City", "name": "Tampa", "containedInPlace": { "@type": "State", "name": "Florida" } },
    { "@type": "City", "name": "Boynton Beach", "containedInPlace": { "@type": "State", "name": "Florida" } },
    { "@type": "City", "name": "Port St. Lucie", "containedInPlace": { "@type": "State", "name": "Florida" } },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "111 N Orange Ave, Suite 800",
    addressLocality: "Orlando",
    addressRegion: "FL",
    postalCode: "32801",
    addressCountry: "US",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
}

// ─── Schema 4: WebSite ─────────────────────────────────────────────────────────
// potentialAction/SearchAction removed — this site has no /?s= search endpoint.
// Adding a broken SearchAction would expose a non-functional sitelinks searchbox.
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
}

// ─── Schema 5: LocalBusiness — one per office ──────────────────────────────────
// areaServed is scoped to the office's CITY (not the whole state).
// Statewide reach is signalled only by the LegalService schema above (#legal-service).
// This prevents three competing state-level entities from diluting local signals.
export function buildOfficeSchema(office: {
  id: string
  name: string
  streetAddress: string
  addressLocality: string
  postalCode: string
  telephone: string
  latitude: number
  longitude: number
  areaServedCity?: string   // defaults to addressLocality
}) {
  const servedCity = office.areaServedCity ?? office.addressLocality
  return {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    "@id": `${SITE_URL}/#office-${office.id}`,
    name: `${SITE_NAME} — ${office.name}`,
    url: SITE_URL,
    telephone: office.telephone,
    email: PRIMARY_EMAIL,
    image: `${SITE_URL}/fischettilogo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.streetAddress,
      addressLocality: office.addressLocality,
      addressRegion: "FL",
      postalCode: office.postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: office.latitude,
      longitude: office.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    serviceType: [
      "FDCPA Attorney",
      "FCRA Attorney",
      "TCPA Attorney",
      "Consumer Protection Lawyer",
      "Debt Collection Harassment Attorney",
    ],
    // City-scoped areaServed — keeps this entity from competing with the
    // statewide LegalService (#legal-service) on topic pages.
    areaServed: {
      "@type": "City",
      name: servedCity,
      containedInPlace: { "@type": "State", name: "Florida" },
    },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  }
}

export const officeSchemas = [
  buildOfficeSchema({
    id: "orlando",
    name: "Orlando",
    streetAddress: "111 N Orange Ave, Suite 800",
    addressLocality: "Orlando",
    postalCode: "32801",
    telephone: PRIMARY_PHONE,
    latitude: 28.5383,
    longitude: -81.3792,
  }),
  buildOfficeSchema({
    id: "boynton-beach",
    name: "Boynton Beach",
    streetAddress: "7593 Boynton Beach Blvd #110",
    addressLocality: "Boynton Beach",
    postalCode: "33437",
    telephone: PRIMARY_PHONE,
    latitude: 26.5317,
    longitude: -80.0905,
  }),
  buildOfficeSchema({
    id: "fort-pierce",
    name: "Port St. Lucie",
    streetAddress: "130 S Indian River Dr, Ste 202",
    addressLocality: "Fort Pierce",
    postalCode: "34950",
    telephone: PRIMARY_PHONE,
    latitude: 27.4481,
    longitude: -80.3228,
    areaServedCity: "Port St. Lucie",
  }),
]
