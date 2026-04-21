import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";

const footerLinks = {
  Services: [
    { label: "SEO",          href: "/services" },
    { label: "Paid Ads",     href: "/services" },
    { label: "Social Media", href: "/services" },
    { label: "CRO",          href: "/services" },
  ],
  Company: [
    { label: "About",    href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog",     href: "/blog" },
    { label: "Contact",  href: "/contact" },
  ],
  Resources: [
    { label: "Case Studies", href: "/projects" },
    { label: "Blog",         href: "/blog" },
    { label: "Free Audit",   href: "/contact" },
    { label: "Careers",      href: "/about" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-warm-50 border-t border-warm-200">

      {/* CTA band */}
      <div className="bg-char-900 py-20 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-gold-400 mb-4">Ready to grow?</p>
          <h2 className="text-3xl lg:text-[52px] font-extrabold text-white tracking-tight mb-5 text-balance leading-[1.05]">
            Turn your marketing into<br className="hidden lg:block" />
            a revenue machine.
          </h2>
          <p className="text-white/50 mb-8 text-lg max-w-xl mx-auto">
            Free 30-min strategy call. No commitment, no fluff.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="/contact" variant="secondary" size="lg" arrow>Book free strategy call</Button>
            <Button href="/projects" size="lg" className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/15">View case studies</Button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-end gap-0 mb-5">
              <span className="font-extrabold text-xl tracking-[-0.05em] text-char-900">APEX</span>
              <span className="text-gold-400 font-extrabold text-xl">.</span>
            </Link>
            <p className="text-sm text-warm-500 leading-relaxed max-w-[220px] mb-6">
              A premium digital marketing agency helping ambitious brands grow faster with data-driven strategy.
            </p>
            <div className="flex items-center gap-2">
              {["X", "LinkedIn", "Instagram"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="w-8 h-8 rounded-lg bg-warm-100 border border-warm-200 flex items-center justify-center text-warm-500 hover:border-gold-400 hover:text-gold-500 transition-all duration-200"
                >
                  <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
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
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-warm-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-warm-400">© 2025 Apex Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-warm-400 hover:text-char-700 transition-colors">Privacy</Link>
            <Link href="#" className="text-xs text-warm-400 hover:text-char-700 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
