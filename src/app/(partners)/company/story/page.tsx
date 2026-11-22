import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { InView } from "@/components/in-view";
import { NumberTicker } from "@/components/number-ticker";
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
 * Our story, in the home page's language: the headline; how TechCity started
 * and grew, in chapters beside a still of the 3D TechCity (components/story-scroll);
 * three beats in a ruled grid; the figures; the founders. Figures are from lib/company.
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
      {/* Headline */}
      <section className="mt-16 border-t border-line">
        <div className={`${container} border-x border-line`}>
          <div className="mx-auto flex max-w-[860px] flex-col items-center px-5 pt-16 pb-14 text-center sm:px-10 sm:pt-24 sm:pb-20">
            <p className="text-[14px] font-medium text-accent">Our story</p>
            <h1 className="mt-5 text-[clamp(34px,4.6vw,58px)] leading-[1.06] font-normal tracking-[-0.04em] text-balance text-text">
              Colleges teach the subject. <span className="text-text-muted">We bring the work into the classroom.</span>
            </h1>
            <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-pretty text-text-muted">
              TechCity Skills puts industry trainers inside the college timetable, so students leave ready for their
              first team.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/company/team" className="btn btn-primary btn-lg">
                Meet the team
                <HoverArrow />
              </Link>
              <Link href="/programs" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
                See our programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it started and grew: chapters on the left, the city on the right. */}
      <section className="border-t border-line">
        <div className={`${container} border-x border-line`}>
          <div className="mx-auto max-w-[760px] px-5 pt-16 pb-4 text-center sm:px-10 sm:pt-20 lg:pb-0">
            <h2 className="text-[clamp(26px,3vw,38px)] leading-[1.15] font-normal tracking-[-0.03em] text-balance text-text">
              How TechCity started. <span className="text-text-muted">And how it grew, one college at a time.</span>
            </h2>
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
          <InView className="st-figures" threshold={0.4}>
            {figures.map((f, i) => (
              <div key={f.label} className="st-figure">
                <p className="st-figure__num">
                  <NumberTicker value={f.value} delay={i * 0.1} />
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
          <div className="mx-auto flex max-w-[780px] flex-col items-center px-5 py-16 text-center sm:px-10 sm:py-20">
            <span className="st-marks" aria-hidden="true">
              <i>DT</i>
              <i>GS</i>
            </span>
            <h2 className="mt-6 text-[clamp(22px,2.4vw,30px)] leading-[1.3] font-normal tracking-[-0.02em] text-balance text-text">
              <span className="block">Started by Deepak Tripathi and Gunjan Soam.</span>
              <span className="block text-text-muted">Still run by people who teach.</span>
            </h2>
            <Link href="/company/team" className="btn btn-secondary btn-lg mt-8 shadow-[var(--shadow-btn)]">
              Meet the team
              <HoverArrow />
            </Link>
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
