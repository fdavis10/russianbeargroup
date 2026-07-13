import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export function FaqSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section id="faq" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-wide text-cream sm:text-3xl">
          <span className="relative inline-block">
            {t.faq.title}
            <span className="absolute -bottom-2 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-sand" />
          </span>
        </h2>

        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-3 px-5 py-4 text-left transition hover:bg-white/[0.03]"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sand/15 text-xs font-black text-sand">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-cream sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`mt-0.5 shrink-0 text-sand transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 px-5 pb-5 pt-3 sm:pl-14">
                        <p className="whitespace-pre-line text-sm leading-relaxed text-cream/80 sm:text-[15px]">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
