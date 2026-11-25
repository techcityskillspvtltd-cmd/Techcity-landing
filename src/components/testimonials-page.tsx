/* eslint-disable @next/next/no-img-element -- local, pre-trimmed logo files */
import Link from "next/link";
import type { CSSProperties } from "react";
import { Crumbs } from "@/components/page-blocks";
import { HoverArrow } from "@/components/hover-arrow";
import { BuildingApartmentTwoIcon, CalendarIcon, CheckTickCircleIcon, FileIcon, MapPinIcon } from "@/components/pikaicons";
import { programStatus, type PartnerStory } from "@/lib/partner-stories";
import "./testimonials-page.css";

/*
 * Testimonials, laid out after stripe.com/customers in TechCity's colours and
 * type: a hero with partner story cards in staggered columns, a tabbed grid
 * of every partner story, then the student stories. Each partner card links
 * to its story page (/company/testimonials/[slug]).
 */

export const storyHref = (s: PartnerStory) => `/company/testimonials/${s.slug}`;

/** The coloured poster behind a story: the partner's words in large type over a quiet grid. */
export function StoryPoster({ story, size = "card" }: { story: PartnerStory; size?: "card" | "wide" }) {
  // Three lines at most, so the words never reach the card's foot.
  return (
    <div className="ts-poster" data-tone={story.tone} data-size={size} aria-hidden="true">
      <span className="ts-poster__ring" />
      <span className="ts-poster__words">
        {story.poster.slice(0, 3).map((w) => (
          <span key={w}>{w}</span>
        ))}
      </span>
    </div>
  );
}

/** The partner's logo on a white chip, so every logo keeps its own colours. */
export function StoryLogo({ story, large = false }: { story: PartnerStory; large?: boolean }) {
  return (
    <span className="ts-logo" data-large={large || undefined}>
      <img src={story.logo} alt={`${story.name} logo`} loading="lazy" decoding="async" />
    </span>
  );
}

/** A portrait story card (the hero): logo top-left, story mark top-right, "Read story" at the foot. */
export function StoryCard({ story, index = 0 }: { story: PartnerStory; index?: number }) {
  return (
    <Link href={storyHref(story)} className="ts-card" style={{ "--i": index } as CSSProperties}>
      <StoryPoster story={story} />
      <span className="ts-card__top">
        <StoryLogo story={story} />
        <FileIcon width={18} height={18} aria-hidden className="ts-card__mark" />
      </span>
      <span className="ts-card__foot">
        <span className="ts-card__kind">{story.kind === "college" ? "College" : "Industry"}</span>
        <span className="ts-card__cta">
          Read story
          <HoverArrow />
        </span>
      </span>
      <span className="sr-only">{story.name}</span>
    </Link>
  );
}

/**
 * The hero's story columns: three columns at different heights, like a
 * hand-laid board. Cards rise in, column by column.
 */
export function StoryColumns({ stories }: { stories: PartnerStory[] }) {
  const cols = [stories.slice(0, 2), stories.slice(2, 4), stories.slice(4, 6)];
  return (
    <div className="ts-cols">
      {cols.map((col, c) => (
        <div key={c} className="ts-cols__col" data-col={c}>
          {col.map((s, i) => (
            <StoryCard key={s.slug} story={s} index={c * 2 + i} />
          ))}
        </div>
      ))}
    </div>
  );
}

