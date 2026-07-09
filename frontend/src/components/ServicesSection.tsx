import { useMemo, useState } from "react";
import { Check, FileText, X } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

interface LocalDocument {
  id: string;
  title: string;
  description: string;
  url: string;
  preview_color: string;
}

export function ServicesSection() {
  const { t } = useLanguage();
  const [activeDoc, setActiveDoc] = useState<LocalDocument | null>(null);

  const documents = useMemo<LocalDocument[]>(
    () => [
      {
        id: "contract",
        title: t.documents.contract.title,
        description: t.documents.contract.description,
        url: "/api/documents/contract/",
        preview_color: "#1a1a1a",
      },
      {
        id: "acceptance",
        title: t.documents.acceptance.title,
        description: t.documents.acceptance.description,
        url: "/api/documents/acceptance/",
        preview_color: "#222222",
      },
    ],
    [t.documents],
  );

  return (
    <section id="services" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 id="about" className="mb-8 text-center text-2xl font-black uppercase tracking-wide">
          {t.servicesSection.title}
        </h2>

        <div className="mb-12 grid gap-3 sm:grid-cols-2">
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

        <h3 className="mb-6 text-center text-lg font-bold text-sand">
          {t.servicesSection.documentsTitle}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {documents.map((doc) => (
            <motion.button
              key={doc.id}
              type="button"
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveDoc(doc)}
              className="glass-card overflow-hidden text-left"
            >
              <div
                className="flex h-32 items-center justify-center"
                style={{ backgroundColor: doc.preview_color }}
              >
                <FileText size={48} className="text-cream/30" strokeWidth={1.5} />
              </div>
              <div className="p-4">
                <p className="font-bold text-cream">{doc.title}</p>
                <p className="mt-1 text-xs text-muted">{doc.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {activeDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveDoc(null)}
          role="presentation"
        >
          <div
            className="relative h-[80vh] w-full max-w-3xl rounded-xl bg-bg-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <button
              type="button"
              onClick={() => setActiveDoc(null)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-bg text-muted hover:text-cream"
              aria-label={t.servicesSection.close}
            >
              <X size={18} />
            </button>
            <iframe
              src={activeDoc.url}
              title={activeDoc.title}
              className="h-full w-full rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
