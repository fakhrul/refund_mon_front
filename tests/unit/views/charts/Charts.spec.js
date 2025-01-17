import Vue from 'vue'
import { shallowMount } from '@vue/test-utils';
import CoreuiVue from '@coreui/vue-pro'
// import Charts from '@/views/charts/Charts'

Vue.use(CoreuiVue)

describe('Charts.vue', () => {
  it('has a name', () => {
    expect(Charts.name).toBe('Charts')
  })
  it('is Vue instance', () => {
    const wrapper = shallowMount(Charts)
    expect(wrapper.vm).toBeTruthy()
  })
  it('is Charts', () => {
    const wrapper = shallowMount(Charts)
    expect(wrapper.findComponent(Charts)).toBeTruthy()
  })
  test('renders correctly', () => {
    const wrapper = shallowMount(Charts)
    expect(wrapper.element).toMatchSnapshot()
  })
})
