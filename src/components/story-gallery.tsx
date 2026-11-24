"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/pikaicons";

/*
 * Photos from campus, at the foot of Our story: a carousel that shows two
 * photos at a time (one on phones) and moves on by one every few seconds.
 *
 * It loops without rewinding: the photos are rendered twice, and when the
 * track has glided onto the copies it jumps back to the originals with the
 * transition off, which looks the same. The progress bar under the photos
 * times each step (a CSS animation, so pausing is just pausing it): it pauses
 * on hover, on keyboard focus and while off screen, and doesn't run with
 * reduced motion. The arrows, the bar, swipe or drag, and the arrow keys move it too.
 *
 * Photos are web copies of public/story/images, cropped where the original
 * has a GPS-camera stamp (public/story/gallery).
 */

type Photo = { src: string; width: number; height: number; alt: string; caption: string };

const photos: Photo[] = [
  {
    src: "/story/gallery/1.webp",
    width: 1280,
    height: 960,
    alt: "A trainer with a full batch of students in uniform, gathered in their classroom.",
    caption: "A full batch and their trainer, in their own classroom.",
  },
  {
    src: "/story/gallery/4.webp",
    width: 1280,
    height: 650,
    alt: "Students with laptops follow a live session in a large lab.",
    caption: "A hands-on session in Pilani, Rajasthan.",
  },
  {
    src: "/story/gallery/2.webp",
    width: 1280,
    height: 960,
    alt: "A trainer walks students through a game they are coding, sketched out on the whiteboard.",
    caption: "Sketch it on the board, then build it: a Flappy Bird clone.",
  },
  {
    src: "/story/gallery/3.webp",
    width: 960,
    height: 720,
    alt: "A trainer talks with two students at their desks in a computer lab.",
    caption: "One to one at the desk, in Faridabad.",
  },
  {
    src: "/story/gallery/5.webp",
    width: 1280,
    height: 853,
    alt: "College faculty with laptops at a workshop on smart learning using AI.",
    caption: "Faculty learn too: a workshop on smart learning with AI.",
  },
];

const n = photos.length;
const loop = [...photos, ...photos];
const pad = (i: number) => String(i + 1).padStart(2, "0");

export function StoryGallery() {
  /** Position on the doubled track, 0 … n; n shows the same as 0. */
  const [at, setAt] = useState(0);
  const [instant, setInstant] = useState(false);
  const [dx, setDx] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const drag = useRef<{ x: number; id: number; moved: boolean } | null>(null);
  const cur = at % n;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // After a jump with the transition off, turn it back on a frame later.
  useEffect(() => {
    if (!instant) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)));
    return () => cancelAnimationFrame(id);
  }, [instant]);

  const next = () => setAt((a) => Math.min(a + 1, n));
  function prev() {
    if (at > 0) return setAt(at - 1);
    // From the first photo: jump to the copy of it, then glide back one.
    setInstant(true);
    setAt(n);
    requestAnimationFrame(() => requestAnimationFrame(() => setAt(n - 1)));
  }
  function onTrackEnd(e: React.TransitionEvent) {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (at >= n) {
      setInstant(true);
      setAt(at - n);
    }
  }

  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, id: e.pointerId, moved: false };
  }
  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const delta = e.clientX - d.x;
    if (!d.moved && Math.abs(delta) > 6) {
      d.moved = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    if (d.moved) setDx(delta);
  }
  function onPointerUp(e: React.PointerEvent) {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId || !d.moved) return;
    const delta = e.clientX - d.x;
    setDx(0);
    if (delta < -50) next();
    else if (delta > 50) prev();
  }

  return (
    <section
      ref={root}
      className="gl"
      aria-roledescription="carousel"
      aria-label="Photos from our campuses"
      data-paused={!onScreen || dx !== 0 || undefined}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      <div className="gl__head">
        <h2 className="max-w-[760px] text-[clamp(24px,2.6vw,32px)] leading-[1.25] font-normal tracking-[-0.02em] text-text">
          In the room. <span className="text-text-muted">Where the work actually happens.</span>
        </h2>
        <div className="gl__controls">
          <p className="gl__count" aria-live="polite">
            <span>{pad(cur)}</span> / {pad(n - 1)}
          </p>
          <button type="button" className="gl__btn" onClick={prev} aria-label="Previous photo">
            <ArrowLeftIcon width={18} height={18} aria-hidden="true" />
          </button>
          <button type="button" className="gl__btn" onClick={next} aria-label="Next photo">
            <ArrowRightIcon width={18} height={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className="gl__viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <ul
          className="gl__track"
          data-instant={instant || dx !== 0 || undefined}
          style={{ "--at": at, "--dx": `${dx}px` } as React.CSSProperties}
          onTransitionEnd={onTrackEnd}
        >
          {loop.map((p, i) => {
            const shown = i === at || i === at + 1;
            return (
              <li
                key={i}
                className="gl__slide"
                data-shown={shown || undefined}
                aria-hidden={!shown}
                aria-roledescription="slide"
                aria-label={`${(i % n) + 1} of ${n}`}
              >
                <figure>
                  <div className="gl__frame">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={p.width}
                      height={p.height}
                      sizes="(min-width: 1266px) 580px, (min-width: 768px) 46vw, 90vw"
                      className="gl__img"
                      draggable={false}
                    />
                  </div>
                  <figcaption className="gl__caption">
                    <span>{pad(i % n)}</span>
                    {p.caption}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>

      <ol className="gl__progress" aria-label="Choose a photo">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              aria-label={`Photo ${i + 1}`}
              aria-current={i === cur || undefined}
              data-done={i < cur || undefined}
              onClick={() => setAt(i)}
            >
              {i === cur && <span className="gl__fill" onAnimationEnd={next} />}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
