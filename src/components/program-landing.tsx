import type { CSSProperties } from "react";
import { Crumbs, SectionHead, TileGrid } from "@/components/page-blocks";
import { HoverArrow } from "@/components/hover-arrow";
import { InView } from "@/components/in-view";
import { NumberTicker } from "@/components/number-ticker";
import { ProgramProcess } from "@/components/program-process";
import { ProgramScene } from "@/components/program-scenes";
import { STORY_TINT, studentStories } from "@/lib/company";
import { container } from "@/lib/layout";
import type { ProgramPage, ProgramSlug } from "@/lib/program-pages";
import "./program-landing.css";

/*
 * A program page (/programs/<slug>), laid out after stripe.com's product pages
 * (Payments › Checkout) in TechCity's colours and type. All eight programs use
 * this one template, in one order, so they read as a set:
 *
 *   hero        headline and actions; the program's animated scene
 *   figures     three numbers, rolling in
 *   how it runs four steps on the left; on the right, a small screen of what
 *               each step produces, played as it comes up (program-process)
 *   gets        what the program gives, four ruled tiles
 *   quote       a student, in their own words (from techcityskills.com)
 *   covers      what it covers, at a glance
 */

/** The student story that speaks to each program best (quotes from the live site). */
const STORY: Record<ProgramSlug, string> = {
  trainers: "Aarav Sharma",
  "placement-preparation": "Ishita Banerjee",
  "student-placement": "Siddharth Rao",
  mentorship: "Neha Choudhary",
  "faculty-development": "Meera Joshi",
  "online-lessons": "Sahil Khan",
  "online-content": "Kunal Mehta",
  platforms: "Aditya Kulkarni",
};

export function ProgramLanding({ program: p }: { program: ProgramPage }) {
  const story = studentStories.find((s) => s.name === STORY[p.slug]);

  return (
    <main className="pl overflow-x-clip">
      {/* Hero */}
      <section className="mt-16 border-t border-line">
        <div className={`${container} pl-hero border-x border-line`}>
          <div className="pl-hero__copy">
            <Crumbs items={[{ label: "Programs", href: "/programs" }, { label: p.label }]} />
            <h1 className="pp-h1">
              {p.hero.lead} <span className="text-text-muted">{p.hero.rest}</span>
            </h1>
            <div className="pp-actions">
              <a href="#partner" className="btn btn-primary btn-lg">
                Bring it to your campus
                <HoverArrow />
              </a>
              <a href="#how-it-runs" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
                See how it runs
              </a>
            </div>
          </div>
          <div className="pl-hero__art">
            <ProgramScene slug={p.slug} />
          </div>
        </div>
      </section>

      {/* Figures */}
      <section className="border-t border-line">
        <InView className={`${container} pl-figures border-x border-line`} threshold={0.4}>
          {p.hero.stats.map((s, i) => (
            <div key={s.label} className="pl-figures__cell">
              <p className="pl-figures__num">
                <NumberTicker value={s.value} delay={i * 0.12} />
              </p>
              <p className="pl-figures__label">{s.label}</p>
            </div>
          ))}
        </InView>
      </section>

      {/* How it runs: the steps, each with a scene of what it produces */}
      <section id="how-it-runs" className="pl-tint scroll-mt-20 border-t border-line">
        <div className={`${container} pl-section border-x border-line`}>
          <h2 className="pp-h2 pl-head">
            {p.process.lead} <span className="text-text-muted">{p.process.rest}</span>
          </h2>
          <ProgramProcess steps={p.process.steps} />
        </div>
      </section>

      {/* What you get */}
      <section id="what-you-get" className="scroll-mt-20 border-t border-line">
        <div className={`${container} border-x border-line`}>
          <SectionHead lead={p.gets.lead} rest={p.gets.rest} />
          <TileGrid tiles={p.gets.tiles} cols={4} />
        </div>
      </section>

      {/* In their words */}
      {story && (
        <section className="border-t border-line">
          <div className={`${container} pl-section border-x border-line`}>
            <figure className="pl-quote" style={{ "--dot": STORY_TINT[story.track] } as CSSProperties}>
              <div>
                <p className="pl-quote__kicker">In their words</p>
                <p className="pl-quote__outcome">{story.outcome}</p>
                <p className="pl-quote__track">
                  <i aria-hidden="true" />
                  {story.track}
                </p>
              </div>
              <div className="flex flex-col">
                <blockquote className="pl-quote__text">“{story.quote}”</blockquote>
                <figcaption className="pl-quote__who">
                  <span className="pl-quote__avatar" aria-hidden="true">
                    {story.initials}
                  </span>
                  <span>
                    <span className="block font-medium text-white">{story.name}</span>
                    <span className="block text-[13px] text-[rgb(228_232_253/0.7)]">
                      {story.degree} · {story.city}
                    </span>
                  </span>
                </figcaption>
              </div>
            </figure>
          </div>
        </section>
      )}

      {/* What it covers */}
      <section id="covers" className="scroll-mt-20 border-t border-line">
        <div className={`${container} pl-section border-x border-line`}>
          <h2 className="pp-h2 pl-head">
            {p.covers.lead} <span className="text-text-muted">{p.covers.rest}</span>
          </h2>
          <dl className="pl-glance">
            {p.covers.items.map((c) => (
              <div key={c.title} className="pl-glance__row">
                <dt>{c.title}</dt>
                <dd>{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}

/** The loading shell: the hero's shape in quiet bars, shared by every program. */
export function ProgramSkeleton() {
  return (
    <main className="pl overflow-x-clip" aria-busy="true">
      <section className="mt-16 border-t border-line">
        <div className={`${container} pl-hero border-x border-line`}>
          <div className="pl-hero__copy">
            <span className="pl-skel" style={{ width: 200, height: 28 }} />
            <span className="pl-skel mt-6" style={{ width: "90%", height: 48 }} />
            <span className="pl-skel mt-3" style={{ width: "70%", height: 48 }} />
            <span className="pl-skel mt-6" style={{ width: "85%", height: 18 }} />
          </div>
          <div className="pl-hero__art pl-skel" />
        </div>
      </section>
    </main>
  );
}
