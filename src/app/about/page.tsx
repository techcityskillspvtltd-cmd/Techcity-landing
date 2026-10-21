import type { Metadata } from "next";
import CtaLink from "@/components/CtaLink";
import SlotNumber from "@/components/SlotNumber";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { directors } from "@/data/directors";
import { facultyPanel } from "@/data/program-insights";
import StoryGallery from "@/components/StoryGallery";
import {
  FirstWeekFigure,
  GapFigure,
  KeptLabFigure,
  LateStackFigure,
} from "@/components/StoryFigures";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Why TechCity Skills exists: the gap between a college course and a first week on an engineering team, and how the programs close it.",
};

const pairs = [
  {
    index: "01",
    problemTitle: "A finished course is not finished work.",
    problem:
      "A syllabus can run to the last chapter and still never ask a student to ship something a team would keep. Marks measure what was remembered. A role measures whether the system holds.",
    solutionTitle: "Labs are built to be kept.",
    solution:
      "Programs run inside the college, and engineering leaders review what is taught. A student leaves with work a hiring team can open, run, and ask about — not a demo that only exists for the exam.",
    figure: KeptLabFigure,
  },
  {
    index: "02",
    problemTitle: "The tools move faster than the semester.",
    problem:
      "Generative AI, cloud architecture, and production engineering show up in interviews long before they show up in a lab. Faculty are asked to close that distance with a textbook and one term.",
    solutionTitle: "The stack stays current, with the faculty.",
    solution:
      "Tracks stay on generative AI, cloud systems, and full-stack engineering built to a production standard. Faculty sessions sit beside the trainers, so the college can keep teaching the work after we leave the room.",
    figure: LateStackFigure,
  },
  {
    index: "03",
    problemTitle: "Hiring still starts with a training month.",
    problem:
      "Companies take on graduates and then spend months teaching the work the degree was meant to cover. The student is qualified on paper and still not ready on Monday.",
    solutionTitle: "The first week is the measure.",
    solution:
      "Every program is mapped to a production skill a team can check. The aim is a graduate who can join a project in the first week — someone who can own a piece of a system, not only write code on a whiteboard.",
    figure: FirstWeekFigure,
  },
];

const principles = [
  {
    index: "01",
    title: "Reviewed with people who hire",
    body: "The curriculum is checked with engineering leaders and hiring managers, including teams at large technology companies. If a lab would not survive that review, it does not ship.",
  },
  {
    index: "02",
    title: "Built for the work ahead",
    body: "Time goes to generative AI, cloud architecture, and full-stack engineering that has to hold in production. Frameworks leave the program when teams stop shipping with them.",
  },
  {
    index: "03",
    title: "Tied to a result you can verify",
    body: "Each program is mapped to hands-on production skill. A graduate should be able to contribute from the first day, and a college should be able to point at the work.",
  },
];

