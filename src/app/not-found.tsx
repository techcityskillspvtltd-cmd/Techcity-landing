import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { HoverArrow } from "@/components/hover-arrow";
import { LostStack } from "@/components/lost-stack";
import { Navbar } from "@/components/navbar";
import { SectionHead } from "@/components/page-blocks";
import { container } from "@/lib/layout";
import { partnerNav } from "@/lib/nav";
import "@/components/not-found.css";

export const metadata: Metadata = { title: "Page not found" };

/*
 * 404, for every address that doesn't exist (and every notFound()): the
 * site's own navbar and footer, a hero in the inner pages' language with the
 * stack missing a plate (components/lost-stack), then the pages most people want.
 */

const popular = [
  { label: "Programs", body: "For students and for colleges", href: "/programs" },
  { label: "Projects", body: "Running on campus now", href: "/projects" },
  { label: "Products", body: "Five tools, one account", href: "/products" },
  { label: "Partners", body: "Colleges and companies", href: "/partners" },
  { label: "Our story", body: "How TechCity started", href: "/company/story" },
  { label: "Careers", body: "Teach with us", href: "/company/careers" },
];

export default function NotFound() {
  return (
    <>
      <Navbar nav={partnerNav} />
      <main className="overflow-x-clip">
        <section className="mt-16 border-t border-line">
          <div className={`${container} border-x border-b border-line`}>
            <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
              <div className="flex flex-col justify-center px-5 pt-14 pb-12 sm:px-10 sm:pt-20 lg:pb-20">
                <p className="pp-eyebrow">
                  <Link href="/" className="hover:text-text">
                    Home
                  </Link>
                  <span aria-hidden="true">/</span>
                  <span className="text-text">Page not found</span>
                </p>
                <h1 className="mt-6 text-[clamp(32px,4vw,52px)] leading-[1.08] font-normal tracking-[-0.035em] text-text">
                  This page isn&apos;t in the city.{" "}
                  <span className="text-text-muted">It may have moved, or it never existed.</span>
                </h1>
                <p className="mt-6 max-w-[460px] text-[17px] leading-[1.6] text-text-muted">
                  Check the address, or head back home. Everything on TechCity is a click away from there.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/" className="btn btn-primary btn-lg">
                    Back to home
                    <HoverArrow />
                  </Link>
                  <a href="#contact" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
                    Contact us
                  </a>
                </div>
              </div>
              <div className="pp-dots border-t border-line px-6 py-10 lg:border-t-0 lg:border-l">
                <LostStack />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={`${container} border-x border-b border-line`}>
            <SectionHead lead="Popular pages." rest="Where most people are headed." />
            <ul className="nf-links">
              {popular.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="nf-link group">
                    <span>
                      <span className="block text-[17px] font-medium tracking-[-0.01em] text-text">{p.label}</span>
                      <span className="mt-1 block text-[14px] text-text-muted">{p.body}</span>
                    </span>
                    <span className="text-accent">
                      <HoverArrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <div aria-hidden="true" className="relative -mt-px border-t border-line" />
      </main>
      <Footer />
    </>
  );
}
