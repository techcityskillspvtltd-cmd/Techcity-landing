import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { PageHero, SectionHead } from "@/components/page-blocks";
import { BACKDROPS, Portrait, TeamHero } from "@/components/team-page";
import { directors, trainers, TRACK_TINT, type Track } from "@/lib/company";
import { container } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The directors who run TechCity Skills, and the trainers who teach its programs across software, artificial intelligence and data.",
  alternates: { canonical: "/company/team" },
};

/*
 * Team, after Stripe's people pages, in the same flow as the other inner
 * pages: the shared hero with the directors and a trainer roster, the two directors as
 * full profiles, the trainers as a portrait grid, then a closing band that
 * asks people to join. Photos: set `photo` in lib/company.ts.
 */

export default function Page() {
  const tracks = (Object.keys(TRACK_TINT) as Track[]).map((t) => ({ label: t, tint: TRACK_TINT[t] }));
  return (
    <main className="tm-page overflow-x-clip">
      <PageHero
        crumb={{ label: "Company", href: "/company" }}
        eyebrow="Team"
        lead="The people in the room."
        rest="Two directors, and the trainers who teach inside our partner colleges."
        stats={[
          { value: "2", label: "Directors and co-founders" },
          { value: "15+", label: "Years of leadership" },
          { value: "40+", label: "Faculty & trainers" },
          { value: "10K+", label: "People mentored" },
        ]}
        picture={<TeamHero directors={directors} trainers={trainers} tracks={tracks} />}
        actions={
          <>
            <a href="#trainers" className="btn btn-primary btn-lg">
              Meet the trainers
              <HoverArrow />
            </a>
            <Link href="/company/careers" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              Join the team
            </Link>
          </>
        }
      />

      <section id="directors" className="scroll-mt-20">
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Leadership." rest="The two co-founders who run TechCity Skills." />
          <div className="tm-directors">
            {directors.map((d, i) => (
              <article key={d.name} className="tm-director">
                <Portrait name={d.name} initials={d.initials} photo={d.photo} backdrop={i === 0 ? "navy" : "honey"} size="lg" />
                <div className="flex flex-col">
                  <p className="text-[14px] font-medium text-[var(--g-indigo)]">{d.role}</p>
                  <h3 className="mt-2 text-[clamp(24px,2.2vw,30px)] leading-[1.15] font-normal tracking-[-0.025em] text-text">
                    {d.name}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="tm-chip">{d.focus}</span>
                    <span className="tm-chip">{d.note}</span>
                  </div>
                  {d.bio.map((p) => (
                    <p key={p} className="mt-5 text-[15px] leading-[1.7] text-text-soft">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="trainers" className="pp-tint scroll-mt-20">
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="The trainers." rest="Practitioners who teach our programs on campus, by the track they lead.">
            <Link href="/programs" className="btn btn-secondary btn-lg shrink-0 self-start shadow-[var(--shadow-btn)] sm:self-auto">
              Our programs
              <HoverArrow />
            </Link>
          </SectionHead>
          <ul className="tm-grid">
            {trainers.map((t, i) => (
              <li key={t.name} className="tm-person">
                <Portrait
                  name={t.name}
                  initials={t.initials}
                  photo={t.photo}
                  backdrop={BACKDROPS[(i + 2) % BACKDROPS.length]}
                  tag={{ label: t.track, tint: TRACK_TINT[t.track] }}
                />
                <h3 className="tm-person__name">{t.name}</h3>
                <p className="tm-person__role">Trainer · {t.city}</p>
                <p className="tm-person__bio">{t.bio}</p>
              </li>
            ))}
            <li>
              <Link href="/company/careers" className="tm-join group">
                <span className="tm-join__frame">
                  <span className="tm-join__plus" aria-hidden="true">
                    +
                  </span>
                </span>
                <span className="tm-person__name flex items-center group-hover:text-accent">
                  This could be you
                  <HoverArrow />
                </span>
                <span className="tm-person__role">We&apos;re hiring trainers and mentors.</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="tm-band">
        <div className={`${container} border-x border-[color:rgb(255_255_255/0.12)]`}>
          <div className="flex flex-col gap-8 px-5 py-20 sm:px-10 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-[720px] text-[clamp(28px,3.4vw,44px)] leading-[1.12] font-normal tracking-[-0.03em] text-white">
                Teach the work, not just the textbook.
              </h2>
              <p className="mt-5 max-w-[560px] text-[17px] leading-[1.65] text-white/70">
                We hire practitioners who can teach, on campus or online, full-time or part-time.
              </p>
            </div>
            <Link href="/company/careers#apply" className="btn btn-lg shrink-0 self-start bg-white text-[var(--tertiary)] hover:bg-white/90 lg:self-auto">
              Apply to join
              <HoverArrow />
            </Link>
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
