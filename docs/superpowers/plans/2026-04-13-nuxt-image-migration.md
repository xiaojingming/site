# @nuxt/image 图片资源迁移实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将项目中所有 `.webp`/`.png` 的 `<img>` 标签迁移到 `@nuxt/image` 的 `<NuxtImg>` 组件，实现自动格式转换、lazy loading 和响应式图片优化。

**Architecture:** 安装 `@nuxt/image` 并配置 `ipx` provider（SSR 实时转换）。将静态 `import` 图片路径改为字符串路径，`<img>` 标签替换为 `<NuxtImg>`。CSS `background-image`、SVG、video poster、blog 动态图片不迁移。

**Tech Stack:** Nuxt 3, @nuxt/image, ipx, Vue 3, TypeScript

---

## 文件变更总览

| 文件                                                | 变更类型                                         |
| --------------------------------------------------- | ------------------------------------------------ |
| `nuxt.config.ts`                                    | 修改：添加模块和配置                             |
| `src/components/navbar/NavbarLogo.vue`              | 修改：`<img>` → `<NuxtImg>`                      |
| `src/components/FeatureSection.vue`                 | 修改：`<img>` → `<NuxtImg>`                      |
| `src/pages/home/ItemCard.vue`                       | 修改：`<img>` → `<NuxtImg>`                      |
| `src/pages/home/CodeReview.vue`                     | 修改：import → 路径字符串                        |
| `src/pages/home/StrictMode.vue`                     | 修改：import → 路径字符串                        |
| `src/pages/home/MoreTool.vue`                       | 修改：import → 路径字符串                        |
| `src/pages/home/LanguageSupport.vue`                | 修改：import → 路径字符串，`<img>` → `<NuxtImg>` |
| `src/pages/home/EnterpriseDeployment.vue`           | 修改：import → 路径字符串，`<img>` → `<NuxtImg>` |
| `src/pages/home/FooterCopyright.vue`                | 修改：`<img>` → `<NuxtImg>`                      |
| `src/pages/index.vue`                               | 修改：import → 路径字符串，`<img>` → `<NuxtImg>` |
| `src/pages/pricing/index.vue`                       | 修改：`<img>` → `<NuxtImg>`                      |
| `src/pages/download/useDownloadData.ts`             | 修改：16 个 import → 路径字符串                  |
| `src/pages/download/components/TabList.vue`         | 修改：`<img>` → `<NuxtImg>`                      |
| `src/pages/download/components/DownloadContent.vue` | 修改：`<img>` → `<NuxtImg>`                      |
| `src/pages/download/components/StepTimeline.vue`    | 修改：`<img>` → `<NuxtImg>`                      |
| `src/pages/blog/blogData.ts`                        | 修改：coverImageMap import → 路径字符串          |
| `src/pages/blog/components/BlogCard.vue`            | 修改：`<img>` → `<NuxtImg>`                      |
| `src/pages/blog/[id].vue`                           | 修改：related articles `<img>` → `<NuxtImg>`     |

---

## Task 1: 安装 @nuxt/image 并配置模块

**Files:**

- Modify: `nuxt.config.ts`

- [ ] **Step 1: 安装依赖**

```bash
pnpm add @nuxt/image
```

- [ ] **Step 2: 修改 nuxt.config.ts，添加模块和配置**

在 `nuxt.config.ts` 中：

```ts
// 将
modules: ['@nuxtjs/i18n'],

// 改为
modules: ['@nuxtjs/i18n', '@nuxt/image'],
```

在 `defineNuxtConfig({` 内（与 `modules` 同级）添加：

```ts
image: {
  provider: 'ipx',
  quality: 85,
  format: ['webp', 'avif'],
},
```

- [ ] **Step 3: 验证构建无报错**

```bash
pnpm build
```

预期：构建成功，无 `@nuxt/image` 相关报错。

- [ ] **Step 4: 提交**

