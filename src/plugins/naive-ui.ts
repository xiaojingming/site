import { setup } from '@css-render/vue3-ssr'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) {
    const { collect } = setup(nuxtApp.vueApp)
    if (!nuxtApp.ssrContext) return
    const originalRenderMeta = nuxtApp.ssrContext.renderMeta as
      | (() => Promise<Record<string, unknown>>)
      | undefined
    nuxtApp.ssrContext.renderMeta = async () => {
      const renderedMeta = (await originalRenderMeta?.()) || {}
      return {
        ...renderedMeta,
        headTags: ((renderedMeta as Record<string, unknown>).headTags || '') + collect(),
      }
    }
  }
})
