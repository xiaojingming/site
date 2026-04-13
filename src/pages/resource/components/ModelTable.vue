<template>
  <div class="model-table">
    <n-card title="模型对比" :bordered="true" size="small">
      <n-data-table :columns="columns" :data="tableData" :bordered="true" :single-line="false" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { NCard, NDataTable } from 'naive-ui'
import { type TableRow, getModelDataByVersion } from '../constants'
import type { DataTableColumn } from 'naive-ui'

// 定义组件名
defineOptions({
  name: 'ModelTable',
})

// 定义 props
interface Props {
  version: 'standard' | 'basic'
  deployment: 'custom' | 'aicp'
}

const props = defineProps<Props>()

// 根据版本获取表格数据
const tableData = computed(() => getModelDataByVersion(props.version))

// 定义列配置
const columns = computed(() => {
  const baseColumns: DataTableColumn<TableRow>[] = [
    {
      title: '模型类型',
      key: 'modelType',
      width: 120,
      fixed: 'left' as const,
    },
    {
      title: '占用卡数',
      key: 'cardCount',
      width: 100,
    },
    {
      title: '模型全称',
      key: 'fullName',
      width: 250,
    },
    {
      title: '模型大小/MoE大小',
      key: 'parameters',
      width: 160,
    },
    {
      title: '上下文窗口',
      key: 'contextWindow',
      width: 120,
    },
  ]

  // 如果是自定义安装或AICP部署方式，添加并发数列
  if (props.deployment === 'custom' || props.deployment === 'aicp') {
    baseColumns.push({
      title: '并发数',
      key: 'concurrency',
      width: 100,
      render() {
        return '-'
      },
    })
  }

  // 添加P90和TTFT列（在并发数后）
  baseColumns.push(
    {
      title: 'P90',
      key: 'p90',
      width: 100,
      render(row: TableRow) {
        return row.p90 !== undefined ? row.p90 : '-'
      },
    } as DataTableColumn<TableRow>,
    {
      title: 'TTFT',
      key: 'ttft',
      width: 100,
      render(row: TableRow) {
        return row.ttft !== undefined ? row.ttft : '-'
      },
    } as DataTableColumn<TableRow>
  )

  // 添加其他列
  baseColumns.push(
    {
      title: '问答25K(补全1K)上下文 每分钟并发数',
      key: 'concurrentRpm',
      width: 280,
      render(row: TableRow) {
        return `${row.concurrentRpm}${typeof row.concurrentRpm === 'number' ? ' RPM' : ''}`
      },
    } as DataTableColumn<TableRow>,
    {
      title: '问答25K(补全1K)上下文 最高吞吐(token/s)',
      key: 'maxThroughput',
      width: 320,
      render(row: TableRow) {
        return `${row.maxThroughput}${typeof row.maxThroughput === 'number' ? ' tokens/s' : ''}`
      },
    } as DataTableColumn<TableRow>,
    {
      title: '并发性能',
      key: 'performance',
      width: 400,
      render(row: TableRow) {
        return h(
          'div',
          {
            style: {
              whiteSpace: 'pre-wrap',
              lineHeight: '1.5',
            },
          },
          {
            default: () => row.performance || '-',
          },
        )
      },
    } as DataTableColumn<TableRow>
  )

  return baseColumns
})
</script>

<style scoped>
.model-table {
  margin-top: 24px;
}

:deep(.n-data-table-th) {
  font-weight: 600;
}

:deep(.n-data-table-td) {
  white-space: pre-wrap;
}
</style>
