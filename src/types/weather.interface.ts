export interface Weather {
  id: number
  location: string
  condition: string
  temperature: number
  maxTemp: number
  minTemp: number
  icon: string
}

export interface Location {
  id: number
  name: string
  latitude: number
  longitude: number
}
