"use client";

import type { ComponentType, ReactNode } from "react";
import { Avatar, Badge, Check, Count, Meter, Roll, Row, Stage, Text, Toast, Toggle, Window, type Act } from "@/stageshow/kit";
import { ProductLogo, type ProductId } from "@/components/product-logo";
import type { ProgramSlug } from "@/lib/program-pages";
import "../project-scenes/look.css";
import "./scenes.css";

/*
 * Hero pictures for the eight program pages, built with the stageshow kit
 * (src/stageshow/kit) the same way as the project and product scenes: one
 * pinned window that runs off the bottom of the hero panel, no cursor (each is
 * what the program does, not a gesture), three or four beats, played once as
 * it comes into view, the payoff left on screen. Real strings only on what the
 * story is about.
 *
 * Every scene shares one frame (summary line, then a list of rows) so the
 * eight pages read as a set; the story inside each is the program's own.
 */

const W = 600;
const H = 460;
const compact = { below: 560, width: 358, height: 320 };

/** The shared frame: a pinned window with a summary line and a list. */
function Frame({ title, summary, children, toast }: { title: string; summary: ReactNode; children: ReactNode; toast?: ReactNode }) {
  return (
    <Window title={title} className="pg-win">
      <div className="pg-body">
        <div className="pg-summary">{summary}</div>
        <div className="pg-list">{children}</div>
        {toast}
      </div>
    </Window>
  );
}

function What({ name, meta }: { name: string; meta: ReactNode }) {
  return (
    <span className="pg-what">
      <span className="pg-name">{name}</span>
      <span className="pg-meta">{meta}</span>
    </span>
  );
}

const title = (t: string) => <Text className="pg-title">{t}</Text>;
const sub = (t: string) => <Text className="pg-sub">{t}</Text>;

/* ------------------------------------------------------------ trainers */
// A day on campus: the DSA lab finishes, the full-stack lab goes live and
// finishes, attendance for the day rolls up. Payoff: All done, 58/60.

type Tr = { dsa: "live" | "done"; web: "next" | "live" | "done"; present: number };
async function trScript(a: Act<Tr>) {
  await a.wait(1100);
  a.put({ dsa: "done" });
  await a.wait(900);
  a.put({ web: "live" });
  await a.wait(1400);
  a.put({ web: "done", present: 58 });
  await a.wait(3000);
}
const state = { live: "Live", done: "Done", next: "2:00 pm" } as const;
const tone = { live: "warning", done: "success", next: "neutral" } as const;

function TrainersScene() {
  return (
    <Stage<Tr> width={W} height={H} compact={compact} initial={{ dsa: "live", web: "next", present: 54 }} poster={{ dsa: "done", web: "done", present: 58 }} script={trScript} play="once" className="tc tc-pg">
      {(s) => (
        <Frame
          title="CSE · 3rd year"
          summary={
            <>
              <What name="Tuesday on campus" meta="4 sessions with industry trainers" />
              <span className="pg-count">
                <Count value={s.present} duration={700} />
                <span>/60 present</span>
              </span>
            </>
          }
        >
          <Row pad={10} lead={<Avatar name="Rahul Mehra" size={28} />} title={title("Aptitude")} subtitle={sub("Rahul Mehra · Room 204")}>
            <Badge tone="success" dot>Done</Badge>
          </Row>
          <Row pad={10} selected={s.dsa === "live"} lead={<Avatar name="Sneha Kapoor" size={28} />} title={title("Java DSA lab")} subtitle={sub("Sneha Kapoor · Lab 2 · Graphs")}>
            <Badge tone={tone[s.dsa]} dot><Roll variant="fade">{state[s.dsa]}</Roll></Badge>
          </Row>
          <Row pad={10} selected={s.web === "live"} lead={<Avatar name="Arjun Nair" size={28} />} title={title("Full-stack lab")} subtitle={sub("Arjun Nair · Lab 3 · REST APIs")}>
            <Badge tone={tone[s.web]} dot><Roll variant="fade">{state[s.web]}</Roll></Badge>
          </Row>
          <Row pad={10} lead={<Avatar size={28} plain />} title={title("Faculty review")} subtitle={sub("With the HoD · 4:00 pm")}>
            <Badge>Later</Badge>
          </Row>
        </Frame>
      )}
    </Stage>
  );
}

/* --------------------------------------------------- placement preparation */
// A student's mock interview is scored; readiness rolls 64% → 81% and the
// badge turns Interview-ready.

type Pl = { tech: "pending" | "scored"; ready: number };
async function plScript(a: Act<Pl>) {
  await a.wait(1200);
  a.put({ tech: "scored" });
  await a.wait(800);
  a.put({ ready: 81 });
  await a.wait(3200);
}

