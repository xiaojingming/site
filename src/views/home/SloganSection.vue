<template>
  <div class="slogan-section w-full relative z-50">
    <div class="hero-copy w-full flex flex-col items-center">
        <div
          class="text-xl sm:text-2xl"
          :class="[
            'oss-btn',
            `oss-btn-${locale}`,
            'flex',
            'items-center',
            'justify-center',
            'text-white',
            'h-10',
            'w-36',
            ossButtonWidth,
          ]"
        >
          {{ t('home.slogan.ossButton') }}
        </div>
        <div class="flex items-center mt-5 sm:mt-8">
          <div
            class="text-xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl"
            :class="['text-white', isEn ? '' : 'slogan-title']"
          >
            {{ t('home.slogan.title') }}
          </div>
        </div>
      <div class="flex flex-col items-center">
      <div
        class="text-xl lg:text-6xl md:text-5xl sm:text-4xl"
        :class="['text-white', isEn ? 'max-w-[90%]' : 'slogan-subTitle']"
      >
        {{ t('home.slogan.subTitle') }}
      </div>
      <div
        class="description text-white/80 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 text-center"
        :class="{ 'description-en': isEn }"
      >
        {{ t('home.slogan.description') }}
      </div>
      <div
        class="button-group flex gap-3 sm:gap-4 mt-5 sm:mt-7.5 text-sm xl:text-2xl lg:text-xl md:text-base sm:text-sm text-white"
        :class="{ 'button-group-en': isEn }"
      >
        <div
          v-for="(button, index) in buttons"
          :key="index"
          class="hero-button flex items-center justify-center cursor-pointer px-5 sm:px-6"
          :class="button.specificClasses"
          @mouseenter="scrambleButton(index)"
          @focus="scrambleButton(index)"
          @click="button.action"
        >
          <span>{{ scrambleLabels[index] || t(button.textKey) }}</span>
        </div>
      </div>
      <button class="enterprise-link" type="button" @click="toDeployment">
        {{ t('home.slogan.enterpriseButton') }}
      </button>
    </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()
const router = useRouter()
const scrambleLabels = ref<string[]>([])
const scrambleTimers: number[] = []

const isEn = computed(() => locale.value === 'en')

const ossButtonWidth = computed(() => {
  return isEn.value ? 'w-[280px]' : 'w-[143px]'
})

const buttons = computed(() => [
  {
    specificClasses: ['cloud-button', `cloud-button-${locale.value}`],
    textKey: 'home.slogan.cloudButton',
    action: toCloud,
  },
  {
    specificClasses: ['personal-button', `personal-button-${locale.value}`],
    textKey: 'home.slogan.personalButton',
    action: toDownload,
  },
])

const syncButtonLabels = () => {
  scrambleLabels.value = buttons.value.map((button) => t(button.textKey))
}

