import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import WeatherCard from '../WeatherCard.vue'

vi.mock('@/stores/weather', () => ({
  useWeatherStore: () => ({
    removeWeather: vi.fn(),
  }),
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

const mockWeather = {
  id: 1,
  location: 'New York',
  condition: 'Sunny',
  temperature: 25,
  maxTemp: 28,
  minTemp: 20,
  icon: 'clear-day',
}

describe('WeatherCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders weather data', () => {
    const wrapper = mount(WeatherCard, {
      props: { weather: mockWeather },
      global: {
        stubs: ['WeatherIcon'],
      },
    })
    expect(wrapper.text()).toContain('New York')
    expect(wrapper.text()).toContain('Sunny')
    expect(wrapper.text()).toContain('25°')
  })
})
