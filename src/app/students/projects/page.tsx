import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Showcase",
  description:
    "Student projects from TechCity campuses: work you can open, run, and ask about.",
};

export default function StudentProjectsPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        Showcase
      </p>
      <h1 className="mt-4 text-[2.35rem] font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl">
        Coming soon
      </h1>
      <p className="mt-5 max-w-md text-[15px] leading-7 text-foreground/65">
        This page will collect student projects from TechCity programs:
        upcoming, ongoing, and shipped work from real campuses that a hiring
        team can open and ask about.
      </p>
      <Link
        href="/students"
        className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55 transition-colors hover:text-foreground"
      >
        Back to students
      </Link>
    </main>
  );
}
