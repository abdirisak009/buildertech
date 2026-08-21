"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Paperclip,
  Send,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  AddressAutocomplete,
  type AddressSuggestion,
} from "@/components/ui/AddressAutocomplete";
import { getUi, type UiDict } from "@/i18n/ui";
import type { Locale } from "@/i18n/config";
import { apiRequest } from "@/lib/api/client";

type FieldName =
  | "language"
  | "name"
  | "company"
  | "phone"
  | "email"
  | "referral"
  | "address"
  | "timeline"
  | "county"
  | "city"
  | "state"
  | "postalCode"
  | "projectType"
  | "services"
  | "message"
  | "upload";

type Errors = Partial<Record<FieldName, string>>;

const OTHER = "__other__";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REQUIRED: FieldName[] = [
  "name",
  "phone",
  "email",
  "referral",
  "address",
  "projectType",
  "services",
  "message",
];

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
      case "phone":
        if (!v) return t.errors.phone;
        return;
      case "email":
        if (!v) return t.errors.emailRequired;
        if (!EMAIL_RE.test(v)) return t.errors.emailInvalid;
        return;
      case "referral":
        if (!v) return t.errors.referral;
        return;
      case "address":
        if (!v) return t.errors.address;
        return;
      case "projectType":
        if (!v) return t.errors.projectType;
        return;
      case "services":
        if (!v) return t.errors.services;
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
      {hint && !error && <p className="text-xs text-subtle-foreground">{hint}</p>}
      {children}
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

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <legend className="px-1 font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.16em] text-gold-700 dark:text-gold-400">
        {title}
      </legend>
      <div className="mt-4 grid gap-5">{children}</div>
    </fieldset>
  );
}

const inputClass = (invalid?: boolean) =>
  cn(
    "min-h-12 w-full rounded-xl border bg-background px-4 py-3 text-base text-foreground",
    "transition-[border-color,box-shadow] duration-200",
    "placeholder:text-subtle-foreground",
    "focus:outline-none focus:ring-4",
    invalid
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/25"
      : "border-border-strong focus:border-gold-500 focus:ring-gold-500/30",
  );

const choiceClass = (invalid?: boolean) =>
  cn(
    "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
    "hover:border-gold-500/50 hover:bg-gold-500/5",
    "has-[:checked]:border-gold-500 has-[:checked]:bg-gold-500/10 has-[:checked]:ring-2 has-[:checked]:ring-gold-500/25",
    invalid ? "border-red-500" : "border-border",
  );