```bash
git -c core.autocrlf=false add nuxt.config.ts pnpm-lock.yaml package.json
git -c core.autocrlf=false commit -m "feat: install and configure @nuxt/image with ipx provider"
```

---

## Task 2: 迁移 NavbarLogo（首屏关键图片）

**Files:**

- Modify: `src/components/navbar/NavbarLogo.vue`

- [ ] **Step 1: 替换 `<img>` 为 `<NuxtImg>`，使用 `loading="eager"`（首屏关键图片）**

将：

```html
<img class="logo-img" src="@/assets/logo.webp" alt="CoStrict Logo" />
```

改为：

```html
<NuxtImg class="logo-img" src="~/assets/logo.webp" alt="CoStrict Logo" loading="eager" />
```

- [ ] **Step 2: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 3: 提交**

```bash
git -c core.autocrlf=false add src/components/navbar/NavbarLogo.vue
git -c core.autocrlf=false commit -m "feat: migrate NavbarLogo img to NuxtImg"
```

---

## Task 3: 迁移 FeatureSection 标题图

**Files:**

- Modify: `src/components/FeatureSection.vue`

- [ ] **Step 1: 替换两个标题 `<img>` 为 `<NuxtImg>`**

将：

```html
<img v-if="isZh" :src="zhTitle" :alt="altText" /> <img v-else :src="enTitle" :alt="altText" />
```

改为：

```html
<NuxtImg v-if="isZh" :src="zhTitle" :alt="altText" loading="lazy" />
<NuxtImg v-else :src="enTitle" :alt="altText" loading="lazy" />
```

- [ ] **Step 2: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 3: 提交**

```bash
git -c core.autocrlf=false add src/components/FeatureSection.vue
git -c core.autocrlf=false commit -m "feat: migrate FeatureSection title img to NuxtImg"
```

---

## Task 4: 迁移 ItemCard

**Files:**

- Modify: `src/pages/home/ItemCard.vue`

- [ ] **Step 1: 替换 `<img>` 为 `<NuxtImg>`**

将：

```html
<img :src="img" alt="card img" />
```

改为：

```html
<NuxtImg :src="img" alt="card img" loading="lazy" />
```

- [ ] **Step 2: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 3: 提交**

```bash
git -c core.autocrlf=false add src/pages/home/ItemCard.vue
git -c core.autocrlf=false commit -m "feat: migrate ItemCard img to NuxtImg"
```

---

## Task 5: 迁移 CodeReview（import → 路径字符串）

**Files:**

- Modify: `src/pages/home/CodeReview.vue`

- [ ] **Step 1: 删除 webp 图片的静态 import，改为路径字符串**

删除以下 import 行：

```ts
import ZhCodeReviewFeature1 from '@/assets/codeReview/zh/codereview_feature01.webp'
import ZhCodeReviewFeature2 from '@/assets/codeReview/zh/codereview_feature02.webp'
import ZhCodeReviewFeature3 from '@/assets/codeReview/zh/codereview_feature03.webp'
import ZhCodeReviewFeature4 from '@/assets/codeReview/zh/codereview_feature04.webp'
import EnCodeReviewFeature1 from '@/assets/codeReview/en/codereview_feature01.webp'
import EnCodeReviewFeature2 from '@/assets/codeReview/en/codereview_feature02.webp'
import EnCodeReviewFeature3 from '@/assets/codeReview/en/codereview_feature03.webp'
import EnCodeReviewFeature4 from '@/assets/codeReview/en/codereview_feature04.webp'
import EnCodeReviewTitle from '@/assets/codeReview/en/codereview_title.webp'
import ZhCodeReviewTitle from '@/assets/codeReview/zh/codereview_title.webp'
```

将 `resources` 和 `featureImages` 改为字符串路径：

