#!/bin/bash

cd /var/www/woman

echo "📥 Pull..."
git pull origin main

echo "📦 Install..."
npm install

echo "🏗 Build..."
npm run build

echo "🚀 Restart..."
pm2 restart woman || pm2 start server.js --name woman

echo "✅ Done"
