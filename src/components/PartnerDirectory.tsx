import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PartnerAvatar from "@/components/PartnerAvatar";
import SectionHeading from "@/components/SectionHeading";
import type { Partner } from "@/data/partners";

export default function PartnerDirectory({
  label,
  title,
  partners,
}: {
  label: string;
  title: string;
  partners: Partner[];
}) {
  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
          <div className="fade-up max-w-2xl">
            <SectionHeading
              index="04"
              label={label}
              title={title}
              titleClassName="text-[2.35rem] sm:text-5xl"
            />
          </div>

          <ul className="mt-12 divide-y divide-foreground/10 border-y border-foreground/10">
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 py-6 min-[420px]:grid-cols-[7rem_minmax(0,1fr)] md:grid-cols-[7rem_minmax(0,12rem)_minmax(0,1fr)] md:items-start md:gap-8 lg:grid-cols-[7rem_minmax(0,16rem)_minmax(0,1fr)]"
              >
                <PartnerAvatar
                  name={partner.name}
                  logo={partner.logo}
                  logoSurface={partner.logoSurface}
                />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
                    {partner.place}
                  </p>
                  <h2 className="mt-2 text-[1.15rem] font-normal leading-snug tracking-tight text-foreground">
                    {partner.name}
                  </h2>
                </div>
                <p className="col-start-2 text-[15px] leading-7 text-foreground/65 md:col-start-3">
                  {partner.info}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
