"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitStudentApplication, type StudentApplyState } from "@/app/students/careers/actions";
import { Consent, Field, FormAlert, RequiredNote, ResumeDrop, Select, SubmitRow, useApplyForm } from "@/components/apply-form";
import { HoverArrow } from "@/components/hover-arrow";
import { CheckTickCircleIcon, MultipleCrossCancelIcon } from "@/components/pikaicons";
import { checkStudent } from "@/lib/apply-checks";
import { openings, type Opening } from "@/lib/students";
import "@/components/careers-page.css";

/*
 * Student careers: the openings, and the application form that pops up over
 * the page when one is picked (a native <dialog>, so focus, Escape and the
 * backdrop behave as they should). The role picked is filled in, and can be
 * changed in the form. Checked as it's sent (components/apply-form), then by
 * a server action (app/students/careers/actions.ts). Field styles are the
 * careers form's (careers-page.css).
 */

const YEARS = ["1st year", "2nd year", "3rd year", "4th year", "Graduated"];

export function Openings() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [role, setRole] = useState<string>(openings[0].value);
  const [session, setSession] = useState(0); // a fresh form each time it opens after a send

  const open = (o: Opening) => {
    setRole(o.value);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <ul className="sd-openings">
        {openings.map((o) => (
          <li key={o.value}>
            <button type="button" className="sd-opening group" onClick={() => open(o)} aria-haspopup="dialog">
              <span className="sd-opening__main">
                <span className="sd-opening__meta">
                  <span className="sd-chip sd-chip--plain">{o.type}</span>
                  <span>{o.team}</span>
                </span>
                <span className="sd-opening__title">{o.title}</span>
                <span className="sd-opening__summary">{o.summary}</span>
                <span className="sd-opening__skills">
                  {o.skills.map((k) => (
                    <span key={k}>{k}</span>
                  ))}
                </span>
              </span>
              <span className="sd-opening__cta">
                Apply
                <HoverArrow />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="ap-dialog"
        aria-labelledby="ap-dialog-title"
        onClick={(e) => {
          // A click on the backdrop (the dialog itself, outside its panel) closes it.
          if (e.target === e.currentTarget) close();
        }}
        onClose={() => setSession((s) => s + 1)}
      >
        <div className="ap-dialog__panel">
          <div className="ap-dialog__head">
            <div>
              <p className="text-[13px] font-medium text-[var(--g-indigo)]">Student careers</p>
              <h2 id="ap-dialog-title" className="mt-1 text-[22px] leading-[1.25] font-normal tracking-[-0.02em] text-text">
                Apply for {openings.find((o) => o.value === role)?.title}
              </h2>
            </div>
            <button type="button" className="ap-dialog__close" onClick={close} aria-label="Close">
              <MultipleCrossCancelIcon width={18} height={18} aria-hidden="true" />
            </button>
          </div>
          <ApplyForm key={session} role={role} onRole={setRole} onDone={close} />
        </div>
      </dialog>
    </>
  );
}

const initial: StudentApplyState = { status: "idle" };
const ROLE_VALUES = openings.map((o) => o.value);
const check = (f: FormData) => checkStudent(f, ROLE_VALUES);

function ApplyForm({ role, onRole, onDone }: { role: string; onRole: (r: string) => void; onDone: () => void }) {
  const [state, action, pending] = useActionState(submitStudentApplication, initial);
  const { formRef, alertRef, errors, setError, onSubmit, onChange, pick, serverMessage } = useApplyForm(check, state, action);
  const top = useRef<HTMLDivElement>(null);

  // After a send, bring the confirmation into view.
  useEffect(() => {
    if (state.status === "sent") top.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [state]);

  if (state.status === "sent") {
    return (
      <div ref={top} className="ap-dialog__sent" role="status">
        <span className="cr-sent__icon" aria-hidden="true">
          <CheckTickCircleIcon width={28} height={28} />
        </span>
        <h3 className="mt-6 text-[22px] leading-[1.25] font-normal tracking-[-0.02em] text-text">Application sent.</h3>
        <p className="mt-3 max-w-[440px] text-[15px] leading-[1.6] text-text-muted">{state.message}</p>
        <p className="mt-2 max-w-[440px] text-[14px] leading-[1.6] text-text-muted">
          Next: a short call, a task round, then a final conversation.
        </p>
        <button type="button" className="btn btn-secondary btn-lg mt-8 shadow-[var(--shadow-btn)]" onClick={onDone}>
          Done
        </button>
      </div>
    );
  }

  return (
    <div ref={top}>
      <form ref={formRef} className="cr-form ap-dialog__form" onSubmit={onSubmit} onChange={onChange} noValidate>
        <RequiredNote />
        <FormAlert alertRef={alertRef} errors={errors} message={serverMessage} onPick={pick} />

        <fieldset className="cr-group">
          <legend className="cr-legend">Your details</legend>
          <div className="cr-grid">
            <Select
              name="role"
              label="Role"
              options={openings.map((o) => ({ value: o.value, label: o.title }))}
              required
              wide
              value={role}
              onValue={onRole}
              error={errors.role}
            />
            <Field name="name" label="Full name" autoComplete="name" required error={errors.name} />
            <Field name="email" label="Email" type="email" autoComplete="email" placeholder="name@example.com" required error={errors.email} />
            <Field name="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" required error={errors.phone} />
            <Field name="college" label="College" autoComplete="organization" required error={errors.college} />
            <Field name="degree" label="Degree and branch" placeholder="B.Tech CSE" required error={errors.degree} />
            <Select name="year" label="Year" options={YEARS} required error={errors.year} />
            <Field name="link" label="Portfolio, GitHub or LinkedIn" type="url" placeholder="https://" wide error={errors.link} />
          </div>
        </fieldset>

        <div className="cr-group">
          <ResumeDrop error={errors.resume} onError={(m) => setError("resume", m)} />
        </div>

        <Consent error={errors.consent}>I agree that TechCity Skills may store these details and contact me about this role.</Consent>
        <SubmitRow pending={pending} />
      </form>
    </div>
  );
}
