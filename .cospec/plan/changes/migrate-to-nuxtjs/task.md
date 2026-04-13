## 实施

### 阶段一：依赖和配置文件替换

- [x] 1.1 更新 package.json 依赖
      【目标对象】`package.json`
      【修改目的】将 Vite SPA 依赖替换为 Nuxt 3 及相关模块
      【修改方式】修改 scripts 字段、dependencies 字段、devDependencies 字段
      【相关依赖】nuxt@^3、@nuxtjs/i18n@^9、naive-ui、@css-render/vue3-ssr、less
      【修改内容】- scripts 字段：`dev` → `nuxt dev --port 9001`，`build` → `nuxt build`，`preview` → `nuxt preview`，`type-check` → `nuxt typecheck`，新增 `generate` → `nuxt generate` - dependencies 新增：`nuxt`、`@nuxtjs/i18n`、`@css-render/vue3-ssr`、`vfonts` - dependencies 移除：`vue-router`、`vue-i18n`、`@unhead/vue`（由 Nuxt 内置接管）- devDependencies 移除：`vite`、`@vitejs/plugin-vue`、`vite-plugin-compression`、`rollup-plugin-visualizer`、`vite-plugin-vue-devtools` - devDependencies 保留：`@tailwindcss/vite`（继续通过 nuxt.config.ts 的 vite.plugins 引入）、`less`、`typescript`、`@vue/tsconfig`

- [x] 1.2 创建 nuxt.config.ts
      【目标对象】`nuxt.config.ts`（新建于项目根目录）
      【修改目的】替代 `vite.config.ts`，作为 Nuxt 3 核心配置，整合路由、i18n、样式、SSR 构建等所有配置
      【修改方式】创建新文件，使用 `defineNuxtConfig()` 导出配置对象
      【相关依赖】`@nuxtjs/i18n`、`@tailwindcss/vite`、naive-ui SSR 配置、`src/styles/tokens.css`、`src/index.css`
      【修改内容】- `srcDir: 'src'`（保留 src 目录结构，`~/` 指向 `src/`）- `ssr: true`（启用 SSR）- `modules: ['@nuxtjs/i18n']` - i18n 配置：`locales: ['zh', 'en']`，`defaultLocale: 'zh'`，`strategy: 'no_prefix'`，`langDir: '../i18n/locales'`（相对于 srcDir 的上级，即项目根目录下的 `i18n/locales/`）- `vite.plugins: [tailwindcss()]`（引入 `@tailwindcss/vite` 的 tailwindcss 函数，替代原 vite.config.ts 中的插件）- `css: ['~/styles/tokens.css', '~/index.css']`（全局注入 CSS Token 和基础样式；`~/` 指向 srcDir 即 `src/`，路径等价于 `src/styles/tokens.css` 和 `src/index.css`）- 注意：`src/index.css` 中的 `@import 'tailwindcss'` 在 `@tailwindcss/vite` 插件模式下仍然有效，无需修改 - `build.transpile: ['naive-ui', 'vicons', '@css-render/vue3-ssr']`（Naive UI SSR 编译支持）- `nitro.compressPublicAssets: true`（替代 `vite-plugin-compression`）- `alias: { '@': '~/'}` 或通过 Nuxt 内置别名支持（Nuxt 默认提供 `~` 和 `@` 均指向 srcDir）

- [x] 1.3 更新 tsconfig.json 并处理类型声明文件
      【目标对象】`tsconfig.json`、`src/env.d.ts`（如存在）
      【修改目的】使用 Nuxt 提供的 TypeScript 配置扩展；移除与 Vite 相关的类型声明，避免与 Nuxt 自动生成的类型冲突
      【修改方式】修改 `tsconfig.json` 的 extends 字段；检查并删除 `src/env.d.ts`
      【相关依赖】Nuxt 自动生成 `.nuxt/tsconfig.json`
      【修改内容】- `tsconfig.json`：将 `extends` 改为 `'./.nuxt/tsconfig.json'`（Nuxt 首次运行 `nuxt dev` 后自动生成）- 保留必要的 `compilerOptions` 覆盖项（如 `strict: true`）- 检查 `src/env.d.ts`：如果存在，删除其中的 `/// <reference types="vite/client" />` 声明（Nuxt 通过 `.nuxt/tsconfig.json` 自动注入所需类型，`vite/client` 类型由 Nuxt 内部管理，无需手动引用）；如果 `env.d.ts` 仅包含该声明则整个文件可删除

