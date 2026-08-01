// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import zh from '@/locales/zh.json'
import en from '@/locales/en.json'
import AugustDeveloperMonthEntry from '@/views/operation/components/AugustDeveloperMonthEntry.vue'

const mountEntry = () => {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    messages: { zh, en },
  })

  return mount(AugustDeveloperMonthEntry, {
    global: {
      plugins: [i18n],
      stubs: { RouterLink: RouterLinkStub },
    },
  })
}

describe('AugustDeveloperMonthEntry', () => {
  it('links to the complete standalone campaign without a stage query', () => {
    const wrapper = mountEntry()
    const link = wrapper.findComponent(RouterLinkStub)

    expect(link.props('to')).toBe('/operation/august-developer-month')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
    expect(link.attributes('aria-label')).toBe('查看 CoStrict 8月开发者福利月详情')
  })

  it('renders as a compact new long-term activity entry', () => {
    const wrapper = mountEntry()

    expect(wrapper.find('.august-campaign-entry__title').text()).toBe('CoStrict 8月开发者福利月')
    expect(wrapper.find('.august-campaign-entry__new').text()).toBe('NEW')
    expect(wrapper.attributes('data-activity-row')).toBeDefined()
    expect(wrapper.attributes('data-activity-status')).toBe('active')
    expect(wrapper.text().match(/CoStrict 8月开发者福利月/g)).toHaveLength(1)
  })
})
