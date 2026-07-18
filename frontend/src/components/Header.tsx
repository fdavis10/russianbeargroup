import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LANGUAGE_OPTIONS, LanguageSwitcher } from "./LanguageSwitcher";
import { FlagIcon } from "./icons/FlagIcon";
import { FacebookIcon, TelegramIcon, WhatsAppIcon } from "./icons/BrandIcons";
import { useLanguage } from "../i18n/LanguageContext";

type NavItem =
  | { type: "hash"; hash: string; label: string }
  | { type: "route"; to: string; label: string };

function SectionLink({
  hash,
  label,
  className,
  onNavigate,
}: {
  hash: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
}) {
  const location = useLocation();
  const href = location.pathname === "/" ? `#${hash}` : `/#${hash}`;

  return (
    <a href={href} className={className} onClick={onNavigate}>
      {label}
    </a>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  const line = "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out";
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <span
        className={`${line} ${open ? "top-[7px] rotate-45" : "top-0 rotate-0"}`}
      />
      <span
        className={`${line} top-[7px] ${open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`}
      />
      <span
        className={`${line} ${open ? "top-[7px] -rotate-45" : "top-[14px] rotate-0"}`}
      />
    </span>
  );
}

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const sectionLinks: NavItem[] = [
    { type: "hash", hash: "conditions", label: t.nav.conditions },
    { type: "hash", hash: "advantages", label: t.nav.advantages },
    { type: "hash", hash: "services", label: t.nav.services },
  ];

  const pageLinks: NavItem[] = [
    { type: "route", to: "/about", label: t.nav.about },
    { type: "route", to: "/contacts", label: t.nav.contact },
  ];

  const mobileLinks: NavItem[] = [...pageLinks];

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const linkClass = "text-sm text-muted transition hover:text-sand";
  const socialBtn =
    "inline-flex h-9 items-center gap-1.5 rounded-lg border px-2.5 transition sm:px-3";

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-bg/90 backdrop-blur-xl"
    >
      <div className="relative mx-auto flex w-full max-w-6xl items-center gap-2 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="relative z-10 min-w-0 truncate pe-2 font-black tracking-tight text-sand"
        >
          {t.site.title}
        </Link>

        <nav className="absolute inset-x-0 hidden items-center justify-center gap-5 px-4 sm:px-6 lg:flex">
          {sectionLinks.map((item) =>
            item.type === "hash" ? (
              <SectionLink key={item.hash} hash={item.hash} label={item.label} className={linkClass} />
            ) : null,
          )}
          {pageLinks.map((item) =>
            item.type === "route" ? (
              <Link key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </Link>
            ) : null,
          )}
        </nav>

        <div className="relative z-10 ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={t.site.telegram_admin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.contactsSection.links.telegramAdmin}
            title={t.contactsSection.links.telegramAdmin}
            className={`${socialBtn} border-[#2AABEE]/30 bg-[#2AABEE]/10 text-[#2AABEE] hover:border-[#2AABEE]/55 hover:bg-[#2AABEE]/20`}
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
            className={`${socialBtn} border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] hover:border-[#25D366]/55 hover:bg-[#25D366]/20`}
          >
            <WhatsAppIcon size={16} />
            <span className="hidden text-xs font-semibold sm:inline">WA</span>
          </a>

          <a
            href={t.site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.contactsSection.links.facebook}
            title={t.contactsSection.links.facebook}
            className={`${socialBtn} border-[#1877F2]/30 bg-[#1877F2]/10 text-[#1877F2] hover:border-[#1877F2]/55 hover:bg-[#1877F2]/20`}
          >
            <FacebookIcon size={16} />
            <span className="hidden text-xs font-semibold sm:inline">FB</span>
          </a>

          <LanguageSwitcher className="hidden lg:block" />

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-cream transition hover:border-sand/40 hover:text-sand lg:hidden"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-gradient-to-b from-sand/[0.07] to-transparent lg:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-2.5 px-4 py-4 sm:px-6">
              {mobileLinks.map((item, index) => {
                if (item.type !== "route") return null;

                return (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.06, duration: 0.3, ease: "easeOut" }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-white/10 bg-bg-card/90 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-sand/50 hover:bg-bg-elevated"
                    >
                      <span className="pointer-events-none absolute inset-y-3 start-0 w-0.5 rounded-full bg-sand transition group-hover:inset-y-2 group-hover:w-1" />
                      <span className="ps-3 text-lg font-black uppercase tracking-[0.16em] text-cream transition group-hover:text-sand">
                        {item.label}
                      </span>
                      <span
                        aria-hidden
                        className="text-base text-sand/45 transition duration-300 group-hover:translate-x-1 group-hover:text-sand rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
                className="mt-2"
              >
                <div className="flex w-full items-center gap-3" aria-hidden>
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-sand/50 to-sand/20" />
                  <span className="shrink-0 text-xs font-black uppercase tracking-[0.22em] text-sand">
                    {t.nav.language}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent via-sand/50 to-sand/20" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {LANGUAGE_OPTIONS.map((opt) => {
                    const active = language === opt.lang;
                    return (
                      <button
                        key={opt.lang}
                        type="button"
                        onClick={() => {
                          setLanguage(opt.lang);
                          setMenuOpen(false);
                        }}
                        className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3.5 text-start text-sm transition ${
                          active
                            ? "border-sand/45 bg-sand/15 font-semibold text-sand"
                            : "border-white/10 bg-bg-card/90 text-cream/85 hover:border-sand/40 hover:bg-bg-elevated hover:text-cream"
                        }`}
                      >
                        <FlagIcon code={opt.code} size={22} />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
