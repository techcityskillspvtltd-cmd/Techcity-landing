"use client";

import type { ComponentType } from "react";
import { Avatar, Badge, Button, Check, Collapse, Facepile, Icon, Roll, Row, Stage, States, Text, Window, type Act } from "@/stageshow/kit";
import "@/components/product-scenes/look.css";
import "./scenes.css";
import "./stack-scenes.css";
import "./project-scenes.css";

/*
 * Scenes for the student projects pages, built with the stageshow kit in the
 * student look (navy accent): the projects page's hero, and one moment from
 * each featured project working. Same frame as the home page's scenes: one
 * window pinned a gutter in on three sides, running off the bottom, played
 * once as it comes into view, the payoff left on screen.
 */

/* ======================================================= projects hero */
// A project joins the list. Gold: reorder (rows making room) with
// table-edit's cause-then-effect. No cursor. Beats: a new project drops in at
// the top, In review; a beat later it rolls to Shipped and the count in the
// toolbar rolls 24 → 25. Real strings: four projects, their students, badges.

type ListS = { added: boolean; shipped: boolean };
const listRows = [
  { name: "Siddharth Jain", title: "A bot for first code reviews" },
  { name: "Aarav Sharma", title: "A payments dashboard" },
  { name: "Harshit Agarwal", title: "A chatbot over the syllabus" },
  { name: "Priya Nair", title: "A deploy pipeline" },
];

async function listScript(a: Act<ListS>) {
  await a.wait(900);
  a.mark("added");
  a.put({ added: true });
  await a.wait(1300);
  a.mark("shipped");
  a.put({ shipped: true });
  await a.wait(3000);
}

export function ProjectsHeroScene() {
  return (
    <Stage<ListS>
      width={600}
      height={480}
      compact={{ below: 560, width: 358, height: 340 }}
      initial={{ added: false, shipped: false }}
      poster={{ added: true, shipped: true }}
      script={listScript}
      play="once"
      className="tc tc-sd ts-scene"
    >
      {(s, _r, layout) => (
        <Window
          className="ts-win"
          toolbar={
            <Badge tone="neutral">
              <Roll variant="fade">{s.shipped ? "25 projects" : "24 projects"}</Roll>
            </Badge>
          }
        >
          <div className="ts-body">
            <div className="pj-list">
              {listRows.map((r, i) => {
                const row = (
                  <Row
                    pad={layout === "compact" ? 10 : 12}
                    selected={i === 0 && !s.shipped}
                    lead={<Avatar name={r.name} size={layout === "compact" ? 28 : 32} tone={i === 0 ? "accent" : "person"} />}
                    title={<Text>{r.title}</Text>}
                    subtitle={<Text>{r.name}</Text>}
                  >
                    <Badge tone={i === 0 && !s.shipped ? "accent" : "success"} dot>
                      {i === 0 ? <Roll variant="fade">{s.shipped ? "Shipped" : "In review"}</Roll> : "Shipped"}
                    </Badge>
                  </Row>
                );
                return i === 0 ? (
                  <Collapse key={r.name} open={s.added} reveal="drop">
                    {row}
                  </Collapse>
                ) : (
                  <div key={r.name}>{row}</div>
                );
              })}
            </div>
          </div>
        </Window>
      )}
    </Stage>
  );
}

/* ============================================================ payments */
// Aarav's payments dashboard. Gold: payout-flow. No cursor. Beats: an alert
// drops in, failed payments up; a beat later the refund on the selected row
// rolls Refund pending → Refunded. Real strings: three payments, the alert.

type PayS = { alert: boolean; refunded: boolean };

async function payScript(a: Act<PayS>) {
  await a.wait(900);
  a.mark("alert");
  a.put({ alert: true });
  await a.wait(1400);
  a.mark("refunded");
  a.put({ refunded: true });
  await a.wait(3000);
}

