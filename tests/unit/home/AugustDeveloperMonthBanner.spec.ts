// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
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
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the Credits message before August 5 and keeps the details route', () => {
    vi.setSystemTime('2026-08-03T12:00:00+08:00')
    const wrapper = mountBanner('zh')
    const link = wrapper.findComponent(RouterLinkStub)

    expect(wrapper.text()).toContain('CoStrict 8月开发者福利月｜老用户额外获赠20% Credits')
    expect(link.props('to')).toBe('/operation/august-developer-month')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
    expect(link.attributes('aria-label')).toBe('查看 CoStrict 8月开发者福利月详情')
  })

  it('switches to the model message at the August 5 Beijing-time cutoff', async () => {
    vi.setSystemTime('2026-08-04T23:59:59+08:00')
    const wrapper = mountBanner('zh')

    expect(wrapper.text()).toContain('老用户额外获赠20% Credits')

    await vi.advanceTimersByTimeAsync(1000)

    expect(wrapper.text()).toContain('CoStrict 8月开发者福利月｜5大新模型已上线')
    expect(wrapper.text()).not.toContain('老用户额外获赠20% Credits')
  })

  it('switches to the final message at the August 14 Beijing-time cutoff', async () => {
    vi.setSystemTime('2026-08-13T23:59:59+08:00')
    const wrapper = mountBanner('zh')

    expect(wrapper.text()).toContain('5大新模型已上线')

    await vi.advanceTimersByTimeAsync(1000)

    expect(wrapper.text()).toContain('CoStrict 8月开发者福利月｜三大升级现已全部上线')
    expect(wrapper.text()).not.toContain('5大新模型已上线')
  })

  it('renders the matching English message for the active stage', () => {
    vi.setSystemTime('2026-08-06T12:00:00+08:00')
    const wrapper = mountBanner('en')

    expect(wrapper.text()).toContain(
      'CoStrict August Developer Month｜5 new models are now live',
    )
  })
})
