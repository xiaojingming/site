# SEO 行动计划 - costrict.ai

**基于 SEO 完整审计报告 — 2026年4月13日**
**当前 SEO 健康评分：64/100**
**目标 SEO 健康评分：85+**

---

## 优先级定义

- **严重（CRITICAL）：** 阻碍索引或导致惩罚（立即修复）
- **高（HIGH）：** 显著影响排名（1 周内修复）
- **中（MEDIUM）：** 优化机会（1 个月内修复）
- **低（LOW）：** 锦上添花（待办积压）

---

## 已解决项（✅ 无需再处理）

| 项目                                                           | 完成时间        |
| -------------------------------------------------------------- | --------------- |
| 修复 sitemap.xml（返回有效 XML，含 image sitemap 扩展）        | 2026-04-09 之前 |
| 优化 robots.txt（添加 Crawl-delay、Sitemap 引用、AI 爬虫授权） | 2026-04-09 之前 |
| 完善 llms.txt（添加结构化内容）                                | 2026-04-09 之前 |
| 实现 SSR（服务端渲染，内容可被爬虫抓取）                       | 2026-04-13 之前 |
| 添加独立含关键词的 `<title>` 标签                              | 2026-04-13 之前 |
| 添加 Organization Schema                                       | 2026-04-13 之前 |
| 添加 OG / Twitter meta 标签                                    | 2026-04-13 之前 |

---

## 严重优先级（立即修复）

### C1. 明确 `/touch/` 路径策略并修复 Canonical

**影响：** 极高 | **工作量：** 低 | **预计时间：** 1-2 小时

**当前问题：** 内容在 `/touch/` 路径，但 canonical 指向根域名 `https://costrict.ai/`，sitemap 中也无 `/touch/` 条目，导致 SEO 权重分散、爬虫困惑。

**解决方案 A（推荐）：将 `/touch/` 重定向到根域名，内容迁移至根路径**

```nginx
# nginx 配置
location /touch/ {
    return 301 https://costrict.ai/;
}
```

同时将页面内容部署到根路径，canonical 保持指向 `https://costrict.ai/`。

**解决方案 B：若 `/touch/` 为正式路径，更新 canonical 和 sitemap**

```html
<!-- 将 canonical 改为 -->
<link rel="canonical" href="https://costrict.ai/touch/" />
```

并在 sitemap.xml 中加入：

```xml
<url>
  <loc>https://costrict.ai/touch/</loc>
  <lastmod>2026-04-13</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>
```

**预期结果：** SEO 权重集中，爬虫索引路径明确

---

### C2. 添加 H1 标签

**影响：** 高 | **工作量：** 低 | **预计时间：** 30 分钟

**当前问题：** 页面主标题"CoStrict 企业严肃开发的AI智能伙伴"以 `div` 渲染，搜索引擎无法识别页面核心主题。

**解决方案（在 `SloganSection.vue` 中修改）：**

```vue
<!-- 当前 -->
<div class="slogan-title">CoStrict 企业严肃开发的AI智能伙伴</div>

<!-- 修改为 -->
<h1 class="slogan-title">CoStrict 企业严肃开发的AI智能伙伴</h1>
```

**预期结果：** 搜索引擎准确识别页面主题，关键词排名提升

---

### C3. 修复导航链接 SSR 状态

**影响：** 高 | **工作量：** 中 | **预计时间：** 2-4 小时

**当前问题：** 导航菜单链接在 SSR 渲染时均为 `#`，依赖 JS 注入真实路径，爬虫无法发现子页面。

**解决方案（在 `NavbarMenu.vue` 中确保 SSR 时有真实 href）：**

```vue
<!-- 确保菜单项使用 NuxtLink 或带真实 href 的 <a> 标签 -->
<NuxtLink :to="localePath('/')" class="menu-item">{{ t('nav.home') }}</NuxtLink>
<NuxtLink :to="localePath('/download')" class="menu-item">{{ t('nav.download') }}</NuxtLink>
<NuxtLink :to="localePath('/pricing')" class="menu-item">{{ t('nav.pricing') }}</NuxtLink>
```

**预期结果：** 爬虫可发现所有子页面，内链权重正常传递

---

## 高优先级（1 周内修复）

### H1. 将 base64 内联图片改为外部 URL 引用

**影响：** 高 | **工作量：** 中 | **预计时间：** 1-2 天

**当前问题：** Logo、严格模式截图、代码审查截图等以 base64 内嵌在 HTML 中，导致 HTML 文档体积超大（>58KB），无法被浏览器缓存，严重影响 LCP 和 FCP。

**解决方案：**

1. 将 Logo 图片保存为独立文件（已有 `NavbarLogo.vue` 组件）：

