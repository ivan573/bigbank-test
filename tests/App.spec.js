import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { Route } from '@/const'
import App from '@/App.vue'

describe('GameButton.vue', () => {
  const gameId = 'gameId'
  const data = {
    gold: 0,
    level: 0,
    lives: 3,
    score: 0,
    turn: 0
  }
  const gameData = {
    namespaced: true,
    state: {
      gameId: gameId
    },
    getters: {
      data() { return data }
    }
  }

  const notInitializedGameId = null
  const notInitializedData = {
    gold: 0,
    level: 0,
    lives: 0,
    score: 0,
    turn: 0
  }
  const notInitializedGameData = {
    namespaced: true,
    state: {
      gameId: notInitializedGameId
    },
    getters: {
      data() { return notInitializedData }
    }
  }

  it('matches snapshot', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)

    const store = new Vuex.Store({ modules: { gameData } })
    const router = new VueRouter()

    const wrapper = mount(App, { localVue, store, router })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders navigation if game is initialized', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)

    const store = new Vuex.Store({ modules: { gameData } })
    const router = new VueRouter()

    const wrapper = mount(App, { localVue, store, router })

    const navigationElement = wrapper.find('.app__navigation')

    expect(navigationElement.exists()).toBe(true)
  })

  it('does not render navigation if game is not initialized', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)

    const store = new Vuex.Store({ modules: { gameData: notInitializedGameData } })
    const router = new VueRouter()

    const wrapper = mount(App, { localVue, store, router })

    const navigationElement = wrapper.find('.app__navigation')

    expect(navigationElement.exists()).toBe(false)
  })

  it('renders game data if path not is root', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)

    const store = new Vuex.Store({ modules: { gameData } })
    const router = new VueRouter()

    const wrapper = mount(App, { localVue, store, router })

    const gameDataElement = wrapper.find('.app__game-data')

    expect(gameDataElement.exists()).toBe(false)
  })

  it('does not render game data if path is root', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)

    const store = new Vuex.Store({ modules: { gameData } })
    const router = new VueRouter()
    router.push(Route.GAME)

    const wrapper = mount(App, { localVue, store, router })

    const gameDataElement = wrapper.find('.app__game-data')

    expect(gameDataElement.exists()).toBe(true)
  })
})
