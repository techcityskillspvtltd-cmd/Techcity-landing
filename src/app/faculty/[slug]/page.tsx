import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FacultyProfile from "@/components/FacultyProfile";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { faculty, getFaculty } from "@/data/faculty";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return faculty.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const person = getFaculty(slug);
  if (!person) return { title: "Faculty" };

  return {
    title: person.name,
    description: person.summary,
  };
}

export default async function FacultyMemberPage({ params }: Props) {
  const { slug } = await params;
  const person = getFaculty(slug);
  if (!person) notFound();
  const index = faculty.findIndex((item) => item.slug === person.slug);

  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 pt-10 sm:px-8">
          <a
            href="/faculty"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/50 transition-colors hover:text-foreground"
          >
            Faculty
          </a>
          <a
            href="/faculty/profiles"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/50 transition-colors hover:text-foreground"
          >
            All profiles
          </a>
        </div>
        <section className="mt-6 border-t border-foreground/10">
          <div className="mx-auto max-w-7xl">
            <FacultyProfile person={person} index={index} detailed />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
