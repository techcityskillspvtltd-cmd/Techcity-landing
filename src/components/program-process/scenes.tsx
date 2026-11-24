"use client";

import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { Avatar, Badge, Check, Collapse, Count, Meter, Roll, Row, Stage, Text, Window, type Act } from "@/stageshow/kit";
import type { Scene } from "@/lib/program-pages";
import "./process.css";

/*
 * The scenes for "How it runs" on the program pages, built with the stageshow
 * kit like the hero scenes: one pinned window that runs off the bottom of its
 * panel, no cursor (each is what the step produces, not a gesture), a few
 * beats played once when the step comes up, and the result left on screen.
 * The poster (reduced motion, thumbnails) is that result.
 *
 * Nine kinds of screen, each written once; the programs fill them with their
 * own words (lib/program-pages, `Scene`). Real strings only on what the step
 * is about.
 */

const W = 580;
const H = 370;
const COMPACT = { below: 540, width: 358, height: 300 };

/** `settled` shows the step's finished screen at once, with no beats (a scene fading out). */
type Common = { step: number; total: number; settled?: boolean };

/** The shared frame: the stage, its pinned window and the step badge. */
function Frame<S extends object>({
  scene,
  step,
  total,
  settled,
  initial,
  poster,
  script,
  children,
}: Common & {
  scene: Scene;
  initial: S;
  poster: S;
  script: (a: Act<S>) => Promise<void>;
  children: (s: S) => ReactNode;
}) {
  return (
    <Stage<S>
      width={W}
      height={H}
      compact={COMPACT}
      initial={settled ? poster : initial}
      poster={poster}
      script={settled ? async () => {} : script}
      play="once"
      className="tc tc-proc"
    >
      {(s) => (
        <Window
          title={scene.title}
          className="pc-win"
          toolbar={
            <Badge tone="neutral">
              Step {step + 1} of {total}
            </Badge>
          }
        >
          <div className="pc-body">{children(s)}</div>
        </Window>
      )}
    </Stage>
  );
}

/** Reveal `count` things one after another, then hold. */
async function steps<S extends { n: number }>(a: Act<S>, count: number, gap: number, first = 500) {
  await a.wait(first);
  for (let i = 1; i <= count; i++) {
    a.put({ n: i } as Partial<S>);
    await a.wait(gap);
  }
}

const pct = (n: number) => `${Math.round(n)}%`;
/** Where a count starts: the smallest number with as many digits as the result (10 for 94, 100 for 412). */
const from = (v: number) => (v < 10 ? 0 : 10 ** (String(Math.round(v)).length - 1));

/* --------------------------------------------------------------- select */

type Sel = { n: number; done: boolean };
function SelectScene({ scene, ...c }: Common & { scene: Extract<Scene, { kind: "select" }> }) {
  const pickedAt = (i: number) => scene.picked.indexOf(i);
  return (
    <Frame<Sel>
      scene={scene}
      {...c}
      initial={{ n: 0, done: false }}
      poster={{ n: scene.picked.length, done: true }}
      script={async (a) => {
        await steps(a, scene.picked.length, 420);
        await a.wait(200);
        a.put({ done: true });
        await a.wait(2400);
      }}
    >
      {(s) => (
        <>
          <p className="pc-prompt">{scene.prompt}</p>
          <div className="pc-chips">
            {scene.chips.map((chip, i) => {
              const k = pickedAt(i);
              const on = k >= 0 && k < s.n;
              return (
                <span key={chip} className="pc-chip" data-on={on || undefined}>
                  <Check on={on} size={14} />
                  {chip}
                </span>
              );
            })}
          </div>
          <div className="pc-foot">
            <Collapse open={s.done} reveal="drop">
              <div className="pc-foot__row">
                <Badge tone="success" dot>
                  {scene.done}
                </Badge>
              </div>
            </Collapse>
          </div>
        </>
      )}
    </Frame>
  );
}

/* --------------------------------------------------------------- assign */

