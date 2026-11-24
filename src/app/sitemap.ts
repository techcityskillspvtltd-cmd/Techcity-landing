import type { MetadataRoute } from "next";
import { groupItems, partnerNav, studentNav } from "@/lib/nav";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Every internal page linked from either navbar, without #anchors.
  const paths = new Set<string>(["/", "/students", "/programs", "/products", "/projects", "/company", "/partners"]);
  for (const nav of [partnerNav, studentNav]) {
    for (const group of nav.groups) {
      for (const href of [group.href, ...groupItems(group).map((i) => i.href)]) {
        if (href?.startsWith("/") && !href.includes("#")) paths.add(href);
      }
    }
  }
  return [...paths].map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
