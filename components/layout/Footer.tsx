import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import { getSiteSettings } from "@/sanity/lib/queries";

const services = [
  "Paid Search",
  "Paid Social",
  "Programmatic Media Buying",
  "SEO",
  "Website Development",
  "Affiliate Marketing",
];

const company = [
// { label: "About",       href: "/about" },
  { label: "Projects",    href: "/projects" },
  { label: "Blog",        href: "/blog" },
  { label: "Contact",     href: "/contact" },
];

const socials = [
  { label: "LinkedIn",  href: "#" },
  { label: "Instagram", href: "#" },
  { label: "X",         href: "#" },
];

export default async function Footer() {
  const settings = await getSiteSettings();
  const email = settings?.contact?.email || "hello@roivex.com";
  const phone = settings?.contact?.phone || "+1 (234) 567-890";
  const address = settings?.contact?.address || "New York, NY";
  const siteName = settings?.siteName || "Roivex Digital Marketing Agency";

  return (
    <footer className="bg-warm-50 border-t border-warm-200">

      {/* CTA band */}
      <div className="bg-white border-b border-warm-200 py-20 px-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-gold-100 blur-3xl opacity-60" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-gold-500 mb-4">Ready to grow?</p>
          <h2 className="display-serif text-[clamp(32px,5vw,56px)] text-char-900 tracking-tight mb-5 leading-[1.05]">
            Turn your marketing into<br className="hidden lg:block" />
            <em className="not-italic gradient-gold">a revenue machine.</em>
          </h2>
          <p className="text-warm-500 mb-8 text-lg max-w-xl mx-auto">
            Free 30-min strategy call. No commitment, no fluff.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="/contact" variant="secondary" size="lg" arrow>Book free strategy call</Button>
            <Button href="/projects" size="lg" variant="outline">View case studies</Button>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1.5fr_1fr_1.5fr] gap-10">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo.svg"
                alt="Roivex Digital Marketing Agency"
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-warm-500 leading-relaxed max-w-[220px] mb-6">
              A premium digital marketing agency helping ambitious brands grow faster with data-driven strategy.
            </p>
            <div className="space-y-2 mb-6">
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-xs text-warm-500 hover:text-gold-500 transition-colors">
                <Mail size={12} className="text-gold-400" />{email}
              </a>
              <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-xs text-warm-500 hover:text-gold-500 transition-colors">
                <Phone size={12} className="text-gold-400" />{phone}
              </a>
              <span className="flex items-center gap-2 text-xs text-warm-500">
                <MapPin size={12} className="text-gold-400" />{address}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-warm-100 border border-warm-200 flex items-center justify-center text-warm-500 hover:border-gold-400 hover:text-gold-500 hover:bg-gold-50 transition-all duration-200"
                >
                  <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400 mb-5">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-sm text-char-500 hover:text-gold-500 transition-colors duration-200 font-medium flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400 mb-5">Company</h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-char-500 hover:text-gold-500 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust badges */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400 mb-5">Recognition</h4>
            <div className="space-y-2.5">
              {["G2 Top Agency 2024", "Clutch Global Leader", "Forbes Agency Council", "98% Retention Rate"].map((a) => (
                <div key={a} className="flex items-center gap-2">
                  <span className="text-gold-400 text-sm">✦</span>
                  <span className="text-xs font-medium text-char-600">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-warm-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-warm-400">© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-warm-400 hover:text-char-700 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-warm-400 hover:text-char-700 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
