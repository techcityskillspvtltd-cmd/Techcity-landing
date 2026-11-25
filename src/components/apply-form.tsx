"use client";

import {
  startTransition,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
  type RefObject,
} from "react";
import { HoverArrow } from "@/components/hover-arrow";
import { AlertCircleIcon, FileIcon, MultipleCrossCancelIcon, UploadUpIcon } from "@/components/pikaicons";
import { resumeError, type FieldErrors } from "@/lib/apply-checks";

/*
 * Parts shared by the site's forms (components/careers-form for trainers,
 * components/students/openings for students, components/partner-dialog for
 * partners). Every label says
 * whether it's required (*) or optional. On send the form is checked here
 * first (lib/apply-checks, the same checks the server runs): anything missing
 * or wrong is listed in a box at the top, each item a link to its field, and
 * marked under the field itself. A flagged field is re-checked as it's edited,
 * so its message goes the moment it's right.
 */

type ServerState = { status: "idle" | "error" | "sent"; message?: string; errors?: Partial<Record<string, string>> };

export function useApplyForm(check: (f: FormData) => FieldErrors, state: ServerState, send: (f: FormData) => void) {
  const form = useRef<HTMLFormElement>(null);
  const alert = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attempt, setAttempt] = useState(0);

  // Errors the server sent back (only if a check was missed here) replace ours.
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    if (state.status === "error") {
      setErrors(Object.fromEntries(Object.entries(state.errors ?? {}).filter(([, m]) => m)) as FieldErrors);
      setAttempt((a) => a + 1);
    }
  }

  // After a send that didn't go through, take the reader to the list of what to fix.
  useEffect(() => {
    if (!attempt) return;
    alert.current?.focus({ preventScroll: true });
    alert.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [attempt]);

  /** Re-check one field that's already flagged; it never flags a field mid-typing. */
  const recheck = (name: string) => {
    if (!form.current) return;
    const next = check(new FormData(form.current));
    setErrors((prev) => {
      if (!(name in prev)) return prev;
      const copy = { ...prev };
      if (next[name]) copy[name] = next[name];
      else delete copy[name];
      return copy;
    });
  };

  const setError = (name: string, message?: string) =>
    setErrors((prev) => {
      const copy = { ...prev };
      if (message) copy[name] = message;
      else delete copy[name];
      return copy;
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = check(data);
    setErrors(found);
    if (Object.keys(found).length) return setAttempt((a) => a + 1);
    startTransition(() => send(data));
  };

  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as unknown as HTMLInputElement).name;
    if (name) recheck(name);
  };

  /** Focus a field from the list at the top. */
  const pick = (name: string) => {
    const el = form.current?.querySelector<HTMLElement>(`[name="${name}"]`);
    el?.focus({ preventScroll: true });
    (el?.closest(".cr-field, .cr-group, .cr-consent") ?? el)?.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  return { formRef: form, alertRef: alert, errors, setError, onSubmit, onChange, pick, serverMessage: state.status === "error" ? state.message : undefined };
}

/** The note at the top of a form saying what the * means. */
export function RequiredNote() {
  return (
    <p className="cr-hint">
      Fields marked <span className="cr-req">*</span> are required.
    </p>
  );
}

