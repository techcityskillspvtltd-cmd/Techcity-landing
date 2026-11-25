"use client";

import type { ComponentType } from "react";
import {
  Avatar,
  Badge,
  Button,
  Check,
  Code,
  Collapse,
  Icon,
  Meter,
  Popover,
  Roll,
  Row,
  Segmented,
  Stage,
  States,
  Text,
  Window,
  type Act,
} from "@/stageshow/kit";
import { ProductLogo, type ProductId } from "@/components/product-logo";
import "@/components/product-scenes/look.css";
import "./scenes.css";
import "./stack-scenes.css";

/*
 * Student-side scenes, built with the stageshow kit: the hero's profile (one
 * student, one record, fed by all five products) and one moment from each
 * product as a student lives it. Each is one window pinned a gutter in on
 * three sides and running off the bottom of its panel, played once as it comes
 * into view, the payoff left on screen (the poster).
 */

/* ============================================================ profile */
// The hero. Gold: payout-flow (overlapping arrivals, a payoff that holds)
// with reorder's Row list. What the system does, so no cursor. Beats: each
// product's row updates in turn, in the stack's order (Setu, Marg, Kaksha,
// Riyaaz, Spardha), the row lifting as its value rolls; a beat after the last
// one, the readiness score rolls 71 → 78 and "Placement ready" arrives in the
// toolbar. Real strings: the student, the five values, the score.

type Profile = { step: number; ready: boolean };
const profileRows: { id: ProductId; title: string; from: string; to: string }[] = [
  { id: "setu", title: "Attendance", from: "84%", to: "86%" },
  { id: "marg", title: "DSA roadmap", from: "Stage 4 of 6", to: "Stage 5 of 6" },
  { id: "kaksha", title: "MERN cohort", from: "58%", to: "64%" },
  { id: "riyaaz", title: "Daily practice", from: "40-day streak", to: "41-day streak" },
  { id: "spardha", title: "Test score", from: "79%", to: "82%" },
];
const productName: Record<ProductId, string> = { setu: "Setu", marg: "Marg", kaksha: "Kaksha", riyaaz: "Riyaaz", spardha: "Spardha" };

async function profileScript(a: Act<Profile>) {
  await a.wait(900);
  for (let i = 1; i <= profileRows.length; i++) {
    a.mark(`row-${i}`);
    a.put({ step: i });
    await a.wait(620);
  }
  await a.wait(300);
  a.mark("ready");
  a.put({ ready: true });
  await a.wait(3000);
}

export function ProfileScene() {
  return (
    <Stage<Profile>
      width={600}
      height={500}
      compact={{ below: 560, width: 358, height: 340 }}
      initial={{ step: 0, ready: false }}
      poster={{ step: profileRows.length, ready: true }}
      script={profileScript}
      play="once"
      className="tc tc-sd ts-scene"
    >
      {(s, _rect, layout) => (
        <Window
          className="ts-win"
          toolbar={
            <Badge tone={s.ready ? "success" : "neutral"} dot>
              <Roll variant="fade">{s.ready ? "Placement ready" : "Updating"}</Roll>
            </Badge>
          }
        >
          <div className="ts-body">
            <div className="pf-head">
              <Row
                pad={layout === "compact" ? 10 : 12}
                lead={<Avatar name="Ananya Rao" size={layout === "compact" ? 28 : 32} tone="accent" />}
                title={<Text className="pf-name">Ananya Rao</Text>}
                subtitle={<Text>B.Tech CSE · Semester 5</Text>}
              >
                <span className="pf-score">
                  <span className="pf-score__num">
                    <Roll>{s.ready ? "78" : "71"}</Roll>
                  </span>
                  <span className="pf-score__label">Readiness</span>
                </span>
              </Row>
            </div>
            <div className="pf-list">
              {profileRows.map((r, i) => (
                <Row
                  key={r.id}
                  pad={layout === "compact" ? 10 : 12}
                  selected={s.step === i + 1 && !s.ready}
                  lead={<ProductLogo id={r.id} size={layout === "compact" ? 28 : 32} />}
                  title={<Text>{r.title}</Text>}
                  subtitle={<Text>{productName[r.id]}</Text>}
                >
                  <span className="pf-val" data-on={s.step > i || undefined}>
                    <Roll>{s.step > i ? r.to : r.from}</Roll>
                  </span>
                </Row>
              ))}
            </div>
          </div>
        </Window>
      )}
    </Stage>
  );
}

