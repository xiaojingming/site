<template>
  <section class="cloud-faq" aria-labelledby="faq-title">
    <div class="content">
      <!-- 标题区 -->
      <div class="heading">
        <div>
          <div class="kicker">{{ t('cloud.faq.kicker') }}</div>
          <h1 id="faq-title">{{ t('cloud.faq.title') }}</h1>
        </div>
        <a class="manual-link" href="#" @click.prevent>
          {{ t('cloud.faq.manualLink') }}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </a>
      </div>

      <!-- 主体布局：FAQ 列表 + 快速排查侧栏 -->
      <div class="layout">
        <div class="faq-list">
          <article
            v-for="(item, idx) in faqItems"
            :key="idx"
            class="faq-item"
            :class="{ open: openIndex === idx }"
          >
            <button class="faq-q" type="button" @click="toggle(idx)">
              <span class="faq-icon" aria-hidden="true" v-html="item.icon" />
              <span>
                <span class="faq-title">{{ item.title }}</span>
                <span class="faq-summary">{{ item.summary }}</span>
              </span>
              <span class="plus" aria-hidden="true"></span>
            </button>
            <div class="faq-a" v-html="item.answer" />
          </article>
        </div>

        <aside class="diagnose" aria-label="快速排查">
          <div class="diagnose-inner">
            <div class="diagnose-top">
              <span class="pulse" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M7 7h10" />
                  <path d="M7 12h6" />
                  <path d="M7 17h8" />
                  <rect x="3.5" y="4" width="17" height="16" rx="3" />
                </svg>
              </span>
              <h2>{{ t('cloud.faq.diagnoseTitle') }}</h2>
            </div>
            <p>{{ t('cloud.faq.diagnoseDesc') }}</p>

            <div class="steps">
              <div v-for="step in diagnoseSteps" :key="step.num" class="step">
                <div class="num">{{ step.num }}</div>
                <div>
                  <strong>{{ step.title }}</strong>
                  <span v-html="step.desc" />
                </div>
              </div>
            </div>

            <div class="log-card">
              <b>{{ t('cloud.faq.logPathLabel') }}</b>
              <code>~/.costrict/cs-cloud/app.log</code>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  defineOptions({
    name: 'CloudFAQ',
  })

  const { t } = useI18n()

  /** FAQ 图标 SVG（语言无关，无需 i18n） */
  const faqIcons: string[] = [
    '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M8 20h8" /><path d="M12 16v4" /></svg>',
    '<svg viewBox="0 0 24 24"><path d="M12 3v10" /><path d="m8 9 4 4 4-4" /><path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" /></svg>',
    '<svg viewBox="0 0 24 24"><path d="M9 7h6" /><path d="M7 12h10" /><path d="M9 17h6" /><rect x="4" y="4" width="16" height="16" rx="3" /></svg>',
    '<svg viewBox="0 0 24 24"><path d="M7 8h10" /><path d="M7 12h6" /><path d="M7 16h8" /><path d="M5 3h10l4 4v14H5z" /><path d="M15 3v4h4" /></svg>',
  ]

  /** FAQ 条目：标题/摘要/答案从 i18n 取，icon 用静态数组 */
  const faqItems = computed(() =>
    faqIcons.map((icon, i) => ({
      icon,
      title: t(`cloud.faq.items.${i}.title`),
      summary: t(`cloud.faq.items.${i}.summary`),
      answer: t(`cloud.faq.items.${i}.answer`),
    })),
  )

  /** 快速排查步骤：编号 + i18n 标题/描述 */
  const diagnoseSteps = computed(() =>
    [0, 1, 2].map((i) => ({
      num: String(i + 1).padStart(2, '0'),
      title: t(`cloud.faq.steps.${i}.title`),
      desc: t(`cloud.faq.steps.${i}.desc`),
    })),
  )

  /** 当前展开的 FAQ 索引，-1 表示全部收起；默认展开第一项 */
  const openIndex = ref(0)

  const toggle = (idx: number) => {
    openIndex.value = openIndex.value === idx ? -1 : idx
  }
