"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, Marker, TileLayer } from "leaflet";
import "leaflet/dist/leaflet.css";
import SiteSelect from "@/components/SiteSelect";
import TrainerApply from "@/components/TrainerApply";
import {
  openingForProject,
  openings,
  projectCoordinates,
  projects,
  type CampusProject,
  type ProjectStatus,
} from "@/data/projects";

const mapTiles = {
  dark: {
    base: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    labels:
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
  },
  light: {
    base: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    labels:
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
  },
} as const;

function activeTiles() {
  return isLightTheme() ? mapTiles.light : mapTiles.dark;
}

const indiaBounds: [[number, number], [number, number]] = [
  [6.4, 68.0],
  [37.2, 97.5],
];

function isLightTheme() {
  return document.documentElement.dataset.theme === "light";
}

function themePins(): Record<ProjectStatus, string> {
  const style = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) =>
    style.getPropertyValue(name).trim() || fallback;
  return {
    current: read("--accent", "#4677e2"),
    upcoming: read("--accent-secondary", "#f59e0b"),
    completed: read("--foreground", "#f4f7fb"),
  };
}

const statusLabel: Record<ProjectStatus, string> = {
  current: "Ongoing",
  upcoming: "Upcoming",
  completed: "Finished",
};

const statusOrder: ProjectStatus[] = ["current", "upcoming", "completed"];

