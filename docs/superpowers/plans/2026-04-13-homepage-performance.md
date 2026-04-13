# 首页性能优化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 消除首页加载缓慢和导航跳转卡顿，通过视频懒加载、首屏以下区块懒渲染、导航 prefetch 三项精准改动实现。

**Architecture:** 在 `FeatureSection.vue` 中用 `IntersectionObserver` 控制视频生命周期；在 `index.vue` 中用 `defineAsyncComponent` + `<ClientOnly>` 延迟挂载非首屏区块；在 `NavbarMenu.vue` 中将内部路由链接改为 `<NuxtLink>` 获得自动 prefetch。

**Tech Stack:** Nuxt 3, Vue 3 `<script setup>`, `defineAsyncComponent`, `<ClientOnly>`, `IntersectionObserver` (浏览器原生), `<NuxtLink>`

---

## 文件改动清单

| 文件                                   | 操作                         |
| -------------------------------------- | ---------------------------- |
| `src/components/FeatureSection.vue`    | Modify — 视频懒加载逻辑      |
| `src/pages/index.vue`                  | Modify — 子组件懒渲染        |
| `src/components/navbar/NavbarMenu.vue` | Modify — 内部路由改 NuxtLink |

---

## Task 1: 视频懒加载（`FeatureSection.vue`）

**Files:**

- Modify: `src/components/FeatureSection.vue`

### 背景

当前 `<video>` 有 `autoplay` 和静态 `:src="video"` 绑定，浏览器挂载后立即竞争网络解码 MP4。目标：初始不加载视频，滚动进入视口才加载并播放，路由离开时释放资源。

- [ ] **Step 1: 修改 `FeatureSection.vue` 的 template**

将 `<video>` 的 `:src` 改为 `ref` 控制，移除 `autoplay`，添加 `ref="videoRef"`：

```vue
<video
  ref="videoRef"
  class="rounded-[20px] w-full"
  preload="none"
  loop
  muted
  playsinline
  style="object-fit: cover"
  :poster="poster"
>
  Your browser does not support the video tag.
</video>
```

- [ ] **Step 2: 修改 `FeatureSection.vue` 的 script，添加懒加载逻辑**

完整替换 `<script setup lang="ts">` 内容：

```vue
<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import ItemCard from '@/pages/home/ItemCard.vue'

interface FeatureItem {
  title: string
  content: string
  img: string
}

interface Props {
  zhTitle: string
  enTitle: string
  altText: string
  subTitle: string
  video: string
  poster: string
  featureList: FeatureItem[]
  marginTop?: string
}

const props = withDefaults(defineProps<Props>(), {
  marginTop: 'mt-0',
})

const { locale } = useI18n()

const isZh = computed(() => locale.value === 'zh')
const marginTopClass = computed(() => props.marginTop)

const videoRef = ref<HTMLVideoElement | null>(null)
let observer: IntersectionObserver | null = null

const setupObserver = () => {
  if (!videoRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = videoRef.value
        if (!video) return
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = props.video
            video.load()
          }
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      })
    },
    { threshold: 0.1 },
  )

  observer.observe(videoRef.value)
}

onMounted(() => {
  setupObserver()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
  const video = videoRef.value
  if (video) {
    video.pause()
    video.src = ''
    video.load()
  }
})
</script>
```

- [ ] **Step 3: 手动验证**

运行开发服务器：

```bash
pnpm dev
```

打开首页，打开浏览器 Network 面板，过滤 `mp4`。预期：**页面加载时不出现 MP4 请求**，滚动到 StrictMode 区块时才触发 MP4 网络请求。

- [ ] **Step 4: 验证路由离开时视频释放**

在首页滚动使视频播放，点击导航跳转到「下载」页，观察 Network 面板 MP4 请求是否中断，页面切换是否流畅无卡顿。

- [ ] **Step 5: Commit**

```bash
git -c core.autocrlf=false add src/components/FeatureSection.vue
git -c core.autocrlf=false commit -m "perf: lazy load videos in FeatureSection via IntersectionObserver"
```

---

## Task 2: 首屏以下区块懒渲染（`index.vue`）