function PlacementScene() {
  return (
    <Stage<Pl> width={W} height={H} compact={compact} initial={{ tech: "pending", ready: 64 }} poster={{ tech: "scored", ready: 81 }} script={plScript} play="once" className="tc tc-pg tc-pg--warm">
      {(s) => (
        <Frame
          title="Placement readiness"
          summary={
            <>
              <What name="Aarav Sharma" meta={<>Readiness <Count value={s.ready} format={(n) => `${Math.round(n)}%`} duration={900} /></>} />
              <Badge tone={s.ready > 80 ? "success" : "accent"}>
                <Roll variant="fade">{s.ready > 80 ? "Interview-ready" : "In progress"}</Roll>
              </Badge>
            </>
          }
        >
          <Row pad={10} lead={<Check on />} title={title("Aptitude test")} subtitle={sub("Quant, reasoning and verbal")}>
            <span className="pg-score">78</span>
          </Row>
          <Row pad={10} lead={<Check on />} title={title("Coding round")} subtitle={sub("3 of 4 solved on Spardha")}>
            <span className="pg-score">82</span>
          </Row>
          <Row pad={10} selected={s.tech === "pending"} lead={<Check on={s.tech === "scored"} pending={s.tech === "pending"} />} title={title("Technical interview")} subtitle={sub("Mock with an industry interviewer")}>
            <span className="pg-score">{s.tech === "scored" ? <Count value={86} duration={700} /> : "—"}</span>
          </Row>
          <Row pad={10} lead={<Check on={false} />} title={title("HR interview")} subtitle={sub("Thursday")}>
            <span className="pg-score pg-score--faint">—</span>
          </Row>
          <div className="pg-meter-row">
            <Meter value={s.ready / 100} className="pg-meter" />
          </div>
        </Frame>
      )}
    </Stage>
  );
}

/* ------------------------------------------------------ student placement */
// A campus drive moves through its rounds; offers roll 0 → 9 and a toast
// confirms them.

type Sp = { stage: 0 | 1 | 2; toast: boolean };
async function spScript(a: Act<Sp>) {
  await a.wait(1000);
  a.put({ stage: 1 });
  await a.wait(1100);
  a.put({ stage: 2 });
  await a.wait(900);
  a.put({ toast: true });
  await a.wait(3000);
}

function PlacingScene() {
  return (
    <Stage<Sp> width={W} height={H} compact={compact} initial={{ stage: 0, toast: false }} poster={{ stage: 2, toast: true }} script={spScript} play="once" className="tc tc-pg tc-pg--navy">
      {(s) => (
        <Frame
          title="Campus drive"
          summary={
            <>
              <What name="Software engineer" meta="Industry partner · 3 rounds" />
              <Badge tone={s.stage === 2 ? "success" : "accent"} dot>
                <Roll variant="fade">{s.stage === 2 ? "Offers out" : "In progress"}</Roll>
              </Badge>
            </>
          }
          toast={
            <Toast show={s.toast} icon={<Check on size={16} />} className="pg-toast">
              9 students placed
            </Toast>
          }
        >
          {[
            { t: "Applied", d: "From CSE, IT and ECE", n: 64, on: true },
            { t: "Online test", d: "Aptitude and coding", n: 28, on: true },
            { t: "Interviews", d: "Technical and HR", n: s.stage >= 1 ? 14 : 0, on: s.stage >= 1 },
            { t: "Offers", d: "Joining in July", n: s.stage >= 2 ? 9 : 0, on: s.stage >= 2 },
          ].map((r, i) => (
            <Row key={r.t} pad={10} selected={s.stage + 1 === i} lead={<Check on={r.on} pending={!r.on && s.stage + 1 === i} />} title={title(r.t)} subtitle={sub(r.d)}>
              <span className="pg-score">{r.on ? <Count value={r.n} duration={700} /> : "—"}</span>
            </Row>
          ))}
        </Frame>
      )}
    </Stage>
  );
}

/* ------------------------------------------------------------- mentorship */
// A student's mentoring plan: the project review is done, the next session is
// booked with the mentor.

type Me = { review: boolean; booked: boolean };
async function meScript(a: Act<Me>) {
  await a.wait(1100);
  a.put({ review: true });
  await a.wait(1000);
  a.put({ booked: true });
  await a.wait(3200);
}

