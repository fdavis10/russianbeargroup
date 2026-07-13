import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCircle2, MessageCircle } from "lucide-react";
import { useConsultationSubmit } from "../hooks/useTelegramBot";
import { useLanguage } from "../i18n/LanguageContext";
import { getApiErrorMessage } from "../utils/apiError";
import { trackLead } from "../utils/metaPixel";

interface FormValues {
  name: string;
  phone: string;
  question: string;
  website: string;
}

export function ConsultationForm() {
  const { t } = useLanguage();
  const f = t.consultationForm;
  const { submit } = useConsultationSubmit();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { website: "" } });

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-bg px-4 py-3 text-cream outline-none transition focus:border-sand/50 focus:ring-1 focus:ring-sand/30";

  async function onSubmit(data: FormValues) {
    try {
      await submit({
        name: data.name,
        phone: data.phone,
        question: data.question,
        website: data.website,
      });
      trackLead("consultation");
      reset();
      setSubmitted(true);
    } catch (err) {
      alert(getApiErrorMessage(err, f.errors.submitFailed));
    }
  }

  function handleSendAnother() {
    setSubmitted(false);
    reset();
  }

  return (
    <section id="consultation" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-center text-2xl font-black uppercase tracking-wide text-cream sm:text-3xl">
          <span className="relative inline-block">
            {f.headline}
            <span className="absolute -bottom-2 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-sand" />
          </span>
        </h2>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="glass-card relative mx-auto max-w-xl overflow-hidden p-8 text-center sm:p-10"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sand/10 via-transparent to-transparent" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sand/20 ring-2 ring-sand/40"
              >
                <CheckCircle2 size={36} className="text-sand" strokeWidth={2} />
              </motion.div>
              <h3 className="relative text-2xl font-black text-sand sm:text-3xl">{f.successTitle}</h3>
              <p className="relative mt-3 text-lg font-semibold text-cream/90">{f.successMessage}</p>
              <button
                type="button"
                onClick={handleSendAnother}
                className="relative mt-8 inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-muted transition hover:border-sand/40 hover:text-cream"
              >
                <MessageCircle size={16} />
                {f.sendAnother}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10"
            >
              <div className="glass-card p-6 sm:p-8">
                <p className="text-base leading-relaxed text-cream/90">{f.description}</p>
                <ul className="mt-6 space-y-3">
                  {f.benefits.map((benefit, i) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand/15 text-sand">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span className="text-sm leading-relaxed text-cream/85 sm:text-base">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.form
                id="consultation-form"
                onSubmit={handleSubmit(onSubmit)}
                className="glass-card scroll-mt-28 space-y-4 p-6 sm:p-8"
              >
                <input type="hidden" {...register("website")} tabIndex={-1} autoComplete="off" />

                <div>
                  <label className="mb-1.5 block text-sm text-muted">{f.name}</label>
                  <input
                    {...register("name", {
                      required: f.errors.nameRequired,
                      minLength: { value: 2, message: f.errors.nameMin },
                    })}
                    className={inputClass}
                    placeholder={f.namePlaceholder}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-muted">{f.phone}</label>
                  <input
                    {...register("phone", {
                      required: f.errors.phoneRequired,
                      pattern: {
                        value: /^\+?[\d\s\-()]{10,20}$/,
                        message: f.errors.phoneInvalid,
                      },
                    })}
                    type="tel"
                    className={inputClass}
                    placeholder={f.phonePlaceholder}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-muted">{f.question}</label>
                  <textarea
                    {...register("question", {
                      required: f.errors.questionRequired,
                      minLength: { value: 10, message: f.errors.questionMin },
                    })}
                    rows={4}
                    className={inputClass}
                    placeholder={f.questionPlaceholder}
                  />
                  {errors.question && (
                    <p className="mt-1 text-xs text-red-400">{errors.question.message}</p>
                  )}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
                  {isSubmitting ? f.submitting : f.submit}
                </button>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
