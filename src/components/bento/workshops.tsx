"use client";

import { Avatar, Check, Stage, depth, on } from "./stage";

/**
 * Workshops: a question in a live lab. Messages arrive in turn (each one
 * starts as a typing indicator), the workshop lead's tag floats above, and
 * the next workshop is on a small calendar card in front.
 */

type Msg = {
  from: "student" | "mentor";
  text: string;
  typing: number;
  at: number;
};
const msgs: Msg[] = [
  {
    from: "student",
    text: "Our bot answers from outside the syllabus. Why?",
    typing: 0.3,
    at: 1,
  },
  {
    from: "mentor",
    text: "Add retrieval: index the unit notes and answer only from them.",
    typing: 1.8,
    at: 3,
  },
  { from: "student", text: "Done. It cites the unit now!", typing: 4, at: 4.8 },
];
const OUT = 10.2;

export function WorkshopsItem() {
  return (
    <Stage length={11} still={9.5} rx={12} ry={14} rz={-1.5}>
      {(t) => {
        return (
          <>
            <div className="bx-layer bx-panel bx-chat" style={depth(0)}>
              <div className="bx-bar">
                <span className="flex">
                  <Avatar initials="AS" tone="navy" size={20} />
                  <span className="-ml-1.5">
                    <Avatar initials="PR" size={20} />
                  </span>
                </span>
                <span>Workshop · Generative AI</span>
                <span className="bx-chip bx-chip--live ml-auto">
                  <i className="bx-dot bx-dot--pulse" />
                  Live
                </span>
              </div>
              <div className="bx-chat__body">
                {msgs.map((m) => (
                  <p key={m.at} className="bx-msg bx-in" data-from={m.from} data-on={on(t, m.typing, OUT)}>
                    {t < m.at ? (
                      <span className="bx-typing" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                    ) : (
                      m.text
                    )}
                  </p>
                ))}
              </div>
            </div>

            <div className="bx-layer bx-chat__tag bx-pop" data-on={on(t, 0.2, OUT)} style={depth(44)}>
              <i className="bx-dot" style={{ background: "var(--g-navy)" }} />
              Workshop lead · ML engineer
            </div>

            <div className="bx-layer bx-panel bx-cal bx-in" data-on={on(t, 6, OUT)} style={depth(66)}>
              <span className="bx-cal__date">
                <span>Thu</span>
                <strong>14</strong>
              </span>
              <span className="min-w-0">
                <span className="bx-title">Next workshop</span>
                <span className="bx-meta">Cloud & DevOps · 2 days</span>
              </span>
              <Check size={18} />
            </div>
          </>
        );
      }}
    </Stage>
  );
}
