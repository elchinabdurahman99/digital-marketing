"use client";
import Link from "next/link";
import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size    = "sm" | "md" | "lg";

interface ButtonProps {
  children:  React.ReactNode;
  variant?:  Variant;
  size?:     Size;
  href?:     string;
  arrow?:    boolean;
  className?: string;
  onClick?:  () => void;
  type?:     "button" | "submit";
  disabled?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-char-900 text-white hover:bg-char-800 shadow-[0_2px_8px_0_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.2)]",
  secondary:
    "bg-gold-400 text-white hover:bg-gold-500 shadow-[0_2px_12px_0_rgba(200,164,90,0.3)] hover:shadow-[0_8px_28px_0_rgba(200,164,90,0.45)]",
  ghost:
    "bg-warm-100 text-char-700 hover:bg-warm-200 border border-warm-200",
  outline:
    "bg-transparent border border-warm-300 text-char-600 hover:border-char-900 hover:text-char-900",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
};

export default function Button({
  children, variant = "primary", size = "md",
  href, arrow = false, className, onClick, type = "button", disabled,
}: ButtonProps) {
  const base = clsx(
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 select-none tracking-tight",
    variants[variant], sizes[size],
    disabled && "opacity-40 pointer-events-none",
    className,
  );

  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          className="transition-transform duration-200 group-hover:translate-x-1"
          size={size === "lg" ? 18 : 15}
        />
      )}
    </>
  );

  if (href) return <Link href={href} className={clsx(base, "group")}>{inner}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={clsx(base, "group")}>{inner}</button>;
}

/* Magnetic gold CTA button */
export function GoldButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  const inner = (
    <motion.span
      className={clsx(
        "inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base tracking-tight",
        "bg-gold-400 text-white",
        "shadow-[0_4px_24px_0_rgba(200,164,90,0.35)]",
        className,
      )}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 36px 0 rgba(200,164,90,0.50)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      {children}
    </motion.span>
  );

  if (href) return <Link href={href}>{inner}</Link>;
  return inner;
}
