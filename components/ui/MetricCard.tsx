interface MetricCardProps {
  value: string;
  label: string;
}

export default function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-warm-200 p-5 text-center card-hover">
      <div className="text-3xl font-extrabold tracking-tight mb-1 text-gold-400">{value}</div>
      <div className="text-xs font-medium text-warm-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}
