import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { SectionHead } from "@/components/page-blocks";
import { ProjectCard, StudentHero } from "@/components/students/blocks";
import { ProjectsGrid } from "@/components/students/projects-grid";
import { ShipScene } from "@/components/students/scenes";
import { container } from "@/lib/layout";
import { studentProjects } from "@/lib/students";

export const metadata: Metadata = {
  title: "Student projects",
  description: "Projects TechCity students built in labs and cohorts, reviewed like work, and talked about in their interviews.",
  alternates: { canonical: "/students/projects" },
};

/*
 * Student projects: the hero ships one (a stageshow scene: checks pass, the
 * trainer approves, it merges and deploys), then every project, filterable by
 * track.
 */

export default function Page() {
  const cards = Object.fromEntries(studentProjects.map((p) => [p.slug, <ProjectCard key={p.slug} project={p} />]));
  return (
    <main className="overflow-x-clip">
      <StudentHero
        crumb={[{ label: "Students", href: "/students" }, { label: "Student projects" }]}
        title={
          <>
            Projects that <span className="mark">got people hired</span>.
          </>
        }
        lede="Built in labs and cohorts, reviewed like work by trainers who ship, and talked about in interviews."
        actions={
          <>
            <a href="#contact" className="btn btn-primary btn-lg">
              Start building
              <HoverArrow />
            </a>
            <Link href="/students/testimonials" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              Read their stories
            </Link>
          </>
        }
        picture={<ShipScene />}
      />

      <section>
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Every project." rest="Filter by track; each one is a student's own work." />
          <ProjectsGrid cards={cards} />
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
