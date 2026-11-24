"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/*
 * How TechCity started and grew, told in chapters, after the scrolling
 * sections on stripe.com/payments/checkout: the chapters scroll on the left
 * while a deck of pictures on the right stays put. Each chapter lays its
 * picture on top of the deck; the earlier ones step back and peek out above
 * it, so the story piles up as you read. The pictures go from grey to full
 * colour, so the story colours itself in.
 *
 * On phones there is no deck: each chapter shows its own picture above its text.
 *
 * Facts come from lib/company and lib/projects (founders, first terms in
 * August 2025, campuses, figures). Pictures: public/story/chapters, web copies
 * of public/story/timeline.
 */

type Chapter = {
  title: string;
  body: string;
  note: string;
  image: { src: string; alt: string };
};

const chapters: Chapter[] = [
  {
    title: "Fifteen years of first weeks",
    body: "Deepak Tripathi spent more than fifteen years in industry and saw the same thing every hiring season: capable graduates, good degrees, and a first week that went badly. Not for lack of talent. Nobody had shown them the work.",
    note: "The idea was simple: teach the work where students already are, inside their college.",
    image: {
      src: "/story/chapters/1.webp",
      alt: "Students wait in a long row of grey doorways in front of factories and offices; one doorway is lit.",
    },
  },
  {
    title: "Two founders, one gap",
    body: "Gunjan Soam saw it from the technical side, building tracks and finding trainers who could teach them. Together they started TechCity Skills to close that gap from inside the college, not after it.",
    note: "Deepak runs training and operations. Gunjan runs technology, hiring and the trainers.",
    image: {
      src: "/story/chapters/2.webp",
      alt: "Two people lay planks across a gap between a college and an industrial city, building a bridge.",
    },
  },
  {
    title: "Into the timetable",
    body: "In August 2025 the first full-term programs began: St. Andrews in Gurugram, Inmantec in Ghaziabad and the School of Management Sciences in Lucknow. Practitioners taught in the college’s own lab hours, beside its faculty.",
    note: "Every track was built backwards from one test: can a graduate join a team on Monday?",
    image: {
      src: "/story/chapters/3.webp",
      alt: "A college timetable where some slots are puzzle pieces with students working on laptops, above a rainy campus.",
    },
  },
  {
    title: "Campus by campus",
    body: "Then Echelon in Faridabad, KCNIT in Banda and MMU in Ambala, many of them far from the cities where training usually happens. Each college chose its own tracks, from full stack and AI/ML to data, cloud and aptitude.",
    note: "Today: 30+ partner colleges and 50+ industry partners across north India.",
    image: {
      src: "/story/chapters/4.webp",
      alt: "A student walks a winding path that links one college campus to the next, each marked with a pin.",
    },
  },
  {
    title: "Tools that stay",
    body: "A class is a few hours a week, so the work had to carry on between visits. Five connected products followed: learning paths, tests and contests, a campus LMS, daily practice and cohort courses, all on one account.",
    note: "Built so progress never has to wait for the next class.",
    image: {
      src: "/story/chapters/5.webp",
      alt: "A student at a laptop late at night, with ideas, a checklist and a progress chart floating up from the screen.",
    },
  },
  {
    title: "Still one batch at a time",
    body: "More than 10,000 students mentored by 40+ faculty and trainers, across 12,000+ sessions. The work is still local and still done in the room, one college and one batch at a time. That is the point.",
    note: "The next batch could be at your college.",
    image: {
      src: "/story/chapters/6.webp",
      alt: "A whole batch of students celebrating together on campus steps at sunrise.",
    },
  },
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

export function StoryScroll() {
  const [at, setAt] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setAt(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ss">
      <div className="ss__chapters">
        {chapters.map((c, i) => (
          <section
            key={c.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-i={i}
            data-on={i === at || undefined}
            className="ss__chapter"
            aria-labelledby={`ss-${i}`}
          >
            {/* Phones: the chapter's own picture. */}
            <div className="ss__inline">
              <Image src={c.image.src} alt={c.image.alt} width={1122} height={1402} sizes="90vw" />
            </div>
            <p className="ss__n">{pad(i)}</p>
            <h3 id={`ss-${i}`} className="ss__title">
              {c.title}
            </h3>
            <p className="ss__body">{c.body}</p>
            <p className="ss__note">{c.note}</p>
          </section>
        ))}
      </div>

      {/* Wide screens: the deck, beside the chapters. */}
      <div className="ss__stage">
        <div className="ss__deck">
          {chapters.map((c, i) => {
            const d = i - at;
            return (
              <div
                key={c.title}
                className="ss__card"
                data-state={d === 0 ? "on" : d < 0 ? "past" : "next"}
                data-far={d < -2 || undefined}
                aria-hidden={d !== 0}
                // Cards still to come sit above the deck, so one leaving downwards covers the one it reveals.
                style={{ "--d": Math.max(d, -3), zIndex: d > 0 ? 2 * chapters.length - d : chapters.length + d } as React.CSSProperties}
              >
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  width={1122}
                  height={1402}
                  sizes="(min-width: 1024px) 520px, 1px"
                  className="ss__img"
                  priority={i === 0}
                />
              </div>
            );
          })}
        </div>
        <div className="ss__caption" aria-hidden="true">
          <p>
            <span>{pad(at)}</span>
            {chapters[at].title}
          </p>
          <ol className="ss__ticks">
            {chapters.map((c, i) => (
              <li key={c.title} data-on={i === at || undefined} data-done={i < at || undefined} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
