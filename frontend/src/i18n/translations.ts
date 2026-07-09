export type Language = "ru" | "en";

export interface TranslationContent {
  site: {
    title: string;
    tagline: string;
    email: string;
    whatsapp: string;
    whatsapp_phone: string;
    vk: string;
    rights: string;
  };
  nav: {
    requirements: string;
    conditions: string;
    advantages: string;
    contact: string;
    reviews: string;
    services: string;
  };
  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    cta: string;
    about: string;
  };
  requirements: { label: string; value: string }[];
  conditions: string[];
  advantages: string[];
  services: string[];
  countries: { name: string; code: string }[];
  countryOptions: { value: string; label: string; code: string }[];
  countriesSection: {
    title: string;
    subtitle: string;
  };
  reviews: {
    title: string;
    items: { name: string; country: string; text: string; avatar: string }[];
  };
  servicesSection: {
    title: string;
    documentsTitle: string;
    close: string;
  };
  documents: {
    contract: { title: string; description: string };
    acceptance: { title: string; description: string };
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
    errors: {
      nameRequired: string;
      nameMin: string;
      phoneRequired: string;
      phoneInvalid: string;
      countryRequired: string;
      submitFailed: string;
    };
    success: string;
  };
  sections: {
    requirements: string;
    conditions: string;
    advantages: string;
  };
  errors: {
    loadFailed: string;
    retry: string;
  };
  pageTitle: string;
}

