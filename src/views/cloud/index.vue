<template>
  <div class="cloud-page relative isolate w-full overflow-x-hidden bg-black">
    <!-- 背景层：与首页保持一致 -->
    <div class="top-bg">
      <span class="binary-texture binary-texture-blue" aria-hidden="true"></span>
      <span class="binary-texture binary-texture-green" aria-hidden="true"></span>
    </div>

    <!-- 第一屏：云端编程工作空间主视觉 -->
    <section
      class="relative z-[1] flex w-full items-start justify-center px-8 pt-[132px] pb-[104px] max-md:px-5 max-md:pt-[72px] max-md:pb-14 max-[480px]:pt-14 max-[360px]:pt-12"
    >
      <div class="w-[var(--cloud-actual-w)] max-w-full">
        <div class="text-left">
          <h1 class="m-0 text-2xl leading-[1.2] font-bold tracking-normal text-white">
            {{ t('cloud.hero.title') }}
          </h1>
          <p
            class="mt-2 mb-0 text-base leading-[1.45] font-normal tracking-normal text-white/[0.82]"
          >
            {{ t('cloud.hero.subtitle') }}
          </p>
          <div
            class="mt-4 mb-6 flex gap-[17px] max-md:flex-col max-md:gap-2"
            aria-label="CoStrict Cloud actions"
          >
            <button
              class="inline-flex h-[34px] w-36 cursor-pointer items-center justify-center rounded border-0 bg-gradient-to-r from-[#177aff] to-[#5ce8d1] text-[10px] leading-none font-bold tracking-normal text-white transition-[transform,border-color,background,box-shadow] duration-[180ms] ease-in-out hover:-translate-y-px max-md:w-full max-md:max-w-36"
              type="button"
              @click="openCloud"
            >
              {{ t('cloud.hero.primaryCta') }}
            </button>
            <button
              class="inline-flex h-[34px] w-36 cursor-pointer items-center justify-center gap-1.5 rounded border border-[#2a61e4] bg-[#0d1f3b] text-[10px] leading-none font-bold tracking-normal text-white transition-[transform,border-color,background,box-shadow] duration-[180ms] ease-in-out hover:-translate-y-px hover:border-[#5ce8d1] max-md:w-full max-md:max-w-36"
              type="button"
              @click="openManual"
            >
              {{ t('cloud.hero.secondaryCta') }}
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
        <img
          class="block h-auto w-full select-none object-contain object-left-top"
          :src="currentHeroImage"
          :alt="t('cloud.hero.imageAlt')"
        />
      </div>
    </section>

    <!-- 第二屏：将本地研发环境接入 Cloud -->
    <section
      class="relative z-[1] flex w-full flex-col items-center justify-center px-8 pt-0 pb-[112px] max-md:px-5 max-md:pb-16"
    >
      <div class="mb-[52px] w-[var(--cloud-actual-w)] max-w-full text-center max-md:mb-8">
        <h2
          class="m-0 text-[38px] leading-[1.2] font-bold tracking-normal text-white max-[480px]:text-[22px] max-[360px]:text-[19px]"
        >
          {{ t('cloud.section2.title') }}
        </h2>
        <p
          class="mx-auto mt-2 mb-0 max-w-[940px] whitespace-normal text-base leading-[1.6] font-normal tracking-normal text-white/[0.72] max-md:leading-[1.55]"
        >
          {{ t('cloud.section2.subtitle') }}
        </p>
      </div>
      <div
        class="grid w-[var(--cloud-actual-w)] max-w-full grid-cols-4 gap-4 max-[1320px]:grid-cols-2 max-md:grid-cols-1"
        :aria-label="t('cloud.section2.imageAlt')"
      >
        <article
          v-for="item in localEnvCards"
          :key="item.key"
          class="flex min-h-[410px] flex-col overflow-hidden rounded-lg border border-[rgba(69,111,177,0.34)] bg-gradient-to-b from-[rgba(9,20,38,0.92)] to-[rgba(4,10,19,0.96)] p-[20px_20px_24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] max-[1320px]:min-h-[360px] max-md:min-h-[auto] max-md:p-[18px_18px_22px]"
        >
          <div class="flex min-h-[34px] items-center gap-2.5 max-md:gap-2">
            <span aria-hidden="true">
              <img
                class="block h-[54px] w-[54px] object-contain max-md:h-10 max-md:w-10 max-[360px]:h-[34px] max-[360px]:w-[34px]"
                :src="item.iconSrc"
                :alt="t(`cloud.section2.cards.${item.key}.title`)"
              />
            </span>
            <h3
              class="m-0 text-base leading-[1.35] font-bold tracking-normal text-white max-md:text-[15px] max-md:leading-[1.3]"
            >
              {{ t(`cloud.section2.cards.${item.key}.title`) }}
            </h3>
          </div>
          <p
            class="mt-4 mb-0 text-[13px] leading-[1.62] font-normal tracking-normal text-white/[0.68]"
          >
            {{ t(`cloud.section2.cards.${item.key}.desc`) }}
          </p>
          <div class="mt-auto items-end max-md:min-h-24" aria-hidden="true">
            <img
              class="mt-5"
              :src="item.imageSrc"
              :alt="t(`cloud.section2.cards.${item.key}.title`)"
            />
          </div>
        </article>
      </div>
    </section>
    <!-- 第三屏：覆盖研发协作关键场景 -->
    <section
      class="relative z-[1] flex w-full flex-col items-center justify-center px-8 pt-0 pb-[104px] max-md:px-5 max-md:pb-14"
    >
      <div class="mb-14 w-[var(--cloud-actual-w)] max-w-full text-center max-md:mb-8">
        <h2 class="m-0 text-[38px] leading-[1.2] font-bold tracking-normal text-white">
          {{ t('cloud.section3.title') }}
        </h2>
        <p
          class="mx-auto mt-2 mb-0 max-w-[940px] text-base leading-[1.6] font-normal tracking-normal text-white/[0.72] max-md:leading-[1.55]"
        >
          {{ t('cloud.section3.subtitle') }}
        </p>
      </div>
      <div
        class="grid w-[var(--cloud-actual-w)] max-w-full grid-cols-3 gap-5 max-md:grid-cols-1"
        :aria-label="t('cloud.section3.imageAlt')"
      >
        <article
          v-for="item in scenarioCards"
          :key="item.key"
          class="flex min-h-[304px] flex-col overflow-hidden rounded-lg border border-[rgba(69,111,177,0.34)] bg-gradient-to-b from-[rgba(9,20,38,0.92)] to-[rgba(4,10,19,0.96)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] max-md:min-h-[auto]"
        >
          <div
            class="relative flex h-[220px] items-center justify-center p-[22px] max-md:min-h-[150px]"
            aria-hidden="true"
          >
            <span
              class="absolute top-[18px] left-[22px] inline-flex h-[22px] items-center rounded-full border px-3 text-[11px] font-bold"
              :class="{
                'border-[rgba(86,131,255,0.26)] bg-[rgba(45,80,210,0.28)] text-[#8db6ff]':
                  item.key === 'assets',
                'border-[rgba(180,124,255,0.28)] bg-[rgba(116,70,208,0.3)] text-[#c79cff]':
                  item.key === 'progress',
                'border-[rgba(92,232,209,0.24)] bg-[rgba(26,117,116,0.36)] text-[#8ff7e9]':
                  item.key === 'handoff',
              }"
              >{{ t(`cloud.section3.cards.${item.key}.tag`) }}</span
            >
            <img
              class="mt-[30px] block w-full max-h-[132px] object-contain"
              :src="item.imageSrc"
              :alt="t(`cloud.section3.cards.${item.key}.title`)"
            />
          </div>
          <div class="mt-auto p-6">
            <h3 class="m-0 text-base leading-[1.35] font-bold tracking-normal text-white">
              {{ t(`cloud.section3.cards.${item.key}.title`) }}
            </h3>
            <p
              class="mt-4 mb-0 text-[13px] leading-[1.62] font-normal tracking-normal text-white/[0.68]"
            >
              {{ t(`cloud.section3.cards.${item.key}.desc`) }}
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- 第四屏：FAQ / 快速排查，与前屏等宽 -->
    <section
      class="relative z-[1] flex w-full justify-center px-8 pt-0 pb-24 max-md:px-5 max-md:pb-10"
    >
      <div class="w-[var(--cloud-actual-w)] max-w-full">
        <CloudFAQ />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import CloudHeroZhImage from '@/assets/cloud/section-ch-en/section1-ch.png'
