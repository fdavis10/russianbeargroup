#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${DEPLOY_PATH:-/opt/russianbeargroup-dev}"
PROD_DIR="${PROD_DEPLOY_PATH:-/opt/russianbeargroup}"
BRANCH="${DEPLOY_BRANCH:-develop}"
cd "$APP_DIR"

echo "==> Deploy preview: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "==> Path: $APP_DIR (branch: $BRANCH)"

git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

COMPOSE=(docker compose -p russianbear-dev -f docker-compose.yml -f docker-compose.dev.yml)

echo "==> Building images"
"${COMPOSE[@]}" build

echo "==> Restarting preview services"
"${COMPOSE[@]}" up -d --remove-orphans

echo "==> Status"
"${COMPOSE[@]}" ps

# nginx прода читает тот же default.ssl.conf — перезапуск подхватывает upstream
if [ -d "$PROD_DIR" ]; then
  echo "==> Reloading production nginx (preview proxy)"
  (
    cd "$PROD_DIR"
    # Не делаем git reset — только пересоздаём nginx с текущим конфигом на диске
    if [ -f nginx/default.ssl.conf ] && { [ -d certbot/conf/live ] || [ -d /etc/letsencrypt/live ]; }; then
      docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate nginx
    fi
  )
fi

echo "==> Health check"
if curl -sf -o /dev/null --max-time 15 "https://development.irc-russianbear.army/" \
  || curl -sf -o /dev/null --max-time 15 -H "Host: development.irc-russianbear.army" "http://127.0.0.1:8081/"; then
  echo "==> Preview OK"
else
  echo "==> WARNING: health check failed — check: docker compose -p russianbear-dev logs frontend backend"
fi

echo "==> Deploy preview finished"
