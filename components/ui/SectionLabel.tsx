interface SectionLabelProps {
  children: React.ReactNode;
  center?: boolean;
}

export default function SectionLabel({ children, center }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${center ? "justify-center" : ""}`}>
      <span className="block h-px w-8 bg-gold-400" />
      <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-gold-500">
        {children}
      </span>
    </div>
  );
}
