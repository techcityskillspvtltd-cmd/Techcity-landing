import type { Metadata } from "next";
import { HoverArrow } from "@/components/hover-arrow";
import { JoinHero, type JoinStep } from "@/components/join-stack";
import { Crumbs, SectionHead } from "@/components/page-blocks";
import { Openings } from "@/components/students/openings";
import { container } from "@/lib/layout";
import { openings } from "@/lib/students";
import "@/components/careers-page.css";
import "@/components/students/students.css";

export const metadata: Metadata = {
  title: "Student careers",
  description: "Internships at TechCity Skills for students: design, programs and software development. Apply, three interview rounds, and you're selected.",
  alternates: { canonical: "/students/careers" },
};

/*
 * Student careers: the hero beside the hiring process as plates in the
 * TechCity stack's line art (components/join-stack, students variant: apply,
 * three interview rounds, selected), the open roles (each opens the
 * application form in a pop-up, components/students/openings).
 */

const steps: JoinStep[] = [
  { title: "Apply", body: "Pick a role below and send the form with your résumé." },
  { title: "Three interview rounds", body: "A short call, a task or technical round, and a final conversation." },
  { title: "Get selected", body: "An offer, a start date and a team to start with." },
];


export default function Page() {
  return (
    <main className="cr-page overflow-x-clip">
      <section className="mt-16 border-t border-line">
        <div className={`${container} border-x border-b border-line`}>
          <JoinHero steps={steps} variant="students">
            <div className="pp-hero-copy">
              <Crumbs items={[{ label: "Students", href: "/students" }, { label: "Careers" }]} />
              <h1 className="sd-h1">
                Start your career at TechCity.
              </h1>
              <p className="pp-lede">
                Internships for students in design, programs and software. Apply, clear three rounds, and start with a team.
              </p>
              <div className="pp-actions">
                <a href="#openings" className="btn btn-primary btn-lg">
                  See {openings.length} open roles
                  <HoverArrow />
                </a>
              </div>
            </div>
          </JoinHero>
        </div>
      </section>

      <section id="openings" className="scroll-mt-16">
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Open roles." rest="Internships for students; pick one to apply." />
          <Openings />
        </div>
      </section>

      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
