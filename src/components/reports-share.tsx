"use client";

import { useState } from "react";
import { EnvelopeSolidIcon, LinkChainHorizontalIcon, LinkedinSolidIcon, XComSolidIcon } from "@/components/pikaicons";

/** Share links for a report, plus copy-link. `url` is the page's full address. */
export function ReportShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on X", href: `https://x.com/intent/post?url=${u}&text=${t}`, Icon: XComSolidIcon },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedinSolidIcon },
    { label: "Share by email", href: `mailto:?subject=${t}&body=${u}`, Icon: EnvelopeSolidIcon },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: nothing to do; the address bar still has the link.
    }
  };

  return (
    <ul className="rp-share" aria-label="Share this report">
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            className="rp-share__btn"
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <Icon width={18} height={18} aria-hidden="true" />
          </a>
        </li>
      ))}
      <li>
        <button type="button" onClick={copy} aria-label="Copy link" title="Copy link" className="rp-share__btn">
          <LinkChainHorizontalIcon width={18} height={18} aria-hidden="true" />
        </button>
      </li>
      <li aria-live="polite" className="rp-share__note">
        {copied ? "Link copied" : ""}
      </li>
    </ul>
  );
}