- [x] 1.4 删除不再需要的配置文件
      【目标对象】`vite.config.ts`、`tsconfig.app.json`、`tsconfig.node.json`、`vitest.config.ts`
      【修改目的】移除 Vite 专属配置，Nuxt 内置处理这些功能
      【修改方式】删除文件
      【修改内容】- 删除 `vite.config.ts`（功能迁移到 `nuxt.config.ts`）- 删除 `tsconfig.app.json`（功能由 `.nuxt/tsconfig.json` 接管）- 删除 `tsconfig.node.json` - 删除 `vitest.config.ts`（如需测试后续单独配置）

### 阶段二：入口文件和根组件迁移

- [x] 2.1 创建 app.vue 根组件
      【目标对象】`app.vue`（新建于项目根目录）
      【修改目的】替代 `src/App.vue`，作为 Nuxt 应用根组件
      【修改方式】创建新文件，参考 `src/App.vue` 内容进行改写
      【相关依赖】`src/App.vue`、`src/components/NavBar.vue`
      【修改内容】- 使用 `<NuxtPage />` 替代 `<router-view />` - 保留 `<navbar />` 组件引用（`src/components/NavBar.vue`，Nuxt 自动导入 components/ 下的组件）- 保留 `<NMessageProvider>` 包裹结构（Naive UI 消息提供者）- 移除 `import { useRouterPrefetch } from '@/hooks/useRouterPrefetch'` 及其调用（Nuxt `<NuxtLink>` 内置 prefetch 支持，`useRouterPrefetch` 不再需要）- 移除 `import { NMessageProvider } from 'naive-ui'` 的显式导入（如 Nuxt 自动导入已覆盖则可省略，否则保留）

- [x] 2.2 删除 src/main.ts 和 src/App.vue
      【目标对象】`src/main.ts`、`src/App.vue`
      【修改目的】Nuxt 自动处理应用初始化，不再需要手动入口文件
      【修改方式】删除文件
      【修改内容】- 删除 `src/main.ts`（Nuxt 内置应用初始化，无需手动 createApp/mount）- 删除 `src/App.vue`（已由根目录 `app.vue` 替代）

- [x] 2.3 删除 index.html
      【目标对象】`index.html`（项目根目录）
      【修改目的】Nuxt 不使用 index.html 作为入口，通过 `app.vue` 和 `nuxt.config.ts` 管理 HTML 模板
      【修改方式】删除文件
      【修改内容】- 删除 `index.html`

### 阶段三：目录结构迁移

