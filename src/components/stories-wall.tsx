"use client";

import { useState, type CSSProperties } from "react";
import { STORY_TINT, storyTracks, studentStories, type StoryTrack, type StudentStory } from "@/lib/company";

/**
 * Student stories. A row of track filters, then the first story of the
 * selection as a large navy feature, then the rest in a masonry wall. Every
 * card leads with where the student landed, then the quote, then who they are.
 */
export function StoriesWall() {
  const [track, setTrack] = useState<StoryTrack | null>(null);
  const shown = track ? studentStories.filter((s) => s.track === track) : studentStories;
  const [lead, ...rest] = shown;

  return (
    <div>
      <div className="ts-filters" role="toolbar" aria-label="Filter stories by track">
        <button type="button" className="ts-filter" aria-pressed={track === null} onClick={() => setTrack(null)}>
          All tracks
          <span>{studentStories.length}</span>
        </button>
        {storyTracks.map((t) => (
          <button
            key={t}
            type="button"
            className="ts-filter"
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

      <div key={track ?? "all"} className="ts-students" aria-live="polite">
        {lead && <LeadStory story={lead} />}
        <ul className="ts-masonry">
          {rest.map((s, i) => (
            <li key={s.name} style={{ "--i": i } as CSSProperties}>
              <StudentCard story={s} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Who({ story, light = false }: { story: StudentStory; light?: boolean }) {
  return (
    <figcaption className="ts-who" data-light={light || undefined}>
      <span className="ts-avatar" style={{ "--tint": STORY_TINT[story.track] } as CSSProperties} aria-hidden="true">
        {story.initials}
      </span>
      <span className="min-w-0">
        <span className="ts-who__name">{story.name}</span>
        <span className="ts-who__meta">
          {story.degree} · {story.city}
        </span>
      </span>
    </figcaption>
  );
}

/** The selection's first story, large, on navy. */
function LeadStory({ story }: { story: StudentStory }) {
  return (
    <figure className="ts-lead">
      <div>
        <p className="ts-lead__landed">Now</p>
        <p className="ts-lead__outcome">{story.outcome}</p>
        <p className="ts-lead__track" style={{ "--dot": STORY_TINT[story.track] } as CSSProperties}>
          <i aria-hidden="true" />
          {story.track}
        </p>
      </div>
      <div className="flex flex-col">
        <blockquote className="ts-lead__quote">“{story.quote}”</blockquote>
        <Who story={story} light />
      </div>
    </figure>
  );
}

function StudentCard({ story }: { story: StudentStory }) {
  return (
    <figure className="ts-student" style={{ "--dot": STORY_TINT[story.track] } as CSSProperties}>
      <p className="ts-student__outcome">{story.outcome}</p>
      <p className="ts-student__track">
        <i aria-hidden="true" />
        {story.track}
      </p>
      <blockquote className="ts-student__quote">“{story.quote}”</blockquote>
      <Who story={story} />
    </figure>
  );
}
