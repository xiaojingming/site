# SEO 完整审计报告 - costrict.ai

**审计日期：** 2026年4月13日
**审计系统：** CoStrict SEO 审计系统
**网址：** https://costrict.ai/touch/
**业务类型：** SaaS 软件产品（AI 辅助编程工具，面向企业）

---

## 执行摘要

### SEO 综合健康评分：64/100 ⚠️ **中等，有明显提升空间**

| 分类                 | 得分       | 权重     | 加权得分 |
| -------------------- | ---------- | -------- | -------- |
| 技术 SEO             | 72/100     | 22%      | 15.8     |
| 内容质量             | 65/100     | 23%      | 14.9     |
| 页面 SEO             | 60/100     | 20%      | 12.0     |
| 结构化数据 / Schema  | 55/100     | 10%      | 5.5      |
| 性能（核心网页指标） | 50/100     | 10%      | 5.0      |
| AI 搜索就绪度        | 78/100     | 10%      | 7.8      |
| 图片优化             | 70/100     | 5%       | 3.5      |
| **总计**             | **64/100** | **100%** | **64.5** |

### 检测到的业务类型

**SaaS 软件产品** — 免费开源的 AI 辅助编程工具，支持企业私有化部署

### 五大关键问题

1. **`/touch/` 路径与 Canonical 不一致** — canonical 标签指向根域名 `https://costrict.ai/`，但内容实际在 `/touch/`，导致 SEO 权重分散
2. **缺少 H1 标签** — 页面主标题"CoStrict 企业严肃开发的AI智能伙伴"以 `div` 渲染，搜索引擎无法识别页面主题
3. **导航链接依赖 JS（SSR 状态为 `#`）** — 导航菜单链接在服务端渲染时均为 `#`，若爬虫不执行 JS 则所有内链失效
4. **大量 base64 内联图片** — Logo、功能截图等以 base64 内嵌在 HTML 中，导致文档体积过大且无法被缓存
5. **图片 alt 文本语义缺失** — 大量功能截图 alt 为 `"card img"`，无法传递语义信息

### 五大快速见效项

1. 将 canonical 标签更新为实际页面 URL（`https://costrict.ai/touch/` 或明确重定向策略）
2. 将页面主标题改为 `<h1>` 标签
3. 确保 SSR 渲染时导航链接包含真实 href（不依赖 JS 注入）
4. 将 base64 内联图片改为外部 URL 引用
5. 添加 `SoftwareApplication` Schema

### 亮点

`llms.txt` 配置完善，robots.txt 明确授权 GPTBot / ClaudeBot / PerplexityBot，AI 搜索就绪度（78/100）在同类 SaaS 产品中处于领先水平。SSR 已实现，内容可被爬虫抓取，相较上次审计有显著进步。

---

## 已解决的问题（对比 2026-04-09 审计）

| 问题                        | 旧状态  | 当前状态                                 |
| --------------------------- | ------- | ---------------------------------------- |
| JavaScript SPA（无 SSR）    | 🔴 严重 | ✅ 已实现 SSR，内容可被爬虫抓取          |
| 所有页面共用 `<title>`      | 🔴 严重 | ✅ 已有独立含关键词的 title              |
| 零结构化数据                | 🔴 严重 | ✅ 已添加 Organization Schema            |
| 无 OG 图片 / Twitter 卡片   | 🔴 严重 | ✅ 已添加 og:image、twitter 标签         |
| 无 `<link rel="canonical">` | 🔴 严重 | ⚠️ 已添加但指向根域名，与 `/touch/` 不符 |

---

## 1. 技术 SEO 分析（得分：72/100）

### 1.1 可抓取性

| 检查项                         | 状态    | 说明                                                |
| ------------------------------ | ------- | --------------------------------------------------- |
| robots.txt                     | ✅ 通过 | 结构良好，明确授权 GPTBot、ClaudeBot、PerplexityBot |
| Sitemap 已在 robots.txt 中声明 | ✅ 通过 | 指向 `https://costrict.ai/sitemap.xml`              |
| Crawl-delay                    | ✅ 通过 | 设置为 1 秒                                         |
| 关键路径屏蔽                   | ✅ 通过 | `/api/`、`/admin/`、`/private/` 已适当屏蔽          |
| SSR 渲染                       | ✅ 通过 | 内容已服务端渲染，爬虫可直接抓取                    |

### 1.2 可索引性

