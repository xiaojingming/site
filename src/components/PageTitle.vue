<template>
  <div ref="animatedElement" class="scroll-animation-wrapper">
    <div class="text-center">
      <div class="text-4xl font-semibold leading-normal text-center text-white mb-2 page-title">
        {{ title }}
      </div>
      <div
        v-if="subtitle"
        class="text-base font-normal leading-6 text-center text-white/70 page-subtitle"
      >
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnimation } from '@/composables/use_animation'

interface Props {
  title: string
  subtitle?: string
  needAnimation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  needAnimation: true,
})

const { animatedElement } = useAnimation(props.needAnimation)
</script>

<style lang="less" scoped>
.page-title {
  @media (max-width: 480px) {
    font-size: 20px;
  }
}

.page-subtitle {
  @media (max-width: 480px) {
    font-size: 14px;
  }
}
</style>