- [x] 3.1 将 src/views/ 迁移为 src/pages/（文件系统路由）
      【目标对象】`src/views/` → `src/pages/`
      【修改目的】Nuxt 使用 pages/ 目录进行文件系统路由，每个文件对应一个路由
      【修改方式】创建 `src/pages/` 目录，将各页面入口文件及其子组件目录整体迁移
      【相关依赖】原 `src/router/index.ts` 路由配置
      【修改内容】
      页面入口文件迁移（重命名/移动）：- `src/views/home/index.vue` → `src/pages/index.vue`（路由 `/`）- `src/views/download/index.vue` → `src/pages/download/index.vue`（路由 `/download`）- `src/views/resourceCalculator/index.vue` → `src/pages/resource/index.vue`（路由 `/resource`）- `src/views/blog/index.vue` → `src/pages/blog/index.vue`（路由 `/blog`）- `src/views/blog/BlogDetail.vue` → `src/pages/blog/[id].vue`（动态路由 `/blog/:id`，Nuxt 文件路由名称为 `blog-id`）- `src/views/operation/OperationPage.vue` → `src/pages/operation/index.vue`（路由 `/operation`）- `src/views/pricing/PricingPage.vue` → `src/pages/pricing/index.vue`（路由 `/pricing`）

         各页面的子组件及数据文件一并迁移到对应 pages 子目录（保持相对引用关系不变）：
         - `src/views/home/` 下的 8 个子组件（`SloganSection.vue`、`StrictMode.vue`、`CodeReview.vue`、`MoreTool.vue`、`EnterpriseDeployment.vue`、`LanguageSupport.vue`、`FooterCopyright.vue`、`ItemCard.vue`）→ `src/pages/home/`（首页 `src/pages/index.vue` 中的相对导入路径随之更新为 `./home/SloganSection.vue` 等）
         - `src/views/download/components/` → `src/pages/download/components/`；`useDownloadData.ts`、`useDownloadActions.ts`、`constants.ts`、`types.ts` → `src/pages/download/`
         - `src/views/blog/components/`（`BlogCard.vue`、`BlogSidebar.vue`）→ `src/pages/blog/components/`；`useBlogData.ts`、`blogData.ts` → `src/pages/blog/`
         - `src/views/resourceCalculator/components/` → `src/pages/resource/components/`；`hooks/` → `src/pages/resource/hooks/`；`constants.ts`、`types.ts` → `src/pages/resource/`
         - `src/views/pricing/const.ts`、`interface.ts` → `src/pages/pricing/`
         - `src/views/operation/OperationPage.vue` 无子组件，仅迁移入口文件即可

         迁移后更新各页面入口文件中的相对导入路径，确保子组件引用正确；
         `src/views/blog/BlogDetail.vue` 中引用 `@/views/home/FooterCopyright.vue` 的路径需更新为 `../home/FooterCopyright.vue`（或 `@/pages/home/FooterCopyright.vue`）；
         `src/views/blog/index.vue` 中引用 `@/views/home/FooterCopyright.vue` 同理更新；
         迁移完成后删除空的 `src/views/` 目录

- [x] 3.2 将 src/hooks/ 重命名为 src/composables/，删除不再需要的 composable
      【目标对象】`src/hooks/` → `src/composables/`，`src/hooks/useRouterPrefetch.ts`（删除）
      【修改目的】Nuxt 约定 composables/ 目录自动导入，hooks/ 不在自动导入路径内；`useRouterPrefetch` 功能已由 `<NuxtLink prefetch>` 内置替代，不再需要
      【修改方式】重命名目录；删除 `useRouterPrefetch.ts`；更新所有组件中的显式导入路径
      【修改内容】- 重命名目录 `src/hooks/` → `src/composables/`（保留所有文件，除下面要删除的）- 删除 `src/composables/useRouterPrefetch.ts`（迁移后即删除，对应 proposal.md 中 `src/router/prefetch.ts` 删除的意图，预加载功能由 `<NuxtLink prefetch>` 接管）- 文件名保持不变（`use_animation.ts` 保留原名，符合仓库现有命名约定）- 更新所有组件中 `@/hooks/` 的显式导入路径为 `@/composables/`（涉及文件：`src/components/NavBar.vue` 中 `@/hooks/useResponsive` 和 `@/hooks/useMobileMenu`；`src/views/blog/index.vue` 中 `@/hooks/useResponsive`；`src/views/home/` 各子组件中如有 `@/hooks/use_animation`）- Nuxt 自动导入 composables/ 目录，可移除显式 import 语句（可选，按需处理）

