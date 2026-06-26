<template>
  <div class="home-page w-full bg-black overflow-x-hidden">
    <SloganSection />
    <div class="responsive-container mx-auto">
      <StrictMode />
      <CodeReview />
      <MoreTool />
      <EnterpriseDeployment />
      <LanguageSupport />
    </div>
    <FooterCopyright />
    <SurveyGiftEntry
      class="fixed right-[30px] top-[18vh] z-[1000] max-md:right-4 max-md:top-20"
    />
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
    <img
      src="../../assets/home/left_port.webp"
      class="absolute left-0 top-[1538px]"
      alt="left port"
    />
    <img
      src="../../assets/home/right_port.webp"
      class="absolute right-0 top-[1347px]"
      alt="right port"
    />
    <div class="top-bg">
      <span class="binary-texture binary-texture-blue" aria-hidden="true"></span>
      <span class="binary-texture binary-texture-green" aria-hidden="true"></span>
    </div>
    <!-- <img
      src="../../assets/home/summary_icon.webp"
      class="absolute right-[30px] top-[80px] cursor-pointer z-1000 summary-icon"
      alt="Summary Icon"
      @click="toSummary"
      v-if="!isEnglish"
    /> -->
    <!-- <img
      src="../../assets/home/competition.webp"
      class="absolute right-[-15px] top-[80px] cursor-pointer z-1000 competition-icon"
      alt="CoStrict Competition"
      @click="toCompetition"
      v-if="!isEnglish"
    /> -->
  </div>
</template>
<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import SloganSection from './SloganSection.vue'
import StrictMode from './StrictMode.vue'
import CodeReview from './CodeReview.vue'
import MoreTool from './MoreTool.vue'
import EnterpriseDeployment from './EnterpriseDeployment.vue'
import LanguageSupport from './LanguageSupport.vue'
import FooterCopyright from './FooterCopyright.vue'
import SurveyGiftEntry from './components/SurveyGiftEntry.vue'
import StructuredData from '@/components/StructuredData.vue'

// 组件名称通过文件名定义为 HomeIndex
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
    { property: 'og:image', content: 'https://costrict.ai/og-image.png' },
    { name: 'twitter:title', content: 'CoStrict - 企业级AI编程工具 | 开源免费 | 私有化部署' },
    {
      name: 'twitter:description',
      content: 'CoStrict 是一款免费开源的AI辅助编程工具，支持企业私有化部署，提升团队开发效率。',
    },
    { name: 'twitter:image', content: 'https://costrict.ai/og-image.png' },
  ],
  link: [{ rel: 'canonical', href: 'https://costrict.ai/' }],
})
</script>
<style scoped lang="less">
.home-page {
  position: relative;
  isolation: isolate;
}

.top-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 44%, rgba(0, 102, 255, 0.06), transparent 48%),
    linear-gradient(180deg, #000 0%, #03050a 54%, #000 100%);
  isolation: isolate;

  &::before,
  &::after {
    content: '';
    position: absolute;
    z-index: 0;
    display: block;
    border-radius: 999px;
    filter: blur(88px);
    opacity: 0.72;
    transform: translate3d(0, 0, 0);
    transform-origin: center;
    will-change: transform, opacity;
  }

  &::before {
    top: 84px;
    left: 82%;
    width: min(560px, 46vw);
    height: min(370px, 31vw);
    background: radial-gradient(
      circle at 48% 48%,
      rgba(29, 123, 255, 0.66),
      rgba(0, 102, 255, 0.24) 38%,
      transparent 72%
    );
    animation: hero-blue-breathe 6.6s ease-in-out infinite;
  }

  &::after {
    top: 304px;
    left: 4%;
    width: min(420px, 34vw);
    height: min(300px, 26vw);
    background: radial-gradient(
      circle at 45% 50%,
      rgba(37, 232, 196, 0.78),
      rgba(0, 209, 150, 0.28) 42%,
      transparent 74%
    );
    animation: hero-green-breathe 8.5s ease-in-out infinite;
  }

  @media (max-width: 480px) {
    &::before {
      top: 104px;
      left: 88%;
      width: 320px;
      height: 250px;
      filter: blur(66px);
    }

    &::after {
      top: 318px;
      left: -14%;
      width: 260px;
      height: 210px;
      filter: blur(58px);
    }
  }
}

