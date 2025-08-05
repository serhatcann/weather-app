import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import SearchCard from '../SearchCard.vue'

vi.mock('@/stores/weather', () => ({
  useWeatherStore: () => ({
    addWeather: vi.fn().mockResolvedValue(undefined),
  }),
}))

describe('SearchCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders form elements', () => {
    const wrapper = mount(SearchCard)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('enables button when input has value', async () => {
    const wrapper = mount(SearchCard)
    await wrapper.find('input').setValue('New York')
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })
})
