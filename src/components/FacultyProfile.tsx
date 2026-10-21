import type { CSSProperties } from "react";
import FacultyAvatar from "@/components/FacultyAvatar";
import type { FacultyMember } from "@/data/faculty";

export default function FacultyProfile({
  person,
  index,
  detailed = false,
}: {
  person: FacultyMember;
  index: number;
  detailed?: boolean;
}) {
  return (
    <article
      id={person.slug}
      className="fade-up scroll-mt-28 bg-background px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]"
      style={{ "--fade-delay": `${index * 60}ms` } as CSSProperties}
    >
      <div className="flex items-start gap-5">
        <FacultyAvatar
          name={person.name}
          image={person.image}
          imagePosition={person.imagePosition}
          className="size-24 sm:size-28"
        />
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
            <span className="text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 text-foreground/20">/</span>
            {person.subject}
          </p>
          <h2 className="mt-3 text-[1.65rem] font-normal leading-[1.1] tracking-tight text-foreground sm:text-[1.85rem]">
            {person.name}
          </h2>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-secondary">
            {person.role}
          </p>
          {detailed ? null : (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
              {person.campus}
            </p>
          )}
          <ul className="mt-4 flex flex-wrap gap-2">
            {person.focus.map((item) => (
              <li
                key={item}
                className="border border-foreground/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/65"
              >
                {item}
              </li>
            ))}
          </ul>
          {person.linkedin ? (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex font-mono text-[10px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
          ) : null}
        </div>
      </div>
      {detailed ? (
        <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-px bg-foreground/10 sm:grid-cols-3">
          {[
            { label: "Campus", value: person.campus },
            { label: "Subject", value: person.subject },
            { label: "Experience", value: person.years },
          ].map((item) => (
            <div key={item.label} className="bg-background px-4 py-4 sm:px-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
                {item.label}
              </dt>
              <dd className="mt-2 text-sm leading-5 text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/40">
          {person.years}
        </p>
      )}
      <p
        className={`mt-8 text-[15px] leading-7 text-foreground/70 ${
          detailed ? "max-w-2xl" : "max-w-md"
        }`}
      >
        {person.summary}
      </p>
      <p
        className={`mt-4 text-[15px] leading-7 text-foreground/65 ${
          detailed ? "max-w-2xl" : "max-w-md"
        }`}
      >
        {person.body}
      </p>
      {detailed ? (
        <>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-foreground/65">
            {person.note}
          </p>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/40">
            This term
          </p>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-foreground/70">
            {person.teaches}
          </p>
        </>
      ) : null}
    </article>
  );
}