import CloudHeroEnImage from '@/assets/cloud/section-ch-en/section1-en.png'
import AiChatCodeZhImage from '@/assets/section2/ai-chat-code-zh.webp'
import AiChatCodeEnImage from '@/assets/section2/ai-chat-code-en.webp'
import AiChatIconImage from '@/assets/section2/ai-chat-icon.webp'
import DeviceAccessDiagramEnImage from '@/assets/section2/device-access-diagram-en.webp'
import DeviceAccessDiagramZhImage from '@/assets/section2/device-access-diagram-zh.webp'
import DeviceListEnImage from '@/assets/section2/device-list-en.webp'
import DeviceListZhImage from '@/assets/section2/device-list-zh.webp'
import KnowledgeHubEnImage from '@/assets/section2/knowledge-hub-en.webp'
import KnowledgeHubZhImage from '@/assets/section2/knowledge-hub-zh.webp'
import LocalDeviceIconImage from '@/assets/section2/local-device-icon.webp'
import MobileTaskEnImage from '@/assets/section2/mobile-task-en.webp'
import MobileTaskZhImage from '@/assets/section2/mobile-task-zh.webp'
import TaskListEnImage from '@/assets/section2/task-list-en.webp'
import TaskListZhImage from '@/assets/section2/task-list-zh.webp'
import TeamAssetsIconImage from '@/assets/section2/team-assets-icon.webp'
import WorkspaceFolderIconImage from '@/assets/section2/workspace-folder-icon.webp'
import WorkspaceListEnImage from '@/assets/section2/workspace-list-en.webp'
import WorkspaceListZhImage from '@/assets/section2/workspace-list-zh.webp'
import CloudFAQ from './components/CloudFAQ.vue'

