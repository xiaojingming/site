<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { AUGUST_DEVELOPER_MONTH_PATH } from '../constants'

defineOptions({ name: 'AugustDeveloperMonthEntry' })

const { t } = useI18n()
</script>

<template>
  <RouterLink
    :to="AUGUST_DEVELOPER_MONTH_PATH"
    target="_blank"
    rel="noopener noreferrer"
    class="august-campaign-entry"
    data-august-campaign-entry
    data-activity-row
    data-activity-status="active"
    :aria-label="t('home.augustBanner.ariaLabel')"
  >
    <span class="august-campaign-entry__index">01</span>
    <span class="august-campaign-entry__main">
      <span class="august-campaign-entry__title-line">
        <span class="august-campaign-entry__title">{{ t('operation.august.title') }}</span>
        <span class="august-campaign-entry__new">NEW</span>
      </span>
      <span class="august-campaign-entry__message">{{ t('operation.august.entrySummary') }}</span>
    </span>
    <span class="august-campaign-entry__action" aria-hidden="true">
      {{ t('operation.august.entryAction') }}<i>→</i>
    </span>
  </RouterLink>
</template>

<style scoped lang="less">
.august-campaign-entry {
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 42px minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
  padding: 30px 40px 32px;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(90deg, rgba(25, 125, 255, 0.055), transparent 68%);
  transition: background 180ms ease;
}

.august-campaign-entry:hover,
.august-campaign-entry:focus-visible {
  background: linear-gradient(90deg, rgba(25, 125, 255, 0.1), rgba(22, 222, 194, 0.025));
}

.august-campaign-entry:focus-visible {
  outline: 2px solid #16dec2;
  outline-offset: 3px;
}

.august-campaign-entry__index {
  padding-top: 4px;
  color: rgba(98, 157, 239, 0.86);
  font-size: 10px;
  font-weight: 700;
  line-height: 1.4;
}

.august-campaign-entry__main {
  display: block;
  min-width: 0;
  max-width: 760px;
}

.august-campaign-entry__title-line {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.august-campaign-entry__title {
  color: rgba(255, 255, 255, 0.94);
  font-size: 19px;
  font-weight: 600;
  line-height: 1.4;
}

.august-campaign-entry__new {
  display: inline-flex;
  height: 18px;
  align-items: center;
  padding: 0 6px;
  border: 1px solid rgba(22, 222, 194, 0.3);
  border-radius: 3px;
  color: #9cf7e6;
  background: rgba(22, 222, 194, 0.08);
  font-size: 9px;
  font-weight: 750;
  line-height: 1;
}

.august-campaign-entry__message {
  display: block;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 14px;
  line-height: 1.75;
}

.august-campaign-entry__action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding-top: 3px;
  color: rgba(132, 193, 255, 0.88);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.6;
  white-space: nowrap;
  transition: color 180ms ease;
}

.august-campaign-entry__action i {
  font-style: normal;
  transition: transform 180ms ease;
}

.august-campaign-entry:hover .august-campaign-entry__action,
.august-campaign-entry:focus-visible .august-campaign-entry__action {
  color: #76edd8;
}

.august-campaign-entry:hover .august-campaign-entry__action i,
.august-campaign-entry:focus-visible .august-campaign-entry__action i {
  transform: translateX(3px);
}

@media (max-width: 820px) {
  .august-campaign-entry {
    grid-template-columns: 32px minmax(0, 1fr);
    gap: 16px;
    padding: 26px 22px 28px;
  }

  .august-campaign-entry__action {
    grid-column: 2;
    margin-top: 2px;
  }
}

@media (max-width: 480px) {
  .august-campaign-entry__title {
    font-size: 17px;
  }

  .august-campaign-entry__message {
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .august-campaign-entry,
  .august-campaign-entry__action,
  .august-campaign-entry__action i {
    transition: none;
  }
}
</style>
