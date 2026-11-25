import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { HoverArrow } from "@/components/hover-arrow";
import { Crumbs, SectionHead } from "@/components/page-blocks";
import { ProjectCard, StoryCard, Thumb, TrackChip } from "@/components/students/blocks";
import { STORY_TINT, studentStories } from "@/lib/company";
import { container } from "@/lib/layout";
import { projectBySlug, studentProjects, type StudentProject } from "@/lib/students";

/** Every project, prerendered; any other slug is a 404 (below). */
export function generateStaticParams() {
  return studentProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.title} · ${p.student}`,
    description: p.summary,
    alternates: { canonical: `/students/projects/${p.slug}` },
  };
}

/*
 * One student project: the hero (what it is, who built it, what it led to,
 * its picture), then the problem, what was built and how it turned out, the
 * student's own words beside them, and three more projects, the same track
 * first. The page reads the URL inside Suspense, so the shell shows at once.
 */
export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<main className="min-h-[80svh]" aria-busy="true" />}>
      <ProjectView params={params} />
    </Suspense>
  );
}

const more = (p: StudentProject) =>
  [...studentProjects.filter((x) => x.slug !== p.slug && x.track === p.track), ...studentProjects.filter((x) => x.track !== p.track)].slice(0, 3);

async function ProjectView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();
  const story = studentStories.find((s) => s.name === p.student);
  const initials = p.student
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <main className="overflow-x-clip">
      <section className="mt-16 border-t border-line">
        <div className={`${container} border-x border-b border-line`}>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div className="pp-hero-copy">
              <Crumbs
                items={[
                  { label: "Students", href: "/students" },
                  { label: "Projects", href: "/students/projects" },
                  { label: p.student },
                ]}
              />
              <div className="mt-6">
                <TrackChip track={p.track} />
              </div>
              <h1 className="sd-h1 mt-4!">{p.title}</h1>
              <p className="pp-lede">{p.summary}</p>
              <div className="sd-byline" style={{ "--dot": STORY_TINT[p.track] } as CSSProperties}>
                <span className="sd-avatar" aria-hidden="true">
                  {initials}
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-medium text-text">{p.student}</span>
                  <span className="block text-[13px] text-text-muted">{p.detail}</span>
                </span>
                <span className="sd-byline__outcome">{p.outcome}</span>
              </div>
            </div>
            <div className="pp-hero__picture">
              <div className="pp-dots sd-project-art">
                <Thumb project={p} large />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className={`${container} border-x border-b border-line`}>
          <div className="sd-case" style={{ "--tool": STORY_TINT[p.track] } as CSSProperties}>
            <div className="sd-case__main">
              <p className="sd-case__label">The problem</p>
              <p className="sd-case__lead">{p.problem}</p>

              <p className="sd-case__label mt-12">What they built</p>
              <ul className="sd-points">
                {p.built.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <p className="sd-case__label mt-12">How it turned out</p>
              <p className="mt-3 max-w-[560px] text-[17px] leading-[1.7] text-text-soft">{p.result}</p>

              <p className="sd-case__label mt-12">Built with</p>
              <ul className="sd-stack" aria-label="Built with">
                {p.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            {story && (
              <aside className="sd-case__aside">
                <p className="sd-case__label">In their words</p>
                <div className="mt-4">
                  <StoryCard story={story} />
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      <section className="bg-surface-subdued">
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="More projects." rest="From the same track first, then the rest.">
            <Link href="/students/projects" className="btn btn-secondary btn-lg shrink-0 self-start shadow-[var(--shadow-btn)] sm:self-auto">
              All projects
              <HoverArrow />
            </Link>
          </SectionHead>
          <div className="sd-projects">
            {more(p).map((x) => (
              <ProjectCard key={x.slug} project={x} />
            ))}
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
