export default defineNuxtRouteMiddleware((to) => {
  const localeVisible = to.meta.localeVisible as string[] | undefined
  if (!localeVisible) return

  // 在 middleware 中通过 nuxtApp 获取 i18n locale
  // @nuxtjs/i18n 将 $i18n 注入到 nuxtApp
  const nuxtApp = useNuxtApp()
  const locale = (nuxtApp.$i18n as { locale: { value: string } }).locale.value

  if (!localeVisible.includes(locale)) {
    return navigateTo('/')
  }
})