**Files:**

- Modify: `src/pages/index.vue`

### 背景

`index.vue` 同步 import 了 5 个子区块，首屏 hydration 时一次性挂载所有组件。目标：`SloganSection` 保持同步，其余 5 个改为 `defineAsyncComponent` + `<ClientOnly>`，用占位 `<div>` 防止 CLS。

- [ ] **Step 1: 修改 `index.vue` 的 script，改为异步组件**

完整替换 `<script lang="ts" setup>` 内容（`useHead` 和 `defineOptions` 保持不变）：

```vue
<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import SloganSection from './home/SloganSection.vue'
import StructuredData from '@/components/StructuredData.vue'
import leftPortImg from '@/assets/home/left_port.webp'
import rightPortImg from '@/assets/home/right_port.webp'

const StrictMode = defineAsyncComponent(() => import('./home/StrictMode.vue'))
const CodeReview = defineAsyncComponent(() => import('./home/CodeReview.vue'))
const MoreTool = defineAsyncComponent(() => import('./home/MoreTool.vue'))
const EnterpriseDeployment = defineAsyncComponent(() => import('./home/EnterpriseDeployment.vue'))
const LanguageSupport = defineAsyncComponent(() => import('./home/LanguageSupport.vue'))
const FooterCopyright = defineAsyncComponent(() => import('./home/FooterCopyright.vue'))

defineOptions({
  name: 'HomeIndex',
})

useHead({
  title: 'CoStrict - 企业级AI编程工具 | 开源免费 | 私有化部署',
  meta: [
    {
      name: 'description',
      content:
        'CoStrict 是一款免费开源的AI辅助编程工具，支持企业私有化部署，提升团队开发效率，是企业严肃编程的最佳选择。',
    },
    { property: 'og:title', content: 'CoStrict - 企业级AI编程工具 | 开源免费 | 私有化部署' },
    {
      property: 'og:description',
      content:
        'CoStrict 是一款免费开源的AI辅助编程工具，支持企业私有化部署，提升团队开发效率，是企业严肃编程的最佳选择。',
    },
    { property: 'og:url', content: 'https://costrict.ai/' },
    { property: 'og:image', content: 'https://costrict.ai/favicon.png' },
    { name: 'twitter:title', content: 'CoStrict - 企业级AI编程工具 | 开源免费 | 私有化部署' },
    {
      name: 'twitter:description',
      content: 'CoStrict 是一款免费开源的AI辅助编程工具，支持企业私有化部署，提升团队开发效率。',
    },
    { name: 'twitter:image', content: 'https://costrict.ai/favicon.png' },
  ],
  link: [{ rel: 'canonical', href: 'https://costrict.ai/' }],
})
</script>
```

- [ ] **Step 2: 修改 `index.vue` 的 template，用 `<ClientOnly>` 包裹懒加载区块**

完整替换 `<template>` 内容：

```vue
<template>
  <div class="w-full bg-black overflow-x-hidden">
    <SloganSection />
    <ClientOnly>
      <div class="responsive-container mx-auto">
        <StrictMode />
        <CodeReview />
        <MoreTool />
        <EnterpriseDeployment />
        <LanguageSupport />
      </div>
      <FooterCopyright />
      <template #fallback>
        <div style="min-height: 3500px"></div>
      </template>
    </ClientOnly>
    <StructuredData
      schemaType="Organization"
      :data="{
        name: 'CoStrict',
        url: 'https://costrict.ai/',
        logo: 'https://costrict.ai/favicon.png',
        description: 'CoStrict 是一款免费开源的AI辅助编程工具，支持企业私有化部署',
        sameAs: ['https://github.com/zgsm-ai/costrict'],
      }"
    />
    <StructuredData
      schemaType="SoftwareApplication"
      :data="{
        name: 'CoStrict',
        operatingSystem: 'Windows, macOS, Linux',
        applicationCategory: 'DeveloperApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CNY',
        },
      }"
    />
    <img :src="leftPortImg" class="absolute left-0 top-[1538px]" alt="left port" />
    <img :src="rightPortImg" class="absolute right-0 top-[1347px]" alt="right port" />
    <div class="absolute left-0 top-0 h-80 sm:h-112 md:h-120 lg:h-124 w-full top-bg"></div>
  </div>
</template>
```