- [x] 3.3 创建 src/middleware/ 目录，迁移路由守卫
      【目标对象】`src/middleware/locale-guard.global.ts`（新建）；`src/pages/blog/index.vue`、`src/pages/blog/[id].vue`、`src/pages/pricing/index.vue`（修改）
      【修改目的】将 `src/router/index.ts` 中的 `beforeEach` 语言可见性守卫迁移为 Nuxt 全局中间件；在对应页面通过 `definePageMeta` 声明语言可见性
      【修改方式】新建 `src/middleware/locale-guard.global.ts`；在三个页面组件中新增 `definePageMeta` 调用
      【相关依赖】`src/router/index.ts` 中的 `beforeEach` 逻辑、`@nuxtjs/i18n` 的 `useI18n()`
      【修改内容】
      新建 `src/middleware/locale-guard.global.ts`：- 文件名含 `.global` 后缀表示全局中间件，自动应用于所有路由 - 使用 `useI18n().locale` 获取当前语言 - 从 `to.meta.localeVisible` 读取允许的语言列表（类型为 `string[] | undefined`）- 若 `localeVisible` 存在且当前语言不在列表中，调用 `navigateTo('/')` 重定向（对应原 `next({ name: 'home' })`）- 否则正常放行（不调用 next，Nuxt 中间件默认放行）

         在以下三个页面组件的 `<script setup>` 顶部新增 `definePageMeta`（对应原 router/index.ts 中的 meta 配置）：
         - `src/pages/blog/index.vue`：新增 `definePageMeta({ localeVisible: ['zh'] })`
         - `src/pages/blog/[id].vue`：新增 `definePageMeta({ localeVisible: ['zh'] })`（原 `/blog/:id` 路由也有 `localeVisible: ['zh']`）
         - `src/pages/pricing/index.vue`：新增 `definePageMeta({ localeVisible: ['zh'] })`

- [x] 3.4 删除 src/router/ 目录
      【目标对象】`src/router/index.ts`、`src/router/prefetch.ts`
      【修改目的】路由功能由 Nuxt 文件系统路由接管，预加载由 `<NuxtLink prefetch>` 内置处理
      【修改方式】删除文件及目录
      【修改内容】- 删除 `src/router/index.ts`（路由配置和 beforeEach 守卫已迁移到 Nuxt 文件路由和 middleware）- 删除 `src/router/prefetch.ts`（预加载逻辑由 Nuxt 内置处理）- 删除空的 `src/router/` 目录

### 阶段四：i18n 模块迁移

- [x] 4.1 创建 i18n/locales/ 目录，迁移翻译文件
      【目标对象】`i18n/locales/zh.json`、`i18n/locales/en.json`（新建于项目根目录下）；`src/locales/` 目录（清理）
      【修改目的】`@nuxtjs/i18n` 从 `nuxt.config.ts` 配置的 `langDir` 路径读取语言文件，迁移后由模块统一管理
      【修改方式】在项目根目录创建 `i18n/locales/` 目录，复制 JSON 文件，删除原 `src/locales/` 目录
      【修改内容】- 复制 `src/locales/zh.json` → `i18n/locales/zh.json`（内容不变）- 复制 `src/locales/en.json` → `i18n/locales/en.json`（内容不变）- 删除 `src/locales/index.ts`（vue-i18n 手动初始化逻辑，由 `@nuxtjs/i18n` 模块接管）- 删除 `src/locales/zh.json`、`src/locales/en.json`（原文件，已迁移）- 删除空的 `src/locales/` 目录

- [x] 4.2 更新组件中的 i18n 调用方式
      【目标对象】所有包含 `from 'vue-i18n'` 导入的文件（涉及：`src/composables/useResponsive.ts`、`src/composables/useLocalizedResources.ts`、`src/components/navbar/NavbarMenu.vue`、`src/components/navbar/LanguageSwitcher.vue`、`src/components/navbar/MobileMenu.vue`、`src/pages/blog/index.vue` 及其他页面组件）
      【修改目的】`@nuxtjs/i18n` 的 `useI18n()` 由 Nuxt 自动导入，无需显式引入 `vue-i18n`
      【修改方式】搜索并删除 `import { useI18n } from 'vue-i18n'` 语句；`useI18n()` 调用保持不变
      【修改内容】- 搜索项目中所有 `from 'vue-i18n'` 的导入语句并删除（`useI18n` 由 `@nuxtjs/i18n` 通过 Nuxt 自动导入提供）- `useI18n()` 的调用方式（`const { t, locale } = useI18n()`）保持不变，API 完全兼容 - `src/components/navbar/LanguageSwitcher.vue` 中的 `locale.value = key` 赋值方式在 `@nuxtjs/i18n` 中仍然有效，无需修改

