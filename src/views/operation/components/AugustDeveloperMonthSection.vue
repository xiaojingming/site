<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import costrictSymbolWhite from '@/assets/operation/costrict-symbol-white.png'

defineOptions({ name: 'AugustDeveloperMonthSection' })

const { t } = useI18n()

const campaignOverview = computed(() =>
  (['rights', 'models', 'product'] as const).map((key) => ({
    key,
    href: `#campaign-${key}`,
    label: t(`operation.august.overview.items.${key}.label`),
    title: t(`operation.august.overview.items.${key}.title`),
    description: t(`operation.august.overview.items.${key}.description`),
  })),
)

const heroSparks = [
  { x: '11%', y: '25%', size: '8px', delay: '0ms', duration: '2200ms' },
  { x: '20%', y: '68%', size: '5px', delay: '420ms', duration: '2600ms' },
  { x: '29%', y: '15%', size: '4px', delay: '760ms', duration: '2400ms' },
  { x: '34%', y: '81%', size: '7px', delay: '180ms', duration: '2800ms' },
  { x: '43%', y: '24%', size: '3px', delay: '980ms', duration: '2100ms' },
  { x: '48%', y: '76%', size: '4px', delay: '640ms', duration: '2500ms' },
  { x: '57%', y: '18%', size: '6px', delay: '260ms', duration: '2300ms' },
  { x: '64%', y: '79%', size: '3px', delay: '1140ms', duration: '2700ms' },
  { x: '72%', y: '27%', size: '5px', delay: '520ms', duration: '2450ms' },
  { x: '81%', y: '66%', size: '8px', delay: '840ms', duration: '2900ms' },
  { x: '89%', y: '34%', size: '4px', delay: '120ms', duration: '2350ms' },
  { x: '91%', y: '76%', size: '5px', delay: '1060ms', duration: '2650ms' },
] as const

const models = [
  { name: 'Kimi K3', wordmark: 'Kimi' },
  { name: 'MiniMax M3', wordmark: 'MiniMax' },
  { name: 'Step-3.7-flash', wordmark: 'StepFun' },
  { name: 'Mimo-v2.5-pro', wordmark: 'MiMo' },
  { name: 'DeepSeek-V4-Flash', wordmark: 'deepseek' },
] as const

const existingModels = [
  'DeepSeek-V4-Pro',
  'GLM-5.2-Zhipu',
  'Qwen3-VL-Flash',
  'Kimi-K2.7-Code-VIP',
  'Qwen-3.7-Max-VIP',
] as const

const scenarios = computed(() => [
  {
    title: t('operation.august.models.scenarios[0].title'),
    description: t('operation.august.models.scenarios[0].description'),
    models: [
      { name: 'MiniMax M3', isNew: true },
      { name: 'Step-3.7-flash', isNew: true },
      { name: 'DeepSeek-V4-Flash', isNew: true },
    ],
  },
  {
    title: t('operation.august.models.scenarios[1].title'),
    description: t('operation.august.models.scenarios[1].description'),
    models: [
      { name: 'Kimi K3', isNew: true },
      { name: 'GLM-5.2-Zhipu', isNew: false },
      { name: 'DeepSeek-V4-Pro', isNew: false },
    ],
  },
  {
    title: t('operation.august.models.scenarios[2].title'),
    description: t('operation.august.models.scenarios[2].description'),
    models: [
      { name: 'GLM-5.2-Zhipu', isNew: false },
      { name: 'Kimi-K2.7-Code-VIP', isNew: false },
      { name: 'Qwen-3.7-Max-VIP', isNew: false },
    ],
  },
  {
    title: t('operation.august.models.scenarios[3].title'),
    description: t('operation.august.models.scenarios[3].description'),
    models: [{ name: 'Qwen3-VL-Flash', isNew: false }],
  },
])

const capabilityTagCounts = {
  cloud: 4,
  knowledge: 3,
  metrics: 4,
  collaboration: 4,
} as const

const capabilities = computed(() =>
  (['cloud', 'knowledge', 'metrics', 'collaboration'] as const).map((key) => ({
    key,
    label: t(`operation.august.product.capabilities.${key}.label`),
    title: t(`operation.august.product.capabilities.${key}.title`),
    description: t(`operation.august.product.capabilities.${key}.description`),
    tags: Array.from({ length: capabilityTagCounts[key] }, (_, index) =>
      t(`operation.august.product.capabilities.${key}.tags[${index}]`),
    ),
  })),
)
</script>

