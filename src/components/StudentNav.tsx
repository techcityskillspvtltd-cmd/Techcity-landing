"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CtaLink from "@/components/CtaLink";
import ProductsMenu from "@/components/ProductsMenu";
import { studentAboutLinks, studentLogin } from "@/data/student";

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

function PartnersLink({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group inline-flex h-8 shrink-0 items-center justify-center border border-foreground bg-transparent px-4 text-[13px] font-medium text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background ${className}`}
    >
      For partners
      <span className="inline-flex max-w-0 items-center overflow-hidden transition-all duration-300 ease-power4-in-out group-hover:ml-1.5 group-hover:max-w-4">
        <ExternalArrow className="-translate-x-1 translate-y-1 transition-transform duration-300 ease-power4-in-out group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </Link>
  );
}

const aboutChildren = studentAboutLinks.map((link) => ({
  href: link.href,
  label: link.label,
}));

const plainLinks = [
  { key: "showcase", href: "/students/projects", label: "Showcase" },
  { key: "careers", href: "/students/careers", label: "Careers" },
];

export default function StudentNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [desktopSection, setDesktopSection] = useState<string | null>(null);
  const [menuPath, setMenuPath] = useState(pathname);

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setOpen(false);
    setOpenSection(null);
  }

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
    const onPageShow = () => setDesktopSection(null);
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

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

  return (
    <header
      className={`sticky top-0 z-50 border-b border-foreground/10 transition-colors duration-300 ${
        scrolled || open ? "bg-background/85 backdrop-blur-xl" : "bg-background"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:gap-6 sm:px-5 md:h-[4.25rem] md:px-8">
        <Link href="/students" className="shrink-0" aria-label="TechCity">
          <Image
            src="/logo.png"
            alt="TechCity"
            width={945}
            height={921}
            className="brand-mark h-10 w-10 object-contain sm:h-11 sm:w-11 md:h-12 md:w-12"
            priority
            unoptimized
          />
        </Link>

        <div className="flex min-w-0 items-center justify-end gap-3 sm:gap-6 lg:gap-8">
          <ul className="hidden items-center gap-7 lg:flex">
            <li
              className="relative"
              onMouseEnter={() => setDesktopSection("about")}
              onMouseLeave={() => setDesktopSection(null)}
              onFocus={() => setDesktopSection("about")}
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
                  desktopSection === "about"
                    ? "text-foreground"
                    : "text-foreground/55"
                }`}
                aria-haspopup="menu"
                aria-expanded={desktopSection === "about"}
                onClick={() => setDesktopSection("about")}
              >
                About
                <Chevron open={desktopSection === "about"} />
              </button>
              <div
                className={`absolute top-full left-0 min-w-52 pt-3 transition-all duration-200 ${
                  desktopSection === "about"
                    ? "visible translate-y-0 opacity-100"
                    : "invisible translate-y-1 opacity-0"
                }`}
              >
                <ul
                  role="menu"
                  className="border border-foreground/10 bg-background/95 py-2 shadow-[0_18px_40px_rgba(18,20,26,0.08)] backdrop-blur-xl"
                >
                  {aboutChildren.map((child) => (
                    <li key={child.href} role="none">
                      <Link
                        href={child.href}
                        role="menuitem"
                        onClick={closeDesktopMenu}
                        className="flex items-center justify-between gap-3 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/55 transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
                      >
                        {child.label}
                        <ExternalArrow className="text-foreground/25" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li
              className="relative"
              onMouseEnter={() => setDesktopSection("products")}
              onMouseLeave={() => setDesktopSection(null)}
              onFocus={() => setDesktopSection("products")}
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
                  desktopSection === "products"
                    ? "text-foreground"
                    : "text-foreground/55"
                }`}
                aria-haspopup="menu"
                aria-expanded={desktopSection === "products"}
                onClick={() => setDesktopSection("products")}
              >
                Products
                <Chevron open={desktopSection === "products"} />
              </button>
              <div
                className={`absolute top-full left-1/2 w-[min(36rem,calc(100vw-2.5rem))] -translate-x-1/2 pt-3 transition-all duration-200 ${
                  desktopSection === "products"
                    ? "visible translate-y-0 opacity-100"
                    : "invisible translate-y-1 opacity-0"
                }`}
              >
                <div className="rounded-2xl border border-foreground/10 bg-background/95 p-3 shadow-[0_24px_48px_rgba(18,20,26,0.12)] backdrop-blur-xl">
                  <ProductsMenu onNavigate={closeDesktopMenu} />
                </div>
              </div>
            </li>

            {plainLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className={`font-mono text-[12px] uppercase tracking-[0.18em] transition-colors hover:text-foreground ${
                    pathname === link.href
                      ? "text-foreground"
                      : "text-foreground/55"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <PartnersLink />
            <CtaLink href={studentLogin.href} external={studentLogin.external}>
              {studentLogin.label}
            </CtaLink>
          </div>

          <button
            type="button"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-foreground/10 text-foreground lg:hidden"
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
        className={`absolute inset-x-0 top-full z-50 border-t border-foreground/10 bg-background/95 shadow-[0_24px_48px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          open
            ? "max-h-[calc(100svh-3.5rem)] overflow-y-auto overscroll-contain opacity-100 sm:max-h-[calc(100svh-4rem)] md:max-h-[calc(100svh-4.25rem)]"
            : "pointer-events-none max-h-0 overflow-hidden opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <ul className="flex flex-col gap-1 px-4 py-3 sm:px-5 sm:py-4">
          <li>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
              aria-expanded={openSection === "about"}
              onClick={() =>
                setOpenSection((value) => (value === "about" ? null : "about"))
              }
            >
              About
              <Chevron open={openSection === "about"} />
            </button>
            <ul
              className={`overflow-hidden transition-[max-height,opacity] duration-200 ${
                openSection === "about"
                  ? "max-h-64 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {aboutChildren.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between gap-3 px-6 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/50 transition-colors hover:text-foreground"
                  >
                    {child.label}
                    <ExternalArrow className="text-foreground/35" />
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
              aria-expanded={openSection === "products"}
              onClick={() =>
                setOpenSection((value) =>
                  value === "products" ? null : "products",
                )
              }
            >
              Products
              <Chevron open={openSection === "products"} />
            </button>
            <div
              className={`overflow-hidden px-1 transition-[max-height,opacity] duration-200 ${
                openSection === "products"
                  ? "max-h-[32rem] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ProductsMenu onNavigate={closeMenu} className="py-1" />
            </div>
          </li>

          {plainLinks.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="block rounded-lg px-3 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="flex flex-col gap-4 pt-2">
            <PartnersLink onClick={closeMenu} className="w-full" />
            <CtaLink
              href={studentLogin.href}
              external={studentLogin.external}
              className="flex w-full"
            >
              {studentLogin.label}
            </CtaLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
