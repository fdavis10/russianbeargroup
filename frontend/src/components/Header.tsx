import { motion } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "../i18n/LanguageContext";

export function Header() {
  const { t } = useLanguage();

  const links = [
    { href: "#conditions", label: t.nav.conditions },
    { href: "#advantages", label: t.nav.advantages },
    { href: "#contact", label: t.nav.contact },
    // { href: "#reviews", label: t.nav.reviews },
    { href: "#services", label: t.nav.services },
    { href: "#media", label: t.nav.media },
  ];

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-bg/90 backdrop-blur-xl"
    >
      <div className="relative mx-auto flex w-full max-w-6xl items-center px-4 py-3 sm:px-6">
        <a href="#" className="relative z-10 shrink-0 font-black tracking-tight text-sand">
          {t.site.title}
        </a>

        <nav className="absolute inset-x-0 hidden items-center justify-center gap-5 px-4 sm:px-6 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted hover:text-sand">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="relative z-10 ml-auto shrink-0">
          <LanguageSwitcher />
        </div>
      </div>
    </motion.header>
  );
}