```vue
<!-- NavbarLogo.vue -->
<!-- 将 base64 data URI 改为 -->
<img src="/logo.webp" alt="CoStrict Logo" class="logo-img" width="28" height="28" />
```

2. 严格模式和代码审查的 hero 图片改为使用已有的 `_nuxt/` 路径资源：

```vue
<!-- 使用已有的外部路径而非 base64 -->
<img src="/touch/_nuxt/strict_mode_zh_buffer.ByM6wwlY.webp" alt="CoStrict 严格模式演示" />
```

**预期结果：** HTML 体积减少 60-70%，LCP 显著改善，浏览器可缓存图片

---

### H2. 修复图片 alt 文本

**影响：** 高 | **工作量：** 低 | **预计时间：** 1-2 小时

**当前问题：** 大量功能截图 alt 为 `"card img"`，无语义信息，影响图片搜索索引和可访问性。

**建议修改（`ItemCard.vue` 及相关组件）：**

| 图片文件             | 当前 alt   | 建议 alt                                         |
| -------------------- | ---------- | ------------------------------------------------ |
| strictMode_feature01 | `card img` | `CoStrict 严格模式 - 项目文档功能，理解业务架构` |
| strictMode_feature02 | `card img` | `CoStrict 严格模式 - 规范流程与任务拆解`         |
| strictMode_feature03 | `card img` | `CoStrict 严格模式 - 测试驱动开发（TDD）`        |
| strictMode_feature04 | `card img` | `CoStrict 严格模式 - Plan 模式渐进式开发`        |
| codereview_feature01 | `card img` | `CoStrict 代码审查 - 全量代码仓库索引`           |
| codereview_feature02 | `card img` | `CoStrict 代码审查 - 开放性架构与生态集成`       |
| codereview_feature03 | `card img` | `CoStrict 代码审查 - 智能体驱动扫描`             |
| codereview_feature04 | `card img` | `CoStrict 代码审查 - 多场景灵活覆盖`             |

**预期结果：** 图片搜索可见性提升，可访问性改善，SEO 语义增强

---

### H3. 添加 SoftwareApplication Schema

**影响：** 高 | **工作量：** 低 | **预计时间：** 1-2 小时

**当前问题：** 仅有 Organization Schema，缺少软件产品核心 Schema，无法触发富媒体结果。

**解决方案（在 `StructuredData.vue` 或 `nuxt.config.ts` 中添加）：**

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CoStrict",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Windows, macOS, Linux",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CNY"
  },
  "description": "免费开源的AI辅助编程工具，支持企业私有化部署，提升团队开发效率",
  "url": "https://costrict.ai",
  "downloadUrl": "https://costrict.ai/download",
  "license": "https://opensource.org/licenses/MIT",
  "softwareVersion": "1.0.0",
  "screenshot": "https://costrict.ai/og-image.png"
}
```

**预期结果：** 富媒体结果资格提升，品牌知识图谱增强

---

### H4. 修复 OG 图片

**影响：** 中 | **工作量：** 低 | **预计时间：** 2-3 小时

**当前问题：** `og:image` 使用 `favicon.png`（小图标），不符合 OG 图片规范（建议 1200×630px）；sitemap 中引用的 `og-image.png` 需确认是否存在。

**解决方案：**

1. 创建 1200×630px 的 OG 图片（`/public/og-image.png`）
2. 更新 meta 标签：

```html
<meta property="og:image" content="https://costrict.ai/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://costrict.ai/og-image.png" />
```

**预期结果：** 社交分享预览正常显示，点击率提升

---

### H5. 添加 `llms-full.txt`

**影响：** 中 | **工作量：** 低 | **预计时间：** 30 分钟

**当前问题：** 仅有基础 `llms.txt`，缺少扩展版本，AI 引擎获取的上下文有限。

**解决方案（创建 `/public/llms-full.txt`）：**

```
# CoStrict AI 编程助手 - 完整描述

title: CoStrict
description: 免费开源的 AI 辅助编程工具，支持企业私有化部署
version: 1.0.0
author: CoStrict Team
url: https://costrict.ai
license: MIT
language: zh-CN, en

# 核心功能
features:
  - 严肃编程：系统性拆解需求为设计、架构、测试、代码等步骤
  - 测试驱动开发（TDD）：生成代码前先构建测试案例
  - 代码审查：全量代码仓库索引，多专家模型专项检查
  - 企业私有化部署：数据不出企业，端到端加密
  - AI 代码补全与生成
  - MCP 服务扩展
  - 多模型支持（Claude、Gemini 等）
  - VS Code 和 JetBrains 集成
  - 多语言支持（Python、Go、Java、JavaScript、TypeScript、C/C++ 等）