| 检查项         | 状态    | 说明                                                             |
| -------------- | ------- | ---------------------------------------------------------------- |
| Canonical 标签 | 🔴 严重 | canonical 指向 `https://costrict.ai/`，与实际路径 `/touch/` 不符 |
| URL 路径一致性 | 🔴 严重 | `/touch/` 是否为正式路径需明确，sitemap 中无此路径条目           |
| Hreflang 标签  | 🟡 警告 | 站点有中英文内容，但未实现 hreflang 标签                         |
| Meta robots    | ✅ 通过 | 未发现 noindex                                                   |
| HTTPS          | ✅ 通过 | 全站 HTTPS                                                       |

### 1.3 Sitemap.xml 分析

当前 sitemap 结构良好，包含 12 个 URL（含博客文章），有 image sitemap 扩展：

| URL                             | 优先级 | 更新频率 |
| ------------------------------- | ------ | -------- |
| `https://costrict.ai/`          | 1.0    | weekly   |
| `https://costrict.ai/download`  | 0.9    | weekly   |
| `https://costrict.ai/pricing`   | 0.8    | monthly  |
| `https://costrict.ai/operation` | 0.7    | weekly   |
| `https://costrict.ai/resource`  | 0.6    | monthly  |
| `https://costrict.ai/blog`      | 0.8    | daily    |
| `https://costrict.ai/blog/1-6`  | 0.7    | monthly  |

**⚠️ 问题：** sitemap 中无 `https://costrict.ai/touch/` 条目，若 `/touch/` 为正式路径，需加入 sitemap。

### 1.4 URL 结构

| 检查项         | 状态    | 说明                                                |
| -------------- | ------- | --------------------------------------------------- |
| 简洁 URL       | ✅ 通过 | `/pricing`、`/download`、`/blog` 等，简洁且具描述性 |
| URL 深度       | ✅ 通过 | 所有 sitemap URL 均为一级路径                       |
| `/touch/` 路径 | 🔴 异常 | 疑似测试/预览路径，与 sitemap 和 canonical 均不一致 |

### 1.5 安全响应头

| 响应头                    | 状态    | 重要性 |
| ------------------------- | ------- | ------ |
| Content-Security-Policy   | ⚠️ 未知 | 高     |
| X-Frame-Options           | ⚠️ 未知 | 中     |
| X-Content-Type-Options    | ⚠️ 未知 | 中     |
| Strict-Transport-Security | ⚠️ 未知 | 高     |

---

## 2. 内容质量分析（得分：65/100）

### 2.1 E-E-A-T 分析

**综合评分：5/10**（相较上次审计有所提升，SSR 后内容可见）

| 维度                        | 得分 | 说明                                                        |
| --------------------------- | ---- | ----------------------------------------------------------- |
| 经验（Experience）          | 4/10 | 有功能演示视频和截图，但无案例研究、用户证言或真实部署示例  |
| 专业性（Expertise）         | 6/10 | 功能描述详细，体现深度技术理解（TDD、多专家模型、智能体等） |
| 权威性（Authoritativeness） | 4/10 | 有 GitHub 开源背书，但无行业媒体报道、奖项或第三方评测      |
| 可信度（Trustworthiness）   | 5/10 | 提供邮箱、微信公众号、交流群，但无"关于我们"页面或公司信息  |

### 2.2 内容深度

**可评估内容（SSR 已实现）：**

- Title：✅ 含关键词，长度适中（约 32 字符）
- Meta description：✅ 描述清晰，含核心卖点
- 正文内容：✅ 详细介绍严肃编程、代码审查、企业部署、多语言支持等功能
- 导航结构：⚠️ SSR 状态下导航链接为 `#`，依赖 JS 注入真实路径

### 2.3 内容稀薄风险

- **缺少 H1 标签** — 主标题以 `div` 渲染，搜索引擎无法识别页面核心主题
- **缺少社会证明** — 无用户数量、企业案例、评价等信任信号
- **缺少团队介绍** — 无"关于我们"页面，E-E-A-T 权威信号薄弱
- **博客内容有限** — 仅 6 篇文章，且标题较为通用

### 2.4 AI 引用就绪度

- **llms.txt** ✅ 存在且结构完整，列出功能、文档 URL、GitHub、联系方式
- **主站内容** ✅ SSR 实现后，AI 引擎可从产品页面提取段落级引用
- **可引用性** 🟡 缺少具体量化数据（如"提升 X% 效率"、"支持 X 种语言"），AI 模型倾向引用有数据支撑的内容

