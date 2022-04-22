import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import GameButton from '@/components/ui/GameButton.vue'

describe('GameButton.vue', () => {
  it('matches snapshot', () => {
    const text = 'text'
    const wrapper = shallowMount(GameButton, {
      propsData: { text }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('displays text got as prop', () => {
    const text = 'text'
    const wrapper = shallowMount(GameButton, {
      propsData: { text }
    })

    const textElement = wrapper.find('.game-button__text')
    expect(textElement.text()).toMatch(text)
  })

  it('has the primary class if gets the primary prop', () => {
    const wrapper = shallowMount(GameButton, {
      propsData: { primary: true }
    })

    expect(wrapper.classes('game-button_primary')).toBe(true)
  })

  it('does not have the primary class if does not get the primary prop', () => {
    const wrapper = shallowMount(GameButton)

    expect(wrapper.classes('game-button_primary')).toBe(false)
  })

  it('redirects to a path if a path is provided', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)

    const router = new VueRouter()

    const linkTo = '/path'

    const wrapper = shallowMount(GameButton, {
      localVue,
      router,
      propsData: { linkTo }
    })

    wrapper.trigger('click')

    expect(wrapper.vm.$route.path).toBe(linkTo)
  })

  it('does not redirect if the path matches current path', () => {
    const $router = {
      push: jest.fn()
    }

    const linkTo = '/path'

    const $route = {
      path: linkTo
    }

    const wrapper = shallowMount(GameButton, {
      mocks: {
        $route,
        $router
      },
      propsData: { linkTo }
    })

    wrapper.trigger('click')

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(0)
  })

  it('emits click event on click', () => {
    const handleClick = jest.fn()

    const wrapper = shallowMount(GameButton, {
      listeners: {
        click: handleClick
      }
    })

    wrapper.trigger('click')

    expect(handleClick).toHaveBeenCalled()
  })
})
