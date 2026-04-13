<template>
  <div
    class="navbar fixed w-full z-1000 flex h-17 px-13 top-0"
    :class="{ 'not-homepage': notHomePage, 'bg-black': isMobile }"
  >
    <!-- Logo -->
    <NavbarLogo />

    <!-- 桌面端导航 -->
    <NavbarMenu v-if="!isMobile" />

    <!-- 移动端菜单 -->
    <MobileMenu
      v-if="isMobile"
      :is-mobile="isMobile"
      :is-menu-open="isMenuOpen"
      :is-lang-menu-open="isLangMenuOpen"
      :is-pricing-page="isPricingPage || isBlogPage"
      @toggle-menu="toggleMenu"
      @close-menu="closeMenu"
      @toggle-lang-menu="toggleLangMenu"
    />

    <!-- 桌面端右侧操作区 -->
    <div v-if="!isMobile" class="flex items-center ml-auto">
      <GithubStars />
      <LanguageSwitcher
        v-model:is-open="isPopoverOpen"
        :is-pricing-page="isPricingPage || isBlogPage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useResponsive } from '@/composables/useResponsive'
import { useMobileMenu } from '@/composables/useMobileMenu'
import NavbarLogo from './navbar/NavbarLogo.vue'
import NavbarMenu from './navbar/NavbarMenu.vue'
import LanguageSwitcher from './navbar/LanguageSwitcher.vue'
import MobileMenu from './navbar/MobileMenu.vue'
import GithubStars from './navbar/GithubStars.vue'

defineOptions({
  name: 'NavbarComponent',
})

const route = useRoute()
const { isMobile } = useResponsive()
const { isMenuOpen, isLangMenuOpen, toggleMenu, closeMenu, toggleLangMenu } = useMobileMenu()

const isPopoverOpen = ref(false)

const notHomePage = computed(() => route.name !== 'index')
const isPricingPage = computed(() => route.name === 'pricing')
const isBlogPage = computed(() => ['blog', 'blog-id'].includes(route.name as string))
</script>

<style lang="less" scoped>
.navbar {
  z-index: var(--z-navbar);
  height: var(--space-16);
  padding-left: var(--space-12);
  padding-right: var(--space-12);
}

.not-homepage {
  background: var(--color-bg-primary);
}

@media (max-width: 967px) {
  .navbar {
    padding-left: var(--space-5);
    padding-right: var(--space-5);
  }
}
</style>
