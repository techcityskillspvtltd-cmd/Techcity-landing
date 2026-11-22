"use client";

import { useEffect, useState, type ReactNode } from "react";

/*
 * The featured report on /reports: one big card at a time, and a strip of
 * college marks under it to pick another. It moves on by itself every few
 * seconds until someone points at it, focuses it or picks a mark; with
 * reduced motion it never moves on its own.
 *
 * The cards and marks are rendered on the server and passed in, so this only
 * owns which one is showing.
 */

const EVERY_MS = 7000;

export function ReportsFeatured({ cards, marks, labels }: { cards: ReactNode[]; marks: ReactNode[]; labels: string[] }) {
  const [at, setAt] = useState(0);
  const [held, setHeld] = useState(false);
  const [picked, setPicked] = useState(false);

  useEffect(() => {
    if (held || picked || cards.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setAt((i) => (i + 1) % cards.length), EVERY_MS);
    return () => window.clearTimeout(id);
  }, [at, held, picked, cards.length]);

  return (
    <div
      className="rp-featured"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="rp-featured__stage">
        {cards.map((card, i) => (
          <div
            key={i}
            id={`rp-featured-${i}`}
            className="rp-featured__slide"
            data-on={i === at || undefined}
            aria-hidden={i !== at}
            inert={i !== at}
          >
            {card}
          </div>
        ))}
      </div>
      <div className="rp-featured__marks" role="group" aria-label="Featured reports">
        {marks.map((mark, i) => (
          <button
            key={i}
            type="button"
            className="rp-featured__mark"
            data-on={i === at || undefined}
            aria-pressed={i === at}
            aria-controls={`rp-featured-${i}`}
            aria-label={labels[i]}
            onClick={() => {
              setAt(i);
              setPicked(true);
            }}
          >
            {mark}
            <span className="rp-featured__timer" aria-hidden="true">
              <i key={`${at}-${held}-${picked}`} data-run={(i === at && !held && !picked) || undefined} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
