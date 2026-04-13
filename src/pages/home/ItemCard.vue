<template>
  <div class="item-card">
    <div class="item-card__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="item-card__content">
      <slot name="content">{{ content }}</slot>
    </div>
    <div class="item-card__img">
      <slot name="img">
        <img :src="img" alt="card img" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    content?: string
    img?: string
  }>(),
  {
    title: '',
    content: '',
    img: '',
  },
)
</script>

<style lang="less" scoped>
.item-card {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 32px 22px;

  @media (max-width: 480px) {
    padding: 24px 24px 22px;
  }

  &__title {
    font-size: 22px;
    font-weight: 500;
    color: #ffffff;

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  &__content {
    font-size: 16px;
    line-height: 24px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.7);

    @media (max-width: 480px) {
      font-size: 12px;
      margin: 12px 0;
      line-height: 20px;
    }
  }

  &__img {
    img {
      max-width: 100%;
      height: auto;
    }
  }

  &:hover {
    transform: scale(1.02);
    transition: all 0.4s ease-in-out;
  }
}
</style>
