import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";

const BASE_URL = "https://roivex.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:  "Roivex — Digital Marketing Agency | Paid Search, SEO & More",
    template: "%s | Roivex Digital Marketing",
  },
  description:
    "Roivex is a premium digital marketing agency delivering Paid Search, Paid Social, Programmatic Media Buying, SEO, Website Development, and Affiliate Marketing that drive measurable revenue growth.",
  keywords: [
    "digital marketing agency",
    "paid search agency",
    "paid social media",
    "programmatic media buying",
    "SEO agency",
    "website development agency",
    "affiliate marketing",
    "performance marketing",
    "roivex",
  ],
  authors: [{ name: "Roivex Digital Marketing" }],
  creator: "Roivex",
  publisher: "Roivex Digital Marketing Agency",
  openGraph: {
    type:      "website",
    locale:    "en_US",
    url:       BASE_URL,
    siteName:  "Roivex",
    title:     "Roivex — Digital Marketing Agency",
    description:
      "Paid Search, Paid Social, Programmatic, SEO, Web Dev & Affiliate Marketing — all under one roof.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Roivex Digital Marketing Agency" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Roivex — Digital Marketing Agency",
    description: "Paid Search, Paid Social, Programmatic, SEO, Web Dev & Affiliate Marketing.",
    images:      ["/og-image.png"],
    creator:     "@roivex",
  },
  robots: {
    index:           true,
    follow:          true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },
  alternates: { canonical: BASE_URL },
  verification: {
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",  // add after Search Console setup
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name:   "Roivex Digital Marketing Agency",
      url:    BASE_URL,
      logo: {
        "@type":       "ImageObject",
        url:           `${BASE_URL}/logo.svg`,
        width:         280,
        height:        96,
      },
      description:
        "Premium digital marketing agency specializing in Paid Search, Paid Social, Programmatic Media Buying, SEO, Website Development, and Affiliate Marketing.",
      address: {
        "@type":           "PostalAddress",
        addressLocality:   "New York",
        addressRegion:     "NY",
        addressCountry:    "US",
      },
      contactPoint: {
        "@type":       "ContactPoint",
        contactType:   "Customer Service",
        email:         "hello@roivex.com",
        availableLanguage: "English",
      },
      sameAs: [
        "https://www.linkedin.com/company/roivex",
        "https://www.instagram.com/roivex",
      ],
    },
    {
      "@type":       "WebSite",
      "@id":         `${BASE_URL}/#website`,
      url:           BASE_URL,
      name:          "Roivex",
      publisher:     { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type":       "SearchAction",
        target:        { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/blog?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type":         "ProfessionalService",
      "@id":           `${BASE_URL}/#service`,
      name:            "Roivex Digital Marketing Agency",
      url:             BASE_URL,
      image:           `${BASE_URL}/logo.png`,
      priceRange:      "$$$$",
      servesCuisine:   undefined,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name:    "Digital Marketing Services",
        itemListElement: [
          "Paid Search", "Paid Social", "Programmatic Media Buying",
          "SEO", "Website Development", "Affiliate Marketing",
        ].map((service, i) => ({
          "@type":    "Offer",
          position:   i + 1,
          itemOffered: { "@type": "Service", name: service },
        })),
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-warm-50 text-char-900 font-sans">
        <Cursor />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
