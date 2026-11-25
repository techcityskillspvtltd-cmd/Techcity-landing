import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { ProductLogo } from "@/components/product-logo";
import { ProductScene } from "@/components/product-scenes";
import { StudentHero } from "@/components/students/blocks";
import { AccountScene } from "@/components/students/scenes";
import { container } from "@/lib/layout";
import { products } from "@/lib/products";
import { tools } from "@/lib/students";

export const metadata: Metadata = {
  title: "Features",
  description:
    "What your TechCity account does: roadmaps on Marg, daily practice on Riyaaz, contests on Spardha, cohort courses on Kaksha and your classes on Setu.",
  alternates: { canonical: "/students/features" },
};

/*
 * Features: what a student's account does. The hero switches the five tools
 * on (a stageshow scene); then one row per tool, its words on one side and
 * its own scene on the other (components/product-scenes, the same moments the
 * home page's Products section plays), alternating sides.
 */

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <StudentHero
        crumb={[{ label: "Students", href: "/students" }, { label: "Features" }]}
        title={
          <>
            Everything you need to <span className="mark">get good</span>, on one account.
          </>
        }
        lede="Plan the path, practise every day, prove it in contests, learn with a cohort and keep your classes in one place."
        actions={
          <>
            <a href="#contact" className="btn btn-primary btn-lg">
              Create your account
              <HoverArrow />
            </a>
            <Link href="/students#your-path" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              See your path
            </Link>
          </>
        }
        picture={<AccountScene />}
      />

      {tools.map((t, i) => {
        const p = products.find((x) => x.id === t.id)!;
        return (
          <section key={t.id} id={t.id} className={`scroll-mt-20 ${i % 2 ? "bg-surface-subdued" : ""}`}>
            <div className={`${container} border-x border-b border-line`}>
              <div className={`sd-feature sd-feature--${t.id}`} data-flip={i % 2 ? "" : undefined}>
                <div>
                  <p className="sd-feature__num">0{i + 1}</p>
                  <p className="mt-5 flex items-center gap-3">
                    <ProductLogo id={t.id} size={36} />
                    <span className="text-[15px] text-text-muted">
                      <span className="font-medium text-text">{p.name}</span> · {p.category}
                    </span>
                  </p>
                  <h2 className="mt-6 text-[clamp(26px,2.8vw,36px)] leading-[1.15] font-normal tracking-[-0.025em] text-text">{t.lead}</h2>
                  <p className="mt-4 max-w-[460px] text-[16px] leading-[1.65] text-text-muted">{t.body}</p>
                  <ul className="sd-points">
                    {t.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <a href={p.href} target="_blank" rel="noreferrer" className="btn btn-secondary btn-lg mt-8 shadow-[var(--shadow-btn)]">
                    Open {p.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                    <HoverArrow />
                  </a>
                </div>
                <div className="sd-feature__scene">
                  <ProductScene id={t.id} variant="panel" />
                </div>
              </div>
            </div>
          </section>
        );
      })}
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
