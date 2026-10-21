/** Simple white icons for the student Products mega menu. */

import type { ReactNode } from "react";

type IconProps = { className?: string };

function IconShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className || "size-5"}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/** Marg — roadmaps / wayfinding signpost */
export function IconMarg({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M11 3.5v17" />
      <path d="M11 5h7.5L21 7.75 18.5 10.5H11z" />
      <path d="M11 12.5H5.5L3 15.25 5.5 18H11z" />
      <path d="M7.5 20.5h7" />
    </IconShell>
  );
}

/** Spardha — assessment / clipboard check */
export function IconSpardha({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M9 4h6v2H9z" />
      <path d="M8 6H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2" />
      <path d="m9 13 2 2 4-4" />
    </IconShell>
  );
}

/** Riyaaz — code arena / practice brackets */
export function IconRiyaaz({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M8.5 5.5 4 12l4.5 6.5" />
      <path d="M15.5 5.5 20 12l-4.5 6.5" />
      <path d="M13.2 6.5 10.8 17.5" />
    </IconShell>
  );
}

/** Kaksha — content / play in frame */
export function IconKaksha({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M4 6h16v12H4z" />
      <path d="m10 9 6 3-6 3V9z" fill="currentColor" stroke="none" />
    </IconShell>
  );
}

/** Setu — LMS / graduation cap */
export function IconSetu({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M3 10 12 5l9 5-9 5-9-5z" />
      <path d="M7 12.5v4.2c0 .8 2.2 2.3 5 2.3s5-1.5 5-2.3v-4.2" />
      <path d="M21 10v6" />
    </IconShell>
  );
}

export const productIcons = {
  marg: IconMarg,
  spardha: IconSpardha,
  riyaaz: IconRiyaaz,
  kaksha: IconKaksha,
  setu: IconSetu,
} as const;
