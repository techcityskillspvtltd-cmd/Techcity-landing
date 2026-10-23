"use client";

import { useEffect, useState } from "react";
import Aurora from "@/components/Aurora";
import CtaLink from "@/components/CtaLink";
import { PartnerCta } from "@/components/PartnerApply";
import ProgramShowcase from "@/components/ProgramShowcase";
import { afternoonAurora, auroraPresetForHour, type AuroraPreset } from "@/components/auroraPresets";

function readIsLight() {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.theme === "light";
}

export default function Hero() {
  const [light, setLight] = useState(false);
  const [preset, setPreset] = useState<AuroraPreset>(afternoonAurora);

  useEffect(() => {
    const sync = () => setLight(readIsLight());
    sync();
    window.addEventListener("techcity-theme", sync);
    return () => window.removeEventListener("techcity-theme", sync);
  }, []);

  useEffect(() => {
    const apply = () => setPreset(auroraPresetForHour(new Date().getHours()));
    apply();
    const onVisibility = () => {
      if (!document.hidden) apply();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <section className="relative isolate grid h-[calc(100svh-4.25rem)] min-h-[36rem] grid-rows-[minmax(0,1fr)_minmax(0,1fr)] overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <Aurora
          colorStops={preset.colorStops}
          amplitude={1}
          blend={0.5}
          height={0.45}
          speed={preset.speed}
          glow={preset.glow}
          scale={1}
          brightness={preset.brightness}
          layers={1}
          direction="top"
          opacity={1}
          mouseInteraction
          intro
          lightMode={light}
        />
      </div>

      <div className="relative z-10 flex min-h-0 flex-col items-center justify-center px-5 py-6 text-center sm:px-8">
        <div aria-hidden="true" className="hero-aurora-wash pointer-events-none absolute inset-0" />
        <div className="relative flex w-full max-w-3xl flex-col items-center">
          <h1 className="text-balance text-[2.35rem] font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[4.25rem]">
            <span className="block">Industry-aligned skilling</span>
            <span className="block">for modern tech careers.</span>
          </h1>
          <p className="hero-lead mt-3 max-w-md text-sm leading-6 text-foreground/80 sm:text-[15px] sm:leading-7">
            Partnering with universities to deliver an integrated suite of
            skilling solutions, from classrooms to organizations.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <PartnerCta size="lg" />
            <CtaLink href="/programs" size="lg" tone="outline">
              Explore programs
            </CtaLink>
          </div>
        </div>
      </div>

      <div className="relative z-10 h-full min-h-0">
        <ProgramShowcase light={light} />
      </div>
    </section>
  );
}
