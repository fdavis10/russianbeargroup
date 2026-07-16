import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FlagIcon } from "./icons/FlagIcon";
import {
  DIAL_CODES,
  dialOptionKey,
  findDialEntry,
  type DialCodeEntry,
} from "../data/dialCodes";

interface PhoneInputProps {
  /** Selected country ISO (e.g. IN). */
  countryIso: string;
  dialCode: string;
  nationalNumber: string;
  onCountryChange: (iso: string, dial: string) => void;
  onNationalChange: (value: string) => void;
  locale: string;
  dialPlaceholder: string;
  nationalPlaceholder: string;
  searchPlaceholder: string;
  error?: string;
}

function localizedName(entry: DialCodeEntry, locale: string): string {
  try {
    const name = new Intl.DisplayNames([locale], { type: "region" }).of(entry.iso);
    if (name) return name;
  } catch {
    /* fall through */
  }
  return entry.name;
}

export function PhoneInput({
  countryIso,
  dialCode,
  nationalNumber,
  onCountryChange,
  onNationalChange,
  locale,
  dialPlaceholder,
  nationalPlaceholder,
  searchPlaceholder,
  error,
}: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = findDialEntry(countryIso, dialCode);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DIAL_CODES;
    return DIAL_CODES.filter((entry) => {
      const label = localizedName(entry, locale).toLowerCase();
      return (
        label.includes(q) ||
        entry.name.toLowerCase().includes(q) ||
        entry.dial.includes(q.replace(/^\+/, "")) ||
        entry.iso.toLowerCase().includes(q)
      );
    });
  }, [query, locale]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open]);

  return (
    <div ref={rootRef} className="space-y-1">
      <div className="flex gap-2">
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={dialPlaceholder}
            aria-expanded={open}
            className="flex h-[50px] min-w-[7.5rem] items-center justify-between gap-2 rounded-xl border border-white/10 bg-bg px-3 text-cream outline-none transition focus:border-sand/50 focus:ring-1 focus:ring-sand/30"
          >
            {selected ? (
              <span className="flex items-center gap-2">
                <FlagIcon code={selected.iso} size={18} />
                <span className="text-sm font-medium">+{selected.dial}</span>
              </span>
            ) : (
              <span className="text-sm text-muted">{dialPlaceholder}</span>
            )}
            <ChevronDown
              size={16}
              className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute start-0 z-30 mt-1 w-[min(100vw-2rem,20rem)] overflow-hidden rounded-xl border border-white/10 bg-bg-elevated shadow-xl">
              <div className="border-b border-white/10 p-2">
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-lg border border-white/10 bg-bg px-3 py-2 text-sm text-cream outline-none placeholder:text-muted focus:border-sand/40"
                />
              </div>
              <ul className="max-h-56 overflow-auto py-1">
                {filtered.length === 0 ? (
                  <li className="px-4 py-3 text-sm text-muted">—</li>
                ) : (
                  filtered.map((entry) => {
                    const active = entry.iso === countryIso && entry.dial === dialCode;
                    return (
                      <li key={dialOptionKey(entry)}>
                        <button
                          type="button"
                          onClick={() => {
                            onCountryChange(entry.iso, entry.dial);
                            setOpen(false);
                            setQuery("");
                          }}
                          className={`flex w-full items-center gap-3 px-3 py-2.5 text-start text-sm transition hover:bg-white/5 ${
                            active ? "text-sand" : "text-cream"
                          }`}
                        >
                          <FlagIcon code={entry.iso} size={18} />
                          <span className="min-w-0 flex-1 truncate">
                            {localizedName(entry, locale)}
                          </span>
                          <span className="shrink-0 text-muted">+{entry.dial}</span>
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>

        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={nationalNumber}
          onChange={(e) => onNationalChange(e.target.value)}
          placeholder={nationalPlaceholder}
          className="h-[50px] min-w-0 flex-1 rounded-xl border border-white/10 bg-bg px-4 text-cream outline-none transition focus:border-sand/50 focus:ring-1 focus:ring-sand/30"
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
