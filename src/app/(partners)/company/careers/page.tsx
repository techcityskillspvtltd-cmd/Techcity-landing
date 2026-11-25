import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CareersForm } from "@/components/careers-form";
import { HoverArrow } from "@/components/hover-arrow";
import { InView } from "@/components/in-view";
import { JoinHero, type JoinStep } from "@/components/join-stack";
import { Crumbs, SectionHead } from "@/components/page-blocks";
import { container } from "@/lib/layout";
import "@/components/careers-page.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Teach the work, not just the textbook. TechCity Skills hires trainers and mentors to teach software, AI, data and cloud inside colleges across north India.",
  alternates: { canonical: "/company/careers" },
};

/*
 * Careers, in the same flow as the other inner pages: a short hero beside an
 * animation of how to join (components/join-stack, in the line art of the
 * TechCity stack on the home page), the three steps in a row under it, three
 * principles, then the application form.
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

const steps: JoinStep[] = [
  { title: "Apply", body: "Fill in the form below and attach your résumé." },
  { title: "Interview rounds", body: "Talk with our team about what you teach, and how." },
  { title: "Start the training", body: "Join a partner college and teach your first batch." },
];

export default function Page() {
  return (
    <main className="cr-page overflow-x-clip">
      {/* Hero: a short headline on the left, how to join on the right, the steps underneath. */}
      <section className="mt-16 border-t border-line">
        <div className={`${container} border-x border-b border-line`}>
          <JoinHero steps={steps}>
            <div className="pp-hero-copy">
              <Crumbs items={[{ label: "Company", href: "/company" }, { label: "Careers" }]} />
              <h1 className="pp-h1">
                Teach the work, <span className="text-text-muted">not just the textbook.</span>
              </h1>
              <p className="pp-lede">Join the trainers who bring industry into the college classroom.</p>
              <div className="pp-actions">
                <a href="#apply" className="btn btn-primary btn-lg">
                  Apply now
                  <HoverArrow />
                </a>
              </div>
            </div>
          </JoinHero>
        </div>
      </section>

      {/* How we teach: three principles. */}
      <section>
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="How we teach." rest="Three things every trainer at TechCity holds to." />
          <InView className="cr-principles" threshold={0.25}>
            {principles.map((p, i) => (
              <article key={p.title} className="cr-principle" style={{ "--i": i } as CSSProperties}>
                <span className="cr-principle__bar" aria-hidden="true" />
                <p className="text-[13px] font-medium text-[var(--g-indigo)] tabular-nums">0{i + 1}</p>
                <h3 className="mt-6 text-[18px] leading-[1.35] font-medium tracking-[-0.01em] text-text">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-text-muted">{p.body}</p>
              </article>
            ))}
          </InView>
        </div>
      </section>

      {/* Apply: what to have ready on the left, the form on the right. */}
      <section id="apply" className="scroll-mt-16">
        <div className={`${container} border-x border-b border-line`}>
          <div className="cr-apply">
            <div className="cr-apply__copy">
              <h2 className="text-[clamp(24px,2.6vw,32px)] leading-[1.25] font-normal tracking-[-0.02em] text-text">
                Apply to teach with us. <span className="text-text-muted">One form, a few minutes.</span>
              </h2>
              <p className="mt-5 max-w-[420px] text-[16px] leading-[1.65] text-text-muted">
                Tell us what you teach and where you&apos;d like to teach it.
              </p>
              <p className="mt-10 text-[13px] font-medium text-[var(--g-indigo)]">Have these ready</p>
              <ol className="cr-next mt-4">
                <li>Your résumé, as a PDF or Word file up to 5 MB</li>
                <li>The subjects or skills you&apos;d teach</li>
                <li>Your LinkedIn, GitHub or portfolio, if you have one</li>
              </ol>
            </div>
            <div className="cr-apply__form">
              <CareersForm />
            </div>
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
