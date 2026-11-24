"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type DragEvent, type FormEvent } from "react";
import { submitApplication, type ApplyState } from "@/app/(partners)/company/careers/actions";
import { HoverArrow } from "@/components/hover-arrow";
import { CheckTickCircleIcon, FileIcon, MultipleCrossCancelIcon, UploadUpIcon } from "@/components/pikaicons";
import { ROLES } from "@/lib/careers";

/*
 * Careers application form. Submits to a server action (careers/actions.ts),
 * which validates and, once email is set up, forwards everything to the
 * company inbox. Submitting via onSubmit + startTransition keeps what was typed
 * if the server sends errors back (a plain form action would reset the form).
 *
 * Links elsewhere on the page can preselect a role: `#apply-<value>` scrolls
 * here and picks it (e.g. #apply-ai-ml).
 */

const EXPERIENCE = ["Less than 2 years", "2 to 5 years", "5 to 10 years", "More than 10 years"];
const AVAILABILITY = ["Immediately", "Within 15 days", "Within 30 days", "In 60 days or more"];
const ENGAGEMENT = ["Full-time", "Part-time", "Freelance"];
const MODE = ["On campus", "Online", "Either"];

const MAX = 5 * 1024 * 1024;
const TYPES = [".pdf", ".doc", ".docx"];

const initial: ApplyState = { status: "idle" };
const size = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

