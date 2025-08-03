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
    <div v-if="currentWeather">
    <p class="text-lg">Today</p>
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-2">
        <p class="text-lg font-medium">{{ currentWeather.condition }}</p>
        <p class="text-3xl font-bold">{{ currentWeather.temperature }}°</p>
        <div class="flex gap-2 text-sm text-gray-600">
          <span>Max: {{ currentWeather.maxTemp }}°</span>
          -
          <span>Min: {{ currentWeather.minTemp }}°</span>
        </div>
      </div>
          <WeatherIcon :name="currentWeather.icon" size="xl" />
    </div>
      <div v-if="currentWeather.forecast" class="border-t pt-2">
        <h3 class="text-sm font-semibold mb-2">5-Day Forecast</h3>
        <div class="space-y-1">
          <div v-for="day in currentWeather.forecast" :key="day.date" class="flex items-center justify-between py-1 border-b border-gray-100 last:border-b-0">
            <div class="flex items-center gap-2">
              <WeatherIcon :name="day.icon" size="sm" />
              <div>
                <p class="text-xs font-medium">{{ new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) }}</p>
                <p class="text-xs text-gray-600">{{ day.condition }}</p>
              </div>
            </div>
            <div class="text-right text-xs">
              <span class="font-semibold">{{ day.maxTemp }}°</span>
              -
              <span class="text-gray-500">{{ day.minTemp }}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center p-4">
      <p class="text-gray-500 text-sm">Loading weather data...</p>
    </div>
  </AppCard>
</template>
