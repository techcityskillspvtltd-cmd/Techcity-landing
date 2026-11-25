"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ExternalArrow, HoverArrow } from "@/components/hover-arrow";
import { InView } from "@/components/in-view";
import { CalendarCheckIcon, CheckTickCircleIcon, CodeIcon, LinkChainHorizontalIcon } from "@/components/pikaicons";
import { ProductLogo } from "@/components/product-logo";
import { Thumb } from "@/components/students/blocks";
import { productScenes, ReviewScene } from "@/components/students/stack-scenes";
import { studentStories } from "@/lib/company";
import { products } from "@/lib/products";
import { projectHref, stack, studentJourney, studentProjects } from "@/lib/students";
import "./home.css";

/*
 * Sections of the student home page: the journey (one student, one record),
 * the stack (the five products one below the other, each with a scene of its
 * own), the project showcase and the stories. Styles: home.css (`sh-*`).
 */

const productOf = (id: string) => products.find((p) => p.id === id)!;

/** Whether an element is on screen, for timers that should only run while it is seen. */
function useOnScreen<T extends Element>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, on] as const;
}

/* ============================================================ journey */

/**
 * Six steps on one navy line. As it comes into view the line draws from the
 * first step to the last, a second a step, and each step lights as the line
 * reaches it; then a soft light keeps travelling along it.
 */
