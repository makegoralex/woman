import { useEffect, useMemo, useState } from "react";
import "./styles.css";

const vkUrl = "https://vk.com/evtenia_people";
const maxUrl = "https://max.ru/join/fYupCLkr__76YnzZS3QeOWJLGUjh9R2Qw3LRhWolNVY";
const rutubeUrl = "https://rutube.ru/channel/38482316/";
const founderLeftPhoto = "https://s10.iimage.su/s/22/gvPWh71xlYDOi4oSdcf0nWjnmVc2VA0S3w1SrEz6N.png";
const founderRightPhoto = "https://s10.iimage.su/s/22/guNsQNexEI1a9Sdz4oCeDiaBCHUd4Qv3BRbNnsg1i.png";

let events = [
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

let posts = [
  { slug: "march-community-results", title: "Как прошёл март в EVTENIA: 4 встречи и 120 новых знакомств", category: "Новости клуба", date: "20 марта 2026", excerpt: "Подвели итоги месяца и собрали лучшие моменты встреч в одном материале." },
  { slug: "career-shifts", title: "Бизнес и карьера: как мягко расти в период изменений", category: "Бизнес и карьера", date: "16 марта 2026", excerpt: "Практические подходы от участников сообщества, которые масштабируют проекты без выгорания." },
  { slug: "interview-founder", title: "Интервью с основателем EVTENIA: зачем нам культура сообщества", category: "Интервью", date: "10 марта 2026", excerpt: "О миссии сообщества, ценностях и том, как рождаются сильные связи." },
  { slug: "event-announcement-april", title: "Анонс апреля: нетворкинг-вечер и лаборатория выступлений", category: "Мероприятия", date: "5 марта 2026", excerpt: "Две новые встречи, на которых можно заявить о себе и найти партнеров." },
  { slug: "member-story-anastasia", title: "История участника: как сообщество помогло запустить второй бизнес", category: "Истории участников", date: "28 февраля 2026", excerpt: "Личный кейс о поддержке, окружении и смелости выйти на новый уровень." },
  { slug: "wellbeing-habits", title: "Полезные материалы: 7 ритуалов ресурсного утра", category: "Развитие", date: "21 февраля 2026", excerpt: "Небольшие привычки, которые помогают сохранять ясность и энергию." },
  { slug: "partners-open-call", title: "Открыт набор партнёров на летнюю программу клуба", category: "Новости клуба", date: "15 февраля 2026", excerpt: "Приглашаем бренды и экспертов к совместным образовательным форматам." },
  { slug: "safe-networking", title: "Как строить нетворкинг в безопасной поддерживающей среде", category: "Полезные материалы", date: "10 февраля 2026", excerpt: "Принципы общения и форматы знакомств, которые работают вдолгую." },
];

let galleryAlbums = [
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

let testimonials = [
  { quote: "Я пришла за новыми контактами, а получила сильное окружение и поддержку на каждом этапе.", name: "Екатерина С.", role: "предприниматель" },
  { quote: "В EVTENIA комфортно говорить о росте, сомнениях и идеях — тебя действительно слышат.", name: "Мария Л.", role: "участник сообщества" },
  { quote: "После двух встреч я нашла партнера для нового проекта и уверенность выступать публично.", name: "Анна Р.", role: "маркетинг-консультант" },
  { quote: "Очень эстетичная и умная среда: без шума, но с реальными результатами.", name: "Ольга К.", role: "основатель бренда" },
];

let teamMembers = {
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


let partners = [
  { name: "Счастливый дом", href: "https://home58.ru/" },
  { name: "Строительство домов Evtenia", href: "https://dom.evtenia.ru/" },
  { name: "Агентство недвижимости Evtenia", href: "https://evtenia.ru/" },
  { name: "Блог основателя АНО Evtenia", href: vkUrl },
  { name: "Комитет по жилищной политике", href: "https://vk.ru/committee_opora58" },
  { name: "Опора России Пензенское отделение", href: "https://opora58.ru/" },
  { name: "Фитнес для мозга", href: "https://taplink.cc/elenaakozedub" },
  { name: "Ювелирка Evtnenia", href: "https://evtenia.store/" },
];


let services = [
  {
    slug: "ask-expert",
    title: "Спроси эксперта",
    lead: "Короткая консультация по рабочему или личному запросу в безопасном нейтральном формате.",
    description: [
      "Услуга помогает сформулировать вопрос, получить первичную экспертную навигацию и понять следующие шаги без давления и навязанных решений.",
      "Формат может подойти для предпринимателей, специалистов, авторов проектов и участников сообщества, которым нужен взгляд со стороны по развитию, коммуникациям, событиям или партнерствам.",
    ],
    items: ["предварительное уточнение запроса", "онлайн- или офлайн-консультация по договоренности", "краткие рекомендации и возможный план действий"],
  },
  {
    slug: "marketing-support",
    title: "Маркетинговая поддержка",
    lead: "Бережная помощь с упаковкой идеи, коммуникацией и продвижением проекта.",
    description: [
      "Направление создано для проектов, которым важно яснее рассказать о себе аудитории, подготовить материалы к запуску или проверить текущие каналы коммуникации.",
      "Поддержка может включать разбор позиционирования, структуры предложения, контента, визуальных акцентов и партнерских возможностей. Конкретный объем определяется после заявки.",
    ],
    items: ["аудит текущей коммуникации", "рекомендации по структуре предложения", "идеи для контента, партнерств и презентации"],
  },
];

let serviceApplications = [
  { name: "Консультация по самопрезентации", author: "Анна, эксперт по коммуникациям", status: "На модерации" },
  { name: "Мини-разбор визуальной упаковки", author: "Мария, дизайнер", status: "Одобрено" },
  { name: "Практикум по публичному выступлению", author: "Елена, тренер", status: "Требует правок" },
];

let pageSeo = {
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
  "/services": { title: "Услуги EVTENIA", description: "Каталог услуг EVTENIA: экспертные консультации, маркетинговая поддержка и предложения экспертов." },
  "/services/ask-expert": { title: "Спроси эксперта — EVTENIA", description: "Нейтральная страница услуги: консультации экспертов EVTENIA." },
  "/services/marketing-support": { title: "Маркетинговая поддержка — EVTENIA", description: "Нейтральная страница услуги: маркетинговая поддержка проектов." },
  "/services/propose-service": { title: "Предложить свою услугу — EVTENIA", description: "Форма предложения услуги для размещения на сайте после модерации." },
  "/courses": { title: "Курсы/программы EVTENIA", description: "Курсы и программы EVTENIA: временная страница направления." },
};

const brainFitnessPhoto = "https://s10.iimage.su/s/07/gTXiVvPxBnnvlg2wAk0sLIFUmzpmklLQpUZQz95YX.jpg";
const brainFitnessGallery = [
  "https://s10.iimage.su/s/08/g1l3vhkxbkBjzFJSvljZzSBJo0nUZI2bBo1Bf633l.jpg",
  "https://s10.iimage.su/s/08/gUDySdSxdaipYcha04T26GCGYb8UcGfIltzUzT4BB.jpg",
  "https://s10.iimage.su/s/08/gzRQx7GxmshYzD0hTAJGtgCTliaJpZ9Dp8qIoMqLv.jpg",
];

let mediaProjects = [
  { slug: "interview-evtenia", title: "Интервью с Evtenia", description: "Серия глубоких бесед с героинями о личном опыте, бизнесе и выборе." },
  { slug: "vkusno-s-evtenia", title: "Вкусно с Evtenia", description: "Видеопроект о вкусе к жизни: еда, эстетика, общение и истории людей." },
  { slug: "blagodaryu-s-evtenia", title: "Благодарю с Evtenia", description: "Проект про благодарность, поддержку и внутреннюю устойчивость в ежедневности." },
];

let clubProjects = [
  { slug: "fitnes-dlya-mozga", title: "Фитнес для мозга" },
  { slug: "networking", title: "Нетворкинг" },
  { slug: "sozdanie-meropriyatij", title: "Создание мероприятий" },
  { slug: "intellekt-mental-health", title: "Интеллектуальное развитие и ментальное здоровье" },
  { slug: "business-i-zhenshina", title: "Бизнес и развитие" },
  { slug: "perezagruzka", title: "Перезагрузка" },
  { slug: "prazdnik-v-kazhdyj-dom", title: "Праздник в каждый дом" },
  { slug: "razvitie-i-tvorchestvo", title: "Развитие и творчество" },
  { slug: "psihologiya-otnoshenij", title: "Психология отношений" },
  { slug: "prekrasnaya-ya", title: "Прекрасная Я" },
];

let projectDetails = {
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

  "razvitie-i-tvorchestvo": {
    description: [
      "Развитие и творчество — направление для тех, кто хочет раскрывать идеи через практику, общение и мягкую творческую среду. Проект объединяет мастер-классы, открытые лаборатории, встречи с экспертами и камерные форматы, где можно пробовать новое без оценки и лишнего давления.",
      "Участники могут работать с личными проектами, визуальными материалами, текстами, голосом, сценическим присутствием и другими формами самовыражения. Главная задача — помочь человеку увидеть свои сильные стороны, найти понятный способ проявления и превратить вдохновение в небольшой, но конкретный результат.",
      "Форматы проекта подходят начинающим авторам, экспертам, предпринимателям, родителям и всем, кто хочет добавить в жизнь больше смысла, красоты и созидания. Мы делаем акцент на бережной обратной связи, регулярной практике и атмосфере, в которой творчество становится частью развития."
    ],
    photo: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    testimonials: ["Получилось вернуться к творчеству и оформить идею в понятный проект.", "Очень поддерживающая атмосфера: можно пробовать, ошибаться и расти."],
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

let regionalBranches = [
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

const ADMIN_SESSION_KEY = "evtenia_admin_session";
const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "Evtenia2026!";

const initialCmsContent = JSON.parse(JSON.stringify({ events, posts, galleryAlbums, testimonials, teamMembers, partners, services, serviceApplications, regionalBranches, mediaProjects, clubProjects, projectDetails, pageSeo }));

const cmsSections = [
  { key: "events", title: "Мероприятия", type: "array" },
  { key: "posts", title: "Новости", type: "array" },
  { key: "galleryAlbums", title: "Галерея", type: "array" },
  { key: "testimonials", title: "Отзывы", type: "array" },
  { key: "teamMembers", title: "Команда", type: "object" },
  { key: "partners", title: "Партнеры", type: "array" },
  { key: "services", title: "Услуги", type: "array" },
  { key: "serviceApplications", title: "Заявки услуг", type: "array" },
  { key: "regionalBranches", title: "Отделения", type: "array" },
  { key: "mediaProjects", title: "Видеопроекты", type: "array" },
  { key: "clubProjects", title: "Проекты", type: "array" },
  { key: "projectDetails", title: "Контент проектов", type: "object" },
  { key: "pageSeo", title: "SEO страниц", type: "object" },
];

const getDefaultCmsContent = () => JSON.parse(JSON.stringify(initialCmsContent));

function applyCmsContent(content) {
  if (!content || typeof content !== "object") return;
  events = Array.isArray(content.events) ? content.events : events;
  posts = Array.isArray(content.posts) ? content.posts : posts;
  galleryAlbums = Array.isArray(content.galleryAlbums) ? content.galleryAlbums : galleryAlbums;
  testimonials = Array.isArray(content.testimonials) ? content.testimonials : testimonials;
  teamMembers = content.teamMembers && typeof content.teamMembers === "object" ? content.teamMembers : teamMembers;
  partners = Array.isArray(content.partners) ? content.partners : partners;
  services = Array.isArray(content.services) ? content.services : services;
  serviceApplications = Array.isArray(content.serviceApplications) ? content.serviceApplications : serviceApplications;
  regionalBranches = Array.isArray(content.regionalBranches) ? content.regionalBranches : regionalBranches;
  mediaProjects = Array.isArray(content.mediaProjects) ? content.mediaProjects : mediaProjects;
  clubProjects = Array.isArray(content.clubProjects) ? content.clubProjects : clubProjects;
  projectDetails = content.projectDetails && typeof content.projectDetails === "object" ? content.projectDetails : projectDetails;
  pageSeo = content.pageSeo && typeof content.pageSeo === "object" ? content.pageSeo : pageSeo;
}

const CMS_CONTENT_ENDPOINTS = ["/api/content", "/cms/content", "/admin/content"];
const CMS_UPLOAD_ENDPOINTS = ["/api/upload", "/cms/upload", "/admin/upload"];

function getCmsRequestHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Basic ${btoa(`${ADMIN_LOGIN}:${ADMIN_PASSWORD}`)}`,
  };
}

async function parseJsonResponse(response) {
  const text = await response.text();
  if (!text) return null;
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return { error: `ожидался JSON, сервер вернул ${contentType || "ответ без content-type"}` };
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    return { error: text.slice(0, 300) };
  }
}

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function hasItems(value) {
  return Array.isArray(value) ? value.length > 0 : isPlainObject(value) && Object.keys(value).length > 0;
}

function isMeaningfulCmsContent(content) {
  if (!isPlainObject(content)) return false;
  return cmsSections.some((section) => hasItems(content[section.key]));
}

function normalizeCmsContent(content) {
  const defaults = getDefaultCmsContent();
  if (!isMeaningfulCmsContent(content)) return defaults;

  const source = content;

  return {
    events: Array.isArray(source.events) ? source.events : defaults.events,
    posts: Array.isArray(source.posts) ? source.posts : defaults.posts,
    galleryAlbums: Array.isArray(source.galleryAlbums) ? source.galleryAlbums : defaults.galleryAlbums,
    testimonials: Array.isArray(source.testimonials) ? source.testimonials : defaults.testimonials,
    teamMembers: isPlainObject(source.teamMembers) ? source.teamMembers : defaults.teamMembers,
    partners: Array.isArray(source.partners) ? source.partners : defaults.partners,
    services: Array.isArray(source.services) ? source.services : defaults.services,
    serviceApplications: Array.isArray(source.serviceApplications) ? source.serviceApplications : defaults.serviceApplications,
    regionalBranches: Array.isArray(source.regionalBranches) ? source.regionalBranches : defaults.regionalBranches,
    mediaProjects: Array.isArray(source.mediaProjects) ? source.mediaProjects : defaults.mediaProjects,
    clubProjects: Array.isArray(source.clubProjects) ? source.clubProjects : defaults.clubProjects,
    projectDetails: isPlainObject(source.projectDetails) ? source.projectDetails : defaults.projectDetails,
    pageSeo: isPlainObject(source.pageSeo) ? source.pageSeo : defaults.pageSeo,
  };
}

async function loadServerCmsContent() {
  for (const endpoint of CMS_CONTENT_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        credentials: "same-origin",
        headers: getCmsRequestHeaders(),
      });
      if (!response.ok) continue;
      const content = await parseJsonResponse(response);
      if (content?.error) {
        console.warn(`Некорректный ответ CMS с ${endpoint}: ${content.error}`);
        continue;
      }
      if (isMeaningfulCmsContent(content)) return normalizeCmsContent(content);
    } catch (error) {
      console.warn(`Не удалось загрузить CMS-контент с ${endpoint}`, error);
    }
  }
  return null;
}

async function saveServerCmsContent(content) {
  const payload = JSON.stringify(normalizeCmsContent(content));
  const errors = [];

  for (const endpoint of CMS_CONTENT_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "same-origin",
        headers: getCmsRequestHeaders(),
        body: payload,
      });

      const details = await parseJsonResponse(response);
      if (response.ok && details?.ok === true) return details;

      errors.push(details?.error || `сервер ответил ${response.status} на ${endpoint}`);
    } catch (error) {
      errors.push(`${endpoint}: ${error.message}`);
      console.warn(`Не удалось сохранить CMS-контент через ${endpoint}`, error);
    }
  }

  throw new Error(errors.join("; ") || "сервер не принял запрос");
}

async function uploadCmsImages(dataUrls) {
  try {
    let lastError = "сервер не принял загрузку";

    for (const endpoint of CMS_UPLOAD_ENDPOINTS) {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "same-origin",
        headers: getCmsRequestHeaders(),
        body: JSON.stringify({ files: dataUrls }),
      });

      if (!response.ok) {
        const details = await parseJsonResponse(response) || {};
        lastError = details.error || `сервер ответил ${response.status} на ${endpoint}`;
        continue;
      }

      const result = await parseJsonResponse(response);
      if (result?.error) {
        lastError = result.error;
        continue;
      }
      return result?.urls?.length ? result.urls : dataUrls;
    }

    throw new Error(lastError);
  } catch (error) {
    console.warn("Не удалось загрузить изображения на сервер, используем локальные данные", error);
    return dataUrls;
  }
}


async function replaceEmbeddedImages(value) {
  if (typeof value === "string") {
    if (!value.startsWith("data:image/")) return value;
    const urls = await uploadCmsImages([value]);
    return urls[0] || value;
  }
  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => replaceEmbeddedImages(item)));
  }
  if (value && typeof value === "object") {
    const entries = await Promise.all(Object.entries(value).map(async ([key, item]) => [key, await replaceEmbeddedImages(item)]));
    return Object.fromEntries(entries);
  }
  return value;
}

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
    ["/news", "Новости"],
  ];

  const serviceNav = [
    ["/about", "О нас"],
    ["/team", "Команда"],
  ];

  const SocialIcon = ({ label, href, children, className = "" }) => (
    <a className={`social-link ${className}`.trim()} href={href} target="_blank" rel="noreferrer" aria-label={label}>
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
                <SocialIcon label="VK" href={vkUrl} className="social-link-vk">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.8 7.5c.12 5.79 3.02 9.27 8.11 9.27h.29v-3.3c1.86.19 3.25 1.55 3.82 3.3h2.63c-.74-2.7-2.69-4.2-3.91-4.77 1.22-.7 2.93-2.4 3.33-4.5h-2.4c-.52 1.7-2.1 3.4-3.47 3.54V7.5h-2.4v6.2C9.4 13.36 7.6 11.5 7.52 7.5H4.8Z" fill="currentColor" /></svg>
                </SocialIcon>
                <SocialIcon label="MAX" href={maxUrl} className="social-link-max">
                  <span className="max-icon" aria-hidden="true">MAX</span>
                </SocialIcon>
                <SocialIcon label="Rutube" href={rutubeUrl} className="social-link-rutube">
                  <span className="rutube-icon" aria-hidden="true">
                    <span className="rutube-play">▶</span>
                    <span>RUTUBE</span>
                  </span>
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

          <div className="header-brandline" aria-label="О EVTENIA">
            <span>Evtenia</span>
            <i aria-hidden="true">|</i>
            <span>АНО по развитию<br />социальных инициатив</span>
          </div>

          <div className="header-catalog" aria-label="Быстрые разделы">
            <div className="catalog-group video-catalog">
              <button className="catalog-summary" type="button">Видеопроекты</button>
              <div className="catalog-panel video-panel">
                {mediaProjects.map((item) => (
                  <button key={item.slug} className={`catalog-link ${path === `/video/${item.slug}` ? "active" : ""}`} onClick={() => { goTo(`/video/${item.slug}`); setMobileMenuOpen(false); }}>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="catalog-group projects-catalog">
              <button className="catalog-summary" type="button">Проекты</button>
              <div className="catalog-panel projects-panel">
                {clubProjects.filter((item) => item.slug !== "prazdnik-v-kazhdyj-dom").map((item) => (
                  <button key={item.slug} className={`catalog-link ${path === `/projects/${item.slug}` ? "active" : ""}`} onClick={() => { goTo(`/projects/${item.slug}`); setMobileMenuOpen(false); }}>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="catalog-group charity-catalog">
              <button className="catalog-summary" type="button">Благотворительность</button>
              <div className="catalog-panel single-panel">
                <button className={`catalog-link special-catalog-link ${path === `/projects/prazdnik-v-kazhdyj-dom` ? "active" : ""}`} onClick={() => { goTo(`/projects/prazdnik-v-kazhdyj-dom`); setMobileMenuOpen(false); }}>
                  Благотворительный проект
                </button>
              </div>
            </div>

            <div className="catalog-group services-catalog">
              <button className="catalog-summary" type="button">Услуги</button>
              <div className="catalog-panel single-panel">
                <button className={`catalog-link ${path === `/services/ask-expert` ? "active" : ""}`} onClick={() => { goTo(`/services/ask-expert`); setMobileMenuOpen(false); }}>
                  Спроси эксперта
                </button>
                <button className={`catalog-link ${path === `/services/marketing-support` ? "active" : ""}`} onClick={() => { goTo(`/services/marketing-support`); setMobileMenuOpen(false); }}>
                  Маркетинговая поддержка
                </button>
                <button className={`catalog-link ${path === `/services/propose-service` ? "active" : ""}`} onClick={() => { goTo(`/services/propose-service`); setMobileMenuOpen(false); }}>
                  Предложить свою услугу
                </button>
              </div>
            </div>

            <div className="catalog-group programs-catalog">
              <button className="catalog-summary" type="button">Курсы/программы</button>
              <div className="catalog-panel single-panel">
                <button className={`catalog-link ${path === `/courses` ? "active" : ""}`} onClick={() => { goTo(`/courses`); setMobileMenuOpen(false); }}>
                  Курсы/программы
                </button>
              </div>
            </div>
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
      <img className="hero-founder hero-founder-right" src="https://s10.iimage.su/s/24/gHWhn0kxsJSzTN37a4yEBZHtwIcRtRDgtI3KG7iGD.png" alt="Основатель EVTENIA" />
    </section>
  );
}

const russianMonthNumbers = {
  января: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
};

function parseEventDate(dateText) {
  const match = String(dateText || "").trim().toLowerCase().match(/(\d{1,2})\s+([а-яё]+)\s+(\d{4})/);
  if (!match) return null;
  const [, day, month, year] = match;
  const monthIndex = russianMonthNumbers[month];
  if (monthIndex === undefined) return null;
  return new Date(Number(year), monthIndex, Number(day), 23, 59, 59);
}

function getEventStatus(event) {
  const eventDate = parseEventDate(event.date);
  if (!eventDate) return "future";
  return eventDate.getTime() >= Date.now() ? "future" : "past";
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
        <div className="cards grid-3">{events.filter((e) => getEventStatus(e) === "future").slice(0, 4).map((e) => <EventCard key={e.slug} event={e} goTo={goTo} />)}</div>
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
    (status === "all" ? true : getEventStatus(e) === status)
    && (project === "all" ? true : e.projectSlug === project)
    && (city === "all" ? true : e.city === city)
  );
  return (
    <div className="page">
      <h1>Мероприятия EVTENIA</h1>
      <div className="filters">
        <label>Период <select value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">Все</option><option value="future">Будущие</option><option value="past">Прошедшие</option></select></label>
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

function PhotoLightbox({ photos, index, onClose, onNavigate }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onNavigate(index === 0 ? photos.length - 1 : index - 1);
      if (event.key === "ArrowRight") onNavigate(index === photos.length - 1 ? 0 : index + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, onClose, onNavigate, photos.length]);

  if (!photos.length || index === null) return null;
  const previousIndex = index === 0 ? photos.length - 1 : index - 1;
  const nextIndex = index === photos.length - 1 ? 0 : index + 1;

  return (
    <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="Галерея" onClick={onClose}>
      <button className="photo-lightbox-close" onClick={onClose} aria-label="Закрыть">×</button>
      <button className="photo-lightbox-nav prev" onClick={(event) => { event.stopPropagation(); onNavigate(previousIndex); }} aria-label="Предыдущее фото">‹</button>
      <img src={photos[index]} alt={`Галерея ${index + 1}`} onClick={(event) => event.stopPropagation()} />
      <button className="photo-lightbox-nav next" onClick={(event) => { event.stopPropagation(); onNavigate(nextIndex); }} aria-label="Следующее фото">›</button>
    </div>
  );
}

function EventDetail({ slug, goTo }) {
  const event = events.find((e) => e.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  if (!event) return <NotFound goTo={goTo} />;
  const eventGallery = event.gallery || [];
  const related = events.filter((e) => e.slug !== slug).slice(0, 3);
  return (
    <div className="page">
      <div className="breadcrumbs">Главная / Мероприятия / {event.title}</div>
      <h1>{event.title}</h1>
      {eventGallery.length === 0 && event.image && <img className="detail-cover event-detail-cover" src={event.image} alt={event.title} />}
      {eventGallery.length > 0 && (
        <section className="event-gallery-section">
          <h2>Галерея мероприятия</h2>
          <div className="album-photo-grid event-photo-grid">
            {eventGallery.map((photo, index) => (
              <figure key={`${event.slug}-photo-${index}`}>
                <button className="gallery-photo-button" onClick={() => setLightboxIndex(index)} aria-label={`Открыть фото ${index + 1}`}>
                  <img src={photo} alt={`${event.title} ${index + 1}`} />
                </button>
              </figure>
            ))}
          </div>
          <PhotoLightbox photos={eventGallery} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
        </section>
      )}
      <p><strong>Дата и время:</strong> {event.date}, {event.time}</p>
      <p><strong>Место:</strong> {event.place}</p>
      <p><strong>Кому подойдёт:</strong> {event.audience}</p>
      <p><strong>Описание:</strong> {event.short}</p>
      <h2>Программа</h2>
      <ul>{(event.program || []).map((item) => <li key={item}>{item}</li>)}</ul>
      <h3>Спикеры</h3><p>Основатель клуба, приглашённые эксперты и участники с практическими кейсами.</p>
      {event.gallery?.length > 0 && (
        <section>
          <h2>Фотографии мероприятия</h2>
          <div className="album-photo-grid">
            {event.gallery.map((photo, index) => (
              <figure key={`${event.slug}-photo-${index}`}>
                <img src={photo} alt={`${event.title} ${index + 1}`} />
              </figure>
            ))}
          </div>
        </section>
      )}
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

function ConsentCheckbox({ goTo }) {
  return (
    <label className="consent-checkbox">
      <input required type="checkbox" />
      <span>Я соглашаюсь с {" "}
        <button type="button" className="inline-link" onClick={() => goTo?.("/privacy")}>политикой конфиденциальности</button>
        {" "}и даю {" "}
        <button type="button" className="inline-link" onClick={() => goTo?.("/consent")}>согласие на обработку персональных данных</button>.
      </span>
    </label>
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
        <ConsentCheckbox goTo={goTo} />
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
  const [lightbox, setLightbox] = useState(null);
  const galleryPhotos = galleryAlbums.flatMap((album) => (album.photos?.length ? album.photos : [album.cover]).filter(Boolean));
  return (
    <div className="page">
      <h1>Галерея</h1>
      <div className="gallery-grid">
        {galleryAlbums.map((album, albumIndex) => {
          const photos = (album.photos?.length ? album.photos : [album.cover]).filter(Boolean);
          const firstPhotoIndex = galleryAlbums.slice(0, albumIndex).reduce((total, currentAlbum) => total + (currentAlbum.photos?.length ? currentAlbum.photos.length : currentAlbum.cover ? 1 : 0), 0);
          return (
            <figure key={album.title}>
              <button className="gallery-photo-button" onClick={() => photos.length && setLightbox(firstPhotoIndex)} aria-label={`Открыть альбом ${album.title}`}>
                <img src={album.cover || photos[0]} alt={album.title} />
              </button>
              <figcaption>{album.title} · {album.date}</figcaption>
            </figure>
          );
        })}
      </div>
      {galleryPhotos.length > 0 && (
        <div className="album-photo-grid">
          {galleryPhotos.map((photo, index) => (
            <figure key={`${photo.slice(0, 24)}-${index}`}>
              <button className="gallery-photo-button" onClick={() => setLightbox(index)} aria-label={`Открыть фото ${index + 1}`}>
                <img src={photo} alt={`Галерея ${index + 1}`} />
              </button>
            </figure>
          ))}
        </div>
      )}
      <PhotoLightbox photos={galleryPhotos} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
    </div>
  );
}

function ContactsPage({ goTo }) {
  return (
    <div className="page">
      <h1>Контакты</h1>
      <div className="cards grid-2">
        <article className="card"><h3>Связаться</h3><p>Email: hello@evtenia.club<br />VK: <a href={vkUrl} target="_blank" rel="noreferrer">vk.com/evtenia_people</a><br />MAX: <a href={maxUrl} target="_blank" rel="noreferrer">max.ru/join/fYupCLkr__76YnzZS3QeOWJLGUjh9R2Qw3LRhWolNVY</a><br />Rutube: <a href={rutubeUrl} target="_blank" rel="noreferrer">rutube.ru/channel/38482316</a><br />Телефон: 8-841-279-92-79</p></article>
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
              <h2>Галерея направления</h2>
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
            {(details.testimonials || []).map((item) => <article key={item} className="card"><p>“{item}”</p></article>)}
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
              {leader.photo && <img src={leader.photo} alt={leader.name} />}
              <div>
                <strong>{leader.name}</strong>
                <p>{leader.role}</p>
                <p>{leader.contact}</p>
                {leader.socials?.length > 0 && <p>Соцсети: {leader.socials.join(" · ")}</p>}
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


function PartnersPage({ goTo }) {
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
          <ConsentCheckbox goTo={goTo} />
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


function LegalDocumentPage({ type }) {
  const isPrivacy = type === "privacy";
  return (
    <div className="page article legal-page">
      <h1>{isPrivacy ? "Политика конфиденциальности" : "Согласие на обработку персональных данных"}</h1>
      <p className="lead">Оператор персональных данных: АВТОНОМНАЯ НЕКОММЕРЧЕСКАЯ ОРГАНИЗАЦИЯ ПО РАЗВИТИЮ СОЦИАЛЬНЫХ ИНИЦИАТИВ «ЕВТЕНИЯ», ОГРН 1265800002270, ИНН 5800021898.</p>
      {isPrivacy ? (
        <>
          <h2>1. Общие положения</h2>
          <p>Настоящая политика описывает порядок обработки персональных данных пользователей сайта EVTENIA при отправке заявок, обращений, партнерских предложений и использовании форм обратной связи.</p>
          <h2>2. Какие данные обрабатываются</h2>
          <p>Оператор может обрабатывать имя, фамилию, телефон, адрес электронной почты, мессенджер, название компании или проекта, текст обращения, а также технические данные, необходимые для корректной работы сайта.</p>
          <h2>3. Цели обработки</h2>
          <p>Данные используются для связи с пользователем, рассмотрения заявок, организации мероприятий, подготовки партнерских коммуникаций, обработки предложений услуг и улучшения качества работы сайта.</p>
          <h2>4. Правовые основания и сроки</h2>
          <p>Обработка выполняется на основании согласия пользователя и осуществляется не дольше, чем этого требуют заявленные цели, требования законодательства или до отзыва согласия.</p>
          <h2>5. Передача и защита данных</h2>
          <p>Оператор принимает организационные и технические меры защиты данных. Передача третьим лицам допускается только при необходимости исполнения заявки, по поручению оператора или в случаях, предусмотренных законом.</p>
          <h2>6. Права пользователя</h2>
          <p>Пользователь вправе запросить уточнение, блокирование или удаление персональных данных, а также отозвать согласие на обработку, направив обращение через контактные каналы сайта.</p>
        </>
      ) : (
        <>
          <p>Заполняя и отправляя формы на сайте, пользователь свободно, своей волей и в своем интересе дает согласие оператору на обработку персональных данных.</p>
          <h2>1. Перечень данных</h2>
          <p>Согласие распространяется на имя, фамилию, контактный телефон, email, мессенджер, сведения о компании или проекте, содержание обращения и иные данные, которые пользователь самостоятельно указывает в форме.</p>
          <h2>2. Цели обработки</h2>
          <p>Данные обрабатываются для рассмотрения заявки, обратной связи, регистрации на события, коммуникации по партнерству, модерации предложенных услуг и размещения одобренных материалов на сайте.</p>
          <h2>3. Действия с данными</h2>
          <p>Оператор вправе собирать, записывать, систематизировать, хранить, уточнять, использовать, передавать по поручению, обезличивать, блокировать и уничтожать персональные данные.</p>
          <h2>4. Срок действия согласия</h2>
          <p>Согласие действует до достижения целей обработки или до его отзыва пользователем. Отзыв можно направить оператору через контактные каналы сайта.</p>
        </>
      )}
    </div>
  );
}

function ServicesPage({ goTo }) {
  return (
    <div className="page">
      <h1>Услуги</h1>
      <p className="lead">Нейтральный каталог экспертных и партнерских услуг EVTENIA. Часть услуг размещается после модерации заявки.</p>
      <div className="cards grid-3">
        {services.map((service) => <ServiceCard key={service.slug} service={service} goTo={goTo} />)}
        <article className="card"><h3>Предложить свою услугу</h3><p>Заполните форму, а команда проверит заявку и примет решение о размещении.</p><button onClick={() => goTo("/services/propose-service")}>Заполнить заявку</button></article>
      </div>
    </div>
  );
}

function ServiceCard({ service, goTo }) {
  return <article className="card"><h3>{service.title}</h3><p>{service.lead}</p><button onClick={() => goTo(`/services/${service.slug}`)}>Подробнее</button></article>;
}

function ServiceDetailPage({ slug, goTo }) {
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFound goTo={goTo} />;
  return (
    <div className="page">
      <h1>{service.title}</h1>
      <p className="lead">{service.lead}</p>
      <section className="card">
        {service.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <h3>Что может входить</h3>
        <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <JoinForm compact goTo={goTo} />
    </div>
  );
}

function ProposeServicePage({ goTo }) {
  return (
    <div className="page">
      <h1>Предложить свою услугу</h1>
      <p className="lead">Любой желающий может отправить описание услуги. Заявка попадает в админку, где ее можно одобрить, отклонить или изменить перед публикацией на сайте.</p>
      <section className="join">
        <form className="form" onSubmit={(e) => { e.preventDefault(); alert("Спасибо! Услуга отправлена на модерацию."); }}>
          <input required placeholder="Ваше имя" />
          <input required placeholder="Контакт для связи" />
          <input required placeholder="Название услуги" />
          <input placeholder="Стоимость или формат расчета" />
          <textarea required placeholder="Кратко опишите услугу, пользу и для кого она подходит" rows="5" />
          <ConsentCheckbox goTo={goTo} />
          <button className="btn" type="submit">Отправить на модерацию</button>
        </form>
      </section>
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

const makeSlug = (value) => value
  .toLowerCase()
  .trim()
  .replace(/ё/g, "e")
  .replace(/[^a-zа-я0-9]+/g, "-")
  .replace(/^-+|-+$/g, "") || `item-${Date.now()}`;

function resizeImageFile(file, maxSize = 900, quality = 0.68) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/webp", quality));
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ImageDropzone({ label = "Фото", value, onChange, multiple = false }) {
  const [isDragging, setIsDragging] = useState(false);
  const values = multiple ? value || [] : value ? [value] : [];

  const processFiles = async (files) => {
    const images = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (!images.length) return;
    const resized = await Promise.all(images.map((file) => resizeImageFile(file)));
    const uploaded = await uploadCmsImages(resized);
    onChange(multiple ? [...values, ...uploaded] : uploaded[0]);
  };

  return (
    <div
      className={`image-dropzone ${isDragging ? "dragging" : ""}`}
      onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => { event.preventDefault(); setIsDragging(false); processFiles(event.dataTransfer.files); }}
    >
      <strong>{label}</strong>
      <p>Перетащите фото сюда или выберите файл. Изображение автоматически сжимается для загрузки больших галерей.</p>
      <input type="file" accept="image/*" multiple={multiple} onChange={(event) => processFiles(event.target.files)} />
      {!!values.length && (
        <div className="image-preview-grid">
          {values.map((src, index) => (
            <figure key={`${src.slice(0, 24)}-${index}`}>
              <img src={src} alt={`${label} ${index + 1}`} />
              {multiple && <button type="button" onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}>Удалить</button>}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminTextField({ label, value, onChange, textarea = false }) {
  return <label>{label}{textarea ? <textarea value={value || ""} onChange={(event) => onChange(event.target.value)} rows="4" /> : <input value={value || ""} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function AdminItemSelector({ items, selectedIndex, onSelect, onAdd, getTitle, addLabel }) {
  return (
    <aside className="admin-item-selector">
      <button className="btn btn-small" onClick={onAdd}>{addLabel}</button>
      <div className="admin-item-list">
        {items.map((item, index) => (
          <button className={selectedIndex === index ? "active" : ""} key={`${getTitle(item)}-${index}`} onClick={() => onSelect(index)}>
            {getTitle(item) || `Запись ${index + 1}`}
          </button>
        ))}
      </div>
    </aside>
  );
}

function EventsManager({ items, projects, onChange }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const safeIndex = Math.min(selectedIndex, Math.max(items.length - 1, 0));
  const event = items[safeIndex];
  const update = (patch) => onChange(items.map((item, itemIndex) => itemIndex === safeIndex ? { ...item, ...patch } : item));
  const add = () => {
    onChange([{ slug: `event-${Date.now()}`, title: "Новое мероприятие", date: "", time: "", place: "", city: "", format: "Оффлайн", category: "", projectSlug: projects[0]?.slug || "", image: "", gallery: [], short: "", program: [], audience: "" }, ...items]);
    setSelectedIndex(0);
  };
  const remove = () => {
    onChange(items.filter((_, itemIndex) => itemIndex !== safeIndex));
    setSelectedIndex(Math.max(0, safeIndex - 1));
  };

  return (
    <section className="admin-manager">
      <div className="admin-manager-head"><h2>Мероприятия</h2><p>Выберите мероприятие из списка и редактируйте только его.</p></div>
      <div className="admin-split-editor">
        <AdminItemSelector items={items} selectedIndex={safeIndex} onSelect={setSelectedIndex} onAdd={add} getTitle={(item) => item.title} addLabel="Добавить мероприятие" />
        {event ? (
          <article className="card admin-edit-card">
            <div className="admin-form-grid">
              <AdminTextField label="Название" value={event.title} onChange={(value) => update({ title: value, slug: event.slug || makeSlug(value) })} />
              <AdminTextField label="URL slug" value={event.slug} onChange={(value) => update({ slug: makeSlug(value) })} />
              <AdminTextField label="Дата" value={event.date} onChange={(value) => update({ date: value })} />
              <AdminTextField label="Время" value={event.time} onChange={(value) => update({ time: value })} />
              <AdminTextField label="Место" value={event.place} onChange={(value) => update({ place: value })} />
              <AdminTextField label="Город" value={event.city} onChange={(value) => update({ city: value })} />
              <label>Формат<select value={event.format || "Оффлайн"} onChange={(e) => update({ format: e.target.value })}><option>Оффлайн</option><option>Онлайн</option><option>Гибрид</option></select></label>
              <label>Проект<select value={event.projectSlug || ""} onChange={(e) => update({ projectSlug: e.target.value })}>{projects.map((project) => <option key={project.slug} value={project.slug}>{project.title}</option>)}</select></label>
              <AdminTextField label="Категория" value={event.category} onChange={(value) => update({ category: value })} />
            </div>
            <AdminTextField label="Краткое описание" value={event.short} onChange={(value) => update({ short: value })} textarea />
            <AdminTextField label="Для кого" value={event.audience} onChange={(value) => update({ audience: value })} textarea />
            <AdminTextField label="Программа — каждый пункт с новой строки" value={(event.program || []).join("\n")} onChange={(value) => update({ program: value.split("\n").filter(Boolean) })} textarea />
            <ImageDropzone label="Обложка мероприятия" value={event.image} onChange={(value) => update({ image: value })} />
            <ImageDropzone label="Галерея мероприятия" value={event.gallery || []} multiple onChange={(value) => update({ gallery: value })} />
            <p className="admin-note">После загрузки фото нажмите общую кнопку «Сохранить изменения» сверху. Статус «будущее/прошедшее» определяется автоматически по дате. Блок «Спикеры» пока фиксированный.</p>
            <div className="admin-actions"><button onClick={remove}>Удалить</button></div>
          </article>
        ) : <article className="card"><p>Пока нет мероприятий.</p></article>}
      </div>
    </section>
  );
}

function ProjectsManager({ projects, details, onProjectsChange, onDetailsChange }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const safeIndex = Math.min(selectedIndex, Math.max(projects.length - 1, 0));
  const project = projects[safeIndex];
  const detail = project ? details[project.slug] || {} : {};
  const leaders = detail.leaders || (detail.lead ? [detail.lead] : []);
  const updateProject = (patch) => onProjectsChange(projects.map((item, itemIndex) => itemIndex === safeIndex ? { ...item, ...patch } : item));
  const updateDetails = (slug, patch) => onDetailsChange({ ...details, [slug]: { ...(details[slug] || {}), ...patch } });
  const renameProjectSlug = (nextSlug) => {
    const previousSlug = project.slug;
    const normalizedSlug = makeSlug(nextSlug);
    updateProject({ slug: normalizedSlug });
    if (previousSlug === normalizedSlug) return;
    const { [previousSlug]: previousDetails, ...restDetails } = details;
    onDetailsChange({ ...restDetails, [normalizedSlug]: previousDetails || {} });
  };
  const removeProject = () => {
    const { [project.slug]: _removedDetails, ...restDetails } = details;
    onProjectsChange(projects.filter((_, itemIndex) => itemIndex !== safeIndex));
    onDetailsChange(restDetails);
    setSelectedIndex(Math.max(0, safeIndex - 1));
  };
  const add = () => {
    const slug = `project-${Date.now()}`;
    onProjectsChange([{ slug, title: "Новый проект" }, ...projects]);
    onDetailsChange({ ...details, [slug]: { description: ["Описание проекта"], photo: "", leaders: [], gallery: [], testimonials: [] } });
    setSelectedIndex(0);
  };

  return (
    <section className="admin-manager">
      <div className="admin-manager-head"><h2>Проекты и направления</h2><p>Выберите проект из списка по названию.</p></div>
      <div className="admin-split-editor">
        <AdminItemSelector items={projects} selectedIndex={safeIndex} onSelect={setSelectedIndex} onAdd={add} getTitle={(item) => item.title} addLabel="Добавить проект" />
        {project ? (
          <article className="card admin-edit-card">
            <div className="admin-form-grid">
              <AdminTextField label="Название проекта" value={project.title} onChange={(value) => updateProject({ title: value })} />
              <AdminTextField label="URL slug" value={project.slug} onChange={(value) => renameProjectSlug(value)} />
            </div>
            <AdminTextField label="Описание — абзацы с новой строки" value={Array.isArray(detail.description) ? detail.description.join("\n") : detail.description || ""} onChange={(value) => updateDetails(project.slug, { description: value.split("\n").filter(Boolean) })} textarea />
            <AdminTextField label="Для кого / программа — пункты с новой строки" value={(detail.forWhom || []).join("\n")} onChange={(value) => updateDetails(project.slug, { forWhom: value.split("\n").filter(Boolean) })} textarea />
            <AdminTextField label="Результаты — пункты с новой строки" value={(detail.results || []).join("\n")} onChange={(value) => updateDetails(project.slug, { results: value.split("\n").filter(Boolean) })} textarea />
            <ImageDropzone label="Обложка проекта" value={detail.photo} onChange={(value) => updateDetails(project.slug, { photo: value })} />
            <ImageDropzone label="Галерея проекта" value={detail.gallery || []} multiple onChange={(value) => updateDetails(project.slug, { gallery: value })} />
            <div className="admin-nested-list"><h3>Руководители</h3>{leaders.map((leader, leaderIndex) => <div className="admin-form-grid" key={leaderIndex}><AdminTextField label="Имя" value={leader.name} onChange={(value) => updateDetails(project.slug, { leaders: leaders.map((item, itemIndex) => itemIndex === leaderIndex ? { ...item, name: value } : item) })} /><AdminTextField label="Роль" value={leader.role || leader.bio} onChange={(value) => updateDetails(project.slug, { leaders: leaders.map((item, itemIndex) => itemIndex === leaderIndex ? { ...item, role: value } : item) })} /></div>)}<button onClick={() => updateDetails(project.slug, { leaders: [...leaders, { name: "", role: "" }] })}>Добавить руководителя</button></div>
            <div className="admin-actions"><button onClick={removeProject}>Удалить проект</button></div>
          </article>
        ) : <article className="card"><p>Пока нет проектов.</p></article>}
      </div>
    </section>
  );
}

function RegionsManager({ items, onChange }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const safeIndex = Math.min(selectedIndex, Math.max(items.length - 1, 0));
  const region = items[safeIndex];
  const update = (patch) => onChange(items.map((item, itemIndex) => itemIndex === safeIndex ? { ...item, ...patch } : item));
  const add = () => { onChange([{ slug: `region-${Date.now()}`, city: "Новый город", cover: "", leaders: [], news: [] }, ...items]); setSelectedIndex(0); };
  const remove = () => { onChange(items.filter((_, itemIndex) => itemIndex !== safeIndex)); setSelectedIndex(Math.max(0, safeIndex - 1)); };

  return (
    <section className="admin-manager">
      <div className="admin-manager-head"><h2>Отделения и руководители</h2><p>Выберите отделение из списка.</p></div>
      <div className="admin-split-editor">
        <AdminItemSelector items={items} selectedIndex={safeIndex} onSelect={setSelectedIndex} onAdd={add} getTitle={(item) => item.city} addLabel="Добавить отделение" />
        {region ? (
          <article className="card admin-edit-card">
            <div className="admin-form-grid"><AdminTextField label="Город" value={region.city} onChange={(value) => update({ city: value })} /><AdminTextField label="URL slug" value={region.slug} onChange={(value) => update({ slug: makeSlug(value) })} /></div>
            <ImageDropzone label="Обложка отделения" value={region.cover} onChange={(value) => update({ cover: value })} />
            <div className="admin-nested-list">
              <h3>Руководители</h3>
              {(region.leaders || []).map((leader, leaderIndex) => (
                <div className="admin-leader-editor" key={leaderIndex}>
                  <div className="admin-form-grid"><AdminTextField label="Имя" value={leader.name} onChange={(value) => update({ leaders: region.leaders.map((item, itemIndex) => itemIndex === leaderIndex ? { ...item, name: value } : item) })} /><AdminTextField label="Роль" value={leader.role} onChange={(value) => update({ leaders: region.leaders.map((item, itemIndex) => itemIndex === leaderIndex ? { ...item, role: value } : item) })} /><AdminTextField label="Контакт" value={leader.contact} onChange={(value) => update({ leaders: region.leaders.map((item, itemIndex) => itemIndex === leaderIndex ? { ...item, contact: value } : item) })} /></div>
                  <ImageDropzone label="Фото руководителя" value={leader.photo} onChange={(value) => update({ leaders: region.leaders.map((item, itemIndex) => itemIndex === leaderIndex ? { ...item, photo: value } : item) })} />
                  <button onClick={() => update({ leaders: region.leaders.filter((_, itemIndex) => itemIndex !== leaderIndex) })}>Удалить руководителя</button>
                </div>
              ))}
              <button onClick={() => update({ leaders: [...(region.leaders || []), { name: "", role: "", contact: "", photo: "", socials: [] }] })}>Добавить руководителя</button>
            </div>
            <div className="admin-actions"><button onClick={remove}>Удалить отделение</button></div>
          </article>
        ) : <article className="card"><p>Пока нет отделений.</p></article>}
      </div>
    </section>
  );
}

function GalleryManager({ items, onChange }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const safeIndex = Math.min(selectedIndex, Math.max(items.length - 1, 0));
  const album = items[safeIndex];
  const update = (patch) => onChange(items.map((item, itemIndex) => itemIndex === safeIndex ? { ...item, ...patch } : item));
  const add = () => { onChange([{ title: "Новый альбом", date: "", cover: "", photos: [] }, ...items]); setSelectedIndex(0); };
  const remove = () => { onChange(items.filter((_, itemIndex) => itemIndex !== safeIndex)); setSelectedIndex(Math.max(0, safeIndex - 1)); };

  return (
    <section className="admin-manager">
      <div className="admin-manager-head"><h2>Галерея</h2><p>Выберите альбом из списка.</p></div>
      <div className="admin-split-editor">
        <AdminItemSelector items={items} selectedIndex={safeIndex} onSelect={setSelectedIndex} onAdd={add} getTitle={(item) => item.title} addLabel="Добавить альбом" />
        {album ? (
          <article className="card admin-edit-card">
            <div className="admin-form-grid"><AdminTextField label="Название альбома" value={album.title} onChange={(value) => update({ title: value })} /><AdminTextField label="Дата" value={album.date} onChange={(value) => update({ date: value })} /></div>
            <ImageDropzone label="Обложка альбома" value={album.cover} onChange={(value) => update({ cover: value })} />
            <ImageDropzone label="Галерея альбома" value={album.photos || []} multiple onChange={(value) => update({ photos: value, cover: album.cover || value[0] || "" })} />
            <p className="admin-note">После загрузки галереи нажмите «Сохранить изменения» сверху.</p>
            <div className="admin-actions"><button onClick={remove}>Удалить альбом</button></div>
          </article>
        ) : <article className="card"><p>Пока нет альбомов.</p></article>}
      </div>
    </section>
  );
}

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true");
  const [loginForm, setLoginForm] = useState({ login: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [activeTool, setActiveTool] = useState("events");
  const [activeSection, setActiveSection] = useState(cmsSections[0].key);
  const [content, setContent] = useState(() => getDefaultCmsContent());
  const [draftContent, setDraftContent] = useState(() => content);
  const [draft, setDraft] = useState(() => JSON.stringify(content[cmsSections[0].key], null, 2));
  const [editorError, setEditorError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    loadServerCmsContent().then((serverContent) => {
      if (!serverContent) return;
      const normalizedContent = normalizeCmsContent(serverContent);
      setContent(normalizedContent);
      setDraftContent(normalizedContent);
      applyCmsContent(normalizedContent);
      setDraft(JSON.stringify(normalizedContent[cmsSections[0].key], null, 2));
    });
  }, []);

  const persistContent = async (nextContent, message = "Сохранено. Контент записан в серверную CMS и доступен всем посетителям.") => {
    setEditorError("");
    setSaveMessage("Сохраняем контент и изображения...");

    let serverContent = normalizeCmsContent(nextContent);

    try {
      serverContent = normalizeCmsContent(await replaceEmbeddedImages(serverContent));
      await saveServerCmsContent(serverContent);
    } catch (error) {
      console.error("Ошибка сохранения CMS-контента", error);
      setDraftContent(serverContent);
      setDraft(JSON.stringify(serverContent[activeSection], null, 2));
      setSaveMessage(`Не удалось опубликовать изменения: ${error.message}. Изменения остались в форме, но не показаны посетителям. Проверьте, что сервер CMS отвечает на /api/content, и нажмите «Сохранить изменения» ещё раз.`);
      return false;
    }

    setContent(serverContent);
    setDraftContent(serverContent);
    setDraft(JSON.stringify(serverContent[activeSection], null, 2));
    applyCmsContent(serverContent);
    setSaveMessage(message);
    return true;
  };

  const updateContentSection = (key, value) => {
    setDraftContent((current) => ({ ...current, [key]: value }));
    setSaveMessage("Есть несохраненные изменения — нажмите «Сохранить изменения».");
  };

  const saveVisualContent = () => {
    persistContent(draftContent, "Сохранено. Все изменения, включая загруженные фотографии, записаны в серверной CMS.");
  };

  const summary = {
    events: draftContent.events?.length || 0,
    galleryAlbums: draftContent.galleryAlbums?.length || 0,
    regionalBranches: draftContent.regionalBranches?.length || 0,
    clubProjects: draftContent.clubProjects?.length || 0,
    seoPages: Object.keys(draftContent.pageSeo || {}).length,
  };

  const selectSection = (key) => {
    setActiveSection(key);
    setDraft(JSON.stringify(draftContent[key], null, 2));
    setEditorError("");
    setSaveMessage("");
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (loginForm.login === ADMIN_LOGIN && loginForm.password === ADMIN_PASSWORD) {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      setIsAuthenticated(true);
      setLoginError("");
      return;
    }
    setLoginError("Неверный логин или пароль.");
  };

  const handleJsonSave = () => {
    try {
      const parsed = JSON.parse(draft);
      const nextContent = normalizeCmsContent({ ...draftContent, [activeSection]: parsed });
      setDraftContent(nextContent);
      persistContent(nextContent);
      setEditorError("");
    } catch (error) {
      setEditorError(`Проверьте JSON: ${error.message}`);
      setSaveMessage("");
    }
  };

  const resetSection = () => {
    const defaults = getDefaultCmsContent();
    const nextContent = { ...content, [activeSection]: defaults[activeSection] };
    persistContent(nextContent, "Раздел сброшен к исходному контенту.");
    setDraft(JSON.stringify(nextContent[activeSection], null, 2));
    setEditorError("");
  };

  const exportContent = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "evtenia-cms-content.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="page admin-login-page">
        <section className="card admin-login-card">
          <h1>Вход в CMS EVTENIA</h1>
          <p className="lead">Админка защищена паролем. Введите учетные данные администратора.</p>
          <form className="form" onSubmit={handleLogin}>
            <input value={loginForm.login} onChange={(e) => setLoginForm((prev) => ({ ...prev, login: e.target.value }))} placeholder="Логин" autoComplete="username" />
            <input value={loginForm.password} onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))} placeholder="Пароль" type="password" autoComplete="current-password" />
            {loginError && <p className="admin-error">{loginError}</p>}
            <button className="btn" type="submit">Войти</button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="page admin-page">
      <div className="admin-heading">
        <div>
          <h1>CMS EVTENIA</h1>
          <p className="lead">Рабочее управление контентом: добавляйте мероприятия, проекты, руководителей и адаптивные галереи. Фото можно перетащить мышью — CMS уменьшит их перед сохранением.</p>
        </div>
        <button className="btn btn-small" onClick={() => { window.sessionStorage.removeItem(ADMIN_SESSION_KEY); setIsAuthenticated(false); }}>Выйти</button>
      </div>

      <div className="cards grid-3 admin-stats">
        <article className="card"><h3>Мероприятия</h3><p>{summary.events}</p></article>
        <article className="card"><h3>Проекты</h3><p>{summary.clubProjects}</p></article>
        <article className="card"><h3>Отделения</h3><p>{summary.regionalBranches}</p></article>
        <article className="card"><h3>Альбомы</h3><p>{summary.galleryAlbums}</p></article>
        <article className="card"><h3>SEO-страницы</h3><p>{summary.seoPages}</p></article>
      </div>

      <div className="admin-save-bar">
        <p>Изменения в формах сначала попадают в черновик. Чтобы фотографии и тексты точно сохранились, нажмите кнопку сохранения.</p>
        <button className="btn" onClick={saveVisualContent}>Сохранить изменения</button>
      </div>

      <div className="admin-tabs admin-main-tabs">
        <button className={activeTool === "events" ? "active" : ""} onClick={() => setActiveTool("events")}>Мероприятия</button>
        <button className={activeTool === "projects" ? "active" : ""} onClick={() => setActiveTool("projects")}>Проекты</button>
        <button className={activeTool === "regions" ? "active" : ""} onClick={() => setActiveTool("regions")}>Отделения</button>
        <button className={activeTool === "gallery" ? "active" : ""} onClick={() => setActiveTool("gallery")}>Галерея</button>
        <button className={activeTool === "json" ? "active" : ""} onClick={() => setActiveTool("json")}>Расширенный JSON</button>
        <button className="btn btn-small" onClick={exportContent}>Экспорт JSON</button>
      </div>

      {saveMessage && <p className="admin-success">{saveMessage}</p>}

      {activeTool === "events" && <EventsManager items={draftContent.events || []} projects={draftContent.clubProjects || []} onChange={(value) => updateContentSection("events", value)} />}
      {activeTool === "projects" && <ProjectsManager projects={draftContent.clubProjects || []} details={draftContent.projectDetails || {}} onProjectsChange={(value) => updateContentSection("clubProjects", value)} onDetailsChange={(value) => updateContentSection("projectDetails", value)} />}
      {activeTool === "regions" && <RegionsManager items={draftContent.regionalBranches || []} onChange={(value) => updateContentSection("regionalBranches", value)} />}
      {activeTool === "gallery" && <GalleryManager items={draftContent.galleryAlbums || []} onChange={(value) => updateContentSection("galleryAlbums", value)} />}

      {activeTool === "json" && (
        <section className="card admin-cms-card">
          <div className="admin-cms-toolbar">
            <div className="admin-tabs">
              {cmsSections.map((section) => <button className={section.key === activeSection ? "active" : ""} key={section.key} onClick={() => selectSection(section.key)}>{section.title}</button>)}
            </div>
          </div>
          <label className="admin-editor-label" htmlFor="cms-editor">Раздел: {cmsSections.find((section) => section.key === activeSection)?.title}</label>
          <textarea id="cms-editor" className="admin-json-editor" value={draft} onChange={(e) => setDraft(e.target.value)} spellCheck="false" />
          {editorError && <p className="admin-error">{editorError}</p>}
          <div className="admin-actions">
            <button className="btn" onClick={handleJsonSave}>Сохранить раздел</button>
            <button onClick={() => setDraft(JSON.stringify(draftContent[activeSection], null, 2))}>Отменить правки</button>
            <button onClick={resetSection}>Сбросить раздел</button>
          </div>
        </section>
      )}
    </div>
  );
}

function NotFound({ goTo }) {
  return <div className="page"><h1>Страница не найдена</h1><button onClick={() => goTo("/")}>На главную</button></div>;
}

export default function App() {
  const { path, goTo } = usePath();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contentVersion, setContentVersion] = useState(0);

  useEffect(() => {
    loadServerCmsContent().then((serverContent) => {
      if (!serverContent) return;
      const normalizedContent = normalizeCmsContent(serverContent);
      applyCmsContent(normalizedContent);
      setContentVersion((version) => version + 1);
    });
  }, []);

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
  }, [path, contentVersion]);

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
    if (path === "/privacy") return <LegalDocumentPage type="privacy" />;
    if (path === "/consent") return <LegalDocumentPage type="consent" />;
    if (path === "/partners") return <PartnersPage goTo={goTo} />;
    if (path === "/stories") return <StoriesPage />;
    if (path === "/services") return <ServicesPage goTo={goTo} />;
    if (path === "/services/propose-service") return <ProposeServicePage goTo={goTo} />;
    if (path.startsWith("/services/")) return <ServiceDetailPage slug={path.split("/services/")[1]} goTo={goTo} />;
    if (path === "/housing-committee") return <HousingCommitteePage />;
    if (path === "/courses") return <CoursesPage />;
    if (path === "/faq") return <FaqPage />;
    if (path === "/team") return <TeamPage />;
    if (path === "/admin") return <AdminPage />;
    return <NotFound goTo={goTo} />;
  }, [path, contentVersion]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [path]);

  return <Layout goTo={goTo} path={path} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>{page}</Layout>;
}
