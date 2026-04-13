<template>
  <div class="aicp-services-layout">
    <!-- 左侧 AICP 服务 -->
    <div class="service-column">
      <n-card title="AICP" :bordered="true" size="small" class="outer-service-card">
        <n-space vertical :size="16">
          <!-- 部署服务 -->
          <n-card size="small" :bordered="true">
            <n-flex align="center" :size="12">
              <n-space vertical :size="2" style="flex: 1;">
                <n-flex align="center" justify="space-between">
                  <n-text strong style="font-size: 14px;">{{ aicpServices.deployment.name }}</n-text>
                  <n-tag type="success" size="small" style="font-weight: 500;">
                    ¥{{ aicpServices.deployment.price.toLocaleString() }}
                  </n-tag>
                </n-flex>
                <n-text depth="3" style="font-size: 12px;">{{ aicpServices.deployment.description }}</n-text>
              </n-space>
            </n-flex>
          </n-card>

          <!-- 技术支持服务 -->
          <n-card size="small" :bordered="true">
            <n-space vertical :size="8">
              <n-flex align="center" :size="12">
                <n-text strong style="font-size: 14px;">技术支持服务</n-text>
              </n-flex>

              <!-- 电话技术支持 -->
              <n-flex align="center" :size="12" style="margin-left: 28px;">
                <n-space vertical :size="1" style="flex: 1;">
                  <n-text style="font-size: 13px;">{{ aicpServices.technicalSupport.phoneSupport.name }}</n-text>
                </n-space>
              </n-flex>

              <!-- 维保升级服务 -->
              <n-flex align="center" :size="12" style="margin-left: 28px;">
                <n-space vertical :size="1" style="flex: 1;">
                  <n-text style="font-size: 13px;">{{ aicpServices.technicalSupport.maintenance.name }}</n-text>
                </n-space>
              </n-flex>
            </n-space>
          </n-card>
        </n-space>
      </n-card>
    </div>

    <!-- 右侧 Costrict 服务 -->
    <div class="service-column">
      <n-card title="Costrict" :bordered="true" size="small" class="outer-service-card">
        <n-space vertical :size="16">
          <!-- 部署服务 -->
          <n-card size="small" :bordered="true">
            <n-flex align="center" :size="12">
              <n-space vertical :size="2" style="flex: 1;">
                <n-flex align="center" justify="space-between">
                  <n-text strong style="font-size: 14px;">{{ costrictServices.deployment.name }}</n-text>
                  <n-tag type="success" size="small" style="font-weight: 500;">
                    ¥{{ costrictServices.deployment.price.toLocaleString() }}
                  </n-tag>
                </n-flex>
                <n-text depth="3" style="font-size: 12px;">{{ costrictServices.deployment.description }}</n-text>
              </n-space>
            </n-flex>
          </n-card>

          <!-- 技术支持维保服务 -->
          <n-card size="small" :bordered="true">
            <n-space vertical :size="8">
              <n-flex align="center" :size="12">
                <n-space vertical :size="2" style="flex: 1;">
                  <n-text strong style="font-size: 14px;">技术支持维保服务</n-text>
                </n-space>
              </n-flex>

              <!-- 线上技术支持 -->
              <n-flex align="center" :size="12" style="margin-left: 28px;">
                <n-space vertical :size="1" style="flex: 1;">
                  <n-flex align="center" justify="space-between">
                    <n-text style="font-size: 13px;">{{ costrictServices.technicalSupport.online.name }}</n-text>
                    <n-tag type="info" size="tiny">
                      ¥{{ costrictServices.technicalSupport.online.price.toLocaleString() }}
                    </n-tag>
                  </n-flex>
                  <n-text depth="3" style="font-size: 11px;">{{ costrictServices.technicalSupport.online.description }}</n-text>
                </n-space>
              </n-flex>

              <!-- 线下技术支持 -->
              <n-flex align="center" :size="12" style="margin-left: 28px;">
                <n-space vertical :size="1" style="flex: 1;">
                  <n-flex align="center" justify="space-between">
                    <n-text style="font-size: 13px;">{{ costrictServices.technicalSupport.offline.name }}</n-text>
                    <n-tag type="info" size="tiny">
                      ¥{{ costrictServices.technicalSupport.offline.price.toLocaleString() }}
                    </n-tag>
                  </n-flex>
                  <n-text depth="3" style="font-size: 11px;">{{ costrictServices.technicalSupport.offline.description }}</n-text>
                </n-space>
              </n-flex>
            </n-space>
          </n-card>

          <!-- 咨询服务 -->
          <n-card size="small" :bordered="true">
            <n-space vertical :size="8">
              <n-flex align="center" :size="12">
                <n-space vertical :size="2" style="flex: 1;">
                  <n-text strong style="font-size: 14px;">咨询服务</n-text>
                </n-space>
              </n-flex>

              <!-- 培训服务 -->
              <n-flex align="center" :size="12" style="margin-left: 28px;">
                <n-space vertical :size="1" style="flex: 1;">
                  <n-flex align="center" justify="space-between">
                    <n-text style="font-size: 13px;">{{ costrictServices.consulting.training.name }}</n-text>
                    <n-tag type="info" size="tiny">
                      ¥{{ costrictServices.consulting.training.price.toLocaleString() }}
                    </n-tag>
                  </n-flex>
                  <n-text depth="3" style="font-size: 11px;">{{ costrictServices.consulting.training.description }}</n-text>
                </n-space>
              </n-flex>

              <!-- 开发指导服务 -->
              <n-flex align="center" :size="12" style="margin-left: 28px;">
                <n-space vertical :size="1" style="flex: 1;">
                  <n-flex align="center" justify="space-between">
                    <n-text style="font-size: 13px;">{{ costrictServices.consulting.development.name }}</n-text>
                    <n-tag type="info" size="tiny">
                      ¥{{ costrictServices.consulting.development.price.toLocaleString() }}
                    </n-tag>
                  </n-flex>
                  <n-text depth="3" style="font-size: 11px;">{{ costrictServices.consulting.development.description }}</n-text>
                </n-space>
              </n-flex>
            </n-space>
          </n-card>
        </n-space>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NSpace, NText, NTag, NFlex, NCard } from 'naive-ui'
