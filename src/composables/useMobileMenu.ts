import { ref, onUnmounted } from 'vue'

export function useMobileMenu() {
  const isMenuOpen = ref(false)
  const isLangMenuOpen = ref(false)
  const originalOverflow = ref('')

  const lockBodyScroll = () => {
    if (typeof document !== 'undefined') {
      originalOverflow.value = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
  }

  const unlockBodyScroll = () => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = originalOverflow.value || ''
    }
  }

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    if (isMenuOpen.value) {
      lockBodyScroll()
    } else {
      unlockBodyScroll()
    }
  }

  const closeMenu = () => {
    isMenuOpen.value = false
    isLangMenuOpen.value = false
    unlockBodyScroll()
  }

  const toggleLangMenu = () => {
    isLangMenuOpen.value = !isLangMenuOpen.value
  }

  const closeLangMenu = () => {
    isLangMenuOpen.value = false
  }

  onUnmounted(() => {
    unlockBodyScroll()
  })

  return {
    isMenuOpen,
    isLangMenuOpen,
    toggleMenu,
    closeMenu,
    toggleLangMenu,
    closeLangMenu,
    lockBodyScroll,
    unlockBodyScroll,
  }
}