<template>
  <section id="august-2026" class="august-month" aria-labelledby="august-2026-title">
    <div class="campaign-shell">
      <header class="campaign-hero">
        <span class="campaign-hero__watermark" aria-hidden="true">08</span>
        <span
          v-for="(spark, index) in heroSparks"
          :key="index"
          class="campaign-hero__spark"
          :style="`--spark-x:${spark.x};--spark-y:${spark.y};--spark-size:${spark.size};--spark-delay:${spark.delay};--spark-duration:${spark.duration}`"
          aria-hidden="true"
        ></span>
        <span class="campaign-hero__eyebrow">{{ t('operation.august.heroEyebrow') }}</span>
        <h1 id="august-2026-title">{{ t('operation.august.title') }}</h1>
        <p class="campaign-hero__headline">{{ t('operation.august.heroHeadline') }}</p>
        <p class="campaign-hero__lead">{{ t('operation.august.heroLead') }}</p>
        <section
          id="campaign-overview"
          class="campaign-overview"
          :aria-label="t('operation.august.overview.ariaLabel')"
        >
          <nav
            class="campaign-overview__grid"
            :aria-label="t('operation.august.overview.ariaLabel')"
          >
            <a
              v-for="(item, index) in campaignOverview"
              :key="item.key"
              :href="item.href"
              class="campaign-overview-item"
            >
              <span class="campaign-overview-item__content">
                <span>{{ String(index + 1).padStart(2, '0') }} · {{ item.label }}</span>
                <strong>{{ item.title }}</strong>
                <p>{{ item.description }}</p>
              </span>
            </a>
          </nav>
        </section>
      </header>

      <div class="campaign-detail-field" aria-hidden="true"></div>

      <article
        id="campaign-rights"
        class="phase phase--rights benefit-layout"
        data-campaign-stage="1"
        aria-labelledby="august-stage-1-title"
      >
        <div class="benefit-copy">
          <div class="phase-number">{{ t('operation.august.rights.stageLabel') }}</div>
          <h2 id="august-stage-1-title">{{ t('operation.august.rights.title') }}</h2>
        </div>
        <div class="benefit-metrics">
          <div class="benefit-summary-group">
            <div class="benefit-metric benefit-metric--duration">
              <div class="benefit-transition">
                <span class="benefit-from">{{
                  t('operation.august.rights.originalValidity')
                }}</span>
                <span class="benefit-rail">{{ t('operation.august.rights.extendTo') }}</span>
                <strong>{{ t('operation.august.rights.duration') }}</strong>
              </div>
              <span class="benefit-caption">
                {{ t('operation.august.rights.validityCaption') }}
                <strong>{{ t('operation.august.rights.validityEmphasis') }}</strong>
              </span>
            </div>
            <span class="phase-divider" aria-hidden="true"></span>
            <div class="benefit-bonus-summary">
              <strong>+20%</strong>
              <span>{{ t('operation.august.rights.bonusCaption') }}</span>
            </div>
          </div>
          <div class="benefit-example">
            <small>{{ t('operation.august.rights.exampleTitle') }}</small>
            <div class="benefit-example-flow">
              <span>
                <small>{{ t('operation.august.rights.purchaseLabel') }}</small>
                <strong>{{ t('operation.august.rights.purchaseAmount') }}</strong>
              </span>
              <i aria-hidden="true">→</i>
              <span>
                <small>{{ t('operation.august.rights.rewardLabel') }}</small>
                <strong>{{ t('operation.august.rights.rewardAmount') }}</strong>
              </span>
            </div>
            <p>{{ t('operation.august.rights.deliveryNote') }}</p>
          </div>
        </div>
      </article>

      <article
        id="campaign-models"
        class="phase phase--models"
        data-campaign-stage="2"
        aria-labelledby="august-stage-2-title"
      >
        <div class="phase-intro">
          <div class="phase-number">{{ t('operation.august.models.stageLabel') }}</div>
          <h2 id="august-stage-2-title">{{ t('operation.august.models.title') }}</h2>
          <p class="phase-lead">{{ t('operation.august.models.lead') }}</p>
        </div>

        <div class="model-orbit-art" aria-hidden="true">
          <span class="model-orbit-art__ring model-orbit-art__ring--one"></span>
          <span class="model-orbit-art__ring model-orbit-art__ring--two"></span>
          <span class="model-orbit-art__ring model-orbit-art__ring--three"></span>
          <span class="model-orbit-art__core">
            <img :src="costrictSymbolWhite" alt="" />
          </span>
          <i v-for="index in 4" :key="index" :class="`model-orbit-art__node is-${index}`"></i>
        </div>

        <section class="model-ecosystem" :aria-label="t('operation.august.models.ecosystemAria')">
          <div class="model-new-grid">
            <div v-for="(model, index) in models" :key="model.name" class="model-card">
              <small
                >{{ t('operation.august.models.newLabel') }}
                {{ String(index + 1).padStart(2, '0') }}</small
              >
              <strong>{{ model.name }}</strong>
              <span class="model-card__wordmark" aria-hidden="true">{{ model.wordmark }}</span>
            </div>
          </div>
        </section>

        <section class="model-library" :aria-label="t('operation.august.models.libraryAria')">
          <header class="model-library-head">
            <span>{{ t('operation.august.models.libraryEyebrow') }}</span>
            <strong>{{ t('operation.august.models.libraryTitle') }}</strong>
          </header>
          <div class="existing-list">
            <span v-for="model in existingModels" :key="model">{{ model }}</span>
          </div>
        </section>

        <section class="model-recommendations" aria-labelledby="model-guide-title">
          <div class="recommendation-head">
            <div>
              <small>{{ t('operation.august.models.guideEyebrow') }}</small>
              <h3 id="model-guide-title">{{ t('operation.august.models.guideTitle') }}</h3>
            </div>
          </div>
          <div class="model-scenarios">
            <article v-for="(scenario, index) in scenarios" :key="scenario.title" class="scenario">
              <div class="scenario-copy">
                <span class="scenario-index">{{ String(index + 1).padStart(2, '0') }}</span>
                <div>
                  <strong>{{ scenario.title }}</strong>
                  <p>{{ scenario.description }}</p>
                </div>
              </div>
              <div class="scenario-models">
                <span
                  v-for="model in scenario.models"
                  :key="model.name"
                  class="scenario-model"
                  :class="{ 'is-new': model.isNew }"
                  >{{ model.name }}</span
                >
              </div>
            </article>
          </div>
        </section>
      </article>

      <article
        id="campaign-product"
        class="phase phase--product"
        data-campaign-stage="3"
        aria-labelledby="august-stage-3-title"
      >
        <div class="phase-intro">
          <div class="phase-number">{{ t('operation.august.product.stageLabel') }}</div>
          <h2 id="august-stage-3-title">{{ t('operation.august.product.title') }}</h2>
          <p class="phase-lead">{{ t('operation.august.product.lead') }}</p>
        </div>

        <section class="stage3-compact" :aria-label="t('operation.august.product.capabilityAria')">
          <div class="stage3-grid">
            <article
              v-for="(capability, index) in capabilities"
              :key="capability.key"
              class="stage3-card"
              :class="`stage3-card--${capability.key}`"
            >
              <span class="stage3-card-label"
                >{{ String(index + 1).padStart(2, '0') }} · {{ capability.label }}</span
              >
              <span class="stage3-card-number" aria-hidden="true">{{
                String(index + 1).padStart(2, '0')
              }}</span>
              <h3>{{ capability.title }}</h3>
              <div
                class="stage3-card-copy"
                :class="{ 'stage3-card-copy--tags-first': capability.key === 'knowledge' }"
              >
                <p>{{ capability.description }}</p>
                <div class="stage3-card-tags" :aria-label="capability.tags.join('、')">
                  <span v-for="tag in capability.tags" :key="tag">{{ tag }}</span>
                </div>
              </div>

              <div class="stage3-visual" aria-hidden="true">
                <div v-if="capability.key === 'cloud'" class="stage3-mini-surface">
                  <div class="stage3-mini-topbar">
                    <i class="stage3-mini-glow"></i>CoStrict Cloud
                  </div>
                  <div class="stage3-workspace-fragment">
                    <div class="stage3-task-mini"><span></span><span></span><span></span></div>
                    <div class="stage3-terminal-mini">
                      <span></span><span></span><span></span><i></i>
                    </div>
                  </div>
                  <div class="stage3-cloud-nodes"><i></i><i></i><i></i></div>
                </div>
                <div
                  v-else-if="capability.key === 'knowledge'"
                  class="stage3-mini-surface stage3-knowledge-fragment"
                >
                  <div class="stage3-knowledge-query"><i></i><span></span></div>
                  <div class="stage3-knowledge-body">
                    <div class="stage3-source-stack"><span></span><span></span><span></span></div>
                    <div class="stage3-answer-mini"></div>
                  </div>
                  <div class="stage3-knowledge-nodes"><i></i><i></i><i></i><i></i><i></i></div>
                  <div class="stage3-knowledge-trace"><i></i><i></i><i></i><i></i></div>
                </div>
                <div
                  v-else-if="capability.key === 'metrics'"
                  class="stage3-mini-surface stage3-metric-fragment"
                >
                  <div class="stage3-metric-value">42.6% <small>↑ 6.8%</small></div>
                  <div class="stage3-metric-bars"><i></i><i></i><i></i><i></i></div>
                  <div class="stage3-metric-chart">
                    <svg viewBox="0 0 420 120" preserveAspectRatio="none">
                      <path
                        d="M0 102 C44 98 63 80 104 84 S168 54 211 60 S283 35 326 40 S376 20 420 16"
                        fill="none"
                        stroke="rgba(93,145,255,.78)"
                        stroke-width="2.4"
                        vector-effect="non-scaling-stroke"
                      />
                      <path
                        d="M0 110 C47 108 69 96 106 94 S171 82 212 79 S278 64 326 62 S378 49 420 45"
                        fill="none"
                        stroke="rgba(22,222,194,.68)"
                        stroke-width="2.2"
                        vector-effect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                  <div class="stage3-metric-axis">
                    <span v-for="tag in capability.tags" :key="tag">{{ tag }}</span>
                  </div>
                </div>
                <div v-else class="stage3-mini-surface stage3-workflow-fragment">
                  <div class="stage3-flow-steps">
                    <span
                      v-for="(tag, tagIndex) in capability.tags"
                      :key="tag"
                      class="stage3-flow-step"
                      :class="{ active: tagIndex < 3 }"
                      ><i></i>{{ tag }}</span
                    >
                  </div>
                  <div class="stage3-flow-line"></div>
                  <div class="stage3-approval-mini">
                    Agent → PR → CI/CD <span>{{ t('operation.august.product.humanReview') }}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </article>

      <footer id="campaign-closing" class="campaign-closing">
        <h2>{{ t('operation.august.closingTitle') }}</h2>
        <p>{{ t('operation.august.closingLead') }}</p>
        <RouterLink to="/download" class="campaign-closing__cta">
          {{ t('operation.august.closingAction') }}<i aria-hidden="true">→</i>
        </RouterLink>
      </footer>
    </div>
  </section>
</template>

<style scoped lang="less">
.august-month {
  position: relative;
  --blue: #197dff;
  --green: #16dec2;
  --amber: #f0ba68;
  --phase-inset: 40px;
  --summary-column: 210px;
  --content-gap: 40px;
  --text-strong: rgba(255, 255, 255, 0.92);
  --text-mid: rgba(255, 255, 255, 0.62);
  --text-soft: rgba(255, 255, 255, 0.42);
  --line: rgba(255, 255, 255, 0.1);
  --line-soft: rgba(255, 255, 255, 0.065);
  width: 100%;
  overflow-x: clip;
  padding: 0;
  font-size: 16px;
  line-height: normal;
  scroll-margin-top: 80px;
}