```ts
const resources = {
  zh: {
    title: '/assets/codeReview/zh/codereview_title.webp',
    video: CodeReviewZhVideo,
  },
  en: {
    title: '/assets/codeReview/en/codereview_title.webp',
    video: CodeReviewEnVideo,
  },
}

const featureImages = {
  zh: [
    '/assets/codeReview/zh/codereview_feature01.webp',
    '/assets/codeReview/zh/codereview_feature02.webp',
    '/assets/codeReview/zh/codereview_feature03.webp',
    '/assets/codeReview/zh/codereview_feature04.webp',
  ],
  en: [
    '/assets/codeReview/en/codereview_feature01.webp',
    '/assets/codeReview/en/codereview_feature02.webp',
    '/assets/codeReview/en/codereview_feature03.webp',
    '/assets/codeReview/en/codereview_feature04.webp',
  ],
}
```

保留视频 import（`CodeReviewZhVideo`、`CodeReviewEnVideo`）和 poster import（`CodeReviewPoster`）不变。

- [ ] **Step 2: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 3: 提交**

```bash
git -c core.autocrlf=false add src/pages/home/CodeReview.vue
git -c core.autocrlf=false commit -m "feat: migrate CodeReview image imports to path strings"
```

---

## Task 6: 迁移 StrictMode（import → 路径字符串）

**Files:**

- Modify: `src/pages/home/StrictMode.vue`

- [ ] **Step 1: 删除 webp 图片的静态 import，改为路径字符串**

删除以下 import 行：

```ts
import StrictModeZhPoster from '@/assets/strictMode/strict_mode_zh_buffer.webp'
import StrictModeEnPoster from '@/assets/strictMode/strict_mode_en_buffer.webp'
import ZhStrictModeFeature1 from '@/assets/strictMode/zh/strictMode_feature01.webp'
import ZhStrictModeFeature2 from '@/assets/strictMode/zh/strictMode_feature02.webp'
import ZhStrictModeFeature3 from '@/assets/strictMode/zh/strictMode_feature03.webp'
import ZhStrictModeFeature4 from '@/assets/strictMode/zh/strictMode_feature04.webp'
import EnStrictModeFeature1 from '@/assets/strictMode/en/strictMode_feature01.webp'
import EnStrictModeFeature2 from '@/assets/strictMode/en/strictMode_feature02.webp'
import EnStrictModeFeature3 from '@/assets/strictMode/en/strictMode_feature03.webp'
import EnStrictModeFeature4 from '@/assets/strictMode/en/strictMode_feature04.webp'
import EnStrictModeTitle from '@/assets/strictMode/en/strictMode_title.webp'
import ZhStrictModeTitle from '@/assets/strictMode/zh/strictMode_title.webp'
```

将 `resources` 和 `featureImages` 改为字符串路径：

```ts
const resources = {
  zh: {
    title: '/assets/strictMode/zh/strictMode_title.webp',
    video: StrictModeZhVideo,
    poster: '/assets/strictMode/strict_mode_zh_buffer.webp',
  },
  en: {
    title: '/assets/strictMode/en/strictMode_title.webp',
    video: StrictModeEnVideo,
    poster: '/assets/strictMode/strict_mode_en_buffer.webp',
  },
}

const featureImages = {
  zh: [
    '/assets/strictMode/zh/strictMode_feature01.webp',
    '/assets/strictMode/zh/strictMode_feature02.webp',
    '/assets/strictMode/zh/strictMode_feature03.webp',
    '/assets/strictMode/zh/strictMode_feature04.webp',
  ],
  en: [
    '/assets/strictMode/en/strictMode_feature01.webp',
    '/assets/strictMode/en/strictMode_feature02.webp',
    '/assets/strictMode/en/strictMode_feature03.webp',
    '/assets/strictMode/en/strictMode_feature04.webp',
  ],
}
```

保留视频 import（`StrictModeZhVideo`、`StrictModeEnVideo`）不变。

注意：`FeatureSection` 的 `:poster` prop 现在接收字符串路径（`resources[locale].poster`），`FeatureSection.vue` 中 poster 传给 `<video poster>` 属性，字符串路径在此处可正常工作。

- [ ] **Step 2: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 3: 提交**

