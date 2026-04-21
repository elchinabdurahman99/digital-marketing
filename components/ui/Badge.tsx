import { clsx } from "clsx";

const colorMap: Record<string, string> = {
  gold:    "bg-gold-100 text-gold-600 border-gold-200",
  amber:   "bg-amber-50  text-amber-700 border-amber-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  rose:    "bg-rose-50   text-rose-700   border-rose-100",
  violet:  "bg-violet-50 text-violet-700 border-violet-100",
  warm:    "bg-warm-100  text-warm-600   border-warm-200",
  // legacy aliases
  brand:   "bg-gold-100  text-gold-600   border-gold-200",
  blue:    "bg-violet-50 text-violet-700 border-violet-100",
  pink:    "bg-rose-50   text-rose-700   border-rose-100",
  gray:    "bg-warm-100  text-warm-600   border-warm-200",
};

interface BadgeProps {
  children: React.ReactNode;
  color?:   string;
  className?: string;
}

export default function Badge({ children, color = "warm", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full border tracking-wide",
        colorMap[color] ?? colorMap.warm,
        className,
      )}
    >
      {children}
    </span>
  );
}
