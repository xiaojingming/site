// 部署方式配置
export const DEPLOYMENT_CONFIG = {
  custom: {
    name: '自定义安装',
    description: '灵活配置模型和资源，满足个性化需求，适合有特殊要求的企业用户！',
  },
  aicp: {
    name: 'AICP',
    description: 'AICP平台集成方案，提供云端部署服务，简化运维管理！',
  },
}

// 版本配置
export const VERSION_CONFIG = {
  standard: {
    name: '标准版',
    description: 'GLM-4.5-FP8 领衔，复杂编码任务轻松驾驭，代码精准高效，大型项目提速利器！',
    models: {
      completion: 'DeepSeek-Coder-V2-Lite-Base',
      aiAgent: 'GLM-4.5-FP8',
      codeReview: 'Qwen3-Coder-30B-A3B',
      rag: {
        embedding: 'gte-modernbert-base',
        rerank: 'gte-reranker-modernbert-base',
      },
    },
    // 版本配置
    config: {
      supportedUsers: 5, // 每实例支持的用户数
      gpuType: 'H20', // GPU类型
      gpuCardsPerInstance: 1, // 每实例需要的GPU卡数
      maxCardsPerServer: 8, // 每台服务器最大卡数
    },
  },
  basic: {
    name: '入门版',
    description: 'GLM-4.5-AIR-FP8 坐镇，中小型编码需求轻松满足，成本更优，性价比之选！',
    models: {
      completion: 'DeepSeek-Coder-V2-Lite-Base',
      aiAgent: 'GLM-4.5-AIR-FP8',
      codeReview: 'Qwen3-Coder-30B-A3B',
      rag: {
        embedding: 'gte-modernbert-base',
        rerank: 'gte-reranker-modernbert-base',
      },
    },
    // 版本配置
    config: {
      supportedUsers: 4, // 每实例支持的用户数
      gpuType: '4090', //
      gpuCardsPerInstance: 1, // 每实例需要GPU类型的GPU卡数
      maxCardsPerServer: 8, // 每台服务器最大卡数
    },
  },
}
export interface TableRow {
  modelType: string // 模型类型
  cardCount: string // 占用卡数
  fullName: string // 模型全称
  parameters: string // 模型参数
  performance: string // 并发性能
  contextWindow: string // 上下文窗口
  concurrentRpm: number | string // 问答25K(补全1K)上下文 每分钟并发数
  maxThroughput: number | string // 问答25K(补全1K)上下文 最高吞吐(token/s)
  concurrency?: number // 并发数（仅在自定义安装和AICP版本显示）
  p90?: number | string
  ttft?: number | string
}

// 标准版模型对比数据
export const standardModelData: TableRow[] = [
  {
    modelType: '问答模型',
    cardCount: '4 卡',
    fullName: 'GLM-4.6-355B-A32B-FP8',
    parameters: '355B',
    performance:
      '支持150人编程人员，日活45人，每分钟3个并发请求。首Token响应延迟小于11秒，生成速率大于60 tokens/s',
    contextWindow: '128K',
    concurrentRpm: 3,
    maxThroughput: 63.35,
    p90: 35.17,
    ttft: 10.34,
  },
  {
    modelType: '补全模型',
    cardCount: '1 卡',
    fullName: 'DeepSeek-Coder-V2-Lite-Base',
    parameters: '16B',
    performance: '全程耗时小于1.2秒',
    contextWindow: '128K',
    concurrentRpm: 235,
    maxThroughput: 114,
  },
  {
    modelType: '嵌入模型',
    cardCount: '0.5 卡',
    fullName: 'all-MiniLM-L6-v2',
    parameters: '23M',
    performance: '',
    contextWindow: '-',
    concurrentRpm: '-',
    maxThroughput: '-',
  },
  {
    modelType: '召回模型',
    cardCount: '0.5 卡',
    fullName: 'ms-marco-MiniLM-L-6-v2',
    parameters: '23M',
    performance: '',
    contextWindow: '-',
    concurrentRpm: '-',
    maxThroughput: '-',
  },
]

