import { FlagIcon } from "./icons/FlagIcon";
import { useLanguage } from "../i18n/LanguageContext";
import type { Language } from "../i18n/translations";

const options: { lang: Language; code: string; label: string }[] = [
  { lang: "ru", code: "RU", label: "Русский" },
  { lang: "en", code: "GB", label: "English" },
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
            aria-label={opt.label}
            className={`rounded-md p-1 transition ${
              active
                ? "bg-sand/20 ring-1 ring-sand/40"
                : "opacity-60 hover:bg-white/5 hover:opacity-100"
            }`}
            aria-pressed={active}
          >
            <FlagIcon code={opt.code} size={20} />
          </button>
        );
      })}
    </div>
  );
}
