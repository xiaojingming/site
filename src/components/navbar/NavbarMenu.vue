<template>
  <div class="navbar-menu">
    <template v-for="item in menuOptions" :key="item.key">
      <!-- 外部链接不需要 active 状态 -->
      <a
        v-if="item.external"
        class="menu-item"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ item.label }}
      </a>
      <NuxtLink
        v-else
        class="menu-item"
        :class="{ 'menu-active': isActive(item.key) }"
        :to="item.to"
      >
        {{ item.label }}
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface MenuOption {
  label: string
  key: string
  to?: string
  href?: string
  external?: boolean
}

const { t, locale } = useI18n()
const route = useRoute()

const isEn = computed(() => locale.value === 'en')
const currentRouteName = computed(() => route.name)

const menuOptions = computed<MenuOption[]>(() => [
  { label: t('menu.home'), key: 'home', to: '/' },
  { label: t('menu.download'), key: 'download', to: '/download' },
  ...(isEn.value ? [] : [{ label: t('menu.pricing'), key: 'pricing', to: '/pricing' }]),
  {
    label: t('menu.docs'),
    key: 'docs',
    href: `https://docs.costrict.ai${isEn.value ? '/en' : ''}`,
    external: true,
  },
  ...(isEn.value ? [] : [{ label: t('menu.blog'), key: 'blog', to: '/blog' }]),
  { label: t('menu.operation'), key: 'operation', to: '/operation' },
])

const isActive = (key: string) => {
  if (key === 'blog') {
    return currentRouteName.value === 'blog' || currentRouteName.value === 'blog-id'
  }
  if (key === 'home') {
    return currentRouteName.value === 'index'
  }
  return currentRouteName.value === key
}
</script>

<style lang="less" scoped>
.navbar-menu {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--radius-xl);
  background: var(--color-bg-secondary);
  backdrop-filter: var(--blur-lg);
  height: var(--space-12);

  .menu-item {
    padding: 0 var(--space-5);
    color: var(--color-text-link);
    cursor: pointer;
    text-align: center;
    white-space: nowrap;

    &:hover {
      color: var(--color-text-primary);
    }

    &.menu-active {
      color: var(--color-text-primary);
    }
  }
}
</style>
