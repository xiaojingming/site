<template>
  <button
    type="button"
    class="flex h-[54px] min-w-[150px] cursor-pointer items-center rounded-full border border-[#00e3b5] bg-[#031a24] py-0 pl-[22px] pr-[76px] text-[16px] font-semibold text-white shadow-[0_0_18px_rgba(0,227,181,0.32)] transition-transform duration-300 hover:-translate-y-1 max-md:h-12 max-md:min-w-[128px] max-md:pl-4 max-md:pr-[58px] max-md:text-sm"
    @click="toSurvey"
  >
    <span class="whitespace-nowrap">{{ t('home.surveyGift.label') }}</span>
    <span
      class="absolute -right-[6px] top-1/2 flex size-[68px] -translate-y-1/2 items-center justify-center rounded-full border border-[#00e3b5]/80 bg-[radial-gradient(circle_at_52%_48%,#07334a_0%,#051f34_58%,#03111f_100%)] shadow-[0_0_28px_rgba(0,127,255,0.58)] max-md:size-[56px]"
      aria-hidden="true"
    >
      <svg
        class="size-[48px] max-md:size-10"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="surveyGiftStroke"
            x1="10"
            y1="7"
            x2="39"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0A77FF" />
            <stop offset="1" stop-color="#00FFB7" />
          </linearGradient>
          <filter
            id="surveyGiftGlow"
            x="0"
            y="0"
            width="48"
            height="48"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0.62 0 0 0 0 1 0 0 0 0.42 0"
            />
            <feBlend in2="SourceGraphic" mode="screen" />
          </filter>
        </defs>
        <g filter="url(#surveyGiftGlow)">
          <rect
            x="8"
            y="7"
            width="25"
            height="34"
            rx="3.5"
            stroke="url(#surveyGiftStroke)"
            stroke-width="1.9"
          />
          <path
            d="M16 6.5H25C26.1046 6.5 27 7.39543 27 8.5V10H14V8.5C14 7.39543 14.8954 6.5 16 6.5Z"
            stroke="url(#surveyGiftStroke)"
            stroke-width="1.8"
            stroke-linejoin="round"
          />
          <path
            d="M17 18H27"
            stroke="url(#surveyGiftStroke)"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <path
            d="M17 25H26"
            stroke="url(#surveyGiftStroke)"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <path
            d="M17 32H24"
            stroke="url(#surveyGiftStroke)"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <path
            d="M12 18.3L13.3 19.6L15.4 16.8"
            stroke="url(#surveyGiftStroke)"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 25.3L13.3 26.6L15.4 23.8"
            stroke="url(#surveyGiftStroke)"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <rect
            x="28"
            y="27"
            width="14"
            height="13"
            rx="1.8"
            fill="#05293A"
            stroke="url(#surveyGiftStroke)"
            stroke-width="1.8"
          />
          <path
            d="M27.5 31H42.5"
            stroke="url(#surveyGiftStroke)"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <path
            d="M35 27V40"
            stroke="url(#surveyGiftStroke)"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <path
            d="M34.5 27C32.1 24.1 28.5 24.2 28.4 26.3C28.3 28.5 32.4 28.3 34.5 27Z"
            stroke="url(#surveyGiftStroke)"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M35.5 27C37.9 24.1 41.5 24.2 41.6 26.3C41.7 28.5 37.6 28.3 35.5 27Z"
            stroke="url(#surveyGiftStroke)"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'SurveyGiftEntry',
})

const { t } = useI18n()

const SURVEY_URL = 'https://v.wjx.cn/vm/t7BdP0M.aspx'

const toSurvey = () => {
  window.open(SURVEY_URL)
}
</script>