.august-month::before {
  content: '';
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 80px 80px;
  opacity: 0.24;
  mask-image: linear-gradient(to bottom, #000 0, rgba(0, 0, 0, 0.72) 58%, transparent 100%);
}

.campaign-shell {
  position: relative;
  z-index: 1;
  isolation: isolate;
  width: min(1120px, calc(100% - 48px));
  margin: 0 auto;
  overflow: visible;
  background: transparent;
}

.campaign-detail-field {
  position: absolute;
  z-index: -1;
  top: calc(100svh - 96px);
  right: 50%;
  bottom: 0;
  width: 100vw;
  overflow: hidden;
  background:
    linear-gradient(180deg, transparent 0, rgba(12, 17, 20, 0.96) 160px, #0c1114 24%), #050708;
  transform: translateX(50%);
  pointer-events: none;
}

.campaign-detail-field::before {
  content: '';
  position: absolute;
  inset: 96px 0 0;
  opacity: 0.46;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: linear-gradient(180deg, transparent, #000 8%, #000 92%, transparent);
}

.campaign-detail-field::after {
  content: '';
  position: absolute;
  top: 120px;
  right: -12vw;
  bottom: 2%;
  width: min(780px, 64vw);
  opacity: 0.34;
  background: linear-gradient(
    165deg,
    rgba(240, 186, 104, 0.32) 0 16%,
    transparent 24% 38%,
    rgba(25, 125, 255, 0.32) 47% 66%,
    transparent 73% 82%,
    rgba(22, 222, 194, 0.28) 90%
  );
  filter: blur(58px);
  clip-path: polygon(
    30% 0,
    100% 0,
    72% 27%,
    98% 55%,
    58% 77%,
    86% 100%,
    20% 100%,
    44% 74%,
    8% 52%,
    48% 24%
  );
}

.campaign-hero {
  position: relative;
  display: flex;
  min-height: 100vh;
  min-height: 100svh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 34px 40px 28px;
  overflow: hidden;
  text-align: center;
}

.campaign-hero__watermark {
  position: absolute;
  z-index: -1;
  top: 48%;
  left: 50%;
  color: rgba(255, 255, 255, 0.026);
  font-size: 468px;
  font-weight: 750;
  line-height: 0.78;
  transform: translate(-50%, -62%);
  text-shadow:
    0 0 60px rgba(25, 125, 255, 0.12),
    0 0 120px rgba(22, 222, 194, 0.07);
  pointer-events: none;
  user-select: none;
}

.campaign-hero__spark {
  position: absolute;
  z-index: 0;
  top: var(--spark-y);
  left: var(--spark-x);
  width: var(--spark-size);
  height: var(--spark-size);
  opacity: 0.08;
  transform: scale(0.72);
  pointer-events: none;
}

.campaign-hero__spark::before,
.campaign-hero__spark::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  background: rgba(205, 239, 255, 0.92);
  box-shadow: 0 0 9px rgba(93, 204, 255, 0.72);
  transform: translate(-50%, -50%);
}

.campaign-hero__spark::before {
  width: 100%;
  height: 1px;
}

.campaign-hero__spark::after {
  width: 1px;
  height: 100%;
}

.campaign-hero:hover .campaign-hero__spark {
  animation: campaign-sparkle var(--spark-duration) ease-in-out var(--spark-delay) infinite;
}

@keyframes campaign-sparkle {
  0%,
  100% {
    opacity: 0.08;
    transform: scale(0.72) rotate(0deg);
  }
  46% {
    opacity: 0.82;
    transform: scale(1.18) rotate(45deg);
  }
  62% {
    opacity: 0.22;
    transform: scale(0.84) rotate(45deg);
  }
}

.campaign-hero__eyebrow,
.campaign-hero h1,
.campaign-hero__headline,
.campaign-hero__lead {
  position: relative;
  z-index: 1;
}

.campaign-hero__eyebrow {
  margin-bottom: 14px;
  color: rgba(118, 221, 199, 0.78);
  font-size: 13px;
  font-weight: 650;
  line-height: 1.5;
}

.campaign-hero h1 {
  margin: 0;
  color: #fff;
  font-size: 66px;
  font-weight: 680;
  line-height: 1.12;
  letter-spacing: 0;
}

.campaign-hero__headline {
  margin: 18px 0 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: 24px;
  font-weight: 560;
  line-height: 1.4;
}

.campaign-hero__lead {
  max-width: 680px;
  margin: 10px auto 0;
  color: var(--text-mid);
  font-size: 15px;
  line-height: 1.8;
}

.campaign-overview {
  position: relative;
  z-index: 1;
  width: 100%;
  margin-top: 32px;
  padding: 0;
  scroll-margin-top: 80px;
}

.campaign-overview__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.campaign-overview-item {
  position: relative;
  display: flex;
  min-height: 164px;
  align-items: center;
  justify-content: center;
  padding: 22px 28px 24px;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  transition: background 220ms ease;
}

.campaign-overview-item::before {
  content: '';
  position: absolute;
  top: 0;
  right: 12%;
  left: 12%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(22, 222, 194, 0.72), transparent);
  transform: scaleX(0);
  transition: transform 240ms ease;
}

.campaign-overview-item + .campaign-overview-item {
  border-left: 1px solid var(--line-soft);
}

.campaign-overview-item:hover,
.campaign-overview-item:focus-visible {
  background: linear-gradient(180deg, rgba(25, 125, 255, 0.035), rgba(22, 222, 194, 0.018));
}

.campaign-overview-item:hover::before,
.campaign-overview-item:focus-visible::before {
  transform: scaleX(1);
}

.campaign-overview-item__content {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  transition: transform 220ms ease;
}

.campaign-overview-item:hover .campaign-overview-item__content,
.campaign-overview-item:focus-visible .campaign-overview-item__content {
  transform: translateY(-4px);
}

.campaign-overview-item__content > span {
  display: block;
  margin-bottom: 20px;
  color: rgba(118, 221, 199, 0.76);
  font-size: 10px;
  font-weight: 700;
  line-height: 1.4;
}

.campaign-overview-item strong {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 19px;
  font-weight: 600;
  line-height: 1.4;
}

.campaign-overview-item p {
  max-width: 250px;
  margin: 10px auto 0;
  color: var(--text-mid);
  font-size: 12px;
  line-height: 1.7;
}

.phase-lead {
  margin: 0;
  color: var(--text-mid);
  font-size: 14px;
  line-height: 1.65;
}

.phase {
  position: relative;
  padding: 44px var(--phase-inset) 52px;
  scroll-margin-top: 80px;
}

.phase + .phase::before {
  content: '';
  position: absolute;
  top: 0;
  right: var(--phase-inset);
  left: var(--phase-inset);
  height: 1px;
  background: var(--line);
}

.phase[data-campaign-stage='3']::before {
  display: none;
}

.phase[data-campaign-stage='3'] {
  padding-bottom: 24px;
}

.phase-number {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--green);
  font-size: 13px;
  font-weight: 600;
}

.phase-number::before,
.ecosystem-kicker::before {
  content: '';
  width: 5px;
  height: 5px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 12px rgba(22, 222, 194, 0.58);
}

.phase h2 {
  margin: 0;
  color: var(--text-strong);
  font-size: 24px;
  line-height: 1.35;
  letter-spacing: 0;
}

.phase-lead {
  margin-top: 10px;
}

.phase-intro {
  min-height: 94px;
}

.benefit-layout {
  display: grid;
  grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1.2fr);
  align-items: center;
  column-gap: 64px;
}

.benefit-copy {
  display: flex;
  min-height: 112px;
  max-width: 620px;
  flex-direction: column;
  justify-content: center;
  margin: 0;
}

.benefit-metrics {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 1px minmax(0, 1fr);
  align-items: stretch;
  min-height: 112px;
  width: 100%;
}

.phase-divider {
  width: 1px;
  height: 112px;
  background: var(--line);
}

.benefit-metric {
  display: block;
  min-width: 0;
  padding: 0;
  text-align: center;
}

.benefit-metric > strong,
.benefit-transition > strong {
  margin: 0 0 12px;
  color: transparent;
  background: linear-gradient(100deg, #fff 14%, #c5dbff 58%, #77f0d6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  font-size: 48px;
  font-weight: 500;
  line-height: 1;
}

.benefit-metric > strong {
  display: flex;
  min-height: 58px;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 11px;
}

.benefit-metric > span {
  display: block;
}

.benefit-transition {
  display: grid;
  min-height: 58px;
  grid-template-columns: auto 44px auto;
  align-items: end;
  justify-content: center;
  gap: 8px;
  margin-bottom: 11px;
}

.benefit-transition > strong {
  margin: 0;
  white-space: nowrap;
}

.benefit-from,
.benefit-rail {
  padding-bottom: 7px;
  color: var(--text-soft);
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
}

.benefit-rail {
  color: rgba(22, 222, 194, 0.72);
  font-size: 9px;
  font-weight: 700;
}

.benefit-caption,
.benefit-metric > span {
  color: var(--text-mid);
  font-size: 14px;
  line-height: 1.55;
}

.benefit-caption {
  white-space: nowrap;
}
.benefit-caption strong {
  display: inline;
  margin-left: 4px;
  color: rgba(255, 255, 255, 0.86);
  font-size: inherit;
}

.model-ecosystem,
.stage3-compact {
  display: grid;
  grid-template-columns: var(--summary-column) minmax(0, 1fr);
  margin-top: 34px;
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.012);
}

.stage3-compact {
  border-bottom: 0;
}

.ecosystem-summary,
.stage3-summary {
  position: relative;
  display: flex;
  min-height: 220px;
  flex-direction: column;
  justify-content: space-between;
  padding: 26px 24px 24px;
  overflow: hidden;
  border-right: 1px solid var(--line-soft);
}

.ecosystem-kicker,
.stage3-summary-kicker {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--green);
  font-size: 10px;
  font-weight: 700;
}

.model-spectrum {
  display: grid;
  gap: 10px;
  margin: auto 0;
}

.model-spectrum > strong {
  margin-bottom: 2px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
}

.spectrum-row {
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: center;
  gap: 9px;
  color: var(--text-soft);
  font-size: 8px;
}

.spectrum-row i {
  position: relative;
  height: 3px;
  overflow: hidden;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.07);
}

.spectrum-row i::after {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: var(--level);
  border-radius: inherit;
  background: linear-gradient(90deg, rgba(25, 125, 255, 0.54), rgba(22, 222, 194, 0.72));
}

.ecosystem-summary p {
  width: 150px;
  margin: 18px 0 0;
  color: var(--text-mid);
  font-size: 12px;
  line-height: 1.65;
}

.model-new-grid,
.stage3-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  min-width: 0;
}

.model-card {
  position: relative;
  display: flex;
  height: 112px;
  align-items: flex-end;
  padding: 22px 118px 20px 22px;
  overflow: hidden;
  transition: background 180ms ease;
}

.model-card:nth-child(odd) {
  border-right: 1px solid var(--line-soft);
}

.model-card:nth-child(-n + 2) {
  border-bottom: 1px solid var(--line-soft);
}

.model-card:hover {
  background: linear-gradient(110deg, rgba(25, 125, 255, 0.025), rgba(22, 222, 194, 0.04));
}

.model-card small {
  position: absolute;
  top: 18px;
  left: 22px;
  color: rgba(22, 222, 194, 0.78);
  font-size: 8px;
  font-weight: 800;
}

.model-card > strong {
  position: absolute;
  right: 118px;
  bottom: 20px;
  left: 22px;
  display: flex;
  min-height: 22px;
  align-items: flex-end;
  color: var(--text-strong);
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  white-space: nowrap;
}

.model-card__wordmark {
  position: absolute;
  top: 54px;
  right: 14px;
  left: 14px;
  color: rgba(255, 255, 255, 0.12);
  font-size: 24px;
  font-weight: 650;
  line-height: 1;
  pointer-events: none;
  text-align: center;
  transition:
    color 180ms ease,
    transform 180ms ease;
}

.model-card:hover .model-card__wordmark {
  color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.model-library {
  position: relative;
  display: grid;
  min-height: 112px;
  grid-template-columns: var(--summary-column) minmax(0, 1fr);
  align-items: center;
  gap: var(--content-gap);
  margin-top: 0;
  padding: 22px 0;
  border-top: 0;
  border-bottom: 1px solid var(--line-soft);
}

.model-library-head span,
.model-library-head strong {
  display: block;
}
.model-library-head span {
  margin-bottom: 7px;
  color: var(--text-soft);
  font-size: 9px;
  font-weight: 700;
}
.model-library-head strong {
  color: rgba(255, 255, 255, 0.78);
  font-size: 15px;
  font-weight: 600;
}

.existing-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px 30px;
}

.existing-list span {
  position: relative;
  padding-left: 14px;
  color: rgba(255, 255, 255, 0.48);
  font-size: 11px;
  line-height: 1.5;
}