function PaymentsScene() {
  return (
    <Stage<PayS>
      width={600}
      height={460}
      compact={{ below: 560, width: 358, height: 380 }}
      initial={{ alert: false, refunded: false }}
      poster={{ alert: true, refunded: true }}
      script={payScript}
      play="once"
      fill
      startAt={0.6}
      className="tc tc-sd ts-scene"
    >
      {(s) => (
        <Window title="Payments · Today" className="ts-win" toolbar={<Badge tone="success" dot>Live</Badge>}>
          <div className="ts-body">
            <Collapse open={s.alert} reveal="drop">
              <div className="pj-alert">
                <Icon name="bell" size={14} filled />
                <Text>Failed payments up 3× in the last 10 minutes</Text>
              </div>
            </Collapse>
            <div className="pj-list">
              <Row pad={12} title={<Text>₹1,299 · Order 4812</Text>} subtitle={<Text>UPI · 2 min ago</Text>}>
                <Badge tone="danger" dot>Failed</Badge>
              </Row>
              <Row pad={12} selected={!s.refunded} title={<Text>₹649 · Order 4807</Text>} subtitle={<Text>Card · refund asked</Text>}>
                <Badge tone={s.refunded ? "success" : "warning"} dot>
                  <Roll variant="fade">{s.refunded ? "Refunded" : "Refund pending"}</Roll>
                </Badge>
              </Row>
              <Row pad={12} title={<Text>₹2,450 · Order 4801</Text>} subtitle={<Text filler>UPI · 9 min ago</Text>}>
                <Badge tone="success" dot>Captured</Badge>
              </Row>
            </div>
          </div>
        </Window>
      )}
    </Stage>
  );
}

/* ============================================================= chatbot */
// Harshit's syllabus chatbot. Gold: ai-chat (the question sent, the answer
// arriving with its height, the source last). No cursor. Beats: the question
// lands; the answer drops in; a beat later its source, the unit, appears
// under it. Real strings: the question, the answer, the source.

type ChatS = { asked: boolean; answered: boolean; cited: boolean };

async function chatScript(a: Act<ChatS>) {
  await a.wait(800);
  a.mark("asked");
  a.put({ asked: true });
  await a.wait(1000);
  a.mark("answered");
  a.put({ answered: true });
  await a.wait(900);
  a.mark("cited");
  a.put({ cited: true });
  await a.wait(3000);
}

function ChatbotScene() {
  return (
    <Stage<ChatS>
      width={600}
      height={460}
      compact={{ below: 560, width: 358, height: 400 }}
      initial={{ asked: false, answered: false, cited: false }}
      poster={{ asked: true, answered: true, cited: true }}
      script={chatScript}
      play="once"
      fill
      startAt={0.6}
      className="tc tc-sd ts-scene"
    >
      {(s) => (
        <Window title="Ask the syllabus" className="ts-win" toolbar={<Badge tone="neutral">DBMS</Badge>}>
          <div className="ts-body pj-chat">
            <div className="pj-q">
              <Text wrap>Which units are in the mid-semester exam?</Text>
            </div>
            <div className="pj-a">
              <Text wrap>Units 1 to 3: ER models, relational algebra and normalisation.</Text>
            </div>
            <Collapse open={s.asked} reveal="drop">
              <div className="pj-q">
                <Text wrap>What is the difference between 2NF and 3NF?</Text>
              </div>
            </Collapse>
            <Collapse open={s.answered} reveal="drop">
              <div className="pj-a">
                <Text wrap>
                  2NF removes columns that depend on only part of the key. 3NF goes further and removes columns that depend on another non-key column.
                </Text>
                <Collapse open={s.cited} reveal="drop">
                  <div className="pj-source-row">
                    <span className="pj-source">
                      <Icon name="file" size={13} />
                      Unit 3 · Normalisation, page 42
                    </span>
                  </div>
                </Collapse>
              </div>
            </Collapse>
          </div>
        </Window>
      )}
    </Stage>
  );
}

/* ============================================================ pipeline */
// Priya's deploy pipeline, broken on purpose. Gold: form-error (an error on
// the step that caused it, cleared by the fix). No cursor. Beats: build and
// tests pass; the health check fails; the rollback runs and passes; the
// toolbar rolls Failing → Healthy. Real strings: four steps, the versions.

type PipeS = { step: number; failed: boolean; rolled: boolean };
const pipeSteps = ["Build image", "Run 42 tests", "Deploy v1.9"];

async function pipeScript(a: Act<PipeS>) {
  await a.wait(800);
  for (let i = 1; i <= 3; i++) {
    a.mark(`step-${i}`);
    a.put({ step: i });
    await a.wait(520);
  }
  a.mark("failed");
  a.put({ failed: true });
  await a.wait(1100);
  a.mark("rolled");
  a.put({ rolled: true });
  await a.wait(3000);
}

