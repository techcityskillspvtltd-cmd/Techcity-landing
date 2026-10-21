import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  comingSoonProducts,
  studentLogin,
  studentPage,
} from "@/data/student";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    { slug: studentLogin.slug },
    ...comingSoonProducts.map((product) => ({ slug: product.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = studentPage(slug);
  if (!page) return { title: "For students" };

  return {
    title: page.label,
    description: page.line,
  };
}

export default async function StudentProductPage({ params }: Props) {
  const { slug } = await params;
  const page = studentPage(slug);
  if (!page) notFound();

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        {page.label}
      </p>
      <h1 className="mt-4 text-[2.35rem] font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl">
        Coming soon
      </h1>
      <p className="mt-5 max-w-md text-[15px] leading-7 text-foreground/65">
        {page.line}
      </p>
      <Link
        href="/students"
        className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55 transition-colors hover:text-foreground"
      >
        Back to students
      </Link>
    </main>
  );
}
