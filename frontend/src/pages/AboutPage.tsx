import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export function AboutPage() {
  const { t } = useLanguage();
  const p = t.pages.about;
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10 px-4 py-16 sm:px-6 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sand/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-sand"
          >
            {t.site.title}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-3 text-3xl font-black uppercase tracking-wide text-cream sm:text-4xl"
          >
            {p.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {p.intro}
          </motion.p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-10">
          {p.sections.map((section, index) => (
            <motion.article
              key={section.heading}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + index * 0.06 }}
              className="border-b border-white/10 pb-10 last:border-b-0 last:pb-0"
            >
              <h2 className="text-xl font-bold text-sand sm:text-2xl">{section.heading}</h2>
              <p className="mt-3 text-base leading-relaxed text-cream/85 whitespace-pre-line">
                {section.body}
              </p>
            </motion.article>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-2 text-center"
          >
            <p className="text-base font-semibold text-sand sm:text-lg">{p.placeholderNote}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contacts" className="btn-primary inline-flex">
                {t.nav.contact}
              </Link>
              <Link
                to="/#consultation"
                className="inline-flex rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-muted transition hover:border-sand/40 hover:text-cream"
              >
                {t.hero.consultation}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