/* ================================================================ setu */
// Setu: attendance in one tap. Gold: form-error (the button confirms on
// itself) with table-edit's cause-then-effect. Beats: the pointer presses
// Mark present on the live class; the button turns to Present; a beat later
// the subject's attendance rolls 74% → 76%, its meter crosses the 75% line
// and the badge rolls Below 75% → On track. Real strings: the classes, the
// button, the figure, the badge.

type SetuS = { present: boolean; pct: number };

async function setuScript(a: Act<SetuS>) {
  await a.wait(800);
  await a.move({ at: "mark", x: 0.5, y: 0.55 });
  await a.wait(200);
  await a.click({ at: "mark", x: 0.5, y: 0.55 });
  a.mark("present");
  a.put({ present: true });
  await a.wait(900);
  a.mark("attendance");
  a.put({ pct: 76 });
  await a.wait(2800);
}

function SetuScene() {
  return (
    <Stage<SetuS>
      width={600}
      height={460}
      compact={{ below: 560, width: 358, height: 380 }}
      initial={{ present: false, pct: 74 }}
      poster={{ present: true, pct: 76 }}
      script={setuScript}
      play="once"
      cursor={{ at: { wide: { x: 560, y: 430 }, compact: { x: 330, y: 360 } } }}
      startAt={0.6}
      className="tc tc-setu ts-scene"
    >
      {(s, _r, layout) => (
        <Window title="Today · Semester 5" className="ts-win">
          <div className="ts-body">
            <div className="st-list">
              <Row
                pad={12}
                selected={!s.present}
                lead={<span className="st-time">9:00</span>}
                title={<Text>DBMS · Room 204</Text>}
                subtitle={<Text>{layout === "compact" ? "Live now" : "Dr. Iyer · live now"}</Text>}
              >
                <Button variant="primary" size="small" data-target="mark" data-cursor="pointer">
                  <States
                    value={s.present ? "done" : "mark"}
                    states={{
                      mark: "Mark present",
                      done: (
                        <span className="st-done">
                          <Icon name="check" size={12} filled />
                          Present
                        </span>
                      ),
                    }}
                  />
                </Button>
              </Row>
              <Row pad={12} lead={<span className="st-time">10:00</span>} title={<Text>Operating systems</Text>} subtitle={<Text filler>Prof. Khan · Room 301</Text>}>
                <Badge tone="neutral">Next</Badge>
              </Row>
              <Row pad={12} lead={<span className="st-time">11:15</span>} title={<Text filler>Computer networks</Text>} subtitle={<Text filler>Dr. Rao · Lab 2</Text>} />
            </div>
            <div className="st-card">
              <div className="st-card__top">
                <span>
                  <Text className="st-card__label">DBMS attendance</Text>
                  <span className="st-card__num">
                    <Roll>{`${s.pct}%`}</Roll>
                  </span>
                </span>
                <Badge tone={s.pct >= 75 ? "success" : "warning"} dot>
                  <Roll>{s.pct >= 75 ? "On track" : "Below 75%"}</Roll>
                </Badge>
              </div>
              <span className="st-meter">
                <Meter value={s.pct / 100} tone={s.pct >= 75 ? "success" : "warning"} />
                <i className="st-line" aria-hidden="true" />
              </span>
            </div>
          </div>
        </Window>
      )}
    </Stage>
  );
}

/* ================================================================ marg */
// Marg: the next step, always. Gold: reorder's acted-on item with
// table-edit's timing, laid out as the roadmap itself. Beats: mastery on
// Graphs fills 62% → 100%; its node ticks and the path runs on to the last
// stage; Dynamic programming swaps its lock for the current ring and the stage
// card below swaps to it, "Up next". No cursor: the system adapts the path.
// Real strings: the track, six short stage names, the stage card.