export function Journey() {
  return (
    <InView className="sh-journey" threshold={0.35}>
      <span className="sh-journey__rail" aria-hidden="true">
        <span className="sh-journey__fill" />
        <span className="sh-journey__glint" />
      </span>
      <ol className="sh-journey__steps">
        {studentJourney.map((s, i) => (
          <li key={s.title} className="sh-step" style={{ "--i": i } as CSSProperties}>
            <span className="sh-step__dot">
              <span className="sh-step__num">0{i + 1}</span>
            </span>
            <span className="sh-step__copy">
              <span className="sh-step__title">{s.title}</span>
              <span className="sh-step__app">On {productOf(s.app).name}</span>
              <span className="sh-step__body">{s.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </InView>
  );
}

/* ============================================================== stack */

/**
 * The five products, one below the other in the stack's order, each in the
 * same quiet layout: a few lines on what it does for you, and a scene of it
 * in use on a framed panel (sides alternate). Each scene waits until it is
 * mostly in view, then plays once.
 */
export function StackList() {
  return (
    <div className="sh-apps">
      {stack.map((app, i) => {
        const p = productOf(app.id);
        const Scene = productScenes[app.id];
        return (
          <article
            key={app.id}
            className="sh-app"
            data-flip={i % 2 === 1 || undefined}
            style={{ "--c": `var(--p-${app.id}-1)` } as CSSProperties}
          >
            <InView className="sh-app__copy" threshold={0.4}>
              <p className="sh-app__eyebrow">
                <ProductLogo id={app.id} size={28} />
                <span className="sh-app__title">{p.name}</span>
                <span className="sh-app__meaning">{app.meaning}</span>
              </p>
              <h3 className="sh-app__headline">{app.headline}</h3>
              <p className="sh-app__body">{app.body}</p>
              <ul className="sh-app__features">
                {app.features.slice(0, 3).map((f) => (
                  <li key={f.text}>
                    <CheckTickCircleIcon width={16} height={16} aria-hidden="true" />
                    {f.text}
                    {f.ai && <span className="sh-ai">AI</span>}
                  </li>
                ))}
              </ul>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="sh-app__link">
                Open {p.name}
                <span className="sr-only"> (opens in a new tab)</span>
                <ExternalArrow />
              </a>
            </InView>
            <div className="sh-app__scene pp-dots">
              <Scene />
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* =========================================================== projects */

/**
 * The project showcase, in the products' layout: how projects are reviewed
 * (a stageshow scene of a trainer's review) beside a few lines, then the
 * featured projects as three cards, each leading to its own page.
 */
export function ProjectShowcase() {
  const list = studentProjects.filter((p) => p.featured).slice(0, 3);
  return (
    <div className="sh-apps">
      <article className="sh-review">
        <InView className="sh-review__copy" threshold={0.3}>
          <p className="sh-review__kicker">
            <i aria-hidden="true" />
            Reviewed like work
          </p>
          <h3 className="sh-review__title">Every project gets a trainer&apos;s review before it ships.</h3>
          <p className="sh-review__body">Comments on the code, a fix, an approval: the way a team works, so what you show in an interview has already been through it.</p>
          <ul className="sh-review__points">
            {[
              { Icon: CodeIcon, title: "Weekly code reviews", body: "From trainers who ship, on every pull request." },
              { Icon: CalendarCheckIcon, title: "A demo day", body: "Every cohort ends by showing what it built." },
              { Icon: LinkChainHorizontalIcon, title: "A page for each project", body: "Something to send along with your resume." },
            ].map(({ Icon, title, body }) => (
              <li key={title}>
                <span className="sh-review__icon" aria-hidden="true">
                  <Icon width={18} height={18} />
                </span>
                <span>
                  <span className="sh-review__point">{title}</span>
                  <span className="sh-review__note">{body}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/students/featured" className="btn btn-primary btn-lg mt-8 self-start">
            See featured projects
            <HoverArrow />
          </Link>
        </InView>
        <div className="sh-review__scene pp-dots">
          <ReviewScene />
        </div>
      </article>

      <ol className="sh-cards">
        {list.map((p) => (
          <li key={p.slug}>
            <Link href={projectHref(p)} className="sh-card group">
              <span className="sh-card__art">
                <Thumb project={p} />
              </span>
              <span className="sh-card__body">
                <span className="sh-card__title">{p.title}</span>
                <span className="sh-card__by">
                  {p.student} · {p.detail}
                </span>
                <span className="sh-card__outcome">{p.outcome}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ============================================================ stories */

const STORY_TIME = 7000;
const spotlight = ["Aarav Sharma", "Tanvi Patel", "Priya Nair", "Vikram Singh", "Neha Choudhary"]
  .map((n) => studentStories.find((s) => s.name === n))
  .filter((s): s is (typeof studentStories)[number] => !!s);

/**
 * Stories: one quote large, moving on by itself while on screen (paused under
 * the pointer, stopped once a name is picked); the people beside it to pick
 * from; under them, every outcome drifting past.
 */
export function StoriesSpotlight() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);
  const [ref, onScreen] = useOnScreen<HTMLDivElement>();
  const running = auto && onScreen && !hover;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % spotlight.length), STORY_TIME);
    return () => clearTimeout(t);
  }, [active, running]);

  const s = spotlight[active];
  return (
    <div className="sh-stories">
      <div ref={ref} className="sh-spot" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <figure key={s.name} className="sh-spot__quote">
          <p className="sh-spot__outcome">{s.outcome}</p>
          <blockquote>“{s.quote}”</blockquote>
          <figcaption>
            <span className="sd-avatar" aria-hidden="true">
              {s.initials}
            </span>
            <span>
              <span className="block text-[15px] font-medium text-text">{s.name}</span>
              <span className="block text-[13px] text-text-muted">
                {s.degree} · {s.city}
              </span>
            </span>
          </figcaption>
        </figure>
        <ol className="sh-spot__people" aria-label="Students">
          {spotlight.map((x, i) => (
            <li key={x.name}>
              <button
                type="button"
                className="sh-spot__person"
                aria-current={i === active || undefined}
                data-running={(i === active && running) || undefined}
                style={{ "--t": `${STORY_TIME}ms` } as CSSProperties}
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                }}
              >
                <span className="sd-avatar" aria-hidden="true">
                  {x.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-medium text-text">{x.name}</span>
                  <span className="block truncate text-[13px] text-text-muted">{x.outcome}</span>
                </span>
                <span className="sh-spot__bar" aria-hidden="true">
                  <i key={`${active}-${running}`} />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="sh-ticker" aria-hidden="true">
        <div className="sh-ticker__track">
          {[0, 1].map((copy) => (
            <div key={copy} className="sh-ticker__set">
              {studentStories.map((x) => (
                <span key={x.name} className="sh-ticker__item">
                  <span className="font-medium text-text">{x.outcome}</span>
                  <span className="text-text-muted">
                    {x.name.split(" ")[0]} · {x.city}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
