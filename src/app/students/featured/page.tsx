import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { StudentHero } from "@/components/students/blocks";
import { FeaturedCase, FeaturedIndex, MoreProjects } from "@/components/students/featured-cases";
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
 * deploys); an index of the featured projects; each one as a case study
 * beside a scene of it working, sides alternating; then the way on to every
 * project.
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

      <section id="featured" className="scroll-mt-16">
        <div className={`${container} border-x border-b border-line`}>
          <FeaturedIndex projects={featured} />
        </div>
      </section>

      {featured.map((p, i) => (
        <section key={p.slug}>
          <div className={`${container} border-x border-b border-line`}>
            <FeaturedCase project={p} index={i} flip={i % 2 === 1} />
          </div>
        </section>
      ))}

      <section>
        <div className={`${container} border-x border-b border-line`}>
          <MoreProjects projects={studentProjects.filter((p) => !p.featured).slice(0, 6)} total={studentProjects.length} />
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