export function CareersForm() {
  const [state, action, pending] = useActionState(submitApplication, initial);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [role, setRole] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // `#apply-<role>` links: pick the role and bring the form into view.
  useEffect(() => {
    const pick = () => {
      const m = window.location.hash.match(/^#apply-([\w-]+)$/);
      if (!m || !ROLES.some((r) => r.value === m[1])) return;
      setRole(m[1]);
      wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);

  const accept = (f: File | undefined) => {
    if (!f) return;
    const ok = TYPES.some((t) => f.name.toLowerCase().endsWith(t));
    if (!ok) return setFileError("Use a PDF or Word file.");
    if (f.size > MAX) return setFileError("Keep the file under 5 MB.");
    setFileError(null);
    setFile(f);
    // Keep the real input in sync (drops don't go through it).
    if (fileRef.current) {
      const dt = new DataTransfer();
      dt.items.add(f);
      fileRef.current.files = dt.files;
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    accept(e.dataTransfer.files[0]);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setFileError("Attach your résumé.");
      return;
    }
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };

  const err = (k: string) => state.errors?.[k];

  if (state.status === "sent") {
    return (
      <div ref={wrapRef} className="cr-form cr-form--sent" role="status">
        <span className="cr-sent__icon" aria-hidden="true">
          <CheckTickCircleIcon width={28} height={28} />
        </span>
        <h3 className="mt-6 text-[24px] leading-[1.25] font-normal tracking-[-0.02em] text-text">Application sent.</h3>
        <p className="mt-3 max-w-[440px] text-[16px] leading-[1.6] text-text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="cr-form-wrap">
      <form ref={formRef} className="cr-form" onSubmit={onSubmit} noValidate={false} aria-describedby="cr-form-status">
        <fieldset className="cr-group">
          <legend className="cr-legend">About you</legend>
          <div className="cr-grid">
            <Field name="name" label="Full name" autoComplete="name" required error={err("name")} />
            <Field name="email" label="Email" type="email" autoComplete="email" required error={err("email")} />
            <Field name="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" required error={err("phone")} />
            <Field name="city" label="City" autoComplete="address-level2" placeholder="Where you're based" required error={err("city")} />
          </div>
        </fieldset>

        <fieldset className="cr-group">
          <legend className="cr-legend">The role</legend>
          <div className="cr-grid">
            <label className="cr-field cr-field--wide">
              <span className="cr-label">Role you&apos;re applying for</span>
              <select name="role" required value={role} onChange={(e) => setRole(e.target.value)} className="cr-input" aria-invalid={!!err("role")}>
                <option value="" disabled>
                  Choose a role
                </option>
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              {err("role") && <span className="cr-error">{err("role")}</span>}
            </label>
            <Pills name="engagement" label="Type of work" options={ENGAGEMENT} defaultValue="Full-time" />
            <Pills name="mode" label="Where you'd teach" options={MODE} defaultValue="On campus" />
            <Select name="experience" label="Years of experience" options={EXPERIENCE} required error={err("experience")} />
            <Select name="availability" label="When you could start" options={AVAILABILITY} />
          </div>
        </fieldset>

        <fieldset className="cr-group">
          <legend className="cr-legend">Your experience</legend>
          <div className="cr-grid">
            <Field
              name="subjects"
              label="Subjects or skills you'd teach"
              placeholder="For example: Java, DSA, React, Power BI"
              required
              wide
              error={err("subjects")}
            />
            <Field name="company" label="Current company or college" autoComplete="organization" placeholder="Optional" />
            <Field name="link" label="LinkedIn, GitHub or portfolio" type="url" placeholder="https://" error={err("link")} />
          </div>
        </fieldset>

        <fieldset className="cr-group">
          <legend className="cr-legend">Résumé</legend>
          <label
            className="cr-drop"
            data-drag={drag || undefined}
            data-has={file ? true : undefined}
            data-error={fileError || err("resume") ? true : undefined}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
          >
            <input
              ref={fileRef}
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              onChange={(e) => accept(e.target.files?.[0])}
            />
            {file ? (
              <span className="cr-file">
                <span className="cr-file__icon" aria-hidden="true">
                  <FileIcon width={20} height={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-medium text-text">{file.name}</span>
                  <span className="block text-[13px] text-text-muted">{size(file.size)} · Click to replace</span>
                </span>
                <button
                  type="button"
                  className="cr-file__remove"
                  aria-label="Remove résumé"
                  onClick={(e) => {
                    e.preventDefault();
                    clearFile();
                  }}
                >
                  <MultipleCrossCancelIcon width={16} height={16} />
                </button>
              </span>
            ) : (
              <span className="cr-drop__empty">
                <span className="cr-drop__icon" aria-hidden="true">
                  <UploadUpIcon width={20} height={20} />
                </span>
                <span className="text-[14px] text-text">
                  <span className="font-medium text-accent">Upload your résumé</span> or drag it here
                </span>
                <span className="text-[13px] text-text-muted">PDF or Word, up to 5 MB</span>
              </span>
            )}
          </label>
          {(fileError || err("resume")) && <span className="cr-error">{fileError || err("resume")}</span>}
        </fieldset>

        <fieldset className="cr-group">
          <legend className="cr-legend">Anything else</legend>
          <label className="cr-field cr-field--wide">
            <span className="cr-label">A note for the team</span>
            <textarea
              name="note"
              rows={4}
              className="cr-input cr-textarea"
              placeholder="What you'd like to teach, a class you're proud of, or anything we should know."
            />
          </label>
        </fieldset>

        <label className="cr-consent">
          <input type="checkbox" name="consent" required className="cr-check" />
          <span>
            I agree that TechCity Skills may store these details and contact me about roles.
            {err("consent") && <span className="cr-error block">{err("consent")}</span>}
          </span>
        </label>

        <div className="cr-submit">
          <button type="submit" className="btn btn-primary btn-lg" disabled={pending}>
            {pending ? "Sending…" : "Send application"}
            {!pending && <HoverArrow />}
          </button>
          <p id="cr-form-status" className="text-[13px] text-text-muted" aria-live="polite">
            {state.status === "error" ? <span className="text-[#C2412B]">{state.message}</span> : "We read every application."}
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  error,
  wide,
  ...rest
}: { name: string; label: string; error?: string; wide?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`cr-field ${wide ? "cr-field--wide" : ""}`}>
      <span className="cr-label">{label}</span>
      <input name={name} className="cr-input" aria-invalid={!!error} {...rest} />
      {error && <span className="cr-error">{error}</span>}
    </label>
  );
}

function Select({ name, label, options, required, error }: { name: string; label: string; options: string[]; required?: boolean; error?: string }) {
  return (
    <label className="cr-field">
      <span className="cr-label">{label}</span>
      <select name={name} required={required} defaultValue="" className="cr-input" aria-invalid={!!error}>
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {error && <span className="cr-error">{error}</span>}
    </label>
  );
}

function Pills({ name, label, options, defaultValue }: { name: string; label: string; options: string[]; defaultValue: string }) {
  return (
    <div className="cr-field" role="radiogroup" aria-label={label}>
      <span className="cr-label">{label}</span>
      <span className="cr-pills">
        {options.map((o) => (
          <label key={o} className="cr-pill">
            <input type="radio" name={name} value={o} defaultChecked={o === defaultValue} className="sr-only" />
            <span>{o}</span>
          </label>
        ))}
      </span>
    </div>
  );
}
