import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oud Atlas — A Fragrance Editorial",
  description:
    "An editorial archive for fine fragrance. Compositions documented with care, away from algorithmic noise, closer to the craft.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-surface-900">
      <body className="min-h-screen flex flex-col">
        {/* Subtle noise overlay for depth */}
        <div className="noise-overlay" aria-hidden="true" />

        <SiteNav />

        <main className="flex-1 pt-[72px]">{children}</main>

        <SiteFooter />
      </body>
    </html>
  );
}
