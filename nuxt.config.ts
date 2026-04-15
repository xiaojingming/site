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

  modules: ['@nuxtjs/i18n', '@nuxt/image'],

  image: {
    provider: 'ipx',
    quality: 85,
    dir: 'assets',
    ipx: {
      baseURL: '/_ipx',
    },
  },

  i18n: {
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
      noExternal: ['naive-ui', 'vueuc', '@css-render/vue3-ssr', 'css-render'],
    },
  },

  css: ['~/styles/tokens.css', '~/index.css'],

  build: {
    transpile: [
      'naive-ui',
      'vueuc',
      'vicons',
      '@css-render/vue3-ssr',
      'css-render',
      '@juggle/resize-observer',
    ],
  },

  nitro: {
    compressPublicAssets: true,
  },
})
