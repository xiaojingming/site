/**
 * @file use_animation
 */
import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue'

export const useAnimation = (needAnimation: boolean, watchProps?: Ref<unknown>) => {
  const animatedElement = ref<HTMLElement | null>(null)

  let observer: IntersectionObserver | null = null

  const observeAction = () => {
    if (!animatedElement.value || !needAnimation) {
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    observer.observe(animatedElement.value as unknown as Element)
  }

  watch(() => watchProps, observeAction, { deep: true })

  onMounted(observeAction)

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    animatedElement,
  }
}
