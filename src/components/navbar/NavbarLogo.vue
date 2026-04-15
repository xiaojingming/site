<template>
  <div class="navbar-logo cursor-pointer" @click="toHome">
    <NuxtImg class="logo-img" src="/logo.webp" alt="CoStrict Logo" loading="eager" />
    <div class="app-name">{{ t('header.appName') }}</div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const toHome = () => {
  navigateTo('/')
}
</script>

<style lang="less" scoped>
.navbar-logo {
  display: flex;
  align-items: center;
  height: var(--space-16);

  .logo-img {
    width: 28px;
    margin-right: var(--space-3);
  }

  .app-name {
    color: var(--color-text-primary);
    font-size: var(--font-base);
  }
}
</style>
