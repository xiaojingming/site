<template>
  <div class="resource-calculator pt-17">
    <n-layout class="min-h-screen" style="padding: 20px">
      <div class="calculator-container">
        <div class="single-column-container">
          <!-- 参数设置 -->
          <div class="parameter-section">
            <ParameterSettings v-model="formData" />
          </div>

          <!-- 资源需求预估结果 -->
          <div class="result-section">
            <ResourceResult
              :form-data="formData"
              :results="results"
              :total-resources="totalResources"
              :get-gpu-cost-breakdown="calculateGpuCostsAndBreakdown"
            />
          </div>
        </div>

        <!-- 模型对比表 -->
        <ModelTable :version="formData.versionMode" :deployment="formData.deploymentMode" />

        <!-- AICP服务模块 -->
        <div v-if="showAicpModule" class="aicp-section">
          <n-card title="AICP服务" :bordered="true" size="small">
            <AicpServices />
          </n-card>
        </div>
      </div>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch, computed } from 'vue'
import { NLayout, NCard } from 'naive-ui'
import type { FormData } from './types'
import { useResourceCalculator } from './hooks/useResourceCalculator'
import ModelTable from './components/ModelTable.vue'
import ParameterSettings from './components/ParameterSettings.vue'
import ResourceResult from './components/ResourceResult.vue'
import AicpServices from './components/AicpServices.vue'
import { VERSION_CONFIG } from './constants'

// 定义组件名
defineOptions({
  name: 'ResourceCalculator',
})

