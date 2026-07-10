import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

interface MediaItem {
  src: string;
  outlet: string;
  alt: string;
}

export function ServicesSection() {
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState<MediaItem | null>(null);

  const mediaItems = useMemo<MediaItem[]>(
    () =>
      t.media.items.map((item) => ({
        src: item.src,
        outlet: item.outlet,
        alt: item.alt,
      })),
    [t.media.items],
  );

  return (
    <section id="services" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 id="about" className="mb-8 text-center text-2xl font-black uppercase tracking-wide">
          {t.servicesSection.title}
        </h2>

        <div className="mb-12 grid gap-3 sm:grid-cols-2">
          {t.services.map((service, i) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-card flex items-start gap-3 p-4"
            >
              <Check size={18} className="mt-0.5 shrink-0 text-sand" strokeWidth={2.5} />
              <p className="text-sm text-cream/90">{service}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div id="media" className="mx-auto max-w-5xl scroll-mt-24">
        <h3 className="mb-3 text-center text-lg font-bold text-sand">{t.media.title}</h3>
        {t.media.subtitle && (
          <p className="mb-8 text-center text-sm text-muted">{t.media.subtitle}</p>
        )}

        <div className="flex flex-col gap-8">
          {mediaItems.map((item, i) => (
            <motion.button
              key={item.src}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => setActiveImage(item)}
              className="group overflow-hidden rounded-2xl border border-white/15 bg-white shadow-xl shadow-black/40 transition-shadow hover:shadow-2xl hover:shadow-black/50"
            >
              <div className="border-b border-black/5 bg-white px-4 py-2.5 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  {item.outlet}
                </span>
              </div>
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="block w-full object-contain"
              />
              <div className="bg-neutral-900/90 px-4 py-2 text-center text-xs text-cream/70 opacity-0 transition-opacity group-hover:opacity-100">
                {t.media.enlarge}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActiveImage(null)}
          role="presentation"
        >
          <div
            className="relative max-h-[95vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute -top-2 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-bg-card text-muted hover:text-cream sm:-right-12 sm:top-0"
              aria-label={t.media.close}
            >
              <X size={20} />
            </button>
            <p className="mb-3 text-center text-sm font-bold uppercase tracking-wider text-sand">
              {activeImage.outlet}
            </p>
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[85vh] w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
