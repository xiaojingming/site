<template>
  <div class="product-menu" @mouseenter="handleOpen" @mouseleave="handleClose">
    <button
      type="button"
      class="product-trigger"
      :class="{ 'is-open': isOpen }"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span class="trigger-text">{{ t('menu.product') }}</span>
      <svg
        class="trigger-arrow"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        aria-hidden="true"
      >
        <path
          d="M2 3.5L5 6.5L8 3.5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <transition name="pm-fade">
      <div v-show="isOpen" class="product-panel" role="menu">
        <a
          v-for="item in items"
          :key="item.key"
          class="product-item"
          href="#"
          role="menuitem"
          @click="onSelect(item, $event)"
        >
          <span class="icon-box">
            <span class="icon-glow" aria-hidden="true"></span>
            <!-- 显示器：Costrict Cloud -->
            <svg
              v-if="item.iconKey === 'cloud'"
              class="product-icon"
              viewBox="0 0 30 30"
              aria-hidden="true"
            >
              <rect x="9.15" y="9.9" width="12.65" height="8.7" rx="1.1" />
              <path d="M15.5 19.4V22.1" />
              <path d="M11.9 22.9H19" />
            </svg>
            <!-- 拼图：IDE 插件 -->
            <svg
              v-else-if="item.iconKey === 'ide'"
              class="product-icon"
              viewBox="0 0 30 30"
              aria-hidden="true"
            >
              <path
                d="M11.6234 10.2656H15.1799C15.1799 12.0439 17.5508 12.0439 17.5508 10.2656H21.4037V14.1184C19.6254 14.1184 19.6254 16.4894 21.4037 16.4894V20.935H16.9581C16.9581 19.1568 14.5871 19.1568 14.5871 20.935H9.5488V17.0822C11.3271 17.0822 11.3271 14.7112 9.5488 14.7112V10.2656H11.6234Z"
              />
            </svg>
            <!-- 代码括号 </>：CoStrict CLI -->
            <svg v-else class="product-icon" viewBox="0 0 30 30" aria-hidden="true">
              <path d="M11.1287 11.428L7.5723 15.775L11.1287 20.121" />
              <path d="M16.2658 11.428L14.6852 20.912" />
              <path d="M19.8223 11.428L23.3787 15.775L19.8223 20.121" />
            </svg>
          </span>

          <span class="item-text">
            <span class="item-title">{{ item.title }}</span>
            <span class="item-desc">{{ item.desc }}</span>
          </span>

          <span v-if="item.badge" class="item-badge">{{ item.badge }}</span>
        </a>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'ProductMenu',
})

type IconKey = 'cloud' | 'ide' | 'cli'

interface ProductItem {
  key: string
  iconKey: IconKey
  title: string
  desc: string
  badge?: string
  route: { name: string; hash?: string }
}

const router = useRouter()
const { t } = useI18n()

const isOpen = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | undefined

const items = computed<ProductItem[]>(() => [
  {
    key: 'cli',
    iconKey: 'cli',
    title: t('productMenu.cliTitle'),
    desc: t('productMenu.cliDesc'),
    route: { name: 'download' },
  },
  {
    key: 'ide',
    iconKey: 'ide',
    title: t('productMenu.ideTitle'),
    desc: t('productMenu.ideDesc'),
    route: { name: 'download' },
  },
  {
    key: 'cloud',
    iconKey: 'cloud',
    title: t('productMenu.cloudTitle'),
    desc: t('productMenu.cloudDesc'),
    badge: t('productMenu.new'),
    route: { name: 'cloud' },
  },
])

const clearCloseTimer = () => {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = undefined
  }
}

const handleOpen = () => {
  clearCloseTimer()
  isOpen.value = true
}

const handleClose = () => {
  clearCloseTimer()
  closeTimer = setTimeout(() => {
    isOpen.value = false
  }, 140)
}

const toggle = () => {
  isOpen.value = !isOpen.value
}

const onSelect = (item: ProductItem, event: MouseEvent) => {
  event.preventDefault()
  isOpen.value = false
  router.push(item.route)
}

onBeforeUnmount(() => {
  clearCloseTimer()
})
</script>

<style lang="less" scoped>
.product-menu {
  position: relative;
  display: inline-flex;
}

/* 触发器：与导航菜单项保持一致的视觉 */
.product-trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 0 var(--space-5);
  border: none;
  background: transparent;
  color: var(--color-text-link);
  cursor: pointer;
  white-space: nowrap;
  line-height: 1;
  transition: color var(--transition-fast);

  &:hover,
  &.is-open {
    color: var(--color-text-primary);
  }

  .trigger-arrow {
    transition: transform var(--transition-fast);
  }

  &.is-open .trigger-arrow {
    transform: rotate(180deg);
  }
}

/* 下拉面板：还原设计稿 245 宽，深色 #121416 + #3B3F46 描边 */
.product-panel {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: 245px;
  padding: 8px;
  border: 1px solid #3b3f46;
  border-radius: 10px;
  background: rgba(18, 20, 22, 0.98);
  backdrop-filter: blur(14px);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.55);
  z-index: 50;
}

.product-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 8px;
  border-radius: 7px;
  text-decoration: none;
  color: inherit;
  transition: background-color var(--transition-fast);

  &:hover {
    background: rgba(255, 255, 255, 0.045);
  }
}

/* 图标容器：30x30 圆角矩形，#16181C 填充 + #555A63 描边，图标居中对齐 */
.icon-box {
  position: relative;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(85, 90, 99, 0.7);
  border-radius: 6px;
  background: #16181c;
  /* 所有图标初始统一颜色 */
  color: #f5f7fa;
  transition:
    color 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;

  .icon-glow {
    position: absolute;
    inset: -7px;
    border-radius: 13px;
    background: radial-gradient(
      circle at 50% 55%,
      rgba(61, 114, 255, 0.34),
      rgba(17, 19, 24, 0) 68%
    );
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
  }
}

.product-icon {
  position: relative;
  z-index: 1;
  width: 25px;
  height: 25px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* hover：图标线框变暗蓝色 + 轻微发光 */
.product-item:hover .icon-box {
  color: #3d72ff;
  border-color: rgba(61, 114, 255, 0.65);
  box-shadow: 0 0 10px rgba(61, 114, 255, 0.45);

  .icon-glow {
    opacity: 1;
  }
}

.item-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  .item-title {
    color: #f5f7fa;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.25;
  }

  .item-desc {
    color: #969ca8;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.3;
  }
}

/* New 标签：渐变文字 */
.item-badge {
  margin-left: auto;
  padding: 2px 7px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  line-height: 1.4;
  background-image: linear-gradient(120deg, #1441f3, #e4f1e8 34%, #4ee783);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* 进出场过渡 */
.pm-fade-enter-active,
.pm-fade-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.pm-fade-enter-from,
.pm-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-6px);
}
</style>
