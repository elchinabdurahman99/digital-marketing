"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

const links = [
  { label: "Services",  href: "/services" },
  { label: "Projects",  href: "/projects" },
  { label: "Blog",      href: "/blog" },
  { label: "About",     href: "/about" },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/90 backdrop-blur-2xl border-b border-warm-200 shadow-[0_2px_20px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-16 lg:h-[70px]">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-0">
            <span className="font-extrabold text-xl tracking-[-0.05em] text-char-900">APEX</span>
            <motion.span
              className="text-gold-400 font-extrabold text-xl"
              animate={{ rotate: [0, 0] }}
              whileHover={{ scale: 1.3, rotate: 12 }}
              transition={{ type: "spring", stiffness: 400, damping: 16 }}
            >
              .
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  pathname.startsWith(l.href)
                    ? "text-char-900"
                    : "text-char-500 hover:text-char-900",
                )}
              >
                {l.label}
                {pathname.startsWith(l.href) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-gold-400 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button href="/contact" size="sm" variant="secondary" arrow>Get started</Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-char-600 hover:bg-warm-100 transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-warm-50/98 backdrop-blur-xl pt-16 px-5 flex flex-col"
          >
            <nav className="flex flex-col gap-1 py-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    className={clsx(
                      "block px-4 py-4 rounded-xl text-2xl font-bold tracking-tight transition-colors",
                      pathname.startsWith(l.href) ? "text-gold-500" : "text-char-700 hover:text-char-900",
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-auto pb-10 border-t border-warm-200 pt-5">
              <Button href="/contact" variant="secondary" size="lg" arrow>Get started free</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