```bash
git -c core.autocrlf=false add src/pages/home/StrictMode.vue
git -c core.autocrlf=false commit -m "feat: migrate StrictMode image imports to path strings"
```

---

## Task 7: 迁移 MoreTool（import → 路径字符串）

**Files:**

- Modify: `src/pages/home/MoreTool.vue`

- [ ] **Step 1: 删除所有 webp import，改为路径字符串**

删除以下 import 行：

```ts
import ZhToolFeature1 from '@/assets/tool/zh/tool_feature01.webp'
import ZhToolFeature2 from '@/assets/tool/zh/tool_feature02.webp'
import ZhToolFeature3 from '@/assets/tool/zh/tool_feature03.webp'
import ZhToolFeature4 from '@/assets/tool/zh/tool_feature04.webp'
import ZhToolFeature5 from '@/assets/tool/zh/tool_feature05.webp'
import ZhToolFeature6 from '@/assets/tool/zh/tool_feature06.webp'
import EnToolFeature1 from '@/assets/tool/en/tool_feature01.webp'
import EnToolFeature2 from '@/assets/tool/en/tool_feature02.webp'
import EnToolFeature3 from '@/assets/tool/en/tool_feature03.webp'
import EnToolFeature4 from '@/assets/tool/en/tool_feature04.webp'
import EnToolFeature5 from '@/assets/tool/en/tool_feature05.webp'
import EnToolFeature6 from '@/assets/tool/en/tool_feature06.webp'
```

将 `featureImages` 改为字符串路径（注意保持原有顺序：5、6、1、2、3、4）：

```ts
const featureImages = {
  zh: [
    '/assets/tool/zh/tool_feature05.webp',
    '/assets/tool/zh/tool_feature06.webp',
    '/assets/tool/zh/tool_feature01.webp',
    '/assets/tool/zh/tool_feature02.webp',
    '/assets/tool/zh/tool_feature03.webp',
    '/assets/tool/zh/tool_feature04.webp',
  ],
  en: [
    '/assets/tool/en/tool_feature05.webp',
    '/assets/tool/en/tool_feature06.webp',
    '/assets/tool/en/tool_feature01.webp',
    '/assets/tool/en/tool_feature02.webp',
    '/assets/tool/en/tool_feature03.webp',
    '/assets/tool/en/tool_feature04.webp',
  ],
}
```

- [ ] **Step 2: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 3: 提交**

```bash
git -c core.autocrlf=false add src/pages/home/MoreTool.vue
git -c core.autocrlf=false commit -m "feat: migrate MoreTool image imports to path strings"
```

---

## Task 8: 迁移 LanguageSupport

**Files:**

- Modify: `src/pages/home/LanguageSupport.vue`

- [ ] **Step 1: 删除所有 webp import，改为路径字符串，`<img>` → `<NuxtImg>`**

删除以下 import 行：

```ts
import pyIcon from '@/assets/supportLang/py.webp'
import goIcon from '@/assets/supportLang/go.webp'
import javaIcon from '@/assets/supportLang/java.webp'
import jsIcon from '@/assets/supportLang/js.webp'
import tsIcon from '@/assets/supportLang/ts.webp'
import cIcon from '@/assets/supportLang/c.webp'
import vscodeIcon from '@/assets/supportLang/vscode.webp'
import jetbrainsIcon from '@/assets/supportLang/jetbrains.webp'
```

将 `programLanguage` 中的图标改为路径字符串：

```ts
const programLanguage = computed(() => [
  { type: 'Python', icon: '/assets/supportLang/py.webp' },
  { type: 'Go', icon: '/assets/supportLang/go.webp' },
  { type: 'Java', icon: '/assets/supportLang/java.webp' },
  { type: 'JavaScript', icon: '/assets/supportLang/js.webp' },
  { type: 'TypeScript', icon: '/assets/supportLang/ts.webp' },
  { type: 'C/C++', icon: '/assets/supportLang/c.webp' },
  { type: `... ${t('home.ideSupport.allLanguages')}` },
])
```

