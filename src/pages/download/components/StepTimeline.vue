<script setup lang="ts">
import { ref } from 'vue'
import { NTimeline, NTimelineItem, useMessage } from 'naive-ui'
import type { StepItem } from '../types'
import InstallMethodTabs from './InstallMethodTabs.vue'

defineOptions({
  name: 'StepTimeline',
})

import type { InstallMethod } from '../types'

defineProps<{
  steps: StepItem[]
  activeTab: string
  isPermissionSteps?: boolean
  installMethod?: InstallMethod
}>()

defineEmits<{
  (e: 'downloadJetbrainsPrimary'): void
  (e: 'downloadJetbrainsSecondary'): void
  (e: 'copyCliCommand'): void
  (e: 'installMethodChange', method: InstallMethod): void
}>()

const { t } = useI18n()
const message = useMessage()
const copiedIndex = ref<number | null>(null)

const handleCopyCommand = async (cmd: string, index: number) => {
  try {
    await navigator.clipboard.writeText(cmd)
    copiedIndex.value = index
    message.success(t('download.copySuccess'))
    setTimeout(() => {
      copiedIndex.value = null
    }, 2000)
  } catch {
    message.error(t('download.copyFailed'))
  }
}
</script>

<template>
  <n-timeline :icon-size="20" :class="{ 'cli-mode': activeTab === 'cli' && !isPermissionSteps }">
    <n-timeline-item
      v-for="(step, index) in steps"
      :key="index"
      :title="
        activeTab === 'cli' && !isPermissionSteps
          ? ''
          : isPermissionSteps
            ? $t(`download.cliPermissionStep${index + 1}Title`)
            : $t(`download.step${index + 1}`)
      "
      line-type="dashed"
      color="#4083E8"
    >
      <template #icon>
        <div v-if="activeTab !== 'cli' || isPermissionSteps" class="timeline-icon">
          {{ index + 1 }}
        </div>
      </template>
      <div
        class="flex step-wrapper"
        :class="{
          'cli-install-mode':
            activeTab === 'cli' && !isPermissionSteps && step.cliContent?.commands,
        }"
      >
        <div v-if="activeTab !== 'cli' || isPermissionSteps || step.tips" class="step-left mr-10">
          <div class="step-title" v-if="activeTab !== 'cli' || isPermissionSteps">
            {{ step.title }}
          </div>
          <div class="step-content">
            <!-- VSCode: 普通文本内容 -->
            <template v-if="activeTab === 'vscode'">
              {{ step.content }}
            </template>

            <!-- JetBrains: 自定义下载链接 -->
            <template v-else-if="activeTab === 'jetbrains'">
              <div class="jetbrains-content">
                <p class="content-text">{{ $t('download.jetbrainsStep1Content1') }}</p>
                <div
                  class="flex cursor-pointer ml-4 mt-2 mb-2 download-link"
                  @click="$emit('downloadJetbrainsPrimary')"
                >
                  <span style="color: #4083e8">{{ $t('download.manualPluginDownload') }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 20 20"
                    width="18"
                    color="#fff"
                  >
                    <g fill="none">
                      <path
                        d="M15.245 16.498a.75.75 0 0 1 .101 1.493l-.101.007H4.75a.75.75 0 0 1-.102-1.493l.102-.007h10.495zM10.004 2a.75.75 0 0 1 .743.648l.007.102l-.001 10.193l2.966-2.97a.75.75 0 0 1 .977-.074l.084.072a.75.75 0 0 1 .073.977l-.072.084l-4.243 4.25l-.07.063l-.092.059l-.036.021l-.091.038l-.12.03l-.07.008l-.06.002a.726.726 0 0 1-.15-.016l-.082-.023a.735.735 0 0 1-.257-.146l-4.29-4.285a.75.75 0 0 1 .976-1.134l.084.073l2.973 2.967V2.75a.75.75 0 0 1 .75-.75z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div
                  class="flex cursor-pointer ml-4 mt-2 mb-2 download-link"
                  @click="$emit('downloadJetbrainsSecondary')"
                >
                  <span style="color: #4083e8">{{ $t('download.manualPluginDownload2') }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 20 20"
                    width="18"
                    color="#fff"
                  >
                    <g fill="none">
                      <path
                        d="M15.245 16.498a.75.75 0 0 1 .101 1.493l-.101.007H4.75a.75.75 0 0 1-.102-1.493l.102-.007h10.495zM10.004 2a.75.75 0 0 1 .743.648l.007.102l-.001 10.193l2.966-2.97a.75.75 0 0 1 .977-.074l.084.072a.75.75 0 0 1 .073.977l-.072.084l-4.243 4.25l-.07.063l-.092.059l-.036.021l-.091.038l-.12.03l-.07.008l-.06.002a.726.726 0 0 1-.15-.016l-.082-.023a.735.735 0 0 1-.257-.146l-4.29-4.285a.75.75 0 0 1 .976-1.134l.084.073l2.973 2.967V2.75a.75.75 0 0 1 .75-.75z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                </div>
                <p class="content-text">{{ $t('download.jetbrainsStep1Content2') }}</p>
              </div>
            </template>

            <!-- CLI: 命令行代码块 -->
            <template v-else-if="activeTab === 'cli'">
              <div class="cli-content">
                <!-- 安装步骤：安装 + 验证（合并为一步）-->
                <template v-if="!isPermissionSteps && step.cliContent">
                  <!-- 安装命令移到图片下方 -->
                </template>

                <!-- 权限方案步骤 -->
                <template v-if="isPermissionSteps && step.cliContent">
                  <div class="permission-solution-card">
                    <p class="solution-desc" v-html="step.cliContent.description"></p>

                    <!-- 命令列表 -->
                    <div v-if="step.cliContent.commands" class="commands-list">
                      <div
                        v-for="(cmd, cmdIndex) in step.cliContent.commands"
                        :key="cmdIndex"
                        class="command-item"
                      >
                        <div class="cli-code-block">
                          <div class="code-content">
                            <span class="cli-prompt">$ </span>
                            <span class="cli-command-text">{{ cmd }}</span>
                          </div>
                          <button
                            class="cli-copy-icon"
                            @click="handleCopyCommand(cmd, index * 10 + cmdIndex)"
                            :aria-label="$t('download.copyCommand')"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path
                                d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Windows 方案的列表项 -->
                    <div v-if="step.cliContent.items" class="solution-items">
                      <ul>
                        <li v-for="(item, itemIndex) in step.cliContent.items" :key="itemIndex">
                          {{ item }}
                        </li>
                      </ul>
                    </div>

                    <!-- 注意事项 -->
                    <p v-if="step.cliContent.note" class="solution-note">
                      {{ step.cliContent.note }}
                    </p>
                  </div>
                </template>
              </div>
            </template>
          </div>
          <div v-if="step.tips" class="step-tips">{{ step.tips }}</div>
        </div>
        <img v-if="step.imgUrl" :src="step.imgUrl" alt="CoStrict Download" class="step-image" />
        <!-- CLI 安装命令块放在图片下方 -->
        <div
          v-if="
            activeTab === 'cli' && !isPermissionSteps && step.cliContent && step.cliContent.commands
          "
          class="cli-install-below-image"
        >
          <p class="cli-install-desc">
            {{ $t('download.cliStep2SubContent', { link: '' })
            }}<a href="https://docs.costrict.ai/cli/guide/installation" target="_blank">{{
              $t('download.cliStep2DocLink')
            }}</a>
          </p>
          <div class="cli-install-container">
            <InstallMethodTabs
              v-if="installMethod"
              :active-method="installMethod"
              @change="(method) => $emit('installMethodChange', method)"
            />

            <div class="cli-code-wrapper">
              <div
                v-for="(cmd, cmdIndex) in step.cliContent.commands"
                :key="cmdIndex"
                class="cli-code-block"
              >
                <div class="cli-code-line comment">
                  <span class="comment-text"
                    >#
                    {{
                      cmdIndex === 0
                        ? $t('download.cliStep2CommentInstall')
                        : $t('download.cliStep2CommentVerify')
                    }}</span
                  >
                </div>
                <div class="cli-code-line cmd">
                  <span class="cli-prompt">$</span>
                  <span class="cli-command-text">{{ cmd }}</span>
                  <button
                    class="cli-copy-icon"
                    @click="handleCopyCommand(cmd, index * 10 + cmdIndex)"
                    :aria-label="$t('download.copyCommand')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-timeline-item>
  </n-timeline>
</template>

<style lang="less" scoped>
.timeline-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  font-size: 12px;
  color: #fff;
  background: #4083e8;
}

.step-wrapper {
  padding: 16px 16px 16px 32px;
  box-sizing: border-box;
  border: 2px solid transparent;
  background-image: linear-gradient(
    103deg,
    rgba(32, 204, 148, 0.24) 4%,
    #20cc94 20%,
    #a8a8a8 36%,
    #d4d4d4 50%,
    #1c6eff 67%,
    rgba(149, 149, 149, 0.55) 99%
  );
  background-image:
    linear-gradient(black, black),
    linear-gradient(
      103deg,
      rgba(32, 204, 148, 0.24) 4%,
      #20cc94 20%,
      #a8a8a8 36%,
      #d4d4d4 50%,
      #1c6eff 67%,
      rgba(149, 149, 149, 0.55) 99%
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 12px;
  display: flex;
  flex-wrap: nowrap;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 16px;
  }

  .step-left {
    @media (max-width: 1024px) {
      align-self: flex-start;
    }
  }
}

// CLI 安装模式下 step-wrapper 使用 flex-wrap
.step-wrapper.cli-install-mode {
  flex-wrap: wrap;
}

// CLI 权限步骤：左侧内容占满宽度
.permission-section .step-left {
  width: 100%;
  flex: 1;
}

// CLI 权限步骤：step-wrapper 内容区域最大化
.permission-section .step-wrapper {
  width: 100%;
  max-width: 100%;

  .step-left {
    width: 100%;
  }
}

.step-title {
  margin-top: 28px;
  font-size: 16px;
  color: #f4f8ff;
  line-height: 24px;
  max-width: 400px;

  @media (max-width: 1024px) {
    margin-top: 0;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
}

// CLI 权限步骤标题宽度调整
.permission-section .step-title {
  max-width: 100%;
}

.step-content {
  margin-top: 28px;
  font-size: 14px;
  line-height: 20px;
  color: #a1a7b3;
  max-width: 400px;

  @media (max-width: 1024px) {
    max-width: 100%;
  }

  @media (max-width: 640px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
}

// CLI 权限步骤内容宽度调整
.permission-section .step-content {
  max-width: 100%;
}

.step-tips {
  margin-top: 12px;
  font-size: 14px;
  line-height: 20px;
  color: #a1a7b3;
  max-width: 400px;

  @media (max-width: 1024px) {
    max-width: 100%;
  }

  @media (max-width: 640px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
}

// CLI 权限步骤提示宽度调整
.permission-section .step-tips {
  max-width: 100%;
}

.step-tips::before {
  content: '* ';
  color: #ff0000;
}

.step-wrapper img,
.step-image {
  margin: auto;
  height: auto;
  object-fit: contain;
  max-width: 600px;
  width: 100%;

  @media (max-width: 1024px) {
    height: auto;
    margin-top: 10px;
  }
}

:deep(.n-timeline-item-content__title) {
  color: #f4f8ff !important;
  font-size: 16px;
  margin-top: -2px;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
}

:deep(.n-timeline-item-timeline__line) {
  --n-color-start: #4083e8;
}

:deep(.n-timeline-item-timeline__circle) {
  background: #4083e8;
}

// CLI 安装步骤：隐藏 timeline 节点和线条
.cli-mode {
  &:deep(.n-timeline-item-timeline) {
    display: none;
  }

  &:deep(.n-timeline-item-content) {
    padding-left: 0 !important;
    margin-left: 0 !important;
  }

  &:deep(.n-timeline-item) {
    padding-left: 0 !important;
  }
}

// CLI 权限步骤：步骤条宽度充分利用
.permission-section :deep(.n-timeline) {
  width: 100%;
}

.permission-section :deep(.n-timeline-item) {
  width: 100%;
}

.permission-section :deep(.n-timeline-item-content) {
  width: 100%;
  max-width: 100%;
}

.permission-section :deep(.n-timeline-item-content__content) {
  width: 100%;
}

.permission-section :deep(.step-wrapper) {
  width: 100%;
  max-width: 100%;
}

:deep(.jetbrains-content) {
  .content-text {
    color: #a8a8a8;
    font-size: 14px;
    line-height: 1.6;
  }

  .download-link {
    @media (max-width: 1024px) {
      margin-left: 0;
    }
  }
}

// CLI 内容样式
.cli-content {
  width: 100%;

  .content-text {
    color: #a8a8a8;
    font-size: 14px;
    line-height: 1.6;
  }

  // 安装命令区块样式
  .cli-command-section {
    margin-bottom: 24px;

    &.verify-section {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  // 权限解决方案卡片样式
  .permission-solution-card {
    width: 100%;
    // min-width: 300px;
    max-width: 100%;
    padding: 16px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.08);

    @media (max-width: 640px) {
      padding: 12px;
    }

    @media (max-width: 480px) {
      padding: 10px;
    }

    .solution-desc {
      color: #a8a8a8;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 16px;

      a {
        color: #5b8def;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
          color: #7aa3f5;
          text-decoration: underline;
        }
      }

      @media (max-width: 640px) {
        font-size: 13px;
        margin-bottom: 12px;
      }

      @media (max-width: 480px) {
        font-size: 12px;
      }
    }

    .commands-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
      width: 100%;
      overflow: hidden;

      @media (max-width: 480px) {
        gap: 6px;
        margin-bottom: 12px;
      }
    }

    .solution-items {
      margin-bottom: 12px;

      ul {
        list-style-type: disc;
        padding-left: 20px;
        margin: 0;

        @media (max-width: 480px) {
          padding-left: 16px;
        }

        li {
          color: #a8a8a8;
          font-size: 13px;
          line-height: 1.6;
          margin-bottom: 4px;

          &:last-child {
            margin-bottom: 0;
          }

          @media (max-width: 640px) {
            font-size: 12px;
          }

          @media (max-width: 480px) {
            font-size: 11px;
            line-height: 1.5;
          }
        }
      }
    }

    .solution-note {
      margin-top: 12px;
      color: #ff6b6b;
      font-size: 12px;
      font-style: italic;
      line-height: 1.5;

      @media (max-width: 640px) {
        font-size: 11px;
      }

      @media (max-width: 480px) {
        font-size: 10px;
      }
    }
  }
}

.permission-section .cli-code-block,
.permission-solution-card .cli-code-block {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding: 10px 12px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 10px;
  }

  .code-content {
    @media (max-width: 640px) {
      overflow-x: auto;
      padding-bottom: 4px;
    }
  }

  .cli-command-text {
    @media (max-width: 640px) {
      white-space: pre-wrap;
      word-break: break-all;
      font-size: 12px;
    }
  }

  .cli-copy-icon {
    @media (max-width: 640px) {
      padding: 10px;
      align-self: flex-end;
    }

    svg {
      @media (max-width: 480px) {
        width: 16px;
        height: 16px;
      }
    }
  }
}

// 安装命令区块样式
.cli-command-section {
  margin-bottom: 24px;

  &.verify-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
}

// 权限解决方案布局 - 左右分栏
.permission-solution-layout {
  display: flex;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }

  .permission-left {
    flex: 1;
    min-width: 0;

    @media (max-width: 768px) {
      flex: auto;
    }
  }

  .permission-right {
    flex: 1;
    min-width: 0;

    @media (max-width: 768px) {
      flex: auto;
    }
  }
}

// // 权限解决方案卡片样式
// .permission-solution-card {
//   width: 100%;
//   // min-width: 300px;
//   max-width: 100%;
//   padding: 16px;
//   background: rgba(255, 255, 255, 0.03);
//   border-radius: 8px;
//   border: 1px solid rgba(255, 255, 255, 0.08);
//   overflow: hidden;
//   box-sizing: border-box;

//   @media (max-width: 640px) {
//     padding: 12px;
//   }

//   @media (max-width: 480px) {
//     padding: 10px;
//   }

//   .solution-desc {
//     color: #a8a8a8;
//     font-size: 14px;
//     line-height: 1.6;
//     margin-bottom: 16px;

//     @media (max-width: 640px) {
//       font-size: 13px;
//       margin-bottom: 12px;
//     }

//     @media (max-width: 480px) {
//       font-size: 12px;
//     }
//   }

//   .commands-list {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//     margin-bottom: 16px;
//     width: 100%;
//     overflow: hidden;

//     @media (max-width: 480px) {
//       gap: 6px;
//       margin-bottom: 12px;
//     }
//   }

//   .solution-items {
//     margin-bottom: 12px;

//     ul {
//       list-style-type: disc;
//       padding-left: 20px;
//       margin: 0;

//       @media (max-width: 480px) {
//         padding-left: 16px;
//       }

//       li {
//         color: #a8a8a8;
//         font-size: 13px;
//         line-height: 1.6;
//         margin-bottom: 4px;

//         &:last-child {
//           margin-bottom: 0;
//         }

//         @media (max-width: 640px) {
//           font-size: 12px;
//         }

//         @media (max-width: 480px) {
//           font-size: 11px;
//           line-height: 1.5;
//         }
//       }
//     }
//   }

//   .solution-note {
//     margin-top: 12px;
//     color: #ff6b6b;
//     font-size: 12px;
//     font-style: italic;
//     line-height: 1.5;

//     @media (max-width: 640px) {
//       font-size: 11px;
//     }

//     @media (max-width: 480px) {
//       font-size: 10px;
//     }
//   }
// }

:deep(.cli-code-wrapper) {
  overflow: hidden;
  max-width: 100%;
  background: #1e1e1e;
  border-radius: 0 0 12px 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: none;
}

// 代码块样式
.cli-code-block {
  background: #1e1e1e;
  font-family: 'SF Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  overflow: hidden;
  max-width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
}

.cli-code-line {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &.comment {
    padding-top: 12px;
    padding-bottom: 4px;
  }

  &.cmd {
    padding-top: 4px;
    padding-bottom: 12px;
  }

  @media (max-width: 640px) {
    padding-left: 12px;
    padding-right: 12px;
  }

  .comment-text {
    color: #6a9955;
    font-size: 12px;
    font-style: italic;
  }

  .cli-prompt {
    color: #569cd6;
    flex-shrink: 0;
    font-weight: 500;
  }

  .cli-command-text {
    color: #d4d4d4;
    flex: 1;
    overflow-x: auto;
    white-space: wrap;

    @media (max-width: 640px) {
      white-space: pre-wrap;
      word-break: break-all;
      font-size: 12px;
    }
  }

  .cli-copy-icon {
    background: transparent;
    border: none;
    color: #6e6e6e;
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
    border-radius: 4px;
    opacity: 1;
    margin-left: auto;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }

    @media (max-width: 640px) {
      padding: 8px;
    }

    svg {
      width: 16px;
      height: 16px;

      @media (max-width: 480px) {
        width: 14px;
        height: 14px;
      }
    }
  }
}

.cli-code-block:nth-of-type(1) {
  // margin-bottom: 16px;
}

.cli-install-below-image {
  width: 100%;
  flex: 0 0 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cli-install-desc {
  color: #a8a8a8;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 12px;

  a {
    color: #5b8def;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #7aa3f5;
      text-decoration: underline;
    }
  }
}

.cli-install-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 720px;
}

// 移动端特殊适配
@media (max-width: 480px) {
  .cli-content {
    .permission-solution-card {
      padding: 12px;

      .solution-desc {
        font-size: 12px;
      }
    }
  }
}
</style>