.existing-list span::before {
  content: '';
  position: absolute;
  top: 7px;
  left: 0;
  width: 4px;
  height: 4px;
  background: rgba(25, 125, 255, 0.62);
  box-shadow: 0 0 8px rgba(25, 125, 255, 0.35);
}

.model-recommendations {
  margin-top: 38px;
}

.recommendation-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.recommendation-head small {
  display: block;
  margin-bottom: 5px;
  color: var(--blue);
  font-size: 9px;
  font-weight: 800;
}
.recommendation-head h3 {
  margin: 0;
  color: var(--text-strong);
  font-size: 18px;
  line-height: 1.45;
  letter-spacing: 0;
}

.scenario-models {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.model-scenarios {
  margin-top: 16px;
  border-top: 1px solid var(--line);
}

.scenario {
  display: grid;
  grid-template-columns: var(--summary-column) minmax(0, 1fr);
  align-items: center;
  gap: var(--content-gap);
  min-height: 82px;
  padding: 17px 0;
  border-bottom: 1px solid var(--line-soft);
}

.scenario-copy {
  display: grid;
  grid-template-columns: 26px 1fr;
  align-items: start;
  gap: 10px;
}
.scenario-index {
  color: var(--blue);
  font-size: 10px;
  font-weight: 700;
}
.scenario-copy strong {
  display: block;
  margin-bottom: 4px;
  color: var(--text-strong);
  font-size: 13px;
}
.scenario-copy p {
  margin: 0;
  color: var(--text-soft);
  font-size: 11px;
  line-height: 1.55;
}
.scenario-model {
  display: inline-flex;
  min-height: 30px;
  align-items: center;
  padding: 4px 9px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.68);
  background: rgba(255, 255, 255, 0.022);
  font-size: 11px;
}
.scenario-model.is-new {
  border-color: rgba(22, 222, 194, 0.25);
  color: #c7fff2;
  background: rgba(22, 222, 194, 0.055);
}
.scenario-model.is-new::before {
  content: '';
  width: 5px;
  height: 5px;
  margin-right: 6px;
  border-radius: 50%;
  background: var(--green);
}

.stage3-summary {
  height: 300px;
  justify-content: flex-start;
  gap: 18px;
  background: linear-gradient(145deg, rgba(22, 222, 194, 0.04), transparent 46%);
}
.stage3-summary-kicker::before {
  content: '';
  width: 9px;
  height: 9px;
  background: radial-gradient(
    circle,
    #dcfff9 0 12%,
    rgba(22, 222, 194, 0.8) 26%,
    rgba(22, 222, 194, 0.14) 60%,
    transparent 75%
  );
}
.stage3-overview {
  display: grid;
  gap: 10px;
}

.stage3-overview > strong {
  color: rgba(255, 255, 255, 0.88);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
}

.stage3-overview-list {
  display: grid;
  border-top: 1px solid var(--line-soft);
}

.stage3-overview-item {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid var(--line-soft);
}

.stage3-overview-item > span {
  padding-top: 2px;
  color: rgba(22, 222, 194, 0.68);
  font-size: 8px;
  font-weight: 700;
}

.stage3-overview-item b,
.stage3-overview-item small {
  display: block;
}

.stage3-overview-item b {
  color: rgba(255, 255, 255, 0.8);
  font-size: 11px;
  font-weight: 600;
  line-height: 1.35;
}

.stage3-overview-item small {
  margin-top: 3px;
  color: var(--text-soft);
  font-size: 8px;
  line-height: 1.45;
}

.stage3-card {
  position: relative;
  min-width: 0;
  min-height: 150px;
  padding: 24px 164px 22px 22px;
  overflow: hidden;
  background: transparent;
  transition: background 180ms ease;
}

.stage3-card:nth-child(odd)::after {
  content: '';
  position: absolute;
  top: 10%;
  right: 0;
  width: 1px;
  height: 80%;
  background: linear-gradient(180deg, transparent, rgba(190, 208, 232, 0.12), transparent);
}

.stage3-card:nth-child(-n + 2)::before {
  content: '';
  position: absolute;
  right: 7%;
  bottom: 0;
  left: 7%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(190, 208, 232, 0.12), transparent);
}

.stage3-card:hover {
  background: linear-gradient(115deg, rgba(25, 125, 255, 0.026), rgba(22, 222, 194, 0.036));
}

.stage3-card-label {
  position: relative;
  z-index: 2;
  display: block;
  min-height: 14px;
  margin-bottom: 8px;
  color: rgba(22, 222, 194, 0.82);
  font-size: 9px;
  font-weight: 800;
  line-height: 14px;
}
.stage3-card-number {
  position: absolute;
  z-index: 2;
  top: 8px;
  right: 146px;
  color: rgba(255, 255, 255, 0.08);
  font-size: 36px;
  font-weight: 620;
  line-height: 1;
  pointer-events: none;
  transition:
    color 180ms ease,
    transform 180ms ease;
}

.stage3-card:hover .stage3-card-number {
  color: rgba(255, 255, 255, 0.14);
  transform: translateX(-2px);
}
.stage3-card h3 {
  position: relative;
  z-index: 2;
  max-width: 210px;
  margin: 0;
  color: var(--text-strong);
  font-size: 16px;
  font-weight: 620;
  line-height: 1.38;
  white-space: nowrap;
}
.stage3-card p {
  position: relative;
  z-index: 2;
  max-width: 200px;
  min-height: 36px;
  margin: 9px 0 0;
  color: var(--text-mid);
  font-size: 11px;
  line-height: 1.6;
}

.stage3-visual {
  position: absolute;
  z-index: 1;
  top: 17px;
  right: 16px;
  bottom: 17px;
  width: 160px;
  overflow: hidden;
  opacity: 0.74;
  pointer-events: none;
  mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.5) 24%, #000 54%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.5) 24%, #000 54%);
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.stage3-card:hover .stage3-visual {
  opacity: 0.94;
  transform: translateX(-2px);
}

.stage3-mini-surface {
  position: absolute;
  inset: 8px 0 8px 18px;
  border-radius: 6px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.035), transparent 42%), rgba(11, 15, 21, 0.9);
  box-shadow:
    inset 0 0 0 1px rgba(187, 207, 232, 0.1),
    0 16px 34px rgba(0, 0, 0, 0.24);
}
.stage3-mini-topbar {
  display: flex;
  height: 20px;
  align-items: center;
  gap: 4px;
  padding: 0 9px;
  color: var(--text-soft);
  font-size: 6px;
  box-shadow: inset 0 -1px rgba(255, 255, 255, 0.04);
}
.stage3-mini-glow {
  width: 7px;
  height: 7px;
  background: radial-gradient(
    circle,
    #ddfff9 0 12%,
    rgba(22, 222, 194, 0.78) 26%,
    rgba(22, 222, 194, 0.14) 60%,
    transparent 76%
  );
  filter: drop-shadow(0 0 4px rgba(22, 222, 194, 0.24));
}
.stage3-workspace-fragment {
  display: grid;
  grid-template-columns: 46px 1fr;
  height: calc(100% - 20px);
}
.stage3-task-mini {
  padding: 9px 7px;
  background: rgba(255, 255, 255, 0.014);
  box-shadow: inset -1px 0 rgba(255, 255, 255, 0.035);
}
.stage3-task-mini span,
.stage3-terminal-mini span {
  display: block;
  height: 5px;
  margin-bottom: 7px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.085);
}
.stage3-task-mini span:first-child {
  background: rgba(22, 222, 194, 0.24);
}
.stage3-terminal-mini {
  padding: 12px 10px;
}
.stage3-terminal-mini span {
  width: 82%;
}
.stage3-terminal-mini span:nth-child(2) {
  width: 64%;
}
.stage3-terminal-mini span:nth-child(3) {
  width: 74%;
  background: rgba(25, 125, 255, 0.18);
}
.stage3-terminal-mini i {
  display: block;
  height: 2px;
  margin-top: 15px;
  border-radius: 99px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(22, 222, 194, 0.82),
    rgba(22, 222, 194, 0.16),
    transparent
  );
}
.stage3-knowledge-fragment {
  padding: 14px 12px;
}
.stage3-knowledge-query {
  display: flex;
  height: 20px;
  align-items: center;
  gap: 7px;
  padding: 0 8px;
  border-radius: 4px;
  background: rgba(22, 222, 194, 0.055);
  box-shadow: inset 0 0 0 1px rgba(22, 222, 194, 0.12);
}

.stage3-knowledge-query i {
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: rgba(22, 222, 194, 0.66);
  box-shadow: 0 0 10px rgba(22, 222, 194, 0.32);
}

.stage3-knowledge-query span {
  width: 42%;
  height: 3px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.12);
}
.stage3-knowledge-body {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 8px;
  margin-top: 11px;
}
.stage3-source-stack {
  display: grid;
  gap: 5px;
}
.stage3-source-stack span {
  height: 16px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.045);
}
.stage3-answer-mini {
  position: relative;
  border-radius: 4px;
  background: rgba(25, 125, 255, 0.055);
  box-shadow: inset 0 0 0 1px rgba(25, 125, 255, 0.085);
}
.stage3-answer-mini::before,
.stage3-answer-mini::after {
  content: '';
  position: absolute;
  left: 9px;
  height: 4px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.12);
}
.stage3-answer-mini::before {
  top: 13px;
  width: 70%;
}
.stage3-answer-mini::after {
  top: 25px;
  width: 48%;
}

.stage3-knowledge-nodes {
  position: absolute;
  right: 15%;
  bottom: 16px;
  left: 18%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stage3-knowledge-nodes::before {
  content: '';
  position: absolute;
  right: 0;
  left: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(22, 222, 194, 0.4), transparent);
}

