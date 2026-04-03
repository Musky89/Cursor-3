"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/directory", label: "Directory" },
  { href: "/forum", label: "Forum" },
  { href: "/brands", label: "Brands" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[70] transition-colors duration-500"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,7,6,0.92) 0%, rgba(8,7,6,0.78) 60%, transparent 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-[72px]">
            {/* Wordmark */}
            <Link href="/" className="group flex items-baseline gap-1">
              <span className="font-display text-[1.3rem] text-ink-1 font-light tracking-wide">
                Oud
              </span>
              <span className="font-display text-[1.3rem] text-gold-1 font-light tracking-wide">
                Atlas
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[12px] tracking-editorial uppercase font-body font-medium transition-colors duration-300 py-1 ${
                      isActive
                        ? "text-gold-1"
                        : "text-ink-3 hover:text-ink-2"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold-1/50" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-[5px] p-2"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <span
                className={`block w-5 h-px bg-ink-2 transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[3px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-ink-2 transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-surface-900 flex items-start justify-center pt-28 px-6"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-full max-w-md border border-line/40 bg-surface-800/95 backdrop-blur-md px-6 py-8 space-y-6"
            onClick={(event) => event.stopPropagation()}
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block font-display text-[2rem] leading-none transition-colors duration-300 ${
                    isActive ? "text-gold-1" : "text-ink-2 hover:text-ink-1"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
