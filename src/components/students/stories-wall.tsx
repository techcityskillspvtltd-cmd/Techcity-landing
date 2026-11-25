"use client";

import { useState, type CSSProperties } from "react";
import { STORY_TINT, storyTracks, studentStories, type StoryTrack } from "@/lib/company";

/**
 * Student stories, in the student look: track chips with counts, the first
 * story of the selection as a spotlight (its quote large, on a tint of its
 * track's colour), then the rest as a masonry of cards that rise in when the
 * filter changes.
 */
export function StudentStoriesWall() {
  const [track, setTrack] = useState<StoryTrack | null>(null);
  const shown = track ? studentStories.filter((s) => s.track === track) : studentStories;
  const [lead, ...rest] = shown;

  return (
    <div>
      <div className="sd-filters sd-filters--flush" role="toolbar" aria-label="Filter stories by track">
        <button type="button" className="sd-filter" aria-pressed={track === null} onClick={() => setTrack(null)}>
          All stories
          <span>{studentStories.length}</span>
        </button>
        {storyTracks.map((t) => (
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
            <span>{studentStories.filter((s) => s.track === t).length}</span>
          </button>
        ))}
      </div>

      <div key={track ?? "all"} className="sd-wall-in">
        {lead && (
          <figure className="sd-spot" style={{ "--dot": STORY_TINT[lead.track] } as CSSProperties}>
            <div className="sd-spot__side">
              <p className="sd-spot__now">Now</p>
              <p className="sd-spot__outcome">{lead.outcome}</p>
              <p className="sd-spot__track">
                <i aria-hidden="true" />
                {lead.track}
              </p>
            </div>
            <div className="sd-spot__main">
              <blockquote className="sd-spot__quote">“{lead.quote}”</blockquote>
              <figcaption className="sd-story__who">
                <span className="sd-avatar" aria-hidden="true">
                  {lead.initials}
                </span>
                <span>
                  <span className="block text-[15px] font-medium text-text">{lead.name}</span>
                  <span className="block text-[13px] text-text-muted">
                    {lead.degree} · {lead.city}
                  </span>
                </span>
              </figcaption>
            </div>
          </figure>
        )}

        <div className="sd-wall">
          {rest.map((s, i) => (
            <figure
              key={s.name}
              className="sd-story sd-wall__card"
              style={{ "--dot": STORY_TINT[s.track], "--i": i } as CSSProperties}
            >
              <p className="sd-story__outcome">{s.outcome}</p>
              <blockquote className="sd-story__quote">“{s.quote}”</blockquote>
              <figcaption className="sd-story__who">
                <span className="sd-avatar" aria-hidden="true">
                  {s.initials}
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-medium text-text">{s.name}</span>
                  <span className="block text-[13px] text-text-muted">
                    {s.degree} · {s.city}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