const statusFilters: Array<{ id: "all" | ProjectStatus; label: string }> = [
  { id: "all", label: "All" },
  { id: "current", label: "Ongoing" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Finished" },
];

export default function ProjectsBoard({
  statuses,
  showApply = false,
  initialOpeningId,
}: {
  statuses?: ProjectStatus[];
  showApply?: boolean;
  initialOpeningId?: string;
}) {
  const pool = useMemo(
    () =>
      statuses
        ? projects.filter((project) => statuses.includes(project.status))
        : projects,
    [statuses],
  );
  const [status, setStatus] = useState<"all" | ProjectStatus>("all");
  const [subject, setSubject] = useState("all");
  const [city, setCity] = useState("all");
  const subjects = useMemo(
    () => [...new Set(pool.map((project) => project.subject))].sort(),
    [pool],
  );
  const cities = useMemo(
    () => [...new Set(pool.map((project) => project.city))].sort(),
    [pool],
  );
  const statusOptions = statusFilters.filter(
    (item) => item.id === "all" || !statuses || statuses.includes(item.id),
  );
  const visible = useMemo(
    () =>
      pool.filter((project) => {
        if (status !== "all" && project.status !== status) return false;
        if (subject !== "all" && project.subject !== subject) return false;
        if (city !== "all" && project.city !== city) return false;
        return true;
      }),
    [city, pool, status, subject],
  );
  const [selectedId, setSelectedId] = useState(() => {
    const fromQuery = openings.find((opening) => opening.id === initialOpeningId);
    return (
      fromQuery?.projectId ??
      pool.find((project) => openingForProject(project.id))?.id ??
      pool[0]?.id ??
      ""
    );
  });
  const selected = visible.find((project) => project.id === selectedId) ?? visible[0];
  const formProjectId =
    selected && (selected.status === "current" || selected.status === "upcoming")
      ? selected.id
      : undefined;

  useEffect(() => {
    if (!visible.some((project) => project.id === selectedId) && visible[0]) {
      setSelectedId(visible[0].id);
    }
  }, [selectedId, visible]);

  function openApplication() {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    if (!initialOpeningId) return;
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [initialOpeningId]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {statusOptions.length > 2 ? (
          <SiteSelect
            label="Status"
            value={status}
            onChange={(value) => setStatus(value as "all" | ProjectStatus)}
            options={statusOptions.map((item) => ({ value: item.id, label: item.label }))}
          />
        ) : null}
        <SiteSelect
          label="Subject"
          value={subject}
          onChange={setSubject}
          options={[
            { value: "all", label: "All" },
            ...subjects.map((item) => ({ value: item, label: item })),
          ]}
        />
        <SiteSelect
          label="City"
          value={city}
          onChange={setCity}
          options={[
            { value: "all", label: "All" },
            ...cities.map((item) => ({ value: item, label: item })),
          ]}
        />
        <p className="inline-flex h-8 items-center font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-foreground/40">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <div className="mt-5 w-full border border-foreground/10">
        <IndiaMap
          projects={visible}
          selectedId={selected?.id ?? ""}
          onSelect={setSelectedId}
          showApply={showApply}
          onApply={openApplication}
          showList
        />
      </div>

      {showApply ? (
        <div id="apply" className="scroll-mt-28 mt-16 w-full max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
            <span className="text-accent">02</span>
            <span className="mx-2 text-foreground/20">/</span>
            Apply
          </p>
          <h2 className="mt-4 text-[1.7rem] font-normal leading-[1.1] tracking-tight text-foreground sm:text-[2rem]">
            Join as a trainer.
          </h2>
          <TrainerApply openingId={formProjectId} />
        </div>
      ) : null}
    </div>
  );
}

export function CampusMap({
  projects: items,
  hrefBase = "/projects/ongoing",
  allowApply = false,
}: {
  projects: CampusProject[];
  hrefBase?: string;
  allowApply?: boolean;
}) {
  return (
    <div className="w-full border border-foreground/10">
      <IndiaMap
        projects={items}
        selectedId=""
        onSelect={() => {}}
        showApply={false}
        onApply={() => {}}
        showList={false}
        popups
        allowApply={allowApply}
        hrefBase={hrefBase}
      />
    </div>
  );
}

function IndiaMap({
  projects: items,
  selectedId,
  onSelect,
  showApply,
  onApply,
  showList,
  popups = false,
  allowApply = false,
  hrefBase,
}: {
  projects: CampusProject[];
  selectedId: string;
  onSelect: (id: string) => void;
  showApply: boolean;
  onApply: () => void;
  showList: boolean;
  popups?: boolean;
  allowApply?: boolean;
  hrefBase?: string;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const baseTilesRef = useRef<TileLayer | null>(null);
  const labelTilesRef = useRef<TileLayer | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const listRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelect);
  const [ready, setReady] = useState(false);
  const [themeTick, setThemeTick] = useState(0);
  onSelectRef.current = onSelect;
  const itemsKey = items.map((project) => project.id).join("|");
  const groups = statusOrder
    .map((status) => ({
      status,
      items: items.filter((project) => project.status === status),
    }))
    .filter((group) => group.items.length > 0);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    let cancelled = false;

    import("leaflet").then((leaflet) => {
      if (cancelled || mapRef.current) return;
      const L = leafletOf(leaflet);
      const map = L.map(node, {
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: true,
      });
      L.control.zoom({ position: "bottomright" }).addTo(map);
      const tiles = activeTiles();
      const tileOptions = {
        maxZoom: 16,
        attribution: "Tiles &copy; Esri",
      };
      baseTilesRef.current = L.tileLayer(tiles.base, tileOptions).addTo(map);
      labelTilesRef.current = L.tileLayer(tiles.labels, { ...tileOptions, pane: "overlayPane" }).addTo(map);
      const bounds = L.latLngBounds(indiaBounds);
      map.setMaxZoom(6);
      mapRef.current = map;

      const frameIndia = () => {
        map.invalidateSize();
        map.setMaxBounds(L.latLngBounds([[0, 48], [42, 108]]));
        map.setMinZoom(3);
        map.setMaxZoom(6);

        if (!showList) {
          map.fitBounds(bounds, {
            padding: [24, 24],
            maxZoom: 5,
            animate: false,
          });
          map.setMaxZoom(7);
          map.setMinZoom(Math.min(5, map.getZoom()));
          return;
        }

        const wide = node.clientWidth >= 768;
        if (wide) {
          // Desktop: leave room for the floating project list on the left
          map.fitBounds(bounds, {
            paddingTopLeft: [300, 16],
            paddingBottomRight: [40, 24],
            maxZoom: 5,
            animate: false,
          });
          map.setMinZoom(Math.min(5, map.getZoom()));
        } else {
          // Mobile: list is below — keep the whole country centered in the box
          map.setView([22.2, 82.0], 4, { animate: false });
          map.fitBounds(bounds, {
            padding: [12, 28],
            maxZoom: 4,
            animate: false,
          });
          map.setMinZoom(3);
        }
      };
      frameIndia();
      window.setTimeout(frameIndia, 80);
      window.addEventListener("resize", frameIndia);
      if (!cancelled) setReady(true);

      map.on("unload", () => {
        window.removeEventListener("resize", frameIndia);
      });
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      baseTilesRef.current = null;
      labelTilesRef.current = null;
      markersRef.current.clear();
    };
  }, [showList]);

  useEffect(() => {
    const onTheme = () => {
      const tiles = activeTiles();
      baseTilesRef.current?.setUrl(tiles.base);
      labelTilesRef.current?.setUrl(tiles.labels);
      setThemeTick((value) => value + 1);
    };
    window.addEventListener("techcity-theme", onTheme);
    return () => window.removeEventListener("techcity-theme", onTheme);
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;
    let cancelled = false;

    import("leaflet").then((leaflet) => {
      if (cancelled || mapRef.current !== map) return;
      const L = leafletOf(leaflet);
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current.clear();

      const pins = themePins();
      for (const project of items) {
        const point = projectCoordinates(project);
        const active = project.id === selectedId;
        const marker = L.marker([point.lat, point.lng], {
          icon: pinIcon(L, pins[project.status], active),
          title: `${project.title}, ${project.city}`,
          zIndexOffset: active ? 500 : 0,
        }).addTo(map);
        if (popups && hrefBase) {
          marker.bindPopup(projectPopup(project, hrefBase, allowApply), {
            className: "project-popup",
            closeButton: true,
            autoPan: true,
            autoPanPadding: [24, 24],
            maxWidth: 320,
            minWidth: 260,
          });
          marker.on("popupopen", (event) => {
            const popup = event.popup.getElement();
            popup?.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
              anchor.addEventListener("click", (click) => {
                const href = anchor.getAttribute("href");
                if (!href || href.startsWith("#")) return;
                click.preventDefault();
                window.location.assign(href);
              });
            });
          });
        } else {
          marker.bindTooltip(`${project.city} · ${project.title}`, {
            direction: "top",
            offset: [0, -8],
            opacity: 1,
          });
        }
        marker.on("click", () => onSelectRef.current(project.id));
        markersRef.current.set(project.id, marker);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [allowApply, hrefBase, items, itemsKey, popups, ready, selectedId, themeTick]);

  useEffect(() => {
    const root = listRef.current;
    if (!showList || !root || !selectedId) return;
    const item = root.querySelector<HTMLElement>(`[data-project="${selectedId}"]`);
    if (!item) return;
    const itemRect = item.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    if (itemRect.top < rootRect.top || itemRect.bottom > rootRect.bottom) {
      root.scrollTop += itemRect.top - rootRect.top - 8;
    }
  }, [selectedId, itemsKey, showList]);

  return (
    <div
      className={`projects-map relative w-full ${
        showList
          ? "h-auto md:h-[40rem] lg:h-[44rem]"
          : "h-[34rem] sm:h-[40rem] lg:h-[46rem]"
      }`}
    >
      <div
        ref={nodeRef}
        className={showList ? "h-72 w-full md:h-full" : "h-full w-full"}
      />
      {showList ? (
      <div className="relative z-[800] mt-3 flex max-h-80 flex-col border border-foreground/10 bg-background md:absolute md:top-4 md:right-auto md:bottom-4 md:left-4 md:mt-0 md:max-h-none md:w-72">
        <p className="border-b border-foreground/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
          On the map
        </p>
        <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {groups.length === 0 ? (
            <p className="px-3 py-4 text-sm text-foreground/55">
              No projects match these filters.
            </p>
          ) : (
            groups.map((group) => (
              <section key={group.status}>
                <h3 className="sticky top-0 flex items-center gap-2 border-b border-foreground/10 bg-background px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                  <span
                    className={`size-1.5 ${
                      group.status === "current"
                        ? "bg-accent"
                        : group.status === "upcoming"
                          ? "bg-accent-secondary"
                          : "bg-foreground/70"
                    }`}
                  />
                  {statusLabel[group.status]}
                  <span className="text-foreground/30">{group.items.length}</span>
                </h3>
                <ul>
                  {group.items.map((project) => {
                    const active = project.id === selectedId;
                    const opening = openingForProject(project.id);
                    return (
                      <li
                        key={project.id}
                        data-project={project.id}
                        className={`border-b border-foreground/10 ${
                          active ? "bg-foreground/[0.05]" : ""
                        }`}
                      >
                        {hrefBase ? (
                          <a
                            href={`${hrefBase}/${project.id}`}
                            className="block w-full px-3 py-2.5 text-left hover:bg-foreground/[0.03]"
                          >
                            <ProjectLine project={project} />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onSelect(project.id)}
                            className="w-full px-3 py-2.5 text-left hover:bg-foreground/[0.03]"
                          >
                            <ProjectLine project={project} />
                          </button>
                        )}
                        {active && showApply && opening && project.status === "upcoming" ? (
                          <div className="px-3 pb-2.5">
                            <button
                              type="button"
                              onClick={onApply}
                              className="text-[12px] font-medium text-accent"
                            >
                              Apply for this opening
                            </button>
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))
          )}
        </div>
      </div>
      ) : null}
    </div>
  );
}

function ProjectLine({ project }: { project: CampusProject }) {
  return (
    <>
      <span className="block text-[13px] leading-5 text-foreground">{project.title}</span>
      <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/45">
        {project.city}
        <span className="mx-1.5 text-foreground/25">/</span>
        {project.subject}
        <span className="mx-1.5 text-foreground/25">/</span>
        {project.term}
      </span>
    </>
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function projectPopup(project: CampusProject, hrefBase: string, allowApply = false) {
  const opening = openingForProject(project.id);
  const apply =
    allowApply && project.status === "upcoming" && opening
      ? `<a class="map-popup-apply" href="${escapeHtml(`${hrefBase}?opening=${encodeURIComponent(opening.id)}#apply`)}">Apply now</a>`
      : "";
  return `<div class="map-popup">
    <p class="map-popup-kicker">${escapeHtml(statusLabel[project.status])}</p>
    <p class="map-popup-title">${escapeHtml(project.title)}</p>
    <p class="map-popup-place">${escapeHtml(project.campus)} · ${escapeHtml(project.city)}</p>
    <p class="map-popup-body">${escapeHtml(project.summary)}</p>
    <p class="map-popup-term">${escapeHtml(project.subject)} · ${escapeHtml(project.term)}</p>
    <div class="map-popup-actions">
      <a class="map-popup-details" href="${escapeHtml(`${hrefBase}/${project.id}`)}">See details</a>
      ${apply}
    </div>
  </div>`;
}

type LeafletModule = typeof import("leaflet");

function leafletOf(module: LeafletModule): LeafletModule {
  const withDefault = module as LeafletModule & { default?: LeafletModule };
  return withDefault.default && "map" in withDefault.default ? withDefault.default : module;
}

function pinIcon(L: LeafletModule, color: string, active: boolean) {
  const size = active ? 16 : 12;
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:999px;background:${color};cursor:pointer;box-shadow:0 0 0 3px var(--background)${
      active ? `,0 0 0 6px color-mix(in srgb, ${color} 45%, transparent)` : ""
    }"></span>`,
  });
}