type MargS = { mastery: number; done: boolean };
const stages = ["Arrays", "Hashing", "Stacks", "Trees", "Graphs", "DP"];

async function margScript(a: Act<MargS>) {
  await a.wait(900);
  a.mark("mastery");
  a.put({ mastery: 100 });
  await a.wait(1100);
  a.mark("unlock");
  a.put({ done: true });
  await a.wait(3000);
}

function MargScene() {
  return (
    <Stage<MargS>
      width={600}
      height={460}
      compact={{ below: 560, width: 358, height: 380 }}
      initial={{ mastery: 62, done: false }}
      poster={{ mastery: 100, done: true }}
      script={margScript}
      play="once"
      startAt={0.6}
      className="tc tc-marg ts-scene"
    >
      {(s, _r, layout) => {
        const current = s.done ? 5 : 4;
        const small = layout === "compact";
        return (
          <Window title="Roadmaps" className="ts-win" toolbar={small ? undefined : <Segmented items={["DSA", "AI/ML", "Cloud"]} value={0} />}>
            <div className="ts-body">
              <div className="mg-road" style={{ ["--done" as string]: current / (stages.length - 1) }}>
                <span className="mg-rail" aria-hidden="true">
                  <span className="mg-rail__fill" />
                </span>
                {stages.map((name, i) => (
                  <span key={name} className="mg-node" data-state={i < current ? "done" : i === current ? "current" : "locked"}>
                    <span className="mg-dot">
                      <States
                        value={i < current ? "done" : i === current ? "current" : "locked"}
                        states={{
                          done: <Check on size={small ? 20 : 24} />,
                          current: <span className="mg-num">{i + 1}</span>,
                          locked: <Icon name="lock" size={12} filled />,
                        }}
                      />
                    </span>
                    <span className="mg-label">{name}</span>
                  </span>
                ))}
              </div>
              <div className="mg-card">
                <span className="mg-card__head">
                  <Text className="mg-card__title">Stage 5 · Graphs</Text>
                  <Badge tone={s.mastery >= 100 ? "success" : "neutral"}>
                    <Roll>{s.mastery >= 100 ? "Mastered" : "In progress"}</Roll>
                  </Badge>
                </span>
                <span className="mg-mastery">
                  <Meter value={s.mastery / 100} tone={s.mastery >= 100 ? "success" : "accent"} />
                  <span className="mg-mastery__num">
                    <Roll>{`${s.mastery}%`}</Roll>
                  </span>
                </span>
              </div>
              <Collapse open={s.done} reveal="drop">
                <div className="mg-next">
                  <Row pad={12} title={<Text>Up next · Dynamic programming</Text>} subtitle={<Text>20 problems · interview set</Text>}>
                    <Badge tone="accent">Unlocked</Badge>
                  </Row>
                </div>
              </Collapse>
            </div>
          </Window>
        );
      }}
    </Stage>
  );
}

/* ============================================================== kaksha */
// Kaksha: a check inside the video. Gold: ai-cards (a card of options opening
// in place, answered and kept) with hero-demo's one gesture. Beats: the
// lesson plays to 40% and pauses; a quick check pops over the player; the
// pointer picks POST, which turns green with a tick; the check folds away and
// the lesson plays on to its end; the chapter ticks and the next one is Up
// next. Real strings: the course, the chapter, the question, three answers.

type KakshaS = { p: number; quiz: boolean; picked: boolean; done: boolean };

async function kakshaScript(a: Act<KakshaS>) {
  await a.wait(700);
  for (const p of [0.12, 0.24, 0.34, 0.4]) {
    a.put({ p });
    await a.wait(260);
  }
  a.mark("quiz");
  a.put({ quiz: true });
  await a.wait(700);
  await a.move({ at: "post", x: 0.5, y: 0.55 });
  await a.wait(150);
  await a.click({ at: "post", x: 0.5, y: 0.55 });
  a.mark("picked");
  a.put({ picked: true });
  await a.wait(900);
  a.put({ quiz: false });
  await a.wait(350);
  for (const p of [0.55, 0.7, 0.85, 1]) {
    a.put({ p });
    await a.wait(260);
  }
  a.mark("done");
  a.put({ done: true });
  await a.wait(2800);
}

