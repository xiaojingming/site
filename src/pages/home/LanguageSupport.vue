<template>
  <div class="w-full flex flex-col items-center mt-9 sm:mt-18 md:mt-26 lg:mt-36 xl:mt-45">
    <PageTitle :title="t('home.ideSupport.title')" />
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 mt-5 sm:mt-9 md:mt-12 lg:mt-18 xl:mt-20"
    >
      <div
        :src="item"
        :key="item.type"
        v-for="item in programLanguage"
        class="flex items-center justify-center lang-container"
      >
        <NuxtImg
          v-if="item.icon"
          :src="item.icon"
          class="w-6 h-6 mr-2"
          :alt="item.type"
          loading="lazy"
        />
        <span class="text-white leading-6 text-sm xl:text-base whitespace-nowrap">{{
          item.type
        }}</span>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 xl:mt-20">
      <div class="vscode-container flex items-center justify-center">
        <NuxtImg :src="vscodeIcon" alt="vscode" loading="lazy" />
        <span class="text-white ml-3">{{ t('home.ideSupport.SupportedInVSCode') }}</span>
      </div>
      <div class="vscode-container flex items-center justify-center">
        <NuxtImg :src="jetbrainsIcon" alt="jetbrains" loading="lazy" />
        <span class="text-white ml-3">{{ t('home.ideSupport.SupportedInJetBrains') }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import PageTitle from '@/components/PageTitle.vue'

const { t } = useI18n()

const vscodeIcon = '/supportLang/vscode.webp'
const jetbrainsIcon = '/supportLang/jetbrains.webp'

const programLanguage = computed(() => [
  { type: 'Python', icon: '/supportLang/py.webp' },
  { type: 'Go', icon: '/supportLang/go.webp' },
  { type: 'Java', icon: '/supportLang/java.webp' },
  { type: 'JavaScript', icon: '/supportLang/js.webp' },
  { type: 'TypeScript', icon: '/supportLang/ts.webp' },
  { type: 'C/C++', icon: '/supportLang/c.webp' },
  { type: `... ${t('home.ideSupport.allLanguages')}` },
])
</script>
<style lang="less" scoped>
.lang-container {
  height: 40px;
  width: 100%;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0);
  box-sizing: border-box;
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-image: linear-gradient(
      96deg,
      rgba(0, 102, 254, 0) 0%,
      #ffffff 50%,
      rgba(0, 102, 254, 0) 90%
    )
    1 0 1 0;

  @media (min-width: 640px) {
    min-width: 140px;
  }

  @media (min-width: 768px) {
    min-width: 150px;
  }

  @media (min-width: 1024px) {
    min-width: 160px;
  }

  @media (min-width: 1280px) {
    min-width: 170px;
  }
}

.vscode-container {
  background: radial-gradient(50% 50% at 50% 50%, #00297c 25%, rgba(22, 39, 74, 0) 100%);
  box-sizing: border-box;
  border-width: 2px 0px 2px 0px;
  border-style: solid;
  border-image: linear-gradient(
      93deg,
      rgba(0, 102, 254, 0) 0%,
      #ffffff 50%,
      rgba(0, 102, 254, 0) 90%
    )
    2 0 2 0;
  height: 64px;
  width: 100%;
  padding: 0 20px;

  img {
    width: 48px;

    @media (max-width: 480px) {
      width: 36px;
    }
  }
}
</style>
