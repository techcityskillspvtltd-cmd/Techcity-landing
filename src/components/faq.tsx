import "./faq.css";

/** A ruled accordion of questions; the plus turns into a minus when open. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="pg-faqs">
      {items.map((f) => (
        <details key={f.q} className="pg-faq">
          <summary>
            <span>{f.q}</span>
            <span className="pg-faq__icon" aria-hidden="true" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
