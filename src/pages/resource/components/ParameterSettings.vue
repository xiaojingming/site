<template>
  <n-card title="参数设置" :bordered="true" size="small">
    <n-form :model="formData" label-placement="top">
      <!-- 部署方式选择 -->
      <div class="deployment-mode-section mb-4 parameter-card">
        <n-form-item label="部署方式">
          <n-radio-group
            v-model:value="formData.deploymentMode"
            name="deploymentMode"
            @update:value="handleDeploymentChange"
          >
            <n-space>
              <n-radio value="custom">自定义安装</n-radio>
              <n-radio value="aicp">AICP</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <!-- 部署方式描述 -->
        <div class="deployment-description">
          <n-alert type="info" :show-icon="false">
            <div class="deployment-desc-content">
              <div class="deployment-desc-title">
                {{ DEPLOYMENT_CONFIG[formData.deploymentMode].name }}
              </div>
              <div class="deployment-desc-text">
                {{ DEPLOYMENT_CONFIG[formData.deploymentMode].description }}
              </div>
            </div>
          </n-alert>
        </div>
      </div>

      <!-- 版本选择 -->
      <div class="version-mode-section mb-4 parameter-card">
        <n-form-item label="版本选择">
          <n-radio-group
            v-model:value="formData.versionMode"
            name="versionMode"
            @update:value="handleVersionChange"
          >
            <n-space>
              <n-radio value="standard">标准版</n-radio>
              <n-radio value="basic">入门版</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <!-- 版本描述 -->
        <div class="version-description">
          <n-alert :type="formData.versionMode === 'basic' ? 'info' : 'success'" :show-icon="false">
            <div class="version-desc-content">
              <div class="version-desc-title">{{ VERSION_CONFIG[formData.versionMode].name }}</div>
              <div class="version-desc-text">
                {{ VERSION_CONFIG[formData.versionMode].description }}
              </div>
            </div>
          </n-alert>
        </div>
      </div>
      <!-- 基础参数配置区域 -->
      <n-card size="small" embedded class="mb-4 parameter-card" style="background: #f8fafc">
        <template #header>
          <div class="header-with-info">
            <span class="font-medium">基础参数与计算关系</span>
            <n-popover :width="500" trigger="hover" :show-arrow="false" placement="bottom">
              <template #trigger>
                <n-icon
                  size="16"
                  color="#1890ff"
                  style="cursor: pointer; margin-left: 6px; vertical-align: middle"
                >
                  <svg viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,16.5L11,7L13,7V16.5H11M11,5.5V3.5H13V5.5H11Z"
                    />
                  </svg>
                </n-icon>
              </template>
              <div class="calculation-flow-info">
                <!-- 第一步计算 -->
                <div class="calculation-step-info">
                  <div class="calculation-formula-info">
                    <n-space align="center" justify="center" :size="8">
                      <n-tag type="info" size="small">{{ formData.developerCount }}</n-tag>
                      <span class="operator">×</span>
                      <n-tag type="warning" size="small">{{ formData.vscodeActiveRatio }}%</n-tag>
                      <span class="operator">=</span>
                      <n-tag type="success" size="small">{{ formData.vscodeActiveUsers }}</n-tag>
                    </n-space>
                  </div>
                  <div class="calculation-description-info">
                    <n-text depth="3" class="text-xs"
                      >企业安装 CoStrict 人数 × CoStrict 插件日活比例 = CoStrict 日活用户数</n-text
                    >
                  </div>
                </div>

                <!-- 箭头指示 -->
                <div class="arrow-down-info">
                  <n-icon size="16" color="#1890ff">
                    <svg viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                      />
                    </svg>
                  </n-icon>
                </div>

                <!-- 第二步计算 -->
                <div class="calculation-step-info">
                  <div class="calculation-formula-info">
                    <n-space align="center" justify="center" :size="8">
                      <n-tag type="success" size="small">{{ formData.vscodeActiveUsers }}</n-tag>
                      <span class="operator">×</span>
                      <!-- <n-tag type="warning" size="small">{{ formData.concurrentCoefficient / formData.vscodeActiveUsers }}</n-tag> -->
                      <n-tag type="warning" size="small">50</n-tag>

                      <span class="operator">×</span>
                      <n-tag type="warning" size="small">4</n-tag>

                      <span class="operator">/</span>
                      <n-tag type="warning" size="small">10</n-tag>

                      <span class="operator">/</span>
                      <n-tag type="warning" size="small">60</n-tag>
                      <span class="operator">=</span>
                      <n-tag type="error" size="small">{{
                        formData.concurrentDeveloperCount
                      }}</n-tag>
                    </n-space>
                  </div>
                  <div class="calculation-description-info">
                    <n-text depth="3" class="text-xs"
                      >CoStrict 日活用户数 x 使用者每天平均对话次数(50) x 每次对话API调用次数(4) /
                      每天活跃小时数(10) / 每小时分钟数(60) = 每分钟并发连接数</n-text
                    >
                  </div>
                </div>
              </div>
            </n-popover>
          </div>
        </template>

        <n-space vertical>
          <!-- 企业编码人员数量、VSCode插件日活比例和并发系数 -->
          <div class="parameter-inputs">
            <div class="input-row flex items-center">
              <div class="input-label w-45">企业安装 CoStrict 人数：</div>
              <n-input-number
                v-model:value="formData.developerCount"
                :min="1"
                :show-button="false"
                style="width: 200px"
                @update:value="handleDeveloperCountChange"
                placeholder="请输入企业安装CoStrict人数"
              >
                <template #suffix>人</template>
              </n-input-number>
            </div>
            <div class="input-row flex items-center">
              <div class="input-label w-45">CoStrict 插件日活比例：</div>
              <n-input-number
                v-model:value="formData.vscodeActiveRatio"
                :min="1"
                :max="100"
                :show-button="false"
                style="width: 200px"
                @update:value="handleDeveloperCountChange"
                placeholder="请输入插件日活比例"
              >
                <template #suffix>%</template>
              </n-input-number>
            </div>
            <div class="input-row flex items-center">
              <div class="input-label w-45">高峰期每分钟请求：</div>
              <!-- <n-input-number v-model:value="formData.concurrentCoefficient" :min="1" :show-button="false"
                style="width: 200px" @update:value="handleDeveloperCountChange" placeholder="默认52">
              </n-input-number> -->
              {{ formData.concurrentDeveloperCount }}
            </div>
          </div>

          <!-- 计算结果 -->
          <!-- <div class="calculation-results mt-4">
            <div class="result-content">
              <div class="result-item">
                每分钟并发连接数： {{ formData.concurrentDeveloperCount }}人
              </div>
            </div>
          </div> -->
        </n-space>
      </n-card>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import {
  NCard,
  NForm,
  NFormItem,
  NInputNumber,
  NSpace,
  NIcon,
  NPopover,
  NTag,
  NRadioGroup,
  NRadio,
  NAlert,
  NText,
} from 'naive-ui'
import { VERSION_CONFIG, DEPLOYMENT_CONFIG } from '../constants'
import type { FormData } from '../types'

