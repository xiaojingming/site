<template>
  <n-card title="资源需求预估结果" :bordered="true" size="small">
    <!-- 总资源需求 -->
    <div class="total-resources-section mb-6">
      <n-grid x-gap="12" :cols="2">
        <!-- GPU服务器需求 -->
        <n-grid-item>
          <n-card size="small" :bordered="true" class="resource-card" title="GPU服务器需求">
            <div class="resource-content">
              <div v-if="Object.keys(totalResources.gpuServers).length > 0">
                <div v-for="(config, gpuType) in totalResources.gpuServers" :key="gpuType" class="mb-2">
                  <div v-for="(count, cardConfig) in config.servers" :key="cardConfig" class="text-sm">
                    {{ count }} 台 {{ gpuType }} 服务器<br />（每台配 {{ cardConfig }}）
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    显存总量: {{ config.totalVram }} GB
                  </div>
                </div>
              </div>
              <div v-else class="text-gray-500 text-sm">暂无GPU服务器需求</div>
            </div>
          </n-card>
        </n-grid-item>

        <!-- 后台CPU服务器需求 -->
        <n-grid-item>
          <n-card size="small" :bordered="true" class="resource-card" title="后台服务器需求（可与GPU服务器共享）">
            <div class="resource-content">
              <div class="text-sm">
                CPU {{ totalResources.cpuCores }} 核<br />
                内存 {{ totalResources.memory }} GB<br />
                磁盘 {{ totalResources.disk }} TB
              </div>
            </div>
          </n-card>
        </n-grid-item>

      </n-grid>
    </div>

    <!-- GPU预估成本单独一行展示 -->
    <div class="gpu-cost-section mb-6">
      <n-card size="small" :bordered="true" class="resource-card"
        :class="{ 'placeholder-card': totalResources.gpuCosts === 0 }" title="GPU预估成本">
        <div class="resource-content">
          <div v-if="totalResources.gpuCosts > 0" class="gpu-cost-container">
            <div class="text-lg font-bold" style="color: #722ed1">
              ¥{{ updatedGpuCosts.toLocaleString() }}
            </div>
          </div>
          <div v-else class="text-sm text-gray-500">无GPU硬件需求</div>
        </div>

        <!-- GPU预估成本构成明细单独展示 -->
        <div v-if="totalResources.gpuCosts > 0" class="gpu-cost-breakdown-section">
          <n-divider />
          <div class="gpu-cost-breakdown-title">成本构成明细</div>
          <GpuCostBreakdown :cost-breakdown="gpuCostBreakdown" :unit-prices="updatedUnitPrices"
            @update:unitPrice="handleUnitPriceUpdate" />
        </div>
      </n-card>
    </div>

  </n-card>
</template>

<script lang="ts" setup>
import {
  NCard,
  NDivider,
  NGrid,
  NGridItem,
} from 'naive-ui'
import type { FormData, Results, TotalResources } from '../types'
import GpuCostBreakdown from './GpuCostBreakdown.vue'
import { watch, ref, computed } from 'vue'

defineOptions({
  name: 'ResourceResult',
})
const props = defineProps<{
  formData: FormData
  results: Results
  totalResources: TotalResources
  getGpuCostBreakdown: () => Array<{
    gpuType: string
    servers: Record<string, number>
    totalCards: number
    cost: number
    costPerServer: Record<string, number>
  }>
  defaultExpanded?: boolean
}>()

// 存储更新后的单价数据
const updatedUnitPrices = ref<Record<string, Record<string, number>>>({})

// 处理单价更新事件
const handleUnitPriceUpdate = (gpuType: string, cardConfig: string, value: number) => {
  if (!updatedUnitPrices.value[gpuType]) {
    updatedUnitPrices.value[gpuType] = {}
  }
  updatedUnitPrices.value[gpuType][cardConfig] = value
}

// 计算更新后的GPU总成本
const updatedGpuCosts = computed(() => {
  let total = 0

  // 遍历所有GPU服务器配置
  Object.entries(props.totalResources.gpuServers).forEach(([gpuType, config]) => {
    Object.entries(config.servers).forEach(([cardConfig, count]) => {
      // 获取更新后的单价，如果没有更新则使用原始单价
      const unitPrice = updatedUnitPrices.value[gpuType]?.[cardConfig] ||
        gpuCostBreakdown.value.find(b => b.gpuType === gpuType)?.costPerServer[cardConfig] || 0
      total += unitPrice * count
    })
  })

  return total
})

const gpuCostBreakdown = ref<
  Array<{
    gpuType: string
    servers: Record<string, number>
    totalCards: number
    cost: number
    costPerServer: Record<string, number>
  }>
>([])
watch(
  () => props.formData,
  () => {
    gpuCostBreakdown.value = props.getGpuCostBreakdown()
  },
  {
    immediate: true,
    deep: true,
  },
)


</script>
<style lang="less" scoped>
.resource-card {
  height: 100%;
  min-height: 120px;
  background: white;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;
}

.resource-card:hover {
  border-color: #1890ff;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
}

.resource-content {
  padding: 8px 0;
}

.placeholder-card {
  opacity: 0.6;
}

.text-gray-500 {
  color: #6b7280;
}

.mb-2 {
  margin-bottom: 8px;
}

.mb-6 {
  margin-bottom: 24px;
}

.ml-2 {
  margin-left: 8px;
}

.text-sm {
  font-size: 0.875rem;
}

.text-xs {
  font-size: 0.75rem;
}

.font-medium {
  font-weight: 500;
}

.text-lg {
  font-size: 1.125rem;
}

.gpu-cost-section {
  margin-bottom: 24px;
}

.gpu-cost-breakdown-section {
  margin-top: 16px;
}

.gpu-cost-breakdown-title {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
}

/* 固定模型信息样式 */
.fixed-model-info {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
}

.model-info-header {
  margin-bottom: 8px;
}

.model-info-title {
  font-weight: 600;
  font-size: 14px;
  color: #2c3e50;
}

.model-info-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.model-info-content .model-name {
  font-weight: 500;
  font-size: 14px;
  color: #1890ff;
  background: #e6f7ff;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #91d5ff;
}

.allocation-cards {
  font-weight: 500;
  font-size: 14px;
  color: #52c41a;
  background: #f6ffed;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #b7eb8f;
}

/* RAG模型内容样式 */
.rag-models-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rag-model-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rag-model-label {
  font-weight: 500;
  font-size: 14px;
  color: #666;
  min-width: 80px;
}

.rag-model-name {
  font-weight: 500;
  font-size: 14px;
  color: #1890ff;
  background: #e6f7ff;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #91d5ff;
}

/* 功能模块标题样式 */
.section-title {
  font-weight: 600;
  font-size: 14px;
  color: #2c3e50;
  margin-bottom: 8px;
  padding: 4px 0;
  border-bottom: 1px solid #e2e8f0;
}

.gpu-allocation-section {
  .n-collapse {
    .n-collapse-item {
      .n-collapse-item__header {
        font-weight: 600;
        font-size: 14px;
        color: #2c3e50;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 12px 16px;
        transition: all 0.3s ease;
        
        &:hover {
          border-color: #1890ff;
          box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
        }
      }
      
      .n-collapse-item__content {
        padding: 0;
        margin-top: 8px;
      }
      
      .n-collapse-item__content-inner {
        padding: 0;
      }
    }
  }
}
</style>

