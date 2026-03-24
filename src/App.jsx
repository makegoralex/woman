import { useEffect, useMemo, useState } from "react";
import "./styles.css";

const clubDirections = [
  { title: "Бизнес и предпринимательство", text: "Мастермайнды, разборы кейсов и клубные бизнес-завтраки." },
  { title: "Развитие и образование", text: "Лекции, практикумы и встречи с экспертами разных сфер." },
  { title: "Нетворкинг", text: "Тёплая среда знакомств, партнерств и совместных проектов." },
  { title: "Женские встречи", text: "Камерные встречи про баланс, самоценность и ресурсы." },
  { title: "Культурные события", text: "Арт-вечера, камерная музыка и интеллектуальный досуг." },
  { title: "Lifestyle и вдохновение", text: "Практики восстановления, стиля жизни и внутренней опоры." },
];

const events = [
  {
    slug: "business-breakfast-march",
    title: "Бизнес-завтрак: личный бренд 2026",
    date: "12 апреля 2026",
    time: "10:00–13:00",
    place: "Москва, Soho Rooms",
    format: "Оффлайн",
    category: "Бизнес",
    status: "future",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    short: "Практическая встреча о позиционировании, репутации и росте экспертности.",
    program: ["Нетворкинг и welcome-coffee", "Панель с основательницами бизнесов", "Q&A + закрытый клубный круг"],
    audience: "Предпринимательницы, эксперты, руководительницы команд.",
  },
  {
    slug: "networking-evening-april",
    title: "Нетворкинг-вечер EVTENIA: связи, которые растут",
    date: "25 апреля 2026",
    time: "19:00–22:00",
    place: "Санкт-Петербург, Dom Boutique Hotel",
    format: "Оффлайн",
    category: "Нетворкинг",
    status: "future",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80",
    short: "Интеллигентный вечер знакомств, мини-питчи и новые партнерства.",
    program: ["Круг знакомств", "Формат быстрых диалогов", "After-talk с модератором клуба"],
    audience: "Для участниц, которые хотят расширить деловой и личный круг общения.",
  },
  {
    slug: "wellbeing-circle",
    title: "Женский круг: энергия, опора, баланс",
    date: "7 мая 2026",
    time: "18:30–21:00",
    place: "Москва, клубное пространство EVTENIA",
    format: "Оффлайн",
    category: "Женские встречи",
    status: "future",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    short: "Камерная встреча для глубокой перезагрузки и поддержки в кругу женщин.",
    program: ["Практика заземления", "Тематическое обсуждение", "Чайная церемония"],
    audience: "Для тех, кому важно бережное и вдохновляющее окружение.",
  },
  {
    slug: "public-speaking-lab",
    title: "Лаборатория выступлений: голос и уверенность",
    date: "21 мая 2026",
    time: "17:00–20:00",
    place: "Онлайн + офлайн студия",
    format: "Гибрид",
    category: "Обучение",
    status: "future",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",
    short: "Тренировка публичных выступлений и подачи себя перед аудиторией.",
    program: ["Разбор структуры речи", "Практика на камеру", "Индивидуальная обратная связь"],
    audience: "Для спикеров, основательниц и экспертов.",
  },
  {
    slug: "autumn-forum-2025",
    title: "Итоги форума EVTENIA: женщины в новой экономике",
    date: "18 ноября 2025",
    time: "11:00–18:00",
    place: "Москва, LOFT#7",
    format: "Оффлайн",
    category: "Special events",
    status: "past",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    short: "Большой клубный форум с 300+ участницами, экспертами и партнерами.",
    program: ["Пленарная сессия", "Экспертные панели", "Вечерний networking"],
    audience: "Открытое мероприятие для участниц и гостей клуба.",
  },
  {
    slug: "charity-culture-night",
    title: "Благотворительный культурный вечер",
    date: "13 декабря 2025",
    time: "19:30–23:00",
    place: "Казань, Art Hall",
    format: "Оффлайн",
    category: "Культурные события",
    status: "past",
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
    short: "Музыка, искусство и сбор средств в поддержку женских образовательных проектов.",
    program: ["Камерный концерт", "Арт-аукцион", "Партнерские выступления"],
    audience: "Для участниц клуба и партнеров EVTENIA.",
  },
];

