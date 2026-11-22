"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/icons";
import type { Step } from "@/components/page-blocks";

/** How long each step holds before the next one, in ms. */
const HOLD = 4800;

/**
 * "How it runs", after the stepped explainers on Stripe's product pages: the
 * steps on the left (click any one), and on the right a term plan that moves
 * through them. Done steps tick off, the current one opens with its detail
 * and a bar that fills while it holds, the rest wait. It advances on its own
 * only while on screen, restarts its timer after a click, and stays still for
 * reduced motion.
 */
export function ProgramRun({ label, steps }: { label: string; steps: Step[] }) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), HOLD);
    return () => window.clearTimeout(id);
  }, [active, inView, steps.length, tick]);

  const pick = (i: number) => {
    setActive(i);
    setTick((t) => t + 1);
  };

  return (
    <div ref={ref} className="pr" style={{ "--hold": `${HOLD}ms` } as CSSProperties} data-running={inView || undefined}>
      <ol className="pr-steps">
        {steps.map((s, i) => (
          <li key={s.title}>
            <button type="button" className="pr-step" aria-pressed={active === i} onClick={() => pick(i)}>
              <span className="pr-step__num">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="pr-step__title">{s.title}</span>
                <span className="pr-step__body">{s.body}</span>
              </span>
              {active === i && <span key={`${active}-${tick}`} className="pr-step__bar" aria-hidden="true" />}
            </button>
          </li>
        ))}
      </ol>

      <div className="pr-plan" aria-hidden="true">
        <div className="pr-plan__head">
          <span className="pr-plan__title">Term plan</span>
          <span className="pr-plan__label">{label}</span>
          <span className="pr-plan__count">
            Step {active + 1} of {steps.length}
          </span>
        </div>
        <div className="pr-plan__track">
          <span style={{ width: `${((active + 1) / steps.length) * 100}%` }} />
        </div>
        <ul className="pr-plan__rows">
          {steps.map((s, i) => {
            const state = i < active ? "done" : i === active ? "now" : "next";
            return (
              <li key={s.title} className="pr-row" data-state={state}>
                <span className="pr-row__mark">
                  {state === "done" ? <Icon name="check" size={16} /> : <Icon name={s.icon} size={16} />}
                </span>
                <span className="pr-row__main">
                  <span className="pr-row__title">{s.title}</span>
                  <span className="pr-row__more">
                    <span className="pr-row__inner">
                      <span className="pr-row__body">{s.body}</span>
                      <span className="pr-row__fill">
                        {state === "now" && <span key={`${active}-${tick}`} />}
                      </span>
                    </span>
                  </span>
                </span>
                <span className="pr-row__state">{state === "done" ? "Done" : state === "now" ? "In progress" : "Next"}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