function KakshaScene() {
  return (
    <Stage<KakshaS>
      width={600}
      height={460}
      compact={{ below: 560, width: 358, height: 400 }}
      initial={{ p: 0, quiz: false, picked: false, done: false }}
      poster={{ p: 1, quiz: false, picked: true, done: true }}
      script={kakshaScript}
      play="once"
      cursor={{ at: { wide: { x: 560, y: 430 }, compact: { x: 330, y: 380 } } }}
      startAt={0.6}
      className="tc tc-kaksha ts-scene"
    >
      {(s) => (
        <Window title="MERN · Week 4" className="ts-win" toolbar={<Badge tone="neutral">Batch CSE-24</Badge>}>
          <div className="ts-body">
            <div className="kk-player">
              <span className="kk-player__meta">Chapter 07</span>
              <Text className="kk-player__title" wrap>
                Building a REST API with Express
              </Text>
              <span className="kk-play" aria-hidden="true">
                <Icon name={s.p > 0 && s.p < 1 && !s.quiz ? "pause" : "play"} size={16} filled />
              </span>
              <span className="kk-bar">
                <Meter value={s.p} />
              </span>
              <Popover show={s.quiz} origin="bottom left" className="kk-quiz">
                <Text className="kk-quiz__q">Quick check: which method creates a resource?</Text>
                <span className="kk-quiz__opts">
                  <Button size="small">GET</Button>
                  <Button
                    size="small"
                    variant={s.picked ? "primary" : "secondary"}
                    className="kk-right"
                    data-target="post"
                    data-cursor="pointer"
                    icon={s.picked ? <Icon name="check" size={12} filled /> : undefined}
                  >
                    POST
                  </Button>
                  <Button size="small">DELETE</Button>
                </span>
              </Popover>
            </div>
            <div className="kk-list">
              <Row pad={12} title={<Text>Ch 07 · REST API with Express</Text>} subtitle={<Text>12 min · lab after</Text>}>
                <Check on={s.done} size={18} />
              </Row>
              <Row pad={12} title={<Text>Ch 08 · MongoDB with Mongoose</Text>} subtitle={<Text filler>14 min · quiz</Text>}>
                <Badge tone={s.done ? "accent" : "neutral"}>
                  <Roll variant="fade">{s.done ? "Up next" : "Locked"}</Roll>
                </Badge>
              </Row>
            </div>
          </div>
        </Window>
      )}
    </Stage>
  );
}

/* ============================================================== riyaaz */
// Riyaaz: today's problem, run. Gold: hero-demo (one gesture, the result
// under it) with form-error's button that changes on itself. Beats: the
// pointer presses Run; it turns to Running while the tests turn pending; they
// pass one by one; "All tests passed" opens; a beat later today's square on
// the streak lights and the streak rolls 41 → 42 days. Real strings: the
// problem, the code, Run, the tests, the result, the streak.

type RiyaazS = { run: "idle" | "running" | "done"; passed: number; today: boolean };
const code = ["def two_sum(nums, target):", "    seen = {}", "    for i, x in enumerate(nums):", "        if target - x in seen:", "            return [seen[target - x], i]", "        seen[x] = i"];
const tests = ["[2, 7, 11, 15], 9", "[3, 2, 4], 6", "[3, 3], 6"];
const heat = [0.9, 0.5, 0.7, 1, 0.6, 0.8, 0.4, 0.9, 0.7, 1, 0.5, 0.8, 0.9];

