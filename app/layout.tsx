import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/ui/footer";
import FreeCaseReviewFAB from "@/components/free-case-review-fab";
import { MapProvider } from "@/providers/map-provider";
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
  title: "Fischetti Consumer Law",
  description: "Fischetti Consumer Law is a law firm that specializes in consumer law. We help consumers get the compensation they deserve for unfair business practices.",
  icons: {
    icon: "/icon.png",
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
        <MapProvider >
          <Navbar />
          {children}
          <Footer />
          <FreeCaseReviewFAB />
        </MapProvider>
      </body>
    </html>
  );
}
