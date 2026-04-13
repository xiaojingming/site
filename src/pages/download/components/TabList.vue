<script setup lang="ts">
import type { TabType } from '../types'

defineOptions({
  name: 'TabList',
})

interface TabItem {
  key: TabType
  imgUrl: string
}

defineProps<{
  tabs: TabItem[]
  activeTab: TabType
}>()

const emit = defineEmits<{
  (e: 'select', tab: TabType): void
}>()

const handleTabClick = (tabKey: TabType) => {
  emit('select', tabKey)
}
</script>

<template>
  <div class="tab-list">
    <div
      v-for="tab in tabs"
      :key="tab.key"
      class="tab-item"
      :class="{ active: activeTab === tab.key }"
      @click="handleTabClick(tab.key)"
    >
      <img :src="tab.imgUrl" :alt="tab.key" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.tab-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .tab-item {
    margin-right: 12px;
    cursor: pointer;
    border-radius: 8px;
    padding: 8px;
    transition: all 0.3s ease;
  }
}
</style>
