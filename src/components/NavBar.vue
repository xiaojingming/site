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
      :is-zh-only-page="isPricingPage || isBlogPage"
      :is-ccf-competition-page="isCcfCompetitionPage"
      @toggle-menu="toggleMenu"
      @close-menu="closeMenu"
      @toggle-lang-menu="toggleLangMenu"
    />

    <!-- 桌面端右侧操作区 -->
    <div v-if="!isMobile" class="flex items-center ml-auto">
      <GithubStars />
      <LanguageSwitcher
        :is-open="isLanguageSwitcherOpen"
        @update:is-open="handleLanguageSwitcherUpdate"
        :is-pricing-page="isPricingPage || isBlogPage"
        :is-ccf-competition-page="isCcfCompetitionPage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useResponsive } from '@/hooks/useResponsive'
import { useMobileMenu } from '@/hooks/useMobileMenu'
import NavbarLogo from './navbar/NavbarLogo.vue'
import NavbarMenu from './navbar/NavbarMenu.vue'
import LanguageSwitcher from './navbar/LanguageSwitcher.vue'
import MobileMenu from './navbar/MobileMenu.vue'
import GithubStars from './navbar/GithubStars.vue'

defineOptions({
  name: 'NavbarComponent',
})

const router = useRouter()
const { isMobile } = useResponsive(959)
const { isMenuOpen, isLangMenuOpen, toggleMenu, closeMenu, toggleLangMenu } = useMobileMenu()

const isLanguageSwitcherOpen = ref(false)

const notHomePage = computed(() => router.currentRoute.value.name !== 'home')
const isPricingPage = computed(() => router.currentRoute.value.name === 'pricing')
const isBlogPage = computed(() =>
  ['blog', 'blogDetail'].includes(router.currentRoute.value.name as string),
)
const isCcfCompetitionPage = computed(() => router.currentRoute.value.name === 'ccfCompetition')

const handleLanguageSwitcherUpdate = (value: boolean) => {
  isLanguageSwitcherOpen.value = value
}
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

@media (max-width: 959px) {
  .navbar {
    padding-left: var(--space-5);
    padding-right: var(--space-5);
  }
}
</style>
