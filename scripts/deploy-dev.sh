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

if ! docker network inspect russianbear-edge >/dev/null 2>&1; then
  echo "==> Creating docker network russianbear-edge"
  docker network create russianbear-edge
fi

COMPOSE=(docker compose -p russianbear-dev -f docker-compose.yml -f docker-compose.dev.yml)

echo "==> Building images"
"${COMPOSE[@]}" build

echo "==> Restarting preview services"
"${COMPOSE[@]}" up -d --remove-orphans

echo "==> Status"
"${COMPOSE[@]}" ps

# nginx прода резолвит backend-dev / frontend-dev — перезапуск после recreate
if [ -d "$PROD_DIR" ]; then
  echo "==> Reloading production nginx (edge)"
  (
    cd "$PROD_DIR"
    PROD_COMPOSE=(docker compose -f docker-compose.yml)
    if [ -d "certbot/conf/live" ] || [ -d "/etc/letsencrypt/live" ]; then
      PROD_COMPOSE+=(-f docker-compose.prod.yml)
    fi
    "${PROD_COMPOSE[@]}" up -d --force-recreate nginx
  )
fi

echo "==> Health check"
if curl -sf -o /dev/null --max-time 15 "https://development.irc-russianbear.army/" \
  || curl -sf -o /dev/null --max-time 15 -H "Host: development.irc-russianbear.army" "http://127.0.0.1/"; then
  echo "==> Preview OK"
else
  echo "==> WARNING: health check failed — check: docker compose -p russianbear-dev logs frontend backend"
  echo "==> Also: docker compose -f $PROD_DIR/docker-compose.yml -f $PROD_DIR/docker-compose.prod.yml logs nginx"
fi

echo "==> Deploy preview finished"
