<template>
  <div class="cloud-page w-full bg-black overflow-x-hidden">
    <!-- 背景层：与首页保持一致 -->
    <div class="top-bg">
      <span class="binary-texture binary-texture-blue" aria-hidden="true"></span>
      <span class="binary-texture binary-texture-green" aria-hidden="true"></span>
    </div>

    <!-- 第一屏：云端编程工作空间主视觉 -->
    <section class="cloud-hero">
      <div class="cloud-hero__content">
        <div class="cloud-hero__copy">
          <h1>{{ t('cloud.hero.title') }}</h1>
          <p>{{ t('cloud.hero.subtitle') }}</p>
          <div class="cloud-hero__actions" aria-label="CoStrict Cloud actions">
            <button class="cloud-hero__button cloud-hero__button--primary" type="button" @click="openCloud">
              {{ t('cloud.hero.primaryCta') }}
            </button>
            <button class="cloud-hero__button cloud-hero__button--secondary" type="button" @click="openManual">
              {{ t('cloud.hero.secondaryCta') }}
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      <img
        class="cloud-hero__image"
          :src="currentHeroImage"
          :alt="t('cloud.hero.imageAlt')"
      />
      </div>
    </section>

    <!-- 第二屏：将本地研发环境接入 Cloud -->
    <section class="cloud-section cloud-section--local-env">
      <div class="cloud-section__header cloud-section__header--local-env">
        <h2>{{ t('cloud.section2.title') }}</h2>
        <p>{{ t('cloud.section2.subtitle') }}</p>
      </div>
      <img
        class="cloud-section__image cloud-section__image--local-env"
        :src="currentSection2Image"
        :alt="t('cloud.section2.imageAlt')"
      />
    </section>
    <!-- 第三屏：覆盖研发协作关键场景 -->
    <section class="cloud-section cloud-section--scenarios">
      <div class="cloud-section__header">
        <h2>{{ t('cloud.section3.title') }}</h2>
        <p>{{ t('cloud.section3.subtitle') }}</p>
      </div>
      <img
        class="cloud-section__image cloud-section__image--scenarios"
        :src="currentSection3Image"
        :alt="t('cloud.section3.imageAlt')"
      />
    </section>

    <!-- 第四屏：FAQ / 快速排查，与前屏等宽 -->
    <section class="cloud-section">
      <CloudFAQ class="cloud-section__faq" />
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import CloudHeroZhImage from '@/assets/cloud/section-ch-en/section1-ch.png'
import CloudHeroEnImage from '@/assets/cloud/section-ch-en/section1-en.png'
import Section2ZhImage from '@/assets/cloud/section-ch-en/section2-ch.png'
import Section2EnImage from '@/assets/cloud/section-ch-en/section2-en.png'
import Section3ZhImage from '@/assets/cloud/section-ch-en/section3-ch.png'
import Section3EnImage from '@/assets/cloud/section-ch-en/section3-en.png'
import CloudFAQ from './components/CloudFAQ.vue'

const { t, locale } = useI18n()

defineOptions({
  name: 'CloudIndex',
})

const currentSection3Image = computed(() => {
  return locale.value === 'en' ? Section3EnImage : Section3ZhImage
})

const currentSection2Image = computed(() => {
  return locale.value === 'en' ? Section2EnImage : Section2ZhImage
})

const currentHeroImage = computed(() => {
  return locale.value === 'en' ? CloudHeroEnImage : CloudHeroZhImage
})

const docsBaseUrl = computed(() => `https://docs.costrict.ai${locale.value === 'en' ? '/en' : ''}`)

const openCloud = () => {
  window.open('https://zgsm.sangfor.com/credit/manager/login', '_blank', 'noopener')
}

const openManual = () => {
  window.open(docsBaseUrl.value, '_blank', 'noopener')
}

useHead({
  title: 'CoStrict Cloud - 云端编程平台',
  meta: [
    {
      name: 'description',
      content: 'CoStrict Cloud 云端编程平台，开箱即用的 AI 辅助编程环境。',
    },
  ],
})
</script>

<style scoped lang="less">
.cloud-page {
  position: relative;
  isolation: isolate;
  /* 宽度上限：视口允许的最大内容宽度 */
  --cloud-w: min(76vw, 1280px);
  /* 各屏实际宽度：保持统一左右留白 */
  --cloud-actual-w: var(--cloud-w);
}

