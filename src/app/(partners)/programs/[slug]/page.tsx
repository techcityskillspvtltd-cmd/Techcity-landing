import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProgramLanding, ProgramSkeleton } from "@/components/program-landing";
import { programBySlug, programPages } from "@/lib/program-pages";

/** The eight programs, prerendered; any other slug is a 404 (below). */
export function generateStaticParams() {
  return programPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = programBySlug(slug);
  if (!p) return {};
  return {
    title: p.label,
    description: `${p.hero.lead} ${p.hero.rest} ${p.hero.body}`,
    alternates: { canonical: `/programs/${p.slug}` },
  };
}

/**
 * The shell (a hero-shaped skeleton) is shared by all eight programs, so
 * navigation is instant; the program reads the URL inside Suspense.
 */
export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<ProgramSkeleton />}>
      <Program params={params} />
    </Suspense>
  );
}

async function Program({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = programBySlug(slug);
  if (!p) notFound();
  return <ProgramLanding program={p} />;
}
