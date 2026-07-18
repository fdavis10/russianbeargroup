import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { fetchLandingContent } from "../api";
import { translations, type Language, type TranslationContent } from "./translations";

const STORAGE_KEY = "site-language";
const SUPPORTED: Language[] = ["ru", "en", "fr", "pt", "es"];

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationContent;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED.includes(saved as Language)) return saved as Language;
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [siteOverride, setSiteOverride] = useState<Partial<TranslationContent["site"]> | null>(
    null,
  );

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const t = useMemo(() => {
    const base = translations[language];
    if (!siteOverride) return base;
    return {
      ...base,
      site: {
        ...base.site,
        ...siteOverride,
      },
    };
  }, [language, siteOverride]);

  useEffect(() => {
    let cancelled = false;
    fetchLandingContent()
      .then((content) => {
        if (cancelled) return;
        setSiteOverride({
          whatsapp: content.site.whatsapp,
          whatsapp_phone: content.site.whatsapp_phone,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setSiteOverride(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";
    document.title = t.pageTitle;
  }, [language, t.pageTitle]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
