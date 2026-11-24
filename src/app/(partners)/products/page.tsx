import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { SectionHero } from "@/components/section-hero";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The TechCity stack: Setu, Marg, Spardha, Riyaaz and Kaksha. Five tools, one account, from the first lesson to the first offer.",
  alternates: { canonical: "/products" },
};

/** Products, the section's front door: a short headline and the five products, each opening its own site. */
export default function Page() {
  return (
    <main className="overflow-x-clip">
      <SectionHero
        crumb={[{ label: "Home", href: "/" }, { label: "Products" }]}
        lead="Five tools, one account."
        rest="From the first lesson to the first offer."
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
        card={{
          title: "All products",
          links: products.map((p) => ({ label: p.name, href: p.href, description: p.category, product: p.id, external: true })),
        }}
      />
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
