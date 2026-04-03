## 实施

- [x] 1.1 安装 SEO 相关依赖包
      【目标对象】`package.json`
      【修改目的】引入 vite-ssg（构建时静态预渲染）和 @unhead/vue（运行时动态 head 管理）两个依赖
      【修改方式】执行 pnpm 安装命令，分别写入 devDependencies 和 dependencies
      【相关依赖】无
      【修改内容】- 执行 `pnpm add -D vite-ssg` 将 vite-ssg 写入 devDependencies（构建工具，非运行时）- 执行 `pnpm add @unhead/vue` 将 @unhead/vue 写入 dependencies（运行时 head 管理，需随包发布）

- [x] 1.2 导出独立 routes 数组供 ViteSSG 消费
      【目标对象】`src/router/index.ts` 中第 15 行的 `const routes = [...]` 声明
      【修改目的】vite-ssg 在构建时需要直接访问路由配置数组来枚举预渲染页面，必须将其作为具名导出暴露
      【修改方式】修改 `const routes` 声明，在其前面添加 `export` 关键字
      【相关依赖】`src/main.ts`（任务 1.3 将引用此导出）
      【修改内容】- 将 `const routes = [` 改为 `export const routes = [` - 保持 routes 数组内容完全不变（所有路由配置、懒加载、meta.localeVisible 均不改动）- 保持文件末尾的 `export default router` 不变，router 实例仍作为默认导出供现有代码使用

- [x] 1.3 迁移 main.ts 到 ViteSSG 并注册 @unhead/vue
      【目标对象】`src/main.ts`，全文替换
      【修改目的】从 `createApp().mount()` 模式迁移到 ViteSSG 导出模式，使构建产物支持静态预渲染；同时通过 `createHead()` 注册 @unhead/vue 插件，使各页面可调用 `useHead`
      【修改方式】删除现有全部内容，改写为 ViteSSG 导出格式
      【相关依赖】`vite-ssg` 的 `ViteSSG`；`@unhead/vue` 的 `createHead`；`src/router/index.ts` 的具名导出 `routes`；`src/locales/index.ts` 的默认导出 `i18n`
      【修改内容】- 保留顶部两行 CSS 导入（`./index.css`、`./styles/tokens.css`）- 从 `vite-ssg` 导入 `ViteSSG`；从 `@unhead/vue` 导入 `createHead`；从 `./router/index` 导入具名 `routes`；从 `./locales` 导入 `i18n`；导入 `App` - 使用 `export const createApp = ViteSSG(App, { routes }, ({ app }) => { const head = createHead(); app.use(head); app.use(i18n) })` 格式导出 - 注意：ViteSSG 内部自动处理 router 实例创建和挂载，无需手动 `app.use(router)`；`createApp` 是 vite-ssg 约定的导出名，与 Vue 原生 `createApp` 不同，此处不再从 vue 导入 `createApp` - 注意：`i18n` 必须在 `head` 之后注册，保持与原有顺序一致

- [x] 1.4 更新 vite.config.ts 添加 SSG 预渲染配置
      【目标对象】`vite.config.ts` 中 `export default defineConfig({...})` 的顶层配置对象
      【修改目的】配置 vite-ssg 在构建时需要预渲染的路由列表，以及产物脚本加载方式
      【修改方式】在 `defineConfig({})` 的顶层对象中新增 `ssgOptions` 字段（vite-ssg 从 vite.config.ts 读取此字段）
      【相关依赖】`src/router/index.ts` 中的路由路径定义
      【修改内容】- 在 `defineConfig` 配置对象的顶层（与 `server`、`plugins`、`build` 同级）新增：
      `         ssgOptions: {
  script: 'async',
  formatting: 'minify',
  includedRoutes: () => ['/', '/download', '/pricing', '/operation', '/resource', '/blog'],
}` - `includedRoutes` 列表须与 `src/router/index.ts` 中实际路由 path 保持一致（不包含 `/blog/:id` 动态路由，动态路由无法静态预渲染）- 不修改现有 `build`、`plugins`、`resolve`、`optimizeDeps` 等配置

