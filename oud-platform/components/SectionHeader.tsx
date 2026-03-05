import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
  title,
  subtitle,
  href,
  linkText = "View all",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="hidden items-center gap-1 text-sm font-medium text-gold-400 transition-colors hover:text-gold-300 sm:flex"
        >
          {linkText}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
