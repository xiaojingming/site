import type { RouterScrollBehavior } from 'vue-router'

export const scrollBehavior: RouterScrollBehavior = (to) => {
  if (to.hash) {
    return {
      el: to.hash,
      top: 80,
      behavior: 'smooth',
    }
  }

  return { top: 0 }
}
