import { useEffect, useMemo, useState } from "react";
import "./styles.css";

const vkUrl = "https://vk.com/evtenia_happy_lady";
const maxUrl = "https://max.ru/join/fYupCLkr__76YnzZS3QeOWJLGUjh9R2Qw3LRhWolNVY";
const rutubeUrl = "https://rutube.ru/channel/38482316/";
const founderLeftPhoto = "https://s10.iimage.su/s/22/gvPWh71xlYDOi4oSdcf0nWjnmVc2VA0S3w1SrEz6N.png";
const founderRightPhoto = "https://s10.iimage.su/s/22/guNsQNexEI1a9Sdz4oCeDiaBCHUd4Qv3BRbNnsg1i.png";

const events = [
  {
    slug: "business-breakfast-march",
    title: "Бизнес-завтрак: личный бренд 2026",
    date: "12 апреля 2026",
    time: "10:00–13:00",
    place: "Пенза, Soho Hall",
    city: "Пенза",
    format: "Оффлайн",
    category: "Бизнес",
    projectSlug: "business-i-zhenshina",
    status: "future",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    short: "Практическая встреча о позиционировании, репутации и росте экспертности.",
    program: ["Нетворкинг и welcome-coffee", "Панель с основателями бизнесов", "Q&A + закрытое обсуждение"],
    audience: "Предприниматели, эксперты, руководители команд.",
  },
  {
    slug: "networking-evening-april",
    title: "Нетворкинг-вечер EVTENIA: связи, которые растут",
    date: "15 апреля 2026",
    time: "19:00–22:00",
    place: "Пенза, Dom Boutique Hall",
    city: "Пенза",
    format: "Оффлайн",
    category: "Нетворкинг",
    projectSlug: "networking",
    status: "future",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80",
    short: "Интеллигентный вечер знакомств, мини-питчи и новые партнерства.",
    program: ["Круг знакомств", "Формат быстрых диалогов", "After-talk с модератором клуба"],
    audience: "Для участников, которые хотят расширить деловой и личный круг общения.",
  },
  {
    slug: "wellbeing-circle",
    title: "Круг поддержки: энергия, опора, баланс",
    date: "7 мая 2026",
    time: "18:30–21:00",
    place: "Пенза, клубное пространство EVTENIA",
    city: "Пенза",
    format: "Оффлайн",
    category: "Встречи сообщества",
    projectSlug: "perezagruzka",
    status: "future",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    short: "Камерная встреча для глубокой перезагрузки и поддержки в сообществе.",
    program: ["Практика заземления", "Тематическое обсуждение", "Чайная церемония"],
    audience: "Для тех, кому важно бережное и вдохновляющее окружение.",
  },
  {
    slug: "public-speaking-lab",
    title: "Лаборатория выступлений: голос и уверенность",
    date: "21 мая 2026",
    time: "17:00–20:00",
    place: "Онлайн + офлайн студия",
    city: "Онлайн",
    format: "Гибрид",
    category: "Обучение",
    projectSlug: "fitnes-dlya-mozga",
    status: "future",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",
    short: "Тренировка публичных выступлений и подачи себя перед аудиторией.",
    program: ["Разбор структуры речи", "Практика на камеру", "Индивидуальная обратная связь"],
    audience: "Для спикеров, основателей и экспертов.",
  },
  {
    slug: "autumn-forum-2025",
    title: "Итоги форума EVTENIA: люди в новой экономике",
    date: "18 ноября 2025",
    time: "11:00–18:00",
    place: "Пенза, LOFT#7",
    city: "Пенза",
    format: "Оффлайн",
    category: "Special events",
    projectSlug: "business-i-zhenshina",
    status: "past",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    short: "Большой форум с 300+ участниками, экспертами и партнерами.",
    program: ["Пленарная сессия", "Экспертные панели", "Вечерний networking"],
    audience: "Открытое мероприятие для участников и гостей клуба.",
  },
  {
    slug: "charity-culture-night",
    title: "Благотворительный культурный вечер",
    date: "13 декабря 2025",
    time: "19:30–23:00",
    place: "Пенза, Art Hall",
    city: "Пенза",
    format: "Оффлайн",
    category: "Культурные события",
    projectSlug: "prazdnik-v-kazhdyj-dom",
    status: "past",
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
    short: "Музыка, искусство и сбор средств в поддержку образовательных проектов.",
    program: ["Камерный концерт", "Арт-аукцион", "Партнерские выступления"],
    audience: "Для участников и партнеров EVTENIA.",
  },
];

const posts = [
  { slug: "march-community-results", title: "Как прошёл март в EVTENIA: 4 встречи и 120 новых знакомств", category: "Новости клуба", date: "20 марта 2026", excerpt: "Подвели итоги месяца и собрали лучшие моменты встреч в одном материале." },
  { slug: "career-shifts", title: "Бизнес и карьера: как мягко расти в период изменений", category: "Бизнес и карьера", date: "16 марта 2026", excerpt: "Практические подходы от участников сообщества, которые масштабируют проекты без выгорания." },
  { slug: "interview-founder", title: "Интервью с основателем EVTENIA: зачем нам культура сообщества", category: "Интервью", date: "10 марта 2026", excerpt: "О миссии сообщества, ценностях и том, как рождаются сильные связи." },
  { slug: "event-announcement-april", title: "Анонс апреля: нетворкинг-вечер и лаборатория выступлений", category: "Мероприятия", date: "5 марта 2026", excerpt: "Две новые встречи, на которых можно заявить о себе и найти партнеров." },
  { slug: "member-story-anastasia", title: "История участника: как сообщество помогло запустить второй бизнес", category: "Истории участников", date: "28 февраля 2026", excerpt: "Личный кейс о поддержке, окружении и смелости выйти на новый уровень." },
  { slug: "wellbeing-habits", title: "Полезные материалы: 7 ритуалов ресурсного утра", category: "Развитие", date: "21 февраля 2026", excerpt: "Небольшие привычки, которые помогают сохранять ясность и энергию." },
  { slug: "partners-open-call", title: "Открыт набор партнёров на летнюю программу клуба", category: "Новости клуба", date: "15 февраля 2026", excerpt: "Приглашаем бренды и экспертов к совместным образовательным форматам." },
  { slug: "safe-networking", title: "Как строить нетворкинг в безопасной поддерживающей среде", category: "Полезные материалы", date: "10 февраля 2026", excerpt: "Принципы общения и форматы знакомств, которые работают вдолгую." },
];

const galleryAlbums = [
  {
    title: "Весенний business brunch",
    date: "март 2026",
    cover: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Камерный вечер историй участников",
    date: "февраль 2026",
    cover: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Осенний форум EVTENIA",
    date: "ноябрь 2025",
    cover: "https://images.unsplash.com/photo-1510070009289-b5bc34383727?auto=format&fit=crop&w=1000&q=80",
  },
];

const testimonials = [
  { quote: "Я пришла за новыми контактами, а получила сильное окружение и поддержку на каждом этапе.", name: "Екатерина С.", role: "предприниматель" },
  { quote: "В EVTENIA комфортно говорить о росте, сомнениях и идеях — тебя действительно слышат.", name: "Мария Л.", role: "участник сообщества" },
  { quote: "После двух встреч я нашла партнера для нового проекта и уверенность выступать публично.", name: "Анна Р.", role: "маркетинг-консультант" },
  { quote: "Очень эстетичная и умная среда: без шума, но с реальными результатами.", name: "Ольга К.", role: "основатель бренда" },
];

