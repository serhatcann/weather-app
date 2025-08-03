import type { FunctionalComponent, SVGAttributes } from 'vue'

export interface Weather {
  id: number
  location: string
  condition: string
  temperature: number
  maxTemp: number
  minTemp: number
  icon: FunctionalComponent<SVGAttributes, Record<string, never>>
}

export interface Location {
  id: number
  name: string
  latitude: number
  longitude: number
}
