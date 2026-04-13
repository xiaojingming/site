// 类型定义

// 部署方式类型
export type DeploymentMode = 'custom' | 'aicp'

// 版本模式类型
export type VersionMode = 'basic' | 'standard'

// 预置模式类型（保留以兼容现有功能）
export type PresetMode = 'standard' | 'custom'

export enum CostType {
  low = 'low',
  medium = 'medium',
  high = 'high',
}
export const Cost = {
  [CostType.low]: '低',
  [CostType.medium]: '中',
  [CostType.high]: '高',
} as const

export enum EffectType {
  excellent = 'excellent',
  good = 'good',
  medium = 'medium',
  bad = 'bad',
}
export const Effect = {
  [EffectType.excellent]: '优',
  [EffectType.good]: '良',
  [EffectType.medium]: '中',
  [EffectType.bad]: '差',
} as const
export interface DeploymentModel {
  type: 'deployment'
  supportedUsers: number
  gpuType: string
  gpuCardsPerInstance: number
  cost: keyof typeof Cost // 成本标签：'低', '中', '高'
  effect: keyof typeof Effect // 效果标签：'优', '良', '中', '差'
}

export interface RagModel {
  supportedUsers: number
  gpuType: string
  gpuCardsPerInstance: number
  cost: keyof typeof Cost // 成本标签：'低', '中', '高'
  effect: keyof typeof Effect // 效果标签：'优', '良', '中', '差'
}

export interface RagResult {
  embeddingModelName: string        // Embedding 模型名称
  rerankModelName: string          // Rerank 模型名称
  embeddingInstancesNeeded: number  // Embedding 模型所需实例数量
  rerankInstancesNeeded: number    // Rerank 模型所需实例数量
  embeddingGpuServers: GpuServers  // Embedding 模型 GPU 服务器配置
  rerankGpuServers: GpuServers    // Rerank 模型 GPU 服务器配置
  embeddingSupportedUsers: number  // Embedding 模型支持用户数
  rerankSupportedUsers: number    // Rerank 模型支持用户数
}


export interface GpuServers {
  type: string
  servers: Record<string, number>
  totalCards: number
  serverCount?: number // 服务器数量（可选）
}

export interface CompletionResult {
  modelName: string
  instancesNeeded: number
  gpuServers: GpuServers
}

export interface AIAgentResult {
  modelName: string
  type: 'deployment'
  ratio: number
  usersForThisModel: number
  instancesNeeded?: number
  gpuServers?: GpuServers
}

export interface CodeReviewResult {
  modelName: string
  type: 'deployment'
  usersForThisModel: number
  instancesNeeded: number
  gpuServers: GpuServers
}

export interface BackendResult {
  instancesNeeded: number
  totalCpuCores: number
  totalMemory: number
  totalDisk: number
}

// 结果数据类型定义
export interface Results {
  completion: CompletionResult | null
  aiAgent: AIAgentResult[]
  codeReview: CodeReviewResult | null
  rag: RagResult | null
  backend: BackendResult | null
}

// 总资源统计类型定义
export interface TotalResources {
  gpuServers: Record<string, {
    servers: Record<string, number>;
    totalCards: number;
    totalVram: number; // 总显存(GB)
  }>
  cpuCores: number
  memory: number
  disk: number
  gpuCosts: number
  totalVram: number // 总显存(GB)
}

export interface FormData {
  developerCount: number
  vscodeActiveRatio: number
  vscodeActiveUsers: number
  concurrentDeveloperCount: number
  concurrentCoefficient: number  // 新增并发系数字段
  enableCodeCompletion: boolean
  selectedCompletionModel: string
  enableAIAgent: boolean
  selectedAIModels: Record<string, boolean>
  modelRatios: Record<string, number>
  enableCodeReview: boolean
  selectedCodeReviewModel: string
  enableRAG: boolean
  selectedRAGEmbeddingModel: string
  selectedRAGRerankModel: string
  presetMode: PresetMode
  versionMode: VersionMode  // 版本模式字段
  deploymentMode: DeploymentMode  // 部署方式字段
}

// AICP服务类型定义
export interface AicpService {
  deployment: {
    name: string
    description: string
    price: number
  }
  technicalSupport: {
    phoneSupport: {
      name: string
    }
    maintenance: {
      name: string
    }
  }
}

// Costrict服务类型定义
export interface CostrictService {
  deployment: {
    name: string
    description: string
    price: number
  }
  technicalSupport: {
    online: {
      name: string
      description: string
      price: number
    }
    offline: {
      name: string
      description: string
      price: number
    }
  }
  consulting: {
    training: {
      name: string
      description: string
      price: number
    }
    development: {
      name: string
      description: string
      price: number
    }
  }
}

// AICP服务数据
export const AICP_SERVICES: AicpService = {
  deployment: {
    name: '部署服务',
    description: '部署AICP————AICP部署一台裸金属GPU服务器',
    price: 5000
  },
  technicalSupport: {
    phoneSupport: {
      name: '400（诸葛神码+AICP）————AICP算力平台软件费用10%',
    },
    maintenance: {
      name: '维保升级 (诸葛神码+AICP)————AICP算力平台软件费用10%',
    }
  }
}

// Costrict服务数据
export const COSTRICT_SERVICES: CostrictService = {
  deployment: {
    name: '部署服务',
    description: '部署对接CoStrict————一套CoStrict',
    price: 10000
  },
  technicalSupport: {
    online: {
      name: '7*24小时AI智能客服、线上技术支持',
      description: '6000元/人天',
      price: 6000
    },
    offline: {
      name: '线下技术支持、维保升级',
      description: '1万/人天',
      price: 10000
    }
  },
  consulting: {
    training: {
      name: '提供企业AI Coding使用赋能培训',
      description: '一次3课时2万',
      price: 20000
    },
    development: {
      name: '提供二次开发培训指导服务培训',
      description: '一次3课时2万',
      price: 20000
    }
  }
}
