<script setup lang="ts">
import AppCard from './AppCard.vue'
import { type Weather } from '@/types/weather.interface'

const props = defineProps<{
  weather: Weather
}>()
</script>

<template>
  <AppCard :title="props.weather.location">
    <div class="flex items-center justify-between">
      <!-- Left side: Weather info -->
      <div class="flex-1">
        <p class="text-lg font-medium mb-2">{{ props.weather.condition }}</p>
        <p class="text-3xl font-bold mb-2">{{ props.weather.temperature }}°</p>
        <div class="flex gap-4 text-sm text-gray-600">
          <span>Max: {{ props.weather.maxTemp }}°</span>
          <span>Min: {{ props.weather.minTemp }}°</span>
        </div>
      </div>

      <!-- Right side: Weather icon placeholder -->
      <div class="flex-shrink-0 ml-6">
        <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
          <weather-icon />
        </div>
      </div>
    </div>
  </AppCard>
</template>