/** A landscape story card for the tabbed grid: poster above, the story's headline below. */
export function StoryTile({ story }: { story: PartnerStory }) {
  return (
    <Link href={storyHref(story)} className="ts-tile">
      <span className="ts-tile__art">
        <StoryPoster story={story} size="wide" />
        <span className="ts-card__top">
          <StoryLogo story={story} />
          <FileIcon width={18} height={18} aria-hidden className="ts-card__mark" />
        </span>
      </span>
      <span className="ts-tile__body">
        <span className="ts-tile__kind">{story.kind === "college" ? "College" : "Industry"}</span>
        <span className="ts-tile__headline">{story.headline}</span>
        <span className="ts-tile__cta">
          Read story
          <HoverArrow />
        </span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------ story page */

/** How a college program runs, as the site describes it everywhere. */
const HOW_IT_RUNS = [
  { lead: "Inside the timetable.", body: "Trainers teach in the college's own schedule, alongside its faculty." },
  { lead: "Lab-first.", body: "Students build and ship real projects and get them reviewed, the way a team works." },
  { lead: "Faculty alongside.", body: "Faculty sessions sit beside the trainers, so the college keeps teaching the work after we leave." },
  { lead: "Ready for placement.", body: "Mock interviews and aptitude drills close the loop before placement season." },
];

const GROUP_FIT = {
  training: "Training and certification partners bring upskilling platforms, test preparation and placement training to the campuses we work with.",
  technology: "Technology partners are the software, ERP and IT services companies our students go on to join, and they help shape what we teach.",
};

/** The page for one partner story: hero, the facts, what we ran, and more stories. */
export function StoryArticle({ story, more }: { story: PartnerStory; more: PartnerStory[] }) {
  const c = story.college;
  const p = story.partner;
  return (
    <main className="overflow-x-clip">
      <section className="ts-hero ts-hero--story mt-16 border-t border-line">
        <div className="ts-story-hero mx-auto w-full max-w-[1266px] border-x border-line">
          <div className="ts-hero__copy">
            <Crumbs
              items={[
                { label: "Company", href: "/company" },
                { label: "Testimonials", href: "/company/testimonials" },
                { label: story.kind === "college" ? "College story" : "Industry story" },
              ]}
            />
            <div className="mt-8">
              <StoryLogo story={story} large />
            </div>
            <h1 className="ts-story-title">{story.headline}</h1>
            <p className="ts-hero__body">{story.summary}</p>
            <ul className="ts-chips">
              {c && (
                <li>
                  <MapPinIcon width={16} height={16} aria-hidden />
                  {c.city}, {c.state}
                </li>
              )}
              {story.programs[0] && (
                <li>
                  <CalendarIcon width={16} height={16} aria-hidden />
                  Since {story.facts.find((f) => f.label === "With TechCity since")?.value}
                </li>
              )}
              <li>
                <BuildingApartmentTwoIcon width={16} height={16} aria-hidden />
                {story.kind === "college" ? c?.kind.label : story.facts[1].value}
              </li>
            </ul>
          </div>
          <div className="ts-story-hero__art">
            <StoryPoster story={story} size="wide" />
          </div>
        </div>
      </section>

      <section className="ts-section">
        <div className="ts-article mx-auto w-full max-w-[1266px] border-x border-line">
          <aside className="ts-article__aside">
            <p className="ts-eyebrow">At a glance</p>
            <dl className="ts-facts">
              {story.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <a href="#partner" className="ts-btn mt-8">
              Partner with us
              <HoverArrow />
            </a>
          </aside>

          <div className="ts-article__body">
            <h2 className="ts-article__h">About {story.name}</h2>
            {c && (
              <p className="ts-article__p">
                {c.name} is {c.kind.label === "University" ? "a university" : "an institute"} in {c.city}, {c.state}
                {c.founded ? `, founded in ${c.founded}` : ""}. {c.fact}
              </p>
            )}
            {p && (
              <>
                <p className="ts-article__p">{p.fact ?? `${p.detail}.`}</p>
                {p.facts && (
                  <ul className="ts-ticks">
                    {p.facts.map((f) => (
                      <li key={f}>
                        <CheckTickCircleIcon width={18} height={18} aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <h2 className="ts-article__h">Where they fit</h2>
                <p className="ts-article__p">{GROUP_FIT[p.group]}</p>
                <Link href="/partners/industries" className="ts-link mt-2">
                  All industry partners
                  <HoverArrow />
                </Link>
              </>
            )}

            {story.programs.length > 0 && (
              <>
                <h2 className="ts-article__h">What we ran</h2>
                <div className="ts-programs">
                  {story.programs.map((run) => (
                    <article key={run.title} className="ts-program">
                      <div className="flex items-center justify-between gap-4">
                        <span className="ts-program__status" data-status={run.status}>
                          {programStatus(run)}
                        </span>
                        <span className="flex items-center gap-1.5 text-[13px] text-text-muted">
                          <CalendarIcon width={14} height={14} aria-hidden />
                          {run.dates}
                        </span>
                      </div>
                      <h3 className="mt-4 text-[18px] leading-[1.35] font-medium tracking-[-0.01em] text-text">{run.title}</h3>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {run.tracks.map((t) => (
                          <li key={t} className="projects-track">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>

                <h2 className="ts-article__h">How it ran</h2>
                <ul className="ts-how">
                  {HOW_IT_RUNS.map((h) => (
                    <li key={h.lead}>
                      <CheckTickCircleIcon width={18} height={18} aria-hidden />
                      <span>
                        <strong>{h.lead}</strong> {h.body}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {story.quote && (
              <figure className="ts-pullquote">
                <blockquote>“{story.quote.text}”</blockquote>
                <figcaption>
                  {story.quote.name}, {story.quote.role}
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      <section className="ts-section ts-section--tint">
        <div className="mx-auto w-full max-w-[1266px] border-x border-line px-5 py-16 sm:px-10 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="ts-eyebrow">More stories</p>
              <h2 className="ts-h2">Keep reading.</h2>
            </div>
            <Link href="/company/testimonials#stories" className="ts-link mb-8">
              All stories
              <HoverArrow />
            </Link>
          </div>
          <div className="ts-grid">
            {more.map((s) => (
              <StoryTile key={s.slug} story={s} />
            ))}
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}

/** The story page's loading shell: the hero's shape in quiet bars, shared by every story. */
export function StorySkeleton() {
  return (
    <main className="overflow-x-clip" aria-busy="true">
      <section className="ts-hero ts-hero--story mt-16 border-t border-line">
        <div className="ts-story-hero mx-auto w-full max-w-[1266px] border-x border-line">
          <div className="ts-hero__copy">
            <span className="ts-skel" style={{ width: 160, height: 14 }} />
            <span className="ts-skel mt-8" style={{ width: 150, height: 64, borderRadius: 12 }} />
            <span className="ts-skel mt-6" style={{ width: "90%", height: 40 }} />
            <span className="ts-skel mt-3" style={{ width: "70%", height: 40 }} />
            <span className="ts-skel mt-6" style={{ width: "80%", height: 16 }} />
          </div>
          <div className="ts-story-hero__art ts-skel" />
        </div>
      </section>
    </main>
  );
}
