<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import AugustDeveloperMonthEntry from './components/AugustDeveloperMonthEntry.vue'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import CcfLogo from '@/assets/home/ccf_logo.webp'
import {
  CARD1_URL,
  CARD2_URL,
  CARD3_URL,
  HISTORY1_URL,
  CCF_COMPETITION_PATH,
  CARD2_HINT_STEPS,
} from './constants'

defineOptions({ name: 'OperationPage' })

const { t, locale } = useI18n()

const isEnglish = computed(() => locale.value === 'en')

useHead({
  title: 'CoStrict 运营活动 - 免费领取 Credits，加速你的 AI 编程体验',
  meta: [
    {
      name: 'description',
      content:
        '参与 CoStrict 社区活动，通过注册、邀请好友、GitHub 开源贡献获取免费 Credits，加速你的 AI 编程体验。',
    },
    { property: 'og:title', content: 'CoStrict 运营活动 - 免费领取 Credits' },
    {
      property: 'og:description',
      content: '参与 CoStrict 社区活动，通过注册、邀请好友、GitHub 开源贡献获取免费 Credits。',
    },
    { property: 'og:url', content: 'https://costrict.ai/operation' },
    { name: 'twitter:title', content: 'CoStrict 运营活动 - 免费领取 Credits' },
    { name: 'twitter:description', content: '参与活动，免费领取 Credits，加速你的 AI 编程体验。' },
  ],
  link: [{ rel: 'canonical', href: 'https://costrict.ai/operation' }],
})

const card2Rules = computed(() => [t('operation.card2Rule1'), t('operation.card2Rule2')])

const inviteSteps = computed(() =>
  CARD2_HINT_STEPS.map((step) => ({
    index: String(step).padStart(2, '0'),
    label: t(`operation.card2HintStep${step}`),
  })),
)

const contribRows = computed(() =>
  (['contrib1', 'contrib2', 'contrib3', 'contrib4', 'contrib5'] as const).map((key) => ({
    action: t(`operation.${key}`),
    credits: t(`operation.${key}Credits`),
  })),
)

// Scroll fade-up animation
const [card1Ref, card2Ref, card3Ref, card4Ref, history1Ref] = useScrollAnimation(5)
</script>