import { AICP_SERVICES, COSTRICT_SERVICES } from '../types'

defineOptions({
  name: 'AicpServices',
})

// AICP服务数据
const aicpServices = AICP_SERVICES

// Costrict服务数据
const costrictServices = COSTRICT_SERVICES
</script>

<style lang="less" scoped>
.aicp-services-layout {
  display: flex;
  gap: 24px;
  padding: 12px 0;

  .service-column {
    flex: 1;
    min-width: 0;
  }

  :deep(.n-card) {
    transition: border-color 0.3s ease;

    &:not(.outer-service-card):hover {
      border-color: #2080f0;
    }

    &.n-card--small {
      .n-card__content {
        padding: 12px;
      }
    }
  }

  :deep(.n-tag) {
    &.n-tag--success {
      background: #f0fdf4;
      color: #16a34a;
      border-color: #86efac;
    }

    &.n-tag--info {
      background: #eff6ff;
      color: #2563eb;
      border-color: #93c5fd;
    }

    &.n-tag--tiny {
      font-size: 11px;
      padding: 0 6px;
      height: 20px;
      line-height: 18px;
    }
  }

  :deep(.n-icon) {
    opacity: 0.8;
  }

  :deep(.n-text) {
    &.n-text--strong {
      font-weight: 600;
    }
  }
}

/* 响应式布局：在小屏幕下恢复为垂直布局 */
@media (max-width: 768px) {
  .aicp-services-layout {
    flex-direction: column;
    gap: 16px;
  }
}
</style>