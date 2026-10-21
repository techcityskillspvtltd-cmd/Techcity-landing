"use client";

import { useCallback, useEffect, useRef, type PointerEvent } from "react";
import AsciiCity from "@/components/AsciiCity";
import { PartnerCta } from "@/components/PartnerApply";
import ThemeToggle from "@/components/ThemeToggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

const FOLLOW_X = 18;
const FOLLOW_Y = 14;
const FOLLOW_EASE = 0.07;

function FooterBar() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-6 sm:px-8 md:flex-row md:items-end md:justify-between md:gap-4 lg:py-8">
      <div className="pointer-events-auto flex flex-col items-start gap-3">
        <PartnerCta />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href="/privacy-policy"
            className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/40 transition-colors hover:text-foreground"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-and-conditions"
            className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/40 transition-colors hover:text-foreground"
          >
            Terms and Conditions
          </a>
          <ThemeToggle />
        </div>
      </div>
      <div className="pointer-events-auto flex flex-col items-start gap-2 text-left sm:gap-3 md:items-end md:text-right">
        <a
          href="mailto:techcityskillspvt.ltd@gmail.com"
          className="w-fit text-[11px] text-foreground/55 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
        >
          techcityskillspvt.ltd@gmail.com
        </a>
        <a
          href="tel:+919650657821"
          className="w-fit text-[11px] text-foreground/55 transition-colors hover:text-foreground"
        >
          9650657821
        </a>
      </div>
    </div>
  );
}

function FooterNav() {
  return (
    <nav aria-label="Footer">
      <ul className="flex flex-col items-center gap-3 lg:gap-4">
        {nav.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/45 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterMobile() {
  return (
    <div className="relative w-full pt-10">
      <div className="pointer-events-auto flex flex-col items-center gap-10">
        <FooterNav />
        <div className="w-full">
          <FooterBar />
        </div>
      </div>
    </div>
  );
}

function FooterHands() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const reducedRef = useRef(false);
  const posRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const tick = useCallback(() => {
    const pos = posRef.current;
    pos.x += (pos.tx - pos.x) * FOLLOW_EASE;
    pos.y += (pos.ty - pos.y) * FOLLOW_EASE;

    const left = leftRef.current;
    const right = rightRef.current;
    const transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    if (left) left.style.transform = transform;
    if (right) right.style.transform = transform;

    if (Math.abs(pos.tx - pos.x) > 0.04 || Math.abs(pos.ty - pos.y) > 0.04) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const startTick = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedRef.current) return;
    const scene = sceneRef.current;
    if (!scene) return;
    const rect = scene.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    posRef.current.tx = nx * FOLLOW_X * 2;
    posRef.current.ty = ny * FOLLOW_Y * 2;
    startTick();
  };

  const onPointerLeave = () => {
    posRef.current.tx = 0;
    posRef.current.ty = 0;
    startTick();
  };

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={sceneRef}
      className="relative mt-0 h-[min(104svh,64rem)] w-full overflow-hidden"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="pointer-events-none absolute inset-x-0 top-[22%] bottom-[26%] z-20 flex items-start justify-between">
        <div
          ref={leftRef}
          className="relative h-full w-[46%] will-change-transform"
        >
          <AsciiCity
            src="/ascii-hand-left.png"
            cropX={0}
            cropY={0}
            fit="contain"
            knockout
            className="h-full w-full cursor-pointer pointer-events-auto"
          />
        </div>
        <div
          ref={rightRef}
          className="relative h-full w-[46%] will-change-transform"
        >
          <AsciiCity
            src="/ascii-hand-right.png"
            cropX={1}
            cropY={0}
            fit="contain"
            knockout
            className="h-full w-full cursor-pointer pointer-events-auto"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="pointer-events-auto absolute left-1/2 top-[min(42.6svh,25.9rem)] -translate-x-1/2 -translate-y-1/2">
          <FooterNav />
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <FooterBar />
        </div>
      </div>
    </div>
  );
}

export default function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <footer id="contact" className="relative">
      {compact ? (
        <FooterBar />
      ) : (
        <>
          <div className="lg:hidden">
            <FooterMobile />
          </div>
          <div className="hidden lg:block">
            <FooterHands />
          </div>
        </>
      )}
    </footer>
  );
}
