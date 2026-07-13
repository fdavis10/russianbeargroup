import {
  ClipboardCheck,
  Crosshair,
  FileText,
  MessageCircle,
  PenLine,
  Plane,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const stepIcons: LucideIcon[] = [
  FileText,
  MessageCircle,
  ClipboardCheck,
  Plane,
  PenLine,
  Crosshair,
  Shield,
];

export function ProcessTimeline() {
  const { t } = useLanguage();
  const s = t.processSection;

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });

  const timelineRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateLine = useCallback((index: number | null) => {
    if (index === null) {
      setLineStyle({ top: 0, height: 0 });
      return;
    }

    const timeline = timelineRef.current;
    const startIcon = iconRefs.current[0];
    const targetIcon = iconRefs.current[index];
    if (!timeline || !startIcon || !targetIcon) return;

    const timelineTop = timeline.getBoundingClientRect().top;
    const startY =
      startIcon.getBoundingClientRect().top +
      startIcon.offsetHeight / 2 -
      timelineTop;
    const endY =
      targetIcon.getBoundingClientRect().top +
      targetIcon.offsetHeight / 2 -
      timelineTop;

    setLineStyle({ top: startY, height: Math.max(0, endY - startY) });
  }, []);

  useLayoutEffect(() => {
    updateLine(activeStep);
  }, [activeStep, updateLine, s.steps]);

  useLayoutEffect(() => {
    const onResize = () => updateLine(activeStep);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeStep, updateLine]);

  return (
    <section id="process" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-lg">
        <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-wide text-cream sm:text-3xl">
          <span className="relative inline-block">
            {s.title}
            <span className="absolute -bottom-2 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-sand" />
          </span>
        </h2>

        <div
          ref={timelineRef}
          className="relative"
          onMouseLeave={() => setActiveStep(null)}
        >
          <div
            className="absolute bottom-4 left-6 top-4 w-px bg-white/10"
            aria-hidden
          />

          <motion.div
            className="pointer-events-none absolute left-6 w-px bg-gradient-to-b from-sand via-sand/80 to-sand/30 shadow-[0_0_8px_rgba(196,163,90,0.45)]"
            animate={{
              top: lineStyle.top,
              height: lineStyle.height,
              opacity: activeStep !== null ? 1 : 0,
            }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden
          />

          <ol className="relative space-y-0">
            {s.steps.map((step, i) => {
              const Icon = stepIcons[i] ?? FileText;
              const isLast = i === s.steps.length - 1;
              const isActive = activeStep !== null && i <= activeStep;
              const isHovered = activeStep === i;

              return (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, y: -24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    delay: i * 0.12,
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                  className={`relative flex gap-5 ${isLast ? "pb-0" : "pb-8"}`}
                  onMouseEnter={() => setActiveStep(i)}
                >
                  <div className="relative z-10 shrink-0">
                    <motion.div
                      ref={(el) => {
                        iconRefs.current[i] = el;
                      }}
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.12 + 0.08,
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                        borderColor: { duration: 0.3 },
                        boxShadow: { duration: 0.3 },
                        scale: { duration: 0.3 },
                      }}
                      animate={{
                        borderColor: isActive
                          ? "rgba(196, 163, 90, 0.9)"
                          : "rgba(196, 163, 90, 0.5)",
                        boxShadow: isHovered
                          ? "0 0 28px rgba(196, 163, 90, 0.45)"
                          : isActive
                            ? "0 0 20px rgba(196, 163, 90, 0.25)"
                            : "0 0 20px rgba(196, 163, 90, 0.15)",
                        scale: isHovered ? 1.06 : 1,
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-full border-2 bg-bg-card"
                    >
                      <Icon size={20} className="text-sand" strokeWidth={2} />
                    </motion.div>
                    <motion.span
                      animate={{
                        backgroundColor: isActive ? "#e8d5a3" : "#c4a35a",
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black text-bg"
                    >
                      {i + 1}
                    </motion.span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    animate={{
                      borderColor: isHovered
                        ? "rgba(196, 163, 90, 0.55)"
                        : isActive
                          ? "rgba(196, 163, 90, 0.35)"
                          : "rgba(255, 255, 255, 0.1)",
                    }}
                    transition={{
                      delay: i * 0.12 + 0.1,
                      duration: 0.4,
                      borderColor: { duration: 0.3 },
                    }}
                    className="glass-card card-hover flex min-h-12 flex-1 cursor-default items-center px-5 py-3.5"
                  >
                    <p
                      className={`text-sm font-semibold leading-snug sm:text-base ${
                        isActive ? "text-cream" : "text-cream/85"
                      }`}
                    >
                      {step}
                    </p>
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
