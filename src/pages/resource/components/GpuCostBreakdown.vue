<template>
  <div class="cost-breakdown">
    <div v-for="breakdown in costBreakdown" :key="breakdown.gpuType" class="breakdown-item">
      <div class="breakdown-header">
        {{ breakdown.gpuType }} GPU (共{{ breakdown.totalCards }}张)
      </div>
      <div class="breakdown-details">
        <div v-for="(count, cardConfig) in breakdown.servers" :key="cardConfig" class="breakdown-detail">
          <div class="detail-left">
            <div class="server-info">{{ count }}台 {{ cardConfig }}服务器</div>
            <div class="price-input-wrapper">
              <span class="price-label">单价:</span>
              <n-input-number :value="getUnitPrice(breakdown.gpuType, cardConfig)" :min="0" :precision="2" :step="1000"
                size="small" class="price-input" :show-button="false"
                @update:value="(value) => updateUnitPrice(breakdown.gpuType, cardConfig, value)">
                <template #suffix>
                  <n-icon class="reset-icon" size="14" @click="resetUnitPrice(breakdown.gpuType, cardConfig)">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                    </svg>
                  </n-icon>
                </template>
              </n-input-number>
              <span class="price-unit">元/台</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NInputNumber, NIcon } from 'naive-ui'
import { ref, watch } from 'vue'

defineOptions({
  name: 'GpuCostBreakdown',
})

interface CostBreakdown {
  gpuType: string
  servers: Record<string, number>
  totalCards: number
  cost: number
  costPerServer: Record<string, number>
}


// 监听costBreakdown变化，初始化单价数据
const props = defineProps<{
  costBreakdown: CostBreakdown[]
  unitPrices?: Record<string, Record<string, number>>
}>()

// 存储修改后的单价
const localUnitPrices = ref<Record<string, Record<string, number>>>({})

// 初始化单价数据
const initializeUnitPrices = (breakdown: CostBreakdown) => {
  if (!localUnitPrices.value[breakdown.gpuType]) {
    localUnitPrices.value[breakdown.gpuType] = {}
  }
  Object.entries(breakdown.costPerServer).forEach(([cardConfig, price]) => {
    // 优先使用外部传入的单价，如果没有则使用原始单价
    if (!localUnitPrices.value[breakdown.gpuType][cardConfig]) {
      localUnitPrices.value[breakdown.gpuType][cardConfig] =
        props.unitPrices?.[breakdown.gpuType]?.[cardConfig] || price
    }
  })
}

watch(
  () => props.costBreakdown,
  (newBreakdown) => {
    newBreakdown.forEach(initializeUnitPrices)
  },
  { immediate: true, deep: true }
)

// 监听外部传入的unitPrices变化
watch(
  () => props.unitPrices,
  (newUnitPrices) => {
    if (newUnitPrices) {
      Object.entries(newUnitPrices).forEach(([gpuType, prices]) => {
        if (!localUnitPrices.value[gpuType]) {
          localUnitPrices.value[gpuType] = {}
        }
        Object.entries(prices).forEach(([cardConfig, price]) => {
          localUnitPrices.value[gpuType][cardConfig] = price
        })
      })
    }
  },
  { immediate: true, deep: true }
)

// 获取单价
const getUnitPrice = (gpuType: string, cardConfig: string) => {
  return localUnitPrices.value[gpuType]?.[cardConfig] || 0
}

// 定义emit事件
const emit = defineEmits<{
  'update:unitPrice': [gpuType: string, cardConfig: string, value: number]
}>()

// 更新单价
const updateUnitPrice = (gpuType: string, cardConfig: string, value: number | null) => {
  if (!localUnitPrices.value[gpuType]) {
    localUnitPrices.value[gpuType] = {}
  }
  localUnitPrices.value[gpuType][cardConfig] = value || 0

  // 发出单价更新事件
  emit('update:unitPrice', gpuType, cardConfig, value || 0)
}

// 重置单价到原始值
const resetUnitPrice = (gpuType: string, cardConfig: string) => {
  const breakdown = props.costBreakdown.find(b => b.gpuType === gpuType)
  if (breakdown && breakdown.costPerServer[cardConfig]) {
    const originalPrice = breakdown.costPerServer[cardConfig]
    updateUnitPrice(gpuType, cardConfig, originalPrice)
  }
}

</script>

<style lang="less" scoped>
.cost-breakdown {
  width: 100%;
  padding: 0;
}

.breakdown-item {
  margin-bottom: 20px;
  background: #fafafa;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e8e8e8;
}

.breakdown-item:last-child {
  margin-bottom: 0;
}

.breakdown-header {
  font-size: 14px;
  font-weight: 600;
  color: #722ed1;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e8e8;
}

.breakdown-details {
  margin-bottom: 12px;
}

.breakdown-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #e8e8e8;
  transition: all 0.2s ease;
}

.breakdown-detail:hover {
  border-color: #722ed1;
  box-shadow: 0 2px 4px rgba(114, 46, 209, 0.1);
}

.breakdown-detail:last-child {
  margin-bottom: 0;
}

.detail-left {
  flex: 1;
}

.server-info {
  font-size: 13px;
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 8px;
}

.price-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.price-input {
  width: 180px;
}

.price-unit {
  font-size: 12px;
  color: #666;
}

.reset-icon {
  cursor: pointer;
  color: #999;
  transition: color 0.2s ease;
  margin-left: 4px;
}

.reset-icon:hover {
  color: #666;
}

.detail-right {
  min-width: 100px;
  text-align: right;
}

.total-price {
  font-size: 14px;
  color: #fa8c16;
  font-weight: 600;
}

.breakdown-subtotal {
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #722ed1;
  padding: 8px 12px;
  border-top: 1px solid #e8e8e8;
  background-color: #f9f0ff;
  border-radius: 6px;
}
</style>