/* ============ 背景层：复刻首页动效 ============ */
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
    background:
      radial-gradient(circle at 48% 48%, rgba(29, 123, 255, 0.66), rgba(0, 102, 255, 0.24) 38%, transparent 72%);
    animation: hero-blue-breathe 6.6s ease-in-out infinite;
  }

  &::after {
    top: 304px;
    left: 4%;
    width: min(420px, 34vw);
    height: min(300px, 26vw);
    background:
      radial-gradient(circle at 45% 50%, rgba(37, 232, 196, 0.78), rgba(0, 209, 150, 0.28) 42%, transparent 74%);
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
  background-image: url('@/assets/home/binary-texture.png');
  background-repeat: repeat;
  background-size: 430px 430px;
  mix-blend-mode: screen;
  opacity: 0.08;
  filter: invert(1) hue-rotate(174deg) saturate(1.8) blur(0.15px);
  mask-image: radial-gradient(ellipse at center, #000 0%, rgba(0, 0, 0, 0.9) 38%, transparent 76%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 0%, rgba(0, 0, 0, 0.9) 38%, transparent 76%);
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

/* ============ 第一屏：云端编程工作空间主视觉 ============ */
.cloud-hero {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: clamp(120px, 13vh, 150px) var(--space-8) clamp(16px, 3vh, 28px);
}

.cloud-hero__content {
  width: var(--cloud-actual-w);
  max-width: 100%;
}

.cloud-hero__copy {
  text-align: left;

  h1 {
    margin: 0;
    color: #fff;
    font-family: 'PingFang SC', 'PingFang TC', 'Microsoft YaHei', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0;
  }

  p {
    margin: 8px 0 0;
    color: rgba(255, 255, 255, 0.82);
    font-family: 'PingFang SC', 'PingFang TC', 'Microsoft YaHei', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.45;
    letter-spacing: 0;
  }
}

.cloud-hero__actions {
  display: flex;
  gap: 17px;
  margin-top: 16px;
  margin-bottom: 24px;
}

.cloud-hero__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 144px;
  height: 34px;
  border-radius: 4px;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
  cursor: pointer;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-1px);
  }
}

.cloud-hero__button--primary {
  border: 0;
  background: linear-gradient(90deg, #177aff 0%, #5ce8d1 100%);
}

.cloud-hero__button--secondary {
  gap: 6px;
  border: 1px solid #2a61e4;
  background: #0d1f3b;

  &:hover {
    border-color: #5ce8d1;
  }
}

.cloud-hero__image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: left top;
  user-select: none;
}

/* ============ 第二屏及后续 section：与第一屏等宽 ============ */
.cloud-section {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  /* 底部留白与首屏对齐，使 section2→section3 间距 = 首屏→section2 间距 */
  padding: clamp(80px, 8vw, 120px) var(--space-8) clamp(16px, 3vh, 32px);
}

.cloud-section__image {
  display: block;
  width: var(--cloud-actual-w);
  max-width: 100%;
  height: auto;
  user-select: none;
}

.cloud-section--local-env,
.cloud-section--scenarios {
  flex-direction: column;
  align-items: center;
}

.cloud-section__header {
  width: var(--cloud-actual-w);
  max-width: 100%;
  margin-bottom: 56px;
  text-align: center;

  h2 {
    margin: 0;
    color: #fff;
    font-family: 'PingFang SC', 'PingFang TC', 'Microsoft YaHei', sans-serif;
    font-size: 38px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0;
  }

  p {
    margin: 8px auto 0;
    max-width: 940px;
    color: rgba(255, 255, 255, 0.72);
    font-family: 'PingFang SC', 'PingFang TC', 'Microsoft YaHei', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    letter-spacing: 0;
  }
}

.cloud-section__image--scenarios {
  object-fit: contain;
}

.cloud-section__header--local-env {
  margin-bottom: 52px;

  p {
    max-width: 940px;
    white-space: normal;
  }
}

.cloud-section__image--local-env {
  object-fit: contain;
}

.cloud-section__faq {
  width: var(--cloud-actual-w);
  max-width: 100%;
}

@media (max-width: 768px) {
  .cloud-page {
    --cloud-w: 74vw;
    /* 移动端宽度优先，不按高度反算 */
    --cloud-actual-w: var(--cloud-w);
  }

  .cloud-hero {
    min-height: calc(100vh - var(--space-16));
    padding: calc(var(--space-16) + 36px) var(--space-5) 0;
  }

  .cloud-hero__copy {
    h1 {
      font-size: 24px;
    }

    p {
      font-size: 16px;
    }
  }

  .cloud-hero__actions {
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
    margin-bottom: 24px;
  }

  .cloud-hero__button {
    width: 100%;
    max-width: 144px;
    font-size: 10px;
  }

  .cloud-section {
    padding: clamp(56px, 12vw, 88px) var(--space-5) 0;
  }

  .cloud-section__header {
    margin-bottom: 32px;

    h2 {
      font-size: 38px;
    }

    p {
      font-size: 16px;
      line-height: 1.55;
    }
  }

  .cloud-section__header--local-env p {
    white-space: normal;
  }
}

/* ============ 关键帧动画 ============ */
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
</style>
