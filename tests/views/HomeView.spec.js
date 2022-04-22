import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { Route } from '@/const'
import HomeView from '@/views/HomeView.vue'

describe('HomeView.vue', () => {
  it('matches snapshot', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('initializes new game on new game button click and redirects to game path', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)

    const actions = {
      endGame: jest.fn(),
      initGame: jest.fn()
    }

    const store = new Vuex.Store({
      actions
    })
    const router = new VueRouter()

    const wrapper = mount(HomeView, {
      localVue,
      store,
      router
    })

    const newGameButtonElement = wrapper.find('.home__start-button')
    await newGameButtonElement.trigger('click')

    await wrapper.vm.$nextTick()

    expect(actions.endGame).toHaveBeenCalledTimes(1)
    expect(actions.initGame).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$route.path).toBe(Route.GAME)
  })
})
