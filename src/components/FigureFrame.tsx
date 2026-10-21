import type { ReactNode } from "react";

const mono = "var(--font-geist-mono), ui-monospace, monospace";

export function Mono({
  x,
  y,
  children,
  size = 15,
  fill = "currentColor",
  opacity = 0.72,
  anchor = "start",
}: {
  x: number | string;
  y: number | string;
  children: string;
  size?: number;
  fill?: string;
  opacity?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fillOpacity={fill === "currentColor" ? opacity : 1}
      fontFamily={mono}
      fontSize={size}
      letterSpacing="0.8"
      textAnchor={anchor}
      dominantBaseline="middle"
    >
      {children}
    </text>
  );
}

export function FigureFrame({
  caption,
  index,
  children,
  className = "",
}: {
  caption: string;
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={`relative w-full overflow-hidden border border-foreground/10 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--foreground) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 7%, transparent) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <svg
        viewBox="0 0 640 400"
        className="relative block h-auto w-full text-foreground"
        aria-hidden="true"
      >
        {children}
      </svg>
      <figcaption className="relative flex items-center justify-between gap-3 border-t border-foreground/10 bg-background px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/45 sm:gap-4 sm:px-4 sm:py-3 sm:text-[10px]">
        <span className="min-w-0 truncate">{caption}</span>
        <span className="shrink-0 text-accent-secondary">{index}</span>
      </figcaption>
    </figure>
  );
}
