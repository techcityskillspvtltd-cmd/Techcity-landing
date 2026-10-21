import type { CSSProperties } from "react";
import Link from "next/link";
import { productIcons } from "@/components/ProductIcons";
import { studentProducts } from "@/data/student";

function ExternalArrow() {
  return (
    <svg
      className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export default function StudentProducts() {
  return (
    <section
      id="products"
      className="scroll-mt-24 border-t border-foreground/10"
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-24">
        <div className="fade-up max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45 sm:text-[11px]">
            <span className="text-accent">02</span>
            <span className="mx-2 text-foreground/20">/</span>
            Products
          </p>
          <h2 className="mt-3 text-balance text-[1.65rem] font-normal leading-[1.12] tracking-tight text-foreground sm:text-[2.1rem] lg:text-[2.35rem] lg:leading-[1.1]">
            Built for how students actually learn.
          </h2>
          <p className="mt-4 max-w-xl text-[14px] leading-6 text-foreground/65 sm:text-[15px] sm:leading-7">
            Each product opens in its own app. Pick one, practice, and keep work
            a hiring team can ask about.
          </p>
        </div>

        <ul className="mt-10 grid gap-px bg-foreground/10 sm:mt-12 lg:mt-14">
          {studentProducts.map((product, index) => {
            const Icon = productIcons[product.slug as keyof typeof productIcons];
            const className =
              "grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-3 bg-background px-3 py-4 transition-colors min-[420px]:grid-cols-[3.75rem_minmax(0,1fr)] min-[420px]:gap-4 min-[420px]:px-4 min-[420px]:py-5 sm:grid-cols-[4.5rem_2.75rem_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:px-5 sm:py-6 md:grid-cols-[4.75rem_3rem_minmax(0,1fr)_auto] md:gap-6 md:py-7";
            const body = (
              <>
                <span
                  className="grid size-12 shrink-0 place-items-center border border-foreground/10 transition-[border-color] duration-300 min-[420px]:size-14 sm:size-[4.5rem] md:size-[4.75rem] group-hover:border-[color-mix(in_srgb,var(--product-accent)_45%,transparent)]"
                  style={{ color: product.accent }}
                  aria-hidden="true"
                >
                  <span className="grid size-full place-items-center bg-[color-mix(in_srgb,var(--product-accent)_10%,transparent)] transition-colors duration-300 group-hover:bg-[color-mix(in_srgb,var(--product-accent)_16%,transparent)]">
                    {Icon ? (
                      <Icon className="size-5 min-[420px]:size-6 sm:size-7 md:size-8" />
                    ) : null}
                  </span>
                </span>

                <span className="hidden font-mono text-[11px] tracking-[0.16em] text-[var(--product-accent)] sm:block">
                  {product.index}
                </span>

                <span className="min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40 sm:hidden">
                    <span style={{ color: product.accent }}>{product.index}</span>
                    <span className="mx-2 text-foreground/20">/</span>
                    {product.category}
                  </span>
                  <span className="mt-1 block text-[1.25rem] font-normal leading-[1.12] tracking-tight text-foreground transition-colors group-hover:text-[var(--product-accent)] min-[420px]:text-[1.4rem] sm:mt-0 sm:text-[1.55rem] md:text-[1.7rem] md:leading-[1.1]">
                    {product.name}
                  </span>
                  <span className="mt-1.5 hidden font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40 sm:block">
                    {product.category}
                  </span>
                  <span className="mt-1.5 block text-[13px] font-medium leading-5 text-foreground/75 sm:mt-2 sm:text-[15px] sm:leading-6">
                    {product.title}
                  </span>
                  <span className="mt-1 block max-w-xl text-[13px] leading-5 text-foreground/55 sm:text-[15px] sm:leading-7">
                    {product.line}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45 transition-colors group-hover:text-foreground sm:hidden">
                    {product.external ? `Open ${product.name}` : "Coming soon"}
                    {product.external ? <ExternalArrow /> : null}
                  </span>
                </span>

                <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45 transition-colors group-hover:text-foreground sm:inline-flex sm:justify-self-end">
                  {product.external ? `Open ${product.name}` : "Coming soon"}
                  {product.external ? <ExternalArrow /> : null}
                </span>
              </>
            );

            return (
              <li
                key={product.slug}
                className="fade-up group"
                style={
                  {
                    "--fade-delay": `${80 + index * 70}ms`,
                    "--product-accent": product.accent,
                  } as CSSProperties
                }
              >
                {product.external ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {body}
                  </a>
                ) : (
                  <Link href={product.href} className={className}>
                    {body}
                  </Link>
                )}
                <div
                  aria-hidden="true"
                  className="h-0.5 w-0 bg-[var(--product-accent)] transition-[width] duration-500 ease-power4-in-out group-hover:w-full"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