const canScramble = () => {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const scrambleButton = (index: number) => {
  if (!canScramble()) return

  const button = buttons.value[index]
  if (!button) return

  const original = t(button.textKey)
  const glyphs = 'AI<>/{}[]01+-'
  const steps = 12
  let frame = 0

  window.clearInterval(scrambleTimers[index])
  scrambleLabels.value[index] = original

  scrambleTimers[index] = window.setInterval(() => {
    frame += 1
    const progress = frame / steps
    const activeIndex = Math.min(original.length - 1, Math.floor(progress * original.length))
    const settled = Math.max(0, activeIndex)

    scrambleLabels.value[index] = original.split('').map((char, charIndex) => {
      if (char.trim() === '') return char
      if (charIndex < settled) return char
      if (charIndex === activeIndex) return glyphs[Math.floor(Math.random() * glyphs.length)]
      return ' '
    }).join('')

    if (frame >= steps) {
      window.clearInterval(scrambleTimers[index])
      scrambleLabels.value[index] = original
    }
  }, 48)
}

const toCloud = () => {
  window.open('https://zgsm.sangfor.com/cloud')
}

const toDownload = () => {
  router.push('/download')
}

const toDeployment = () => {
  window.open('https://docs.costrict.ai/deployment/introduction/')
}

defineOptions({
  name: 'SloganSection',
})

watch(locale, syncButtonLabels, { immediate: true })

onBeforeUnmount(() => {
  scrambleTimers.forEach((timer) => window.clearInterval(timer))
})
</script>

<style lang="less" scoped>
:host,
.w-full.relative {
  position: relative;
  z-index: 1;
}

.slogan-section {
  display: flex;
  box-sizing: border-box;
  min-height: clamp(640px, 72vh, 760px);
  padding: clamp(146px, 15vh, 180px) 16px 42px;
  align-items: flex-start;
  justify-content: center;
}

.hero-copy {
  gap: 0;
  text-align: center;
}

.oss-btn {
  box-sizing: border-box;
  text-align: center;
  letter-spacing: normal;
  background: linear-gradient(99deg, #00ffb7 2%, #ffffff 68%, #c5dbff 101%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border-image: linear-gradient(
      93deg,
      rgba(0, 102, 254, 0) 0%,
      #ffffff 50%,
      rgba(0, 102, 254, 0) 90%
    )
    2 0 2 0;
  border-width: 2px 0px 2px 0px;
  border-style: solid;

  &-en {
    width: 280px;
    height: 40px;
  }

}

.cloud-button {
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 6px;
  box-shadow: 0 0 28px rgba(23, 123, 255, 0.16);
  transition:
    opacity 180ms ease,
    box-shadow 260ms ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background: linear-gradient(99deg, #177bff 0%, #16dec2 100%);
  }

  &-en {
    background: transparent;
  }

  &:hover {
    opacity: 1;
    box-shadow:
      0 0 34px rgba(23, 123, 255, 0.22),
      0 0 28px rgba(22, 222, 194, 0.16);
  }

}

.hero-button {
  position: relative;
  z-index: 0;
  flex: 1 1 0;
  min-width: 128px;
  box-sizing: border-box;
  line-height: 1;
  height: 48px;
  isolation: isolate;
  transition:
    color 220ms ease,
    border-color 220ms ease,
    background 220ms ease,
    box-shadow 260ms ease;

  span {
    position: relative;
    z-index: 1;
    min-width: 4em;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  @media (min-width: 640px) {
    min-width: 148px;
  }
}

.personal-button {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 6px;
  background: transparent;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    padding: 1px;
    border-radius: inherit;
    background: linear-gradient(99deg, #177bff 0%, #16dec2 100%);
    opacity: 0;
    pointer-events: none;
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    transition: opacity 220ms ease;
  }

  span {
    color: #ffffff;
    background: none;
    background-clip: initial;
    -webkit-background-clip: initial;
  }

  &:hover {
    opacity: 1;
    border-color: transparent;
    background: transparent;
    box-shadow: 0 0 26px rgba(23, 123, 255, 0.14);

    &::before {
      opacity: 1;
    }

    span {
      color: transparent;
      background: linear-gradient(99deg, #177bff 0%, #16dec2 100%);
      background-clip: text;
      -webkit-background-clip: text;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .cloud-button,
  .hero-button,
  .personal-button {
    transition: none;
  }
}

.button-group-en {
  @media (max-width: 375px) {
    flex-direction: column;
  }
}

.button-group {
  width: min(413px, calc(100vw - 76px));
  align-items: stretch;
}

.enterprise-link {
  margin-top: 28px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 14px;
  line-height: 20px;
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: color 180ms ease;

  &::after {
    content: ' →';
  }

  &:hover {
    color: #ffffff;
  }
}

.description {
  width: max-content;
  max-width: 860px;
  line-height: 1.65;
}

.description-en {
  width: min(486px, calc(100vw - 76px));
}

.button-group-en {
  width: min(486px, calc(100vw - 76px));
}

@media (max-width: 768px) {
  .description,
  .button-group {
    width: min(486px, calc(100vw - 56px));
    min-width: 0;
  }
}

.slogan-title {
  letter-spacing: 0;
}

.slogan-subTitle {
  letter-spacing: 0;
  margin-top: clamp(28px, 3.8vw, 52px);
}

@media (max-width: 480px) {
  .slogan-section {
    min-height: 560px;
    padding-top: 108px;
    padding-bottom: 28px;
  }

  .enterprise-link {
    font-size: 12px;
  }

  .hero-button {
    min-width: 116px;
    height: 48px;
  }
}
</style>
