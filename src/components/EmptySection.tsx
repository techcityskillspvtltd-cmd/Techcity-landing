export default function EmptySection({
  id,
  index,
  label,
}: {
  id: string;
  index: string;
  label: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-foreground/10">
      <div className="mx-auto min-h-[50svh] max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
          <span className="text-accent">{index}</span>
          <span className="mx-2 text-foreground/20">/</span>
          {label}
        </p>
      </div>
    </section>
  );
}
