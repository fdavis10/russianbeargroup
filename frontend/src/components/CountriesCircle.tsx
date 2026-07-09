import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { FlagIcon } from "./icons/FlagIcon";

export function CountriesCircle() {
  const { t } = useLanguage();
  const radius = 120;
  const center = 150;

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="mb-4 text-2xl font-black uppercase tracking-wide">
          {t.countriesSection.title}
        </h2>
        <p className="mb-10 text-sm text-muted">{t.countriesSection.subtitle}</p>

        <div className="relative mx-auto h-[300px] w-[300px]">
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {t.countries.map((country, i) => {
              const angle = (i / t.countries.length) * 2 * Math.PI - Math.PI / 2;
              const x = center + radius * Math.cos(angle) - 28;
              const y = center + radius * Math.sin(angle) - 28;
              return (
                <motion.div
                  key={country.code}
                  className="absolute flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-sand/30 bg-bg-elevated shadow-lg"
                  style={{ left: x, top: y }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  title={country.name}
                >
                  <FlagIcon code={country.code} size={32} className="rounded-full" />
                </motion.div>
              );
            })}
          </motion.div>

          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-olive/60 text-sand">
            <Globe size={36} strokeWidth={1.5} />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {t.countries.slice(0, 5).map((c) => (
            <span
              key={c.code}
              className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
            >
              <FlagIcon code={c.code} size={16} />
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
