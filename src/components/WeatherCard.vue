<script setup lang="ts">
import AppCard from './AppCard.vue'
import { type Weather } from '@/types/weather.interface'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()

const props = defineProps<{
  weather: Weather
}>()

const removeWeather = () => {
  weatherStore.removeWeather(props.weather.id)
}
</script>

<template>
  <AppCard :title="props.weather.location">
    <button
      @click="removeWeather"
      class="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold"
    >
      X
    </button>
    <div class="flex items-center justify-center">
      <div class="flex flex-1/2 flex-col gap-2">
        <p class="text-lg font-medium">{{ props.weather.condition }}</p>
        <p class="text-3xl font-bold">{{ props.weather.temperature }}°</p>
        <div class="flex gap-2 text-sm text-gray-600">
          <span>Max: {{ props.weather.maxTemp }}°</span>
          -
          <span>Min: {{ props.weather.minTemp }}°</span>
        </div>
      </div>
      <div class="flex-1/2 flex items-center justify-start">
        <div class="rounded-lg text-6xl flex items-center justify-center">
          {{ props.weather.icon }}
        </div>
      </div>
    </div>
  </AppCard>
</template>