const posts = [
  { slug: "march-community-results", title: "Как прошёл март в EVTENIA: 4 встречи и 120 новых знакомств", category: "Новости клуба", date: "20 марта 2026", excerpt: "Подвели итоги месяца и собрали лучшие моменты встреч в одном материале." },
  { slug: "career-shifts", title: "Бизнес и карьера: как мягко расти в период изменений", category: "Бизнес и карьера", date: "16 марта 2026", excerpt: "Практические подходы от участниц клуба, которые масштабируют проекты без выгорания." },
  { slug: "interview-founder", title: "Интервью с основательницей EVTENIA: зачем нам клубная культура", category: "Интервью", date: "10 марта 2026", excerpt: "О миссии сообщества, ценностях и том, как рождаются сильные женские связи." },
  { slug: "event-announcement-april", title: "Анонс апреля: нетворкинг-вечер и лаборатория выступлений", category: "Мероприятия", date: "5 марта 2026", excerpt: "Две новые встречи, на которых можно заявить о себе и найти партнеров." },
  { slug: "member-story-anastasia", title: "История участницы: как клуб помог запустить второй бизнес", category: "Истории участниц", date: "28 февраля 2026", excerpt: "Личный кейс о поддержке, окружении и смелости выйти на новый уровень." },
  { slug: "wellbeing-habits", title: "Полезные материалы: 7 ритуалов ресурсного утра", category: "Женское развитие", date: "21 февраля 2026", excerpt: "Небольшие привычки, которые помогают сохранять ясность и энергию." },
  { slug: "partners-open-call", title: "Открыт набор партнёров на летнюю программу клуба", category: "Новости клуба", date: "15 февраля 2026", excerpt: "Приглашаем бренды и экспертов к совместным образовательным форматам." },
  { slug: "safe-networking", title: "Как строить нетворкинг в безопасной женской среде", category: "Полезные материалы", date: "10 февраля 2026", excerpt: "Принципы общения и форматы знакомств, которые работают вдолгую." },
];

