"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ProgramFigure } from "@/components/ProgramArt";
import { programFamilies, type ProgramFamily, type ProgramFamilyId } from "@/data/programs";

const CARD_FACE = "#101114";
const IDLE_MS = 3500;
const SWIPE_PX = 40;
const EASE = [0.32, 0.72, 0, 1] as const;

const CARD_ACCENTS: Record<ProgramFamilyId, string> = {
  trainers: "#7c6bff",
  faculty: "#2dd4bf",
  placement: "#f59e0b",
  placing: "#3dd68c",
  mentorship: "#60a5fa",
  online: "#22d3ee",
  content: "#fb7185",
  platforms: "#a78bfa",
};

/** Front of a cylinder. x is a fraction of the card width. */
const SLOTS = [
  { x: 0, z: 0, rotate: 0, scale: 1, opacity: 1, blur: 0 },
  { x: 0.93, z: -140, rotate: 34, scale: 1, opacity: 1, blur: 0 },
  { x: 1.54, z: -300, rotate: 46, scale: 0.86, opacity: 1, blur: 1.5 },
  { x: 2.12, z: -560, rotate: 58, scale: 0.78, opacity: 0, blur: 4 },
];

function wrap(index: number) {
  const count = programFamilies.length;
  return ((index % count) + count) % count;
}

/** Shortest step around the ring, in (-count/2, count/2]. */
function ringOffset(index: number, active: number) {
  const count = programFamilies.length;
  let delta = (index - active) % count;
  if (delta > count / 2) delta -= count;
  if (delta < -count / 2) delta += count;
  return delta;
}

function slotStyle(offset: number, spread = 1, width = 1) {
  const distance = Math.min(Math.abs(offset), SLOTS.length - 1);
  const side = Math.sign(offset);
  const slot = SLOTS[distance];
  return {
    x: side * slot.x * spread * width,
    z: slot.z,
    rotateY: side * slot.rotate,
    scale: slot.scale,
    opacity: slot.opacity,
    filter: `blur(${slot.blur}px)`,
    zIndex: 10 - distance,
  };
}

function cardSize(width: number, height: number, spread: number) {
  const padW = width * 0.96;
  const padH = height * 0.92;
  const half = 1.54 * spread + 0.86 / 2;
  let w = padW / (2 * half);
  let h = w / 1.02;
  if (h > padH) {
    h = padH;
    w = h * 1.02;
  }
  return { w: Math.max(160, w), h: Math.max(156, h) };
}

function ProgramOrbitCard({ family, light }: { family: ProgramFamily; light: boolean }) {
  const accent = CARD_ACCENTS[family.id];
  const face = light ? "#f7f8fa" : CARD_FACE;
  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden rounded-xl border px-4 py-4 ${light ? "border-black/10" : "border-white/10"}`}
      style={{ background: face }}
    >
      <span className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.16em]" style={{ color: accent }}>
          {family.index}
        </span>
        <span
          className={`truncate font-mono text-[10px] uppercase tracking-[0.14em] ${light ? "text-black/45" : "text-white/40"}`}
        >
          {family.figure}
        </span>
      </span>
      <span className="flex min-h-0 flex-1 items-center justify-center py-2">
        <ProgramFigure
          id={family.id}
          caption={family.figure}
          index={family.index}
          fill
          plate={face}
          ink={accent}
          className="w-[78%]"
        />
      </span>
      <span
        className={`shrink-0 text-left text-[1.02rem] leading-snug font-medium tracking-tight ${light ? "text-[#1a1916]" : "text-[#f4f7fb]"}`}
      >
        {family.title}
      </span>
    </div>
  );
}

export default function ProgramShowcase({ light }: { light: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [spread, setSpread] = useState(1);
  const [size, setSize] = useState({ w: 280, h: 274 });
  const reduced = useReducedMotion();
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const previousOffset = useRef(new Map<string, number>());

  const step = (delta: number) => {
    setActive((current) => wrap(current + delta));
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const rect = root.getBoundingClientRect();
      const narrow = rect.width <= 639;
      const nextSpread = narrow ? 1.08 : 1;
      setSpread((current) => (current === nextSpread ? current : nextSpread));
      if (!rect.width || !rect.height) return;
      const next = cardSize(rect.width, rect.height, nextSpread);
      setSize((current) =>
        Math.round(current.w) === Math.round(next.w) && Math.round(current.h) === Math.round(next.h)
          ? current
          : next,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (held || reduced) return;
    const timeout = window.setTimeout(() => step(-1), IDLE_MS);
    return () => window.clearTimeout(timeout);
  }, [held, reduced, active]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    swiped.current = false;
    if (event.button !== 0) return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return;
    swiped.current = true;
    step(dx < 0 ? 1 : -1);
  };

  const placed = programFamilies.map((family, index) => {
    const offset = ringOffset(index, active);
    const previous = previousOffset.current.get(family.id);
    const hiddenJump =
      previous !== undefined &&
      Math.abs(previous) > 2 &&
      Math.abs(offset) > 2 &&
      Math.sign(previous) !== Math.sign(offset);
    previousOffset.current.set(family.id, offset);
    return { family, offset, hiddenJump };
  });

  return (
    <div
      ref={rootRef}
      className="relative h-full w-full overflow-hidden [perspective:1400px]"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => {
        setHeld(false);
        swipeStart.current = null;
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        swipeStart.current = null;
      }}
      onClickCapture={(event) => {
        if (!swiped.current) return;
        swiped.current = false;
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        style={{ width: size.w, height: size.h, transform: "translate(-50%, -50%)" }}
      >
        {placed.map(({ family, offset, hiddenJump }) => {
          const main = offset === 0;
          const onStage = Math.abs(offset) <= 2;
          return (
            <motion.div
              key={family.id}
              data-offset={offset}
              initial={false}
              animate={slotStyle(offset, spread, size.w)}
              transition={{ duration: reduced || hiddenJump ? 0 : 0.6, ease: EASE }}
              className="absolute inset-0 origin-center [transform-style:preserve-3d]"
              style={{ pointerEvents: onStage ? "auto" : "none" }}
            >
              {main ? (
                <Link
                  href={`/programs#${family.id}`}
                  draggable={false}
                  aria-label={family.title}
                  className="block h-full w-full"
                >
                  <ProgramOrbitCard family={family} light={light} />
                </Link>
              ) : (
                <div className="h-full w-full" aria-hidden={!onStage}>
                  <ProgramOrbitCard family={family} light={light} />
                  {onStage ? (
                    <button
                      type="button"
                      className="absolute inset-0 cursor-pointer rounded-xl"
                      aria-label={`Show ${family.title}`}
                      onClick={() => {
                        if (!swiped.current) step(offset);
                      }}
                    />
                  ) : null}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
