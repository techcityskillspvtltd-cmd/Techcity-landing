import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { Logo } from "@/components/logo";
import { MobileMenu } from "@/components/mobile-menu";
import { NavMenu } from "@/components/nav-menu";
import { NavShell } from "@/components/nav-shell";
import { container } from "@/lib/layout";
import type { NavConfig } from "@/lib/nav";
import { linkTarget } from "@/lib/site";

export function Navbar({ nav }: { nav: NavConfig }) {
  return (
    <NavShell>
      <div className={`${container} nav-row relative isolate flex h-16 items-center gap-10 px-[18px]`}>
        <Link href={nav.home} aria-label="TechCity Skills home" className="shrink-0 translate-x-2 -translate-y-[3px]">
          <Logo height={24} />
        </Link>
        <nav aria-label="Main" className="contents">
          <NavMenu groups={nav.groups} />
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href={nav.secondary.href} className="btn btn-secondary hidden sm:inline-flex">
            {nav.secondary.label}
          </Link>
          <Link href={nav.primary.href} className="btn btn-primary hidden min-[420px]:inline-flex" {...linkTarget(nav.primary.href)}>
            {nav.primary.label}
            <HoverArrow />
          </Link>
          <MobileMenu nav={nav} />
        </div>
      </div>
    </NavShell>
  );
}
