# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## 项目特殊配置

- **固定宽度设计**: 项目使用 1905px 固定宽度设计，通过 `useScalePage` hook 进行缩放适配
- **缩放机制**: App.vue 中使用 `useScalePage({ width: 1905, height: 'auto' })` 实现页面缩放
- **样式系统**: 使用 TailwindCSS v4 + Less，组件内部使用 scoped 样式
- **多语言**: 使用 vue-i18n，默认中文，备用英文，Composition API 模式

## 构建命令

```bash
# 开发服务器（带 host 参数）
pnpm dev

# 类型检查 + 构建
pnpm build

# 仅构建（跳过类型检查）
pnpm build-only

# 类型检查
pnpm type-check

# ESLint 修复
pnpm lint

# Prettier 格式化
pnpm format
```

## 代码规范

- **组件命名**: 使用 `defineOptions({ name: 'ComponentName' })` 定义组件名
- **导入别名**: `@` 指向 `src` 目录
- **样式**: 优先使用 TailwindCSS，复杂样式使用 Less + scoped
- **国际化**: 模板中使用 `{{ t('key') }}`，setup 中使用 `const { t } = useI18n()`

## 项目特殊模式

- **页面布局**: 主容器固定 1300px 宽度居中，外层使用缩放适配
- **资源路径**: 静态资源使用 `@/assets/` 导入，public 资源直接引用
- **路由**: 使用 createWebHistory，懒加载组件
- **状态管理**: 使用 Pinia

## 关键文件

- `src/hooks/use_scale.ts`: 页面缩放适配核心逻辑
- `src/locales/`: 多语言配置文件
- `src/views/home/`: 主页各功能模块组件