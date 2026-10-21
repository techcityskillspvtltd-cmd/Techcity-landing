import CtaLink from "@/components/CtaLink";
import { CareersFigure } from "@/components/StudentFigures";

const tracks = [
  { label: "Internships", line: "Roles for the term or the summer" },
  { label: "Campus programs", line: "Partner tracks that sit beside your labs" },
  { label: "Openings", line: "Full-time asks from hiring partners" },
];

export default function StudentCareers() {
  return (
    <section
      id="careers"
      className="scroll-mt-24 border-t border-foreground/10"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:gap-10 sm:px-8 sm:py-16 md:grid-cols-2 md:gap-12 lg:gap-16 lg:py-24">
        <CareersFigure className="fade-up order-2 w-full max-w-none justify-self-stretch md:order-1" />

        <div className="fade-up order-1 md:order-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45 sm:text-[11px]">
            <span className="text-accent">04</span>
            <span className="mx-2 text-foreground/20">/</span>
            Careers
          </p>
          <h2 className="mt-3 text-balance text-[1.65rem] font-normal leading-[1.12] tracking-tight text-foreground sm:text-[2.1rem] lg:text-[2.35rem] lg:leading-[1.1]">
            Internships and openings, in one place.
          </h2>
          <p className="mt-4 max-w-xl text-[14px] leading-6 text-foreground/65 sm:text-[15px] sm:leading-7">
            Browse roles and campus programs shared through TechCity partners.
            Apply when your lab work is ready to show: one place for
            internships, partner tracks, and openings.
          </p>

          <ul className="mt-6 border-t border-foreground/10 sm:mt-8">
            {tracks.map((track) => (
              <li
                key={track.label}
                className="grid gap-1 border-b border-foreground/10 py-3 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:py-3.5"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {track.label}
                </span>
                <span className="text-[13px] leading-5 text-foreground/60 sm:text-[14px] sm:leading-6">
                  {track.line}
                </span>
              </li>
            ))}
          </ul>

          <CtaLink href="/students/careers" className="mt-7 self-start sm:mt-8">
            View careers
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