interface CloudFeatureItem {
  key: string
  iconSrc: string
  imageSrc: string
}

const { t, locale } = useI18n()

defineOptions({
  name: 'CloudIndex',
})

const isEnglishLocale = computed(() => locale.value === 'en')

const localEnvCards = computed<CloudFeatureItem[]>(() => [
  {
    key: 'login',
    iconSrc: LocalDeviceIconImage,
    imageSrc: isEnglishLocale.value ? DeviceListEnImage : DeviceListZhImage,
  },
  {
    key: 'workspace',
    iconSrc: WorkspaceFolderIconImage,
    imageSrc: isEnglishLocale.value ? WorkspaceListEnImage : WorkspaceListZhImage,
  },
  {
    key: 'chat',
    iconSrc: AiChatIconImage,
    imageSrc: isEnglishLocale.value ? AiChatCodeEnImage : AiChatCodeZhImage,
  },
  {
    key: 'mobile',
    iconSrc: TeamAssetsIconImage,
    imageSrc: isEnglishLocale.value ? TaskListEnImage : TaskListZhImage,
  },
])

const scenarioCards = computed<CloudFeatureItem[]>(() => [
  {
    key: 'handoff',
    iconSrc: '',
    imageSrc: isEnglishLocale.value ? DeviceAccessDiagramEnImage : DeviceAccessDiagramZhImage,
  },
  {
    key: 'assets',
    iconSrc: '',
    imageSrc: isEnglishLocale.value ? KnowledgeHubEnImage : KnowledgeHubZhImage,
  },
  {
    key: 'progress',
    iconSrc: '',
    imageSrc: isEnglishLocale.value ? MobileTaskEnImage : MobileTaskZhImage,
  },
])

const currentHeroImage = computed(() => {
  return isEnglishLocale.value ? CloudHeroEnImage : CloudHeroZhImage
})

const docsBaseUrl = computed(() => `https://docs.costrict.ai${isEnglishLocale.value ? '/en' : ''}`)

const openCloud = () => {
  window.open('https://zgsm.sangfor.com/cloud', '_blank', 'noopener')
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

@media (max-width: 768px) {
  .cloud-page {
    --cloud-w: 74vw;
    /* 移动端宽度优先，不按高度反算 */
    --cloud-actual-w: var(--cloud-w);
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