<template>
  <div class="min-h-screen pt-16 bg-black text-white text-sm leading-relaxed">
    <!-- CCF 大赛浮动入口 -->
    <router-link
      v-if="!isEnglish"
      :to="CCF_COMPETITION_PATH"
      class="absolute right-0 top-[88px] z-[1000] block cursor-pointer md:right-[-15px] md:top-20 md:transition-transform md:duration-300 md:ease-in md:hover:-translate-x-[15px]"
    >
      <img
        :src="CcfLogo"
        alt="CCF 大赛"
        class="w-[120px] md:w-[198px] h-auto pointer-events-none select-none"
      />
    </router-link>

    <section class="activity-ledger" aria-labelledby="active-activities-title">
      <h2 id="active-activities-title" class="activity-section-title">
        {{ t('operation.activeTitle') }}
      </h2>

      <div class="activity-list">
        <AugustDeveloperMonthEntry data-activity-row data-activity-status="active" />

        <article
          ref="card1Ref"
          class="scroll-animation-wrapper activity-row"
          data-activity-row
          data-activity-status="active"
        >
          <span class="activity-index">02</span>
          <div class="activity-main">
            <div class="activity-title-line">
              <h3>{{ t('operation.card1Title') }}</h3>
              <span class="activity-value">{{ t('operation.card1Credits') }}</span>
            </div>
            <p>{{ t('operation.card1Desc') }}</p>
          </div>
          <a :href="CARD1_URL" class="activity-link" target="_blank" rel="noopener">
            {{ t('operation.card1Btn') }}<span aria-hidden="true">→</span>
          </a>
        </article>

        <article
          ref="card2Ref"
          class="scroll-animation-wrapper activity-row"
          data-activity-row
          data-activity-status="active"
        >
          <span class="activity-index">03</span>
          <div class="activity-main">
            <div class="activity-title-line">
              <h3>{{ t('operation.card2Title') }}</h3>
              <span class="activity-value">{{ t('operation.card2Credits') }}</span>
            </div>
            <p>{{ t('operation.card2Desc') }}</p>
            <div class="activity-invite-details">
              <div class="invite-steps">
                <div v-for="step in inviteSteps" :key="step.index" class="invite-step">
                  <span>{{ step.index }}</span>
                  <p>{{ step.label }}</p>
                </div>
              </div>
              <ul class="activity-rules">
                <li v-for="rule in card2Rules" :key="rule">{{ rule }}</li>
              </ul>
            </div>
          </div>
          <a :href="CARD2_URL" class="activity-link" target="_blank" rel="noopener">
            {{ t('operation.card2Btn') }}<span aria-hidden="true">→</span>
          </a>
        </article>

        <article
          ref="card3Ref"
          class="scroll-animation-wrapper activity-row activity-row--contribution"
          data-activity-row
          data-activity-status="active"
        >
          <span class="activity-index">04</span>
          <div class="activity-main">
            <div class="activity-title-line">
              <h3>{{ t('operation.card3Title') }}</h3>
            </div>
            <p>{{ t('operation.card3Desc') }}</p>
            <table class="contribution-table">
              <thead>
                <tr>
                  <th scope="col">{{ t('operation.tableColAction') }}</th>
                  <th scope="col">{{ t('operation.tableColReward') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in contribRows" :key="row.action">
                  <td>{{ row.action }}</td>
                  <td>{{ row.credits }}</td>
                </tr>
              </tbody>
            </table>
            <p class="activity-note">{{ t('operation.contribNote') }}</p>
          </div>
          <a :href="CARD3_URL" class="activity-link" target="_blank" rel="noopener">
            {{ t('operation.card3Btn') }}<span aria-hidden="true">→</span>
          </a>
        </article>

        <article
          ref="card4Ref"
          class="scroll-animation-wrapper activity-row"
          data-activity-row
          data-activity-status="active"
        >
          <span class="activity-index">05</span>
          <div class="activity-main">
            <div class="activity-title-line">
              <h3>{{ t('operation.card4Title') }}</h3>
            </div>
            <p>{{ t('operation.card4Desc') }}</p>
          </div>
          <router-link :to="CCF_COMPETITION_PATH" class="activity-link">
            {{ t('operation.card4Btn') }}<span aria-hidden="true">→</span>
          </router-link>
        </article>
      </div>
    </section>

    <section class="activity-ledger activity-ledger--history" aria-labelledby="history-title">
      <h2 id="history-title" class="activity-section-title">
        {{ t('operation.historyTitle') }}
      </h2>
      <div class="activity-list">
        <article
          ref="history1Ref"
          class="scroll-animation-wrapper activity-row activity-row--ended"
          data-activity-row
          data-activity-status="ended"
        >
          <span class="activity-index">01</span>
          <div class="activity-main">
            <div class="activity-title-line">
              <h3>{{ t('operation.history1Title') }}</h3>
              <span class="activity-status">{{ t('operation.history1Badge') }}</span>
            </div>
            <p>{{ t('operation.history1Desc') }}</p>
          </div>
          <a :href="HISTORY1_URL" class="activity-link" target="_blank" rel="noopener">
            {{ t('operation.history1Btn') }}<span aria-hidden="true">→</span>
          </a>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.activity-ledger {
  width: min(1120px, calc(100% - 48px));
  margin: 0 auto;
  padding-top: 16px;
}

.activity-ledger--history {
  padding-top: 52px;
  padding-bottom: 80px;
}

.activity-section-title {
  margin: 0;
  padding: 0 40px 20px;
  color: rgba(255, 255, 255, 0.68);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0;
}

.activity-list {
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}

.activity-row {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
  padding: 30px 40px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
}

.activity-ledger:not(.activity-ledger--history) .activity-row:last-child {
  border-bottom: 0;
}

.activity-index {
  padding-top: 4px;
  color: rgba(98, 157, 239, 0.72);
  font-size: 10px;
  font-weight: 700;
  line-height: 1.4;
}

.activity-main {
  min-width: 0;
  max-width: 760px;
}

.activity-row--contribution .activity-main {
  grid-column: 2 / -1;
  max-width: none;
}

.activity-row--contribution .activity-title-line,
.activity-row--contribution .activity-main > p {
  max-width: 760px;
}

.activity-row--contribution > .activity-link {
  z-index: 1;
  grid-row: 1;
  grid-column: 3;
  justify-self: end;
}

.activity-title-line {
  display: flex;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
}

.activity-title-line h3 {
  margin: 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: 19px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0;
}

.activity-value,
.activity-status {
  color: rgba(118, 221, 199, 0.78);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
}

.activity-main > p {
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.58);
  font-size: 14px;
  line-height: 1.75;
}

.activity-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding-top: 3px;
  color: rgba(132, 193, 255, 0.88);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.6;
  text-decoration: none;
  white-space: nowrap;
  transition: color 180ms ease;
}

