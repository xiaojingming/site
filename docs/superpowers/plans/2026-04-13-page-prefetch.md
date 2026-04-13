# 非当前页面资源预加载 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在首页停留期间利用浏览器空闲时间预加载其他页面 JS chunk，并在鼠标悬停导航项时预加载对应页面的关键图片资源，提升跳转后的页面渲染速度。

**Architecture:** 新建 `src/composables/usePagePrefetch.ts`，在顶层静态 import 各页面关键资源（由 Vite 解析为带 hash 的构建 URL），暴露 `prefetchAllRoutes()`（空闲时预加载 JS）和 `prefetchRouteAssets(route, locale)`（悬停时注入 `<link rel="prefetch">`）两个函数；在 `app.vue` 中调用前者，在 `NavbarMenu.vue` 的 NuxtLink mouseenter 事件中调用后者。

**Tech Stack:** Nuxt 3, Vue 3 `<script setup>`, `requestIdleCallback`（fallback: `setTimeout`），`<link rel="prefetch">`，Vite 静态 import

---

## 文件改动清单

| 文件                                   | 操作                                           |
| -------------------------------------- | ---------------------------------------------- |
| `src/composables/usePagePrefetch.ts`   | 新增                                           |
| `src/app.vue`                          | 修改 — 调用 `prefetchAllRoutes()`              |
| `src/components/navbar/NavbarMenu.vue` | 修改 — mouseenter 调用 `prefetchRouteAssets()` |

---

## Task 1: 新建 `usePagePrefetch.ts` composable

**Files:**

- Create: `src/composables/usePagePrefetch.ts`

### 背景

这是核心文件。通过顶层静态 import 资源文件，Vite 构建时会将这些资源纳入 asset graph 并生成带 hash 的 URL，composable 拿到的就是构建后的正确路径。`prefetchedAssets` 作为模块级 Set 单例，保证同一资源在整个页面生命周期内只注入一次 `<link>` 标签。

- [ ] **Step 1: 创建文件，写入完整实现**

创建 `src/composables/usePagePrefetch.ts`，内容如下：

```typescript
import vscodeImg from '@/assets/download/vscode.webp'
import jetbrainsImg from '@/assets/download/jetbrains.webp'
import cliImg from '@/assets/download/cli.webp'
import vscodeIconImg from '@/assets/download/vscode_icon.webp'
import jetbrainsIconImg from '@/assets/download/jetbrains_icon.webp'
import cliIconImg from '@/assets/download/cli_icon.webp'
import ZhDownloadStep1 from '@/assets/download/zh/download_step1.webp'
import ZhDownloadStep2 from '@/assets/download/zh/download_step2.webp'
import EnDownloadStep1 from '@/assets/download/en/download_step1.webp'
import EnDownloadStep2 from '@/assets/download/en/download_step2.webp'
import ZhCliInstall from '@/assets/download/zh/cli_install.webp'
import EnCliInstall from '@/assets/download/en/cli_install.webp'
import priceBg1 from '@/assets/price/bg_1.png'
import priceBg2 from '@/assets/price/bg_2.png'
import priceBg3 from '@/assets/price/bg_3.png'
import priceBg4 from '@/assets/price/bg_4.png'
import priceBg5 from '@/assets/price/bg_5.png'

type Locale = 'zh' | 'en'

const ROUTE_ASSETS: Record<string, Record<Locale, string[]>> = {
  '/download': {
    zh: [
      vscodeImg,
      jetbrainsImg,
      cliImg,
      vscodeIconImg,
      jetbrainsIconImg,
      cliIconImg,
      ZhDownloadStep1,
      ZhDownloadStep2,
      ZhCliInstall,
    ],
    en: [
      vscodeImg,
      jetbrainsImg,
      cliImg,
      vscodeIconImg,
      jetbrainsIconImg,
      cliIconImg,
      EnDownloadStep1,
      EnDownloadStep2,
      EnCliInstall,
    ],
  },
  '/pricing': {
    zh: [priceBg1, priceBg2, priceBg3, priceBg4, priceBg5],
    en: [priceBg1, priceBg2, priceBg3, priceBg4, priceBg5],
  },
  '/operation': { zh: [], en: [] },
  '/blog': { zh: [], en: [] },
  '/resource': { zh: [], en: [] },
}

const INTERNAL_ROUTES = ['/download', '/pricing', '/blog', '/operation', '/resource']

const prefetchedAssets = new Set<string>()

const scheduleIdle = (cb: () => void) => {
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(cb)
  } else {
    setTimeout(cb, 200)
  }
}

export function usePagePrefetch() {
  const prefetchAllRoutes = () => {
    if (!import.meta.client) return
    scheduleIdle(() => {
      import('../pages/download/index.vue').catch(() => {})
      import('../pages/pricing/index.vue').catch(() => {})
      import('../pages/blog/index.vue').catch(() => {})
      import('../pages/operation/index.vue').catch(() => {})
      import('../pages/resource/index.vue').catch(() => {})
    })
  }

  const prefetchRouteAssets = (route: string | undefined, locale: string) => {
    if (!import.meta.client || !route) return
    const assets = ROUTE_ASSETS[route]?.[locale as Locale]
    if (!assets || assets.length === 0) return
    assets.forEach((url) => {
      if (prefetchedAssets.has(url)) return
      prefetchedAssets.add(url)
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.as = 'image'
      link.href = url
      document.head.appendChild(link)
    })
  }

  return { prefetchAllRoutes, prefetchRouteAssets }
}
```

- [ ] **Step 2: 运行 lint 检查**

```bash
pnpm lint
```

