<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const props = defineProps<{
  name: string
}>()

const AsyncComponent = defineAsyncComponent(
  () => import(`@/assets/icons/${props.name}.svg?component`),
)
</script>

<template>
  <component :is="AsyncComponent" v-if="AsyncComponent" class="w-44 h-44" />
  <div v-else class="w-44 h-44 animate-pulse bg-gray-200 rounded"></div>
</template>