- [x] 1.5 更新 package.json 的 build 脚本
      【目标对象】`package.json` 中 `scripts` 字段
      【修改目的】新增 `build:ssg` 脚本用于静态预渲染构建，同时保留原有 `build` 脚本（含 type-check）不被破坏
      【修改方式】在 `scripts` 对象中新增一个键值对
      【相关依赖】任务 1.1 安装的 `vite-ssg`
      【修改内容】- 在 `scripts` 中新增 `"build:ssg": "vue-tsc -b && vite-ssg build"`（保留 type-check 步骤，与原 build 脚本风格一致）- 保持原有 `"build": "run-p type-check \"build-only {@}\" --"` 和 `"build-only": "vite build"` 不变 - 注意：proposal 要求新增 build:ssg 脚本，而非替换现有 build 脚本

- [x] 2.1 更新 index.html 添加基础回退 meta 标签
      【目标对象】`index.html` 中 `<head>` 标签内部
      【修改目的】为不支持动态 head 的场景（如爬虫首次抓取、JS 禁用）提供基础 OG/Twitter Card 回退，补充 keywords meta
      【修改方式】在现有 `<meta name="description">` 标签之后追加新的 meta 标签
      【相关依赖】无
      【修改内容】- 添加 `<meta name="keywords" content="AI编程工具, 代码审查, 企业私有化部署, AI代码生成, CoStrict">` - 添加 OG 基础标签：`og:type=website`、`og:site_name=CoStrict`、`og:locale=zh_CN` - 添加 Twitter Card 基础标签：`twitter:card=summary_large_image`、`twitter:site=@costrict` - 以上均为静态回退值，各页面的 useHead 调用会在运行时覆盖这些值

- [x] 2.2 创建 public/sitemap.xml
      【目标对象】`public/sitemap.xml`（新建文件，构建后会被复制到网站根目录）
      【修改目的】让搜索引擎正确发现和索引网站所有主要页面，提升爬取效率
      【修改方式】新建文件，内容符合 sitemaps.org 规范的 XML 格式
      【相关依赖】无
      【修改内容】- XML 声明 + `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` 根元素 - 包含 6 个 `<url>` 条目，域名使用 `https://costrict.ai`：- `/`：priority=1.0，changefreq=weekly - `/download`：priority=0.9，changefreq=weekly - `/pricing`：priority=0.8，changefreq=monthly - `/operation`：priority=0.7，changefreq=weekly - `/resource`：priority=0.6，changefreq=monthly - `/blog`：priority=0.5，changefreq=daily - 每个条目的 `<lastmod>` 设为 2026-04-02

- [x] 2.3 更新 public/robots.txt
      【目标对象】`public/robots.txt`，全文替换
      【修改目的】添加 Sitemap 指令、爬取延迟和 AI 爬虫显式权限，从最简配置升级为完整 SEO 配置
      【修改方式】替换现有文件全部内容（现有内容为 `User-agent: *\nDisallow: `，即空 Disallow）
      【相关依赖】任务 2.2 创建的 `public/sitemap.xml`
      【修改内容】- 保留通用规则：`User-agent: *`、`Allow: /`、`Crawl-delay: 1` - 添加 AI 爬虫显式 Allow 规则（各自独立 User-agent 块）：GPTBot、ClaudeBot、PerplexityBot，均设置 `Allow: /` - 末尾添加 `Sitemap: https://costrict.ai/sitemap.xml`

- [x] 2.4 创建 public/llms.txt
      【目标对象】`public/llms.txt`（新建文件）
      【修改目的】符合 llms.txt 规范，优化 AI 搜索引擎（Perplexity、ChatGPT 等）对网站内容的理解和索引
      【修改方式】新建文件，内容符合 llms.txt 草案规范（键值对 + Markdown 风格）
      【相关依赖】无
      【修改内容】- 包含元信息字段：title（CoStrict）、description（一句话描述产品）、version（当前版本）、author、url（https://costrict.ai）、language（zh-CN） - 列出核心 features（AI 代码补全、企业私有化部署、代码审查、多 IDE 支持等）- 包含资源链接：docs、github、contact

