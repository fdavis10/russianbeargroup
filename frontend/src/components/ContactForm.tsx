import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { useContactSubmit } from "../hooks/useTelegramBot";
import { useLanguage } from "../i18n/LanguageContext";
import { getApiErrorMessage } from "../utils/apiError";
import { CountrySelect } from "./icons/CountrySelect";

interface FormValues {
  name: string;
  phone: string;
  country: string;
  message: string;
  website: string;
}

export function ContactForm() {
  const { t } = useLanguage();
  const { submit } = useContactSubmit();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { website: "", country: "" } });

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-bg px-4 py-3 text-cream outline-none transition focus:border-sand/50 focus:ring-1 focus:ring-sand/30";

  async function onSubmit(data: FormValues) {
    try {
      await submit({
        name: data.name,
        phone: data.phone,
        country: data.country,
        message: data.message,
        website: data.website,
      });
      reset();
      alert(t.form.success);
    } catch (err) {
      alert(getApiErrorMessage(err, t.form.errors.submitFailed));
    }
  }

  return (
    <section id="contact" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-2 text-center text-2xl font-black uppercase tracking-wide">
          {t.form.title}
        </h2>
        <p className="mb-8 text-center text-sm text-muted">{t.form.subtitle}</p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="glass-card space-y-4 p-6 sm:p-8"
        >
          <input type="hidden" {...register("website")} tabIndex={-1} autoComplete="off" />

          <div>
            <label className="mb-1.5 block text-sm text-muted">{t.form.name}</label>
            <input
              {...register("name", {
                required: t.form.errors.nameRequired,
                minLength: { value: 2, message: t.form.errors.nameMin },
              })}
              className={inputClass}
              placeholder={t.form.namePlaceholder}
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-muted">{t.form.phone}</label>
            <input
              {...register("phone", {
                required: t.form.errors.phoneRequired,
                pattern: {
                  value: /^\+?[\d\s\-()]{10,20}$/,
                  message: t.form.errors.phoneInvalid,
                },
              })}
              type="tel"
              className={inputClass}
              placeholder={t.form.phonePlaceholder}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-muted">{t.form.country}</label>
            <Controller
              name="country"
              control={control}
              rules={{ required: t.form.errors.countryRequired }}
              render={({ field }) => (
                <CountrySelect
                  options={t.countryOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t.form.countryPlaceholder}
                  error={errors.country?.message}
                />
              )}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-muted">{t.form.message}</label>
            <textarea
              {...register("message")}
              rows={3}
              className={inputClass}
              placeholder={t.form.messagePlaceholder}
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
            {isSubmitting ? t.form.submitting : t.form.submit}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
