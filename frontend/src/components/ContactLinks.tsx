import { Megaphone } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { FacebookIcon, TelegramIcon, WhatsAppIcon } from "./icons/BrandIcons";

export const contactLinkClass =
  "group inline-flex w-full max-w-full items-center justify-center gap-3 rounded-xl border bg-bg-card/90 px-4 py-3.5 text-sm font-semibold text-cream transition sm:max-w-sm";

export function ContactLinks() {
  const { t } = useLanguage();

  return (
    <>
      <a
        href={t.site.telegram_admin}
        target="_blank"
        rel="noopener noreferrer"
        className={`${contactLinkClass} border-[#2AABEE]/25 hover:border-[#2AABEE]/50 hover:shadow-[0_4px_24px_rgba(42,171,238,0.15)]`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2AABEE]/15 text-[#2AABEE] transition group-hover:bg-[#2AABEE]/25">
          <TelegramIcon size={18} />
        </span>
        {t.contactsSection.links.telegramAdmin}
      </a>

      <a
        href={t.site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={`${contactLinkClass} border-[#25D366]/25 hover:border-[#25D366]/50 hover:shadow-[0_4px_24px_rgba(37,211,102,0.15)]`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/15 text-[#25D366] transition group-hover:bg-[#25D366]/25">
          <WhatsAppIcon size={18} />
        </span>
        {t.contactsSection.links.whatsappAdmin}
      </a>

      <a
        href={t.site.telegram_channel}
        target="_blank"
        rel="noopener noreferrer"
        className={`${contactLinkClass} border-sand/25 hover:border-sand/50 hover:shadow-[0_4px_24px_rgba(196,163,90,0.15)]`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sand/15 text-sand transition group-hover:bg-sand/25">
          <Megaphone size={18} strokeWidth={2.25} />
        </span>
        {t.contactsSection.links.telegramChannel}
      </a>

      <a
        href={t.site.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={`${contactLinkClass} border-[#1877F2]/25 hover:border-[#1877F2]/50 hover:shadow-[0_4px_24px_rgba(24,119,242,0.15)]`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1877F2]/15 text-[#1877F2] transition group-hover:bg-[#1877F2]/25">
          <FacebookIcon size={18} />
        </span>
        {t.contactsSection.links.facebook}
      </a>
    </>
  );
}
