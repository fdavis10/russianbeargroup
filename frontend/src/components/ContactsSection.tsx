import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { ContactLinks } from "./ContactLinks";

export function ContactsSection() {
  const { t } = useLanguage();

  return (
    <section id="contacts" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-wide text-cream sm:text-3xl">
          <span className="relative inline-block">
            {t.contactsSection.title}
            <span className="absolute -bottom-2 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-sand" />
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
        >
          <ContactLinks />
        </motion.div>
      </div>
    </section>
  );
}
