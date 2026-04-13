export type TabType = 'vscode' | 'jetbrains' | 'cli'
export type InstallMethod = 'npm' | 'bash' | 'powershell'

export interface PermissionOption {
  title: string
  description: string
  commands?: string[]
  note?: string
  items?: string[]
}

export interface CliStepContent {
  description?: string
  command?: string
  commands?: string[]
  items?: string[]
  note?: string
  permissionOptions?: PermissionOption[]
  verifyCommand?: string
  verifyDescription?: string
}

export interface StepItem {
  imgUrl: string
  title: string
  content?: string
  cliContent?: CliStepContent
  tips?: string
}

export interface TabConfig {
  key: TabType
  icon: string
  titleKey: string
}

export interface DownloadImages {
  vscode: string
  jetbrains: string
  cli: string
  vscodeDisable: string
  jetbrainsDisable: string
  cliDisable: string
  jetbrainsContent: string
  vscodeIcon: string
  jetbrainsIcon: string
  cliIcon: string
  steps: {
    vscode: {
      zh: string[]
      en: string[]
    }
    cli: {
      zh: string[]
      en: string[]
    }
  }
}

export interface CliStepLists {
  installSteps: StepItem[]
  permissionSteps: StepItem[]
}

export interface CliEnvRequirements {
  osTitle: string
  osWindows: string
  osLinux: string
  osMacOS: string
  osContainer: string
  terminalTitle: string
  terminalWindows: string
  terminalUnix: string
  webModeTitle: string
  webModeContent: string
}
