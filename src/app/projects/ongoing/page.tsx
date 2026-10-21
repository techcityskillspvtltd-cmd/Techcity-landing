import type { Metadata } from "next";
import CompletedProjects from "@/components/CompletedProjects";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CampusMap } from "@/components/ProjectsBoard";
import SectionHeading from "@/components/SectionHeading";
import TrainerApply from "@/components/TrainerApply";
import { ongoingProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Ongoing projects",
  description: "Training TechCity is running now, with a report for each project.",
};

export default function OngoingProjectsPage() {
  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
          <div className="fade-up max-w-2xl">
            <SectionHeading
              index="01"
              label="Ongoing"
              title="Training running now."
              titleClassName="text-[2.35rem] sm:text-5xl"
            />
          </div>
          <div className="fade-up mt-10">
            <CampusMap projects={ongoingProjects} hrefBase="/projects/ongoing" />
          </div>
          <div className="fade-up mt-16">
            <CompletedProjects
              projects={ongoingProjects}
              hrefBase="/projects/ongoing"
              actions
            />
          </div>
          <div id="join" className="fade-up scroll-mt-28 mt-16 w-full max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
              <span className="text-accent">02</span>
              <span className="mx-2 text-foreground/20">/</span>
              Join
            </p>
            <h2 className="mt-4 text-[1.7rem] font-normal leading-[1.1] tracking-tight text-foreground sm:text-[2rem]">
              Join as a trainer.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-foreground/60">
              Apply generally, or choose a project we are running now or opening
              next.
            </p>
            <TrainerApply />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
