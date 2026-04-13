// 语言相关的工具函数，用于本地存储和获取用户语言偏好

// 本地存储中语言设置的键名
const LANGUAGE_STORAGE_KEY = 'costrict_language'

// 获取用户语言偏好
export const getStoredLanguage = (): string | null => {
  if (!import.meta.client) return null
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY)
  } catch (error) {
    console.error('获取语言设置失败:', error)
    return null
  }
}

// 设置用户语言偏好
export const setStoredLanguage = (language: string): void => {
  if (!import.meta.client) return
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch (error) {
    console.error('保存语言设置失败:', error)
  }
}

// 获取浏览器默认语言
export const getBrowserLanguage = (): string => {
  if (!import.meta.client) return 'zh'
  // 获取浏览器语言
  const navLanguage =
    navigator.language || (navigator as unknown as { userLanguage: string }).userLanguage || 'zh'

  // 处理语言代码，例如 "zh-CN" -> "zh"
  const shortLang = navLanguage.split('-')[0]

  // 只支持 'zh' 和 'en'，其他情况默认返回 'zh'
  if (shortLang === 'en') {
    return 'en'
  }

  return 'zh'
}

// 初始化语言设置
export const initializeLanguage = (): string => {
  // 1. 先尝试从本地存储获取
  const storedLang = getStoredLanguage()
  if (storedLang && ['zh', 'en'].includes(storedLang)) {
    return storedLang
  }

  // 2. 如果本地存储没有，则使用浏览器默认语言
  const browserLang = getBrowserLanguage()

  // 3. 保存到本地存储
  setStoredLanguage(browserLang)

  return browserLang
}
