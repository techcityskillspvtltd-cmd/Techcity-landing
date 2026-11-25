"use client";

import { useEffect, useRef } from "react";

/*
 * Our mission: Build → Deliver → Improve. A scroll-triggered particle story after the
 * platform flow on giga.ai, on a near-black midnight navy so the light reads clearly.
 *
 * How it moves: scroll only picks the *target* step. A story clock `s` eases towards
 * it at its own pace, so every transition plays smoothly however fast you scroll.
 * Inside a step, every particle starts a little later than its neighbour (in a wave,
 * not all at once), so the field flows rather than jumps.
 *
 * Steps (s goes 0 → 9):
 *   0→1  draw-in   fine strands run from Knowledge, Training, Guidance into "Your college"
 *   1→2  pan       the flow slides left and leans in; the college moves to centre
 *   2→3  burst     the college bursts into a field of stars (depth, soft halos, twinkle)
 *   3→4  galaxy    the stars swirl into a tilted, slowly turning disc
 *   4→5  lanes     the disc unrolls into five loose lanes, one per way we deliver
 *   5→6  settle    the lanes settle, left to right: steadier and tighter every week
 *   6→7  baseline  the lanes collapse onto one baseline
 *   7→8  rise      readiness stays flat until TechCity begins, then climbs: a dot chart
 *                  with a glowing edge, labelled like a real chart
 *   8→9  loop      the strands return, feeding "Your college, but better"
 */

const STEPS = 9;

// Brand palette tuned for a near-black stage, as "r, g, b". Drawn additively.
const INK = "236, 239, 255";
const PERI = "141, 155, 255";
const LAV = "198, 205, 255";
const SKY = "143, 211, 255";
const CREAM = "255, 231, 186";
const HONEY = "252, 211, 138";
const AMBER = "246, 166, 40";
const PALETTE = [INK, PERI, LAV, SKY, CREAM, HONEY, AMBER];

/** Improve: the chart warms from cool to amber, left to right. */
const CHART_TINTS = [SKY, PERI, LAV, CREAM, HONEY, AMBER];

// One short line per stage of the story, shown at the top of the stage.
const CAPTIONS = [
  "We bring industry knowledge, training and guidance to your campus.",
  "It all runs inside your college, on your timetable.",
  "Week after week, practice turns into consistency.",
  "Every batch leaves more job-ready than the last.",
  "What works stays on campus, for every batch that follows.",
];

const GROUPS = [
  { label: "Knowledge", rows: 14, y: 0.3, tint: LAV },
  { label: "Training", rows: 8, y: 0.57, tint: SKY },
  { label: "Guidance", rows: 14, y: 0.82, tint: HONEY },
];
const COLS = 4;
const COL_ALPHA = [0.36, 0.2, 0.11, 0.05];

const LANES = [
  { label: "Trainers", color: PERI },
  { label: "Faculty sessions", color: LAV },
  { label: "Labs", color: SKY },
  { label: "Placement prep", color: HONEY },
  { label: "Workshops", color: AMBER },
];

/** Chart labels (Improve) and lane axis labels (Deliver), positioned every frame. */
const CHART_LABELS = ["Placement readiness", "TechCity begins", "Job-ready", "Semester 1", "Final year"];
const WEEK_LABELS = ["Week 1", "Week 16"];

const PHASES = [
  { label: "Build", step: 0.5 },
  { label: "Deliver", step: 2.6 },
  { label: "Improve", step: 7.6 },
];

/** Readiness over the program: flat until TechCity begins (the knee), then climbing. */
const KNEE = 0.3;
const curve = (u: number) => (u <= KNEE ? 0.04 : 0.04 + 0.96 * Math.pow((u - KNEE) / (1 - KNEE), 1.7));

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const outCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Pt = { x: number; y: number };
type V3 = { x: number; y: number; z: number };
type Strand = { pts: Pt[]; group: number; col: number; offset: number };
type Particle = {
  lane: number;
  sphere: V3;
  /** Galaxy disc: radius, start angle, thickness offset. */
  disc: { r: number; a: number; y: number };
  loose: V3;
  grid: V3;
  line: V3;
  chart: V3;
  /** 0..1 across the lanes (left → right) and across the chart. */
  laneT: number;
  ct: number;
  chartTint: string;
  /** 0..1 height within its chart column (top edge = 1). */
  chartH: number;
  edge: boolean;
  seed: number;
  bright: number;
  size: number;
  /** 0..1: how late this particle starts the loose moves. */
  delay: number;
};

