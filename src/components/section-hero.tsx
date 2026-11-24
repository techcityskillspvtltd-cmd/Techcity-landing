import Link from "next/link";
import type { ReactNode } from "react";
import { HoverArrow } from "@/components/hover-arrow";
import { Icon, type IconName } from "@/components/icons";
import { InView } from "@/components/in-view";
import { NumberTicker } from "@/components/number-ticker";
import { Crumbs, type Crumb, type HeroStat } from "@/components/page-blocks";
import { ProductLogo } from "@/components/product-logo";
import type { ProductId } from "@/components/product-logo";
import { container } from "@/lib/layout";

/*
 * The hero for a section's front door (/products, /company, /partners,
 * /projects): a short headline on the left, and on the right a card listing
 * every page in the section, with the same icons and one-line descriptions as
 * the navbar's menu, so the page sends people straight on. An optional ruled
 * row of figures underneath. Styles: `.sh-*` in globals.css.
 */

export type SectionLink = {
  label: string;
  href: string;
  description?: string;
  icon?: IconName;
  product?: ProductId;
  /** Opens another site in a new tab. */
  external?: boolean;
  /** A small figure on the right of the row, such as a count. */
  meta?: string;
};

export function SectionHero({
  crumb,
  lead,
  rest,
  actions,
  card,
  stats,
}: {
  crumb: Crumb[];
  lead: string;
  rest?: string;
  actions?: ReactNode;
  card: { title: string; links: SectionLink[] };
  stats?: HeroStat[];
}) {
  return (
    <section className="mt-16 border-t border-line">
      <div className={`${container} border-x border-b border-line`}>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="pp-hero-copy">
            <Crumbs items={crumb} />
            <h1 className="pp-h1">
              {lead} {rest && <span className="text-text-muted">{rest}</span>}
            </h1>
            {actions && <div className="pp-actions">{actions}</div>}
          </div>
          <div className="pp-hero__picture">
            <div className="pp-dots px-5 py-10 sm:px-10">
              <nav className="sh-card" aria-label={card.title}>
                <p className="sh-card__head">
                  <span>{card.title}</span>
                  <span>{card.links.length}</span>
                </p>
                <ul>
                  {card.links.map((l) => (
                    <li key={l.href}>
                      <SectionRow link={l} />
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        {stats && (
          <InView className="pp-stats" threshold={0.4}>
            {stats.map((s, i) => (
              <div key={s.label} className="pp-stats__cell">
                <p className="pp-stats__num">
                  <NumberTicker value={s.value} delay={i * 0.12} />
                </p>
                <p className="mt-2 text-[14px] leading-[1.5] text-text-muted">{s.label}</p>
              </div>
            ))}
          </InView>
        )}
      </div>
    </section>
  );
}

function SectionRow({ link: l }: { link: SectionLink }) {
  const inner = (
    <>
      {l.product ? (
        <ProductLogo id={l.product} size={32} />
      ) : (
        <span className="nav-icon inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md" aria-hidden="true">
          {l.icon && <Icon name={l.icon} size={16} />}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="sh-row__label">{l.label}</span>
        {l.description && <span className="sh-row__desc">{l.description}</span>}
      </span>
      {l.meta && <span className="sh-row__meta">{l.meta}</span>}
      <span className="sh-row__go">
        {l.external && <span className="sr-only">(opens in a new tab)</span>}
        <HoverArrow />
      </span>
    </>
  );
  if (l.external)
    return (
      <a href={l.href} target="_blank" rel="noreferrer" className="sh-row group">
        {inner}
      </a>
    );
  return (
    <Link href={l.href} className="sh-row group">
      {inner}
    </Link>
  );
}
