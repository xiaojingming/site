<script setup lang="ts">
definePageMeta({
  localeVisible: ['zh'],
})

import { computed } from 'vue'
import { useBlogData } from './useBlogData'
import { useResponsive } from '@/composables/useResponsive'
import { coverImageMap, tagNameMap, tagClassMap } from './useBlogData'
import BlogCard from './components/BlogCard.vue'
import BlogSidebar from './components/BlogSidebar.vue'
// import BlogPagination from './components/BlogPagination.vue'
import FooterCopyright from '@/pages/home/FooterCopyright.vue'

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
  articles,
  categories,
  currentPage,
  selectedCategory,
  paginatedArticles,
  // totalPages,
  // totalArticles,
  changeCategory,
  // changePage,
  getCategoryName,
  getCategoryDesc,
  getCategoryCount,
} = useBlogData()

// Handle card click
const handleCardClick = (articleId: number): void => {
  navigateTo('/blog/' + articleId)
}

// Handle category change
const handleCategoryChange = (categoryId: string): void => {
  changeCategory(categoryId)
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Handle page change
// const handlePageChange = (page: number): void => {
//   changePage(page)
//   // Scroll to top of content area
//   if (typeof document !== 'undefined') {
//     const mainContent = document.querySelector('.main-content')
//     if (mainContent) {
//       mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
//     }
//   }
// }

// Compute category counts for sidebar
const categoryCounts = computed(() => {
  const counts: Record<string, number> = {}
  categories.forEach((category) => {
    counts[category.id] = getCategoryCount(category.id)
  })
  return counts
})

const featuredArticle = computed(() => {
  return articles.find((a) => a.id === 1) ?? null
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

        <!-- Featured article card (only on "all" category, first page) -->
        <div
          v-if="selectedCategory === 'all' && currentPage === 1 && featuredArticle"
          class="featured-card"
          @click="handleCardClick(featuredArticle.id)"
        >
          <div class="featured-badge">
            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            精选
          </div>
          <div class="featured-cover">
            <img
              v-if="coverImageMap[featuredArticle.cover]"
              :src="coverImageMap[featuredArticle.cover]"
              :alt="featuredArticle.title"
              class="featured-cover-img"
            />
          </div>
          <div class="featured-body">
            <div class="featured-meta">
              <span class="card-tag" :class="tagClassMap[featuredArticle.cover]">
                {{ tagNameMap[featuredArticle.cover] }}
              </span>
              <span class="featured-date">{{ featuredArticle.date }}</span>
            </div>
            <h2 class="featured-title">{{ featuredArticle.title }}</h2>
            <p class="featured-excerpt">{{ featuredArticle.excerpt }}</p>
            <div class="featured-footer">
              <div class="featured-author">
                <span class="author-avatar">{{ featuredArticle.authorInitial }}</span>
                <span class="author-name">{{ featuredArticle.author }}</span>
                <span v-if="featuredArticle.readTime" class="featured-readtime">
                  · {{ featuredArticle.readTime }} 分钟阅读
                </span>
              </div>
              <span class="card-readmore">
                {{ t('blog.readMore') }}
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
              </span>
            </div>
          </div>
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
        <!-- <BlogPagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :total="totalArticles"
          :page-size="12"
          @page-change="handlePageChange"
        /> -->
      </main>
    </div>

    <FooterCopyright :show-background="false" />
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

.featured-card {
  position: relative;
  display: flex;
  gap: 32px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(0, 102, 255, 0.25);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 32px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(0, 102, 255, 0.45);
    transform: translateY(-2px);
    box-shadow: 0 16px 48px rgba(0, 102, 255, 0.15);
  }
}

.featured-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  background: linear-gradient(135deg, #0066ff, #0099ff);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  border-radius: 20px;
  z-index: 2;
  box-shadow: 0 4px 16px rgba(0, 102, 255, 0.4);
  letter-spacing: 0.5px;
}

.featured-cover {
  width: 380px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #0066ff22, #6c3bff18);
  overflow: hidden;
}

.featured-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

.featured-body {
  flex: 1;
  padding: 32px 32px 32px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.featured-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.featured-date {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.card-tag {
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &.tag-tech {
    background: rgba(0, 102, 255, 0.25);
    color: #6ab0ff;
  }

  &.tag-case {
    background: rgba(0, 255, 183, 0.18);
    color: #5dffc5;
  }

  &.tag-deep {
    background: rgba(108, 59, 255, 0.22);
    color: #b49aff;
  }

  &.tag-oss {
    background: rgba(255, 170, 0, 0.2);
    color: #ffd076;
  }
}

.featured-title {
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.4;
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.featured-excerpt {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 20px;
}

.featured-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.featured-author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0066ff, #00b4ff);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.author-name {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

.featured-readtime {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

  .featured-card {
    flex-direction: column;
    gap: 0;
    margin-bottom: 24px;
  }

  .featured-cover {
    width: 100%;
    height: 220px;
  }

  .featured-body {
    padding: 20px;
  }

  .featured-title {
    font-size: 18px;
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

  .featured-card {
    flex-direction: column;
    gap: 0;
    margin-bottom: 20px;
  }

  .featured-cover {
    width: 100%;
    height: 180px;
  }

  .featured-body {
    padding: 16px;
  }

  .featured-title {
    font-size: 16px;
  }

  .featured-excerpt {
    -webkit-line-clamp: 2;
    font-size: 13px;
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
