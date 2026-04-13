# 非当前页面资源预加载设计文档

**日期**：2026-04-13  
**需求**：对非当前页面的内容增加预加载处理，提升导航跳转后的页面加载速度  
**方案**：方案 A — 集中式预加载 composable

---

## 背景

上一轮优化（`docs/superpowers/specs/2026-04-13-homepage-performance-design.md`）已完成：

- 首页视频懒加载
- 首屏以下区块懒渲染
- 导航链接改为 `<NuxtLink>`（获得悬停 prefetch JS chunk）

本次在此基础上增加两层预加载：

1. **空闲时预加载 JS chunk**：利用 `requestIdleCallback` 在浏览器空闲时静默预加载其他页面的 JS
2. **悬停时预加载媒体资源**：鼠标悬停导航项时，预加载对应页面的关键图片资源

---

## 优化目标

- 用户在首页停留期间，浏览器空闲时完成其他页面 JS chunk 的预加载
- 用户悬停导航项时，对应页面的关键图片开始预加载
- 跳转后目标页面图片已缓存，渲染更快

---

## 设计详述

### 第一节：`usePagePrefetch.ts` composable

**文件**：`src/composables/usePagePrefetch.ts`

**对外接口**：

- `prefetchAllRoutes()`：空闲时预加载所有内部路由的 JS chunk
- `prefetchRouteAssets(route: string, locale: string)`：悬停时预加载指定路由的媒体资源

**内部结构**：

```
ROUTE_ASSETS 映射表（静态常量）
  /download → { zh: [已 import 的 webp URL], en: [已 import 的 webp URL] }
  /pricing  → { zh: [已 import 的 png URL], en: [已 import 的 png URL] }
  /operation → { zh: [], en: [] }

prefetchedAssets: Set<string>（模块级单例，避免重复注入）

prefetchAllRoutes()
  - SSR 环境（!import.meta.client）直接 return
  - 使用 requestIdleCallback（不支持时 fallback 为 setTimeout(fn, 200)）
  - 在回调中对每个内部路由调用 import()
  - 覆盖路由：/download、/pricing、/blog、/operation、/resource

prefetchRouteAssets(route, locale)
  - SSR 环境直接 return
  - 查 ROUTE_ASSETS 映射表，取对应语言的资源列表
  - 过滤 prefetchedAssets 中已注入的 URL
  - 创建 <link rel="prefetch" as="image"> 注入 document.head
  - 记录到 prefetchedAssets
```

**资源 URL 解析策略**：在 `usePagePrefetch.ts` 顶层静态 import 各页面资源文件，利用 Vite 模块系统自动解析为构建后带 hash 的 URL，存入 `ROUTE_ASSETS` 映射表。无需手动维护 hash，构建时自动更新。

---

### 第二节：调用层（`app.vue` + `NavbarMenu.vue`）

**`app.vue`**：

- 引入 `usePagePrefetch`，在 `onMounted` 后调用 `prefetchAllRoutes()`
- 改动：新增 `import { onMounted } from 'vue'`，新增 composable 调用，其余不变

**`NavbarMenu.vue`**：

- 引入 `usePagePrefetch`，获取 `prefetchRouteAssets`
- 在 `<NuxtLink>` 上添加 `@mouseenter="prefetchRouteAssets(item.to!, locale)"`
- 外部链接 `<a>`（docs）不处理
- `locale` 已有（`const { t, locale } = useI18n()`），直接传入
- `prefetchedAssets` 模块级单例保证去重，多次 mouseenter 不重复注入

---

## 改动文件汇总

| 文件                                   | 操作 | 改动内容                             |
| -------------------------------------- | ---- | ------------------------------------ |
| `src/composables/usePagePrefetch.ts`   | 新增 | 两层预加载逻辑 + ROUTE_ASSETS 映射表 |
| `src/app.vue`                          | 修改 | 调用 `prefetchAllRoutes()`           |
| `src/components/navbar/NavbarMenu.vue` | 修改 | 悬停时调用 `prefetchRouteAssets()`   |

## 不改动的文件

- 各页面组件（`download/index.vue`、`pricing/index.vue` 等）：预加载逻辑集中在 composable，页面无感知
- `nuxt.config.ts`：无需新增模块
- `NavBar.vue`：逻辑在 `NavbarMenu.vue` 层处理
