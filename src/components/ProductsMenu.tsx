"use client";

import Link from "next/link";
import { productIcons } from "@/components/ProductIcons";
import { studentProducts } from "@/data/student";

const itemClass =
  "flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-foreground/[0.04]";

export default function ProductsMenu({
  onNavigate,
  className = "",
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <ul
      role="menu"
      className={`grid gap-1 sm:grid-cols-2 ${className}`.trim()}
    >
      {studentProducts.map((product) => {
        const Icon = productIcons[product.slug as keyof typeof productIcons];
        const body = (
          <>
            <span
              className="grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
              style={{
                background: `linear-gradient(145deg, ${product.accent} 0%, color-mix(in srgb, ${product.accent} 72%, #0f172a) 100%)`,
              }}
              aria-hidden="true"
            >
              {Icon ? <Icon /> : null}
            </span>
            <span className="min-w-0 pt-0.5">
              <span className="block text-[14px] font-semibold leading-snug text-foreground">
                {product.name}
              </span>
              <span className="mt-0.5 block text-[12px] leading-snug text-foreground/50">
                {product.title}
              </span>
            </span>
          </>
        );

        return (
          <li key={product.slug} role="none">
            {product.external ? (
              <a
                href={product.href}
                role="menuitem"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigate}
                className={itemClass}
              >
                {body}
              </a>
            ) : (
              <Link
                href={product.href}
                role="menuitem"
                onClick={onNavigate}
                className={itemClass}
              >
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
