import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export function RequirementsList() {
  const { t } = useLanguage();

  return (
    <section id="requirements" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center text-2xl font-black uppercase tracking-wide text-cream">
          {t.sections.requirements}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.requirements.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card card-hover flex gap-4 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olive/50 text-sand">
                <Check size={18} strokeWidth={3} />
              </div>
              <div>
                <p className="font-bold text-sand">{item.label}</p>
                <p className="mt-1 text-sm text-muted">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
