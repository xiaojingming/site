<template>
  <div class="w-full flex flex-col items-center mt-9 sm:mt-18 md:mt-26 lg:mt-36 xl:mt-45">
    <div class="flex flex-col items-center">
      <div class="code-review__title" :class="{ 'code-review__title': !isZh }">
        <img v-if="isZh" :src="ZhCodeReviewTitle" alt="strict mode" />
        <img v-else :src="EnCodeReviewTitle" alt="strict mode">
      </div>
      <span class="mt-4 text-base font-normal leading-6 text-center text-white/70 max-w-256 code-review__desc">{{
        t('home.codeReview.subTitle')
      }}</span>
    </div>
    <div class="w-full rounded-[20px] mt-10 gradient-border">
      <video class="rounded-[20px] w-full" :src="video" preload="none" loop muted autoplay playsinline
        style="object-fit: cover;" poster="../../assets/codeReview/codereview_buffer.webp">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="flex gap-6 flex-wrap mt-6 z-100 justify-between">
      <div class="code-review__item" :class="{ 'code-review__item-en': !isZh }" v-for="item in featureList"
        :key="item.title">
        <ItemCard :img="item.img" :title="item.title" :content="item.content" :renderTitle="item.renderTitle"
          :height="cardHeight" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, h } from 'vue'
import { useI18n } from 'vue-i18n'
import ItemCard from './ItemCard.vue'
import CodeReviewZhVideo from '@/assets/video/code_review_zh.mp4'
import CodeReviewEnVideo from '@/assets/video/code_review_en.mp4'
import ZhCodeReviewFeature1 from '@/assets/codeReview/zh/codereview_feature01.webp';
import ZhCodeReviewFeature2 from '@/assets/codeReview/zh/codereview_feature02.webp';
import ZhCodeReviewFeature3 from '@/assets/codeReview/zh/codereview_feature03.webp';
import ZhCodeReviewFeature4 from '@/assets/codeReview/zh/codereview_feature04.webp';
import EnCodeReviewFeature1 from '@/assets/codeReview/en/codereview_feature01.webp';
import EnCodeReviewFeature2 from '@/assets/codeReview/en/codereview_feature02.webp';
import EnCodeReviewFeature3 from '@/assets/codeReview/en/codereview_feature03.webp';
import EnCodeReviewFeature4 from '@/assets/codeReview/en/codereview_feature04.webp';
import EnCodeReviewTitle from '@/assets/codeReview/en/codereview_title.webp';
import ZhCodeReviewTitle from '@/assets/codeReview/zh/codereview_title.webp';

const { t, locale } = useI18n()

const isZh = computed(() => locale.value === 'zh')

const cardHeight = computed(() => (isZh.value ? '400px' : '440px'))

const featureList = computed(() => [
  {
    title: t('home.codeReview.feature01Title'),
    content: t('home.codeReview.feature01Content'),
    img: isZh.value ? ZhCodeReviewFeature1 : EnCodeReviewFeature1,
  },
  {
    title: t('home.codeReview.feature02Title'),
    content: t('home.codeReview.feature02Content'),
    img: isZh.value ? ZhCodeReviewFeature2 : EnCodeReviewFeature2,
    renderTitle: () => (
      h('span',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
          }
        },
        [
          h(
            'span',
            t('home.codeReview.feature02Title'),
          ),
        ]
      )),
  },
  {
    title: t('home.codeReview.feature03Title'),
    content: t('home.codeReview.feature03Content'),
    img: isZh.value ? ZhCodeReviewFeature3 : EnCodeReviewFeature3,
  },
  {
    title: t('home.codeReview.feature04Title'),
    content: t('home.codeReview.feature04Content'),
    img: isZh.value ? ZhCodeReviewFeature4 : EnCodeReviewFeature4,
  },
])

const video = computed(() => isZh.value ? CodeReviewZhVideo : CodeReviewEnVideo)
</script>

<style lang="less" scoped>
.gradient-border {
  border: 1px solid #d8e7ff;
}

.code-review__item {
  flex: 0 1 calc(50% - 12px);
  height: 600px;

  @media (max-width: 1920px) {
    height: 400px;
  }

  @media (max-width: 1024px) {
    flex: 0 1 calc(50% - 12px);
  }

  @media (max-width: 768px) {
    flex: 0 1 100%;
  }

  @media (max-width: 480px) {
    height: auto;
  }
}

.code-review__item-en {
  height: 640px;

  @media (max-width: 1920px) {
    height: 440px;
  }

  @media (max-width: 480px) {
    height: auto;
  }
}

.code-review__title {
  @media (max-width: 480px) {
    width: 70%;
  }
}

.code-review__title-en {
  @media (max-width: 480px) {
    display: flex;
    justify-content: center;
  }
}

.code-review__desc {
  @media (max-width: 480px) {
    font-size: 14px;
  }
}
</style>
