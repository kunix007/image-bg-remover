# Cloudflare Pages GitHub 集成配置指南

## ✅ 已完成的配置

✅ **Cloudflare Account ID**: `e103da8f489a4eb08217b8d7d7b6f833`
✅ **Cloudflare API Token**: 已配置
✅ **Pages 项目**: `image-bg-remover` 已创建
✅ **GitHub 仓库**: `kunix007/image-bg-remover`
✅ **生产分支**: `main`
✅ **构建命令**: `npm run build`
✅ **输出目录**: `dist`
✅ **GitHub Actions 工作流**: 已配置
✅ **部署脚本**: `deploy.sh` 已创建

## 🌐 部署地址

- **生产环境**: https://image-bg-remover-eiy.pages.dev/

## 📋 下一步：配置 GitHub Secrets

为了让 GitHub Actions 自动部署，你需要在 GitHub 仓库中配置 Secrets：

1. 访问：https://github.com/kunix007/image-bg-remover/settings/secrets/actions
2. 添加以下两个 Secrets：

| Name | Value |
|------|-------|
| `CLOUDFLARE_API_TOKEN` | `cfat_oHRNTFYovw7HTXSh7rq19JvOCtq3sptJ6GfnjeiC9105f9a6` |
| `CLOUDFLARE_ACCOUNT_ID` | `e103da8f489a4eb08217b8d7d7b6f833` |

配置完成后，每次推送到 `main` 分支都会自动触发部署！

## 🚀 部署方式

### 方式一：GitHub Actions（推荐）

配置 Secrets 后，自动部署。

### 方式二：使用部署脚本

```bash
cd /root/.openclaw/workspace/project/image-bg-remover
./deploy.sh
```

### 方式三：手动部署

```bash
npm run build
npx wrangler pages deploy dist --project-name=image-bg-remover --branch=main
```

### 方式四：Cloudflare Dashboard 原生集成

1. 访问 https://dash.cloudflare.com/
2. 进入 **Workers & Pages** → **image-bg-remover**
3. 点击 **Settings** → **Builds & deployments**
4. 在 **Git providers** 部分点击 **Connect Git provider**
5. 选择 GitHub 并授权，选择仓库 `kunix007/image-bg-remover`

## 📁 配置文件

- `.env.cloudflare` - Cloudflare 凭据
- `wrangler.toml` - Wrangler 配置
- `.github/workflows/cloudflare-deploy.yml` - GitHub Actions 工作流
- `deploy.sh` - 快速部署脚本
- `.github/README_SECRETS.md` - Secrets 配置详细说明

## 🔍 验证部署

部署后访问：https://image-bg-remover-eiy.pages.dev/

查看部署状态：
- Cloudflare Dashboard: https://dash.cloudflare.com/ → Workers & Pages → image-bg-remover
- GitHub Actions: https://github.com/kunix007/image-bg-remover/actions
