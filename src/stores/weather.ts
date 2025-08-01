import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Weather } from '@/types/weather.interface'
import { useWeatherApi } from '@/composables/useWeatherApi'

export const useWeatherStore = defineStore(
  'weather',
  () => {
    const weatherList = ref<Array<Weather>>([])
    const { getLocation, getWeather, getWeatherInfo } = useWeatherApi()

    const addWeather = async (location: string) => {
      try {
        const locationData = await getLocation(location)
        const weatherData = await getWeather(locationData.latitude, locationData.longitude)
        const weatherInfo = getWeatherInfo(weatherData.current.weather_code)

        const newWeather: Weather = {
          id: Date.now(),
          location: locationData.name,
          temperature: Math.round(weatherData.current.temperature_2m),
          condition: weatherInfo.condition,
          maxTemp: Math.round(weatherData.daily.temperature_2m_max[0]),
          minTemp: Math.round(weatherData.daily.temperature_2m_min[0]),
          icon: weatherInfo.icon,
        }

        weatherList.value.unshift(newWeather)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch weather data')
      }
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
