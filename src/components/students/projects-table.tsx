"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import { HoverArrow } from "@/components/hover-arrow";
import { SearchIcon } from "@/components/pikaicons";
import { Thumb } from "@/components/students/blocks";
import { STORY_TINT, storyTracks, type StoryTrack } from "@/lib/company";
import {
  projectHref,
  studentProjects,
  type StudentProject,
} from "@/lib/students";
import "./projects-table.css";

/*
 * Every student project as a table: search, a chip per track, and columns
 * that sort. Each row leads to the project's own page. Below 900px the rows
 * become cards. Styles: projects-table.css (`pt-*`).
 */

type SortKey = "title" | "student" | "track";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

export function ProjectsTable() {
  const [track, setTrack] = useState<StoryTrack | null>(null);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 } | null>(null);
  const tracks = storyTracks.filter((t) =>
    studentProjects.some((p) => p.track === t),
  );

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = studentProjects.filter(
      (p) =>
        (!track || p.track === track) &&
        (!needle ||
          [p.title, p.student, p.summary, p.outcome, ...p.stack].some((t) =>
            t.toLowerCase().includes(needle),
          )),
    );
    if (sort)
      list = [...list].sort(
        (a, b) => a[sort.key].localeCompare(b[sort.key]) * sort.dir,
      );
    return list;
  }, [track, q, sort]);

  const sortBy = (key: SortKey) =>
    setSort((s) =>
      s?.key === key
        ? s.dir === 1
          ? { key, dir: -1 }
          : null
        : { key, dir: 1 },
    );
  const aria = (key: SortKey) =>
    sort?.key === key ? (sort.dir === 1 ? "ascending" : "descending") : "none";

  return (
    <div className="pt">
      <div className="pt-bar">
        <label className="pt-search">
          <SearchIcon width={16} height={16} aria-hidden="true" />
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects, students or tools"
          />
        </label>
        <div className="pt-chips" role="toolbar" aria-label="Filter by track">
          <button
            type="button"
            className="sd-filter"
            aria-pressed={track === null}
            onClick={() => setTrack(null)}
          >
            All
            <span>{studentProjects.length}</span>
          </button>
          {tracks.map((t) => (
            <button
              key={t}
              type="button"
              className="sd-filter"
              aria-pressed={track === t}
              onClick={() => setTrack(track === t ? null : t)}
              style={{ "--dot": STORY_TINT[t] } as CSSProperties}
            >
              <i aria-hidden="true" />
              {t}
              <span>{studentProjects.filter((p) => p.track === t).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-frame">
        <table className="pt-table">
          <caption className="sr-only">Student projects</caption>
          <thead>
            <tr>
              <th scope="col" aria-sort={aria("title")}>
                <button
                  type="button"
                  onClick={() => sortBy("title")}
                  data-sort={sort?.key === "title" ? sort.dir : undefined}
                >
                  Project
                </button>
              </th>
              <th scope="col" aria-sort={aria("student")}>
                <button
                  type="button"
                  onClick={() => sortBy("student")}
                  data-sort={sort?.key === "student" ? sort.dir : undefined}
                >
                  Student
                </button>
              </th>
              <th scope="col" aria-sort={aria("track")}>
                <button
                  type="button"
                  onClick={() => sortBy("track")}
                  data-sort={sort?.key === "track" ? sort.dir : undefined}
                >
                  Track
                </button>
              </th>
              <th scope="col">Built with</th>
              <th scope="col">Where it led</th>
            </tr>
          </thead>
          <tbody key={`${track}-${q}-${sort?.key}-${sort?.dir}`}>
            {rows.map((p, i) => (
              <Row key={p.slug} project={p} index={i} />
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="pt-empty">
            No projects match “{q}”.{" "}
            <button type="button" onClick={() => setQ("")}>
              Clear the search
            </button>
          </p>
        )}
      </div>
      <p className="pt-count" aria-live="polite">
        Showing {rows.length} of {studentProjects.length} projects
      </p>
    </div>
  );
}

function Row({
  project: p,
  index,
}: {
  project: StudentProject;
  index: number;
}) {
  return (
    <tr
      className="pt-row"
      style={{ "--i": index, "--dot": STORY_TINT[p.track] } as CSSProperties}
    >
      <td>
        <span className="pt-project">
          <span className="pt-thumb">
            <Thumb project={p} />
          </span>
          <span className="min-w-0">
            <Link href={projectHref(p)} className="pt-title">
              {p.title}
              {p.featured && <span className="pt-featured">Featured</span>}
            </Link>
            <span className="pt-summary">{p.summary}</span>
          </span>
        </span>
      </td>
      <td>
        <span className="pt-student">
          <span className="pt-avatar" aria-hidden="true">
            {initials(p.student)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-medium text-text">
              {p.student}
            </span>
            <span className="block truncate text-[13px] text-text-muted">
              {p.detail}
            </span>
          </span>
        </span>
      </td>
      <td className="pt-track">
        <span>
          <i aria-hidden="true" />
          {p.track}
        </span>
      </td>
      <td className="pt-stack">
        <span>
          {p.stack.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
      </td>
      <td className="pt-outcome">
        <span>{p.outcome}</span>
        <span className="pt-go" aria-hidden="true">
          <HoverArrow />
        </span>
      </td>
    </tr>
  );
}