# 适用场景
use_cases:
  - 企业内部代码审查自动化
  - 开发团队 AI 辅助编程
  - 对数据安全有严格要求的金融/医疗行业
  - 希望私有化部署 AI 工具的大型企业
  - 个人开发者免费使用

# 定价
pricing:
  personal: 免费
  enterprise: 按需定价（私有化部署方案）

# 文档与资源
docs: https://docs.costrict.ai
github: https://github.com/zgsm-ai/costrict
download: https://costrict.ai/download
pricing: https://costrict.ai/pricing

# 联系方式
contact: zgsm@sangfor.com.cn
wechat: CoStrict 公众号
```

**预期结果：** AI 引擎引用质量和覆盖度提升

---

## 中等优先级（1 个月内修复）

### M1. 完善标题层级结构（H2-H6）

**影响：** 中 | **工作量：** 中 | **预计时间：** 半天

**当前问题：** 各功能区块标题未使用语义化标题标签，搜索引擎无法理解内容层级。

**解决方案（各功能区块组件中添加对应标题标签）：**

| 组件                                | 当前  | 建议                        |
| ----------------------------------- | ----- | --------------------------- |
| `StrictMode.vue` 区块标题           | `div` | `<h2>严肃编程</h2>`         |
| `CodeReview.vue` 区块标题           | `div` | `<h2>代码审查</h2>`         |
| `MoreTool.vue` 区块标题             | `div` | `<h2>更多工具</h2>`         |
| `EnterpriseDeployment.vue` 区块标题 | `div` | `<h2>企业级私有化部署</h2>` |
| `LanguageSupport.vue` 区块标题      | `div` | `<h2>多编程语言支持</h2>`   |
| `FooterCopyright.vue` 区块标题      | `div` | `<h2>联系我们</h2>`         |

---

### M2. 添加 VideoObject Schema

**影响：** 中 | **工作量：** 低 | **预计时间：** 1 小时

**当前问题：** 页面有严格模式和代码审查的演示视频，但未添加 VideoObject Schema，无法出现在视频搜索结果中。

**解决方案：**

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "CoStrict 严格模式演示",
  "description": "展示 CoStrict 严格模式如何系统性拆解需求，实现测试驱动开发",
  "thumbnailUrl": "https://costrict.ai/touch/_nuxt/strict_mode_zh_buffer.ByM6wwlY.webp",
  "uploadDate": "2026-04-01",
  "contentUrl": "https://costrict.ai/touch/_nuxt/strict_mode_zh.BJqzuQo3.mp4"
}
```

---

### M3. 增加社会证明内容

**影响：** 高 | **工作量：** 高 | **预计时间：** 1-2 周

**当前问题：** 无用户数量、企业案例、评价等信任信号，E-E-A-T 权威性不足。

**建议添加：**

- "已有 X 家企业使用" / "X 位开发者信赖" 等数据
- 企业客户 Logo 展示
- 用户评价引用
- GitHub Star 数量显著展示

---

### M4. 添加"关于我们"页面

**影响：** 中 | **工作量：** 中 | **预计时间：** 1-2 天

**当前问题：** 无团队介绍页面，E-E-A-T 权威信号薄弱。

**解决方案：**

- 创建 `/about` 页面，包含团队介绍、公司背景、使命愿景
- 加入 sitemap.xml
- 添加 `Person` Schema 标记团队成员

---

### M5. 添加 hreflang 标签

**影响：** 中 | **工作量：** 低 | **预计时间：** 1-2 小时

**当前问题：** 站点支持中英文，但无 hreflang 实现，国际搜索可见性受限。

**解决方案（在 `nuxt.config.ts` 的 i18n 配置中添加）：**

```html
<link rel="alternate" hreflang="zh" href="https://costrict.ai/" />
<link rel="alternate" hreflang="en" href="https://costrict.ai/en/" />
<link rel="alternate" hreflang="x-default" href="https://costrict.ai/" />
```

---

### M6. 图片优化

**影响：** 中 | **工作量：** 中 | **预计时间：** 1-2 天

**解决方案：**

**添加明确尺寸（防止 CLS）：**

```vue
<img
  src="/touch/_nuxt/strictMode_feature01.CbWUTYSZ.webp"
  width="400"
  height="300"
  alt="CoStrict 严格模式 - 项目文档功能"
  loading="lazy"
/>
```

**添加安全响应头（更新 nginx.conf）：**

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

---

### M7. 扩充博客内容

**影响：** 高 | **工作量：** 高 | **预计时间：** 持续进行

**当前问题：** 仅 6 篇博客文章，且标题较为通用，长尾关键词覆盖不足。

**建议内容方向：**

