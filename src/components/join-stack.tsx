"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/*
 * Careers hero: how to join TechCity, as three isometric plates in the line art
 * of the TechCity stack on the home page (components/tech-stack.tsx, styles
 * `.tech-stack` / `.hl-*` in globals.css): Apply, Interview rounds, Start the
 * training.
 *
 * The plates take turns. The stack opens above the one in focus, so its whole
 * face shows; it takes its colour and plays its moment: the form fills in and Send lights up; the three
 * rounds tick off one by one; the week's classes fill the timetable. Plates
 * already passed keep their finished state, quietly, so the process reads as
 * done so far. After the training plate has held, the next applicant starts
 * again at Apply. A row of the three steps under the hero follows along and can
 * be clicked to jump.
 *
 * Pauses off screen. With reduced motion it doesn't play: it rests on the last
 * step, with the first two done, which tells the whole story in one frame.
 */

const W = 260; // plate size, in plate units
const T = 12; // plate thickness, in px
const H = 620; // drawing height
const TUCK = 40; // gap between plates resting in the stack
const CLEAR = 262; // gap above the plate in focus: room for its whole face
const UNDER = 64; // gap below the plate in focus, so the next one's label shows
const CX = 270; // horizontal centre of the plates
const ISO = "matrix(0.866 0.5 -0.866 0.5 0 0)";
const BAR_Y = W - 42; // top of the status bar; every face stays above it

/** Isometric projection of a plate point with height z (z up). */
const P = (x: number, y: number, z = 0): [number, number] => [
  (x - y) * 0.866,
  (x + y) * 0.5 - z,
];
const pts = (...p: [number, number][]) =>
  p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const delay = (ms: number) => ({ "--dl": `${ms}ms` }) as CSSProperties;

export type JoinStep = { title: string; body: string };

const STEPS: { name: string; pill: string; color: string; hold: number }[] = [
  { name: "APPLY", pill: "FORM", color: "var(--g-indigo)", hold: 3600 },
  { name: "INTERVIEW", pill: "ROUNDS", color: "var(--accent)", hold: 3800 },
  { name: "TRAINING", pill: "DAY 1", color: "var(--g-amber)", hold: 5000 },
];

/* ---------- Faces (plate coordinates, above BAR_Y) ---------- */

/** Apply: three fields fill in, a résumé is attached, Send lights up. */
function ApplyFace() {
  const fields = [118, 168, 92];
  return (
    <>
      {fields.map((len, i) => (
        <g key={i}>
          <line
            x1="24"
            y1={30 + i * 44}
            x2="64"
            y2={30 + i * 44}
            className="hl-lo hl-thick"
          />
          <rect
            x="24"
            y={38 + i * 44}
            width="212"
            height="22"
            rx="3"
            className="hl-pit hl-mid"
          />
          <line
            x1="34"
            y1={49 + i * 44}
            x2={34 + len}
            y2={49 + i * 44}
            pathLength={1}
            className="hl-acc hl-thick jn-draw"
            style={delay(250 + i * 380)}
          />
        </g>
      ))}
      <rect x="24" y="172" width="112" height="30" rx="3" className="hl-mid" />
      <g className="jn-pop" style={delay(1450)}>
        <rect
          x="32"
          y="179"
          width="12"
          height="16"
          rx="1.5"
          className="hl-face hl-acc"
        />
        <line x1="52" y1="187" x2="124" y2="187" className="hl-mid hl-thick" />
      </g>
      <rect
        x="158"
        y="172"
        width="78"
        height="30"
        rx="15"
        className="hl-pit hl-mid"
      />
      <g className="jn-pop" style={delay(1900)}>
        <rect
          x="158"
          y="172"
          width="78"
          height="30"
          rx="15"
          className="hl-face hl-acc"
        />
      </g>
      <text
        x="197"
        y="190"
        textAnchor="middle"
        className="hl-type hl-type--tiny jn-on"
        style={delay(1900)}
      >
        SEND
      </text>
    </>
  );
}

