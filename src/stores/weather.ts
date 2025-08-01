import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Weather } from '@/types/weather.interface'

export const useWeatherStore = defineStore(
  'weather',
  () => {
    const weatherList = ref<Array<Weather>>([])

    const addWeather = (location: string) => {
      const newWeather: Weather = {
        id: Date.now(),
        location,
        temperature: 75,
        condition: 'Sunny',
        maxTemp: 80,
        minTemp: 70,
      }
      weatherList.value.unshift(newWeather)
    }

    const removeWeather = (id: number) => {
      const index = weatherList.value.findIndex((weather) => weather.id === id)
      if (index > -1) weatherList.value.splice(index, 1)
    }

    return {
      weatherList,
      addWeather,
      removeWeather,
    }
  },
  {
    persist: true,
  },
)
