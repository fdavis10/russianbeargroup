import { motion } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { TelegramIcon, WhatsAppIcon } from "./icons/BrandIcons";
import { useLanguage } from "../i18n/LanguageContext";

export function Header() {
  const { t } = useLanguage();

  const links = [
    { href: "#conditions", label: t.nav.conditions },
    { href: "#advantages", label: t.nav.advantages },
    // { href: "#reviews", label: t.nav.reviews },
    { href: "#services", label: t.nav.services },
    { href: "#faq", label: t.nav.faq },
    { href: "#contacts", label: t.nav.contact },
    { href: "#media", label: t.nav.media },
  ];

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-bg/90 backdrop-blur-xl"
    >
      <div className="relative mx-auto flex w-full max-w-6xl items-center gap-2 px-4 py-3 sm:px-6">
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

        <div className="relative z-10 ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={t.site.telegram_admin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.contactsSection.links.telegramAdmin}
            title={t.contactsSection.links.telegramAdmin}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#2AABEE]/30 bg-[#2AABEE]/10 px-2.5 text-[#2AABEE] transition hover:border-[#2AABEE]/55 hover:bg-[#2AABEE]/20 sm:px-3"
          >
            <TelegramIcon size={16} />
            <span className="hidden text-xs font-semibold sm:inline">TG</span>
          </a>

          <a
            href={t.site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.contactsSection.links.whatsappAdmin}
            title={t.contactsSection.links.whatsappAdmin}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 px-2.5 text-[#25D366] transition hover:border-[#25D366]/55 hover:bg-[#25D366]/20 sm:px-3"
          >
            <WhatsAppIcon size={16} />
            <span className="hidden text-xs font-semibold sm:inline">WA</span>
          </a>

          <LanguageSwitcher />
        </div>
      </div>
    </motion.header>
  );
}
