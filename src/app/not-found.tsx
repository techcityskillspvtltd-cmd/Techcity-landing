import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { HoverArrow } from "@/components/hover-arrow";
import { Navbar } from "@/components/navbar";
import { Crumbs } from "@/components/page-blocks";
import { container } from "@/lib/layout";
import { partnerNav } from "@/lib/nav";

export const metadata: Metadata = { title: "Page not found" };

/*
 * 404, for every address that doesn't exist (and every notFound()): kept
 * simple, in the inner pages' type. The message, a way home, and a line of
 * the pages most people want.
 */

const popular = [
  { label: "Programs", href: "/programs" },
  { label: "Projects", href: "/projects" },
  { label: "Products", href: "/products" },
  { label: "Partners", href: "/partners" },
  { label: "Company", href: "/company" },
];

export default function NotFound() {
  return (
    <>
      <Navbar nav={partnerNav} />
      <main className="overflow-x-clip">
        <section className="mt-16 border-t border-line">
          <div className={`${container} border-x border-b border-line`}>
            <div className="pp-hero-copy min-h-[calc(100svh-64px-220px)]">
              <Crumbs items={[{ label: "Home", href: "/" }, { label: "Page not found" }]} />
              <p className="mt-10 text-[clamp(64px,9vw,120px)] leading-none font-normal tracking-[-0.05em] text-[var(--g-lavender)]">
                404
              </p>
              <h1 className="pp-h1">
                This page isn&apos;t in the city. <span className="text-text-muted">It may have moved, or it never existed.</span>
              </h1>
              <div className="pp-actions">
                <Link href="/" className="btn btn-primary btn-lg">
                  Back to home
                  <HoverArrow />
                </Link>
              </div>
              <p className="mt-10 flex w-full max-w-none flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
                <span className="text-text-muted">Or go to</span>
                {popular.map((p) => (
                  <Link key={p.href} href={p.href} className="inline-flex items-center font-medium text-accent">
                    {p.label}
                    <HoverArrow />
                  </Link>
                ))}
              </p>
            </div>
          </div>
        </section>
        <div aria-hidden="true" className="relative -mt-px border-t border-line" />
      </main>
      <Footer />
    </>
  );
}
