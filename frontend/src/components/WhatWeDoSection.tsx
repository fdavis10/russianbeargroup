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
          {t.services.map((service, i) => {
            const isLastOdd =
              i === t.services.length - 1 && t.services.length % 2 === 1;

            return (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`glass-card flex items-start gap-3 p-4 ${
                  isLastOdd
                    ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[calc(50%-0.375rem)]"
                    : ""
                }`}
              >
                <Check size={18} className="mt-0.5 shrink-0 text-sand" strokeWidth={2.5} />
                <p className="text-sm text-cream/90">{service}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-10 max-w-2xl border-l-2 border-sand pl-5 text-left sm:pl-6"
        >
          <p className="text-base font-semibold leading-relaxed tracking-wide text-sand sm:text-lg">
            {t.servicesSection.quote}
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
