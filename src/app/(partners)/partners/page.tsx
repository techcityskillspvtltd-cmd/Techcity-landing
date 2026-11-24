import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { SectionHero } from "@/components/section-hero";
import { groupItems, partnerNav } from "@/lib/nav";
import { partnerStories } from "@/lib/partner-stories";
import { colleges, industry, states } from "@/lib/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The colleges that bring TechCity Skills into their timetables, and the companies that shape what we teach.",
  alternates: { canonical: "/partners" },
};

/** Partners, the section's front door: a short headline, the directories and the stories, the figures. */
const partners = partnerNav.groups.find((g) => g.label === "Partners")!;
const counts: Record<string, number> = { "/partners/colleges": colleges.length, "/partners/industries": industry.length };

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <SectionHero
        crumb={[{ label: "Home", href: "/" }, { label: "Partners" }]}
        lead="Colleges and companies, on one path."
        rest="From the first lecture to the first offer."
        actions={
          <>
            <a href="#contact" className="btn btn-primary btn-lg">
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
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
