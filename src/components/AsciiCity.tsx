"use client";

import { useCallback, useEffect, useRef, type PointerEvent } from "react";

const SOURCE = "/tech-city.jpg?v=2";
const DARKEN_SHADOW = 0.36;
const DARKEN_HIGHLIGHT = 0.58;
const DETAIL_SHADOW = 0.48;
const DETAIL_HIGHLIGHT = 0.84;
const BLOB_RADIUS = 64;

const RAMP =
  " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const RAMP_LAST = RAMP.length - 1;

type Cell = {
  luma: number;
  r: number;
  g: number;
  b: number;
  knockout?: boolean;
};

type AsciiCityProps = {
  src?: string;
  cropX?: number;
  cropY?: number;
  fit?: "cover" | "contain";
  knockout?: boolean;
  detail?: boolean;
  revealOnView?: boolean;
  className?: string;
};

type Grid = {
  cells: Cell[];
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
  font: string;
  dpr: number;
  vivid: boolean;
  detail: boolean;
  light: boolean;
  /** Dark + detail + narrow viewport: brighter glyphs so the city reads on phones */
  mobileBoost: boolean;
};

function isLightTheme() {
  return document.documentElement.dataset.theme === "light";
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

function luma(r: number, g: number, b: number) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function hash2(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function coverCrop(
  imgW: number,
  imgH: number,
  cols: number,
  rows: number,
  biasX = 0.62,
  biasY = 0.12,
) {
  const imageRatio = imgW / imgH;
  const canvasRatio = cols / rows;
  if (imageRatio > canvasRatio) {
    const sw = imgH * canvasRatio;
    return { sx: (imgW - sw) * biasX, sy: 0, sw, sh: imgH };
  }
  const sh = imgW / canvasRatio;
  return { sx: 0, sy: (imgH - sh) * biasY, sw: imgW, sh };
}

type SourceRect = { x: number; y: number; w: number; h: number };

const boundsCache = new WeakMap<HTMLImageElement, SourceRect>();

function opaqueBounds(img: HTMLImageElement): SourceRect {
  const cached = boundsCache.get(img);
  if (cached) return cached;
  const full = { x: 0, y: 0, w: img.width, h: img.height };
  const probe = document.createElement("canvas");
  probe.width = img.width;
  probe.height = img.height;
  const probeCtx = probe.getContext("2d", { willReadFrequently: true });
  if (!probeCtx) return full;
  probeCtx.drawImage(img, 0, 0);
  const data = probeCtx.getImageData(0, 0, img.width, img.height).data;
  let minX = img.width;
  let minY = img.height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const o = (y * img.width + x) * 4;
      if (data[o + 3] < 18) continue;
      const l = 0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2];
      if (l < 18) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < minX || maxY < minY) {
    boundsCache.set(img, full);
    return full;
  }
  const padX = Math.round((maxX - minX) * 0.03);
  const padY = Math.round((maxY - minY) * 0.06);
  const x = Math.max(0, minX - padX);
  const y = Math.max(0, minY - padY);
  const bounds = {
    x,
    y,
    w: Math.min(img.width - 1, maxX + padX) - x + 1,
    h: Math.min(img.height - 1, maxY + padY) - y + 1,
  };
  boundsCache.set(img, bounds);
  return bounds;
}

function drawContained(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cols: number,
  rows: number,
  options: { cropX: number; cropY: number },
  src: SourceRect,
) {
  const imageRatio = src.w / src.h;
  const marginX = cols * 0.05;
  const marginY = rows * 0.04;
  const boxW = Math.max(1, cols - marginX * 2);
  const boxH = Math.max(1, rows - marginY * 2);
  const canvasRatio = boxW / boxH;
  const dw = imageRatio > canvasRatio ? boxW : boxH * imageRatio;
  const dh = imageRatio > canvasRatio ? boxW / imageRatio : boxH;
  const dx = marginX + (boxW - dw) * options.cropX;
  const dy = marginY + (boxH - dh) * options.cropY;
  ctx.clearRect(0, 0, cols, rows);
  ctx.drawImage(
    img,
    src.x,
    src.y,
    src.w,
    src.h,
    dx,
    dy,
    Math.max(1, dw),
    Math.max(1, dh),
  );
}

