import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'src',
  app: {
    baseURL: '/touch/',
  },
  dir: {
    public: '../public',
  },
  ssr: true,

  modules: ['@nuxtjs/i18n'],

  i18n: {
    // ...保持你原有的配置不变...
    locales: [
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'zh',
    strategy: 'no_prefix',
    langDir: '../i18n/locales',
    vueI18n: '../i18n/i18n.config.ts',
    bundle: {
      optimizeTranslationDirective: false,
    },
    detectBrowserLanguage: false,
  },

  hooks: {
    // ...保持你原有的配置不变...
    'pages:extend'(pages) {
      const validPages = pages.filter((page) => page.file?.endsWith('.vue'))
      pages.splice(0, pages.length, ...validPages)
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        'naive-ui',
        'vueuc',
        '@css-render/vue3-ssr',
        'css-render',
        '@juggle/resize-observer',
      ],
    },
    ssr: {
      // 🌟 修改点 1：在这里加入 'vueuc' 🌟
      noExternal: ['naive-ui', 'vueuc', '@css-render/vue3-ssr', 'css-render'],
    },
  },

  css: ['~/styles/tokens.css', '~/index.css'],

  build: {
    // 🌟 修改点 2：在这里加入 'vueuc' (推荐同时加入 '@juggle/resize-observer') 🌟
    transpile: [
      'naive-ui',
      'vueuc',
      'vicons',
      '@css-render/vue3-ssr',
      'css-render',
      '@juggle/resize-observer', // 保险起见加进来
    ],
  },

  nitro: {
    compressPublicAssets: true,
  },
})
