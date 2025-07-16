<template>
  <div class="navbar fixed top-0 left-0 right-0 z-1000 flex h-[68px] px-[52px]"
    :class="{ 'not-homepage': notHomePage }">
    <div class="flex items-center h-[68px] cursor-pointer" @click="toHome">
      <img class="w-[28px] mr-3" src="@/assets/logo.png" />
      <div class="text-[#F4F8FF] text-base">{{ t('header.appName') }}</div>
    </div>
    <div class="flex items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 navbar-menu">
      <div class="px-5 text-[#c3defa] cursor-pointer text-center hover:text-white" v-for="item in menuOptions"
        :key="item.key" @click="handleMenuItemClick(item.key)">
        {{ item.label }}
      </div>
    </div>
    <div class="flex items-center ml-auto">
      <n-popover trigger="click" :show="isPopoverOpen" @update:show="isPopoverOpen = $event" :show-arrow="false"
        style="padding: 0" placement="bottom-end">
        <template #trigger>
          <div class="px-2 py-1 text-white cursor-pointer text-sm flex items-center hover:bg-white/10 hover:rounded">
            {{ currentLangLabel }}
            <span class="arrow ml-2" :class="{ 'arrow-up': isPopoverOpen }">▼</span>
          </div>
        </template>
        <div class="w-[200px]">
          <div v-for="option in languageOptions" :key="option.key"
            class="px-3 py-[10px] cursor-pointer text-white bg-[#004093] hover:bg-[#197dff]"
            :class="{ 'lang-active': locale === option.key }" @click="handleSelectLang(option.key)">
            {{ option.label }}
          </div>
        </div>
      </n-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { NPopover } from 'naive-ui'
// 定义组件名称为多词以符合 Vue 规范
defineOptions({
  name: 'NavbarComponent',
})
const { t, locale } = useI18n()
const router = useRouter()

interface MenuOption {
  label: string // This will now hold the translated string
  key: string
}

const menuOptions = computed<MenuOption[]>(() => [
  {
    label: t('menu.home'),
    key: 'home',
  },
  {
    label: t('menu.openSource'),
    key: 'oss',
  },
  {
    label: t('menu.installGuide'),
    key: 'download',
  },
])
const handleMenuItemClick = (key: string) => {
  if (key === 'oss') {
    window.open('https://github.com/zgsm-ai/costrict')
    return
  }
  router.push({ name: key })
}

const languageOptions = ref([
  { label: '中文', key: 'zh' },
  { label: 'English', key: 'en' },
])
const isPopoverOpen = ref(false)

const currentLangLabel = computed(() => {
  return (
    languageOptions.value.find((item) => item.key === locale.value)?.label ||
    languageOptions.value[0].label
  )
})
const handleSelectLang = (key: string) => {
  locale.value = key
  isPopoverOpen.value = false
}

const notHomePage = computed(() => {
  return router.currentRoute.value.name !== 'home'
})

const toHome = () => {
  router.push({ name: 'home' })
}
</script>

<style lang="less" scoped>
.lang-active {
  color: #fff;
}

.arrow {
  transition: transform 0.2s ease;

  &.arrow-up {
    transform: rotate(180deg);
  }
}

.not-homepage {
  background: #000;
}

.navbar-menu {
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(50px);
  height: 48px;
}
</style>
