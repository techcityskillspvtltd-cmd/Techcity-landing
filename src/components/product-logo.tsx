export type ProductId = "setu" | "marg" | "kaksha" | "riyaaz" | "spardha";

/** Minimal white glyphs on a 24px grid, one per product. */
const glyphs: Record<ProductId, React.ReactNode> = {
  // Marg ("path"): a signpost.
  marg: (
    <>
      <path d="M12 3v18M9 21h6" />
      <path d="M12 5h5.5l2 2.25-2 2.25H12" />
      <path d="M12 12H6.5l-2 2.25 2 2.25H12" />
    </>
  ),
  // Spardha ("contest"): a trophy.
  spardha: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
      <path d="M8 6H5.5a2.5 2.5 0 0 0 3 3.5M16 6h2.5a2.5 2.5 0 0 1-3 3.5" />
      <path d="M12 13v4M8.5 20h7M10 17h4" />
    </>
  ),
  // Riyaaz ("daily practice"): code brackets.
  riyaaz: <path d="M8.5 8l-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13" />,
  // Kaksha ("classroom"): a screen with a play button.
  kaksha: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="3" />
      <path d="M10.25 9.5v5l4.25-2.5z" fill="currentColor" />
    </>
  ),
  // Setu (learning management): stacked course layers.
  setu: (
    <>
      <path d="M12 3.5l8.5 4.5L12 12.5 3.5 8z" />
      <path d="M3.5 12.25L12 16.75l8.5-4.5" />
      <path d="M3.5 16.25L12 20.75l8.5-4.5" />
    </>
  ),
};

/** Colourful product mark: white glyph on a gradient squircle. */
export function ProductLogo({ id, size = 40, className = "" }: { id: ProductId; size?: number; className?: string }) {
  return (
    <span
      className={`product-tile product-tile--${id} inline-flex shrink-0 items-center justify-center text-white ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.28 }}
      aria-hidden="true"
    >
      <svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyphs[id]}
      </svg>
    </span>
  );
}