/** What's missing or wrong, listed at the top; each item focuses its field. */
export function FormAlert({
  alertRef,
  errors,
  message,
  onPick,
}: {
  alertRef: RefObject<HTMLDivElement | null>;
  errors: FieldErrors;
  message?: string;
  onPick: (name: string) => void;
}) {
  const list = Object.entries(errors);
  if (!list.length && !message) return null;
  const missing = list.filter(([, m]) => /^(Enter your|Enter the|Choose|Attach|Tick|List)/.test(m)).length;
  const title = !list.length
    ? message
    : missing === list.length
      ? `${list.length === 1 ? "One required field is" : `${list.length} required fields are`} empty.`
      : `${list.length === 1 ? "One thing needs" : `${list.length} things need`} fixing before you send.`;
  return (
    <div ref={alertRef} tabIndex={-1} role="alert" className="cr-alert">
      <p className="cr-alert__title">
        <AlertCircleIcon width={18} height={18} aria-hidden="true" />
        {title}
      </p>
      {list.length > 0 && (
        <ul className="cr-alert__list">
          {list.map(([name, m]) => (
            <li key={name}>
              <button type="button" onClick={() => onPick(name)}>
                {m}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Label({ text, required }: { text: ReactNode; required?: boolean }) {
  return (
    <span className="cr-label">
      {text}
      {required ? (
        <span className="cr-req" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="cr-opt">(optional)</span>
      )}
    </span>
  );
}

function ErrorLine({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <span id={id} className="cr-error">
      {error}
    </span>
  );
}

export function Field({
  name,
  label,
  error,
  wide,
  required,
  ...rest
}: { name: string; label: string; error?: string; wide?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <label className={`cr-field ${wide ? "cr-field--wide" : ""}`}>
      <Label text={label} required={required} />
      <input
        name={name}
        className="cr-input"
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? id : undefined}
        {...rest}
      />
      <ErrorLine id={id} error={error} />
    </label>
  );
}

export function Select({
  name,
  label,
  options,
  required,
  error,
  wide,
  value,
  onValue,
  placeholder = "Choose one",
}: {
  name: string;
  label: string;
  options: (string | { value: string; label: string })[];
  required?: boolean;
  error?: string;
  wide?: boolean;
  value?: string;
  onValue?: (v: string) => void;
  placeholder?: string;
}) {
  const id = useId();
  const controlled = value !== undefined ? { value, onChange: (e: ChangeEvent<HTMLSelectElement>) => onValue?.(e.target.value) } : { defaultValue: "" };
  return (
    <label className={`cr-field ${wide ? "cr-field--wide" : ""}`}>
      <Label text={label} required={required} />
      <select
        name={name}
        required={required}
        className="cr-input"
        aria-invalid={!!error}
        aria-describedby={error ? id : undefined}
        {...controlled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => {
          const { value: v, label: l } = typeof o === "string" ? { value: o, label: o } : o;
          return (
            <option key={v} value={v}>
              {l}
            </option>
          );
        })}
      </select>
      <ErrorLine id={id} error={error} />
    </label>
  );
}

/** Segmented choice; always has a value, so it's never missing. */
export function Pills({ name, label, options, defaultValue }: { name: string; label: string; options: string[]; defaultValue: string }) {
  return (
    <div className="cr-field" role="radiogroup" aria-label={label}>
      <Label text={label} required />
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

/** Several choices at once (checkbox pills); always optional. */
export function Choices({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <div className="cr-field cr-field--wide" role="group" aria-label={label}>
      <Label text={label} />
      <span className="cr-pills">
        {options.map((o) => (
          <label key={o} className="cr-pill">
            <input type="checkbox" name={name} value={o} className="sr-only" />
            <span>{o}</span>
          </label>
        ))}
      </span>
    </div>
  );
}

export function TextArea({
  name,
  label,
  error,
  required,
  ...rest
}: { name: string; label: string; error?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <label className="cr-field cr-field--wide">
      <Label text={label} required={required} />
      <textarea
        name={name}
        rows={3}
        className="cr-input cr-textarea"
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? id : undefined}
        {...rest}
      />
      <ErrorLine id={id} error={error} />
    </label>
  );
}

const size = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

/** The résumé: click or drop; the file is checked as soon as it's picked. */
export function ResumeDrop({ error, onError }: { error?: string; onError: (message?: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();

  const clear = () => {
    setFile(null);
    if (input.current) input.current.value = "";
  };
  const accept = (f: File | undefined) => {
    if (!f) return;
    const problem = resumeError(f);
    if (problem) {
      clear();
      return onError(problem);
    }
    onError(undefined);
    setFile(f);
    // Keep the real input in sync (drops don't go through it).
    if (input.current) {
      const dt = new DataTransfer();
      dt.items.add(f);
      input.current.files = dt.files;
    }
  };
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    accept(e.dataTransfer.files[0]);
  };

  return (
    <div className="cr-field">
      <Label text="Résumé" required />
      <label
        className="cr-drop"
        data-drag={drag || undefined}
        data-has={file ? true : undefined}
        data-error={error ? true : undefined}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
      >
        <input
          ref={input}
          type="file"
          name="resume"
          required
          aria-label="Résumé"
          aria-invalid={!!error}
          aria-describedby={error ? id : undefined}
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          onChange={(e) => {
            e.stopPropagation(); // checked here, not by the form's onChange
            accept(e.target.files?.[0]);
          }}
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
                clear();
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
      <ErrorLine id={id} error={error} />
    </div>
  );
}

export function Consent({ children, error }: { children: ReactNode; error?: string }) {
  const id = useId();
  return (
    <div>
      <label className="cr-consent">
        <input type="checkbox" name="consent" required className="cr-check" aria-invalid={!!error} aria-describedby={error ? id : undefined} />
        <span>
          {children}
          <span className="cr-req" aria-hidden="true">
            *
          </span>
        </span>
      </label>
      <ErrorLine id={id} error={error} />
    </div>
  );
}

export function SubmitRow({ pending, label = "Send application" }: { pending: boolean; label?: string }) {
  return (
    <div className="cr-submit">
      <button type="submit" className="btn btn-primary btn-lg" disabled={pending}>
        {pending ? "Sending…" : label}
        {!pending && <HoverArrow />}
      </button>
    </div>
  );
}
