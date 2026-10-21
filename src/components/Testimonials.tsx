import type { CSSProperties } from "react";
import CtaLink from "@/components/CtaLink";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials, type Testimonial } from "@/data/testimonials";

const columns = [
  { duration: "70s", direction: "normal", className: "" },
  { duration: "85s", direction: "reverse", className: "hidden md:block" },
  { duration: "64s", direction: "normal", className: "hidden lg:block" },
];

function splitIntoColumns(items: Testimonial[], count: number) {
  return Array.from({ length: count }, (_, column) =>
    items.filter((_, index) => index % count === column),
  );
}

export default function Testimonials() {
  const groups = splitIntoColumns(testimonials, columns.length);

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 border-t border-foreground/10"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            index="05"
            label="Testimonials"
            title="Students who went from classroom to first role."
          />
          <CtaLink href="/testimonials" className="self-start sm:self-auto">
            View all stories
          </CtaLink>
        </div>

        <div className="marquee-mask mt-12 grid h-[40rem] grid-cols-[minmax(0,1fr)] gap-4 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {columns.map((column, index) => (
            <div key={column.duration} className={`min-w-0 overflow-hidden ${column.className}`}>
              <div
                className="marquee-track flex w-full min-w-0 flex-col"
                style={
                  {
                    "--marquee-duration": column.duration,
                    "--marquee-direction": column.direction,
                  } as CSSProperties
                }
              >
                {[0, 1].map((copy) => (
                  <ul
                    key={copy}
                    className="flex flex-col gap-4 pb-4"
                    aria-hidden={copy === 1 ? true : undefined}
                  >
                    {groups[index].map((item) => (
                      <li key={item.id}>
                        <TestimonialCard item={item} />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
