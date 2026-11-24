/* eslint-disable @next/next/no-img-element -- local, pre-trimmed logo files */
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { HoverArrow } from "@/components/hover-arrow";
import { SectionHead } from "@/components/page-blocks";
import { PartnerFilters, type DirectoryEntry, type DirectoryFilter } from "@/components/partner-filters";
import { container } from "@/lib/layout";
import "./partner-directory.css";

/*
 * The partner directory: /partners/colleges and /partners/industries share it,
 * after devin.ai/customers, in the shared inner-page language (see PageHero in
 * page-blocks): the hero with a moving field of logo tiles on the right; under
 * it, a section heading, filter pills and a grid of cards, each with the
 * partner's logo and a few lines below.
 */

export type { DirectoryEntry, DirectoryFilter };

/* ---------------------------------------------------------- logo field */

const COLS = 12;
const ROWS = 3;
/** Each column sits a little higher or lower than its neighbour. */
const OFFSETS = [0, -44, 28, -16, 40, -32, 12, -48, 24, -8, 36, -24];

/**
 * Spread the logos over a COLS × ROWS board, one per column where possible,
 * on rows that zig-zag, so lit tiles never line up in a row or a column.
 */
function board(logos: string[]) {
  const cells: (string | null)[][] = Array.from({ length: COLS }, () => Array(ROWS).fill(null));
  logos.forEach((src, i) => {
    const col = Math.floor((i * COLS) / logos.length) % COLS;
    let row = (i * 2 + (col % 2)) % ROWS;
    for (let k = 0; k < ROWS && cells[col][row]; k++) row = (row + 1) % ROWS;
    if (!cells[col][row]) cells[col][row] = src;
  });
  return cells;
}

/**
 * The hero picture: a dark board of rounded tiles, most of them empty, the
 * partners' logos lit among them. Columns sit at different heights and bob
 * slowly; the whole board drifts sideways in a seamless loop, fading at both
 * edges. Paused for reduced motion.
 */
export function LogoField({ logos }: { logos: { src: string; name: string }[] }) {
  const cells = board(logos.map((l) => l.src));
  const names = new Map(logos.map((l) => [l.src, l.name]));
  const columns = (copy: number) =>
    cells.map((col, c) => (
      <div
        key={`${copy}-${c}`}
        className="pd-field__col"
        style={{ "--y": `${OFFSETS[c]}px`, "--bob": `${7 + (c % 4) * 1.5}s`, "--delay": `${-c * 0.9}s` } as CSSProperties}
      >
        {col.map((src, r) => (
          <span key={r} className="pd-field__tile" data-lit={src ? "" : undefined}>
            {src && <img src={src} alt={copy === 0 ? (names.get(src) ?? "") : ""} decoding="async" />}
          </span>
        ))}
      </div>
    ));
  return (
    <div className="pd-field" aria-label="Partner logos">
      <div className="pd-field__track">
        <div className="pd-field__set">{columns(0)}</div>
        <div className="pd-field__set" aria-hidden="true">
          {columns(1)}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- page */

/**
 * The whole directory page, in the same flow as the other inner pages: the
 * hero (breadcrumb, run-in headline, a paragraph and two buttons on the left;
 * the logo field on a dotted panel on the right), then a section heading over
 * the filters and the card grid.
 */
export function PartnerDirectory({
  crumb,
  lead,
  rest,
  body,
  actions,
  section,
  entries,
  filters,
}: {
  /** The page's name in the breadcrumb, after "Partners". */
  crumb: string;
  lead: string;
  rest: string;
  body: string;
  /** The primary button first, then the secondary. */
  actions: [{ label: string; href: string }, { label: string; href: string }];
  /** Heading over the grid: a dark lead and a muted rest. */
  section: { lead: string; rest: string };
  entries: DirectoryEntry[];
  filters: DirectoryFilter[];
}) {
  const [primary, secondary] = actions;
  return (
    <main className="overflow-x-clip">
      <section className="mt-16 border-t border-line">
        <div className={`${container} border-x border-b border-line`}>
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div className="flex flex-col px-5 pt-14 pb-12 sm:px-10 sm:pt-20 lg:pb-20">
              <p className="pp-eyebrow">
                <Link href="/#partners" className="hover:text-text">
                  Partners
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-text">{crumb}</span>
              </p>
              <h1 className="mt-6 text-[clamp(32px,4vw,52px)] leading-[1.08] font-normal tracking-[-0.035em] text-text">
                {lead} <span className="text-text-muted">{rest}</span>
              </h1>
              <p className="mt-6 max-w-[520px] text-[17px] leading-[1.6] text-text-muted">{body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={primary.href} className="btn btn-primary btn-lg">
                  {primary.label}
                  <HoverArrow />
                </ButtonLink>
                <ButtonLink href={secondary.href} className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
                  {secondary.label}
                </ButtonLink>
              </div>
            </div>
            <div className="pd-hero__picture">
              <LogoField logos={entries.map((e) => ({ src: e.logo, name: e.name }))} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className={`${container} border-x border-line`}>
          <SectionHead lead={section.lead} rest={section.rest} />
          <div className="px-5 pb-16 sm:px-10 sm:pb-24">
            <PartnerFilters entries={entries} filters={filters} />
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}

function ButtonLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  return href.startsWith("#") ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
