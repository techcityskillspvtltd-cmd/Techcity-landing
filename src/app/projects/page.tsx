import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectsBoard from "@/components/ProjectsBoard";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "TechCity campus projects across India: work already finished, sections running now, and seats opening next.",
};

type Props = {
  searchParams: Promise<{ opening?: string }>;
};

export default async function ProjectsPage({ searchParams }: Props) {
  const { opening } = await searchParams;

  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
          <div className="fade-up max-w-2xl">
            <SectionHeading
              index="01"
              label="Projects"
              title="Campus work, on the map."
              titleClassName="text-[2.35rem] sm:text-5xl"
            />
          </div>
          <div className="fade-up mt-10">
            <ProjectsBoard showApply initialOpeningId={opening} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
