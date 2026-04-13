import { useMessage } from 'naive-ui'
import type { Ref } from 'vue'
import { DOWNLOAD_URLS } from './constants'
import type { TabType } from './types'

export function useDownloadActions(activeTab: Ref<TabType>) {
  const { t } = useI18n()
  const message = useMessage()

  const download = () => {
    if (activeTab.value === 'vscode') {
      window.open(DOWNLOAD_URLS.vscode, '_blank')
    } else {
      downloadJetbrainsSecondary()
    }
  }

  const downloadVscode = () => {
    window.open(DOWNLOAD_URLS.vscode, '_blank')
  }

  const downloadJetbrainsPrimary = () => {
    window.open(DOWNLOAD_URLS.jetbrainsPrimary, '_blank')
  }

  const downloadJetbrainsSecondary = () => {
    window.open(DOWNLOAD_URLS.jetbrainsSecondary, '_blank')
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      message.success(t('download.copySuccess'))
    } catch {
      fallbackCopy(text)
    }
  }

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()

    try {
      document.execCommand('copy')
      message.success(t('download.copySuccess'))
    } catch {
      message.error(t('download.copyFailed'))
    }

    document.body.removeChild(textArea)
  }

  return {
    download,
    downloadVscode,
    downloadJetbrainsPrimary,
    downloadJetbrainsSecondary,
    copyToClipboard,
  }
}