async function riyaazScript(a: Act<RiyaazS>) {
  await a.wait(800);
  await a.move({ at: "run", x: 0.3, y: 0.55 });
  await a.wait(150);
  await a.click({ at: "run", x: 0.3, y: 0.55 });
  a.mark("run");
  a.put({ run: "running" });
  await a.wait(500);
  for (let i = 1; i <= tests.length; i++) {
    a.put({ passed: i });
    await a.wait(360);
  }
  a.mark("done");
  a.put({ run: "done" });
  await a.wait(800);
  a.mark("streak");
  a.put({ today: true });
  await a.wait(2800);
}

function RiyaazScene() {
  return (
    <Stage<RiyaazS>
      width={600}
      height={460}
      compact={{ below: 560, width: 358, height: 420 }}
      initial={{ run: "idle", passed: 0, today: false }}
      poster={{ run: "done", passed: 3, today: true }}
      script={riyaazScript}
      play="once"
      cursor={{ at: { wide: { x: 560, y: 430 }, compact: { x: 330, y: 400 } } }}
      startAt={0.6}
      className="tc tc-riyaaz ts-scene"
    >
      {(s, _r, layout) => (
        <Window
          title="Two Sum · Today 2 of 3"
          className="ts-win"
          toolbar={
            <Button
              variant="primary"
              size="small"
              data-target="run"
              data-cursor="pointer"
              icon={<Icon name="play" size={12} filled />}
            >
              {s.run === "running" ? "Running" : "Run"}
            </Button>
          }
        >
          <div className="ts-body ry2-body">
            <Code lines={layout === "compact" ? code.slice(0, 5) : code} numbers={false} className="ry2-code" />
            <div className="ry2-tests">
              {tests.map((t, i) => (
                <span key={t} className="ry2-test">
                  <Check on={s.passed > i} pending={s.run !== "idle" && s.passed <= i} size={16} />
                  <span className="ry2-test__name">Test {i + 1}</span>
                  <code>{t}</code>
                </span>
              ))}
              <Collapse open={s.run === "done"} reveal="drop">
                <span className="ry2-result">All tests passed · 41 ms</span>
              </Collapse>
            </div>
            <div className="ry2-streak">
              <span className="ry2-streak__num">
                <Icon name="bolt" size={14} filled />
                <Roll>{s.today ? "42" : "41"}</Roll>
                <span className="ry2-streak__unit">day streak</span>
              </span>
              <span className="ry2-heat" aria-hidden="true">
                {heat.slice(layout === "compact" ? 5 : 0).map((v, i) => (
                  <i key={i} style={{ opacity: 0.25 + v * 0.75 }} />
                ))}
                <i className="ry2-today" data-on={s.today || undefined} />
              </span>
            </div>
          </div>
        </Window>
      )}
    </Stage>
  );
}

/* ============================================================= spardha */
// Spardha: a score recruiters can check. Gold: payout-flow (slow overlapping
// arrivals, a payoff that holds). What the system does, so no cursor. Beats:
// the submitted test is graded, the score rolls 0 → 82%; the integrity check
// lands, Clean; a beat later the certificate drops in under them with its
// verify link and the share button. Real strings: the test, the score, two
// facts, integrity, the certificate.

type SpardhaS = { graded: boolean; clean: boolean; cert: boolean };

async function spardhaScript(a: Act<SpardhaS>) {
  await a.wait(900);
  a.mark("graded");
  a.put({ graded: true });
  await a.wait(1100);
  a.mark("clean");
  a.put({ clean: true });
  await a.wait(800);
  a.mark("certificate");
  a.put({ cert: true });
  await a.wait(3000);
}

