import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";

export const metadata: Metadata = {
  title: { default: "Apex Agency — Premium Digital Marketing", template: "%s | Apex Agency" },
  description: "A premium digital marketing agency delivering SEO, paid ads, social media, and CRO strategies that drive real business growth.",
  keywords: ["digital marketing agency", "SEO agency", "paid ads", "CRO", "social media marketing"],
  openGraph: { type: "website", locale: "en_US", siteName: "Apex Agency" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-warm-50 text-char-900 font-sans">
        <Cursor />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
