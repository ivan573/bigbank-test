import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { ModalWindowType } from '@/const'
import { Route } from '@/router/index'
import GameView from '@/views/GameView.vue'

describe('GameView.vue', () => {
  const gameId = 'gameId'
  const lives = 3
  const isDataLoading = false
  const quests = [
    {
      adId: 'Ln859bV7',
      expiresIn: 4,
      message: 'Help Menes Rennold to transport a magic turnips to grassland in Everdrone',
      probability: 'Piece of cake',
      reward: 15

    },
    {
      adId: 'lBxlpzxe',
      expiresIn: 5,
      message: 'Help Viriato Ásmundsdóttir to sell an unordinary water on the local market',
      probability: 'Walk in the park',
      reward: 10

    },
    {
      adId: 'bauDDuqQ',
      expiresIn: 3,
      message: 'Help Chingis Chandler to fix their horse',
      probability: 'Quite likely',
      reward: 8
    }
  ]
  const activeQuest = quests[0]
  const message = 'You successfully solved the mission!'
  const areQuestsLoading = false

  const computed = {
    gameId() { return gameId },
    lives() { return lives },
    isDataLoading() { return isDataLoading },
    quests() { return quests },
    activeQuest() { return activeQuest },
    message() { return message },
    areQuestsLoading() { return areQuestsLoading }
  }

  it('matches snapshot', () => {
    const wrapper = mount(GameView, { computed })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('whenever a quest emits questClick event, component updates modal window type to quest and passes quest id to store', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const updateActiveMessage = jest.fn()
    const messages = {
      namespaced: true,
      mutations: { updateActiveMessage }
    }
    const store = new Vuex.Store({ modules: { messages } })

    const wrapper = mount(GameView, {
      localVue,
      store,
      computed
    })
    const questsElement = wrapper.find('.game__quests-list')

    questsElement.vm.$emit('questClick', quests[0].adId)

    expect(wrapper.vm.modalWindowType).toBe(ModalWindowType.QUEST)
    expect(updateActiveMessage).toHaveBeenCalled()
    expect(updateActiveMessage).toHaveBeenCalledWith({}, quests[0].adId)
  })

  it('whenever modal window with quest type emits comfirm event, component calls solving action, discards message and updates window type', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const discardActiveMessage = jest.fn()
    const solveMessage = jest.fn()
    const messages = {
      namespaced: true,
      mutations: { discardActiveMessage },
      actions: { solveMessage }
    }
    const store = new Vuex.Store({ modules: { messages } })

    const modalWindowType = ModalWindowType.QUEST
    const data = () => {
      return {
        modalWindowType
      }
    }

    const wrapper = mount(GameView, {
      localVue,
      store,
      data,
      computed
    })

    const modalWindowElement = wrapper.find('.game__modal-window')

    await modalWindowElement.vm.$emit('confirm', modalWindowType)

    await wrapper.vm.$nextTick()

    expect(solveMessage).toHaveBeenCalled()
    expect(discardActiveMessage).toHaveBeenCalled()
    expect(wrapper.vm.modalWindowType).toBe(ModalWindowType.QUEST_RESULT)
  })

  it('whenever modal window with quest type emits comfirm event and the quest fails taking last live, component updates modal window type to game over', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const discardActiveMessage = jest.fn()
    const solveMessage = jest.fn()
    const messages = {
      namespaced: true,
      mutations: { discardActiveMessage },
      actions: { solveMessage }
    }
    const store = new Vuex.Store({ modules: { messages } })

    const modalWindowType = ModalWindowType.QUEST
    const data = () => {
      return {
        modalWindowType
      }
    }

    const wrapper = mount(GameView, {
      localVue,
      store,
      data,
      computed: {
        ...computed,
        lives() { return 0 }
      }
    })

    const modalWindowElement = wrapper.find('.game__modal-window')

    await modalWindowElement.vm.$emit('confirm', modalWindowType)

    await wrapper.vm.$nextTick()

    expect(solveMessage).toHaveBeenCalled()
    expect(discardActiveMessage).toHaveBeenCalled()
    expect(wrapper.vm.modalWindowType).toBe(ModalWindowType.GAME_OVER)
  })

  it('whenever modal window with quest type emits close event, component updates modal window type and call discard mutation', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const discardActiveMessage = jest.fn()
    const messages = {
      namespaced: true,
      mutations: { discardActiveMessage }
    }
    const store = new Vuex.Store({ modules: { messages } })

    const modalWindowType = ModalWindowType.QUEST
    const data = () => {
      return {
        modalWindowType
      }
    }

    const wrapper = mount(GameView, {
      localVue,
      store,
      data,
      computed
    })

    const modalWindowElement = wrapper.find('.game__modal-window')

    modalWindowElement.vm.$emit('close', modalWindowType)

    expect(wrapper.vm.modalWindowType).toBe(null)
    expect(discardActiveMessage).toHaveBeenCalled()
  })

  it('whenever modal window with quest result type emits close event, component updates modal window type and call discard mutation', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const discardMessageResult = jest.fn()
    const messages = {
      namespaced: true,
      mutations: { discardMessageResult }
    }
    const store = new Vuex.Store({ modules: { messages } })

    const modalWindowType = ModalWindowType.QUEST_RESULT
    const data = () => {
      return {
        modalWindowType
      }
    }

    const wrapper = mount(GameView, {
      localVue,
      store,
      data,
      computed
    })

    const modalWindowElement = wrapper.find('.game__modal-window')

    modalWindowElement.vm.$emit('close', modalWindowType)

    expect(wrapper.vm.modalWindowType).toBe(null)
    expect(discardMessageResult).toHaveBeenCalled()
  })

  it('whenever modal window with game over type emits close event, component calls end game action and redirects to root', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)

    const endGame = jest.fn()
    const actions = {
      endGame
    }
    const store = new Vuex.Store({ actions })

    const router = new VueRouter()
    router.push(Route.GAME)

    const modalWindowType = ModalWindowType.GAME_OVER
    const data = () => {
      return {
        modalWindowType
      }
    }

    const wrapper = mount(GameView, {
      localVue,
      store,
      router,
      data,
      computed
    })

    const modalWindowElement = wrapper.find('.game__modal-window')

    modalWindowElement.vm.$emit('close', modalWindowType)

    expect(wrapper.vm.modalWindowType).toBe(null)
    expect(endGame).toHaveBeenCalled()
    expect(wrapper.vm.$route.path).toBe(Route.HOME)
  })

  it('if the modal window has the quest type component provides active quest data to render', () => {
    const modalWindowType = ModalWindowType.QUEST
    const data = () => {
      return {
        modalWindowType
      }
    }
    const wrapper = mount(GameView, { data, computed })

    expect(wrapper.vm.modalWindowData).toEqual(wrapper.vm.activeQuest)
  })

  it('if the modal window has the quest result type component provides quest result message to render', () => {
    const modalWindowType = ModalWindowType.QUEST_RESULT
    const data = () => {
      return {
        modalWindowType
      }
    }
    const wrapper = mount(GameView, { data, computed })

    expect(wrapper.vm.modalWindowData).toEqual({ message: wrapper.vm.message })
  })

  it('if the modal window has the game over type component provides quest result message to render', () => {
    const modalWindowType = ModalWindowType.GAME_OVER
    const data = () => {
      return {
        modalWindowType
      }
    }
    const wrapper = mount(GameView, { data, computed })

    expect(wrapper.vm.modalWindowData).toEqual({ message: wrapper.vm.message })
  })

  it('redirects to root path if the game is not initialized', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)

    const router = new VueRouter()
    router.push(Route.GAME)

    const wrapper = shallowMount(GameView, {
      localVue,
      router,
      computed: {
        ...computed,
        gameId() { return null }
      }
    })

    expect(wrapper.vm.$route.path).toBe(Route.HOME)
  })
})
