<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AppCard from '@/components/AppCard.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import SearchCard from '@/components/SearchCard.vue'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()
</script>

<template>
  <AppLayout title="Weather Search">
    <div class="mb-6">
      <SearchCard />
    </div>
    <AppCard title="Results" v-if="weatherStore.weatherList.length > 0" class="flex flex-col gap-2">
      <WeatherCard :weather="weather" v-for="weather of weatherStore.weatherList" :key="weather.id" />
    </AppCard>
  </AppLayout>
</template>
