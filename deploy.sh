#!/bin/bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="${APP_NAME:-people}"
APP_PORT="${PORT:-3003}"

wait_for_api() {
  local url="$1"
  local label="$2"
  for attempt in $(seq 1 30); do
    if curl -fsS "$url" >/dev/null; then
      echo "$label is ready"
      return 0
    fi
    sleep 1
  done

  echo "$label did not become ready"
  pm2 status "$APP_NAME" || true
  pm2 logs "$APP_NAME" --lines 80 --nostream || true
  return 1
}

cd "$APP_DIR"

echo "📥 Sync..."
git fetch origin main
git reset --hard origin/main

echo "📦 Install..."
npm install

echo "🏗 Build..."
npm run build

echo "🚀 Restart..."
pm2 delete "$APP_NAME" || true
PORT="$APP_PORT" pm2 start "$APP_DIR/server.js" --name "$APP_NAME" --cwd "$APP_DIR" --update-env
pm2 save

echo "🩺 Check local API..."
wait_for_api "http://127.0.0.1:$APP_PORT/api/content" "Local API"

if [[ -f "$APP_DIR/deploy/nginx-people.evtenia.ru.conf" ]] && command -v nginx >/dev/null 2>&1 && [[ $EUID -eq 0 ]]; then
  echo "🌐 Update nginx route for CMS API..."
  install -m 0644 "$APP_DIR/deploy/nginx-people.evtenia.ru.conf" /etc/nginx/sites-available/people.evtenia.ru.conf
  ln -sf /etc/nginx/sites-available/people.evtenia.ru.conf /etc/nginx/sites-enabled/people.evtenia.ru.conf
  nginx -t
  systemctl reload nginx
fi

echo "✅ Done"
