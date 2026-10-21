import CtaLink from "@/components/CtaLink";
import PartnerAvatar from "@/components/PartnerAvatar";
import SectionHeading from "@/components/SectionHeading";
import {
  collegePartnerMarks,
  industryPartnerMarks,
  type Partner,
} from "@/data/partners";

const groups: {
  label: string;
  href: string;
  partners: Partner[];
}[] = [
  {
    label: "Colleges",
    href: "/partners/college",
    partners: collegePartnerMarks,
  },
  {
    label: "Industry",
    href: "/partners/industry",
    partners: industryPartnerMarks,
  },
];

export default function Partners() {
  return (
    <section id="partners" className="scroll-mt-24 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="04"
            label="Partners"
            title="Colleges where the work runs. Companies that can check it."
            titleClassName="max-w-xl text-[2rem] sm:text-[2.45rem]"
          />
          <CtaLink href="/partners" className="self-start">
            All partners
          </CtaLink>
        </div>

        <div className="mt-14 flex flex-col gap-14">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                  {group.label}
                  <span className="mx-2 text-foreground/20">/</span>
                  {String(group.partners.length).padStart(2, "0")}
                </p>
                <CtaLink href={group.href} className="self-start">
                  See all
                </CtaLink>
              </div>
              <ul className="mt-6 divide-y divide-foreground/10 border-y border-foreground/10">
                {group.partners.slice(0, 5).map((partner) => (
                  <li key={partner.name}>
                    <a
                      href={group.href}
                      className="group grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-4 py-5 min-[420px]:grid-cols-[7rem_minmax(0,1fr)] md:grid-cols-[7rem_minmax(0,16rem)_minmax(0,1fr)] md:gap-8"
                    >
                      <PartnerAvatar
                        name={partner.name}
                        logo={partner.logo}
                        logoSurface={partner.logoSurface}
                      />
                      <span className="min-w-0">
                        <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
                          {partner.place}
                        </span>
                        <span className="mt-2 block text-[1.15rem] font-normal leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent">
                          {partner.name}
                        </span>
                      </span>
                      <span className="col-start-2 text-[14px] leading-6 text-foreground/65 md:col-start-3 md:text-right">
                        {partner.summary ?? partner.info}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
