<template>
  <div class="pricing-page pt-39.5 pb-23 relative">
    <img
      src="../../assets/price/bg_1.png"
      alt="background"
      class="absolute left-[-10px] top-85 w-55 h-58 priceing-page__bg"
    />
    <img
      src="../../assets/price/bg_2.png"
      alt="background"
      class="absolute left-124 top-104 w-55 pricing-page__bg"
    />
    <img
      src="../../assets/price/bg_3.png"
      alt="background"
      class="absolute left-155 top-81 w-28.5 pricing-page__bg"
    />
    <img
      src="../../assets/price/bg_4.png"
      alt="background"
      class="absolute left-233.5 top-104 w-55 pricing-page__bg"
    />
    <img
      src="../../assets/price/bg_5.png"
      alt="background"
      class="absolute left-265 top-81 w-28.5 pricing-page__bg"
    />
    <div class="pricing-page__title text-3xl text-center">{{ t('pricing.title') }}</div>
    <div class="pricing-page__subTitle text-center mt-7.5 opacity-70 text-base">
      {{ t('pricing.subtitle') }}
    </div>
    <div class="text-center mt-2 text-base">
      🎯<span class="pricing-page__tips">{{ t('pricing.tips') }}</span>
    </div>
    <div class="pricing-page__content mt-7">
      <div class="content-version grid grid-cols-4 gap-5">
        <div
          v-for="(plan, index) in pricingPlans"
          :key="index"
          class="content-version__item min-88 px-5 py-6 relative"
        >
          <div v-if="plan.showTrafficLabel" class="absolute right-0 top-[-4px]">
            <img src="../../assets/label-bg.webp" alt="label" />
            <span class="absolute top-1 left-7 label-text">{{
              t('pricing.tag.trafficPackage')
            }}</span>
          </div>
          <div class="content-version__item-title text-base font-semibold">{{ plan.title }}</div>
          <div class="content-version__item-price flex items-center text-3xl mt-3">
            <span class="price-unit ml-[-8px]">￥</span>
            <span class="price">{{ plan.price }}</span>
            <span v-if="index === 1" class="text-xs ml-2 mt-2 original-price__tips">{{
              t('pricing.firstRechargeDiscount')
            }}</span>
            <span
              v-if="plan.originalPrice"
              class="original-price text-line-through text-base mt-2"
              :class="index === 1 ? 'ml-1' : 'ml-2.5'"
            >
              ￥{{ plan.originalPrice }}
            </span>
          </div>
          <div class="content-version__item-desc mt-2.5 text-sm text-[#EFEFEF]">
            {{ plan.description }}
          </div>
          <div
            class="content-version__item-btn h-10 text-center leading-10 mt-6 rounded-sm"
            :class="{
              'btn-purchase': plan.buttonType === 'purchase',
              'btn-download': plan.buttonType !== 'purchase',
            }"
            @click="plan.clickEvent"
          >
            {{ plan.buttonText }}
          </div>
          <ul class="content-version__item-features text-xs mt-5">
            <li
              v-for="(feature, featureIndex) in plan.features"
              :key="featureIndex"
              class="flex items-start mb-4 last-of-type:mb-0"
            >
              <img
                class="mt-0.5"
                v-if="feature.available"
                src="../../assets/y.svg"
                alt="available"
              />
              <img v-else src="../../assets/x.svg" alt="unavailable" />
              <p class="ml-2">{{ feature.text }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt-5 flex item-center">
      {{ t('pricing.learnMore') }}
      <span class="ml-2 text-[#2A7FFF] cursor-pointer" @click="toDetail"
        >{{ t('pricing.billingDescription') }} >></span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  localeVisible: ['zh'],
})

import { createPricingPlans } from './const'
import { computed } from 'vue'

const { t } = useI18n()

// 使用国际化函数创建价格套餐和指南步骤
const pricingPlans = computed(() => createPricingPlans(t))

defineOptions({
  name: 'PricingPage',
})

useHead({
  title: 'CoStrict 价格方案 - 个人免费 | 企业套餐 | 私有化部署',
  meta: [
    {
      name: 'description',
      content:
        'CoStrict 提供灵活的价格方案：个人开发者永久免费，企业套餐支持私有化部署，满足不同规模团队的 AI 编程需求。',
    },
    { property: 'og:title', content: 'CoStrict 价格方案 - 个人免费 | 企业套餐 | 私有化部署' },
    {
      property: 'og:description',
      content:
        'CoStrict 提供灵活的价格方案：个人开发者永久免费，企业套餐支持私有化部署，满足不同规模团队的 AI 编程需求。',
    },
    { property: 'og:url', content: 'https://costrict.ai/pricing' },
    { name: 'twitter:title', content: 'CoStrict 价格方案 - 个人免费 | 企业套餐 | 私有化部署' },
    {
      name: 'twitter:description',
      content: 'CoStrict 提供灵活的价格方案：个人开发者永久免费，企业套餐支持私有化部署。',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://costrict.ai/pricing' }],
})

const toDetail = () => {
  window.open('https://docs.costrict.ai/billing/purchase/')
}
</script>

<style lang="less" scoped>
.pricing-page {
  width: 1300px;
  margin: auto;
  color: white;

  @media (max-width: 1320px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    padding-top: 90px;
    padding-bottom: 40px;
  }

  &__bg {
    @media (max-width: 1320px) {
      display: none;
    }
  }

  &__tips {
    background: linear-gradient(91deg, #00ffb7 0%, #ffffff 101%, #c5dbff 150%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  &__content {
    .content-version {
      @media (max-width: 1320px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }

      &__item {
        position: relative;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 10px;
        z-index: 0;

        &-btn {
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;

          &.btn-download {
            background: rgba(0, 102, 255, 0.3);
            border: 1px solid rgba(0, 102, 255, 0.5);

            &:hover {
              box-shadow: 0 0 10px rgba(0, 102, 255, 0.3);
            }
          }

          &.btn-purchase {
            background: linear-gradient(91deg, #005eff -9%, #00ffb7 104%);
          }

          &.btn-download {
            border: 1px solid;
            border-image: linear-gradient(
                107deg,
                #0066ff 38%,
                #00ffb7 52%,
                rgba(247, 255, 253, 0.51) 88%,
                rgba(0, 94, 255, 0.09) 100%
              )
              1;
            background: rgba(255, 255, 255, 0.2);
          }
        }

        .original-price {
          text-decoration: line-through;
          color: rgba(255, 255, 255, 0.7);

          &__tips {
            background: linear-gradient(102deg, #00ffb7 3%, #ffffff 68%, #ffffff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        .label-text {
          background: linear-gradient(185deg, #005eff 35%, #00ffb7 93%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }

      &__item::before {
        content: '';
        position: absolute;
        inset: 0;
        padding: 1px;
        border-radius: 10px;
        background: linear-gradient(
          176deg,
          #0066ff -7%,
          #00ffb7 16%,
          rgba(247, 255, 253, 0.51) 51%,
          rgba(0, 94, 255, 0.3) 85%,
          rgba(0, 94, 255, 0.6) 100%
        );
        -webkit-mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        z-index: -1;
      }
    }
  }
}
</style>
