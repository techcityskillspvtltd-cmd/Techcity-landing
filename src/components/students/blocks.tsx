import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { HoverArrow } from "@/components/hover-arrow";
import { Crumbs, type Crumb } from "@/components/page-blocks";
import { ProductLogo } from "@/components/product-logo";
import { STORY_TINT, type StoryTrack, type StudentStory } from "@/lib/company";
import { container } from "@/lib/layout";
import { products } from "@/lib/products";
import type { StudentProject, StudentTool } from "@/lib/students";
import "./students.css";

/*
 * Blocks for the student side (/students and its pages). Same tokens, type,
 * guide lines and run-in headings as the partner side; the student look adds
 * a little energy on top: a highlighter on the key words, chips with a dot in
 * each track's colour, rounded cards that lift, and the product colours.
 * Styles: students.css (`sd-*`).
 */

/* ------------------------------------------------------------------ hero */

/**
 * The student hero: breadcrumb (or a "For students" pill on the home page),
 * a headline whose `mark`ed words get the highlighter, a line, actions; the
 * picture on a dotted panel beside it.
 */
export function StudentHero({
  crumb,
  title,
  lede,
  actions,
  picture,
  below,
}: {
  /** Leave out on the student home page, which shows a pill instead. */
  crumb?: Crumb[];
  title: ReactNode;
  lede: string;
  actions: ReactNode;
  picture: ReactNode;
  /** Under the actions: a small proof line. */
  below?: ReactNode;
}) {
  return (
    <section className="mt-16 border-t border-line">
      <div className={`${container} border-x border-b border-line`}>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="pp-hero-copy">
            {crumb ? (
              <Crumbs items={crumb} />
            ) : (
              <p className="sd-pill">
                <i aria-hidden="true" />
                For students
              </p>
            )}
            <h1 className="sd-h1">{title}</h1>
            <p className="pp-lede">{lede}</p>
            <div className="pp-actions">{actions}</div>
            {below}
          </div>
          <div className="pp-hero__picture">
            <div className="pp-dots sd-picture">{picture}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A few student initials and a line of proof, under the hero's actions. */
export function Proof({ names, line }: { names: string[]; line: string }) {
  return (
    <p className="sd-proof">
      <span className="sd-faces" aria-hidden="true">
        {names.map((n) => (
          <i key={n}>
            {n
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </i>
        ))}
      </span>
      {line}
    </p>
  );
}

/* ----------------------------------------------------------------- chips */

export function TrackChip({ track, children }: { track: StoryTrack; children?: ReactNode }) {
  return (
    <span className="sd-chip" style={{ "--dot": STORY_TINT[track] } as CSSProperties}>
      <i aria-hidden="true" />
      {children ?? track}
    </span>
  );
}

/* ----------------------------------------------------------------- tools */

/** One of the five tools, as a card: logo, what it does for you, a link out. */
export function ToolCard({ tool, href }: { tool: StudentTool; href: string }) {
  const p = products.find((x) => x.id === tool.id)!;
  return (
    <Link href={href} className={`sd-tool sd-tool--${tool.id} group`}>
      <ProductLogo id={tool.id} size={40} />
      <span className="mt-4 block text-[13px] text-text-muted">
        <span className="font-medium text-text">{p.name}</span> · {p.category}
      </span>
      <span className="mt-3 block text-[17px] leading-[1.35] font-medium tracking-[-0.01em] text-text">{tool.lead}</span>
      <span className="mt-2 block text-[14px] leading-[1.6] text-text-muted">{tool.body}</span>
      <span className="mt-auto inline-flex items-center pt-6 text-[14px] font-medium text-accent">
        See how it works
        <HoverArrow />
      </span>
    </Link>
  );
}

/* --------------------------------------------------------------- stories */

/** A student story: where they landed, their words, who they are. */
export function StoryCard({ story }: { story: StudentStory }) {
  return (
    <figure className="sd-story" style={{ "--dot": STORY_TINT[story.track] } as CSSProperties}>
      <p className="sd-story__outcome">{story.outcome}</p>
      <blockquote className="sd-story__quote">“{story.quote}”</blockquote>
      <figcaption className="sd-story__who">
        <span className="sd-avatar" aria-hidden="true">
          {story.initials}
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] font-medium text-text">{story.name}</span>
          <span className="block text-[13px] text-text-muted">
            {story.degree} · {story.city}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------- projects */

/** A thumbnail of what the project is, drawn in the track's colour. */
function Thumb({ project }: { project: StudentProject }) {
  const bars = (n: number) => Array.from({ length: n }, (_, i) => <i key={i} />);
  return (
    <span className="sd-thumb" data-look={project.look} style={{ "--tint": STORY_TINT[project.track] } as CSSProperties} aria-hidden="true">
      <span className="sd-thumb__frame">
        {project.look === "dashboard" && (
          <>
            <span className="sd-t-side">{bars(4)}</span>
            <span className="sd-t-main">
              <span className="sd-t-cards">{bars(3)}</span>
              <span className="sd-t-bars">{bars(7)}</span>
            </span>
          </>
        )}
        {project.look === "chat" && <span className="sd-t-chat">{bars(4)}</span>}
        {project.look === "pipeline" && <span className="sd-t-pipe">{bars(4)}</span>}
        {project.look === "design" && <span className="sd-t-phones">{bars(2)}</span>}
        {project.look === "chart" && <span className="sd-t-chart">{bars(9)}</span>}
        {project.look === "code" && <span className="sd-t-code">{bars(6)}</span>}
      </span>
    </span>
  );
}

export function ProjectCard({ project }: { project: StudentProject }) {
  return (
    <article className="sd-project">
      <Thumb project={project} />
      <div className="sd-project__body">
        <TrackChip track={project.track} />
        <h3 className="mt-4 text-[18px] leading-[1.3] font-medium tracking-[-0.01em] text-text">{project.title}</h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-text-muted">{project.summary}</p>
        <ul className="sd-stack" aria-label="Built with">
          {project.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="sd-project__foot">
          <span className="min-w-0">
            <span className="block text-[14px] font-medium text-text">{project.student}</span>
            <span className="block text-[13px] text-text-muted">{project.detail}</span>
          </span>
          <span className="sd-outcome">{project.outcome}</span>
        </div>
      </div>
    </article>
  );
}
