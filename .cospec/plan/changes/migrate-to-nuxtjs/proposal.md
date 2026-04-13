# 变更：将现有 Vue 3 + Vite 项目迁移到 Nuxt 3（SSR 模式）

## 原因

当前项目为纯客户端渲染（CSR）的 Vue 3 + Vite SPA，搜索引擎爬虫无法有效抓取动态渲染内容，导致 SEO 效果差。迁移到 Nuxt 3 SSR 模式后，服务端直接输出完整 HTML，可显著提升搜索引擎收录质量和首屏加载性能。

## 变更内容

- 将构建工具从 Vite 替换为 Nuxt 3（内置 Vite + Nitro）
- 启用 SSR（服务端渲染）模式
- 将 `src/views/` 迁移为 Nuxt 文件系统路由 `src/pages/`
- 将 `src/hooks/` 重命名为 `src/composables/`（Nuxt 自动导入约定）
- 将 `src/router/` 路由守卫迁移为 Nuxt `middleware/`
- 将 `src/locales/` 迁移为 `i18n/locales/`，接入 `@nuxtjs/i18n` 模块
- 配置 Naive UI 的 Nuxt SSR 插件（`@css-render/vue3-ssr`）
- 修复所有 SSR 不兼容的浏览器 API 调用（`localStorage`、`navigator`、`window`）
- 替换 `@unhead/vue` 为 Nuxt 内置的 `useHead()`
- 更新 Dockerfile 为 Nuxt SSR 多阶段构建
- 更新 nginx.conf 为反向代理 Node.js 服务模式

## 技术架构对比

| 维度                | 迁移前                 | 迁移后                        |
| ------------------- | ---------------------- | ----------------------------- |
| 框架                | Vue 3.5 + Vite 7.3     | Nuxt 3（最新版）              |
| 渲染模式            | CSR（纯客户端）        | SSR（服务端渲染）             |
| 路由                | Vue Router（手动配置） | Nuxt 文件系统路由             |
| i18n                | vue-i18n（手动初始化） | @nuxtjs/i18n 模块             |
| Head 管理           | @unhead/vue            | Nuxt 内置 useHead             |
| 组件自动导入        | 无                     | Nuxt 自动导入                 |
| Composable 自动导入 | 无                     | Nuxt 自动导入                 |
| 部署                | Nginx 静态文件         | Node.js 服务 + Nginx 反向代理 |

## 目标目录结构（迁移后）

```
D:\fontend\site/
├── app.vue                          # Nuxt 根组件（替代 src/App.vue）
├── nuxt.config.ts                   # Nuxt 核心配置（替代 vite.config.ts）
├── tsconfig.json                    # 更新为 Nuxt 扩展配置
├── package.json                     # 更新依赖
├── Dockerfile                       # 更新为 Nuxt SSR 部署
├── nginx.conf                       # 更新为反向代理配置
├── i18n/
│   └── locales/
│       ├── zh.json                  # 中文翻译（从 src/locales/zh.json 迁移）
│       └── en.json                  # 英文翻译（从 src/locales/en.json 迁移）
├── src/                             # srcDir 配置为 src
│   ├── pages/                       # 文件系统路由（替代 views/ + router/）
│   │   ├── index.vue                # / 首页
│   │   ├── download/index.vue       # /download
│   │   ├── resource/index.vue       # /resource 资源计算器
│   │   ├── blog/index.vue           # /blog（中文专属）
│   │   ├── blog/[id].vue            # /blog/:id
│   │   ├── operation/index.vue      # /operation
│   │   └── pricing/index.vue        # /pricing（中文专属）
│   ├── components/                  # 共享组件（Nuxt 自动导入）
│   ├── composables/                 # Composables（替代 hooks/，Nuxt 自动导入）
│   ├── middleware/                  # 路由中间件（替代 router/index.ts 守卫）
│   │   └── locale-guard.global.ts  # 语言可见性守卫
│   ├── plugins/                     # Nuxt 插件
│   │   └── naive-ui.ts              # Naive UI SSR 配置
│   ├── assets/                      # 静态资源（保持不变）
│   ├── utils/                       # 工具函数（Nuxt 自动导入）
│   └── styles/                      # CSS Token 文件
└── public/                          # 公共静态文件（保持不变）
```

## 影响

- **受影响的规范**：路由管理、国际化、SEO/Head 管理、构建部署
- **受影响的代码**：
  - `package.json`：替换 vite、vue-router、@unhead/vue 为 nuxt 及相关模块
  - `vite.config.ts`：删除，功能迁移到 `nuxt.config.ts`
  - `src/main.ts`：删除，Nuxt 自动处理应用初始化
  - `src/App.vue`：删除，功能迁移到根目录 `app.vue`
  - `src/router/index.ts`：删除，路由守卫迁移到 `src/middleware/`
  - `src/router/prefetch.ts`：删除，Nuxt `<NuxtLink prefetch>` 内置支持
  - `src/locales/index.ts`：删除，由 `@nuxtjs/i18n` 模块接管
  - `src/views/` → `src/pages/`：目录重命名，内部组件代码基本不变
  - `src/hooks/` → `src/composables/`：目录重命名，文件内容基本不变
  - `src/utils/language.ts`：修复 SSR 不兼容的 `localStorage`/`navigator` 调用
  - `src/hooks/useGithubStars.ts`：修复 SSR 不兼容的 `localStorage` 调用
  - `src/hooks/useMobileMenu.ts`：确认 SSR 兼容性
  - `src/hooks/useResponsive.ts`：确认 SSR 兼容性
  - `src/components/StructuredData.vue`：改用 Nuxt 内置 `useHead()`
  - `Dockerfile`：更新为 Nuxt SSR 多阶段构建
  - `nginx.conf`：更新为反向代理 Node.js 服务
