import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "commondatastorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "uhbyrvazvzoqkixwliqu.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.b-cdn.net",
      },
    ],
  },
  async redirects() {
    return [
      // Service area URL variants — redirect to canonical slugs
      { source: "/locations/miami-consumer-lawyer", destination: "/locations/miami", permanent: true },
      { source: "/locations/tampa-consumer-lawyer", destination: "/locations/tampa", permanent: true },
      { source: "/locations/fort-lauderdale-consumer-lawyer", destination: "/locations/fort-lauderdale", permanent: true },

      // Trailing slash normalization for practice area pages
      { source: "/consumer-law/fdcpa/", destination: "/consumer-law/fdcpa", permanent: true },
      { source: "/consumer-law/tcpa/", destination: "/consumer-law/tcpa", permanent: true },
      { source: "/consumer-law/fcra/", destination: "/consumer-law/fcra", permanent: true },

      // Permanent redirects for removed practice areas
      { source: "/consumer-law/privacy", destination: "/consumer-law/fcra", permanent: true },
      { source: "/consumer-law/privacy/", destination: "/consumer-law/fcra", permanent: true },
      { source: "/consumer-law/vppa", destination: "/consumer-law/tcpa", permanent: true },
      { source: "/consumer-law/vppa/", destination: "/consumer-law/tcpa", permanent: true },
      { source: "/consumer-law/fha", destination: "/consumer-law/fdcpa", permanent: true },
      { source: "/consumer-law/fha/", destination: "/consumer-law/fdcpa", permanent: true },
      { source: "/consumer-law/mass-arbitration", destination: "/consumer-law/tcpa", permanent: true },
      { source: "/consumer-law/mass-arbitration/", destination: "/consumer-law/tcpa", permanent: true },

      // Redirect any blog posts that may reference removed practice areas
      { source: "/blog/:slug1(vppa-.*)", destination: "/blog", permanent: true },
      { source: "/blog/:slug2(fair-housing-.*)", destination: "/blog", permanent: true },
      { source: "/blog/:slug3(mass-arbitration-.*)", destination: "/blog", permanent: true },
      { source: "/blog/:slug4(data-breach-.*)", destination: "/blog", permanent: true },

      // Trailing slash normalization for location pages
      { source: "/locations/orlando/", destination: "/locations/orlando", permanent: true },
      { source: "/locations/port-st-lucie/", destination: "/locations/port-st-lucie", permanent: true },
      { source: "/locations/boynton-beach/", destination: "/locations/boynton-beach", permanent: true },
      { source: "/locations/miami/", destination: "/locations/miami", permanent: true },
      { source: "/locations/tampa/", destination: "/locations/tampa", permanent: true },
      { source: "/locations/fort-lauderdale/", destination: "/locations/fort-lauderdale", permanent: true },
    ]
  },
};

export default nextConfig;
