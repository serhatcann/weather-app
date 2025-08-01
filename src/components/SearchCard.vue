<script setup lang="ts">
import AppCard from './AppCard.vue'
import { useWeatherStore } from '@/stores/weather'
import { ref } from 'vue'

const weatherStore = useWeatherStore()
const searchLocation = ref('')
const errorMessage = ref('')

const addLocation = async () => {
  if (!searchLocation.value.trim()) return

  try {
    errorMessage.value = ''
    await weatherStore.addWeather(searchLocation.value)
    searchLocation.value = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
  }
}
</script>

<template>
  <AppCard title="Search">
    <form class="flex gap-4 items-start" @submit.prevent="addLocation">
      <div class="flex-1">
        <label for="location-input" class="sr-only">Location</label>
        <input
          id="location-input"
          v-model="searchLocation"
          type="text"
          placeholder="Enter location"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <p
          v-if="errorMessage"
          id="location-error"
          class="text-red-500 text-sm mt-2"
          role="alert"
          aria-live="polite"
        >
          {{ errorMessage }}
        </p>
      </div>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        :disabled="!searchLocation.trim()"
        :class="{ 'opacity-50 cursor-not-allowed': !searchLocation.trim() }"
      >
        Add Location
      </button>
    </form>
  </AppCard>
</template>
