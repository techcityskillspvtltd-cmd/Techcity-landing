"use client";

import { useState } from "react";
import { StoryTile } from "@/components/testimonials-page";
import type { PartnerStory } from "@/lib/partner-stories";

const TABS = [
  { id: "all", label: "All stories" },
  { id: "college", label: "Colleges" },
  { id: "industry", label: "Companies" },
] as const;

/** Every partner story in a grid, with All / Colleges / Companies tabs above it. */
export function StoryTabs({ stories }: { stories: PartnerStory[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");
  const shown = tab === "all" ? stories : stories.filter((s) => s.kind === tab);
  return (
    <div>
      <div role="tablist" aria-label="Story type" className="ts-tabs">
        {TABS.map((t) => {
          const count = t.id === "all" ? stories.length : stories.filter((s) => s.kind === t.id).length;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              aria-controls="ts-story-grid"
              onClick={() => setTab(t.id)}
              className="ts-tabs__tab"
            >
              {t.label}
              <span>{count}</span>
            </button>
          );
        })}
      </div>
      <div id="ts-story-grid" role="tabpanel" key={tab} className="ts-grid">
        {shown.map((s) => (
          <StoryTile key={s.slug} story={s} />
        ))}
      </div>
    </div>
  );
}
