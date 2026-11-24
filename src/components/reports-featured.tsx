"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

/*
 * The featured report on /reports: one big card at a time, like a carousel,
 * going first → second → third and round again on its own, every 7 seconds.
 * A strip of college marks under it picks one; a timeline across the marks
 * shows the wait (the showing report's segment fills).
 *
 * A timer moves it on, so it keeps going whatever the browser does with
 * animations; the bar only shows the wait, restarted with the timer. It
 * pauses while off screen or while a keyboard user is in it, and doesn't move
 * on its own with reduced motion.
 *
 * The cards and marks are rendered on the server and passed in, so this only
 * owns which one is showing.
 */

const EVERY_MS = 7000;
const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function ReportsFeatured({ cards, marks, labels }: { cards: ReactNode[]; marks: ReactNode[]; labels: string[] }) {
  const n = cards.length;
  const [at, setAt] = useState(0);
  const [run, setRun] = useState(0); // restarts the wait when a mark is picked
  const [onScreen, setOnScreen] = useState(true);
  const [focused, setFocused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const still = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCE).matches,
    () => false,
  );
  const playing = !still && n > 1 && onScreen && !focused;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.15 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  // First → second → third → first…
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setAt((a) => (a + 1) % n), EVERY_MS);
    return () => window.clearTimeout(id);
  }, [at, run, playing, n]);

  return (
    <div
      ref={root}
      className="rp-featured"
      onFocusCapture={(e) => setFocused((e.target as HTMLElement).matches(":focus-visible"))}
      onBlurCapture={() => setFocused(false)}
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
              setRun((r) => r + 1);
            }}
          >
            {mark}
            <span className="rp-featured__timer" aria-hidden="true">
              {i === at && <i key={`${at}-${run}-${playing}`} data-run={playing || undefined} />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
