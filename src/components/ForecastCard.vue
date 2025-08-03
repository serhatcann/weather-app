<script setup lang="ts">
import AppCard from './AppCard.vue'
import WeatherIcon from './WeatherIcon.vue'
import { useWeatherStore } from '@/stores/weather'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const weatherStore = useWeatherStore()
const route = useRoute()

const currentWeather = computed(() => {
  return weatherStore.weatherList.find(weather => weather.location === route.params.zipcode)
})

</script>

<template>
  <AppCard :title="currentWeather?.location || 'Loading...'">
    <div v-if="currentWeather" class="flex items-center justify-center">
      <div class="flex flex-1/2 flex-col gap-2">
        <p class="text-lg font-medium">{{ currentWeather.condition }}</p>
        <p class="text-3xl font-bold">{{ currentWeather.temperature }}°</p>
        <div class="flex gap-2 text-sm text-gray-600">
          <span>Max: {{ currentWeather.maxTemp }}°</span>
          -
          <span>Min: {{ currentWeather.minTemp }}°</span>
        </div>
      </div>
      <div class="flex-1/2 flex items-center justify-start">
        <div class="rounded-lg flex items-center justify-center">
          <WeatherIcon :name="currentWeather.icon" />
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center p-8">
      <p class="text-gray-500">Loading weather data...</p>
    </div>
  </AppCard>
</template>
