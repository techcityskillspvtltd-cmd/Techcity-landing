"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import type { ProcessStep } from "@/lib/program-pages";
import { ProcessScene } from "./scenes";

/*
 * "How it runs" on a program page: the steps on the left, and on the right a
 * small screen of what each step produces (./scenes), played as the step
 * comes up. It moves through the steps on its own while on screen, every
 * HOLD ms; a bar under the current step shows the wait. Clicking a step shows
 * it and restarts the wait. With reduced motion it stays where it is and each
 * scene shows its finished state.
 */

const HOLD = 6500;
const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function ProgramProcess({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const still = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCE).matches,
    () => false,
  );
  const playing = inView && !still;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), HOLD);
    return () => window.clearTimeout(id);
  }, [active, run, playing, steps.length]);

  const pick = (i: number) => {
    setActive(i);
    setRun((r) => r + 1);
  };

  // The scene that was showing stays a moment, fading out under the new one.
  const shown = `${active}-${run}`;
  const [leaving, setLeaving] = useState<{ key: string; step: number } | null>(null);
  const last = useRef({ key: shown, step: active });
  useEffect(() => {
    if (last.current.key === shown) return;
    const prev = last.current;
    last.current = { key: shown, step: active };
    setLeaving(prev);
    const id = window.setTimeout(() => setLeaving(null), 450);
    return () => window.clearTimeout(id);
  }, [shown, active]);

  return (
    <div ref={ref} className="pr" style={{ "--hold": `${HOLD}ms` } as CSSProperties} data-running={playing || undefined}>
      <ol className="pr-steps">
        {steps.map((s, i) => (
          <li key={s.title}>
            <button type="button" className="pr-step" aria-pressed={active === i} onClick={() => pick(i)}>
              <span className="pr-step__num">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="pr-step__title">{s.title}</span>
                <span className="pr-step__body">{s.body}</span>
              </span>
              {active === i && <span key={`${active}-${run}-${playing}`} className="pr-step__bar" aria-hidden="true" />}
            </button>
          </li>
        ))}
      </ol>

      <div className="pc-panel" aria-hidden="true">
        {/* A new scene for each step, so it plays from the start as the step comes up. */}
        <div key={shown} className="pc-scene">
          <ProcessScene scene={steps[active].scene} step={active} total={steps.length} />
        </div>
        {leaving && (
          <div key={leaving.key} className="pc-scene pc-scene--leaving">
            <ProcessScene scene={steps[leaving.step].scene} step={leaving.step} total={steps.length} settled />
          </div>
        )}
      </div>
    </div>
  );
}