function MentorshipScene() {
  return (
    <Stage<Me> width={W} height={H} compact={compact} initial={{ review: false, booked: false }} poster={{ review: true, booked: true }} script={meScript} play="once" className="tc tc-pg">
      {(s) => (
        <Frame
          title="Mentorship"
          summary={
            <>
              <span className="pg-who">
                <Avatar name="Neha Gupta" size={32} tone="accent" />
                <What name="Neha Gupta" meta="Engineering Manager · your mentor" />
              </span>
              <Badge>Backend track</Badge>
            </>
          }
          toast={
            <Toast show={s.booked} icon={<Check on size={16} />} className="pg-toast">
              Booked for Thursday, 6:00 pm
            </Toast>
          }
        >
          <Row pad={10} lead={<Check on />} title={title("Set goals")} subtitle={sub("Backend developer by final year")} />
          <Row pad={10} selected={!s.review} lead={<Check on={s.review} pending={!s.review} />} title={title("Project review")} subtitle={sub("Library API · 6 comments")} />
          <Row pad={10} selected={s.review && !s.booked} lead={<Check on={s.booked} />} title={title("Resume feedback")} subtitle={sub("Next session")}>
            <Badge tone={s.booked ? "success" : "neutral"}>
              <Roll variant="fade">{s.booked ? "Booked" : "Not booked"}</Roll>
            </Badge>
          </Row>
          <Row pad={10} lead={<Check on={false} />} title={title("Mock system design")} subtitle={sub("Before placement season")} />
        </Frame>
      )}
    </Stage>
  );
}

/* ---------------------------------------------------- faculty development */
// A faculty program: the third module finishes, progress rolls to 4 of 4 and
// the certificate is ready.

type Fa = { m3: "pending" | "done"; m4: "todo" | "done" };
async function faScript(a: Act<Fa>) {
  await a.wait(1100);
  a.put({ m3: "done" });
  await a.wait(1100);
  a.put({ m4: "done" });
  await a.wait(3200);
}

function FacultyScene() {
  return (
    <Stage<Fa> width={W} height={H} compact={compact} initial={{ m3: "pending", m4: "todo" }} poster={{ m3: "done", m4: "done" }} script={faScript} play="once" className="tc tc-pg">
      {(s) => {
        const done = 2 + (s.m3 === "done" ? 1 : 0) + (s.m4 === "done" ? 1 : 0);
        return (
          <Frame
            title="Faculty development"
            summary={
              <>
                <What name="Generative AI & ML" meta={<>Module <Roll>{String(done)}</Roll> of 4 · 18 faculty</>} />
                <Badge tone={done === 4 ? "success" : "accent"}>
                  <Roll variant="fade">{done === 4 ? "Certificates ready" : "In progress"}</Roll>
                </Badge>
              </>
            }
          >
            <Row pad={10} lead={<Check on />} title={title("Foundations")} subtitle={sub("Models, data and evaluation")} />
            <Row pad={10} lead={<Check on />} title={title("Prompting in practice")} subtitle={sub("Lab: a study assistant")} />
            <Row pad={10} selected={s.m3 === "pending"} lead={<Check on={s.m3 === "done"} pending={s.m3 === "pending"} />} title={title("Building with models")} subtitle={sub("Mini project, in pairs")} />
            <Row pad={10} selected={s.m3 === "done" && s.m4 === "todo"} lead={<Check on={s.m4 === "done"} />} title={title("Teaching it")} subtitle={sub("A lab plan for your own class")} />
            <div className="pg-meter-row">
              <Meter value={done / 4} className="pg-meter" />
            </div>
          </Frame>
        );
      }}
    </Stage>
  );
}

/* ---------------------------------------------------------- online lessons */
// A live class: students keep joining, questions are answered one by one.

type On = { joined: number; answered: number };
async function onScript(a: Act<On>) {
  await a.wait(900);
  a.put({ joined: 72 });
  await a.wait(900);
  a.put({ answered: 2 });
  await a.wait(1100);
  a.put({ answered: 3 });
  await a.wait(3000);
}
const QUESTIONS = [
  { who: "Priya Singh", q: "Why put a cache before the database?" },
  { who: "Kabir Shah", q: "When does a queue beat a direct call?" },
  { who: "Diya Kapoor", q: "How do we shard user data?" },
  { who: "Ishaan Verma", q: "What breaks first at a million users?" },
];

function OnlineScene() {
  return (
    <Stage<On> width={W} height={H} compact={compact} initial={{ joined: 58, answered: 1 }} poster={{ joined: 72, answered: 3 }} script={onScript} play="once" className="tc tc-pg tc-pg--warm">
      {(s) => (
        <Frame
          title="Live class"
          summary={
            <>
              <What name="System design" meta={<><Count value={s.joined} duration={800} /> students joined</>} />
              <Badge tone="danger" dot>Live</Badge>
            </>
          }
        >
          {QUESTIONS.map((q, i) => {
            const answered = i < s.answered;
            return (
              <Row key={q.who} pad={10} selected={i === s.answered} lead={<Avatar name={q.who} size={28} />} title={title(q.q)} subtitle={sub(q.who)}>
                <Badge tone={answered ? "success" : "neutral"}>
                  <Roll variant="fade">{answered ? "Answered" : "Open"}</Roll>
                </Badge>
              </Row>
            );
          })}
        </Frame>
      )}
    </Stage>
  );
}

