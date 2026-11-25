import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { SectionHead } from "@/components/page-blocks";
import { PartnerFilters, type DirectoryEntry } from "@/components/partner-filters";
import { SectionHero } from "@/components/section-hero";
import { container } from "@/lib/layout";
import { groupItems, partnerNav } from "@/lib/nav";
import { partnerStories } from "@/lib/partner-stories";
import { colleges, industry, states } from "@/lib/partners";
import "@/components/partner-directory.css";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The colleges that bring TechCity Skills into their timetables, and the companies that shape what we teach.",
  alternates: { canonical: "/partners" },
};

/**
 * Partners, the section's front door: a short headline, the directories and
 * the stories, the figures; then every partner, colleges and companies
 * together, in the directory pages' filterable grid.
 */
const partners = partnerNav.groups.find((g) => g.label === "Partners")!;
const counts: Record<string, number> = { "/partners/colleges": colleges.length, "/partners/industries": industry.length };

/** Partners with a story link to it. */
const storyFor = (name: string) => {
  const s = partnerStories.find((p) => p.name === name);
  return s ? `/company/testimonials/${s.slug}` : undefined;
};

const entries: DirectoryEntry[] = [
  ...colleges.map((c) => ({
    name: c.name,
    logo: c.src,
    eyebrow: [c.city, c.kind.label, c.founded && `Since ${c.founded}`].filter(Boolean).join(" · "),
    fact: c.fact,
    group: "colleges",
    href: storyFor(c.name),
  })),
  ...industry.map((p) => ({
    name: p.name,
    logo: p.src,
    eyebrow: [p.detail, p.founded && `Since ${p.founded}`].filter(Boolean).join(" · "),
    fact: p.fact,
    group: "industry",
    href: storyFor(p.name),
  })),
];

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <SectionHero
        crumb={[{ label: "Home", href: "/" }, { label: "Partners" }]}
        lead="Colleges and companies, on one path."
        rest="From the first lecture to the first offer."
        actions={
          <>
            <a href="#partner" className="btn btn-primary btn-lg">
              Partner with us
              <HoverArrow />
            </a>
            <Link href="/company/testimonials#stories" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              Read their stories
            </Link>
          </>
        }
        card={{
          title: "In this section",
          links: [
            ...groupItems(partners).map((i) => ({
              label: i.label,
              href: i.href,
              description: i.description,
              icon: i.icon,
              meta: String(counts[i.href] ?? ""),
            })),
            {
              label: "Partner stories",
              href: "/company/testimonials#stories",
              description: "In their own words",
              icon: "quote" as const,
              meta: String(partnerStories.length),
            },
          ],
        }}
        stats={[
          { value: String(colleges.length), label: "Partner colleges" },
          { value: String(industry.length), label: "Industry partners" },
          { value: String(states.length), label: "States" },
          { value: String(partnerStories.length), label: "Partner stories" },
        ]}
      />

      <section>
        <div className={`${container} border-x border-line`}>
          <SectionHead lead="Every partner." rest="Colleges and companies together; a partner with a story links to it." />
          <div className="px-5 pb-16 sm:px-10 sm:pb-24">
            <PartnerFilters
              entries={entries}
              filters={[
                { id: "colleges", label: "Colleges" },
                { id: "industry", label: "Industry" },
              ]}
            />
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
