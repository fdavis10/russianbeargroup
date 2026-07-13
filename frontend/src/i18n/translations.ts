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
    conditions: string;
    advantages: string;
    contact: string;
    reviews: string;
    services: string;
    media: string;
  };
  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    cta: string;
    consultation: string;
    warning: {
      headline: string;
      details: string;
    };
  };
  conditionsSection: {
    title: string;
    contractHighlight: string;
    officialRegistration: string;
    footnote: string;
    askQuestion: string;
    groups: {
      title: string;
      items: {
        label?: string;
        value?: string;
        highlight?: string;
        text?: string;
      }[];
    }[];
  };
  advantages: {
    military: { title: string; items: string[] };
    family: { title: string; items: string[] };
    additional: { title: string; items: string[] };
  };
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
  consultationForm: {
    headline: string;
    description: string;
    benefits: string[];
    name: string;
    phone: string;
    question: string;
    submit: string;
    submitting: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    questionPlaceholder: string;
    errors: {
      nameRequired: string;
      nameMin: string;
      phoneRequired: string;
      phoneInvalid: string;
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
  pageTitle: string;
}

export const translations: Record<Language, TranslationContent> = {
  ru: {
    site: {
      title: 'IRC "RUSSIAN BEAR"',
      tagline: "Международная организация · Партнёр МО РФ",
      email: "recruit@svo-agency.com",
      whatsapp: "https://wa.me/1234567890?text=Заявка%20на%20СВО",
      whatsapp_phone: "+1234567890",
      vk: "https://vk.com/svo_recruit",
      rights: "Все права защищены.",
    },
    nav: {
      conditions: "Условия",
      advantages: "Преимущества",
      contact: "Заявка",
      reviews: "Отзывы",
      services: "Услуги",
      media: "СМИ о нас",
    },
    hero: {
      tagline:
        "Интернациональное рекрутинговое агентство · Прямое сотрудничество с Министерством обороны Российской Федерации",
      headline:
        "Набор граждан со всего мира на службу по контракту — полное сопровождение от заявки до прибытия",
      subheadline:
        "Работаем напрямую с Минобороны РФ. Юридическое оформление, документы, перелёт и сопровождение на каждом этапе — для граждан любой страны.",
      cta: "Отправить заявку",
      consultation: "Получить консультацию",
      warning: {
        headline: "Не имейте дела с мошенниками — мы официальные представители",
        details:
          "Работаем только по официальному договору. Никаких предоплат на личные карты и криптокошельки. Проверяйте документы, реквизиты и контакты — связывайтесь с нами только через этот сайт.",
      },
    },
    conditionsSection: {
      title: "Условия",
      contractHighlight: "Контракт 1 год (с продлением)",
      officialRegistration: "Официальное оформление",
      footnote: "* Суммы довольствия и выплат уточняйте у менеджера",
      askQuestion: "Задать вопрос",
      groups: [
        {
          title: "Требования к кандидатам",
          items: [
            { label: "Возраст", value: "21–45 лет" },
            {
              label: "Здоровье",
              value: "Отсутствие тяжёлых заболеваний (ВИЧ, гепатиты B/C)",
            },
          ],
        },
        {
          title: "Финансовые условия",
          items: [
            { highlight: "$10 000", text: " — единовременный бонус при подписании" },
            { highlight: "$3 000 / мес.*", text: " — ежемесячное довольствие" },
          ],
        },
        {
          title: "Гарантии и поддержка",
          items: [
            { text: "Гражданство РФ — право получения после 1 месяца службы" },
            { text: "Визы и трансфер — полное содействие с переездом в Россию" },
          ],
        },
        {
          title: "Страхование и лечение",
          items: [
            {
              text: "Бесплатная медицина и компенсация при ранении* (от $12 000 до $50 000)",
            },
            {
              text: "Выплата семье или доверенному лицу в случае гибели* ($60 000 через посольство)",
            },
          ],
        },
      ],
    },
    advantages: {
      military: {
        title: "Для военных",
        items: [
          "Зарплата в зоне СВО от 210 000 рублей",
          "Статус ветерана боевых действий и все положенные льготы",
          "Официальный контракт с Минобороны РФ",
          "Выдача дополнительной амуниции при поступлении на службу",
          "Помощь в трудоустройстве после завершения контракта",
          "Полное юридическое сопровождение на всех этапах",
          "Участие в государственных социальных программах для ветеранов",
        ],
      },
      family: {
        title: "Для семьи",
        items: [
          "Кредитные и налоговые каникулы на период службы",
          "Бюджетные места для обучения детей в вузах",
          "Компенсация 50% оплаты жилищно-коммунальных услуг",
          "Бесплатное питание и продлёнка для детей школьного возраста",
          "Бесплатный отдых детей в летних оздоровительных лагерях",
          "Ежемесячные выплаты беременным женам и на каждого ребёнка в семье",
          "Возможность бесплатного получения земельного участка",
          "Помощь в восстановлении документов и решении семейных вопросов",
        ],
      },
      additional: {
        title: "Дополнительные преимущества",
        items: [
          "Подготовительный курс перед службой",
          "Обучение по любой военной специальности",
          "Обеспечение тактическим снаряжением",
        ],
      },
    },
    services: [
      "Оформление документов (визы, разрешения)",
      "Покупка авиабилетов (эконом / бизнес-класс)",
      "Юридическое сопровождение (контракты, гражданство)",
      "Полное сопровождение до прибытия",
    ],
    countries: [
      { name: "Россия", code: "RU" },
      { name: "Беларусь", code: "BY" },
      { name: "Казахстан", code: "KZ" },
      { name: "Узбекистан", code: "UZ" },
      { name: "Индия", code: "IN" },
      { name: "Сербия", code: "RS" },
      { name: "Куба", code: "CU" },
      { name: "Армения", code: "AM" },
    ],
    countryOptions: [
      { value: "Russia", label: "Россия", code: "RU" },
      { value: "Belarus", label: "Беларусь", code: "BY" },
      { value: "Kazakhstan", label: "Казахстан", code: "KZ" },
      { value: "Uzbekistan", label: "Узбекистан", code: "UZ" },
      { value: "India", label: "Индия", code: "IN" },
      { value: "Serbia", label: "Сербия", code: "RS" },
      { value: "Cuba", label: "Куба", code: "CU" },
      { value: "Armenia", label: "Армения", code: "AM" },
      { value: "Vietnam", label: "Вьетнам", code: "VN" },
      { value: "Kyrgyzstan", label: "Киргизия", code: "KG" },
      { value: "Other", label: "Другая страна", code: "OTHER" },
    ],
    processSection: {
      title: "Порядок оформления",
      steps: [
        "Заявка",
        "Консультация",
        "Подготовка к отправке",
        "Оформление",
        "Подписание контракта",
        "Начало службы",
      ],
    },
    reviews: {
      title: "Отзывы",
      items: [
        {
          name: "Rajesh K.",
          country: "Индия",
          text: "Получил гражданство через год службы. Компания сделала всё сама – от документов до билетов. Честно!",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "Marko P.",
          country: "Сербия",
          text: "Рекомендую всем, кто хочет легально оформиться. Быстро подготовили все бумаги.",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "Andrei V.",
          country: "Беларусь",
          text: "Профессиональная команда. Помогли с визой, билетами и встретили в аэропорту.",
          avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "Carlos M.",
          country: "Куба",
          text: "Всё прозрачно и по договору. Юристы объяснили каждый шаг. Спасибо за поддержку!",
          avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop&crop=face",
        },
      ],
    },
    servicesSection: {
      title: "Чем мы занимаемся",
    },
    media: {
      title: "СМИ о нас",
      subtitle: "Мировые СМИ освещают деятельность IRC «Russian Bear»",
      enlarge: "Нажмите, чтобы увеличить",
      close: "Закрыть",
      items: [
        {
          src: "/media/cnn_1.jpg",
          outlet: "BBC",
          alt: "BBC: ЧКК «Russian Bear» уполномочена на официальный набор иностранных граждан",
        },
        {
          src: "/media/cnn_2.jpg",
          outlet: "RT",
          alt: "RT: Три российские рекрутинговые компании подписали меморандум с ВС РФ",
        },
        {
          src: "/media/cnn_3.jpg",
          outlet: "New York Post",
          alt: "New York Post: Bear, Shield, and Redut — официальный статус военного рекрутинга",
        },
      ],
    },
    form: {
      title: "Оставить заявку",
      subtitle: "Заполните форму — мы свяжемся с вами в ближайшее время",
      name: "Имя *",
      phone: "Телефон *",
      country: "Страна *",
      message: "Сообщение",
      submit: "Отправить заявку",
      submitting: "Отправка...",
      namePlaceholder: "Ваше имя",
      phonePlaceholder: "+7 900 000 00 00",
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
    consultationForm: {
      headline: "Запишитесь на бесплатную консультацию",
      description:
        "Профессиональные кураторы подробно разберут вашу ситуацию, помогут подготовиться к службе и расскажут о каждом этапе оформления.",
      benefits: [
        "Объясним актуальные правила, требования и порядок прохождения службы",
        "Подскажем оптимальные и законные пути решения индивидуальных вопросов",
        "Поясним юридические тонкости и порядок оформления документов",
        "Проверим вашу готовность к военной службе и обсудим персональные условия",
        "Рассчитаем положенные выплаты, компенсации и доступные вам льготы",
      ],
      name: "Имя *",
      phone: "Телефон *",
      question: "Ваш вопрос *",
      submit: "Отправить вопрос",
      submitting: "Отправка...",
      namePlaceholder: "Ваше имя",
      phonePlaceholder: "+7 900 000 00 00",
      questionPlaceholder: "Опишите, что вас интересует",
      errors: {
        nameRequired: "Укажите имя",
        nameMin: "Минимум 2 символа",
        phoneRequired: "Укажите телефон",
        phoneInvalid: "Некорректный номер",
        questionRequired: "Напишите ваш вопрос",
        questionMin: "Минимум 10 символов",
        submitFailed: "Ошибка отправки. Попробуйте позже.",
      },
      successTitle: "Спасибо!",
      successMessage: "Мы с вами свяжемся!",
      sendAnother: "Задать ещё один вопрос",
    },
    sections: {
      advantages: "Преимущества",
    },
    errors: {
      loadFailed: "Не удалось загрузить данные. Запустите backend: python manage.py runserver",
      retry: "Повторить",
    },
    pageTitle: 'IRC "RUSSIAN BEAR" — Международный набор на службу по контракту',
  },
  en: {
    site: {
      title: 'IRC "RUSSIAN BEAR"',
      tagline: "International organization · Partner of the RF Ministry of Defence",
      email: "recruit@svo-agency.com",
      whatsapp: "https://wa.me/1234567890?text=SVO%20Application",
      whatsapp_phone: "+1234567890",
      vk: "https://vk.com/svo_recruit",
      rights: "All rights reserved.",
    },
    nav: {
      conditions: "Conditions",
      advantages: "Advantages",
      contact: "Apply",
      reviews: "Reviews",
      services: "Services",
      media: "Media",
    },
    hero: {
      tagline:
        "International recruitment agency · Direct cooperation with the Russian Ministry of Defence",
      headline:
        "Global contract service recruitment — full support from application to arrival",
      subheadline:
        "We work directly with the Russian Ministry of Defence. Legal processing, documents, travel, and step-by-step support for citizens of any country.",
      cta: "Submit application",
      consultation: "Get a consultation",
      warning: {
        headline: "Do not deal with scammers — we are official representatives",
        details:
          "We work only under an official contract. No upfront payments to personal cards or crypto wallets. Verify documents, bank details, and contacts — reach us only through this website.",
      },
    },
    conditionsSection: {
      title: "Conditions",
      contractHighlight: "1-year contract (renewable)",
      officialRegistration: "Official enlistment",
      footnote: "* Confirm current pay and benefit amounts with your manager",
      askQuestion: "Ask a question",
      groups: [
        {
          title: "Candidate requirements",
          items: [
            { label: "Age", value: "21–45 years" },
            {
              label: "Health",
              value: "No serious illnesses (HIV, hepatitis B/C)",
            },
          ],
        },
        {
          title: "Financial terms",
          items: [
            { highlight: "$10,000", text: " — one-time signing bonus" },
            { highlight: "$3,000 / mo.*", text: " — monthly allowance" },
          ],
        },
        {
          title: "Guarantees and support",
          items: [
            { text: "Russian citizenship — eligible after 1 month of service" },
            { text: "Visas and transfer — full assistance relocating to Russia" },
          ],
        },
        {
          title: "Insurance and medical care",
          items: [
            {
              text: "Free medical care and injury compensation* ($12,000 to $50,000)",
            },
            {
              text: "Payment to family or trusted person in case of death* ($60,000 via embassy)",
            },
          ],
        },
      ],
    },
    advantages: {
      military: {
        title: "For service members",
        items: [
          "Salary in the SVO zone from 210,000 rubles",
          "Combat veteran status and all eligible benefits",
          "Official contract with the Russian Ministry of Defence",
          "Additional equipment issued upon enlistment",
          "Employment assistance after contract completion",
          "Full legal support at every stage",
          "Participation in state social programs for veterans",
        ],
      },
      family: {
        title: "For families",
        items: [
          "Credit and tax holidays for the duration of service",
          "Budget university places for children",
          "50% compensation for housing and utility payments",
          "Free meals and after-school care for school-age children",
          "Free summer camp vacations for children",
          "Monthly payments for pregnant spouses and each child in the family",
          "Opportunity to receive a land plot free of charge",
          "Help restoring documents and resolving family matters",
        ],
      },
      additional: {
        title: "Additional advantages",
        items: [
          "Pre-service preparatory course",
          "Training in any military specialty",
          "Provision of tactical equipment",
        ],
      },
    },
    services: [
      "Document processing (visas, permits)",
      "Airline ticket purchase (economy / business class)",
      "Legal support (contracts, citizenship)",
      "Full escort until arrival",
    ],
    countries: [
      { name: "Russia", code: "RU" },
      { name: "Belarus", code: "BY" },
      { name: "Kazakhstan", code: "KZ" },
      { name: "Uzbekistan", code: "UZ" },
      { name: "India", code: "IN" },
      { name: "Serbia", code: "RS" },
      { name: "Cuba", code: "CU" },
      { name: "Armenia", code: "AM" },
    ],
    countryOptions: [
      { value: "Russia", label: "Russia", code: "RU" },
      { value: "Belarus", label: "Belarus", code: "BY" },
      { value: "Kazakhstan", label: "Kazakhstan", code: "KZ" },
      { value: "Uzbekistan", label: "Uzbekistan", code: "UZ" },
      { value: "India", label: "India", code: "IN" },
      { value: "Serbia", label: "Serbia", code: "RS" },
      { value: "Cuba", label: "Cuba", code: "CU" },
      { value: "Armenia", label: "Armenia", code: "AM" },
      { value: "Vietnam", label: "Vietnam", code: "VN" },
      { value: "Kyrgyzstan", label: "Kyrgyzstan", code: "KG" },
      { value: "Other", label: "Other country", code: "OTHER" },
    ],
    processSection: {
      title: "Enrollment process",
      steps: [
        "Application",
        "Consultation",
        "Preparation for departure",
        "Processing",
        "Contract signing",
        "Start of service",
      ],
    },
    reviews: {
      title: "Reviews",
      items: [
        {
          name: "Rajesh K.",
          country: "India",
          text: "Received citizenship after one year of service. The company handled everything – from documents to tickets. Honestly!",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "Marko P.",
          country: "Serbia",
          text: "I recommend it to everyone who wants to enlist legally. All paperwork was processed quickly.",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "Andrei V.",
          country: "Belarus",
          text: "Professional team. They helped with the visa, tickets, and met me at the airport.",
          avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "Carlos M.",
          country: "Cuba",
          text: "Everything is transparent and by contract. Lawyers explained every step. Thank you for the support!",
          avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop&crop=face",
        },
      ],
    },
    servicesSection: {
      title: "What we do",
    },
    media: {
      title: "Media about us",
      subtitle: "Global media coverage of IRC «Russian Bear»",
      enlarge: "Click to enlarge",
      close: "Close",
      items: [
        {
          src: "/media/cnn_1.jpg",
          outlet: "BBC",
          alt: "BBC: ICR Russian Bear authorized as official recruiter of foreign nationals",
        },
        {
          src: "/media/cnn_2.jpg",
          outlet: "RT",
          alt: "RT: Three Russian recruitment companies signed memorandum with the Armed Forces",
        },
        {
          src: "/media/cnn_3.jpg",
          outlet: "New York Post",
          alt: "New York Post: Bear, Shield, and Redut — official status of military recruiting",
        },
      ],
    },
    form: {
      title: "Submit application",
      subtitle: "Fill out the form — we will contact you shortly",
      name: "Name *",
      phone: "Phone *",
      country: "Country *",
      message: "Message",
      submit: "Submit application",
      submitting: "Sending...",
      namePlaceholder: "Your name",
      phonePlaceholder: "+7 900 000 00 00",
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
    consultationForm: {
      headline: "Book a free consultation",
      description:
        "Our professional coordinators will review your situation in detail, help you prepare for service, and walk you through every step of the enrollment process.",
      benefits: [
        "We explain current rules, requirements, and the service enrollment process",
        "We advise on the best lawful options for your individual situation",
        "We clarify legal details and the document processing procedure",
        "We assess your readiness for military service and discuss personal terms",
        "We calculate eligible payments, compensation, and benefits available to you",
      ],
      name: "Name *",
      phone: "Phone *",
      question: "Your question *",
      submit: "Send question",
      submitting: "Sending...",
      namePlaceholder: "Your name",
      phonePlaceholder: "+7 900 000 00 00",
      questionPlaceholder: "Describe what you would like to know",
      errors: {
        nameRequired: "Please enter your name",
        nameMin: "Minimum 2 characters",
        phoneRequired: "Please enter your phone",
        phoneInvalid: "Invalid phone number",
        questionRequired: "Please enter your question",
        questionMin: "Minimum 10 characters",
        submitFailed: "Submission failed. Please try again later.",
      },
      successTitle: "Thank you!",
      successMessage: "We will be in touch with you!",
      sendAnother: "Ask another question",
    },
    sections: {
      advantages: "Advantages",
    },
    errors: {
      loadFailed: "Failed to load data. Start the backend: python manage.py runserver",
      retry: "Retry",
    },
    pageTitle: 'IRC "RUSSIAN BEAR" — International Contract Service Recruitment',
  },
};
