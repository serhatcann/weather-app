import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Location, type Weather } from '@/types/weather.interface'
import { useWeatherApi } from '@/composables/useWeatherApi'
import { computedAsync } from '@vueuse/core'

export const useWeatherStore = defineStore(
  'weather',
  () => {
    const { fetchLocation, fetchWeathers } = useWeatherApi()

    const locationList = ref<Array<Location>>([])
    const weatherList = computedAsync<Array<Weather>>(
      async () => {
        if (locationList.value.length === 0) return []
        return await fetchWeathers(locationList.value)
      },
      [],
    )

    const addWeather = async (location: string) => {
      try {
        const locationData = await fetchLocation(location)
        locationList.value.unshift({
          id: locationData.id,
          name: locationData.name,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        })
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to add weather')
      }
    }

    const getWeatherByName = (name: string) => {
      return weatherList.value.find((weather => weather.location === name))
    }

    const removeWeather = (id: number) => {
      const index = locationList.value.findIndex((location) => location.id === id)
      if (index > -1) {
        locationList.value.splice(index, 1)
      }
    }

    return {
      locationList,
      weatherList,
      addWeather,
      getWeatherByName,
      removeWeather,
    }
  },
  {
    persist: { pick: ['locationList'] },
  },
)
