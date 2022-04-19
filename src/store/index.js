import Vue from 'vue'
import Vuex from 'vuex'
import gameData from '@/store/modules/gameData'
import messages from '@/store/modules/messages'
import shop from '@/store/modules/shop'
import reputation from '@/store/modules/reputation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    gameData,
    messages,
    shop,
    reputation
  },
  actions: {
    async initGame({ dispatch }) {
      await dispatch('gameData/fetchGameData')
      await dispatch('messages/fetchMessages')
      await dispatch('shop/fetchShop')
    },
    endGame({ commit }) {
      commit('gameData/discardState')
      commit('messages/discardState')
      commit('shop/discardState')
      commit('reputation/discardState')
    }
  }
})
