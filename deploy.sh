#!/bin/bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="$(basename "$APP_DIR")"

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
pm2 start "$APP_DIR/server.js" --name "$APP_NAME" --cwd "$APP_DIR" --update-env
pm2 save

echo "✅ Done"
