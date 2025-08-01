import type { Location, Weather } from '@/types/weather.interface'

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
    const iconMap: Record<number, { condition: string; icon: string }> = {
      0: { condition: 'Clear sky', icon: '☀️' },
      1: { condition: 'Mainly clear', icon: '🌤️' },
      2: { condition: 'Partly cloudy', icon: '⛅' },
      3: { condition: 'Overcast', icon: '☁️' },
      45: { condition: 'Fog', icon: '🌫️' },
      48: { condition: 'Depositing rime fog', icon: '🌫️' },
      51: { condition: 'Light drizzle', icon: '🌦️' },
      53: { condition: 'Moderate drizzle', icon: '🌦️' },
      55: { condition: 'Dense drizzle', icon: '🌧️' },
      56: { condition: 'Light freezing drizzle', icon: '🌨️' },
      57: { condition: 'Dense freezing drizzle', icon: '🌨️' },
      61: { condition: 'Slight rain', icon: '🌦️' },
      63: { condition: 'Moderate rain', icon: '🌧️' },
      65: { condition: 'Heavy rain', icon: '🌧️' },
      66: { condition: 'Light freezing rain', icon: '🌨️' },
      67: { condition: 'Heavy freezing rain', icon: '🌨️' },
      71: { condition: 'Slight snow fall', icon: '🌨️' },
      73: { condition: 'Moderate snow fall', icon: '❄️' },
      75: { condition: 'Heavy snow fall', icon: '❄️' },
      77: { condition: 'Snow grains', icon: '❄️' },
      80: { condition: 'Slight rain showers', icon: '🌦️' },
      81: { condition: 'Moderate rain showers', icon: '🌧️' },
      82: { condition: 'Violent rain showers', icon: '🌧️' },
      85: { condition: 'Slight snow showers', icon: '🌨️' },
      86: { condition: 'Heavy snow showers', icon: '❄️' },
      95: { condition: 'Thunderstorm', icon: '⛈️' },
      96: { condition: 'Thunderstorm with slight hail', icon: '⛈️' },
      99: { condition: 'Thunderstorm with heavy hail', icon: '⛈️' },
    }
    return iconMap[code] || { condition: 'Unknown', icon: '❓' }
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
          icon: '❓',
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
