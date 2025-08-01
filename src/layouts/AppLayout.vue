<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-md mx-auto px-4 py-4 sm:max-w-2xl lg:max-w-4xl">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">
            {{ title }}
          </h1>
        </div>
      </div>
    </header>
    <main class="max-w-md mx-auto px-4 py-6 sm:max-w-2xl lg:max-w-4xl">
      <slot />
    </main>
  </div>
</template>
