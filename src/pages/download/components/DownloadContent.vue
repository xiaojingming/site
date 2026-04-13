<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TabType, CliStepLists, CliEnvRequirements, InstallMethod, StepItem } from '../types'
import { JETBRAINS_IDES } from '../constants'
import StepTimeline from './StepTimeline.vue'
import InstallMethodTabs from './InstallMethodTabs.vue'

defineOptions({
  name: 'DownloadContent',
})

const props = defineProps<{
  activeTab: TabType
  headerIcon: string
  headerTitle: string
  steps: StepItem[]
  cliStepLists?: CliStepLists
  cliEnvRequirements?: CliEnvRequirements
  installMethod?: InstallMethod
}>()

const emit = defineEmits<{
  (e: 'download'): void
  (e: 'downloadJetbrainsPrimary'): void
  (e: 'downloadJetbrainsSecondary'): void
  (e: 'copyCliCommand'): void
  (e: 'installMethodChange', method: InstallMethod): void
}>()

const { t } = useI18n()
const currentInstallMethod = ref<InstallMethod>(props.installMethod || 'bash')

// 监听父组件传入的 installMethod 变化
watch(
  () => props.installMethod,
  (newMethod) => {
    if (newMethod) {
      currentInstallMethod.value = newMethod
    }
  },
)

const handleDownload = () => emit('download')
const handleInstallMethodChange = (method: InstallMethod) => {
  currentInstallMethod.value = method
  emit('installMethodChange', method)
}
</script>

<template>
  <div class="download-content">
    <!-- Header Section -->
    <div v-if="activeTab !== 'cli'" class="content-header flex flex-wrap">
      <img class="download-icon w-6 h-6 mr-1" :src="headerIcon" alt="CoStrict Download" />
      <span class="text-white mr-4">{{ headerTitle }}</span>
      <div class="flex cursor-pointer" @click="handleDownload">
        <span style="color: #4083e8">{{ t('download.manualPluginDownload') }}</span>
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
    </div>

    <!-- JetBrains IDE List -->
    <div v-if="activeTab === 'jetbrains'" class="supported-ides mt-5">
      <p class="text-white mb-2">{{ t('download.jetbrainsSupportIdes') }}</p>
      <ul class="list-disc ml-4">
        <li v-for="ide in JETBRAINS_IDES" :key="ide">{{ ide }}</li>
      </ul>
    </div>

    <!-- Installation Steps for CLI -->
    <template v-if="activeTab === 'cli' && cliStepLists && cliEnvRequirements">
      <!-- 安装步骤 -->
      <div class="cli-install-section">
        <p class="cli-desc">
          {{ $t('download.cliStep2SubContent', { link: '' })
          }}<a href="https://docs.costrict.ai/cli/guide/installation" target="_blank">{{
            $t('download.cliStep2DocLink')
          }}</a>
        </p>

        <!-- 安装方式选择器 -->
        <div class="cli-install-container">
          <InstallMethodTabs
            :active-method="currentInstallMethod"
            @change="handleInstallMethodChange"
          />

          <!-- 安装命令 -->
          <div class="cli-code-wrapper">
            <div
              v-for="(step, index) in cliStepLists.installSteps"
              :key="index"
              class="cli-code-block"
            >
              <div v-if="step.cliContent?.commands" class="cli-code-content">
                <div class="cli-code-lines">
                  <div
                    v-for="(cmd, cmdIndex) in step.cliContent.commands"
                    :key="cmdIndex"
                    class="cli-code-line"
                  >
                    <span class="cli-prompt">$</span>
                    <span class="cli-command-text">{{ cmd }}</span>
                    <button
                      v-if="cmdIndex === step.cliContent.commands!.length - 1"
                      class="cli-copy-icon-fixed"
                      @click="$emit('copyCliCommand')"
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
      </div>

      <!-- 环境要求 -->
      <div class="cli-env-section">
        <h3 class="env-title">{{ t('download.cliStep1Title') }}</h3>

        <!-- 操作系统 -->
        <div class="env-group">
          <h4 class="env-group-title">{{ cliEnvRequirements?.osTitle }}</h4>
          <ul class="env-list">
            <li><strong>Windows：</strong>{{ cliEnvRequirements?.osWindows }}</li>
            <li><strong>Linux：</strong>{{ cliEnvRequirements?.osLinux }}</li>
            <li><strong>macOS：</strong>{{ cliEnvRequirements?.osMacOS }}</li>
            <li>
              <strong>{{ t('download.cliStep1OsContainerLabel') }}</strong
              >{{ cliEnvRequirements?.osContainer }}
            </li>
          </ul>
        </div>

        <!-- 终端 -->
        <div class="env-group">
          <h4 class="env-group-title">{{ cliEnvRequirements?.terminalTitle }}</h4>
          <ul class="env-list">
            <li><strong>Windows：</strong>{{ cliEnvRequirements?.terminalWindows }}</li>
            <li><strong>Linux /macOS：</strong>{{ cliEnvRequirements?.terminalUnix }}</li>
          </ul>
        </div>

        <!-- 备用方案 -->
        <div class="env-group env-group-web">
          <h4 class="env-group-title">{{ cliEnvRequirements?.webModeTitle }}</h4>
          <p class="env-web-content">{{ cliEnvRequirements?.webModeContent }}</p>
        </div>
      </div>
    </template>

    <!-- Installation Steps for VSCode/JetBrains -->
    <div v-else class="manual-methods download-methods">
      <p class="tips">{{ t('download.installSteps') }}</p>
      <div class="download-methods">
        <StepTimeline
          :steps="steps"
          :active-tab="activeTab"
          @download-jetbrains-primary="$emit('downloadJetbrainsPrimary')"
          @download-jetbrains-secondary="$emit('downloadJetbrainsSecondary')"
          @copy-cli-command="$emit('copyCliCommand')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content-header {
  @media (max-width: 968px) {
    flex-wrap: wrap;

    img {
      display: none;
    }

    span {
      flex: 0 1 auto;
      word-wrap: break-word;
      word-break: break-word;
      white-space: normal;
    }

    div {
      flex: 1 1 100%;
      margin-top: 8px;
    }
  }
}

