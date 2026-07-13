import { Mail, Megaphone } from "lucide-react";
import { TelegramIcon, WhatsAppIcon } from "./icons/BrandIcons";
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
          <div className="space-y-3 text-sm">
            <a
              href={`mailto:${t.site.email}`}
              className="flex items-center gap-2 text-cream hover:text-sand"
            >
              <Mail size={16} className="text-sand" />
              {t.site.email}
            </a>
            <a
              href={t.site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-sand"
            >
              <WhatsAppIcon size={16} className="text-[#25D366]" />
              {t.site.whatsapp_phone}
            </a>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <a
            href={t.site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#25D366] hover:border-sand/40"
            aria-label={t.hero.contactLinks.whatsappAdmin}
            title={t.hero.contactLinks.whatsappAdmin}
          >
            <WhatsAppIcon size={18} />
          </a>
          <a
            href={t.site.telegram_admin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#2AABEE] hover:border-sand/40"
            aria-label={t.hero.contactLinks.telegramAdmin}
            title={t.hero.contactLinks.telegramAdmin}
          >
            <TelegramIcon size={18} />
          </a>
          <a
            href={t.site.telegram_channel}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-sand hover:border-sand/40"
            aria-label={t.hero.contactLinks.telegramChannel}
            title={t.hero.contactLinks.telegramChannel}
          >
            <Megaphone size={18} strokeWidth={2.25} />
          </a>
        </div>

        <p className="mt-8 text-center text-xs text-muted/70">
          © 2024–2026 {t.site.title}. {t.site.rights}
        </p>
      </div>
    </footer>
  );
}
