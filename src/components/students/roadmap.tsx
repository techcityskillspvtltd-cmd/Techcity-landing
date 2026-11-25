"use client";

import { useState, type CSSProperties } from "react";
import { InView } from "@/components/in-view";
import { ProductLogo, type ProductId } from "@/components/product-logo";
import { products } from "@/lib/products";
import { currentQuarter, quarterState, roadmap, type RoadItem, type RoadStatus } from "@/lib/roadmap";
import "./roadmap.css";

/*
 * The Product roadmap page's parts (app/students/roadmap): the quarter under
 * way as a featured card, and the whole roadmap as a timeline, a quarter per
 * stop, filterable by product. The rail is filled up to the quarter under way
 * and dashed after it. Content: lib/roadmap.ts. Styles: roadmap.css (`rm-*`).
 */

const productOf = (id: ProductId) => products.find((p) => p.id === id)!;
const STATUS: Record<RoadStatus, string> = { shipped: "Shipped", building: "Building", planned: "Planned" };
const STATE: Record<ReturnType<typeof quarterState>, string> = { shipped: "Shipped", now: "Now", next: "Next" };

function Status({ status }: { status: RoadStatus }) {
  return (
    <span className="rm-status" data-status={status}>
      <i aria-hidden="true" />
      {STATUS[status]}
    </span>
  );
}

/** The quarter under way: its theme, how much of it has shipped, and each item. */
export function RoadmapNow() {
  const q = currentQuarter;
  const shipped = q.items.filter((i) => i.status === "shipped").length;
  return (
    <InView className="rm-now" threshold={0.25} style={{ "--p": shipped / q.items.length } as CSSProperties}>
      <div className="rm-now__head">
        <p className="rm-now__when">
          <span className="rm-live" aria-hidden="true" />
          Now · {q.label}
        </p>
        <h2 className="rm-now__theme">{q.theme}.</h2>
        <p className="rm-now__count">
          <span className="font-medium text-text">
            {shipped} of {q.items.length}
          </span>{" "}
          shipped this quarter
        </p>
        <span className="rm-now__meter" aria-hidden="true">
          <i />
        </span>
      </div>
      <ul className="rm-now__items">
        {q.items.map((it) => (
          <li key={it.title} className="rm-now__item">
            <ProductLogo id={it.product} size={36} />
            <span className="min-w-0">
              <span className="block text-[13px] text-text-muted">{productOf(it.product).name}</span>
              <span className="mt-0.5 flex flex-wrap items-center gap-2 text-[16px] font-medium text-text">
                {it.title}
                {it.ai && <span className="rm-ai">AI</span>}
              </span>
              <span className="mt-1 block text-[14px] leading-[1.55] text-text-muted">{it.body}</span>
            </span>
            <Status status={it.status} />
          </li>
        ))}
      </ul>
    </InView>
  );
}

function Card({ item, i }: { item: RoadItem; i: number }) {
  const p = productOf(item.product);
  return (
    <article className="rm-card" data-status={item.status} style={{ "--c": `var(--p-${item.product}-1)`, "--i": i } as CSSProperties}>
      <span className="rm-card__product">
        <ProductLogo id={item.product} size={24} />
        {p.name}
      </span>
      <h4 className="rm-card__title">
        {item.title}
        {item.ai && <span className="rm-ai">AI</span>}
      </h4>
      <p className="rm-card__body">{item.body}</p>
      <Status status={item.status} />
    </article>
  );
}

/** Every quarter on one rail, newest plans last; the chips narrow it to one product. */
export function RoadmapTimeline() {
  const [filter, setFilter] = useState<ProductId | null>(null);
  const ids = products.map((p) => p.id);
  const count = (id: ProductId) => roadmap.reduce((n, q) => n + q.items.filter((i) => i.product === id).length, 0);
  const total = roadmap.reduce((n, q) => n + q.items.length, 0);

  return (
    <div className="rm-timeline">
      <div className="rm-filters" role="toolbar" aria-label="Filter the roadmap by product">
        <button type="button" className="sd-filter" aria-pressed={filter === null} onClick={() => setFilter(null)}>
          All products
          <span>{total}</span>
        </button>
        {ids.map((id) => (
          <button
            key={id}
            type="button"
            className="sd-filter"
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
            style={{ "--dot": `var(--p-${id}-1)` } as CSSProperties}
          >
            <i aria-hidden="true" />
            {productOf(id).name}
            <span>{count(id)}</span>
          </button>
        ))}
      </div>

      <ol className="rm-tl">
        {roadmap.map((q) => {
          const state = quarterState(q);
          const items = filter ? q.items.filter((i) => i.product === filter) : q.items;
          return (
            <li key={q.id} className="rm-q" data-state={state}>
              <div className="rm-q__when">
                <p className="rm-q__label">{q.label}</p>
                <p className="rm-q__span">{q.span}</p>
                <span className="rm-q__state">{STATE[state]}</span>
              </div>
              <div className="rm-q__rail" aria-hidden="true">
                <span className="rm-q__dot" />
              </div>
              <InView className="rm-q__body" threshold={0.15}>
                <h3 className="rm-q__theme">{q.theme}</h3>
                {items.length ? (
                  <div key={filter ?? "all"} className="rm-q__cards">
                    {items.map((it, i) => (
                      <Card key={it.title} item={it} i={i} />
                    ))}
                  </div>
                ) : (
                  <p className="rm-q__empty">Nothing for {productOf(filter!).name} this quarter.</p>
                )}
              </InView>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
