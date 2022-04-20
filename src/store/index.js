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
      dispatch('messages/fetchMessages')
      dispatch('shop/fetchShop')
      dispatch('reputation/fetchReputation')
    },
    endGame({ commit }) {
      commit('gameData/discardState')
      commit('messages/discardState')
      commit('shop/discardState')
      commit('reputation/discardState')
    }
  }
})
