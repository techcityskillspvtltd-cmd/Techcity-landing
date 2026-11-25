import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { InView } from "@/components/in-view";
import { NumberTicker } from "@/components/number-ticker";
import { SectionHead } from "@/components/page-blocks";
import { ProgramProcess } from "@/components/program-process";
import { ProjectCard, Proof, StoryCard, StudentHero, ToolCard } from "@/components/students/blocks";
import { DayScene } from "@/components/students/scenes";
import { studentStories } from "@/lib/company";
import { container } from "@/lib/layout";
import { signupUrl } from "@/lib/site";
import { journey, studentProjects, tools } from "@/lib/students";
// The step list of "Your path" is styled with the program pages' (`.pr-*`, `.pl-tint`).
import "@/components/program-landing.css";

export const metadata: Metadata = {
  title: "For students",
  description:
    "Roadmaps, daily practice, contests and cohort courses on one TechCity account, with mentors who hire. From the first lesson to the first offer.",
  alternates: { canonical: "/students" },
};

/*
 * The student home page: the hero with a student's day on TechCity (a
 * stageshow scene), the figures, your path from first lesson to first offer
 * (four steps, each with its scene), the five tools, three stories and three
 * projects, each leading on to its own page.
 */

const featuredStories = ["Aarav Sharma", "Tanvi Patel", "Vikram Singh"].map((n) => studentStories.find((s) => s.name === n)!);
const featuredProjects = studentProjects.filter((p) => p.featured).slice(0, 3);

export default function StudentsHome() {
  return (
    <main className="overflow-x-clip">
      <StudentHero
        title={
          <>
            Learn the work. Get hired for what you can do.
          </>
        }
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
        picture={<DayScene />}
      />

      {/* Figures */}
      <section>
        <div className={`${container} border-x border-b border-line`}>
          <InView className="pp-stats" threshold={0.4}>
            {[
              { value: "10K+", label: "Students mentored" },
              { value: "12,000+", label: "Sessions taught" },
              { value: "30+", label: "Partner colleges" },
              { value: "5", label: "Tools on one account" },
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

      {/* Your path */}
      <section id="your-path" className="pl-tint scroll-mt-20">
        <div className={`${container} border-x border-b border-line px-5 py-14 sm:px-10 sm:py-20`}>
          <h2 className="pp-h2 mb-10 sm:mb-12">
            From first lesson to first offer. <span className="text-text-muted">Four steps, on one account.</span>
          </h2>
          <ProgramProcess steps={journey} />
        </div>
      </section>

      {/* The five tools */}
      <section>
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Five tools, one login." rest="Each one does a part of the work; together they take you all the way." />
          <div className="sd-tools">
            {tools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="pl-tint">
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Students like you." rest="Where they started, and where they are now.">
            <Link href="/students/testimonials" className="btn btn-secondary btn-lg shrink-0 self-start shadow-[var(--shadow-btn)] sm:self-auto">
              All stories
              <HoverArrow />
            </Link>
          </SectionHead>
          <div className="sd-stories">
            {featuredStories.map((s) => (
              <StoryCard key={s.name} story={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section>
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Built by students." rest="Real projects, reviewed like work, that got people hired.">
            <Link href="/students/featured" className="btn btn-secondary btn-lg shrink-0 self-start shadow-[var(--shadow-btn)] sm:self-auto">
              Featured projects
              <HoverArrow />
            </Link>
          </SectionHead>
          <div className="sd-projects">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
