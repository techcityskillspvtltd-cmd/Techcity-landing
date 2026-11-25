"use client";

import { Avatar, Badge, Button, Check, Collapse, Meter, Roll, Row, Stage, Text, Toggle, Window, type Act } from "@/stageshow/kit";
import { ProductLogo } from "@/components/product-logo";
import { products } from "@/lib/products";
import "./scenes.css";

/*
 * Hero scenes for the student pages, built with the stageshow kit like the
 * partner side's scenes: one pinned window that runs off the bottom and the
 * right of its panel, no cursor (what happens, not a gesture), a few beats
 * played once as it comes into view, the payoff left on screen.
 */

/* ------------------------------------------------------------- the day */
// A student's evening on TechCity. Gold: payout-flow (overlapping arrivals,
// a payoff that holds). Beats: the roadmap step ticks off; the daily set
// fills one problem at a time; the streak rolls 11 → 12 days; a beat later the
// contest rank rolls #48 → #12. Real strings: the four things on the plan,
// the streak, the rank.

type Day = { marg: boolean; solved: number; streak: number; rank: number };
const dayStart: Day = { marg: false, solved: 0, streak: 11, rank: 48 };
const dayEnd: Day = { marg: true, solved: 3, streak: 12, rank: 12 };

async function dayScript(a: Act<Day>) {
  await a.wait(900);
  a.mark("roadmap");
  a.put({ marg: true });
  await a.wait(800);
  a.mark("practice");
  for (let i = 1; i <= 3; i++) {
    a.put({ solved: i });
    await a.wait(480);
  }
  await a.wait(300);
  a.mark("streak");
  a.put({ streak: 12 });
  await a.wait(900);
  a.mark("rank");
  a.put({ rank: 12 });
  await a.wait(2800);
}

export function DayScene() {
  return (
    <Stage<Day>
      width={600}
      height={480}
      compact={{ below: 560, width: 358, height: 300 }}
      initial={dayStart}
      poster={dayEnd}
      script={dayScript}
      play="once"
      className="tc tc-sd"
    >
      {(s, _rect, layout) => (
        <Window
          title="Today"
          className="sd-win"
          toolbar={
            <Badge tone="warning" dot>
              <Roll>{String(s.streak)}</Roll>-day streak
            </Badge>
          }
        >
          <div className="sd-body">
            <div className="sd-hello" data-hide={layout === "compact" || undefined}>
              <Avatar name="Aarav Sharma" size={36} tone="accent" />
              <span>
                <Text className="sd-hello__name">Good evening, Aarav</Text>
                <Text className="sd-hello__sub">Four things on your plan</Text>
              </span>
            </div>
            <div className="sd-list">
              <Row
                pad={12}
                selected={!s.marg}
                lead={<ProductLogo id="marg" size={32} />}
                title={<Text>Trees and graphs</Text>}
                subtitle={<Text>Marg · Roadmap step 7 of 12</Text>}
              >
                <Check on={s.marg} />
              </Row>
              <Row
                pad={12}
                selected={s.marg && s.solved < 3}
                lead={<ProductLogo id="riyaaz" size={32} />}
                title={<Text>Daily set</Text>}
                subtitle={
                  <span className="sd-meter">
                    <Meter value={s.solved / 3} tone={s.solved === 3 ? "success" : "accent"} />
                  </span>
                }
              >
                <span className="sd-count">
                  <Roll>{String(s.solved)}</Roll> of 3
                </span>
              </Row>
              <Row
                pad={12}
                lead={<ProductLogo id="spardha" size={32} />}
                title={<Text>Weekend contest</Text>}
                subtitle={<Text>Spardha · 640 students</Text>}
              >
                <Badge tone={s.rank === 12 ? "accent" : "neutral"}>
                  Rank #<Roll>{String(s.rank)}</Roll>
                </Badge>
              </Row>
              <Row
                pad={12}
                lead={<ProductLogo id="kaksha" size={32} />}
                title={<Text>Live class · System design</Text>}
                subtitle={<Text>Kaksha · at 7 pm</Text>}
              >
                <Badge tone="neutral">Tonight</Badge>
              </Row>
            </div>
          </div>
        </Window>
      )}
    </Stage>
  );
}

/* ------------------------------------------------------------ shipping */
// A student's project going live. Gold: form-error (the button confirms on
// itself) with payout-flow's arrivals. Beats: three checks pass in turn; the
// trainer's review comes in approved; Merge turns to Merged; "Deployed" drops
// in under it. Real strings: the pull request, the checks, the reviewer, the
// result.

type Ship = { checks: number; approved: boolean; merged: boolean };
const shipStart: Ship = { checks: 0, approved: false, merged: false };
const shipEnd: Ship = { checks: 3, approved: true, merged: true };
const CHECKS = ["Build", "Tests · 42 passed", "Preview deploy"];

