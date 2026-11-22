import type { Metadata } from "next";
import { PartnerDirectory, type DirectoryEntry } from "@/components/partner-directory";
import { partnerStories } from "@/lib/partner-stories";
import { colleges, states } from "@/lib/partners";

export const metadata: Metadata = {
  title: "College partners",
  description: `TechCity Skills works inside ${colleges.length} colleges and universities across north India, with their faculty, so every student leaves ready to join a team.`,
  alternates: { canonical: "/partners/colleges" },
};

/** Colleges with a partner story link to it. */
const storyFor = (name: string) => {
  const s = partnerStories.find((p) => p.name === name);
  return s ? `/company/testimonials/${s.slug}` : undefined;
};

const entries: DirectoryEntry[] = colleges.map((c) => ({
  name: c.name,
  logo: c.src,
  eyebrow: [c.city, c.kind.label, c.founded && `Since ${c.founded}`].filter(Boolean).join(" · "),
  fact: c.fact,
  group: c.state,
  href: storyFor(c.name),
}));

export default function Page() {
  return (
    <PartnerDirectory
      eyebrow="College partners"
      statement={`${colleges.length} colleges teach with us, inside their own timetables.`}
      muted={`Universities and institutes across ${states.slice(0, -1).join(", ")} and ${states[states.length - 1]}, with their own faculty in the room.`}
      links={[
        { label: "Read their stories", href: "/company/testimonials#stories" },
        { label: "Partner with us", href: "#contact" },
      ]}
      entries={entries}
      filters={states.map((s) => ({ id: s, label: s }))}
    />
  );
}
