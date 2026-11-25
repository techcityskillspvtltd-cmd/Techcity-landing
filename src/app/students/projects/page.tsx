import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { SectionHead } from "@/components/page-blocks";
import { StudentHero } from "@/components/students/blocks";
import { ProjectsHeroScene } from "@/components/students/project-scenes";
import { ProjectsTable } from "@/components/students/projects-table";
import { container } from "@/lib/layout";
import { studentProjects } from "@/lib/students";

export const metadata: Metadata = {
  title: "Student projects",
  description: "Projects TechCity students built in labs and cohorts, reviewed like work, and talked about in their interviews.",
  alternates: { canonical: "/students/projects" },
};

/*
 * Student projects: the hero beside a project joining the list (a stageshow
 * scene), then every project in one table, searchable, filterable by track
 * and sortable, each row leading to the project's own page
 * (app/students/projects/[slug]). The Featured page has the best of them.
 */

export default function Page() {
  const tracks = new Set(studentProjects.map((p) => p.track)).size;
  return (
    <main className="overflow-x-clip">
      <StudentHero
        crumb={[{ label: "Students", href: "/students" }, { label: "Student projects" }]}
        title="Projects that got people hired."
        lede={`${studentProjects.length} projects across ${tracks} tracks, built in labs and cohorts, reviewed like work and talked about in interviews.`}
        actions={
          <>
            <a href="#all" className="btn btn-primary btn-lg">
              Browse the projects
              <HoverArrow />
            </a>
            <Link href="/students/featured" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              See featured projects
            </Link>
          </>
        }
        picture={<ProjectsHeroScene />}
      />

      <section id="all" className="scroll-mt-16">
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Every project." rest="Search by tool or name, filter by track, or sort any column. Each one opens to its own page." />
          <ProjectsTable />
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