- [x] 4.3 更新 src/utils/language.ts 的语言检测逻辑
      【目标对象】`src/utils/language.ts`
      【修改目的】SSR 环境下无法访问 `localStorage` 和 `navigator`，需要添加客户端守卫；`initializeLanguage()` 函数在 Nuxt 中不再被调用（原调用方 `src/locales/index.ts` 已删除），但 `setStoredLanguage()` 仍被 `src/components/navbar/LanguageSwitcher.vue` 使用，需要保留并修复
      【修改方式】在 `localStorage` 和 `navigator` 调用处添加 `import.meta.client` 守卫
      【修改内容】- `getStoredLanguage()` 函数：将 `localStorage.getItem(...)` 包裹在 `if (import.meta.client)` 中，服务端返回 `null` - `setStoredLanguage()` 函数：将 `localStorage.setItem(...)` 包裹在 `if (import.meta.client)` 中，服务端直接返回（无操作）- `getBrowserLanguage()` 函数：将 `navigator.language` 调用包裹在 `if (import.meta.client)` 中，服务端返回默认值 `'zh'`（浏览器语言检测由 `@nuxtjs/i18n` 的 `detectBrowserLanguage` 在服务端处理）- `initializeLanguage()` 函数：可保留但不再主动调用（原调用方 `src/locales/index.ts` 已删除）；语言初始化由 `@nuxtjs/i18n` 模块自动处理

### 阶段五：Naive UI SSR 配置

- [x] 5.1 创建 Naive UI Nuxt 插件
      【目标对象】`src/plugins/naive-ui.ts`（新建）
      【修改目的】配置 Naive UI 的 SSR CSS 收集，解决服务端渲染时组件样式缺失问题
      【修改方式】创建新文件，使用 `defineNuxtPlugin` 导出插件
      【相关依赖】`@css-render/vue3-ssr`、`naive-ui`
      【修改内容】- 创建 `src/plugins/naive-ui.ts`，使用 `defineNuxtPlugin((nuxtApp) => { ... })` 结构 - 服务端分支（`import.meta.server`）：从 `@css-render/vue3-ssr` 导入 `setup`，调用 `setup(nuxtApp.vueApp)` 收集 CSS；通过 `nuxtApp.ssrContext?.renderMeta` 将收集到的 CSS 字符串注入到 HTML `<head>` 中 - 客户端分支：无需特殊处理，naive-ui 正常工作

- [x] 5.2 确认 Naive UI 组件导入方式
      【目标对象】所有使用 Naive UI 组件的文件（`src/components/navbar/LanguageSwitcher.vue`、`app.vue`、`src/pages/pricing/index.vue` 等）
      【修改目的】Nuxt 环境下 Naive UI 需要具名导入（现有方式），确保 `nuxt.config.ts` 中 `build.transpile` 配置正确
      【修改方式】检查确认，无需大改
      【修改内容】- 确认现有 `import { NPopover } from 'naive-ui'` 等具名导入方式保持不变 - 确认 `nuxt.config.ts` 的 `build.transpile` 中已包含 `['naive-ui', 'vicons', '@css-render/vue3-ssr']` - `app.vue` 中的 `NMessageProvider` 需保留显式导入（Nuxt 不自动导入 naive-ui 组件）

### 阶段六：SSR 兼容性修复