.stage3-knowledge-nodes i {
  position: relative;
  z-index: 1;
  width: 7px;
  height: 7px;
  border: 1px solid rgba(144, 247, 225, 0.3);
  border-radius: 50%;
  background: rgba(15, 58, 57, 0.94);
  box-shadow: 0 0 12px rgba(22, 222, 194, 0.22);
}
.stage3-metric-fragment {
  display: flex;
  flex-direction: column;
  padding: 13px 12px 10px;
}
.stage3-metric-value {
  color: rgba(255, 255, 255, 0.92);
  font-size: 20px;
  font-weight: 600;
}
.stage3-metric-value small {
  margin-left: 5px;
  color: var(--green);
  font-size: 7px;
}
.stage3-metric-chart {
  position: relative;
  flex: 1;
  min-height: 72px;
  margin-top: 12px;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0 20px,
    rgba(255, 255, 255, 0.035) 20px 21px
  );
}
.stage3-metric-chart svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.stage3-metric-axis {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 8px;
  color: rgba(213, 224, 241, 0.34);
  font-size: 7px;
  text-align: center;
}
.stage3-workflow-fragment {
  padding: 13px 11px;
}
.stage3-flow-steps {
  display: flex;
  align-items: center;
  gap: 5px;
}
.stage3-flow-step {
  display: flex;
  flex: 1;
  height: 42px;
  min-width: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  border-radius: 4px;
  color: rgba(224, 231, 240, 0.38);
  background: rgba(255, 255, 255, 0.04);
  font-size: 6px;
  font-style: normal;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.035);
}

.stage3-flow-step i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
}

.stage3-flow-step.active {
  color: rgba(204, 255, 245, 0.66);
  background: rgba(22, 222, 194, 0.07);
  box-shadow: inset 0 0 0 1px rgba(22, 222, 194, 0.11);
}

.stage3-flow-step.active i {
  background: rgba(22, 222, 194, 0.76);
  box-shadow: 0 0 9px rgba(22, 222, 194, 0.34);
}
.stage3-flow-line {
  height: 2px;
  margin: 11px 4px 0;
  border-radius: 99px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(22, 222, 194, 0.75) 18%,
    rgba(25, 125, 255, 0.56) 70%,
    transparent
  );
  box-shadow: 0 0 9px rgba(22, 222, 194, 0.1);
}
.stage3-approval-mini {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 11px;
  color: var(--text-soft);
  font-size: 6px;
}
.stage3-approval-mini span {
  padding: 3px 6px;
  border-radius: 3px;
  color: #e8b75c;
  background: rgba(232, 183, 92, 0.08);
}

/* Continuous campaign canvas: one atmosphere, three editorial scenes. */
.phase {
  z-index: 1;
  isolation: isolate;
  padding-top: 72px;
  padding-bottom: 76px;
}

.phase::after {
  position: absolute;
  z-index: -1;
  top: 48px;
  left: 4px;
  color: rgba(255, 255, 255, 0.045);
  font-size: 92px;
  font-weight: 680;
  line-height: 0.82;
  pointer-events: none;
}

.phase--rights {
  background: linear-gradient(105deg, rgba(240, 186, 104, 0.035), transparent 42%);
}

.phase--rights::after {
  content: '01';
}

.phase--models {
  background: linear-gradient(115deg, transparent 22%, rgba(25, 125, 255, 0.04) 72%, transparent);
}

.phase--models::after {
  content: '02';
}

.phase--product {
  background: linear-gradient(110deg, rgba(22, 222, 194, 0.028), transparent 54%);
}

.phase--product::after {
  content: '03';
}

.phase + .phase::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(220, 235, 240, 0.15) 18%,
    rgba(220, 235, 240, 0.15) 82%,
    transparent
  );
}

.phase[data-campaign-stage='3'].phase--product {
  padding-bottom: 72px;
}

.phase-number,
.phase-intro,
.benefit-copy,
.benefit-metrics,
.model-ecosystem,
.model-library,
.model-recommendations,
.stage3-compact {
  position: relative;
  z-index: 1;
}

.benefit-layout {
  min-height: 360px;
  grid-template-columns: minmax(250px, 0.72fr) minmax(0, 1.28fr);
  column-gap: 72px;
}

.benefit-metrics {
  grid-template-columns: minmax(0, 1.34fr) minmax(190px, 0.66fr);
  gap: 22px;
  min-height: 138px;
  align-items: stretch;
}

.benefit-metric:first-child {
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.benefit-metric:last-child {
  position: relative;
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
  background: rgba(240, 186, 104, 0.055);
}

.benefit-metric:last-child::after {
  content: '+';
  position: absolute;
  top: -38px;
  right: 4px;
  color: rgba(240, 186, 104, 0.08);
  font-size: 128px;
  font-weight: 300;
  pointer-events: none;
}

.benefit-metric:last-child > strong {
  position: relative;
  z-index: 1;
  color: var(--amber);
  background: none;
  -webkit-text-fill-color: currentColor;
}

.benefit-metric:last-child > span {
  position: relative;
  z-index: 1;
}

.benefit-transition {
  grid-template-columns: auto minmax(62px, 1fr) auto;
  width: 100%;
}

.benefit-transition > strong {
  background: linear-gradient(100deg, #fff 10%, #ffe2aa 60%, var(--amber));
  background-clip: text;
  -webkit-background-clip: text;
}

.benefit-rail {
  position: relative;
  min-width: 62px;
  color: var(--amber);
}

.benefit-rail::before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 4px;
  left: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.08), var(--amber));
}

.phase-divider {
  display: none;
}

.phase--models .phase-intro,
.phase--product .phase-intro {
  max-width: 690px;
}

.model-ecosystem {
  grid-template-columns: 240px minmax(0, 1fr);
  margin-top: 44px;
  background: rgba(7, 12, 18, 0.26);
}

.ecosystem-summary {
  min-height: 272px;
  padding: 30px 26px 28px;
  background: linear-gradient(145deg, rgba(25, 125, 255, 0.045), transparent 58%);
}

.model-card {
  height: 136px;
  padding-top: 26px;
  padding-bottom: 24px;
}

.model-card small {
  top: 22px;
}

.model-card > strong {
  bottom: 24px;
}

.model-library {
  min-height: 102px;
  padding: 24px 0;
}

.existing-list span {
  color: rgba(255, 255, 255, 0.42);
}

.model-recommendations {
  margin-top: 44px;
}

.stage3-compact {
  grid-template-columns: 250px minmax(0, 1fr);
  margin-top: 44px;
  background: rgba(7, 14, 14, 0.24);
}

.stage3-summary {
  height: auto;
  min-height: 420px;
  padding: 30px 26px;
  background: linear-gradient(150deg, rgba(22, 222, 194, 0.05), transparent 64%);
}

.stage3-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stage3-card {
  min-height: 192px;
  padding: 24px 20px 92px;
}

.stage3-card:first-child {
  grid-column: 1 / -1;
  min-height: 228px;
  padding: 34px 48% 30px 26px;
  border-bottom: 1px solid var(--line-soft);
  background: rgba(25, 125, 255, 0.025);
}

.stage3-card:nth-child(odd)::after,
.stage3-card:nth-child(-n + 2)::before {
  display: none;
}

.stage3-card:nth-child(n + 3) {
  border-left: 1px solid var(--line-soft);
}

.stage3-card-number {
  top: 12px;
  right: 12px;
  font-size: 52px;
}

.stage3-card:first-child .stage3-card-number {
  right: 44%;
}

.stage3-card:not(:first-child) h3 {
  max-width: 190px;
  white-space: normal;
}

.stage3-card:not(:first-child) p {
  max-width: 190px;
}

.stage3-card:first-child .stage3-visual {
  top: 24px;
  right: 24px;
  bottom: 24px;
  width: 45%;
}

.stage3-card:not(:first-child) .stage3-visual {
  top: auto;
  right: 14px;
  bottom: 12px;
  width: calc(100% - 28px);
  height: 78px;
  opacity: 0.56;
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.54) 24%, #000 62%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.54) 24%, #000 62%);
}

.stage3-card:not(:first-child) .stage3-mini-surface {
  inset: 0;
}

/* Editorial campaign rhythm: the three chapters share one canvas and vary by composition. */
.august-month {
  background:
    radial-gradient(circle at 18% 8%, rgba(126, 91, 214, 0.13), transparent 23%),
    radial-gradient(circle at 84% 13%, rgba(22, 222, 194, 0.08), transparent 21%), #090d16;
}

.campaign-hero {
  background:
    radial-gradient(circle at 30% 44%, rgba(69, 97, 190, 0.08), transparent 32%),
    radial-gradient(circle at 72% 38%, rgba(22, 222, 194, 0.045), transparent 30%);
}

.campaign-detail-field {
  background:
    radial-gradient(76% 18% at 8% 18%, rgba(240, 186, 104, 0.16), transparent 72%),
    radial-gradient(82% 25% at 94% 48%, rgba(78, 112, 228, 0.22), transparent 72%),
    radial-gradient(78% 23% at 12% 79%, rgba(22, 222, 194, 0.15), transparent 72%),
    radial-gradient(54% 18% at 82% 94%, rgba(192, 87, 150, 0.1), transparent 76%),
    linear-gradient(
      180deg,
      transparent 0,
      rgba(22, 22, 42, 0.98) 160px,
      #171a31 24%,
      #10242b 69%,
      #191821 100%
    );
}

