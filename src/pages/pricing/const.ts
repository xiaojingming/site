import type { PricingPlan } from './interface'

// 创建国际化的价格套餐数据
export function createPricingPlans(t: (key: string) => string): PricingPlan[] {
  return [
    {
      title: t('pricing.plans.free.title'),
      price: 0,
      description: t('pricing.plans.free.description'),
      buttonText: t('pricing.plans.free.buttonText'),
      buttonType: 'download',
      showTrafficLabel: false,
      features: [
        {
          text: t('pricing.plans.free.features.newUserCredits'),
          available: true,
        },
        {
          text: t('pricing.plans.free.features.freeCodeCompletion'),
          available: true,
        },
        {
          text: t('pricing.plans.free.features.freeCodeReview'),
          available: true,
        },
        {
          text: t('pricing.plans.free.features.noAdvancedModels'),
          available: false,
        },
      ],
      clickEvent() {
        window.open('https://costrict.ai/download')
      },
    },
    {
      title: t('pricing.plans.package1.title'),
      price: 9.9,
      originalPrice: 50,
      description: t('pricing.plans.package1.description'),
      buttonText: t('pricing.plans.package1.buttonText'),
      buttonType: 'purchase',
      showTrafficLabel: true,
      features: [
        {
          text: t('pricing.plans.package1.features.credits'),
          available: true,
        },
        {
          text: t('pricing.plans.package1.features.freeCodeCompletion'),
          available: true,
        },
        {
          text: t('pricing.plans.package1.features.freeCodeReview'),
          available: true,
        },
        {
          text: t('pricing.plans.package1.features.advancedModels'),
          available: true,
        },
      ],
      clickEvent() {
        window.open('https://zgsm.sangfor.com/credit/manager/subscribe?type=4')
      },
    },
    {
      title: t('pricing.plans.package2.title'),
      price: 98,
      originalPrice: 200,
      description: t('pricing.plans.package2.description'),
      buttonText: t('pricing.plans.package2.buttonText'),
      buttonType: 'purchase',
      showTrafficLabel: true,
      features: [
        {
          text: t('pricing.plans.package2.features.credits'),
          available: true,
        },
        {
          text: t('pricing.plans.package2.features.freeCodeCompletion'),
          available: true,
        },
        {
          text: t('pricing.plans.package2.features.freeCodeReview'),
          available: true,
        },
        {
          text: t('pricing.plans.package2.features.advancedModels'),
          available: true,
        },
      ],
      clickEvent() {
        window.open('https://zgsm.sangfor.com/credit/manager/subscribe?type=5')
      },
    },
    {
      title: t('pricing.plans.package3.title'),
      price: 248,
      originalPrice: 500,
      description: t('pricing.plans.package3.description'),
      buttonText: t('pricing.plans.package3.buttonText'),
      buttonType: 'purchase',
      showTrafficLabel: true,
      features: [
        {
          text: t('pricing.plans.package3.features.credits'),
          available: true,
        },
        {
          text: t('pricing.plans.package3.features.freeCodeCompletion'),
          available: true,
        },
        {
          text: t('pricing.plans.package3.features.freeCodeReview'),
          available: true,
        },
        {
          text: t('pricing.plans.package3.features.advancedModels'),
          available: true,
        },
      ],
      clickEvent() {
        window.open('https://zgsm.sangfor.com/credit/manager/subscribe?type=6')
      },
    },
  ]
}
