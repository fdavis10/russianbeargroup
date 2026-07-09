import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export function ConditionsSection() {
  const { t } = useLanguage();

  return (
    <section id="conditions" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-wide text-cream sm:text-3xl">
          <span className="relative inline-block">
            {t.sections.conditions}
            <span className="absolute -bottom-2 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-sand" />
          </span>
        </h2>

        <div className="mx-auto grid max-w-3xl gap-4">
          {t.conditions.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-card card-hover flex items-start gap-4 p-5"
            >
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olive/50 text-sand">
                <Check size={18} strokeWidth={3} />
              </div>
              <p className="text-base font-semibold leading-snug text-cream/90">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
