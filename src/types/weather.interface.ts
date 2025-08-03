export interface Weather {
  id: number
  location: string
  condition: string
  temperature: number
  maxTemp: number
  minTemp: number
  icon: string
  forecast?: DailyForecast[]
}

export interface DailyForecast {
  date: string
  maxTemp: number
  minTemp: number
  condition: string
  icon: string
}

export interface Location {
  id: number
  name: string
  latitude: number
  longitude: number
}
