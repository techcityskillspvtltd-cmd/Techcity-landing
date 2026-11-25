import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import {
  EnvelopeSolidIcon,
  InstagramSolidIcon,
  LinkedinSolidIcon,
  XComSolidIcon,
  YoutubeSolidIcon,
} from "@/components/pikaicons";
import { OverscrollColor } from "@/components/overscroll-color";
import { CurrentYear } from "@/components/current-year";
import { ExternalArrow, HoverArrow, newTab } from "@/components/hover-arrow";
import { products } from "@/lib/products";
import { Logo } from "@/components/logo";
import { container } from "@/lib/layout";
import { linkTarget, signupUrl, site } from "@/lib/site";

type FooterLink = { label: string; href: string; external?: boolean };
type FooterGroup = { title: string; links: FooterLink[] };

/** Each column holds one or more stacked groups (like "Marketplace" + "Business"). */
const columns: FooterGroup[][] = [
  [
    {
      title: "Products",
      links: [
        ...products.map((p) => ({ label: p.name, href: p.href, external: true })),
      ],
    },
  ],
  [
    {
      title: "Programs",
      links: [
        { label: "Trainers for students", href: "/programs#trainers" },
        { label: "Placement preparation", href: "/programs#placement" },
        { label: "Student placement", href: "/programs#placing" },
        { label: "Mentorship", href: "/programs#mentorship" },
        { label: "Faculty development", href: "/programs#faculty" },
        { label: "Online lessons", href: "/programs#online" },
        { label: "Online content", href: "/programs#content" },
        { label: "Platforms for colleges", href: "/programs#platforms" },
      ],
    },
  ],
  [
    {
      title: "Projects",
      links: [
        { label: "Upcoming", href: "/projects/upcoming" },
        { label: "Ongoing", href: "/projects/ongoing" },
        { label: "Completed", href: "/projects/completed" },
      ],
    },
    {
      title: "Partners",
      links: [
        { label: "Colleges", href: "/partners/colleges" },
        { label: "Industry", href: "/partners/industries" },
        { label: "Partner with us", href: "#partner" },
      ],
    },
  ],
  [
    {
      title: "Students",
      links: [
        { label: "Student platform", href: "/students" },
        { label: "Featured", href: "/students/featured" },
        { label: "Student projects", href: "/students/projects" },
        { label: "Testimonials", href: "/students/testimonials" },
      ],
    },
  ],
  [
    {
      title: "Company",
      links: [
        { label: "Story", href: "/company/story" },
        { label: "Team", href: "/company/team" },
        { label: "Testimonials", href: "/company/testimonials" },
        { label: "News", href: "/company/news" },
        { label: "Reports", href: "/reports" },
        { label: "Careers", href: "/company/careers" },
      ],
    },
  ],
];

/** Social links (Pikaicons, solid). Swap the `#` hrefs once the real profiles are ready. */
const socials: { label: string; href: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { label: "X", href: "#", Icon: XComSolidIcon },
  { label: "YouTube", href: "#", Icon: YoutubeSolidIcon },
  { label: "Instagram", href: "#", Icon: InstagramSolidIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinSolidIcon },
  { label: "Email", href: `mailto:${site.email}`, Icon: EnvelopeSolidIcon },
];

const linkClass =
  "text-[13px] leading-[1.5] text-white/65 transition-colors duration-200 hover:text-white";

type Audience = "partners" | "students";

const ctaCopy: Record<
  Audience,
  { title: string; body: string; primary: FooterLink; secondary: FooterLink }
> = {
  partners: {
    title: "Bring industry-ready skilling to your campus.",
    body: "Trainers, labs, placement preparation and platforms, run inside your college with your faculty.",
    primary: {
      label: "Partner with us",
      href: "#partner",
    },
    secondary: { label: "Explore programs", href: "/programs" },
  },
  students: {
    title: "Start building skills that get you hired.",
    body: "One TechCity account for tests, learning paths, daily practice and courses, from first lesson to first offer.",
    primary: {
      label: "Create your account",
      href: signupUrl,
    },
    secondary: { label: "See featured projects", href: "/students/featured" },
  },
};

/** Call to action over the city illustration; its navy base runs into the footer. */
function Cta({ audience }: { audience: Audience }) {
  const copy = ctaCopy[audience];
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden"
    >
      <Image
        src="/cta-image.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-bottom"
      />
      {/* Fade the sky into the page above and the water into the footer below. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-bg to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-accent to-transparent"
      />
      <div
        className={`${container} flex h-[clamp(540px,42vw,680px)] flex-col items-center px-5 pt-20 text-center sm:px-10 sm:pt-24 lg:pt-28`}
      >
        <h2
          id="cta-title"
          className="max-w-[720px] text-[clamp(30px,3.8vw,48px)] leading-[1.15] font-normal tracking-[-0.02em] text-text"
        >
          {copy.title}
        </h2>
        <p className="mt-5 max-w-[520px] text-[17px] leading-[1.55] text-text-muted">
          {copy.body}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href={copy.primary.href} className="btn btn-primary btn-lg" {...linkTarget(copy.primary.href)}>
            {copy.primary.label}
            <HoverArrow />
          </a>
          <Link
            href={copy.secondary.href}
            className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]"
          >
            {copy.secondary.label}
            <HoverArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** CTA plus the navy site footer. `#contact` links in the navbar scroll here. */
export function Footer({ audience = "partners" }: { audience?: Audience }) {
  return (
    <div id="contact" className="relative z-10 scroll-mt-16">
      <Cta audience={audience} />
      <OverscrollColor />
      <footer className="bg-accent text-white">
        <div className={container}>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 px-5 pt-14 pb-16 sm:grid-cols-3 sm:px-10 lg:grid-cols-5 lg:gap-x-8 lg:pt-16 lg:pb-20"
          >
            {columns.map((groups, i) => (
              <div key={i} className="flex flex-col gap-9">
                {groups.map((group) => (
                  <div key={group.title}>
                    <p className="text-[13px] leading-[1.5] font-medium text-white">
                      {group.title}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          {link.external ? (
                            <a href={link.href} className={`${linkClass} inline-flex items-center`} {...newTab}>
                              {link.label}
                              <ExternalArrow />
                            </a>
                          ) : (
                            <Link href={link.href} className={linkClass}>
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </nav>
        </div>

        {/* Full-width rule above the bottom bar. */}
        <div className="border-t border-white/15">
          <div
            className={`${container} flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10`}
          >
            <div className="flex items-center gap-6">
              <Link
                href="/"
                aria-label={`${site.name} home`}
                className="shrink-0 [&_img]:brightness-0 [&_img]:invert"
              >
                <Logo height={20} />
              </Link>
              <ul className="flex items-center gap-4">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      className="block text-white/65 transition-colors duration-200 hover:text-white"
                      {...(s.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <s.Icon width={18} height={18} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="flex items-center gap-6 text-[13px] leading-[1.5] text-white/65">
              <span>Gurugram, India</span>
              <span>
                TechCity © <CurrentYear />
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
