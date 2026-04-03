import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/30 mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Wordmark + tagline */}
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-display text-[1.2rem] text-ink-1 font-light tracking-wide">
                Oud
              </span>
              <span className="font-display text-[1.2rem] text-gold-1 font-light tracking-wide">
                Atlas
              </span>
            </div>
            <p className="text-ink-3 text-[14px] leading-relaxed max-w-xs">
              An editorial archive for those who believe fragrance
              is composition, not commodity.
            </p>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-3">
            <span className="block text-[10px] tracking-editorial uppercase text-ink-3 mb-5 font-medium">
              Navigate
            </span>
            <div className="flex flex-col gap-3">
              {[
                { href: "/directory", label: "Directory" },
                { href: "/forum", label: "Forum" },
                { href: "/brands", label: "Brands" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-ink-2 hover:text-gold-2 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <span className="block text-[10px] tracking-editorial uppercase text-ink-3 mb-5 font-medium">
              Philosophy
            </span>
            <p className="text-[13px] text-ink-3 leading-relaxed">
              Every composition tells a story. We exist to document those
              stories with the care and precision they deserve — away from
              algorithmic noise, closer to the craft.
            </p>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="divider-fine mt-14 mb-6" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-[11px] text-ink-3/60">
            © {new Date().getFullYear()} Oud Atlas. All rights reserved.
          </span>
          <span className="text-[11px] text-ink-3/40 italic font-display">
            For collectors, by collectors.
          </span>
        </div>
      </div>
    </footer>
  );
}