.campaign-detail-field::after {
  top: 5%;
  right: -22vw;
  bottom: 4%;
  width: min(920px, 72vw);
  opacity: 0.66;
  background:
    radial-gradient(circle at 78% 10%, rgba(240, 186, 104, 0.14), transparent 25%),
    radial-gradient(circle at 64% 48%, rgba(25, 125, 255, 0.12), transparent 28%),
    radial-gradient(circle at 78% 88%, rgba(22, 222, 194, 0.1), transparent 25%);
  filter: blur(112px);
  clip-path: none;
}

.phase {
  padding-top: 68px;
  padding-bottom: 68px;
  background: transparent;
}

.phase + .phase::before {
  display: none;
}

.phase::after {
  top: 22px;
  left: 50%;
  color: rgba(255, 255, 255, 0.055);
  font-size: 138px;
  transform: translateX(-50%);
}

.phase[data-campaign-stage='3'].phase--product {
  padding-bottom: 44px;
}

.phase-intro {
  display: flex;
  min-height: 0;
  max-width: 700px;
  align-items: center;
  flex-direction: column;
  margin: 0 auto 54px;
  text-align: center;
}

.phase-number {
  justify-content: center;
}

.phase h2 {
  font-size: 34px;
  line-height: 1.28;
}

.phase-lead {
  max-width: 620px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.phase--models .phase-intro {
  margin-bottom: 38px;
}

.phase--product .phase-intro {
  margin-bottom: 44px;
}

.model-orbit-art {
  position: absolute;
  z-index: 0;
  top: 6px;
  left: 50%;
  width: 720px;
  height: 420px;
  opacity: 0.72;
  pointer-events: none;
  transform: translateX(-50%);
  mask-image: radial-gradient(circle, #000 0 44%, rgba(0, 0, 0, 0.54) 68%, transparent 82%);
  -webkit-mask-image: radial-gradient(circle, #000 0 44%, rgba(0, 0, 0, 0.54) 68%, transparent 82%);
}

.model-orbit-art__ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgba(118, 161, 255, 0.13);
  border-radius: 50%;
  box-shadow:
    0 0 28px rgba(98, 117, 255, 0.035),
    inset 0 0 26px rgba(22, 222, 194, 0.025);
  transform: translate(-50%, -50%) rotate(-12deg);
}

.model-orbit-art__ring--one {
  width: 460px;
  height: 164px;
}

.model-orbit-art__ring--two {
  width: 382px;
  height: 238px;
  border-color: rgba(22, 222, 194, 0.1);
  transform: translate(-50%, -50%) rotate(24deg);
}

.model-orbit-art__ring--three {
  width: 296px;
  height: 296px;
  border-color: rgba(188, 116, 255, 0.1);
}

.model-orbit-art__core {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  width: 74px;
  height: 74px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(
    circle at 42% 34%,
    rgba(222, 255, 251, 0.54),
    rgba(77, 124, 255, 0.26) 38%,
    rgba(151, 111, 255, 0.07) 72%,
    transparent 74%
  );
  box-shadow:
    0 0 36px rgba(78, 112, 228, 0.18),
    0 0 74px rgba(22, 222, 194, 0.08);
  transform: translate(-50%, -50%);
}

.model-orbit-art__core img {
  width: 34px;
  height: 34px;
  object-fit: contain;
  opacity: 0.9;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.22));
}

.model-orbit-art__node {
  position: absolute;
  width: 8px;
  height: 8px;
  border: 1px solid rgba(224, 246, 255, 0.56);
  border-radius: 50%;
  background: rgba(116, 221, 208, 0.64);
  box-shadow:
    0 0 12px rgba(116, 221, 208, 0.74),
    0 0 26px rgba(78, 112, 228, 0.4);
}

.model-orbit-art__node.is-1 {
  top: 25%;
  left: 23%;
}

.model-orbit-art__node.is-2 {
  top: 27%;
  right: 20%;
  background: rgba(190, 125, 255, 0.72);
}

.model-orbit-art__node.is-3 {
  bottom: 21%;
  left: 29%;
  background: rgba(87, 139, 255, 0.72);
}

.model-orbit-art__node.is-4 {
  right: 26%;
  bottom: 22%;
  background: rgba(240, 186, 104, 0.72);
}

.benefit-layout {
  display: block;
  min-height: 380px;
  padding-top: 72px;
}

.benefit-copy {
  min-height: 0;
  align-items: center;
  margin: 0 auto;
  text-align: center;
}

.benefit-metrics {
  max-width: 960px;
  min-height: 214px;
  grid-template-columns: minmax(0, 1.24fr) minmax(320px, 0.76fr);
  gap: 24px;
  margin: 58px auto 0;
}

.benefit-summary-group {
  display: grid;
  min-width: 0;
  min-height: 214px;
  grid-template-columns: minmax(0, 1.2fr) 1px minmax(164px, 0.8fr);
  align-items: stretch;
}

.benefit-summary-group .benefit-metric {
  min-height: 214px;
  padding: 26px 18px;
}

.benefit-summary-group .phase-divider {
  display: block;
  width: 1px;
  height: auto;
  margin: 26px 0;
  background: var(--line);
}

.benefit-summary-group .benefit-transition {
  position: relative;
  top: 11px;
  min-height: 58px;
  align-items: center;
  margin-bottom: 11px;
}

.benefit-summary-group .benefit-caption {
  position: relative;
  top: 11px;
  min-height: 44px;
}

.benefit-summary-group .benefit-from {
  position: relative;
  top: 11px;
}

.benefit-bonus-summary {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 214px;
  padding: 26px 18px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: radial-gradient(circle at 50% 50%, rgba(240, 186, 104, 0.09), transparent 72%);
  text-align: center;
}

.benefit-bonus-summary > strong {
  display: flex;
  min-height: 58px;
  align-items: center;
  justify-content: center;
  margin: 0 0 11px;
  color: var(--amber);
  font-size: 48px;
  font-weight: 500;
  line-height: 1;
}

.benefit-summary-group .benefit-transition > strong,
.benefit-summary-group .benefit-bonus-summary > strong {
  transition: transform 180ms ease;
}

.benefit-summary-group:hover .benefit-transition > strong,
.benefit-summary-group:hover .benefit-bonus-summary > strong {
  transform: translateY(-2px);
}

.benefit-bonus-summary > span {
  display: flex;
  min-height: 44px;
  max-width: 132px;
  align-items: flex-start;
  justify-content: center;
  color: var(--text-mid);
  font-size: 12px;
  line-height: 1.55;
}

.benefit-bonus-summary > strong,
.benefit-bonus-summary > span {
  position: relative;
  top: 14px;
}

.benefit-bonus-summary > strong {
  top: 16px;
}

.benefit-example {
  position: relative;
  z-index: 1;
  display: flex;
  min-width: 0;
  justify-content: center;
  flex-direction: column;
  min-height: 214px;
  padding: 26px 24px;
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: radial-gradient(circle at 36% 44%, rgba(240, 186, 104, 0.055), transparent 76%);
  text-align: left;
}

.benefit-example > small {
  color: rgba(240, 186, 104, 0.76);
  font-size: 11px;
  font-weight: 700;
}

.benefit-example-flow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 28px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.benefit-example-flow > span {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.benefit-example-flow small {
  color: var(--text-soft);
  font-size: 10px;
}

.benefit-example-flow strong {
  margin-top: 3px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 18px;
  font-weight: 620;
  white-space: nowrap;
}

.benefit-example-flow > span:last-child strong {
  color: #f0ba68;
}

.benefit-example-flow i {
  color: rgba(240, 186, 104, 0.72);
  font-size: 20px;
  font-style: normal;
  text-align: center;
}

.benefit-example p {
  margin: 14px 0 0;
  color: var(--text-soft);
  font-size: 11px;
  line-height: 1.55;
}

.model-ecosystem {
  display: block;
  margin-top: 0;
  overflow: visible;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: transparent;
}

.model-new-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.model-card {
  --model-tint: rgba(92, 122, 255, 0.12);
  height: 190px;
  padding: 28px 20px 26px;
  border-right: 0 !important;
  border-bottom: 0 !important;
  border-left: 1px solid var(--line-soft);
  background: radial-gradient(circle at 78% 42%, var(--model-tint), transparent 52%);
  transition:
    transform 220ms ease,
    background 220ms ease;
}

.model-card:nth-child(2),
.model-card:nth-child(4) {
  padding-top: 34px;
}

.model-card:hover {
  background: radial-gradient(circle at 74% 44%, var(--model-tint), transparent 66%);
  transform: translateY(-4px);
}

.model-card:first-child {
  border-left: 0;
}

.model-card:nth-child(1) {
  --model-tint: rgba(151, 111, 255, 0.15);
}

.model-card:nth-child(2) {
  --model-tint: rgba(22, 222, 194, 0.12);
}

.model-card:nth-child(3) {
  --model-tint: rgba(63, 132, 255, 0.16);
}

.model-card:nth-child(4) {
  --model-tint: rgba(240, 186, 104, 0.13);
}

.model-card small {
  top: 26px;
  left: 20px;
}

.model-card > strong {
  right: 20px;
  bottom: 26px;
  left: 20px;
  font-size: 15px;
}

.model-library {
  min-height: 124px;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 44px;
  padding: 28px 0;
}

.model-recommendations {
  margin-top: 34px;
}

.model-scenarios {
  display: block;
}

.scenario {
  display: grid;
  min-height: 88px;
  grid-template-columns: 220px minmax(0, 1fr);
  align-items: center;
  gap: 44px;
  padding: 18px 0;
}

.scenario:nth-child(odd) {
  border-right: 0;
}

.scenario-copy {
  grid-template-columns: 30px minmax(0, 1fr);
}

.stage3-compact {
  display: block;
  margin-top: 0;
  overflow: visible;
  border: 0;
  background: transparent;
}

.stage3-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 30px 32px;
}

