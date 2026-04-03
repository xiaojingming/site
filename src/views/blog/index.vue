<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useBlogData } from './useBlogData'
import { useResponsive } from '@/hooks/useResponsive'
import BlogCard from './components/BlogCard.vue'
import BlogSidebar from './components/BlogSidebar.vue'
import BlogPagination from './components/BlogPagination.vue'

// Component name
defineOptions({
  name: 'BlogPage',
})

useHead({
  title: 'CoStrict 技术博客 - AI 编程实践 | 最佳实践 | 案例分析',
  meta: [
    {
      name: 'description',
      content:
        'CoStrict 技术博客，分享 AI 辅助编程最佳实践、企业私有化部署指南、代码审查技巧和开发效率提升案例。',
    },
    { property: 'og:title', content: 'CoStrict 技术博客 - AI 编程实践 | 最佳实践 | 案例分析' },
    {
      property: 'og:description',
      content:
        'CoStrict 技术博客，分享 AI 辅助编程最佳实践、企业私有化部署指南、代码审查技巧和开发效率提升案例。',
    },
    { property: 'og:url', content: 'https://costrict.ai/blog' },
    { name: 'twitter:title', content: 'CoStrict 技术博客 - AI 编程实践 | 最佳实践 | 案例分析' },
    {
      name: 'twitter:description',
      content: 'CoStrict 技术博客，分享 AI 辅助编程最佳实践、企业私有化部署指南、代码审查技巧。',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://costrict.ai/blog' }],
})

// Composables
const { t } = useI18n()
const { isMobile, isTablet } = useResponsive()
const {
  categories,
  currentPage,
  selectedCategory,
  paginatedArticles,
  totalPages,
  totalArticles,
  changeCategory,
  changePage,
  getCategoryName,
  getCategoryDesc,
  getCategoryCount,
} = useBlogData()

const router = useRouter()

// Handle card click
const handleCardClick = (articleId: number): void => {
  router.push({ name: 'blogDetail', params: { id: articleId } })
}

// Handle category change
const handleCategoryChange = (categoryId: string): void => {
  changeCategory(categoryId)
}

// Handle page change
const handlePageChange = (page: number): void => {
  changePage(page)
  // Scroll to top of content area
  if (typeof document !== 'undefined') {
    const mainContent = document.querySelector('.main-content')
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

// Compute category counts for sidebar
const categoryCounts = computed(() => {
  const counts: Record<string, number> = {}
  categories.forEach((category) => {
    counts[category.id] = getCategoryCount(category.id)
  })
  return counts
})
</script>

<template>
  <div class="page-wrapper">
    <!-- Tablet: top tab category nav (769px~968px) -->
    <div v-if="isTablet" class="tab-category-nav">
      <div class="tab-category-inner">
        <div
          v-for="category in categories"
          :key="category.id"
          class="tab-category-item"
          :class="{ active: selectedCategory === category.id }"
          @click="handleCategoryChange(category.id)"
        >
          <span class="category-icon">{{ category.icon }}</span>
          <span class="category-name">{{ category.name }}</span>
          <span class="category-count">{{ getCategoryCount(category.id) }}</span>
        </div>
      </div>
    </div>

    <div class="content-area">
      <!-- Desktop: Sidebar on the left -->
      <BlogSidebar
        v-if="!isMobile && !isTablet"
        :categories="categories"
        :current-category="selectedCategory"
        :category-counts="categoryCounts"
        @category-change="handleCategoryChange"
      />

      <!-- Mobile: Horizontal scroll category navigation -->
      <div v-else-if="isMobile && !isTablet" class="mobile-category-nav">
        <div
          v-for="category in categories"
          :key="category.id"
          class="mobile-category-item"
          :class="{ active: selectedCategory === category.id }"
          @click="handleCategoryChange(category.id)"
        >
          <span class="category-icon">{{ category.icon }}</span>
          <span class="category-name">{{ category.name }}</span>
          <span class="category-count">{{ getCategoryCount(category.id) }}</span>
        </div>
      </div>

      <!-- Main Content -->
      <main class="main-content">
        <div class="main-header">
          <h1>{{ getCategoryName(selectedCategory) }}</h1>
          <p>{{ getCategoryDesc(selectedCategory) }}</p>
        </div>

        <!-- Desktop: 2 columns grid -->
        <!-- Mobile: 1 column grid -->
        <div class="cards-grid">
          <BlogCard
            v-for="article in paginatedArticles"
            :key="article.id"
            :article="article"
            @click="handleCardClick"
          />
        </div>

        <!-- Empty state -->
        <div v-if="paginatedArticles.length === 0" class="empty-state">
          {{ t('blog.noArticles') }}
        </div>

        <!-- Pagination -->
        <BlogPagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :total="totalArticles"
          :page-size="12"
          @page-change="handlePageChange"
        />
      </main>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-wrapper {
  padding-top: 64px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-area {
  display: flex;
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 32px 24px;
  gap: 32px;
}

.main-content {
  flex: 1;
  min-width: 0;
}

.main-header {
  margin-bottom: 32px;

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 8px;
  }

  p {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.7);
    max-width: 600px;
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 0;
  color: rgba(255, 255, 255, 0.5);
}

// Tab category nav (769px~968px)
.tab-category-nav {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
}

.tab-category-inner {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding: 12px 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
}

.tab-category-item {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
  border: 1px solid transparent;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.06);
  }

  &.active {
    color: #ffffff;
    background: rgba(0, 102, 255, 0.12);
    border-color: rgba(0, 102, 255, 0.25);
  }

  .category-icon {
    font-size: 15px;
    opacity: 0.7;
  }

  &.active .category-icon {
    opacity: 1;
  }

  .category-count {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
    background: rgba(255, 255, 255, 0.06);
    padding: 1px 7px;
    border-radius: 10px;
  }
}

// Mobile category navigation
.mobile-category-nav {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 16px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.mobile-category-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
  }

  &.active {
    color: #ffffff;
    background: rgba(0, 102, 255, 0.12);
    border-color: rgba(0, 102, 255, 0.25);
  }
}

.category-icon {
  font-size: 16px;
  opacity: 0.6;
}

.mobile-category-item.active .category-icon {
  opacity: 1;
}

.category-name {
  font-size: 14px;
}

.category-count {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.06);
  padding: 2px 8px;
  border-radius: 10px;
}

@media (min-width: 769px) and (max-width: 968px) {
  .content-area {
    flex-direction: column;
    padding: 24px 20px;
    gap: 0;
  }

  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .main-header {
    margin-bottom: 24px;

    h1 {
      font-size: 24px;
    }
  }
}

@media (max-width: 768px) {
  .content-area {
    flex-direction: column;
    padding: 16px 16px;
    gap: 0;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .main-header {
    margin-bottom: 20px;

    h1 {
      font-size: 22px;
    }
  }
}

@media (max-width: 480px) {
  .content-area {
    padding: 12px 12px;
  }

  .main-header h1 {
    font-size: 20px;
  }

  .main-header p {
    font-size: 14px;
  }
}
</style>