在 `<script setup>` 中添加两个常量替代原有 import 变量：

```ts
const vscodeIcon = '/assets/supportLang/vscode.webp'
const jetbrainsIcon = '/assets/supportLang/jetbrains.webp'
```

将模板中的三处 `<img>` 替换为 `<NuxtImg>`：

```html
<!-- 语言图标 -->
<NuxtImg v-if="item.icon" :src="item.icon" class="w-6 h-6 mr-2" :alt="item.type" loading="lazy" />

<!-- vscode -->
<NuxtImg :src="vscodeIcon" alt="vscode" loading="lazy" />

<!-- jetbrains -->
<NuxtImg :src="jetbrainsIcon" alt="jetbrains" loading="lazy" />
```

- [ ] **Step 2: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 3: 提交**

```bash
git -c core.autocrlf=false add src/pages/home/LanguageSupport.vue
git -c core.autocrlf=false commit -m "feat: migrate LanguageSupport images to NuxtImg"
```

---

## Task 9: 迁移 EnterpriseDeployment

**Files:**

- Modify: `src/pages/home/EnterpriseDeployment.vue`

- [ ] **Step 1: 删除 webp import，改为路径字符串，`<img>` → `<NuxtImg>`**

删除以下 import 行：

```ts
import enterpriseFeature1 from '@/assets/enterprise/enterprise_feature01.webp'
import enterpriseFeature2 from '@/assets/enterprise/enterprise_feature02.webp'
import enterpriseFeature3 from '@/assets/enterprise/enterprise_feature03.webp'
import enterpriseFeature4 from '@/assets/enterprise/enterprise_feature04.webp'
```

将 `featureList` computed 中的 img 改为路径字符串：

```ts
const featureList = computed(() => [
  {
    content: t('home.enterprise.feature01Content'),
    title: t('home.enterprise.feature01Title'),
    img: '/assets/enterprise/enterprise_feature01.webp',
  },
  {
    content: t('home.enterprise.feature02Content'),
    title: t('home.enterprise.feature02Title'),
    img: '/assets/enterprise/enterprise_feature02.webp',
  },
  {
    content: t('home.enterprise.feature03Content'),
    title: t('home.enterprise.feature03Title'),
    img: '/assets/enterprise/enterprise_feature03.webp',
  },
  {
    content: t('home.enterprise.feature04Content'),
    title: t('home.enterprise.feature04Title'),
    img: '/assets/enterprise/enterprise_feature04.webp',
  },
])
```

将模板中的 `<img>` 替换为 `<NuxtImg>`：

```html
<NuxtImg :src="item.img" class="w-17.5 h-17.5" alt="CoStrict Feature" loading="lazy" />
```

- [ ] **Step 2: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 3: 提交**

```bash
git -c core.autocrlf=false add src/pages/home/EnterpriseDeployment.vue
git -c core.autocrlf=false commit -m "feat: migrate EnterpriseDeployment images to NuxtImg"
```

---

## Task 10: 迁移 FooterCopyright（qrcode 图片）

**Files:**

- Modify: `src/pages/home/FooterCopyright.vue`

- [ ] **Step 1: 替换两处 qrcode `<img>` 为 `<NuxtImg>`**

将：

```html
<img
  class="qrcode-img"
  src="../../assets/qrcode/official_account.webp"
  alt="CoStrict Official Account"
/>
```

改为：

```html
<NuxtImg
  class="qrcode-img"
  src="~/assets/qrcode/official_account.webp"
  alt="CoStrict Official Account"
  loading="lazy"
/>
```

将：

```html
<img
  class="qrcode-img"
  src="../../assets/qrcode/communication_group.webp"
  alt="CoStrict Communication Group"
/>
```

改为：

```html
<NuxtImg
  class="qrcode-img"
  src="~/assets/qrcode/communication_group.webp"
  alt="CoStrict Communication Group"
  loading="lazy"
/>
```