const galleryAlbums = [
  {
    title: "Весенний business brunch",
    date: "март 2026",
    cover: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Камерный вечер историй участниц",
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
  { quote: "Я пришла за новыми контактами, а получила сильное окружение и поддержку на каждом этапе.", name: "Екатерина С.", role: "предпринимательница" },
  { quote: "В EVTENIA комфортно говорить о росте, сомнениях и идеях — тебя действительно слышат.", name: "Мария Л.", role: "участница клуба" },
  { quote: "После двух встреч я нашла партнера для нового проекта и уверенность выступать публично.", name: "Анна Р.", role: "маркетинг-консультант" },
  { quote: "Очень эстетичная и умная среда: без шума, но с реальными результатами.", name: "Ольга К.", role: "основательница бренда" },
];

const pageSeo = {
  "/": { title: "EVTENIA — женский клуб, события и развитие", description: "Современный женский клуб EVTENIA: мероприятия, новости, нетворкинг, поддержка и заявки на участие." },
  "/about": { title: "О клубе EVTENIA", description: "Миссия, ценности и форматы клуба EVTENIA для женщин, которые растут в бизнесе и жизни." },
  "/events": { title: "Мероприятия EVTENIA", description: "Календарь ближайших и прошедших мероприятий клуба EVTENIA: бизнес, нетворкинг, обучение." },
  "/news": { title: "Новости и блог EVTENIA", description: "Новости клуба, статьи, интервью и полезные материалы для участниц EVTENIA." },
  "/gallery": { title: "Галерея EVTENIA", description: "Фотоотчеты и атмосфера мероприятий женского клуба EVTENIA." },
  "/join": { title: "Вступить в клуб EVTENIA", description: "Подать заявку на участие в женском клубе EVTENIA: анкета, форматы участия и преимущества." },
  "/contacts": { title: "Контакты EVTENIA", description: "Контакты, соцсети, обратная связь и партнерские запросы клуба EVTENIA." },
  "/privacy": { title: "Политика конфиденциальности — EVTENIA", description: "Политика обработки персональных данных сайта EVTENIA." },
  "/consent": { title: "Согласие на обработку персональных данных — EVTENIA", description: "Согласие пользователя на обработку персональных данных для заявок EVTENIA." },
  "/partners": { title: "Партнеры EVTENIA", description: "Партнеры и открытые форматы сотрудничества с женским клубом EVTENIA." },
  "/stories": { title: "Истории участниц EVTENIA", description: "Отзывы и истории участниц сообщества EVTENIA." },
  "/faq": { title: "FAQ EVTENIA", description: "Ответы на частые вопросы о вступлении и участии в клубе EVTENIA." },
  "/team": { title: "Команда EVTENIA", description: "Основательница и команда, которые создают сообщество EVTENIA." },
  "/admin": { title: "Админка EVTENIA (демо)", description: "Демо-панель управления контентом EVTENIA." },
};

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
  const nav = [
    ["/", "Главная"], ["/about", "О клубе"], ["/events", "Мероприятия"], ["/news", "Новости"],
    ["/gallery", "Галерея"], ["/join", "Вступить"], ["/contacts", "Контакты"],
  ];

  return (
    <div className="site">
      <header className="header">
        <button className="logo" onClick={() => goTo("/")}>EVTENIA</button>
        <button
          className={`burger ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Открыть меню"
        >
          ☰
        </button>
        <nav className={mobileMenuOpen ? "open" : ""}>
          {nav.map(([href, label]) => (
            <button
              key={href}
              className={`nav-link ${path === href ? "active" : ""}`}
              onClick={() => {
                goTo(href);
                setMobileMenuOpen(false);
              }}
            >
              {label}
            </button>
          ))}
        </nav>
        <button
          className="btn btn-small"
          onClick={() => {
            goTo("/join");
            setMobileMenuOpen(false);
          }}
        >
          Подать заявку
        </button>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div>
          <h4>EVTENIA</h4>
          <p>Женское сообщество, где встречаются развитие, поддержка и стильная клубная культура.</p>
        </div>
        <div className="footer-links">
          {["/privacy", "/consent", "/partners", "/stories", "/faq", "/team", "/admin"].map((href) => (
            <button key={href} onClick={() => goTo(href)}>{href.replace("/", "").toUpperCase()}</button>
          ))}
        </div>
      </footer>
    </div>
  );
}

function Hero({ goTo }) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Женский клуб и медиаплатформа</p>
        <h1>EVTENIA — пространство развития, знакомств и сильного окружения</h1>
        <p className="lead">События, бизнес-встречи, образовательные форматы и поддерживающее сообщество для женщин, которые хотят расти в своём темпе и масштабе.</p>
        <div className="actions">
          <button className="btn" onClick={() => goTo("/events")}>Смотреть мероприятия</button>
          <button className="btn btn-ghost" onClick={() => goTo("/join")}>Оставить заявку</button>
        </div>
        <ul className="bullets">
          <li>женские встречи</li><li>бизнес-сообщество</li><li>развитие и поддержка</li><li>события и знакомства</li>
        </ul>
      </div>
      <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" alt="Атмосфера клубного пространства EVTENIA" />
    </section>
  );
}

function Home({ goTo }) {
  return (
    <div className="page">
      <Hero goTo={goTo} />
      <section>
        <h2>Что такое EVTENIA</h2>
        <p>Это живой женский клуб, который объединяет офлайн-встречи, образовательные события и доверительное деловое окружение. Мы создаем среду, где можно развиваться, находить партнёрства и быть собой.</p>
      </section>

      <section>
        <div className="section-head"><h2>Ближайшие мероприятия</h2><button onClick={() => goTo("/events")}>Все события →</button></div>
        <div className="cards grid-3">{events.filter((e) => e.status === "future").slice(0, 4).map((e) => <EventCard key={e.slug} event={e} goTo={goTo} />)}</div>
      </section>

      <section>
        <h2>Направления клуба</h2>
        <div className="cards grid-3">{clubDirections.map((d) => <article key={d.title} className="card"><h3>{d.title}</h3><p>{d.text}</p></article>)}</div>
      </section>

      <section>
        <div className="section-head"><h2>Новости и статьи</h2><button onClick={() => goTo("/news")}>Все материалы →</button></div>
        <div className="cards grid-3">{posts.slice(0, 6).map((post) => <PostCard key={post.slug} post={post} goTo={goTo} />)}</div>
      </section>

      <section>
        <h2>Атмосфера клуба</h2>
        <div className="gallery-grid">{galleryAlbums.map((album) => <figure key={album.title}><img src={album.cover} alt={album.title} /><figcaption>{album.title} · {album.date}</figcaption></figure>)}</div>
      </section>

      <section>
        <h2>Отзывы участниц</h2>
        <div className="cards grid-2">{testimonials.map((t) => <article className="card" key={t.name}><p>“{t.quote}”</p><strong>{t.name}</strong><small>{t.role}</small></article>)}</div>
      </section>

      <JoinForm compact />

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
      <h3>{event.title}</h3>
      <p>{event.short}</p>
      <button onClick={() => goTo(`/events/${event.slug}`)}>Подробнее</button>
    </article>
  );
}

function PostCard({ post, goTo }) {
  return (
    <article className="card post-card">
      <small>{post.category} · {post.date}</small>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <button onClick={() => goTo(`/news/${post.slug}`)}>Читать</button>
    </article>
  );
}

function EventsPage({ goTo }) {
  const [status, setStatus] = useState("future");
  const [category, setCategory] = useState("all");
  const categories = ["all", ...new Set(events.map((e) => e.category))];
  const filtered = events.filter((e) => (status === "all" ? true : e.status === status) && (category === "all" ? true : e.category === category));
  return (
    <div className="page">
      <h1>Мероприятия EVTENIA</h1>
      <div className="filters">
        <label>Статус <select value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">Все</option><option value="future">Будущие</option><option value="past">Прошедшие</option></select></label>
        <label>Категория <select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>
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
      <h3>Спикеры</h3><p>Основательница клуба, приглашённые эксперты и участницы с практическими кейсами.</p>
      <button className="btn" onClick={() => goTo("/join")}>Записаться</button>

      <section>
        <h2>Похожие мероприятия</h2>
        <div className="cards grid-3">{related.map((item) => <EventCard key={item.slug} event={item} goTo={goTo} />)}</div>
      </section>

      <section>
        <h2>FAQ</h2>
        <p><strong>Можно прийти впервые?</strong> Да, формат открыт для новых участниц.</p>
        <p><strong>Как подтвердить участие?</strong> После заявки менеджер свяжется с вами в течение 24 часов.</p>
        <p><strong>Условия участия:</strong> Предварительная регистрация обязательна.</p>
      </section>
    </div>
  );
}

function NewsPage({ goTo }) {
  const categories = ["Все", ...new Set(posts.map((p) => p.category))];
  const [active, setActive] = useState("Все");
  const filtered = posts.filter((p) => active === "Все" || p.category === active);
  return (
    <div className="page">
      <h1>Новости и блог</h1>
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
      <p>EVTENIA создаёт пространство, где женщины находят не только события, но и ощущение опоры, уверенности и практических возможностей для роста.</p>
      <h3>Что внутри материала</h3>
      <ul><li>Ключевые выводы по теме.</li><li>Рекомендации от участниц и кураторов клуба.</li><li>Приглашение в следующие форматы сообщества.</li></ul>
      <p>Это демо-материал для презентации контентной структуры и будущего редакционного наполнения клуба.</p>
      <button onClick={() => goTo("/news")}>← К списку материалов</button>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page">
      <h1>О клубе EVTENIA</h1>
      <p>EVTENIA создан для женщин, которым важно профессиональное развитие, круг поддержки и эстетичное живое сообщество. Мы соединяем деловые, образовательные и lifestyle-форматы в одной платформе.</p>
      <div className="cards grid-2">
        <article className="card"><h3>Миссия</h3><p>Создавать сильную и безопасную среду, где женщины растут, знакомятся и реализуют проекты.</p></article>
        <article className="card"><h3>Ценности</h3><p>Уважение, интеллект, поддержка, качество общения и этика партнерства.</p></article>
        <article className="card"><h3>Для кого клуб</h3><p>Для предпринимательниц, экспертов, руководительниц и активных женщин, которые хотят развиваться в сильном окружении.</p></article>
        <article className="card"><h3>Форматы участия</h3><p>Открытые мероприятия, клубное членство, спец-программы и партнёрские коллаборации.</p></article>
      </div>
    </div>
  );
}

function JoinForm({ compact = false }) {
  return (
    <section className={compact ? "join compact" : "join"}>
      <h2>{compact ? "Оставьте заявку" : "Вступить в клуб EVTENIA"}</h2>
      <p>Расскажите о себе — мы подберём подходящий формат участия.</p>
      <form className="form" onSubmit={(e) => { e.preventDefault(); alert("Спасибо! Заявка отправлена."); }}>
        <input required placeholder="Имя" />
        <input required placeholder="Телефон" />
        <input required type="email" placeholder="Email" />
        {!compact && <input placeholder="Город" />}
        {!compact && <input placeholder="Чем занимаетесь" />}
        <select defaultValue=""> 
          <option value="" disabled>Что интересует</option>
          <option>Участие в клубе</option><option>Партнерство</option><option>Мероприятие</option><option>Консультация</option>
        </select>
        <textarea placeholder="Комментарий" rows="4" />
        <button className="btn" type="submit">Отправить заявку</button>
      </form>
    </section>
  );
}

function JoinPage() {
  return (
    <div className="page">
      <h1>Вступить / подать заявку</h1>
      <div className="cards grid-3">
        <article className="card"><h3>Зачем вступать</h3><p>Чтобы быть в окружении женщин, которые растут и поддерживают друг друга.</p></article>
        <article className="card"><h3>Что получает участница</h3><p>Доступ к событиям, закрытым форматам, контенту и клубным знакомствам.</p></article>
        <article className="card"><h3>Форматы участия</h3><p>Гостевой визит, резидентство, партнёрские пакеты и special events.</p></article>
      </div>
      <JoinForm />
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

function ContactsPage() {
  return (
    <div className="page">
      <h1>Контакты</h1>
      <div className="cards grid-2">
        <article className="card"><h3>Связаться</h3><p>Email: hello@evtenia.club<br />Telegram: @evtenia_club<br />WhatsApp: +7 (900) 000-00-00</p></article>
        <article className="card"><h3>Оффлайн-точка</h3><p>Москва, Пресненская наб., 8<br />По предварительной записи на мероприятия и встречи.</p></article>
      </div>
      <JoinForm compact />
    </div>
  );
}

function SimplePage({ title, text }) {
  return <div className="page"><h1>{title}</h1><p>{text}</p></div>;
}

function TeamPage() {
  return (
    <div className="page">
      <h1>Команда и основатель</h1>
      <div className="cards grid-3">
        <article className="card"><h3>Евгения Т.</h3><p>Основательница EVTENIA, модератор клубных программ.</p></article>
        <article className="card"><h3>Куратор событий</h3><p>Отвечает за календарь, качество форматов и атмосферу встреч.</p></article>
        <article className="card"><h3>Редакционная команда</h3><p>Ведет новости, интервью и экспертные материалы платформы.</p></article>
      </div>
    </div>
  );
}

function StoriesPage() {
  return <div className="page"><h1>Отзывы / истории участниц</h1><div className="cards grid-2">{testimonials.map((t) => <article className="card" key={t.name}><p>“{t.quote}”</p><strong>{t.name}</strong><small>{t.role}</small></article>)}</div></div>;
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
    if (path === "/events") return <EventsPage goTo={goTo} />;
    if (path.startsWith("/events/")) return <EventDetail slug={path.split("/events/")[1]} goTo={goTo} />;
    if (path === "/news") return <NewsPage goTo={goTo} />;
    if (path.startsWith("/news/")) return <NewsDetail slug={path.split("/news/")[1]} goTo={goTo} />;
    if (path === "/gallery") return <GalleryPage />;
    if (path === "/join") return <JoinPage />;
    if (path === "/contacts") return <ContactsPage />;
    if (path === "/privacy") return <SimplePage title="Политика конфиденциальности" text="Мы бережно относимся к персональным данным и используем их только для связи по заявкам и участия в клубе." />;
    if (path === "/consent") return <SimplePage title="Согласие на обработку персональных данных" text="Отправляя форму, вы подтверждаете согласие на обработку персональных данных в целях коммуникации по заявке." />;
    if (path === "/partners") return <SimplePage title="Партнеры" text="EVTENIA открыта к партнерским проектам с брендами, экспертами и образовательными платформами." />;
    if (path === "/stories") return <StoriesPage />;
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
