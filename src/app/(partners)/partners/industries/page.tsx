import type { Metadata } from "next";
import { PartnerDirectory, type DirectoryEntry } from "@/components/partner-directory";
import { partnerStories } from "@/lib/partner-stories";
import { industry } from "@/lib/partners";

export const metadata: Metadata = {
  title: "Industry partners",
  description:
    "The companies that help shape what TechCity Skills teaches on campus: training and certification partners, and technology partners our students go on to join.",
  alternates: { canonical: "/partners/industries" },
};

const GROUPS = [
  { id: "training", label: "Training and certification" },
  { id: "technology", label: "Technology and services" },
];

/** Companies with a partner story link to it. */
const storyFor = (name: string) => {
  const s = partnerStories.find((p) => p.name === name);
  return s ? `/company/testimonials/${s.slug}` : undefined;
};

const entries: DirectoryEntry[] = industry.map((p) => ({
  name: p.name,
  logo: p.src,
  eyebrow: [p.detail, p.founded && `Since ${p.founded}`].filter(Boolean).join(" · "),
  fact: p.fact,
  group: p.group,
  href: storyFor(p.name),
}));

export default function Page() {
  return (
    <PartnerDirectory
      crumb="Industry"
      lead="The companies that shape"
      rest="what our students learn."
      body="Upskilling platforms, test preparation, and the software and IT teams our students go on to join."
      actions={[
        { label: "Partner with us", href: "#partner" },
        { label: "Read their stories", href: "/company/testimonials#stories" },
      ]}
      section={{ lead: "Every industry partner.", rest: "Filter by the kind of work; a partner with a story links to it." }}
      entries={entries}
      filters={GROUPS}
    />
  );
}
