<script setup lang="ts">
import AppCard from './AppCard.vue'
import { useWeatherStore } from '@/stores/weather'
import { ref } from 'vue'

const weatherStore = useWeatherStore()
const searchLocation = ref('')
const errorMessage = ref('')

const addLocation = () =>
{
  if (!searchLocation.value.trim()) return

  try
  {
    errorMessage.value = ''
    weatherStore.addWeather(searchLocation.value)
    searchLocation.value = ''
  } catch (error)
  {
    errorMessage.value = 'Failed to add location: ' + error || 'Unknown error'
  }
}
</script>

<template>
  <AppCard title="Search">
    <div class="flex gap-4 items-start">
      <div class="flex-1">
        <input v-model="searchLocation" type="text" placeholder="Enter location"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keyup.enter="addLocation" />
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
      </div>
      <button @click="addLocation"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Add Location
      </button>
    </div>
  </AppCard>
</template>
