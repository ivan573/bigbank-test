import Vue from 'vue'
import Vuex from 'vuex'
import gameData from '@/store/modules/gameData'
import messages from '@/store/modules/messages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    gameData,
    messages
  },
  actions: {
    async initGame({ dispatch }) {
      await dispatch('gameData/fetchGameData')
      dispatch('messages/fetchMessages')
    },
    endGame({ commit }) {
      commit('gameData/discardState')
      commit('messages/discardState')
    }
  }
})
