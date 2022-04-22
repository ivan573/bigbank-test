import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { ModalWindowType, Route } from '@/const'
import ShopView from '@/views/ShopView.vue'

describe('ShopView.vue', () => {
  const gameId = 'gameId'
  const items = [
    {
      cost: 50,
      id: 'hpot',
      name: 'Healing potion'
    },
    {
      cost: 100,
      id: 'tricks',
      name: 'Book of Tricks'
    },
    {
      cost: 300,
      id: 'mtrix',
      name: 'Book of Megatricks'
    }
  ]
  const activeItem = items[0]
  const posessedItems = []
  const shoppingSuccess = true

  const computed = {
    gameId() { return gameId },
    items() { return items },
    activeItem() { return activeItem },
    posessedItems() { return posessedItems },
    shoppingSuccess() { return shoppingSuccess }
  }

  it('matches snapshot', () => {
    const wrapper = mount(ShopView, { computed })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('whenever an item is clicked the component updates active item and displays purchase modal window', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const updateActiveItem = jest.fn()
    const shop = {
      namespaced: true,
      mutations: { updateActiveItem }
    }
    const store = new Vuex.Store({ modules: { shop } })

    const data = () => {
      return {
        modalWindowType: null
      }
    }

    const wrapper = mount(ShopView, {
      localVue,
      store,
      data,
      computed
    })

    const itemsElement = wrapper.find('.shop__available-items-list')

    itemsElement.vm.$emit('itemClick', items[0].id)

    expect(updateActiveItem).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.modalWindowType).toBe(ModalWindowType.PURCHASE_ITEM)
  })

  it('whenever modal window emits confirm event component calls purchase action, discards active item and updates modal window type', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const purchaseItem = jest.fn()
    const discardActiveItem = jest.fn()
    const shop = {
      namespaced: true,
      mutations: { discardActiveItem },
      actions: { purchaseItem }
    }
    const store = new Vuex.Store({ modules: { shop } })

    const modalWindowType = ModalWindowType.PURCHASE_ITEM
    const data = () => {
      return {
        modalWindowType
      }
    }

    const wrapper = mount(ShopView, {
      localVue,
      store,
      data,
      computed
    })

    const modalWindowElement = wrapper.find('.shop__modal-window')

    await modalWindowElement.vm.$emit('confirm', modalWindowType)

    await wrapper.vm.$nextTick()

    expect(purchaseItem).toHaveBeenCalledTimes(1)
    expect(discardActiveItem).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.modalWindowType).toBe(ModalWindowType.PURCHASE_RESULT)
  })

  it('whenever modal window emits confirm event component calls purchase action, discards active item and updates modal window type', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const purchaseItem = jest.fn()
    const discardActiveItem = jest.fn()
    const shop = {
      namespaced: true,
      mutations: { discardActiveItem },
      actions: { purchaseItem }
    }
    const store = new Vuex.Store({ modules: { shop } })

    const modalWindowType = ModalWindowType.PURCHASE_ITEM
    const data = () => {
      return {
        modalWindowType
      }
    }

    const wrapper = mount(ShopView, {
      localVue,
      store,
      data,
      computed
    })

    const modalWindowElement = wrapper.find('.shop__modal-window')

    await modalWindowElement.vm.$emit('confirm', modalWindowType)

    await wrapper.vm.$nextTick()

    expect(purchaseItem).toHaveBeenCalledTimes(1)
    expect(discardActiveItem).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.modalWindowType).toBe(ModalWindowType.PURCHASE_RESULT)
  })

  it('whenever a purchase modal window emits close event component discards active item and modal window type', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const discardActiveItem = jest.fn()
    const shop = {
      namespaced: true,
      mutations: { discardActiveItem }
    }
    const store = new Vuex.Store({ modules: { shop } })

    const modalWindowType = ModalWindowType.PURCHASE_ITEM
    const data = () => {
      return {
        modalWindowType
      }
    }

    const wrapper = mount(ShopView, {
      localVue,
      store,
      data,
      computed
    })

    const modalWindowElement = wrapper.find('.shop__modal-window')

    await modalWindowElement.vm.$emit('close', modalWindowType)

    await wrapper.vm.$nextTick()

    expect(discardActiveItem).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.modalWindowType).toBe(null)
  })

  it('whenever a purchase result modal window emits close event component discards purchase result message and modal window type', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const discardShoppingSuccess = jest.fn()
    const shop = {
      namespaced: true,
      mutations: { discardShoppingSuccess }
    }
    const store = new Vuex.Store({ modules: { shop } })

    const modalWindowType = ModalWindowType.PURCHASE_RESULT
    const data = () => {
      return {
        modalWindowType
      }
    }

    const wrapper = mount(ShopView, {
      localVue,
      store,
      data,
      computed
    })

    const modalWindowElement = wrapper.find('.shop__modal-window')

    modalWindowElement.vm.$emit('close', modalWindowType)

    expect(discardShoppingSuccess).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.modalWindowType).toBe(null)
  })

  it('if the modal window has the purchase type component provides active item data to render', () => {
    const modalWindowType = ModalWindowType.PURCHASE_ITEM
    const data = () => {
      return {
        modalWindowType
      }
    }
    const wrapper = mount(ShopView, { data, computed })

    expect(wrapper.vm.modalWindowData).toEqual(wrapper.vm.activeItem)
  })

  it('if the modal window has the purchase result type and purchase was successful component provides corresponding message to render', () => {
    const modalWindowType = ModalWindowType.PURCHASE_RESULT
    const data = () => {
      return {
        modalWindowType
      }
    }
    const wrapper = mount(ShopView, { data, computed })

    expect(wrapper.vm.modalWindowData).toEqual({ message: 'You have purchased the item' })
  })

  it('if the modal window has the purchase result type and purchase was not successful component provides corresponding message to render', () => {
    const modalWindowType = ModalWindowType.PURCHASE_RESULT
    const data = () => {
      return {
        modalWindowType
      }
    }
    const wrapper = mount(ShopView, { data, computed: { ...computed, shoppingSuccess() { return false } } })

    expect(wrapper.vm.modalWindowData).toEqual({ message: 'You cannot purchase this item' })
  })

  it('redirects to root path if the game is not initialized', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)

    const router = new VueRouter()
    router.push(Route.SHOP)

    const wrapper = shallowMount(ShopView, {
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
