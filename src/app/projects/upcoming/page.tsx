import type { Metadata } from "next";
import CompletedProjects from "@/components/CompletedProjects";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CampusMap } from "@/components/ProjectsBoard";
import SectionHeading from "@/components/SectionHeading";
import TrainerApply from "@/components/TrainerApply";
import { openings, upcomingProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Upcoming projects",
  description:
    "Training TechCity is opening next, with a report and a trainer application for each project.",
};

type Props = {
  searchParams: Promise<{ opening?: string }>;
};

export default async function UpcomingProjectsPage({ searchParams }: Props) {
  const { opening: openingId } = await searchParams;
  const upcomingOpenings = openings.filter((opening) => opening.timing === "upcoming");
  const opening =
    upcomingOpenings.find((item) => item.id === openingId) ?? upcomingOpenings[0];

  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
          <div className="fade-up max-w-2xl">
            <SectionHeading
              index="01"
              label="Upcoming"
              title="Training opening next."
              titleClassName="text-[2.35rem] sm:text-5xl"
            />
          </div>
          <div className="fade-up mt-10">
            <CampusMap
              projects={upcomingProjects}
              hrefBase="/projects/upcoming"
              allowApply
            />
          </div>
          <div className="fade-up mt-16">
            <CompletedProjects
              projects={upcomingProjects}
              hrefBase="/projects/upcoming"
              actions
            />
          </div>
          <div id="apply" className="fade-up scroll-mt-28 mt-16 w-full max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
              <span className="text-accent">02</span>
              <span className="mx-2 text-foreground/20">/</span>
              Apply
            </p>
            <h2 className="mt-4 text-[1.7rem] font-normal leading-[1.1] tracking-tight text-foreground sm:text-[2rem]">
              Join as a trainer.
            </h2>
            <TrainerApply openingId={opening?.projectId ?? opening?.id} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
