# AI Coding 指南

> **重要**: 本指南是你执行该项目所有开发任务的核心依据，具备强制约束力，需全程严格遵守。

---

1. 各章节使用说明
   - **项目概览**：你在开始任何开发任务前，必须先阅读本部分，帮你快速掌握项目基础信息、技术栈和架构边界；
   - **项目结构**：本部分核心是帮你建立项目全局认知和导航索引；承接需求时，你要通过目录树快速定位功能对应的文件位置、关联代码；新增代码文件时，需按规范放入对应目录；
   - **开发规范**：这是你编码全流程的核心遵循依据，命名、接口、日志/异常处理等所有编码行为，必须严格遵循条款要求；
   - **常用命令**：当你需要执行构建、测试、部署等操作时，必须优先使用本部分标注的高频命令；
   - **通用最佳实践**：这是你设计、编码、代码交付前自检的核心准则，交付前需逐条核验，确保代码符合相关原则。
2. 条款效力：
   - 核心约束类条款（标注「必须/禁止」）需无条件严格执行，无用户显式豁免时，不得修改、规避或违反；
   - 指导性建议类条款（标注「应/建议」）需优先参考执行，可结合实际开发场景灵活调整。

---

## 项目概览

### 基本信息

- **项目名称**：site
- **项目简介**：CoStrict 官方网站，提供产品介绍、定价、资源计算器等功能，支持中英文国际化，基于 Nuxt 3 + Vue 3 构建的服务端渲染应用。
- **项目规模**：小（55+ 个代码文件）
- **开发语言**：TypeScript + Vue 3
- **整体架构**：服务端渲染（SSR）单页应用，基于 Nuxt 3
- **分支**：refactor/nuxt-seo
- **commit**：`e1917d9ce4471c9b177a4d7abc97fc792aac7c23`
- **生成时间**：2026-04-09 15:06:24

### 技术栈

**前端框架**：

- Nuxt 3.17+（SSR 框架）
- Vue 3.5+（UI 框架）
- TypeScript 5.8+

**UI 与样式**：

- Naive UI 2.41+（UI 组件库）
- Tailwind CSS 4.1+（工具类样式）
- Less（scoped 组件样式）
- @css-render/vue3-ssr（SSR CSS 渲染）
- vfonts（字体）

**国际化**：

- @nuxtjs/i18n 9.5+（中文/英文双语）

**工具链**：

- 包管理器：pnpm
- 构建工具：Vite（via Nuxt）
- 代码质量：ESLint 9+ + Prettier 3.5+
- 类型检查：TypeScript 5.8+ + vue-tsc

## 项目结构

