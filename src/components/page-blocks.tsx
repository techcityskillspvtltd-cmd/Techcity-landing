import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { HoverArrow } from "@/components/hover-arrow";
import { Icon, type IconName } from "@/components/icons";
import { InView } from "@/components/in-view";
import { NumberTicker } from "@/components/number-ticker";
import { container } from "@/lib/layout";

/*
 * Shared blocks for the inner pages (partners and company), in the home
 * page's language: guide-line container, run-in headlines (dark lead, muted
 * continuation), ruled grids, the brand ramp. Each page brings its own hero
 * picture so the pages read as siblings, not copies. Styles: `.pp-*` in
 * globals.css.
 */

/* ------------------------------------------------------------------ hero */

export type HeroStat = { value: string; label: string };

/**
 * The inner-page hero: breadcrumb, run-in headline, a short paragraph and
 * actions on the left; the page's own picture on the right (below on phones);
 * an optional ruled row of rolling numbers underneath.
 */
export function PageHero({
  crumb = { label: "Partners", href: "/#partners" },
  eyebrow,
  lead,
  rest,
  body,
  stats,
  picture,
  actions,
}: {
  crumb?: { label: string; href: string };
  eyebrow: string;
  lead: string;
  rest: string;
  body: string;
  stats?: HeroStat[];
  picture: ReactNode;
  /** Defaults to "Partner with us" and "See our programs". */
  actions?: ReactNode;
}) {
  return (
    <section className="pp-hero mt-16 border-t border-line">
      <div className={`${container} border-x border-b border-line`}>
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="flex flex-col px-5 pt-14 pb-10 sm:px-10 sm:pt-20 lg:pb-16">
            <p className="pp-eyebrow">
              <Link href={crumb.href} className="hover:text-text">
                {crumb.label}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-text">{eyebrow}</span>
            </p>
            <h1 className="mt-6 text-[clamp(32px,4vw,52px)] leading-[1.08] font-normal tracking-[-0.035em] text-text">
              {lead} <span className="text-text-muted">{rest}</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-[17px] leading-[1.6] text-text-muted">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {actions ?? (
                <>
                  <a href="#contact" className="btn btn-primary btn-lg">
                    Partner with us
                    <HoverArrow />
                  </a>
                  <Link href="/programs" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
                    See our programs
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="pp-hero__picture">{picture}</div>
        </div>
        {stats && (
          <InView className="pp-stats" threshold={0.4}>
            {stats.map((s, i) => (
              <div key={s.label} className="pp-stats__cell">
                <p className="pp-stats__num">
                  <NumberTicker value={s.value} delay={i * 0.12} />
                </p>
                <p className="mt-2 text-[14px] leading-[1.5] text-text-muted">{s.label}</p>
              </div>
            ))}
          </InView>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------- section heading */

export function SectionHead({ lead, rest, children }: { lead: string; rest?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 px-5 pt-14 pb-10 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pt-16 sm:pb-12">
      <h2 className="max-w-[760px] text-[clamp(24px,2.6vw,32px)] leading-[1.25] font-normal tracking-[-0.02em] text-text">
        {lead} {rest && <span className="text-text-muted">{rest}</span>}
      </h2>
      {children}
    </div>
  );
}

/* --------------------------------------------- steps and tiles */

export type Step = { icon: IconName; title: string; body: string };

/** A ruled row of numbered steps; a bar fills along each, cool to warm, in order. */
export function Steps({ steps }: { steps: Step[] }) {
  const ramp = ["var(--g-mist)", "var(--g-lavender)", "var(--g-periwinkle)", "var(--g-honey)", "var(--g-amber)"];
  return (
    <InView className="pp-steps" threshold={0.25} style={{ "--n": steps.length } as CSSProperties}>
      {steps.map((s, i) => (
        <article
          key={s.title}
          className="pp-steps__cell"
          style={{ "--i": i, "--from": ramp[Math.max(0, i - 1)], "--to": ramp[i] ?? "var(--g-amber)" } as CSSProperties}
        >
          <span className="about-cell__bar" aria-hidden="true" />
          <div className="flex items-center justify-between">
            <span className="bento-icon" aria-hidden="true">
              <Icon name={s.icon} size={18} />
            </span>
            <span className="text-[13px] font-medium text-[var(--g-indigo)] tabular-nums">0{i + 1}</span>
          </div>
          <h3 className="mt-10 text-[17px] leading-[1.3] font-medium tracking-[-0.01em] text-text">{s.title}</h3>
          <p className="mt-2 text-[14px] leading-[1.6] text-text-muted">{s.body}</p>
        </article>
      ))}
    </InView>
  );
}

export type Tile = { icon: IconName; lead: string; body: string; href?: string };

/** Ruled grid of icon tiles with run-in copy; tiles with an href are links. `cols`: columns on wide screens (default: one per tile). */
export function TileGrid({ tiles, cols }: { tiles: Tile[]; cols?: number }) {
  return (
    <div className="pp-tiles" style={{ "--n": cols ?? tiles.length } as CSSProperties}>
      {tiles.map((t) => {
        const inner = (
          <>
            <span className="bento-icon" aria-hidden="true">
              <Icon name={t.icon} size={18} />
            </span>
            <p className="mt-8 text-[17px] leading-[1.45] tracking-[-0.01em]">
              <span className="font-medium text-text">{t.lead}</span>{" "}
              <span className="text-text-muted">{t.body}</span>
            </p>
            {t.href && (
              <span className="mt-auto inline-flex items-center pt-6 text-[14px] font-medium text-accent">
                Learn more
                <HoverArrow />
              </span>
            )}
          </>
        );
        return t.href ? (
          <Link key={t.lead} href={t.href} className="pp-tiles__cell group">
            {inner}
          </Link>
        ) : (
          <div key={t.lead} className="pp-tiles__cell">
            {inner}
          </div>
        );
      })}
    </div>
  );
}

