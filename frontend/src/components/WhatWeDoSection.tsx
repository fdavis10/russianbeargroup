import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export function WhatWeDoSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 id="about" className="mb-8 text-center text-2xl font-black uppercase tracking-wide">
          {t.servicesSection.title}
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
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
    </section>
  );
}
