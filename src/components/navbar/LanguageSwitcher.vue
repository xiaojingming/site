<template>
  <n-popover
    v-if="!isPricingPage"
    trigger="click"
    :show="isOpen"
    @update:show="$emit('update:isOpen', $event)"
    :show-arrow="false"
    style="padding: 0"
    placement="bottom-end"
  >
    <template #trigger>
      <div class="language-trigger">
        {{ currentLangLabel }}
        <span class="arrow ml-2" :class="{ 'arrow-up': isOpen }">▼</span>
      </div>
    </template>
    <div class="language-menu">
      <div
        v-for="option in languageOptions"
        :key="option.key"
        class="language-option"
        :class="{ 'lang-active': locale === option.key }"
        @click="handleSelect(option.key)"
      >
        {{ option.label }}
      </div>
    </div>
  </n-popover>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NPopover } from 'naive-ui'
import { setStoredLanguage } from '@/utils/language'

interface Props {
  isOpen: boolean
  isPricingPage: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
}>()

const { locale, setLocale } = useI18n()
const route = useRoute()

const languageOptions = [
  { label: '中文', key: 'zh' },
  { label: 'English', key: 'en' },
]

const currentLangLabel = computed(() => {
  return (
    languageOptions.find((item) => item.key === locale.value)?.label || languageOptions[0].label
  )
})

const handleSelect = async (key: string) => {
  await setLocale(key as 'zh' | 'en')
  setStoredLanguage(key)
  if (key === 'en' && route.name === 'pricing') {
    navigateTo('/')
  }
  emit('update:isOpen', false)
}
</script>

<style lang="less" scoped>
.language-trigger {
  padding: var(--space-1) var(--space-2);
  color: var(--color-text-primary);
  cursor: pointer;
  font-size: var(--font-sm);
  display: flex;
  align-items: center;
  border-radius: var(--radius-sm);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.arrow {
  transition: transform var(--transition-fast);

  &.arrow-up {
    transform: rotate(180deg);
  }
}

.language-menu {
  width: 200px;
}

.language-option {
  padding: var(--space-2) var(--space-3);
  color: var(--color-text-primary);
  background: var(--color-menu-bg);
  cursor: pointer;

  &:hover {
    background: var(--color-menu-hover);
  }

  &.lang-active {
    color: var(--color-text-primary);
    font-weight: var(--font-medium);
  }
}
</style>
