<template>
  <FeatureSection
    :zh-title="resources.zh.title"
    :en-title="resources.en.title"
    alt-text="code review"
    :sub-title="t('home.codeReview.subTitle')"
    :video="currentResources.video"
    :poster="CodeReviewPoster"
    :feature-list="featureList"
    margin-top="mt-9 sm:mt-18 md:mt-26 lg:mt-36 xl:mt-45"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FeatureSection from '@/components/FeatureSection.vue'
import CodeReviewZhVideo from '@/assets/video/code_review_zh.mp4'
import CodeReviewEnVideo from '@/assets/video/code_review_en.mp4'
import CodeReviewPoster from '@/assets/codeReview/codereview_buffer.webp'

const { t, locale } = useI18n()

const resources = {
  zh: {
    title: '/codeReview/zh/codereview_title.webp',
    video: CodeReviewZhVideo,
  },
  en: {
    title: '/codeReview/en/codereview_title.webp',
    video: CodeReviewEnVideo,
  },
}

const featureImages = {
  zh: [
    '/codeReview/zh/codereview_feature01.webp',
    '/codeReview/zh/codereview_feature02.webp',
    '/codeReview/zh/codereview_feature03.webp',
    '/codeReview/zh/codereview_feature04.webp',
  ],
  en: [
    '/codeReview/en/codereview_feature01.webp',
    '/codeReview/en/codereview_feature02.webp',
    '/codeReview/en/codereview_feature03.webp',
    '/codeReview/en/codereview_feature04.webp',
  ],
}

const currentResources = computed(() => resources[locale.value as 'zh' | 'en'])
const currentFeatureImages = computed(() => featureImages[locale.value as 'zh' | 'en'])

const featureList = computed(() => [
  {
    title: t('home.codeReview.feature01Title'),
    content: t('home.codeReview.feature01Content'),
    img: currentFeatureImages.value[0],
  },
  {
    title: t('home.codeReview.feature02Title'),
    content: t('home.codeReview.feature02Content'),
    img: currentFeatureImages.value[1],
  },
  {
    title: t('home.codeReview.feature03Title'),
    content: t('home.codeReview.feature03Content'),
    img: currentFeatureImages.value[2],
  },
  {
    title: t('home.codeReview.feature04Title'),
    content: t('home.codeReview.feature04Content'),
    img: currentFeatureImages.value[3],
  },
])
</script>
