"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/*
 * The featured report on /reports: one big card at a time, and a strip of
 * college marks under it with a timeline across the top. The showing report's
 * segment fills (a CSS animation); when it's full the next report comes in,
 * round and round. Picking a mark shows that report and the timeline carries
 * on from there. It pauses while off screen or while a keyboard user is in it;
 * with reduced motion it doesn't move on its own.
 *
 * The cards and marks are rendered on the server and passed in, so this only
 * owns which one is showing.
 */

export function ReportsFeatured({ cards, marks, labels }: { cards: ReactNode[]; marks: ReactNode[]; labels: string[] }) {
  const [at, setAt] = useState(0);
  const [run, setRun] = useState(0); // restarts the timeline when a mark is picked
  const still = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCE).matches,
    () => false,
  );
  const [onScreen, setOnScreen] = useState(true);
  const [focused, setFocused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const n = cards.length;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.25 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={root}
      className="rp-featured"
      data-paused={!onScreen || focused || undefined}
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
              {i === at && (
                <i
                  key={`${at}-${run}`}
                  data-run={(!still && n > 1) || undefined}
                  onAnimationEnd={() => setAt((a) => (a + 1) % n)}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
