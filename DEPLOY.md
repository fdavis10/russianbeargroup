# Deploy

Ручной деплой на VPS через SSH, Git и Docker Compose.

## Архитектура

| Контейнер | Назначение |
|-----------|------------|
| `nginx` | Публичный вход :80 — фронт + прокси `/api`, `/admin`, `/static` |
| `frontend` | Собранный React (Vite) |
| `backend` | Django + Gunicorn |
| `bot` | Telegram-бот (aiogram polling) |

Данные SQLite хранятся в Docker volume `backend_data`.

---

## 1. Подготовка сервера (один раз)

Подключитесь по SSH:

```bash
ssh user@YOUR_SERVER_IP
```

Установите Docker и Compose plugin:

```bash
sudo apt update
sudo apt install -y git curl ca-certificates
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

Перелогиньтесь (`exit` → снова `ssh`), проверьте:

```bash
docker --version
docker compose version
```

Создайте каталог проекта:

```bash
sudo mkdir -p /opt/russianbeargroup
sudo chown $USER:$USER /opt/russianbeargroup
cd /opt/russianbeargroup
```

---

## 2. Клонирование и настройка `.env`

```bash
git clone https://github.com/YOUR_USER/russianbeargroup.git .
cp .env.example .env
nano .env
```

**Обязательно заполните:**

- `DJANGO_SECRET_KEY` — длинная случайная строка
- `DJANGO_DEBUG=false`
- `DJANGO_ALLOWED_HOSTS` — ваш домен и IP сервера
- `CORS_ALLOWED_ORIGINS` и `CSRF_TRUSTED_ORIGINS` — `https://ваш-домен.ru`
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_ADMIN_SECRET`

Пример генерации секрета:

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(50))"
```

---

## 3. Первый запуск

```bash
cd /opt/russianbeargroup
docker compose build
docker compose up -d
docker compose ps
```

Проверка логов:

```bash
docker compose logs -f backend
docker compose logs -f bot
docker compose logs -f nginx
```

Создайте суперпользователя Django:

```bash
docker compose exec backend python manage.py createsuperuser
```

Откройте в браузере:

- Сайт: `http://YOUR_SERVER_IP`
- API: `http://YOUR_SERVER_IP/api/content/`
- Админка: `http://YOUR_SERVER_IP/admin/`

Подпишите Telegram-бота (в Telegram):

```
/start ваш_TELEGRAM_ADMIN_SECRET
```

---

## 4. CI/CD (GitHub Actions) — preview, потом прод

| Ветка | Workflow | Сайт |
|-------|----------|------|
| `develop` | **Deploy Development** | `https://development.irc-russianbear.army` |
| `main` | **Deploy** | `https://irc-russianbear.army` |

### Рабочий процесс

1. Коммиты в **`develop`** → автоматически обновляется preview.
2. Проверили с заказчиком на `development.irc-russianbear.army`.
3. На GitHub: **Pull requests → New** → base **`main`**, compare **`develop`** → Create → **Merge**.
4. Merge в `main` = «ок» → автоматически обновляется основной сайт.

Ручной запуск: Actions → **Deploy Development** или **Deploy** → **Run workflow**.

Прямой push в `main` лучше запретить (см. защиту ветки ниже), чтобы прод обновлялся только через PR.

### 4.1. SSH-ключ для GitHub (один раз на сервере)

На **своём компьютере** (или на сервере):

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ./github_actions_deploy -N ""
```

Публичный ключ добавьте на сервер:

```bash
# на сервере
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "СОДЕРЖИМОЕ_github_actions_deploy.pub" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Приватный ключ (`github_actions_deploy` **без** `.pub`) понадобится для GitHub Secrets — никуда его не коммитьте.

### 4.2. GitHub Secrets

Репозиторий → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Пример | Описание |
|--------|--------|----------|
| `DEPLOY_HOST` | `185.125.201.202` | IP или домен VPS |
| `DEPLOY_USER` | `root` | SSH-пользователь |
| `DEPLOY_SSH_KEY` | *(весь приватный ключ)* | Содержимое `github_actions_deploy` |
| `DEPLOY_PORT` | `22` | Опционально |
| `DEPLOY_PATH` | `/opt/russianbeargroup` | Опционально, путь прода |
| `DEPLOY_PATH_DEV` | `/opt/russianbeargroup-dev` | Опционально, путь preview |

