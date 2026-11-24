import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { SectionHero } from "@/components/section-hero";
import { groupItems, partnerNav } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Who TechCity Skills is: our story, the team, what partner colleges say, reports from campus, news and open roles.",
  alternates: { canonical: "/company" },
};

/** Company, the section's front door: a short headline, every page in the section, the figures. */
const company = partnerNav.groups.find((g) => g.label === "Company")!;

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <SectionHero
        crumb={[{ label: "Home", href: "/" }, { label: "Company" }]}
        lead="The people behind TechCity Skills."
        rest="Our story, our team, and what's new."
        actions={
          <>
            <Link href="/company/story" className="btn btn-primary btn-lg">
              Read our story
              <HoverArrow />
            </Link>
            <Link href="/company/team" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              Meet the team
            </Link>
          </>
        }
        card={{
          title: "In this section",
          links: groupItems(company).map((i) => ({ label: i.label, href: i.href, description: i.description, icon: i.icon })),
        }}
        stats={[
          { value: "30+", label: "Partner colleges" },
          { value: "10K+", label: "Students mentored" },
          { value: "40+", label: "Faculty and trainers" },
          { value: "50+", label: "Industry partners" },
        ]}
      />
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