- [x] 6.1 修复 src/composables/useGithubStars.ts 的 localStorage 调用
      【目标对象】`src/composables/useGithubStars.ts`（原 `src/hooks/useGithubStars.ts`，经任务 3.2 重命名目录后路径变更）
      【修改目的】SSR 阶段无 `localStorage`，`getCachedGithubStars()` 和 `setCachedGithubStars()` 中的直接调用会导致服务端报错
      【修改方式】在 `getCachedGithubStars()` 和 `setCachedGithubStars()` 函数体内添加 `import.meta.client` 守卫
      【修改内容】- `getCachedGithubStars()` 函数：在函数体最外层添加 `if (!import.meta.client) return null`，服务端直接返回 `null`（不读取缓存）- `setCachedGithubStars()` 函数：在函数体最外层添加 `if (!import.meta.client) return`，服务端直接返回（不写入缓存）- `fetchGithubStars()` 已在 `onMounted` 中调用，`onMounted` 仅在客户端执行，因此 fetch 调用本身无需额外守卫 - SSR 阶段 `githubStars` 初始值保持 `0`，客户端 hydration 后通过 `onMounted` 正常获取

- [x] 6.2 确认 src/composables/useMobileMenu.ts 的 SSR 兼容性
      【目标对象】`src/composables/useMobileMenu.ts`（原 `src/hooks/useMobileMenu.ts`）
      【修改目的】确认 `document.body.style` 修改已有 SSR 守卫，无需额外修改
      【修改方式】检查现有代码，确认 `typeof document !== 'undefined'` 守卫已完整覆盖
      【修改内容】- 检查 `lockBodyScroll()` 和 `unlockBodyScroll()` 函数：现有代码已有 `if (typeof document !== 'undefined')` 守卫，SSR 安全，无需修改 - 确认 `onUnmounted` 中调用的 `unlockBodyScroll()` 也在守卫保护下，无问题 - 如需统一风格，可将 `typeof document !== 'undefined'` 替换为 `import.meta.client`（可选，效果等价）

- [x] 6.3 修复 src/composables/useResponsive.ts 的 window 调用
      【目标对象】`src/composables/useResponsive.ts`（原 `src/hooks/useResponsive.ts`）
      【修改目的】SSR 阶段无 `window` 对象，`checkMobile()` 中的 `window.innerWidth` 直接调用会导致服务端报错；现有代码的 `checkMobile()` 在 `onMounted` 中调用，但 `window.addEventListener` 也在 `onMounted` 中，需确认无问题
      【修改方式】确认 `window` 调用均在 `onMounted` 内，SSR 阶段使用默认值
      【修改内容】- 确认 `checkMobile()` 函数仅在 `onMounted` 中被调用（现有代码已是如此），SSR 阶段不会执行，无需修改 - 确认 `window.addEventListener('resize', handleResize)` 在 `onMounted` 中注册（现有代码已是如此），SSR 安全 - `isMobile` 和 `isTablet` 初始值均为 `false`（默认桌面端），SSR 阶段使用此默认值，客户端 hydration 后通过 `onMounted` 更新为实际值，无需额外修改

- [x] 6.4 全局移除 @unhead/vue 显式导入
      【目标对象】所有包含 `from '@unhead/vue'` 导入的文件（涉及：`src/components/StructuredData.vue`、`src/pages/index.vue`（原 `src/views/home/index.vue`）、`src/pages/download/index.vue`（原 `src/views/download/index.vue`）、`src/pages/blog/index.vue`（原 `src/views/blog/index.vue`）及其他使用 `useHead` 的页面组件）
      【修改目的】Nuxt 内置 `useHead()`（底层与 `@unhead/vue` 相同，API 完全兼容），由 Nuxt 自动导入，无需显式引入
      【修改方式】搜索并删除所有 `import { useHead } from '@unhead/vue'` 语句
      【修改内容】- 搜索项目中所有 `from '@unhead/vue'` 的导入语句并删除 - `useHead()` 的调用方式和参数保持不变，Nuxt 自动提供 - `src/components/StructuredData.vue` 中的 `useHead({ script: [...] })` 调用保持不变

### 阶段七：NuxtLink 替换 RouterLink，修复路由 API 调用

