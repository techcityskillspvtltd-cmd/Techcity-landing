import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { InView } from "@/components/in-view";
import { NumberTicker } from "@/components/number-ticker";
import { SectionHead } from "@/components/page-blocks";
import { Proof, StudentHero } from "@/components/students/blocks";
import { Journey, ProjectShowcase, StackList, StoriesSpotlight } from "@/components/students/home-sections";
import { ProfileScene } from "@/components/students/stack-scenes";
import { studentStories } from "@/lib/company";
import { container } from "@/lib/layout";
import { signupUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "For students",
  description:
    "Roadmaps, daily practice, contests and cohort courses on one TechCity account, with mentors who hire. From the first lesson to the first offer.",
  alternates: { canonical: "/students" },
};

/*
 * The student home page: the hero beside a student's profile filling in from
 * all five products (a stageshow scene), the figures, the journey (one
 * student, one record), the five products one below the other (each with its
 * own scene), the project showcase (a review scene beside the featured
 * projects) and the stories, then the footer's call to action.
 */

export default function StudentsHome() {
  return (
    <main className="overflow-x-clip">
      <StudentHero
        title="Learn the work. Get hired for what you can do."
        lede="Roadmaps, daily practice, contests and cohort courses on one account, with mentors who hire people like you."
        actions={
          <>
            <a href={signupUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Create your account
              <HoverArrow />
            </a>
            <Link href="/students/featured" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              See featured projects
            </Link>
          </>
        }
        below={<Proof names={studentStories.slice(0, 5).map((s) => s.name)} line="10,000+ students learning with TechCity" />}
        picture={<ProfileScene />}
      />

      {/* Figures */}
      <section>
        <div className={`${container} border-x border-b border-line`}>
          <InView className="pp-stats" threshold={0.4}>
            {[
              { value: "10K+", label: "Students mentored" },
              { value: "12,000+", label: "Sessions taught" },
              { value: "30+", label: "Partner colleges" },
              { value: "5", label: "Apps on one account" },
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

      {/* Journey */}
      <section id="your-path" className="scroll-mt-20 bg-surface-subdued">
        <div className={`${container} border-x border-b border-line px-5 py-14 sm:px-10 sm:py-20`}>
          <h2 className="pp-h2 mb-12 sm:mb-14">
            One student. One record.{" "}
            <span className="text-text-muted">From first lesson to first offer, every step lands on the same profile.</span>
          </h2>
          <Journey />
        </div>
      </section>

      {/* The stack */}
      <section id="stack" className="scroll-mt-20">
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="The TechCity stack." rest="Five apps, one login. Each does a part of the work; together they take you from first class to first offer." />
          <StackList />
        </div>
      </section>

      {/* Projects */}
      <section className="bg-surface-subdued">
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Built by students." rest="Real projects, reviewed like work, that got people hired.">
            <Link href="/students/projects" className="btn btn-secondary btn-lg shrink-0 self-start shadow-[var(--shadow-btn)] sm:self-auto">
              All projects
              <HoverArrow />
            </Link>
          </SectionHead>
          <ProjectShowcase />
        </div>
      </section>

      {/* Stories */}
      <section>
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Students like you." rest="Where they started, and where they are now, in their own words.">
            <Link href="/students/testimonials" className="btn btn-secondary btn-lg shrink-0 self-start shadow-[var(--shadow-btn)] sm:self-auto">
              All stories
              <HoverArrow />
            </Link>
          </SectionHead>
          <StoriesSpotlight />
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
