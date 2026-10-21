"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { PartnerCta } from "@/components/PartnerApply";

const links = [
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "Our story" },
      { href: "/faculty", label: "Faculty" },
      { href: "/programs", label: "Programs" },
      { href: "/testimonials", label: "Testimonials" },
    ],
  },
  {
    href: "/projects",
    label: "Projects",
    children: [
      { href: "/projects/upcoming", label: "Upcoming" },
      { href: "/projects/ongoing", label: "Ongoing" },
      { href: "/projects/completed", label: "Completed" },
    ],
  },
  {
    href: "/partners",
    label: "Partners",
    children: [
      { href: "/partners/college", label: "College" },
      { href: "/partners/industry", label: "Industry" },
    ],
  },
  { href: "/#contact", label: "Contact", scrollTo: "contact" },
];

function Chevron({ open, className = "" }: { open?: boolean; className?: string }) {
  return (
    <svg
      className={`size-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""} ${className}`}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 4.5 6 8.5 10 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function StudentsLink({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href="/students"
      onClick={onClick}
      className={`group inline-flex h-8 shrink-0 items-center justify-center border border-foreground bg-transparent px-4 text-[13px] font-medium text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background ${className}`}
    >
      For students
      <span className="inline-flex max-w-0 items-center overflow-hidden transition-all duration-300 ease-power4-in-out group-hover:ml-1.5 group-hover:max-w-4">
        <ExternalArrow className="-translate-x-1 translate-y-1 transition-transform duration-300 ease-power4-in-out group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </a>
  );
}

function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`size-2.5 shrink-0 ${className}`}
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

export default function Navbar({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const light = theme === "light";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [desktopSection, setDesktopSection] = useState<string | null>(null);
  useEffect(() => {
    const onPageShow = () => setDesktopSection(null);
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setOpenSection(null);
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    setOpenSection(null);
  };

  const closeDesktopMenu = () => {
    setDesktopSection(null);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const onContactClick = (
    event: MouseEvent<HTMLAnchorElement>,
    scrollTo?: string,
  ) => {
    if (!scrollTo) return;
    const target = document.getElementById(scrollTo);
    if (!target) {
      closeMenu();
      return;
    }
    event.preventDefault();
    const menuWasOpen = open;
    closeMenu();
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, menuWasOpen ? 320 : 0);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-foreground/15 transition-colors duration-300 [[data-theme=light]_&]:border-foreground/40 ${
        light ? "nav-light" : ""
      } ${
        scrolled || open
          ? light
            ? "bg-white/85 backdrop-blur-xl"
            : "bg-background/80 backdrop-blur-xl"
          : light
            ? "bg-white"
            : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:h-[4.25rem] sm:px-8">
        <a href="/" className="shrink-0" aria-label="TechCity">
          <Image
            src="/logo.png"
            alt="TechCity"
            width={945}
            height={921}
            className="brand-mark h-11 w-11 object-contain sm:h-12 sm:w-12"
            priority
            unoptimized
          />
        </a>

        <div className="flex min-w-0 items-center justify-end gap-6 lg:gap-8">
          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((link) =>
              link.children ? (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setDesktopSection(link.href)}
                  onMouseLeave={() => setDesktopSection(null)}
                  onFocus={() => setDesktopSection(link.href)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setDesktopSection(null);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") closeDesktopMenu();
                  }}
                >
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors ${
                      desktopSection === link.href
                        ? "text-foreground"
                        : "text-foreground/55"
                    }`}
                    aria-haspopup="menu"
                    aria-expanded={desktopSection === link.href}
                    onClick={() => setDesktopSection(link.href)}
                  >
                    {link.label}
                    <Chevron open={desktopSection === link.href} />
                  </button>
                  <div
                    className={`absolute top-full left-0 min-w-52 pt-3 transition-all duration-200 ${
                      desktopSection === link.href
                        ? "visible translate-y-0 opacity-100"
                        : "invisible translate-y-1 opacity-0"
                    }`}
                  >
                    <ul
                      role="menu"
                      className="border border-foreground/10 bg-background/95 py-2 backdrop-blur-xl"
                    >
                      {link.children.map((child) => (
                        <li key={child.href} role="none">
                          <a
                            href={child.href}
                            role="menuitem"
                            onClick={closeDesktopMenu}
                            className="flex items-center justify-between gap-3 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/55 transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
                          >
                            {child.label}
                            <ExternalArrow />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => onContactClick(event, link.scrollTo)}
                    className="font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/55 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <StudentsLink />
            <PartnerCta />
          </div>

          <button
            type="button"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-foreground/45 bg-[color-mix(in_srgb,var(--foreground)_10%,var(--background))] text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.35)] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className={`absolute h-px w-4 bg-current transition-transform duration-200 ${
                open ? "rotate-45" : "-translate-y-[3.5px]"
              }`}
            />
            <span
              className={`absolute h-px w-4 bg-current transition-transform duration-200 ${
                open ? "-rotate-45" : "translate-y-[3.5px]"
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`absolute inset-x-0 top-full z-50 border-t border-foreground/10 bg-background/95 shadow-[0_24px_48px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          open
            ? "max-h-[calc(100svh-4.25rem)] overflow-y-auto opacity-100"
            : "pointer-events-none max-h-0 overflow-hidden opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {links.map((link) =>
            link.children ? (
              <li key={link.href}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
                  aria-expanded={openSection === link.href}
                  onClick={() =>
                    setOpenSection((value) =>
                      value === link.href ? null : link.href,
                    )
                  }
                >
                  {link.label}
                  <Chevron open={openSection === link.href} />
                </button>
                <ul
                  className={`overflow-hidden transition-[max-height,opacity] duration-200 ${
                    openSection === link.href
                      ? "max-h-64 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <a
                        href={child.href}
                        onClick={closeMenu}
                        className="flex items-center justify-between gap-3 px-6 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/50 transition-colors hover:text-foreground"
                      >
                        {child.label}
                        <ExternalArrow />
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) => onContactClick(event, link.scrollTo)}
                  className="block rounded-lg px-3 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ),
          )}
          <li className="flex flex-col gap-4 pt-2">
            <StudentsLink onClick={closeMenu} className="w-full" />
            <PartnerCta onOpen={closeMenu} className="flex w-full" />
          </li>
        </ul>
      </div>
    </header>
  );
}
