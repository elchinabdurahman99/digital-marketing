interface MarqueeProps {
  items: string[];
  className?: string;
}

export default function Marquee({ items, className }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 px-10 text-xs font-bold tracking-[0.22em] uppercase text-warm-400 select-none"
          >
            {item}
            <span className="inline-block w-1 h-1 rounded-full bg-gold-300 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
