import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";

import { getSiteSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName || "Roivex";
  const BASE_URL = "https://roivex.com"; // Replace with actual env var if needed
  
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: settings?.seo?.metaTitle || `${siteName} — Digital Marketing Agency`,
      template: `%s | ${siteName}`,
    },
    description: settings?.seo?.metaDescription || "Premium digital marketing agency driving measurable revenue growth.",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: BASE_URL,
      siteName: siteName,
      title: settings?.seo?.metaTitle || siteName,
      description: settings?.seo?.metaDescription || "",
      images: settings?.seo?.ogImage ? [{ url: urlFor(settings.seo.ogImage).url() }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: settings?.seo?.metaTitle || siteName,
      description: settings?.seo?.metaDescription || "",
      images: settings?.seo?.ogImage ? [urlFor(settings.seo.ogImage).url()] : [],
      creator: settings?.seo?.twitterHandle || "",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Dynamic JSON-LD could be added here, but keeping it simple for now */}
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
