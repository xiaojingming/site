import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

export function useResponsive() {
  const { locale } = useI18n()
  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1280)

  const isEn = computed(() => locale.value === 'en')
  const mobileBreakpoint = computed(() => (isEn.value ? 1280 : 968))

  const isMobile = computed(() => windowWidth.value < mobileBreakpoint.value)
  const isTablet = computed(() => windowWidth.value >= 769 && windowWidth.value <= 968)

  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    windowWidth.value = window.innerWidth
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