```
site/
├─ src/                              # 源码主目录（Nuxt srcDir 配置指向此处）
│  ├─ app.vue                        # 应用根组件：挂载 NuxtPage 路由出口
│  ├─ index.css                      # 全局基础样式：自定义滚动条等
│  ├─ pages/                         # 页面路由：Nuxt 自动路由，每个文件/目录对应路由
│  │  ├─ index.vue                   # 首页：产品介绍主入口，组合各 home/ 子组件
│  │  ├─ home/                       # 首页子区块组件（非独立路由）
│  │  │  ├─ SloganSection.vue        # Slogan 区：产品口号与主 CTA 按钮
│  │  │  ├─ CodeReview.vue           # 代码审查功能展示区块
│  │  │  ├─ StrictMode.vue           # 严格模式功能展示区块
│  │  │  ├─ EnterpriseDeployment.vue # 企业部署方案展示区块
│  │  │  ├─ LanguageSupport.vue      # 多语言支持展示区块
│  │  │  ├─ MoreTool.vue             # 更多工具功能展示区块
│  │  │  ├─ FooterCopyright.vue      # 页脚版权信息区块
│  │  │  └─ ItemCard.vue             # 通用卡片组件（首页内复用）
│  │  ├─ pricing/                    # 定价页（/pricing 路由）
│  │  │  ├─ index.vue                # 定价页主组件：套餐展示与对比
│  │  │  ├─ const.ts                 # 定价数据常量（套餐内容、功能列表）
│  │  │  └─ interface.ts             # 定价相关 TypeScript 类型定义
│  │  ├─ blog/                       # 博客列表与详情页（/blog 路由）
│  │  │  ├─ index.vue                # 博客列表页
│  │  │  ├─ [id].vue                 # 博客详情页（动态路由）
│  │  │  ├─ blogData.ts              # 博客文章数据（静态内容）
│  │  │  ├─ useBlogData.ts           # 博客数据获取与处理逻辑
│  │  │  └─ components/              # 博客页私有组件
│  │  │     ├─ BlogCard.vue          # 博客卡片：列表项展示
│  │  │     └─ BlogSidebar.vue       # 博客侧边栏：分类/标签筛选
│  │  ├─ download/                   # 下载页（/download 路由）
│  │  │  ├─ index.vue                # 下载页主组件
│  │  │  ├─ constants.ts             # 下载相关常量
│  │  │  ├─ types.ts                 # 下载相关类型定义
│  │  │  ├─ useDownloadActions.ts    # 下载操作逻辑（按钮行为等）
│  │  │  ├─ useDownloadData.ts       # 下载数据获取与处理
│  │  │  └─ components/              # 下载页私有组件
│  │  │     ├─ DownloadContent.vue   # 下载内容主体区域
│  │  │     ├─ InstallMethodTabs.vue # 安装方式 Tab 切换
│  │  │     ├─ StepTimeline.vue      # 安装步骤时间线展示
│  │  │     └─ TabList.vue           # Tab 列表组件
│  │  ├─ resource/                   # 资源计算器页（/resource 路由）
│  │  │  ├─ index.vue                # 资源计算器主页
│  │  │  ├─ constants.ts             # 计算器参数常量（模型配置等）
│  │  │  ├─ types.ts                 # 计算器类型定义
│  │  │  ├─ components/              # 计算器私有组件
│  │  │  │  ├─ ParameterSettings.vue # 参数设置面板
│  │  │  │  ├─ ResourceResult.vue    # 计算结果展示
│  │  │  │  ├─ GpuCostBreakdown.vue  # GPU 成本明细
│  │  │  │  ├─ AicpServices.vue      # AICP 服务配置
│  │  │  │  └─ ModelTable.vue        # 模型参数表格
│  │  │  └─ hooks/
│  │  │     └─ useResourceCalculator.ts  # 资源计算核心逻辑
│  │  └─ operation/                  # 运营活动页（/operation 路由）
│  │     └─ index.vue                # 运营活动主页面
│  ├─ components/                    # 全局公共组件（跨页面复用）
│  │  ├─ NavBar.vue                  # 顶部导航栏主组件（高频修改）
│  │  ├─ FeatureSection.vue          # 功能特性展示通用区块
│  │  ├─ PageTitle.vue               # 页面标题组件（SEO 用）
│  │  ├─ StructuredData.vue          # 结构化数据注入（JSON-LD）
│  │  └─ navbar/                     # 导航栏子组件
│  │     ├─ GithubStars.vue          # GitHub Star 数展示
│  │     ├─ LanguageSwitcher.vue     # 语言切换按钮
│  │     ├─ MobileMenu.vue           # 移动端汉堡菜单
│  │     ├─ NavbarLogo.vue           # 导航栏 Logo
│  │     └─ NavbarMenu.vue           # 导航菜单项列表
│  ├─ composables/                   # 全局组合式函数（跨组件复用逻辑）
│  │  ├─ use_animation.ts            # 滚动动画触发逻辑
│  │  ├─ useGithubStars.ts           # GitHub Stars 数据获取与缓存
│  │  ├─ useLocalizedResources.ts    # 本地化资源路径处理
│  │  ├─ useMobileMenu.ts            # 移动端菜单开关状态管理
│  │  └─ useResponsive.ts            # 响应式断点检测
│  ├─ middleware/
│  │  └─ locale-guard.global.ts      # 全局路由守卫：语言重定向处理
│  ├─ plugins/
│  │  └─ naive-ui.ts                 # Naive UI SSR 插件注册
│  ├─ utils/
│  │  └─ language.ts                 # 语言偏好存储与读取工具函数
│  ├─ styles/
│  │  └─ tokens.css                  # 设计 Token：CSS 变量（颜色/间距等）
│  └─ assets/                        # 静态资源（构建时处理）
│     ├─ home/                       # 首页图片资源
│     ├─ blog/                       # 博客图片资源
│     ├─ codeReview/                 # 代码审查功能图片（含中英文版本）
│     ├─ download/                   # 下载页图片资源
│     ├─ enterprise/                 # 企业版图片资源
│     ├─ price/                      # 定价页图片资源
│     ├─ strictMode/                 # 严格模式功能图片
│     ├─ supportLang/                # 语言支持图片资源
│     ├─ tool/                       # 工具功能图片资源
│     ├─ video/                      # 功能演示视频
│     └─ qrcode/                     # 二维码图片资源
├─ i18n/                             # 国际化配置目录
│  ├─ i18n.config.ts                 # i18n 插件配置（语言包注册）
│  └─ locales/                       # 翻译文案（高频修改）
│     ├─ zh.json                     # 中文翻译文案
│     └─ en.json                     # 英文翻译文案
├─ public/                           # 公共静态资源（直接服务，不经构建）
│  ├─ favicon.png                    # 网站图标
│  ├─ robots.txt                     # 爬虫规则配置
│  ├─ sitemap.xml                    # 站点地图
│  └─ llms.txt                       # AI 爬虫友好说明文件
├─ tests/                            # 测试目录（待完善）
│  └─ unit/
│     └─ example.spec.ts             # 单元测试示例
├─ nuxt.config.ts                    # Nuxt 核心配置：模块、路由、构建、SEO
├─ package.json                      # 依赖与脚本配置
├─ tsconfig.json                     # TypeScript 配置
├─ eslint.config.ts                  # ESLint 规则配置
├─ .prettierrc.json                  # Prettier 格式化配置
├─ Dockerfile                        # 容器化部署配置
├─ nginx.conf                        # Nginx 反向代理配置
└─ deploy.sh                         # 部署脚本
```

