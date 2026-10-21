import type { Metadata } from "next";
import CompletedProjects from "@/components/CompletedProjects";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { completedProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Completed projects",
  description:
    "Training TechCity has already finished on campus, with a report for each project.",
};

export default function CompletedProjectsPage() {
  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
          <div className="fade-up max-w-2xl">
            <SectionHeading
              index="01"
              label="Completed"
              title="Training the colleges have already finished."
              titleClassName="text-[2.35rem] sm:text-5xl"
            />
          </div>
          <div className="fade-up mt-10">
            <CompletedProjects
              projects={completedProjects}
              hrefBase="/projects/completed"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
