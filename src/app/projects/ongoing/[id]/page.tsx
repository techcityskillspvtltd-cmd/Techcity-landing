import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectReportView from "@/components/ProjectReportView";
import { ongoingProjects, ongoingReport } from "@/data/projects";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return ongoingProjects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = ongoingReport(id);
  if (!project) return { title: "Project report" };

  return {
    title: `${project.title} · Project report`,
    description: `${project.title} at ${project.college}, ${project.city}. ${project.outcome}`,
  };
}

export default async function OngoingProjectReportPage({ params }: Props) {
  const { id } = await params;
  const project = ongoingReport(id);
  if (!project) notFound();

  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <ProjectReportView
          project={project}
          backHref="/projects/ongoing"
          backLabel="Ongoing projects"
        />
      </main>
      <Footer />
    </div>
  );
}
