import { ref, computed } from 'vue'
import { categories, articles } from './blogData'
import type { BlogArticle } from './blogData'

export type { BlogArticle, BlogCategory } from './blogData'
export { tagClassMap, tagNameMap, coverImageMap, blogImageMap } from './blogData'

export function useBlogData() {
  const selectedCategory = ref<string>('all')
  const currentPage = ref<number>(1)
  const pageSize = 12

  const filteredArticles = computed(() => {
    if (selectedCategory.value === 'all') {
      return articles
    }
    return articles.filter((article) => article.category === selectedCategory.value)
  })

  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(filteredArticles.value.length / pageSize))
  })

  const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    return filteredArticles.value.slice(start, end)
  })

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find((c) => c.id === categoryId)
    return category?.name || ''
  }

  const getCategoryDesc = (categoryId: string): string => {
    const category = categories.find((c) => c.id === categoryId)
    return category?.desc || ''
  }

  const getCategoryCount = (categoryId: string): number => {
    if (categoryId === 'all') {
      return articles.length
    }
    return articles.filter((a) => a.category === categoryId).length
  }

  const changeCategory = (categoryId: string): void => {
    selectedCategory.value = categoryId
    currentPage.value = 1
  }

  const changePage = (page: number): void => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y} 年 ${m} 月 ${day} 日`
  }

  const getArticleById = (id: number): BlogArticle | undefined => {
    return articles.find((a) => a.id === id)
  }

  const getRelatedArticles = (id: number, limit = 3): BlogArticle[] => {
    const current = articles.find((a) => a.id === id)
    if (!current) return []
    return articles.filter((a) => a.id !== id && a.category === current.category).slice(0, limit)
  }

  return {
    articles,
    categories,
    currentPage,
    selectedCategory,
    filteredArticles,
    paginatedArticles,
    totalPages,
    totalArticles: computed(() => filteredArticles.value.length),
    changeCategory,
    changePage,
    getCategoryName,
    getCategoryDesc,
    getCategoryCount,
    formatDate,
    getArticleById,
    getRelatedArticles,
  }
}