---

## 3. 结构化数据分析（得分：55/100）

### 3.1 当前状态

**已实现 Organization Schema：**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CoStrict",
  "url": "https://costrict.ai/",
  "logo": "https://costrict.ai/favicon.png",
  "description": "CoStrict 是一款免费开源的AI辅助编程工具，支持企业私有化部署",
  "sameAs": ["https://github.com/zgsm-ai/costrict"]
}
```

### 3.2 缺失的 Schema 机会

| Schema 类型            | 状态    | 说明                                |
| ---------------------- | ------- | ----------------------------------- |
| SoftwareApplication    | 🔴 缺失 | 软件产品的核心 Schema，可触发富结果 |
| WebSite + SearchAction | 🔴 缺失 | 启用 Sitelinks 搜索框               |
| VideoObject            | 🟡 缺失 | 页面有演示视频，可添加视频 Schema   |
| BreadcrumbList         | 🟡 缺失 | 子页面导航上下文                    |
| FAQPage                | 🟡 机会 | 可在功能介绍区域添加                |

### 3.3 推荐 Schema（首页 JSON-LD）

**建议添加 SoftwareApplication Schema：**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "CoStrict",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Windows, macOS, Linux",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "CNY"
      },
      "description": "免费开源的AI辅助编程工具，支持企业私有化部署",
      "url": "https://costrict.ai",
      "downloadUrl": "https://costrict.ai/download",
      "license": "https://opensource.org/licenses/MIT"
    },
    {
      "@type": "WebSite",
      "url": "https://costrict.ai",
      "name": "CoStrict",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://costrict.ai/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
```

---

## 4. 页面 SEO 分析（得分：60/100）

### 4.1 标题标签

| 页面      | 当前标题                                                | 评估                  |
| --------- | ------------------------------------------------------- | --------------------- |
| `/touch/` | `CoStrict - 企业级AI编程工具 \| 开源免费 \| 私有化部署` | ✅ 含关键词，长度适中 |

### 4.2 Meta Description

| 标签           | 当前值                                                                                                      | 评估                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| description    | `CoStrict 是一款免费开源的AI辅助编程工具，支持企业私有化部署，提升团队开发效率，是企业严肃编程的最佳选择。` | ✅ 描述清晰，含核心卖点                    |
| og:title       | 与 title 相同                                                                                               | ✅                                         |
| og:description | 与 description 相同                                                                                         | ✅                                         |
| og:url         | `https://costrict.ai/`                                                                                      | ⚠️ 与实际 URL 不符                         |
| og:image       | `https://costrict.ai/favicon.png`                                                                           | 🔴 使用 favicon 作为 OG 图片，尺寸不符规范 |
| twitter:card   | 未检测到 `twitter:card` 类型声明                                                                            | 🔴 缺失                                    |

### 4.3 标题层级（H1-H6）

**🔴 严重问题：页面无 H1 标签**

页面最显眼的标题文字"CoStrict 企业严肃开发的AI智能伙伴"以普通 `div` 渲染，未使用 `<h1>` 标签。

**建议标题结构：**

```
H1: CoStrict - 企业严肃开发的AI智能伙伴
  H2: 严肃编程
    H3: 理解业务
    H3: 规范流程&任务拆解
    H3: 测试驱动开发
    H3: Plan模式
  H2: 代码审查
    H3: 全量代码仓库索引
    H3: 开放性架构与生态集成
    H3: 智能体驱动扫描
    H3: 多场景灵活覆盖
  H2: 更多工具
  H2: 企业级私有化部署
  H2: 多编程语言支持
  H2: 联系我们
```

### 4.4 内部链接

**🔴 问题：导航链接 SSR 状态为 `#`**

```html
[首页](#)[下载安装](#)[价格](#)[帮助文档](https://docs.costrict.ai)[博客](#)[运营活动](#)
```

大量导航链接在 SSR 渲染时为 `#`，依赖 JS 注入真实路径。若 Google 爬取时 JS 未完全执行，所有内链将失效，爬虫无法发现子页面。

---

## 5. 性能 / 核心网页指标（得分：50/100）

> 注：以下为基于代码分析的实验室估算，非 Google CrUX 实测数据。

### 5.1 主要性能问题

