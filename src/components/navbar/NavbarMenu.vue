<template>
  <div class="navbar-menu">
    <template v-for="item in menuOptions" :key="item.key">
      <!-- 产品下拉菜单：插入在「首页」与「下载安装」之间 -->
      <ProductMenu v-if="item.key === 'product'" />
      <a
        v-else
        class="menu-item"
        :class="{ 'menu-active': isActive(item.key) }"
        :href="getHref(item.key)"
        :target="getTarget(item.key)"
        @click="handleClick(item.key, $event)"
      >
        {{ item.label }}
      </a>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ProductMenu from './ProductMenu.vue'

interface MenuOption {
  label: string
  key: string
}

const { t, locale } = useI18n()
const router = useRouter()

const isEn = computed(() => locale.value === 'en')
const currentRouteName = computed(() => router.currentRoute.value.name)

const menuOptions = computed<MenuOption[]>(() => [
  { label: t('menu.home'), key: 'home' },
  { label: t('menu.product'), key: 'product' },
  { label: t('menu.download'), key: 'download' },
  ...(isEn.value ? [] : [{ label: t('menu.pricing'), key: 'pricing' }]),
  // { label: t('menu.installGuide'), key: 'install' },
  { label: t('menu.docs'), key: 'docs' },
  ...(isEn.value ? [] : [{ label: t('menu.blog'), key: 'blog' }]),
  { label: t('menu.operation'), key: 'operation' },
])

const isActive = (key: string) => {
  if (key === 'blog') {
    return currentRouteName.value === 'blog' || currentRouteName.value === 'blogDetail'
  }
  if (key === 'operation') {
    return currentRouteName.value === 'operation' || currentRouteName.value === 'ccfCompetition'
  }
  return currentRouteName.value === key
}

const getHref = (key: string) => {
  if (key === 'docs') {
    return `https://docs.costrict.ai${isEn.value ? '/en' : ''}`
  } else if (key === 'install') {
    return `https://docs.costrict.ai${isEn.value ? '/en' : ''}/deployment/introduction/`
  }
  return '#'
}

const getTarget = (key: string) => {
  if (key === 'docs' || key === 'install') {
    return '_blank'
  }
  return undefined
}

const handleClick = (key: string, event: MouseEvent) => {
  if (key === 'docs' || key === 'install') {
    return
  }
  event.preventDefault()
  router.push({ name: key })
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
