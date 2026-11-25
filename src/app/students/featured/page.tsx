import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { SectionHead } from "@/components/page-blocks";
import { FeaturedProject, StudentHero } from "@/components/students/blocks";
import { ShipScene } from "@/components/students/scenes";
import { container } from "@/lib/layout";
import { studentProjects } from "@/lib/students";

export const metadata: Metadata = {
  title: "Featured projects",
  description: "The student projects we're proudest of: reviewed like work, shipped for real, and talked about in the interviews that got these students hired.",
  alternates: { canonical: "/students/featured" },
};

/*
 * Featured: the best of the student projects. The hero ships one (a
 * stageshow scene: checks pass, the trainer approves, it merges and
 * deploys); then each featured project large, alternating sides, each leading
 * to its own page; then the way on to every project.
 */

const featured = studentProjects.filter((p) => p.featured);

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <StudentHero
        crumb={[{ label: "Students", href: "/students" }, { label: "Featured" }]}
        title={
          <>
            The best of what students built.
          </>
        }
        lede={`${featured.length} projects we're proud of: reviewed like work, shipped for real, and talked about in the interviews that got these students hired.`}
        actions={
          <>
            <a href="#featured" className="btn btn-primary btn-lg">
              See the projects
              <HoverArrow />
            </a>
            <Link href="/students/projects" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              All student projects
            </Link>
          </>
        }
        picture={<ShipScene />}
      />

      <div id="featured" className="scroll-mt-16">
        {featured.map((p, i) => (
          <section key={p.slug} className={i % 2 ? "bg-surface-subdued" : undefined}>
            <div className={`${container} border-x border-b border-line`}>
              <FeaturedProject project={p} flip={i % 2 === 1} index={i} />
            </div>
          </section>
        ))}
      </div>

      <section>
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Every project." rest={`${studentProjects.length} students, ${studentProjects.length} projects, each with its own page.`}>
            <Link href="/students/projects" className="btn btn-primary btn-lg shrink-0 self-start sm:self-auto">
              All student projects
              <HoverArrow />
            </Link>
          </SectionHead>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
