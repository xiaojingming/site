<template>
  <div class="w-full relative z-50">
    <div class="slogan-container flex w-full h-72 sm:h-92 md:h-102 xl:h-108 justify-center">
      <div class="w-full flex flex-col items-center">
        <div
          class="mt-48 xl:mt-68 lg:mt-68 md:mt-68 sm:mt-62 text-xl sm:text-2xl"
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
      </div>
    </div>
    <div class="flex flex-col items-center pb-7.5 sm:pb-10 md:pb-12 lg:pb-16 xl:pb-37.5">
      <div
        class="text-xl lg:text-6xl md:text-5xl sm:text-4xl"
        :class="['text-white', isEn ? 'max-w-[90%]' : 'slogan-subTitle']"
      >
        {{ t('home.slogan.subTitle') }}
      </div>
      <div
        class="button-group flex gap-4 mt-5 sm:mt-7.5 text-xs xl:text-2xl lg:text-xl md:text-base sm:text-sm text-white"
        :class="{ 'button-group-en': isEn }"
      >
        <div
          v-for="(button, index) in buttons"
          :key="index"
          class="flex items-center justify-center cursor-pointer h-8 md:h-10 lg:h-12 px-3"
          :class="button.specificClasses"
          @click="button.action"
        >
          {{ t(button.textKey) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const { t, locale } = useI18n()

const isEn = computed(() => locale.value === 'en')

const ossButtonWidth = computed(() => {
  return isEn.value ? 'w-[280px]' : 'w-[143px]'
})

const buttons = computed(() => [
  {
    specificClasses: ['enterprise-button', `enterprise-button-${locale.value}`],
    textKey: 'home.slogan.enterpriseButton',
    action: toDeployment,
  },
  {
    specificClasses: ['personal-button', `personal-button-${locale.value}`],
    textKey: 'home.slogan.personalButton',
    action: toDownload,
  },
])

const toDownload = () => {
  navigateTo('/download')
}

const toDeployment = () => {
  window.open('https://docs.costrict.ai/deployment/introduction/')
}

defineOptions({
  name: 'SloganSection',
})
</script>

<style lang="less" scoped>
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

  @media (max-width: 480px) {
    margin-top: 152px;
  }

  @media (max-width: 375px) {
    margin-top: 142px;
  }
}

.enterprise-button {
  background: url('@/assets/blue_button.svg') 50% 50%;
  border-radius: 6px;

  &-en {
    background: url('@/assets/blue_button_en.svg') 50% 50%;
  }

  &:hover {
    opacity: 0.7;
  }
}

.personal-button {
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 6px;

  &:hover {
    opacity: 0.7;
  }
}

.button-group-en {
  @media (max-width: 375px) {
    flex-direction: column;
  }
}

.slogan-title {
  letter-spacing: 0.02em;
}

.slogan-subTitle {
  letter-spacing: 0.05em;
}

.slogan-container {
  @media (max-width: 480px) {
    height: 258px;
  }

  @media (max-width: 375px) {
    height: 238px;
  }
}
</style>