function SpardhaScene() {
  return (
    <Stage<SpardhaS>
      width={600}
      height={460}
      compact={{ below: 560, width: 358, height: 420 }}
      initial={{ graded: false, clean: false, cert: false }}
      poster={{ graded: true, clean: true, cert: true }}
      script={spardhaScript}
      play="once"
      startAt={0.6}
      className="tc tc-spardha ts-scene"
    >
      {(s) => (
        <Window title="DS 3 · Proctored test" className="ts-win" toolbar={<Badge tone={s.graded ? "success" : "neutral"}><Roll variant="fade">{s.graded ? "Graded" : "Submitted"}</Roll></Badge>}>
          <div className="ts-body">
            <div className="sp-score">
              <span className="sp-score__num">
                <Roll>{s.graded ? "82%" : "—"}</Roll>
              </span>
              <span className="sp-score__label">Your score</span>
            </div>
            <div className="sp-facts">
              <Row pad={12} title={<Text>Correct answers</Text>}>
                <span className="sp-fact">{s.graded ? "41 of 50" : "—"}</span>
              </Row>
              <Row pad={12} title={<Text>Integrity</Text>}>
                <Badge tone={s.clean ? "success" : "neutral"} dot>
                  <Roll variant="fade">{s.clean ? "99 · Clean" : "Checking"}</Roll>
                </Badge>
              </Row>
            </div>
            <Collapse open={s.cert} reveal="drop">
              <div className="sp-cert">
                <span className="sp-cert__seal" aria-hidden="true">
                  <Icon name="check" size={16} filled />
                </span>
                <span className="sp-cert__copy">
                  <Text className="sp-cert__title">Certificate issued</Text>
                  <Text className="sp-cert__link">Verify at techcity.id/c/8KQ2</Text>
                </span>
                <Button size="small" variant="primary">
                  Share
                </Button>
              </div>
            </Collapse>
          </div>
        </Window>
      )}
    </Stage>
  );
}

/** One scene per product, for the stack explorer on the student home page. */
export const productScenes: Record<ProductId, ComponentType> = {
  setu: SetuScene,
  marg: MargScene,
  kaksha: KakshaScene,
  riyaaz: RiyaazScene,
  spardha: SpardhaScene,
};

/* ============================================================ roadmap */
// The roadmap page's hero: a feature ships. Gold: table-edit (the edit, then
// what it feeds a beat later) in reorder's Row list. What the system does, so
// no cursor. Beats: the adaptive path's progress fills 70% → 100%; its badge
// rolls Building → Shipped; with it the quarter's count rolls 2 → 3 of 5
// shipped. Real strings: four features, their products, the badges, the count.

type RoadS = { p: number; shipped: boolean };
const roadRows: { id: ProductId; title: string; tone: "success" | "accent" | "neutral"; label: string }[] = [
  { id: "setu", title: "Placement drives", tone: "success", label: "Shipped" },
  { id: "marg", title: "Adaptive path", tone: "accent", label: "Building" },
  { id: "kaksha", title: "Notes in Hindi", tone: "accent", label: "Building" },
  { id: "spardha", title: "Integrity score", tone: "accent", label: "Building" },
];

async function roadScript(a: Act<RoadS>) {
  await a.wait(900);
  for (const p of [0.8, 0.9, 1]) {
    a.put({ p });
    await a.wait(380);
  }
  a.mark("shipped");
  a.put({ shipped: true });
  await a.wait(3000);
}

export function RoadmapScene() {
  return (
    <Stage<RoadS>
      width={600}
      height={480}
      compact={{ below: 560, width: 358, height: 340 }}
      initial={{ p: 0.7, shipped: false }}
      poster={{ p: 1, shipped: true }}
      script={roadScript}
      play="once"
      className="tc tc-sd ts-scene"
    >
      {(s, _r, layout) => (
        <Window
          className="ts-win"
          toolbar={
            <Badge tone="neutral">
              Q4 2026 · <Roll variant="fade">{s.shipped ? "3" : "2"}</Roll> of 5 shipped
            </Badge>
          }
        >
          <div className="ts-body">
            <div className="rm-list">
              {roadRows.map((r) => {
                const live = r.id === "marg";
                const tone = live && s.shipped ? "success" : r.tone;
                const label = live && s.shipped ? "Shipped" : r.label;
                return (
                  <Row
                    key={r.id}
                    pad={layout === "compact" ? 10 : 12}
                    selected={live && !s.shipped}
                    lead={<ProductLogo id={r.id} size={layout === "compact" ? 28 : 32} />}
                    title={<Text>{r.title}</Text>}
                    subtitle={
                      live ? (
                        <span className="rm-meter">
                          <Meter value={s.p} tone={s.shipped ? "success" : "accent"} />
                        </span>
                      ) : (
                        <Text>{productName[r.id]}</Text>
                      )
                    }
                  >
                    <Badge tone={tone} dot>
                      {live ? <Roll variant="fade">{label}</Roll> : label}
                    </Badge>
                  </Row>
                );
              })}
            </div>
          </div>
        </Window>
      )}
    </Stage>
  );
}

