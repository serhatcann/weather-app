import type { Location, Weather } from '@/types/weather.interface'
import type { FunctionalComponent, SVGAttributes } from 'vue'

export const useWeatherApi = () => {
  const getLocation = async (location: string) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`,
      )

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Invalid location name')
        }
        if (response.status >= 500) {
          throw new Error('Geocoding service temporarily unavailable')
        }
        throw new Error('Failed to search location')
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.reason || 'Geocoding API error')
      }

      if (!data.results?.length) {
        throw new Error('Location not found')
      }

      return data.results[0]
    } catch (error) {
      console.log(error)
      throw new Error('Failed to fetch location data')
    }
  }

  const getWeather = async (location: Location) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/dwd-icon?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
      )

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Invalid coordinates provided')
        }
        if (response.status >= 500) {
          throw new Error('Weather service temporarily unavailable')
        }
        throw new Error('Failed to fetch weather data')
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.reason || 'Weather API error')
      }

      if (!data.current || !data.daily) {
        throw new Error('Incomplete weather data received')
      }

      return data
    } catch (error) {
      console.log(error)
      throw new Error('Failed to fetch weather data')
    }
  }

  const getWeatherInfo = (code: number) => {
    const weatherMap: Record<
      number,
      { condition: string; icon: FunctionalComponent<SVGAttributes, Record<string, never>> }
    > = {
      0: { condition: 'Clear sky', icon: () => import('@/assets/icons/clear-day.svg') },
      1: { condition: 'Mainly clear', icon: () => import('@/assets/icons/partly-cloudy-day.svg') },
      2: { condition: 'Partly cloudy', icon: () => import('@/assets/icons/overcast-day.svg') },
      3: { condition: 'Overcast', icon: () => import('@/assets/icons/overcast.svg') },
      45: { condition: 'Fog', icon: () => import('@/assets/icons/fog.svg') },
      48: {
        condition: 'Depositing rime fog',
        icon: () => import('@/assets/icons/extreme-fog.svg'),
      },
      51: {
        condition: 'Drizzle: Light intensity',
        icon: () => import('@/assets/icons/partly-cloudy-day-drizzle.svg'),
      },
      53: {
        condition: 'Drizzle: Moderate intensity',
        icon: () => import('@/assets/icons/overcast-day-drizzle.svg'),
      },
      55: {
        condition: 'Drizzle: Dense intensity',
        icon: () => import('@/assets/icons/extreme-day-drizzle.svg'),
      },
      56: {
        condition: 'Freezing Drizzle: Light intensity',
        icon: () => import('@/assets/icons/drizzle.svg'),
      },
      57: {
        condition: 'Freezing Drizzle: Dense intensity',
        icon: () => import('@/assets/icons/extreme-drizzle.svg'),
      },
      61: {
        condition: 'Rain: Slight intensity',
        icon: () => import('@/assets/icons/partly-cloudy-day-rain.svg'),
      },
      63: {
        condition: 'Rain: Moderate intensity',
        icon: () => import('@/assets/icons/overcast-day-rain.svg'),
      },
      65: {
        condition: 'Rain: Heavy intensity',
        icon: () => import('@/assets/icons/extreme-day-rain.svg'),
      },
      66: {
        condition: 'Freezing Rain: Light intensity',
        icon: () => import('@/assets/icons/rain.svg'),
      },
      67: {
        condition: 'Freezing Rain: Heavy intensity',
        icon: () => import('@/assets/icons/extreme-rain.svg'),
      },
      71: {
        condition: 'Snow fall: Slight intensity',
        icon: () => import('@/assets/icons/partly-cloudy-day-snow.svg'),
      },
      73: {
        condition: 'Snow fall: Moderate intensity',
        icon: () => import('@/assets/icons/overcast-day-snow.svg'),
      },
      75: {
        condition: 'Snow fall: Heavy intensity',
        icon: () => import('@/assets/icons/snow.svg'),
      },
      77: { condition: 'Snow grains', icon: () => import('@/assets/icons/overcast-snow.svg') },
      80: {
        condition: 'Rain showers: Slight',
        icon: () => import('@/assets/icons/partly-cloudy-day-rain.svg'),
      },
      81: {
        condition: 'Rain showers: Moderate',
        icon: () => import('@/assets/icons/overcast-rain.svg'),
      },
      82: {
        condition: 'Rain showers: Violent',
        icon: () => import('@/assets/icons/extreme-rain.svg'),
      },
      85: {
        condition: 'Snow showers: Slight',
        icon: () => import('@/assets/icons/partly-cloudy-day-snow.svg'),
      },
      86: { condition: 'Snow showers: Heavy', icon: () => import('@/assets/icons/snow.svg') },
      95: {
        condition: 'Thunderstorm: Slight or moderate',
        icon: () => import('@/assets/icons/thunderstorms.svg'),
      },
      96: {
        condition: 'Thunderstorm with slight hail',
        icon: () => import('@/assets/icons/thunderstorms-rain.svg'),
      },
      99: {
        condition: 'Thunderstorm with heavy hail',
        icon: () => import('@/assets/icons/thunderstorms-extreme-rain.svg'),
      },
    }

    return (
      weatherMap[code] || {
        condition: 'Unknown',
        icon: () => import('@/assets/icons/not-available.svg'),
      }
    )
  }

  const getWeathers = async (locations: Array<Location>) => {
    const weathers = locations.map(async (location: Location) => {
      try {
        const weatherData = await getWeather(location)
        const weatherInfo = getWeatherInfo(weatherData.current.weather_code)

        const newWeather: Weather = {
          id: weatherData.id,
          location: location.name,
          temperature: Math.round(weatherData.current.temperature_2m),
          condition: weatherInfo.condition,
          maxTemp: Math.round(weatherData.daily.temperature_2m_max[0]),
          minTemp: Math.round(weatherData.daily.temperature_2m_min[0]),
          icon: weatherInfo.icon,
        }
        return newWeather
      } catch (error) {
        console.log(error)
        return {
          id: location.id,
          location: location.name,
          temperature: 0,
          condition: "Couldn't fetch the weather data",
          maxTemp: 0,
          minTemp: 0,
          icon: () => import('@/assets/icons/not-available.svg'),
        }
      }
    })
    const results = await Promise.all(weathers)
    return results
  }

  return {
    getLocation,
    getWeather,
    getWeatherInfo,
    getWeathers,
  }
}
