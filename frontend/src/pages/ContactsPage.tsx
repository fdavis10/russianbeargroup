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

      <section className="border-b border-white/10 px-4 py-14 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.18em] text-sand">
            {p.representativesTitle}
          </h2>

          <div className="flex flex-col">
            {p.representatives.map((rep, index) => (
              <div key={rep.region}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 + index * 0.08 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                    <img
                      src={rep.photo}
                      alt={rep.name}
                      className="h-auto w-full max-w-xs object-cover sm:max-w-sm"
                    />
                  </div>
                  <h3 className="mt-5 text-2xl font-black tracking-[0.08em] text-sand sm:text-3xl">
                    {rep.name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm font-medium leading-snug text-cream/80 sm:text-base">
                    {rep.role}
                  </p>

                  <div className="mt-5 flex w-full max-w-sm flex-col gap-2.5">
                    <p className="text-sm leading-relaxed text-cream/75">
                      {p.representativesEmailHint}
                    </p>
                    <a
                      href={`mailto:${rep.email}`}
                      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-bg-card/80 px-3.5 py-3 text-start transition hover:border-sand/40"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sand/15 text-sand transition group-hover:bg-sand/25">
                        <Mail size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                          {p.emailLabel}
                        </span>
                        <span className="mt-0.5 block truncate text-sm font-semibold text-cream">
                          {rep.email}
                        </span>
                      </span>
                    </a>
                  </div>
                </motion.article>

                {index < p.representatives.length - 1 && (
                  <div
                    className="mx-auto my-10 flex w-full max-w-xs items-center gap-3"
                    aria-hidden
                  >
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-sand/50 to-sand/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-sand/70" />
                    <span className="h-px flex-1 bg-gradient-to-l from-transparent via-sand/50 to-sand/20" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
            transition={{ delay: 0.26 }}
            className="text-center lg:text-start"
          >
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sand">
              {p.channelsTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">{p.channelsHint}</p>
            <div className="mt-6 flex flex-col items-center gap-3">
              <ContactLinks />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
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