const figures = [
  { value: "30+", label: "Partner colleges" },
  { value: "50+", label: "Industry partners" },
  { value: "40+", label: "Faculty and trainers" },
  { value: "10K+", label: "Students mentored" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-[4.5rem]">
          <div className="fade-up">
            <SectionHeading
              index="02"
              label="Our story"
              title="Colleges were teaching the subject. Companies were hiring for the work."
              titleClassName="max-w-xl text-[2.15rem] sm:text-[2.75rem]"
            />
            <p className="mt-6 max-w-xl text-base leading-7 text-foreground/70">
              TechCity Skills was founded to close that distance. We work
              inside colleges, with their faculty, so a student leaves able to
              join a team.
            </p>
          </div>
          <GapFigure className="fade-up" />
        </section>

        <section className="border-t border-foreground/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
            <div className="fade-up max-w-2xl">
              <SectionHeading
                index="03"
                label="Problem and answer"
                title="Three places the classroom and the team still miss each other."
              />
            </div>

            <div className="mt-12 flex flex-col gap-12 lg:gap-16">
              {pairs.map((pair) => {
                const Figure = pair.figure;
                return (
                  <article
                    key={pair.index}
                    className="fade-up grid items-start gap-10 lg:grid-cols-2 lg:gap-16"
                  >
                    <Figure />
                    <div className="grid gap-px bg-foreground/10">
                      <div className="bg-background py-6 sm:py-8">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                          <span className="text-accent">Problem {pair.index}</span>
                        </p>
                        <h3 className="mt-3 text-[1.35rem] font-normal leading-snug tracking-tight text-foreground">
                          {pair.problemTitle}
                        </h3>
                        <p className="mt-3 max-w-xl text-[15px] leading-7 text-foreground/65">
                          {pair.problem}
                        </p>
                      </div>
                      <div className="bg-background py-6 sm:py-8">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-secondary">
                          How we answer it
                        </p>
                        <h3 className="mt-3 text-[1.35rem] font-normal leading-snug tracking-tight text-foreground">
                          {pair.solutionTitle}
                        </h3>
                        <p className="mt-3 max-w-xl text-[15px] leading-7 text-foreground/65">
                          {pair.solution}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-foreground/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
            <ul className="grid grid-cols-2 gap-px bg-foreground/10 lg:grid-cols-4">
              {figures.map((item, index) => (
                <li key={item.label} className="bg-background px-4 py-5 sm:px-5">
                  <p className="text-3xl leading-none tracking-tight text-foreground sm:text-4xl">
                    <SlotNumber value={item.value} delay={index * 80} />
                  </p>
                  <p className="mt-2 max-w-[11rem] font-mono text-[10px] uppercase leading-4 tracking-[0.14em] text-foreground/40">
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
            <ul className="mt-px grid grid-cols-2 gap-px bg-foreground/10 lg:grid-cols-4">
              {facultyPanel.metrics.map((item, index) => (
                <li key={item.label} className="bg-background px-4 py-5 sm:px-5">
                  <p className="text-3xl leading-none tracking-tight text-foreground sm:text-4xl">
                    <SlotNumber value={item.value} delay={index * 80} />
                  </p>
                  <p className="mt-2 max-w-[11rem] font-mono text-[10px] uppercase leading-4 tracking-[0.14em] text-foreground/40">
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-foreground/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
            <div className="fade-up max-w-2xl">
              <SectionHeading
                index="04"
                label="What we hold the work to"
                title="A program earns its place when a hiring team would recognise it."
              />
            </div>
            <ol className="mt-12 grid gap-px bg-foreground/10 lg:grid-cols-3">
              {principles.map((principle) => (
                <li key={principle.index} className="bg-background py-8 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-accent">
                    {principle.index}
                  </p>
                  <h3 className="mt-4 text-[1.25rem] font-normal leading-snug tracking-tight text-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-foreground/65">
                    {principle.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-foreground/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <SectionHeading
                  index="05"
                  label="Directors"
                  title="The company is led by the two people who set that standard."
                />
                <p className="mt-5 max-w-xl text-[15px] leading-7 text-foreground/65">
                  Deepak Tripathi and Gunjan Soam are the directors and
                  co-founders. They lead TechCity Skills together.
                </p>
              </div>
              <CtaLink href="/faculty" className="self-start lg:self-auto">
                Meet the directors
              </CtaLink>
            </div>
            <ul className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
              {directors.map((director) => (
                <li key={director.name} className="flex items-start gap-4">
                  <img
                    src={director.image}
                    alt={director.imageAlt}
                    width={80}
                    height={80}
                    className="size-16 shrink-0 object-cover sm:size-20"
                    style={{ objectPosition: director.imagePosition }}
                  />
                  <div className="min-w-0">
                    <p className="text-[1.15rem] tracking-tight text-foreground">
                      {director.name}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
                      {director.role}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <StoryGallery />
      </main>
      <Footer />
    </div>
  );
}
