import { computed, type ComputedRef } from 'vue'

interface LocalizedResourceMap<T> {
  zh: T
  en: T
}

/**
 * 多语言资源映射 Composable
 * @param resourceMap 中英文资源映射对象
 * @returns 当前语言对应的资源
 *
 * @example
 * const images = useLocalizedResources({
 *   zh: {
 *     title: ZhTitle,
 *     feature1: ZhFeature1,
 *   },
 *   en: {
 *     title: EnTitle,
 *     feature1: EnFeature1,
 *   }
 * })
 *
 * // 在模板中使用
 * <img :src="images.title" />
 */
export function useLocalizedResources<T>(resourceMap: LocalizedResourceMap<T>): ComputedRef<T> {
  const { locale } = useI18n()

  return computed(() => {
    return resourceMap[locale.value as 'zh' | 'en'] || resourceMap.zh
  })
}

/**
 * 多语言数组资源映射 Composable
 * 用于 featureList 等数组资源
 *
 * @example
 * const featureList = useLocalizedFeatureList([
 *   {
 *     title: t('feature1Title'),
 *     content: t('feature1Content'),
 *     img: { zh: ZhImg1, en: EnImg1 }
 *   },
 *   {
 *     title: t('feature2Title'),
 *     content: t('feature2Content'),
 *     img: { zh: ZhImg2, en: EnImg2 }
 *   }
 * ])
 */
interface FeatureItem {
  title: string
  content: string
  img: LocalizedResourceMap<string>
}

interface FeatureItemResult {
  title: string
  content: string
  img: string
}

export function useLocalizedFeatureList(items: FeatureItem[]): ComputedRef<FeatureItemResult[]> {
  const { locale } = useI18n()

  return computed(() => {
    return items.map((item) => ({
      title: item.title,
      content: item.content,
      img: item.img[locale.value as 'zh' | 'en'] || item.img.zh,
    }))
  })
}