function drawSource(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cols: number,
  rows: number,
  options: {
    cropX: number;
    cropY: number;
    fit: "cover" | "contain";
    knockout?: boolean;
  },
) {
  if (options.knockout) {
    drawContained(ctx, img, cols, rows, options, opaqueBounds(img));
    return;
  }
  if (options.fit === "contain") {
    drawContained(ctx, img, cols, rows, options, {
      x: 0,
      y: 0,
      w: img.width,
      h: img.height,
    });
    return;
  }

  const crop = coverCrop(
    img.width,
    img.height,
    cols,
    rows,
    options.cropX,
    options.cropY,
  );
  ctx.drawImage(img, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, cols, rows);
}

function percentile(sorted: number[], p: number) {
  const i = Math.min(
    sorted.length - 1,
    Math.max(0, Math.floor((sorted.length - 1) * p)),
  );
  return sorted[i];
}

function contrastTone(tone: number) {
  const t = Math.min(1, Math.max(0, tone));
  return t < 0.5
    ? Math.pow(t * 2, 1.2) / 2
    : 1 - Math.pow((1 - t) * 2, 1.2) / 2;
}

function cellChar(cell: Cell, light = false, detail = false) {
  if (cell.knockout) return " ";
  const tone = light
    ? detail
      ? contrastTone(cell.luma)
      : Math.pow(cell.luma, 0.72)
    : cell.luma;
  const idx = Math.min(RAMP_LAST, Math.floor(tone * RAMP_LAST + 0.0001));
  return RAMP[idx];
}

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  return { h: h / 6, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  const hue = (p: number, q: number, t: number) => {
    let next = t;
    if (next < 0) next += 1;
    if (next > 1) next -= 1;
    if (next < 1 / 6) return p + (q - p) * 6 * next;
    if (next < 1 / 2) return q;
    if (next < 2 / 3) return p + (q - p) * (2 / 3 - next) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hue(p, q, h + 1 / 3) * 255);
  const g = Math.round(hue(p, q, h) * 255);
  const b = Math.round(hue(p, q, h - 1 / 3) * 255);
  return `rgb(${r} ${g} ${b})`;
}

function lightColor(
  r: number,
  g: number,
  b: number,
  tone: number,
  hover: boolean,
  detail: boolean,
) {
  const hsl = rgbToHsl(r, g, b);
  const t = Math.min(1, Math.max(0, tone));
  const warm = hsl.h < 0.16 || hsl.h > 0.9;
  const shaped = Math.pow(t, detail ? 0.76 : 0.8);
  if (hsl.s < 0.06) {
    const lightness = (detail ? 0.5 : 0.48) - shaped * (detail ? 0.22 : 0.16);
    return hslToRgb(0.08, detail ? 0.1 : 0.16, hover ? Math.max(0.22, lightness - 0.04) : lightness);
  }
  if (detail) {
    const sat = Math.min(0.84, (warm ? 0.5 : 0.4) + hsl.s * 0.85);
    const minL = warm ? 0.32 : 0.3;
    const maxL = warm ? 0.56 : 0.5;
    const lightness = maxL - shaped * (maxL - minL);
    return hslToRgb(
      hsl.h,
      hover ? Math.min(0.9, sat + 0.08) : sat,
      hover ? Math.max(0.24, lightness - 0.04) : lightness,
    );
  }
  const sat = Math.min(0.68, 0.42 + hsl.s * 0.4);
  const minL = hover ? 0.28 : 0.32;
  const maxL = hover ? 0.54 : 0.5;
  const lightness = maxL - shaped * (maxL - minL);
  return hslToRgb(hsl.h, hover ? Math.min(0.76, sat + 0.06) : sat, lightness);
}

const MOBILE_DETAIL_SHADOW = 1.08;
const MOBILE_DETAIL_HIGHLIGHT = 1.55;

