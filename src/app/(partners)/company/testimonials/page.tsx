import type { Metadata } from "next";
import { HoverArrow } from "@/components/hover-arrow";
import { InView } from "@/components/in-view";
import { NumberTicker } from "@/components/number-ticker";
import { Crumbs } from "@/components/page-blocks";
import { StoriesWall } from "@/components/stories-wall";
import { StoryTabs } from "@/components/story-tabs";
import { StoryColumns } from "@/components/testimonials-page";
import { studentStories } from "@/lib/company";
import { container } from "@/lib/layout";
import { partnerStories } from "@/lib/partner-stories";
import { colleges, industry } from "@/lib/partners";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Stories from the colleges and companies TechCity Skills works with, and from students on the labs, mentors and hiring briefs that took them to a first role.",
  alternates: { canonical: "/company/testimonials" },
};

const results = [
  { value: "10K+", label: "Students mentored across partner campuses" },
  { value: "30+", label: "Partner colleges teaching with us" },
  { value: "12,000+", label: "Sessions taught inside college timetables" },
  { value: "150+", label: "Workshops run with faculty and students" },
];


export default function Page() {
  return (
    <main className="overflow-x-clip">
      {/* Hero: the shared breadcrumb, headline and buttons; the story cards on the right. */}
      <section className="mt-16 border-t border-line">
        <div className={`${container} border-x border-b border-line`}>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="pp-hero-copy">
              <Crumbs items={[{ label: "Company", href: "/company" }, { label: "Testimonials" }]} />
              <h1 className="pp-h1">The skilling partner behind colleges, companies and their students.</h1>
              <p className="pp-lede">
                We work inside {colleges.length} colleges across north India and alongside {industry.length} featured industry
                partners, so students leave able to join a team. These are their stories: what we ran, where, and what the
                students who took it went on to do.
              </p>
              <div className="pp-actions">
                <a href="#stories" className="btn btn-primary btn-lg">
                  See all stories
                  <HoverArrow />
                </a>
                <a href="#students" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
                  Student stories
                </a>
              </div>
            </div>
            <div className="pp-hero__picture ts-hero__picture">
              <StoryColumns stories={partnerStories} />
            </div>
          </div>
        </div>
      </section>

      <section className="ts-section">
        <div className={`${container} border-x border-line px-5 py-16 sm:px-10 sm:py-20`}>
          <h2 className="pp-h2">The work, in numbers.</h2>
          <InView className="ts-results" threshold={0.35}>
            {results.map((r, i) => (
              <div key={r.label} className="ts-results__cell">
                <p className="ts-results__num">
                  <NumberTicker value={r.value} delay={i * 0.12} />
                </p>
                <p className="ts-results__label">{r.label}</p>
              </div>
            ))}
          </InView>
        </div>
      </section>

      <section id="stories" className="ts-section ts-section--tint scroll-mt-16">
        <div className={`${container} border-x border-line px-5 py-16 sm:px-10 sm:py-20`}>
          <h2 className="pp-h2">
            Colleges and companies we build with.{" "}
            <span className="text-text-muted">
              Each story covers what we ran with the partner, when, and the tracks it taught, from public records and our
              own program history.
            </span>
          </h2>
          <StoryTabs stories={partnerStories} />
        </div>
      </section>

      <section id="students" className="ts-section scroll-mt-16">
        <div className={`${container} border-x border-line px-5 py-16 sm:px-10 sm:py-20`}>
          <h2 className="pp-h2">
            From the classroom to a first role.{" "}
            <span className="text-text-muted">
              {studentStories.length} students on the labs, the mentors and the hiring briefs that got them there,
              including the parts that were hard.
            </span>
          </h2>
          <StoriesWall />
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
