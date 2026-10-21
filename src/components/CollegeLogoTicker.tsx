"use client";

import { useEffect, useState } from "react";
import LogoLoop from "@/components/LogoLoop";
import { collegePartnerMarks } from "@/data/partners";

const collegeLogos = collegePartnerMarks
  .filter((partner) => partner.logo)
  .filter(
    (partner, index, list) =>
      list.findIndex((item) => item.logo === partner.logo) === index,
  )
  .map((partner) => ({
    src: partner.logo!,
    alt: partner.name,
    title: partner.name,
  }));

export default function CollegeLogoTicker() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div
      className="student-logo-ticker relative h-16 w-full overflow-hidden sm:h-20 md:h-24"
      aria-label="College partner logos"
    >
      <LogoLoop
        logos={collegeLogos}
        speed={compact ? 48 : 65}
        direction="left"
        logoHeight={compact ? 36 : 48}
        gap={compact ? 72 : 112}
        hoverSpeed={0}
        pauseOnHover
        fadeOut
        fadeOutWidth={compact ? 0.08 : 0.12}
        muted={0}
        labels="none"
        ariaLabel="College partner logos"
      />
    </div>
  );
}
