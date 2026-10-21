"use client";

import { useMemo, useState, type CSSProperties } from "react";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/testimonials";

const newestFirst = [...testimonials].sort((a, b) =>
  b.date.localeCompare(a.date),
);

const programs = [
  "All programs",
  ...Array.from(new Set(testimonials.map((item) => item.program))),
];

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-8 shrink-0 border px-3.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 ${
        active
          ? "border-accent bg-accent text-on-accent"
          : "border-foreground/15 text-foreground/55 hover:border-foreground/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export default function TestimonialsGrid() {
  const [program, setProgram] = useState(programs[0]);

  const items = useMemo(
    () =>
      newestFirst.filter(
        (item) => program === programs[0] || item.program === program,
      ),
    [program],
  );

  return (
    <div>
      <div className="border-y border-foreground/10 py-3 sm:py-5">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {programs.map((name) => (
            <Pill
              key={name}
              active={program === name}
              onClick={() => setProgram(name)}
            >
              {name}
            </Pill>
          ))}
        </div>
      </div>

      <ul
        key={program}
        className="mt-5 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            className="fade-up"
            style={{ "--fade-delay": `${index * 60}ms` } as CSSProperties}
          >
            <TestimonialCard item={item} className="h-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}