- [ ] **Step 2: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 3: 提交**

```bash
git -c core.autocrlf=false add src/pages/home/FooterCopyright.vue
git -c core.autocrlf=false commit -m "feat: migrate FooterCopyright qrcode imgs to NuxtImg"
```

---

## Task 11: 迁移首页 index.vue（port 装饰图）

**Files:**

- Modify: `src/pages/index.vue`

- [ ] **Step 1: 删除 webp import，改为路径字符串，`<img>` → `<NuxtImg>`**

删除以下 import 行：

```ts
import leftPortImg from '@/assets/home/left_port.webp'
import rightPortImg from '@/assets/home/right_port.webp'
```

在 `<script setup>` 中添加常量：

```ts
const leftPortImg = '/assets/home/left_port.webp'
const rightPortImg = '/assets/home/right_port.webp'
```

将模板中的两处 `<img>` 替换为 `<NuxtImg>`（装饰图，使用 `loading="eager"` 因为位置在首屏附近）：

```html
<NuxtImg :src="leftPortImg" class="absolute left-0 top-[1538px]" alt="left port" loading="eager" />
<NuxtImg
  :src="rightPortImg"
  class="absolute right-0 top-[1347px]"
  alt="right port"
  loading="eager"
/>
```

- [ ] **Step 2: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 3: 提交**

```bash
git -c core.autocrlf=false add src/pages/index.vue
git -c core.autocrlf=false commit -m "feat: migrate index.vue port images to NuxtImg"
```

---

## Task 12: 迁移 pricing/index.vue

**Files:**

- Modify: `src/pages/pricing/index.vue`

- [ ] **Step 1: 替换 5 个背景装饰图和 label-bg 的 `<img>` 为 `<NuxtImg>`**

将 5 个背景装饰图（`bg_1.png` ~ `bg_5.png`）：

```html
<img
  src="../../assets/price/bg_1.png"
  alt="background"
  class="absolute left-[-10px] top-85 w-55 h-58 priceing-page__bg"
/>
```

改为（每个都加 `aria-hidden="true"` 和 `loading="lazy"`）：

```html
<NuxtImg
  src="~/assets/price/bg_1.png"
  alt=""
  aria-hidden="true"
  class="absolute left-[-10px] top-85 w-55 h-58 priceing-page__bg"
  loading="lazy"
/>
```

其余 4 个背景图同理，只改 `src` 路径（`bg_2.png` ~ `bg_5.png`）和对应的 class/位置属性保持不变。

将 label-bg：

```html
<img src="../../assets/label-bg.webp" alt="label" />
```

改为：

```html
<NuxtImg src="~/assets/label-bg.webp" alt="label" loading="lazy" />
```

将 `y.svg` 和 `x.svg` 保持不变（SVG 不迁移）：

```html
<!-- 保持不变 -->
<img src="../../assets/y.svg" ... />
<img v-else src="../../assets/x.svg" ... />
```

- [ ] **Step 2: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 3: 提交**

```bash
git -c core.autocrlf=false add src/pages/pricing/index.vue
git -c core.autocrlf=false commit -m "feat: migrate pricing page images to NuxtImg"
```

---

## Task 13: 迁移 download/useDownloadData.ts

**Files:**

- Modify: `src/pages/download/useDownloadData.ts`

- [ ] **Step 1: 删除所有 webp import，改为路径字符串常量**

删除以下所有 import 行：