// 定义组件名
defineOptions({
  name: 'ParameterSettings',
})

// 使用 defineModel 简化双向绑定
const formData = defineModel<FormData>({ required: true })

// 处理开发人员数量变化
const handleDeveloperCountChange = () => {
  // 第一步：编码人数 → VSCode插件日活用户数
  formData.value.vscodeActiveUsers = Math.ceil(
    formData.value.developerCount * (formData.value.vscodeActiveRatio / 100),
  )

  // 第二步：VSCode插件日活用户数 → 并发链接数
  formData.value.concurrentDeveloperCount = Math.ceil(formData.value.vscodeActiveUsers * 0.33)

  // 数据变化会自动通过 watch 同步到父组件，父组件会通过 handleFormDataUpdate 重新计算
}

// 处理部署方式切换
const handleDeploymentChange = () => {
  // 部署方式切换时，保持当前版本选择不变，但会触发重新计算
  // 数据变化会自动通过 watch 同步到父组件
}

// 处理版本切换
const handleVersionChange = (newVersion: 'basic' | 'standard') => {
  // 保存当前的基础参数
  const preservedParams = {
    developerCount: formData.value.developerCount,
    vscodeActiveRatio: formData.value.vscodeActiveRatio,
    vscodeActiveUsers: formData.value.vscodeActiveUsers,
    concurrentDeveloperCount: formData.value.concurrentDeveloperCount,
  }

  // 获取新版本的配置
  const versionConfig = VERSION_CONFIG[newVersion]

  // 更新模型选择
  formData.value.selectedCompletionModel = versionConfig.models.completion
  formData.value.selectedCodeReviewModel = versionConfig.models.codeReview
  formData.value.selectedRAGEmbeddingModel = versionConfig.models.rag.embedding
  formData.value.selectedRAGRerankModel = versionConfig.models.rag.rerank

  // 更新AI Agent模型选择
  formData.value.selectedAIModels = {}
  formData.value.modelRatios = {}
  formData.value.selectedAIModels[versionConfig.models.aiAgent] = true
  formData.value.modelRatios[versionConfig.models.aiAgent] = 100

  // 确保所有功能模块都启用（强制设置为true）
  formData.value.enableCodeCompletion = true
  formData.value.enableAIAgent = true
  formData.value.enableCodeReview = true
  formData.value.enableRAG = true

  // 恢复基础参数
  formData.value.developerCount = preservedParams.developerCount
  formData.value.vscodeActiveRatio = preservedParams.vscodeActiveRatio
  formData.value.vscodeActiveUsers = preservedParams.vscodeActiveUsers
  formData.value.concurrentDeveloperCount = preservedParams.concurrentDeveloperCount
}
</script>

