import { Megaphone } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { FacebookIcon, TelegramIcon, WhatsAppIcon } from "./icons/BrandIcons";

export function ContactsSection() {
  const { t } = useLanguage();

  return (
    <section id="contacts" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-wide text-cream sm:text-3xl">
          <span className="relative inline-block">
            {t.contactsSection.title}
            <span className="absolute -bottom-2 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-sand" />
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
        >
          <a
            href={t.site.telegram_admin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-[#2AABEE]/25 bg-bg-card/90 px-4 py-3.5 text-sm font-semibold text-cream transition hover:border-[#2AABEE]/50 hover:shadow-[0_4px_24px_rgba(42,171,238,0.15)] sm:w-auto sm:min-w-[14rem]"
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
            className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-[#25D366]/25 bg-bg-card/90 px-4 py-3.5 text-sm font-semibold text-cream transition hover:border-[#25D366]/50 hover:shadow-[0_4px_24px_rgba(37,211,102,0.15)] sm:w-auto sm:min-w-[14rem]"
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
            className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-sand/25 bg-bg-card/90 px-4 py-3.5 text-sm font-semibold text-cream transition hover:border-sand/50 hover:shadow-[0_4px_24px_rgba(196,163,90,0.15)] sm:w-auto sm:min-w-[14rem]"
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
            className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-[#1877F2]/25 bg-bg-card/90 px-4 py-3.5 text-sm font-semibold text-cream transition hover:border-[#1877F2]/50 hover:shadow-[0_4px_24px_rgba(24,119,242,0.15)] sm:w-auto sm:min-w-[14rem]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1877F2]/15 text-[#1877F2] transition group-hover:bg-[#1877F2]/25">
              <FacebookIcon size={18} />
            </span>
            {t.contactsSection.links.facebook}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
