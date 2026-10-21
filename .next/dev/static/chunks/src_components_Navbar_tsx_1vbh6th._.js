(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PartnerApply$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PartnerApply.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: `size-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""} ${className}`,
        viewBox: "0 0 12 12",
        fill: "none",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
_c = Chevron;
function StudentsLink({ onClick, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: "/students",
        onClick: onClick,
        className: `group inline-flex h-8 shrink-0 items-center justify-center border border-foreground bg-transparent px-4 text-[13px] font-medium text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background ${className}`,
        children: [
            "For students",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex max-w-0 items-center overflow-hidden transition-all duration-300 ease-power4-in-out group-hover:ml-1.5 group-hover:max-w-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExternalArrow, {
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
_c1 = StudentsLink;
function ExternalArrow({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: `size-2.5 shrink-0 ${className}`,
        viewBox: "0 0 12 12",
        fill: "none",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
_c2 = ExternalArrow;
function Navbar({ theme = "dark" }) {
    _s();
    const light = theme === "light";
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openSection, setOpenSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [desktopSection, setDesktopSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const onPageShow = {
                "Navbar.useEffect.onPageShow": ()=>setDesktopSection(null)
            }["Navbar.useEffect.onPageShow"];
            window.addEventListener("pageshow", onPageShow);
            return ({
                "Navbar.useEffect": ()=>window.removeEventListener("pageshow", onPageShow)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const onScroll = {
                "Navbar.useEffect.onScroll": ()=>setScrolled(window.scrollY > 8)
            }["Navbar.useEffect.onScroll"];
            onScroll();
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "Navbar.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            document.body.style.overflow = open ? "hidden" : "";
            return ({
                "Navbar.useEffect": ()=>{
                    document.body.style.overflow = "";
                }
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], [
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            if (!open) setOpenSection(null);
        }
    }["Navbar.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `sticky top-0 z-50 border-b border-foreground/15 transition-colors duration-300 [[data-theme=light]_&]:border-foreground/40 ${light ? "nav-light" : ""} ${scrolled || open ? light ? "bg-white/85 backdrop-blur-xl" : "bg-background/80 backdrop-blur-xl" : light ? "bg-white" : "bg-transparent"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:h-[4.25rem] sm:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/",
                        className: "shrink-0",
                        "aria-label": "TechCity",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 items-center justify-end gap-6 lg:gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "hidden items-center gap-7 lg:flex",
                                children: links.map((link)=>link.children ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: `inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors ${desktopSection === link.href ? "text-foreground" : "text-foreground/55"}`,
                                                "aria-haspopup": "menu",
                                                "aria-expanded": desktopSection === link.href,
                                                onClick: ()=>setDesktopSection(link.href),
                                                children: [
                                                    link.label,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chevron, {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute top-full left-0 min-w-52 pt-3 transition-all duration-200 ${desktopSection === link.href ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    role: "menu",
                                                    className: "border border-foreground/10 bg-background/95 py-2 backdrop-blur-xl",
                                                    children: link.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            role: "none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: child.href,
                                                                role: "menuitem",
                                                                onClick: closeDesktopMenu,
                                                                className: "flex items-center justify-between gap-3 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/55 transition-colors hover:bg-foreground/[0.04] hover:text-foreground",
                                                                children: [
                                                                    child.label,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExternalArrow, {}, void 0, false, {
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
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden items-center gap-5 lg:flex",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StudentsLink, {}, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 258,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PartnerApply$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PartnerCta"], {}, void 0, false, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "relative grid h-10 w-10 place-items-center rounded-full border border-foreground/45 bg-[color-mix(in_srgb,var(--foreground)_10%,var(--background))] text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.35)] lg:hidden",
                                "aria-label": open ? "Close menu" : "Open menu",
                                "aria-expanded": open,
                                onClick: ()=>setOpen((value)=>!value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `absolute h-px w-4 bg-current transition-transform duration-200 ${open ? "rotate-45" : "-translate-y-[3.5px]"}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 269,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute inset-x-0 top-full z-50 border-t border-foreground/10 bg-background/95 shadow-[0_24px_48px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${open ? "max-h-[calc(100svh-4.25rem)] overflow-y-auto opacity-100" : "pointer-events-none max-h-0 overflow-hidden opacity-0"}`,
                "aria-hidden": !open,
                inert: !open ? true : undefined,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "flex flex-col gap-1 px-5 py-4",
                    children: [
                        links.map((link)=>link.children ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "flex w-full items-center justify-between rounded-lg px-3 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:bg-foreground/[0.04] hover:text-foreground",
                                        "aria-expanded": openSection === link.href,
                                        onClick: ()=>setOpenSection((value)=>value === link.href ? null : link.href),
                                        children: [
                                            link.label,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chevron, {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: `overflow-hidden transition-[max-height,opacity] duration-200 ${openSection === link.href ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`,
                                        children: link.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: child.href,
                                                    onClick: closeMenu,
                                                    className: "flex items-center justify-between gap-3 px-6 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/50 transition-colors hover:text-foreground",
                                                    children: [
                                                        child.label,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExternalArrow, {}, void 0, false, {
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
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex flex-col gap-4 pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StudentsLink, {
                                    onClick: closeMenu,
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 343,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PartnerApply$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PartnerCta"], {
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
_s(Navbar, "4OBBjUt0V85BhBKmvjil1wTan/o=");
_c3 = Navbar;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Chevron");
__turbopack_context__.k.register(_c1, "StudentsLink");
__turbopack_context__.k.register(_c2, "ExternalArrow");
__turbopack_context__.k.register(_c3, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_Navbar_tsx_1vbh6th._.js.map