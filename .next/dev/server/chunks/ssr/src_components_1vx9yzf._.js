module.exports = [
"[project]/src/components/AsciiCity.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AsciiCity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const SOURCE = "/tech-city.jpg?v=2";
const DARKEN_SHADOW = 0.36;
const DARKEN_HIGHLIGHT = 0.58;
const DETAIL_SHADOW = 0.48;
const DETAIL_HIGHLIGHT = 0.84;
const BLOB_RADIUS = 64;
const RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const RAMP_LAST = RAMP.length - 1;
function isLightTheme() {
    return document.documentElement.dataset.theme === "light";
}
function loadImage(src) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.decoding = "async";
        img.onload = ()=>resolve(img);
        img.onerror = ()=>reject(new Error(`Failed to load ${src}`));
        img.src = src;
    });
}
function luma(r, g, b) {
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}
function hash2(x, y) {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
    return s - Math.floor(s);
}
function coverCrop(imgW, imgH, cols, rows, biasX = 0.62, biasY = 0.12) {
    const imageRatio = imgW / imgH;
    const canvasRatio = cols / rows;
    if (imageRatio > canvasRatio) {
        const sw = imgH * canvasRatio;
        return {
            sx: (imgW - sw) * biasX,
            sy: 0,
            sw,
            sh: imgH
        };
    }
    const sh = imgW / canvasRatio;
    return {
        sx: 0,
        sy: (imgH - sh) * biasY,
        sw: imgW,
        sh
    };
}
const boundsCache = new WeakMap();
function opaqueBounds(img) {
    const cached = boundsCache.get(img);
    if (cached) return cached;
    const full = {
        x: 0,
        y: 0,
        w: img.width,
        h: img.height
    };
    const probe = document.createElement("canvas");
    probe.width = img.width;
    probe.height = img.height;
    const probeCtx = probe.getContext("2d", {
        willReadFrequently: true
    });
    if (!probeCtx) return full;
    probeCtx.drawImage(img, 0, 0);
    const data = probeCtx.getImageData(0, 0, img.width, img.height).data;
    let minX = img.width;
    let minY = img.height;
    let maxX = 0;
    let maxY = 0;
    for(let y = 0; y < img.height; y++){
        for(let x = 0; x < img.width; x++){
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
        h: Math.min(img.height - 1, maxY + padY) - y + 1
    };
    boundsCache.set(img, bounds);
    return bounds;
}
function drawContained(ctx, img, cols, rows, options, src) {
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
    ctx.drawImage(img, src.x, src.y, src.w, src.h, dx, dy, Math.max(1, dw), Math.max(1, dh));
}
function drawSource(ctx, img, cols, rows, options) {
    if (options.knockout) {
        drawContained(ctx, img, cols, rows, options, opaqueBounds(img));
        return;
    }
    if (options.fit === "contain") {
        drawContained(ctx, img, cols, rows, options, {
            x: 0,
            y: 0,
            w: img.width,
            h: img.height
        });
        return;
    }
    const crop = coverCrop(img.width, img.height, cols, rows, options.cropX, options.cropY);
    ctx.drawImage(img, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, cols, rows);
}
function percentile(sorted, p) {
    const i = Math.min(sorted.length - 1, Math.max(0, Math.floor((sorted.length - 1) * p)));
    return sorted[i];
}
function contrastTone(tone) {
    const t = Math.min(1, Math.max(0, tone));
    return t < 0.5 ? Math.pow(t * 2, 1.2) / 2 : 1 - Math.pow((1 - t) * 2, 1.2) / 2;
}
function cellChar(cell, light = false, detail = false) {
    if (cell.knockout) return " ";
    const tone = light ? detail ? contrastTone(cell.luma) : Math.pow(cell.luma, 0.72) : cell.luma;
    const idx = Math.min(RAMP_LAST, Math.floor(tone * RAMP_LAST + 0.0001));
    return RAMP[idx];
}
function rgbToHsl(r, g, b) {
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const l = (max + min) / 2;
    if (max === min) return {
        h: 0,
        s: 0,
        l
    };
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = 0;
    if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    return {
        h: h / 6,
        s,
        l
    };
}
function hslToRgb(h, s, l) {
    const hue = (p, q, t)=>{
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
function lightColor(r, g, b, tone, hover, detail) {
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
        return hslToRgb(hsl.h, hover ? Math.min(0.9, sat + 0.08) : sat, hover ? Math.max(0.24, lightness - 0.04) : lightness);
    }
    const sat = Math.min(0.68, 0.42 + hsl.s * 0.4);
    const minL = hover ? 0.28 : 0.32;
    const maxL = hover ? 0.54 : 0.5;
    const lightness = maxL - shaped * (maxL - minL);
    return hslToRgb(hsl.h, hover ? Math.min(0.76, sat + 0.06) : sat, lightness);
}
const MOBILE_DETAIL_SHADOW = 1.08;
const MOBILE_DETAIL_HIGHLIGHT = 1.55;
function cellFill(cell, hover, vivid = false, detail = false, light = false, mobileBoost = false) {
    const { r, g, b, luma: t } = cell;
    if (light) return lightColor(r, g, b, t, hover, detail);
    const shade = vivid ? hover ? 1.14 + t * 0.22 : 0.78 + t * 0.4 : detail ? hover ? 1.16 + t * 0.24 : mobileBoost ? MOBILE_DETAIL_SHADOW + t * (MOBILE_DETAIL_HIGHLIGHT - MOBILE_DETAIL_SHADOW) : DETAIL_SHADOW + t * (DETAIL_HIGHLIGHT - DETAIL_SHADOW) : hover ? 1.08 + t * 0.18 : DARKEN_SHADOW + t * (DARKEN_HIGHLIGHT - DARKEN_SHADOW);
    return `rgb(${Math.min(255, Math.round(r * shade))} ${Math.min(255, Math.round(g * shade))} ${Math.min(255, Math.round(b * shade))})`;
}
function sharpenDetail(cells, cols, rows, light = false) {
    const src = cells.map((cell)=>cell.luma);
    for(let y = 1; y < rows - 1; y++){
        for(let x = 1; x < cols - 1; x++){
            const i = y * cols + x;
            const c = src[i];
            const blur = (src[i - cols - 1] + src[i - cols] + src[i - cols + 1] + src[i - 1] + c + src[i + 1] + src[i + cols - 1] + src[i + cols] + src[i + cols + 1]) / 9;
            const edge = c - blur;
            const quietSky = c < 0.07 && Math.abs(edge) < 0.05;
            cells[i].luma = quietSky ? c : Math.min(1, Math.max(0, c + edge * (light ? 1.7 : 1.15)));
        }
    }
}
function sampleCells(img, cols, rows, options) {
    const off = document.createElement("canvas");
    off.width = cols;
    off.height = rows;
    const ctx = off.getContext("2d", {
        willReadFrequently: true
    });
    if (!ctx) return [];
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = options.detail ? "high" : "low";
    drawSource(ctx, img, cols, rows, options);
    const data = ctx.getImageData(0, 0, cols, rows).data;
    const cells = new Array(cols * rows);
    const lumas = new Array(cells.length);
    const keep = [];
    for(let i = 0; i < cells.length; i++){
        const o = i * 4;
        const r = data[o];
        const g = data[o + 1];
        const b = data[o + 2];
        const a = data[o + 3];
        const l = luma(r, g, b);
        lumas[i] = l;
        const knockout = options.knockout && (a < 18 || l < 0.07);
        cells[i] = {
            luma: l,
            r,
            g,
            b,
            knockout
        };
        if (!knockout) keep.push(l);
    }
    const sorted = (keep.length ? keep : lumas).slice().sort((a, b)=>a - b);
    const lo = percentile(sorted, options.detail ? 0.16 : 0.08);
    const hi = percentile(sorted, options.detail ? 0.8 : 0.94);
    const range = Math.max(0.12, hi - lo);
    for(let i = 0; i < cells.length; i++){
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
    probe.style.fontFamily = "var(--font-geist-mono), ui-monospace, Menlo, Consolas, monospace";
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    document.body.appendChild(probe);
    const family = getComputedStyle(probe).fontFamily;
    probe.remove();
    return family || "ui-monospace, monospace";
}
function paintBase(grid) {
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
    for(let y = 0; y < rows; y++){
        for(let x = 0; x < cols; x++){
            const cell = cells[y * cols + x];
            if (!cell || cell.knockout) continue;
            const char = cellChar(cell, grid.light, grid.detail);
            if (char === " ") continue;
            ctx.fillStyle = cellFill(cell, false, grid.vivid, grid.detail, grid.light, grid.mobileBoost);
            ctx.fillText(char, x * cssCellW, y * cssCellH);
        }
    }
    return canvas;
}
function AsciiCity({ src = SOURCE, cropX = 0.62, cropY = 0.12, fit = "cover", knockout = false, detail = false, revealOnView = false, className = "h-full w-full" }) {
    const wrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const baseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const gridRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const introRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(1);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const sizeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        w: 0,
        h: 0,
        dpr: 1
    });
    const pointerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0,
        tx: 0,
        ty: 0,
        radius: 0,
        targetRadius: 0
    });
    const renderFrame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((time = 0)=>{
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
            const colStart = Math.max(0, Math.floor((pointer.x - radius * 1.35) / grid.cellW));
            const colEnd = Math.min(grid.cols - 1, Math.ceil((pointer.x + radius * 1.35) / grid.cellW));
            const rowStart = Math.max(0, Math.floor((pointer.y - radius * 1.35) / grid.cellH));
            const rowEnd = Math.min(grid.rows - 1, Math.ceil((pointer.y + radius * 1.35) / grid.cellH));
            ctx.save();
            ctx.scale(dpr, dpr);
            ctx.font = grid.font;
            ctx.textBaseline = "top";
            ctx.textAlign = "left";
            ctx.globalAlpha = 1;
            for(let row = rowStart; row <= rowEnd; row++){
                for(let col = colStart; col <= colEnd; col++){
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
                    ctx.fillStyle = cellFill(cell, true, grid.vivid, grid.detail, grid.light, grid.mobileBoost);
                    ctx.fillText(char, col * cssCellW, row * cssCellH);
                }
            }
            ctx.restore();
        }
        ctx.restore();
        const moving = intro < 1 || pointer.radius > 0.5 || Math.abs(pointer.targetRadius - pointer.radius) > 0.15 || Math.abs(pointer.tx - pointer.x) > 0.15 || Math.abs(pointer.ty - pointer.y) > 0.15;
        if (moving) {
            rafRef.current = requestAnimationFrame(renderFrame);
        }
    }, []);
    const build = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (img)=>{
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
        sizeRef.current = {
            w: width,
            h: height,
            dpr
        };
        const light = isLightTheme();
        const mobile = cssW < 1024;
        const mobileBoost = Boolean(detail && !light && mobile);
        const cols = detail ? Math.round(Math.min(light ? 300 : mobileBoost ? 160 : 240, Math.max(light ? 150 : mobileBoost ? 72 : 100, cssW / (light ? 2.9 : mobileBoost ? 4.6 : 3.8)))) : Math.round(Math.min(light ? 210 : 180, Math.max(light ? 96 : 80, cssW / (light ? 4.2 : 5.1))));
        const cellW = width / cols;
        const fontSize = detail ? Math.max(mobileBoost ? 7 : 5, cellW / dpr * (light ? 1.2 : mobileBoost ? 1.18 : 1.02)) : Math.max(7, cellW / dpr * (light ? 1.34 : 1.24));
        const cellH = fontSize * dpr * (detail ? 1.06 : 0.88);
        const rows = Math.max(28, Math.floor(height / cellH));
        const family = monoFamily();
        const grid = {
            cells: sampleCells(img, cols, rows, {
                cropX,
                cropY,
                fit,
                knockout,
                detail,
                light
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
            mobileBoost
        };
        gridRef.current = grid;
        baseRef.current = paintBase(grid);
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(renderFrame);
    }, [
        cropX,
        cropY,
        detail,
        fit,
        knockout,
        renderFrame
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const wrap = wrapRef.current;
        if (!wrap) return;
        let cancelled = false;
        let img = null;
        let running = false;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let started = false;
        introRef.current = revealOnView ? 0 : 1;
        const playIntro = ()=>{
            if (started || cancelled) return;
            started = true;
            if (reduced) {
                introRef.current = 1;
                renderFrame();
                return;
            }
            introRef.current = 0;
            const start = performance.now();
            const intro = (now)=>{
                if (cancelled) return;
                const t = Math.min(1, (now - start) / 1100);
                introRef.current = 1 - Math.pow(1 - t, 3);
                renderFrame();
                if (t < 1) requestAnimationFrame(intro);
            };
            requestAnimationFrame(intro);
        };
        const setup = async ()=>{
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
        let io = null;
        if (revealOnView) {
            io = new IntersectionObserver(([entry])=>{
                if (!entry?.isIntersecting) return;
                playIntro();
                io?.disconnect();
            }, {
                threshold: 0.02
            });
            io.observe(wrap);
        }
        const ro = new ResizeObserver(()=>{
            if (!img || running) return;
            running = true;
            requestAnimationFrame(()=>{
                running = false;
                if (cancelled || !img) return;
                void build(img);
            });
        });
        ro.observe(wrap);
        const onTheme = ()=>{
            if (cancelled || !img) return;
            void build(img);
        };
        window.addEventListener("techcity-theme", onTheme);
        return ()=>{
            cancelled = true;
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
            io?.disconnect();
            window.removeEventListener("techcity-theme", onTheme);
        };
    }, [
        build,
        renderFrame,
        revealOnView,
        src
    ]);
    const onPointerMove = (event)=>{
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
    const onPointerLeave = ()=>{
        pointerRef.current.targetRadius = 0;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(renderFrame);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: wrapRef,
        className: className,
        onPointerMove: onPointerMove,
        onPointerEnter: onPointerMove,
        onPointerLeave: onPointerLeave,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            className: "ascii-canvas block h-full w-full"
        }, void 0, false, {
            fileName: "[project]/src/components/AsciiCity.tsx",
            lineNumber: 784,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AsciiCity.tsx",
        lineNumber: 777,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AsciiCity$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AsciiCity.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PartnerApply$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PartnerApply.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ThemeToggle.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const nav = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/about",
        label: "About"
    },
    {
        href: "/projects",
        label: "Projects"
    },
    {
        href: "/partners",
        label: "Partners"
    },
    {
        href: "/contact",
        label: "Contact"
    }
];
const FOLLOW_X = 18;
const FOLLOW_Y = 14;
const FOLLOW_EASE = 0.07;
function FooterBar() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-6 sm:px-8 md:flex-row md:items-end md:justify-between md:gap-4 lg:py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-auto flex flex-col items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PartnerApply$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PartnerCta"], {}, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-x-4 gap-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/privacy-policy",
                                className: "font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/40 transition-colors hover:text-foreground",
                                children: "Privacy Policy"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Footer.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/terms-and-conditions",
                                className: "font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/40 transition-colors hover:text-foreground",
                                children: "Terms and Conditions"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Footer.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/components/Footer.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-auto flex flex-col items-start gap-2 text-left sm:gap-3 md:items-end md:text-right",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "mailto:techcityskillspvt.ltd@gmail.com",
                        className: "w-fit text-[11px] text-foreground/55 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground",
                        children: "techcityskillspvt.ltd@gmail.com"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "tel:+919650657821",
                        className: "w-fit text-[11px] text-foreground/55 transition-colors hover:text-foreground",
                        children: "9650657821"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Footer.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
function FooterNav() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        "aria-label": "Footer",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "flex flex-col items-center gap-3 lg:gap-4",
            children: nav.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: link.href,
                        className: "font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/45 transition-colors hover:text-foreground",
                        children: link.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 65,
                        columnNumber: 13
                    }, this)
                }, link.href, false, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Footer.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