type N = { n: number };
function AssignScene({ scene, ...c }: Common & { scene: Extract<Scene, { kind: "assign" }> }) {
  return (
    <Frame<N>
      scene={scene}
      {...c}
      initial={{ n: 0 }}
      poster={{ n: scene.rows.length }}
      script={async (a) => {
        await steps(a, scene.rows.length, 700, 700);
        await a.wait(2200);
      }}
    >
      {(s) => (
        <div className="pc-rows">
          {scene.rows.map((r, i) => (
            <Row
              key={r.name}
              pad={12}
              selected={s.n === i + 1}
              lead={<Avatar name={r.name} size={34} />}
              title={<Text>{r.name}</Text>}
              subtitle={<Text>{r.role}</Text>}
            >
              <Badge tone={i < s.n ? "success" : "neutral"} dot>
                <Roll variant="fade">{i < s.n ? r.tag : "Pending"}</Roll>
              </Badge>
            </Row>
          ))}
        </div>
      )}
    </Frame>
  );
}

/* ----------------------------------------------------------------- week */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SLOTS = ["9 am", "11 am", "2 pm"];
function WeekScene({ scene, ...c }: Common & { scene: Extract<Scene, { kind: "week" }> }) {
  return (
    <Frame<N>
      scene={scene}
      {...c}
      initial={{ n: 0 }}
      poster={{ n: scene.sessions.length }}
      script={async (a) => {
        await steps(a, scene.sessions.length, 420, 600);
        await a.wait(2400);
      }}
    >
      {(s) => (
        <>
          <div className="pc-week">
            <span />
            {DAYS.map((d) => (
              <span key={d} className="pc-week__day">
                {d}
              </span>
            ))}
            {SLOTS.map((slot, r) => (
              <WeekRow key={slot} slot={slot} r={r} sessions={scene.sessions} n={s.n} />
            ))}
          </div>
          <p className="pc-meta">
            <Roll>{String(s.n)}</Roll> {s.n === 1 ? "session" : "sessions"} this week
          </p>
        </>
      )}
    </Frame>
  );
}
function WeekRow({ slot, r, sessions, n }: { slot: string; r: number; sessions: { day: number; slot: number; label: string }[]; n: number }) {
  return (
    <>
      <span className="pc-week__slot">{slot}</span>
      {DAYS.map((_, d) => {
        const k = sessions.findIndex((x) => x.day === d && x.slot === r);
        const on = k >= 0 && k < n;
        return (
          <span key={d} className="pc-week__cell">
            {k >= 0 && (
              <span className="pc-session" data-on={on || undefined}>
                {sessions[k].label}
              </span>
            )}
          </span>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------- progress */

function ProgressScene({ scene, ...c }: Common & { scene: Extract<Scene, { kind: "progress" }> }) {
  return (
    <Frame<N>
      scene={scene}
      {...c}
      initial={{ n: 0 }}
      poster={{ n: scene.rows.length }}
      script={async (a) => {
        await steps(a, scene.rows.length, 650, 600);
        await a.wait(2400);
      }}
    >
      {(s) => (
        <div className="pc-bars">
          {scene.rows.map((r, i) => (
            <div key={r.label} className="pc-bar" data-on={i < s.n || undefined}>
              <div className="pc-bar__head">
                <span>
                  <Text className="pc-title">{r.label}</Text>
                  <Text className="pc-sub">{r.note}</Text>
                </span>
                <Count className="pc-bar__num" value={i < s.n ? r.value : from(r.value)} format={pct} style={{ minWidth: "4ch" }} />
              </div>
              <Meter value={i < s.n ? r.value / 100 : 0} tone={r.value >= 100 && i < s.n ? "success" : "accent"} className="pc-meter" />
            </div>
          ))}
        </div>
      )}
    </Frame>
  );
}

/* ---------------------------------------------------------------- score */

type Sc = { score: number; n: number; verdict: boolean };
function ScoreScene({ scene, ...c }: Common & { scene: Extract<Scene, { kind: "score" }> }) {
  return (
    <Frame<Sc>
      scene={scene}
      {...c}
      initial={{ score: from(scene.score), n: 0, verdict: false }}
      poster={{ score: scene.score, n: scene.criteria.length, verdict: true }}
      script={async (a) => {
        await steps(a, scene.criteria.length, 450, 600);
        a.put({ score: scene.score });
        await a.wait(900);
        a.put({ verdict: true });
        await a.wait(2400);
      }}
    >
      {(s) => (
        <div className="pc-score">
          <div className="pc-score__total" data-on={s.score === scene.score || undefined}>
            <Count className="pc-score__num" value={s.score} style={{ minWidth: "2ch" }} />
            <span className="pc-score__of">/ 100</span>
          </div>
          <div className="pc-bars pc-bars--tight">
            {scene.criteria.map((cr, i) => (
              <div key={cr.label} className="pc-bar" data-on={i < s.n || undefined}>
                <div className="pc-bar__head">
                  <Text className="pc-title">{cr.label}</Text>
                  <Count className="pc-bar__num" value={i < s.n ? cr.value : from(cr.value)} style={{ minWidth: "3ch" }} />
                </div>
                <Meter value={i < s.n ? cr.value / 100 : 0} className="pc-meter" />
              </div>
            ))}
          </div>
          <div className="pc-foot">
            <Collapse open={s.verdict} reveal="drop">
              <div className="pc-foot__row">
                <Badge tone="accent" dot>
                  {scene.verdict}
                </Badge>
              </div>
            </Collapse>
          </div>
        </div>
      )}
    </Frame>
  );
}

/* --------------------------------------------------------------- report */

type Rp = { n: number; lines: number };
function ReportScene({ scene, ...c }: Common & { scene: Extract<Scene, { kind: "report" }> }) {
  return (
    <Frame<Rp>
      scene={scene}
      {...c}
      initial={{ n: 0, lines: 0 }}
      poster={{ n: scene.metrics.length, lines: scene.lines.length }}
      script={async (a) => {
        await steps(a, scene.metrics.length, 380, 600);
        await a.wait(500);
        for (let i = 1; i <= scene.lines.length; i++) {
          a.put({ lines: i });
          await a.wait(500);
        }
        await a.wait(2200);
      }}
    >
      {(s) => (
        <>
          <div className="pc-metrics">
            {scene.metrics.map((m, i) => (
              <div key={m.label} className="pc-metric" data-on={i < s.n || undefined}>
                <span className="pc-metric__num">
                  <Count
                    value={i < s.n ? m.value : from(m.value)}
                    format={(v) => `${Math.round(v).toLocaleString("en-US")}${m.suffix ?? ""}`}
                  />
                </span>
                <span className="pc-metric__label">{m.label}</span>
              </div>
            ))}
          </div>
          <div className="pc-lines">
            {scene.lines.map((l, i) => (
              <p key={l} className="pc-line" data-on={i < s.lines || undefined}>
                <Check on={i < s.lines} size={16} />
                {l}
              </p>
            ))}
          </div>
        </>
      )}
    </Frame>
  );
}

/* ------------------------------------------------------------- pipeline */

function PipelineScene({ scene, ...c }: Common & { scene: Extract<Scene, { kind: "pipeline" }> }) {
  const top = Math.max(...scene.stages.map((x) => x.value));
  return (
    <Frame<N>
      scene={scene}
      {...c}
      initial={{ n: 0 }}
      poster={{ n: scene.stages.length }}
      script={async (a) => {
        await steps(a, scene.stages.length, 600, 600);
        await a.wait(2400);
      }}
    >
      {(s) => (
        <div className="pc-funnel">
          {scene.stages.map((st, i) => (
            <div key={st.label} className="pc-funnel__row" data-on={i < s.n || undefined} data-last={i === scene.stages.length - 1 || undefined}>
              <span className="pc-funnel__label">{st.label}</span>
              <span className="pc-funnel__track">
                <span className="pc-funnel__fill" style={{ width: `${i < s.n ? (st.value / top) * 100 : 0}%` }} />
              </span>
              <Count className="pc-funnel__num" value={i < s.n ? st.value : from(st.value)} style={{ minWidth: "3ch" }} />
            </div>
          ))}
        </div>
      )}
    </Frame>
  );
}

/* ----------------------------------------------------------------- chat */

type Ch = { n: number; result: boolean };
function ChatScene({ scene, ...c }: Common & { scene: Extract<Scene, { kind: "chat" }> }) {
  return (
    <Frame<Ch>
      scene={scene}
      {...c}
      initial={{ n: 0, result: false }}
      poster={{ n: scene.lines.length, result: true }}
      script={async (a) => {
        await steps(a, scene.lines.length, 900, 600);
        a.put({ result: true });
        await a.wait(2400);
      }}
    >
      {(s) => (
        <>
          <div className="pc-status">
            <Badge tone="danger" dot>
              {scene.status}
            </Badge>
          </div>
          <div className="pc-thread">
            {scene.lines.map((l, i) => (
              <Collapse key={i} open={i < s.n} reveal="drop" from="below">
                <div className="pc-msg" data-me={l.me || undefined}>
                  <span className="pc-msg__who">{l.who}</span>
                  <span className="pc-msg__text">{l.text}</span>
                </div>
              </Collapse>
            ))}
          </div>
          <div className="pc-foot">
            <Collapse open={s.result} reveal="drop">
              <div className="pc-foot__row">
                <Badge tone="success" dot>
                  {scene.result}
                </Badge>
              </div>
            </Collapse>
          </div>
        </>
      )}
    </Frame>
  );
}

/* -------------------------------------------------------------- library */

const TYPE_ICON: Record<string, IconName> = { Video: "video", Notes: "content", Test: "check", Lab: "code" };
function LibraryScene({ scene, ...c }: Common & { scene: Extract<Scene, { kind: "library" }> }) {
  return (
    <Frame<N>
      scene={scene}
      {...c}
      initial={{ n: 0 }}
      poster={{ n: scene.items.length }}
      script={async (a) => {
        await steps(a, scene.items.length, 650, 700);
        await a.wait(2400);
      }}
    >
      {(s) => (
        <div className="pc-rows">
          {scene.items.map((it, i) => (
            <Row
              key={it.label}
              pad={12}
              selected={s.n === i + 1}
              lead={
                <span className="pc-type" aria-hidden="true">
                  <Icon name={TYPE_ICON[it.type]} size={16} />
                </span>
              }
              title={<Text>{it.label}</Text>}
              subtitle={<Text>{`${it.type} · ${it.meta}`}</Text>}
            >
              <Badge tone={i < s.n ? "success" : "neutral"} dot>
                <Roll variant="fade">{i < s.n ? scene.tag : "Draft"}</Roll>
              </Badge>
            </Row>
          ))}
        </div>
      )}
    </Frame>
  );
}

/* ---------------------------------------------------------------- pick */

/** The scene for one process step. */
export function ProcessScene({ scene, step, total, settled }: Common & { scene: Scene }) {
  const c = { step, total, settled };
  switch (scene.kind) {
    case "select":
      return <SelectScene scene={scene} {...c} />;
    case "assign":
      return <AssignScene scene={scene} {...c} />;
    case "week":
      return <WeekScene scene={scene} {...c} />;
    case "progress":
      return <ProgressScene scene={scene} {...c} />;
    case "score":
      return <ScoreScene scene={scene} {...c} />;
    case "report":
      return <ReportScene scene={scene} {...c} />;
    case "pipeline":
      return <PipelineScene scene={scene} {...c} />;
    case "chat":
      return <ChatScene scene={scene} {...c} />;
    case "library":
      return <LibraryScene scene={scene} {...c} />;
  }
}
