# 变更：为 costrict.ai 实施全面 SEO 优化

## 原因

当前网站 SEO 健康分仅 38/100，纯 CSR 渲染导致搜索引擎无法抓取内容，缺少 sitemap、结构化数据、社交媒体 meta 标签等基础 SEO 要素，严重影响搜索引擎可见性和有机流量。

## 变更内容

- 引入 `vite-ssg` 实现构建时静态预渲染，让搜索引擎可以抓取完整 HTML 内容
- 安装 `@unhead/vue` 实现各页面动态 `<head>` 管理（title、meta、link）
- 为所有页面添加独立的 SEO 标题（title）和 meta description
- 添加 Canonical 标签，防止重复内容问题
- 添加 Open Graph + Twitter Card 社交分享 meta 标签
- 创建 `StructuredData` 组件，在首页注入 Organization + SoftwareApplication JSON-LD
- 创建/更新静态 SEO 文件：`sitemap.xml`、`robots.txt`、`llms.txt`

## 影响

- **受影响的规范**：SEO、渲染方式、静态资源
- **受影响的代码**：
  - `package.json`：新增 `vite-ssg`、`@unhead/vue` 依赖，新增 `build:ssg` 脚本
  - `src/main.ts`：从 `createApp` 迁移到 `ViteSSG`，注册 `@unhead/vue`
  - `vite.config.ts`：添加 `ssgOptions` 配置（指定预渲染路由列表）
  - `index.html`：添加基础 OG/Twitter 回退 meta 标签
  - `src/router/index.ts`：导出独立的 `routes` 数组供 ViteSSG 消费
  - `src/views/home/index.vue`：添加 `useHead` 注入首页 SEO 信息 + Schema.org
  - `src/views/download/index.vue`：添加 `useHead` 注入下载页 SEO 信息
  - `src/views/pricing/PricingPage.vue`：添加 `useHead` 注入价格页 SEO 信息
  - `src/views/operation/OperationPage.vue`：添加 `useHead` 注入运营页 SEO 信息
  - `src/views/resourceCalculator/index.vue`：添加 `useHead` 注入资源页 SEO 信息
  - `src/views/blog/index.vue`：添加 `useHead` 注入博客页 SEO 信息
  - `src/components/StructuredData.vue`：新建结构化数据组件（JSON-LD 注入）
  - `public/sitemap.xml`：新建，包含所有主要页面 URL
  - `public/robots.txt`：更新，添加 Sitemap 指令和 AI 爬虫权限
  - `public/llms.txt`：新建，符合 llms.txt 规范的 AI 搜索优化文件
