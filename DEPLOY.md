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

## 4. CI/CD (GitHub Actions) — автодеплой

После настройки каждый `git push` в `main` сам выкатывает сайт на VPS.
Вручную SSH для обычных обновлений больше не нужен.

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
| `DEPLOY_PATH` | `/opt/russianbeargroup` | Опционально, путь к проекту |

### 4.3. Доступ репозитория на сервере

Клон на сервере должен уметь `git fetch` без пароля.

- **Публичный** репозиторий: достаточно clone по HTTPS
- **Приватный**: добавьте [Deploy key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys) (read-only) и:
  ```bash
  git remote set-url origin git@github.com:OWNER/russianbeargroup.git
  ```

### 4.4. Как пользоваться

1. Коммитьте и пушьте в `main`
2. Откройте **Actions** на GitHub — workflow **Deploy** должен стать зелёным
3. Можно запустить вручную: Actions → Deploy → **Run workflow**

Скрипт на сервере: `scripts/deploy.sh`  
(`git fetch` + `reset --hard` + `docker compose build` + `up -d`; если есть HTTPS-сертификаты — подключит `docker-compose.prod.yml`)

### 4.5. Ручное обновление (если CI недоступен)

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
