"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitPartner, type PartnerState } from "@/app/actions/partner";
import { Consent, Field, FormAlert, Pills, RequiredNote, SubmitRow, TextArea, useApplyForm } from "@/components/apply-form";
import { CheckTickCircleIcon, MultipleCrossCancelIcon } from "@/components/pikaicons";
import { checkPartner } from "@/lib/apply-checks";
import "@/components/careers-page.css";

/*
 * The "Partner with us" form, in a pop-up over whatever page you're on.
 * Mounted once in the root layout. Any link to `#partner` opens it (every
 * Partner with us button, in the navbar, the pages and the footer), as does
 * arriving on a page with #partner in the address. Checked as it's sent
 * (components/apply-form), then emailed by a server action (app/actions/partner).
 */

const KINDS = ["College or university", "Company", "Other"];

export function PartnerDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [session, setSession] = useState(0); // a fresh form each time it opens after a send

  useEffect(() => {
    const open = () => {
      if (!dialog.current?.open) dialog.current?.showModal();
    };
    // Clicks on any #partner link, caught before the link moves the page.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const url = new URL((a as HTMLAnchorElement).href, window.location.href);
      if (url.hash !== "#partner" || url.pathname !== window.location.pathname) return;
      e.preventDefault();
      open();
    };
    // Arriving with #partner (a link from another page): open, then tidy the address.
    const fromHash = () => {
      if (window.location.hash !== "#partner") return;
      open();
      history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", fromHash);
    fromHash();
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      className="ap-dialog"
      aria-labelledby="partner-dialog-title"
      onClick={(e) => {
        // A click on the backdrop (the dialog itself, outside its panel) closes it.
        if (e.target === e.currentTarget) close();
      }}
      onClose={() => setSession((s) => s + 1)}
    >
      <div className="ap-dialog__panel">
        <div className="ap-dialog__head">
          <div>
            <p className="text-[13px] font-medium text-[var(--g-indigo)]">Partner with us</p>
            <h2 id="partner-dialog-title" className="mt-1 text-[22px] leading-[1.25] font-normal tracking-[-0.02em] text-text">
              Let&apos;s work together.
            </h2>
          </div>
          <button type="button" className="ap-dialog__close" onClick={close} aria-label="Close">
            <MultipleCrossCancelIcon width={18} height={18} aria-hidden="true" />
          </button>
        </div>
        <PartnerForm key={session} onDone={close} />
      </div>
    </dialog>
  );
}

const initial: PartnerState = { status: "idle" };

function PartnerForm({ onDone }: { onDone: () => void }) {
  const [state, action, pending] = useActionState(submitPartner, initial);
  const { formRef, alertRef, errors, onSubmit, onChange, pick, serverMessage } = useApplyForm(checkPartner, state, action);

  if (state.status === "sent") {
    return (
      <div className="ap-dialog__sent" role="status">
        <span className="cr-sent__icon" aria-hidden="true">
          <CheckTickCircleIcon width={28} height={28} />
        </span>
        <h3 className="mt-6 text-[22px] leading-[1.25] font-normal tracking-[-0.02em] text-text">Message sent.</h3>
        <p className="mt-3 max-w-[440px] text-[15px] leading-[1.6] text-text-muted">{state.message}</p>
        <button type="button" className="btn btn-secondary btn-lg mt-8 shadow-[var(--shadow-btn)]" onClick={onDone}>
          Done
        </button>
      </div>
    );
  }

  return (
    <div>
      <form ref={formRef} className="cr-form ap-dialog__form" onSubmit={onSubmit} onChange={onChange} noValidate>
        <RequiredNote />
        <FormAlert alertRef={alertRef} errors={errors} message={serverMessage} onPick={pick} />

        <div className="cr-grid">
          <Field name="name" label="Full name" autoComplete="name" required error={errors.name} />
          <Field name="organisation" label="College or company" autoComplete="organization" required error={errors.organisation} />
          <Field name="email" label="Work email" type="email" autoComplete="email" placeholder="name@college.edu" required error={errors.email} />
          <Field name="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" required error={errors.phone} />
          <div className="cr-field--wide">
            <Pills name="kind" label="You are a" options={KINDS} defaultValue={KINDS[0]} />
          </div>
          <TextArea name="message" label="Message" maxLength={1000} placeholder="What would you like to talk about?" error={errors.message} />
        </div>

        <Consent error={errors.consent}>I agree that TechCity Skills may store these details and contact me about partnering.</Consent>
        <SubmitRow pending={pending} label="Send" />
      </form>
    </div>
  );
}
