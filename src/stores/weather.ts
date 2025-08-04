import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Location, type Weather } from '@/types/weather.interface'
import { useWeatherApi } from '@/composables/useWeatherApi'

export const useWeatherStore = defineStore(
  'weather',
  () => {
    const { fetchLocation, fetchWeathers } = useWeatherApi()

    const locationList = ref<Array<Location>>([])
    const weatherList = ref<Array<Weather>>([])

    const addWeather = async (location: string) => {
      try {
        const locationData = await fetchLocation(location)
        if (locationList.value.find((location) => location.id === locationData.id)) {
          return
        }
        const newLocation: Location = {
          id: locationData.id,
          name: locationData.name,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        }
        locationList.value.unshift(newLocation)

        const weatherData = await fetchWeathers([newLocation])
        weatherList.value.unshift(weatherData[0])
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to add weather')
      }
    }

    const getWeatherByName = (name: string) => {
      return weatherList.value.find((weather) => weather.location === name)
    }

    const removeWeather = (id: number) => {
      const locationIndex = locationList.value.findIndex((location) => location.id === id)
      const weatherIndex = weatherList.value.findIndex((weather) => weather.id === id)
      if (locationIndex > -1) {
        locationList.value.splice(locationIndex, 1)
      }
      if (weatherIndex > -1) {
        weatherList.value.splice(weatherIndex, 1)
      }
    }

    const initializeWeatherData = async () => {
      if (locationList.value.length > 0 && weatherList.value.length === 0) {
        try {
          const weatherData = await fetchWeathers(locationList.value)
          weatherList.value.push(...weatherData)
        } catch (error) {
          console.error('Failed to initialize weather data:', error)
        }
      }
    }

    return {
      locationList,
      weatherList,
      addWeather,
      getWeatherByName,
      removeWeather,
      initializeWeatherData,
    }
  },
  {
    persist: { pick: ['locationList'] },
  },
)
