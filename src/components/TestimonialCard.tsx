import type { Testimonial } from "@/data/testimonials";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function Rating({ value }: { value: number }) {
  return (
    <span className="flex gap-1" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={`size-1.5 ${
            index < value ? "bg-accent-secondary" : "bg-foreground/15"
          }`}
        />
      ))}
    </span>
  );
}

export default function TestimonialCard({
  item,
  className = "",
}: {
  item: Testimonial;
  className?: string;
}) {
  return (
    <figure
      className={`group flex w-full min-w-0 flex-col border border-foreground/10 bg-background p-3.5 transition-colors duration-500 hover:border-foreground/25 sm:p-7 ${className}`}
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <span className="min-w-0 truncate font-mono text-[9px] uppercase tracking-[0.14em] text-accent sm:text-[10px] sm:tracking-[0.16em]">
          {item.program}
        </span>
        <Rating value={item.rating} />
      </div>

      <blockquote className="mt-3 flex-1 text-[13px] leading-5 text-foreground/80 sm:mt-5 sm:text-[15px] sm:leading-7">
        <span className="mr-1 font-mono text-accent-secondary" aria-hidden="true">
          ”
        </span>
        {item.quote}
      </blockquote>

      <p className="mt-3 flex items-center gap-2 text-[11px] leading-4 text-foreground/55 sm:mt-5 sm:text-[12px]">
        <span className="size-1 shrink-0 bg-accent-secondary" aria-hidden="true" />
        <span className="min-w-0">{item.outcome}</span>
      </p>

      <figcaption className="mt-4 flex min-w-0 items-center gap-2.5 border-t border-foreground/10 pt-3.5 sm:mt-6 sm:gap-3 sm:pt-5">
        <span className="grid size-7 shrink-0 place-items-center bg-accent/15 font-mono text-[10px] tracking-[0.08em] text-foreground transition-colors duration-500 group-hover:bg-accent group-hover:text-on-accent sm:size-9 sm:text-[11px]">
          {initials(item.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] tracking-tight text-foreground sm:text-sm">
            {item.name}
          </span>
          <span className="mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/40 sm:text-[10px] sm:tracking-[0.14em]">
            {item.degree} · {item.city}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
