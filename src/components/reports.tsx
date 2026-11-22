/* eslint-disable @next/next/no-img-element -- local, pre-trimmed logo files */
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { FileSolidIcon } from "@/components/pikaicons";
import { collegeLogo, formatDate, type Report } from "@/lib/reports";
import "./reports.css";

/*
 * Pieces shared by /reports and /reports/[slug], laid out like a newsroom's
 * stories pages: four columns with dashed guides, tinted picture cards, and
 * dated rows with a short accent tick at the head of each column.
 */

export const reportHref = (r: Report) => `/reports/${r.slug}`;

/** Dashed column guides at a quarter, half and three quarters (wide screens). */
export function Guides() {
  return (
    <div className="rp-guides" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}

/** The college's logo on a white chip, or TechCity's for company-wide reports. */
export function ReportMark({ report, size = "md" }: { report: Report; size?: "sm" | "md" }) {
  const src = collegeLogo(report.college);
  return (
    <span className="rp-mark" data-size={size}>
      {src ? (
        <img src={src} alt="" />
      ) : report.college ? (
        <span className="rp-mark__name">{report.college}</span>
      ) : (
        <Logo height={size === "sm" ? 14 : 18} />
      )}
    </span>
  );
}

/** The city illustration, cropped per report and tinted with the report's tone. */
export function ReportCover({
  report,
  sizes,
  priority = false,
  children,
}: {
  report: Report;
  sizes: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="rp-cover" data-tone={report.cover.tone}>
      <Image
        src="/cta-image.png"
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="rp-cover__img"
        style={{ objectPosition: `${report.cover.x}% 100%` }}
      />
      <span className="rp-cover__tint" aria-hidden="true" />
      {children}
    </div>
  );
}

/** A picture card: mark and icon on top, title and dek at the bottom. */
export function ReportCard({ report, big = false, priority = false }: { report: Report; big?: boolean; priority?: boolean }) {
  return (
    <Link href={reportHref(report)} className="rp-card group" data-big={big || undefined}>
      <ReportCover report={report} sizes={big ? "(min-width: 1024px) 950px, 100vw" : "(min-width: 768px) 630px, 100vw"} priority={priority}>
        <span className="rp-card__top">
          <ReportMark report={report} />
          <FileSolidIcon width={22} height={22} aria-hidden="true" className="rp-card__icon" />
        </span>
        <span className="rp-card__text">
          <span className="rp-card__type">{report.type}</span>
          <span className="rp-card__title">{report.title}</span>
          {big && <span className="rp-card__dek">{report.dek}</span>}
        </span>
      </ReportCover>
    </Link>
  );
}

/** One row of "All reports": date | type and title | picture. */
export function ReportRow({ report }: { report: Report }) {
  return (
    <li className="rp-row">
      <p className="rp-tick rp-row__date">
        <time dateTime={report.date}>{formatDate(report.date)}</time>
      </p>
      <div className="rp-row__main">
        <p className="rp-tick rp-row__type">{report.type}</p>
        <h3 className="rp-row__title">
          <Link href={reportHref(report)} className="rp-row__link">
            {report.title}
          </Link>
        </h3>
        {report.college && (
          <p className="rp-row__where">
            {report.college}
            {report.city && <span> · {report.city}</span>}
          </p>
        )}
      </div>
      <div className="rp-row__thumb" aria-hidden="true">
        <ReportCover report={report} sizes="(min-width: 1024px) 300px, 160px">
          <span className="rp-row__mark">
            <ReportMark report={report} size="sm" />
          </span>
        </ReportCover>
      </div>
    </li>
  );
}
