import type { Metadata } from "next";
import { GlobeSection, ProjectList, ProjectsHero, StatusTiles, byStatus, cityCount, trackCount } from "@/components/projects-page";

export const metadata: Metadata = {
  title: "Completed projects",
  description: "TechCity programs delivered on campus.",
};

const list = byStatus("completed");

export default function Page() {
  return (
    <main>
      <ProjectsHero
        status="completed"
        lead="Programs we have delivered."
        rest="Every batch finished with work they built and skills to show for it."
        stats={[
          { value: String(list.length), label: "Programs delivered" },
          { value: String(cityCount(list)), label: list.length === 1 ? "City" : "Cities" },
          { value: String(trackCount(list)), label: "Tracks" },
        ]}
      />
      <GlobeSection statuses={["completed"]} lead="Where we have delivered." rest="Hover a project to find its campus." />
      <ProjectList list={list} lead="Every completed project." rest="Its campus, dates and the tracks it covered." />
      <StatusTiles except="completed" lead="More projects." rest="What runs now, and what starts next." />
      {/* Lines end here: a full-width rule over the last section's bottom line. */}
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
