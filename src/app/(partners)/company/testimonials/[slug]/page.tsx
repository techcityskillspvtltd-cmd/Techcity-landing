import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { StoryArticle, StorySkeleton } from "@/components/testimonials-page";
import { partnerStories, storyBySlug } from "@/lib/partner-stories";

/** Every partner story, prerendered; any other slug is a 404. */
export function generateStaticParams() {
  return partnerStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = storyBySlug(slug);
  if (!story) return {};
  return {
    title: `${story.name} story`,
    description: `${story.headline} ${story.summary}`,
    alternates: { canonical: `/company/testimonials/${story.slug}` },
  };
}

/**
 * The shell (a story-shaped skeleton) is shared by every story, so navigation
 * is instant; the story itself reads the URL inside Suspense and streams in.
 */
export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<StorySkeleton />}>
      <Story params={params} />
    </Suspense>
  );
}

async function Story({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = storyBySlug(slug);
  if (!story) notFound();
  // Three more stories, starting after this one and wrapping round.
  const i = partnerStories.indexOf(story);
  const more = [1, 2, 3].map((k) => partnerStories[(i + k) % partnerStories.length]);
  return <StoryArticle story={story} more={more} />;
}
