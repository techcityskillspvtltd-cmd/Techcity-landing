import type { Metadata } from "next";
import { PartnerCta } from "@/components/PartnerApply";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import PartnerAvatar from "@/components/PartnerAvatar";
import { collegePartners, industryPartners } from "@/data/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "College and industry partners of TechCity: campuses where programs run, and the hiring, review, and mentorship work companies take on.",
};

const routes = [
  {
    href: "/partners/college",
    index: "01",
    label: "College",
    title: "College partners",
    body: "Campuses where a trainer teaches inside the college timetable.",
  },
  {
    href: "/partners/industry",
    index: "02",
    label: "Industry",
    title: "Industry partners",
    body: "Companies tied up for hiring and the tools a lab uses.",
  },
];

export default function PartnersPage() {
  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
          <div className="fade-up max-w-3xl">
            <SectionHeading
              index="04"
              label="Partners"
              title="Colleges where the work runs. Companies that can check it."
              titleClassName="max-w-2xl text-[2.35rem] sm:text-5xl"
            />
          </div>

          <ul className="fade-up mt-12 grid gap-px bg-foreground/10 sm:grid-cols-2">
            {routes.map((route) => (
              <li key={route.href} className="bg-background">
                <a
                  href={route.href}
                  className="flex h-full flex-col px-5 py-8 transition-colors hover:bg-foreground/[0.03] sm:px-8 sm:py-10"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                    <span className="text-accent">{route.index}</span>
                    <span className="mx-2 text-foreground/20">/</span>
                    {route.label}
                  </span>
                  <span className="mt-4 text-[1.45rem] tracking-tight text-foreground">
                    {route.title}
                  </span>
                  <span className="mt-3 max-w-md text-[15px] leading-7 text-foreground/65">
                    {route.body}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-foreground/10">
          <div className="mx-auto grid max-w-7xl gap-px bg-foreground/10 lg:grid-cols-2">
            <div className="bg-background px-5 py-16 sm:px-8 sm:py-20">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                <span className="text-accent">01</span>
                <span className="mx-2 text-foreground/20">/</span>
                Colleges
              </p>
              <ol className="mt-8">
                {collegePartners.map((partner, index) => (
                  <li
                    key={partner.name}
                    className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-3 border-t border-foreground/10 py-4 sm:grid-cols-[2.25rem_7.5rem_minmax(0,1fr)]"
                  >
                    <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden sm:block">
                      <PartnerAvatar
                        name={partner.name}
                        logo={partner.logo}
                        logoSurface={partner.logoSurface}
                      />
                    </span>
                    <span>
                      <a
                        href="/partners/college"
                        className="text-[1.02rem] tracking-tight text-foreground transition-colors hover:text-accent"
                      >
                        {partner.name}
                      </a>
                      <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
                        {partner.place}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-background px-5 py-16 sm:px-8 sm:py-20">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                <span className="text-accent">02</span>
                <span className="mx-2 text-foreground/20">/</span>
                Industry
              </p>
              <ol className="mt-8">
                {industryPartners.map((partner, index) => (
                  <li
                    key={partner.name}
                    className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-3 border-t border-foreground/10 py-4 sm:grid-cols-[2.25rem_7.5rem_minmax(0,1fr)]"
                  >
                    <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden sm:block">
                      <PartnerAvatar
                        name={partner.name}
                        logo={partner.logo}
                        logoSurface={partner.logoSurface}
                      />
                    </span>
                    <span>
                      <a
                        href="/partners/industry"
                        className="text-[1.02rem] tracking-tight text-foreground transition-colors hover:text-accent"
                      >
                        {partner.name}
                      </a>
                      <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
                        {partner.place}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t border-foreground/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-20">
            <div className="max-w-xl">
              <h2 className="text-[1.7rem] font-normal leading-[1.1] tracking-tight text-foreground sm:text-[2rem]">
                Bring a campus, a cohort, and a term.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-foreground/65">
                We answer with how a trainer, a faculty session, and a hiring
                loop would sit inside that college.
              </p>
            </div>
            <PartnerCta className="self-start sm:self-auto" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
