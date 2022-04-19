import api, { RequestType } from '@/api'

const getInitialState = () => ({
  items: null,
  activeItem: null,
  posessedItems: [],
  shoppingSuccess: null
})

export default {
  namespaced: true,
  state: getInitialState(),
  mutations: {
    updateItems(state, newItems) {
      state.items = newItems
    },
    updateShoppingSuccess(state, newShoppingSuccess) {
      state.shoppingSuccess = newShoppingSuccess
    },
    updateActiveItem(state, newItemId) {
      state.activeItem = state.items.find(item => item.id === newItemId)
    },
    discardActiveItem(state) {
      state.activeItem = null
    },
    discardShoppinSuccess(state) {
      state.shoppingSuccess = null
    },
    addItemToPossessed(state, newItem) {
      state.posessedItems.push(newItem)
    },
    discardState(state) {
      Object.assign(state, getInitialState())
    }
  },
  actions: {
    async fetchShop({ rootState, commit }) {
      const newItems = await api(RequestType.GET_ITEMS, rootState.gameData.gameId)
      commit('updateItems', newItems)
    },
    async purchaseItem({ rootState, state, commit, dispatch }, itemId) {
      const { shoppingSuccess, gold, lives, level, turn } = await api(RequestType.PURCHASE_ITEM, rootState.gameData.gameId, itemId)
      commit('updateShoppingSuccess', shoppingSuccess)
      commit('gameData/updateData', { gold, lives, turn, level }, { root: true })
      if (shoppingSuccess) {
        const newItem = state.items.find(item => item.id === itemId)?.name
        newItem && commit('addItemToPossessed', newItem)
      }
      await dispatch('messages/fetchMessages', null, { root: true })
    }
  }
}