const teamMembers = {
  founder: {
    name: "Евгения Тарасова",
    role: "Основатель сообщества EVTENIA",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    bio: "Формирует стратегию развития сообщества, курирует стандарты качества клубных программ и партнерств.",
  },
  members: [
    { name: "Мария Соколова", role: "Куратор событий", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80" },
    { name: "Алина Петрова", role: "Руководитель московского отделения", photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80" },
    { name: "Марина Орлова", role: "Куратор образовательных направлений", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" },
  ],
};


const partners = [
  { name: "Счастливый дом", href: "https://home58.ru/" },
  { name: "Строительство домов Evtenia", href: "https://dom.evtenia.ru/" },
  { name: "Агентство недвижимости Evtenia", href: "https://evtenia.ru/" },
  { name: "Блог основателя АНО Evtenia", href: "https://vk.com/greatbusinesslady" },
  { name: "Опора России Пензенское отделение", href: "https://opora58.ru/" },
  { name: "Фитнес для мозга", href: "https://taplink.cc/elenaakozedub" },
  { name: "Ювелирка Evtnenia", href: "https://evtenia.store/" },
];

const pageSeo = {
  "/": { title: "EVTENIA — клуб для всех, события и развитие", description: "Современное сообщество EVTENIA: мероприятия, новости, нетворкинг, поддержка и заявки на участие." },
  "/about": { title: "О нас — EVTENIA", description: "Миссия, ценности и форматы клуба EVTENIA для всех, кто растёт в бизнесе и жизни." },
  "/events": { title: "Мероприятия EVTENIA", description: "Календарь ближайших и прошедших мероприятий клуба EVTENIA: бизнес, нетворкинг, обучение." },
  "/poster": { title: "Мероприятия EVTENIA", description: "Календарь ближайших и прошедших мероприятий клуба EVTENIA: бизнес, нетворкинг, обучение." },
  "/regions": { title: "Регионы EVTENIA", description: "Региональные отделения EVTENIA: руководители, контакты и новости по городам." },
  "/news": { title: "Новости и блог EVTENIA", description: "Новости клуба, статьи, интервью и полезные материалы для участников EVTENIA." },
  "/gallery": { title: "Галерея EVTENIA", description: "Фотоотчеты и атмосфера мероприятий сообщества EVTENIA." },
  "/join": { title: "Вступить в EVTENIA", description: "Подать заявку на участие в сообществе EVTENIA: анкета, форматы участия и преимущества." },
  "/contacts": { title: "Контакты EVTENIA", description: "Контакты, соцсети, обратная связь и партнерские запросы клуба EVTENIA." },
  "/privacy": { title: "Политика конфиденциальности — EVTENIA", description: "Политика обработки персональных данных сайта EVTENIA." },
  "/consent": { title: "Согласие на обработку персональных данных — EVTENIA", description: "Согласие пользователя на обработку персональных данных для заявок EVTENIA." },
  "/partners": { title: "Партнеры EVTENIA", description: "Партнеры и открытые форматы сотрудничества с сообществом EVTENIA." },
  "/stories": { title: "Истории участников EVTENIA", description: "Отзывы и истории участников сообщества EVTENIA." },
  "/faq": { title: "FAQ EVTENIA", description: "Ответы на частые вопросы о вступлении и участии в клубе EVTENIA." },
  "/team": { title: "Команда EVTENIA", description: "Основатель и команда, которые создают сообщество EVTENIA." },
  "/admin": { title: "Админка EVTENIA (демо)", description: "Демо-панель управления контентом EVTENIA." },
  "/housing-committee": { title: "Комитет по жилищной политике", description: "Страница комитета по жилищной политике и городским инициативам." },
  "/courses": { title: "Курсы/программы EVTENIA", description: "Курсы и программы EVTENIA: временная страница направления." },
};

const brainFitnessPhoto = "https://s10.iimage.su/s/07/gTXiVvPxBnnvlg2wAk0sLIFUmzpmklLQpUZQz95YX.jpg";
const brainFitnessGallery = [
  "https://s10.iimage.su/s/08/g1l3vhkxbkBjzFJSvljZzSBJo0nUZI2bBo1Bf633l.jpg",
  "https://s10.iimage.su/s/08/gUDySdSxdaipYcha04T26GCGYb8UcGfIltzUzT4BB.jpg",
  "https://s10.iimage.su/s/08/gzRQx7GxmshYzD0hTAJGtgCTliaJpZ9Dp8qIoMqLv.jpg",
];

const mediaProjects = [
  { slug: "interview-evtenia", title: "Интервью с Evtenia", description: "Серия глубоких бесед с героинями о личном опыте, бизнесе и выборе." },
  { slug: "vkusno-s-evtenia", title: "Вкусно с Evtenia", description: "Видеопроект о вкусе к жизни: еда, эстетика, общение и истории людей." },
  { slug: "blagodaryu-s-evtenia", title: "Благодарю с Evtenia", description: "Проект про благодарность, поддержку и внутреннюю устойчивость в ежедневности." },
];

const clubProjects = [
  { slug: "fitnes-dlya-mozga", title: "Фитнес для мозга" },
  { slug: "networking", title: "Нетворкинг" },
  { slug: "sozdanie-meropriyatij", title: "Создание мероприятий" },
  { slug: "intellekt-mental-health", title: "Интеллектуальное развитие и ментальное здоровье" },
  { slug: "business-i-zhenshina", title: "Бизнес и развитие" },
  { slug: "perezagruzka", title: "Перезагрузка" },
  { slug: "prazdnik-v-kazhdyj-dom", title: "Праздник в каждый дом" },
  { slug: "psihologiya-otnoshenij", title: "Психология отношений" },
  { slug: "prekrasnaya-ya", title: "Прекрасная Я" },
];

const projectDetails = {
  "fitnes-dlya-mozga": {
    lead: {
      name: "Елена Козедуб",
      photo: brainFitnessPhoto,
      bio: "Автор и ведущая тренинга «Фитнес для мозга». Помогает развивать память, мышление, воображение и сохранять ясность в потоке информации.",
    },
    description: "В наше время принято тренировать своё тело. И это замечательно! Но и наш мозг нуждается в тренировке. К сожалению, люди часто спохватываются и начинают что-либо делать для развития умственных способностей слишком поздно.",
    photo: brainFitnessPhoto,
    gallery: brainFitnessGallery,
    forWhom: [
      "забываете бытовые мелочи",
      "не помните, кто звонил и о чем шёл разговор",
      "испытываете трудности при запоминании",
      "теряетесь в потоке информации и чувствуете перенапряжение",
      "живёте в режиме многозадачности",
      "не знаете, как эффективно помочь в учёбе детям и внукам",
      "потеряли творческое вдохновение",
    ],
    results: [
      "освоите техники развития памяти, мышления и воображения",
      "научитесь поддерживать свой мозг в тонусе",
      "узнаете, как работать без выгораний и стрессов",
      "освоите упражнения по восстановлению энергии",
      "сможете помогать детям и внукам в учёбе",
      "получите заряд мотивации и освоите эффективные методы для формирования полезных привычек",
    ],
    programNote: "Курс состоит из 30 заданий, доступ к обучающей платформе рассчитан на 60 дней. В расписании — каждодневные задания на обучающей платформе с обязательной обратной связью.",
    testimonials: ["Стало легче запоминать информацию и держать фокус.", "Упражнения помогли встроить тренировки мозга в ежедневный ритм."],
  },
  "networking": {
    leaders: [
      { name: "Кислякова Евгения", role: "сооснователь АНО" },
      { name: "Иванчина Светлана", role: "сооснователь АНО" },
    ],
    description: [
      "Нетворкинг — направление для тех, кто хочет расширять круг общения осознанно и без случайной суеты. На встречах участники учатся коротко рассказывать о себе, формулировать запросы, находить точки пересечения и превращать первое знакомство в полезный контакт. Это не формат случайного обмена визитками, а спокойная среда, где можно понять, чем вы можете быть полезны друг другу.",
      "Направление подходит предпринимателям, экспертам, специалистам, представителям городских проектов и всем, кому важны деловые связи, обмен опытом и поддерживающая коммуникация. Здесь можно найти партнера для проекта, получить обратную связь на идею, увидеть новые возможности, потренировать самопрезентацию и научиться задавать вопросы так, чтобы разговор быстро становился содержательным.",
      "Особое внимание уделяется культуре общения: уважению к времени собеседника, ясности запросов, экологичному follow-up и умению поддерживать контакт после встречи. Такой нетворкинг помогает создавать связи, которые не заканчиваются на одном мероприятии, а становятся основой для будущих коллабораций, рекомендаций и совместных инициатив."
    ],
    photo: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    testimonials: ["Нашла двух партнеров для запуска сезонной линейки.", "Формат быстрых диалогов помог собраться и смело говорить о проекте."],
  },
  "sozdanie-meropriyatij": {
    leaders: [
      { name: "Кислякова Евгения", role: "сооснователь АНО" },
      { name: "Иванчина Светлана", role: "сооснователь АНО" },
      { name: "Козедуб Елена", role: "руководитель направления «Фитнес для мозга»" },
    ],
    description: [
      "Создание мероприятий — практическое направление о том, как превращать идею встречи в понятный, красивый и полезный формат. Участники разбирают путь от цели события и портрета аудитории до сценария, тайминга, команды, площадки, партнеров, продвижения и пост-аналитики. В фокусе не только организация, но и смысл: зачем событие проводится и какой опыт должен остаться у гостей.",
      "Направление подходит тем, кто хочет организовывать деловые, образовательные, культурные, семейные или благотворительные события без хаоса и лишнего напряжения. Здесь можно научиться собирать программу, распределять роли, договариваться с партнерами, продумывать визуальную часть, управлять ожиданиями участников и заранее видеть слабые места проекта.",
      "Отдельное внимание уделяется атмосфере и заботе о людях: навигации, коммуникации до и после встречи, вовлечению гостей, качественной модерации и финальному впечатлению. Хорошее мероприятие — это не просто дата в календаре, а продуманная история, в которой каждый элемент работает на общую задачу и помогает людям встретиться по-настоящему."
    ],
    photo: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    testimonials: ["Собрала первое мероприятие на 60 гостей без стресса.", "Появилась четкая система подготовки и работы с партнерами."],
  },
  "intellekt-mental-health": {
    description: [
      "Интеллектуальное развитие и ментальное здоровье — направление о ясности мышления, устойчивости и бережной работе с внутренним ресурсом. Здесь можно обсуждать привычки, которые помогают сохранять фокус, снижать перегрузку, лучше планировать день и восстанавливаться после интенсивных периодов. Направление соединяет интерес к знаниям с вниманием к состоянию человека.",
      "Форматы могут включать лекции, практические встречи, интеллектуальные дискуссии, упражнения на внимание, разбор повседневных сценариев и разговоры о том, как не терять себя в потоке информации. Участники могут исследовать, что помогает им думать яснее, принимать решения спокойнее, удерживать баланс между задачами и отдыхом, а также замечать первые признаки усталости.",
      "Главная идея направления — развиваться без давления. Интеллектуальный рост не должен превращаться в бесконечную гонку за продуктивностью, а забота о ментальном здоровье не ограничивается кризисными моментами. Это регулярная практика внимания к себе, своему ритму, качеству коммуникации и способности оставаться включенным в жизнь без постоянного перенапряжения."
    ],
    photo: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    testimonials: ["Снизился уровень тревоги, появилось больше фокуса и энергии.", "Встречи помогли выстроить здоровый ритм работы и отдыха."],
  },
  "business-i-zhenshina": {
    description: [
      "Бизнес и развитие — направление для предпринимателей, экспертов и специалистов, которым важно расти системно. В центре внимания — стратегия, упаковка продукта, управление командой, личный бренд, партнерства, продажи и устойчивость в периоды изменений. Это пространство для тех, кто хочет не просто больше делать, а лучше понимать, куда движется проект и какие решения действительно помогают росту.",
      "На встречах можно обсуждать практические вопросы: как формулировать ценность продукта, выстраивать коммуникацию с клиентами, искать партнеров, распределять задачи, проверять гипотезы и видеть точки роста. Важная часть направления — обмен опытом между участниками, потому что многие рабочие решения рождаются не в теории, а в честном разговоре о реальных ситуациях, ошибках и находках.",
      "Подход направления спокойный и прикладной: без жестких схем, давления и универсальных рецептов. Здесь важно учитывать масштаб проекта, личный ритм, ресурсы команды и долгосрочные цели. Бизнес рассматривается как часть жизни, где результат, репутация, устойчивость и качество отношений с людьми одинаково значимы."
    ],
    photo: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    testimonials: ["За 2 месяца пересобрала воронку и увеличила заявки.", "Получила работающую систему делегирования и уверенность в роли лидера."],
  },
  "perezagruzka": {
    leaders: [
      { name: "Кислякова Евгения", role: "сооснователь АНО" },
    ],
    description: [
      "Перезагрузка — мягкое направление для восстановления сил, внимания и внутреннего равновесия. Оно подходит тем, кто чувствует усталость от постоянной многозадачности, хочет сменить фокус, выдохнуть и вернуться к делам в более спокойном темпе. Здесь важна не скорость изменений, а возможность остановиться, заметить свое состояние и выбрать бережный способ восстановиться.",
      "Встречи могут включать разговорные форматы, телесные и дыхательные практики, упражнения на осознанность, спокойные обсуждения привычек и небольшие задания для повседневной жизни. Участники могут исследовать, что забирает энергию, какие ритуалы помогают возвращать опору, как выстраивать границы и как не доводить себя до состояния, когда отдых становится вынужденной паузой.",
      "Направление не обещает мгновенных решений и не требует от участников одинакового темпа. Его задача — создать безопасное пространство, где можно честно говорить об усталости, учиться слышать свои потребности и постепенно собирать личную систему восстановления. Перезагрузка здесь понимается как внимательное возвращение к себе, а не как еще один пункт в списке дел."
    ],
    photo: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    testimonials: ["После программы вернулась мотивация и спокойный рабочий темп.", "Научилась восстанавливаться без чувства вины."],
  },
  "prazdnik-v-kazhdyj-dom": {
    description: [
      "Праздник в каждый дом — благотворительное направление о внимании, заботе и маленьких событиях, которые делают жизнь теплее. Проект помогает объединять людей вокруг добрых инициатив: поддерживать семьи, создавать праздничную атмосферу, собирать подарки, организовывать творческие и городские форматы. В центре — простая идея, что праздник может быть не роскошью, а способом почувствовать участие и поддержку.",
      "Это направление для тех, кто хочет участвовать в социальных проектах не формально, а с живым человеческим смыслом. Здесь важны прозрачность, партнерство, уважение к адресатам помощи и аккуратная организация процессов. Участники могут включаться по-разному: помогать с идеями, ресурсами, коммуникацией, упаковкой, логистикой, мероприятиями или распространением информации.",
      "Проект строится вокруг небольших, но конкретных действий. Иногда именно открытка, подарок, семейная встреча, творческий мастер-класс или внимание к конкретной истории создают ощущение праздника. Такой формат помогает развивать культуру взаимопомощи и показывает, что вклад каждого человека может стать частью большого доброго результата."
    ],
    photo: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
    testimonials: ["Впервые организовала благотворительный вечер с партнерами.", "Проект помог включиться в городские социальные инициативы."],
  },
  "psihologiya-otnoshenij": {
    leaders: [
      { name: "Иванчина Светлана", role: "сооснователь АНО" },
    ],
    description: [
      "Психология отношений — направление о коммуникации, границах, доверии и уважительном диалоге. Оно помогает лучше понимать себя и других, замечать повторяющиеся сценарии, говорить о потребностях спокойнее и выстраивать контакт без давления. Темы могут касаться семьи, партнерства, дружбы, рабочих отношений и отношения к самому себе.",
      "Форматы направления могут включать лекции, обсуждения, практические упражнения и разбор типичных ситуаций, в которых людям бывает сложно договориться, услышать друг друга или сохранить спокойствие. Участники могут исследовать, как формируются ожидания, почему возникают конфликты, как говорить о сложном без обвинений и как поддерживать близость там, где есть разные взгляды и личные границы.",
      "В основе направления — практичность, бережность и внимание к реальной жизни. Здесь нет задачи оценивать людей или давать универсальные советы. Важнее научиться задавать себе честные вопросы, замечать свои реакции и постепенно выбирать более зрелые способы общения, чтобы в отношениях становилось больше ясности, уважения и поддержки."
    ],
    photo: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    testimonials: ["Улучшилось общение с партнером и снизилось количество конфликтов.", "Получила ясные инструменты для спокойного диалога."],
  },
  "prekrasnaya-ya": {
    description: [
      "Прекрасная Я — направление про образ, уверенность, самопрезентацию и бережное отношение к себе. Здесь внешний стиль рассматривается не отдельно, а вместе с внутренним состоянием, голосом, привычками и ощущением собственной ценности. Это пространство не про стандарты красоты, а про индивидуальность и поиск образа, который поддерживает характер, цели и личный ритм.",
      "Участники могут исследовать, как одежда, визуальная подача, речь, пластика и поведение помогают проявляться в жизни и работе спокойнее и точнее. Важная часть направления — разобраться, какие решения действительно подходят человеку, а какие навязаны внешними ожиданиями. Такой подход помогает собирать образ не для соответствия чужим правилам, а для ощущения целостности и уверенности.",
      "Направление может включать встречи про стиль, самопрезентацию, уход за собой, публичность, внутреннюю опору и уважительный разговор с собой. Здесь можно мягко пересмотреть привычки, убрать лишнее напряжение вокруг внешности и найти способы выражать себя так, чтобы образ становился не маской, а поддержкой в повседневной жизни."
    ],
    photo: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    testimonials: ["Собрала базовый гардероб под задачи и стиль жизни.", "Стало легче проявляться публично и говорить о себе уверенно."],
  },
};

const regionalBranches = [
  {
    slug: "penza",
    city: "Пенза",
    cover: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
    leaders: [
      { name: "Евгения Тарасова", role: "Руководитель отделения", contact: "+7 (900) 123-45-67 · @evtenia_penza", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80", socials: [vkUrl] },
      { name: "Марина Орлова", role: "Куратор программ", contact: "+7 (900) 765-43-21 · @marina_orlova", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80", socials: [vkUrl] },
    ],
    news: [
      {
        slug: "may-business-program",
        title: "Открыт набор в майский поток «Бизнес и развитие»",
        date: "14 апреля 2026",
        excerpt: "Новый поток стартует 3 мая и включает мастермайнды, менторские встречи и закрытый чат.",
        body: "Руководитель отделения открыл прием заявок до 30 апреля. В программе — 4 офлайн-встречи, 2 онлайн-сессии с экспертами и индивидуальный разбор целей участников.",
      },
      {
        slug: "city-community-chat",
        title: "Запущен городской чат участников и партнеров отделения",
        date: "8 апреля 2026",
        excerpt: "Внутри чата публикуются локальные анонсы, запросы на партнерства и новости по проектам.",
        body: "Куратор программ модерирует тематические ветки и публикует еженедельный дайджест возможностей: вакансии, коллаборации, анонсы мероприятий и образовательные форматы.",
      },
    ],
  },
  {
    slug: "moscow",
    city: "Москва",
    cover: "https://images.unsplash.com/photo-1524041255072-7da0525d6b30?auto=format&fit=crop&w=1000&q=80",
    leaders: [
      { name: "Алина Петрова", role: "Руководитель отделения", contact: "+7 (901) 222-11-00 · @evtenia_msk", photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=500&q=80", socials: [vkUrl] },
    ],
    news: [
      {
        slug: "june-leadership-forum",
        title: "Анонсирован форум «Лидерство и развитие» на июнь",
        date: "11 апреля 2026",
        excerpt: "Форум объединит предпринимателей, управленцев и экспертов по карьерному росту.",
        body: "Программа форума включает панельные дискуссии, нетворкинг-сессии и практикум по развитию личного бренда. Регистрация откроется в конце апреля.",
      },
      {
        slug: "mentorship-cycle",
        title: "Добавлен цикл встреч с менторами для новых резидентов",
        date: "2 апреля 2026",
        excerpt: "Серия из 6 встреч для адаптации в сообществе и ускоренного запуска личных целей.",
        body: "Участницы получают поддержку от менторов по бизнесу, коммуникациям и личной эффективности. Формат — офлайн + онлайн сопровождение в закрытой группе.",
      },
    ],
  },
];

function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const goTo = (next) => {
    if (next !== path) {
      window.history.pushState({}, "", next);
      setPath(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return { path, goTo };
}

function Layout({ children, goTo, path, mobileMenuOpen, setMobileMenuOpen }) {
  const [cookieAccepted, setCookieAccepted] = useState(false);

  const nav = [
    ["/", "Главная"],
    ["/poster", "Мероприятия"],
    ["/stories", "Отзывы"],
    ["/partners", "Партнеры"],
    ["/contacts", "Контакты"],
    ["/regions", "Регионы"],
    ["/news", "Новости"],
  ];

  const serviceNav = [
    ["/about", "О нас"],
    ["/team", "Команда"],
  ];

  const SocialIcon = ({ label, href, children }) => (
    <a className="social-link" href={href} target="_blank" rel="noreferrer" aria-label={label}>
      {children}
    </a>
  );


  return (
    <div className="site">
      <header className={`header ${mobileMenuOpen ? "menu-open" : ""}`}>
        <div className="header-founder header-founder-left">
          <img src={founderLeftPhoto} alt="Основатель EVTENIA" />
        </div>

        <div className="header-center">
          <div className="header-main">
            <button className="logo logo-stacked" onClick={() => goTo("/")}>
              <span className="logo-mark" aria-hidden="true">✦</span>
              <span>EVTENIA</span>
              <small>проекты для роста и развития</small>
            </button>

            <nav className="nav-main" aria-label="Основная навигация">
              {nav.map(([href, label]) => (
                <button
                  key={href}
                  className={`nav-link ${path === href || (href === "/poster" && path.startsWith("/events")) ? "active" : ""}`}
                  onClick={() => {
                    goTo(href);
                    setMobileMenuOpen(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="header-actions">
              <div className="socials">
                <SocialIcon label="VK" href={vkUrl}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.8 7.5c.12 5.79 3.02 9.27 8.11 9.27h.29v-3.3c1.86.19 3.25 1.55 3.82 3.3h2.63c-.74-2.7-2.69-4.2-3.91-4.77 1.22-.7 2.93-2.4 3.33-4.5h-2.4c-.52 1.7-2.1 3.4-3.47 3.54V7.5h-2.4v6.2C9.4 13.36 7.6 11.5 7.52 7.5H4.8Z" fill="currentColor" /></svg>
                </SocialIcon>
                <SocialIcon label="MAX" href={maxUrl}>
                  <span className="max-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <rect x="2.5" y="2.5" width="19" height="19" rx="6" fill="currentColor" />
                      <path d="M7.5 15V9.2h1.45l2.05 3.08 2.04-3.08h1.46V15h-1.47v-3.36L11 14.8l-2.08-3.17V15H7.5Zm8.25 0 2.1-2.96-1.96-2.84h1.71l1.11 1.7 1.13-1.7h1.68l-1.96 2.84L21.66 15h-1.71l-1.25-1.9L17.45 15h-1.7Z" fill="#fff" />
                    </svg>
                  </span>
                </SocialIcon>
                <SocialIcon label="Rutube" href={rutubeUrl}>
                  <span className="rutube-icon" aria-hidden="true">Ru</span>
                </SocialIcon>
              </div>
              <button
                className="btn btn-small header-cta"
                onClick={() => {
                  goTo("/join");
                  setMobileMenuOpen(false);
                }}
              >
                Подать заявку
              </button>
            </div>

            <button className="btn btn-small cta-mobile" onClick={() => goTo("/join")}>Заявка</button>
            <button
              className={`burger ${mobileMenuOpen ? "open" : ""}`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Открыть меню"
            >
              ☰
            </button>
          </div>

          <div className="header-catalog" aria-label="Быстрые разделы">
            <details className="catalog-group video-catalog" open>
              <summary>Видеопроекты</summary>
              <div className="catalog-panel video-panel">
                {mediaProjects.map((item) => (
                  <button key={item.slug} className={`catalog-link ${path === `/video/${item.slug}` ? "active" : ""}`} onClick={() => { goTo(`/video/${item.slug}`); setMobileMenuOpen(false); }}>
                    {item.title}
                  </button>
                ))}
              </div>
            </details>

            <details className="catalog-group projects-catalog" open>
              <summary>Проекты</summary>
              <div className="catalog-panel projects-panel">
                {clubProjects.filter((item) => item.slug !== "prazdnik-v-kazhdyj-dom").map((item) => (
                  <button key={item.slug} className={`catalog-link ${path === `/projects/${item.slug}` ? "active" : ""}`} onClick={() => { goTo(`/projects/${item.slug}`); setMobileMenuOpen(false); }}>
                    {item.title}
                  </button>
                ))}
              </div>
            </details>

            <details className="catalog-group charity-catalog" open>
              <summary>Благотворительность</summary>
              <div className="catalog-panel single-panel">
                <button className={`catalog-link special-catalog-link ${path === `/projects/prazdnik-v-kazhdyj-dom` ? "active" : ""}`} onClick={() => { goTo(`/projects/prazdnik-v-kazhdyj-dom`); setMobileMenuOpen(false); }}>
                  Благотворительный проект
                </button>
              </div>
            </details>

            <details className="catalog-group committee-catalog" open>
              <summary>Комитет</summary>
              <div className="catalog-panel single-panel">
                <button className={`catalog-link ${path === `/housing-committee` ? "active" : ""}`} onClick={() => { goTo(`/housing-committee`); setMobileMenuOpen(false); }}>
                  Комитет по жилищной политике
                </button>
              </div>
            </details>

            <details className="catalog-group programs-catalog" open>
              <summary>Курсы</summary>
              <div className="catalog-panel single-panel">
                <button className={`catalog-link ${path === `/courses` ? "active" : ""}`} onClick={() => { goTo(`/courses`); setMobileMenuOpen(false); }}>
                  Курсы/программы
                </button>
              </div>
            </details>
          </div>
        </div>

        <div className="header-founder header-founder-right">
          <img src={founderRightPhoto} alt="Основатель EVTENIA" />
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="footer-col">
          <h4>EVTENIA</h4>
          <p>Сообщество с проектными направлениями, региональными отделениями и единой афишей событий.</p>
        </div>
        <div className="footer-col">
          <h5>Навигация</h5>
          <button onClick={() => goTo("/")}>Главная</button>
          <button onClick={() => goTo("/poster")}>Мероприятия</button>
          <button onClick={() => goTo("/regions")}>Регионы</button>
          <button onClick={() => goTo("/news")}>Новости</button>
          <button onClick={() => goTo("/team")}>Команда</button>
        </div>
        <div className="footer-col">
          <h5>Участие</h5>
          <button onClick={() => goTo("/join")}>Подать заявку</button>
          <button onClick={() => goTo("/partners")}>Партнерство</button>
          <button onClick={() => goTo("/contacts")}>Контакты</button>
        </div>
        <div className="footer-col">
          <h5>Документы</h5>
          <button onClick={() => goTo("/privacy")}>Политика конфиденциальности</button>
          <button onClick={() => goTo("/consent")}>Согласие на обработку данных</button>
        </div>
      </footer>
      {!cookieAccepted && (
        <div className="cookie-banner">
          <p>Мы используем cookies для улучшения работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с политикой конфиденциальности.</p>
          <div className="cookie-actions">
            <button className="btn btn-small" onClick={() => setCookieAccepted(true)}>Принять</button>
            <button className="btn btn-small btn-ghost" onClick={() => goTo("/privacy")}>Подробнее</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Hero({ goTo }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Клуб для всех и медиаплатформа</p>
        <h1>EVTENIA — пространство развития, знакомств и сильного окружения</h1>
        <p className="lead">События, бизнес-встречи, образовательные форматы и поддерживающее сообщество для всех, кто хочет расти в своём темпе и масштабе.</p>
        <div className="actions">
          <button className="btn" onClick={() => goTo("/poster")}>Смотреть афишу</button>
          <button className="btn btn-ghost" onClick={() => goTo("/join")}>Оставить заявку</button>
        </div>
        <ul className="bullets">
          <li>открытые встречи</li><li>бизнес-сообщество</li><li>развитие и поддержка</li><li>события и знакомства</li>
        </ul>
      </div>
      <img className="hero-founder hero-founder-right" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80" alt="Основатель EVTENIA" />
    </section>
  );
}

function Home({ goTo }) {
  return (
    <div className="page">
      <Hero goTo={goTo} />
      <section>
        <h2>Что такое EVTENIA</h2>
        <p>EVTENIA — это сообщество с региональными отделениями, проектными направлениями и единой афишей событий по городам.</p>
      </section>

      <section>
        <div className="section-head"><h2>Ближайшие мероприятия</h2><button onClick={() => goTo("/poster")}>Вся афиша →</button></div>
        <div className="cards grid-3">{events.filter((e) => e.status === "future").slice(0, 4).map((e) => <EventCard key={e.slug} event={e} goTo={goTo} />)}</div>
      </section>

      <section>
        <div className="section-head"><h2>Направления</h2><button onClick={() => goTo("/projects/networking")}>Открыть направления →</button></div>
        <div className="cards grid-3">
          {clubProjects.slice(0, 6).map((project) => <ProjectPreviewCard key={project.slug} project={project} goTo={goTo} />)}
        </div>
      </section>

      <section>
        <div className="section-head"><h2>Регионы</h2><button onClick={() => goTo("/regions")}>Все отделения →</button></div>
        <div className="cards grid-2">
          {regionalBranches.map((branch) => (
            <article className="card" key={branch.slug}>
              <img src={branch.cover} alt={branch.city} />
              <h3><button className="title-link" onClick={() => goTo(`/regions/${branch.slug}`)}>{branch.city}</button></h3>
              <p>Руководители: {branch.leaders.map((leader) => leader.name).join(", ")}.</p>
              <button onClick={() => goTo(`/regions/${branch.slug}`)}>Карточка отделения</button>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head"><h2>Новости</h2><button onClick={() => goTo("/news")}>Все новости →</button></div>
        <div className="cards grid-3">{posts.slice(0, 3).map((post) => <PostCard key={post.slug} post={post} goTo={goTo} />)}</div>
      </section>

      <section>
        <div className="section-head"><h2>Команда</h2><button onClick={() => goTo("/team")}>Подробнее о команде →</button></div>
        <article className="card founder-card">
          <div className="founder-layout">
            <img src={teamMembers.founder.photo} alt={teamMembers.founder.name} />
            <div>
              <p className="eyebrow">Основатель</p>
              <h3>{teamMembers.founder.name}</h3>
              <p>{teamMembers.founder.role}</p>
            </div>
          </div>
        </article>
      </section>

      <JoinForm compact goTo={goTo} />

      <section className="cta-final">
        <h2>Присоединяйтесь к сообществу EVTENIA</h2>
        <p>Вступайте в клуб, приходите на мероприятия и найдите среду, в которой удобно расти.</p>
        <button className="btn" onClick={() => goTo("/join")}>Вступить в клуб</button>
      </section>
    </div>
  );
}

function EventCard({ event, goTo }) {
  return (
    <article className="card event-card">
      <img src={event.image} alt={event.title} />
      <small>{event.date} · {event.format}</small>
      <h3><button className="title-link" onClick={() => goTo(`/events/${event.slug}`)}>{event.title}</button></h3>
      <p>{event.short}</p>
      <button onClick={() => goTo(`/events/${event.slug}`)}>Подробнее</button>
    </article>
  );
}

function ProjectPreviewCard({ project, goTo }) {
  const details = projectDetails[project.slug];
  const description = Array.isArray(details?.description) ? details.description[0] : details?.description;
  const leadersText = details?.leaders?.map((leader) => `${leader.name} — ${leader.role}`).join("; ");
  return (
    <article className="card">
      {details?.photo && <img src={details.photo} alt={project.title} />}
      <h3><button className="title-link" onClick={() => goTo(`/projects/${project.slug}`)}>{project.title}</button></h3>
      <p>{details ? description : "Описание направления в разработке."}</p>
      {details?.lead && <small>Ведет: {details.lead.name}</small>}
      {leadersText && <small>Руководители: {leadersText}</small>}
      <button onClick={() => goTo(`/projects/${project.slug}`)}>Открыть направление</button>
    </article>
  );
}

function PostCard({ post, goTo }) {
  return (
    <article className="card post-card">
      <small>{post.category} · {post.city ? `${post.city} · ` : ""}{post.date}</small>
      <h3><button className="title-link" onClick={() => goTo(post.href || `/news/${post.slug}`)}>{post.title}</button></h3>
      <p>{post.excerpt}</p>
      <button onClick={() => goTo(post.href || `/news/${post.slug}`)}>Читать</button>
    </article>
  );
}

function EventsPage({ goTo }) {
  const [status, setStatus] = useState("all");
  const [project, setProject] = useState("all");
  const [city, setCity] = useState("all");
  const projects = ["all", ...clubProjects.map((p) => p.slug)];
  const cities = ["all", ...new Set(events.map((e) => e.city))];
  const filtered = events.filter((e) =>
    (status === "all" ? true : e.status === status)
    && (project === "all" ? true : e.projectSlug === project)
    && (city === "all" ? true : e.city === city)
  );
  return (
    <div className="page">
      <h1>Мероприятия EVTENIA</h1>
      <div className="filters">
        <label>Статус <select value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">Все</option><option value="future">Будущие</option><option value="past">Прошедшие</option></select></label>
        <label>Направление
          <select value={project} onChange={(e) => setProject(e.target.value)}>
            {projects.map((p) => <option key={p} value={p}>{p === "all" ? "Все направления" : clubProjects.find((item) => item.slug === p)?.title}</option>)}
          </select>
        </label>
        <label>Город
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {cities.map((item) => <option key={item} value={item}>{item === "all" ? "Все города" : item}</option>)}
          </select>
        </label>
      </div>
      <div className="cards grid-3">{filtered.map((event) => <EventCard key={event.slug} event={event} goTo={goTo} />)}</div>
    </div>
  );
}

function EventDetail({ slug, goTo }) {
  const event = events.find((e) => e.slug === slug);
  if (!event) return <NotFound goTo={goTo} />;
  const related = events.filter((e) => e.slug !== slug).slice(0, 3);
  return (
    <div className="page">
      <div className="breadcrumbs">Главная / Мероприятия / {event.title}</div>
      <h1>{event.title}</h1>
      <img className="detail-cover" src={event.image} alt={event.title} />
      <p><strong>Дата и время:</strong> {event.date}, {event.time}</p>
      <p><strong>Место:</strong> {event.place}</p>
      <p><strong>Кому подойдёт:</strong> {event.audience}</p>
      <p><strong>Описание:</strong> {event.short}</p>
      <h2>Программа</h2>
      <ul>{event.program.map((item) => <li key={item}>{item}</li>)}</ul>
      <h3>Спикеры</h3><p>Основатель клуба, приглашённые эксперты и участники с практическими кейсами.</p>
      <button className="btn" onClick={() => goTo("/join")}>Записаться</button>

      <section>
        <h2>Похожие мероприятия</h2>
        <div className="cards grid-3">{related.map((item) => <EventCard key={item.slug} event={item} goTo={goTo} />)}</div>
      </section>

      <section>
        <h2>FAQ</h2>
        <p><strong>Можно прийти впервые?</strong> Да, формат открыт для новых участников.</p>
        <p><strong>Как подтвердить участие?</strong> После заявки менеджер свяжется с вами в течение 24 часов.</p>
        <p><strong>Условия участия:</strong> Предварительная регистрация обязательна.</p>
      </section>
    </div>
  );
}

function NewsPage({ goTo }) {
  const branchNews = regionalBranches.flatMap((branch) => branch.news.map((item) => ({
    slug: `${branch.slug}-${item.slug}`,
    title: item.title,
    category: "Новости отделений",
    date: item.date,
    city: branch.city,
    excerpt: item.excerpt,
    href: `/regions/${branch.slug}/news/${item.slug}`,
  })));
  const allNews = [...branchNews, ...posts];
  const categories = ["Все", ...new Set(allNews.map((p) => p.category))];
  const cities = ["Все города", ...new Set(branchNews.map((p) => p.city))];
  const [active, setActive] = useState("Все");
  const [city, setCity] = useState("Все города");
  const filtered = allNews.filter((p) =>
    (active === "Все" || p.category === active)
    && (city === "Все города" || p.city === city)
  );
  return (
    <div className="page">
      <h1>Новости и блог</h1>
      <div className="filters">
        <label>Город
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {cities.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <div className="tags">{categories.map((c) => <button key={c} className={active === c ? "active" : ""} onClick={() => setActive(c)}>{c}</button>)}</div>
      <div className="cards grid-3">{filtered.map((post) => <PostCard key={post.slug} post={post} goTo={goTo} />)}</div>
    </div>
  );
}

function NewsDetail({ slug, goTo }) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <NotFound goTo={goTo} />;
  return (
    <div className="page article">
      <div className="breadcrumbs">Главная / Новости / {post.title}</div>
      <h1>{post.title}</h1>
      <p className="lead">{post.category} · {post.date}</p>
      <h2>Почему это важно для сообщества</h2>
      <p>EVTENIA создаёт пространство, где люди находят не только события, но и ощущение опоры, уверенности и практических возможностей для роста.</p>
      <h3>Что внутри материала</h3>
      <ul><li>Ключевые выводы по теме.</li><li>Рекомендации от участников и кураторов клуба.</li><li>Приглашение в следующие форматы сообщества.</li></ul>
      <p>Это демо-материал для презентации контентной структуры и будущего редакционного наполнения клуба.</p>
      <button onClick={() => goTo("/news")}>← К списку материалов</button>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page">
      <h1>О нас</h1>
      <p>EVTENIA создан для людей, которым важно профессиональное развитие, круг поддержки и эстетичное живое сообщество. Мы соединяем деловые, образовательные и lifestyle-форматы в одной платформе.</p>
      <div className="cards grid-2">
        <article className="card"><h3>Миссия</h3><p>Создавать сильную и безопасную среду, где люди растут, знакомятся и реализуют проекты.</p></article>
        <article className="card"><h3>Ценности</h3><p>Уважение, интеллект, поддержка, качество общения и этика партнерства.</p></article>
        <article className="card"><h3>Для кого клуб</h3><p>Для предпринимателей, экспертов, руководителей и активных людей, которые хотят развиваться в сильном окружении.</p></article>
        <article className="card"><h3>Форматы участия</h3><p>Открытые мероприятия, клубное членство, спец-программы и партнёрские коллаборации.</p></article>
      </div>
    </div>
  );
}

function JoinForm({ compact = false, goTo }) {
  return (
    <section className={compact ? "join compact" : "join"}>
      <h2>{compact ? "Написать Президенту" : "Вступить в EVTENIA"}</h2>
      <p>Расскажите о себе — мы подберём подходящий формат участия.</p>
      <form className="form" onSubmit={(e) => { e.preventDefault(); alert("Спасибо! Заявка отправлена."); }}>
        <input required placeholder="Имя" />
        <input required placeholder="Телефон" />
        <input required type="email" placeholder="Email" />
        {!compact && <input placeholder="Город" />}
        {!compact && <input placeholder="Чем занимаетесь" />}
        <select defaultValue=""> 
          <option value="" disabled>Что интересует</option>
          <option>Участие в сообществе</option><option>Партнерство</option><option>Мероприятие</option><option>Консультация</option>
        </select>
        <textarea placeholder="Комментарий" rows="4" />
        <small className="form-note">
          Отправляя форму, вы принимаете{" "}
          <button type="button" className="inline-link" onClick={() => goTo?.("/privacy")}>политику конфиденциальности</button>
          {" "}и{" "}
          <button type="button" className="inline-link" onClick={() => goTo?.("/consent")}>согласие на обработку данных</button>.
        </small>
        <button className="btn" type="submit">Отправить заявку</button>
      </form>
    </section>
  );
}

function JoinPage({ goTo }) {
  return (
    <div className="page">
      <h1>Вступить / подать заявку</h1>
      <div className="cards grid-3">
        <article className="card"><h3>Зачем вступать</h3><p>Чтобы быть в окружении людей, которые растут и поддерживают друг друга.</p></article>
        <article className="card"><h3>Что получает участник</h3><p>Доступ к событиям, закрытым форматам, контенту и клубным знакомствам.</p></article>
        <article className="card"><h3>Форматы участия</h3><p>Гостевой визит, резидентство, партнёрские пакеты и special events.</p></article>
      </div>
      <JoinForm goTo={goTo} />
    </div>
  );
}

function GalleryPage() {
  return (
    <div className="page">
      <h1>Галерея / фотоотчёты</h1>
      <div className="gallery-grid">{galleryAlbums.map((album) => <figure key={album.title}><img src={album.cover} alt={album.title} /><figcaption>{album.title} · {album.date}</figcaption></figure>)}</div>
    </div>
  );
}

function ContactsPage({ goTo }) {
  return (
    <div className="page">
      <h1>Контакты</h1>
      <div className="cards grid-2">
        <article className="card"><h3>Связаться</h3><p>Email: hello@evtenia.club<br />VK: vk.com/evtenia_happy_lady<br />MAX: max.ru/join/fYupCLkr__76YnzZS3QeOWJLGUjh9R2Qw3LRhWolNVY<br />Телефон: 8-841-279-92-79</p></article>
        <article className="card"><h3>Оффлайн-точка</h3><p>Пенза, ул. Карпинского 40А<br />По предварительной записи на мероприятия и встречи.</p></article>
      </div>
      <JoinForm compact goTo={goTo} />
    </div>
  );
}

function SimplePage({ title, text }) {
  return <div className="page"><h1>{title}</h1><p>{text}</p></div>;
}

function VideoProjectPage({ slug }) {
  const project = mediaProjects.find((item) => item.slug === slug);
  if (!project) return <SimplePage title="Проект не найден" text="Попробуйте открыть проект из меню в шапке." />;
  return (
    <div className="page">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <div className="card">
        <h3>Где смотреть</h3>
        <p>Здесь будет размещен плейлист, выпуски и анонсы новых серий на доступных видеоплощадках.</p>
      </div>
    </div>
  );
}

function OrgProjectPage({ slug, goTo }) {
  const project = clubProjects.find((item) => item.slug === slug);
  const details = projectDetails[slug];
  const relatedEvents = events.filter((event) => event.projectSlug === slug);
  if (!project) return <SimplePage title="Проект не найден" text="Попробуйте открыть проект из меню в шапке." />;
  return (
    <div className="page">
      <h1>{project.title}</h1>
      {!details && <p>Демо-страница проекта. Данные для этого направления пока не заполнены.</p>}
      {details && (
        <>
          {details.lead && (
            <section className="card">
              <h3>Кто ведет</h3>
              <div className="leader-block">
                <img src={details.lead.photo} alt={details.lead.name} />
                <div>
                  <p><strong>{details.lead.name}</strong></p>
                  <p>{details.lead.bio}</p>
                  {details.lead.socials?.length > 0 && <p>Соцсети: {details.lead.socials.join(" · ")}</p>}
                  {details.links && (
                    <div className="external-links">
                      {details.links.map((link) => (
                        <a key={link.href} className="btn btn-small" href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
          {details.leaders && (
            <section className="card">
              <h3>Руководители</h3>
              <div className="project-leaders-list">
                {details.leaders.map((leader) => (
                  <p key={`${leader.name}-${leader.role}`}><strong>{leader.name}</strong> — {leader.role}</p>
                ))}
              </div>
            </section>
          )}
          <section className="card project-detail-card">
            <h3>Описание направления</h3>
            {Array.isArray(details.description)
              ? details.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
              : <p>{details.description}</p>}
            {details.forWhom && (
              <>
                <h4>Если вы:</h4>
                <ul>
                  {details.forWhom.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </>
            )}
            {details.results && (
              <>
                <h4>За 1 месяц вы:</h4>
                <ul>
                  {details.results.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </>
            )}
            {details.programNote && <p><strong>{details.programNote}</strong></p>}
            {details.links && (
              <div className="external-links">
                {details.links.map((link) => (
                  <a key={link.href} className="btn" href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
                ))}
              </div>
            )}
          </section>
          {details.gallery && (
            <section>
              <h2>Фотографии направления</h2>
              <div className="gallery-grid">
                {details.gallery.map((photo, idx) => (
                  <figure key={photo}>
                    <img src={photo} alt={`${project.title} ${idx + 1}`} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = details.photo; }} />
                  </figure>
                ))}
              </div>
            </section>
          )}
        </>
      )}
      <section>
        <h2>Мероприятия</h2>
        {relatedEvents.length > 0 ? <div className="cards grid-3">{relatedEvents.map((event) => <EventCard key={event.slug} event={event} goTo={goTo} />)}</div> : <p>Пока нет мероприятий по этому направлению.</p>}
      </section>
      {details && (
        <section>
          <h2>Отзывы</h2>
          <div className="cards grid-2">
            {details.testimonials.map((item) => <article key={item} className="card"><p>“{item}”</p></article>)}
          </div>
        </section>
      )}
    </div>
  );
}

function RegionsPage({ goTo }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredBranches = regionalBranches.filter((branch) => {
    if (!normalizedQuery) return true;
    return (
      branch.city.toLowerCase().includes(normalizedQuery)
      || branch.leaders.some((leader) => leader.name.toLowerCase().includes(normalizedQuery))
    );
  });

  return (
    <div className="page">
      <h1>Регионы</h1>
      <p>Список отделений EVTENIA. Карточки кликабельны и ведут на детальную страницу региона.</p>
      <label className="region-search">
        Поиск по городу или руководителю
        <input
          type="search"
          placeholder="Например: Москва или Алина"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="cards grid-2">
        {filteredBranches.map((branch) => (
          <article
            className="card branch-card clickable"
            key={branch.slug}
            onClick={() => goTo(`/regions/${branch.slug}`)}
            onKeyDown={(e) => e.key === "Enter" && goTo(`/regions/${branch.slug}`)}
            role="button"
            tabIndex={0}
          >
            <img src={branch.cover} alt={`Отделение EVTENIA ${branch.city}`} />
            <h3>{branch.city}</h3>
            <p><strong>Руководители:</strong> {branch.leaders.map((leader) => `${leader.name} (${leader.contact})`).join("; ")}</p>
            <h4>Новости отделения</h4>
            <ul>
              {branch.news.slice(0, 2).map((newsItem) => (
                <li key={newsItem.slug}>
                  <button onClick={(e) => { e.stopPropagation(); goTo(`/regions/${branch.slug}/news/${newsItem.slug}`); }}>
                    {newsItem.title}
                  </button>
                </li>
              ))}
            </ul>
            <button className="btn btn-ghost" onClick={(e) => { e.stopPropagation(); goTo(`/regions/${branch.slug}`); }}>Открыть карточку отделения</button>
          </article>
        ))}
      </div>
      {filteredBranches.length === 0 && <p>По вашему запросу отделения не найдены.</p>}
      <section className="card">
        <h3>Доступы и роли</h3>
        <p><strong>Главный админ:</strong> создает отделения, назначает руководителей и выдает права на редактирование карточек.</p>
        <p><strong>Руководитель отделения:</strong> редактирует информацию отделения, публикует новости и обновляет контакты.</p>
      </section>
    </div>
  );
}

function RegionDetailPage({ slug, goTo }) {
  const branch = regionalBranches.find((item) => item.slug === slug);
  if (!branch) return <NotFound goTo={goTo} />;
  return (
    <div className="page">
      <div className="breadcrumbs">Главная / Регионы / {branch.city}</div>
      <h1>Отделение EVTENIA · {branch.city}</h1>
      <img className="detail-cover" src={branch.cover} alt={`Отделение ${branch.city}`} />
      <h2>Руководители отделения</h2>
      <div className="cards grid-2">
        {branch.leaders.map((leader) => (
          <article key={leader.name} className="card">
            <div className="branch-leader-item">
              <img src={leader.photo} alt={leader.name} />
              <div>
                <strong>{leader.name}</strong>
                <p>{leader.role}</p>
                <p>{leader.contact}</p>
                <p>Соцсети: {leader.socials.join(" · ")}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <h2>Новости отделения</h2>
      <div className="cards grid-2">
        {branch.news.map((newsItem) => (
          <article className="card" key={newsItem.slug}>
            <small>{newsItem.date}</small>
            <h3>{newsItem.title}</h3>
            <p>{newsItem.excerpt}</p>
            <button onClick={() => goTo(`/regions/${branch.slug}/news/${newsItem.slug}`)}>Читать новость</button>
          </article>
        ))}
      </div>
    </div>
  );
}

function RegionNewsDetailPage({ regionSlug, newsSlug, goTo }) {
  const branch = regionalBranches.find((item) => item.slug === regionSlug);
  const newsItem = branch?.news.find((item) => item.slug === newsSlug);
  if (!branch || !newsItem) return <NotFound goTo={goTo} />;
  return (
    <div className="page article">
      <div className="breadcrumbs">Главная / Регионы / {branch.city} / Новости / {newsItem.title}</div>
      <h1>{newsItem.title}</h1>
      <p className="lead">{branch.city} · {newsItem.date}</p>
      <p>{newsItem.body}</p>
      <button onClick={() => goTo(`/regions/${branch.slug}`)}>← К карточке отделения</button>
    </div>
  );
}

function TeamPage() {
  return (
    <div className="page">
      <h1>Команда и основатель</h1>
      <section className="card founder-card">
        <div className="founder-layout">
          <img src={teamMembers.founder.photo} alt={teamMembers.founder.name} />
          <div>
            <p className="eyebrow">Основатель</p>
            <h2>{teamMembers.founder.name}</h2>
            <p><strong>{teamMembers.founder.role}</strong></p>
            <p>{teamMembers.founder.bio}</p>
          </div>
        </div>
      </section>
      <section>
        <h2>Команда второго плана</h2>
        <div className="cards grid-3">
          {teamMembers.members.map((member) => (
            <article className="card" key={member.name}>
              <img src={member.photo} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="card">
        <h3>Как устроена команда</h3>
        <p>Основатель определяет стратегию, а руководители и кураторы отделений отвечают за локальные события, новости и развитие направлений.</p>
      </section>
      </div>
  );
}


function PartnersPage() {
  return (
    <div className="page">
      <h1>Партнеры</h1>
      <p className="lead">EVTENIA открыта к партнерским проектам с брендами, экспертами и образовательными платформами.</p>
      <div className="cards grid-3 partners-grid">
        {partners.map((partner) => (
          <article className="card partner-card" key={partner.href}>
            <h3>{partner.name}</h3>
            <a className="btn btn-small" href={partner.href} target="_blank" rel="noreferrer">Открыть сайт</a>
          </article>
        ))}
      </div>
      <section className="join partner-application">
        <h2>Стать партнером</h2>
        <p>Оставьте заявку, если хотите провести совместное мероприятие, поддержать проект или предложить коллаборацию.</p>
        <form className="form" onSubmit={(e) => { e.preventDefault(); alert("Спасибо! Заявка партнера отправлена."); }}>
          <input required placeholder="Имя и фамилия" />
          <input required placeholder="Компания / проект" />
          <input required placeholder="Телефон или мессенджер" />
          <input type="email" placeholder="Email" />
          <select defaultValue="">
            <option value="" disabled>Формат партнерства</option>
            <option>Совместное мероприятие</option>
            <option>Информационное партнерство</option>
            <option>Спонсорство</option>
            <option>Экспертная программа</option>
          </select>
          <textarea required placeholder="Коротко опишите предложение" rows="4" />
          <button className="btn" type="submit">Отправить заявку партнера</button>
        </form>
      </section>
    </div>
  );
}

function StoriesPage() {
  return <div className="page"><h1>Отзывы / истории участников</h1><div className="cards grid-2">{testimonials.map((t) => <article className="card" key={t.name}><p>“{t.quote}”</p><strong>{t.name}</strong><small>{t.role}</small></article>)}</div></div>;
}

function HousingCommitteePage() {
  return (
    <div className="page">
      <h1>Комитет по жилищной политике</h1>
      <p className="lead">Раздел о проектах, обсуждениях и инициативах комитета по жилищной политике.</p>
      <div className="cards grid-2">
        <article className="card">
          <h3>О направлении</h3>
          <p>Здесь будет размещаться информация о встречах, экспертных материалах и городских инициативах, связанных с жилищной политикой.</p>
        </article>
        <article className="card">
          <h3>Сообщество</h3>
          <p>Актуальные новости комитета пока публикуются на странице VK.</p>
          <a className="btn btn-small" href="https://vk.ru/committee_opora58" target="_blank" rel="noreferrer">Открыть VK</a>
        </article>
      </div>
    </div>
  );
}

function CoursesPage() {
  return (
    <div className="page">
      <h1>Курсы/программы</h1>
      <p className="lead">Курсы/программы</p>
      <div className="card">
        <h3>Скоро здесь появится расписание</h3>
        <p>Мы готовим описание образовательных курсов, программ развития и форматов участия EVTENIA.</p>
      </div>
    </div>
  );
}

function FaqPage() {
  return (
    <div className="page">
      <h1>FAQ</h1>
      <p><strong>Нужен ли опыт участия в клубах?</strong> Нет, можно прийти впервые.</p>
      <p><strong>Как часто проходят мероприятия?</strong> Регулярно: ежемесячные встречи и спец-форматы.</p>
      <p><strong>Можно ли стать партнером?</strong> Да, через форму заявки или страницу контактов.</p>
    </div>
  );
}

function AdminPage() {
  const [state, setState] = useState({
    eventsCount: events.length,
    postsCount: posts.length,
    galleryCount: galleryAlbums.length,
    seoReady: "Да",
    applicationsToday: 7,
  });
  return (
    <div className="page">
      <h1>Админка EVTENIA (демо)</h1>
      <p>Панель показывает базовую структуру CMS для управления контентом и заявками.</p>
      <div className="cards grid-3">
        <article className="card"><h3>Мероприятия</h3><p>{state.eventsCount} карточек</p></article>
        <article className="card"><h3>Новости</h3><p>{state.postsCount} публикаций</p></article>
        <article className="card"><h3>Галерея</h3><p>{state.galleryCount} альбома</p></article>
        <article className="card"><h3>SEO-поля</h3><p>{state.seoReady}</p></article>
        <article className="card"><h3>Контакты</h3><p>Редактируются из CMS</p></article>
        <article className="card"><h3>Заявки за сегодня</h3><p>{state.applicationsToday}</p></article>
        <article className="card"><h3>Отделения</h3><p>{regionalBranches.length} региональных карточек</p></article>
        <article className="card"><h3>Доступы</h3><p>Главный админ назначает руководителей отделений</p></article>
      </div>
      <label className="admin-input">Демо-поле: изменить количество заявок
        <input type="number" value={state.applicationsToday} onChange={(e) => setState((prev) => ({ ...prev, applicationsToday: Number(e.target.value) }))} />
      </label>
    </div>
  );
}

function NotFound({ goTo }) {
  return <div className="page"><h1>Страница не найдена</h1><button onClick={() => goTo("/")}>На главную</button></div>;
}

export default function App() {
  const { path, goTo } = usePath();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const matched = path.startsWith("/events/")
      ? pageSeo["/events"]
      : path.startsWith("/regions/")
        ? pageSeo["/regions"]
      : path.startsWith("/video/")
        ? { title: "Видеопроекты EVTENIA", description: "Видео-проекты клуба EVTENIA: интервью, лайфстайл и вдохновение." }
        : path.startsWith("/projects/")
          ? { title: "Проекты EVTENIA", description: "Направления и проекты организации EVTENIA для развития и сообщества." }
      : path.startsWith("/news/")
        ? pageSeo["/news"]
      : pageSeo[path] || pageSeo["/"];
    document.title = matched.title;

    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute("content", matched.description);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", matched.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", matched.description);
  }, [path]);

  const page = useMemo(() => {
    if (path === "/") return <Home goTo={goTo} />;
    if (path === "/about") return <AboutPage />;
    if (path === "/events" || path === "/poster") return <EventsPage goTo={goTo} />;
    if (path === "/regions") return <RegionsPage goTo={goTo} />;
    if (path.startsWith("/regions/") && path.includes("/news/")) {
      const [, , regionSlug, , newsSlug] = path.split("/");
      return <RegionNewsDetailPage regionSlug={regionSlug} newsSlug={newsSlug} goTo={goTo} />;
    }
    if (path.startsWith("/regions/")) return <RegionDetailPage slug={path.split("/regions/")[1]} goTo={goTo} />;
    if (path.startsWith("/events/")) return <EventDetail slug={path.split("/events/")[1]} goTo={goTo} />;
    if (path.startsWith("/video/")) return <VideoProjectPage slug={path.split("/video/")[1]} />;
    if (path.startsWith("/projects/")) return <OrgProjectPage slug={path.split("/projects/")[1]} goTo={goTo} />;
    if (path === "/news") return <NewsPage goTo={goTo} />;
    if (path.startsWith("/news/")) return <NewsDetail slug={path.split("/news/")[1]} goTo={goTo} />;
    if (path === "/gallery") return <GalleryPage />;
    if (path === "/join") return <JoinPage goTo={goTo} />;
    if (path === "/contacts") return <ContactsPage goTo={goTo} />;
    if (path === "/privacy") return <SimplePage title="Политика конфиденциальности" text="Мы бережно относимся к персональным данным и используем их только для связи по заявкам и участия в сообществе." />;
    if (path === "/consent") return <SimplePage title="Согласие на обработку персональных данных" text="Отправляя форму, вы подтверждаете согласие на обработку персональных данных в целях коммуникации по заявке." />;
    if (path === "/partners") return <PartnersPage />;
    if (path === "/stories") return <StoriesPage />;
    if (path === "/housing-committee") return <HousingCommitteePage />;
    if (path === "/courses") return <CoursesPage />;
    if (path === "/faq") return <FaqPage />;
    if (path === "/team") return <TeamPage />;
    if (path === "/admin") return <AdminPage />;
    return <NotFound goTo={goTo} />;
  }, [path]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [path]);

  return <Layout goTo={goTo} path={path} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>{page}</Layout>;
}
