"use client";

import { useEffect, useRef, useState } from "react";

const SPIN_MS = 1600;
const EASE = "cubic-bezier(0.22, 0.7, 0.2, 1)";

function reelDigits(digit: number) {
  const cells: number[] = [];
  for (let cycle = 0; cycle < 2; cycle += 1) {
    for (let value = 0; value <= 9; value += 1) cells.push(value);
  }
  cells.push(digit);
  return cells;
}

function DigitReel({
  digit,
  delay,
  play,
}: {
  digit: number;
  delay: number;
  play: boolean;
}) {
  const reel = useRef<HTMLSpanElement>(null);
  const cells = reelDigits(digit);
  const end = cells.length - 1;

  useEffect(() => {
    const node = reel.current;
    if (!node) return;

    node.style.transition = "none";
    node.style.transform = play ? "translateY(0)" : `translateY(-${end}em)`;
    if (!play) return;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        node.style.transition = `transform ${SPIN_MS}ms ${EASE} ${delay}ms`;
        node.style.transform = `translateY(-${end}em)`;
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [delay, end, play]);

  return (
    <span className="inline-block h-[1em] overflow-hidden align-bottom">
      <span ref={reel} className="block" style={{ transform: `translateY(-${end}em)` }}>
        {cells.map((value, index) => (
          <span key={index} className="block h-[1em] leading-none">
            {value}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function SlotNumber({
  value,
  delay = 0,
}: {
  value: string;
  delay?: number;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setPlay(true);
        observer.disconnect();
      },
      { threshold: 0.55 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const characters = value.split("");
  const digitOffsets = characters.reduce<number[]>((offsets, character) => {
    if (/\d/.test(character)) offsets.push(offsets.length);
    else offsets.push(-1);
    return offsets;
  }, []);

  return (
    <span ref={root} className="inline-flex items-end tabular-nums">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex items-end">
        {characters.map((character, index) => {
          const digitOffset = digitOffsets[index] ?? -1;
          if (digitOffset < 0) {
            return (
              <span key={index} className="leading-none">
                {character}
              </span>
            );
          }

          return (
            <DigitReel
              key={index}
              digit={Number(character)}
              delay={delay + digitOffset * 140}
              play={play}
            />
          );
        })}
      </span>
    </span>
  );
}
