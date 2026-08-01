// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import zh from '@/locales/zh.json'
import en from '@/locales/en.json'
import AugustDeveloperMonthSection from '@/views/operation/components/AugustDeveloperMonthSection.vue'
import sectionSource from '@/views/operation/components/AugustDeveloperMonthSection.vue?raw'

const mountSection = (locale: 'zh' | 'en') => {
  const i18n = createI18n({
    legacy: false,
    locale,
    messages: { zh, en },
  })

  return mount(AugustDeveloperMonthSection, {
    global: {
      plugins: [i18n],
      stubs: {
        RouterLink: {
          props: ['to'],
          template: '<a :href="to"><slot /></a>',
        },
      },
    },
  })
}

describe('AugustDeveloperMonthSection', () => {
  it('keeps the campaign shell open without a top or rounded outer frame', () => {
    const shellStyles = sectionSource.match(/\.campaign-shell\s*\{([\s\S]*?)\n\}/)?.[1]

    expect(shellStyles).toContain('overflow: visible')
    expect(shellStyles).not.toContain('border-bottom:')
    expect(shellStyles).not.toContain('border-top:')
    expect(shellStyles).not.toMatch(/\n\s*border:/)
    expect(shellStyles).not.toContain('border-radius:')
  })

  it('uses the approved wide desktop geometry for the first stage', () => {
    const monthStyles = sectionSource.match(/\.august-month\s*\{([\s\S]*?)\n\}/)?.[1]
    const monthBackdropStyles = sectionSource.match(
      /\.august-month::before\s*\{([\s\S]*?)\n\}/,
    )?.[1]
    const benefitLayoutStyles = sectionSource.match(/\.benefit-layout\s*\{([\s\S]*?)\n\}/)?.[1]
    const benefitCopyStyles = sectionSource.match(/\.benefit-copy\s*\{([\s\S]*?)\n\}/)?.[1]

    const shellStyles = sectionSource.match(/\.campaign-shell\s*\{([\s\S]*?)\n\}/)?.[1]
    const heroStyles = sectionSource.match(/\.campaign-hero\s*\{([\s\S]*?)\n\}/)?.[1]

    expect(monthStyles).toContain('width: 100%')
    expect(monthStyles).toContain('overflow-x: clip')
    expect(shellStyles).toContain('width: min(1120px, calc(100% - 48px))')
    expect(heroStyles).toContain('min-height: 100svh')
    expect(heroStyles).toContain('justify-content: center')
    expect(monthStyles).not.toContain('max-width: 960px')
    expect(benefitLayoutStyles).toContain(
      'grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1.2fr)',
    )
    expect(benefitLayoutStyles).toContain('column-gap: 64px')
    expect(benefitCopyStyles).toContain('min-height: 112px')
    expect(monthBackdropStyles).toContain('background-size: 80px 80px')
    expect(sectionSource).toMatch(
      /\.benefit-metric > strong\s*\{[\s\S]*?display: flex;[\s\S]*?min-height: 58px;/,
    )
  })

  it('keeps the existing model library free of decorative separator bars', () => {
    const libraryStyles = sectionSource.match(/\.model-library\s*\{([\s\S]*?)\n\}/)?.[1]

    expect(sectionSource).not.toMatch(/\.model-library::before\s*\{/)
    expect(libraryStyles).toContain('margin-top: 0')
    expect(libraryStyles).toContain('min-height: 112px')
    expect(libraryStyles).toContain('align-items: center')
    expect(libraryStyles).toContain('border-top: 0')
    expect(sectionSource).toMatch(
      /\.model-library-head strong\s*\{[\s\S]*?min-height: 53px;[\s\S]*?align-items: center;/,
    )
  })

  it('keeps the benefit frame still and moves only both headline numbers on hover', () => {
    expect(sectionSource).not.toContain('.benefit-metric:hover')
    expect(sectionSource).toMatch(
      /\.benefit-summary-group:hover \.benefit-transition > strong,[\s\S]*?\.benefit-summary-group:hover \.benefit-bonus-summary > strong[\s\S]*?translateY\(-2px\)/,
    )
    expect(sectionSource).toMatch(/\.benefit-summary-group \.benefit-from\s*\{[^}]*top: 11px;/)
    expect(sectionSource).toMatch(
      /\.benefit-summary-group \.benefit-transition\s*\{[\s\S]*?top: 11px;/,
    )
    expect(sectionSource).toMatch(/\.benefit-summary-group \.benefit-caption\s*\{[^}]*top: 11px;/)
    expect(sectionSource).toMatch(
      /\.benefit-bonus-summary > strong,[\s\S]*?\.benefit-bonus-summary > span[\s\S]*?top: 14px;/,
    )
    expect(sectionSource).toMatch(/\.benefit-bonus-summary > strong\s*\{[^}]*top: 16px;/)
  })

  it('raises each chapter watermark slightly above its green stage label', () => {
    expect(sectionSource).toMatch(/\.phase::after\s*\{[\s\S]*?top: 22px;/)
  })

  it('uses restrained hover motion without a corner glint on overview entries', () => {
    const wrapper = mountSection('zh')

    expect(sectionSource).toMatch(/\.campaign-hero:hover \.campaign-hero__spark\s*\{/)
    expect(sectionSource).toMatch(/@keyframes campaign-sparkle\s*\{/)
    expect(sectionSource).toMatch(
      /\.campaign-overview-item:hover \.campaign-overview-item__content[\s\S]*?translateY\(-4px\)/,
    )
    expect(wrapper.find('.campaign-overview-item__glint').exists()).toBe(false)
    expect(sectionSource).not.toContain('.campaign-overview-item__glint')
  })

  it('connects all detail stages with one campaign background field', () => {
    const wrapper = mountSection('zh')

    expect(wrapper.find('.campaign-detail-field').exists()).toBe(true)
    expect(wrapper.find('[data-campaign-stage="1"].phase--rights').exists()).toBe(true)
    expect(wrapper.find('[data-campaign-stage="2"].phase--models').exists()).toBe(true)
    expect(wrapper.find('[data-campaign-stage="3"].phase--product').exists()).toBe(true)
    expect(sectionSource).toMatch(/\.campaign-detail-field\s*\{/)
  })

  it('preserves all four stage-three illustrations in an asymmetric composition', () => {
    const wrapper = mountSection('zh')

    expect(wrapper.findAll('.stage3-visual')).toHaveLength(4)
    expect(wrapper.findAll('.stage3-flow-step')).toHaveLength(4)
    expect(wrapper.findAll('.stage3-card-tags span')).toHaveLength(15)
    expect(wrapper.find('.stage3-card--cloud').exists()).toBe(true)
    expect(wrapper.find('.stage3-card--knowledge').exists()).toBe(true)
    expect(wrapper.find('.stage3-card--metrics').exists()).toBe(true)
    expect(wrapper.find('.stage3-card--collaboration').exists()).toBe(true)
    expect(sectionSource).toMatch(/\.stage3-card\.stage3-card--cloud\s*\{[^}]*grid-column: span 7;/)
    expect(sectionSource).toMatch(/\.stage3-card--knowledge\s*\{[^}]*grid-column: span 5;/)
    expect(sectionSource).toMatch(/\.stage3-card--metrics\s*\{[^}]*grid-column: span 8;/)
    expect(sectionSource).toMatch(/\.stage3-card--collaboration\s*\{[^}]*grid-column: span 4;/)
    expect(sectionSource).toMatch(/\.stage3-card:hover \.stage3-card-number\s*\{/)
    expect(sectionSource).toMatch(/\.stage3-card:hover \.stage3-visual\s*\{/)
    expect(wrapper.findAll('.stage3-overview-item')).toHaveLength(0)
  })

  it('keeps third-party logos out of the new-model cards', () => {
    const wrapper = mountSection('zh')

    expect(wrapper.findAll('.model-logo')).toHaveLength(0)
    expect(wrapper.findAll('.model-card__watermark')).toHaveLength(0)
    expect(wrapper.findAll('.model-card__wordmark')).toHaveLength(5)
    expect(wrapper.findAll('.model-card__wordmark').map((item) => item.text())).toEqual([
      'Kimi',
      'MiniMax',
      'StepFun',
      'MiMo',
      'deepseek',
    ])
    expect(wrapper.findAll('.model-card__glyph')).toHaveLength(0)
    expect(sectionSource).not.toContain('model-logos')
    expect(sectionSource).not.toContain('https://filecdn.minimax.chat')
    expect(sectionSource).not.toContain('https://platform.stepfun.com')
    expect(sectionSource).not.toContain('https://cdn.cnbj1.fds.api.mi-img.com')
  })

  it('adds a restrained model-orbit backdrop without replacing the real model cards', () => {
    const wrapper = mountSection('zh')

    expect(wrapper.find('.model-orbit-art').exists()).toBe(true)
    expect(wrapper.findAll('.model-orbit-art__ring')).toHaveLength(3)
    expect(wrapper.findAll('.model-orbit-art__node')).toHaveLength(4)
    expect(wrapper.find('.model-orbit-art__core img').attributes('src')).toContain(
      'costrict-symbol-white.png',
    )
    expect(wrapper.findAll('.model-card')).toHaveLength(5)
  })

  it('keeps model recommendations as four horizontal desktop rows', () => {
    const wrapper = mountSection('zh')
    const modelTagStyles = sectionSource.match(/\.scenario-model\s*\{([\s\S]*?)\n\}/)?.[1]

    expect(wrapper.findAll('.scenario')).toHaveLength(4)
    expect(sectionSource).toMatch(/\.model-scenarios\s*\{\s*display: block;/)
    expect(sectionSource).toMatch(
      /\.scenario\s*\{[\s\S]*?display: grid;[\s\S]*?grid-template-columns: 220px minmax\(0, 1fr\);[\s\S]*?gap: 44px;/,
    )
    expect(modelTagStyles).toContain('min-height: 30px')
    expect(modelTagStyles).toContain('border: 1px solid')
    expect(modelTagStyles).toContain('border-radius: 4px')
    expect(sectionSource.match(/\.scenario-model\s*\{/g)).toHaveLength(1)
  })

  it('opens with a campaign cover, overview, and all three benefits', () => {
    const wrapper = mountSection('zh')
    const content = wrapper.text()
    const hero = wrapper.find('.campaign-hero')

    expect(wrapper.attributes('id')).toBe('august-2026')
    expect(hero.exists()).toBe(true)
    expect(hero.find('#campaign-overview').exists()).toBe(true)
    expect(hero.findAll('.campaign-overview-item')).toHaveLength(3)
    expect(hero.findAll('.campaign-overview-item > i')).toHaveLength(0)
    expect(wrapper.findAll('.campaign-overview-item')).toHaveLength(3)
    expect(wrapper.findAll('.campaign-hero__spark')).toHaveLength(12)
    expect(wrapper.find('.campaign-hero__action').exists()).toBe(false)
    expect(wrapper.find('.campaign-overview__head').exists()).toBe(false)
    expect(wrapper.findAll('.campaign-proof')).toHaveLength(0)
    expect(wrapper.findAll('[data-campaign-stage]')).toHaveLength(3)
    expect(wrapper.find('[data-campaign-stage="1"]').exists()).toBe(true)
    expect(wrapper.find('[data-campaign-stage="2"]').exists()).toBe(true)
    expect(wrapper.find('[data-campaign-stage="3"]').exists()).toBe(true)
    for (const expectedText of [
      'CoStrict 8月开发者福利月',
      '八月新章',
      '这个八月，CoStrict 持续进化',
      '用户权益',
      '模型能力',
      '产品升级',
      '原有效期 1个月',
      '延长至',
      '12个月',
      '+20%',
      '自动延长',
      '举个例子',
      '1000 Credits',
      '200 Credits',
      '8月7日',
    ]) {
      expect(content).toContain(expectedText)
    }
    expect(wrapper.find('.benefit-example').exists()).toBe(true)
    expect(wrapper.findAll('.benefit-example-flow > span')).toHaveLength(2)
    expect(wrapper.find('.benefit-summary-group').exists()).toBe(true)
    expect(wrapper.find('.benefit-summary-group .benefit-metric--duration').exists()).toBe(true)
    expect(wrapper.find('.benefit-summary-group .benefit-bonus-summary').exists()).toBe(true)
    expect(content).not.toContain('同时，原有未消耗额度')
    expect(sectionSource).toMatch(
      /\.benefit-summary-group \.benefit-transition\s*\{[^}]*min-height: 58px;/,
    )
    expect(sectionSource).toMatch(/\.benefit-bonus-summary > strong\s*\{[^}]*min-height: 58px;/)
    expect(content).not.toContain('三大升级现已全部上线')
    expect(content).not.toContain('三大升级 · 一次看完')
    expect(content).not.toContain('本月福利总览')
    expect(content).not.toContain('查看三大升级')
  })

  it('renders the complete Chinese campaign when all stages are released', () => {
    const wrapper = mountSection('zh')
    const content = wrapper.text()

    expect(wrapper.findAll('[data-campaign-stage]')).toHaveLength(3)
    expect(wrapper.findAll('.model-card')).toHaveLength(5)
    expect(wrapper.findAll('.stage3-card')).toHaveLength(4)
    expect(wrapper.findAll('.ecosystem-summary')).toHaveLength(0)
    expect(wrapper.findAll('.stage3-summary')).toHaveLength(0)
    expect(wrapper.find('.campaign-closing').exists()).toBe(true)
    expect(wrapper.find('.campaign-closing__cta').exists()).toBe(true)
    expect(sectionSource).toContain('<RouterLink to="/download" class="campaign-closing__cta">')
    expect(wrapper.find('.stage3-journey-track').exists()).toBe(false)
    for (const expectedText of [
      'Kimi K3',
      'MiniMax M3',
      'Step-3.7-flash',
      'Mimo-v2.5-pro',
      'DeepSeek-V4-Flash',
      '根据不同任务、不同场景，选择一种或多种模型组合',
      '日常编码',
      '复杂代码分析',
      '企业级开发',
      '图片转代码',
      'CoStrict Cloud',
      '助力研发组织持续进化',
      '多层级 AI Coding 数据看板',
      '更高效的人机协作',
      '企业知识库',
      '效能衡量',
      'CI/CD',
      '8 月，把 AI 编程用得更深、用得更稳',
      'Credits 升级 · 新模型接入 · 产品能力全面进化',
      '下载客户端',
    ]) {
      expect(content).toContain(expectedText)
    }
    expect(content).not.toContain('绿色标识为新接入模型')
    expect(sectionSource).toMatch(/\.model-recommendations\s*\{[\s\S]*?border-top: 0;/)
    expect(wrapper.findAll('.existing-list span').map((item) => item.text())).not.toContain(
      'DeepSeek-V4-Flash',
    )
    const deepSeekRecommendation = wrapper
      .findAll('.scenario-model')
      .find((item) => item.text() === 'DeepSeek-V4-Flash')
    expect(deepSeekRecommendation?.classes()).toContain('is-new')
    expect(content).not.toContain('从工具到伙伴')
    expect(content).not.toContain('模型能力拓展')
    expect(content).not.toContain('产品能力版图')
    expect(wrapper.findAll('.ecosystem-summary .summary-number')).toHaveLength(0)
    expect(wrapper.findAll('.stage3-summary .stage3-card-number')).toHaveLength(0)
  })

  it('renders English content without missing translation keys', () => {
    const wrapper = mountSection('en')

    expect(wrapper.text()).toContain('CoStrict August Developer Month')
    expect(wrapper.text()).toContain('12 months')
    expect(wrapper.text()).toContain('+20%')
    expect(wrapper.text()).toContain('1,000 Credits')
    expect(wrapper.text()).toContain('August 7')
    expect(wrapper.text()).toContain('Step-3.7-flash')
    expect(wrapper.text()).toContain('Mimo-v2.5-pro')
    expect(wrapper.text()).toContain('go deeper with AI coding')
    expect(wrapper.findAll('.stage3-overview-item')).toHaveLength(0)
    expect(wrapper.text()).not.toContain('operation.august')
  })
})
