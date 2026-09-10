import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/navbar-wrapper";
import Footer from "@/components/ui/footer";
import FreeCaseReviewFABWrapper from "@/components/free-case-review-fab-wrapper";
import { UIStateProvider } from "@/providers/ui-state-provider";
import ClickTracking from "@/components/analytics/ClickTracking";
import { SITE_NAME, SITE_URL, PRIMARY_PHONE } from "@/lib/site"
import {
  organizationSchema,
  personSchema,
  legalServiceSchema,
  websiteSchema,
  officeSchemas,
} from "@/lib/schemas"
import AutoOpenDialog from "@/components/auto-open-dialog";
import FreeCaseReviewDialog from "@/components/free-case-review-dialog";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import CookieConsentBanner from "@/components/consent/CookieConsentBanner";
import ConsentModeScript from "@/components/tracking/ConsentModeScript";
import TrackingScripts from "@/components/tracking/TrackingScripts";
import AttributionCapture from "@/components/tracking/AttributionCapture";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Florida Consumer Protection Attorney | FDCPA, FCRA & TCPA Lawyer",
    template: "%s | Consumer Law Florida"
  },
  description: `Michael J. Fischetti is a Florida consumer protection attorney fighting FDCPA, FCRA, and TCPA violations. $30M+ recovered. No fees unless you win. Serving all of Florida. Call ${PRIMARY_PHONE}.`,
  keywords: [
    "Florida consumer lawyer",
    "consumer protection attorney Florida",
    "FDCPA lawyer Florida",
    "FCRA attorney Florida",
    "TCPA violation lawyer",
    "debt collection harassment attorney",
    "credit report error lawyer",
    "robocall attorney Florida",
    "consumer law firm Florida",
    "debt collector lawyer Fort Lauderdale",
    "credit reporting attorney Tampa",
    "consumer rights lawyer Orlando",
    "no win no fee consumer lawyer",
    "Florida consumer protection",
    "debt collection defense",
    "telemarketing violation lawyer",
    "consumer fraud attorney",
  ],
  authors: [{ name: "Michael J. Fischetti", url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Florida Consumer Protection Attorney | FDCPA, FCRA & TCPA Lawyer",
    description: `Michael J. Fischetti is a Florida consumer protection attorney fighting FDCPA, FCRA, and TCPA violations. $30M+ recovered. No fees unless you win. Serving all of Florida. Call ${PRIMARY_PHONE}.`,
    images: [
      {
        url: "/opengraph-default.png",
        width: 1200,
        height: 630,
        alt: "Consumer Law Florida — Michael J. Fischetti, Consumer Protection Attorney",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Consumer Protection Attorney | FDCPA, FCRA & TCPA Lawyer",
    description: `Michael J. Fischetti is a Florida consumer protection attorney fighting FDCPA, FCRA, and TCPA violations. $30M+ recovered. No fees unless you win. Serving all of Florida. Call ${PRIMARY_PHONE}.`,
    images: ["/opengraph-default.png"],
  },
  alternates: {
    canonical: "/",
  },
  category: "Legal Services",
  classification: "Consumer Protection Law",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Orlando, Florida",
    "geo.position": "28.5383;-81.3792",
    "ICBM": "28.5383, -81.3792",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${playfairDisplay.variable} antialiased w-full h-full overflow-x-hidden  flex flex-col`}
        suppressHydrationWarning
      >
        <ConsentModeScript />

        {/* ── Sitewide JSON-LD Entity Graph ── */}
        {/* Schema 1: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Schema 2: Person — Attorney Michael J. Fischetti */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/* Schema 3: Primary statewide LegalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
        />
        {/* Schema 4: WebSite entity (no SearchAction — site has no search endpoint) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Schema 5: LocalBusiness — one per physical office */}
        {officeSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/*
          Static server-rendered nav — guaranteed in first-wave HTML for every page.
          sr-only: invisible to sighted users, fully crawlable by Googlebot without JS.
          All 7 target pages + primary site links are anchored here at the layout level.
        */}
        <nav aria-label="Site links" className="sr-only">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/consumer-law">Consumer Law</a></li>
            <li><a href="/consumer-law/fcra">FCRA — Credit Report Errors</a></li>
            <li><a href="/consumer-law/fdcpa">FDCPA — Debt Collector Harassment</a></li>
            <li><a href="/consumer-law/fdcpa/debt-collector-keeps-calling">Debt Collector Won&apos;t Stop Calling</a></li>
            <li><a href="/consumer-law/fdcpa/debt-collector-called-after-9pm">Debt Collector Called After 9 PM</a></li>
            <li><a href="/consumer-law/fdcpa/debt-collector-threatened-me">Debt Collector Made Illegal Threats</a></li>
            <li><a href="/consumer-law/fdcpa/debt-collector-called-my-work">Debt Collector Called My Workplace</a></li>
            <li><a href="/consumer-law/tcpa">TCPA — Robocalls &amp; Spam Texts</a></li>
            <li><a href="/consumer-law/tcpa/robocall-lawsuit-florida">Robocall Lawsuit Florida</a></li>
            <li><a href="/consumer-law/tcpa/spam-texts-florida">Spam Texts Florida</a></li>
            <li><a href="/consumer-law/tcpa/texted-stop-still-getting-texts">Texted STOP, Still Getting Texts</a></li>
            <li><a href="/locations">Our Locations</a></li>
            <li><a href="/locations/orlando">Consumer Rights Lawyer — Orlando</a></li>
            <li><a href="/locations/miami">Consumer Rights Lawyer — Miami</a></li>
            <li><a href="/locations/tampa">Consumer Rights Lawyer — Tampa</a></li>
            <li><a href="/locations/fort-lauderdale">Consumer Rights Lawyer — Fort Lauderdale</a></li>
            <li><a href="/locations/boynton-beach">Consumer Rights Lawyer — Boynton Beach</a></li>
            <li><a href="/locations/port-st-lucie">Consumer Rights Lawyer — Port St. Lucie</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/blog/how-to-sue-for-robocalls-florida">How to Sue for Robocalls in Florida</a></li>
            <li><a href="/blog/sue-debt-collector-harassment-florida">Sue a Debt Collector for Harassment in Florida</a></li>
            <li><a href="/blog/cash-app-class-action-lawsuit-tcpa-settlement">Cash App Class Action TCPA Settlement</a></li>
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/legal-disclaimer">Legal Disclaimer</a></li>
          </ul>
        </nav>
        <ConsentProvider>
          <TrackingScripts />
          <AttributionCapture />
          <UIStateProvider>
            <AutoOpenDialog />
            <FreeCaseReviewDialog respondToOpenRequest={true} />
            <NavbarWrapper />
            {children}
            <Footer />
            <FreeCaseReviewFABWrapper />
            <ClickTracking />
          </UIStateProvider>
          <CookieConsentBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