/* ---------------------------------------------------------- online content */
// A unit's content: the quiz finishes, the unit goes from Draft to Published
// and a toast says which batch got it.

type Co = { quiz: boolean; published: boolean };
async function coScript(a: Act<Co>) {
  await a.wait(1100);
  a.put({ quiz: true });
  await a.wait(900);
  a.put({ published: true });
  await a.wait(3200);
}

function ContentScene() {
  return (
    <Stage<Co> width={W} height={H} compact={compact} initial={{ quiz: false, published: false }} poster={{ quiz: true, published: true }} script={coScript} play="once" className="tc tc-pg">
      {(s) => (
        <Frame
          title="Content library"
          summary={
            <>
              <What name="Unit 4 · Trees and graphs" meta="Data structures · mapped to your syllabus" />
              <Badge tone={s.published ? "success" : "neutral"} dot>
                <Roll variant="fade">{s.published ? "Published" : "Draft"}</Roll>
              </Badge>
            </>
          }
          toast={
            <Toast show={s.published} icon={<Check on size={16} />} className="pg-toast">
              Shared with CSE 2nd year
            </Toast>
          }
        >
          <Row pad={10} lead={<Check on />} title={title("Video lessons")} subtitle={sub("6 videos · 48 min")} />
          <Row pad={10} lead={<Check on />} title={title("Notes")} subtitle={sub("Summaries and diagrams")} />
          <Row pad={10} lead={<Check on />} title={title("Lab sheet")} subtitle={sub("BFS and DFS, with starter code")} />
          <Row pad={10} selected={!s.quiz} lead={<Check on={s.quiz} pending={!s.quiz} />} title={title("Unit quiz")} subtitle={sub("15 questions on Spardha")} />
        </Frame>
      )}
    </Stage>
  );
}

/* --------------------------------------------------------------- platforms */
// One account: Setu, Riyaaz and Kaksha switch on beside Spardha and Marg; the
// count of connected tools rolls 2 → 5.

type Pf = { on: ProductId[] };
async function pfScript(a: Act<Pf>) {
  await a.wait(1000);
  a.put({ on: ["spardha", "marg", "setu"] });
  await a.wait(700);
  a.put({ on: ["spardha", "marg", "setu", "riyaaz"] });
  await a.wait(700);
  a.put({ on: ["spardha", "marg", "setu", "riyaaz", "kaksha"] });
  await a.wait(3200);
}
const TOOLS: { id: ProductId; name: string; what: string }[] = [
  { id: "setu", name: "Setu", what: "Courses, attendance and grades" },
  { id: "marg", name: "Marg", what: "Roadmaps for DSA, AI/ML and cloud" },
  { id: "spardha", name: "Spardha", what: "Tests and campus contests" },
  { id: "riyaaz", name: "Riyaaz", what: "Daily coding practice" },
  { id: "kaksha", name: "Kaksha", what: "Cohort video courses" },
];

function PlatformsScene() {
  return (
    <Stage<Pf> width={W} height={H} compact={compact} initial={{ on: ["spardha", "marg"] }} poster={{ on: ["spardha", "marg", "setu", "riyaaz", "kaksha"] }} script={pfScript} play="once" className="tc tc-pg tc-pg--navy">
      {(s) => (
        <Frame
          title="TechCity account"
          summary={
            <>
              <What name="Your college" meta={<><Count value={s.on.length} duration={500} /> of 5 tools on one account</>} />
              <Badge tone={s.on.length === 5 ? "success" : "accent"}>
                <Roll variant="fade">{s.on.length === 5 ? "All connected" : "Setting up"}</Roll>
              </Badge>
            </>
          }
        >
          {TOOLS.map((t) => (
            <Row key={t.id} pad={10} lead={<ProductLogo id={t.id} size={28} />} title={title(t.name)} subtitle={sub(t.what)}>
              <Toggle on={s.on.includes(t.id)} />
            </Row>
          ))}
        </Frame>
      )}
    </Stage>
  );
}

const scenes: Record<ProgramSlug, ComponentType> = {
  trainers: TrainersScene,
  "placement-preparation": PlacementScene,
  "student-placement": PlacingScene,
  mentorship: MentorshipScene,
  "faculty-development": FacultyScene,
  "online-lessons": OnlineScene,
  "online-content": ContentScene,
  platforms: PlatformsScene,
};

export function ProgramScene({ slug }: { slug: ProgramSlug }) {
  const Scene = scenes[slug];
  return (
    <div className="program-scene">
      <Scene />
    </div>
  );
}
