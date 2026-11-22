/* eslint-disable @next/next/no-img-element -- local portrait files */
import type { CSSProperties } from "react";
import "./team-page.css";

/*
 * Parts for the Team page (/company/team), after Stripe's people pages. Until
 * real photos are added (see `photo` in lib/company.ts), each portrait is a
 * monogram cover: a brand-tone backdrop with fine concentric rings and the
 * person's initials set large, so it reads as a designed card rather than a
 * missing picture. A photo, when set, replaces the cover.
 */

/** Cover tones, from the brand ramp; assigned in turn so neighbours differ. */
export const BACKDROPS = ["mist", "honey", "lavender", "navy", "cream", "periwinkle"] as const;
export type Backdrop = (typeof BACKDROPS)[number];

export function Portrait({
  name,
  initials,
  photo,
  backdrop,
  tag,
  caption,
  size = "md",
}: {
  name: string;
  initials: string;
  photo?: string;
  backdrop: Backdrop;
  /** A small label on the picture (the trainer's track). */
  tag?: { label: string; tint: string };
  /** Name and role on a glass label at the foot (hero cards). */
  caption?: { name: string; role: string };
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span className="tm-portrait" data-backdrop={backdrop} data-size={size}>
      {photo ? (
        <img src={photo} alt={`Portrait of ${name}`} loading="lazy" decoding="async" className="tm-portrait__img" />
      ) : (
        <span className="tm-portrait__cover" role="img" aria-label={name}>
          <span className="tm-portrait__rings" />
          <span className="tm-portrait__mono">{initials}</span>
        </span>
      )}
      {tag && (
        <span className="tm-portrait__tag" style={{ "--tint": tag.tint } as CSSProperties}>
          <i aria-hidden="true" />
          {tag.label}
        </span>
      )}
      {caption && (
        <span className="tm-portrait__caption">
          <span className="block truncate text-[14px] font-medium text-text">{caption.name}</span>
          <span className="block truncate text-[12px] text-text-muted">{caption.role}</span>
        </span>
      )}
    </span>
  );
}

/** A small round monogram, for the roster's facepile. */
function Face({ initials, photo, backdrop, name }: { initials: string; photo?: string; backdrop: Backdrop; name: string }) {
  return (
    <span className="tm-face" data-backdrop={backdrop} title={name}>
      {photo ? <img src={photo} alt="" /> : initials}
    </span>
  );
}

type Person = { name: string; initials: string; photo?: string };

/**
 * Hero picture: the two directors as captioned portrait cards, and a roster
 * card under them with the trainers' faces, the count and the three tracks.
 */
export function TeamHero({
  directors,
  trainers,
  tracks,
}: {
  directors: (Person & { role: string })[];
  trainers: Person[];
  tracks: { label: string; tint: string }[];
}) {
  return (
    <div className="tm-hero">
      <div className="tm-hero__pair">
        {directors.map((d, i) => (
          <Portrait
            key={d.name}
            name={d.name}
            initials={d.initials}
            photo={d.photo}
            backdrop={i === 0 ? "navy" : "honey"}
            caption={{ name: d.name, role: d.role }}
          />
        ))}
      </div>
      <div className="tm-roster">
        <div className="flex items-center justify-between gap-4">
          <span className="tm-roster__faces">
            {trainers.map((t, i) => (
              <Face key={t.name} name={t.name} initials={t.initials} photo={t.photo} backdrop={BACKDROPS[(i + 2) % BACKDROPS.length]} />
            ))}
          </span>
          <span className="tm-roster__count">40+ trainers</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-3.5">
          {tracks.map((t) => (
            <span key={t.label} className="inline-flex items-center gap-1.5 text-[13px] text-text-muted">
              <i className="h-1.5 w-1.5 rounded-full" style={{ background: t.tint }} aria-hidden="true" />
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