// 入门版模型对比数据
export const basicModelData: TableRow[] = [
  {
    modelType: '问答模型',
    cardCount: '4 卡',
    fullName: 'GLM-4.5-106B-A12B-FP8',
    parameters: '106B/12B',
    performance:
      '支持300人编程人员，日活90人，每分钟11.4个并发请求。首Token相应延迟小于10秒，生成速率大于30 tokens/s',
    contextWindow: '128K',
    concurrentRpm: 11,
    maxThroughput: 44,
    p90: 11.71,
    ttft: 4.82,
  },
  {
    modelType: '补全模型',
    cardCount: '1 卡',
    fullName: 'DeepSeek-Coder-V2-Lite-Base',
    parameters: '16B',
    performance: '全程耗时小于1.5秒',
    contextWindow: '128K',
    concurrentRpm: 135,
    maxThroughput: 73,
  },
  {
    modelType: '嵌入模型',
    cardCount: '0.5 卡',
    fullName: 'all-MiniLM-L6-v2',
    parameters: '23M',
    performance: '',
    contextWindow: '-',
    concurrentRpm: '-',
    maxThroughput: '-',
  },
  {
    modelType: '召回模型',
    cardCount: '0.5 卡',
    fullName: 'ms-marco-MiniLM-L-6-v2',
    parameters: '23M',
    performance: '',
    contextWindow: '-',
    concurrentRpm: '-',
    maxThroughput: '-',
  },
]

// 自定义安装版本模型对比数据
export const customModelData: TableRow[] = [
  {
    modelType: '问答模型',
    cardCount: '4 卡',
    fullName: 'GLM-4.5-355B-A32B-FP8',
    parameters: '355B/32B',
    performance:
      '支持200人编程人员，日活60人，每分钟8个并发请求。首Token相应延迟小于10秒，生成速率大于30 tokens/s',
    contextWindow: '128K',
    concurrentRpm: 8,
    maxThroughput: 25,
    concurrency: 150,
  },
  {
    modelType: '审查模型',
    cardCount: '2 卡',
    fullName: 'Qwen3-Coder-30B-A3B',
    parameters: '30B/3B',
    performance: '',
    contextWindow: '262K',
    concurrentRpm: 45,
    maxThroughput: 35,
    concurrency: 80,
  },
  {
    modelType: '补全模型',
    cardCount: '1 卡',
    fullName: 'DeepSeek-Coder-V2-Lite-Base',
    parameters: '16B',
    performance: '全程耗时小于1.0秒',
    contextWindow: '128K',
    concurrentRpm: 180,
    maxThroughput: 100,
    concurrency: 300,
  },
  {
    modelType: '嵌入模型',
    cardCount: '0.5 卡',
    fullName: 'all-MiniLM-L6-v2',
    parameters: '23M',
    performance: '',
    contextWindow: '-',
    concurrentRpm: '-',
    maxThroughput: '-',
    concurrency: 500,
  },
  {
    modelType: '召回模型',
    cardCount: '0.5 卡',
    fullName: 'ms-marco-MiniLM-L-6-v2',
    parameters: '23M',
    performance: '',
    contextWindow: '-',
    concurrentRpm: '-',
    maxThroughput: '-',
    concurrency: 500,
  },
]

