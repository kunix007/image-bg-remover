#!/bin/bash

# Cloudflare Pages 快速部署脚本

set -e

echo "🚀 开始部署到 Cloudflare Pages..."

# 加载环境变量
if [ -f .env.cloudflare ]; then
    export $(cat .env.cloudflare | grep -v '^#' | xargs)
fi

# 检查依赖
if ! command -v npm &> /dev/null; then
    echo "❌ 错误：需要安装 Node.js 和 npm"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm ci

# 构建项目
echo "🔨 构建项目..."
npm run build

# 部署到 Cloudflare Pages
echo "☁️  部署到 Cloudflare Pages..."
npx wrangler pages deploy dist \
  --project-name=image-bg-remover \
  --branch=master \
  --commit-dirty=true

echo "✅ 部署完成！"
echo "🌐 访问地址：https://image-bg-remover-eiy.pages.dev/"
