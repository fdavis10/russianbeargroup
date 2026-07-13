import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

function AdvantageList({ items, startDelay = 0 }: { items: string[]; startDelay?: number }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: startDelay + i * 0.05 }}
          className="flex items-start gap-3"
        >
          <Check size={18} className="mt-0.5 shrink-0 text-sand" strokeWidth={2.5} />
          <span className="text-sm leading-relaxed text-cream/90">{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}

export function AdvantagesSection() {
  const { t } = useLanguage();
  const { military, family, additional } = t.advantages;

  return (
    <section id="advantages" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-wide text-cream sm:text-3xl">
          <span className="relative inline-block">
            {t.sections.advantages}
            <span className="absolute -bottom-2 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-sand" />
          </span>
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          {[military, family].map((column, columnIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: columnIndex * 0.1 }}
              className="glass-card card-hover p-6"
            >
              <h3 className="mb-5 border-b border-white/10 pb-3 text-center text-lg font-bold uppercase tracking-wide text-sand">
                {column.title}
              </h3>
              <AdvantageList items={column.items} startDelay={columnIndex * 0.08} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass-card card-hover mx-auto mt-8 max-w-3xl p-6"
        >
          <h3 className="mb-5 border-b border-white/10 pb-3 text-center text-lg font-bold uppercase tracking-wide text-sand">
            {additional.title}
          </h3>
          <AdvantageList items={additional.items} startDelay={0.2} />
        </motion.div>
      </div>
    </section>
  );
}
