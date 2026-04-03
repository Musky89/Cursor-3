interface MetricBadgeProps {
  label: string;
  value: string | number;
  compact?: boolean;
}

export function MetricBadge({ label, value, compact = false }: MetricBadgeProps) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-3">
        <span className="text-ink-2 font-medium">{value}</span>
        <span>{label}</span>
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center px-5 py-4">
      <span className="font-display text-[1.4rem] text-ink-1 font-light leading-none">
        {value}
      </span>
      <span className="mt-1.5 text-[10px] tracking-editorial uppercase text-ink-3 font-body">
        {label}
      </span>
    </div>
  );
}
