import { fr } from "./locales/fr";
import type { Language, TranslationContent } from "./types";

export type { Language, TranslationContent } from "./types";

export const translations: Record<Language, TranslationContent> = {
  ru: {
    site: {
      title: 'IRC "RUSSIAN BEAR"',
      tagline: "Официальный представитель Министерства обороны РФ",
      email: "support@irc-russianbear.army",
      whatsapp: "https://wa.me/79167787177?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82%2C%20%D1%8F%20%D0%B7%D0%B0%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D0%BE%D0%B2%D0%B0%D0%BD",
      whatsapp_phone: "+7 916 778-71-77",
      telegram_admin: "https://telegram.me/ircrussianbear",
      telegram_channel: "https://telegram.me/icr_russianbear",
      facebook: "https://www.facebook.com/people/IRC-Russian-Bear/61591894922054/",
      vk: "https://vk.com/svo_recruit",
      rights: "Все права защищены.",
    },
    nav: {
      conditions: "Требования",
      advantages: "Преимущества",
      contact: "Контакты",
      reviews: "Отзывы",
      services: "Услуги",
      faq: "FAQ",
      media: "СМИ о нас",
    },
    hero: {
      tagline: "Международное рекрутинговое агентство «Русский медведь»",
      taglineSecondary:
        "Официальный представитель Министерства обороны Российской Федерации",
      headline:
        "Набор граждан Африки, Востока, Азии, Латинской Америки на военную службу по контракту — полное сопровождение от заявки до прибытия.",
      subheadline:
        "Помощь в оформлении документов, визовое сопровождение, размещение, питание, трансфер — оказываем полную поддержку на территории России. Срок от начала оформления документов до прибытия в РФ занимает около 7 дней.",
      cta: "Отправить заявку",
      consultation: "Получить консультацию",
      warning: {
        headline: "Не имейте дела с посредниками — они в основном все мошенники, из-за которых вы рискуете",
        details:
          "Связывайтесь с нами только через официальные каналы, указанные на этом сайте.",
      },
    },
    contactsSection: {
      title: "Контакты",
      links: {
        telegramAdmin: "Telegram",
        whatsappAdmin: "WhatsApp",
        telegramChannel: "Telegram-канал",
        facebook: "Facebook",
      },
    },
    conditionsSection: {
      title: "Требования к кандидатам",
      items: [
        { label: "Возраст", value: "21–45 лет" },
        {
          label: "Здоровье",
          value:
            "отсутствие тяжёлых заболеваний (ВИЧ, гепатиты В/С), отсутствие тяжёлых психических заболеваний, стрессоустойчивость",
        },
        {
          label: "Физическая подготовка",
          value: "возможность отжаться 10 раз, присесть 20 раз",
        },
      ],
    },
    advantages: [
      "Зарплата от 210 000 рублей",
      "Полное обеспечение современным тактическим снаряжением",
      "Бонус при подписании 1 050 000 рублей",
      "Получение гражданства РФ (при желании)",
      "Помощь в трансграничных денежных переводах (перевод денежных средств семье)",
      "Помощь в трудоустройстве после завершения контракта (при желании)",
      "Полное юридическое сопровождение на всех этапах",
      "Участие в государственных социальных программах для ветеранов",
      "Помощь в получении бесплатного медицинского лечения и страховых выплат в случае ранения ($10 000)",
      "Помощь в получении страховых выплат в случае гибели ($60 000 — родственникам через посольство РФ)",
      "Прохождение специализированного курса боевой подготовки (14–60 дней), в зависимости от назначения в ВЧ",
    ],
    services: [
      "Оформление документов под ключ (визы, миграционные карты, страховки, приглашения)",
      "Покупка билетов (авиа, ЖД, морской)",
      "Полное юридическое и социальное сопровождение на весь срок прохождения службы в РФ",
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
        "Оформление документов для въезда в РФ",
        "Трансфер",
        "Подписание контракта",
        "Курс боевой подготовки",
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
      title: "Чем мы помогаем",
      quote: "«Никаких обещаний на словах — фиксация обязательств договорами»",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question:
            "Что будет со мной в случае ранения, и кто получит выплаты, если я погибну?",
          answer:
            "Компания заключает с вами договор о юридическом и социальном сопровождении на весь период службы. Мы гарантируем, что выплаты получит только то доверенное лицо, которое вы сами укажете в документах. В случае ранения, задержек с переводами или потери связи, наши юристы напрямую решают вопросы с госпиталями и командованием. В случае гибели мы через посольства помогаем родным оперативно оформить и получить все государственные компенсации (к самим деньгам компания доступа не имеет).",
        },
        {
          question:
            "Почему в желании выиграть время опасно ехать по туристической визе и рассылать свои документы разным посредникам агентам?",
          answer:
            "Въезд в Россию по туристической визе без прямой поддержки в 90% случаев заканчивается депортацией из аэропорта и запретом на въезд на 20 лет. Недобросовестным посредникам важна только быстрая комиссия за оформление документов, а пропустят вас через границу или нет — их не волнует. Мы работаем только официально: оформляем целевые визы, гарантируем успешное прохождение пограничного контроля и встречу в аэропорту.\n\nВажный нюанс: если вы договорились работать с нашим представителем, но параллельно разослали свои документы другим агентам, происходит задвоение ваших данных в официальных базах. Из-за этого дублирования вас автоматически вычеркивают из списков на получение приглашения. В таком случае вероятность вашей депортации по прилёту составит 100%.",
        },
        {
          question:
            "Правда ли, что при подписании контракта агенты сразу выплачивают 40–50 тысяч долларов?",
          answer:
            "Нет, для каждой страны условия бонусной выплаты индивидуальны. Обещания посредников в 99% случаев — это обман для заманивания людей и получения ими комиссии. Обычно неофициальные посредники называют сумму вашей будущей зарплаты за весь год службы или умалчивают об огромных скрытых комиссиях, из-за которых на руки выдают лишь малую часть. Мы обеспечиваем полную прозрачность: реальная сумма единовременной выплаты и все возможные расходы фиксируются в договоре, который вы подписываете ещё до выезда в Россию.",
        },
        {
          question: "Кто поможет мне оформить гражданство РФ?",
          answer:
            "Обычные посредники агенты только обещают паспорт на словах, а у Министерства обороны другие задачи — они не занимаются миграционными вопросами. Наша компания берёт на себя полный цикл юридического сопровождения. Мы сами готовим, подаем и контролируем все документы, чтобы примерно через 6 месяцев после подписания контракта вы официально стали гражданином Российской Федерации.",
        },
        {
          question:
            "Есть информация, что меня сразу отправят в окоп без тренировок. Это так?",
          answer:
            "Нет, это исключено. Компания располагает тренировочным центром, главная задача которого — обучить вас необходимым боевым навыкам для выживания. Перед началом службы вы в обязательном порядке пройдёте курс подготовки. Его длительность зависит от воинской части, в которую вас направят, и составляет от 21 до 60 дней.",
        },
        {
          question:
            "Если у меня есть узкая специализация (например, врач или инженер), могу ли я служить по своей профессии?",
          answer:
            "Да, это возможно, но одного наличия диплома при въезде в страну недостаточно. Всё зависит от вашего желания приложить усилия: потребуется выучить русский язык (включая профессиональную терминологию), подтвердить квалификацию и пройти курсы переподготовки. Во время службы вам будет предоставлен шанс пройти профильное армейское обучение, а после получения гражданства РФ вы сможете официально устроиться на работу по своей специальности уже в гражданском секторе.",
        },
        {
          question:
            "Хочу поехать в Россию и подписать контракт, но нет загранпаспорта, а чтобы его сделать, нужны деньги. Поможете?",
          answer:
            "Программа авансирования для людей, желающих в ускоренном порядке выехать в Россию и подписать контракт с армией, есть. Чтобы наша компания смогла выделить вам средства, которые, с ваших слов, планируется потратить на срочное изготовление заграничного паспорта, нам нужна страховка в формате видеообращения, в котором вы подтверждаете, что берёте у агентства деньги, которые планируете потратить на изготовление документа, по которому собираетесь заехать в Россию и подписать военный контракт. За деталями обратитесь к нашему консультанту.",
        },
      ],
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
      headline: "Запишитесь на консультацию",
      description:
        "Официальные региональные представители МРЦ «Русский медведь» внимательно отнесутся к вашей ситуации и предложат наиболее подходящую дорожную карту, чтобы вы как можно быстрее приступили к службе.",
      benefits: [
        "Объясним актуальные правила, требования и порядок прохождения службы",
        "Поясним юридические тонкости и порядок оформления документов",
        "Закреплённый агент с вами на связи 24/7",
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
      tagline: "Official representative of the Ministry of Defence of the Russian Federation",
      email: "support@irc-russianbear.army",
      whatsapp: "https://wa.me/79167787177?text=Hello%2C%20I%20am%20interested",
      whatsapp_phone: "+7 916 778-71-77",
      telegram_admin: "https://telegram.me/ircrussianbear",
      telegram_channel: "https://telegram.me/icr_russianbear",
      facebook: "https://www.facebook.com/people/IRC-Russian-Bear/61591894922054/",
      vk: "https://vk.com/svo_recruit",
      rights: "All rights reserved.",
    },
    nav: {
      conditions: "Requirements",
      advantages: "Advantages",
      contact: "Contacts",
      reviews: "Reviews",
      services: "Services",
      faq: "FAQ",
      media: "Media",
    },
    hero: {
      tagline: 'International recruitment agency "Russian Bear"',
      taglineSecondary:
        "Official representative of the Ministry of Defence of the Russian Federation",
      headline:
        "Recruitment of citizens from Africa, the East, Asia, and Latin America for military contract service — full support from application to arrival.",
      subheadline:
        "Assistance with document processing, visa support, accommodation, meals, and transfer — full support within Russia. From the start of paperwork to arrival in the Russian Federation takes about 7 days.",
      cta: "Submit application",
      consultation: "Get a consultation",
      warning: {
        headline:
          "Do not deal with middlemen — most of them are scammers who put you at risk",
        details:
          "Contact us only through the official channels listed on this website.",
      },
    },
    contactsSection: {
      title: "Contacts",
      links: {
        telegramAdmin: "Telegram",
        whatsappAdmin: "WhatsApp",
        telegramChannel: "Telegram channel",
        facebook: "Facebook",
      },
    },
    conditionsSection: {
      title: "Candidate requirements",
      items: [
        { label: "Age", value: "21–45 years" },
        {
          label: "Health",
          value:
            "no serious illnesses (HIV, hepatitis B/C), no severe mental disorders, stress resilience",
        },
        {
          label: "Physical fitness",
          value: "able to do 10 push-ups and 20 squats",
        },
      ],
    },
    advantages: [
      "Salary from $3,000",
      "Full provision of modern tactical equipment",
      "Signing bonus of $15,000",
      "Russian citizenship (optional)",
      "Assistance with cross-border money transfers (sending funds to family)",
      "Employment assistance after contract completion (optional)",
      "Full legal support at every stage",
      "Participation in state social programs for veterans",
      "Assistance with free medical treatment and insurance payments in case of injury ($10,000)",
      "Assistance with insurance payments in case of death ($60,000 — to relatives via the RF embassy)",
      "Specialized combat training course (14–60 days), depending on unit assignment",
    ],
    services: [
      "Turnkey document processing (visas, migration cards, insurance, invitations)",
      "Ticket purchase (air, rail, sea)",
      "Full legal and social support for the entire period of service in the Russian Federation",
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
        "Document processing for entry into the RF",
        "Transfer",
        "Contract signing",
        "Combat training course",
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
      title: "How we help",
      quote: "«No verbal promises — obligations fixed by contracts»",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question:
            "What happens if I am wounded, and who receives the payments if I die?",
          answer:
            "The company signs an agreement with you for legal and social support for the entire period of service. We guarantee that payments go only to the trusted person you designate in your documents. In case of injury, delayed transfers, or loss of contact, our lawyers deal directly with hospitals and command. In case of death, we help relatives promptly process and receive all state compensations through embassies (the company has no access to the funds themselves).",
        },
        {
          question:
            "Why is it dangerous to try to save time by traveling on a tourist visa and sending your documents to different middleman agents?",
          answer:
            "Entering Russia on a tourist visa without direct support ends in airport deportation and a 20-year entry ban in 90% of cases. Unscrupulous middlemen only care about a quick fee for paperwork — whether you clear the border or not is not their concern. We work only officially: we arrange purpose visas, guarantee successful border control, and meet you at the airport.\n\nImportant: if you agree to work with our representative but also send your documents to other agents, your data is duplicated in official databases. Because of this duplication you are automatically removed from invitation lists. In that case, the chance of deportation on arrival is 100%.",
        },
        {
          question:
            "Is it true that agents pay $40,000–50,000 right when the contract is signed?",
          answer:
            "No. Bonus payment terms are individual for each country. Middlemen's promises are deception in 99% of cases, used to lure people and collect fees. Unofficial middlemen often quote your future salary for an entire year of service or hide huge commissions, so you receive only a small part. We ensure full transparency: the real one-time payment amount and all possible expenses are fixed in the contract you sign before leaving for Russia.",
        },
        {
          question: "Who will help me get Russian citizenship?",
          answer:
            "Ordinary middleman agents only promise a passport verbally, while the Ministry of Defence has other priorities and does not handle migration issues. Our company takes on the full cycle of legal support. We prepare, submit, and track all documents so that roughly 6 months after contract signing you officially become a citizen of the Russian Federation.",
        },
        {
          question:
            "There is information that I will be sent straight to the trenches without training. Is that true?",
          answer:
            "No, that is excluded. The company has a training center whose main task is to teach you the combat skills needed to survive. Before starting service you must complete a preparation course. Its length depends on the military unit you are assigned to and lasts from 21 to 60 days.",
        },
        {
          question:
            "If I have a narrow specialization (for example, a doctor or an engineer), can I serve in my profession?",
          answer:
            "Yes, it is possible, but simply having a diploma when you enter the country is not enough. Everything depends on your willingness to put in the effort: you will need to learn Russian (including professional terminology), confirm your qualifications, and complete retraining courses. During service you will get a chance to take specialized military training, and after obtaining Russian citizenship you will be able to officially work in your field in the civilian sector.",
        },
        {
          question:
            "I want to go to Russia and sign a contract, but I do not have a passport, and getting one costs money. Will you help?",
          answer:
            "There is an advance-funding program for people who want to travel to Russia quickly and sign a contract with the army. For our company to allocate funds that, according to you, will be spent on urgent passport issuance, we need insurance in the form of a video statement in which you confirm that you are taking money from the agency to produce the document you intend to use to enter Russia and sign a military contract. For details, contact our consultant.",
        },
      ],
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
      headline: "Book a consultation",
      description:
        'Official regional representatives of IRC "Russian Bear" will carefully consider your situation and offer the most suitable roadmap so you can start service as soon as possible.',
      benefits: [
        "We explain current rules, requirements, and the service enrollment process",
        "We clarify legal details and the document processing procedure",
        "A dedicated agent stays in touch with you 24/7",
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
  fr,
};
