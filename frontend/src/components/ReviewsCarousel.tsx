import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export function ReviewsCarousel() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const reviews = t.reviews.items;

  useEffect(() => {
    setIndex(0);
  }, [t.reviews.items]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const review = reviews[index];

  return (
    <section id="reviews" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-wide">
          {t.reviews.title}
        </h2>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.article
              key={`${t.reviews.title}-${index}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="glass-card flex flex-col items-center p-8 text-center sm:flex-row sm:text-left"
            >
              <img
                src={review.avatar}
                alt={review.name}
                className="mb-4 h-24 w-24 shrink-0 rounded-full border-2 border-sand/40 object-cover sm:mb-0 sm:mr-6"
                loading="lazy"
              />
              <div>
                <p className="text-lg leading-relaxed text-cream/90">&ldquo;{review.text}&rdquo;</p>
                <p className="mt-4 font-bold text-sand">
                  {review.name} · {review.country}
                </p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-sand" : "w-2 bg-white/20"
              }`}
              aria-label={`${t.reviews.title} ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
