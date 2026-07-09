import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

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
          className="mx-auto mb-0 h-72 w-72 object-contain drop-shadow-[0_0_36px_rgba(196,163,90,0.32)] sm:h-[21rem] sm:w-[21rem] lg:h-96 lg:w-96"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="-mt-1 mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-sand sm:-mt-2"
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
          className="mx-auto mt-6 max-w-2xl text-base text-cream/85 sm:text-lg"
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
            href="#about"
            className="inline-flex items-center rounded-xl border border-white/15 px-8 py-4 font-semibold text-cream hover:border-sand/40"
          >
            {t.hero.about}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
