## 实施

- [x] 1.1 创建博客数据管理模块
      【目标对象】`src/views/blog/useBlogData.ts`
      【修改目的】管理博客数据、分类、分页逻辑
      【修改方式】创建新的composable
      【相关依赖】无
      【修改内容】- 定义 BlogArticle、BlogCategory 等类型接口 - 创建 mock 数据（参考 origin/blog.html 中的 24 篇文章）- 实现分类筛选逻辑：根据 selectedCategory 过滤文章列表 - 实现分页逻辑：根据 currentPage 和 pageSize 计算当前页文章 - 导出 useBlogData 函数，返回 articles、categories、currentPage、totalPages 等状态和方法

- [x] 1.2 创建博客卡片组件
      【目标对象】`src/views/blog/components/BlogCard.vue`
      【修改目的】展示单篇博客文章卡片
      【修改方式】创建新的Vue组件
      【相关依赖】无
      【修改内容】- 定义 Props 接口（article: BlogArticle）- 实现卡片 UI：封面图片、分类标签、标题、摘要、发布日期 - 使用 Tailwind CSS + Less 实现暗色主题样式 - 实现 hover 效果（卡片上浮、阴影增强）- 添加点击事件，emit 'click' 事件传递文章 ID

- [x] 1.3 创建博客侧边栏组件
      【目标对象】`src/views/blog/components/BlogSidebar.vue`
      【修改目的】展示博客分类导航
      【修改方式】创建新的Vue组件
      【相关依赖】`src/views/blog/useBlogData.ts`
      【修改内容】- 接收 categories 和 currentCategory 作为 props - 实现分类列表 UI：分类图标、分类名称、文章数量 - 实现点击切换分类事件：emit 'category-change' 事件传递分类 key - 高亮显示当前选中的分类 - 使用 Tailwind CSS + Less 实现暗色主题样式

- [x] 1.4 创建博客分页组件
      【目标对象】`src/views/blog/components/BlogPagination.vue`
      【修改目的】实现分页导航
      【修改方式】创建新的Vue组件
      【相关依赖】无
      【修改内容】- 接收 currentPage、totalPages、total 作为 props - 实现分页 UI：上一页按钮、页码列表（含省略号）、下一页按钮、文章总数显示 - 实现页码切换事件：emit 'page-change' 事件传递页码 - 处理边界情况：第一页禁用上一页、最后一页禁用下一页 - 使用 Tailwind CSS + Less 实现暗色主题样式

- [x] 1.5 创建博客主页面组件
      【目标对象】`src/views/blog/index.vue`
      【修改目的】博客页面主入口，组合子组件
      【修改方式】创建新的Vue组件
      【相关依赖】`src/views/blog/useBlogData.ts`、`src/hooks/useResponsive.ts`、`src/views/blog/components/*`
      【修改内容】- 导入 useBlogData 管理数据和状态 - 导入 useResponsive 获取 isMobile 状态 - 定义响应式布局：桌面端（侧边栏 + 主内容）、移动端（仅主内容）- 使用 v-if/v-else 根据 isMobile 切换布局 - 桌面端布局：左侧 BlogSidebar（固定宽度），右侧 BlogCard 列表 + BlogPagination - 移动端布局：顶部 BlogSidebar（横向滚动），下方 BlogCard 列表 + BlogPagination - 使用 Tailwind CSS + Less 实现暗色主题样式和响应式布局

- [x] 1.6 添加博客路由配置
      【目标对象】`src/router/index.ts`
      【修改目的】添加博客页面路由
      【修改方式】在 routes 数组中添加新路由，在 pricing 路由之后、404 路由之前
      【相关依赖】`src/views/blog/index.vue`
      【修改内容】- 使用 createPrefetchableRoute 创建博客路由：const blogRoute = createPrefetchableRoute(() => import('@/views/blog/index.vue')) - 在 routes 数组中添加博客路由配置，位置在 pricing 路由之后 - 设置 path 为 '/blog'，name 为 'blog' - 设置 meta.localeVisible: ['zh']（仅中文显示）- 在 criticalRoutes 数组中添加 blogRoute.prefetch（仅在中文环境预加载）- 路由守卫已自动处理语言可见性检查，无需额外修改

- [x] 1.7 更新桌面端导航菜单
      【目标对象】`src/components/navbar/NavbarMenu.vue`
      【修改目的】添加博客菜单项（仅中文）
      【修改方式】在 menuOptions computed 数组中添加博客项，位置在 pricing 之后、installGuide 之前
      【相关依赖】无
      【修改内容】- 在 menuOptions 数组中添加博客菜单项：...(isEn.value ? [] : [{ label: t('menu.pricing'), key: 'pricing' }]) 后添加 ...(isEn.value ? [] : [{ label: t('menu.blog'), key: 'blog' }]) - handleClick 方法已支持所有路由跳转，无需额外修改

- [x] 1.8 更新移动端导航菜单
      【目标对象】`src/components/navbar/MobileMenu.vue`
      【修改目的】添加博客菜单项（仅中文）
      【修改方式】在 menuOptions computed 数组中添加博客项，位置在 pricing 之后、installGuide 之前
      【相关依赖】无
      【修改内容】- 在 menuOptions 数组中添加博客菜单项：...(isEn.value ? [] : [{ label: t('menu.pricing'), key: 'pricing' }]) 后添加 ...(isEn.value ? [] : [{ label: t('menu.blog'), key: 'blog' }]) - handleMenuClick 方法已支持所有路由跳转，无需额外修改

- [x] 1.9 添加博客国际化翻译
      【目标对象】`src/locales/zh.json`
      【修改目的】添加博客相关的中文翻译
      【修改方式】在 menu 对象中添加 blog 键，在根级别添加 blog 对象
      【相关依赖】无
      【修改内容】- 在 menu 对象中添加：blog: "博客" - 在根级别添加 blog 对象，包含以下翻译键：- categories.all: "最新文章" - categories.tech: "技术进展" - categories.case: "实践案例" - categories.deep: "深度解析" - categories.oss: "开源社区" - readMore: "阅读全文" - noArticles: "暂无该栏目的文章，敬请期待" - pagination.total: "第 {start}-{end} 篇，共 {total} 篇"
