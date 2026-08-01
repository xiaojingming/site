// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import zh from '@/locales/zh.json'
import en from '@/locales/en.json'
import AugustDeveloperMonthBanner from '@/views/home/components/AugustDeveloperMonthBanner.vue'

const mountBanner = (locale: 'zh' | 'en') => {
  const i18n = createI18n({
    legacy: false,
    locale,
    messages: { zh, en },
  })

  return mount(AugustDeveloperMonthBanner, {
    global: {
      plugins: [i18n],
      stubs: { RouterLink: RouterLinkStub },
    },
  })
}

describe('AugustDeveloperMonthBanner', () => {
  it('always renders the final Chinese message and stage-free details route', () => {
    const wrapper = mountBanner('zh')
    const link = wrapper.findComponent(RouterLinkStub)

    expect(wrapper.text()).toContain('CoStrict 8月开发者福利月｜三大升级现已全部上线')
    expect(link.props('to')).toBe('/operation/august-developer-month')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
    expect(link.attributes('aria-label')).toBe('查看 CoStrict 8月开发者福利月详情')
    expect(wrapper.text()).not.toContain('20%')
    expect(wrapper.text()).not.toContain('Kimi')
    expect(wrapper.text()).not.toContain('8月1日')
  })

  it('always renders the final English message', () => {
    const wrapper = mountBanner('en')

    expect(wrapper.text()).toContain(
      'CoStrict August Developer Month | All three upgrades are now live',
    )
  })
})
