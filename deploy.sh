#!/bin/bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="$(basename "$APP_DIR")"

cd "$APP_DIR"

echo "📥 Pull..."
git pull origin main

echo "📦 Install..."
npm install

echo "🏗 Build..."
npm run build

echo "🚀 Restart..."
pm2 restart "$APP_NAME" --update-env || pm2 start server.js --name "$APP_NAME"
pm2 save

echo "✅ Done"
