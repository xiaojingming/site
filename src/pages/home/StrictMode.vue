<template>
  <FeatureSection
    :zh-title="resources.zh.title"
    :en-title="resources.en.title"
    alt-text="strict mode"
    :sub-title="t('home.strictMode.subTitle')"
    :video="currentResources.video"
    :poster="currentResources.poster"
    :feature-list="featureList"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FeatureSection from '@/components/FeatureSection.vue'
import StrictModeZhVideo from '@/assets/video/strict_mode_zh.mp4'
import StrictModeEnVideo from '@/assets/video/strict_mode_en.mp4'
import StrictModeZhPoster from '@/assets/strictMode/strict_mode_zh_buffer.webp'
import StrictModeEnPoster from '@/assets/strictMode/strict_mode_en_buffer.webp'
import ZhStrictModeFeature1 from '@/assets/strictMode/zh/strictMode_feature01.webp'
import ZhStrictModeFeature2 from '@/assets/strictMode/zh/strictMode_feature02.webp'
import ZhStrictModeFeature3 from '@/assets/strictMode/zh/strictMode_feature03.webp'
import ZhStrictModeFeature4 from '@/assets/strictMode/zh/strictMode_feature04.webp'
import EnStrictModeFeature1 from '@/assets/strictMode/en/strictMode_feature01.webp'
import EnStrictModeFeature2 from '@/assets/strictMode/en/strictMode_feature02.webp'
import EnStrictModeFeature3 from '@/assets/strictMode/en/strictMode_feature03.webp'
import EnStrictModeFeature4 from '@/assets/strictMode/en/strictMode_feature04.webp'
import EnStrictModeTitle from '@/assets/strictMode/en/strictMode_title.webp'
import ZhStrictModeTitle from '@/assets/strictMode/zh/strictMode_title.webp'

const { t, locale } = useI18n()

// 资源映射表 - 更清晰、易维护
const resources = {
  zh: {
    title: ZhStrictModeTitle,
    video: StrictModeZhVideo,
    poster: StrictModeZhPoster,
  },
  en: {
    title: EnStrictModeTitle,
    video: StrictModeEnVideo,
    poster: StrictModeEnPoster,
  },
}

const featureImages = {
  zh: [ZhStrictModeFeature1, ZhStrictModeFeature2, ZhStrictModeFeature3, ZhStrictModeFeature4],
  en: [EnStrictModeFeature1, EnStrictModeFeature2, EnStrictModeFeature3, EnStrictModeFeature4],
}

const currentResources = computed(() => resources[locale.value as 'zh' | 'en'])
const currentFeatureImages = computed(() => featureImages[locale.value as 'zh' | 'en'])

const featureList = computed(() => [
  {
    title: t('home.strictMode.feature01Title'),
    content: t('home.strictMode.feature01Content'),
    img: currentFeatureImages.value[0],
  },
  {
    title: t('home.strictMode.feature02Title'),
    content: t('home.strictMode.feature02Content'),
    img: currentFeatureImages.value[1],
  },
  {
    title: t('home.strictMode.feature03Title'),
    content: t('home.strictMode.feature03Content'),
    img: currentFeatureImages.value[2],
  },
  {
    title: t('home.strictMode.feature04Title'),
    content: t('home.strictMode.feature04Content'),
    img: currentFeatureImages.value[3],
  },
])
</script>