</script>

<style scoped lang="less">
.cloud-faq {
  /* 暗色主题变量（从原始 HTML :root 提取，加 --faq- 前缀避免冲突） */
  --faq-section: #0a1521;
  --faq-panel: #0d1825;
  --faq-line: rgba(144, 169, 203, 0.18);
  --faq-line-strong: rgba(45, 140, 255, 0.48);
  --faq-text: #f1f7ff;
  --faq-muted: #98a9bd;
  --faq-weak: #74859a;
  --faq-blue: #2d8cff;
  --faq-cyan: #39dbc5;
  --faq-green: #44d69a;
  --faq-radius: 8px;

  box-sizing: border-box;
  width: 100%;
  /* 外框：背景纯色 + 描边，按设计要求调整 */
  border: 1px solid #293344;
  border-radius: 16px;
  background: #070b11;
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.34);
  padding: 56px;
  overflow: hidden;
  position: relative;
  color: var(--faq-text);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
  }

  * {
    box-sizing: border-box;
  }

  button {
    font: inherit;
    color: inherit;
  }
}

.content {
  position: relative;
  z-index: 1;
}

/* ============ 标题区 ============ */
.heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 28px;
  align-items: center;
  margin-bottom: 34px;
}

.kicker {
  margin-bottom: 18px;
  color: var(--faq-cyan);
  font-size: 14px;
  font-weight: 650;
}

.cloud-faq h1 {
  margin: 0;
  font-size: 24px;
  line-height: 1.18;
  letter-spacing: 0;
  word-break: break-word;
}

.lead {
  margin: 14px 0 0;
  width: min(740px, 100%);
  color: var(--faq-muted);
  font-size: 16px;
  line-height: 1.75;
  word-break: break-word;
}

.manual-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 42px;
  padding: 0 15px;
  border-radius: var(--faq-radius);
  border: 1px solid rgba(144, 169, 203, 0.22);
  color: #d9e9fb;
  background: rgba(255, 255, 255, 0.035);
  text-decoration: none;
  white-space: nowrap;
  font-size: 14px;
  cursor: pointer;
  transform: translateY(21px);
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: rgba(45, 140, 255, 0.44);
    background: rgba(45, 140, 255, 0.08);
  }

  svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
    stroke-width: 1.8;
    fill: none;
  }
}

/* ============ 主体布局 ============ */
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1.16fr) minmax(330px, 0.84fr);
  gap: 24px;
}

/* ============ FAQ 列表 ============ */
.faq-list {
  display: grid;
  gap: 12px;
  padding: 12px;
  border: 1px solid rgba(144, 169, 203, 0.14);
  border-radius: 14px;
  background: rgba(5, 12, 21, 0.28);
}

.faq-item {
  border: 1px solid var(--faq-line);
  border-radius: var(--faq-radius);
  background: rgba(15, 28, 42, 0.72);
  overflow: hidden;
  transition: border-color 0.2s ease, background 0.2s ease;

  &.open {
    border-color: rgba(45, 140, 255, 0.44);
    background: rgba(17, 33, 51, 0.86);
  }
}

.faq-q {
  width: 100%;
  border: 0;
  background: transparent;
  display: grid;
  grid-template-columns: 34px 1fr 24px;
  gap: 14px;
  align-items: center;
  padding: 19px 20px;
  cursor: pointer;
  text-align: left;
}

.faq-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid rgba(45, 140, 255, 0.34);
  background: rgba(45, 140, 255, 0.1);
  display: grid;
  place-items: center;
  color: #89bdff;

  :deep(svg) {
    width: 19px;
    height: 19px;
    stroke: currentColor;
    stroke-width: 1.85;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}

.faq-title {
  display: block;
  font-size: 16px;
  font-weight: 760;
  color: var(--faq-text);
  letter-spacing: 0;
  word-break: break-word;
}

.faq-summary {
  display: block;
  margin-top: 5px;
  color: var(--faq-weak);
  font-size: 13px;
  line-height: 1.5;
}

