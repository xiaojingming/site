import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

export function useResponsive(mobileMaxWidth = 768) {
  const { locale } = useI18n()
  const isMobile = ref(false)
  const isTablet = ref(false)

  const isEn = computed(() => locale.value === 'en')
  const mobileBreakpoint = computed(() => (isEn.value ? 1280 : 968))

  const checkMobile = () => {
    const width = window.innerWidth
    isMobile.value = width <= mobileMaxWidth
    isTablet.value = width > mobileMaxWidth && width <= 968
  }

  const handleResize = () => {
    checkMobile()
  }

  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    isMobile,
    isTablet,
    isEn,
    mobileBreakpoint,
  }
}
