<template>
  <div
    class="footer-copyright w-full flex flex-col items-center mt-7.5 sm:mt-15 md:mt-22 lg:mt-30 xl:mt-37.5"
    :class="{ 'has-bg': showBackground }"
  >
    <div class="footer-inner w-full">
      <div class="contact-section">
        <h2 class="footer-title">{{ t('footer.contactUs') }}</h2>
        <p class="footer-subtitle">{{ t('footer.openSource.desc') }}</p>

        <div class="contact-grid">
          <div class="contact-card">
            <div class="contact-card-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4d9fff"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 6 10-6" />
              </svg>
            </div>
            <div class="contact-card-title">{{ t('footer.emailContact') }}</div>
            <div class="contact-card-desc">{{ t('footer.emailDesc') }}</div>
            <div class="contact-card-value">
              <a href="mailto:zgsm@sangfor.com.cn">zgsm@sangfor.com.cn</a>
            </div>
          </div>

          <div class="contact-card">
            <div class="contact-card-icon">
              <svg viewBox="0 0 24 24" fill="#4d9fff">
                <path
                  d="M8.5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm12.5 3a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM9.5 3C4.8 3 1 6.2 1 10.1c0 2.2 1.2 4.1 3.1 5.4l-.8 2.4 2.8-1.4c1 .3 2.2.5 3.4.5.3 0 .7 0 1-.1-.2-.6-.3-1.3-.3-2 0-3.5 3.2-6.4 7.2-6.4.3 0 .7 0 1 .1C17 5.8 13.6 3 9.5 3zm7.9 6.5c-3.5 0-6.4 2.5-6.4 5.5s2.9 5.5 6.4 5.5c.8 0 1.5-.1 2.2-.3l2.2 1.1-.6-1.9c1.5-1.1 2.5-2.7 2.5-4.4 0-3-2.9-5.5-6.3-5.5z"
                />
              </svg>
            </div>
            <div class="contact-card-title">{{ t('footer.officialAccount') }}</div>
            <div class="contact-card-desc">{{ t('footer.officialAccountDesc') }}</div>
            <div class="qrcode-wrap">
              <NuxtImg
                class="qrcode-img"
                src="/qrcode/official_account.webp"
                alt="CoStrict Official Account"
                loading="lazy"
              />
              <span class="qrcode-label">CoStrict {{ t('footer.officialAccountLabel') }}</span>
            </div>
          </div>

          <div class="contact-card">
            <div class="contact-card-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4d9fff"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div class="contact-card-title">{{ t('footer.joinGroup') }}</div>
            <div class="contact-card-desc">{{ t('footer.joinGroupDesc') }}</div>
            <div class="qrcode-wrap">
              <NuxtImg
                class="qrcode-img"
                src="/qrcode/communication_group.webp"
                alt="CoStrict Communication Group"
                loading="lazy"
              />
              <span class="qrcode-label">CoStrict {{ t('footer.joinGroupLabel') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'FooterCopyright' })

withDefaults(defineProps<{ showBackground?: boolean }>(), { showBackground: true })

const { t } = useI18n()
</script>

<style lang="less" scoped>
.footer-copyright {
  &.has-bg {
    background: url('@/assets/home/footer_bg.webp') no-repeat;
    background-size: 100% 100%;
  }
}

.footer-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 24px 48px;
}

.contact-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-title {
  font-size: 28px;
  font-weight: 700;
  line-height: 38px;
  text-align: center;
  letter-spacing: 0.05em;
  background: linear-gradient(98deg, #00ffb7 1%, #ffffff 68%, #c5dbff 101%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
}

.footer-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  margin-bottom: 40px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 400px;
  }
}

.contact-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.25s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
}

.contact-card-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 102, 255, 0.12);
  margin-bottom: 16px;
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;
  }
}

.contact-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
}

.contact-card-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 16px;
}

.contact-card-value {
  font-size: 14px;

  a {
    color: #197dff;
    transition: color 0.15s ease;
    word-break: break-all;

    &:hover {
      color: #4d9fff;
    }
  }
}

.qrcode-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.qrcode-img {
  width: 110px;
  height: 110px;
  border-radius: 10px;
  mix-blend-mode: lighten;
}

.qrcode-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}
</style>
