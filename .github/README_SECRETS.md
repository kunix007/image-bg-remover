# GitHub Secrets 配置指南

为了让 GitHub Actions 自动部署到 Cloudflare Pages，你需要在 GitHub 仓库中配置以下 Secrets：

## 配置步骤

1. 访问你的 GitHub 仓库：https://github.com/kunix007/image-bg-remover
2. 点击 **Settings** 标签
3. 在左侧菜单中选择 **Secrets and variables** → **Actions**
4. 点击 **New repository secret**
5. 添加以下两个 Secrets：

### Secret 1: CLOUDFLARE_API_TOKEN
- **Name**: `CLOUDFLARE_API_TOKEN`
- **Value**: `cfat_oHRNTFYovw7HTXSh7rq19JvOCtq3sptJ6GfnjeiC9105f9a6`

### Secret 2: CLOUDFLARE_ACCOUNT_ID
- **Name**: `CLOUDFLARE_ACCOUNT_ID`
- **Value**: `e103da8f489a4eb08217b8d7d7b6f833`

## 验证配置

配置完成后：

1. 推送到 `main` 分支将自动触发生产环境部署
2. Pull Request 将自动触发预览环境部署
3. 你可以在 GitHub Actions 标签页查看部署状态
4. 部署完成后，应用将在 `https://image-bg-remover-eiy.pages.dev/` 可用

## 原生 GitHub 集成（可选）

如果你希望使用 Cloudflare 原生的 GitHub 集成（在 Cloudflare Dashboard 中直接连接），请：

1. 访问 https://dash.cloudflare.com/
2. 进入 **Workers & Pages** → **image-bg-remover**
3. 点击 **Settings** → **Builds & deployments**
4. 在 **Git providers** 部分点击 **Connect Git provider**
5. 选择 GitHub 并授权
6. 选择仓库 `kunix007/image-bg-remover`

原生集成的优势：
- 无需配置 GitHub Secrets
- 在 Cloudflare Dashboard 中直接查看部署状态
- 支持自动回滚和预览部署

---

**注意**: 两种方法可以同时使用，但建议使用其中一种以避免冲突。
