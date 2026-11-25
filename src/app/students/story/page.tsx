import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { InView } from "@/components/in-view";
import { NumberTicker } from "@/components/number-ticker";
import { Crumbs } from "@/components/page-blocks";
import { StoryGallery } from "@/components/story-gallery";
import { StoryScroll } from "@/components/story-scroll";
import { container } from "@/lib/layout";
import "@/components/story-page.css";
import "@/components/students/students.css";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "How TechCity Skills started, and how it grew one college at a time: practitioners teaching inside the college timetable, so students are ready for their first team.",
  alternates: { canonical: "/students/story" },
};

/*
 * Our story, on the student side: the same story as /company/story, in the
 * student look. The headline; the chapters beside their
 * pictures (components/story-scroll); the three beats as cards; the figures;
 * the founders; photos from campus (components/story-gallery).
 */

const beats = [
  { n: "01", lead: "The gap.", body: "Degrees cover the syllabus. Hiring asks for the work. Too many students fall in between.", tint: "var(--g-periwinkle)" },
  { n: "02", lead: "Inside the timetable.", body: "Practitioners teach on campus, beside the college’s own faculty, not after hours.", tint: "var(--g-amber)" },
  { n: "03", lead: "The first week.", body: "Every track is built backwards from one test: can a graduate join a team on Monday?", tint: "var(--p-riyaaz-2)" },
];

const figures = [
  { value: "30+", label: "Partner colleges" },
  { value: "10K+", label: "Students mentored" },
  { value: "40+", label: "Faculty and trainers" },
  { value: "50+", label: "Industry partners" },
];

export default function Page() {
  return (
    <main className="overflow-x-clip">
      {/* How it started and grew: the headline, then the chapters beside their pictures. */}
      <section className="mt-16 border-t border-line">
        <div className={`${container} border-x border-line`}>
          <div className="pp-hero-copy pp-hero-copy--lead-in">
            <Crumbs items={[{ label: "Students", href: "/students" }, { label: "Our story" }]} />
            <h1 className="sd-h1">
              How TechCity started. <span className="text-text-muted">And how it grew, one college at a time.</span>
            </h1>
          </div>
          <StoryScroll />
        </div>
      </section>

      {/* Three beats, as cards */}
      <section className="bg-surface-subdued border-t border-line">
        <div className={`${container} border-x border-b border-line`}>
          <InView className="sd-beats" threshold={0.25}>
            {beats.map((b, i) => (
              <article key={b.n} className="sd-beat" style={{ "--i": i, "--tint": b.tint } as CSSProperties}>
                <span className="sd-beat__n">{b.n}</span>
                <h2 className="mt-8 text-[22px] leading-[1.25] font-medium tracking-[-0.015em] text-text">{b.lead}</h2>
                <p className="mt-3 text-[16px] leading-[1.6] text-text-muted">{b.body}</p>
              </article>
            ))}
          </InView>
        </div>
      </section>

      {/* Figures */}
      <section>
        <div className={`${container} border-x border-b border-line`}>
          <InView className="pp-stats" threshold={0.4}>
            {figures.map((f, i) => (
              <div key={f.label} className="pp-stats__cell">
                <p className="pp-stats__num">
                  <NumberTicker value={f.value} delay={i * 0.12} />
                </p>
                <p className="mt-2 text-[14px] leading-[1.5] text-text-muted">{f.label}</p>
              </div>
            ))}
          </InView>
        </div>
      </section>

      {/* Founders */}
      <section>
        <div className={`${container} border-x border-b border-line px-5 py-14 sm:px-10 sm:py-16`}>
          <div className="sd-founders">
            <span className="st-marks" aria-hidden="true">
              <i>DT</i>
              <i>GS</i>
            </span>
            <h2 className="mt-6 max-w-[720px] text-[clamp(24px,2.6vw,32px)] leading-[1.25] font-normal tracking-[-0.02em] text-text">
              Started by Deepak Tripathi and Gunjan Soam. <span className="text-text-muted">Still run by people who teach.</span>
            </h2>
            <div className="pp-actions">
              <Link href="/students/testimonials" className="btn btn-primary btn-lg">
                Read student stories
                <HoverArrow />
              </Link>
              <Link href="/students/featured" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
                See what students built
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Photos from campus */}
      <section>
        <div className={`${container} border-x border-b border-line`}>
          <StoryGallery />
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
