import { FileCheck, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export function ConditionsSection() {
  const { t } = useLanguage();
  const s = t.conditionsSection;

  return (
    <section id="conditions" className="scroll-mt-24 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-6 text-center text-2xl font-black uppercase tracking-wide text-cream sm:text-3xl">
          <span className="relative inline-block">
            {s.title}
            <span className="absolute -bottom-2 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-sand" />
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card mb-5 flex flex-col items-center justify-center gap-2 px-5 py-4 text-center sm:flex-row sm:gap-4"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-cream sm:text-base">
            <FileCheck size={18} className="shrink-0 text-sand" />
            <span>{s.contractHighlight}</span>
          </div>
          <span className="hidden text-white/25 sm:inline" aria-hidden>
            •
          </span>
          <div className="flex items-center gap-2 text-sm font-semibold text-cream sm:text-base">
            <Shield size={18} className="shrink-0 text-sand" />
            <span>{s.officialRegistration}</span>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {s.groups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-card card-hover p-5"
            >
              <h3 className="mb-3 border-b border-white/10 pb-2 text-xs font-bold uppercase tracking-wider text-sand">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.label ?? item.text} className="text-sm leading-snug text-cream/90">
                    {item.label ? (
                      <>
                        <span className="font-semibold text-sand">{item.label}:</span> {item.value}
                      </>
                    ) : (
                      <>
                        {item.highlight && (
                          <span className="font-bold text-sand">{item.highlight}</span>
                        )}
                        {item.text}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {s.footnote && (
          <p className="mt-4 text-center text-xs text-muted">{s.footnote}</p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <a href="#consultation" className="btn-primary">
            {s.askQuestion}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
