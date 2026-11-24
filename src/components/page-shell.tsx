import { Crumbs, type Crumb } from "@/components/page-blocks";
import { container } from "@/lib/layout";

/** A plain page: the breadcrumb and title in the shared hero type, framed by the guide lines. */
export function PageShell({
  title,
  crumb = { label: "Home", href: "/" },
  children,
}: {
  title: string;
  /** The section above this page in the breadcrumb. */
  crumb?: Crumb;
  children?: React.ReactNode;
}) {
  return (
    <main>
      {/* mt-16 clears the fixed navbar; the top rule sits right under it */}
      <section className="mt-16 border-t border-line">
        <div className={`${container} border-x border-b border-line`}>
          <div className="pp-hero-copy">
            <Crumbs items={[crumb, { label: title }]} />
            <h1 className="pp-h1">{title}</h1>
          </div>
        </div>
      </section>
      {children}
      {/* Lines end here: a full-width rule over the last section's bottom line. */}
      <div aria-hidden="true" className="relative -mt-px border-t border-line" />
    </main>
  );
}
