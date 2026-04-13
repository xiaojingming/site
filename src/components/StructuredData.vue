<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'StructuredData' })

interface SchemaProps {
  schemaType: string
  data: Record<string, unknown>
}

const props = defineProps<SchemaProps>()

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': props.schemaType,
  ...props.data,
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify(jsonLd.value)),
    },
  ],
})
</script>

<template>
  <span style="display: none"></span>
</template>