.supported-ides {
  margin-top: 2rem;
  margin-bottom: 1rem;

  p {
    font-weight: 600;
    color: #f4f8ff;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
      color: #a1a7b3;
      line-height: 1.5;
    }
  }
}

.download-content {
  margin-top: 32px;
}

.tips {
  margin-top: 32px;
  margin-bottom: 12px;
  color: #c2c7d1;
}

// CLI 安装区域
.cli-install-section {
  margin-bottom: 48px;

  @media (max-width: 768px) {
    align-items: stretch;
  }
}

.cli-desc {
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
    text-align: left;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
}

.cli-install-container {
  width: 100%;
  max-width: 620px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    max-width: 100%;
  }
}

.cli-code-wrapper {
  background: #1e1e1e;
  padding: 16px;

  @media (max-width: 640px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
}

.cli-code-block {
  position: relative;
  font-family: 'SF Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  overflow: hidden;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    font-size: 11px;
  }
}

.cli-code-content {
  position: relative;
  padding: 40px 0 12px;
}

.cli-code-content:last-child {
  padding-bottom: 16px;
}

.cli-code-line {
  display: flex;
  align-items: center;
  gap: 8px;

  .cli-code-line .cli-copy-icon-fixed {
    margin-left: auto;
  }
}

.cli-code-line:last-child {
  padding-bottom: 0;
}

.cli-prompt {
  color: #569cd6;
  flex-shrink: 0;
  font-weight: 500;
  line-height: 1.6;
  margin-right: 4px;

  @media (max-width: 640px) {
    line-height: 1.5;
  }
}

.cli-command-text {
  color: #d4d4d4;
  flex: 1;
  word-break: break-all;
  white-space: normal;
  line-height: 1.6;

  @media (max-width: 640px) {
    font-size: 11px;
    line-height: 1.5;
  }
}

.cli-code-block {
  position: relative;
  font-family: 'SF Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  overflow: hidden;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    font-size: 11px;
  }
}

.cli-code-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 8px;
}

.cli-code-lines {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cli-code-line {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 24px;
}

.cli-prompt {
  color: #569cd6;
  flex-shrink: 0;
  font-weight: 500;

  @media (max-width: 640px) {
    line-height: 1.5;
  }
}

.cli-command-text {
  color: #d4d4d4;
  flex: 1;
  word-break: break-all;

  @media (max-width: 640px) {
    font-size: 12px;
  }
}

.cli-copy-icon-fixed {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #a0a0a0;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover {
    color: #fff;
    background: rgba(64, 131, 232, 0.2);
    border-color: rgba(64, 131, 232, 0.4);
  }

  svg {
    width: 14px;
    height: 14px;
  }
}

// CLI 环境要求样式
.cli-env-section {
  margin-top: 48px;
  margin-bottom: 32px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;

  .env-title {
    font-size: 16px;
    font-weight: 600;
    color: #f4f8ff;
    margin-bottom: 20px;
  }

  .env-group {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .env-group-title {
    font-size: 14px;
    font-weight: 600;
    color: #c2c7d1;
    margin-bottom: 8px;
  }

  .env-list {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 6px;
      color: #a1a7b3;
      font-size: 13px;
      line-height: 1.6;

      strong {
        color: #f4f8ff;
        font-weight: 500;
      }
    }
  }

  .env-group-web {
    background: rgba(255, 193, 7, 0.08);
    border-left: 3px solid #ffc107;
    padding: 12px 16px;
    border-radius: 6px;

    .env-web-content {
      color: #c2c7d1;
      font-size: 13px;
      line-height: 1.6;
      margin: 0;
    }
  }
}
</style>