function cubic(p0: Pt, p1: Pt, p2: Pt, p3: Pt, n: number, out: Pt[]) {
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    out.push({
      x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
      y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
    });
  }
}

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Soft halo sprite in one colour, drawn once and stamped per particle. */
function sprite(rgb: string, size = 64) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const x = c.getContext("2d")!;
  const g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, `rgba(${rgb}, 0.9)`);
  g.addColorStop(0.12, `rgba(${rgb}, 0.55)`);
  g.addColorStop(0.35, `rgba(${rgb}, 0.14)`);
  g.addColorStop(1, `rgba(${rgb}, 0)`);
  x.fillStyle = g;
  x.fillRect(0, 0, size, size);
  return c;
}

export function AboutFlow() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const groupLabelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const laneLabelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const chartLabelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const weekLabelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nodeLabelRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /** Set by the effect: plays a step in place while the story is held (after coming up from below). */
  const jumpRef = useRef<((step: number) => boolean) | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!track || !stage || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const sprites = Object.fromEntries(PALETTE.map((c) => [c, sprite(c)])) as Record<string, HTMLCanvasElement>;
    const fills = Object.fromEntries(PALETTE.map((c) => [c, `rgb(${c})`])) as Record<string, string>;

    let W = 0;
    let H = 0;
    let narrow = false;
    let strands: Strand[] = [];
    let sources: { x: number; y: number; group: number; col: number }[] = [];
    let node: Pt = { x: 0, y: 0 };
    let center: Pt = { x: 0, y: 0 };
    let particles: Particle[] = [];
    let laneY: number[] = [];
    let gridLeft = 0;
    let gridRight = 0;
    let chartLeft = 0;
    let chartW = 0;
    let chartMax = 0;
    let baseY = 0;
    let discR = 0;

    const layout = () => {
      W = stage.clientWidth;
      H = stage.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      narrow = W < 760;

      // ---- Strands ----
      const x0 = W * (narrow ? 0.04 : 0.07);
      const dx = W * (narrow ? 0.035 : 0.045);
      const xm = W * (narrow ? 0.34 : 0.38);
      node = { x: W * (narrow ? 0.8 : 0.71), y: H * 0.6 };
      center = { x: W * 0.5, y: H * 0.55 };
      const rowGap = Math.max(4, Math.min(8, H * 0.009));
      strands = [];
      sources = [];
      GROUPS.forEach((g, gi) => {
        const yc = H * g.y;
        const mid = (g.rows - 1) / 2;
        for (let c = 0; c < COLS; c++) {
          const spread = 1 - c * 0.16;
          for (let r = 0; r < g.rows; r++) {
            const start = { x: x0 + c * dx, y: yc + (r - mid) * rowGap * spread - c * 6 };
            const merge = { x: xm, y: yc + (r - mid) * 1.8 };
            const pts: Pt[] = [start];
            cubic(start, { x: start.x + W * 0.14, y: start.y }, { x: merge.x - W * 0.1, y: merge.y }, merge, 30, pts);
            cubic(
              merge,
              { x: merge.x + W * 0.17, y: merge.y },
              { x: node.x - W * 0.18, y: node.y + (r - mid) * 1.1 },
              { x: node.x, y: node.y + (r - mid) * 0.2 },
              56,
              pts,
            );
            strands.push({ pts, group: gi, col: c, offset: (r * 0.137 + c * 0.31 + gi * 0.17) % 1 });
            sources.push({ x: start.x, y: start.y, group: gi, col: c });
          }
        }
      });

      // ---- Particles, in world space centred on `center` (px, z towards the viewer) ----
      const rand = rng(11);
      const gauss = () => (rand() + rand() + rand() + rand() - 2) / 1.2;
      const R = Math.max(W, H) * 0.66;
      discR = Math.min(W, H * 1.6) * (narrow ? 0.46 : 0.42);
      laneY = LANES.map((_, k) => -H * 0.16 + k * H * (narrow ? 0.07 : 0.078));
      const grid = narrow ? 7 : 9;
      gridLeft = -W * (narrow ? 0.2 : 0.3);
      const gridCols = Math.floor((W * (narrow ? 0.62 : 0.66)) / grid);
      gridRight = gridLeft + (gridCols - 1) * grid;

      // Improve: a dot-matrix area chart under the readiness curve.
      chartLeft = -W * (narrow ? 0.36 : 0.32);
      const chartCols = Math.floor((W * (narrow ? 0.72 : 0.62)) / grid);
      chartW = (chartCols - 1) * grid;
      chartMax = H * (narrow ? 0.32 : 0.38);
      baseY = H * 0.18;
      const colRows = Array.from({ length: chartCols }, (_, c) =>
        Math.max(1, Math.floor((curve((c + 0.5) / chartCols) * chartMax) / grid) + 1),
      );
      const totalRows = colRows.reduce((a, b) => a + b, 0);
      const pickCol = () => {
        let r = rand() * totalRows;
        for (let c = 0; c < chartCols; c++) {
          r -= colRows[c];
          if (r <= 0) return c;
        }
        return chartCols - 1;
      };

      const count = narrow ? 620 : 1400;
      particles = Array.from({ length: count }, (_, i) => {
        const lane = i % LANES.length;
        // Burst: a sphere, denser towards the middle.
        const u = rand() * 2 - 1;
        const th = rand() * Math.PI * 2;
        const rr = R * (0.05 + 0.95 * Math.cbrt(rand()));
        const sq = Math.sqrt(1 - u * u);
        // Galaxy: a disc, dense in the core, thin at the rim.
        const dr = discR * Math.pow(rand(), 1.45);
        // Lanes: columns weighted to the right, three sub-rows per lane.
        const gc = Math.floor(Math.pow(rand(), 0.8) * gridCols);
        const laneT = gc / Math.max(1, gridCols - 1);
        const looseness = Math.pow(1 - laneT, 1.5);
        const sub = Math.floor(rand() * 3) - 1;
        const gx = gridLeft + gc * grid;
        // Chart: every column gets its top dot first, the rest are spread by column height.
        const cc = i < chartCols ? i : pickCol();
        const ct = cc / Math.max(1, chartCols - 1);
        const rows = colRows[cc];
        const edge = i < chartCols || rand() < 0.22;
        const row = edge ? rows - 1 : Math.floor(Math.pow(rand(), 0.7) * rows);
        const colX = chartLeft + cc * grid;
        return {
          lane,
          sphere: { x: Math.cos(th) * sq * rr, y: u * rr * 0.6, z: Math.min(600, Math.sin(th) * sq * rr) },
          disc: { r: dr, a: rand() * Math.PI * 2, y: gauss() * (6 + 30 * Math.pow(1 - dr / discR, 2)) },
          loose: { x: gx + gauss() * grid * 3, y: laneY[lane] + sub * 6 + gauss() * 20, z: gauss() * 40 },
          grid: { x: gx + gauss() * grid * 1.6 * looseness, y: laneY[lane] + sub * 6 + gauss() * 12 * looseness, z: 0 },
          line: { x: colX, y: baseY, z: 0 },
          chart: { x: colX, y: baseY - row * grid, z: 0 },
          laneT,
          ct,
          chartTint: CHART_TINTS[Math.min(CHART_TINTS.length - 1, Math.floor(ct * CHART_TINTS.length))],
          chartH: rows > 1 ? row / (rows - 1) : 1,
          edge,
          seed: rand() * Math.PI * 2,
          bright: 0.4 + rand() * 0.6,
          size: 0.8 + Math.pow(rand(), 3) * 1.6,
          delay: rand(),
        };
      });
      // Group by lane so the fill colour changes five times per frame in the lanes.
      particles.sort((a, b) => a.lane - b.lane);
    };

    // ---- Story clock ----
    let s = 0;
    let target = 0;
    let last = performance.now();
    const readTarget = () => {
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - stage.offsetHeight;
      const P = total > 0 ? (64 - rect.top) / total : 0;
      if (P < -0.3) target = 0;
      else target = Math.min(STEPS, Math.floor(clamp01(P) * STEPS * 0.9999) + 1);
    };

    // Pointer parallax, smoothed.
    let mx = 0;
    let my = 0;
    let pmx = 0;
    let pmy = 0;
    const onPointer = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
    };

    const place = (el: HTMLElement | null | undefined, x: number, y: number, opacity: number) => {
      if (!el) return;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      el.style.opacity = opacity.toFixed(3);
    };

    const draw = (time: number) => {
      const step = (k: number) => inOut(clamp01(s - k));
      const eDraw = step(0);
      const ePan = step(1);
      const eBurst = step(2);
      const eGal = step(3);
      const eLoose = step(4);
      const eSettle = step(5);
      const eLine = step(6);
      const eRise = step(7);
      const eLoop = step(8);
      const sec = time / 1000;
      pmx = lerp(pmx, mx, 0.05);
      pmy = lerp(pmy, my, 0.05);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      // ================= Strands (Build, and again in the loop) =================
      const strandAlpha = Math.max(eDraw * (1 - clamp01((s - 2) * 2.2)), eLoop);
      const pan = ePan * (1 - eLoop);
      const zoom = 1 + 0.14 * pan;
      const reveal = s >= 8 ? eLoop : eDraw;
      if (strandAlpha > 0.005) {
        const ox = (center.x - node.x) * pan + pmx * -14;
        const oy = (center.y - node.y) * pan + pmy * -8;
        ctx.save();
        ctx.translate(node.x + ox, node.y + oy);
        ctx.scale(zoom, zoom);
        ctx.translate(-node.x, -node.y);

        ctx.lineWidth = 0.8 / zoom;
        for (const f of strands) {
          const len = f.col === 0 ? f.pts.length : 31;
          const n = Math.max(2, Math.floor(len * reveal));
          const a = COL_ALPHA[f.col] * strandAlpha;
          const end = f.pts[n - 1];
          const g = ctx.createLinearGradient(f.pts[0].x, 0, end.x, 0);
          g.addColorStop(0, `rgba(${GROUPS[f.group].tint}, ${(a * 0.8).toFixed(3)})`);
          g.addColorStop(f.col === 0 ? 0.5 : 1, `rgba(${INK}, ${(f.col === 0 ? a * 0.8 : 0).toFixed(3)})`);
          if (f.col === 0) g.addColorStop(1, `rgba(${INK}, ${(a * 1.5).toFixed(3)})`);
          ctx.strokeStyle = g;
          ctx.beginPath();
          ctx.moveTo(f.pts[0].x, f.pts[0].y);
          for (let i = 1; i < n; i++) ctx.lineTo(f.pts[i].x, f.pts[i].y);
          ctx.stroke();
        }
        // Source columns: dotted, brightest at the front.
        for (const p of sources) {
          const a = (p.col === 0 ? 0.95 : COL_ALPHA[p.col] * 2.2) * reveal * strandAlpha;
          ctx.fillStyle = `rgba(${GROUPS[p.group].tint}, ${a.toFixed(3)})`;
          const r = p.col === 0 ? 1.1 : 0.8;
          ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
        }
        // Pulses: small lights running down the front strands.
        if (reveal > 0.9 && !reduceMotion) {
          const clock = sec * 0.08;
          for (const f of strands) {
            if (f.col > 0) continue;
            const t = (clock + f.offset) % 1;
            const q = f.pts[Math.floor(t * (f.pts.length - 1))];
            const a = Math.sin(Math.PI * t) * strandAlpha * 0.8;
            ctx.globalAlpha = a;
            ctx.drawImage(sprites[GROUPS[f.group].tint], q.x - 4, q.y - 4, 8, 8);
          }
          ctx.globalAlpha = 1;
        }
        ctx.restore();
      }

      // ================= The college node =================
      const nodeAlpha = Math.max(eDraw * (1 - eBurst), eLoop);
      // The college stays as a small light at the heart of the field until the lanes form.
      const coreAlpha = Math.max(eDraw * (1 - eLoose), eLoop);
      const nodeAt = {
        x: lerp(node.x, center.x, pan) + pmx * -14,
        y: lerp(node.y, center.y, pan) + pmy * -8,
      };
      if (coreAlpha > 0.005) {
        const breathe = reduceMotion ? 1 : 1 + 0.08 * Math.sin(sec * 1.6);
        ctx.globalAlpha = coreAlpha * 0.55;
        ctx.drawImage(sprites[INK], nodeAt.x - 22 * breathe, nodeAt.y - 22 * breathe, 44 * breathe, 44 * breathe);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `rgba(${INK}, ${coreAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.roundRect(nodeAt.x - 5, nodeAt.y - 5, 10, 10, 2.5);
        ctx.fill();
        ctx.globalCompositeOperation = "lighter";
      }

      // ================= Improve: warm glow, baseline and readiness curve =================
      const chartAlpha = eLine * (1 - eLoop);
      if (chartAlpha > 0.005) {
        const endX = center.x + chartLeft + chartW;
        const endY = center.y + baseY - chartMax * eRise;
        const glow = ctx.createRadialGradient(endX, endY, 0, endX, endY, W * 0.4);
        glow.addColorStop(0, `rgba(${AMBER}, ${(0.09 * eRise * chartAlpha).toFixed(3)})`);
        glow.addColorStop(1, `rgba(${AMBER}, 0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);

        const bx0 = center.x + chartLeft - 12;
        const by = center.y + baseY + 7;
        ctx.fillStyle = `rgba(${INK}, ${(0.18 * chartAlpha).toFixed(3)})`;
        ctx.fillRect(bx0, by, chartW + 24, 1);
        const kneeX = center.x + chartLeft + KNEE * chartW;
        ctx.fillStyle = `rgba(${INK}, ${(0.45 * chartAlpha * eRise).toFixed(3)})`;
        ctx.fillRect(kneeX - 0.5, by - 4, 1, 12);
      }

      // ================= Particles (Deliver → Improve) =================
      const partAlpha = clamp01((s - 2) * 4) * (1 - eLoop);
      if (partAlpha > 0.005) {
        // Camera: a slow sway while loose, tilted onto the galaxy disc, square-on for lanes and chart.
        const free = 1 - eLoose;
        const yaw = ((reduceMotion ? 0 : Math.sin(sec * 0.1) * 0.22) + pmx * 0.24) * free;
        const pitch = (0.5 * eGal + pmy * 0.12) * free;
        const cy = Math.cos(yaw);
        const sy = Math.sin(yaw);
        const cp = Math.cos(pitch);
        const sp = Math.sin(pitch);
        const F = 1100;
        let lastFill = "";
        for (let i = 0; i < particles.length; i++) {
          const q = particles[i];
          const d = q.delay;
          // Each move starts a little later per particle (random while loose, in a wave once ordered).
          const pBurst = outCubic(clamp01((s - 2) * 1.15 - d * 0.4));
          const pGal = inOut(clamp01((s - 3) * 1.3 - d * 0.3));
          const pLoose = inOut(clamp01((s - 4) * 1.35 - q.laneT * 0.35));
          const pSettle = inOut(clamp01((s - 5) * 1.35 - q.laneT * 0.35));
          const pLine = inOut(clamp01((s - 6) * 1.35 - (q.lane / 4) * 0.35));
          const pRise = inOut(clamp01((s - 7) * 1.6 - q.ct * 0.6));

          // Galaxy: differential rotation, faster in the core.
          const spin = reduceMotion ? 0 : (sec * 0.22) / (0.35 + q.disc.r / discR);
          const ang = q.disc.a + spin;
          const drift = reduceMotion ? 0 : (1 - pSettle) * (1 - pGal * 0.5) * 9;

          let x = q.sphere.x * pBurst + Math.sin(sec * 0.42 + q.seed) * drift;
          let y = q.sphere.y * pBurst + Math.cos(sec * 0.37 + q.seed * 1.3) * drift;
          let z = q.sphere.z * pBurst;
          x = lerp(x, Math.cos(ang) * q.disc.r, pGal);
          y = lerp(y, q.disc.y, pGal);
          z = lerp(z, Math.sin(ang) * q.disc.r, pGal);
          x = lerp(x, q.loose.x, pLoose);
          y = lerp(y, q.loose.y, pLoose);
          z = lerp(z, q.loose.z, pLoose);
          x = lerp(x, q.grid.x, pSettle);
          y = lerp(y, q.grid.y, pSettle);
          z = lerp(z, q.grid.z, pSettle);
          x = lerp(x, q.line.x, pLine);
          y = lerp(y, q.line.y, pLine);
          x = lerp(x, q.chart.x, pRise);
          y = lerp(y, q.chart.y, pRise);

          // Rotate (yaw, then pitch) and project.
          const x1 = x * cy + z * sy;
          const z1 = -x * sy + z * cy;
          const y2 = y * cp - z1 * sp;
          const z2 = y * sp + z1 * cp;
          const k = F / (F - Math.min(z2, 760));
          const px = center.x + x1 * k;
          const py = center.y + y2 * k;
          if (px < -40 || px > W + 40 || py < -40 || py > H + 40) continue;

          const color = pRise > 0.5 ? q.chartTint : LANES[q.lane].color;
          // Star-like while loose (halo, twinkle, depth blur); crisp dots once in lanes.
          const star = 1 - pLoose;
          const inLanes = pLoose * (1 - pLine);
          const steady = lerp(1, 0.5 + 0.5 * q.laneT, pSettle * inLanes);
          const twinkle = reduceMotion ? 1 : 1 - (0.32 * star + 0.18 * (1 - steady)) * (0.5 + 0.5 * Math.sin(sec * 1.8 + q.seed * 5));
          const chartShape = lerp(1, q.edge ? 1.2 : 0.18 + 0.55 * q.chartH, pRise);
          const a = partAlpha * lerp(q.bright, 1, pLoose) * twinkle * steady * chartShape;
          const blur = clamp01(Math.abs(z2) / 620) * star;

          if (star > 0.01) {
            const r = (q.size * 3.2 + blur * 9) * k;
            ctx.globalAlpha = a * star * (0.3 + 0.3 * q.bright) * (1 - blur * 0.4);
            ctx.drawImage(sprites[color], px - r, py - r, r * 2, r * 2);
          }
          const core = lerp(q.size * k, q.edge && pRise > 0.5 ? 2.1 : 1.7, pLoose) * (1 + blur * 0.4);
          if (fills[color] !== lastFill) {
            lastFill = fills[color];
            ctx.fillStyle = lastFill;
          }
          ctx.globalAlpha = Math.min(1, a * (1 - blur * 0.75));
          ctx.fillRect(px - core / 2, py - core / 2, core, core);
        }
        ctx.globalAlpha = 1;
      }

      // The readiness curve: a glowing line along the chart's top edge, growing with the wave.
      if (chartAlpha > 0.005 && eRise > 0.001) {
        const N = 120;
        const pts: Pt[] = [];
        for (let i = 0; i <= N; i++) {
          const u = i / N;
          const lr = inOut(clamp01((s - 7) * 1.6 - u * 0.6));
          pts.push({ x: center.x + chartLeft + u * chartW, y: center.y + baseY - curve(u) * chartMax * lr });
        }
        const g = ctx.createLinearGradient(pts[0].x, 0, pts[N].x, 0);
        CHART_TINTS.forEach((c, i) => g.addColorStop(i / (CHART_TINTS.length - 1), `rgba(${c}, 1)`));
        ctx.strokeStyle = g;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        for (const [w, al] of [
          [7, 0.07],
          [3, 0.16],
          [1.2, 0.85],
        ] as const) {
          ctx.lineWidth = w;
          ctx.globalAlpha = al * chartAlpha * clamp01(eRise * 3);
          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y - 1);
          for (let i = 1; i <= N; i++) ctx.lineTo(pts[i].x, pts[i].y - 1);
          ctx.stroke();
        }
        const endRise = inOut(clamp01((s - 7) * 1.6 - 0.6));
        if (endRise > 0.02) {
          const e = pts[N];
          ctx.globalAlpha = endRise * chartAlpha * 0.7;
          ctx.drawImage(sprites[AMBER], e.x - 18, e.y - 18, 36, 36);
          ctx.globalAlpha = endRise * chartAlpha;
          ctx.globalCompositeOperation = "source-over";
          ctx.fillStyle = `rgb(${INK})`;
          ctx.beginPath();
          ctx.roundRect(e.x - 4, e.y - 5, 8, 8, 2);
          ctx.fill();
          ctx.globalCompositeOperation = "lighter";
        }
        ctx.globalAlpha = 1;
      }

      ctx.globalCompositeOperation = "source-over";

      // ================= HTML overlays =================
      GROUPS.forEach((g, gi) => {
        const ox = (center.x - node.x) * pan;
        const yc = H * g.y - ((g.rows - 1) / 2) * Math.max(4, Math.min(8, H * 0.009)) - 28;
        const x = node.x + ox + (W * (narrow ? 0.04 : 0.07) - node.x) * zoom;
        const y = node.y + (center.y - node.y) * pan + (yc - node.y) * zoom;
        place(groupLabelRefs.current[gi], x, y, reveal * strandAlpha);
      });
      if (nodeLabelRef.current) {
        if (narrow) {
          // Phones: the label sits centred under the node, kept inside the stage.
          const w = nodeLabelRef.current.offsetWidth;
          const lx = Math.max(12, Math.min(W - w - 12, nodeAt.x - w / 2));
          place(nodeLabelRef.current, lx, nodeAt.y + 16, nodeAlpha);
        } else place(nodeLabelRef.current, nodeAt.x + 18, nodeAt.y - 10, nodeAlpha);
        nodeLabelRef.current.toggleAttribute("data-narrow", narrow);
        nodeLabelRef.current.toggleAttribute("data-better", eLoop > 0.5);
      }
      const win = (a: number, b: number, c: number, d: number) => clamp01((s - a) / (b - a)) * (1 - clamp01((s - c) / (d - c)));
      const captions = [
        win(0.1, 0.6, 1.3, 1.7),
        win(1.8, 2.3, 3.9, 4.3),
        win(4.3, 4.7, 5.9, 6.3),
        win(6.4, 6.9, 8.1, 8.4),
        clamp01((s - 8.4) / 0.5),
      ];
      titleRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = captions[i].toFixed(3);
        el.style.transform = `translateY(${((1 - captions[i]) * 8).toFixed(1)}px)`;
      });
      const lanesShown = eLoose * (1 - eLine);
      laneLabelRefs.current.forEach((el, k) =>
        place(el, W * (narrow ? 0.04 : 0.08), center.y + laneY[k] - 8, lanesShown),
      );
      const weekY = center.y + laneY[0] - 34;
      place(weekLabelRefs.current[0], center.x + gridLeft, weekY, eSettle * (1 - eLine));
      place(weekLabelRefs.current[1], center.x + gridRight, weekY, eSettle * (1 - eLine));

      const by = center.y + baseY;
      const left = center.x + chartLeft;
      const labelIn = (a: number) => clamp01(a) * (1 - eLoop);
      const endRise = inOut(clamp01((s - 7) * 1.6 - 0.6));
      // Phones: the axis row drops below "TechCity begins" so the two don't overlap.
      const axisY = by + (narrow ? 42 : 18);
      place(chartLabelRefs.current[0], left, by - curve(0) * chartMax - (narrow ? 36 : 30), labelIn(eLine * 1.2));
      place(chartLabelRefs.current[1], left + KNEE * chartW, by + 18, labelIn(eRise * 1.6));
      place(chartLabelRefs.current[2], left + chartW - (narrow ? 0 : 16), by - chartMax * endRise - (narrow ? 22 : 10), labelIn(endRise));
      place(chartLabelRefs.current[3], left, axisY, labelIn(eLine));
      place(chartLabelRefs.current[4], left + chartW, axisY, labelIn(eLine));

      const phase = s < 1.6 || s > 8.6 ? 0 : s < 6.4 ? 1 : 2;
      tabRefs.current.forEach((el, i) => el?.toggleAttribute("data-active", i === phase));
    };

    let raf = 0;
    let visible = false;
    const frame = (time: number) => {
      const dt = Math.min(0.1, (time - last) / 1000);
      last = time;
      if (!frozen) readTarget();
      const diff = target - s;
      if (reduceMotion) s = target;
      else if (diff !== 0) {
        // Critically damped approach: quick to start, soft to settle, never overshoots.
        // Capped so a big scroll jump still plays through each step.
        const v = diff * (1 - Math.exp(-dt * 2.2));
        const cap = dt * 1.9;
        s += Math.max(-cap, Math.min(cap, v));
        if (Math.abs(target - s) < 0.0005) s = target;
      }
      draw(time);
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    // Coming back up from below, the story shouldn't replay in reverse. On entering from
    // below, collapse the pinned track to one screen (scrolling by the same amount so
    // nothing visibly moves) and hold the finished state, so the section simply passes.
    // Once it's fully below the viewport again, restore it for the next pass down.
    let frozen = false;
    // Where the section last was while out of view: "above" means the reader was below it.
    let lastSide: "above" | "below" | null = null;
    const freeze = () => {
      const before = track.offsetHeight;
      track.style.height = `${stage.offsetHeight}px`;
      const delta = before - track.offsetHeight;
      if (delta > 0) window.scrollBy({ top: -delta, behavior: "instant" });
      frozen = true;
      s = target = STEPS;
      draw(performance.now());
    };
    const release = () => {
      track.style.height = "";
      frozen = false;
      s = target = 0;
    };
    const checkSide = () => {
      const r = track.getBoundingClientRect();
      if (r.bottom <= 0) lastSide = "above";
      else if (r.top >= window.innerHeight) {
        lastSide = "below";
        if (frozen) release();
      } else if (!frozen && lastSide === "above") freeze();
    };
    window.addEventListener("scroll", checkSide, { passive: true });
    checkSide();

    jumpRef.current = (step) => {
      if (!frozen) return false;
      target = step; // play in place: the track is collapsed, so there's nothing to scroll
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
      return true;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(track);
    const ro = new ResizeObserver(() => {
      layout();
      draw(performance.now());
    });
    ro.observe(stage);
    stage.addEventListener("pointermove", onPointer);
    layout();
    readTarget();
    draw(performance.now());

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      stage.removeEventListener("pointermove", onPointer);
      jumpRef.current = null;
      window.removeEventListener("scroll", checkSide);
      track.style.height = "";
    };
  }, []);

  const goTo = (step: number) => {
    if (jumpRef.current?.(step)) return;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const top = track.getBoundingClientRect().top + window.scrollY - 64;
    const total = track.offsetHeight - stage.offsetHeight;
    window.scrollTo({ top: top + (step / STEPS) * total, behavior: "smooth" });
  };

  return (
    <section id="mission" aria-label="Our mission" className="mission-dark scroll-mt-16">
      <div ref={trackRef} className="about-flow relative">
        <div ref={stageRef} className="about-flow__stage sticky top-16 overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />

          <div className="about-flow__titles">
            {CAPTIONS.map((line, i) => (
              <p
                key={line}
                ref={(el) => {
                  titleRefs.current[i] = el;
                }}
                className="about-flow__caption"
              >
                {line}
              </p>
            ))}
          </div>

          {GROUPS.map((g, i) => (
            <span
              key={g.label}
              ref={(el) => {
                groupLabelRefs.current[i] = el;
              }}
              className="about-flow__tag"
            >
              {g.label}
            </span>
          ))}
          <div ref={nodeLabelRef} className="about-flow__node">
            <span className="about-flow__node-a">Your college</span>
            <span className="about-flow__node-b">Your college, but better</span>
          </div>
          {LANES.map((l, k) => (
            <span
              key={l.label}
              ref={(el) => {
                laneLabelRefs.current[k] = el;
              }}
              className="about-flow__tag about-flow__lane"
              style={{ ["--dot" as string]: `rgb(${l.color})` }}
            >
              {l.label}
            </span>
          ))}
          {WEEK_LABELS.map((w, i) => (
            <span
              key={w}
              ref={(el) => {
                weekLabelRefs.current[i] = el;
              }}
              className="about-flow__axis"
              data-align={i === 1 ? "end" : undefined}
            >
              {w}
            </span>
          ))}
          {CHART_LABELS.map((c, i) => (
            <span
              key={c}
              ref={(el) => {
                chartLabelRefs.current[i] = el;
              }}
              className={i < 3 ? "about-flow__chart-label" : "about-flow__axis"}
              data-align={i === 1 ? "center" : i === 2 || i === 4 ? "end" : undefined}
              data-strong={i === 2 || undefined}
            >
              {c}
            </span>
          ))}
          <nav className="about-flow__pill" aria-label="Our mission">
            <div className="about-flow__tabs">
              {PHASES.map((ph, i) => (
                <button
                  key={ph.label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => goTo(ph.step)}
                >
                  {ph.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
