import AsciiCity from "@/components/AsciiCity";
import CtaLink from "@/components/CtaLink";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-4.25rem)] overflow-hidden">
      <div className="absolute inset-0 z-[2]">
        <AsciiCity detail />
      </div>
      <div className="hero-copy-wash pointer-events-none absolute inset-y-0 left-0 z-[3] w-[min(100%,48rem)]" />

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[calc(100svh-4.25rem)] w-full max-w-7xl items-center px-5 py-16 sm:px-8">
        <div className="pointer-events-auto relative max-w-3xl -translate-y-12 sm:-translate-y-16">
          <div aria-hidden="true" className="hero-copy-scrim pointer-events-none absolute -inset-y-8 -left-5 right-0 -z-10" />
          <h1 className="text-[2.35rem] font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[4.25rem]">
            <span className="block">Industry-aligned skilling</span>
            <span className="block">for modern tech careers.</span>
          </h1>

          <p className="hero-lead mt-7 max-w-lg text-base leading-7 text-foreground/90 sm:text-lg sm:leading-8">
            Partnering with universities to deliver an integrated suite of
            skilling solutions, from classrooms to organizations.
          </p>

          <div className="mt-9">
            <CtaLink href="/programs" size="lg">
              Explore Programs
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
