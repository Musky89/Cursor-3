import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "default" | "compact";
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "default",
}: CTAButtonProps) {
  const base =
    "inline-flex items-center font-body transition-all duration-300 ease-out";

  const sizeStyles = {
    default: "text-[13px] tracking-editorial uppercase",
    compact: "text-[12px] tracking-wide-caps",
  };

  const variants = {
    primary: `${base} ${sizeStyles[size]} px-7 py-3.5 border border-gold-1/40 text-gold-1 hover:bg-gold-1/[0.07] hover:border-gold-1/60`,
    ghost: `${base} ${sizeStyles[size]} text-ink-3 hover:text-gold-2 group`,
  };

  return (
    <Link href={href} className={variants[variant]}>
      {children}
      {variant === "ghost" && (
        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </Link>
  );
}
