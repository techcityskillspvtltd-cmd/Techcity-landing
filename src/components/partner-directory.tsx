/* eslint-disable @next/next/no-img-element -- local, pre-trimmed logo files */
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { HoverArrow } from "@/components/hover-arrow";
import { PartnerFilters, type DirectoryEntry, type DirectoryFilter } from "@/components/partner-filters";
import { container } from "@/lib/layout";
import "./partner-directory.css";

/*
 * The partner directory: /partners/colleges and /partners/industries share it,
 * after devin.ai/customers. A statement on the left of the hero with a moving
 * field of logo tiles on the right; under it, filter pills and a grid of tall
 * coloured cards, each with the partner's logo and a few lines below.
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
 * The whole directory page: hero (statement + logo field), then the filters
 * and the card grid. `statement` is the big line; `muted` sits under it.
 */
export function PartnerDirectory({
  eyebrow,
  statement,
  muted,
  links,
  entries,
  filters,
}: {
  eyebrow: string;
  statement: string;
  muted: string;
  links: { label: string; href: string }[];
  entries: DirectoryEntry[];
  filters: DirectoryFilter[];
}) {
  return (
    <main className="overflow-x-clip">
      <section className="mt-16 border-t border-line">
        <div className={`${container} pd-hero border-x border-line`}>
          <div className="pd-hero__copy">
            <p className="pd-eyebrow">{eyebrow}</p>
            <h1 className="pd-statement">{statement}</h1>
            <p className="pd-muted">{muted}</p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
              {links.map((l) => (
                <HeroLink key={l.href} href={l.href}>
                  {l.label}
                </HeroLink>
              ))}
            </div>
          </div>
          <LogoField logos={entries.map((e) => ({ src: e.logo, name: e.name }))} />
        </div>
      </section>

      <section className="border-t border-line">
        <div className={`${container} border-x border-line px-5 pt-12 pb-16 sm:px-10 sm:pt-14 sm:pb-24`}>
          <PartnerFilters entries={entries} filters={filters} />
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}

function HeroLink({ href, children }: { href: string; children: ReactNode }) {
  const inner = (
    <>
      {children}
      <HoverArrow />
    </>
  );
  return href.startsWith("#") ? (
    <a href={href} className="pd-link">
      {inner}
    </a>
  ) : (
    <Link href={href} className="pd-link">
      {inner}
    </Link>
  );
}
