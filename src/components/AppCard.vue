<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <h2 v-if="title" class="text-lg font-medium text-gray-900 mb-4">{{ title }}</h2>
    <slot />
  </div>
</template>
