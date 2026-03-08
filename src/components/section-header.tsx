interface SectionHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignClass} mb-10 md:mb-16`}>
      {kicker && (
        <span className="inline-block text-[11px] tracking-editorial uppercase text-gold-1 mb-4 font-body font-medium">
          {kicker}
        </span>
      )}
      <h2 className="font-display text-[2.5rem] sm:text-display-lg text-ink-1 font-light leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-ink-3 max-w-xl leading-relaxed text-[15px] sm:text-[15px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
