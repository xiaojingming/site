# 变更：add-blog-feature

## 原因

企业官网需要新增"博客"功能模块，展示技术文章、实践案例与深度解析，提升品牌影响力和用户粘性。

## 变更内容

- 创建博客页面组件（src/views/blog/index.vue），实现文章列表展示、分类筛选、分页功能
- 添加博客路由配置，设置仅中文环境可见（meta.localeVisible: ['zh']）
- 在导航栏菜单中添加"博客"菜单项（仅中文显示）
- 创建博客数据管理模块（src/views/blog/useBlogData.ts），包含mock数据和业务逻辑
- 添加博客相关的i18n翻译（src/locales/zh.json）
- 创建博客子组件：BlogCard.vue（文章卡片）、BlogSidebar.vue（侧边栏）、BlogPagination.vue（分页）
- 实现响应式设计，支持移动端适配
- 使用Tailwind CSS + Less实现与官网一致的暗色主题风格

## 影响

- **受影响的规范**：导航菜单、路由配置、国际化
- **受影响的代码**：
  - `src/router/index.ts`: 添加博客路由配置
  - `src/components/navbar/NavbarMenu.vue`: 添加博客菜单项
  - `src/components/navbar/MobileMenu.vue`: 添加博客菜单项
  - `src/locales/zh.json`: 添加博客相关翻译键
  - `src/views/blog/`: 新增博客页面及子组件目录
