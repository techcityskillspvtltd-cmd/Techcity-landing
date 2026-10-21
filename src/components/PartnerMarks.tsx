import type { ReactNode } from "react";

type PartnerMarkId =
  | "campus"
  | "hall"
  | "workshop"
  | "tower"
  | "services"
  | "network"
  | "rack"
  | "consult"
  | "cloud";

const marks: Record<PartnerMarkId, ReactNode> = {
  campus: (
    <>
      <path d="M3 18V8l9-5 9 5v10" />
      <path d="M9 18v-6h6v6" />
    </>
  ),
  hall: (
    <>
      <path d="M4 18V9h16v9" />
      <path d="M4 12h16M9 18v-6M15 18v-6" />
    </>
  ),
  workshop: (
    <>
      <path d="M5 16l4-8h6l4 8" />
      <path d="M4 16h16M8 16v3M16 16v3" />
    </>
  ),
  tower: (
    <>
      <path d="M9 20V5h6v15" />
      <path d="M9 9h6M9 13h6M9 17h6" />
    </>
  ),
  services: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4" />
    </>
  ),
  network: (
    <>
      <circle cx="6" cy="8" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="12" cy="17" r="2" />
      <path d="M8 8h8M7.2 9.6l3.4 5.6M16.8 9.6l-3.4 5.6" />
    </>
  ),
  rack: (
    <>
      <path d="M7 4h10v16H7z" />
      <path d="M7 8h10M7 12h10M7 16h10" />
    </>
  ),
  consult: (
    <>
      <path d="M5 17V8l7-4 7 4v9" />
      <path d="M9 17v-4h6v4" />
    </>
  ),
  cloud: (
    <path d="M8 17h8a3.5 3.5 0 0 0 .4-7 4.5 4.5 0 0 0-8.6-1.2A3.2 3.2 0 0 0 8 17Z" />
  ),
};

export default function PartnerMark({ id }: { id: PartnerMarkId }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-7 text-foreground/70"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      strokeLinecap="square"
    >
      {marks[id]}
    </svg>
  );
}
