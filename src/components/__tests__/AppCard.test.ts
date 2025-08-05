import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AppCard from '../AppCard.vue'

describe('AppCard', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppCard, {
      slots: { default: '<p>Test content</p>' },
    })
    expect(wrapper.text()).toContain('Test content')
  })

  it('renders title', () => {
    const wrapper = mount(AppCard, {
      props: { title: 'Test Title' },
    })
    expect(wrapper.text()).toContain('Test Title')
  })

  it('shows loading state', () => {
    const wrapper = mount(AppCard, {
      props: { loading: true },
    })
    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
  })
})