```ts
import vscodeImg from '@/assets/download/vscode.webp'
import jetbrainsImg from '@/assets/download/jetbrains.webp'
import vscodeDisableImg from '@/assets/download/vscode_disable.webp'
import jetbrainsDisableImg from '@/assets/download/jetbrains_disable.webp'
import jetbrainsContent from '@/assets/download/jetbrains_download.webp'
import vscodeIcon from '@/assets/download/vscode_icon.webp'
import jetbrainsIcon from '@/assets/download/jetbrains_icon.webp'
import cliImg from '@/assets/download/cli.webp'
import cliDisableImg from '@/assets/download/cli_disable.webp'
import cliIcon from '@/assets/download/cli_icon.webp'
import ZhDownloadStep1 from '@/assets/download/zh/download_step1.webp'
import ZhDownloadStep2 from '@/assets/download/zh/download_step2.webp'
import EnDownloadStep1 from '@/assets/download/en/download_step1.webp'
import ZhCliInstall from '@/assets/download/zh/cli_install.webp'
import EnCliInstall from '@/assets/download/en/cli_install.webp'
import EnDownloadStep2 from '@/assets/download/en/download_step2.webp'
```

在函数外（模块顶层）添加路径常量：

```ts
const vscodeImg = '/assets/download/vscode.webp'
const jetbrainsImg = '/assets/download/jetbrains.webp'
const vscodeDisableImg = '/assets/download/vscode_disable.webp'
const jetbrainsDisableImg = '/assets/download/jetbrains_disable.webp'
const jetbrainsContent = '/assets/download/jetbrains_download.webp'
const vscodeIcon = '/assets/download/vscode_icon.webp'
const jetbrainsIcon = '/assets/download/jetbrains_icon.webp'
const cliImg = '/assets/download/cli.webp'
const cliDisableImg = '/assets/download/cli_disable.webp'
const cliIcon = '/assets/download/cli_icon.webp'
const ZhDownloadStep1 = '/assets/download/zh/download_step1.webp'
const ZhDownloadStep2 = '/assets/download/zh/download_step2.webp'
const EnDownloadStep1 = '/assets/download/en/download_step1.webp'
const ZhCliInstall = '/assets/download/zh/cli_install.webp'
const EnCliInstall = '/assets/download/en/cli_install.webp'
const EnDownloadStep2 = '/assets/download/en/download_step2.webp'
```

函数体内的 `images` 对象和 `stepImages` 对象、`tabList` computed 中引用这些变量的代码**不需要改动**，变量名保持一致。

- [ ] **Step 2: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 3: 提交**

```bash
git -c core.autocrlf=false add src/pages/download/useDownloadData.ts
git -c core.autocrlf=false commit -m "feat: migrate download image imports to path strings"
```

---

## Task 14: 迁移 download 组件（TabList、DownloadContent、StepTimeline）

**Files:**

- Modify: `src/pages/download/components/TabList.vue`
- Modify: `src/pages/download/components/DownloadContent.vue`
- Modify: `src/pages/download/components/StepTimeline.vue`

- [ ] **Step 1: TabList.vue — `<img>` → `<NuxtImg>`**

将：

```html
<img :src="tab.imgUrl" :alt="tab.key" />
```

改为：

```html
<NuxtImg :src="tab.imgUrl" :alt="tab.key" loading="lazy" />
```

- [ ] **Step 2: DownloadContent.vue — `<img>` → `<NuxtImg>`**

将：

```html
<img class="download-icon w-6 h-6 mr-1" :src="headerIcon" alt="CoStrict Download" />
```

改为：

```html
<NuxtImg
  class="download-icon w-6 h-6 mr-1"
  :src="headerIcon"
  alt="CoStrict Download"
  loading="lazy"
/>
```

- [ ] **Step 3: StepTimeline.vue — `<img>` → `<NuxtImg>`**

将：

```html
<img v-if="step.imgUrl" :src="step.imgUrl" alt="CoStrict Download" class="step-image" />
```

改为：

```html
<NuxtImg
  v-if="step.imgUrl"
  :src="step.imgUrl"
  alt="CoStrict Download"
  class="step-image"
  loading="lazy"
/>
```

- [ ] **Step 4: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 5: 提交**

```bash
git -c core.autocrlf=false add src/pages/download/components/TabList.vue src/pages/download/components/DownloadContent.vue src/pages/download/components/StepTimeline.vue
git -c core.autocrlf=false commit -m "feat: migrate download components imgs to NuxtImg"
```

