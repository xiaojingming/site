import { describe, expect, it } from 'vitest'
import type { RouteLocationNormalized } from 'vue-router'
import { scrollBehavior } from '@/router/scrollBehavior'

const routeWithHash = (hash: string) => ({ hash }) as RouteLocationNormalized

describe('scrollBehavior', () => {
  it('scrolls hash navigation below the fixed navbar', () => {
    expect(scrollBehavior(routeWithHash('#august-2026'), routeWithHash(''), null)).toEqual({
      el: '#august-2026',
      top: 80,
      behavior: 'smooth',
    })
  })

  it('scrolls normal navigation to the page top', () => {
    expect(scrollBehavior(routeWithHash(''), routeWithHash(''), null)).toEqual({ top: 0 })
  })
})
