import { motion } from "framer-motion";
import { useLiteMotion } from "../hooks/useLiteMotion";
import { useLanguage } from "../i18n/LanguageContext";
import { ContactLinks } from "./ContactLinks";

function PulsingExclamations({ lite }: { lite: boolean }) {
  if (lite) {
    return (
      <span className="inline-flex shrink-0 select-none text-xl font-black leading-none text-amber-400 sm:text-2xl" aria-hidden="true">
        !!!
      </span>
    );
  }

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
  const lite = useLiteMotion();

  return (
    <section className="relative overflow-hidden bg-carbon px-4 pt-1 pb-14 sm:px-6 sm:pt-2 lg:pt-3 lg:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/40" />

      <div className="relative mx-auto max-w-4xl text-center">
        {lite ? (
          <picture>
            <source srcSet="/new_logo.webp" type="image/webp" />
            <img
              src="/new_logo.jpg"
              alt={t.site.title}
              width={500}
              height={500}
              fetchPriority="high"
              decoding="async"
              className="mx-auto mb-0 h-auto w-full max-w-xs object-contain sm:max-w-sm lg:max-w-md"
            />
          </picture>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-0 w-full max-w-xs drop-shadow-[0_0_36px_rgba(196,163,90,0.32)] sm:max-w-sm lg:max-w-md"
          >
            <picture>
              <source srcSet="/new_logo.webp" type="image/webp" />
              <img
                src="/new_logo.jpg"
                alt={t.site.title}
                width={500}
                height={500}
                fetchPriority="high"
                decoding="async"
                className="h-auto w-full object-contain"
              />
            </picture>
          </motion.div>
        )}

        <div className="mx-auto mt-6 mb-4 max-w-3xl space-y-1.5 sm:mt-8">
          <p className="text-sm font-semibold uppercase leading-snug tracking-[0.14em] text-sand sm:text-base sm:tracking-[0.16em]">
            {t.hero.tagline}
          </p>
          <p className="text-xs font-medium uppercase leading-relaxed tracking-[0.1em] text-sand/80 sm:text-sm sm:tracking-[0.12em]">
            {t.hero.taglineSecondary}
          </p>
        </div>

        <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
          <span className="text-gradient-sand">{t.hero.headline}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base text-cream/85 sm:text-lg">
          {t.hero.subheadline}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#consultation-form" className="btn-primary">
            {t.hero.cta}
          </a>
          <a
            href="#consultation-form"
            className="inline-flex items-center rounded-xl border border-white/15 px-8 py-4 font-semibold text-cream hover:border-sand/40"
          >
            {t.hero.consultation}
          </a>
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          {lite ? (
            <div className="rounded-2xl border border-amber-500/35 bg-amber-950/40 px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <PulsingExclamations lite />
                <div className="min-w-0 flex-1 text-center">
                  <p className="text-sm font-bold leading-snug text-amber-100 sm:text-base">
                    {t.hero.warning.headline}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-cream/75 sm:text-sm">
                    {t.hero.warning.details}
                  </p>
                </div>
                <PulsingExclamations lite />
              </div>
            </div>
          ) : (
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
                <PulsingExclamations lite={false} />
                <div className="min-w-0 flex-1 text-center">
                  <p className="text-sm font-bold leading-snug text-amber-100 sm:text-base">
                    {t.hero.warning.headline}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-cream/75 sm:text-sm">
                    {t.hero.warning.details}
                  </p>
                </div>
                <PulsingExclamations lite={false} />
              </div>
            </motion.div>
          )}

          <div className="mt-4 flex w-full max-w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <ContactLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
