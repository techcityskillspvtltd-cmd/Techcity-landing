import type { Metadata } from "next";
import { GlobeSection, ProjectList, ProjectsHero, StatusTiles, byStatus, cityCount, trackCount } from "@/components/projects-page";

export const metadata: Metadata = {
  title: "Upcoming projects",
  description: "TechCity programs starting on campus next term.",
};

const list = byStatus("upcoming");

export default function Page() {
  return (
    <main>
      <ProjectsHero
        status="upcoming"
        lead="Starting next term."
        rest="Curriculum agreed, trainers lined up, labs being set up."
        stats={[
          { value: String(list.length), label: "Programs starting" },
          { value: String(cityCount(list)), label: list.length === 1 ? "City" : "Cities" },
          { value: String(trackCount(list)), label: "Tracks" },
        ]}
      />
      <GlobeSection statuses={["upcoming"]} lead="Where they start." rest="Hover a project to find its campus." />
      <ProjectList list={list} lead="Every upcoming project." rest="Its campus, start and the tracks it covers." />
      <StatusTiles except="upcoming" lead="More projects." rest="What runs now, and what we have delivered." />
      {/* Lines end here: a full-width rule over the last section's bottom line. */}
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
