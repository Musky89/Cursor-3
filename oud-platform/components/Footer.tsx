import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border-primary bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-700">
                <span className="font-display text-base font-bold text-bg-primary">
                  O
                </span>
              </div>
              <span className="font-display text-lg font-semibold text-text-primary">
                OudBase
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              The world&apos;s most comprehensive oud fragrance directory.
              Discover, compare, and discuss 2,600+ oud perfumes.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/directory", label: "All Fragrances" },
                { href: "/brands", label: "Brands" },
                { href: "/launches", label: "New Launches" },
                { href: "/directory?sort=rating", label: "Top Rated" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Community
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/forum", label: "Forum" },
                { href: "/forum?category=reviews", label: "Reviews" },
                { href: "/forum?category=recommendations", label: "Recommendations" },
                { href: "/forum?category=education", label: "Learn About Oud" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
              For Brands
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Want to feature your oud fragrance on OudBase? We work with
              premium brands to showcase new launches to our engaged community.
            </p>
            <Link
              href="/launches"
              className="mt-3 inline-block text-sm font-medium text-gold-400 transition-colors hover:text-gold-300"
            >
              Learn more &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-border-subtle pt-6">
          <p className="text-center text-xs text-text-muted">
            &copy; {new Date().getFullYear()} OudBase. Fragrance data sourced
            from public databases. All trademarks belong to their respective
            owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
