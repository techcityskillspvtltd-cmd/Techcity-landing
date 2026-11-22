import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { HoverArrow } from "@/components/hover-arrow";
import { Guides, ReportCover, ReportMark, ReportRow } from "@/components/reports";
import { ReportShare } from "@/components/reports-share";
import { container } from "@/lib/layout";
import { formatDate, reportBySlug, reports, type Block } from "@/lib/reports";
import { site } from "@/lib/site";

/** Every report, prerendered; any other slug is a 404 (below). */
export function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = reportBySlug(slug);
  if (!r) return {};
  return {
    title: r.title,
    description: r.dek,
    alternates: { canonical: `/reports/${r.slug}` },
    openGraph: { type: "article", title: r.title, description: r.dek, publishedTime: r.date },
  };
}

function BodyBlock({ block }: { block: Block }) {
  if ("p" in block) return <p className="rp-body__p">{block.p}</p>;
  if ("h" in block) return <h2 className="rp-body__h">{block.h}</h2>;
  if ("quote" in block)
    return (
      <figure className="rp-body__quote">
        <blockquote>“{block.quote}”</blockquote>
        <figcaption>{block.by}</figcaption>
      </figure>
    );
  return (
    <dl className="rp-body__stats" style={{ "--n": block.stats.length } as React.CSSProperties}>
      {block.stats.map((s) => (
        <div key={s.label}>
          <dt>{s.label}</dt>
          <dd>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The shell (navbar, guides, footer) shows at once; the report reads the URL
 * inside Suspense and streams in. Every report is prerendered, so in
 * production the fallback is rarely seen.
 */
export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<ReportSkeleton />}>
      <ReportView params={params} />
    </Suspense>
  );
}

function ReportSkeleton() {
  return (
    <main className="overflow-x-clip" aria-busy="true">
      <section className="mt-16 border-t border-line">
        <div className={`${container} relative min-h-[80svh] border-x border-line`}>
          <Guides />
        </div>
      </section>
    </main>
  );
}

async function ReportView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = reportBySlug(slug);
  if (!r) notFound();
  const more = reports.filter((x) => x.slug !== r.slug).slice(0, 3);

  return (
    <main className="overflow-x-clip">
      <article>
        <section className="mt-16 border-t border-line">
          <div className={`${container} relative border-x border-line`}>
            <Guides />
            <div className="rp-art__head">
              <Link href="/reports" className="rp-art__back">
                Reports
              </Link>
              <p className="rp-art__type">{r.type}</p>
              <h1 className="rp-art__title">{r.title}</h1>
            </div>

            <div className="rp-art__grid">
              <aside className="rp-art__meta">
                <p className="rp-tick">
                  <time dateTime={r.date}>{formatDate(r.date)}</time>
                </p>
                {r.college && (
                  <div className="rp-art__college">
                    <ReportMark report={r} />
                    <p className="mt-3 text-[14px] leading-[1.5] font-medium text-text">{r.college}</p>
                    {r.city && <p className="text-[14px] leading-[1.5] text-text-muted">{r.city}</p>}
                  </div>
                )}
                <ul className="rp-art__tracks" aria-label="Tracks">
                  {r.tracks.map((t) => (
                    <li key={t} className="projects-track">
                      {t}
                    </li>
                  ))}
                </ul>
                <ReportShare url={`${site.url}/reports/${r.slug}`} title={r.title} />
              </aside>

              <div className="rp-art__main">
                <div className="rp-art__cover">
                  <ReportCover report={r} sizes="(min-width: 1024px) 950px, 100vw" priority>
                    <span className="rp-card__top">
                      <ReportMark report={r} />
                    </span>
                  </ReportCover>
                </div>
                <p className="rp-tick rp-art__caption">{r.caption}</p>

                <div className="rp-body">
                  <p className="rp-body__dek">{r.dek}</p>
                  {r.body.map((b, i) => (
                    <BodyBlock key={i} block={b} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>

      <section>
        <div className={`${container} relative border-x border-b border-line`}>
          <Guides />
          <div className="flex items-end justify-between gap-6">
            <h2 className="rp-all__title">More reports</h2>
            <Link href="/reports" className="btn btn-secondary btn-lg mb-10 mr-5 shrink-0 shadow-[var(--shadow-btn)] sm:mr-10">
              All reports
              <HoverArrow />
            </Link>
          </div>
          <ul className="rp-rows">
            {more.map((x) => (
              <ReportRow key={x.slug} report={x} />
            ))}
          </ul>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
