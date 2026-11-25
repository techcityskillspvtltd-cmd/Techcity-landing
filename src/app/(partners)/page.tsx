import Link from "next/link";
import { AboutSection } from "@/components/about-section";
import { HeroCity } from "@/components/hero-city";
import { HoverArrow } from "@/components/hover-arrow";
import { ProgramBento } from "@/components/program-bento";
import { ProductScroll } from "@/components/product-scroll";
import { TestimonialsGrid } from "@/components/testimonials-grid";
import { PartnersCloud } from "@/components/partners-cloud";
import { ProjectsGlobe } from "@/components/projects-globe";
import { container } from "@/lib/layout";
import { colleges, industry } from "@/lib/partners";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <section className="relative mt-16 border-t border-line">
        {/* Full-bleed: the city spans the whole page width; the copy lines up with the navbar logo (container + 26px). */}
        <div className="relative h-[640px] overflow-hidden sm:h-[clamp(640px,calc(100svh-64px),900px)]">
          {/* The city: campus (left) → TechCity hub → industry (right), trams carrying students across. */}
          <HeroCity className="absolute inset-0" />
          <div className="hero-veil pointer-events-none absolute inset-0" aria-hidden="true" />

          <div className={`${container} relative h-full`}>
            <div className="hero-copy absolute inset-x-0 top-0 z-10 pt-12 pr-5 pl-[26px] sm:pt-16 lg:pt-[72px]">
              <h1 className="max-w-[760px] text-[clamp(34px,4.4vw,58px)] leading-[1.06] font-normal tracking-[-0.035em] text-text">
                Industry-aligned skilling that makes students stand out, get hired and grow.
              </h1>
              <div className="mt-8">
                <a href="#partner" className="btn btn-primary btn-lg">
                  Partner with us
                  <HoverArrow />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Partner logo ticker is hidden for now; <LogoTicker /> in components/logo-ticker.tsx is unchanged. */}
      </section>

      {/* About: the company's story in four chapters, then the numbers. */}
      <AboutSection />

      {/* Our mission (components/about-flow, gated by components/mission-toggle) is kept in the code but not shown for now. */}

      {/* Products: pinned, scroll-driven walkthrough of all five products. */}
      <ProductScroll />

      <section id="programs" className="programs-section scroll-mt-20">
        <div className={`${container} border-x border-b border-line px-5 py-16 sm:px-10 sm:py-20 lg:py-24`}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="max-w-[820px] text-[clamp(24px,2.6vw,32px)] leading-[1.25] font-normal tracking-[-0.02em] text-text">
              Programs from classroom to career.{" "}
              <span className="text-text-muted">
                Four for your students, four for your college. Run one, or combine them into a full campus
                partnership.
              </span>
            </h2>
            <Link href="/programs" className="btn btn-secondary btn-lg shrink-0 self-start shadow-[var(--shadow-btn)] sm:self-auto">
              All programs
              <HoverArrow />
            </Link>
          </div>
          <div className="mt-10 sm:mt-12">
            <ProgramBento />
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section scroll-mt-20">
        <div className={`${container} flex flex-col border-x border-b border-line md:min-h-[min(84svh,760px)]`}>
          <div className="flex flex-col gap-6 px-5 pt-12 pb-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:pt-14 sm:pb-10">
            <h2 className="max-w-[760px] text-[clamp(24px,2.6vw,32px)] leading-[1.25] font-normal tracking-[-0.02em] text-text">
              Learning in action, on campus.{" "}
              <span className="text-text-muted">
                {projects.length} programs in {new Set(projects.map((p) => p.city)).size} cities, each run inside the
                college&apos;s own timetable.
              </span>
            </h2>
            <Link href="/projects" className="btn btn-secondary btn-lg shrink-0 self-start shadow-[var(--shadow-btn)] sm:self-auto">
              All projects
              <HoverArrow />
            </Link>
          </div>
          <ProjectsGlobe />
        </div>
      </section>

      <section id="partners" className="scroll-mt-20">
        <div className={`${container} border-x border-b border-line`}>
          <div className="flex flex-col gap-6 px-5 pt-12 pb-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:pt-14 sm:pb-10">
            <h2 className="max-w-[760px] text-[clamp(24px,2.6vw,32px)] leading-[1.25] font-normal tracking-[-0.02em] text-text">
              Trusted by {colleges.length} colleges and {industry.length} industry partners.{" "}
              <span className="text-text-muted">
                Campuses across north India, and the companies that help shape what students learn.
              </span>
            </h2>
            <Link href="/company/testimonials" className="btn btn-secondary btn-lg shrink-0 self-start shadow-[var(--shadow-btn)] sm:self-auto">
              See stories
              <HoverArrow />
            </Link>
          </div>
          <PartnersCloud />
        </div>
      </section>

      <TestimonialsGrid />
      {/* Lines end here: a full-width rule over the last section's bottom line. */}
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
