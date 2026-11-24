import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { PageHero, SectionHead } from "@/components/page-blocks";
import { ProductLogo } from "@/components/product-logo";
import { TechStack } from "@/components/tech-stack";
import { container } from "@/lib/layout";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The TechCity stack: Setu, Marg, Spardha, Riyaaz and Kaksha. Five tools, one account, from the first lesson to the first offer.",
  alternates: { canonical: "/products" },
};

/*
 * Products, the section's front door: the shared hero with the TechCity stack
 * (as on the home page), then a card for each product. Each product runs on
 * its own site, so the cards open it in a new tab; the last cell points to
 * the student platform, where one account opens all five.
 */

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <PageHero
        crumb={{ label: "Home", href: "/" }}
        eyebrow="Products"
        lead="Five tools, one account."
        rest="From the first lesson to the first offer."
        body="Setu runs the courses, Marg plans the path, Spardha tests it, Riyaaz builds the daily habit and Kaksha teaches in cohorts. Students sign in once and use them all."
        picture={
          <div className="pp-dots p-6 sm:p-8">
            <TechStack className="h-[380px] w-auto max-w-full sm:h-[440px]" />
          </div>
        }
        actions={
          <>
            <a href="#contact" className="btn btn-primary btn-lg">
              Partner with us
              <HoverArrow />
            </a>
            <Link href="/students" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              For students
            </Link>
          </>
        }
      />

      <section>
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Every product." rest="Each runs on its own site; open one to sign in." />
          <div className="pp-tiles" style={{ "--n": 3 } as React.CSSProperties}>
            {products.map((p) => (
              <a
                key={p.id}
                id={p.id}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="pp-tiles__cell group scroll-mt-24"
              >
                <span className="flex items-center gap-3">
                  <ProductLogo id={p.id} size={40} />
                  <span>
                    <span className="block text-[17px] leading-[1.3] font-medium text-text">{p.name}</span>
                    <span className="block text-[13px] text-text-muted">{p.category}</span>
                  </span>
                </span>
                <p className="mt-6 text-[15px] leading-[1.6] text-text-muted">{p.blurb}</p>
                <ul className="mt-4 flex flex-col gap-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[14px] text-text-soft">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--g-indigo)]" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center pt-6 text-[14px] font-medium text-accent">
                  Open {p.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                  <HoverArrow />
                </span>
              </a>
            ))}
            <Link href="/students" className="pp-tiles__cell group">
              <span className="text-[13px] font-medium text-[var(--g-indigo)]">One account</span>
              <p className="mt-6 text-[17px] leading-[1.45] tracking-[-0.01em]">
                <span className="font-medium text-text">All five, one sign-in.</span>{" "}
                <span className="text-text-muted">Students open every tool from the same account, and their progress follows them.</span>
              </p>
              <span className="mt-auto inline-flex items-center pt-6 text-[14px] font-medium text-accent">
                The student platform
                <HoverArrow />
              </span>
            </Link>
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
