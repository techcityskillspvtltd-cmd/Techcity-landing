import type { Metadata } from "next";
import { Guides, ReportCard, ReportMark, ReportRow } from "@/components/reports";
import { ReportsFeatured } from "@/components/reports-featured";
import { container } from "@/lib/layout";
import { FEATURED, reports } from "@/lib/reports";

export const metadata: Metadata = {
  title: "Reports",
  description: "Reports from TechCity partner campuses: what each college ran, how the term went, and what comes next.",
  alternates: { canonical: "/reports" },
};

export default function Page() {
  const featured = reports.slice(0, FEATURED);
  const pair = reports.slice(FEATURED, FEATURED + 2);

  return (
    <main className="overflow-x-clip">
      {/* Title and the featured report, with its picker strip. */}
      <section className="mt-16 border-t border-line">
        <div className={`${container} relative border-x border-line`}>
          <Guides />
          <div className="rp-top">
            <div className="rp-top__intro">
              <h1 className="text-[clamp(36px,4vw,52px)] leading-[1.05] font-normal tracking-[-0.035em] text-text">Reports</h1>
              <p className="mt-6 max-w-[300px] text-[17px] leading-[1.6] text-text-muted">
                What each partner campus ran, how the term went, and what comes next.
              </p>
            </div>
            <ReportsFeatured
              cards={featured.map((r, i) => (
                <ReportCard key={r.slug} report={r} big priority={i === 0} />
              ))}
              marks={featured.map((r) => (
                <ReportMark key={r.slug} report={r} />
              ))}
              labels={featured.map((r) => `Show: ${r.title}`)}
            />
          </div>

          {/* Two more, side by side. */}
          <div className="rp-pair">
            {pair.map((r) => (
              <ReportCard key={r.slug} report={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Every report, newest first. */}
      <section>
        <div className={`${container} relative border-x border-b border-line`}>
          <Guides />
          <h2 className="rp-all__title">All reports</h2>
          <ul className="rp-rows">
            {reports.map((r) => (
              <ReportRow key={r.slug} report={r} />
            ))}
          </ul>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
