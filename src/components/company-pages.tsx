import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/icons";
import { InView } from "@/components/in-view";
import { Logo } from "@/components/logo";
import { ProductLogo } from "@/components/product-logo";
import { directors, trainers, TRACK_TINT } from "@/lib/company";
import type { Product } from "@/lib/products";

/*
 * Pictures and cards for the /company pages. Each page's hero picture is a
 * different kind (a diagram, a collection, one large quote, a rail, a stack of
 * cards), so the pages share a frame without repeating each other.
 */

/* ------------------------------------------------ story: the gap */

const CAMPUS = ["Lecture", "Exam", "Marks"];
const TEAM = ["Design", "Review", "Ship"];

/**
 * Story hero: the campus's three steps and the team's three steps, with the
 * gap between them and TechCity bridging it once the picture is in view.
 */
export function GapDiagram() {
  return (
    <InView className="cp-gap" threshold={0.3}>
      <div className="cp-gap__side">
        <p className="cp-gap__label">Campus</p>
        {CAMPUS.map((step, i) => (
          <span key={step} className="cp-gap__step" style={{ "--i": i } as CSSProperties}>
            <i aria-hidden="true">{i + 1}</i>
            {step}
          </span>
        ))}
      </div>
      <div className="cp-gap__middle" aria-hidden="true">
        <span className="cp-gap__band">Gap</span>
        <span className="cp-gap__bridge">
          <Logo height={16} />
        </span>
      </div>
      <div className="cp-gap__side cp-gap__side--team">
        <p className="cp-gap__label">Team</p>
        {TEAM.map((step, i) => (
          <span key={step} className="cp-gap__step" style={{ "--i": i + 3 } as CSSProperties}>
            <i aria-hidden="true">{i + 1}</i>
            {step}
          </span>
        ))}
      </div>
    </InView>
  );
}

/** One problem and its answer: the problem on white, the answer on a tint, a from → to pair between. */
export function ProblemRow({
  index,
  problem,
  detail,
  answer,
  how,
  from,
  to,
}: {
  index: number;
  problem: string;
  detail: string;
  answer: string;
  how: string;
  from: string[];
  to: string[];
}) {
  return (
    <article className="cp-problem">
      <div className="cp-problem__half">
        <p className="cp-kicker">Problem 0{index + 1}</p>
        <h3 className="mt-4 text-[22px] leading-[1.25] font-normal tracking-[-0.02em] text-text">{problem}</h3>
        <p className="mt-3 text-[15px] leading-[1.65] text-text-muted">{detail}</p>
        <span className="cp-chip cp-chip--from">
          <strong>{from[0]}</strong> {from[1]}
        </span>
      </div>
      <div className="cp-problem__half cp-problem__half--answer">
        <p className="cp-kicker cp-kicker--accent">How we answer it</p>
        <h3 className="mt-4 text-[22px] leading-[1.25] font-normal tracking-[-0.02em] text-text">{answer}</h3>
        <p className="mt-3 text-[15px] leading-[1.65] text-text-muted">{how}</p>
        <span className="cp-chip cp-chip--to">
          <strong>{to[0]}</strong> {to[1]}
        </span>
      </div>
    </article>
  );
}

/* ------------------------------------------------ people */

/** A round avatar with initials, tinted by track. */
export function Avatar({ initials, tint, size = 44 }: { initials: string; tint: string; size?: number }) {
  return (
    <span className="cp-avatar" style={{ "--tint": tint, width: size, height: size, fontSize: size * 0.32 } as CSSProperties} aria-hidden="true">
      {initials}
    </span>
  );
}

/**
 * Team hero: the two directors large in the middle, the seven trainers around
 * them, each ringed in their track's colour; they rise in, directors first.
 */
export function TeamCluster() {
  return (
    <InView className="cp-cluster" threshold={0.3}>
      <div className="cp-cluster__directors">
        {directors.map((d, i) => (
          <span key={d.name} className="cp-cluster__person" style={{ "--i": i } as CSSProperties}>
            <Avatar initials={d.initials} tint="var(--g-navy)" size={84} />
            <span className="cp-cluster__name">{d.name.split(" ")[0]}</span>
          </span>
        ))}
      </div>
      <div className="cp-cluster__trainers">
        {trainers.map((t, i) => (
          <span key={t.name} className="cp-cluster__person" style={{ "--i": i + 2 } as CSSProperties}>
            <Avatar initials={t.initials} tint={TRACK_TINT[t.track]} size={56} />
            <span className="cp-cluster__name">{t.name.split(" ")[0]}</span>
          </span>
        ))}
      </div>
      <div className="cp-cluster__legend">
        {(Object.keys(TRACK_TINT) as (keyof typeof TRACK_TINT)[]).map((track) => (
          <span key={track}>
            <i style={{ background: TRACK_TINT[track] }} aria-hidden="true" />
            {track}
          </span>
        ))}
      </div>
    </InView>
  );
}

/* ------------------------------------------------ roadmap */

/**
 * Roadmap hero: the five products on one rail (the single account), live ones
 * lit, coming ones outlined; each rises in along the rail.
 */
export function ProductRail({ products }: { products: Product[] }) {
  return (
    <InView className="cp-rail" threshold={0.3}>
      <span className="cp-rail__line" aria-hidden="true" />
      {products.map((p, i) => (
        <div key={p.id} className="cp-rail__item" data-live={p.status === "Live" || undefined} style={{ "--i": i } as CSSProperties}>
          <ProductLogo id={p.id} size={44} />
          <span className="min-w-0">
            <span className="block text-[15px] leading-[1.3] font-medium text-text">{p.name}</span>
            <span className="block text-[13px] leading-[1.4] text-text-muted">{p.category}</span>
          </span>
          <span className="cp-status" data-live={p.status === "Live" || undefined}>
            {p.status}
          </span>
        </div>
      ))}
    </InView>
  );
}

/* ------------------------------------------------ careers */

export type Role = { icon: IconName; title: string; detail: string };

/** Careers hero: the roles we hire for, as a loose, offset stack of cards. */
export function RoleStack({ roles }: { roles: Role[] }) {
  return (
    <InView className="cp-roles" threshold={0.3}>
      {roles.map((r, i) => (
        <div key={r.title} className="cp-roles__card" style={{ "--i": i } as CSSProperties}>
          <span className="bento-icon" aria-hidden="true">
            <Icon name={r.icon} size={18} />
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] leading-[1.3] font-medium text-text">{r.title}</span>
            <span className="block text-[13px] leading-[1.45] text-text-muted">{r.detail}</span>
          </span>
        </div>
      ))}
    </InView>
  );
}
