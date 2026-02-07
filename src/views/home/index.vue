<template>
  <div class="w-full bg-black overflow-x-hidden">
    <Slogan />
    <div class="responsive-container mx-auto">
      <StrictMode />
      <CodeReview />
      <MoreTool />
      <EnterpriseDeployment />
      <LanguageSupport />
    </div>
    <FooterCopyright />
    <img src="../../assets/home/left_port.webp" class="absolute left-0 top-[1538px]" alt="left port">
    <img src="../../assets/home/right_port.webp" class="absolute right-0 top-[1347px]" alt="right port">
    <div class="absolute left-0 top-0 h-80 sm:h-112 md:h-120 lg:h-124 w-full top-bg"></div>
    <img src="../../assets/home/summary_icon.webp"
      class="absolute right-[30px] top-[80px] cursor-pointer z-1000 summary-icon" alt="Summary Icon"
      @click="toSummary" v-if="!isEnglish">
    <img src="../../assets/home/competition.webp"
      class="absolute right-[-15px] top-[260px] cursor-pointer z-1000 competition-icon" alt="CoStrict Competition"
      @click="toCompetition" v-if="!isEnglish">
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Slogan from './slogan.vue'
import StrictMode from './StrictMode.vue'
import CodeReview from './CodeReview.vue'
import MoreTool from './MoreTool.vue'
import EnterpriseDeployment from './EnterpriseDeployment.vue'
import LanguageSupport from './LanguageSupport.vue'
import FooterCopyright from './FooterCopyright.vue'
import { computed } from 'vue'

// 组件名称通过文件名定义为 HomeIndex
defineOptions({
  name: 'HomeIndex',
})

const { locale } = useI18n()

const isEnglish = computed(() => locale.value === 'en')

const toSummary = () => {
  window.open('https://zgsm.sangfor.com/credit/manager/annual-summary')
}

const toCompetition = () => {
  window.open('https://competition.costrict.ai/')
}
</script>
<style scoped lang="less">
.top-bg {
  background-image: url('@/assets/home/top.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 480px) {
    height: 288px;
  }

  @media (max-width: 375px) {
    height: 268px;
  }
}

.competition-icon:hover {
  transform: translateX(-15px);

}

.competition-icon {
  transition: all ease-in 0.3s;
}

/* 在移动设备上禁用动画 */
@media (max-width: 768px) {
  .summary-icon {
    width: 90px;
    top: 68px;
    right: 0;
  }

  .competition-icon:hover {
    transform: none !important;
  }

  .competition-icon:active {
    transform: none !important;
  }

  .competition-icon {
    transition: none !important;
    cursor: pointer;
    width: 140px;
    top: 168px;
    right: 0;
  }
}

.responsive-container {
  width: 70%;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

}
</style>
