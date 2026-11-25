import Link from "next/link";
import type { CSSProperties } from "react";
import { HoverArrow } from "@/components/hover-arrow";
import { InView } from "@/components/in-view";
import { Thumb, TrackChip } from "@/components/students/blocks";
import { FeaturedScene } from "@/components/students/project-scenes";
import { STORY_TINT } from "@/lib/company";
import { projectHref, type StudentProject } from "@/lib/students";
import "./featured.css";

/*
 * The Featured page's parts: an index of the featured projects, each project
 * as a case study (the problem, what was built, where it led) beside a scene
 * of it working (components/students/project-scenes), and the way on to
 * every project. Styles: featured.css (`fc-*`).
 */

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

/** The featured projects as numbered links, under the hero. */
export function FeaturedIndex({ projects }: { projects: StudentProject[] }) {
  return (
    <nav className="fc-index" aria-label="Featured projects">
      {projects.map((p, i) => (
        <a key={p.slug} href={`#${p.slug}`} className="fc-index__item" style={{ "--dot": STORY_TINT[p.track] } as CSSProperties}>
          <span className="fc-index__num">0{i + 1}</span>
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-medium text-text">{p.title}</span>
            <span className="fc-index__track">
              <i aria-hidden="true" />
              {p.track}
            </span>
          </span>
        </a>
      ))}
    </nav>
  );
}

/** One featured project, large: the case on one side, a scene of it working on the other. */
export function FeaturedCase({ project: p, index, flip }: { project: StudentProject; index: number; flip?: boolean }) {
  return (
    <article id={p.slug} className="fc-case scroll-mt-20" data-flip={flip || undefined}>
      <InView className="fc-case__copy" threshold={0.2}>
        <p className="fc-case__num">Featured · 0{index + 1}</p>
        <div>
          <TrackChip track={p.track} />
        </div>
        <h2 className="fc-case__title">{p.title}</h2>
        <p className="fc-case__by">
          <span className="fc-case__avatar" aria-hidden="true">
            {initials(p.student)}
          </span>
          <span>
            <span className="block text-[15px] font-medium text-text">{p.student}</span>
            <span className="block text-[13px] text-text-muted">{p.detail}</span>
          </span>
        </p>
        <div className="fc-case__block">
          <p className="fc-case__label">The problem</p>
          <p className="fc-case__text">{p.problem}</p>
        </div>
        <div className="fc-case__block">
          <p className="fc-case__label">What they built</p>
          <ol className="fc-case__built">
            {p.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ol>
        </div>
        <p className="fc-case__led">
          <span className="fc-case__label">Where it led</span>
          {p.outcome}
        </p>
        <div className="fc-case__foot">
          <ul className="sd-stack" aria-label="Built with">
            {p.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <Link href={projectHref(p)} className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
            Read the project
            <HoverArrow />
          </Link>
        </div>
      </InView>
      <div className="fc-case__scene pp-dots">
        <div className="fc-case__stick">
          <FeaturedScene slug={p.slug} />
        </div>
      </div>
    </article>
  );
}

/** The way on: a few more projects as thumbnails, and every project. */
export function MoreProjects({ projects, total }: { projects: StudentProject[]; total: number }) {
  return (
    <div className="fc-more">
      <div className="fc-more__thumbs" aria-hidden="true">
        {projects.map((p) => (
          <span key={p.slug} className="fc-more__thumb">
            <Thumb project={p} />
          </span>
        ))}
      </div>
      <div className="fc-more__copy">
        <h2 className="pp-h2">
          {total} projects, each with its own page. <span className="text-text-muted">Search them, filter by track, and read how each one went.</span>
        </h2>
        <Link href="/students/projects" className="btn btn-primary btn-lg mt-8 self-start">
          All student projects
          <HoverArrow />
        </Link>
      </div>
    </div>
  );
}
