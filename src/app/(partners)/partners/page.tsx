import type { Metadata } from "next";
import { PageHero, SectionHead, TileGrid, type Tile } from "@/components/page-blocks";
import { LogoField } from "@/components/partner-directory";
import { container } from "@/lib/layout";
import { partnerStories } from "@/lib/partner-stories";
import { colleges, industry, states } from "@/lib/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The colleges that bring TechCity Skills into their timetables, and the companies that shape what we teach.",
  alternates: { canonical: "/partners" },
};

/*
 * Partners, the section's front door: the shared hero with every partner's
 * logo drifting past (the field from the directory pages) and the figures,
 * then a tile for each directory and the partner stories.
 */

const tiles: Tile[] = [
  {
    icon: "platform",
    lead: "Colleges.",
    body: `${colleges.length} universities and institutes across ${states.slice(0, -1).join(", ")} and ${states[states.length - 1]}.`,
    href: "/partners/colleges",
  },
  {
    icon: "briefcase",
    lead: "Industry.",
    body: "Upskilling platforms, test preparation, and the IT teams our students go on to join.",
    href: "/partners/industries",
  },
  {
    icon: "quote",
    lead: "Partner stories.",
    body: "How colleges and companies work with us, in their own words.",
    href: "/company/testimonials#stories",
  },
];

export default function Page() {
  const logos = [...colleges, ...industry].map((p) => ({ src: p.src, name: p.name }));
  return (
    <main className="overflow-x-clip">
      <PageHero
        crumb={{ label: "Home", href: "/" }}
        eyebrow="Partners"
        lead="Colleges and companies, on one path."
        rest="From the first lecture to the first offer."
        body="Colleges bring us into their timetables; companies help shape what we teach and hire the students who finish. Find every partner, or start a partnership of your own."
        stats={[
          { value: String(colleges.length), label: "Partner colleges" },
          { value: String(industry.length), label: "Industry partners" },
          { value: String(states.length), label: "States" },
          { value: String(partnerStories.length), label: "Partner stories" },
        ]}
        picture={
          <div className="pp-dots">
            <LogoField logos={logos} />
          </div>
        }
      />

      <section>
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Our partners." rest="Every college and company we work with, and their stories." />
          <TileGrid tiles={tiles} cols={3} />
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
