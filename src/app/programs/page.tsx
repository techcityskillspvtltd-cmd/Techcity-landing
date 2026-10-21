import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { PartnerCta } from "@/components/PartnerApply";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProgramInsights from "@/components/ProgramInsights";
import { ProgramFigure } from "@/components/ProgramArt";
import SectionHeading from "@/components/SectionHeading";
import { programFamilies } from "@/data/programs";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "TechCity programs for colleges: trainers, faculty development, placement preparation, student placement, mentorship, online lessons, study material, and platforms a campus runs.",
};

export default function ProgramsPage() {
  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
          <div className="fade-up max-w-3xl">
            <SectionHeading
              index="01"
              label="Programs"
              title="What TechCity runs with a campus."
              titleClassName="text-[2.35rem] sm:text-5xl"
            />
          </div>

          <ul className="fade-up mt-12 grid gap-px bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
            {programFamilies.map((family) => (
              <li key={family.id} className="bg-background">
                <a
                  href={`#${family.id}`}
                  className="flex h-full flex-col px-4 py-5 transition-colors hover:bg-foreground/[0.03] sm:px-5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {family.index}
                  </span>
                  <span className="mt-3 text-[15px] tracking-tight text-foreground">
                    {family.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {programFamilies.map((family, index) => (
          <section
            key={family.id}
            id={family.id}
            className="scroll-mt-28 border-t border-foreground/10"
          >
            <div
              className="fade-up mx-auto grid max-w-7xl items-start gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-[4.5rem]"
              style={{ "--fade-delay": `${index * 40}ms` } as CSSProperties}
            >
              <ProgramFigure
                id={family.id}
                caption={family.figure}
                index={family.index}
              />

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                  <span className="text-accent">{family.index}</span>
                  <span className="mx-2 text-foreground/20">/</span>
                  {family.audience}
                </p>
                <h2 className="mt-4 max-w-md text-[1.85rem] font-normal leading-[1.1] tracking-tight text-foreground sm:text-[2.15rem]">
                  {family.title}
                </h2>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  How it works
                </p>
                <p className="mt-3 max-w-md text-[15px] leading-7 text-foreground/70">
                  {family.how}
                </p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/40">
                  <span className="mr-2 text-2xl tracking-tight text-foreground">
                    {family.count}
                  </span>
                  {family.countNoun}
                </p>

                <ol className="mt-8 border-t border-foreground/10">
                  {family.programs.map((program, programIndex) => (
                    <li
                      key={program.name}
                      className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 border-b border-foreground/10 py-5 sm:gap-4"
                    >
                      <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                        {String(programIndex + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block text-[1.02rem] tracking-tight text-foreground">
                          {program.name}
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-foreground/60">
                          {program.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        ))}

        <section className="border-t border-foreground/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-20">
            <div className="max-w-xl">
              <h2 className="text-[1.7rem] font-normal leading-[1.1] tracking-tight text-foreground sm:text-[2rem]">
                These programs run with the college, in one semester.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-foreground/65">
                A trainer in the classroom, faculty sessions beside that
                teaching, and placement, mentorship, lessons, study material,
                and platforms for the same campus.
              </p>
            </div>
            <PartnerCta className="self-start sm:self-auto" />
          </div>
        </section>

        <ProgramInsights />
      </main>
      <Footer />
    </div>
  );
}
