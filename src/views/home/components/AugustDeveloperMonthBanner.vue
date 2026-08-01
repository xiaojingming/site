<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { AUGUST_DEVELOPER_MONTH_PATH } from '@/views/operation/constants'

defineOptions({ name: 'AugustDeveloperMonthBanner' })

const { t } = useI18n()
</script>

<template>
  <RouterLink
    :to="AUGUST_DEVELOPER_MONTH_PATH"
    target="_blank"
    rel="noopener noreferrer"
    class="august-banner"
    :aria-label="t('home.augustBanner.ariaLabel')"
  >
    <span class="august-banner__content">
      <span>{{ t('home.augustBanner.stage3Text') }}</span>
      <span class="august-banner__arrow" aria-hidden="true">→</span>
    </span>
  </RouterLink>
</template>

<style scoped lang="less">
.august-banner {
  position: absolute;
  top: var(--space-16);
  left: 0;
  z-index: 60;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  min-height: 44px;
  align-items: center;
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
  background: rgba(3, 5, 10, 0.82);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition:
    color 180ms ease,
    background-color 180ms ease;

  &:hover,
  &:focus-visible {
    color: #fff;
    background: rgba(7, 12, 20, 0.94);
  }

  &:focus-visible {
    outline: 2px solid #16dec2;
    outline-offset: -2px;
  }
}

.august-banner__content {
  display: flex;
  width: 70%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0;
  text-align: center;
}

.august-banner__arrow {
  flex: none;
  transition: transform 180ms ease;
}

.august-banner:hover .august-banner__arrow,
.august-banner:focus-visible .august-banner__arrow {
  transform: translateX(3px);
}

@media (max-width: 1024px) {
  .august-banner__content {
    width: 80%;
  }
}

@media (max-width: 768px) {
  .august-banner {
    min-height: 52px;
    padding: 6px 0;
  }

  .august-banner__content {
    width: 90%;
    gap: 8px;
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .august-banner,
  .august-banner__arrow {
    transition: none;
  }
}
</style>
