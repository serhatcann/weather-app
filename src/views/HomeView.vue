<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AppCard from '@/components/AppCard.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import { type Weather } from '@/types/weather.interface'

const weatherList: Array<Weather> = [
  {
    id: 0,
    location: 'New York',
    temperature: 72,
    condition: 'Sunny',
    maxTemp: 78,
    minTemp: 65,
  },
  {
    id: 1,
    location: 'Los Angeles',
    temperature: 75,
    condition: 'Partly Cloudy',
    maxTemp: 80,
    minTemp: 68,
  },
  {
    id: 2,
    location: 'Chicago',
    temperature: 68,
    condition: 'Cloudy',
    maxTemp: 72,
    minTemp: 62,
  },
  {
    id: 3,
    location: 'Houston',
    temperature: 80,
    condition: 'Sunny',
    maxTemp: 85,
    minTemp: 75,
  },
  {
    id: 4,
    location: 'Phoenix',
    temperature: 85,
    condition: 'Sunny',
    maxTemp: 90,
    minTemp: 78,
  },
  {
    id: 5,
    location: 'Philadelphia',
    temperature: 70,
    condition: 'Rainy',
    maxTemp: 74,
    minTemp: 64,
  },
  {
    id: 6,
    location: 'San Antonio',
    temperature: 78,
    condition: 'Partly Cloudy',
    maxTemp: 82,
    minTemp: 72,
  },
  {
    id: 7,
    location: 'San Diego',
    temperature: 82,
    condition: 'Sunny',
    maxTemp: 85,
    minTemp: 76,
  },
  {
    id: 8,
    location: 'Dallas',
    temperature: 79,
    condition: 'Sunny',
    maxTemp: 84,
    minTemp: 73,
  },
  {
    id: 9,
    location: 'San Jose',
    temperature: 76,
    condition: 'Sunny',
    maxTemp: 80,
    minTemp: 70,
  },
]
</script>

<template>
  <AppLayout title="Weather Search">
    <div class="mb-6">
      <AppCard title="Search"> </AppCard>
    </div>
    <AppCard title="Results" v-if="weatherList.length > 0" class="flex flex-col gap-2">
      <WeatherCard :weather="weather" v-for="weather of weatherList" :key="weather.id">
      </WeatherCard>
    </AppCard>
  </AppLayout>
</template>