- AI 编程最佳实践（5-10 篇）
- CoStrict 功能深度解析（5-10 篇）
- 企业私有化部署指南（3-5 篇）
- 与竞品对比分析（GitHub Copilot、Cursor 等）
- TDD 实践教程

---

## 低优先级（待办积压）

### L1. 添加 BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://costrict.ai/" },
    { "@type": "ListItem", "position": 2, "name": "下载", "item": "https://costrict.ai/download" }
  ]
}
```

### L2. 添加 SVG favicon

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

### L3. 实现 AVIF 图片格式

```vue
<picture>
  <source srcset="/assets/home/left_port.avif" type="image/avif" />
  <source srcset="/assets/home/left_port.webp" type="image/webp" />
  <img src="/assets/home/left_port.jpg" alt="..." loading="lazy" />
</picture>
```

### L4. 创建竞品对比内容

与 GitHub Copilot、Tabnine、Cursor 等竞品对比，突出 CoStrict 在私有化部署和数据安全方面的独特优势。

### L5. 添加 Service Worker 缓存

```bash
pnpm add -D vite-plugin-pwa workbox-precaching
```

---

## 实施时间表

### 第 1 周（严重优先级）

- [ ] C1：明确 `/touch/` 路径策略，修复 canonical 与 sitemap
- [ ] C2：将主标题改为 `<h1>` 标签
- [ ] C3：修复导航链接 SSR 状态（确保有真实 href）

### 第 2 周（高优先级）

- [ ] H1：将 base64 内联图片改为外部 URL 引用（重点：Logo、功能截图）
- [ ] H2：修复所有图片 alt 文本
- [ ] H3：添加 SoftwareApplication Schema
- [ ] H4：修复 OG 图片（创建 1200×630px 专用图片）
- [ ] H5：添加 `llms-full.txt`

### 第 3-4 周（中等优先级）

- [ ] M1：完善标题层级结构（H2-H6）
- [ ] M2：添加 VideoObject Schema
- [ ] M5：添加 hreflang 标签
- [ ] M6：图片尺寸声明 + 安全响应头

### 第 5-8 周（内容与权威）

- [ ] M3：增加社会证明内容
- [ ] M4：创建"关于我们"页面
- [ ] M7：持续发布博客内容（每周 1-2 篇）

### 第 9 周及以后（低优先级及持续优化）

- [ ] L1：添加 BreadcrumbList Schema
- [ ] L2：添加 SVG favicon
- [ ] L3：实现 AVIF 图片格式
- [ ] L4：创建竞品对比内容
- [ ] L5：添加 Service Worker 缓存

---

## 预期效果

### 严重修复后（第 1 周）

- SEO 健康评分：**68-70/100**
- 爬虫索引路径明确，权重集中

### 高优先级修复后（第 2 周）

- SEO 健康评分：**73-76/100**
- 页面加载速度显著提升（HTML 体积减少 60-70%）
- 富媒体结果资格提升（SoftwareApplication Schema）

### 中等优先级修复后（第 3-4 周）

- SEO 健康评分：**78-82/100**
- 内容语义化增强，长尾关键词覆盖提升

### 内容扩展后（第 5-8 周）

- SEO 健康评分：**85-88/100**
- E-E-A-T 评分：7-8/10
- 自然流量：+150-300%（相较当前）

---

## 监控与成功指标

### 关键绩效指标（KPI）

1. **自然流量** — Google Search Console
2. **核心网页指标（LCP/INP/CLS）** — Lighthouse、CrUX
3. **索引覆盖率** — Google Search Console
4. **富媒体结果** — Google 富媒体结果测试
5. **SEO 健康评分** — 每月审计

### 推荐工具

- Google Search Console（免费）
- Google Analytics 4（免费）
- Lighthouse / PageSpeed Insights（免费）
- Schema.org 验证器（免费）

### 成功标准

- 2 个月内 SEO 健康评分达到 **80+**
- 4 个月内自然流量增长 **+200%**
- 核心网页指标 LCP < 2.5s（修复 base64 图片后）
- 2 个月内具备 2 种以上富媒体结果资格

---

## 结论

本行动计划基于 2026年4月13日最新审计结果，当前评分 64/100，相较 2026年4月9日审计（42/100）已有显著提升，主要得益于 SSR 实现和基础 meta 标签完善。

**最紧迫的任务：** 明确 `/touch/` 路径策略（C1），这是当前最大的技术 SEO 风险。同时添加 H1 标签（C2）和修复导航链接（C3）是低成本高回报的快速修复项。

**最大优势：** `llms.txt`、AI 爬虫授权、SSR 内容可抓取，使 costrict.ai 在 AI 搜索就绪度上处于领先位置，一旦解决路径和 Schema 问题，AI 搜索引用潜力将进一步释放。
