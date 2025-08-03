<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'

const props = defineProps<{
  name: string
  size: "sm" | "md" | "lg" | "xl"
}>()

const AsyncComponent = defineAsyncComponent(
  () => import(`@/assets/icons/${props.name}.svg?component`),
)

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44'
  }
  return sizes[props.size]
})
</script>

<template>
  <component :is="AsyncComponent" v-if="AsyncComponent" :class="sizeClasses" />
  <div v-else :class="`${sizeClasses} animate-pulse bg-gray-200 rounded`"></div>
</template>
