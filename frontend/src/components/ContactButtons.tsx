import { WhatsAppIcon } from "./icons/BrandIcons";
import { useLanguage } from "../i18n/LanguageContext";

export function ContactButtons() {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={t.site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        title="WhatsApp"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon size={26} />
      </a>
    </div>
  );
}
