import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/ui/footer";
import FreeCaseReviewFAB from "@/components/free-case-review-fab";
import { MapProvider } from "@/providers/map-provider";
import { UIStateProvider } from "@/providers/ui-state-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://consumerlawflorida.com"),
  title: {
    default: "Fischetti Law Group | Florida Consumer Protection Lawyers | FDCPA, FCRA, TCPA",
    template: "%s | Fischetti Law Group"
  },
  description: "Florida's premier consumer protection law firm. Fight debt collectors, fix credit errors, stop robocalls. Serving Miami, Fort Lauderdale, Tampa, Orlando. No win, no fee. $30M+ recovered. A+ BBB rating. Free case review.",
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
  authors: [{ name: "Michael J. Fischetti", url: "https://consumerlawflorida.com" }],
  creator: "Fischetti Law Group",
  publisher: "Fischetti Law Group",
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
    url: "https://consumerlawflorida.com",
    siteName: "Fischetti Law Group",
    title: "Fischetti Law Group | Florida Consumer Protection Lawyers",
    description: "Florida's premier consumer protection law firm. Fight debt collectors, fix credit errors, stop robocalls. Serving Miami, Fort Lauderdale, Tampa, Orlando. No win, no fee. $30M+ recovered.",
    images: [
      {
        url: "/fischettiheadshot5.png",
        width: 1200,
        height: 630,
        alt: "Michael J. Fischetti - Florida Consumer Protection Lawyer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fischetti Law Group | Florida Consumer Protection Lawyers",
    description: "Florida's premier consumer protection law firm. Fight debt collectors, fix credit errors, stop robocalls. No win, no fee. $30M+ recovered.",
    images: ["/fischettiheadshot5.png"],
    creator: "@FischettiLaw",
  },
  alternates: {
    canonical: "https://consumerlawflorida.com",
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
  return (
    <html lang="en" className="">
      <body
        className={`${openSans.variable} ${playfairDisplay.variable} antialiased w-full h-full overflow-x-hidden  flex flex-col`}
      >
        <MapProvider>
          <UIStateProvider>
            <Navbar />
            {children}
            <Footer />
            <FreeCaseReviewFAB />
          </UIStateProvider>
        </MapProvider>
      </body>
    </html>
  );
}