- [x] 7.1 全局替换 RouterLink 为 NuxtLink，移除 vue-router 显式导入
      【目标对象】所有 Vue 组件（`src/components/`、`src/pages/` 目录）
      【修改目的】在 Nuxt 中应使用 `<NuxtLink>` 替代 `<RouterLink>` 获得预加载等增强功能；`useRouter`、`useRoute` 由 Nuxt 自动导入，无需显式引入
      【修改方式】批量替换模板标签；删除 `from 'vue-router'` 导入语句
      【修改内容】- 将所有模板中的 `<RouterLink>` 替换为 `<NuxtLink>`，`<router-link>` 替换为 `<nuxt-link>` - 移除 `import { RouterLink } from 'vue-router'` 导入（如有）- 移除所有 `import { useRouter } from 'vue-router'`、`import { useRoute } from 'vue-router'` 等显式导入（Nuxt 自动提供）

- [x] 7.2 修复 NavBar.vue 中的路由状态读取方式
      【目标对象】`src/components/NavBar.vue`
      【修改目的】`router.currentRoute.value.name` 在 Nuxt 中应改用 `useRoute().name`，更符合 Nuxt 惯用写法
      【修改方式】在 `<script setup>` 中新增 `const route = useRoute()`，替换 `router.currentRoute.value` 引用
      【相关依赖】Nuxt 自动提供的 `useRoute()`
      【修改内容】- 移除 `const router = useRouter()`（如仅用于读取当前路由信息）- 新增 `const route = useRoute()` - `notHomePage`：`router.currentRoute.value.name !== 'home'` → `route.name !== 'home'` - `isPricingPage`：`router.currentRoute.value.name === 'pricing'` → `route.name === 'pricing'` - `isBlogPage`：`['blog', 'blogDetail'].includes(router.currentRoute.value.name as string)` → `['blog', 'blog-id'].includes(route.name as string)`（Nuxt 文件路由中 `blog/[id].vue` 的路由名称为 `blog-id`）- 移除 `import { useRouter } from 'vue-router'`（已由 Nuxt 自动导入，且改用 useRoute 后 useRouter 不再需要）

- [x] 7.3 修复 NavbarMenu.vue 中的路由状态读取方式
      【目标对象】`src/components/navbar/NavbarMenu.vue`
      【修改目的】`router.currentRoute.value.name` 在 Nuxt 中应改用 `useRoute().name`
      【修改方式】新增 `const route = useRoute()`，替换 `router.currentRoute.value` 引用
      【相关依赖】Nuxt 自动提供的 `useRoute()`
      【修改内容】- 移除 `const router = useRouter()` - 新增 `const route = useRoute()` - `currentRouteName`：`router.currentRoute.value.name` → `route.name` - 移除 `import { useRouter } from 'vue-router'`

- [x] 7.4 修复 LanguageSwitcher.vue 中的路由跳转和状态读取
      【目标对象】`src/components/navbar/LanguageSwitcher.vue`
      【修改目的】`router.push({ name: 'home' })` 在 Nuxt 中改用 `navigateTo('/')`；路由状态读取改用 `useRoute()`
      【修改方式】替换 `router.push` 为 `navigateTo`；新增 `const route = useRoute()`
      【相关依赖】Nuxt 自动提供的 `navigateTo()`、`useRoute()`
      【修改内容】- 移除 `const router = useRouter()` - 新增 `const route = useRoute()` - `handleSelect` 中：`router.currentRoute.value.name === 'pricing'` → `route.name === 'pricing'` - `router.push({ name: 'home' })` → `navigateTo('/')` - 移除 `import { useRouter } from 'vue-router'`

- [x] 7.5 修复 src/pages/blog/[id].vue 中的路由跳转方式
      【目标对象】`src/pages/blog/[id].vue`（原 `src/views/blog/BlogDetail.vue`）
      【修改目的】`router.push({ name: 'blog' })` 和 `router.push({ name: 'blogDetail', params: { id } })` 中的命名路由在 Nuxt 文件路由中名称发生变化，需要更新
      【修改方式】将命名路由跳转改为路径跳转或使用 Nuxt 的 `navigateTo()`
      【相关依赖】Nuxt 自动提供的 `navigateTo()`、`useRoute()`
      【修改内容】- `goBack()` 中：`router.push({ name: 'blog' })` → `navigateTo('/blog')` - `goToArticle(id)` 中：`router.push({ name: 'blogDetail', params: { id } })` → `navigateTo('/blog/' + id)` - `route.params.id` 的读取方式保持不变（`useRoute().params.id` 在 Nuxt 中完全兼容）- 移除 `import { useRouter, useRoute } from 'vue-router'`（Nuxt 自动提供）

