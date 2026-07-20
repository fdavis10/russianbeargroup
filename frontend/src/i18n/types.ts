export type Language = "ru" | "en" | "fr" | "pt" | "es" | "ar";

export interface TranslationContent {
  site: {
    title: string;
    tagline: string;
    email: string;
    whatsapp: string;
    whatsapp_phone: string;
    telegram_admin: string;
    telegram_channel: string;
    facebook: string;
    vk: string;
    rights: string;
  };
  nav: {
    conditions: string;
    advantages: string;
    contact: string;
    about: string;
    reviews: string;
    services: string;
    faq: string;
    media: string;
    menu: string;
    language: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    tagline: string;
    taglineSecondary: string;
    headline: string;
    subheadline: string;
    cta: string;
    consultation: string;
    warning: {
      headline: string;
      details: string;
    };
  };
  contactsSection: {
    title: string;
    links: {
      telegramAdmin: string;
      whatsappAdmin: string;
      telegramChannel: string;
      facebook: string;
    };
  };
  conditionsSection: {
    title: string;
    items: { label: string; value: string }[];
  };
  advantages: string[];
  services: string[];
  countries: { name: string; code: string }[];
  countryOptions: { value: string; label: string; code: string }[];
  processSection: {
    title: string;
    steps: string[];
  };
  reviews: {
    title: string;
    items: { name: string; country: string; text: string; avatar: string }[];
  };
  servicesSection: {
    title: string;
    quote: string;
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  media: {
    title: string;
    subtitle: string;
    enlarge: string;
    close: string;
    items: { src: string; outlet: string; alt: string }[];
  };
  form: {
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    country: string;
    message: string;
    submit: string;
    submitting: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    countryPlaceholder: string;
    dialCodePlaceholder: string;
    phoneNationalPlaceholder: string;
    dialSearchPlaceholder: string;
    errors: {
      nameRequired: string;
      nameMin: string;
      phoneRequired: string;
      phoneInvalid: string;
      dialRequired: string;
      countryRequired: string;
      submitFailed: string;
    };
    success: string;
  };
  consultationForm: {
    headline: string;
    description: string;
    benefits: string[];
    name: string;
    phone: string;
    phoneHint: string;
    question: string;
    submit: string;
    submitting: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    phoneNationalPlaceholder: string;
    dialCodePlaceholder: string;
    dialSearchPlaceholder: string;
    questionPlaceholder: string;
    errors: {
      nameRequired: string;
      nameMin: string;
      phoneRequired: string;
      phoneInvalid: string;
      dialRequired: string;
      questionRequired: string;
      questionMin: string;
      submitFailed: string;
    };
    successTitle: string;
    successMessage: string;
    sendAnother: string;
  };
  sections: {
    advantages: string;
  };
  errors: {
    loadFailed: string;
    retry: string;
  };
  pages: {
    contacts: {
      title: string;
      intro: string;
      directTitle: string;
      directHint: string;
      emailLabel: string;
      phoneLabel: string;
      phoneOnlyLabel: string;
      channelsTitle: string;
      channelsHint: string;
      vkLabel: string;
      representativesTitle: string;
      representativesEmailHint: string;
      representatives: {
        region: string;
        name: string;
        role: string;
        photo: string;
        email: string;
        phone: string;
        telegram: string;
      }[];
      ctaText: string;
      ctaButton: string;
    };
    about: {
      title: string;
      intro: string;
      sections: { heading: string; body: string }[];
      placeholderNote: string;
    };
  };
  pageTitle: string;
}
