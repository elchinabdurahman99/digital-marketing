import { getSiteSettings } from "@/sanity/lib/queries";
import ContactPageClient from "@/components/pages/ContactPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Roivex Digital Marketing Agency.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return <ContactPageClient contact={settings?.contact} />;
}
