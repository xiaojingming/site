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

const { t, locale } = useI18n()

const resources = {
  zh: {
    title: '/strictMode/zh/strictMode_title.webp',
    video: StrictModeZhVideo,
    poster: '/strictMode/strict_mode_zh_buffer.webp',
  },
  en: {
    title: '/strictMode/en/strictMode_title.webp',
    video: StrictModeEnVideo,
    poster: '/strictMode/strict_mode_en_buffer.webp',
  },
}

const featureImages = {
  zh: [
    '/strictMode/zh/strictMode_feature01.webp',
    '/strictMode/zh/strictMode_feature02.webp',
    '/strictMode/zh/strictMode_feature03.webp',
    '/strictMode/zh/strictMode_feature04.webp',
  ],
  en: [
    '/strictMode/en/strictMode_feature01.webp',
    '/strictMode/en/strictMode_feature02.webp',
    '/strictMode/en/strictMode_feature03.webp',
    '/strictMode/en/strictMode_feature04.webp',
  ],
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