### 4.3. Доступ репозитория на сервере

Клон на сервере должен уметь `git fetch` без пароля.

- **Публичный** репозиторий: достаточно clone по HTTPS
- **Приватный**: добавьте [Deploy key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys) (read-only) и:
  ```bash
  git remote set-url origin git@github.com:OWNER/russianbeargroup.git
  ```

### 4.4. Как пользоваться

1. Пушьте в **`develop`** → Actions → **Deploy Development** (preview).
2. Когда готово — PR **`develop` → `main`** → **Merge**.
3. Actions → **Deploy** выкатывает прод.
4. При необходимости: Actions → нужный workflow → **Run workflow**.

Скрипты на сервере: `scripts/deploy-dev.sh` (preview), `scripts/deploy.sh` (прод).

### 4.5. Защита ветки `main` (один раз в GitHub)

Чтобы на прод нельзя было попасть случайным push:

1. Репозиторий → **Settings → Branches → Add branch protection rule**
2. Branch name pattern: `main`
3. Включите:
   - **Require a pull request before merging**
   - (по желанию) **Require approvals**
4. Save changes

После этого изменения на основной сайт идут только через Merge PR (после проверки на preview).

### 4.6. Ручное обновление (если CI недоступен)

```bash
cd /opt/russianbeargroup
bash scripts/deploy.sh
```

Или по шагам:

```bash
cd /opt/russianbeargroup
git fetch origin main
git reset --hard origin/main
docker compose build
docker compose up -d
```

---

## 4.7. Preview: `development.irc-russianbear.army`

Отдельная копия сайта для заказчиков. Прод не трогает.

| | Production | Preview |
|--|------------|---------|
| Домен | `irc-russianbear.army` | `development.irc-russianbear.army` |
| Путь | `/opt/russianbeargroup` | `/opt/russianbeargroup-dev` |
| Ветка | `main` | `develop` |
| Compose | `docker-compose.yml` + `prod` | `docker-compose.yml` + `dev` |
| Порты | 80 / 443 | через nginx прода (`frontend-dev`) |
| Бот / backup | да | нет |

Трафик preview идёт через **nginx прода** по Docker-сети `russianbear-edge` и уникальным именам `frontend-prod` / `frontend-dev` (не `frontend` — иначе прод и preview смешиваются).

### Один раз на сервере

1. DNS: A-запись `development` → IP VPS (Timeweb).
2. Клон и `.env`:

```bash
mkdir -p /opt/russianbeargroup-dev
cd /opt/russianbeargroup-dev
git clone https://github.com/YOUR_USER/russianbeargroup.git .
git checkout develop
cp /opt/russianbeargroup/.env .env
nano .env
```

В preview `.env` обязательно:

```env
DJANGO_SECRET_KEY=<другой секрет, не как на проде>
DJANGO_ALLOWED_HOSTS=development.irc-russianbear.army,localhost,127.0.0.1,backend
CORS_ALLOWED_ORIGINS=https://development.irc-russianbear.army
CSRF_TRUSTED_ORIGINS=https://development.irc-russianbear.army
TELEGRAM_BOT_TOKEN=
```

3. Сеть + расширить SSL (тот же сертификат + SAN):

```bash
docker network create russianbear-edge

certbot certonly --webroot -w /opt/russianbeargroup/certbot/www \
  -d irc-russianbear.army \
  -d www.irc-russianbear.army \
  -d development.irc-russianbear.army \
  -d ar.irc-russianbear.army \
  --expand --non-interactive --agree-tos -m support@irc-russianbear.army
```

4. Обновить **прод** (nginx с `frontend-prod` / блоком `development.…` должен быть в `main`):

```bash
cd /opt/russianbeargroup
bash scripts/deploy.sh
```

5. Запустить preview:

```bash
cd /opt/russianbeargroup-dev
chmod +x scripts/deploy-dev.sh
bash scripts/deploy-dev.sh
```

Проверка: `https://development.irc-russianbear.army`

### Арабский поддомен: `ar.irc-russianbear.army`

Тот же прод (frontend-prod / backend-prod). На хосте `ar.*` сайт по умолчанию открывается на арабском (RTL); переключатель языков работает.

