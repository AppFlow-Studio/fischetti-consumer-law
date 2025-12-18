import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/ui/footer";
import FreeCaseReviewFABWrapper from "@/components/free-case-review-fab-wrapper";
import { MapProvider } from "@/providers/map-provider";
import { UIStateProvider } from "@/providers/ui-state-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import ClickTracking from "@/components/analytics/ClickTracking";
import { SITE_NAME, SITE_URL, PRIMARY_PHONE, PRIMARY_EMAIL, STATE_SERVE, SERVE_STATEMENT, GTM_ID } from "@/lib/site";

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
    default: "Florida Consumer Rights Lawyers | Consumer Law Florida",
    template: "%s | Consumer Law Florida"
  },
  description: `Florida consumer lawyer for credit report errors, debt collection harassment, robocalls, and privacy violations. No fee unless we win. Serving all of Florida. Call (833) 645-3247.`,
  keywords: [
    "Florida consumer lawyer",
    "consumer protection attorney Florida",
    "FDCPA lawyer Florida",
    "FCRA attorney Miami",
    "TCPA violation lawyer",
    "debt collection harassment attorney",
    "credit report error lawyer",
    "robocall attorney Florida",
    "consumer law firm Miami",
    "debt collector lawyer Fort Lauderdale",
    "credit reporting attorney Tampa",
    "consumer rights lawyer Orlando",
    "no win no fee consumer lawyer",
    "Florida consumer protection",
    "debt collection defense",
    "credit repair attorney",
    "telemarketing violation lawyer",
    "consumer fraud attorney"
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
    title: "Florida Consumer Rights Lawyers | Consumer Law Florida",
    description: `Florida consumer lawyer for credit report errors, debt collection harassment, robocalls, and privacy violations. No fee unless we win. Serving all of Florida. Call (833) 645-3247.`,
    images: [
      {
        url: "/opengraph-default.png",
        width: 1200,
        height: 630,
        alt: "Consumer Law Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Consumer Rights Lawyers | Consumer Law Florida",
    description: `Florida consumer lawyer for credit report errors, debt collection harassment, robocalls, and privacy violations. No fee unless we win. Serving all of Florida. Call (833) 645-3247.`,
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
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Florida",
    "geo.position": "25.7617;-80.1918", // Miami coordinates
    "ICBM": "25.7617, -80.1918",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Sitewide JSON-LD schemas
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PRIMARY_PHONE,
    email: PRIMARY_EMAIL,
    areaServed: {
      "@type": "State",
      name: STATE_SERVE,
    },
    description: SERVE_STATEMENT,
  }

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PRIMARY_PHONE,
    email: PRIMARY_EMAIL,
    serviceType: "Consumer Law",
    areaServed: {
      "@type": "State",
      name: STATE_SERVE,
    },
    description: SERVE_STATEMENT,
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${playfairDisplay.variable} antialiased w-full h-full overflow-x-hidden  flex flex-col`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* Google tag (gtag.js) - GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2PL17PC8C5"
          strategy="afterInteractive"
        />
        <Script
          id="ga4"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2PL17PC8C5');
            `,
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Sitewide JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <MapProvider>
          <UIStateProvider>
            <Navbar />
            {children}
            <Footer />
            <FreeCaseReviewFABWrapper />
            <ClickTracking />
          </UIStateProvider>
        </MapProvider>
      </body>
    </html>
  );
}
