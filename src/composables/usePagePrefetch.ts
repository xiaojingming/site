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
      // @ts-expect-error nuxt page module not resolvable by TS
      import('../pages/download/index.vue').catch(() => {})
      // @ts-expect-error nuxt page module not resolvable by TS
      import('../pages/pricing/index.vue').catch(() => {})
      // @ts-expect-error nuxt page module not resolvable by TS
      import('../pages/blog/index.vue').catch(() => {})
      // @ts-expect-error nuxt page module not resolvable by TS
      import('../pages/operation/index.vue').catch(() => {})
      // @ts-expect-error nuxt page module not resolvable by TS
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
