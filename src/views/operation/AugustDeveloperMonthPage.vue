<script setup lang="ts">
import { useHead } from '@unhead/vue'
import AugustDeveloperMonthSection from './components/AugustDeveloperMonthSection.vue'

defineOptions({ name: 'AugustDeveloperMonthPage' })

useHead({
  title: 'CoStrict 8月开发者福利月 - 用户权益、模型生态与产品能力升级',
  meta: [
    {
      name: 'description',
      content: 'CoStrict 8月开发者福利月，带来用户权益、模型生态与产品能力三大升级。',
    },
    {
      property: 'og:title',
      content: 'CoStrict 8月开发者福利月',
    },
    {
      property: 'og:description',
      content: '用户权益、模型生态与产品能力三大升级。',
    },
    {
      property: 'og:url',
      content: 'https://costrict.ai/operation/august-developer-month',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://costrict.ai/operation/august-developer-month',
    },
  ],
})
</script>

<template>
  <div class="august-campaign-page min-h-screen bg-black text-white">
    <AugustDeveloperMonthSection />
  </div>
</template>

<style scoped lang="less">
.august-campaign-page {
  padding: 0;
}
</style>
