<script setup lang="ts">
import { ref, watch } from 'vue'

defineOptions({
  name: 'InstallMethodTabs',
})

export type InstallMethod = 'npm' | 'bash' | 'powershell'

const props = defineProps<{
  activeMethod?: InstallMethod
}>()

const currentMethod = ref<InstallMethod>(props.activeMethod || 'bash')

watch(
  () => props.activeMethod,
  (newMethod) => {
    if (newMethod) {
      currentMethod.value = newMethod
    }
  },
)

const emit = defineEmits<{
  (e: 'change', method: InstallMethod): void
}>()

const handleMethodChange = (method: InstallMethod) => {
  currentMethod.value = method
  emit('change', method)
}

const methods: { key: InstallMethod; label: string }[] = [
  { key: 'bash', label: 'Bash / Zsh' },
  { key: 'npm', label: 'npm' },
  { key: 'powershell', label: 'PowerShell' },
]
</script>

<template>
  <div class="install-tabs">
    <button
      v-for="method in methods"
      :key="method.key"
      class="tab-btn"
      :class="{ active: currentMethod === method.key }"
      @click="handleMethodChange(method.key)"
    >
      {{ method.label }}
    </button>
  </div>
</template>

<style lang="less" scoped>
.install-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 24px 0;
  width: 100%;
  background: #2d2d2d;
  border-radius: 12px 12px 0 0;

  @media (max-width: 640px) {
    padding: 12px 16px 0;
  }

  @media (max-width: 480px) {
    padding: 10px 12px 0;
  }
}

.tab-btn {
  flex: 1;
  min-width: 80px;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: #888;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  position: relative;
  text-align: center;
  white-space: nowrap;

  &:hover {
    color: #bbb;
  }

  &.active {
    color: #fff;
    border-bottom-color: #5b9cff;
  }

  @media (max-width: 768px) {
    min-width: 70px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 640px) {
    min-width: 60px;
    padding: 8px 10px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    min-width: 0;
    padding: 8px 6px;
    font-size: 11px;
    white-space: normal;
    line-height: 1.3;
  }
}
</style>