.stage3-card {
  --cap-tint: rgba(63, 132, 255, 0.1);
  min-height: 292px;
  padding: 32px 46% 30px 0;
  overflow: visible;
  border-top: 1px solid var(--line);
  background: radial-gradient(circle at 76% 54%, var(--cap-tint), transparent 60%);
}

.stage3-card::before,
.stage3-card::after {
  display: none !important;
}

.stage3-card:hover {
  background: transparent;
}

.stage3-card.stage3-card--cloud {
  --cap-tint: rgba(63, 132, 255, 0.16);
  grid-column: span 7;
  min-height: 292px;
  padding: 32px 46% 30px 0;
  border-bottom: 0;
  background: radial-gradient(circle at 76% 54%, var(--cap-tint), transparent 60%);
}

.stage3-card--knowledge {
  --cap-tint: rgba(22, 222, 194, 0.14);
  grid-column: span 5;
}

.stage3-card--metrics {
  --cap-tint: rgba(151, 111, 255, 0.15);
  grid-column: span 8;
}

.stage3-card--collaboration {
  --cap-tint: rgba(240, 186, 104, 0.15);
  grid-column: span 4;
}

.stage3-card:nth-child(n + 3) {
  border-left: 0;
}

.stage3-card--knowledge,
.stage3-card--collaboration {
  padding-right: 0;
  padding-bottom: 142px;
  text-align: right;
}

.stage3-card--knowledge h3,
.stage3-card--knowledge p,
.stage3-card--collaboration h3,
.stage3-card--collaboration p {
  margin-right: 0;
  margin-left: auto;
}

.stage3-card--knowledge p {
  white-space: pre-line;
}

.stage3-card-label {
  margin-bottom: 14px;
  color: rgba(22, 222, 194, 0.72);
}

.stage3-card--cloud .stage3-card-label {
  color: #80b2ff;
}

.stage3-card--knowledge .stage3-card-label {
  color: #77e6c7;
}

.stage3-card--metrics .stage3-card-label {
  color: #b9a3ff;
}

.stage3-card--collaboration .stage3-card-label {
  color: #f3c77e;
}

.stage3-card-number,
.stage3-card:first-child .stage3-card-number {
  top: 20px;
  right: calc(54% + 8px);
  color: rgba(255, 255, 255, 0.06);
  font-size: 64px;
}

.stage3-card--collaboration .stage3-card-number {
  right: auto;
  left: 24px;
}

.stage3-card--knowledge .stage3-card-number {
  top: auto;
  right: 24px;
  bottom: 22px;
  left: auto;
}

.stage3-card--metrics .stage3-card-number {
  top: auto;
  right: auto;
  bottom: 22px;
  left: 24px;
}

.stage3-card h3,
.stage3-card:first-child h3,
.stage3-card:not(:first-child) h3 {
  max-width: 310px;
  font-size: 20px;
  white-space: normal;
}

.stage3-card p,
.stage3-card:first-child p,
.stage3-card:not(:first-child) p {
  max-width: 300px;
  min-height: 0;
  margin-top: 12px;
  font-size: 12px;
  line-height: 1.7;
}

.stage3-card-copy {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.stage3-card-copy--tags-first .stage3-card-tags {
  order: 1;
  margin-top: 14px;
}

.stage3-card-copy--tags-first p {
  order: 2;
  margin-top: 12px;
}

.stage3-card-tags {
  position: relative;
  z-index: 2;
  display: flex;
  max-width: 330px;
  align-items: center;
  gap: 7px;
  margin-top: 18px;
  color: rgba(218, 231, 244, 0.44);
  font-size: 9px;
  line-height: 1.5;
  flex-wrap: wrap;
}

.stage3-card-tags span + span::before {
  content: '/';
  margin-right: 7px;
  color: color-mix(in srgb, var(--cap-tint) 62%, rgba(255, 255, 255, 0.32));
}

.stage3-card--knowledge .stage3-card-tags,
.stage3-card--collaboration .stage3-card-tags {
  justify-content: flex-end;
  margin-right: 0;
  margin-left: auto;
}

.stage3-card .stage3-visual,
.stage3-card:first-child .stage3-visual {
  top: 70px;
  right: 18px;
  bottom: 18px;
  left: 38%;
  width: auto;
  height: auto;
  opacity: 0.82;
  mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.62) 18%, #000 44%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.62) 18%, #000 44%);
}

.stage3-card.stage3-card--knowledge .stage3-visual,
.stage3-card.stage3-card--collaboration .stage3-visual {
  top: 28px;
  right: auto;
  bottom: 28px;
  left: 20px;
  width: 60%;
  height: auto;
  opacity: 0.8;
  mask-image: linear-gradient(90deg, #000 0 54%, rgba(0, 0, 0, 0.62) 76%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, #000 0 54%, rgba(0, 0, 0, 0.62) 76%, transparent 100%);
}

.stage3-card.stage3-card--metrics .stage3-visual {
  top: 44px;
  right: 18px;
  bottom: 18px;
  left: 48%;
  width: auto;
  height: auto;
  mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.58) 18%, #000 44%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.58) 18%, #000 44%);
}

