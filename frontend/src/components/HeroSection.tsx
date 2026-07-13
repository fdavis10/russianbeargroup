import { Megaphone } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { TelegramIcon, WhatsAppIcon } from "./icons/BrandIcons";

function PulsingExclamations() {
  return (
    <span className="inline-flex shrink-0 select-none" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.span
          key={i}
          className="inline-block px-px text-xl font-black leading-none text-amber-400 sm:text-2xl"
          animate={{
            opacity: [0.35, 1, 0.35],
            scale: [0.8, 1.25, 0.8],
            textShadow: [
              "0 0 0px rgba(251,191,36,0)",
              "0 0 12px rgba(251,191,36,0.85)",
              "0 0 0px rgba(251,191,36,0)",
            ],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.22,
            ease: "easeInOut",
          }}
        >
          !
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-carbon px-4 pt-1 pb-14 sm:px-6 sm:pt-2 lg:pt-3 lg:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/40" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.img
          src="/logo.png"
          alt={t.site.title}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-0 h-auto w-full max-w-xs object-contain drop-shadow-[0_0_36px_rgba(196,163,90,0.32)] sm:max-w-sm lg:max-w-md"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="-mt-1 mx-auto mb-4 max-w-3xl text-xs font-semibold uppercase leading-relaxed tracking-[0.12em] text-sand sm:-mt-2 sm:text-sm sm:tracking-[0.18em]"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
        >
          <span className="text-gradient-sand">{t.hero.headline}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-3xl text-base text-cream/85 sm:text-lg"
        >
          {t.hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a href="#contact" className="btn-primary">
            {t.hero.cta}
          </a>
          <a
            href="#consultation"
            className="inline-flex items-center rounded-xl border border-white/15 px-8 py-4 font-semibold text-cream hover:border-sand/40"
          >
            {t.hero.consultation}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mx-auto mt-8 max-w-3xl"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 1px rgba(251,191,36,0.25), 0 4px 24px rgba(251,191,36,0.08)",
                "0 0 0 1px rgba(251,191,36,0.5), 0 4px 32px rgba(251,191,36,0.18)",
                "0 0 0 1px rgba(251,191,36,0.25), 0 4px 24px rgba(251,191,36,0.08)",
              ],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl border border-amber-500/35 bg-gradient-to-br from-amber-950/50 via-red-950/25 to-amber-950/50 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-5"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <PulsingExclamations />

              <div className="min-w-0 flex-1 text-center">
                <p className="text-sm font-bold leading-snug text-amber-100 sm:text-base">
                  {t.hero.warning.headline}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-cream/75 sm:text-sm">
                  {t.hero.warning.details}
                </p>
              </div>

              <PulsingExclamations />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.45 }}
            className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
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
              {t.hero.contactLinks.telegramAdmin}
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
              {t.hero.contactLinks.whatsappAdmin}
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
              {t.hero.contactLinks.telegramChannel}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
