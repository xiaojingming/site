import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/locales'
import { createPrefetchableRoute, prefetchRoutes } from './prefetch'

// 创建可预取的路由加载器
const homeRoute = createPrefetchableRoute(() => import('@/views/home/index.vue'))
const downloadRoute = createPrefetchableRoute(() => import('@/views/download/index.vue'))
const pricingRoute = createPrefetchableRoute(() => import('@/views/pricing/PricingPage.vue'))
const operationRoute = createPrefetchableRoute(() => import('@/views/operation/OperationPage.vue'))
const resourceRoute = createPrefetchableRoute(() => import('@/views/resourceCalculator/index.vue'))
const blogRoute = createPrefetchableRoute(() => import('@/views/blog/index.vue'))
const blogDetailRoute = createPrefetchableRoute(() => import('@/views/blog/BlogDetail.vue'))

// 静态路由配置 - 不再动态增删
export const routes = [
  {
    path: '/',
    name: 'home',
    component: homeRoute.load,
  },
  {
    path: '/download',
    name: 'download',
    component: downloadRoute.load,
  },
  {
    path: '/resource',
    name: 'resource',
    component: resourceRoute.load,
  },
  {
    path: '/operation',
    name: 'operation',
    component: operationRoute.load,
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: pricingRoute.load,
    meta: {
      // 标记此路由仅在中文环境显示
      localeVisible: ['zh'],
    },
  },
  {
    path: '/blog',
    name: 'blog',
    component: blogRoute.load,
    meta: {
      localeVisible: ['zh'],
    },
  },
  {
    path: '/blog/:id',
    name: 'blogDetail',
    component: blogDetailRoute.load,
    meta: {
      localeVisible: ['zh'],
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// 导航守卫：检查路由的语言可见性
router.beforeEach((to, from, next) => {
  const currentLocale = i18n.global.locale.value
  const allowedLocales = to.meta.localeVisible as string[] | undefined

  if (allowedLocales && !allowedLocales.includes(currentLocale)) {
    next({ name: 'home' })
  } else {
    next()
  }
})

// 初始化时预加载关键路由（在浏览器空闲时）
if (typeof window !== 'undefined') {
  router.isReady().then(() => {
    const currentLocale = i18n.global.locale.value
    const criticalRoutes = [
      downloadRoute.prefetch,
      operationRoute.prefetch,
      // 仅在中文环境预加载价格页面和博客页面
      ...(currentLocale === 'zh'
        ? [pricingRoute.prefetch, blogRoute.prefetch, blogDetailRoute.prefetch]
        : []),
    ]

    // 延迟 1 秒后开始预加载，确保首屏已完成
    setTimeout(() => {
      prefetchRoutes(criticalRoutes, { idle: true, delay: 500 })
    }, 1000)
  })
}

export default router
