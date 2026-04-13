import { reactive } from 'vue'
import type { GpuServers, FormData, Results, TotalResources } from '../types'
import { MODEL_CONFIG, VERSION_CONFIG } from '../constants'

export function useResourceCalculator() {
  // 结果数据
  const results = reactive<Results>({
    completion: null,
    aiAgent: [],
    codeReview: null,
    rag: null,
    backend: null,
  })

  // 总资源统计
  const totalResources = reactive<TotalResources>({
    gpuServers: {},
    cpuCores: 0,
    memory: 0,
    disk: 0,
    gpuCosts: 0,
    totalVram: 0,
  })


  // 计算GPU成本 - 按照完整的8卡服务器数量计算
  const calculateGpuCost = (gpuType: string, servers: Record<string, number>) => {
    const gpuConfig = MODEL_CONFIG.gpuServer[gpuType as keyof typeof MODEL_CONFIG.gpuServer]
    let totalCost = 0

    const config = gpuConfig as {
      maxCardsPerServer: number
      serverPrices: Record<number, number>
    }
    
    Object.entries(servers).forEach(([cardConfig, serverCount]) => {
      let serverCost = 0
      const cardCount = parseInt(cardConfig.replace('卡', ''))

      // 现在所有服务器都是8卡完整配置，直接使用8卡价格
      if (cardCount === 8 && config.serverPrices && config.serverPrices[8]) {
        serverCost = config.serverPrices[8]
      } else {
        // 如果不是8卡或者没有预定义的8卡价格，使用基准价格按比例计算
        const basePrice = config.serverPrices?.[8] || getBaseGpuPrice(gpuType)
        serverCost = (basePrice * cardCount) / 8
      }

      totalCost += serverCost * serverCount
    })

    return totalCost
  }

  // 计算GPU总显存
  const calculateTotalVram = (gpuType: string, totalCards: number) => {
    const vramPerCard =
      MODEL_CONFIG.gpuServer[gpuType as keyof typeof MODEL_CONFIG.gpuServer].vramPerCard
    return totalCards * vramPerCard
  }

  // 更新总GPU资源 - 基于总并发用户数计算服务器需求
  const updateTotalGpuResources = (gpuServers: GpuServers) => {
    const gpuType = gpuServers.type

    if (!totalResources.gpuServers[gpuType]) {
      totalResources.gpuServers[gpuType] = {
        servers: {},
        totalCards: 0,
        totalVram: 0,
      }
    }

    // 累加服务器数量
    Object.entries(gpuServers.servers).forEach(([cardConfig, serverCount]) => {
      if (!totalResources.gpuServers[gpuType].servers[cardConfig]) {
        totalResources.gpuServers[gpuType].servers[cardConfig] = 0
      }
      totalResources.gpuServers[gpuType].servers[cardConfig] += serverCount
    })

    // 计算总卡数
    let totalCards = 0
    Object.entries(totalResources.gpuServers[gpuType].servers).forEach(([cardConfig, serverCount]) => {
      const cardCount = parseInt(cardConfig.replace('卡', ''))
      totalCards += cardCount * serverCount
    })

    totalResources.gpuServers[gpuType].totalCards = totalCards

    // 计算总显存
    const totalVram = calculateTotalVram(gpuType, totalCards)
    totalResources.gpuServers[gpuType].totalVram = totalVram
  }

  // 计算代码补全模型资源 - 基于版本配置
  const calculateCompletionResources = (formData: FormData, concurrentDeveloperCount: number, servers: Record<string, number>) => {
    if (!formData.enableCodeCompletion) {
      results.completion = null
      return
    }

    // 根据版本获取配置
    const versionConfig = VERSION_CONFIG[formData.versionMode]
    if (versionConfig && versionConfig.config) {
      const config = versionConfig.config
      const instancesNeeded = Math.ceil(concurrentDeveloperCount / config.supportedUsers)
      
      // 创建GPU服务器配置
      const gpuServers: GpuServers = {
        type: config.gpuType,
        servers: { ...servers },
        totalCards: config.maxCardsPerServer,
        serverCount: 1,
      }

      results.completion = {
        modelName: formData.selectedCompletionModel,
        instancesNeeded,
        gpuServers,
      }
    }
  }

  // 计算AI Agent资源 - 基于版本配置
  const calculateAIAgentResources = (formData: FormData, concurrentDeveloperCount: number, servers: Record<string, number>) => {
    results.aiAgent = []

    if (!formData.enableAIAgent) {
      return
    }

    // 根据版本获取配置
    const versionConfig = VERSION_CONFIG[formData.versionMode]
    if (versionConfig && versionConfig.config) {
      const config = versionConfig.config
      const selectedModels = Object.keys(formData.selectedAIModels).filter(
        (model) => formData.selectedAIModels[model],
      )

      selectedModels.forEach((modelName) => {
        const ratio = (formData.modelRatios[modelName] || 100) / 100
        const usersForThisModel = Math.ceil(concurrentDeveloperCount * ratio)
        const instancesNeeded = Math.ceil(usersForThisModel / config.supportedUsers)
        
        // 创建GPU服务器配置
        const gpuServers: GpuServers = {
          type: config.gpuType,
          servers: { ...servers },
          totalCards: config.maxCardsPerServer,
          serverCount: 1,
        }

        results.aiAgent.push({
          modelName,
          type: 'deployment',
          ratio: formData.modelRatios[modelName] || 100,
          usersForThisModel,
          instancesNeeded,
          gpuServers,
        })
      })
    }
  }

  // 计算Code Review资源 - 基于版本配置
  const calculateCodeReviewResources = (formData: FormData, concurrentDeveloperCount: number, servers: Record<string, number>) => {
    results.codeReview = null

    if (!formData.enableCodeReview) {
      return
    }

    // 根据版本获取配置
    const versionConfig = VERSION_CONFIG[formData.versionMode]
    if (versionConfig && versionConfig.config) {
      const config = versionConfig.config
      const usersForThisModel = concurrentDeveloperCount
      const instancesNeeded = Math.ceil(usersForThisModel / config.supportedUsers)
      
      // 创建GPU服务器配置
      const gpuServers: GpuServers = {
        type: config.gpuType,
        servers: { ...servers },
        totalCards: config.maxCardsPerServer,
        serverCount: 1,
      }

      results.codeReview = {
        modelName: formData.selectedCodeReviewModel,
        type: 'deployment',
        usersForThisModel,
        instancesNeeded,
        gpuServers,
      }
    }
  }

  // 计算RAG资源 - 基于版本配置
  const calculateRAGResources = (formData: FormData, concurrentDeveloperCount: number, servers: Record<string, number>) => {
    results.rag = null

    // 只有启用RAG功能时才计算
    if (formData.enableRAG) {
      // 根据版本获取配置
      const versionConfig = VERSION_CONFIG[formData.versionMode]
      if (versionConfig && versionConfig.config) {
        const config = versionConfig.config
        
        const instancesNeeded = Math.ceil(concurrentDeveloperCount / config.supportedUsers)
        
        // 创建统一的GPU服务器配置 - Embedding和Rerank共占1卡
        const ragGpuServers: GpuServers = {
          type: config.gpuType,
          servers: { ...servers },
          totalCards: config.maxCardsPerServer,
          serverCount: 1,
        }

        results.rag = {
          embeddingModelName: formData.selectedRAGEmbeddingModel,
          rerankModelName: formData.selectedRAGRerankModel,
          embeddingInstancesNeeded: instancesNeeded,
          rerankInstancesNeeded: instancesNeeded,
          embeddingGpuServers: ragGpuServers,
          rerankGpuServers: ragGpuServers,
          embeddingSupportedUsers: config.supportedUsers,
          rerankSupportedUsers: config.supportedUsers,
        }
      }
    }
  }

  // 计算后台服务资源
  const calculateBackendResources = (concurrentDeveloperCount: number) => {
    const backendConfig = MODEL_CONFIG.backendService
    const backendInstancesNeeded = Math.ceil(
      concurrentDeveloperCount / backendConfig.supportedUsers,
    )
    const totalCpuCores = backendInstancesNeeded * backendConfig.cpuCores
    const totalMemory = backendInstancesNeeded * backendConfig.memory
    const totalDisk = backendInstancesNeeded * backendConfig.disk

    // 更新总资源
    totalResources.cpuCores += totalCpuCores
    totalResources.memory += totalMemory
    totalResources.disk += totalDisk

    results.backend = {
      instancesNeeded: backendInstancesNeeded,
      totalCpuCores,
      totalMemory,
      totalDisk,
    }
  }

  // 计算GPU成本构成详情并更新总成本 - 按照完整的8卡服务器计算
  const calculateGpuCostsAndBreakdown = () => {
    totalResources.gpuCosts = 0
    const breakdown: Array<{
      gpuType: string
      servers: Record<string, number>
      totalCards: number
      cost: number
      costPerServer: Record<string, number>
    }> = []

    Object.entries(totalResources.gpuServers).forEach(([gpuType, gpuData]) => {
      const cost = calculateGpuCost(gpuType, gpuData.servers)
      const costPerServer: Record<string, number> = {}

      // 累加到总成本
      totalResources.gpuCosts += cost

      // 统一计算方式：所有服务器都是8卡完整配置，使用8卡价格
      const config = MODEL_CONFIG.gpuServer[gpuType as keyof typeof MODEL_CONFIG.gpuServer] as {
        maxCardsPerServer: number
        serverPrices: Record<number, number>
      }
      Object.entries(gpuData.servers).forEach(([cardConfig]) => {
        // 现在所有服务器都是8卡配置，直接使用8卡价格
        if (config.serverPrices && config.serverPrices[8]) {
          costPerServer[cardConfig] = config.serverPrices[8]
        } else {
          // 如果没有预定义的8卡价格，使用基准价格
          costPerServer[cardConfig] = getBaseGpuPrice(gpuType)
        }
      })

      breakdown.push({
        gpuType,
        servers: gpuData.servers,
        totalCards: gpuData.totalCards,
        cost,
        costPerServer,
      })
    })

    return breakdown
  }

  // 获取GPU基准价格（8卡服务器价格）
  const getBaseGpuPrice = (gpuType: string): number => {
    switch (gpuType) {
      case '4090':
        return 320000
      case 'H20':
        return 1300000
      case 'H100':
        return 2000000 // 假设H100的基准价格
      default:
        return 320000 // 默认使用4090的价格
    }
  }

  // 重置总资源
  const resetTotalResources = () => {
    totalResources.gpuServers = {}
    totalResources.cpuCores = 0
    totalResources.memory = 0
    totalResources.disk = 0
    totalResources.gpuCosts = 0
    totalResources.totalVram = 0
  }

  // 计算总显存
  const calculateTotalSystemVram = () => {
    let totalVram = 0
    Object.values(totalResources.gpuServers).forEach((gpuData) => {
      totalVram += gpuData.totalVram
    })
    totalResources.totalVram = totalVram
  }

  // 主要计算函数 - 基于版本配置和并发用户数计算服务器需求
  const calculateResources = (formData: FormData) => {
    const concurrentDeveloperCount = formData.concurrentDeveloperCount

    // 重置总资源和结果
    resetTotalResources()
    results.completion = null
    results.aiAgent = []
    results.codeReview = null
    results.rag = null
    results.backend = null

    // 根据版本获取配置
    const versionConfig = VERSION_CONFIG[formData.versionMode]
    if (!versionConfig || !versionConfig.config) {
      return
    }

    const config = versionConfig.config

    // 基于版本配置的支持用户数计算服务器数量
    const totalServerCount = Math.ceil(concurrentDeveloperCount / config.supportedUsers)

    // 创建统一的服务器配置 - 每台服务器都是8卡完整配置
    const servers: Record<string, number> = {}
    if (totalServerCount > 0) {
      servers[`${config.maxCardsPerServer}卡`] = totalServerCount
    }

    // 计算各项资源（使用统一的服务器配置）
    calculateCompletionResources(formData, concurrentDeveloperCount, servers)
    calculateAIAgentResources(formData, concurrentDeveloperCount, servers)
    calculateCodeReviewResources(formData, concurrentDeveloperCount, servers)
    calculateRAGResources(formData, concurrentDeveloperCount, servers)
    
    // 在主计算函数中更新总GPU资源
    if (totalServerCount > 0) {
      const gpuServers: GpuServers = {
        type: config.gpuType,
        servers: { ...servers },
        totalCards: config.maxCardsPerServer * totalServerCount,
        serverCount: totalServerCount,
      }
      updateTotalGpuResources(gpuServers)
    }
    
    calculateBackendResources(concurrentDeveloperCount)
    calculateTotalSystemVram() // 计算总显存
    calculateGpuCostsAndBreakdown() // 最后计算GPU成本
  }

  // 初始化AI模型选择
  // const initializeAIModelSelection = (formData: FormData) => {
  //   const deploymentModelNames = Object.keys(MODEL_CONFIG.aiAgentModels).filter(
  //     (name) =>
  //       MODEL_CONFIG.aiAgentModels[name as keyof typeof MODEL_CONFIG.aiAgentModels].type ===
  //       'deployment',
  //   )

  //   if (
  //     deploymentModelNames.length > 0 &&
  //     !Object.values(formData.selectedAIModels).some(Boolean)
  //   ) {
  //     formData.selectedAIModels[deploymentModelNames[0]] = true
  //     formData.modelRatios[deploymentModelNames[0]] = 100
  //   }
  // }

  return {
    results,
    totalResources,
    calculateResources,
    // initializeAIModelSelection,
    calculateGpuCostsAndBreakdown,
  }
}
