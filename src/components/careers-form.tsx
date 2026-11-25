"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitApplication, type ApplyState } from "@/app/(partners)/company/careers/actions";
import { Consent, Field, FormAlert, Pills, RequiredNote, ResumeDrop, Select, SubmitRow, useApplyForm } from "@/components/apply-form";
import { CheckTickCircleIcon } from "@/components/pikaicons";
import { checkTrainer } from "@/lib/apply-checks";
import { ROLES } from "@/lib/careers";

/*
 * Trainer application form. Checked as it's sent (components/apply-form, the
 * same checks the server runs), then submitted to a server action
 * (careers/actions.ts), which, once email is set up, forwards it to the
 * company inbox. Submitting via onSubmit + startTransition keeps what was
 * typed if the server sends errors back.
 *
 * Links elsewhere on the page can preselect a role: `#apply-<value>` scrolls
 * here and picks it (e.g. #apply-ai-ml).
 */

const EXPERIENCE = ["Less than 2 years", "2 to 5 years", "5 to 10 years", "More than 10 years"];
const ENGAGEMENT = ["Full-time", "Part-time", "Freelance"];
const MODE = ["On campus", "Online", "Either"];

const initial: ApplyState = { status: "idle" };
const ROLE_VALUES = ROLES.map((r) => r.value);
const check = (f: FormData) => checkTrainer(f, ROLE_VALUES);

export function CareersForm() {
  const [state, action, pending] = useActionState(submitApplication, initial);
  const { formRef, alertRef, errors, setError, onSubmit, onChange, pick, serverMessage } = useApplyForm(check, state, action);
  const [role, setRole] = useState("");
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
      <form ref={formRef} className="cr-form" onSubmit={onSubmit} onChange={onChange} noValidate>
        <RequiredNote />
        <FormAlert alertRef={alertRef} errors={errors} message={serverMessage} onPick={pick} />

        <fieldset className="cr-group">
          <legend className="cr-legend">About you</legend>
          <div className="cr-grid">
            <Field name="name" label="Full name" autoComplete="name" required error={errors.name} />
            <Field name="email" label="Email" type="email" autoComplete="email" placeholder="name@example.com" required error={errors.email} />
            <Field name="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" required error={errors.phone} />
            <Field name="city" label="City" autoComplete="address-level2" placeholder="Where you're based" required error={errors.city} />
            <Field name="company" label="Current company or college" autoComplete="organization" />
            <Field name="link" label="LinkedIn, GitHub or portfolio" type="url" placeholder="https://" error={errors.link} />
          </div>
        </fieldset>

        <fieldset className="cr-group">
          <legend className="cr-legend">The role</legend>
          <div className="cr-grid">
            <Select
              name="role"
              label="Role"
              options={ROLES.map((r) => ({ value: r.value, label: r.label }))}
              placeholder="Choose a role"
              required
              value={role}
              onValue={setRole}
              error={errors.role}
            />
            <Select name="experience" label="Years of experience" options={EXPERIENCE} required error={errors.experience} />
            <Field
              name="subjects"
              label="Subjects or skills you'd teach"
              placeholder="Java, DSA, React, Power BI"
              required
              wide
              error={errors.subjects}
            />
            <Pills name="engagement" label="Type of work" options={ENGAGEMENT} defaultValue="Full-time" />
            <Pills name="mode" label="Where you'd teach" options={MODE} defaultValue="On campus" />
          </div>
        </fieldset>

        <div className="cr-group">
          <ResumeDrop error={errors.resume} onError={(m) => setError("resume", m)} />
        </div>

        <Consent error={errors.consent}>I agree that TechCity Skills may store these details and contact me about roles.</Consent>
        <SubmitRow pending={pending} />
      </form>
    </div>
  );
}
