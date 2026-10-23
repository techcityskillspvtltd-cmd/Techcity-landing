import Link from "next/link";

function PlusIcon() {
  return (
    <svg
      className="size-[0.75em]"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 1v10M1 6h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

const sizes = {
  sm: {
    box: "size-8",
    label:
      "h-8 px-4 text-[13px] -translate-x-[calc(2rem+6px)]",
  },
  md: {
    box: "size-8 lg:size-10",
    label:
      "h-8 px-4 text-[13px] -translate-x-[calc(2rem+6px)] lg:h-10 lg:px-5 lg:text-[15px] lg:-translate-x-[calc(2.5rem+6px)]",
  },
  lg: {
    box: "size-10",
    label:
      "h-10 px-5 text-[15px] -translate-x-[calc(2.5rem+6px)]",
  },
} as const;

export default function CtaLink({
  href,
  children,
  onClick,
  className = "",
  size = "sm",
  external = false,
  tone = "solid",
}: {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: keyof typeof sizes;
  external?: boolean;
  tone?: "solid" | "outline";
}) {
  const { box, label } = sizes[size];
  const classes = `group inline-flex min-w-0 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap font-medium outline-none ${className}`;

  if (!href) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {ctaInner(box, label, children, tone)}
      </button>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ctaInner(box, label, children, tone)}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {ctaInner(box, label, children, tone)}
    </Link>
  );
}

function ctaInner(
  box: string,
  label: string,
  children: React.ReactNode,
  tone: "solid" | "outline",
) {
  const face =
    tone === "outline"
      ? "border border-foreground/35 bg-background/70 text-foreground backdrop-blur-md"
      : "bg-accent text-on-accent";
  return (
    <span className="relative flex w-full items-center gap-1.5">
      <span
        className={`flex origin-left -rotate-45 scale-0 items-center justify-center rounded-none transition-transform duration-700 ease-power4-in-out group-hover:rotate-[0deg] group-hover:scale-100 ${face} ${box}`}
      >
        <PlusIcon />
      </span>
      <span
        className={`flex w-full flex-1 items-center justify-center rounded-none transition-transform duration-700 ease-power4-in-out group-hover:translate-x-0 ${face} ${label}`}
      >
        <span>{children}</span>
      </span>
      <span
        className={`absolute right-0 z-10 flex origin-right scale-100 items-center justify-center rounded-none transition-transform duration-700 ease-power4-in-out group-hover:-rotate-45 group-hover:scale-0 ${face} ${box}`}
      >
        <PlusIcon />
      </span>
    </span>
  );
}
