import type { CSSProperties } from "react";
import type { Metadata } from "next";
import CtaLink from "@/components/CtaLink";
import FacultyAvatar from "@/components/FacultyAvatar";
import { FacultyInsights, FacultySubjects } from "@/components/ProgramInsights";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { directors } from "@/data/directors";
import { faculty } from "@/data/faculty";

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "Deepak Tripathi and Gunjan Soam, directors of TechCity Skills. Deepak trains, mentors, and handles operations. Gunjan handles the technology, hiring, and the trainers.",
};

const marks = [
  { value: "2", label: "Directors" },
  { value: "15+", label: "Years of leadership" },
  { value: "10K+", label: "People mentored" },
  { value: "50+", label: "Hiring and tech partners" },
];

export default function FacultyPage() {
  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
          <div className="fade-up flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <SectionHeading
                index="02"
                label="Faculty"
                title="The directors who run TechCity Skills."
                titleClassName="text-[2.35rem] sm:text-5xl"
              />
              <p className="mt-6 max-w-xl text-base leading-7 text-foreground/70">
                Deepak brings the experience, the network, and the training.
                Gunjan holds the technology, the hiring, and the trainers.
                Both are co-founders.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-px bg-foreground/10 md:grid-cols-4 lg:max-w-xl">
              {marks.map((mark) => (
                <li key={mark.label} className="bg-background px-4 py-4 sm:px-5">
                  <p className="text-3xl tracking-tight text-foreground">
                    {mark.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase leading-4 tracking-[0.14em] text-foreground/40">
                    {mark.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-foreground/10">
          <div className="mx-auto grid max-w-7xl gap-px bg-foreground/10 lg:grid-cols-2">
            {directors.map((director, index) => (
              <article
                key={director.name}
                className="fade-up bg-background px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]"
                style={{ "--fade-delay": `${index * 80}ms` } as CSSProperties}
              >
                <div className="flex items-start gap-5">
                  <img
                    src={director.image}
                    alt={director.imageAlt}
                    width={112}
                    height={112}
                    className="size-16 shrink-0 object-cover min-[420px]:size-24 sm:size-28"
                    style={{ objectPosition: director.imagePosition }}
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 text-[1.65rem] font-normal leading-[1.1] tracking-tight text-foreground sm:text-[1.85rem]">
                      {director.name}
                    </h2>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-secondary">
                      {director.role}
                    </p>
                  </div>
                </div>
                <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/40">
                  {director.years}
                </p>
                <p className="mt-4 max-w-md text-[15px] leading-7 text-foreground/70">
                  {director.summary}
                </p>
                <p className="mt-4 max-w-md text-[15px] leading-7 text-foreground/65">
                  {director.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-foreground/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
            <div className="fade-up flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <SectionHeading
                  index="03"
                  label="Faculty"
                  title="People teaching the programs."
                />
              </div>
              <CtaLink href="/faculty/profiles" className="self-start">
                Faculty profiles
              </CtaLink>
            </div>

            <ul className="mt-12 grid gap-px bg-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
              {faculty.map((person, index) => (
                <li
                  key={person.slug}
                  className="fade-up bg-background"
                  style={{ "--fade-delay": `${index * 40}ms` } as CSSProperties}
                >
                  <a
                    href={`/faculty/${person.slug}`}
                    className="group flex h-full flex-col px-5 py-6 transition-colors hover:bg-foreground/[0.03] sm:px-6 sm:py-7"
                  >
                    <div className="flex items-start gap-4">
                      <FacultyAvatar
                        name={person.name}
                        image={person.image}
                        imagePosition={person.imagePosition}
                        className="size-16"
                      />
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                          {String(index + 1).padStart(2, "0")}
                          <span className="mx-2 text-foreground/20">/</span>
                          <span className="text-foreground/45">{person.subject}</span>
                        </p>
                        <h3 className="mt-2 text-lg font-normal tracking-tight text-foreground">
                          {person.name}
                        </h3>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
                          {person.campus}
                        </p>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-6 text-foreground/65">
                      {person.summary}
                    </p>
                    <span className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-secondary transition-colors group-hover:text-foreground">
                      Profile
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-foreground/10">
          <div className="fade-up mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
            <SectionHeading
              index="04"
              label="Subjects"
              title="Where the faculty teach."
            />
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-foreground/65">
              Featured trainers teach across software, artificial intelligence,
              and data. Cloud, DevOps, and cybersecurity sit beside those
              tracks where the campus needs them.
            </p>
            <div className="mt-12">
              <FacultySubjects />
            </div>
          </div>
        </section>

        <FacultyInsights index="05" />
      </main>
      <Footer />
    </div>
  );
}
