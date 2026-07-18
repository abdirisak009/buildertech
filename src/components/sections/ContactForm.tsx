"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type FieldName =
  | "name"
  | "email"
  | "phone"
  | "company"
  | "projectType"
  | "service"
  | "budget"
  | "location"
  | "message";

type Errors = Partial<Record<FieldName, string>>;

const PROJECT_TYPES = [
  "Residential",
  "Commercial",
  "Healthcare",
  "Public",
  "Industrial",
  "Other",
];

const SERVICES = [
  "Full lifecycle",
  "Design only",
  "Supervision only",
  "Advisory / audit",
];

const BUDGETS = [
  "Under $100k",
  "$100k – $500k",
  "$500k – $2M",
  "$2M – $10M",
  "Over $10M",
  "Not yet defined",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(name: FieldName, value: string): string | undefined {
  const v = value.trim();
  switch (name) {
    case "name":
      if (!v) return "Please tell us your name.";
      return;
    case "email":
      if (!v) return "We need an email address to reply to.";
      if (!EMAIL_RE.test(v)) return "Enter a valid email, e.g. name@company.com.";
      return;
    case "projectType":
      if (!v) return "Select the type of project.";
      return;
    case "service":
      if (!v) return "Select the scope you are looking for.";
      return;
    case "message":
      if (!v) return "Tell us a little about the project.";
      if (v.length < 20)
        return "Please give us a bit more detail (at least 20 characters).";
      return;
    default:
      return;
  }
}

function Field({
  label,
  name,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  name: FieldName;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-semibold text-foreground"
      >
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-red-600 dark:text-red-400">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-subtle-foreground">{hint}</p>
      )}
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-sm font-medium text-red-700 dark:text-red-400"
        >
          <AlertCircle aria-hidden className="size-4 shrink-0" strokeWidth={2} />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (invalid?: boolean) =>
  cn(
    "min-h-12 w-full rounded-xl border bg-surface px-4 py-3 text-base text-foreground",
    "transition-[border-color,box-shadow] duration-200",
    "placeholder:text-subtle-foreground",
    "focus:outline-none focus:ring-4",
    invalid
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/25"
      : "border-border-strong focus:border-gold-500 focus:ring-gold-500/30",
  );

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as FieldName;
    if (!name) return;
    const error = validateField(name, target.value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as FieldName;
    // Only re-validate a field that is already showing an error
    if (!name || !errors[name]) return;
    const error = validateField(name, target.value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    (
      ["name", "email", "projectType", "service", "message"] as FieldName[]
    ).forEach((name) => {
      const error = validateField(name, String(data.get(name) ?? ""));
      if (error) next[name] = error;
    });

    setErrors(next);

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      const el = form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("sending");

    // TODO: point this at your backend route or form service (Resend, Formspree…).
    // The UI flow below is complete and ready to swap the fetch call in.
    await new Promise((r) => setTimeout(r, 1100));

    setStatus("sent");
    form.reset();
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
        role="status"
        className="rounded-2xl border border-green-600/40 bg-green-500/8 p-10 text-center"
      >
        <CheckCircle2
          aria-hidden
          className="mx-auto size-10 text-green-700 dark:text-green-400"
          strokeWidth={1.75}
        />
        <h3 className="mt-5 text-2xl">Brief received.</h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
          Thank you — your brief has been received. A Builders Tech lead will
          reply within one business day.
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => setStatus("idle")}
        >
          Send another brief
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      onInput={handleInput}
      noValidate
      className="grid gap-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(!!errors.name)}
            placeholder="Amina Yusuf"
          />
        </Field>

        <Field label="Email" name="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(!!errors.email)}
            placeholder="you@company.com"
          />
        </Field>

        <Field label="Phone" name="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={inputClass()}
            placeholder="+252 61 000 0000"
          />
        </Field>

        <Field label="Company / organisation" name="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass()}
            placeholder="Optional"
          />
        </Field>

        <Field
          label="Project type"
          name="projectType"
          error={errors.projectType}
          required
        >
          <select
            id="projectType"
            name="projectType"
            defaultValue=""
            aria-required="true"
            aria-invalid={!!errors.projectType}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
            className={inputClass(!!errors.projectType)}
          >
            <option value="" disabled>
              Select a type
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Service needed"
          name="service"
          error={errors.service}
          required
        >
          <select
            id="service"
            name="service"
            defaultValue=""
            aria-required="true"
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={inputClass(!!errors.service)}
          >
            <option value="" disabled>
              Select a scope
            </option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Estimated budget"
          name="budget"
          hint="A range is fine — it helps us answer usefully."
        >
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className={inputClass()}
          >
            <option value="">Prefer not to say</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Project location" name="location">
          <input
            id="location"
            name="location"
            type="text"
            className={inputClass()}
            placeholder="City or district"
          />
        </Field>
      </div>

      <Field
        label="Tell us about the project"
        name="message"
        error={errors.message}
        required
        hint="Plot dimensions, intended use, and anything you already know about the budget or programme."
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClass(!!errors.message), "min-h-40 resize-y")}
          placeholder="We own a 900 m² corner plot and want a four-storey mixed-use building — retail at ground level, apartments above…"
        />
      </Field>

      <AnimatePresence>
        {Object.keys(errors).some((k) => errors[k as FieldName]) && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/8 px-4 py-3 text-sm text-red-700 dark:text-red-400"
          >
            <AlertCircle aria-hidden className="size-4 shrink-0" />
            Please fix the highlighted fields and submit again.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send project brief
              <Send aria-hidden className="size-4" />
            </>
          )}
        </Button>
        <p className="max-w-xs text-xs leading-relaxed text-subtle-foreground">
          We use your details only to respond to this enquiry. We do not share
          them with contractors or third parties.
        </p>
      </div>
    </form>
  );
}
