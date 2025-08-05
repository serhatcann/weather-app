import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ForecastCard from '../ForecastCard.vue'

vi.mock('@/stores/weather', () => ({
  useWeatherStore: () => ({
    weatherList: [],
  }),
}))

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { zipcode: 'test' },
    meta: {},
  }),
}))

vi.mock('@/composables/useWeatherApi', () => ({
  useWeatherApi: () => ({
    fetchLocation: vi.fn(),
    fetchWeathers: vi.fn(),
  }),
}))

describe('ForecastCard', () => {
  it('renders component', () => {
    const wrapper = mount(ForecastCard, {
      global: {
        stubs: ['WeatherIcon', 'AppCard'],
      },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
