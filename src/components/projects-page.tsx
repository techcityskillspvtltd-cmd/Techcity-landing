import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { HoverArrow } from "@/components/hover-arrow";
import { InView } from "@/components/in-view";
import { NumberTicker } from "@/components/number-ticker";
import { ProjectScene } from "@/components/project-scenes";
import { ProjectsGlobe } from "@/components/projects-globe";
import { container } from "@/lib/layout";
import { projects, projectStatuses, type Project, type ProjectStatus } from "@/lib/projects";
import "./projects-page.css";

/*
 * Building blocks for /projects and /projects/{ongoing,upcoming,completed}, in
 * the home page's language: guide-line container, run-in headlines (dark lead,
 * muted continuation), ruled grids, the globe from the home page. Each page's
 * hero picture is a stageshow scene (components/project-scenes) told with the
 * real project data. Every number on these pages is counted from lib/projects.
 */

/* ------------------------------------------------------------- data */

export const byStatus = (s: ProjectStatus) => projects.filter((p) => p.status === s);
export const statusOf = (s: ProjectStatus) => projectStatuses.find((x) => x.id === s)!;

const unique = (xs: string[]) => [...new Set(xs)];
export const cityCount = (list: Project[]) => unique(list.map((p) => p.city)).length;
export const trackCount = (list: Project[]) => unique(list.flatMap((p) => p.tracks)).length;

/** One line per status, as in the Projects menu. */
export const STATUS_COPY: Record<ProjectStatus, { line: string; href: string }> = {
  ongoing: { line: "Running on campus now", href: "/projects/ongoing" },
  upcoming: { line: "Starting next term", href: "/projects/upcoming" },
  completed: { line: "Programs we’ve delivered", href: "/projects/completed" },
};

/* ------------------------------------------------------------- hero */

export type Stat = { value: string; label: string };

export function ProjectsHero({
  status,
  lead,
  rest,
  body,
  stats,
}: {
  /** The page's status; leave out for /projects. */
  status?: ProjectStatus;
  lead: string;
  rest: string;
  body: string;
  stats: Stat[];
}) {
  return (
    <section className="mt-16 border-t border-line">
      <div className={`${container} border-x border-b border-line`}>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col px-5 pt-14 pb-10 sm:px-10 sm:pt-20 lg:pb-16">
            <p className="pp-eyebrow">
              {status ? (
                <>
                  <Link href="/projects" className="hover:text-text">
                    Projects
                  </Link>
                  <span aria-hidden="true">/</span>
                  <span className="inline-flex items-center gap-2 text-text">
                    <i className="h-2 w-2 rounded-full" style={{ background: statusOf(status).color }} aria-hidden="true" />
                    {statusOf(status).label}
                  </span>
                </>
              ) : (
                <>
                  <Link href="/" className="hover:text-text">
                    Home
                  </Link>
                  <span aria-hidden="true">/</span>
                  <span className="text-text">Projects</span>
                </>
              )}
            </p>
            <h1 className="mt-6 text-[clamp(32px,4vw,52px)] leading-[1.08] font-normal tracking-[-0.035em] text-text">
              {lead} <span className="text-text-muted">{rest}</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-[17px] leading-[1.6] text-text-muted">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-primary btn-lg">
                Partner with us
                <HoverArrow />
              </a>
              {status ? (
                <Link href="/projects" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
                  All projects
                </Link>
              ) : (
                <Link href="/programs" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
                  See our programs
                </Link>
              )}
            </div>
          </div>
          <div className="pj-hero__picture">
            <ProjectScene id={status ?? "all"} />
          </div>
        </div>
        <InView
          className="pj-stats"
          threshold={0.4}
          style={{ "--n": stats.length, "--m": stats.length === 3 ? 3 : 2 } as CSSProperties}
        >
          {stats.map((s, i) => (
            <div key={s.label} className="pj-stats__cell">
              <p className="pj-stats__num">
                <NumberTicker value={s.value} delay={i * 0.12} />
              </p>
              <p className="mt-2 text-[14px] leading-[1.5] text-text-muted">{s.label}</p>
            </div>
          ))}
        </InView>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- section head */

export function SectionHead({ lead, rest, children }: { lead: string; rest?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 px-5 pt-12 pb-8 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pt-14 sm:pb-10">
      <h2 className="max-w-[760px] text-[clamp(24px,2.6vw,32px)] leading-[1.25] font-normal tracking-[-0.02em] text-text">
        {lead} {rest && <span className="text-text-muted">{rest}</span>}
      </h2>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ globe */

/** The home page's globe: every status behind tabs, or one status on its own. */
export function GlobeSection({ statuses, lead, rest }: { statuses?: ProjectStatus[]; lead: string; rest: string }) {
  return (
    <section className="projects-section">
      <div className={`${container} flex flex-col border-x border-b border-line md:h-[min(84svh,760px)] md:min-h-[600px]`}>
        <SectionHead lead={lead} rest={rest} />
        <ProjectsGlobe statuses={statuses} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------- project list */

/** Every project of a status as a ruled grid of cards. */
export function ProjectList({ list, lead, rest }: { list: Project[]; lead: string; rest: string }) {
  return (
    <section>
      <div className={`${container} border-x border-b border-line`}>
        <SectionHead lead={lead} rest={rest} />
        <InView className="pj-list" threshold={0.15} style={{ "--cols": Math.min(2, list.length) } as CSSProperties}>
          {list.map((p, i) => {
            const s = statusOf(p.status);
            return (
              <article key={p.title} className="pj-card" style={{ "--i": i } as CSSProperties}>
                <p className="pj-card__where">
                  <i style={{ background: s.color }} aria-hidden="true" />
                  {p.city}
                  <span className="text-text-muted">· {p.dates}</span>
                </p>
                <h3 className="pj-card__title">{p.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tracks">
                  {p.tracks.map((t) => (
                    <li key={t} className="projects-track">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </InView>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- status tiles */

/** Links to the status pages; `except` leaves out the page you are on. */
export function StatusTiles({ except, lead, rest }: { except?: ProjectStatus; lead: string; rest: string }) {
  const shown = projectStatuses.filter((s) => s.id !== except);
  return (
    <section>
      <div className={`${container} border-x border-b border-line`}>
        <SectionHead lead={lead} rest={rest}>
          {except && (
            <Link href="/projects" className="btn btn-secondary btn-lg shrink-0 self-start shadow-[var(--shadow-btn)] sm:self-auto">
              All projects
              <HoverArrow />
            </Link>
          )}
        </SectionHead>
        <div className="pj-tiles" style={{ "--n": shown.length } as CSSProperties}>
          {shown.map((s) => {
            const list = byStatus(s.id);
            return (
              <Link key={s.id} href={STATUS_COPY[s.id].href} className="pj-tile group">
                <span className="pj-tile__label">
                  <i style={{ background: s.color }} aria-hidden="true" />
                  {s.label}
                </span>
                <span className="pj-tile__num">{list.length}</span>
                <span className="pj-tile__line">{STATUS_COPY[s.id].line}</span>
                <span className="pj-tile__cities">{unique(list.map((p) => p.city)).join(" · ")}</span>
                <span className="pj-tile__more">
                  See {s.label.toLowerCase()} projects
                  <HoverArrow />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
