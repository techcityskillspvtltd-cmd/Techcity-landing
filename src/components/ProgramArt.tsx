import type { CSSProperties, ComponentType } from "react";
import {
  Branches,
  Dish,
  Elevator,
  Exploded,
  Format,
  Phosphor,
  Relay,
  Riffle,
  type HairlineProps,
} from "@lucasmarkes/hairline/react";
import type { ProgramFamilyId } from "@/data/programs";

const figures: Record<ProgramFamilyId, ComponentType<HairlineProps>> = {
  trainers: Riffle,
  faculty: Format,
  placement: Elevator,
  placing: Branches,
  mentorship: Relay,
  online: Dish,
  content: Phosphor,
  platforms: Exploded,
};

const figureStyle = {
  "--hairline-plate": "var(--background)",
  "--hairline-hi": "var(--foreground)",
  "--hairline-edge": "color-mix(in srgb, var(--foreground) 55%, transparent)",
  "--hairline-mid": "color-mix(in srgb, var(--foreground) 28%, transparent)",
  "--hairline-lo": "color-mix(in srgb, var(--foreground) 12%, transparent)",
} as CSSProperties;

export function ProgramFigure({
  id,
  caption,
  index,
  compact = false,
  className = "",
}: {
  id: ProgramFamilyId;
  caption: string;
  index: string;
  compact?: boolean;
  className?: string;
}) {
  const Art = figures[id];

  if (compact) {
    return (
      <div aria-hidden="true" className={`w-[5.25rem] shrink-0 border border-foreground/10 min-[420px]:w-[6.75rem] md:w-[8.5rem] ${className}`}>
        <Art label={caption} intensity={0.55} play theme="auto" style={figureStyle} />
      </div>
    );
  }

  return (
    <figure className={`border border-foreground/10 ${className}`}>
      <Art label={caption} intensity={0.6} theme="auto" style={figureStyle} />
      <figcaption className="flex items-center justify-between gap-4 border-t border-foreground/10 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/40">
        <span>{caption}</span>
        <span className="shrink-0 text-accent-secondary">{index}</span>
      </figcaption>
    </figure>
  );
}
