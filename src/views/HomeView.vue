<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AppCard from '@/components/AppCard.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import SearchCard from '@/components/SearchCard.vue'
import { useWeatherStore } from '@/stores/weather'
import { computed } from 'vue'

const weatherStore = useWeatherStore()
const isLoading = computed(() => weatherStore.locationList.length > 0 && weatherStore.weatherList.length === 0)

</script>

<template>
  <AppLayout title="Weather Search">
    <div class="mb-6">
      <SearchCard />
    </div>
    <AppCard title="Results" v-if="weatherStore.locationList.length > 0" :loading="isLoading"
      class="flex flex-col gap-2">
      <WeatherCard :weather="weather" v-for="weather of weatherStore.weatherList"
        :key="weather.id" />
    </AppCard>
  </AppLayout>
</template>