/* ============================================================= review */
// The project showcase: a project reviewed like work. Gold: google-docs (a
// comment and its reply on the line it is about) with payout-flow's slow
// arrivals. What happens, so no cursor. Beats: the trainer's comment lands on
// the highlighted line; a beat later the student's reply drops in under it;
// the thread turns Resolved; the review in the toolbar rolls Changes
// requested → Approved. Real strings: the file, five lines of code, the
// comment, the reply, the badges.

type ReviewS = { comment: boolean; reply: boolean; approved: boolean };
const reviewCode = [
  "export async function refund(id: string) {",
  "  const payment = await db.payments.get(id);",
  { text: "  await db.payments.lock(payment.id);", kind: "add" as const },
  "  if (payment.status !== 'captured') return;",
  "  await gateway.refund(payment);",
  "}",
];

async function reviewScript(a: Act<ReviewS>) {
  await a.wait(900);
  a.mark("comment");
  a.put({ comment: true });
  await a.wait(1500);
  a.mark("reply");
  a.put({ reply: true });
  await a.wait(1300);
  a.mark("approved");
  a.put({ approved: true });
  await a.wait(3200);
}

export function ReviewScene() {
  return (
    <Stage<ReviewS>
      width={600}
      height={440}
      compact={{ below: 560, width: 358, height: 460 }}
      initial={{ comment: false, reply: false, approved: false }}
      poster={{ comment: true, reply: true, approved: true }}
      script={reviewScript}
      play="once"
      startAt={0.6}
      className="tc tc-sd ts-scene"
    >
      {(s, _r, layout) => (
        <Window
          className="ts-win"
          toolbar={
            <Badge tone={s.approved ? "success" : "warning"} dot>
              <Roll variant="fade">{s.approved ? "Approved" : "Changes requested"}</Roll>
            </Badge>
          }
        >
          <div className="ts-body rv-body">
            <Text className="rv-file">{layout === "compact" ? "refunds.ts" : "payments-dashboard / refunds.ts"}</Text>
            <Code lines={reviewCode} numbers={false} className="rv-code" />
            <Collapse open={s.comment} reveal="drop">
              <div className="rv-thread">
                <div className="rv-msg">
                  <Avatar name="Sneha Kapoor" size={28} />
                  <span className="rv-msg__copy">
                    <span className="rv-msg__head">
                      <Text className="rv-msg__name">Sneha Kapoor</Text>
                      <Text className="rv-msg__role">Trainer</Text>
                    </span>
                    <Text className="rv-msg__text" wrap>
                      Two refunds can land at once. Lock the payment before you check it.
                    </Text>
                  </span>
                </div>
                <Collapse open={s.reply} reveal="drop">
                  <div className="rv-msg rv-msg--reply">
                    <Avatar name="Aarav Sharma" size={28} tone="accent" />
                    <span className="rv-msg__copy">
                      <span className="rv-msg__head">
                        <Text className="rv-msg__name">Aarav Sharma</Text>
                        <Text className="rv-msg__role">Student</Text>
                      </span>
                      <Text className="rv-msg__text" wrap>
                        Done in the line above, and a test for two refunds at once.
                      </Text>
                    </span>
                  </div>
                </Collapse>
                <div className="rv-foot">
                  <Badge tone={s.approved ? "success" : "neutral"}>
                    <Roll variant="fade">{s.approved ? "Resolved" : "Open"}</Roll>
                  </Badge>
                </div>
              </div>
            </Collapse>
          </div>
        </Window>
      )}
    </Stage>
  );
}
