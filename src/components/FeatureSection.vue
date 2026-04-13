<template>
  <div class="w-full flex flex-col items-center" :class="marginTopClass">
    <div class="flex flex-col items-center">
      <div class="feature-section__title" :class="{ 'feature-section__title-en': !isZh }">
        <img v-if="isZh" :src="zhTitle" :alt="altText" />
        <img v-else :src="enTitle" :alt="altText" />
      </div>
      <span class="feature-section__desc">{{ subTitle }}</span>
    </div>
    <div class="w-full rounded-[20px] mt-10 gradient-border">
      <video
        ref="videoRef"
        class="rounded-[20px] w-full"
        preload="none"
        loop
        muted
        playsinline
        style="object-fit: cover"
        :poster="poster"
      >
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="feature-section__items">
      <div
        v-for="item in featureList"
        :key="item.title"
        class="feature-section__item"
        :class="{ 'feature-section__item-en': !isZh }"
      >
        <ItemCard :img="item.img" :title="item.title" :content="item.content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import ItemCard from '@/pages/home/ItemCard.vue'

interface FeatureItem {
  title: string
  content: string
  img: string
}

interface Props {
  zhTitle: string
  enTitle: string
  altText: string
  subTitle: string
  video: string
  poster: string
  featureList: FeatureItem[]
  marginTop?: string
}

const props = withDefaults(defineProps<Props>(), {
  marginTop: 'mt-0',
})

const { locale } = useI18n()

const isZh = computed(() => locale.value === 'zh')
const marginTopClass = computed(() => props.marginTop)

const videoRef = ref<HTMLVideoElement | null>(null)
let observer: IntersectionObserver | null = null

const setupObserver = () => {
  if (!videoRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = videoRef.value
        if (!video) return
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = props.video
            video.load()
          }
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      })
    },
    { threshold: 0.1 },
  )

  observer.observe(videoRef.value)
}

onMounted(() => {
  setupObserver()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
  const video = videoRef.value
  if (video) {
    video.pause()
    video.src = ''
    video.load()
  }
})
</script>

<style lang="less" scoped>
.gradient-border {
  border: 1px solid #d8e7ff;
}

.feature-section {
  &__title {
    @media (max-width: 480px) {
      width: 70%;
    }

    &-en {
      @media (max-width: 480px) {
        display: flex;
        justify-content: center;
      }
    }
  }

  &__desc {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: normal;
    line-height: 1.5rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    max-width: 67.5rem;

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }

  &__items {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: 1.5rem;
    z-index: 100;
    justify-content: space-between;
    width: 100%;
  }

  &__item {
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

    &-en {
      height: 640px;

      @media (max-width: 1920px) {
        height: 440px;
      }

      @media (max-width: 480px) {
        height: auto;
      }
    }
  }
}
</style>