function cellFill(
  cell: Cell,
  hover: boolean,
  vivid = false,
  detail = false,
  light = false,
  mobileBoost = false,
) {
  const { r, g, b, luma: t } = cell;
  if (light) return lightColor(r, g, b, t, hover, detail);
  const shade = vivid
    ? hover
      ? 1.14 + t * 0.22
      : 0.78 + t * 0.4
    : detail
      ? hover
        ? 1.16 + t * 0.24
        : mobileBoost
          ? MOBILE_DETAIL_SHADOW +
            t * (MOBILE_DETAIL_HIGHLIGHT - MOBILE_DETAIL_SHADOW)
          : DETAIL_SHADOW + t * (DETAIL_HIGHLIGHT - DETAIL_SHADOW)
      : hover
        ? 1.08 + t * 0.18
        : DARKEN_SHADOW + t * (DARKEN_HIGHLIGHT - DARKEN_SHADOW);
  return `rgb(${Math.min(255, Math.round(r * shade))} ${Math.min(255, Math.round(g * shade))} ${Math.min(255, Math.round(b * shade))})`;
}

function sharpenDetail(cells: Cell[], cols: number, rows: number, light = false) {
  const src = cells.map((cell) => cell.luma);
  for (let y = 1; y < rows - 1; y++) {
    for (let x = 1; x < cols - 1; x++) {
      const i = y * cols + x;
      const c = src[i];
      const blur =
        (src[i - cols - 1] +
          src[i - cols] +
          src[i - cols + 1] +
          src[i - 1] +
          c +
          src[i + 1] +
          src[i + cols - 1] +
          src[i + cols] +
          src[i + cols + 1]) /
        9;
      const edge = c - blur;
      const quietSky = c < 0.07 && Math.abs(edge) < 0.05;
      cells[i].luma = quietSky
        ? c
        : Math.min(1, Math.max(0, c + edge * (light ? 1.7 : 1.15)));
    }
  }
}

function sampleCells(
  img: HTMLImageElement,
  cols: number,
  rows: number,
  options: {
    cropX: number;
    cropY: number;
    fit: "cover" | "contain";
    knockout: boolean;
    detail: boolean;
    light: boolean;
  },
): Cell[] {
  const off = document.createElement("canvas");
  off.width = cols;
  off.height = rows;
  const ctx = off.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = options.detail ? "high" : "low";
  drawSource(ctx, img, cols, rows, options);
  const data = ctx.getImageData(0, 0, cols, rows).data;
  const cells: Cell[] = new Array(cols * rows);
  const lumas: number[] = new Array(cells.length);
  const keep: number[] = [];

  for (let i = 0; i < cells.length; i++) {
    const o = i * 4;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const a = data[o + 3];
    const l = luma(r, g, b);
    lumas[i] = l;
    const knockout = options.knockout && (a < 18 || l < 0.07);
    cells[i] = { luma: l, r, g, b, knockout };
    if (!knockout) keep.push(l);
  }

  const sorted = (keep.length ? keep : lumas).slice().sort((a, b) => a - b);
  const lo = percentile(sorted, options.detail ? 0.16 : 0.08);
  const hi = percentile(sorted, options.detail ? 0.8 : 0.94);
  const range = Math.max(0.12, hi - lo);

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].knockout) {
      cells[i].luma = 0;
      continue;
    }
    let t = (lumas[i] - lo) / range;
    t = Math.min(1, Math.max(0, t));
    t = Math.pow(t, options.detail ? 0.78 : 0.72);
    cells[i].luma = t;
  }

  if (options.detail) sharpenDetail(cells, cols, rows, options.light);

  return cells;
}

function monoFamily() {
  const probe = document.createElement("span");
  probe.style.fontFamily =
    "var(--font-geist-mono), ui-monospace, Menlo, Consolas, monospace";
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  const family = getComputedStyle(probe).fontFamily;
  probe.remove();
  return family || "ui-monospace, monospace";
}