- [x] 3.1 创建 StructuredData 组件
      【目标对象】`src/components/StructuredData.vue`（新建文件）
      【修改目的】提供可复用的 JSON-LD 结构化数据注入组件，避免各页面重复编写 useHead script 注入逻辑
      【修改方式】新建 Vue 单文件组件，使用 `<script setup lang="ts">` + `defineOptions` 风格（对齐仓库规范）
      【相关依赖】`@unhead/vue` 的 `useHead`（任务 1.1 已安装）
      【修改内容】- `<script setup lang="ts">` 中：- 定义 `interface SchemaProps { schemaType: string; data: Record<string, unknown> }` - 使用 `defineProps<SchemaProps>()` 接收 props - 使用 `defineOptions({ name: 'StructuredData' })` 设置组件名（对齐仓库 defineOptions 风格）- 使用 `useHead` 注入 `script: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': props.schemaType, ...props.data }) }]` - `<template>` 为空（纯逻辑组件，无 DOM 输出）- 无 `<style>` 块

- [x] 3.2 为首页添加完整 SEO head + Schema.org
      【目标对象】`src/views/home/index.vue` 中 `<script lang="ts" setup>` 块内，以及 `<template>` 根元素内
      【修改目的】为首页注入完整 SEO 信息（title、description、canonical、OG、Twitter Card）及 Organization + SoftwareApplication 结构化数据
      【修改方式】在 `<script setup>` 中新增 `useHead` 调用；在 `<template>` 中新增两个 `<StructuredData>` 组件
      【相关依赖】`@unhead/vue` 的 `useHead`；`src/components/StructuredData.vue`（任务 3.1 创建）
      【修改内容】- 在 `<script setup>` 的 import 区域追加：`import { useHead } from '@unhead/vue'`；`import StructuredData from '@/components/StructuredData.vue'` - 在 `defineOptions` 之后调用 `useHead({})` 设置：- `title`: `CoStrict - 企业级AI编程工具 | 开源免费 | 私有化部署` - `meta`: description、og:title、og:description、og:url（`https://costrict.ai/`）、og:type（website）、og:image、twitter:card（summary_large_image）、twitter:title、twitter:description、twitter:image - `link`: `[{ rel: 'canonical', href: 'https://costrict.ai/' }]` - 在 `<template>` 根 `<div>` 内末尾追加两个 `<StructuredData>` 组件：- schemaType="Organization"，data 包含 name、url、logo、sameAs 等字段 - schemaType="SoftwareApplication"，data 包含 name、applicationCategory、operatingSystem、offers 等字段

- [x] 3.3 为下载页添加 SEO head
      【目标对象】`src/views/download/index.vue` 中 `<script setup>` 块内
      【修改目的】为下载页注入独立的 SEO 标题和 meta 信息，避免与首页共用相同 title/description
      【修改方式】在 `<script setup>` 的 import 区域追加 useHead 导入，并在 defineOptions 之后调用 useHead
      【相关依赖】`@unhead/vue` 的 `useHead`（任务 1.1 已安装，任务 1.3 已注册插件）
      【修改内容】- 追加 `import { useHead } from '@unhead/vue'` - 调用 `useHead({})` 设置：- `title`: `下载 CoStrict - VSCode & JetBrains 插件 | CLI工具` - `meta`: description（`免费下载 CoStrict AI 编程助手，支持 VSCode、JetBrains 全系列 IDE 插件及 CLI 工具，一键安装，即刻提升开发效率。`）、og:title、og:description、og:url（`https://costrict.ai/download`）、twitter:card（summary_large_image）、twitter:title、twitter:description - `link`: `[{ rel: 'canonical', href: 'https://costrict.ai/download' }]`