.activity-link span {
  transition: transform 180ms ease;
}

.activity-link:hover {
  color: #76edd8;
}

.activity-link:hover span {
  transform: translateX(3px);
}

.activity-invite-details {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.065);
}

.invite-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.invite-step {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: baseline;
  gap: 8px;
}

.invite-step > span {
  color: rgba(98, 157, 239, 0.68);
  font-size: 9px;
  font-weight: 700;
}

.invite-step > p {
  margin: 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 12px;
  line-height: 1.6;
}

.activity-rules {
  display: grid;
  gap: 7px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}

.activity-rules li {
  position: relative;
  padding-left: 16px;
  color: rgba(255, 255, 255, 0.52);
  font-size: 12px;
  line-height: 1.65;
}

.activity-rules li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: rgba(255, 255, 255, 0.26);
}

.contribution-table {
  width: 100%;
  margin-top: 22px;
  border-collapse: collapse;
  table-layout: fixed;
}

.contribution-table th,
.contribution-table td {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.065);
  font-size: 12px;
  line-height: 1.55;
  text-align: left;
}

.contribution-table th {
  color: rgba(255, 255, 255, 0.38);
  font-size: 10px;
  font-weight: 600;
}

.contribution-table td {
  color: rgba(255, 255, 255, 0.64);
}

.contribution-table th:last-child,
.contribution-table td:last-child {
  width: 160px;
  text-align: right;
}

.activity-main > .activity-note {
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.38);
  font-size: 11px;
}

.activity-row--ended .activity-index,
.activity-row--ended .activity-title-line h3,
.activity-row--ended .activity-main > p {
  color: rgba(255, 255, 255, 0.54);
}

.activity-row--ended .activity-status {
  color: rgba(255, 255, 255, 0.66);
}

.activity-row--ended .activity-link {
  color: rgba(132, 193, 255, 0.7);
}

.activity-row--ended .activity-link:hover {
  color: #76edd8;
}

@media (max-width: 820px) {
  .activity-ledger {
    width: calc(100% - 28px);
    padding-top: 44px;
  }

  .activity-ledger--history {
    padding-top: 40px;
    padding-bottom: 64px;
  }

  .activity-section-title {
    padding: 0 22px 18px;
  }

  .activity-row {
    grid-template-columns: 32px minmax(0, 1fr);
    gap: 16px;
    padding: 26px 22px 28px;
  }

  .activity-link {
    grid-column: 2;
    margin-top: 2px;
  }

  .activity-row--contribution .activity-main,
  .activity-row--contribution > .activity-link {
    grid-column: 2;
  }

  .activity-row--contribution > .activity-link {
    grid-row: auto;
    justify-self: start;
  }

  .invite-steps {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .activity-title-line {
    gap: 8px 12px;
  }

  .activity-title-line h3 {
    font-size: 17px;
  }

  .contribution-table th:last-child,
  .contribution-table td:last-child {
    width: 110px;
  }
}
</style>
