import { ar } from "./locales/ar";
import { es } from "./locales/es";
import { fr } from "./locales/fr";
import { pt } from "./locales/pt";
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
      about: "Обращение",
      reviews: "Отзывы",
      services: "Услуги",
      faq: "FAQ",
      media: "СМИ о нас",
      menu: "Меню",
      language: "Язык",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
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
        { label: "Возраст", value: "20–55 лет" },
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
      dialCodePlaceholder: "Код",
      phoneNationalPlaceholder: "900 000 00 00",
      dialSearchPlaceholder: "Поиск страны или кода",
      errors: {
        nameRequired: "Укажите имя",
        nameMin: "Минимум 2 символа",
        phoneRequired: "Укажите телефон",
        phoneInvalid: "Некорректный номер",
        dialRequired: "Выберите код страны",
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
      phoneHint: "На указанном номере должен быть установлен WhatsApp или Telegram",
      question: "Ваш вопрос *",
      submit: "Отправить вопрос",
      submitting: "Отправка...",
      namePlaceholder: "Ваше имя",
      phonePlaceholder: "+7 900 000 00 00",
      phoneNationalPlaceholder: "900 000 00 00",
      dialCodePlaceholder: "Код",
      dialSearchPlaceholder: "Поиск страны или кода",
      questionPlaceholder: "Опишите, что вас интересует",
      errors: {
        nameRequired: "Укажите имя",
        nameMin: "Минимум 2 символа",
        phoneRequired: "Укажите телефон",
        phoneInvalid: "Некорректный номер",
        dialRequired: "Выберите код страны",
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
    pages: {
      contacts: {
        title: "Контакты",
        intro:
          "Свяжитесь с нами только через официальные каналы. Здесь собраны все способы связи с IRC «Русский медведь».",
        directTitle: "Прямая связь",
        directHint: "Email и телефон для быстрого контакта",
        emailLabel: "Email",
        phoneLabel: "Телефон / WhatsApp",
        phoneOnlyLabel: "Телефон",
        channelsTitle: "Мессенджеры и соцсети",
        channelsHint: "Официальные аккаунты и канал",
        vkLabel: "ВКонтакте",
        representativesTitle: "Региональные руководители",
        representativesEmailHint:
          "Есть вопросы, возражения или особые обстоятельства по вашему региону? Напишите на почту — региональный руководитель ответит официально и по делу.",
        representatives: [
          {
            region: "Африка",
            name: "David",
            role: "Руководитель Регионального направления Африка",
            photo: "/africa_agent.jpg",
            email: "support-africa@irc-russianbear.army",
            phone: "+23415550142",
            telegram: "AFR_russianbear",
          },
          {
            region: "Азия",
            name: "Wei",
            role: "Руководитель Регионального направления Азия",
            photo: "/asian_agent.jpg",
            email: "support-asia@irc-russianbear.army",
            phone: "+862155501873",
            telegram: "ASIA_russianbear",
          },
          {
            region: "Восток",
            name: "Karim",
            role: "Руководитель Регионального направления Восток",
            photo: "/west_agent.jpg",
            email: "support-me@irc-russianbear.army",
            phone: "+97145550261",
            telegram: "ME_russianbear",
          },
          {
            region: "Латинская Америка",
            name: "Carlos",
            role: "Руководитель Регионального направления Латинская Америка",
            photo: "/latina_agent.jpg",
            email: "support-latam@irc-russianbear.army",
            phone: "+551155550398",
            telegram: "LATAM_russianbear",
          },
        ],
        ctaText: "Нужна консультация? Оставьте вопрос на главной — мы ответим.",
        ctaButton: "Записаться на консультацию",
      },
      about: {
        title: "Обращение",
        intro:
          "Ваш прямой путь в Россию. Без обмана, без посредников, с честью и уважением.",
        sections: [
          {
            heading: "Мы знаем, почему вы делаете этот выбор",
            body: "Мы знаем, что заставляет людей покидать родной дом. Не от легкой жизни человек принимает решение взять в руки оружие и отправиться на другой конец света. За каждым таким решением стоит сильная личная история, желание обеспечить свою семью и надежда на новое, достойное будущее.\n\nВы готовы рисковать самым ценным — своей жизнью. И мы относимся к этому выбору с глубочайшим уважением. Для нас великая честь стоять плечом к плечу с такими людьми.",
          },
          {
            heading: "Горькая правда о посредниках",
            body: "Долгое время путь в Россию преграждала стена из алчных агентов, посредников и мошенников. Мы видели, как люди отдавали последние деньги за пустые обещания, месяцами ждали визы, жили впроголодь в чужих странах, а потом получали отказ на границе. Международный рекрутинговый центр «Русский Медведь» потерял десятки тысяч долларов, пытаясь работать через этих недобросовестных «помощников».\n\nПоэтому мы сказали: Хватит.",
          },
          {
            heading: "Мы работаем напрямую",
            body: "Мы принципиально и навсегда отказались от любых посредников. Мы вышли к людям напрямую. Сегодня «Русский Медведь» — это не просто агентство. Мы являемся официальным представителем, действующим в интересах Министерства обороны РФ. У нас есть собственные надежные менеджеры в странах Латинской Америки, Африки, Азии и Ближнего Востока.\n\nМы не продаем визы. Мы предлагаем братство, честное партнерство и полное сопровождение. Мы берем вас за руку в вашей родной стране и не отпускаем до тех пор, пока вы не обустроите свою новую жизнь в Российской Федерации.",
          },
          {
            heading: "С нами вы не будете скитаться. Мы гарантируем:",
            body: "• Идеальную логистику и 100% пропуск на границе. Все вопросы с оформлением решаются быстро, надежно и официально. Вам всегда будет где жить и чем питаться на каждом этапе пути. Вы не останетесь одни.\n\n• Реальную боевую подготовку. Мы не бросаем людей в неизвестность. Вас будут обучать лучшие инструкторы, чтобы вы были готовы ко всему.\n\n• Надежный тыл для вашей семьи. Мы берем на себя заботу о переводе заработанных вами денег вашим родным. Честно, быстро и до копейки.\n\n• Непрерывную связь. Если вы на задании и не можете ответить, мы всегда на связи с вашей семьей. Ваши близкие никогда не останутся в неведении.\n\n• Полную юридическую и социальную защиту 24/7. Мы рядом в любой ситуации. Обеспечиваем лучшую медицинскую помощь при ранениях и строго контролируем, чтобы все страховые выплаты — по ранению или в случае гибели — дошли до ваших родных через посольство без задержек.",
          },
          {
            heading: "Больше, чем контракт",
            body: "Военный контракт — это важный, но лишь первый шаг. Наша главная цель — помочь вам обрести новый дом. Мы сопровождаем процесс получения гражданства России уже через месяц после начала службы, а после окончания контракта помогаем с образованием, получением жилья и устройством на хорошую работу в мирной жизни.\n\nВы едете защищать Россию, а Россия в нашем лице берет под защиту вас и вашу семью.",
          },
        ],
        placeholderNote:
          "Выбирайте прямой, честный и безопасный путь. Добро пожаловать в семью «Русского Медведя»!",
      },
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
      about: "Our Message",
      reviews: "Reviews",
      services: "Services",
      faq: "FAQ",
      media: "Media",
      menu: "Menu",
      language: "Language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
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
        { label: "Age", value: "20–55 years" },
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
      dialCodePlaceholder: "Code",
      phoneNationalPlaceholder: "900 000 0000",
      dialSearchPlaceholder: "Search country or code",
      errors: {
        nameRequired: "Please enter your name",
        nameMin: "Minimum 2 characters",
        phoneRequired: "Please enter your phone",
        phoneInvalid: "Invalid phone number",
        dialRequired: "Select country code",
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
      phoneHint: "WhatsApp or Telegram must be installed on the number you provide",
      question: "Your question *",
      submit: "Send question",
      submitting: "Sending...",
      namePlaceholder: "Your name",
      phonePlaceholder: "+7 900 000 00 00",
      phoneNationalPlaceholder: "900 000 0000",
      dialCodePlaceholder: "Code",
      dialSearchPlaceholder: "Search country or code",
      questionPlaceholder: "Describe what you would like to know",
      errors: {
        nameRequired: "Please enter your name",
        nameMin: "Minimum 2 characters",
        phoneRequired: "Please enter your phone",
        phoneInvalid: "Invalid phone number",
        dialRequired: "Select country code",
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
    pages: {
      contacts: {
        title: "Contacts",
        intro:
          "Contact us only through official channels. All ways to reach IRC «Russian Bear» are listed here.",
        directTitle: "Direct contact",
        directHint: "Email and phone for a quick reply",
        emailLabel: "Email",
        phoneLabel: "Phone / WhatsApp",
        phoneOnlyLabel: "Phone",
        channelsTitle: "Messengers & social",
        channelsHint: "Official accounts and channel",
        vkLabel: "VKontakte",
        representativesTitle: "Regional directors",
        representativesEmailHint:
          "Have questions, concerns, or special circumstances for your region? Write to this email — the regional director will reply officially and to the point.",
        representatives: [
          {
            region: "Africa",
            name: "David",
            role: "Head of Regional Direction Africa",
            photo: "/africa_agent.jpg",
            email: "support-africa@irc-russianbear.army",
            phone: "+23415550142",
            telegram: "AFR_russianbear",
          },
          {
            region: "Asia",
            name: "Wei",
            role: "Head of Regional Direction Asia",
            photo: "/asian_agent.jpg",
            email: "support-asia@irc-russianbear.army",
            phone: "+862155501873",
            telegram: "ASIA_russianbear",
          },
          {
            region: "The East",
            name: "Karim",
            role: "Head of Regional Direction The East",
            photo: "/west_agent.jpg",
            email: "support-me@irc-russianbear.army",
            phone: "+97145550261",
            telegram: "ME_russianbear",
          },
          {
            region: "Latin America",
            name: "Carlos",
            role: "Head of Regional Direction Latin America",
            photo: "/latina_agent.jpg",
            email: "support-latam@irc-russianbear.army",
            phone: "+551155550398",
            telegram: "LATAM_russianbear",
          },
        ],
        ctaText: "Need a consultation? Leave a question on the home page — we will reply.",
        ctaButton: "Book a consultation",
      },
      about: {
        title: "Our Message",
        intro:
          "Your direct path to Russia. No deception, no middlemen — with honor and respect.",
        sections: [
          {
            heading: "We know why you make this choice",
            body: "We know what makes people leave their homes. It is not an easy life that drives a person to take up arms and travel to the other side of the world. Behind every such decision stands a powerful personal story, the desire to provide for one's family, and the hope for a new, dignified future.\n\nYou are ready to risk what is most precious — your life. And we treat this choice with the deepest respect. It is a great honor for us to stand shoulder to shoulder with such people.",
          },
          {
            heading: "The bitter truth about middlemen",
            body: "For a long time, the path to Russia was blocked by a wall of greedy agents, middlemen, and fraudsters. We saw people give away their last money for empty promises, wait months for visas, live half-starved in foreign countries, and then get refused at the border. The «Russian Bear» International Recruitment Center lost tens of thousands of dollars trying to work through these dishonest \"helpers\".\n\nSo we said: Enough.",
          },
          {
            heading: "We work directly",
            body: "We have rejected all middlemen — on principle and forever. We reached out to people directly. Today, «Russian Bear» is not just an agency. We are an official representative acting in the interests of the Ministry of Defence of the Russian Federation. We have our own trusted managers in the countries of Latin America, Africa, Asia, and the Middle East.\n\nWe do not sell visas. We offer brotherhood, honest partnership, and full support. We take you by the hand in your home country and do not let go until you have built your new life in the Russian Federation.",
          },
          {
            heading: "With us you will never be left stranded. We guarantee:",
            body: "• Flawless logistics and 100% border clearance. All paperwork issues are resolved quickly, reliably, and officially. You will always have a place to stay and food to eat at every stage of the journey. You will not be left alone.\n\n• Real combat training. We do not throw people into the unknown. You will be trained by the best instructors so that you are ready for anything.\n\n• A reliable rear for your family. We take care of transferring the money you earn to your loved ones. Honestly, quickly, and down to the last cent.\n\n• Uninterrupted communication. If you are on a mission and cannot answer, we stay in touch with your family. Your loved ones will never be left in the dark.\n\n• Full legal and social protection 24/7. We are by your side in any situation. We provide the best medical care in case of injury and strictly ensure that all insurance payments — for injury or in the event of death — reach your family through the embassy without delays.",
          },
          {
            heading: "More than a contract",
            body: "A military contract is an important step, but only the first one. Our main goal is to help you find a new home. We assist with the process of obtaining Russian citizenship as early as one month after the start of your service, and after the contract ends, we help with education, housing, and finding a good job in civilian life.\n\nYou come to defend Russia — and Russia, through us, takes you and your family under its protection.",
          },
        ],
        placeholderNote:
          "Choose the direct, honest, and safe path. Welcome to the «Russian Bear» family!",
      },
    },
    pageTitle: 'IRC "RUSSIAN BEAR" — International Contract Service Recruitment',
  },
  fr,
  pt,
  es,
  ar,
};