function PipelineScene() {
  return (
    <Stage<PipeS>
      width={600}
      height={460}
      compact={{ below: 560, width: 358, height: 400 }}
      initial={{ step: 0, failed: false, rolled: false }}
      poster={{ step: 3, failed: true, rolled: true }}
      script={pipeScript}
      play="once"
      fill
      startAt={0.6}
      className="tc tc-sd ts-scene"
    >
      {(s) => (
        <Window
          title="deploy · main"
          className="ts-win"
          toolbar={
            <Badge tone={s.rolled ? "success" : s.failed ? "danger" : "neutral"} dot>
              <Roll variant="fade">{s.rolled ? "Healthy" : s.failed ? "Failing" : "Running"}</Roll>
            </Badge>
          }
        >
          <div className="ts-body">
            <div className="pj-list">
              {pipeSteps.map((t, i) => (
                <Row key={t} pad={12} lead={<Check on={s.step > i} pending={s.step === i} size={18} />} title={<Text>{t}</Text>} />
              ))}
              <Row
                pad={12}
                lead={<span className="pj-mark" data-bad={(s.failed && !s.rolled) || undefined}><States value={s.rolled ? "ok" : s.failed ? "bad" : "wait"} states={{ wait: <span className="pj-dot" />, bad: <Icon name="close" size={12} />, ok: <Icon name="check" size={12} /> }} /></span>}
                title={<Text>Health check</Text>}
                subtitle={<Roll variant="fade">{s.rolled ? "Rolled back to v1.8" : s.failed ? "Error rate 14%" : "Waiting"}</Roll>}
              >
                <Badge tone={s.rolled ? "success" : s.failed ? "danger" : "neutral"}>
                  <Roll variant="fade">{s.rolled ? "Passed" : s.failed ? "Failed" : "Queued"}</Roll>
                </Badge>
              </Row>
            </div>
          </div>
        </Window>
      )}
    </Stage>
  );
}

/* ============================================================== events */
// Kavya's campus events app. Gold: form-error (the button confirms on
// itself) with table-edit's then-the-total. Beats: the pointer presses Going
// on the hackathon; the button turns to a tick and Going; a beat later the
// count rolls 212 → 213 and you join the faces. Real strings: two events,
// the button, the count.

type EventS = { going: boolean };

async function eventScript(a: Act<EventS>) {
  await a.wait(800);
  await a.move({ at: "going", x: 0.5, y: 0.55 });
  await a.wait(150);
  await a.click({ at: "going", x: 0.5, y: 0.55 });
  a.mark("going");
  a.put({ going: true });
  await a.wait(3200);
}

function EventsScene() {
  return (
    <Stage<EventS>
      width={600}
      height={460}
      compact={{ below: 560, width: 358, height: 380 }}
      initial={{ going: false }}
      poster={{ going: true }}
      script={eventScript}
      play="once"
      fill
      startAt={0.6}
      cursor={{ at: { wide: { x: 560, y: 430 }, compact: { x: 330, y: 360 } } }}
      className="tc tc-sd ts-scene"
    >
      {(s) => (
        <Window title="Campus events" className="ts-win" toolbar={<Badge tone="neutral">This week</Badge>}>
          <div className="ts-body">
            <div className="pj-event">
              <span className="pj-date">
                <span>SAT</span>
                <span>14</span>
              </span>
              <span className="pj-event__copy">
                <Text className="pj-event__title">24-hour hackathon</Text>
                <Text className="pj-event__sub">Main auditorium · 9 am</Text>
                <span className="pj-going">
                  <Facepile names={["Rohan Verma", "Meera Iyer", "Arjun Menon"]} size={22} />
                  <span>
                    <Roll>{s.going ? "213" : "212"}</Roll> going
                  </span>
                </span>
              </span>
              <Button variant="primary" size="small" data-target="going" data-cursor="pointer">
                <States
                  value={s.going ? "yes" : "rsvp"}
                  states={{
                    rsvp: "I'm going",
                    yes: (
                      <span className="st-done">
                        <Icon name="check" size={12} filled />
                        Going
                      </span>
                    ),
                  }}
                />
              </Button>
            </div>
            <div className="pj-list">
              <Row pad={12} title={<Text>Design club · Figma basics</Text>} subtitle={<Text filler>Room 204 · Tuesday</Text>}>
                <Badge tone="neutral">64 going</Badge>
              </Row>
              <Row pad={12} title={<Text filler>Placement talk</Text>} subtitle={<Text filler>Seminar hall · Friday</Text>} />
            </div>
          </div>
        </Window>
      )}
    </Stage>
  );
}

/** A scene for each featured project, by slug. */
export const featuredScenes: Record<string, ComponentType> = {
  "payments-dashboard": PaymentsScene,
  "syllabus-chatbot": ChatbotScene,
  "capstone-pipeline": PipelineScene,
  "campus-events": EventsScene,
};

/** The scene for one featured project, picked on the client (a server page can't index the map above). */
export function FeaturedScene({ slug }: { slug: string }) {
  const Scene = featuredScenes[slug];
  return Scene ? <Scene /> : null;
}
