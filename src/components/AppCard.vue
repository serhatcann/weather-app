<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 relative p-4">
    <h2 v-if="props.title" class="text-2xl font-medium text-gray-900 mb-2">{{ props.title }}</h2>
    <slot />
  </div>
</template>
