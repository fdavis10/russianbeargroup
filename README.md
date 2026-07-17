# SVO Africa Agency — Landing Page

Одностраничный лендинг рекрутингового агентства (набор для СВО в Африке) на **React + Django REST Framework**.

## Стек

| Слой | Технологии |
|------|------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion, React Hook Form, Axios |
| Backend | Django 5.1, DRF, SQLite, **aiogram 3** (Telegram-бот) |

## Запуск

### Backend

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # заполните TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Сайт: http://localhost:5173

### Telegram-бот для админов (отдельный терминал)

```bash
cd backend
source .venv/bin/activate
python manage.py runtelegrambot
```

Бот **не для пользователей сайта** — только для получения уведомлений о заявках.

## API

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/content/` | Контент лендинга |
| POST | `/api/contact/` | Отправка заявки → Telegram + WhatsApp |
| GET | `/api/documents/` | Список PDF-документов |
| GET | `/api/documents/{id}/` | Скачать PDF |

## Дашборд аналитики (`/dashboard`)

Защищённый раздел с графиками и KPI. Публичной регистрации нет — пользователи создаются вручную.

**Аутентификация:** JWT (Bearer token, срок 7 дней). Пароли хранятся как bcrypt-хэш через Django hashers.

**Роли:** `admin`, `manager`, `viewer` — все видят аналитику; управление пользователями — через CLI или Django Admin.

### Создание пользователя

```bash
cd backend
python manage.py create_dashboard_user \
  --username admin \
  --password "ваш-пароль" \
  --name "Администратор" \
  --role admin
```

На сервере (Docker):

```bash
docker compose exec backend python manage.py create_dashboard_user \
  --username admin --password "..." --name "Админ" --role admin
```

### API дашборда

| Метод | URL | Описание |
|-------|-----|----------|
| POST | `/api/dashboard/auth/login/` | Вход (username, password) |
| GET | `/api/dashboard/auth/me/` | Текущий пользователь |
| GET | `/api/dashboard/kpi/` | KPI-карточки |
| GET | `/api/dashboard/clicks/?period=day` | Клики по форме |
| GET | `/api/dashboard/visitors/?period=day` | Посетители |
| GET | `/api/dashboard/submissions/?period=day` | Заявки |
| GET | `/api/dashboard/submissions-heatmap/` | Заявки по времени суток |
| POST | `/api/analytics/track/` | Трекинг событий (публичный) |

Период: `hour`, `day`, `week`, `month`.

Страницы: `/login` — вход, `/dashboard` — аналитика (только RU).


1. Создайте бота: [@BotFather](https://t.me/BotFather) → `/newbot`
2. Добавьте в `backend/.env`:
   ```env
   TELEGRAM_BOT_TOKEN=123456:ABC...
   TELEGRAM_ADMIN_SECRET=придумайте-секретный-ключ
   ```
3. Запустите бота: `python manage.py runtelegrambot`
4. Админ пишет боту (один раз):
   ```
   /start придумайте-секретный-ключ
   ```
   Chat ID сохраняется в БД автоматически — **в .env указывать не нужно**.

5. Каждая заявка с сайта приходит всем подписанным админам.

| Команда | Описание |
|---------|----------|
| `/start <секрет>` | Подписаться на уведомления |
| `/stop` | Отписаться |
| `/status` | Статус подписки |

Список админов также в Django Admin → Telegram-админы.

## Интеграция WhatsApp

- **Клиент:** кнопки `wa.me` и автооткрытие после отправки формы
- **Сервер (опционально):** Twilio WhatsApp Business API — переменные `TWILIO_*` в `.env`

## Структура фронтенда

```
src/
├── components/
│   ├── HeroSection.tsx
│   ├── RequirementsList.tsx
│   ├── ContactForm.tsx
│   ├── ReviewsCarousel.tsx
│   ├── CountriesCircle.tsx
│   ├── ServicesSection.tsx
│   └── Footer.tsx
├── pages/HomePage.tsx
├── hooks/useTelegramBot.ts
└── api.ts
```

## Деплой

Подробная инструкция: **[DEPLOY.md](./DEPLOY.md)** — SSH, Git, Docker Compose.

Кратко на сервере:

```bash
git clone <repo-url> /opt/russianbeargroup && cd /opt/russianbeargroup
cp .env.example .env   # заполните переменные
docker compose build
docker compose up -d
docker compose exec backend python manage.py createsuperuser
```

- Frontend + API: nginx на порту `80`
- Telegram-бот: отдельный контейнер `bot`
- БД: SQLite в Docker volume `backend_data`

## Админка

```bash
python manage.py createsuperuser
```

Заявки доступны в `/admin/` → Contact.
