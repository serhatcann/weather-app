import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Weather } from '@/types/weather.interface'

export const useWeatherStore = defineStore('weather', () => {
  const weatherList = ref<Array<Weather>>([
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
  ])

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
    const index = weatherList.value.findIndex(weather => weather.id === id)
    if (index > -1) weatherList.value.splice(index, 1)
  }

  return {
    weatherList,
    addWeather,
    removeWeather
  }
})
