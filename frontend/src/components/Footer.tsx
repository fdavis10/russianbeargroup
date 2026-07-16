import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-carbon px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-lg font-bold text-sand">{t.site.title}</p>
            <p className="mt-2 text-sm text-muted">{t.site.tagline}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm sm:items-end">
            <Link to="/about" className="text-cream transition hover:text-sand">
              {t.nav.about}
            </Link>
            <Link to="/contacts" className="text-cream transition hover:text-sand">
              {t.nav.contact}
            </Link>
            <Link to="/#consultation" className="text-muted transition hover:text-sand">
              {t.hero.consultation}
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted/70">
          © 2024–2026 {t.site.title}. {t.site.rights}
        </p>
      </div>
    </footer>
  );
}
