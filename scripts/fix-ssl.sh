#!/usr/bin/env bash
# Восстановление HTTPS после ручных правок nginx / certbot на сервере.
# Запускать ТОЛЬКО из корня проекта: cd /opt/russianbeargroup && bash scripts/fix-ssl.sh
set -euo pipefail

APP_DIR="${DEPLOY_PATH:-/opt/russianbeargroup}"
cd "$APP_DIR"

echo "==> Fix SSL: $(date -u +%Y-%m-%dT%H:%M:%SZ)"

# Certbot иногда создаёт каталог с суффиксом -0001
if [ -d /etc/letsencrypt/live/irc-russianbear.army-0001 ] \
   && [ ! -e /etc/letsencrypt/live/irc-russianbear.army/fullchain.pem ]; then
  echo "==> Linking cert irc-russianbear.army-0001 -> irc-russianbear.army"
  ln -sf /etc/letsencrypt/live/irc-russianbear.army-0001 /etc/letsencrypt/live/irc-russianbear.army
fi

if [ ! -f /etc/letsencrypt/live/irc-russianbear.army/fullchain.pem ]; then
  echo "ERROR: Certificate not found at /etc/letsencrypt/live/irc-russianbear.army/"
  echo "Run: certbot certonly --standalone -d irc-russianbear.army"
  exit 1
fi

git fetch origin main
git reset --hard origin/main

mkdir -p certbot/www

echo "==> Starting stack with HTTPS overlay"
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

echo "==> Testing nginx config"
docker compose exec nginx nginx -t

echo "==> Status"
docker compose ps

echo "==> HTTP check"
curl -sI "http://irc-russianbear.army/" | head -n 1 || true

echo "==> HTTPS check"
curl -sI "https://irc-russianbear.army/" | head -n 1 || true

echo "==> Done"
