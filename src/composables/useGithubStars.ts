import { ref, computed, onMounted } from 'vue'

const GITHUB_STARS_CACHE_KEY = 'github_stars_cache'

export function useGithubStars() {
  const githubStars = ref(0)

  const getCachedGithubStars = (): number | null => {
    if (!import.meta.client) return null
    try {
      const cached = localStorage.getItem(GITHUB_STARS_CACHE_KEY)
      if (cached) {
        const { stars } = JSON.parse(cached)
        return stars
      }
    } catch (error) {
      console.error('读取 GitHub star 缓存失败:', error)
    }
    return null
  }

  const setCachedGithubStars = (stars: number) => {
    if (!import.meta.client) return
    try {
      const cacheData = { stars }
      localStorage.setItem(GITHUB_STARS_CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.error('设置 GitHub star 缓存失败:', error)
    }
  }

  const formatStarCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  const fetchGithubStars = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/zgsm-ai/costrict')
      if (response.ok) {
        const data = await response.json()
        const stars = data.stargazers_count || 0
        githubStars.value = stars
        setCachedGithubStars(stars)
      } else {
        const cachedStars = getCachedGithubStars()
        if (cachedStars !== null) {
          githubStars.value = cachedStars
        }
      }
    } catch (error) {
      console.error('获取 GitHub star 数量失败:', error)
      const cachedStars = getCachedGithubStars()
      if (cachedStars !== null) {
        githubStars.value = cachedStars
      }
    }
  }

  onMounted(() => {
    fetchGithubStars()
  })

  const formattedStarCount = computed(() => formatStarCount(githubStars.value))

  return {
    githubStars,
    formattedStarCount,
  }
}
