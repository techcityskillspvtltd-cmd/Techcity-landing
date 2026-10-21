import CtaLink from "@/components/CtaLink";
import SectionHeading from "@/components/SectionHeading";
import SlotNumber from "@/components/SlotNumber";
import {
  completedProjects,
  ongoingProjects,
  upcomingProjects,
  type ProjectReport,
} from "@/data/projects";

const groups: {
  label: string;
  href: string;
  projects: ProjectReport[];
}[] = [
  { label: "Ongoing", href: "/projects/ongoing", projects: ongoingProjects },
  { label: "Upcoming", href: "/projects/upcoming", projects: upcomingProjects },
  { label: "Completed", href: "/projects/completed", projects: completedProjects },
];

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
        <ul className="grid grid-cols-3 gap-px bg-foreground/10">
          {groups.map((group, index) => (
            <li key={group.label} className="bg-background px-2.5 py-4 sm:px-5 sm:py-5">
              <p className="text-2xl leading-none tracking-tight text-foreground sm:text-4xl">
                <SlotNumber
                  value={String(group.projects.length).padStart(2, "0")}
                  delay={index * 80}
                />
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase leading-4 tracking-[0.14em] text-foreground/40">
                {group.label}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 max-w-2xl">
          <SectionHeading
            index="03"
            label="Projects"
            title="Running, opening, and finished."
          />
        </div>

        <div className="mt-12 flex flex-col gap-14">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                  {group.label}
                </p>
                <CtaLink href={group.href}>View {group.label.toLowerCase()}</CtaLink>
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.projects.map((project) => (
                  <li key={project.id}>
                    <a
                      href={`${group.href}/${project.id}`}
                      className={`group flex h-full flex-col border bg-background transition-colors duration-500 hover:border-foreground/25 ${
                        project.status === "upcoming"
                          ? "border-accent-secondary/30"
                          : "border-foreground/10"
                      }`}
                    >
                      <span
                        className={`h-0.5 ${
                          project.status === "upcoming" ? "bg-accent-secondary" : "bg-accent"
                        }`}
                      />
                      <span className="flex flex-1 flex-col p-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                          {project.subject}
                        </span>
                        <span className="mt-3 text-[1.05rem] tracking-tight text-foreground transition-colors group-hover:text-accent-secondary">
                          {project.campus}
                        </span>
                        <span className="mt-1 text-[13px] text-foreground/50">
                          {project.city}
                          <span className="text-foreground/30"> · </span>
                          {project.term}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
