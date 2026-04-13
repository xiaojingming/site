# 首页性能优化设计文档

**日期**：2026-04-13  
**问题**：首页加载缓慢 + 加载过程中点击导航跳转卡顿  
**方案**：方案 A — 精准外科手术式优化

---

## 背景与问题分析

### 症状

- 首页首次加载白屏时间长（FCP 慢）
- 首页加载过程中点击导航跳转存在明显卡顿

### 根因

| 问题                 | 位置                  | 影响                                                                                                                        |
| -------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 视频自动加载         | `FeatureSection.vue`  | `autoplay` 导致浏览器在 DOM 挂载后立即竞争网络和主线程解码 MP4，StrictMode + CodeReview 共 2 个区块，中英文各 2 个视频      |
| 首屏以下区块同步渲染 | `src/pages/index.vue` | `StrictMode`/`CodeReview`/`MoreTool`/`EnterpriseDeployment`/`LanguageSupport` 全部同步 import，首屏渲染时一次性挂载所有组件 |
| 导航时视频未停止     | `FeatureSection.vue`  | 路由跳转时视频仍在播放/加载，占用主线程，导致导航响应卡顿                                                                   |

---

## 优化目标

- 首屏只渲染可视区域内容（SloganSection）
- 视频滚动到可见区域才开始加载和播放
- 点击导航后立即响应，允许目标页面有短暂加载动画

---

## 设计详述

### 第一节：视频懒加载（`FeatureSection.vue`）

**改动文件**：`src/components/FeatureSection.vue`（唯一改动文件，`StrictMode.vue`/`CodeReview.vue` 无需改动）

**实现逻辑**：

1. 移除 `<video>` 的 `autoplay` 属性和静态 `src` 绑定
2. 通过 `ref` 获取 video DOM 元素
3. 用 `IntersectionObserver` 监听视频容器（threshold: 0.1）
4. **进入视口时**：动态设置 `videoEl.src = props.video`，调用 `videoEl.load()` 后 `videoEl.play()`
5. **离开视口时**：调用 `videoEl.pause()`，保留 src（避免重新加载）
6. **`onBeforeUnmount`（路由离开）时**：`videoEl.pause()`，清空 `src`，`videoEl.load()` 释放资源，断开 observer

**状态流转**：

```
初始：src="" poster=显示 → 进入视口 → src=props.video play() → 离开视口 → pause() → 再进入 → play() → 路由离开 → pause() src="" 释放
```

**poster 行为**：视频未加载时始终显示 poster 图（已有 webp poster），用户体验无损。

---

### 第二节：首屏以下区块懒渲染（`index.vue`）

**改动文件**：`src/pages/index.vue`

**实现逻辑**：

1. `SloganSection` 保持同步 import（首屏必须，SEO 关键内容）
2. 其余 5 个组件改为 `defineAsyncComponent` 懒加载：
   - `StrictMode`
   - `CodeReview`
   - `MoreTool`
   - `EnterpriseDeployment`
   - `LanguageSupport`
3. 用 `<ClientOnly>` 包裹所有懒加载区块，避免 SSR hydration mismatch
4. `<ClientOnly>` 的 `fallback` slot 提供与实际区块高度近似的透明占位 `<div>`，防止 CLS（布局偏移）
5. 不显示 loading spinner，保持视觉简洁

**SSR 策略**：

- SSR 渲染：`SloganSection`（SEO 有价值）
- SSR 跳过：其余 5 个区块（功能展示图片/视频，无 SEO 关键内容）

**布局占位高度参考**（防 CLS，为估算值，实现时以浏览器实际渲染高度为准，可适当放大以避免跳动）：

- `StrictMode` / `CodeReview`：约 `800px`
- `MoreTool`：约 `600px`
- `EnterpriseDeployment`：约 `700px`
- `LanguageSupport`：约 `400px`

---

### 第三节：导航响应优化（`NavbarMenu.vue`）

**改动文件**：`src/components/navbar/NavbarMenu.vue`

**现状**：导航链接使用 `<a href="#">` + `event.preventDefault()` + `navigateTo()`，外部链接（docs）使用真实 href。没有利用 `NuxtLink` 的自动 prefetch 能力。

**实现逻辑**：

1. 内部路由链接（home/download/pricing/blog/operation）改为 `<NuxtLink :to="...">`，获得自动 prefetch
2. 外部链接（docs）保持 `<a href="..." target="_blank">` 不变
3. 移除 `handleClick` 中对内部路由的手动 `navigateTo` 逻辑，由 `NuxtLink` 原生处理
4. active 状态检测改为 `NuxtLink` 的 `exactActiveClass` 属性，或保留现有 `isActive` computed（两者均可）

**与第一节的协同**：路由跳转触发 `FeatureSection` 的 `onBeforeUnmount`，视频立即 `pause()` 并释放 src，主线程在路由切换前已释放，导航响应流畅。

---

## 改动文件汇总

| 文件                                   | 改动内容                                                                                            |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `src/components/FeatureSection.vue`    | 视频懒加载：移除 autoplay/src，用 IntersectionObserver 控制加载/播放/暂停，onBeforeUnmount 释放资源 |
| `src/pages/index.vue`                  | 首屏以下 5 个子组件改为 `defineAsyncComponent` + `<ClientOnly>` 懒加载，加占位 div 防 CLS           |
| `src/components/navbar/NavbarMenu.vue` | 内部路由链接改为 `<NuxtLink>`，利用自动 prefetch                                                    |

## 不改动的文件

- `StrictMode.vue`、`CodeReview.vue`：视频 src/poster 作为 props 传入，懒加载逻辑在 `FeatureSection.vue` 统一处理
- `nuxt.config.ts`：无需新增模块或配置
- `NavBar.vue`：导航逻辑在 `NavbarMenu.vue` 层处理
