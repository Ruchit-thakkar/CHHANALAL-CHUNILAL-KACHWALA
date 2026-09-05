import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F5F2EC",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Chhanalal Chunilal Kachwala | Glass, Aluminium & Mirror Work",
  description:
    "Glass, aluminium fabrication, glass railing, LED mirrors and custom mirror design solutions by Chhanalal Chunilal Kachwala.",
  keywords: [
    "Glass Merchant",
    "Aluminium Fabrication",
    "Aluminium Profile Work",
    "Glass Railing",
    "LED Mirrors",
    "Custom Mirror Designs",
    "Decorative Glass",
    "Architectural Glass",
    "Chhanalal Chunilal Kachwala",
  ],
  authors: [{ name: "Chhanalal Chunilal Kachwala" }],
  openGraph: {
    title: "Chhanalal Chunilal Kachwala | Glass, Aluminium & Mirror Work",
    description:
      "Precision-crafted glass, aluminium fabrication, architectural railings and custom designer mirrors for residential, commercial and interior spaces.",
    url: "https://cckachwala.com",
    siteName: "Chhanalal Chunilal Kachwala",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Chhanalal Chunilal Kachwala",
    description:
      "Specialized glass merchant, aluminium fabrication studio, glass railings, LED mirrors, and custom architectural glass solutions.",
    currenciesAccepted: "INR",
    openingHours: "Mo-Sa 09:30-20:00",
    serviceArea: "Residential, Commercial, Interior Projects",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Glass & Aluminium Fabrication Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Glass Merchant & Supply" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aluminium Fabrication & Windows" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aluminium Profile Systems" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Toughened Glass Railing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom LED Mirrors" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Designer Decorative Glass" } },
      ],
    },
  };

  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#F5F2EC] text-[#171717] font-sans antialiased selection:bg-[#B99A63]/30 selection:text-[#171717]">
        {children}
      </body>
    </html>
  );
}
