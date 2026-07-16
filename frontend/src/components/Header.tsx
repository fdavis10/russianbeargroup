import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
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

export function Header() {
  const { t } = useLanguage();
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
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const linkClass = "text-sm text-muted transition hover:text-sand";

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 border-b border-white/10 bg-bg/90 backdrop-blur-xl"
      >
        <div className="relative mx-auto flex w-full max-w-6xl items-center gap-2 px-4 py-3 sm:px-6">
          <Link to="/" className="relative z-10 shrink-0 font-black tracking-tight text-sand">
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
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#2AABEE]/30 bg-[#2AABEE]/10 px-2.5 text-[#2AABEE] transition hover:border-[#2AABEE]/55 hover:bg-[#2AABEE]/20 sm:px-3"
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
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 px-2.5 text-[#25D366] transition hover:border-[#25D366]/55 hover:bg-[#25D366]/20 sm:px-3"
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
              className="hidden h-9 items-center gap-1.5 rounded-lg border border-[#1877F2]/30 bg-[#1877F2]/10 px-2.5 text-[#1877F2] transition hover:border-[#1877F2]/55 hover:bg-[#1877F2]/20 sm:inline-flex sm:px-3"
            >
              <FacebookIcon size={16} />
              <span className="hidden text-xs font-semibold sm:inline">FB</span>
            </a>

            <LanguageSwitcher />

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-cream transition hover:border-sand/40 hover:text-sand lg:hidden"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Outside motion.header — otherwise transform traps position:fixed */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label={t.nav.closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(100vw-3rem,20rem)] flex-col border-l border-white/10 bg-bg-elevated shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="text-sm font-semibold text-sand">{t.nav.menu}</span>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-cream hover:border-sand/40 hover:text-sand"
                  aria-label={t.nav.closeMenu}
                  onClick={() => setMenuOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                {mobileLinks.map((item) =>
                  item.type === "hash" ? (
                    <SectionLink
                      key={item.hash}
                      hash={item.hash}
                      label={item.label}
                      onNavigate={() => setMenuOpen(false)}
                      className="rounded-xl px-3 py-3 text-base text-cream/90 transition hover:bg-white/5 hover:text-sand"
                    />
                  ) : (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl px-3 py-3 text-base text-cream/90 transition hover:bg-white/5 hover:text-sand"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
