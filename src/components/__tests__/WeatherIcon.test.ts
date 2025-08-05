import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WeatherIcon from '../WeatherIcon.vue'

describe('WeatherIcon', () => {
  it('renders component', () => {
    const wrapper = mount(WeatherIcon, {
      props: { name: 'clear-day', size: 'md' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('accepts props', () => {
    const wrapper = mount(WeatherIcon, {
      props: { name: 'rain', size: 'lg' },
    })
    expect(wrapper.props('name')).toBe('rain')
    expect(wrapper.props('size')).toBe('lg')
  })
})
