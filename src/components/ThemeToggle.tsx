"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "techcity-theme";

export function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme === "light" ? "light" : "dark";
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore private-mode storage failures */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "light" ? "#ffffff" : "#090b10");
  }
  window.dispatchEvent(new Event("techcity-theme"));
}

function readTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const sync = () => setTheme(readTheme());
    sync();
    window.addEventListener("techcity-theme", sync);
    return () => window.removeEventListener("techcity-theme", sync);
  }, []);

  const setLight = useCallback(() => applyTheme("light"), []);
  const setDark = useCallback(() => applyTheme("dark"), []);

  return (
    <div
      className={`theme-toggle pointer-events-auto ${className}`.trim()}
      role="group"
      aria-label="Color theme"
    >
      <button
        type="button"
        onClick={setLight}
        aria-pressed={theme === "light"}
        className={theme === "light" ? "is-active" : undefined}
      >
        light
      </button>
      <span aria-hidden="true" className="theme-toggle-sep">
        /
      </span>
      <button
        type="button"
        onClick={setDark}
        aria-pressed={theme === "dark"}
        className={theme === "dark" ? "is-active" : undefined}
      >
        dark
      </button>
    </div>
  );
}