## 开发规范

### 代码存放规范

- 页面组件必须放在 `src/pages/` 下，全局公共组件放 `src/components/`，禁止混放
- 页面私有子组件必须放在对应页面目录的 `components/` 子目录下（如 `src/pages/blog/components/`）
- 页面专属 hooks 必须放在对应页面目录的 `hooks/` 子目录下（如 `src/pages/resource/hooks/`）
- 跨页面复用的组合式函数必须放在 `src/composables/`，命名以 `use` 前缀开头
- 工具函数必须放在 `src/utils/`，类型定义放对应模块的 `interface.ts` 或 `types.ts`
- 页面常量必须放在对应模块的 `constants.ts` 或 `const.ts`，禁止硬编码在组件中
- 静态资源必须放在 `src/assets/` 下，按功能模块分子目录；公共不经构建的资源放 `public/`
- 国际化翻译文件必须放在 `i18n/locales/`，禁止放在 `src/` 内
- 设计 Token（CSS 变量）必须在 `src/styles/tokens.css` 中统一定义

### 命名规范

- 组件文件必须使用 PascalCase，如 `NavBar.vue`、`BlogCard.vue`
- 组合式函数文件应使用 camelCase（`useGithubStars.ts`），允许下划线风格（`use_animation.ts`）
- 类型/接口必须使用 PascalCase，如 `PricingPlan`、`Feature`、`StepItem`
- 常量必须使用 UPPER_SNAKE_CASE，如 `GITHUB_STARS_CACHE_KEY`、`CLI_COMMAND_INSTALL_NPM`
- Vue 组件必须通过 `defineOptions({ name: 'ComponentName' })` 设置多词组件名

### Vue 组件规范

- 必须使用 `<script setup lang="ts">` 语法，禁止 Options API
- `script setup` 内部顺序：`definePageMeta` → imports → types → `defineOptions` → `useHead` → composables → reactive state → methods → lifecycle hooks
- 必须显式导入 Naive UI 组件（如 `import { NLayout, NCard } from 'naive-ui'`），禁止依赖自动导入
- 页面级组件应使用 `definePageMeta` 控制路由元信息（如 `localeVisible`）
- Props 类型必须用 TypeScript 泛型定义，应使用 `withDefaults` 设置默认值
- 事件类型必须用 `defineEmits<{...}>()` 泛型形式声明
- SEO 元信息必须通过 `useHead()` 在每个页面组件中配置 title、meta、link

### 样式规范