function FooterMobile() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full pt-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pointer-events-auto flex flex-col items-center gap-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterNav, {}, void 0, false, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBar, {}, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Footer.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
function FooterHands() {
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const leftRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const reducedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const posRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0,
        tx: 0,
        ty: 0
    });
    const tick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
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
    const startTick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(tick);
    }, [
        tick
    ]);
    const onPointerMove = (event)=>{
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
    const onPointerLeave = ()=>{
        posRef.current.tx = 0;
        posRef.current.ty = 0;
        startTick();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        return ()=>cancelAnimationFrame(rafRef.current);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: sceneRef,
        className: "relative mt-0 h-[min(104svh,64rem)] w-full overflow-hidden",
        onPointerMove: onPointerMove,
        onPointerLeave: onPointerLeave,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-x-0 top-[22%] bottom-[26%] z-20 flex items-start justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: leftRef,
                        className: "relative h-full w-[46%] will-change-transform",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AsciiCity$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: "/ascii-hand-left.png",
                            cropX: 0,
                            cropY: 0,
                            fit: "contain",
                            knockout: true,
                            className: "h-full w-full cursor-pointer pointer-events-auto"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: rightRef,
                        className: "relative h-full w-[46%] will-change-transform",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AsciiCity$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: "/ascii-hand-right.png",
                            cropX: 1,
                            cropY: 0,
                            fit: "contain",
                            knockout: true,
                            className: "h-full w-full cursor-pointer pointer-events-auto"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 z-30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-auto absolute left-1/2 top-[min(42.6svh,25.9rem)] -translate-x-1/2 -translate-y-1/2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterNav, {}, void 0, false, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-x-0 bottom-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBar, {}, void 0, false, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Footer.tsx",
        lineNumber: 147,
        columnNumber: 5
    }, this);
}
function Footer({ compact = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        id: "contact",
        className: "relative",
        children: compact ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterBar, {}, void 0, false, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 199,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "lg:hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterMobile, {}, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 203,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 202,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden lg:block",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterHands, {}, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 206,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 205,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 201,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Footer.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Navbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PartnerApply$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PartnerApply.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const links = [
    {
        href: "/about",
        label: "About",
        children: [
            {
                href: "/about",
                label: "Our story"
            },
            {
                href: "/faculty",
                label: "Faculty"
            },
            {
                href: "/programs",
                label: "Programs"
            },
            {
                href: "/testimonials",
                label: "Testimonials"
            }
        ]
    },
    {
        href: "/projects",
        label: "Projects",
        children: [
            {
                href: "/projects/upcoming",
                label: "Upcoming"
            },
            {
                href: "/projects/ongoing",
                label: "Ongoing"
            },
            {
                href: "/projects/completed",
                label: "Completed"
            }
        ]
    },
    {
        href: "/partners",
        label: "Partners",
        children: [
            {
                href: "/partners/college",
                label: "College"
            },
            {
                href: "/partners/industry",
                label: "Industry"
            }
        ]
    },
    {
        href: "/#contact",
        label: "Contact",
        scrollTo: "contact"
    }
];
function Chevron({ open, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: `size-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""} ${className}`,
        viewBox: "0 0 12 12",
        fill: "none",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M2 4.5 6 8.5 10 4.5",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "square"
        }, void 0, false, {
            fileName: "[project]/src/components/Navbar.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Navbar.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
function StudentsLink({ onClick, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: "/students",
        onClick: onClick,
        className: `group inline-flex h-8 shrink-0 items-center justify-center border border-foreground bg-transparent px-4 text-[13px] font-medium text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background ${className}`,
        children: [
            "For students",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex max-w-0 items-center overflow-hidden transition-all duration-300 ease-power4-in-out group-hover:ml-1.5 group-hover:max-w-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ExternalArrow, {
                    className: "-translate-x-1 translate-y-1 transition-transform duration-300 ease-power4-in-out group-hover:translate-x-0 group-hover:translate-y-0"
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Navbar.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
function ExternalArrow({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: `size-2.5 shrink-0 ${className}`,
        viewBox: "0 0 12 12",
        fill: "none",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3.5 8.5 8.5 3.5M4.5 3.5h4v4",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "square",
            strokeLinejoin: "miter"
        }, void 0, false, {
            fileName: "[project]/src/components/Navbar.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Navbar.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
function Navbar({ theme = "dark" }) {
    const light = theme === "light";
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openSection, setOpenSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [desktopSection, setDesktopSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onPageShow = ()=>setDesktopSection(null);
        window.addEventListener("pageshow", onPageShow);
        return ()=>window.removeEventListener("pageshow", onPageShow);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onScroll = ()=>setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", onScroll);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.body.style.overflow = open ? "hidden" : "";
        return ()=>{
            document.body.style.overflow = "";
        };
    }, [
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) setOpenSection(null);
    }, [
        open
    ]);
    const closeMenu = ()=>{
        setOpen(false);
        setOpenSection(null);
    };
    const closeDesktopMenu = ()=>{
        setDesktopSection(null);
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };
    const onContactClick = (event, scrollTo)=>{
        if (!scrollTo) return;
        const target = document.getElementById(scrollTo);
        if (!target) {
            closeMenu();
            return;
        }
        event.preventDefault();
        const menuWasOpen = open;
        closeMenu();
        window.setTimeout(()=>{
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, menuWasOpen ? 320 : 0);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `sticky top-0 z-50 border-b border-foreground/15 transition-colors duration-300 [[data-theme=light]_&]:border-foreground/40 ${light ? "nav-light" : ""} ${scrolled || open ? light ? "bg-white/85 backdrop-blur-xl" : "bg-background/80 backdrop-blur-xl" : light ? "bg-white" : "bg-transparent"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:h-[4.25rem] sm:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/",
                        className: "shrink-0",
                        "aria-label": "TechCity",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: "/logo.png",
                            alt: "TechCity",
                            width: 945,
                            height: 921,
                            className: "brand-mark h-11 w-11 object-contain sm:h-12 sm:w-12",
                            priority: true,
                            unoptimized: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 items-center justify-end gap-6 lg:gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "hidden items-center gap-7 lg:flex",
                                children: links.map((link)=>link.children ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "relative",
                                        onMouseEnter: ()=>setDesktopSection(link.href),
                                        onMouseLeave: ()=>setDesktopSection(null),
                                        onFocus: ()=>setDesktopSection(link.href),
                                        onBlur: (event)=>{
                                            if (!event.currentTarget.contains(event.relatedTarget)) {
                                                setDesktopSection(null);
                                            }
                                        },
                                        onKeyDown: (event)=>{
                                            if (event.key === "Escape") closeDesktopMenu();
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: `inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors ${desktopSection === link.href ? "text-foreground" : "text-foreground/55"}`,
                                                "aria-haspopup": "menu",
                                                "aria-expanded": desktopSection === link.href,
                                                onClick: ()=>setDesktopSection(link.href),
                                                children: [
                                                    link.label,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chevron, {
                                                        open: desktopSection === link.href
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Navbar.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Navbar.tsx",
                                                lineNumber: 202,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute top-full left-0 min-w-52 pt-3 transition-all duration-200 ${desktopSection === link.href ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    role: "menu",
                                                    className: "border border-foreground/10 bg-background/95 py-2 backdrop-blur-xl",
                                                    children: link.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            role: "none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: child.href,
                                                                role: "menuitem",
                                                                onClick: closeDesktopMenu,
                                                                className: "flex items-center justify-between gap-3 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/55 transition-colors hover:bg-foreground/[0.04] hover:text-foreground",
                                                                children: [
                                                                    child.label,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ExternalArrow, {}, void 0, false, {
                                                                        fileName: "[project]/src/components/Navbar.tsx",
                                                                        lineNumber: 236,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Navbar.tsx",
                                                                lineNumber: 229,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, child.href, false, {
                                                            fileName: "[project]/src/components/Navbar.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Navbar.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.tsx",
                                                lineNumber: 216,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, link.href, true, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 187,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: link.href,
                                            onClick: (event)=>onContactClick(event, link.scrollTo),
                                            className: "font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/55 transition-colors hover:text-foreground",
                                            children: link.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.tsx",
                                            lineNumber: 245,
                                            columnNumber: 19
                                        }, this)
                                    }, link.href, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 244,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden items-center gap-5 lg:flex",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StudentsLink, {}, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 258,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PartnerApply$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PartnerCta"], {}, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 259,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "relative grid h-10 w-10 place-items-center rounded-full border border-foreground/45 bg-[color-mix(in_srgb,var(--foreground)_10%,var(--background))] text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.35)] lg:hidden",
                                "aria-label": open ? "Close menu" : "Open menu",
                                "aria-expanded": open,
                                onClick: ()=>setOpen((value)=>!value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `absolute h-px w-4 bg-current transition-transform duration-200 ${open ? "rotate-45" : "-translate-y-[3.5px]"}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 269,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `absolute h-px w-4 bg-current transition-transform duration-200 ${open ? "-rotate-45" : "translate-y-[3.5px]"}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute inset-x-0 top-full z-50 border-t border-foreground/10 bg-background/95 shadow-[0_24px_48px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${open ? "max-h-[calc(100svh-4.25rem)] overflow-y-auto opacity-100" : "pointer-events-none max-h-0 overflow-hidden opacity-0"}`,
                "aria-hidden": !open,
                inert: !open ? true : undefined,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "flex flex-col gap-1 px-5 py-4",
                    children: [
                        links.map((link)=>link.children ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "flex w-full items-center justify-between rounded-lg px-3 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:bg-foreground/[0.04] hover:text-foreground",
                                        "aria-expanded": openSection === link.href,
                                        onClick: ()=>setOpenSection((value)=>value === link.href ? null : link.href),
                                        children: [
                                            link.label,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Chevron, {
                                                open: openSection === link.href
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.tsx",
                                                lineNumber: 307,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 296,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: `overflow-hidden transition-[max-height,opacity] duration-200 ${openSection === link.href ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`,
                                        children: link.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: child.href,
                                                    onClick: closeMenu,
                                                    className: "flex items-center justify-between gap-3 px-6 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/50 transition-colors hover:text-foreground",
                                                    children: [
                                                        child.label,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ExternalArrow, {}, void 0, false, {
                                                            fileName: "[project]/src/components/Navbar.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Navbar.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 23
                                                }, this)
                                            }, child.href, false, {
                                                fileName: "[project]/src/components/Navbar.tsx",
                                                lineNumber: 317,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 309,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, link.href, true, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 295,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: link.href,
                                    onClick: (event)=>onContactClick(event, link.scrollTo),
                                    className: "block rounded-lg px-3 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:bg-foreground/[0.04] hover:text-foreground",
                                    children: link.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 332,
                                    columnNumber: 17
                                }, this)
                            }, link.href, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 331,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex flex-col gap-4 pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StudentsLink, {
                                    onClick: closeMenu,
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 343,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PartnerApply$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PartnerCta"], {
                                    onOpen: closeMenu,
                                    className: "flex w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 344,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 342,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 292,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Navbar.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/SlotNumber.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SlotNumber
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const SPIN_MS = 1600;
const EASE = "cubic-bezier(0.22, 0.7, 0.2, 1)";
function reelDigits(digit) {
    const cells = [];
    for(let cycle = 0; cycle < 2; cycle += 1){
        for(let value = 0; value <= 9; value += 1)cells.push(value);
    }
    cells.push(digit);
    return cells;
}
function DigitReel({ digit, delay, play }) {
    const reel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cells = reelDigits(digit);
    const end = cells.length - 1;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const node = reel.current;
        if (!node) return;
        node.style.transition = "none";
        node.style.transform = play ? "translateY(0)" : `translateY(-${end}em)`;
        if (!play) return;
        const frame = requestAnimationFrame(()=>{
            requestAnimationFrame(()=>{
                node.style.transition = `transform ${SPIN_MS}ms ${EASE} ${delay}ms`;
                node.style.transform = `translateY(-${end}em)`;
            });
        });
        return ()=>cancelAnimationFrame(frame);
    }, [
        delay,
        end,
        play
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-block h-[1em] overflow-hidden align-bottom",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            ref: reel,
            className: "block",
            style: {
                transform: `translateY(-${end}em)`
            },
            children: cells.map((value, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "block h-[1em] leading-none",
                    children: value
                }, index, false, {
                    fileName: "[project]/src/components/SlotNumber.tsx",
                    lineNumber: 52,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/SlotNumber.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SlotNumber.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
function SlotNumber({ value, delay = 0 }) {
    const root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [play, setPlay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const node = root.current;
        if (!node) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const observer = new IntersectionObserver(([entry])=>{
            if (!entry?.isIntersecting) return;
            setPlay(true);
            observer.disconnect();
        }, {
            threshold: 0.55
        });
        observer.observe(node);
        return ()=>observer.disconnect();
    }, []);
    const characters = value.split("");
    const digitOffsets = characters.reduce((offsets, character)=>{
        if (/\d/.test(character)) offsets.push(offsets.length);
        else offsets.push(-1);
        return offsets;
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: root,
        className: "inline-flex items-end tabular-nums",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: value
            }, void 0, false, {
                fileName: "[project]/src/components/SlotNumber.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": "true",
                className: "inline-flex items-end",
                children: characters.map((character, index)=>{
                    const digitOffset = digitOffsets[index] ?? -1;
                    if (digitOffset < 0) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "leading-none",
                            children: character
                        }, index, false, {
                            fileName: "[project]/src/components/SlotNumber.tsx",
                            lineNumber: 103,
                            columnNumber: 15
                        }, this);
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DigitReel, {
                        digit: Number(character),
                        delay: delay + digitOffset * 140,
                        play: play
                    }, index, false, {
                        fileName: "[project]/src/components/SlotNumber.tsx",
                        lineNumber: 110,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/SlotNumber.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SlotNumber.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ThemeToggle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyTheme",
    ()=>applyTheme,
    "default",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const STORAGE_KEY = "techcity-theme";
function applyTheme(theme) {
    document.documentElement.dataset.theme = theme === "light" ? "light" : "dark";
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch  {
    /* ignore private-mode storage failures */ }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute("content", theme === "light" ? "#ffffff" : "#090b10");
    }
    window.dispatchEvent(new Event("techcity-theme"));
}
function readTheme() {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
function ThemeToggle({ className = "" }) {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("dark");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const sync = ()=>setTheme(readTheme());
        sync();
        window.addEventListener("techcity-theme", sync);
        return ()=>window.removeEventListener("techcity-theme", sync);
    }, []);
    const setLight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>applyTheme("light"), []);
    const setDark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>applyTheme("dark"), []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `theme-toggle pointer-events-auto ${className}`.trim(),
        role: "group",
        "aria-label": "Color theme",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: setLight,
                "aria-pressed": theme === "light",
                className: theme === "light" ? "is-active" : undefined,
                children: "light"
            }, void 0, false, {
                fileName: "[project]/src/components/ThemeToggle.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": "true",
                className: "theme-toggle-sep",
                children: "/"
            }, void 0, false, {
                fileName: "[project]/src/components/ThemeToggle.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: setDark,
                "aria-pressed": theme === "dark",
                className: theme === "dark" ? "is-active" : undefined,
                children: "dark"
            }, void 0, false, {
                fileName: "[project]/src/components/ThemeToggle.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ThemeToggle.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_components_1vx9yzf._.js.map