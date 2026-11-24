import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { PageHero, SectionHead, TileGrid, type Tile } from "@/components/page-blocks";
import { container } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Who TechCity Skills is: our story, the team, what partner colleges say, reports from campus, news and open roles.",
  alternates: { canonical: "/company" },
};

/*
 * Company, the section's front door: the shared hero with a photo from campus
 * and the figures, then every page in the section as tiles, in the two groups
 * the navbar uses (About, Updates).
 */

const about: Tile[] = [
  { icon: "book", lead: "Our story.", body: "How two founders took industry training into the college timetable.", href: "/company/story" },
  { icon: "team", lead: "Team.", body: "The directors who run TechCity, and the trainers who teach on campus.", href: "/company/team" },
  { icon: "quote", lead: "Testimonials.", body: "What partner colleges and companies say about working with us.", href: "/company/testimonials" },
];

const updates: Tile[] = [
  { icon: "content", lead: "Reports.", body: "Write-ups from partner campuses: what ran, and what changed.", href: "/reports" },
  { icon: "news", lead: "News.", body: "Announcements, new partners and programs as they launch.", href: "/company/news" },
  { icon: "briefcase", lead: "Careers.", body: "We hire trainers and mentors who do the work themselves.", href: "/company/careers" },
];

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <PageHero
        crumb={{ label: "Home", href: "/" }}
        eyebrow="Company"
        lead="The people behind TechCity Skills."
        rest="Who we are, what we have done, and where you can join us."
        body="We put industry trainers inside college timetables across north India, so students leave ready for their first team. Start with our story, meet the team, or read what our partners say."
        stats={[
          { value: "30+", label: "Partner colleges" },
          { value: "10K+", label: "Students mentored" },
          { value: "40+", label: "Faculty and trainers" },
          { value: "50+", label: "Industry partners" },
        ]}
        picture={
          <Image
            src="/story/gallery/1.webp"
            alt="A TechCity trainer with a full batch of students in their classroom."
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
            priority
          />
        }
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
      />

      <section>
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="About us." rest="Where we started, who we are, and what our partners say." />
          <TileGrid tiles={about} cols={3} />
        </div>
      </section>

      <section>
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Updates." rest="Reports from partner campuses, news, and open roles." />
          <TileGrid tiles={updates} cols={3} />
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
