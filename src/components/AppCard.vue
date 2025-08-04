<script setup lang="ts">
const props = defineProps<{
  title?: string
  loading?: boolean
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 relative p-4">
    <h2 v-if="props.title" class="text-2xl font-medium text-gray-900 mb-2">{{ props.title }}</h2>
    <div v-if="loading" class="animate-pulse flex flex-col gap-4">
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
    <slot v-else />
  </div>
</template>
