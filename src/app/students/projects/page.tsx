import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { SectionHead } from "@/components/page-blocks";
import { ProjectCard, StudentHero, Thumb } from "@/components/students/blocks";
import { ProjectsGrid } from "@/components/students/projects-grid";
import { container } from "@/lib/layout";
import { signupUrl } from "@/lib/site";
import { studentProjects } from "@/lib/students";

export const metadata: Metadata = {
  title: "Student projects",
  description: "Projects TechCity students built in labs and cohorts, reviewed like work, and talked about in their interviews.",
  alternates: { canonical: "/students/projects" },
};

/*
 * Student projects: the hero is a collage of six projects' thumbnails; then
 * every project, filterable by track, each card leading to its own page
 * (app/students/projects/[slug]). The Featured page has the best of them.
 */

export default function Page() {
  const cards = Object.fromEntries(studentProjects.map((p) => [p.slug, <ProjectCard key={p.slug} project={p} />]));
  return (
    <main className="overflow-x-clip">
      <StudentHero
        crumb={[{ label: "Students", href: "/students" }, { label: "Student projects" }]}
        title={
          <>
            Projects that got people hired.
          </>
        }
        lede="Built in labs and cohorts, reviewed like work by trainers who ship, and talked about in interviews."
        actions={
          <>
            <a href={signupUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Create your account
              <HoverArrow />
            </a>
            <Link href="/students/testimonials" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              Read their stories
            </Link>
          </>
        }
        picture={
          <div className="sd-collage" aria-hidden="true">
            {studentProjects.slice(0, 6).map((p) => (
              <Thumb key={p.slug} project={p} />
            ))}
          </div>
        }
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