| 问题                        | 影响                                         | 严重度 |
| --------------------------- | -------------------------------------------- | ------ |
| 大量 base64 内联图片        | HTML 文档体积超大（>58KB），影响 TTFB 和 FCP | 🔴 高  |
| 多个 MP4 视频 prefetch      | 预加载 4 个视频文件，占用带宽                | 🟡 中  |
| CSS 全部内联在 `<head>`     | 阻塞渲染，但有利于避免 FOUC                  | 🟡 中  |
| 14 个 JS 模块 modulepreload | 大量预加载脚本                               | 🟡 中  |
| 图片无明确 width/height     | 可能导致 CLS（累积布局偏移）                 | 🟡 中  |

### 5.2 base64 图片问题（核心性能瓶颈）

页面 HTML 中包含多张 base64 编码的大型 WebP 图片（Logo、严格模式截图、代码审查截图等）：

- 显著增加 HTML 文档大小，影响 TTFB 和 FCP
- 无法被浏览器缓存（每次请求重新传输）
- 影响 LCP（最大内容绘制）

**建议：** 将 base64 图片改为外部 URL 引用，已有 `/touch/_nuxt/` 路径的图片应直接使用 URL。

---

## 6. AI 搜索就绪度分析（得分：78/100）

这是 costrict.ai **最强的分类**，且相较上次审计有所提升（75→78）。

| 信号               | 状态    | 说明                                                 |
| ------------------ | ------- | ---------------------------------------------------- |
| `llms.txt`         | ✅ 优秀 | 存在且结构完整，包含功能列表、文档、GitHub、联系方式 |
| GPTBot 授权        | ✅ 通过 | robots.txt 中明确允许                                |
| ClaudeBot 授权     | ✅ 通过 | robots.txt 中明确允许                                |
| PerplexityBot 授权 | ✅ 通过 | robots.txt 中明确允许                                |
| SSR 内容可抓取     | ✅ 通过 | AI 引擎可从产品页面提取段落级引用                    |
| 结构化事实         | ✅ 良好 | llms.txt 列出功能、许可证、文档 URL、GitHub          |
| 量化数据           | 🟡 缺失 | 缺少具体数据点（效率提升比例、支持语言数量等）       |
| `llms-full.txt`    | 🔴 缺失 | 无扩展版本以提供更深层的 AI 上下文                   |

**GEO 优势：** 明确的 AI 爬虫授权 + 完善的 `llms.txt` + SSR 内容可抓取，使 costrict.ai 在 AI 引用就绪度上领先大多数同类 SaaS。

---

## 7. 图片优化分析（得分：70/100）

| 检查项       | 状态    | 说明                                               |
| ------------ | ------- | -------------------------------------------------- |
| 图片格式     | ✅ 优秀 | 全部使用 WebP 格式（现代格式）                     |
| 外部图片引用 | ✅ 良好 | 功能截图使用 `/touch/_nuxt/*.webp` 外部 URL        |
| Logo 图片    | 🔴 问题 | Logo 以 base64 内嵌，无法被图片搜索索引            |
| 功能截图 alt | 🔴 问题 | 大量图片 `alt="card img"`，无语义信息              |
| 严格模式截图 | 🔴 问题 | 使用 base64 内嵌，体积大且无法缓存                 |
| 图片尺寸声明 | 🟡 缺失 | 无明确 width/height，存在 CLS 风险                 |
| OG 图片      | 🔴 问题 | 使用 favicon.png（小图标），不符合 1200×630px 规范 |

**alt 文本问题示例：**

```html
<!-- 当前 -->
<img alt="card img" src="/touch/_nuxt/strictMode_feature01.CbWUTYSZ.webp" />

<!-- 建议 -->
<img alt="CoStrict 严格模式 - 项目文档功能，理解业务架构" src="..." />
```

---

## 结论

**核心进展：** SSR 已实现，内容可被搜索引擎和 AI 爬虫抓取，这是最重要的基础改进。评分从 42 提升至 64，进步显著。

**当前核心问题：** `/touch/` 路径疑似为测试/预览路径，与 canonical、sitemap 均不一致，需要明确路径策略。同时缺少 H1 标签、导航链接依赖 JS，以及 base64 内联图片导致性能问题。

**预期影响：** 修复 canonical 问题 + 添加 H1 + 修复导航链接 + 添加 SoftwareApplication Schema 后，评分可从 64 快速提升至 78+。
