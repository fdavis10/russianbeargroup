import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export function ConditionsSection() {
  const { t } = useLanguage();
  const s = t.conditionsSection;

  return (
    <section id="conditions" className="scroll-mt-24 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-6 text-center text-2xl font-black uppercase tracking-wide text-cream sm:text-3xl">
          <span className="relative inline-block">
            {s.title}
            <span className="absolute -bottom-2 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-sand" />
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card card-hover p-6 sm:p-8"
        >
          <ul className="space-y-4">
            {s.items.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="text-sm leading-relaxed text-cream/90 sm:text-base"
              >
                <span className="font-semibold text-sand">{item.label}:</span>{" "}
                {item.value}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
