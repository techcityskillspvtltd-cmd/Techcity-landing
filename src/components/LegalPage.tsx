import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";

export type LegalSection = {
  title: string;
  paragraphs?: ReactNode[];
  items?: ReactNode[];
};

export default function LegalPage({
  index,
  label,
  title,
  updated,
  intro,
  sections,
}: {
  index: string;
  label: string;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
          <div className="fade-up flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              index={index}
              label={label}
              title={title}
              titleClassName="text-[2.35rem] sm:text-5xl"
            />
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/40">
              Last updated {updated}
            </p>
          </div>

          <div
            className="fade-up mt-8 max-w-2xl text-base leading-7 text-foreground/70"
            style={{ "--fade-delay": "80ms" } as React.CSSProperties}
          >
            {intro}
          </div>

          <div
            className="fade-up mt-14 max-w-3xl border-b border-foreground/10"
            style={{ "--fade-delay": "140ms" } as React.CSSProperties}
          >
            {sections.map((section, sectionIndex) => (
              <article
                key={section.title}
                className="grid gap-3 border-t border-foreground/10 py-8 sm:grid-cols-[3.5rem_minmax(0,40rem)] sm:gap-8 sm:py-10"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {String(sectionIndex + 1).padStart(2, "0")}
                </p>
                <div>
                  <h2 className="text-xl font-normal tracking-tight text-foreground">
                    {section.title}
                  </h2>
                  {section.paragraphs?.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="mt-4 text-base leading-7 text-foreground/70"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.items ? (
                    <ul className="mt-4 space-y-2.5">
                      {section.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex gap-3 text-base leading-7 text-foreground/70"
                        >
                          <span
                            className="mt-[0.7rem] size-1 shrink-0 bg-accent"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer compact />
    </div>
  );
}
