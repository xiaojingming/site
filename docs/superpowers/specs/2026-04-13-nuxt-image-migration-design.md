# 图片资源迁移到 @nuxt/image 设计文档

**日期**：2026-04-13  
**状态**：已确认  
**分支**：refactor/nuxt-seo

---

## 目标

将项目中所有 `.webp`/`.png` 的 `<img>` 标签迁移到 `@nuxt/image` 的 `<NuxtImg>` 组件，利用其自动格式转换（AVIF/WebP）、响应式 `srcset`、内置 lazy loading 提升页面性能（LCP、带宽）。

---

## 方案选择

**方案 A（全量替换）**：将所有 `.webp`/`.png` 的 `<img>` 标签替换为 `<NuxtImg>`，移除对应静态 `import`，改用字符串路径。

理由：项目规模小（约 19 个文件），改动可控；统一后代码规范一致，维护成本低。

---

## 架构设计

### Provider

使用 `ipx`（内置，SSR 实时转换），无需外部依赖，适合 Docker 容器化部署。

### nuxt.config.ts 配置

```ts
modules: ['@nuxtjs/i18n', '@nuxt/image'],
image: {
  provider: 'ipx',
  quality: 85,
  format: ['webp', 'avif'],
},
```

### 核心实现模式

**模式 1：静态 import 改为路径字符串**

```diff
- import ZhFeature1 from '@/assets/codeReview/zh/codereview_feature01.webp'
  const featureImages = {
-   zh: [ZhFeature1, ...]
+   zh: ['/assets/codeReview/zh/codereview_feature01.webp', ...]
  }
```

路径规则：`src/assets/` 下的文件统一使用 `~/assets/` 前缀（模板内静态路径）或 `/assets/` 前缀（JS 字符串路径）。

**模式 2：`<img>` 替换为 `<NuxtImg>`**

```diff
- <img :src="item.img" alt="card img" />
+ <NuxtImg :src="item.img" alt="card img" format="webp" loading="lazy" />
```

**模式 3：首屏关键图片使用 `loading="eager"`**

```diff
- <img src="@/assets/logo.webp" alt="CoStrict Logo" />
+ <NuxtImg src="~/assets/logo.webp" alt="CoStrict Logo" loading="eager" />
```

首屏关键图片（logo、首页 port 装饰图）设置 `loading="eager"` 避免 LCP 劣化。

---

## 迁移范围

### 迁移文件清单（19 个文件）

| 文件                                                | 变更内容                                         |
| --------------------------------------------------- | ------------------------------------------------ |
| `nuxt.config.ts`                                    | 添加 `@nuxt/image` 模块及配置                    |
| `src/components/navbar/NavbarLogo.vue`              | `<img>` → `<NuxtImg loading="eager">`            |
| `src/components/FeatureSection.vue`                 | 标题图 `<img>` → `<NuxtImg>`                     |
| `src/pages/home/ItemCard.vue`                       | `<img>` → `<NuxtImg>`                            |
| `src/pages/home/LanguageSupport.vue`                | import → 路径字符串，`<img>` → `<NuxtImg>`       |
| `src/pages/home/EnterpriseDeployment.vue`           | import → 路径字符串，`<img>` → `<NuxtImg>`       |
| `src/pages/home/CodeReview.vue`                     | title/feature 图片 import → 路径字符串           |
| `src/pages/home/StrictMode.vue`                     | title/feature 图片 import → 路径字符串           |
| `src/pages/home/MoreTool.vue`                       | feature 图片 import → 路径字符串                 |
| `src/pages/home/FooterCopyright.vue`                | qrcode `<img>` → `<NuxtImg>`                     |
| `src/pages/pricing/index.vue`                       | bg_1~5.png + label-bg.webp `<img>` → `<NuxtImg>` |
| `src/pages/index.vue`                               | leftPortImg/rightPortImg import → 路径字符串     |
| `src/pages/download/useDownloadData.ts`             | 16 个图片 import → 路径字符串                    |
| `src/pages/download/components/StepTimeline.vue`    | `<img>` → `<NuxtImg>`                            |
| `src/pages/download/components/DownloadContent.vue` | `<img>` → `<NuxtImg>`                            |
| `src/pages/download/components/TabList.vue`         | `<img>` → `<NuxtImg>`                            |
| `src/pages/blog/blogData.ts`                        | coverImageMap 的 4 个 import → 路径字符串        |
| `src/pages/blog/components/BlogCard.vue`            | `<img>` → `<NuxtImg>`                            |
| `src/pages/blog/[id].vue`                           | related articles `<img>` → `<NuxtImg>`           |

### 不迁移范围

| 内容                                                   | 原因                                                   |
| ------------------------------------------------------ | ------------------------------------------------------ |
| CSS `background-image: url(...)`                       | `@nuxt/image` 不支持 CSS 背景图处理                    |
| SVG 图标（`*.svg`）                                    | 矢量格式，优化收益极低                                 |
| `<video>` poster 属性                                  | poster 是视频占位图，非常规图片优化场景                |
| `blogData.ts` 的 `import.meta.glob` + `blogImageMap`   | Vite glob import，用于 markdown 动态渲染，无法使用组件 |
| `blog/[id].vue` lightbox `<img>`                       | src 来自 glob import 的 hash URL，不适合 `<NuxtImg>`   |
| `blog/[id].vue` `renderMarkdown` 生成的 `<img>` 字符串 | 动态 HTML 字符串，无法使用组件                         |

---

## 注意事项

1. **路径格式**：`<NuxtImg>` 的 `src` 不能是 Vite 打包后的 hash URL（即不能是 `import` 的结果），必须是以 `~/assets/` 或 `/assets/` 开头的字符串路径，`ipx` 才能正确处理。
2. **SSR 兼容**：`<NuxtImg>` 在 SSR 下默认输出标准 `<img>` 标签，无需额外适配。
3. **装饰性图片**：`pricing` 页的 `bg_1~5.png` 为纯装饰图，迁移时加 `aria-hidden="true"` + `loading="lazy"`。
4. **首屏图片**：logo、首页 port 装饰图设置 `loading="eager"` 避免 LCP 劣化。
5. **Props 类型**：`FeatureSection.vue`、`ItemCard.vue` 等接收图片路径的 Props 类型保持 `string`，无需修改类型定义。

---

## 验证方式

- `pnpm build` 构建无报错
- `pnpm type-check` 类型检查通过
- `pnpm lint` ESLint 检查通过
- 本地 `pnpm preview` 验证各页面图片正常显示
- 检查 Network 面板，确认图片响应头 `Content-Type` 为 `image/avif` 或 `image/webp`
