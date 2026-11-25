"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { STORY_TINT, storyTracks, type StoryTrack } from "@/lib/company";
import { studentProjects } from "@/lib/students";

/**
 * The student projects, filtered by track: a row of chips (All, then one per
 * track with a project, with counts), then the cards. Cards are rendered on
 * the server and passed in by slug, so this only owns the filter.
 */
export function ProjectsGrid({ cards }: { cards: Record<string, ReactNode> }) {
  const [track, setTrack] = useState<StoryTrack | null>(null);
  const shown = track ? studentProjects.filter((p) => p.track === track) : studentProjects;
  const tracks = storyTracks.filter((t) => studentProjects.some((p) => p.track === t));

  return (
    <>
      <div className="sd-filters" role="toolbar" aria-label="Filter projects by track">
        <button type="button" className="sd-filter" aria-pressed={track === null} onClick={() => setTrack(null)}>
          All projects
          <span>{studentProjects.length}</span>
        </button>
        {tracks.map((t) => (
          <button
            key={t}
            type="button"
            className="sd-filter"
            aria-pressed={track === t}
            onClick={() => setTrack(t)}
            style={{ "--dot": STORY_TINT[t] } as CSSProperties}
          >
            <i aria-hidden="true" />
            {t}
            <span>{studentProjects.filter((p) => p.track === t).length}</span>
          </button>
        ))}
      </div>
      <div key={track ?? "all"} className="sd-projects sd-projects--in">
        {shown.map((p) => (
          <div key={p.slug}>{cards[p.slug]}</div>
        ))}
      </div>
    </>
  );
}
