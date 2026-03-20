# 🖼️ Image Background Remover

免费在线图片背景移除工具，无需注册，图片在浏览器本地处理，保护您的隐私。

![Demo](https://via.placeholder.com/800x400?text=Demo+Screenshot)

## ✨ 特性

- 🆓 **完全免费** - 无需付费，无使用次数限制
- 🔒 **隐私安全** - 图片在浏览器本地处理，不上传到任何服务器
- ⚡ **快速处理** - 基于 WASM 技术，处理速度快
- 📱 **响应式设计** - 支持桌面和移动设备
- 🌐 **无需注册** - 打开网页即可使用

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 部署到 Cloudflare Pages

1. Fork 本仓库
2. 登录 [Cloudflare Pages](https://pages.cloudflare.com/)
3. 创建新项目，选择 Fork 的仓库
4. 构建设置：
   - 构建命令：`npm run build`
   - 输出目录：`dist`
5. 点击部署

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **背景移除**: [@imgly/background-removal](https://github.com/imgly/background-removal-js)
- **样式**: 纯 CSS
- **部署**: Cloudflare Pages

## 📝 支持的格式

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

最大文件大小：10MB

## 🔧 项目结构

```
image-bg-remover/
├── src/
│   ├── App.tsx      # 主应用组件
│   ├── App.css      # 样式文件
│   └── main.tsx     # 入口文件
├── index.html       # HTML 模板
├── vite.config.ts   # Vite 配置
└── package.json     # 依赖配置
```

## 📄 License

MIT

## 🙏 致谢

- [@imgly/background-removal](https://github.com/imgly/background-removal-js) - 提供浏览器端背景移除能力
