<template>
  <div v-if="isMobile" class="ml-auto flex items-center">
    <!-- 汉堡菜单 -->
    <div class="flex items-center">
      <div class="hamburger-menu" :class="{ active: isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- 移动端侧边菜单 -->
    <div class="mobile-menu" :class="{ open: isMenuOpen }">
      <div class="mobile-menu-header">
        <div class="close-menu" @click="closeMenu">×</div>
      </div>

      <div class="mobile-menu-items">
        <div
          v-for="item in menuOptions"
          :key="item.key"
          class="mobile-menu-item"
          :class="{ 'menu-active': isActive(item.key) }"
          @click="handleMenuClick(item.key)"
        >
          {{ item.label }}
        </div>

        <!-- 语言切换选项 -->
        <div v-if="!isPricingPage" class="mobile-menu-item lang-item" @click="toggleLangMenu">
          {{ currentLangLabel }}
          <span class="lang-arrow" :class="{ 'lang-arrow-up': isLangMenuOpen }">▼</span>
        </div>

        <!-- 语言切换子菜单 -->
        <div v-if="isLangMenuOpen && !isPricingPage" class="mobile-lang-submenu">
          <div
            v-for="option in languageOptions"
            :key="option.key"
            class="mobile-lang-subitem"
            :class="{ 'lang-active': locale === option.key }"
            @click="handleLangSelect(option.key)"
          >
            {{ option.label }}
          </div>
        </div>

        <!-- GitHub star 数量 -->
        <div class="mobile-menu-item github-item" @click="openGithub">
          <GithubStars />
        </div>
      </div>
    </div>

    <!-- 移动端遮罩层 -->
    <div class="mobile-menu-overlay" :class="{ open: isMenuOpen }" @click="closeMenu"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { setStoredLanguage } from '@/utils/language'
import GithubStars from './GithubStars.vue'

interface MenuOption {
  label: string
  key: string
}

interface Props {
  isMobile: boolean
  isMenuOpen: boolean
  isLangMenuOpen: boolean
  isPricingPage: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggleMenu'): void
  (e: 'closeMenu'): void
  (e: 'toggleLangMenu'): void
}>()

const { t, locale } = useI18n()
const router = useRouter()

const isEn = computed(() => locale.value === 'en')
const currentRouteName = computed(() => router.currentRoute.value.name)

const languageOptions = [
  { label: '中文', key: 'zh' },
  { label: 'English', key: 'en' },
]

const currentLangLabel = computed(() => {
  return (
    languageOptions.find((item) => item.key === locale.value)?.label || languageOptions[0].label
  )
})

const menuOptions = computed<MenuOption[]>(() => [
  { label: t('menu.home'), key: 'home' },
  { label: t('menu.download'), key: 'download' },
  ...(isEn.value ? [] : [{ label: t('menu.pricing'), key: 'pricing' }]),
  // ...(isEn.value ? [] : [{ label: t('menu.blog'), key: 'blog' }]),
  // { label: t('menu.installGuide'), key: 'install' },
  { label: t('menu.docs'), key: 'docs' },
  ...(isEn.value ? [] : [{ label: t('menu.blog'), key: 'blog' }]),
  { label: t('menu.operation'), key: 'operation' },
])

const isActive = (key: string) => currentRouteName.value === key

const handleMenuClick = (key: string) => {
  if (key === 'oss') {
    window.open('https://github.com/zgsm-ai/costrict')
  } else if (key === 'docs') {
    const url = `https://docs.costrict.ai${isEn.value ? '/en' : ''}`
    window.open(url)
  } else if (key === 'install') {
    const url = `https://docs.costrict.ai${isEn.value ? '/en' : ''}/deployment/introduction/`
    window.open(url)
  } else {
    router.push({ name: key })
  }
  emit('closeMenu')
}

const handleLangSelect = (key: string) => {
  locale.value = key
  setStoredLanguage(key)
  if (key === 'en' && router.currentRoute.value.name === 'pricing') {
    router.push({ name: 'home' })
  }
  emit('toggleLangMenu')
}

const openGithub = () => {
  window.open('https://github.com/zgsm-ai/costrict')
  emit('closeMenu')
}

const toggleMenu = () => emit('toggleMenu')
const closeMenu = () => emit('closeMenu')
const toggleLangMenu = () => emit('toggleLangMenu')
</script>

<style lang="less" scoped>
.hamburger-menu {
  width: 24px;
  height: 18px;
  position: relative;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: var(--color-text-primary);
    border-radius: var(--radius-sm);
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: var(--transition-base);

    &:nth-child(1) {
      top: 0px;
    }

    &:nth-child(2) {
      top: 8px;
    }

    &:nth-child(3) {
      top: 16px;
    }
  }

  &.active {
    span {
      &:nth-child(1) {
        top: 8px;
        transform: rotate(135deg);
      }

      &:nth-child(2) {
        opacity: 0;
        left: -60px;
      }

      &:nth-child(3) {
        top: 8px;
        transform: rotate(-135deg);
      }
    }
  }
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background: var(--color-bg-tertiary);
  backdrop-filter: var(--blur-md);
  z-index: var(--z-overlay);
  transition: right var(--transition-slow);
  display: flex;
  flex-direction: column;

  &.open {
    right: 0;
  }

  .mobile-menu-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: var(--space-4) var(--space-5);
    border-bottom: 1px solid var(--color-border);

    .close-menu {
      font-size: var(--font-2xl);
      color: var(--color-text-primary);
      cursor: pointer;
      line-height: 1;
    }
  }

  .mobile-menu-items {
    flex: 1;
    padding: var(--space-5) 0;

    .mobile-menu-item {
      padding: var(--space-4) var(--space-5);
      color: var(--color-text-link);
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        color: var(--color-text-primary);
        background: rgba(255, 255, 255, 0.1);
      }

      &.menu-active {
        color: var(--color-text-primary);
        background: rgba(25, 125, 255, 0.2);
      }
    }
  }
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-bg-overlay);
  z-index: var(--z-navbar);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-slow);

  &.open {
    opacity: 1;
    visibility: visible;
  }
}

.lang-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .lang-arrow {
    font-size: var(--font-xs);
    transition: transform var(--transition-fast);

    &.lang-arrow-up {
      transform: rotate(180deg);
    }
  }
}

.mobile-lang-submenu {
  background: rgba(0, 0, 0, 0.3);
  margin: 0 var(--space-5);
  border-radius: var(--radius-md);
  overflow: hidden;

  .mobile-lang-subitem {
    padding: var(--space-3) var(--space-4);
    color: var(--color-text-link);
    cursor: pointer;
    transition: all var(--transition-fast);

    &:hover {
      color: var(--color-text-primary);
      background: rgba(255, 255, 255, 0.1);
    }

    &:first-child {
      border-radius: var(--radius-md) var(--radius-md) 0 0;
    }

    &:last-child {
      border-radius: 0 0 var(--radius-md) var(--radius-md);
    }

    &.lang-active {
      color: var(--color-text-primary);
      background: rgba(25, 125, 255, 0.2);
    }
  }
}

.github-item {
  padding: var(--space-4) var(--space-5);

  :deep(.github-icon) {
    margin: 0;
    opacity: 1;
    color: var(--color-text-link);
    justify-content: flex-start;
    width: 100%;

    &:hover {
      color: var(--color-text-primary);
    }

    .star-count {
      opacity: 1;
    }
  }
}
</style>
