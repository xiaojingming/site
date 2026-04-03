<script setup lang="ts">
import { computed } from 'vue'
import { withDefaults } from 'vue'
import { useI18n } from 'vue-i18n'

// Props
interface Props {
  currentPage: number
  totalPages: number
  total: number
  pageSize: number
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 12,
})

// Composables
const { t } = useI18n()

// Emits
const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

// Handle page click
const handlePageClick = (page: number): void => {
  emit('page-change', page)
}

// Generate page numbers with ellipsis
const generatePageNumbers = (current: number, total: number): (number | string)[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | string)[] = []
  pages.push(1)

  if (current > 3) {
    pages.push('...')
  }

  const rangeStart = Math.max(2, current - 1)
  const rangeEnd = Math.min(total - 1, current + 1)

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push('...')
  }

  pages.push(total)

  return pages
}

// Computed page numbers
const pageNumbers = computed(() => {
  return generatePageNumbers(props.currentPage, props.totalPages)
})

// Computed pagination info text
const paginationInfo = computed(() => {
  const start = (props.currentPage - 1) * props.pageSize + 1
  const end = Math.min(props.currentPage * props.pageSize, props.total)
  return t('blog.pagination.total', { start, end, total: props.total })
})
</script>

<template>
  <div v-if="totalPages > 1" class="pagination">
    <!-- Previous button -->
    <div
      class="page-btn"
      :class="{ disabled: currentPage === 1 }"
      @click="currentPage > 1 ? handlePageClick(currentPage - 1) : null"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </div>

    <!-- Page numbers -->
    <template v-for="page in pageNumbers" :key="page">
      <span v-if="page === '...'" class="page-ellipsis">...</span>
      <div
        v-else
        class="page-btn"
        :class="{ active: page === currentPage }"
        @click="handlePageClick(page as number)"
      >
        {{ page }}
      </div>
    </template>

    <!-- Next button -->
    <div
      class="page-btn"
      :class="{ disabled: currentPage === totalPages }"
      @click="currentPage < totalPages ? handlePageClick(currentPage + 1) : null"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>

    <!-- Page info -->
    <span class="page-info">
      {{ paginationInfo }}
    </span>
  </div>
</template>

<style lang="less" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 40px;
  padding: 16px 0;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;

  &:hover:not(.disabled):not(.active) {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
  }

  &.active {
    color: #ffffff;
    background: #0066ff;
    border-color: #0066ff;
    font-weight: 600;
  }

  &.disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}

.page-ellipsis {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  padding: 0 4px;
  user-select: none;
}

.page-info {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 16px;
}

@media (max-width: 480px) {
  .page-info {
    width: 100%;
    text-align: center;
    margin-left: 0;
    margin-top: 4px;
  }

  .page-btn {
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    font-size: 13px;
  }
}
</style>