- [x] 3.4 为价格页添加 SEO head
      【目标对象】`src/views/pricing/PricingPage.vue` 中 `<script setup>` 块内
      【修改目的】为价格页注入独立的 SEO 标题和 meta 信息
      【修改方式】在 `<script setup>` 的 import 区域追加 useHead 导入，并在 defineOptions 之后调用 useHead
      【相关依赖】`@unhead/vue` 的 `useHead`（任务 1.1 已安装，任务 1.3 已注册插件）
      【修改内容】- 追加 `import { useHead } from '@unhead/vue'` - 调用 `useHead({})` 设置：- `title`: `CoStrict 价格方案 - 个人免费 | 企业套餐 | 私有化部署` - `meta`: description（`CoStrict 提供灵活的价格方案：个人开发者永久免费，企业套餐支持私有化部署，满足不同规模团队的 AI 编程需求。`）、og:title、og:description、og:url（`https://costrict.ai/pricing`）、twitter:card（summary_large_image）、twitter:title、twitter:description - `link`: `[{ rel: 'canonical', href: 'https://costrict.ai/pricing' }]`

- [x] 3.5 为运营页添加 SEO head
      【目标对象】`src/views/operation/OperationPage.vue` 中 `<script setup>` 块内
      【修改目的】为运营/活动页注入独立的 SEO 标题和 meta 信息
      【修改方式】在 `<script setup>` 的 import 区域追加 useHead 导入，并在 defineOptions 之后调用 useHead
      【相关依赖】`@unhead/vue` 的 `useHead`（任务 1.1 已安装，任务 1.3 已注册插件）
      【修改内容】- 追加 `import { useHead } from '@unhead/vue'` - 调用 `useHead({})` 设置：- `title`: `CoStrict 活动中心 - GitHub Star 奖励 | 邀请用户 | 历史活动` - `meta`: description（`参与 CoStrict 社区活动，通过 GitHub Star 和邀请用户获取奖励，查看历史活动记录，共同建设开源 AI 编程工具生态。`）、og:title、og:description、og:url（`https://costrict.ai/operation`）、twitter:card（summary_large_image）、twitter:title、twitter:description - `link`: `[{ rel: 'canonical', href: 'https://costrict.ai/operation' }]`

- [x] 3.6 为资源计算器页添加 SEO head
      【目标对象】`src/views/resourceCalculator/index.vue` 中 `<script setup>` 块内
      【修改目的】为资源计算器页注入独立的 SEO 标题和 meta 信息
      【修改方式】在 `<script setup>` 的 import 区域追加 useHead 导入，并在 defineOptions 之后调用 useHead
      【相关依赖】`@unhead/vue` 的 `useHead`（任务 1.1 已安装，任务 1.3 已注册插件）
      【修改内容】- 追加 `import { useHead } from '@unhead/vue'` - 调用 `useHead({})` 设置：- `title`: `CoStrict 资源计算器 - 私有化部署资源评估工具` - `meta`: description（`使用 CoStrict 资源计算器，快速评估企业私有化部署所需的服务器资源配置，为 AI 编程工具部署提供精准的资源规划建议。`）、og:title、og:description、og:url（`https://costrict.ai/resource`）、twitter:card（summary_large_image）、twitter:title、twitter:description - `link`: `[{ rel: 'canonical', href: 'https://costrict.ai/resource' }]`

- [x] 3.7 为博客页添加 SEO head
      【目标对象】`src/views/blog/index.vue` 中 `<script setup>` 块内
      【修改目的】为博客列表页注入独立的 SEO 标题和 meta 信息
      【修改方式】在 `<script setup>` 的 import 区域追加 useHead 导入，并在 defineOptions 之后调用 useHead
      【相关依赖】`@unhead/vue` 的 `useHead`（任务 1.1 已安装，任务 1.3 已注册插件）
      【修改内容】- 追加 `import { useHead } from '@unhead/vue'` - 调用 `useHead({})` 设置：- `title`: `CoStrict 技术博客 - AI 编程实践 | 最佳实践 | 案例分析` - `meta`: description（`CoStrict 技术博客，分享 AI 辅助编程最佳实践、企业私有化部署指南、代码审查技巧和开发效率提升案例。`）、og:title、og:description、og:url（`https://costrict.ai/blog`）、twitter:card（summary_large_image）、twitter:title、twitter:description - `link`: `[{ rel: 'canonical', href: 'https://costrict.ai/blog' }]`
