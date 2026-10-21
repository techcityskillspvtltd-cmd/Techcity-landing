import CtaLink from "@/components/CtaLink";
import { ProgramFigure } from "@/components/ProgramArt";
import SectionHeading from "@/components/SectionHeading";
import { programFamilies } from "@/data/programs";

export default function Programs() {
  return (
    <section id="programs" className="scroll-mt-24 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionHeading
              index="02"
              label="Programs"
              title="Eight ways TechCity works with a campus."
            />
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-foreground/65">
              Trainers, faculty, placement, mentorship, lessons, study
              material, and the systems a college runs.
            </p>
          </div>
          <CtaLink href="/programs" className="self-start">
            View all programs
          </CtaLink>
        </div>

        <ul className="mt-10 grid gap-px bg-foreground/10">
          {programFamilies.map((family) => (
            <li key={family.id} className="bg-background">
              <a
                href={`/programs#${family.id}`}
                className="group grid grid-cols-[5.25rem_minmax(0,1fr)] items-center gap-3 py-4 min-[420px]:grid-cols-[6.75rem_minmax(0,1fr)] min-[420px]:gap-4 md:grid-cols-[8.5rem_3.25rem_minmax(0,1fr)_auto] md:gap-6 md:py-5"
              >
                <ProgramFigure
                  id={family.id}
                  caption={family.figure}
                  index={family.index}
                  compact
                />
                <span className="hidden font-mono text-[11px] tracking-[0.16em] text-accent md:block">
                  {family.index}
                </span>
                <span className="min-w-0">
                  <span className="block text-[1.15rem] tracking-tight text-foreground transition-colors group-hover:text-accent-secondary">
                    <span className="mr-2 font-mono text-[11px] tracking-[0.16em] text-accent md:hidden">
                      {family.index}
                    </span>
                    {family.title}
                  </span>
                  <span className="mt-1 block max-w-xl text-[15px] leading-6 text-foreground/60">
                    {family.line}
                  </span>
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40 md:hidden">
                    <span className="mr-1.5 text-xl tabular-nums tracking-tight text-foreground">
                      {family.count}
                    </span>
                    {family.countNoun}
                  </span>
                </span>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40 md:block">
                  <span className="mr-2 text-2xl tabular-nums tracking-tight text-foreground">
                    {family.count}
                  </span>
                  {family.countNoun}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
