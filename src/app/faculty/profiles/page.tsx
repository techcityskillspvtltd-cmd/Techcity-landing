import type { Metadata } from "next";
import FacultyProfile from "@/components/FacultyProfile";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { faculty } from "@/data/faculty";

export const metadata: Metadata = {
  title: "Faculty profiles",
  description:
    "TechCity Skills trainers: software, artificial intelligence, data science, and campus mentoring.",
};

export default function FacultyProfilesPage() {
  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
          <div className="fade-up flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <SectionHeading
                index="02"
                label="Profiles"
                title="Faculty in the programs."
                titleClassName="text-[2.35rem] sm:text-5xl"
              />
            </div>
            <a
              href="/faculty"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/50 transition-colors hover:text-foreground"
            >
              Back to faculty
            </a>
          </div>
        </section>

        <section className="border-t border-foreground/10">
          <div className="mx-auto grid max-w-7xl gap-px bg-foreground/10 lg:grid-cols-2">
            {faculty.map((person, index) => (
              <FacultyProfile key={person.slug} person={person} index={index} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