1. DNS: A-запись `ar` → IP VPS.
2. Расширить SSL (см. certbot выше с `-d ar.irc-russianbear.army`).
3. В продовом `.env` (`/opt/russianbeargroup/.env`):

```env
DJANGO_ALLOWED_HOSTS=irc-russianbear.army,www.irc-russianbear.army,ar.irc-russianbear.army,localhost,127.0.0.1,backend
CORS_ALLOWED_ORIGINS=https://irc-russianbear.army,https://www.irc-russianbear.army,https://ar.irc-russianbear.army
CSRF_TRUSTED_ORIGINS=https://irc-russianbear.army,https://www.irc-russianbear.army,https://ar.irc-russianbear.army
```

4. Задеплоить прод (`bash scripts/deploy.sh`), чтобы подтянуть nginx с `server_name … ar.irc-russianbear.army`.

Проверка: `https://ar.irc-russianbear.army` — арабский по умолчанию.

### Автодеплой preview

Push в `develop` → workflow **Deploy Development** → `/opt/russianbeargroup-dev`.  
Те же secrets, что у прода; опционально `DEPLOY_PATH_DEV` (по умолчанию `/opt/russianbeargroup-dev`).

---

## 5. HTTPS (Let's Encrypt, вручную)

Установите certbot на хост (не в контейнере) и получите сертификат для домена.
Далее либо:

- пробросьте 443 на nginx и добавьте SSL-блок в `nginx/default.conf`,  
- либо поставьте Caddy/Traefik перед compose.

После HTTPS обновите в `.env`:

```env
CORS_ALLOWED_ORIGINS=https://your-domain.com
CSRF_TRUSTED_ORIGINS=https://your-domain.com
USE_X_FORWARDED_HOST=true
```

И перезапустите:

```bash
docker compose up -d
```

---

## 6. Резервное копирование (XLSX)

Контейнер `backup` каждый день (по умолчанию в **03:00**) экспортирует БД в Excel:

| Файл | Описание |
|------|----------|
| `backups/backup_YYYY-MM-DD.xlsx` | Бэкап за день |
| `backups/backup_latest.xlsx` | Всегда последний бэкап |

На каждом листе — одна таблица БД с **оригинальными именами столбцов** (id, name, phone, …).

Экспортируются таблицы:
- `api_contact` — заявки
- `api_telegramadmin` — подписанные админы бота
- `auth_user` — пользователи Django Admin

Настройки в `.env`:

```env
BACKUP_HOUR=3
BACKUP_MINUTE=0
BACKUP_RETENTION_DAYS=30
```

Ручной бэкап:

```bash
docker compose exec backend python manage.py export_db_xlsx
```

Скачать на свой компьютер (с локальной машины):

```bash
scp user@YOUR_SERVER_IP:/opt/russianbeargroup/backups/backup_latest.xlsx .
```

Логи планировщика:

```bash
docker compose logs -f backup
```

---

## 7. Полезные команды

```bash
# Статус контейнеров
docker compose ps

# Логи всех сервисов
docker compose logs -f

# Остановить
docker compose down

# Остановить и удалить volume (ОСТОРОЖНО: удалит БД)
docker compose down -v

# Миграции вручную
docker compose exec backend python manage.py migrate

# Shell Django
docker compose exec backend python manage.py shell

# Бэкап SQLite (бинарный)
docker compose exec backend cat /app/data/db.sqlite3 > backup-$(date +%F).sqlite3
```

---

## 8. Telegram за прокси

Если бот не подключается к `api.telegram.org`, добавьте в `.env`:

```env
TELEGRAM_PROXY=socks5://host.docker.internal:10808
```

На Linux для доступа бота к SOCKS на хосте может понадобиться `extra_hosts` в `docker-compose.yml` для сервиса `bot`, либо прокси в той же Docker-сети.

---

## 9. Структура deploy-файлов

```
russianbeargroup/
├── docker-compose.yml
├── .env.example
├── backups/                  # XLSX-бэкапы (на сервере, не в git)
├── nginx/default.conf
├── backend/
│   ├── Dockerfile
│   ├── docker-entrypoint.sh
│   └── run_backup_scheduler.py
└── frontend/
    └── Dockerfile
```
