"use client";

import { HoverArrow } from "@/components/hover-arrow";

/*
 * Parts for the careers page (app/(partners)/company/careers), after
 * stripe.com/careers: the artwork band and
 * the role rows. Styles: careers-page.css.
 */

/**
 * The artwork band: wide brand ribbons over a deep navy field, swaying slowly,
 * in place of Stripe's painting. Purely decorative.
 */
export function CareersArt() {
  // Each ribbon: top edge from (x=-50, y0) to (x=1250, y1), bending through c1/c2, t thick.
  const ribbons = [
    { y0: 330, c1: 260, c2: 120, y1: 40, t0: 60, t1: 150, from: "#3B47C4", mid: "#6B7BE6", to: "#A5B1F5", o: 0.9 },
    { y0: 470, c1: 360, c2: 330, y1: 150, t0: 50, t1: 120, from: "#1C257D", mid: "#F59E0B", to: "#FCD38A", o: 1 },
    { y0: 210, c1: 90, c2: 420, y1: 380, t0: 30, t1: 80, from: "#A5B1F5", mid: "#FFF1D6", to: "#F59E0B", o: 0.85 },
  ];
  const edge = (r: (typeof ribbons)[number], k = 0) =>
    `M-50 ${r.y0 + k} C 350 ${r.c1 + k}, 850 ${r.c2 + k}, 1250 ${r.y1 + k}`;
  const shape = (r: (typeof ribbons)[number]) =>
    `${edge(r)} L1250 ${r.y1 + r.t1} C 850 ${r.c2 + r.t1}, 350 ${r.c1 + r.t0}, -50 ${r.y0 + r.t0} Z`;

  return (
    <div className="cr-art" aria-hidden="true">
      <span className="cr-art__glow cr-art__glow--a" />
      <span className="cr-art__glow cr-art__glow--b" />
      <svg viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice" className="cr-art__svg" focusable="false">
        <defs>
          {ribbons.map((r, i) => (
            <linearGradient key={i} id={`cr-rb-${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={r.from} />
              <stop offset="0.5" stopColor={r.mid} />
              <stop offset="1" stopColor={r.to} />
            </linearGradient>
          ))}
        </defs>
        {ribbons.map((r, i) => (
          <g key={i} className="cr-art__ribbon" opacity={r.o}>
            <path d={shape(r)} fill={`url(#cr-rb-${i})`} />
            <g fill="none" stroke="#FFFFFF" strokeOpacity="0.35">
              {[0.25, 0.5, 0.75].map((k) => (
                <path key={k} d={edge(r, ((r.t0 + r.t1) / 2) * k)} vectorEffect="non-scaling-stroke" />
              ))}
            </g>
          </g>
        ))}
      </svg>
      <span className="cr-art__grain" />
    </div>
  );
}

export type CareerRole = { value: string; title: string; detail: string; where: string };

/** One role as a ruled row; the whole row picks the role in the form below. */
export function RoleRow({ role }: { role: CareerRole }) {
  return (
    <a href={`#apply-${role.value}`} className="cr-role group">
      <span className="min-w-0">
        <span className="block text-[17px] font-medium tracking-[-0.01em] text-text">{role.title}</span>
        <span className="mt-1 block text-[14px] text-text-muted">{role.detail}</span>
      </span>
      <span className="cr-role__where">{role.where}</span>
      <span className="cr-role__cta">
        Apply
        <HoverArrow />
      </span>
    </a>
  );
}
