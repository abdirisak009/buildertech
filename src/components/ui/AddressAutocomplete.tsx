"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Loader2, MapPin, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { API_URL } from "@/lib/api/client";

export type AddressSuggestion = {
  label: string;
  line1: string;
  city: string;
  county: string;
  state: string;
  postalCode: string;
};

export type AddressAutocompleteStrings = {
  searching: string;
  noResults: string;
  error: string;
};

/**
 * Type-ahead over United States addresses. Suggestions come from the API's
 * `/geo/address` endpoint, and picking one hands the caller the split-out
 * city / county / state / ZIP so the rest of the form can fill itself in.
 */
export function AddressAutocomplete({
  id,
  name,
  value,
  onChange,
  onSelect,
  placeholder,
  className,
  invalid,
  strings,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (suggestion: AddressSuggestion) => void;
  placeholder?: string;
  className?: string;
  invalid?: boolean;
  strings: AddressAutocompleteStrings;
}) {
  const listId = useId();
  const wrapper = useRef<HTMLDivElement>(null);
  const chosen = useRef("");

  const [items, setItems] = useState<AddressSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [state, setState] = useState<"idle" | "loading" | "empty" | "error">(
    "idle",
  );

  useEffect(() => {
    const query = value.trim();
    if (query.length < 3 || query === chosen.current) {
      setItems([]);
      setState("idle");
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setState("loading");
      try {
        const response = await fetch(
          `${API_URL}/geo/address?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("lookup failed");
        const body = await response.json();
        const results = (body.data ?? []) as AddressSuggestion[];
        setItems(results);
        setActive(-1);
        setOpen(true);
        setState(results.length ? "idle" : "empty");
      } catch {
        if (controller.signal.aborted) return;
        setItems([]);
        setState("error");
        setOpen(true);
      }
    }, 350);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [value]);

  useEffect(() => {
    const closeOutside = (event: MouseEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOutside);
    return () => document.removeEventListener("mousedown", closeOutside);
  }, []);

  const choose = (suggestion: AddressSuggestion) => {
    // The field keeps the street line; city, county, state and ZIP are handed
    // to the caller so they can live in their own inputs.
    const next = suggestion.line1 || suggestion.label;
    chosen.current = next;
    onChange(next);
    onSelect(suggestion);
    setOpen(false);
    setItems([]);
    setState("idle");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open || !items.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (index + 1) % items.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index <= 0 ? items.length - 1 : index - 1));
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      choose(items[active]);
    }
  };

  const message =
    state === "loading"
      ? strings.searching
      : state === "empty"
        ? strings.noResults
        : state === "error"
          ? strings.error
          : "";

  return (
    <div ref={wrapper} className="relative">
      <MapPin
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gold-600"
      />
      <input
        id={id}
        name={name}
        type="text"
        role="combobox"
        autoComplete="off"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        onFocus={() => items.length && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(className, "pl-11 pr-10")}
        aria-invalid={invalid}
      />
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-subtle-foreground">
        {state === "loading" ? (
          <Loader2 aria-hidden className="size-4 animate-spin" />
        ) : (
          <Search aria-hidden className="size-4" />
        )}
      </span>

      {open && (message || items.length > 0) && (
        <div className="absolute inset-x-0 top-[calc(100%+0.35rem)] z-30 overflow-hidden rounded-xl border border-border-strong bg-surface shadow-xl">
          {items.length > 0 ? (
            <ul id={listId} role="listbox" className="max-h-72 overflow-y-auto">
              {items.map((item, index) => (
                <li key={`${item.label}-${index}`}>
                  <button
                    type="button"
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={index === active}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => choose(item)}
                    className={cn(
                      "flex w-full items-start gap-3 px-4 py-3 text-left text-sm transition-colors",
                      index === active ? "bg-gold-500/10" : "hover:bg-gold-500/5",
                    )}
                  >
                    <MapPin
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-gold-600"
                    />
                    <span className="min-w-0">
                      <span className="block font-medium text-foreground">
                        {item.line1 || item.city || item.label}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {[item.city, item.county && `${item.county} County`, item.state, item.postalCode]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-muted-foreground">{message}</p>
          )}
        </div>
      )}
      <p className="sr-only" role="status">
        {message}
      </p>
    </div>
  );
}
