import { useEffect, useRef, useState } from "react";
import { Languages } from "lucide-react";
import { FlagIcon } from "./icons/FlagIcon";
import { useLanguage } from "../i18n/LanguageContext";
import type { Language } from "../i18n/translations";

const options: { lang: Language; code: string; label: string }[] = [
  { lang: "ru", code: "RU", label: "Русский" },
  { lang: "en", code: "GB", label: "English" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Language"
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-sand transition hover:border-sand/40 hover:bg-white/[0.06]"
      >
        <Languages size={18} strokeWidth={2} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.4rem)] z-50 min-w-[10.5rem] overflow-hidden rounded-xl border border-white/10 bg-bg-card/95 p-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          {options.map((opt) => {
            const active = language === opt.lang;
            return (
              <button
                key={opt.lang}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setLanguage(opt.lang);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  active
                    ? "bg-sand/15 font-semibold text-sand"
                    : "text-cream/85 hover:bg-white/[0.06] hover:text-cream"
                }`}
              >
                <FlagIcon code={opt.code} size={20} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
