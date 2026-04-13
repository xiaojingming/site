import { computed, type Ref } from 'vue'
import type { TabType, StepItem, CliStepLists, CliEnvRequirements, InstallMethod } from './types'
import {
  CLI_COMMAND_INSTALL_NPM,
  CLI_COMMAND_INSTALL_BASH,
  CLI_COMMAND_INSTALL_POWERSHELL,
} from './constants'

// 导入图片资源
import vscodeImg from '@/assets/download/vscode.webp'
import jetbrainsImg from '@/assets/download/jetbrains.webp'
import vscodeDisableImg from '@/assets/download/vscode_disable.webp'
import jetbrainsDisableImg from '@/assets/download/jetbrains_disable.webp'
import jetbrainsContent from '@/assets/download/jetbrains_download.webp'
import vscodeIcon from '@/assets/download/vscode_icon.webp'
import jetbrainsIcon from '@/assets/download/jetbrains_icon.webp'
import cliImg from '@/assets/download/cli.webp'
import cliDisableImg from '@/assets/download/cli_disable.webp'
import cliIcon from '@/assets/download/cli_icon.webp'
import ZhDownloadStep1 from '@/assets/download/zh/download_step1.webp'
import ZhDownloadStep2 from '@/assets/download/zh/download_step2.webp'
import EnDownloadStep1 from '@/assets/download/en/download_step1.webp'
import ZhCliInstall from '@/assets/download/zh/cli_install.webp'
import EnCliInstall from '@/assets/download/en/cli_install.webp'
import EnDownloadStep2 from '@/assets/download/en/download_step2.webp'

export function useDownloadData(activeTab: Ref<TabType>, installMethod: Ref<InstallMethod>) {
  const { t, locale } = useI18n()

  const images = {
    vscode: vscodeImg,
    jetbrains: jetbrainsImg,
    cli: cliImg,
    vscodeDisable: vscodeDisableImg,
    jetbrainsDisable: jetbrainsDisableImg,
    cliDisable: cliDisableImg,
    vscodeIcon,
    jetbrainsIcon,
    cliIcon,
    jetbrainsContent,
  }

  const stepImages: Record<string, Record<string, string[]>> = {
    vscode: {
      zh: [ZhDownloadStep1, ZhDownloadStep2],
      en: [EnDownloadStep1, EnDownloadStep2],
    },
    cli: {
      zh: [ZhCliInstall],
      en: [EnCliInstall],
    },
  }

  const tabList = computed(() => [
    {
      key: 'vscode' as const,
      imgUrl: activeTab.value === 'vscode' ? vscodeImg : vscodeDisableImg,
    },
    {
      key: 'jetbrains' as const,
      imgUrl: activeTab.value === 'jetbrains' ? jetbrainsImg : jetbrainsDisableImg,
    },
    {
      key: 'cli' as const,
      imgUrl: activeTab.value === 'cli' ? cliImg : cliDisableImg,
    },
  ])

  const headerTitle = computed(() => {
    const titles: Record<TabType, string> = {
      vscode: t('download.vscodeTitle'),
      jetbrains: t('download.jetbrainsTitle'),
      cli: t('download.cliTitle'),
    }
    return titles[activeTab.value]
  })

  const headerIcon = computed(() => {
    const icons: Record<TabType, string> = {
      vscode: vscodeIcon,
      jetbrains: jetbrainsIcon,
      cli: cliIcon,
    }
    return icons[activeTab.value]
  })

  const currentImages = computed(() => {
    return stepImages[activeTab.value]?.[locale.value] || []
  })

  const stepList = computed<StepItem[]>(() => {
    const tab = activeTab.value

    if (tab === 'vscode') {
      return [
        {
          imgUrl: currentImages.value[0] || '',
          title: t('download.step1Title'),
          content: t('download.step1Content'),
        },
        {
          imgUrl: currentImages.value[1] || '',
          title: t('download.step2Title'),
          content: t('download.step2Content'),
          tips: t('download.step2Tips'),
        },
      ]
    }

    if (tab === 'jetbrains') {
      return [
        {
          imgUrl: jetbrainsContent,
          title: t('download.jetbrainsStep1Title'),
          content: `${t('download.jetbrainsStep1Content1')} ${t('download.jetbrainsStep1Content2')}`,
        },
      ]
    }

    return []
  })

  // CLI 环境要求
  const cliEnvRequirements = computed<CliEnvRequirements>(() => ({
    osTitle: t('download.cliStep1OsTitle'),
    osWindows: t('download.cliStep1OsWindows'),
    osLinux: t('download.cliStep1OsLinux'),
    osMacOS: t('download.cliStep1OsMacOS'),
    osContainer: t('download.cliStep1OsContainer'),
    terminalTitle: t('download.cliStep1TerminalTitle'),
    terminalWindows: t('download.cliStep1TerminalWindows'),
    terminalUnix: t('download.cliStep1TerminalUnix'),
    webModeTitle: t('download.cliStep1WebModeTitle'),
    webModeContent: t('download.cliStep1WebModeContent'),
  }))

  // CLI 专用的两个步骤列表
  const cliStepLists = computed<CliStepLists>(() => {
    const commandMap: Record<InstallMethod, string> = {
      npm: CLI_COMMAND_INSTALL_NPM,
      bash: CLI_COMMAND_INSTALL_BASH,
      powershell: CLI_COMMAND_INSTALL_POWERSHELL,
    }

    const installCommand = commandMap[installMethod.value]
    const installDescription = t('download.cliStep2Content')

    const installSteps: StepItem[] = [
      {
        imgUrl: '',
        title: t('download.cliStep2Title'),
        content: installDescription,
        cliContent: {
          description: installDescription,
          commands: [installCommand],
        },
      },
    ]

    // 权限解决方案步骤：4种方案（无图片）
    const permissionSteps: StepItem[] = [
      {
        imgUrl: '',
        title: t('download.cliStep3Option1Title'),
        content: t('download.cliStep3Option1Desc'),
        cliContent: {
          description: t('download.cliStep3Option1Desc'),
          commands: [
            'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash',
            'source ~/.bashrc  # 或 source ~/.zshrc',
            'nvm install node',
            'nvm use node',
            'npm install -g @costrict/cs',
          ],
        },
      },
      {
        imgUrl: '',
        title: t('download.cliStep3Option2Title'),
        content: t('download.cliStep3Option2Desc'),
        cliContent: {
          description: t('download.cliStep3Option2Desc'),
          commands: [
            'mkdir ~/.npm-global',
            "npm config set prefix '~/.npm-global'",
            "echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc  # 或 ~/.zshrc",
            'source ~/.bashrc  # 或 source ~/.zshrc',
            'npm install -g @costrict/cs',
          ],
        },
      },
      {
        imgUrl: '',
        title: t('download.cliStep3Option3Title'),
        content: t('download.cliStep3Option3Desc'),
        cliContent: {
          description: t('download.cliStep3Option3Desc'),
          commands: ["'sudo npm install -g @costrict/cs"],
          note: t('download.cliStep3Option3Note'),
        },
      },
      {
        imgUrl: '',
        title: t('download.cliStep3Option4Title'),
        content: t('download.cliStep3Option4Desc'),
        cliContent: {
          description: t('download.cliStep3Option4Desc'),
          items: [t('download.cliStep3Option4Item1'), t('download.cliStep3Option4Item2')],
        },
      },
    ]

    return { installSteps, permissionSteps }
  })

  return {
    t,
    locale,
    images,
    tabList,
    headerTitle,
    headerIcon,
    stepList,
    cliStepLists,
    cliEnvRequirements,
  }
}
