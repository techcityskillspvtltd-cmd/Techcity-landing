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

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Colleges teach the subject. TechCity Skills brings the work into the classroom, inside the college's own timetable.",
  alternates: { canonical: "/company/story" },
};

/*
 * Our story, in the home page's language: how TechCity started and grew, in
 * chapters beside a still of the 3D TechCity (components/story-scroll); three
 * beats in a ruled grid; the figures; the founders; photos from campus
 * (components/story-gallery). Figures are from lib/company.
 */

const beats = [
  { n: "01", lead: "The gap.", body: "Degrees cover the syllabus. Hiring asks for the work. Too many students fall in between." },
  { n: "02", lead: "Inside the timetable.", body: "Practitioners teach on campus, beside the college’s own faculty, not after hours." },
  { n: "03", lead: "The first week.", body: "Every track is built backwards from one test: can a graduate join a team on Monday?" },
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
      {/* How it started and grew: chapters on the left, the city on the right. */}
      <section className="mt-16 border-t border-line">
        <div className={`${container} border-x border-line`}>
          <div className="pp-hero-copy pp-hero-copy--lead-in">
            <Crumbs items={[{ label: "Company", href: "/company" }, { label: "Our story" }]} />
            <h1 className="pp-h1">
              How TechCity started. <span className="text-text-muted">And how it grew, one college at a time.</span>
            </h1>
          </div>
          <StoryScroll />
        </div>
      </section>

      {/* Three beats */}
      <section className="border-t border-line">
        <div className={`${container} border-x border-b border-line`}>
          <InView className="st-beats" threshold={0.25}>
            {beats.map((b, i) => (
              <article key={b.n} className="st-beat" style={{ "--i": i } as React.CSSProperties}>
                <p className="st-beat__n">{b.n}</p>
                <h2 className="mt-6 text-[20px] leading-[1.3] font-medium tracking-[-0.015em] text-text">{b.lead}</h2>
                <p className="mt-2 text-[16px] leading-[1.6] text-text-muted">{b.body}</p>
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
        <div className={`${container} border-x border-b border-line`}>
          <div className="flex flex-col gap-8 px-5 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-16">
            <div>
              <span className="st-marks" aria-hidden="true">
                <i>DT</i>
                <i>GS</i>
              </span>
              <h2 className="mt-6 max-w-[760px] text-[clamp(24px,2.6vw,32px)] leading-[1.25] font-normal tracking-[-0.02em] text-text">
                Started by Deepak Tripathi and Gunjan Soam.{" "}
                <span className="text-text-muted">Still run by people who teach.</span>
              </h2>
            </div>
            <Link href="/company/team" className="btn btn-secondary btn-lg shrink-0 self-start shadow-[var(--shadow-btn)] sm:self-auto">
              Meet the team
              <HoverArrow />
            </Link>
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