useHead({
  title: 'CoStrict 资源计算器 - 私有化部署资源评估工具',
  meta: [
    {
      name: 'description',
      content:
        '使用 CoStrict 资源计算器，快速评估企业私有化部署所需的服务器资源配置，为 AI 编程工具部署提供精准的资源规划建议。',
    },
    { property: 'og:title', content: 'CoStrict 资源计算器 - 私有化部署资源评估工具' },
    {
      property: 'og:description',
      content:
        '使用 CoStrict 资源计算器，快速评估企业私有化部署所需的服务器资源配置，为 AI 编程工具部署提供精准的资源规划建议。',
    },
    { property: 'og:url', content: 'https://costrict.ai/resource' },
    { name: 'twitter:title', content: 'CoStrict 资源计算器 - 私有化部署资源评估工具' },
    {
      name: 'twitter:description',
      content: '使用 CoStrict 资源计算器，快速评估企业私有化部署所需的服务器资源配置。',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://costrict.ai/resource' }],
})

// 使用资源计算器 hooks
const { results, totalResources, calculateResources, calculateGpuCostsAndBreakdown } =
  useResourceCalculator()

// 获取路由实例
const route = useRoute()

// 检测URL参数是否包含type=Aicp
const showAicpModule = computed(() => /aicp/i.test(route.query.type as string))

// localStorage存储键名
const STORAGE_KEY = 'resource_calculator_form_data'

// 保存表单数据到localStorage
const saveFormDataToStorage = (data: FormData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('保存表单数据到localStorage失败:', error)
  }
}

// 从localStorage恢复表单数据
// const loadFormDataFromStorage = (): Partial<FormData> | null => {
//   try {
//     const stored = localStorage.getItem(STORAGE_KEY)
//     if (stored) {
//       return JSON.parse(stored)
//     }
//   } catch (error) {
//     console.error('从localStorage恢复表单数据失败:', error)
//   }
//   return null
// }

// 默认表单数据
const defaultFormData: FormData = {
  developerCount: 1000,
  vscodeActiveRatio: 35,
  vscodeActiveUsers: 350,
  concurrentDeveloperCount: 117,
  concurrentCoefficient: 60, // 默认并发系数
  enableCodeCompletion: true,
  selectedCompletionModel: 'DeepSeek-Coder-V2-Lite-Base',
  enableAIAgent: true,
  selectedAIModels: {
    'GLM-4.5-FP8': true, // 默认选择标准版AI Agent模型
  },
  modelRatios: {
    'GLM-4.5-FP8': 100, // 默认标准版AI Agent模型比例为100%
  },
  enableCodeReview: true,
  selectedCodeReviewModel: 'Qwen3-Coder-30B-A3B',
  enableRAG: true,
  selectedRAGEmbeddingModel: 'gte-modernbert-base',
  selectedRAGRerankModel: 'gte-reranker-modernbert-base',
  presetMode: 'standard',
  versionMode: 'standard', // 默认使用标准版
  deploymentMode: 'custom', // 默认使用自定义安装
}

// 表单数据 - 初始化为空，等待从localStorage恢复
const formData = reactive<FormData>({ ...defaultFormData })

// 初始化
onMounted(() => {
  // 从localStorage恢复表单数据
  // const storedData = loadFormDataFromStorage()
  // if (storedData) {
  //   // 清空当前formData
  //   Object.keys(formData).forEach(key => {
  //     delete formData[key as keyof FormData]
  //   })
  //   // 恢复存储的数据
  //   Object.assign(formData, storedData)
  // } else {
  //   // 如果没有存储的数据，使用默认值
  Object.assign(formData, defaultFormData)
  // }

  // 确保版本模式有值
  if (!formData.versionMode) {
    formData.versionMode = 'standard'
  }

  // 确保部署方式有值
  if (!formData.deploymentMode) {
    formData.deploymentMode = 'custom'
  }

  // 确保所有必要字段都有值
  if (!formData.concurrentDeveloperCount || formData.concurrentDeveloperCount === 0) {
    formData.concurrentDeveloperCount = 60
  }

  // 确保所有功能模块都启用
  formData.enableCodeCompletion = true
  formData.enableAIAgent = true
  formData.enableCodeReview = true
  formData.enableRAG = true

  // 确保AI Agent模型有选择
  if (!formData.selectedAIModels || Object.keys(formData.selectedAIModels).length === 0) {
    formData.selectedAIModels = {
      'GLM-4.5-FP8': true,
    }
    formData.modelRatios = {
      'GLM-4.5-FP8': 100,
    }
  }

  // 手动设置版本配置，确保模型选择正确
  const versionConfig = VERSION_CONFIG[formData.versionMode]
  if (versionConfig) {
    // 更新模型选择为当前版本的默认模型
    formData.selectedCompletionModel = versionConfig.models.completion
    formData.selectedCodeReviewModel = versionConfig.models.codeReview
    formData.selectedRAGEmbeddingModel = versionConfig.models.rag.embedding
    formData.selectedRAGRerankModel = versionConfig.models.rag.rerank

    // 更新AI Agent模型选择
    formData.selectedAIModels = {}
    formData.modelRatios = {}
    formData.selectedAIModels[versionConfig.models.aiAgent] = true
    formData.modelRatios[versionConfig.models.aiAgent] = 100

    // 确保所有功能模块都启用
    formData.enableCodeCompletion = true
    formData.enableAIAgent = true
    formData.enableCodeReview = true
    formData.enableRAG = true
  }

  // 手动触发一次资源计算
  calculateResources(formData)
})

// 监听表单数据变化，触发资源计算并保存到localStorage
watch(
  () => formData,
  (value) => {
    calculateResources(value)
    // 保存表单数据到localStorage
    saveFormDataToStorage(value)
  },
  { immediate: false, deep: true }, // 移除immediate: true，避免在初始化时保存默认值
)
</script>

<style scoped>
.resource-calculator {
  background-color: #fff;
  /* min-height: 100vh; */
  height: 100%;
}

.calculator-container {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 20px;
  box-sizing: border-box;
}

.single-column-container {
  display: flex;
  flex-direction: row;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  align-items: stretch;
  /* 确保两个区域高度一致 */
  margin-right: 24px;
}

/* 左右布局下的参数设置区域 */
.parameter-section {
  flex: 0 0 45%;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  /* 添加垂直滚动 */
  max-height: calc(100vh - 160px);
  /* 设置最大高度，减去页面其他部分的高度 */
}

/* 左右布局下的结果区域 */
.result-section {
  flex: 0 0 55%;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  /* 添加垂直滚动 */
  max-height: calc(100vh - 160px);
  /* 高度与参数设置区域保持一致 */
}

/* 响应式布局：在小屏幕下恢复为垂直布局 */
@media (max-width: 1024px) {
  .single-column-container {
    flex-direction: column;
    align-items: stretch;
  }

  .parameter-section,
  .result-section {
    flex: 1;
    max-height: 70vh;
    /* 在小屏幕下限制最大高度 */
    overflow-y: auto;
  }
}

/* 自定义滚动条样式 */
.parameter-section::-webkit-scrollbar,
.result-section::-webkit-scrollbar {
  width: 6px;
}

.parameter-section::-webkit-scrollbar-track,
.result-section::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.parameter-section::-webkit-scrollbar-thumb,
.result-section::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.parameter-section::-webkit-scrollbar-thumb:hover,
.result-section::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* AICP服务模块样式 */
.aicp-section {
  margin-top: 24px;
}
</style>