.binary-texture {
  position: absolute;
  z-index: 1;
  display: block;
  pointer-events: none;
  overflow: hidden;
  background-image: url('@/assets/home/binary-texture.webp');
  background-repeat: repeat;
  background-size: 430px 430px;
  mix-blend-mode: screen;
  opacity: 0.08;
  filter: invert(1) hue-rotate(174deg) saturate(1.8) blur(0.15px);
  mask-image: radial-gradient(ellipse at center, #000 0%, rgba(0, 0, 0, 0.9) 38%, transparent 76%);
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    #000 0%,
    rgba(0, 0, 0, 0.9) 38%,
    transparent 76%
  );
  will-change: background-position;

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    pointer-events: none;
    mix-blend-mode: screen;
  }

  &::before {
    inset: -18%;
    background: linear-gradient(
      112deg,
      transparent 0%,
      transparent 37%,
      rgba(178, 224, 255, 0.05) 45%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(80, 232, 210, 0.08) 56%,
      transparent 65%,
      transparent 100%
    );
    opacity: 0.7;
    transform: translate3d(-78%, -22%, 0) rotate(-3deg);
    animation: binary-sheen 7.8s cubic-bezier(0.45, 0, 0.2, 1) infinite;
    will-change: transform, opacity;
  }

  &::after {
    inset: 0;
    background: radial-gradient(ellipse at 72% 22%, rgba(255, 255, 255, 0.06), transparent 46%);
    opacity: 0.55;
  }
}

.binary-texture-blue {
  top: 46px;
  left: 67%;
  width: min(500px, 38vw);
  height: min(310px, 24vw);
  transform: rotate(5deg);
  clip-path: polygon(16% 0, 100% 6%, 94% 78%, 70% 100%, 34% 88%, 22% 56%, 0 42%);
  animation: binary-drift-blue 12s linear infinite;
}

.binary-texture-green {
  top: 382px;
  left: -2%;
  width: min(390px, 30vw);
  height: min(260px, 21vw);
  transform: rotate(-7deg);
  clip-path: polygon(0 20%, 44% 0, 76% 18%, 100% 68%, 74% 100%, 20% 84%);
  opacity: 0.075;
  filter: invert(1) hue-rotate(132deg) saturate(1.8) blur(0.2px);
  animation: binary-drift-green 26s linear infinite;

  &::before {
    display: none;
  }

  &::after {
    opacity: 0.28;
  }
}

@keyframes hero-blue-breathe {
  0% {
    transform: translate3d(-50%, -2%, 0) scale(0.88);
    opacity: 0.48;
    filter: blur(96px);
  }

  45% {
    transform: translate3d(-58%, 3%, 0) scale(1.1);
    opacity: 0.75;
    filter: blur(82px);
  }

  62% {
    transform: translate3d(-55%, 2%, 0) scale(1.02);
    opacity: 0.58;
    filter: blur(90px);
  }

  100% {
    transform: translate3d(-50%, -2%, 0) scale(0.88);
    opacity: 0.48;
    filter: blur(96px);
  }
}

@keyframes hero-green-breathe {
  0% {
    transform: translate3d(-12%, 8%, 0) scale(0.86);
    opacity: 0.42;
    filter: blur(88px);
  }

  50% {
    transform: translate3d(4%, -4%, 0) scale(1.16);
    opacity: 0.82;
    filter: blur(72px);
  }

  100% {
    transform: translate3d(-12%, 8%, 0) scale(0.86);
    opacity: 0.42;
    filter: blur(88px);
  }
}

@keyframes binary-drift-blue {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 56px -26px;
  }
}

@keyframes binary-drift-green {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: -18px 12px;
  }
}

@keyframes binary-sheen {
  0%,
  28% {
    transform: translate3d(-82%, -24%, 0) rotate(-3deg);
    opacity: 0;
  }

  46% {
    opacity: 0.7;
  }

  62% {
    transform: translate3d(82%, -6%, 0) rotate(-3deg);
    opacity: 0;
  }

  100% {
    transform: translate3d(82%, -6%, 0) rotate(-3deg);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .top-bg::before,
  .top-bg::after,
  .binary-texture {
    animation: none;
  }
}

.competition-icon:hover {
  transform: translateX(-15px);
}

.competition-icon {
  transition: all ease-in 0.3s;
}

/* 在移动设备上禁用动画 */
@media (max-width: 768px) {
  // .summary-icon {
  //   width: 90px;
  //   top: 68px;
  //   right: 0;
  // }

  .competition-icon:hover {
    transform: none !important;
  }

  .competition-icon:active {
    transform: none !important;
  }

  .competition-icon {
    transition: none !important;
    cursor: pointer;
    width: 140px;
    top: 88px;
    right: 0;
  }
}

.responsive-container {
  position: relative;
  z-index: 1;
  width: 70%;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
}
</style>
