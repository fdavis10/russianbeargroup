import { FlagIcon } from "./icons/FlagIcon";
import { useLanguage } from "../i18n/LanguageContext";
import type { Language } from "../i18n/translations";

const options: { lang: Language; code: string; label: string }[] = [
  { lang: "ru", code: "RU", label: "Русский" },
  { lang: "en", code: "GB", label: "ENGLISH" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-white/10 p-1">
      {options.map((opt) => {
        const active = language === opt.lang;
        return (
          <button
            key={opt.lang}
            type="button"
            onClick={() => setLanguage(opt.lang)}
            className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold transition ${
              active
                ? "bg-sand/20 text-sand"
                : "text-muted hover:bg-white/5 hover:text-cream"
            }`}
            aria-pressed={active}
          >
            <FlagIcon code={opt.code} size={16} />
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