/** Interview rounds: three rounds, each ticked off in turn. */
function InterviewFace() {
  return (
    <>
      {[0, 1, 2].map((i) => {
        const y = 24 + i * 62;
        return (
          <g key={i}>
            <rect
              x="24"
              y={y}
              width="212"
              height="52"
              rx="3"
              className="hl-mid"
            />
            <circle cx="50" cy={y + 26} r="13" className="hl-pit hl-mid" />
            <circle cx="50" cy={y + 22} r="4.5" className="hl-lo" />
            <text x="74" y={y + 22} className="hl-type hl-type--tiny">
              ROUND {i + 1}
            </text>
            <line
              x1="74"
              y1={y + 34}
              x2={150 + i * 14}
              y2={y + 34}
              className="hl-lo hl-thick"
            />
            <rect
              x="204"
              y={y + 16}
              width="20"
              height="20"
              rx="4"
              className="hl-pit hl-mid"
            />
            <g className="jn-pop" style={delay(400 + i * 700)}>
              <rect
                x="204"
                y={y + 16}
                width="20"
                height="20"
                rx="4"
                className="hl-face hl-acc"
              />
              <polyline
                points={`209,${y + 26} 213,${y + 30} 220,${y + 22}`}
                className="jn-check"
              />
            </g>
          </g>
        );
      })}
    </>
  );
}

/** Start the training: the week's classes fill the timetable, the batch gets going. */
function TrainingFace() {
  const classes: [number, number][] = [
    [0, 0],
    [2, 0],
    [4, 0],
    [1, 1],
    [3, 1],
    [0, 2],
    [2, 2],
    [4, 2],
  ];
  return (
    <>
      {["M", "T", "W", "T", "F"].map((d, c) => (
        <text
          key={c}
          x={42 + c * 43}
          y="34"
          textAnchor="middle"
          className="hl-type hl-type--tiny"
        >
          {d}
        </text>
      ))}
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={24 + c * 43}
            y={44 + r * 36}
            width="36"
            height="28"
            rx="3"
            className="hl-pit hl-mid"
          />
        )),
      )}
      {classes.map(([c, r], k) => (
        <g key={`${c}-${r}`} className="jn-pop" style={delay(300 + k * 150)}>
          <rect
            x={24 + c * 43}
            y={44 + r * 36}
            width="36"
            height="28"
            rx="3"
            className="hl-face hl-acc"
          />
        </g>
      ))}
      <line x1="24" y1="168" x2="236" y2="168" className="hl-lo hl-thick" />
      <line
        x1="24"
        y1="168"
        x2="168"
        y2="168"
        pathLength={1}
        className="hl-acc hl-thick jn-draw"
        style={delay(1600)}
      />
      <line x1="24" y1="188" x2="112" y2="188" className="hl-mid hl-thick" />
      <line x1="24" y1="202" x2="80" y2="202" className="hl-lo hl-thick" />
    </>
  );
}

/** A flag stands up on the training plate's back corner: you're in. */
function TrainingFlag() {
  const base = P(232, 40);
  const top = P(232, 40, 44);
  return (
    <g className="jn-flag">
      <line
        x1={base[0]}
        y1={base[1]}
        x2={top[0]}
        y2={top[1]}
        className="hl-edge"
      />
      <polygon
        points={pts(top, P(232, 40, 30), [top[0] + 24, top[1] + 5])}
        className="hl-face hl-acc"
      />
    </g>
  );
}

const faces = [ApplyFace, InterviewFace, TrainingFace];

