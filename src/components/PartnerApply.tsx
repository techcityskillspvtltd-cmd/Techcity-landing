"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import CtaLink from "@/components/CtaLink";

type PartnerKind = "college" | "industry";

type PartnerEnquiry = {
  kind: PartnerKind;
  organization: string;
  city: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  note: string;
};

const PartnerApplyContext = createContext<(() => void) | null>(null);

export function PartnerApplyProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <PartnerApplyContext.Provider value={() => setOpen(true)}>
      {children}
      <PartnerApplyDialog open={open} onClose={() => setOpen(false)} />
    </PartnerApplyContext.Provider>
  );
}

export function PartnerCta({
  className = "",
  size = "sm",
  onOpen,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  onOpen?: () => void;
}) {
  const open = useContext(PartnerApplyContext);

  return (
    <CtaLink
      size={size}
      className={className}
      onClick={() => {
        onOpen?.();
        open?.();
      }}
    >
      Partner with us
    </CtaLink>
  );
}

function PartnerApplyDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const [kind, setKind] = useState<PartnerKind>("college");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setKind("college");
    setSent(false);
    setSending(false);
    setError("");
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSending(true);

    const data = new FormData(event.currentTarget);
    const enquiry: PartnerEnquiry = {
      kind,
      organization: String(data.get("organization") ?? ""),
      city: String(data.get("city") ?? ""),
      name: String(data.get("name") ?? ""),
      role: String(data.get("role") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      note: String(data.get("note") ?? ""),
    };

    try {
      const response = await fetch("/api/apply/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setError(payload?.error || "Could not send the application.");
        return;
      }

      setSent(true);
    } catch {
      setError("Could not send the application. Check your connection.");
    } finally {
      setSending(false);
    }
  }

  const organizationLabel = kind === "college" ? "College" : "Company";

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close partner form"
        className="absolute inset-0 bg-background/80"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-hidden border border-foreground/15 bg-background"
      >
        <div className="flex items-start justify-between gap-6 border-b border-foreground/10 px-5 py-4 sm:px-6">
          <h2
            id={titleId}
            className="text-[1.35rem] font-normal tracking-tight text-foreground"
          >
            Partner with us
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 border border-foreground/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/70 outline-none transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:ring-1 focus-visible:ring-accent"
          >
            Close
          </button>
        </div>

        {sent ? (
          <p className="px-5 py-10 text-[15px] leading-7 text-foreground sm:px-6">
            Application sent. We&apos;ll reply on the email you shared.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="grid min-h-0 flex-1 gap-5 overflow-y-auto px-5 py-5 sm:grid-cols-2 sm:px-6 sm:py-6"
          >
            <fieldset className="sm:col-span-2">
              <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
                Partner as
                <span className="ml-1 text-accent" aria-hidden="true">
                  *
                </span>
              </legend>
              <input type="hidden" name="kind" value={kind} />
              <div className="mt-2 grid grid-cols-2 border border-foreground/15">
                {(
                  [
                    ["college", "College"],
                    ["industry", "Industry"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={kind === value}
                    onClick={() => setKind(value)}
                    className={`px-3 py-2.5 text-sm ${
                      kind === value
                        ? "bg-accent text-on-accent"
                        : "text-foreground/70"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <Field
              label={organizationLabel}
              name="organization"
              autoComplete="organization"
              required
            />
            <Field label="City" name="city" autoComplete="address-level2" required />
            <Field label="Your name" name="name" autoComplete="name" required />
            <Field label="Role" name="role" autoComplete="organization-title" required />
            <Field label="Email" name="email" type="email" autoComplete="email" required />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
            <label className="block sm:col-span-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
                What you want to start
              </span>
              <textarea
                name="note"
                rows={3}
                placeholder={
                  kind === "college"
                    ? "The cohort, the term, and the program you want on campus."
                    : "Hiring, mentorship, or the tools a lab should run on."
                }
                className="mt-2 w-full resize-y border border-foreground/15 bg-transparent px-3 py-2.5 text-sm leading-6 text-foreground outline-none placeholder:text-foreground/30 focus:border-accent"
              />
            </label>
            {error ? (
              <p className="text-sm text-accent sm:col-span-2" role="alert">
                {error}
              </p>
            ) : null}
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={sending}
                className="bg-accent px-5 py-2.5 text-[13px] font-medium text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Apply"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
        {label}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        ) : null}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="mt-2 w-full border border-foreground/15 bg-transparent px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent"
      />
    </label>
  );
}
