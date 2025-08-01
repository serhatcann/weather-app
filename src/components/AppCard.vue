<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <h2 v-if="props.title" class="text-lg font-medium text-gray-900 mb-4">{{ props.title }}</h2>
    <slot />
  </div>
</template>