.stage3-card.stage3-card--collaboration .stage3-visual {
  top: 140px;
  right: 18px;
  bottom: 20px;
  left: 20px;
  width: auto;
  height: auto;
  mask-image: linear-gradient(90deg, #000 0 58%, rgba(0, 0, 0, 0.7) 78%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, #000 0 58%, rgba(0, 0, 0, 0.7) 78%, transparent 100%);
}

.stage3-card--collaboration .stage3-workflow-fragment {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.stage3-card .stage3-mini-surface,
.stage3-card:not(:first-child) .stage3-mini-surface {
  inset: 0;
  border-radius: 8px;
  background:
    radial-gradient(circle at 76% 18%, var(--cap-tint), transparent 52%),
    linear-gradient(145deg, rgba(17, 27, 45, 0.72), rgba(7, 13, 23, 0.46));
  box-shadow:
    inset 0 0 0 1px rgba(187, 207, 232, 0.075),
    0 18px 38px rgba(0, 0, 0, 0.14),
    0 0 36px color-mix(in srgb, var(--cap-tint) 34%, transparent);
}

.stage3-cloud-nodes {
  position: absolute;
  right: 12px;
  bottom: 11px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.stage3-cloud-nodes i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(91, 147, 255, 0.7);
  box-shadow: 0 0 8px rgba(91, 147, 255, 0.48);
}

.stage3-cloud-nodes i:nth-child(2) {
  background: rgba(22, 222, 194, 0.76);
}

.stage3-cloud-nodes i:nth-child(3) {
  background: rgba(190, 125, 255, 0.72);
}

.stage3-knowledge-trace {
  position: absolute;
  right: 12px;
  bottom: 10px;
  left: 12px;
  display: grid;
  grid-template-columns: 1.2fr 0.7fr 1fr 0.45fr;
  align-items: end;
  gap: 5px;
}

.stage3-knowledge-trace i {
  height: 2px;
  background: linear-gradient(90deg, rgba(22, 222, 194, 0.68), transparent);
  box-shadow: 0 0 8px rgba(22, 222, 194, 0.14);
}

.stage3-metric-bars {
  position: absolute;
  top: 14px;
  right: 12px;
  display: flex;
  height: 30px;
  align-items: flex-end;
  gap: 4px;
}

.stage3-metric-bars i {
  width: 5px;
  height: 34%;
  border-radius: 3px 3px 0 0;
  background: linear-gradient(180deg, rgba(185, 163, 255, 0.78), rgba(91, 147, 255, 0.24));
}

.stage3-metric-bars i:nth-child(2) {
  height: 56%;
}

.stage3-metric-bars i:nth-child(3) {
  height: 74%;
}

.stage3-metric-bars i:nth-child(4) {
  height: 100%;
}

/* Reference-led campaign groups: denser content without third-party brand marks. */
.model-ecosystem {
  padding: 16px 16px 0;
  border: 1px solid rgba(151, 181, 220, 0.13);
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
  background:
    radial-gradient(circle at 50% 0, rgba(78, 112, 228, 0.08), transparent 54%),
    rgba(8, 14, 28, 0.28);
  box-shadow: 0 24px 74px rgba(2, 8, 20, 0.12);
}

.model-new-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0;
}

.model-card,
.model-card:first-child,
.model-card:nth-child(odd),
.model-card:nth-child(even) {
  height: 176px;
  padding: 22px 14px 24px;
  border: 0 !important;
  border-radius: 0;
  background: radial-gradient(circle at 82% 62%, var(--model-tint), transparent 50%);
  box-shadow: none;
}

.model-card + .model-card {
  box-shadow: inset 1px 0 rgba(151, 181, 220, 0.08);
}

.model-card:hover {
  background: radial-gradient(circle at 78% 58%, var(--model-tint), transparent 64%);
}

.model-card small {
  top: 20px;
  left: 14px;
}

.model-card > strong {
  right: 14px;
  bottom: 24px;
  left: 14px;
  font-size: 14px;
}

.model-card__wordmark {
  top: 60px;
  right: 14px;
  left: 14px;
  color: rgba(255, 255, 255, 0.13);
  font-size: 22px;
}

.model-library {
  min-height: 118px;
  padding: 24px 18px 26px;
  border-right: 1px solid rgba(151, 181, 220, 0.13);
  border-bottom: 1px solid rgba(151, 181, 220, 0.13);
  border-left: 1px solid rgba(151, 181, 220, 0.13);
  border-radius: 0 0 8px 8px;
  background: rgba(8, 14, 28, 0.2);
}

.model-library-head {
  position: relative;
  display: flex;
  min-height: 53px;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  align-self: center;
}

.model-library-head span {
  position: absolute;
  top: -2px;
  left: 0;
  margin-bottom: 0;
}

.model-library-head strong {
  display: flex;
  min-height: 53px;
  align-items: center;
}

.existing-list {
  align-self: center;
}

.model-recommendations {
  padding: 26px 0 22px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid rgba(151, 181, 220, 0.13);
  border-left: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.model-scenarios {
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: linear-gradient(180deg, rgba(4, 10, 22, 0.16), rgba(4, 10, 22, 0.24));
}

.scenario {
  min-height: 76px;
  padding: 14px 18px;
}

.stage3-compact {
  padding: 16px;
  border: 1px solid rgba(151, 181, 220, 0.13);
  border-radius: 8px;
  background:
    radial-gradient(circle at 100% 20%, rgba(22, 222, 194, 0.06), transparent 34%),
    radial-gradient(circle at 0 78%, rgba(78, 112, 228, 0.07), transparent 38%),
    rgba(7, 14, 26, 0.28);
  box-shadow: 0 26px 78px rgba(2, 8, 20, 0.14);
}

.stage3-grid {
  gap: 12px;
}

.stage3-card,
.stage3-card.stage3-card--cloud {
  min-height: 276px;
  padding: 28px 46% 26px 18px;
  border: 1px solid rgba(151, 181, 220, 0.1);
  border-radius: 6px;
  background:
    radial-gradient(circle at 76% 54%, var(--cap-tint), transparent 58%),
    linear-gradient(145deg, rgba(18, 31, 57, 0.5), rgba(7, 14, 26, 0.22));
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.018);
}

.stage3-card:hover,
.stage3-card.stage3-card--cloud:hover {
  border-color: color-mix(in srgb, var(--cap-tint) 62%, rgba(255, 255, 255, 0.12));
  background:
    radial-gradient(circle at 76% 54%, var(--cap-tint), transparent 66%),
    linear-gradient(145deg, rgba(21, 36, 66, 0.58), rgba(7, 14, 26, 0.26));
}

.stage3-card--knowledge,
.stage3-card--collaboration {
  padding: 28px 18px 134px;
}

.campaign-closing {
  position: relative;
  display: flex;
  min-height: 320px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 72px 40px;
  overflow: hidden;
  text-align: center;
  background:
    radial-gradient(circle at 36% 54%, rgba(151, 111, 255, 0.12), transparent 34%),
    radial-gradient(circle at 64% 48%, rgba(22, 222, 194, 0.1), transparent 36%);
}

.campaign-closing span {
  color: rgba(118, 221, 199, 0.72);
  font-size: 11px;
  font-weight: 700;
}

.campaign-closing h2 {
  margin: 16px 0 0;
  color: var(--text-strong);
  font-size: 38px;
  font-weight: 620;
  line-height: 1.25;
  letter-spacing: 0;
}

.campaign-closing p {
  margin: 14px 0 0;
  color: var(--text-mid);
  font-size: 14px;
  line-height: 1.7;
}

.campaign-closing__cta {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
  padding: 0 24px;
  border: 1px solid rgba(118, 221, 199, 0.26);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(22, 222, 194, 0.045);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease;
}

.campaign-closing__cta i {
  color: rgba(118, 221, 199, 0.88);
  font-style: normal;
  transition: transform 180ms ease;
}

.campaign-closing__cta:hover,
.campaign-closing__cta:focus-visible {
  border-color: rgba(118, 221, 199, 0.52);
  background: rgba(22, 222, 194, 0.075);
  transform: translateY(-2px);
}

.campaign-closing__cta:hover i,
.campaign-closing__cta:focus-visible i {
  transform: translateX(3px);
}

.campaign-closing__cta:focus-visible {
  outline: 2px solid rgba(25, 125, 255, 0.48);
  outline-offset: 3px;
}

@media (max-width: 820px) {
  .august-month {
    width: 100%;
    padding: 0;
  }
  .campaign-shell {
    width: calc(100% - 28px);
  }
  .campaign-hero {
    padding: 28px 22px;
  }
  .phase {
    padding: 72px 22px;
  }
  .model-orbit-art {
    top: 68px;
    width: 520px;
    height: 360px;
    opacity: 0.44;
  }
  .campaign-hero {
    min-height: 100svh;
  }
  .campaign-hero__watermark {
    top: 32px;
    font-size: 320px;
    transform: translateX(-50%);
  }
  .campaign-hero h1 {
    font-size: 42px;
  }
  .campaign-hero__headline {
    font-size: 20px;
  }
  .campaign-overview {
    margin-top: 24px;
    padding: 0;
  }
  .campaign-overview__grid {
    grid-template-columns: 1fr;
  }
  .campaign-overview-item + .campaign-overview-item {
    border-left: 0;
    border-top: 1px solid var(--line-soft);
  }
  .campaign-overview-item {
    min-height: 180px;
  }
  .phase + .phase::before {
    right: 22px;
    left: 22px;
  }
  .benefit-layout {
    min-height: 0;
    grid-template-columns: 1fr;
  }
  .benefit-metrics {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 28px;
  }
  .benefit-metric > strong,
  .benefit-transition > strong {
    font-size: 34px;
  }
  .benefit-transition {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 2px;
  }
  .benefit-caption {
    white-space: normal;
  }
  .model-ecosystem,
  .stage3-compact {
    grid-template-columns: 1fr;
  }
  .ecosystem-summary,
  .stage3-summary {
    min-height: 176px;
    border-right: 0;
    border-bottom: 1px solid var(--line-soft);
  }
  .model-new-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .stage3-grid {
    grid-template-columns: 1fr;
  }
  .stage3-card--cloud,
  .stage3-card--knowledge,
  .stage3-card--metrics,
  .stage3-card--collaboration {
    grid-column: 1;
  }
  .model-card:nth-child(odd),
  .stage3-card:nth-child(odd) {
    border-right: 0;
  }
  .model-card,
  .stage3-card {
    border-bottom: 1px solid var(--line-soft);
  }
  .model-card:nth-child(odd) {
    border-left: 0;
  }
  .model-card:nth-child(even) {
    border-left: 1px solid var(--line-soft);
  }
  .model-card:nth-child(odd) {
    box-shadow: none;
  }
  .model-card:nth-child(even) {
    box-shadow: inset 1px 0 rgba(151, 181, 220, 0.08);
  }
  .model-library {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .existing-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 18px;
  }
  .recommendation-head {
    align-items: flex-start;
    flex-direction: column;
  }
  .model-scenarios {
    grid-template-columns: 1fr;
  }
  .scenario {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .scenario:nth-child(odd) {
    border-right: 0;
  }
  .stage3-card {
    min-height: 292px;
    padding: 30px 44% 30px 0;
  }
  .stage3-card--knowledge,
  .stage3-card--collaboration {
    padding-right: 44%;
    padding-bottom: 30px;
    text-align: left;
  }
  .stage3-card--knowledge h3,
  .stage3-card--knowledge p,
  .stage3-card--collaboration h3,
  .stage3-card--collaboration p {
    margin-right: auto;
    margin-left: 0;
  }
  .stage3-card--knowledge .stage3-card-tags,
  .stage3-card--collaboration .stage3-card-tags {
    justify-content: flex-start;
    margin-right: auto;
    margin-left: 0;
  }
  .stage3-card-number,
  .stage3-card:first-child .stage3-card-number,
  .stage3-card--knowledge .stage3-card-number,
  .stage3-card--collaboration .stage3-card-number {
    right: 44%;
    left: auto;
  }
  .stage3-card--knowledge .stage3-visual,
  .stage3-card--collaboration .stage3-visual {
    top: 66px;
    right: 0;
    bottom: 26px;
    width: 42%;
    height: auto;
    mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.5) 20%, #000 50%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.5) 20%, #000 50%);
  }
  .campaign-closing {
    min-height: 320px;
    padding: 72px 22px;
  }
}

@media (max-width: 480px) {
  .benefit-metrics {
    grid-template-columns: 1fr;
  }
  .benefit-summary-group {
    grid-template-columns: 1fr;
  }
  .benefit-summary-group .phase-divider {
    width: 100%;
    height: 1px;
    margin: 0;
  }
  .benefit-bonus-summary {
    border-right: 0;
    border-bottom: 1px solid rgba(240, 186, 104, 0.13);
  }
  .phase-divider {
    width: 100%;
    height: 1px;
    margin: 20px 0;
  }
  .existing-list {
    grid-template-columns: 1fr;
  }
  .model-new-grid {
    grid-template-columns: 1fr;
  }
  .model-card,
  .model-card:nth-child(even) {
    border-left: 0;
  }
  .model-card + .model-card,
  .model-card:nth-child(even) {
    box-shadow: inset 0 1px rgba(151, 181, 220, 0.08);
  }
  .stage3-card {
    min-height: 340px;
    padding: 28px 0 166px;
  }
  .stage3-card--knowledge,
  .stage3-card--collaboration {
    padding: 28px 0 166px;
  }
  .stage3-card .stage3-visual,
  .stage3-card:first-child .stage3-visual,
  .stage3-card--knowledge .stage3-visual,
  .stage3-card--collaboration .stage3-visual {
    top: auto;
    right: 0;
    bottom: 22px;
    width: 100%;
    height: 132px;
    mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.58) 24%, #000 62%);
    -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.58) 24%, #000 62%);
  }
  .stage3-card-number,
  .stage3-card:first-child .stage3-card-number,
  .stage3-card--knowledge .stage3-card-number,
  .stage3-card--collaboration .stage3-card-number {
    right: 0;
  }
  .stage3-card h3 {
    white-space: normal;
  }
  .campaign-closing h2 {
    font-size: 28px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .campaign-hero:hover .campaign-hero__spark {
    animation: none;
  }

  .campaign-overview-item,
  .campaign-overview-item::before,
  .campaign-overview-item__content {
    transition: none;
  }
}
</style>
