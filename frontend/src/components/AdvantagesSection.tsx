import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export function AdvantagesSection() {
  const { t } = useLanguage();

  return (
    <section id="advantages" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-wide text-cream sm:text-3xl">
          <span className="relative inline-block">
            {t.sections.advantages}
            <span className="absolute -bottom-2 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-sand" />
          </span>
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.advantages.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="glass-card card-hover flex items-start gap-3 p-4"
            >
              <Check size={18} className="mt-0.5 shrink-0 text-sand" strokeWidth={2.5} />
              <p className="text-sm leading-relaxed text-cream/90">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
