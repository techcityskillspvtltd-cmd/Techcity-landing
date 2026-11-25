"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ExternalArrow, HoverArrow, newTab } from "@/components/hover-arrow";
import { Icon } from "@/components/icons";
import { ProductLogo } from "@/components/product-logo";
import type { NavGroup, NavItem, NavSection } from "@/lib/nav";
import { linkTarget } from "@/lib/site";

type Menu = {
  index: number | null;
  /** Previous index: sets the slide direction. */
  from: number | null;
  height: number;
  /** Viewport y of the navbar's bottom edge, for the overlay. */
  top: number;
};

const CLOSED: Menu = { index: null, from: null, height: 0, top: 0 };
const collapse = (m: Menu): Menu => (m.index === null ? m : { ...m, index: null, from: m.index });

/**
 * Desktop nav, modelled on stripe.com's navigation:
 * - hovering the navbar fades in a white card behind it (`.nav-card`)
 * - opening a menu reveals a dropdown attached under that card (`.nav-popup`),
 *   the navbar's width, with a clip-path wipe and resizing height
 * - the page behind gets a soft gradient + blur (`.nav-overlay`)
 * - switching menus slides contents 20% sideways
 *
 * Renders inside the navbar row (`.nav-row`, positioned + isolated).
 */
export function NavMenu({ groups }: { groups: NavGroup[] }) {
  const [menu, setMenu] = useState<Menu>(CLOSED);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const close = () => {
    cancelClose();
    setMenu(collapse);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(close, 200);
  };

  const open = (i: number) => {
    cancelClose();
    const panel = panelRefs.current[i];
    const header = rootRef.current?.closest("header");
    if (!panel || !header) return;
    const top = header.getBoundingClientRect().bottom;
    setMenu((m) => ({ index: i, from: m.index, height: panel.offsetHeight, top }));
  };

  const isOpen = menu.index !== null;

  useEffect(() => {
    if (!isOpen) return;
    const shut = () => setMenu(collapse);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menu.index !== null) triggerRefs.current[menu.index]?.focus();
      shut();
    };
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) shut();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", shut, { passive: true });
    window.addEventListener("resize", shut);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", shut);
      window.removeEventListener("resize", shut);
    };
  }, [isOpen, menu.index]);

  return (
    <div ref={rootRef} className="hidden lg:block" onMouseLeave={scheduleClose}>
      {/* Page overlay: soft gradient + blur */}
      <div
        aria-hidden="true"
        onClick={close}
        // The overlay lives inside this component, so moving onto the page doesn't
        // fire the root's mouseleave; close when the pointer reaches it instead.
        onMouseEnter={scheduleClose}
        className="nav-overlay"
        data-open={isOpen || undefined}
        style={{ top: menu.top - 10 }}
      />

      {/* White card behind the navbar (also shown on navbar hover, via CSS) */}
      <div aria-hidden="true" className="nav-card" data-open={isOpen || undefined} />

      <ul className="nav-list flex items-center gap-6" data-open={isOpen || undefined}>
        {groups.map((group, i) => {
          if (!group.sections) {
            return (
              <li key={group.label}>
                <Link href={group.href ?? "#"} onMouseEnter={close} onFocus={close} className="nav-trigger">
                  {group.label}
                </Link>
              </li>
            );
          }
          const active = menu.index === i;
          return (
            <li key={group.label}>
              <button
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                type="button"
                aria-expanded={active}
                aria-haspopup="true"
                onMouseEnter={() => open(i)}
                onClick={() => (active ? close() : open(i))}
                className="nav-trigger"
              >
                {group.label}
                <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true" className="nav-chevron ml-1.5">
                  <path d="M1.5 3.5L5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Dropdown, attached under the card, the navbar's width */}
      <div
        onMouseEnter={cancelClose}
        className="nav-popup"
        data-open={isOpen || undefined}
        style={{ height: menu.height }}
      >
        {groups.map((group, i) => {
          if (!group.sections) return null;
          const active = menu.index === i;
          const side = menu.index === null ? 0 : i < menu.index ? -1 : 1;
          return (
            <div
              key={group.label}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              inert={!active}
              className="nav-panel"
              data-active={active || undefined}
              style={{ ["--side" as string]: side }}
            >
              <Panel group={group} onNavigate={close} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Panel({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  return (
    <div className="flex">
      {group.sections!.map((section, i) => (
        <Section key={section.title} section={section} divided={i > 0} onNavigate={onNavigate} />
      ))}
      {group.aside && (
        <aside className="min-w-[248px] flex-1 border-l border-line bg-surface-subdued px-8 pt-8 pb-12">
          <p className="text-[14px] text-text-muted">{group.aside.title}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {group.aside.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  {...linkTarget(link.href)}
                  onClick={onNavigate}
                  className="inline-flex items-center text-[14px] font-medium text-text transition-colors duration-200 hover:text-tertiary"
                >
                  {link.label}
                  <HoverArrow />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}

function Section({ section, divided, onNavigate }: { section: NavSection; divided: boolean; onNavigate: () => void }) {
  return (
    <section className={`nav-section w-[336px] shrink-0 px-8 pt-8 pb-12 ${divided ? "border-l border-line" : ""}`}>
      <p className={`text-[14px] text-text-muted ${section.accent ? "nav-section-title" : ""}`}>{section.title}</p>
      <ul className="mt-6 flex flex-col gap-4">
        {section.items.map((item) => (
          <li key={item.href}>
            <MenuLink item={item} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function MenuLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const Tag = item.external ? "a" : Link;
  return (
    <Tag
      href={item.href}
      onClick={onNavigate}
      className="nav-link flex w-full items-center gap-3"
      {...(item.external ? newTab : {})}
    >
      {item.product ? (
        <ProductLogo id={item.product} size={34} />
      ) : item.icon ? (
        <span className="nav-icon flex size-[34px] shrink-0 items-center justify-center rounded-[8px]">
          <Icon name={item.icon} size={17} />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="flex items-center text-[14px] leading-5 font-medium text-text">
          {item.label}
          {item.external ? <ExternalArrow /> : <HoverArrow reveal />}
        </span>
        {item.description && (
          <span className={`nav-link__desc block text-[14px] leading-5 ${item.nowrapDescription ? "whitespace-nowrap" : ""}`}>
            {item.description}
          </span>
        )}
      </span>
    </Tag>
  );
}
