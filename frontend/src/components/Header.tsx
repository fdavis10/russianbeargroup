import { motion } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "../i18n/LanguageContext";

export function Header() {
  const { t } = useLanguage();

  const links = [
    { href: "#conditions", label: t.nav.conditions },
    { href: "#advantages", label: t.nav.advantages },
    { href: "#contact", label: t.nav.contact },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#services", label: t.nav.services },
    { href: "#media", label: t.nav.media },
  ];

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-bg/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#" className="shrink-0 font-black tracking-tight text-sand">
          {t.site.title}
        </a>

        <nav className="hidden gap-5 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted hover:text-sand">
              {l.label}
            </a>
          ))}
        </nav>

        <LanguageSwitcher />
      </div>
    </motion.header>
  );
}
