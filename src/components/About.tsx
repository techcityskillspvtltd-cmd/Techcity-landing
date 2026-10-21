import CtaLink from "@/components/CtaLink";
import SectionHeading from "@/components/SectionHeading";
import SlotNumber from "@/components/SlotNumber";

const figures = [
  { value: "30+", label: "Partner colleges" },
  { value: "50+", label: "Industry partners" },
  { value: "40+", label: "Faculty & trainers" },
  { value: "10K+", label: "Students mentored" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionHeading
              index="01"
              label="About"
              title="Colleges were teaching the subject. Companies were hiring for the work."
              titleClassName="max-w-xl text-[2rem] sm:text-[2.45rem]"
            />
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-foreground/65">
              TechCity Skills works inside colleges, with their faculty, so a
              student leaves able to join a team.
            </p>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-foreground/65">
              Programs are lab-first: live projects, timed practice, and
              reviews the way a team works. Content is built with industry
              partners and kept current, so campus hours map to the first week
              on the job.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaLink href="/about">Read the story</CtaLink>
            <CtaLink href="/faculty">Faculty</CtaLink>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-px bg-foreground/10 md:grid-cols-4">
          {figures.map((item, index) => (
            <li key={item.label} className="bg-background px-4 py-6 sm:px-5 sm:py-7">
              <p className="text-3xl leading-none tracking-tight text-foreground sm:text-4xl">
                <SlotNumber value={item.value} delay={index * 90} />
              </p>
              <p className="mt-2.5 max-w-[11rem] font-mono text-[10px] uppercase leading-4 tracking-[0.14em] text-foreground/40">
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
