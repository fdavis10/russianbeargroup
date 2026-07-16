#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${DEPLOY_PATH:-/opt/russianbeargroup}"
cd "$APP_DIR"

echo "==> Deploy: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "==> Path: $APP_DIR"

git fetch origin main
git reset --hard origin/main

COMPOSE=(docker compose -f docker-compose.yml)
if [ -d "certbot/conf/live" ] || [ -d "/etc/letsencrypt/live" ]; then
  echo "==> HTTPS certs found — using prod compose overlay"
  COMPOSE+=(-f docker-compose.prod.yml)
fi

echo "==> Building images"
"${COMPOSE[@]}" build

echo "==> Restarting services"
"${COMPOSE[@]}" up -d --remove-orphans

# nginx мог стартовать раньше frontend/backend — перезапуск подхватывает DNS
echo "==> Reloading nginx"
"${COMPOSE[@]}" up -d --force-recreate nginx

echo "==> Status"
"${COMPOSE[@]}" ps

echo "==> Health check"
if curl -sf -o /dev/null --max-time 15 "https://irc-russianbear.army/" \
  || curl -sf -o /dev/null --max-time 15 "http://127.0.0.1/"; then
  echo "==> Site OK"
else
  echo "==> WARNING: health check failed — check: docker compose logs nginx frontend"
fi

echo "==> Deploy finished"
