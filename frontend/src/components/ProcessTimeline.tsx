import {
  ClipboardCheck,
  FileText,
  MessageCircle,
  PenLine,
  Plane,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

const stepIcons: LucideIcon[] = [
  FileText,
  MessageCircle,
  Plane,
  ClipboardCheck,
  PenLine,
  Shield,
];

export function ProcessTimeline() {
  const { t } = useLanguage();
  const s = t.processSection;

  return (
    <section id="process" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-lg">
        <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-wide text-cream sm:text-3xl">
          <span className="relative inline-block">
            {s.title}
            <span className="absolute -bottom-2 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-sand" />
          </span>
        </h2>

        <div className="relative">
          <div className="absolute bottom-4 left-6 top-4 w-px bg-white/10" aria-hidden />
          <motion.div
            className="absolute left-6 top-4 w-px origin-top bg-gradient-to-b from-sand via-sand/70 to-sand/20"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ height: "calc(100% - 2rem)" }}
            aria-hidden
          />

          <ol className="relative space-y-0">
            {s.steps.map((step, i) => {
              const Icon = stepIcons[i] ?? FileText;
              const isLast = i === s.steps.length - 1;

              return (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, y: -24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.12, duration: 0.45, ease: "easeOut" }}
                  className={`relative flex gap-5 ${isLast ? "pb-0" : "pb-8"}`}
                >
                  <div className="relative z-10 shrink-0">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.08, type: "spring", stiffness: 260, damping: 18 }}
                      className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-sand/50 bg-bg-card shadow-[0_0_20px_rgba(196,163,90,0.15)]"
                    >
                      <Icon size={20} className="text-sand" strokeWidth={2} />
                    </motion.div>
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-sand text-[10px] font-black text-bg">
                      {i + 1}
                    </span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.1, duration: 0.4 }}
                    className={`glass-card card-hover flex min-h-12 flex-1 items-center px-5 py-3.5 ${isLast ? "border-sand/30" : ""}`}
                  >
                    <p className="text-sm font-semibold leading-snug text-cream sm:text-base">{step}</p>
                  </motion.div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