.plus {
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid rgba(144, 169, 203, 0.25);
  color: #a9b9ce;
  flex-shrink: 0;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  /* 用伪元素绘制十字，避免文字 + 的基线偏移导致视觉不居中 */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 1.5px;
    border-radius: 1px;
    background: currentColor;
    transform: translate(-50%, -50%);
  }

  &::after {
    width: 1.5px;
    height: 8px;
  }
}

.faq-item.open .plus {
  transform: rotate(45deg);
  border-color: rgba(57, 219, 197, 0.42);
  color: var(--faq-cyan);
}

.faq-a {
  display: none;
  padding: 0 20px 22px 68px;
  color: var(--faq-muted);
  font-size: 14px;
  line-height: 1.75;
}

.faq-item.open .faq-a {
  display: block;
}

.cloud-faq code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
  color: #d8ecff;
  background: rgba(91, 132, 189, 0.15);
  border: 1px solid rgba(144, 169, 203, 0.2);
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 0.92em;
  white-space: nowrap;
}

/* ============ 快速排查侧栏 ============ */
.diagnose {
  border: 1px solid var(--faq-line-strong);
  border-radius: 14px;
  background:
    linear-gradient(180deg, rgba(45, 140, 255, 0.18), rgba(13, 24, 37, 0.88)),
    var(--faq-panel);
  min-height: 100%;
  padding: 28px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: auto -40px -70px auto;
    width: 190px;
    height: 190px;
    border-radius: 50%;
    background: rgba(57, 219, 197, 0.12);
    filter: blur(34px);
  }
}

.diagnose-inner {
  position: relative;
  z-index: 1;
}

.diagnose-top {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.pulse {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: #b7e8ff;
  background: rgba(45, 140, 255, 0.17);
  border: 1px solid rgba(45, 140, 255, 0.4);

  svg {
    width: 23px;
    height: 23px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.9;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}

.cloud-faq .diagnose h2 {
  margin: 0;
  font-size: 25px;
  line-height: 1.25;
}

.cloud-faq .diagnose p {
  margin: 0;
  color: var(--faq-muted);
  line-height: 1.68;
  font-size: 14px;
}

.steps {
  display: grid;
  gap: 12px;
  margin-top: 24px;
}

.step {
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 13px;
  align-items: start;
  padding: 15px;
  border: 1px solid rgba(144, 169, 203, 0.15);
  background: rgba(5, 12, 21, 0.38);
  border-radius: var(--faq-radius);

  strong {
    display: block;
    margin-bottom: 5px;
    color: #f3f8ff;
    font-size: 14px;
  }

  span {
    display: block;
    color: var(--faq-muted);
    font-size: 13px;
    line-height: 1.55;
  }
}

.num {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: #9dc7ff;
  background: rgba(45, 140, 255, 0.14);
  font-size: 13px;
  font-weight: 800;
}

.log-card {
  margin-top: 20px;
  padding: 16px;
  border: 1px solid rgba(57, 219, 197, 0.2);
  border-radius: var(--faq-radius);
  background: rgba(57, 219, 197, 0.06);

  b {
    display: block;
    margin-bottom: 8px;
    color: #bdf7ec;
    font-size: 14px;
  }
}

/* ============ 响应式 ============ */
@media (max-width: 900px) {
  .cloud-faq {
    padding: 28px;
  }

  .heading,
  .layout {
    grid-template-columns: 1fr;
  }

  .manual-link {
    justify-self: start;
  }

  .faq-q {
    grid-template-columns: 32px 1fr 24px;
    padding: 17px;
  }

  .faq-a {
    padding-left: 63px;
  }
}

@media (max-width: 480px) {
  .cloud-faq {
    padding: 20px;
  }

  .cloud-faq h1 {
    font-size: 24px;
  }

  .faq-q {
    grid-template-columns: 28px 1fr 22px;
    gap: 10px;
    padding: 14px;
  }

  .faq-icon {
    width: 28px;
    height: 28px;
  }

  .faq-a {
    padding-left: 52px;
    padding-right: 14px;
  }
}
</style>
