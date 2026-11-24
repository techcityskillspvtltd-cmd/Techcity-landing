import Link from "next/link";
import type { CSSProperties } from "react";
import { Faq } from "@/components/faq";
import { Crumbs } from "@/components/page-blocks";
import { HoverArrow } from "@/components/hover-arrow";
import { Icon } from "@/components/icons";
import { InView } from "@/components/in-view";
import { NumberTicker } from "@/components/number-ticker";
import { ProgramRun } from "@/components/program-run";
import { ProgramScene } from "@/components/program-scenes";
import { STORY_TINT, studentStories } from "@/lib/company";
import { container } from "@/lib/layout";
import { programPages, type ProgramPage, type ProgramSlug } from "@/lib/program-pages";
import "./program-landing.css";

/*
 * A program page (/programs/<slug>), laid out after stripe.com's product pages
 * (Payments › Checkout) in TechCity's colours and type. All eight programs use
 * this one template, in one order, so they read as a set:
 *
 *   hero        headline and actions; the program's animated scene
 *   figures     three numbers, rolling in
 *   gets        what the program gives, as a feature list
 *   how it runs a stepped explainer: steps on the left, a live term plan
 *               on the right that animates through them
 *   quote       a student, in their own words (from techcityskills.com)
 *   covers      what it covers, at a glance
 *   questions   the first questions colleges ask
 *   more        the other seven programs
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
  const others = programPages.filter((x) => x.slug !== p.slug);
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
              <a href="#contact" className="btn btn-primary btn-lg">
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

      {/* What you get */}
      <section id="what-you-get" className="scroll-mt-20 border-t border-line">
        <div className={`${container} pl-section border-x border-line`}>
          <div className="pl-head">
            <p className="pl-kicker">What you get</p>
            <h2 className="pl-h2">{p.gets.lead}</h2>
            <p className="pl-lede">{p.gets.rest}</p>
          </div>
          <InView className="pl-features" threshold={0.2}>
            {p.gets.tiles.map((t, i) => (
              <div key={t.lead} className="pl-feature" style={{ "--i": i } as CSSProperties}>
                <span className="pl-feature__icon" aria-hidden="true">
                  <Icon name={t.icon} size={18} />
                </span>
                <p className="pl-feature__title">{t.lead.replace(/\.$/, "")}</p>
                <p className="pl-feature__body">{t.body}</p>
              </div>
            ))}
          </InView>
        </div>
      </section>

      {/* How it runs */}
      <section id="how-it-runs" className="pl-tint scroll-mt-20 border-t border-line">
        <div className={`${container} pl-section border-x border-line`}>
          <div className="pl-head">
            <p className="pl-kicker">How it runs</p>
            <h2 className="pl-h2">{p.steps.lead}</h2>
            <p className="pl-lede">{p.steps.rest}</p>
          </div>
          <ProgramRun label={p.label} steps={p.steps.items} />
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
          <div className="pl-head">
            <p className="pl-kicker">At a glance</p>
            <h2 className="pl-h2">{p.covers.lead}</h2>
            <p className="pl-lede">{p.covers.rest}</p>
          </div>
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

      {/* Questions */}
      <section id="questions" className="pl-tint scroll-mt-20 border-t border-line">
        <div className={`${container} pl-section pl-faq border-x border-line`}>
          <div className="pl-head">
            <p className="pl-kicker">Questions</p>
            <h2 className="pl-h2">What colleges ask first.</h2>
            <p className="pl-lede">Anything else, ask us directly.</p>
          </div>
          <Faq items={p.faqs} />
        </div>
      </section>

      {/* More programs */}
      <section className="border-t border-line">
        <div className={`${container} pl-section border-x border-line`}>
          <div className="pl-head pl-head--row">
            <div>
              <p className="pl-kicker">Pick your path</p>
              <h2 className="pl-h2">More programs, better together.</h2>
            </div>
            <Link href="/programs" className="pl-link">
              All programs
              <HoverArrow />
            </Link>
          </div>
          <ul className="pl-more">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/programs/${o.slug}`} className="pl-more__card">
                  <span className="flex items-center justify-between gap-3">
                    <span className="pl-feature__icon" aria-hidden="true">
                      <Icon name={o.icon} size={18} />
                    </span>
                    <span className="text-[13px] text-text-muted">{o.audience}</span>
                  </span>
                  <span className="pl-more__name">{o.label}</span>
                  <span className="pl-more__line">{o.summary}</span>
                  <span className="pl-more__cta">
                    Explore
                    <HoverArrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
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
