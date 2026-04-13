<script setup lang="ts">
import { ref } from 'vue'
import TabList from './components/TabList.vue'
import DownloadContent from './components/DownloadContent.vue'
import { useDownloadData } from './useDownloadData'
import { useDownloadActions } from './useDownloadActions'
import {
  CLI_COMMAND_INSTALL_NPM,
  CLI_COMMAND_INSTALL_BASH,
  CLI_COMMAND_INSTALL_POWERSHELL,
} from './constants'
import type { TabType, InstallMethod } from './types'

defineOptions({
  name: 'DownloadPage',
})

useHead({
  title: '下载 CoStrict - VSCode & JetBrains 插件 | CLI工具',
  meta: [
    {
      name: 'description',
      content:
        '免费下载 CoStrict AI 编程助手，支持 VSCode、JetBrains 全系列 IDE 插件及 CLI 工具，一键安装，即刻提升开发效率。',
    },
    { property: 'og:title', content: '下载 CoStrict - VSCode & JetBrains 插件 | CLI工具' },
    {
      property: 'og:description',
      content:
        '免费下载 CoStrict AI 编程助手，支持 VSCode、JetBrains 全系列 IDE 插件及 CLI 工具，一键安装，即刻提升开发效率。',
    },
    { property: 'og:url', content: 'https://costrict.ai/download' },
    { name: 'twitter:title', content: '下载 CoStrict - VSCode & JetBrains 插件 | CLI工具' },
    {
      name: 'twitter:description',
      content: '免费下载 CoStrict AI 编程助手，支持 VSCode、JetBrains 全系列 IDE 插件及 CLI 工具。',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://costrict.ai/download' }],
})

const { t } = useI18n()
const activeTab = ref<TabType>('vscode')
const installMethod = ref<InstallMethod>('bash')

const { tabList, headerTitle, headerIcon, stepList, cliStepLists, cliEnvRequirements } =
  useDownloadData(activeTab, installMethod)
const { download, downloadJetbrainsPrimary, downloadJetbrainsSecondary, copyToClipboard } =
  useDownloadActions(activeTab)

const handleTabSelect = (tab: TabType) => {
  activeTab.value = tab
}

const handleInstallMethodChange = (method: InstallMethod) => {
  installMethod.value = method
}

const handleCopyCliCommand = () => {
  const commandMap: Record<InstallMethod, string> = {
    npm: CLI_COMMAND_INSTALL_NPM,
    bash: CLI_COMMAND_INSTALL_BASH,
    powershell: CLI_COMMAND_INSTALL_POWERSHELL,
  }
  copyToClipboard(commandMap[installMethod.value])
}
</script>

<template>
  <div class="w-full bg-black pt-17">
    <div class="download-page-container">
      <!-- Header Section -->
      <div class="container-header">
        <p class="title text-white">{{ t('download.title') }}</p>
        <p class="desc">{{ t('download.desc') }}</p>
      </div>

      <!-- Main Content -->
      <div class="container-main">
        <!-- Tab Navigation -->
        <TabList :tabs="tabList" :active-tab="activeTab" @select="handleTabSelect" />

        <!-- Download Content -->
        <DownloadContent
          :active-tab="activeTab"
          :header-icon="headerIcon"
          :header-title="headerTitle"
          :steps="stepList"
          :cli-step-lists="cliStepLists"
          :cli-env-requirements="cliEnvRequirements"
          :install-method="installMethod"
          @download="download"
          @download-jetbrains-primary="downloadJetbrainsPrimary"
          @download-jetbrains-secondary="downloadJetbrainsSecondary"
          @copy-cli-command="handleCopyCliCommand"
          @install-method-change="handleInstallMethodChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.download-page-container {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 150px;

  @media (max-width: 1280px) {
    width: 90%;
  }

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 70%;
  }

  .container-header {
    padding-top: 50px;
    margin-bottom: 26px;

    .title {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .desc {
      color: #c2c7d1;
    }
  }

  .container-main {
    margin-top: 32px;
  }
}
</style>
