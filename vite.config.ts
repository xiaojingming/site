import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'
// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 9002,
  },
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['naive-ui'],
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // @vitejs/plugin-vue 的 _export_sfc 辅助虚拟模块统一归入 vue chunk，
          // 防止被 Rollup 分散到某个页面 chunk 中，导致其他页面 chunk 导入时触发 TDZ 错误
          if (id.includes('plugin-vue:export-helper') || id.includes('plugin-vue/export-helper')) {
            return 'vue'
          }

          // 将 Naive UI 相关代码分离到单独的 chunk
          if (id.includes('naive-ui')) {
            return 'naive-ui'
          }

          // Vue 核心库
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue')) {
            return 'vue'
          }

          // Vue Router 和 I18n
          if (id.includes('vue-router') || id.includes('vue-i18n')) {
            return 'vue-libs'
          }

          // 按页面分包 - 关键页面独立打包
          if (id.includes('/views/home/')) {
            return 'page-home'
          }
          if (id.includes('/views/download/')) {
            return 'page-download'
          }
          if (id.includes('/views/pricing/')) {
            return 'page-pricing'
          }
          if (id.includes('/views/operation/')) {
            return 'page-operation'
          }
          if (id.includes('/views/blog/')) {
            return 'page-blog'
          }

          // 其他 node_modules 依赖分离到 vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        assetFileNames: (assetInfo) => {
          // Rollup v4+: names / originalFileNames 推荐使用
          const nameFromNames = Array.isArray(assetInfo.names) && assetInfo.names[0]
          const nameFromOriginals =
            Array.isArray(assetInfo.originalFileNames) && assetInfo.originalFileNames[0]
          // 兼容旧 Rollup（如果没有上面的字段再用单数 getter）
          const fallbackName = assetInfo.name ?? assetInfo.originalFileName ?? ''

          const originalName = nameFromNames || nameFromOriginals || fallbackName || 'asset'
          const ext = originalName.split('.').pop() || 'asset'

          if (/\.(png|jpe?g|gif|svg|webp)$/.test('.' + ext)) {
            return `assets/images/[name]-[hash][extname]`
          }

          if (ext === 'css') {
            return `css/[name]-[hash][extname]`
          }

          if (/(woff2?|ttf|otf)$/.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`
          }

          if (/mp4|webm/.test(ext)) return 'video/[name]-[hash][extname]'

          return `assets/[name]-[hash][extname]`
        },

        chunkFileNames: `chunks/[name]-[hash].js`,
        entryFileNames: `js/[name]-[hash].js`,
      },
    },
    // 启用 CSS 代码分割
    cssCodeSplit: true,
  },
})
