import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { InView } from "@/components/in-view";
import { NumberTicker } from "@/components/number-ticker";
import { SectionHead } from "@/components/page-blocks";
import { StudentHero } from "@/components/students/blocks";
import { StudentStoriesWall } from "@/components/students/stories-wall";
import { STORY_TINT, studentStories } from "@/lib/company";
import { container } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Student stories",
  description:
    "TechCity students on the labs, the mentors and the hiring briefs that took them from college to a first role, including the parts that were hard.",
  alternates: { canonical: "/students/testimonials" },
};

/*
 * Student stories: three quotes fanned on the hero's panel, the figures, then
 * every story in the student wall (components/students/stories-wall): a
 * spotlight on the first of the selection, then a masonry of the rest.
 */

const fanned = ["Ishita Banerjee", "Priya Nair", "Rohan Verma"].map((n) => studentStories.find((s) => s.name === n)!);

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <StudentHero
        crumb={[{ label: "Students", href: "/students" }, { label: "Stories" }]}
        title={
          <>
            From college to a first role.
          </>
        }
        lede="Students on the labs, the mentors and the hiring briefs that got them there, including the parts that were hard."
        actions={
          <>
            <a href="#stories" className="btn btn-primary btn-lg">
              Read the stories
              <HoverArrow />
            </a>
            <Link href="/students/projects" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              See their projects
            </Link>
          </>
        }
        picture={
          <div className="sd-fan">
            {fanned.map((s) => (
              <figure key={s.name} style={{ "--dot": STORY_TINT[s.track] } as CSSProperties}>
                <p className="sd-story__outcome">{s.outcome}</p>
                <blockquote>“{s.quote}”</blockquote>
                <figcaption className="mt-3 text-[13px] text-text-muted">
                  <span className="font-medium text-text">{s.name}</span> · {s.city}
                </figcaption>
              </figure>
            ))}
          </div>
        }
      />

      <section>
        <div className={`${container} border-x border-b border-line`}>
          <InView className="pp-stats" threshold={0.4}>
            {[
              { value: "10K+", label: "Students mentored" },
              { value: "30+", label: "Partner colleges" },
              { value: "12,000+", label: "Sessions taught" },
              { value: String(studentStories.length), label: "Stories here" },
            ].map((s, i) => (
              <div key={s.label} className="pp-stats__cell">
                <p className="pp-stats__num">
                  <NumberTicker value={s.value} delay={i * 0.12} />
                </p>
                <p className="mt-2 text-[14px] leading-[1.5] text-text-muted">{s.label}</p>
              </div>
            ))}
          </InView>
        </div>
      </section>

      <section id="stories" className="scroll-mt-16">
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Every story." rest="Filter by track; each one is in the student's own words." />
          <div className="px-5 pb-16 sm:px-10 sm:pb-20">
            <StudentStoriesWall />
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