// AICP版本模型对比数据
export const aicpModelData: TableRow[] = [
  {
    modelType: '问答模型',
    cardCount: '4 卡',
    fullName: 'GLM-4.5-355B-A32B-FP8',
    parameters: '355B/32B',
    performance:
      '支持400人编程人员，日活120人，每分钟16个并发请求。首Token相应延迟小于10秒，生成速率大于30 tokens/s',
    contextWindow: '128K',
    concurrentRpm: 16,
    maxThroughput: 30,
    concurrency: 250,
  },
  {
    modelType: '审查模型',
    cardCount: '2 卡',
    fullName: 'Qwen3-Coder-30B-A3B',
    parameters: '30B/3B',
    performance: '',
    contextWindow: '262K',
    concurrentRpm: 70,
    maxThroughput: 40,
    concurrency: 120,
  },
  {
    modelType: '补全模型',
    cardCount: '1 卡',
    fullName: 'DeepSeek-Coder-V2-Lite-Base',
    parameters: '16B',
    performance: '全程耗时小于0.8秒',
    contextWindow: '128K',
    concurrentRpm: 250,
    maxThroughput: 120,
    concurrency: 450,
  },
  {
    modelType: '嵌入模型',
    cardCount: '0.5 卡',
    fullName: 'all-MiniLM-L6-v2',
    parameters: '23M',
    performance: '',
    contextWindow: '-',
    concurrentRpm: '-',
    maxThroughput: '-',
    concurrency: 800,
  },
  {
    modelType: '召回模型',
    cardCount: '0.5 卡',
    fullName: 'ms-marco-MiniLM-L-6-v2',
    parameters: '23M',
    performance: '',
    contextWindow: '-',
    concurrentRpm: '-',
    maxThroughput: '-',
    concurrency: 800,
  },
]

// 根据版本获取模型数据
export const getModelDataByVersion = (version: 'standard' | 'basic'): TableRow[] => {
  return version === 'standard' ? standardModelData : basicModelData
}

// 模型配置数据
export const MODEL_CONFIG = {
  // 代码补全模型配置
  completionModels: {
    'DeepSeek-Coder-V2-Lite-Base': {
      cardsPerServer: 1, // 在8卡服务器中占用的卡数
    },
  },

  // RAG模型配置
  ragModels: {
    'gte-modernbert-base': {
      cardsPerServer: 1, // 在8卡服务器中占用的卡数
    },
    'gte-reranker-modernbert-base': {
      cardsPerServer: 1, // 在8卡服务器中占用的卡数
    },
  },

  // AI程序员/AI Agent模型配置
  aiAgentModels: {
    // 模型部署类型
    'DeepSeek-V3-0324': {
      cardsPerServer: 4, // 在8卡服务器中占用的卡数
    },
    // 新增低配版AI Agent模型
    'GLM-4.5-AIR-FP8': {
      cardsPerServer: 4, // 在8卡服务器中占用的卡数
    },
    // 新增高配版AI Agent模型
    'GLM-4.5-FP8': {
      cardsPerServer: 4, // 在8卡服务器中占用的卡数
    },
    'Qwen2.5-Coder-32B-Instruct': {
      cardsPerServer: 2, // 在8卡服务器中占用的卡数
    },
  },

  // Code Review 模型配置
  codeReviewModels: {
    'Qwen3-Coder-30B-A3B': {
      cardsPerServer: 2, // 在8卡服务器中占用的卡数
    },
  },

  // 后台服务配置
  backendService: {
    supportedUsers: 1000, // 每后台实例支持的用户数
    cpuCores: 64, // 每实例需要的CPU核心数
    memory: 128, // 每实例需要的内存（GB）
    disk: 1, // 每实例需要的磁盘（TB）
  },

  // GPU服务器配置
  gpuServer: {
    '4090': {
      maxCardsPerServer: 8, // 每台服务器最多可安装的GPU卡数
      serverPrices: {
        8: 320000, // 8卡4090服务器整体价格32万
      },
      vramPerCard: 48, // 每张卡的显存容量(GB)
    },
    H20: {
      maxCardsPerServer: 8, // 每台服务器最多可安装的GPU卡数
      // H20 服务器整体价格
      serverPrices: {
        8: 1300000, // 8卡 H20 服务器价格
      },
      vramPerCard: 141, // 每张卡的显存容量(GB)
    },
  },
}