- 应优先使用 Tailwind CSS 工具类，scoped 样式必须使用 `<style lang="less" scoped>`
- 禁止在全局样式中定义组件级样式，避免污染
- 间距、颜色、字体、z-index 应优先使用 `src/styles/tokens.css` 中定义的 CSS 变量
- 响应式断点应遵循 tokens.css 中定义的断点：480px / 768px / 1024px / 1280px / 1920px
- 资源计算器页（`/resource`）例外：使用普通 `<style scoped>`（无 Less）

### 国际化规范

- 所有用户可见文本必须使用 `t('key')` 翻译，禁止硬编码中文或英文文本
- 新增翻译 key 必须同时在 `i18n/locales/zh.json` 和 `i18n/locales/en.json` 中添加
- 定价页（`/pricing`）和博客页（`/blog`）为仅中文页面，必须在 `definePageMeta` 中设置 `localeVisible: ['zh']`
- 中英文差异图片应分别存放在 `zh/` 和 `en/` 子目录，通过 `useLocalizedResources` 切换
- 语言偏好读写必须使用 `src/utils/language.ts` 中的工具函数，cookie key 为 `costrict_language`

### SSR 安全规范

- 访问 `localStorage`/`sessionStorage` 前必须检查 `import.meta.client` 或 `!import.meta.server`
- 访问 `window`/`document`/`navigator` 等浏览器 API 前必须检查 `typeof window !== 'undefined'`
- `localStorage` 操作必须包裹在 `try-catch` 中，并提供错误日志
- 浏览器 API 调用应放在 `onMounted` 生命周期钩子中，禁止在模块顶层直接调用

### TypeScript 规范

- 必须开启严格模式（`tsconfig.json` 中 `"strict": true`）
- 函数参数和返回值必须有明确类型，禁止使用 `any`（除非有充分理由）
- 简单类型别名使用 `type`，对象形状使用 `interface`
- 内部模块导入必须使用 `@/` 路径别名，禁止使用相对路径 `../../`

### 状态管理规范

- 简单响应式值使用 `ref`，复杂对象使用 `reactive`
- 派生状态必须使用 `computed`，禁止在模板中写复杂计算逻辑
- 全局共享状态通过 composable 函数封装，禁止使用全局变量

### 公共工具函数

- 语言偏好存储/读取：`src/utils/language.ts`（`getStoredLanguage`、`setStoredLanguage`）
- 响应式断点检测：`src/composables/useResponsive.ts`（`isMobile`、`isTablet`、`isEn`）
- 滚动进入动画：`src/composables/use_animation.ts`（`useAnimation`）
- GitHub Stars 数据：`src/composables/useGithubStars.ts`（含 localStorage 缓存）
- 多语言资源切换：`src/composables/useLocalizedResources.ts`（图片/资源按语言切换）

### 格式化规范

- 缩进必须使用 2 空格，禁止 Tab；禁止行尾分号，字符串必须使用单引号
- 单行最大 100 字符，换行符必须使用 LF
- 提交前应运行 `pnpm lint` 和 `pnpm format` 确保代码规范

## 常用命令

```bash
pnpm dev          # 启动开发服务器（端口 9001）
pnpm build        # 生产构建（含类型检查）
pnpm type-check   # 仅类型检查（nuxt typecheck）
pnpm lint         # ESLint 检查并自动修复
pnpm format       # Prettier 格式化 src/ 目录
pnpm preview      # 预览生产构建
pnpm generate     # 生成静态站点（nuxt generate）
```

## 通用最佳实践

- 编码与设计严格遵循以下核心原则：
  - KISS原则：代码逻辑简洁，无冗余实现；
  - DRY原则：同类逻辑复用，不重复编写；
  - 单一职责原则：类/函数仅承担一项核心功能；
  - 单一数据源原则：同一业务数据仅从可信源获取，保证一致性；
  - 最小改动原则：仅修改满足需求的必要代码，不做无关联重构；
- 优先复用/借鉴项目现有工具类、业务逻辑及同类实现机制，不重复造轮子；
- 禁止过度设计：仅实现需求明确的功能，不添加无业务依据的扩展代码；
- 代码交付前完成全量自检：确保无语法、路径、依赖错误，且符合本清单所有约束。
