"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AppleCarouselContent,
  AppleCarouselControls,
  AppleCarouselItem,
  AppleCarouselNext,
  AppleCarouselPlayButton,
  AppleCarouselPrevious,
  AppleCarouselRoot,
  AppleCarouselTab,
  AppleCarouselTabList,
} from "@/components/apple-carousel";
import SectionHeading from "@/components/SectionHeading";

const photos = [
  {
    src: "/images/1.jpeg",
    alt: "Students and a trainer standing together in a college classroom",
    caption: "A class, after the session",
  },
  {
    src: "/images/2.jpeg",
    alt: "A trainer beside a whiteboard sketch of a Flappy Bird clone while students work on laptops",
    caption: "Building a game in the lab",
  },
  {
    src: "/images/3.jpeg",
    alt: "A trainer speaking with students at computers in a lab in Faridabad",
    caption: "Lab session, Faridabad",
  },
  {
    src: "/images/4.jpeg",
    alt: "Students with laptops in a lecture hall at CEERI, Pilani",
    caption: "Lecture hall, CEERI Pilani",
  },
  {
    src: "/images/5.jpeg",
    alt: "A presenter leading a smart learning workshop for a room of faculty with laptops",
    caption: "Faculty session on smart learning",
  },
];

function indexLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

export default function StoryGallery() {
  const [active, setActive] = useState<number | null>(null);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const opened = useRef(false);
  const photo = active === null ? null : photos[active];

  useEffect(() => {
    if (active === null) {
      if (opened.current) {
        triggerRef.current?.focus();
        opened.current = false;
      }
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((current) =>
          current === null ? current : (current + 1) % photos.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActive((current) =>
          current === null
            ? current
            : (current - 1 + photos.length) % photos.length,
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!opened.current) closeRef.current?.focus();
    opened.current = true;
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section className="border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
        <div className="fade-up max-w-2xl">
          <SectionHeading
            index="06"
            label="From the sessions"
            title="The programs run in the room, with the class."
          />
        </div>

        <AppleCarouselRoot duration={3600} className="mx-auto mt-12 max-w-2xl">
          <AppleCarouselContent>
            {photos.map((item, index) => (
              <AppleCarouselItem key={item.src} tabIndex={-1}>
                <button
                  type="button"
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setActive(index);
                  }}
                  className="flex w-full cursor-zoom-in flex-col text-left outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="aspect-[16/10] w-full select-none object-cover"
                  />
                  <span className="flex items-center justify-between gap-4 border-t border-foreground/10 bg-background px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
                    <span>{item.caption}</span>
                    <span className="shrink-0 text-accent-secondary">
                      {indexLabel(index)}
                    </span>
                  </span>
                </button>
              </AppleCarouselItem>
            ))}
          </AppleCarouselContent>

          <AppleCarouselControls className="max-lg:flex-wrap max-lg:gap-y-3">
            <AppleCarouselPrevious />
            <AppleCarouselTabList aria-label="Sessions">
              {photos.map((item) => (
                <AppleCarouselTab key={item.src}>{item.caption}</AppleCarouselTab>
              ))}
            </AppleCarouselTabList>
            <AppleCarouselPlayButton />
            <AppleCarouselNext />
          </AppleCarouselControls>
        </AppleCarouselRoot>
      </div>

      {photo && active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[80] flex flex-col bg-background"
        >
          <div className="flex items-start justify-between gap-4 px-5 py-4 sm:items-center sm:gap-6 sm:px-8">
            <p
              id={titleId}
              className="min-w-0 font-mono text-[11px] uppercase leading-5 tracking-[0.18em] text-foreground/45"
            >
              <span className="text-accent">{indexLabel(active)}</span>
              <span className="mx-2 text-foreground/20">/</span>
              {photo.caption}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setActive(null)}
              className="shrink-0 border border-foreground/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/70 outline-none transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:ring-1 focus-visible:ring-accent"
            >
              Close
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center gap-3 px-5 pb-6 sm:gap-6 sm:px-8 sm:pb-10">
            <button
              type="button"
              aria-label="Previous photograph"
              onClick={() =>
                setActive((current) =>
                  current === null
                    ? current
                    : (current - 1 + photos.length) % photos.length,
                )
              }
              className="flex size-10 shrink-0 items-center justify-center border border-foreground/15 text-foreground/70 outline-none transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:ring-1 focus-visible:ring-accent"
            >
              <Arrow direction="left" />
            </button>

            <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center">
              <img
                src={photo.src}
                alt={photo.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <button
              type="button"
              aria-label="Next photograph"
              onClick={() =>
                setActive((current) =>
                  current === null ? current : (current + 1) % photos.length,
                )
              }
              className="flex size-10 shrink-0 items-center justify-center border border-foreground/15 text-foreground/70 outline-none transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:ring-1 focus-visible:ring-accent"
            >
              <Arrow direction="right" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M8 1 3 6l5 5" : "M4 1l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}
