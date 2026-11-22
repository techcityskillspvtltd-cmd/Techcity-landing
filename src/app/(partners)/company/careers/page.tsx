import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CareersArt } from "@/components/careers-page";
import { CareersForm } from "@/components/careers-form";
import { HoverArrow } from "@/components/hover-arrow";
import { InView } from "@/components/in-view";
import { container } from "@/lib/layout";
import "@/components/careers-page.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Teach the work, not just the textbook. TechCity Skills hires trainers and mentors to teach software, AI, data and cloud inside colleges across north India.",
  alternates: { canonical: "/company/careers" },
};

/*
 * Careers, kept short so people can get straight to applying: the headline,
 * the artwork band, the mission and three principles, then the application
 * form. In the site's own type, lines and brand ramp.
 */

const principles = [
  {
    title: "Practice over theory",
    body: "Students learn by building. Every class you teach has a lab, a project or a review at its centre, the way teams actually work.",
  },
  {
    title: "Inside the college",
    body: "We teach in the college's own timetable, alongside its faculty, so what you bring stays on campus after the term ends.",
  },
  {
    title: "Better every batch",
    body: "Tracks, labs and tests change as the industry does. You help decide what next term's students should learn.",
  },
];

export default function Page() {
  return (
    <main className="cr-page overflow-x-clip">
      {/* Hero: the headline alone, then the artwork band across the full container. */}
      <section className="mt-16 border-y border-line">
        <div className={`${container} border-x border-line`}>
          <div className="px-5 pt-16 pb-14 sm:px-10 sm:pt-24 sm:pb-20">
            <h1 className="max-w-[760px] text-[clamp(38px,5vw,64px)] leading-[1.04] font-normal tracking-[-0.04em] text-text">
              Teach the work, not just the textbook.
            </h1>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#apply" className="btn btn-primary btn-lg">
                Apply now
                <HoverArrow />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-line">
        <div className={`${container} border-x border-line`}>
          <CareersArt />
        </div>
      </section>

      {/* Mission and principles. */}
      <section id="opportunity" className="scroll-mt-32">
        <div className={`${container} border-x border-b border-line`}>
          <div className="grid gap-8 px-5 pt-16 pb-12 sm:px-10 sm:pt-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            <h2 className="text-[clamp(28px,3.2vw,40px)] leading-[1.15] font-normal tracking-[-0.03em] text-text">
              Our mission is to make every graduate ready for a team.{" "}
              <span className="text-text-muted">At TechCity, you can make that happen.</span>
            </h2>
            <p className="text-[17px] leading-[1.65] text-text-muted lg:pt-2">
              Colleges teach the subject; companies hire for the work. We close that gap from inside the college, with
              trainers who do the work themselves. Every class you teach moves a student closer to their first offer.
            </p>
          </div>
          <InView className="cr-principles" threshold={0.25}>
            {principles.map((p, i) => (
              <article key={p.title} className="cr-principle" style={{ "--i": i } as CSSProperties}>
                <span className="cr-principle__bar" aria-hidden="true" />
                <h3 className="text-[18px] leading-[1.35] font-medium tracking-[-0.01em] text-text">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-text-muted">{p.body}</p>
              </article>
            ))}
          </InView>
        </div>
      </section>

      {/* Apply: just the form. */}
      <section id="apply" className="scroll-mt-32 bg-surface-subdued">
        <div className={`${container} border-x border-b border-line`}>
          <div className="mx-auto max-w-[760px] px-5 py-14 sm:px-10 sm:py-20">
            <h2 className="sr-only">Apply</h2>
            <CareersForm />
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
