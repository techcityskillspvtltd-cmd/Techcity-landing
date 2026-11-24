import type { Metadata } from "next";
import { GlobeSection, ProjectList, ProjectsHero, StatusTiles, byStatus, cityCount, trackCount } from "@/components/projects-page";

export const metadata: Metadata = {
  title: "Ongoing projects",
  description: "TechCity programs running on campus this term.",
};

const list = byStatus("ongoing");

export default function Page() {
  return (
    <main>
      <ProjectsHero
        status="ongoing"
        lead="Running on campus right now."
        rest="Trainers in the timetable, labs every week, progress you can see."
        stats={[
          { value: String(list.length), label: "Programs running" },
          { value: String(cityCount(list)), label: list.length === 1 ? "City" : "Cities" },
          { value: String(trackCount(list)), label: "Tracks" },
        ]}
      />
      <GlobeSection statuses={["ongoing"]} lead="Where they run." rest="Hover a project to find its campus." />
      <ProjectList list={list} lead="Every ongoing project." rest="Its campus, dates and the tracks it covers." />
      <StatusTiles except="ongoing" lead="More projects." rest="What starts next, and what we have delivered." />
      {/* Lines end here: a full-width rule over the last section's bottom line. */}
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