<style scoped>
.font-medium {
  font-weight: 500;
}

.mb-2 {
  margin-bottom: 4px;
}

.mb-4 {
  margin-bottom: 8px;
}

.mt-2 {
  margin-top: 4px;
}

/* 头部信息样式 */
.header-with-info {
  display: flex;
  align-items: center;
}

/* 计算流程信息样式 */
.calculation-flow-info {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e0e6ed;
}

.calculation-step-info {
  background: white;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
}

.calculation-formula-info {
  margin-bottom: 8px;
}

.calculation-description-info {
  text-align: center;
}

.arrow-down-info {
  text-align: center;
  margin: 8px 0;
}

.operator {
  font-weight: bold;
  font-size: 16px;
  color: #1890ff;
  margin: 0 4px;
}

.text-xs {
  font-size: 0.75rem;
}

.result-content {
  display: block;
}

.result-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.result-item {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  display: block;
}

/* 参数输入区域样式 */
.parameter-inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.parameter-inputs .n-form-item {
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 字段描述样式 */
.field-description {
  margin-top: 4px;
  line-height: 1.2;
  margin-left: 132px;
  /* label-width + gap */
}

.text-xs {
  font-size: 0.75rem;
}

/* 部署方式选择样式 */
.deployment-mode-section {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.deployment-mode-section .n-radio-group {
  display: flex;
  gap: 16px;
}

.deployment-mode-section .n-radio {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

.deployment-mode-section .n-radio:hover {
  border-color: #409eff;
  background: #f0f7ff;
}

.deployment-mode-section .n-radio.n-radio--checked {
  border-color: #409eff;
  color: white;
}

/* 版本选择样式 */
.version-mode-section {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.version-mode-section .n-radio-group {
  display: flex;
  gap: 16px;
}

.version-mode-section .n-radio {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

.version-mode-section .n-radio:hover {
  border-color: #409eff;
  background: #f0f7ff;
}

.version-mode-section .n-radio.n-radio--checked {
  border-color: #409eff;
  color: white;
}

.deployment-description {
  margin-top: 12px;
}

.deployment-desc-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.deployment-desc-title {
  font-weight: 600;
  font-size: 14px;
  color: #2c3e50;
}

.deployment-desc-text {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
}

.version-description {
  margin-top: 12px;
}

.version-desc-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.version-desc-title {
  font-weight: 600;
  font-size: 14px;
  color: #2c3e50;
}

.version-desc-text {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
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

/* 参数设置卡片hover效果 */
.parameter-card {
  border: 1px solid transparent;
  cursor: pointer;
}

.parameter-card:hover {
  border-color: #1890ff;
}
</style>
