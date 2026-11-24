import type { ReactNode } from "react";

/*
 * The 404 picture: the TechCity stack (line art from components/tech-stack.tsx,
 * styles `.tech-stack` / `.hl-*` in globals.css) with one plate missing. Where
 * it should be, a dashed outline floats, its edge marching, "404" on its face.
 * Motion is CSS only (not-found.css) and stops with reduced motion.
 */

const W = 260; // plate size, in plate units
const T = 12; // plate thickness, in px
const CX = 245;
const ISO = "matrix(0.866 0.5 -0.866 0.5 0 0)";
const BAR_Y = W - 42;
const pts = (...p: [number, number][]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/** A solid plate: sides, a framed face with quiet filler, and its status bar. */
function Plate({ y, name, sub, children }: { y: number; name: string; sub: string; children: ReactNode }) {
  return (
    <g className="hl-layer" data-dim="" style={{ transform: `translate(${CX}px, ${y}px)` }}>
      <polygon points={pts([-225, 130], [0, 260], [0, 260 + T], [-225, 130 + T])} className="hl-face hl-face--dark hl-edge" />
      <polygon points={pts([0, 260], [225, 130], [225, 130 + T], [0, 260 + T])} className="hl-face hl-face--dark hl-edge" />
      <g transform={ISO}>
        <rect x="0" y="0" width={W} height={W} className="hl-face hl-edge" />
        <rect x="14" y="14" width={W - 28} height={W - 28} className="hl-lo" />
        {children}
        <line x1="14" y1={BAR_Y} x2={W - 14} y2={BAR_Y} className="hl-lo" />
        <text x="24" y={W - 22} className="hl-type">
          <tspan className="hl-type-name">{name}</tspan>
          <tspan dx="8">{sub}</tspan>
        </text>
      </g>
    </g>
  );
}

export function LostStack() {
  return (
    <svg viewBox="0 0 490 662" className="tech-stack nf-stack" aria-hidden="true">
      {/* Bottom plate: a page of cards. */}
      <Plate y={390} name="PROGRAMS" sub="FOR COLLEGES">
        {[0, 1].map((r) =>
          [0, 1].map((c) => (
            <g key={`${r}-${c}`}>
              <rect x={24 + c * 110} y={26 + r * 92} width="102" height="82" rx="3" className="hl-mid" />
              <rect x={32 + c * 110} y={34 + r * 92} width="24" height="24" rx="3" className="hl-pit hl-mid" />
              <line x1={32 + c * 110} y1={72 + r * 92} x2={96 + c * 110} y2={72 + r * 92} className="hl-mid hl-thick" />
              <line x1={32 + c * 110} y1={86 + r * 92} x2={112 + c * 110} y2={86 + r * 92} className="hl-lo hl-thick" />
            </g>
          )),
        )}
      </Plate>

      {/* The missing plate: a dashed outline, floating where it should be. */}
      <g className="nf-ghost-wrap" style={{ transform: `translate(${CX}px, 200px)` }}>
        <g className="nf-ghost">
          <polygon points={pts([-225, 130], [0, 260], [0, 260 + T], [-225, 130 + T])} className="nf-dash" />
          <polygon points={pts([0, 260], [225, 130], [225, 130 + T], [0, 260 + T])} className="nf-dash" />
          <g transform={ISO}>
            <rect x="0" y="0" width={W} height={W} className="nf-dash nf-face" />
            <text x={W / 2} y="150" textAnchor="middle" className="nf-404">
              404
            </text>
            <line x1="14" y1={BAR_Y} x2={W - 14} y2={BAR_Y} className="nf-dash" />
            <text x="24" y={W - 22} className="hl-type nf-type">
              <tspan className="hl-type-name">MISSING</tspan>
              <tspan dx="8">PAGE NOT FOUND</tspan>
            </text>
          </g>
        </g>
      </g>

      {/* Top plate: home. */}
      <Plate y={10} name="HOME" sub="TECHCITY SKILLS">
        <rect x="24" y="24" width="212" height="18" rx="3" className="hl-pit hl-mid" />
        <line x1="24" y1="66" x2="168" y2="66" className="hl-mid hl-bar" />
        <line x1="24" y1="84" x2="132" y2="84" className="hl-mid hl-bar" />
        <line x1="24" y1="108" x2="196" y2="108" className="hl-lo hl-thick" />
        <line x1="24" y1="122" x2="176" y2="122" className="hl-lo hl-thick" />
        <rect x="24" y="146" width="74" height="24" rx="12" className="hl-face hl-acc" />
        <rect x="106" y="146" width="74" height="24" rx="12" className="hl-mid" />
      </Plate>
    </svg>
  );
}
