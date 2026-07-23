"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { getUi, type UiDict } from "@/i18n/ui";
import type { Locale } from "@/i18n/config";

type FieldName =
  | "name"
  | "email"
  | "phone"
  | "company"
  | "projectType"
  | "service"
  | "budget"
  | "county"
  | "city"
  | "message";

type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function makeValidator(t: UiDict["form"]) {
  return function validateField(
    name: FieldName,
    value: string,
  ): string | undefined {
    const v = value.trim();
    switch (name) {
      case "name":
        if (!v) return t.errors.name;
        return;
      case "email":
        if (!v) return t.errors.emailRequired;
        if (!EMAIL_RE.test(v)) return t.errors.emailInvalid;
        return;
      case "projectType":
        if (!v) return t.errors.projectType;
        return;
      case "service":
        if (!v) return t.errors.service;
        return;
      case "message":
        if (!v) return t.errors.messageRequired;
        if (v.length < 20) return t.errors.messageShort;
        return;
      default:
        return;
    }
  };
}

function Field({
  label,
  name,
  error,
  required,
  requiredLabel,
  hint,
  children,
}: {
  label: string;
  name: FieldName;
  error?: string;
  required?: boolean;
  requiredLabel: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold text-foreground">
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-red-600 dark:text-red-400">
            *
          </span>
        )}
        {required && <span className="sr-only"> {requiredLabel}</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-subtle-foreground">{hint}</p>}
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

// The UI dictionary contains functions, which cannot be passed from a server
// component, so the form looks it up from the locale itself.
export function ContactForm({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const t = ui.form;
  const validateField = makeValidator(t);

  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as FieldName;
    if (!name) return;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, target.value) }));
  };

  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as FieldName;
    // Only re-validate a field that is already showing an error
    if (!name || !errors[name]) return;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, target.value) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    (["name", "email", "projectType", "service", "message"] as FieldName[]).forEach(
      (name) => {
        const error = validateField(name, String(data.get(name) ?? ""));
        if (error) next[name] = error;
      },
    );

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
        <h3 className="mt-5 text-2xl">{t.successTitle}</h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
          {t.successBody}
        </p>
        <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
          {t.sendAnother}
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
        <Field
          label={t.labels.name}
          name="name"
          error={errors.name}
          required
          requiredLabel={t.required}
        >
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(!!errors.name)}
            placeholder={t.placeholders.name}
          />
        </Field>

        <Field
          label={t.labels.email}
          name="email"
          error={errors.email}
          required
          requiredLabel={t.required}
        >
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
            placeholder={t.placeholders.email}
          />
        </Field>

        <Field label={t.labels.phone} name="phone" requiredLabel={t.required}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={inputClass()}
            placeholder={t.placeholders.phone}
          />
        </Field>

        <Field label={t.labels.company} name="company" requiredLabel={t.required}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass()}
            placeholder={t.placeholders.company}
          />
        </Field>

        <Field
          label={t.labels.projectType}
          name="projectType"
          error={errors.projectType}
          required
          requiredLabel={t.required}
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
              {t.placeholders.selectType}
            </option>
            {t.projectTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={t.labels.service}
          name="service"
          error={errors.service}
          required
          requiredLabel={t.required}
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
              {t.placeholders.selectScope}
            </option>
            {t.services.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={t.labels.budget}
          name="budget"
          hint={t.hints.budget}
          requiredLabel={t.required}
        >
          <select id="budget" name="budget" defaultValue="" className={inputClass()}>
            <option value="">{t.placeholders.preferNotToSay}</option>
            {t.budgets.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t.labels.county} name="county" requiredLabel={t.required}>
          <select id="county" name="county" defaultValue="" className={inputClass()}>
            <option value="">{t.placeholders.selectCounty}</option>
            {t.counties.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t.labels.city} name="city" requiredLabel={t.required}>
          <select id="city" name="city" defaultValue="" className={inputClass()}>
            <option value="">{t.placeholders.selectCity}</option>
            {t.cities.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label={t.labels.message}
        name="message"
        error={errors.message}
        required
        requiredLabel={t.required}
        hint={t.hints.message}
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClass(!!errors.message), "min-h-40 resize-y")}
          placeholder={t.placeholders.message}
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
            {t.errors.summary}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              {t.sending}
            </>
          ) : (
            <>
              {t.submit}
              <Send aria-hidden className="size-4" />
            </>
          )}
        </Button>
        <p className="max-w-xs text-xs leading-relaxed text-subtle-foreground">
          {t.privacy}
        </p>
      </div>
    </form>
  );
}