function paintBase(grid: Grid) {
  const { cells, cols, rows, cellW, cellH, font, dpr } = grid;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(cols * cellW));
  canvas.height = Math.max(1, Math.round(rows * cellH));
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.scale(dpr, dpr);
  ctx.font = font;
  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  const cssCellW = cellW / dpr;
  const cssCellH = cellH / dpr;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = cells[y * cols + x];
      if (!cell || cell.knockout) continue;
      const char = cellChar(cell, grid.light, grid.detail);
      if (char === " ") continue;
      ctx.fillStyle = cellFill(
        cell,
        false,
        grid.vivid,
        grid.detail,
        grid.light,
        grid.mobileBoost,
      );
      ctx.fillText(char, x * cssCellW, y * cssCellH);
    }
  }

  return canvas;
}

export default function AsciiCity({
  src = SOURCE,
  cropX = 0.62,
  cropY = 0.12,
  fit = "cover",
  knockout = false,
  detail = false,
  revealOnView = false,
  className = "h-full w-full",
}: AsciiCityProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseRef = useRef<HTMLCanvasElement | null>(null);
  const gridRef = useRef<Grid | null>(null);
  const introRef = useRef(1);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const pointerRef = useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    radius: 0,
    targetRadius: 0,
  });

  const renderFrame = useCallback((time = 0) => {
    const canvas = canvasRef.current;
    const base = baseRef.current;
    const grid = gridRef.current;
    if (!canvas || !base || !grid) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h, dpr } = sizeRef.current;
    const intro = introRef.current;
    const pointer = pointerRef.current;

    pointer.x += (pointer.tx - pointer.x) * 0.34;
    pointer.y += (pointer.ty - pointer.y) * 0.34;
    pointer.radius += (pointer.targetRadius - pointer.radius) * 0.28;

    ctx.clearRect(0, 0, w, h);
    const revealRows = Math.ceil(grid.rows * Math.min(1, intro * 1.08));
    const revealH = Math.min(h, revealRows * grid.cellH + 1);

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, w, revealH);
    ctx.clip();
    ctx.globalAlpha = Math.min(1, intro * 1.4);
    ctx.drawImage(base, 0, 0);

    if (pointer.radius > 0.6) {
      const cssCellW = grid.cellW / dpr;
      const cssCellH = grid.cellH / dpr;
      const radius = pointer.radius * dpr;
      const t = time / 1000;

      const colStart = Math.max(
        0,
        Math.floor((pointer.x - radius * 1.35) / grid.cellW),
      );
      const colEnd = Math.min(
        grid.cols - 1,
        Math.ceil((pointer.x + radius * 1.35) / grid.cellW),
      );
      const rowStart = Math.max(
        0,
        Math.floor((pointer.y - radius * 1.35) / grid.cellH),
      );
      const rowEnd = Math.min(
        grid.rows - 1,
        Math.ceil((pointer.y + radius * 1.35) / grid.cellH),
      );

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.font = grid.font;
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      ctx.globalAlpha = 1;

      for (let row = rowStart; row <= rowEnd; row++) {
        for (let col = colStart; col <= colEnd; col++) {
          const cell = grid.cells[row * grid.cols + col];
          if (!cell || cell.knockout) continue;
          const char = cellChar(cell, grid.light, grid.detail);
          if (char === " ") continue;

          const cx = (col + 0.5) * grid.cellW;
          const cy = (row + 0.5) * grid.cellH;
          const dist = Math.hypot(cx - pointer.x, cy - pointer.y);
          const n = hash2(col, row);
          const pulse = 0.5 + 0.5 * Math.sin(t * 2.4 + n * 6.28318);
          const localRadius = radius * (0.62 + n * 0.48 + pulse * 0.1);

          if (dist > localRadius) continue;

          ctx.fillStyle = cellFill(
            cell,
            true,
            grid.vivid,
            grid.detail,
            grid.light,
            grid.mobileBoost,
          );
          ctx.fillText(char, col * cssCellW, row * cssCellH);
        }
      }
      ctx.restore();
    }

    ctx.restore();

    const moving =
      intro < 1 ||
      pointer.radius > 0.5 ||
      Math.abs(pointer.targetRadius - pointer.radius) > 0.15 ||
      Math.abs(pointer.tx - pointer.x) > 0.15 ||
      Math.abs(pointer.ty - pointer.y) > 0.15;

    if (moving) {
      rafRef.current = requestAnimationFrame(renderFrame);
    }
  }, []);

  const build = useCallback(
    async (img: HTMLImageElement) => {
      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas) return;

      const cssW = wrap.clientWidth;
      const cssH = wrap.clientHeight;
      if (cssW < 8 || cssH < 8) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const width = Math.round(cssW * dpr);
      const height = Math.round(cssH * dpr);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      sizeRef.current = { w: width, h: height, dpr };

      const light = isLightTheme();
      const mobile = cssW < 1024;
      const mobileBoost = Boolean(detail && !light && mobile);
      const cols = detail
        ? Math.round(
            Math.min(
              light ? 300 : mobileBoost ? 160 : 240,
              Math.max(
                light ? 150 : mobileBoost ? 72 : 100,
                cssW / (light ? 2.9 : mobileBoost ? 4.6 : 3.8),
              ),
            ),
          )
        : Math.round(
            Math.min(light ? 210 : 180, Math.max(light ? 96 : 80, cssW / (light ? 4.2 : 5.1))),
          );
      const cellW = width / cols;
      const fontSize = detail
        ? Math.max(
            mobileBoost ? 7 : 5,
            (cellW / dpr) * (light ? 1.2 : mobileBoost ? 1.18 : 1.02),
          )
        : Math.max(7, (cellW / dpr) * (light ? 1.34 : 1.24));
      const cellH = fontSize * dpr * (detail ? 1.06 : 0.88);
      const rows = Math.max(28, Math.floor(height / cellH));
      const family = monoFamily();

      const grid: Grid = {
        cells: sampleCells(img, cols, rows, {
          cropX,
          cropY,
          fit,
          knockout,
          detail,
          light,
        }),
        cols,
        rows,
        cellW,
        cellH,
        font: `${fontSize}px ${family}`,
        dpr,
        vivid: knockout,
        detail,
        light,
        mobileBoost,
      };
      gridRef.current = grid;
      baseRef.current = paintBase(grid);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(renderFrame);
    },
    [cropX, cropY, detail, fit, knockout, renderFrame],
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let cancelled = false;
    let img: HTMLImageElement | null = null;
    let running = false;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let started = false;
    introRef.current = revealOnView ? 0 : 1;
    const playIntro = () => {
      if (started || cancelled) return;
      started = true;
      if (reduced) {
        introRef.current = 1;
        renderFrame();
        return;
      }
      introRef.current = 0;
      const start = performance.now();
      const intro = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / 1100);
        introRef.current = 1 - Math.pow(1 - t, 3);
        renderFrame();
        if (t < 1) requestAnimationFrame(intro);
      };
      requestAnimationFrame(intro);
    };

    const setup = async () => {
      img = await loadImage(src);
      if (cancelled) return;
      await build(img);
      if (cancelled) return;
      if (!revealOnView) {
        playIntro();
        return;
      }
      const rect = wrap.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) playIntro();
    };

    void setup();

    let io: IntersectionObserver | null = null;
    if (revealOnView) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          playIntro();
          io?.disconnect();
        },
        { threshold: 0.02 },
      );
      io.observe(wrap);
    }

    const ro = new ResizeObserver(() => {
      if (!img || running) return;
      running = true;
      requestAnimationFrame(() => {
        running = false;
        if (cancelled || !img) return;
        void build(img);
      });
    });
    ro.observe(wrap);

    const onTheme = () => {
      if (cancelled || !img) return;
      void build(img);
    };
    window.addEventListener("techcity-theme", onTheme);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io?.disconnect();
      window.removeEventListener("techcity-theme", onTheme);
    };
  }, [build, renderFrame, revealOnView, src]);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = sizeRef.current.dpr;
    pointerRef.current.tx = (event.clientX - rect.left) * dpr;
    pointerRef.current.ty = (event.clientY - rect.top) * dpr;
    pointerRef.current.targetRadius = BLOB_RADIUS;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(renderFrame);
  };

  const onPointerLeave = () => {
    pointerRef.current.targetRadius = 0;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(renderFrame);
  };

  return (
    <div
      ref={wrapRef}
      className={className}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <canvas ref={canvasRef} className="ascii-canvas block h-full w-full" />
    </div>
  );
}
