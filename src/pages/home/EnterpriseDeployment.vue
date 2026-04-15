<template>
  <div class="w-full flex flex-col items-center mt-9 sm:mt-18 md:mt-26 lg:mt-36 xl:mt-45">
    <div class="icon-lock w-full"></div>
    <PageTitle :title="t('home.enterprise.title')" :subtitle="t('home.enterprise.subTitle')" />
    <div
      class="scroll-animation-wrapper wrapper icon-check mt-6 sm:mt-8 xl:mt-10 h-10 md:h-12 lg:h-15 px-3"
      :class="`icon-check-${locale}`"
      ref="animatedElement"
    >
      <span
        class="text-white wrapper-content cursor-pointer"
        :class="`wrapper-content-${locale}`"
        @click="toDeployment"
        >{{ t('home.enterprise.enterprisePrivateDeployment') }}</span
      >
    </div>
    <div class="flex gap-6 mt-4.5 sm:mt-9 md:mt-13 lg:mt-18 xl:mt-22.5 flex-wrap justify-between">
      <div
        class="flex flex-col items-center card-item pt-12.5 rounded-[20px] deployment-card__wrapper"
        :class="isZh ? 'pb-13.5 px-6' : 'pb-8.5 px-4.5'"
        v-for="item in featureList"
        :key="item.title"
      >
        <NuxtImg :src="item.img" class="w-17.5 h-17.5" alt="CoStrict Feature" loading="lazy" />
        <span
          class="text-white mt-6 text-2xl deployment-card__title"
          :class="isZh ? '' : 'text-center'"
          >{{ item.title }}</span
        >
        <p
          class="text-white mt-6 text-base opacity-70 font-light deployment-card__item"
          :class="isZh ? 'text-base' : 'text-sm text-center leading-5.5'"
        >
          {{ item.content }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import { useAnimation } from '@/composables/use_animation'

const { t, locale } = useI18n()

const isZh = computed(() => locale.value === 'zh')

// const cardHeight = computed(() => (isZh.value ? '240px' : '340px'))

const featureList = computed(() => [
  {
    content: t('home.enterprise.feature01Content'),
    title: t('home.enterprise.feature01Title'),
    img: '/enterprise/enterprise_feature01.webp',
  },
  {
    content: t('home.enterprise.feature02Content'),
    title: t('home.enterprise.feature02Title'),
    img: '/enterprise/enterprise_feature02.webp',
  },
  {
    content: t('home.enterprise.feature03Content'),
    title: t('home.enterprise.feature03Title'),
    img: '/enterprise/enterprise_feature03.webp',
  },
  {
    content: t('home.enterprise.feature04Content'),
    title: t('home.enterprise.feature04Title'),
    img: '/enterprise/enterprise_feature04.webp',
  },
])

const { animatedElement } = useAnimation(true, locale)

const toDeployment = () => {
  window.open('https://docs.costrict.ai/deployment/introduction/')
}
</script>
<style lang="less" scoped>
.icon-lock {
  background-image: url('@/assets/enterprise/enterprise_lock.webp');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  height: 420px;

  @media (max-width: 1024px) {
    height: 224px;
  }
}

.icon-check {
  // width: 226px;
  // height: 60px;

  &-en {
    // width: 396px;
  }
}

.wrapper-content {
  font-size: 22px;
  line-height: 20px;
  letter-spacing: 2px;

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
}

.wrapper-content-en {
  letter-spacing: 0;
  white-space: nowrap;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: linear-gradient(90deg, #0066ff 10%, #008fd7 61%, #00d196 100%);
  box-sizing: border-box;
  border: 1px solid;
}

.card-item {
  background: rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  flex: 0 1 calc(25% - 18px);

  @media (max-width: 1280px) {
    flex: 0 1 calc(50% - 12px);
  }

  @media (max-width: 768px) {
    flex: 0 1 100%;
  }
}

.deployment-card__item {
  @media (max-width: 480px) {
    font-size: 12px;
  }
}

.deployment-card__title {
  @media (max-width: 480px) {
    font-size: 18px;
  }
}

.deployment-card__wrapper {
  @media (max-width: 480px) {
    padding: 32px 30px;
  }
}
</style>
