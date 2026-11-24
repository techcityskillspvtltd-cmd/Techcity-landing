import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { GlobeSection, byStatus, cityCount, trackCount } from "@/components/projects-page";
import { SectionHero } from "@/components/section-hero";
import { groupItems, partnerNav } from "@/lib/nav";
import { projects, type ProjectStatus } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Every TechCity campus program: what runs now, what starts next term and what we have delivered.",
};

/** Projects, the section's front door: a short headline, the three status pages with counts, the figures, the globe. */
const group = partnerNav.groups.find((g) => g.label === "Projects")!;
const statusOf = (href: string) => href.split("/").pop() as ProjectStatus;

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <SectionHero
        crumb={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        lead="Learning in action on campuses across India."
        rest="From next term back to the first batch."
        actions={
          <>
            <a href="#contact" className="btn btn-primary btn-lg">
              Start a project
              <HoverArrow />
            </a>
            <Link href="/programs" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              See our programs
            </Link>
          </>
        }
        card={{
          title: "Campus projects",
          links: groupItems(group).map((i) => ({
            label: i.label,
            href: i.href,
            description: i.description,
            icon: i.icon,
            meta: String(byStatus(statusOf(i.href)).length),
          })),
        }}
        stats={[
          { value: String(projects.length), label: "Campus projects" },
          { value: String(cityCount(projects)), label: "Cities" },
          { value: String(trackCount(projects)), label: "Tracks taught" },
          { value: String(byStatus("ongoing").length), label: "Running right now" },
        ]}
      />
      <GlobeSection lead="Where we teach." rest="Pick a status, then hover a project to find its campus." />
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
