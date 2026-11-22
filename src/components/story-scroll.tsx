"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/*
 * How TechCity started and grew, told in chapters, after the scrolling
 * sections on stripe.com/payments/checkout: the chapters scroll on the left
 * while the picture on the right stays put and moves to a different part of
 * the city for each one (campus, gate, the road between, the hub, the tower).
 *
 * Facts come from lib/company and lib/projects (founders, first terms in
 * August 2025, campuses, figures). The picture is a still of the 3D TechCity
 * (public/story/city-campus.webp).
 */

type Chapter = {
  title: string;
  body: string;
  note: string;
  /** Where the picture looks: zoom, and the point (in % of the image) it zooms into. */
  focus: { s: number; x: number; y: number };
};

const chapters: Chapter[] = [
  {
    title: "Fifteen years of first weeks",
    body: "Deepak Tripathi spent more than fifteen years in industry and saw the same thing every hiring season: capable graduates, good degrees, and a first week that went badly. Not for lack of talent. Nobody had shown them the work.",
    note: "The idea was simple: teach the work where students already are, inside their college.",
    focus: { s: 1.9, x: 12, y: 78 },
  },
  {
    title: "Two founders, one gap",
    body: "Gunjan Soam saw it from the technical side, building tracks and finding trainers who could teach them. Together they started TechCity Skills to close that gap from inside the college, not after it.",
    note: "Deepak runs training and operations. Gunjan runs technology, hiring and the trainers.",
    focus: { s: 1.8, x: 34, y: 70 },
  },
  {
    title: "Into the timetable",
    body: "In August 2025 the first full-term programs began: St. Andrews in Gurugram, Inmantec in Ghaziabad and the School of Management Sciences in Lucknow. Practitioners taught in the college’s own lab hours, beside its faculty.",
    note: "Every track was built backwards from one test: can a graduate join a team on Monday?",
    focus: { s: 1.6, x: 42, y: 62 },
  },
  {
    title: "Campus by campus",
    body: "Then Echelon in Faridabad, KCNIT in Banda and MMU in Ambala, many of them far from the cities where training usually happens. Each college chose its own tracks, from full stack and AI/ML to data, cloud and aptitude.",
    note: "Today: 30+ partner colleges and 50+ industry partners across north India.",
    focus: { s: 1.45, x: 62, y: 80 },
  },
  {
    title: "Tools that stay",
    body: "A class is a few hours a week, so the work had to carry on between visits. Five connected products followed: learning paths, tests and contests, a campus LMS, daily practice and cohort courses, all on one account.",
    note: "Built so progress never has to wait for the next class.",
    focus: { s: 1.55, x: 58, y: 52 },
  },
  {
    title: "Still one batch at a time",
    body: "More than 10,000 students mentored by 40+ faculty and trainers, across 12,000+ sessions. The work is still local and still done in the room, one college and one batch at a time. That is the point.",
    note: "The next batch could be at your college.",
    focus: { s: 1, x: 50, y: 50 },
  },
];

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

  const f = chapters[at].focus;

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
            <p className="ss__n">{String(i + 1).padStart(2, "0")}</p>
            <h3 id={`ss-${i}`} className="ss__title">
              {c.title}
            </h3>
            <p className="ss__body">{c.body}</p>
            <p className="ss__note">{c.note}</p>
          </section>
        ))}
      </div>

      <div className="ss__stage">
        <div className="ss__frame">
          <Image
            src="/story/city-campus.webp"
            alt="The TechCity campus in the foreground, with trams, the hub and the TechCity tower behind it."
            width={2400}
            height={1200}
            sizes="(min-width: 1024px) 680px, 100vw"
            className="ss__img"
            style={{ transform: `scale(${f.s})`, transformOrigin: `${f.x}% ${f.y}%` }}
            priority
          />
          <p className="ss__chip" aria-hidden="true">
            <span>{String(at + 1).padStart(2, "0")}</span>
            {chapters[at].title}
          </p>
          <ol className="ss__dots" aria-hidden="true">
            {chapters.map((c, i) => (
              <li key={c.title} data-on={i === at || undefined} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
