import type { Metadata } from "next";
import { HoverArrow } from "@/components/hover-arrow";
import { SectionHead } from "@/components/page-blocks";
import { StudentHero } from "@/components/students/blocks";
import { RoadmapNow, RoadmapTimeline } from "@/components/students/roadmap";
import { RoadmapScene } from "@/components/students/stack-scenes";
import { container } from "@/lib/layout";
import { currentQuarter } from "@/lib/roadmap";
import { signupUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Product roadmap",
  description:
    "What TechCity has shipped, what it is building now and what comes next, across Setu, Marg, Kaksha, Riyaaz and Spardha.",
  alternates: { canonical: "/students/roadmap" },
};

/*
 * Product roadmap: the hero beside a feature shipping (a stageshow scene),
 * the quarter under way as a featured card, then every quarter on one rail,
 * filterable by product, the way the Reports page leads with one report and
 * then lists them all. Content: lib/roadmap.ts.
 */

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <StudentHero
        crumb={[{ label: "Students", href: "/students" }, { label: "Product roadmap" }]}
        title="Where TechCity is going."
        lede="What we've shipped, what we're building now and what comes next, across all five apps."
        actions={
          <>
            <a href="#timeline" className="btn btn-primary btn-lg">
              See the full roadmap
              <HoverArrow />
            </a>
            <a href={signupUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              Create your account
            </a>
          </>
        }
        picture={<RoadmapScene />}
      />

      <section className="bg-surface-subdued">
        <div className={`${container} border-x border-b border-line pb-14 sm:pb-20`}>
          <SectionHead lead={`Now, in ${currentQuarter.label}.`} rest="What is shipping this quarter, and what is still being built." />
          <RoadmapNow />
        </div>
      </section>

      <section id="timeline" className="scroll-mt-20">
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="The full roadmap." rest="Every quarter, from the first login to what comes next year. Pick an app to see its own." />
          <RoadmapTimeline />
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