export function ContactForm({
  locale,
  compact,
  onSuccessClose,
}: {
  locale: Locale;
  compact?: boolean;
  onSuccessClose?: () => void;
}) {
  const ui = getUi(locale);
  const t = ui.form;
  const validateField = makeValidator(t);
  const formId = useId();

  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );
  const [fileName, setFileName] = useState<string | null>(null);
  // The location block is controlled so picking an address can fill it in.
  const [location, setLocation] = useState({
    address: "",
    city: "",
    county: "",
    state: "",
    postalCode: "",
  });
  const [cityOther, setCityOther] = useState(false);
  const [countyOther, setCountyOther] = useState(false);

  const cityIsOther = cityOther || (!!location.city && !t.cities.includes(location.city));
  const countyIsOther = countyOther || (!!location.county && !t.counties.includes(location.county));

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as FieldName;
    if (!name || name === "services" || name === "upload") return;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, target.value) }));
  };

  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as FieldName;
    if (!name || !errors[name] || name === "services") return;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, target.value) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const selectedServices = data.getAll("services").map(String).join(", ");

    const next: Errors = {};
    for (const name of REQUIRED) {
      const raw =
        name === "services"
          ? selectedServices
          : name === "address"
            ? location.address
            : String(data.get(name) ?? "");
      const error = validateField(name, raw);
      if (error) next[name] = error;
    }

    setErrors(next);

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      const el = form.querySelector<HTMLElement>(
        firstInvalid === "services"
          ? `[name="services"]`
          : `[name="${firstInvalid}"]`,
      );
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("sending");

    const payload: Record<string, string> = {};
    for (const [key, value] of data.entries()) {
      if (key !== "upload" && key !== "services") payload[key] = String(value);
    }
    payload.services = selectedServices;
    payload.language = payload.language || locale;

    try {
      await apiRequest("/leads", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setStatus("sent");
      form.reset();
      setFileName(null);
      setLocation({ address: "", city: "", county: "", state: "", postalCode: "" });
      setCityOther(false);
      setCountyOther(false);
    } catch {
      setStatus("failed");
    }
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
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" onClick={() => setStatus("idle")}>
            {t.sendAnother}
          </Button>
          {onSuccessClose && (
            <Button variant="navy" onClick={onSuccessClose}>
              {t.close}
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <form
      id="intake"
      ref={formRef}
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      onInput={handleInput}
      noValidate
      className="grid gap-5"
    >
      {!compact && (
        <div className="rounded-2xl border border-border bg-surface px-5 py-4 sm:px-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight sm:text-2xl">
            {t.title}
          </h3>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {t.requiredNote}
          </p>
        </div>
      )}

      {/* ---------------- Client Information ---------------- */}
      <SectionCard title={t.sections.basic}>
        <Field
          label={t.labels.language}
          name="language"
          requiredLabel={t.required}
        >
          <div className="grid gap-2 sm:grid-cols-2" role="radiogroup">
            {t.languages.map((option) => (
              <label key={option} className={choiceClass()}>
                <input
                  type="radio"
                  name="language"
                  value={option}
                  defaultChecked={option === t.languages[locale === "es" ? 1 : 0]}
                  className="mt-0.5 size-4 accent-orange-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
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
            label={t.labels.company}
            name="company"
            requiredLabel={t.required}
          >
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
            label={t.labels.phone}
            name="phone"
            error={errors.phone}
            required
            requiredLabel={t.required}
          >
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={inputClass(!!errors.phone)}
              placeholder={t.placeholders.phone}
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
        </div>

        <Field
          label={t.labels.referral}
          name="referral"
          error={errors.referral}
          required
          requiredLabel={t.required}
        >
          <select
            id="referral"
            name="referral"
            defaultValue=""
            aria-required="true"
            aria-invalid={!!errors.referral}
            aria-describedby={errors.referral ? "referral-error" : undefined}
            className={inputClass(!!errors.referral)}
            onChange={() => {
              if (errors.referral)
                setErrors((prev) => ({ ...prev, referral: undefined }));
            }}
          >
            <option value="" disabled>
              {t.placeholders.select}
            </option>
            {t.referrals.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={t.labels.address}
          name="address"
          error={errors.address}
          required
          requiredLabel={t.required}
          hint={t.hints.address}
        >
          <AddressAutocomplete
            id="address"
            name="address"
            value={location.address}
            invalid={!!errors.address}
            className={inputClass(!!errors.address)}
            placeholder={t.placeholders.address}
            strings={t.addressSearch}
            onChange={(address) => {
              setLocation((prev) => ({ ...prev, address }));
              if (errors.address)
                setErrors((prev) => ({
                  ...prev,
                  address: validateField("address", address),
                }));
            }}
            onSelect={(match: AddressSuggestion) =>
              setLocation((prev) => ({
                ...prev,
                city: match.city,
                county: match.county,
                state: match.state,
                postalCode: match.postalCode,
              }))
            }
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t.labels.city} name="city" requiredLabel={t.required}>
            <select
              id="city"
              value={cityIsOther ? OTHER : location.city}
              aria-label={t.labels.city}
              className={inputClass()}
              onChange={(e) => {
                const v = e.target.value;
                if (v === OTHER) {
                  setCityOther(true);
                  setLocation((prev) => ({ ...prev, city: "" }));
                } else {
                  setCityOther(false);
                  setLocation((prev) => ({ ...prev, city: v }));
                }
              }}
            >
              <option value="">{t.placeholders.selectCity}</option>
              {t.cities.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value={OTHER}>Other</option>
            </select>
            {cityIsOther && (
              <input
                type="text"
                aria-label={t.placeholders.otherCity}
                value={location.city}
                onChange={(e) =>
                  setLocation((prev) => ({ ...prev, city: e.target.value }))
                }
                className={cn(inputClass(), "mt-2")}
                placeholder={t.placeholders.otherCity}
              />
            )}
            <input type="hidden" name="city" value={location.city} />
          </Field>

          <Field label={t.labels.county} name="county" requiredLabel={t.required}>
            <select
              id="county"
              value={countyIsOther ? OTHER : location.county}
              aria-label={t.labels.county}
              className={inputClass()}
              onChange={(e) => {
                const v = e.target.value;
                if (v === OTHER) {
                  setCountyOther(true);
                  setLocation((prev) => ({ ...prev, county: "" }));
                } else {
                  setCountyOther(false);
                  setLocation((prev) => ({ ...prev, county: v }));
                }
              }}
            >
              <option value="">{t.placeholders.selectCounty}</option>
              {t.counties.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value={OTHER}>Other</option>
            </select>
            {countyIsOther && (
              <input
                type="text"
                aria-label={t.placeholders.otherCounty}
                value={location.county}
                onChange={(e) =>
                  setLocation((prev) => ({ ...prev, county: e.target.value }))
                }
                className={cn(inputClass(), "mt-2")}
                placeholder={t.placeholders.otherCounty}
              />
            )}
            <input type="hidden" name="county" value={location.county} />
          </Field>

          <Field label={t.labels.state} name="state" requiredLabel={t.required}>
            <input
              id="state"
              name="state"
              type="text"
              maxLength={20}
              autoComplete="address-level1"
              value={location.state}
              onChange={(e) =>
                setLocation((prev) => ({ ...prev, state: e.target.value }))
              }
              className={inputClass()}
              placeholder={t.placeholders.state}
            />
          </Field>

          <Field
            label={t.labels.postalCode}
            name="postalCode"
            requiredLabel={t.required}
          >
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              inputMode="numeric"
              maxLength={10}
              autoComplete="postal-code"
              value={location.postalCode}
              onChange={(e) =>
                setLocation((prev) => ({ ...prev, postalCode: e.target.value }))
              }
              className={inputClass()}
              placeholder={t.placeholders.postalCode}
            />
          </Field>
        </div>
      </SectionCard>

      {/* ---------------- Project Specific Information ---------------- */}
      <SectionCard title={t.sections.project}>
        <Field
          label={t.labels.timeline}
          name="timeline"
          requiredLabel={t.required}
        >
          <select
            id="timeline"
            name="timeline"
            defaultValue=""
            className={inputClass()}
          >
            <option value="">{t.placeholders.select}</option>
            {t.timelines.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={t.labels.projectType}
          name="projectType"
          error={errors.projectType}
          required
          requiredLabel={t.required}
        >
          <div
            className="grid gap-2 sm:grid-cols-2"
            role="radiogroup"
            aria-required="true"
            aria-invalid={!!errors.projectType}
            aria-describedby={
              errors.projectType ? "projectType-error" : undefined
            }
          >
            {t.projectTypes.map((option) => (
              <label key={option} className={choiceClass(!!errors.projectType)}>
                <input
                  type="radio"
                  name="projectType"
                  value={option}
                  className="mt-0.5 size-4 accent-orange-500"
                  onChange={() => {
                    if (errors.projectType)
                      setErrors((prev) => ({ ...prev, projectType: undefined }));
                  }}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </Field>

        <Field
          label={t.labels.services}
          name="services"
          error={errors.services}
          required
          requiredLabel={t.required}
        >
          <select
            id="services"
            name="services"
            defaultValue=""
            aria-required="true"
            aria-invalid={!!errors.services}
            aria-describedby={errors.services ? "services-error" : undefined}
            className={inputClass(!!errors.services)}
            onChange={() => {
              if (errors.services)
                setErrors((prev) => ({ ...prev, services: undefined }));
            }}
          >
            <option value="" disabled>
              {t.placeholders.select}
            </option>
            {t.services.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

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

        <Field
          label={t.labels.upload}
          name="upload"
          hint={t.hints.upload}
          requiredLabel={t.required}
        >
          <label
            htmlFor={`${formId}-upload`}
            className={cn(
              choiceClass(),
              "min-h-12 cursor-pointer items-center justify-center border-dashed",
            )}
          >
            <Paperclip aria-hidden className="size-4 shrink-0 text-gold-600" />
            <span className="text-sm font-medium">{fileName ?? t.addFile}</span>
            <input
              id={`${formId}-upload`}
              name="upload"
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              multiple
              className="sr-only"
              onChange={(e) => {
                const files = e.target.files;
                if (!files?.length) {
                  setFileName(null);
                  return;
                }
                setFileName(
                  files.length === 1
                    ? files[0].name
                    : t.filesSelected(files.length),
                );
              }}
            />
          </label>
          {fileName && (
            <button
              type="button"
              className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-2 hover:underline"
              onClick={() => {
                setFileName(null);
                const input = document.getElementById(
                  `${formId}-upload`,
                ) as HTMLInputElement | null;
                if (input) input.value = "";
              }}
            >
              <X aria-hidden className="size-3.5" />
              {t.clearFiles}
            </button>
          )}
        </Field>
      </SectionCard>

      <AnimatePresence>
        {status === "failed" && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/8 px-4 py-3 text-sm text-red-700 dark:text-red-400"
          >
            <AlertCircle aria-hidden className="size-4 shrink-0" />
            We couldn&apos;t send your request. Please try again in a moment.
          </motion.p>
        )}
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

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
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
        <p className="max-w-xl text-xs leading-relaxed text-subtle-foreground">
          {t.privacy}
        </p>
      </div>
    </form>
  );
}