/** The three plates. `step` is the plate in focus. */
function Plates({ step }: { step: number }) {
  // Plates rest tucked together, labels showing at their front edge. The one
  // in focus gets a clear gap above it, so the plate above never covers its
  // face; the plates below tuck under it. The stack is centred as it changes height.
  const ys: number[] = [];
  STEPS.forEach((_, k) => {
    if (k === 0) return ys.push(0);
    ys.push(ys[k - 1] + (k === step ? CLEAR : k - 1 === step ? UNDER : TUCK));
  });
  const top = (H - (ys[ys.length - 1] + W + T)) / 2;
  const offset = (k: number) => top + ys[k];
  // Each plate is its own layer; upper plates sit over lower ones, as in a real stack.
  return (
    <div className="join-stack" aria-hidden="true">
      {STEPS.map((s, k) => {
        const Face = faces[k];
        const lit = k === step;
        return (
          <svg
            key={s.name}
            viewBox={`25 0 490 ${H}`}
            className="tech-stack join-stack__layer"
            style={{ zIndex: STEPS.length - k }}
          >
            <g
              className="hl-layer"
              data-lit={lit || undefined}
              data-dim={!lit || undefined}
              data-done={k < step || undefined}
              style={
                {
                  "--c": s.color,
                  transform: `translate(${CX}px, ${offset(k)}px)`,
                } as CSSProperties
              }
            >
              <polygon
                points={pts(
                  [-225, 130],
                  [0, 260],
                  [0, 260 + T],
                  [-225, 130 + T],
                )}
                className="hl-face hl-face--dark hl-edge"
              />
              <polygon
                points={pts([0, 260], [225, 130], [225, 130 + T], [0, 260 + T])}
                className="hl-face hl-face--dark hl-edge"
              />
              <g transform={ISO}>
                <rect
                  x="0"
                  y="0"
                  width={W}
                  height={W}
                  className="hl-face hl-edge"
                />
                <rect
                  x="14"
                  y="14"
                  width={W - 28}
                  height={W - 28}
                  className="hl-lo"
                />
                <Face />
                <line
                  x1="14"
                  y1={BAR_Y}
                  x2={W - 14}
                  y2={BAR_Y}
                  className="hl-lo"
                />
                <text x="24" y={W - 22} className="hl-type">
                  <tspan className="hl-type-name">{s.name}</tspan>
                  <tspan dx="8">STEP 0{k + 1}</tspan>
                </text>
                <rect
                  x={W - 70}
                  y={W - 35}
                  width="46"
                  height="16"
                  rx="8"
                  className="hl-pit hl-acc"
                />
                <text
                  x={W - 47}
                  y={W - 24}
                  textAnchor="middle"
                  className="hl-type hl-type--tiny"
                >
                  {s.pill}
                </text>
              </g>
              {k === 2 && <TrainingFlag />}
            </g>
          </svg>
        );
      })}
    </div>
  );
}

/**
 * The hero frame: `children` (the copy) on the left, the plates on the right,
 * and the three steps in a ruled row underneath, following the plates.
 */
export function JoinHero({
  steps,
  children,
}: {
  steps: JoinStep[];
  children: ReactNode;
}) {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0); // restarts the timer and the progress bar
  const [onScreen, setOnScreen] = useState(true);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setStill(mq.matches);
      if (mq.matches) setStep(STEPS.length - 1);
    };
    apply();
    mq.addEventListener("change", apply);
    const io = new IntersectionObserver(
      ([e]) => setOnScreen(e.isIntersecting),
      { threshold: 0.2 },
    );
    if (root.current) io.observe(root.current);
    return () => {
      mq.removeEventListener("change", apply);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (still || !onScreen) return;
    const id = setTimeout(() => {
      setStep((s) => (s + 1) % STEPS.length);
      setRun((r) => r + 1);
    }, STEPS[step].hold);
    return () => clearTimeout(id);
  }, [step, run, still, onScreen]);

  const pick = (k: number) => {
    setStep(k);
    setRun((r) => r + 1);
  };

  return (
    <div ref={root}>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {children}
        <div className="cr-join">
          <Plates step={step} />
        </div>
      </div>
      <ol
        className="cr-steps"
        data-still={still || undefined}
        data-paused={!onScreen || undefined}
      >
        {steps.map((s, k) => (
          <li key={s.title}>
            <button
              type="button"
              className="cr-step"
              data-on={k === step || undefined}
              data-done={k < step || undefined}
              onClick={() => pick(k)}
              aria-current={k === step ? "step" : undefined}
            >
              <span className="cr-step__bar" aria-hidden="true">
                {k === step && (
                  <span
                    key={run}
                    style={{ animationDuration: `${STEPS[k].hold}ms` }}
                  />
                )}
              </span>
              <span className="cr-step__n">0{k + 1}</span>
              <span className="cr-step__title">{s.title}</span>
              <span className="cr-step__body">{s.body}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
