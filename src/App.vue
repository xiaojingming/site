<script setup lang="ts">
import { onMounted } from 'vue'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { usePagePrefetch } from '@/composables/usePagePrefetch'

const { prefetchAllRoutes } = usePagePrefetch()

onMounted(() => {
  prefetchAllRoutes()
})
</script>

<template>
  <NConfigProvider>
    <NavBar />
    <n-message-provider>
      <main>
        <NuxtPage />
      </main>
    </n-message-provider>
  </NConfigProvider>
</template>
