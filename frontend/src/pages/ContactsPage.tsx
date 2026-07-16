import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { ContactLinks } from "../components/ContactLinks";

export function ContactsPage() {
  const { t } = useLanguage();
  const p = t.pages.contacts;
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
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sand">
              {p.directTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">{p.directHint}</p>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`mailto:${t.site.email}`}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-bg-card/80 px-4 py-4 transition hover:border-sand/40"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sand/15 text-sand">
                    <Mail size={20} />
                  </span>
                  <span className="min-w-0 text-start">
                    <span className="block text-xs uppercase tracking-wide text-muted">{p.emailLabel}</span>
                    <span className="mt-0.5 block truncate font-semibold text-cream">{t.site.email}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={t.site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-bg-card/80 px-4 py-4 transition hover:border-[#25D366]/50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/15 text-[#25D366]">
                    <Phone size={20} />
                  </span>
                  <span className="min-w-0 text-start">
                    <span className="block text-xs uppercase tracking-wide text-muted">{p.phoneLabel}</span>
                    <span className="mt-0.5 block font-semibold text-cream">{t.site.whatsapp_phone}</span>
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sand">
              {p.channelsTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">{p.channelsHint}</p>
            <div className="mt-6 flex flex-col gap-3">
              <ContactLinks />
              <a
                href={t.site.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-bg-card/90 px-4 py-3.5 text-sm font-semibold text-cream transition hover:border-sand/40 sm:w-auto sm:min-w-[14rem]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-cream transition group-hover:bg-sand/20 group-hover:text-sand">
                  VK
                </span>
                {p.vkLabel}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="mx-auto mt-14 max-w-4xl border-t border-white/10 pt-10 text-center"
        >
          <p className="text-base text-cream/85">{p.ctaText}</p>
          <Link to="/#consultation" className="btn-primary mt-5 inline-flex">
            {p.ctaButton}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