预期：`src/composables/usePagePrefetch.ts` 无报错。

- [ ] **Step 3: Commit**

```bash
git -c core.autocrlf=false add src/composables/usePagePrefetch.ts
git -c core.autocrlf=false commit -m "feat: add usePagePrefetch composable for idle JS and hover image prefetch"
```

---

## Task 2: 在 `app.vue` 中调用空闲预加载

**Files:**

- Modify: `src/app.vue`

### 背景

`app.vue` 是应用根组件，在此调用 `prefetchAllRoutes()` 可确保任何页面加载后都会触发空闲预加载，不仅限于首页。

- [ ] **Step 1: 修改 `app.vue`**

完整替换文件内容：

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { usePagePrefetch } from '@/composables/usePagePrefetch'

const { prefetchAllRoutes } = usePagePrefetch()

onMounted(() => {
  prefetchAllRoutes()
})
</script>

<template>
  <NConfigProvider>
    <NavBar />
    <n-message-provider>
      <main>
        <NuxtPage />
      </main>
    </n-message-provider>
  </NConfigProvider>
</template>
```

- [ ] **Step 2: 运行 lint 检查**

```bash
pnpm lint
```

预期：`src/app.vue` 无报错。

- [ ] **Step 3: Commit**

```bash
git -c core.autocrlf=false add src/app.vue
git -c core.autocrlf=false commit -m "feat: trigger idle route prefetch on app mount"
```

---

## Task 3: 在 `NavbarMenu.vue` 中添加悬停资源预加载

**Files:**

- Modify: `src/components/navbar/NavbarMenu.vue`

### 背景

`NavbarMenu.vue` 已在上一轮改为 `<NuxtLink>`，本次在 NuxtLink 上添加 `@mouseenter` 事件，悬停时调用 `prefetchRouteAssets` 预加载对应页面的图片资源。外部链接（docs）的 `<a>` 无需处理。

- [ ] **Step 1: 修改 `NavbarMenu.vue` script，引入 `usePagePrefetch`**

读取当前文件，在 `<script setup lang="ts">` 中添加 import 和 composable 调用。完整替换 script 内容：

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { usePagePrefetch } from '@/composables/usePagePrefetch'

interface MenuOption {
  label: string
  key: string
  to?: string
  href?: string
  external?: boolean
}

const { t, locale } = useI18n()
const route = useRoute()
const { prefetchRouteAssets } = usePagePrefetch()

const isEn = computed(() => locale.value === 'en')
const currentRouteName = computed(() => route.name)

const menuOptions = computed<MenuOption[]>(() => [
  { label: t('menu.home'), key: 'home', to: '/' },
  { label: t('menu.download'), key: 'download', to: '/download' },
  ...(isEn.value ? [] : [{ label: t('menu.pricing'), key: 'pricing', to: '/pricing' }]),
  {
    label: t('menu.docs'),
    key: 'docs',
    href: `https://docs.costrict.ai${isEn.value ? '/en' : ''}`,
    external: true,
  },
  ...(isEn.value ? [] : [{ label: t('menu.blog'), key: 'blog', to: '/blog' }]),
  { label: t('menu.operation'), key: 'operation', to: '/operation' },
])

const isActive = (key: string) => {
  if (key === 'blog') {
    return currentRouteName.value === 'blog' || currentRouteName.value === 'blog-id'
  }
  if (key === 'home') {
    return currentRouteName.value === 'index'
  }
  return currentRouteName.value === key
}
</script>
```

- [ ] **Step 2: 修改 `NavbarMenu.vue` template，添加 mouseenter 事件**

完整替换 template 内容：

```vue
<template>
  <div class="navbar-menu">
    <template v-for="item in menuOptions" :key="item.key">
      <!-- 外部链接不需要 active 状态 -->
      <a
        v-if="item.external"
        class="menu-item"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ item.label }}
      </a>
      <NuxtLink
        v-else
        class="menu-item"
        :class="{ 'menu-active': isActive(item.key) }"
        :to="item.to!"
        @mouseenter="prefetchRouteAssets(item.to, locale)"
      >
        {{ item.label }}
      </NuxtLink>
    </template>
  </div>
</template>
```

- [ ] **Step 3: 运行 lint 检查**

```bash
pnpm lint
```

预期：`src/components/navbar/NavbarMenu.vue` 无报错。

- [ ] **Step 4: 手动验证**

```bash
pnpm dev
```

打开首页，打开 DevTools → Network 面板，过滤 `Fetch/XHR` 和 `JS`：

1. 页面加载完成后约 200ms，观察是否出现其他页面 JS chunk 的请求（空闲预加载）
2. 将鼠标悬停到「下载」导航项，观察 Network 面板是否出现 `vscode.webp`、`jetbrains.webp` 等图片的 prefetch 请求
3. 点击「下载」跳转，观察图片是否从缓存加载（Status 为 `(prefetch cache)` 或 `304`）

- [ ] **Step 5: Commit**

```bash
git -c core.autocrlf=false add src/components/navbar/NavbarMenu.vue
git -c core.autocrlf=false commit -m "feat: prefetch route assets on navbar item hover"
```

---

## 完成验收

所有 Task 完成后整体验收：

- [ ] 首页加载后浏览器空闲时，Network 面板出现其他页面 JS chunk 预加载请求
- [ ] 悬停「下载」导航项时，`vscode.webp`、`download_step1.webp` 等出现 prefetch 请求
- [ ] 多次悬停同一导航项，不重复发起相同资源的 prefetch 请求
- [ ] 悬停「docs」外部链接时，不触发任何 prefetch
- [ ] `pnpm lint` 无报错
