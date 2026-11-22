"use client";

/* eslint-disable @next/next/no-img-element -- local, pre-trimmed logo files */
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { HoverArrow } from "@/components/hover-arrow";

export type DirectoryEntry = {
  name: string;
  logo: string;
  /** Small line above the name: place and type, or what the company does. */
  eyebrow: string;
  /** One sourced line under the name. */
  fact?: string;
  /** Filter group this partner belongs to. */
  group: string;
  /** Story page, when there is one; the card links there. */
  href?: string;
};

export type DirectoryFilter = { id: string; label: string };

/** A faint corner wash per card, from the brand ramp; assigned in turn. */
const TONES = ["#3B47C4", "#F59E0B", "#6B7BE6", "#1C257D", "#FCD38A", "#A5B1F5"];

/** Filter pills (All + one per group, with counts) over a grid of partner cards. */
export function PartnerFilters({ entries, filters }: { entries: DirectoryEntry[]; filters: DirectoryFilter[] }) {
  const [active, setActive] = useState<string>("all");
  const shown = active === "all" ? entries : entries.filter((e) => e.group === active);
  const pills = [{ id: "all", label: "All" }, ...filters];

  return (
    <div>
      <div className="pd-pills" role="toolbar" aria-label="Filter partners">
        {pills.map((f) => {
          const count = f.id === "all" ? entries.length : entries.filter((e) => e.group === f.id).length;
          return (
            <button key={f.id} type="button" className="pd-pill" aria-pressed={active === f.id} onClick={() => setActive(f.id)}>
              {f.label}
              <span>{count}</span>
            </button>
          );
        })}
      </div>

      <ul key={active} className="pd-grid">
        {shown.map((e) => (
          <li key={e.name} style={{ "--i": entries.indexOf(e) } as CSSProperties}>
            <Card entry={e} tone={TONES[entries.indexOf(e) % TONES.length]} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Card({ entry, tone }: { entry: DirectoryEntry; tone: string }) {
  const [place, ...rest] = entry.eyebrow.split(" · ");
  const body = (
    <>
      <span className="pd-card__art" style={{ "--tone": tone } as CSSProperties}>
        <span className="pd-card__logo">
          <img src={entry.logo} alt={`${entry.name} logo`} loading="lazy" decoding="async" />
        </span>
      </span>
      <span className="pd-card__body">
        <span className="pd-card__eyebrow">
          <span className="pd-card__tag">{place}</span>
          {rest.length > 0 && <span className="self-center">{rest.join(" · ")}</span>}
        </span>
        <span className="pd-card__name">{entry.name}</span>
        {entry.fact && <span className="pd-card__fact">{entry.fact}</span>}
        {entry.href && (
          <span className="pd-card__story">
            Read story
            <HoverArrow />
          </span>
        )}
      </span>
    </>
  );
  return entry.href ? (
    <Link href={entry.href} className="pd-card" data-link="">
      {body}
    </Link>
  ) : (
    <div className="pd-card">{body}</div>
  );
}
