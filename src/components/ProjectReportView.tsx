import SectionHeading from "@/components/SectionHeading";
import { completedYear, type ProjectReport } from "@/data/projects";

function headcountLabel(project: ProjectReport) {
  return /faculty/i.test(project.cohort) ? "Faculty" : "Students";
}

const statusLine: Record<ProjectReport["status"], string> = {
  completed: "Finished",
  current: "Running",
  upcoming: "Opening",
};

const reportHeading: Record<ProjectReport["status"], string> = {
  completed: "How it went",
  current: "How it is going",
  upcoming: "How it is set",
};

export default function ProjectReportView({
  project,
  backHref,
  backLabel,
}: {
  project: ProjectReport;
  backHref: string;
  backLabel: string;
}) {
  const facts = [
    { label: "City", value: project.city },
    { label: "College", value: project.college },
    { label: headcountLabel(project), value: String(project.students) },
    { label: "Term", value: project.term },
    { label: "Training", value: project.subject },
    { label: statusLine[project.status], value: completedYear(project) },
  ];

  return (
    <>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 pt-10 sm:px-8">
        <a
          href={backHref}
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/50 transition-colors hover:text-foreground"
        >
          {backLabel}
        </a>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-secondary">
          {statusLine[project.status]} · {completedYear(project)}
        </span>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="fade-up max-w-2xl">
          <SectionHeading
            index="01"
            label="Project report"
            title={project.title}
            titleClassName="text-[2.35rem] sm:text-5xl"
          />
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
            {project.cohort}
          </p>
        </div>

        <dl className="fade-up mt-10 grid grid-cols-2 gap-px bg-foreground/10 md:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-background px-4 py-4 sm:px-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
                {fact.label}
              </dt>
              <dd className="mt-2 text-base tracking-tight break-words text-foreground sm:text-lg">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="fade-up mt-14 grid gap-12 border-t border-foreground/10 pt-12 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
            <span className="text-accent">02</span>
            <span className="mx-2 text-foreground/20">/</span>
            {reportHeading[project.status]}
          </p>
          <div className="max-w-2xl">
            <p className="text-[15px] leading-7 text-foreground/75">{project.report}</p>
            <p className="mt-6 border-t border-foreground/10 pt-6 text-sm leading-6 text-foreground/55">
              {project.outcome}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
