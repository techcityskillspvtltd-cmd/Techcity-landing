/* eslint-disable @next/next/no-img-element -- local, pre-trimmed logo files */
import Link from "next/link";
import type { CSSProperties } from "react";
import { ExternalArrow, HoverArrow, newTab } from "@/components/hover-arrow";
import { PageHero, SectionHead } from "@/components/page-blocks";
import { ProductLogo } from "@/components/product-logo";
import { ProjectScene } from "@/components/project-scenes";
import { StoryTile } from "@/components/testimonials-page";
import { container } from "@/lib/layout";
import { monthLabel, news, type NewsItem } from "@/lib/news";
import { partnerStories } from "@/lib/partner-stories";
import { products } from "@/lib/products";
import "./newsroom.css";

/*
 * The newsroom (/company/news), in the same flow as the other inner pages: the
 * shared hero (breadcrumb, run-in headline, a stageshow picture, rolling
 * figures), then run-in section heads over the latest stories, the full dated
 * list, partner stories and the product stack.
 */

/** A faint corner wash per college, from the brand ramp. */
const TONE: Record<string, string> = {
  Echelon: "#3B47C4",
  Inmantec: "#6B7BE6",
  "St. Andrews": "#F59E0B",
  KCNIT: "#1C257D",
  "SMS Lucknow": "#A5B1F5",
  "MMU Ambala": "#FCD38A",
};

/** A news picture: a pale dotted panel, the college's logo on a white plate (or its name). */
function NewsArt({ item, size = "thumb" }: { item: NewsItem; size?: "lead" | "thumb" }) {
  return (
    <span className="nr-art" data-size={size} style={{ "--tone": TONE[item.short] ?? "#3B47C4" } as CSSProperties} aria-hidden="true">
      <span className="nr-art__logo">
        {item.logo ? <img src={item.logo} alt="" loading="lazy" decoding="async" /> : <span className="nr-art__word">{item.short}</span>}
      </span>
      {size === "lead" && (
        <span className="nr-art__tracks">
          {item.tracks.slice(0, 4).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
      )}
    </span>
  );
}

function Meta({ item }: { item: NewsItem }) {
  return (
    <p className="nr-meta">
      <span className="nr-meta__cat">{item.stage}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={item.month}>{monthLabel(item.month)}</time>
    </p>
  );
}

export function Newsroom() {
  const [lead, ...rest] = news;
  const side = rest.slice(0, 3);
  return (
    <main className="nr-page overflow-x-clip">
      <PageHero
        crumb={{ label: "Company", href: "/company/story" }}
        eyebrow="News"
        lead="What's happening on campus."
        rest="Programs starting, under way and finished at our partner colleges."
        body="Every program we run is a term inside a college's own timetable. Here's where each one stands, with the tracks, the batch and the people who ran it."
        picture={<ProjectScene id="all" />}
        stats={[
          { value: String(news.length), label: "Programs reported" },
          { value: String(news.filter((n) => n.stage === "Under way").length), label: "Under way now" },
          { value: String(news.filter((n) => n.stage === "Completed").length), label: "Completed" },
          { value: String(new Set(news.map((n) => n.short)).size), label: "Partner campuses" },
        ]}
        actions={
          <>
            <a href="#news" className="btn btn-primary btn-lg">
              See all news
              <HoverArrow />
            </a>
            <Link href="/projects" className="btn btn-secondary btn-lg shadow-[var(--shadow-btn)]">
              All projects
            </Link>
          </>
        }
      />

      {/* Featured: one lead story and three more */}
      <section>
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="The latest." rest="The most recent programs, newest first." />
          <div className="nr-featured border-t border-line">
          <Link href={lead.href} className="nr-lead">
            <NewsArt item={lead} size="lead" />
            <Meta item={lead} />
            <h2 className="nr-lead__title">{lead.headline}</h2>
            <p className="nr-dek">{lead.dek}</p>
            <span className="nr-more">
              Read more
              <HoverArrow />
            </span>
          </Link>
          <ul className="nr-side">
            {side.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="nr-side__item">
                  <span className="min-w-0">
                    <Meta item={item} />
                    <span className="nr-side__title">{item.headline}</span>
                    <span className="nr-more">
                      Read more
                      <HoverArrow />
                    </span>
                  </span>
                  <NewsArt item={item} />
                </Link>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </section>

      {/* The full list */}
      <section id="news" className="pp-tint scroll-mt-20">
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="All news." rest="Every program on a partner campus, by month.">
            <Link href="/projects" className="btn btn-secondary btn-lg shrink-0 self-start shadow-[var(--shadow-btn)] sm:self-auto">
              All projects
              <HoverArrow />
            </Link>
          </SectionHead>
          <ul className="nr-list border-t border-line">
            {news.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="nr-row">
                  <span className="min-w-0">
                    <span className="nr-row__cat">Campus · {item.short}</span>
                    <span className="nr-row__title">{item.headline}</span>
                    <time className="nr-row__date" dateTime={item.month}>
                      {monthLabel(item.month)}
                    </time>
                  </span>
                  <NewsArt item={item} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stories */}
      <section>
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Partner stories." rest="Colleges and companies building with TechCity.">
            <Link href="/company/testimonials#stories" className="btn btn-secondary btn-lg shrink-0 self-start shadow-[var(--shadow-btn)] sm:self-auto">
              View all stories
              <HoverArrow />
            </Link>
          </SectionHead>
          <div className="ts-grid nr-stories">
            {partnerStories.slice(0, 3).map((s) => (
              <StoryTile key={s.slug} story={s} />
            ))}
          </div>
        </div>
      </section>

      {/* The stack */}
      <section className="pp-tint">
        <div className={`${container} border-x border-b border-line`}>
          <SectionHead lead="Across the stack." rest="All five TechCity products are live, on one account." />
          <ul className="nr-products border-t border-line">
            {products.map((p) => (
              <li key={p.id}>
                <a href={p.href} {...newTab} className="nr-product">
                  <ProductLogo id={p.id} size={40} />
                  <span className="nr-product__name">
                    {p.name}
                    <ExternalArrow />
                  </span>
                  <span className="nr-product__line">{p.tagline}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
