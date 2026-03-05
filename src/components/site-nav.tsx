import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/directory", label: "Directory" },
  { href: "/forum", label: "Forum" },
  { href: "/brands", label: "Brand Launches" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--background)]/85 backdrop-blur-xl">
      <nav className="lux-container flex items-center justify-between py-3">
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.14em] text-[color:var(--gold-soft)]"
        >
          OUD ATLAS
        </Link>
        <ul className="flex items-center gap-2 text-sm text-zinc-200 sm:gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className="rounded-full px-3 py-1.5 transition hover:bg-[color:var(--surface-soft)] hover:text-[color:var(--gold-soft)]"
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
