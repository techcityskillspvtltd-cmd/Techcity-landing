import type { Metadata } from "next";
import Link from "next/link";
import { HoverArrow } from "@/components/hover-arrow";
import { Icon } from "@/components/icons";
import { PageShell } from "@/components/page-shell";
import { programHref } from "@/lib/program-pages";
import { partnerPrograms } from "@/lib/programs";

export const metadata: Metadata = { title: "Programs" };

export default function Page() {
  return (
    <PageShell title="Programs">
      <div>
        <div className="mx-auto grid w-full max-w-[1266px] gap-12 border-b border-line px-5 py-12 sm:px-10 sm:py-16 lg:grid-cols-2 lg:px-[120px] lg:py-20">
          {partnerPrograms.map((group) => (
            <section key={group.title}>
              <h2 className="mb-5 text-[20px] font-normal tracking-[-0.02em] text-text">{group.title}</h2>
              <div className="grid gap-3">
                {group.items.map((program) => (
                  <Link
                    key={program.anchor}
                    id={program.anchor}
                    href={programHref(program.anchor)}
                    className="group scroll-mt-24 flex min-h-24 items-start gap-4 border border-line p-5 transition-colors hover:bg-surface-subdued"
                  >
                    <span className="nav-icon inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                      <Icon name={program.icon} size={19} />
                    </span>
                    <span>
                      <h3 className="flex items-center text-[15px] font-medium text-text">
                        {program.label}
                        <HoverArrow />
                      </h3>
                      <p className="mt-1 text-[14px] text-text-muted">{program.description}</p>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