export const translations: Record<Language, TranslationContent> = {
  ru: {
    site: {
      title: 'IRC "RUSSIAN BEAR"',
      tagline: "Рекрутинг для СВО в Африке",
      email: "recruit@svo-agency.com",
      whatsapp: "https://wa.me/1234567890?text=Заявка%20на%20СВО",
      whatsapp_phone: "+1234567890",
      vk: "https://vk.com/svo_recruit",
      rights: "Все права защищены.",
    },
    nav: {
      requirements: "Требования",
      conditions: "Условия",
      advantages: "Преимущества",
      contact: "Заявка",
      reviews: "Отзывы",
      services: "Услуги",
    },
    hero: {
      tagline: "Рекрутинговое агентство · Африка",
      headline: "Набор граждан для СВО в Африке – полное сопровождение от начала до конца!",
      subheadline:
        "Мы обеспечиваем юридическое оформление, билеты, документы и сопровождение до прибытия.",
      cta: "Узнать подробнее",
      about: "О компании",
    },
    requirements: [
      { label: "Возраст", value: "18–45 лет" },
      { label: "Гражданство", value: "Любая страна (приоритет — Африка)" },
      { label: "Здоровье", value: "Отсутствие судимостей, физическая готовность" },
      { label: "Документы", value: "Паспорт, медицинская справка, военный билет (если есть)" },
    ],
    conditions: [
      "Мужчины до 63 лет включительно",
      "Граждане РФ и иностранцы",
      "С опытом военной службы и без него",
    ],
    advantages: [
      "Зарплата в зоне СВО от 210 000 рублей",
      "Статус ветерана боевых действий и все льготы",
      "Кредитные и налоговые каникулы",
      "Бюджетные места для обучения детей в вузах",
      "Компенсация 50% оплаты ЖКУ",
      "Бесплатное питание и продлёнка для детей",
      "Бесплатный отдых детей в летних оздоровительных лагерях",
      "Ежемесячные выплаты по 10 тыс. руб. беременным и на каждого ребенка в семье",
      "Возможность получения участка земли БЕСПЛАТНО",
      "При поступлении на службу выдаем ДОПОЛНИТЕЛЬНУЮ АММУНИЦИЮ",
      "Полное юридическое сопровождение, гуманитарные конвои, помощь в трудоустройстве после СВО, участие в социальных программах",
      "Помощь в восстановлении любых документов. Помощь семье, решение проблем личного характера",
    ],
    services: [
      "Оформление документов (визы, разрешения)",
      "Покупка авиабилетов (эконом / бизнес-класс)",
      "Юридическое сопровождение (контракты, гражданство)",
      "Полное сопровождение до прибытия",
    ],
    countries: [
      { name: "Нигерия", code: "NG" },
      { name: "Гана", code: "GH" },
      { name: "Кения", code: "KE" },
      { name: "Эфиопия", code: "ET" },
      { name: "ЮАР", code: "ZA" },
      { name: "Сенегал", code: "SN" },
      { name: "Камерун", code: "CM" },
      { name: "Уганда", code: "UG" },
    ],
    countryOptions: [
      { value: "Nigeria", label: "Нигерия", code: "NG" },
      { value: "Ghana", label: "Гана", code: "GH" },
      { value: "Kenya", label: "Кения", code: "KE" },
      { value: "Ethiopia", label: "Эфиопия", code: "ET" },
      { value: "South Africa", label: "ЮАР", code: "ZA" },
      { value: "Senegal", label: "Сенегал", code: "SN" },
      { value: "Cameroon", label: "Камерун", code: "CM" },
      { value: "Uganda", label: "Уганда", code: "UG" },
      { value: "Tanzania", label: "Танзания", code: "TZ" },
      { value: "Other", label: "Другая страна", code: "OTHER" },
    ],
    countriesSection: {
      title: "Страны набора",
      subtitle: "Приоритет — страны Африки",
    },
    reviews: {
      title: "Отзывы",
      items: [
        {
          name: "Kwame A.",
          country: "Гана",
          text: "Получил гражданство через год службы. Компания сделала всё сама – от документов до билетов. Честно!",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "Emmanuel O.",
          country: "Нигерия",
          text: "Рекомендую всем, кто хочет легально уехать. Быстро оформили все бумаги.",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "David M.",
          country: "Кения",
          text: "Профессиональная команда. Помогли с визой, билетами и встретили в аэропорту.",
          avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "Samuel T.",
          country: "Эфиопия",
          text: "Всё прозрачно и по договору. Юристы объяснили каждый шаг. Спасибо за поддержку!",
          avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop&crop=face",
        },
      ],
    },
    servicesSection: {
      title: "Чем мы занимаемся",
      documentsTitle: "Образцы документов",
      close: "Закрыть",
    },
    documents: {
      contract: {
        title: "Образец контракта",
        description: "Типовой договор о прохождении службы",
      },
      acceptance: {
        title: "Справка о приёме",
        description: "Документ о зачислении в подразделение",
      },
    },
    form: {
      title: "Оставить заявку",
      subtitle: "После отправки откроется WhatsApp для быстрой связи",
      name: "Имя *",
      phone: "Телефон *",
      country: "Страна *",
      message: "Сообщение",
      submit: "Отправить заявку",
      submitting: "Отправка...",
      namePlaceholder: "Ваше имя",
      phonePlaceholder: "+234 800 000 0000",
      messagePlaceholder: "Ваш вопрос (необязательно)",
      countryPlaceholder: "Выберите страну",
      errors: {
        nameRequired: "Укажите имя",
        nameMin: "Минимум 2 символа",
        phoneRequired: "Укажите телефон",
        phoneInvalid: "Некорректный номер",
        countryRequired: "Выберите страну",
        submitFailed: "Ошибка отправки. Попробуйте позже.",
      },
      success: "Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.",
    },
    sections: {
      requirements: "Требования к кандидатам",
      conditions: "Условия",
      advantages: "Преимущества",
    },
    errors: {
      loadFailed: "Не удалось загрузить данные. Запустите backend: python manage.py runserver",
      retry: "Повторить",
    },
    pageTitle: 'IRC "RUSSIAN BEAR" — Набор граждан для СВО в Африке',
  },
  en: {
    site: {
      title: 'IRC "RUSSIAN BEAR"',
      tagline: "Recruitment for SVO in Africa",
      email: "recruit@svo-agency.com",
      whatsapp: "https://wa.me/1234567890?text=SVO%20Application",
      whatsapp_phone: "+1234567890",
      vk: "https://vk.com/svo_recruit",
      rights: "All rights reserved.",
    },
    nav: {
      requirements: "Requirements",
      conditions: "Conditions",
      advantages: "Advantages",
      contact: "Apply",
      reviews: "Reviews",
      services: "Services",
    },
    hero: {
      tagline: "Recruitment Agency · Africa",
      headline: "Recruitment for SVO in Africa – full support from start to finish!",
      subheadline:
        "We provide legal processing, tickets, documents, and escort until arrival.",
      cta: "Learn more",
      about: "About us",
    },
    requirements: [
      { label: "Age", value: "18–45 years" },
      { label: "Citizenship", value: "Any country (priority — Africa)" },
      { label: "Health", value: "No criminal record, physical fitness" },
      { label: "Documents", value: "Passport, medical certificate, military ID (if available)" },
    ],
    conditions: [
      "Men up to 63 years old inclusive",
      "Citizens of Russia and foreign nationals",
      "With or without military service experience",
    ],
    advantages: [
      "Salary in the SVO zone from 210,000 rubles",
      "Veteran of combat operations status and all benefits",
      "Credit and tax holidays",
      "Budget university places for children",
      "50% compensation for housing and utilities",
      "Free meals and after-school care for children",
      "Free summer camp vacations for children",
      "Monthly payments of 10,000 rubles for pregnant women and each child in the family",
      "Opportunity to receive a land plot for FREE",
      "Additional equipment issued upon enlistment",
      "Full legal support, humanitarian convoys, employment assistance after SVO, social programs",
      "Help restoring any documents. Family support and personal issue resolution",
    ],
    services: [
      "Document processing (visas, permits)",
      "Airline ticket purchase (economy / business class)",
      "Legal support (contracts, citizenship)",
      "Full escort until arrival",
    ],
    countries: [
      { name: "Nigeria", code: "NG" },
      { name: "Ghana", code: "GH" },
      { name: "Kenya", code: "KE" },
      { name: "Ethiopia", code: "ET" },
      { name: "South Africa", code: "ZA" },
      { name: "Senegal", code: "SN" },
      { name: "Cameroon", code: "CM" },
      { name: "Uganda", code: "UG" },
    ],
    countryOptions: [
      { value: "Nigeria", label: "Nigeria", code: "NG" },
      { value: "Ghana", label: "Ghana", code: "GH" },
      { value: "Kenya", label: "Kenya", code: "KE" },
      { value: "Ethiopia", label: "Ethiopia", code: "ET" },
      { value: "South Africa", label: "South Africa", code: "ZA" },
      { value: "Senegal", label: "Senegal", code: "SN" },
      { value: "Cameroon", label: "Cameroon", code: "CM" },
      { value: "Uganda", label: "Uganda", code: "UG" },
      { value: "Tanzania", label: "Tanzania", code: "TZ" },
      { value: "Other", label: "Other country", code: "OTHER" },
    ],
    countriesSection: {
      title: "Recruitment countries",
      subtitle: "Priority — African countries",
    },
    reviews: {
      title: "Reviews",
      items: [
        {
          name: "Kwame A.",
          country: "Ghana",
          text: "Received citizenship after one year of service. The company handled everything – from documents to tickets. Honestly!",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "Emmanuel O.",
          country: "Nigeria",
          text: "I recommend it to everyone who wants to leave legally. All paperwork was processed quickly.",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "David M.",
          country: "Kenya",
          text: "Professional team. They helped with the visa, tickets, and met me at the airport.",
          avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "Samuel T.",
          country: "Ethiopia",
          text: "Everything is transparent and by contract. Lawyers explained every step. Thank you for the support!",
          avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop&crop=face",
        },
      ],
    },
    servicesSection: {
      title: "What we do",
      documentsTitle: "Sample documents",
      close: "Close",
    },
    documents: {
      contract: {
        title: "Sample contract",
        description: "Standard service agreement",
      },
      acceptance: {
        title: "Acceptance certificate",
        description: "Unit enrollment document",
      },
    },
    form: {
      title: "Submit application",
      subtitle: "WhatsApp will open after submission for quick contact",
      name: "Name *",
      phone: "Phone *",
      country: "Country *",
      message: "Message",
      submit: "Submit application",
      submitting: "Sending...",
      namePlaceholder: "Your name",
      phonePlaceholder: "+234 800 000 0000",
      messagePlaceholder: "Your question (optional)",
      countryPlaceholder: "Select country",
      errors: {
        nameRequired: "Please enter your name",
        nameMin: "Minimum 2 characters",
        phoneRequired: "Please enter your phone",
        phoneInvalid: "Invalid phone number",
        countryRequired: "Please select a country",
        submitFailed: "Submission failed. Please try again later.",
      },
      success: "Application submitted successfully. We will contact you shortly.",
    },
    sections: {
      requirements: "Candidate requirements",
      conditions: "Conditions",
      advantages: "Advantages",
    },
    errors: {
      loadFailed: "Failed to load data. Start the backend: python manage.py runserver",
      retry: "Retry",
    },
    pageTitle: 'IRC "RUSSIAN BEAR" — Recruitment for SVO in Africa',
  },
};
