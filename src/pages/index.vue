<template>
  <div class="w-full bg-black overflow-x-hidden">
    <SloganSection />
    <ClientOnly>
      <div class="responsive-container mx-auto">
        <StrictMode />
        <CodeReview />
        <MoreTool />
        <EnterpriseDeployment />
        <LanguageSupport />
      </div>
      <!-- FooterCopyright 为全宽设计，不受 responsive-container 宽度约束 -->
      <FooterCopyright />
      <template #fallback>
        <!-- 占位高度防止 CLS，约等于所有首屏以下区块的总高度估算值，可根据实际内容调整 -->
        <div style="min-height: 3500px"></div>
      </template>
    </ClientOnly>
    <StructuredData
      schemaType="Organization"
      :data="{
        name: 'CoStrict',
        url: 'https://costrict.ai/',
        logo: 'https://costrict.ai/favicon.png',
        description: 'CoStrict 是一款免费开源的AI辅助编程工具，支持企业私有化部署',
        sameAs: ['https://github.com/zgsm-ai/costrict'],
      }"
    />
    <StructuredData
      schemaType="SoftwareApplication"
      :data="{
        name: 'CoStrict',
        operatingSystem: 'Windows, macOS, Linux',
        applicationCategory: 'DeveloperApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CNY',
        },
      }"
    />
    <img :src="leftPortImg" class="absolute left-0 top-[1538px]" alt="left port" />
    <img :src="rightPortImg" class="absolute right-0 top-[1347px]" alt="right port" />
    <div class="absolute left-0 top-0 h-80 sm:h-112 md:h-120 lg:h-124 w-full top-bg"></div>
  </div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import SloganSection from './home/SloganSection.vue'
import StructuredData from '@/components/StructuredData.vue'
import leftPortImg from '@/assets/home/left_port.webp'
import rightPortImg from '@/assets/home/right_port.webp'

const StrictMode = defineAsyncComponent(() => import('./home/StrictMode.vue'))
const CodeReview = defineAsyncComponent(() => import('./home/CodeReview.vue'))
const MoreTool = defineAsyncComponent(() => import('./home/MoreTool.vue'))
const EnterpriseDeployment = defineAsyncComponent(() => import('./home/EnterpriseDeployment.vue'))
const LanguageSupport = defineAsyncComponent(() => import('./home/LanguageSupport.vue'))
const FooterCopyright = defineAsyncComponent(() => import('./home/FooterCopyright.vue'))

defineOptions({
  name: 'HomeIndex',
})

useHead({
  title: 'CoStrict - 企业级AI编程工具 | 开源免费 | 私有化部署',
  meta: [
    {
      name: 'description',
      content:
        'CoStrict 是一款免费开源的AI辅助编程工具，支持企业私有化部署，提升团队开发效率，是企业严肃编程的最佳选择。',
    },
    { property: 'og:title', content: 'CoStrict - 企业级AI编程工具 | 开源免费 | 私有化部署' },
    {
      property: 'og:description',
      content:
        'CoStrict 是一款免费开源的AI辅助编程工具，支持企业私有化部署，提升团队开发效率，是企业严肃编程的最佳选择。',
    },
    { property: 'og:url', content: 'https://costrict.ai/' },
    { property: 'og:image', content: 'https://costrict.ai/favicon.png' },
    { name: 'twitter:title', content: 'CoStrict - 企业级AI编程工具 | 开源免费 | 私有化部署' },
    {
      name: 'twitter:description',
      content: 'CoStrict 是一款免费开源的AI辅助编程工具，支持企业私有化部署，提升团队开发效率。',
    },
    { name: 'twitter:image', content: 'https://costrict.ai/favicon.png' },
  ],
  link: [{ rel: 'canonical', href: 'https://costrict.ai/' }],
})
</script>
<style scoped lang="less">
.top-bg {
  background-image: url('@/assets/home/top.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 480px) {
    height: 288px;
  }

  @media (max-width: 375px) {
    height: 268px;
  }
}

.responsive-container {
  width: 70%;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
}
</style>
