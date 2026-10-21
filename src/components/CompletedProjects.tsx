"use client";

import { useMemo, useState, type CSSProperties } from "react";
import SiteSelect from "@/components/SiteSelect";
import {
  completedYear,
  openingForProject,
  type ProjectReport,
  type ProjectStatus,
} from "@/data/projects";

const timingLabel: Record<ProjectStatus, string> = {
  current: "Running",
  upcoming: "Opening",
  completed: "Finished",
};

function headcountLabel(project: ProjectReport) {
  return /faculty/i.test(project.cohort) ? "Faculty" : "Students";
}

export default function CompletedProjects({
  projects,
  hrefBase,
  splitStatus = false,
  actions = false,
}: {
  projects: ProjectReport[];
  hrefBase: string;
  splitStatus?: boolean;
  actions?: boolean;
}) {
  const subjects = useMemo(
    () => [...new Set(projects.map((project) => project.subject))].sort(),
    [projects],
  );
  const cities = useMemo(
    () => [...new Set(projects.map((project) => project.city))].sort(),
    [projects],
  );
  const years = useMemo(
    () =>
      [...new Set(projects.map(completedYear))]
        .filter(Boolean)
        .sort((a, b) => b.localeCompare(a)),
    [projects],
  );
  const timings = useMemo(
    () =>
      (["current", "upcoming", "completed"] as const).filter((status) =>
        projects.some((project) => project.status === status),
      ),
    [projects],
  );
  const [subject, setSubject] = useState("all");
  const [city, setCity] = useState("all");
  const [year, setYear] = useState("all");
  const [timing, setTiming] = useState<"all" | ProjectStatus>("all");

  const visible = useMemo(
    () =>
      projects.filter((project) => {
        if (timing !== "all" && project.status !== timing) return false;
        if (subject !== "all" && project.subject !== subject) return false;
        if (city !== "all" && project.city !== city) return false;
        if (year !== "all" && completedYear(project) !== year) return false;
        return true;
      }),
    [city, projects, subject, timing, year],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {timings.length > 1 && !splitStatus ? (
          <SiteSelect
            label="When"
            value={timing}
            onChange={(value) => setTiming(value as "all" | ProjectStatus)}
            options={[
              { value: "all", label: "All" },
              ...timings.map((status) => ({ value: status, label: timingLabel[status] })),
            ]}
          />
        ) : null}
        <SiteSelect
          label="Training"
          value={subject}
          onChange={setSubject}
          options={[
            { value: "all", label: "All" },
            ...subjects.map((item) => ({ value: item, label: item })),
          ]}
        />
        <SiteSelect
          label="Year"
          value={year}
          onChange={setYear}
          options={[
            { value: "all", label: "All" },
            ...years.map((item) => ({ value: item, label: item })),
          ]}
        />
        <SiteSelect
          label="City"
          value={city}
          onChange={setCity}
          options={[
            { value: "all", label: "All" },
            ...cities.map((item) => ({ value: item, label: item })),
          ]}
        />
        <p className="inline-flex h-8 items-center font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-foreground/40">
          {visible.length} {visible.length === 1 ? "training" : "trainings"}
        </p>
      </div>

      {splitStatus ? (
        <div className="mt-14 flex flex-col gap-16">
          {(
            [
              {
                status: "current" as const,
                index: "02",
                label: "Ongoing",
                title: "Training running now.",
              },
              {
                status: "upcoming" as const,
                index: "03",
                label: "Upcoming",
                title: "Training opening next.",
              },
            ] as const
          ).map((section) => {
            const sectionProjects = visible.filter(
              (project) => project.status === section.status,
            );
            return (
              <section key={section.status}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                  <span className="text-accent">{section.index}</span>
                  <span className="mx-2 text-foreground/20">/</span>
                  {section.label}
                  <span className="ml-3 text-foreground/30">
                    {sectionProjects.length}
                  </span>
                </p>
                <h2 className="mt-4 text-[1.7rem] font-normal leading-[1.1] tracking-tight text-foreground sm:text-[2rem]">
                  {section.title}
                </h2>
                <ProjectCards projects={sectionProjects} hrefBase={hrefBase} actions />
              </section>
            );
          })}
        </div>
      ) : (
        <ProjectCards projects={visible} hrefBase={hrefBase} actions={actions} />
      )}
    </div>
  );
}

function ProjectCards({
  projects,
  hrefBase,
  actions = false,
}: {
  projects: ProjectReport[];
  hrefBase: string;
  actions?: boolean;
}) {
  if (projects.length === 0) {
    return (
      <p className="mt-8 max-w-md text-sm text-foreground/55">
        No training projects match these filters.
      </p>
    );
  }

  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => {
        const opening = openingForProject(project.id);
        const detailsHref = `${hrefBase}/${project.id}`;
        return (
          <li
            key={project.id}
            data-project={project.id}
            className="fade-up"
            style={{ "--fade-delay": `${index * 40}ms` } as CSSProperties}
          >
            <article
              className={`flex h-full flex-col border bg-background transition-colors duration-500 hover:border-foreground/25 ${
                project.status === "upcoming"
                  ? "border-accent-secondary/30"
                  : "border-foreground/10"
              }`}
            >
              <div
                className={`h-0.5 ${
                  project.status === "upcoming" ? "bg-accent-secondary" : "bg-accent"
                }`}
              />
              <a href={detailsHref} className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {project.subject}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
                    {timingLabel[project.status]} · {completedYear(project)}
                  </span>
                </div>
                <h3 className="mt-4 text-[1.25rem] font-normal leading-[1.15] tracking-tight text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/65">
                  {project.college}
                  <span className="text-foreground/30"> · </span>
                  {project.city}
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-px bg-foreground/10 text-sm">
                  <div className="bg-background py-3 pr-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
                      {headcountLabel(project)}
                    </dt>
                    <dd className="mt-1 text-foreground/80">{project.students}</dd>
                  </div>
                  <div className="bg-background py-3 pl-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
                      Term
                    </dt>
                    <dd className="mt-1 text-foreground/80">{project.term}</dd>
                  </div>
                </dl>
                <p className="mt-5 line-clamp-3 flex-1 text-sm leading-6 text-foreground/60">
                  {project.outcome}
                </p>
              </a>
              {actions ? (
                <div className="flex items-center gap-2 border-t border-foreground/10 px-6 py-3">
                  <a
                    href={detailsHref}
                    className="px-3 py-1.5 text-[12px] font-medium text-foreground"
                  >
                    See details
                  </a>
                  {project.status === "upcoming" && opening ? (
                    <a
                      href={`${hrefBase}?opening=${opening.id}#apply`}
                      className="bg-accent px-3 py-1.5 text-[12px] font-medium text-on-accent"
                    >
                      Apply now
                    </a>
                  ) : null}
                </div>
              ) : (
                <a
                  href={detailsHref}
                  className="border-t border-foreground/10 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45"
                >
                  Project report
                </a>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
}

