import type { Location, Weather, DailyForecast } from '@/types/weather.interface'

export const useWeatherApi = () => {
  const fetchLocation = async (location: string) => {
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

  const fetchWeather = async (location: Location) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/dwd-icon?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=6`,
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

  const fetchWeathers = async (locations: Array<Location>) => {
    const weathers = locations.map(async (location: Location) => {
      try {
        const weatherData = await fetchWeather(location)
        const weatherInfo = getWeatherInfo(weatherData.current.weather_code)

        const forecast: DailyForecast[] = weatherData.daily.time
          .slice(1, 6)
          .map((date: string, index: number) => {
            const dayWeatherInfo = getWeatherInfo(weatherData.daily.weather_code[index + 1])
            return {
              date,
              maxTemp: Math.round(weatherData.daily.temperature_2m_max[index + 1]),
              minTemp: Math.round(weatherData.daily.temperature_2m_min[index + 1]),
              condition: dayWeatherInfo.condition,
              icon: dayWeatherInfo.icon,
            }
          })

        const newWeather: Weather = {
          id: location.id,
          location: location.name,
          temperature: Math.round(weatherData.current.temperature_2m),
          condition: weatherInfo.condition,
          maxTemp: Math.round(weatherData.daily.temperature_2m_max[0]),
          minTemp: Math.round(weatherData.daily.temperature_2m_min[0]),
          icon: weatherInfo.icon,
          forecast,
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
          icon: 'not-available',
        }
      }
    })
    const results = await Promise.all(weathers)
    return results
  }

  const getWeatherInfo = (code: number) => {
    const weatherMap: Record<number, { condition: string; icon: string }> = {
      0: { condition: 'Clear sky', icon: 'clear-day' },
      1: { condition: 'Mainly clear', icon: 'partly-cloudy-day' },
      2: { condition: 'Partly cloudy', icon: 'overcast-day' },
      3: { condition: 'Overcast', icon: 'overcast' },
      45: { condition: 'Fog', icon: 'fog' },
      48: { condition: 'Depositing rime fog', icon: 'extreme-fog' },
      51: { condition: 'Drizzle: Light intensity', icon: 'partly-cloudy-day-drizzle' },
      53: { condition: 'Drizzle: Moderate intensity', icon: 'overcast-day-drizzle' },
      55: { condition: 'Drizzle: Dense intensity', icon: 'extreme-day-drizzle' },
      56: { condition: 'Freezing Drizzle: Light intensity', icon: 'drizzle' },
      57: { condition: 'Freezing Drizzle: Dense intensity', icon: 'extreme-drizzle' },
      61: { condition: 'Rain: Slight intensity', icon: 'partly-cloudy-day-rain' },
      63: { condition: 'Rain: Moderate intensity', icon: 'overcast-day-rain' },
      65: { condition: 'Rain: Heavy intensity', icon: 'extreme-day-rain' },
      66: { condition: 'Freezing Rain: Light intensity', icon: 'rain' },
      67: { condition: 'Freezing Rain: Heavy intensity', icon: 'extreme-rain' },
      71: { condition: 'Snow fall: Slight intensity', icon: 'partly-cloudy-day-snow' },
      73: { condition: 'Snow fall: Moderate intensity', icon: 'overcast-day-snow' },
      75: { condition: 'Snow fall: Heavy intensity', icon: 'snow' },
      77: { condition: 'Snow grains', icon: 'overcast-snow' },
      80: { condition: 'Rain showers: Slight', icon: 'partly-cloudy-day-rain' },
      81: { condition: 'Rain showers: Moderate', icon: 'overcast-rain' },
      82: { condition: 'Rain showers: Violent', icon: 'extreme-rain' },
      85: { condition: 'Snow showers: Slight', icon: 'partly-cloudy-day-snow' },
      86: { condition: 'Snow showers: Heavy', icon: 'snow' },
      95: { condition: 'Thunderstorm: Slight or moderate', icon: 'thunderstorms' },
      96: { condition: 'Thunderstorm with slight hail', icon: 'thunderstorms-rain' },
      99: { condition: 'Thunderstorm with heavy hail', icon: 'thunderstorms-extreme-rain' },
    }
    return weatherMap[code] || { condition: 'Unknown', icon: 'not-available' }
  }

  return {
    fetchLocation,
    getWeatherInfo,
    fetchWeathers,
  }
}
