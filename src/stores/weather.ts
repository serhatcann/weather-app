import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Location, type Weather } from '@/types/weather.interface'
import { useWeatherApi } from '@/composables/useWeatherApi'

export const useWeatherStore = defineStore(
  'weather',
  () => {
    const locationList = ref<Array<Location>>([])
    const weatherList = ref<Array<Weather>>([])

    const { getLocation, getWeather, getWeatherInfo } = useWeatherApi()

    const addWeather = async (location: string) => {
      try {
        const locationData = await getLocation(location)
        const weatherData = await getWeather({
          id: locationData.id,
          name: locationData.name,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        })
        const weatherInfo = getWeatherInfo(weatherData.current.weather_code)

        const newWeather: Weather = {
          id: locationData.id,
          location: locationData.name,
          temperature: Math.round(weatherData.current.temperature_2m),
          condition: weatherInfo.condition,
          maxTemp: Math.round(weatherData.daily.temperature_2m_max[0]),
          minTemp: Math.round(weatherData.daily.temperature_2m_min[0]),
          icon: weatherInfo.icon,
        }

        locationList.value.unshift({
          id: locationData.id,
          name: locationData.name,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        })
        weatherList.value.unshift(newWeather)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to add weather')
      }
    }

    const removeWeather = (id: number) => {
      const index = locationList.value.findIndex((location) => location.id === id)
      if (index > -1) {
        locationList.value.splice(index, 1)
        weatherList.value.splice(index, 1)
      }
    }

    return {
      locationList,
      weatherList,
      addWeather,
      removeWeather,
    }
  },
  {
    persist: { pick: ['locationList'] },
  },
)
