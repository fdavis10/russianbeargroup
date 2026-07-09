import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { FlagIcon } from "./FlagIcon";

interface CountryOption {
  value: string;
  label: string;
  code: string;
}

interface CountrySelectProps {
  options: CountryOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
}

export function CountrySelect({
  options,
  value,
  onChange,
  placeholder,
  error,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-bg px-4 py-3 text-left text-cream outline-none transition focus:border-sand/50 focus:ring-1 focus:ring-sand/30"
      >
        <span className="flex items-center gap-3">
          {selected ? (
            <>
              <FlagIcon code={selected.code} size={20} />
              {selected.label}
            </>
          ) : (
            <span className="text-muted">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          size={18}
          className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-white/10 bg-bg-elevated py-1 shadow-xl">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-white/5 ${
                  value === opt.value ? "text-sand" : "text-cream"
                }`}
              >
                <FlagIcon code={opt.code} size={20} />
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
