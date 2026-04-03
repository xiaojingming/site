<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { BlogCategory } from '../useBlogData'

// Props
interface Props {
  categories: BlogCategory[]
  currentCategory: string
  categoryCounts: Record<string, number>
}

defineProps<Props>()

// Emits
const emit = defineEmits<{
  (e: 'category-change', categoryId: string): void
}>()

// Composables
const { t } = useI18n()

// Handle category click
const handleCategoryClick = (categoryId: string): void => {
  emit('category-change', categoryId)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-title">{{ t('blog.sidebarTitle') }}</div>
    <nav class="sidebar-nav">
      <div
        v-for="category in categories"
        :key="category.id"
        class="sidebar-item"
        :class="{ active: currentCategory === category.id }"
        @click="handleCategoryClick(category.id)"
      >
        <span class="icon">{{ category.icon }}</span>
        <span>{{ category.name }}</span>
        <span class="count">{{ categoryCounts[category.id] || 0 }}</span>
      </div>
    </nav>
  </aside>
</template>

<style lang="less" scoped>
.sidebar {
  width: 220px;
  flex-shrink: 0;
  position: sticky;
  top: 96px;
  align-self: flex-start;
  height: fit-content;
}

.sidebar-title {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
  padding-left: 16px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    color: #ffffff;
    background: rgba(0, 102, 255, 0.12);
    border-color: rgba(0, 102, 255, 0.25);
  }

  .icon {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    flex-shrink: 0;
  }

  &.active .icon {
    opacity: 1;
  }

  .count {
    margin-left: auto;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.06);
    padding: 2px 8px;
    border-radius: 10px;
  }
}
</style>