### 阶段八：构建和部署配置更新

- [x] 8.1 更新 Dockerfile 为 Nuxt SSR 多阶段构建
      【目标对象】`Dockerfile`
      【修改目的】原 Dockerfile 第二阶段使用 Nginx 服务静态 `dist/` 目录；Nuxt SSR 产物为 Node.js 服务，需改为 Node.js 运行时
      【修改方式】重写 Dockerfile，将第二阶段从 Nginx 镜像改为 Node.js 镜像
      【相关依赖】Nuxt build 产物目录 `.output/`
      【修改内容】- Stage 1（builder）保持结构不变：基于 `node:20.19.2`，启用 corepack，配置 npm 镜像源，安装依赖，执行 `pnpm build`（即 `nuxt build`，产物输出到 `.output/`）- Stage 2（runner）改为 Node.js 镜像（如 `node:20.19.2-alpine`）：- 仅复制 `.output/` 目录（`COPY --from=builder /workshop/.output ./.output`）- 设置 `NODE_ENV=production` - 暴露端口 3000（Nuxt 默认监听端口，替代原来的 80）- 启动命令改为 `CMD ["node", ".output/server/index.mjs"]` - 移除原 `COPY nginx.conf /etc/nginx/conf.d/` 和 `COPY --from=builder /workshop/dist /usr/share/nginx/html` 指令

- [x] 8.2 更新 nginx.conf 为反向代理配置
      【目标对象】`nginx.conf`
      【修改目的】原 nginx.conf 用于 Dockerfile 内 Nginx 容器直接服务静态文件；SSR 模式下 Nginx 作为反向代理，将请求转发到 Node.js 服务（端口 3000）
      【修改方式】重写 nginx.conf
      【修改内容】- 移除 `root /usr/share/nginx/html` 和 `try_files $uri $uri/ /index.html` 配置（不再服务静态 HTML）- `location /` 改为反向代理：`proxy_pass http://localhost:3000`，并添加必要的 proxy_set_header（Host、X-Real-IP、X-Forwarded-For）- 保留 gzip 压缩配置（`gzip on` 及相关指令）- 保留错误页面配置

- [x] 8.3 更新 deploy.sh 以推送 SSR 服务产物并管理远端进程
      【目标对象】`deploy.sh`
      【修改目的】原 deploy.sh 本地执行 `pnpm build` 后通过 SFTP 将 `dist/` 静态文件推送到远端服务器；SSR 模式下需改为推送 `.output/` 目录，并在远端通过 SSH 命令重启 Node.js 服务
      【修改方式】修改 build 函数的产物目录引用；修改 deploy 函数的上传目录和远端服务重启逻辑
      【相关依赖】远端服务器需预装 Node.js 20+；建议使用 PM2 管理 Node.js 进程
      【修改内容】- `LOCAL_DIST` 改为 `"./output"`（Nuxt build 产物目录，对应 `.output/`）- `REMOTE_DIST_NAME` 改为 `"nuxt-output"` 或保持原名（按实际约定）- `build()` 函数：`pnpm build` 命令不变（已在 1.1 中更新为 `nuxt build`），确认产物目录为 `.output/` - `deploy()` 函数：将 SFTP 上传目录从 `dist/` 改为 `.output/` - 在 SFTP 上传完成后，通过 SSH 执行远端重启命令：`ssh ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_BASE_DIR} && pm2 restart nuxt-app || pm2 start .output/server/index.mjs --name nuxt-app"`（需远端预装 PM2）- 注意：远端服务器的 Nginx 配置需由运维人员单独更新为反向代理模式（参考任务 8.2 的配置），不在本脚本范围内