> 注意：`fallback` 的 `min-height: 3500px` 是所有区块高度之和的估算值，防止 SSR 到客户端激活期间页面高度塌陷。实际部署后可根据真实页面高度调整。

- [ ] **Step 3: 手动验证首屏加载**

```bash
pnpm dev
```

打开首页，观察：

1. 首屏（SloganSection）立即渲染，无白屏
2. 滚动区域以下内容在客户端激活后逐步出现
3. 页面不出现明显的布局跳动（CLS）

- [ ] **Step 4: Commit**

```bash
git -c core.autocrlf=false add src/pages/index.vue
git -c core.autocrlf=false commit -m "perf: lazy render below-fold sections with defineAsyncComponent and ClientOnly"
```

---

## Task 3: 导航链接改为 `<NuxtLink>`（`NavbarMenu.vue`）

**Files:**

- Modify: `src/components/navbar/NavbarMenu.vue`

### 背景

当前导航使用 `<a href="#">` + `navigateTo()`，没有 prefetch。改为 `<NuxtLink>` 后，鼠标悬停时 Nuxt 自动 prefetch 目标页面 JS chunk，点击响应更快。外部链接（docs）保持 `<a>` 不变。

- [ ] **Step 1: 修改 `NavbarMenu.vue` template，内部路由改为 `<NuxtLink>`**

完整替换 `<template>` 内容：

```vue
<template>
  <div class="navbar-menu">
    <template v-for="item in menuOptions" :key="item.key">
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
        :to="item.href"
      >
        {{ item.label }}
      </NuxtLink>
    </template>
  </div>
</template>
```

- [ ] **Step 2: 修改 `NavbarMenu.vue` script，更新 `menuOptions` 数据结构**

完整替换 `<script setup lang="ts">` 内容：

```vue
<script setup lang="ts">
import { computed } from 'vue'

interface MenuOption {
  label: string
  key: string
  href: string
  external?: boolean
}

const { t, locale } = useI18n()
const route = useRoute()

const isEn = computed(() => locale.value === 'en')
const currentRouteName = computed(() => route.name)

const menuOptions = computed<MenuOption[]>(() => [
  { label: t('menu.home'), key: 'home', href: '/' },
  { label: t('menu.download'), key: 'download', href: '/download' },
  ...(isEn.value ? [] : [{ label: t('menu.pricing'), key: 'pricing', href: '/pricing' }]),
  {
    label: t('menu.docs'),
    key: 'docs',
    href: `https://docs.costrict.ai${isEn.value ? '/en' : ''}`,
    external: true,
  },
  ...(isEn.value ? [] : [{ label: t('menu.blog'), key: 'blog', href: '/blog' }]),
  { label: t('menu.operation'), key: 'operation', href: '/operation' },
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

- [ ] **Step 3: 手动验证导航**

```bash
pnpm dev
```

验证以下行为：

1. 鼠标悬停导航项时，Network 面板出现目标页面的 JS prefetch 请求
2. 点击「下载」「定价」等内部路由，页面立即响应跳转
3. 点击「docs」正确在新标签页打开外部链接
4. 当前页面对应导航项有 `menu-active` 高亮

- [ ] **Step 4: 运行 lint 检查**

```bash
pnpm lint
```

预期：无 ESLint 报错。

- [ ] **Step 5: Commit**

```bash
git -c core.autocrlf=false add src/components/navbar/NavbarMenu.vue
git -c core.autocrlf=false commit -m "perf: replace manual navigateTo with NuxtLink for prefetch in NavbarMenu"
```

---

## 完成验收

所有 Task 完成后，做整体验收：

- [ ] 首页首次加载：Network 面板无 MP4 请求，首屏白屏时间明显缩短
- [ ] 滚动到 StrictMode 区块：MP4 开始加载并自动播放
- [ ] 首页加载中点击导航：立即跳转，无卡顿
- [ ] 导航高亮状态正确
- [ ] `pnpm lint` 无报错
