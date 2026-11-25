"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { ExternalArrow, HoverArrow, newTab } from "@/components/hover-arrow";
import { Icon } from "@/components/icons";
import { ProductLogo } from "@/components/product-logo";
import { groupItems, type NavConfig, type NavGroup, type NavItem } from "@/lib/nav";
import { linkTarget, site } from "@/lib/site";

/** "Setu, Marg, Kaksha +2": what's inside a group, readable before it is opened. */
function preview(group: NavGroup) {
  const labels = groupItems(group).map((i) => i.label);
  const shown = labels.slice(0, 3).join(", ");
  return labels.length > 3 ? `${shown} +${labels.length - 3}` : shown;
}

/**
 * Menu button and full-height sheet for screens below the desktop nav (lg).
 * Each group shows a preview of its pages, opens into titled sections, and ends
 * with its quick links; the CTAs and contact details stay pinned at the bottom.
 */
export function MobileMenu({ nav }: { nav: NavConfig }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<number | null>(null);
  const [top, setTop] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const sheetId = useId();

  const toggle = () => {
    const header = rootRef.current?.closest("header");
    if (header) setTop(header.getBoundingClientRect().bottom);
    setOpen((o) => !o);
  };
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={sheetId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={toggle}
        className="menu-toggle"
      >
        <span className="menu-toggle__label" aria-hidden="true">
          {open ? "Close" : "Menu"}
        </span>
        {/* Three bars; the middle one fades and the outer two cross into an X. */}
        <span className="menu-toggle__icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        id={sheetId}
        inert={!open}
        style={{ top }}
        data-open={open || undefined}
        className={`mobile-sheet fixed inset-x-0 bottom-0 z-40 flex flex-col bg-bg transition-[opacity,transform] duration-300 ease-[var(--ease-out)] ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-5 pt-3 pb-8 sm:px-10">
          <ul className="mx-auto max-w-[640px]">
            {nav.groups.map((group, i) => {
              const rowStyle = { "--i": i } as CSSProperties;
              if (!group.sections) {
                return (
                  <li key={group.label} className="mobile-sheet__row border-b border-line" style={rowStyle}>
                    <Link
                      href={group.href ?? "#"}
                      onClick={close}
                      className="flex min-h-[60px] items-center justify-between py-3 text-[17px] font-medium text-text"
                    >
                      {group.label}
                      <span className="mobile-sheet__chev" aria-hidden="true">
                        <HoverArrow />
                      </span>
                    </Link>
                  </li>
                );
              }
              const expanded = section === i;
              return (
                <li key={group.label} className="mobile-sheet__row border-b border-line" style={rowStyle}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setSection(expanded ? null : i)}
                    className="flex min-h-[64px] w-full items-center justify-between gap-4 py-3 text-left"
                  >
                    <span className="min-w-0">
                      <span className="block text-[17px] leading-6 font-medium text-text">{group.label}</span>
                      <span
                        className={`block truncate text-[13px] leading-5 text-text-muted transition-opacity duration-200 ${
                          expanded ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        {preview(group)}
                      </span>
                    </span>
                    <span className="mobile-sheet__chev" data-expanded={expanded || undefined} aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 10 10">
                        <path
                          d="M1.5 3.5L5 7l3.5-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  {/* Height animates via grid rows 0fr -> 1fr */}
                  <div
                    inert={!expanded}
                    className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)] ${
                      expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-4 pb-5">
                        {group.sections.map((s) => (
                          <div key={s.title}>
                            {group.sections!.length > 1 && (
                              <p className="mb-1 text-[11px] font-medium tracking-[0.08em] text-text-muted uppercase">
                                {s.title}
                              </p>
                            )}
                            <ul className="grid gap-x-4 sm:grid-cols-2">
                              {s.items.map((item) => (
                                <li key={item.href}>
                                  <ItemLink
                                    item={item}
                                    onClick={close}
                                    className="-mx-2 flex min-h-[52px] items-center gap-3 rounded-lg px-2 py-2 active:bg-surface"
                                  >
                                    {item.product ? (
                                      <ProductLogo id={item.product} size={34} />
                                    ) : item.icon ? (
                                      <span className="nav-icon flex size-[34px] shrink-0 items-center justify-center rounded-[10px]">
                                        <Icon name={item.icon} size={17} />
                                      </span>
                                    ) : null}
                                    <span className="min-w-0">
                                      <span className="flex items-center gap-2 text-[15px] leading-5 font-medium text-text">
                                        {item.label}
                                        {item.external && <ExternalArrow />}
                                      </span>
                                      {item.description && (
                                        <span className="block text-[13px] leading-[18px] text-text-soft">
                                          {item.description}
                                        </span>
                                      )}
                                    </span>
                                  </ItemLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {group.aside && (
                          <div className="flex flex-wrap gap-2">
                            {group.aside.links.map((l) => (
                              <Link key={l.label} href={l.href} {...linkTarget(l.href)} onClick={close} className="mobile-sheet__chip">
                                {l.label}
                                <HoverArrow />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div
            className="mobile-sheet__row mx-auto mt-6 max-w-[640px] text-[13px] leading-6 text-text-muted"
            style={{ "--i": nav.groups.length } as CSSProperties}
          >
            <p className="text-[11px] font-medium tracking-[0.08em] uppercase">Talk to us</p>
            <a href={`mailto:${site.email}`} className="mt-1 block break-all text-text">
              {site.email}
            </a>
            <a href={`tel:${site.phoneE164}`} className="block text-text">
              {site.phone}
            </a>
          </div>
        </nav>

        <div className="border-t border-line px-5 pt-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:px-10">
          <div className="mx-auto flex max-w-[640px] gap-3">
            <Link href={nav.secondary.href} onClick={close} className="btn btn-secondary btn-lg flex-1 !border-line">
              {nav.secondary.label}
            </Link>
            <Link href={nav.primary.href} {...linkTarget(nav.primary.href)} onClick={close} className="btn btn-primary btn-lg flex-1">
              {nav.primary.label}
              <HoverArrow />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Internal links use next/link; product sites open in a new tab. */
function ItemLink({
  item,
  onClick,
  className,
  children,
}: {
  item: NavItem;
  onClick: () => void;
  className: string;
  children: React.ReactNode;
}) {
  if (item.external)
    return (
      <a href={item.href} onClick={onClick} className={className} {...newTab}>
        {children}
      </a>
    );
  return (
    <Link href={item.href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