---

## Task 15: 迁移 blog（blogData.ts、BlogCard、[id].vue）

**Files:**

- Modify: `src/pages/blog/blogData.ts`
- Modify: `src/pages/blog/components/BlogCard.vue`
- Modify: `src/pages/blog/[id].vue`

- [ ] **Step 1: blogData.ts — coverImageMap import → 路径字符串**

删除以下 import 行：

```ts
import deepCover from '@/assets/blog/cover/deep_dive.webp'
import caseCover from '@/assets/blog/cover/parctical_case.webp'
import techCover from '@/assets/blog/cover/tech_progress.webp'
import ossCover from '@/assets/blog/cover/open_source.webp'
```

将 `coverImageMap` 改为路径字符串：

```ts
export const coverImageMap: Record<string, string> = {
  deep: '/assets/blog/cover/deep_dive.webp',
  case: '/assets/blog/cover/parctical_case.webp',
  tech: '/assets/blog/cover/tech_progress.webp',
  oss: '/assets/blog/cover/open_source.webp',
}
```

`import.meta.glob` 和 `blogImageMap` **保持不变**。

- [ ] **Step 2: BlogCard.vue — `<img>` → `<NuxtImg>`**

将：

```html
<img
  v-if="coverImageMap[article.cover]"
  :src="coverImageMap[article.cover]"
  :alt="article.title"
  class="cover-img"
/>
```

改为：

```html
<NuxtImg
  v-if="coverImageMap[article.cover]"
  :src="coverImageMap[article.cover]"
  :alt="article.title"
  class="cover-img"
  loading="lazy"
/>
```

- [ ] **Step 3: blog/[id].vue — related articles `<img>` → `<NuxtImg>`（共 2 处，桌面端和移动端各一处）**

将桌面端 related articles 中：

```html
<img
  v-if="coverImageMap[related.cover]"
  :src="coverImageMap[related.cover]"
  :alt="related.title"
  class="related-cover-img"
/>
```

改为：

```html
<NuxtImg
  v-if="coverImageMap[related.cover]"
  :src="coverImageMap[related.cover]"
  :alt="related.title"
  class="related-cover-img"
  loading="lazy"
/>
```

移动端 `mobile-related` 中相同的 `<img>` 同理替换。

lightbox `<img :src="lightboxSrc">` **保持不变**。

- [ ] **Step 4: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 5: 提交**

```bash
git -c core.autocrlf=false add src/pages/blog/blogData.ts src/pages/blog/components/BlogCard.vue "src/pages/blog/[id].vue"
git -c core.autocrlf=false commit -m "feat: migrate blog images to NuxtImg"
```

---

## Task 16: 全量验证

- [ ] **Step 1: 完整构建**

```bash
pnpm build
```

预期：构建成功，无报错。

- [ ] **Step 2: 类型检查**

```bash
pnpm type-check
```

预期：无报错。

- [ ] **Step 3: Lint**

```bash
pnpm lint
```

预期：无 ESLint 错误。

- [ ] **Step 4: 本地预览验证**

```bash
pnpm preview
```

打开浏览器，逐一检查以下页面图片显示正常：

- 首页（`/`）：logo、port 装饰图、feature 卡片图、qrcode
- 定价页（`/pricing`）：背景装饰图、label 标签图
- 下载页（`/download`）：tab 图标、步骤图
- 博客列表（`/blog`）：封面图
- 博客详情（`/blog/1`）：related articles 封面图

在 DevTools Network 面板中确认图片请求路径包含 `/_ipx/` 前缀，响应 `Content-Type` 为 `image/avif` 或 `image/webp`。

- [ ] **Step 5: 最终提交**

```bash
git -c core.autocrlf=false add docs/superpowers/plans/2026-04-13-nuxt-image-migration.md docs/superpowers/specs/2026-04-13-nuxt-image-migration-design.md
git -c core.autocrlf=false commit -m "docs: add nuxt-image migration spec and plan"
```