async function shipScript(a: Act<Ship>) {
  await a.wait(900);
  a.mark("checks");
  for (let i = 1; i <= CHECKS.length; i++) {
    a.put({ checks: i });
    await a.wait(560);
  }
  a.mark("review");
  a.put({ approved: true });
  await a.wait(900);
  a.mark("merge");
  a.put({ merged: true });
  await a.wait(3000);
}

export function ShipScene() {
  return (
    <Stage<Ship>
      width={600}
      height={480}
      compact={{ below: 560, width: 358, height: 300 }}
      initial={shipStart}
      poster={shipEnd}
      script={shipScript}
      play="once"
      className="tc tc-sd"
    >
      {(s, _rect, layout) => (
        <Window title="payments-dashboard" className="sd-win" toolbar={<Badge tone="neutral">Pull request #24</Badge>}>
          <div className="sd-body">
            <div className="sd-hello" data-hide={layout === "compact" || undefined}>
              <Avatar name="Aarav Sharma" size={36} tone="accent" />
              <span>
                <Text className="sd-hello__name">Add a refunds view</Text>
                <Text className="sd-hello__sub">Aarav wants to merge 6 commits</Text>
              </span>
            </div>
            <div className="sd-list">
              {CHECKS.map((c, i) => (
                <Row key={c} pad={10} lead={<Check on={i < s.checks} pending={i === s.checks} />} title={<Text>{c}</Text>}>
                  <Badge tone={i < s.checks ? "success" : "neutral"} dot>
                    <Roll variant="fade">{i < s.checks ? "Passed" : "Running"}</Roll>
                  </Badge>
                </Row>
              ))}
              <Row
                pad={10}
                selected={s.approved && !s.merged}
                lead={<Avatar name="Sneha Kapoor" size={28} ring={s.approved ? "confirmed" : "waiting"} />}
                title={<Text>Sneha Kapoor</Text>}
                subtitle={<Text>Trainer · MERN stack</Text>}
              >
                <Badge tone={s.approved ? "success" : "neutral"} dot>
                  <Roll variant="fade">{s.approved ? "Approved" : "Reviewing"}</Roll>
                </Badge>
              </Row>
            </div>
            <div className="sd-merge sd-merge--row">
              <Collapse open={s.merged} reveal="drop">
                <div className="sd-merge__row">
                  <Badge tone="success" dot>
                    Deployed to production
                  </Badge>
                </div>
              </Collapse>
              <Button variant="primary" size="large">
                {s.merged ? "Merged" : "Merge"}
              </Button>
            </div>
          </div>
        </Window>
      )}
    </Stage>
  );
}

/* ------------------------------------------------------------- account */
// One account, five tools. Gold: payout-flow (a staggered run of arrivals,
// the payoff held). Beats: the five tools switch on one after another, the
// count in the title rolls up with them, then "All five, one login" drops in.
// Real strings: the five products and what each is for.

type Acct = { on: number; done: boolean };

async function accountScript(a: Act<Acct>) {
  await a.wait(800);
  a.mark("tools");
  for (let i = 1; i <= products.length; i++) {
    a.put({ on: i });
    await a.wait(420);
  }
  await a.wait(300);
  a.mark("done");
  a.put({ done: true });
  await a.wait(3000);
}

export function AccountScene() {
  return (
    <Stage<Acct>
      width={600}
      height={480}
      compact={{ below: 560, width: 358, height: 300 }}
      initial={{ on: 0, done: false }}
      poster={{ on: products.length, done: true }}
      script={accountScript}
      play="once"
      className="tc tc-sd"
    >
      {(s, _rect, layout) => (
        <Window title="Your account" className="sd-win" toolbar={<Avatar name="Aarav Sharma" size={24} tone="accent" />}>
          <div className="sd-body">
            <div className="sd-hello" data-hide={layout === "compact" || undefined}>
              <span>
                <Text className="sd-hello__name">Tools</Text>
                <span className="sd-hello__sub">
                  <Roll>{String(s.on)}</Roll> of {products.length} switched on
                </span>
              </span>
            </div>
            <div className="sd-list">
              {products.map((p, i) => (
                <Row
                  key={p.id}
                  pad={12}
                  selected={s.on === i + 1 && !s.done}
                  lead={<ProductLogo id={p.id} size={32} />}
                  title={<Text>{p.name}</Text>}
                  subtitle={<Text>{p.category}</Text>}
                >
                  <Toggle on={i < s.on} />
                </Row>
              ))}
            </div>
            <div className="sd-merge">
              <Collapse open={s.done} reveal="drop">
                <div className="sd-merge__row">
                  <Badge tone="success" dot>
                    All five on one login
                  </Badge>
                </div>
              </Collapse>
            </div>
          </div>
        </Window>
      )}
    </Stage>
  );
}
