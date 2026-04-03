interface EditorialPanelProps {
  children: React.ReactNode;
  variant?: "default" | "inset" | "bordered";
  className?: string;
}

export function EditorialPanel({
  children,
  variant = "default",
  className = "",
}: EditorialPanelProps) {
  const variants = {
    default: "bg-surface-800/50",
    inset: "bg-surface-800/80 border border-line/50",
    bordered: "border border-line/40 bg-transparent",
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
